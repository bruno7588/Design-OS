import { spawn } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import type { DemoComment, WatchState } from '@design-os/demos'
import { listComments, updateComment } from './comments'
import { demoFolder } from './demos'

// Watch mode: while it's on for a demo, Haiku picks up that demo's pending comments one at a
// time (oldest first), edits the demo's src through headless Claude Code, and marks each
// comment done or failed. Off by default and after a restart, so nothing edits files unless
// someone has just turned it on. The prompt is engines/watch-mode/prompt.md.

export const WATCH_MODEL = 'claude-haiku-4-5'
const TIMEOUT_MS = 5 * 60_000

export interface ClaudeRun {
  ok: boolean
  /** Claude's closing message: what it changed, or why it couldn't. */
  message: string
  costUsd?: number
}

export type Runner = (args: string[], cwd: string) => Promise<ClaudeRun>

/**
 * The claude command for one comment. File tools only; edits land in the demo's src and
 * nowhere else: the replica and component folders are readable (--add-dir) but denied for
 * edits, as are the demo's own metadata, comments and saved versions.
 */
export function claudeArgs({ prompt, demoDir, readDirs }: { prompt: string; demoDir: string; readDirs: string[] }) {
  const abs = (p: string) => `/${p}` // Claude Code permission rules take //absolute/path
  const blocked = [...readDirs.map((d) => `${d}/**`), `${demoDir}/versions/**`, `${demoDir}/demo.json`, `${demoDir}/comments.json`, `${demoDir}/thumbnail.png`]
  const settings = { permissions: { deny: blocked.flatMap((p) => [`Edit(${abs(p)})`, `Write(${abs(p)})`]) } }
  return [
    '-p',
    prompt,
    '--model',
    WATCH_MODEL,
    '--output-format',
    'json',
    '--permission-mode',
    'acceptEdits',
    '--allowedTools',
    'Read,Edit,Write,Glob,Grep',
    '--no-session-persistence',
    '--strict-mcp-config',
    '--settings',
    JSON.stringify(settings),
    '--add-dir',
    ...readDirs,
  ]
}

/** Runs headless Claude Code and reads its JSON result. */
export const runClaude: Runner = (args, cwd) =>
  new Promise((resolve) => {
    const child = spawn('claude', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    const timer = setTimeout(() => child.kill('SIGTERM'), TIMEOUT_MS)
    child.stdout.on('data', (d) => (out += d))
    child.stderr.on('data', (d) => (err += d))
    child.on('error', (e) => {
      clearTimeout(timer)
      resolve({ ok: false, message: `Couldn't start Claude Code: ${e.message}` })
    })
    child.on('close', (code, signal) => {
      clearTimeout(timer)
      if (signal) return resolve({ ok: false, message: 'Haiku took longer than 5 minutes, so the change was stopped.' })
      try {
        const result = JSON.parse(out)
        const message = String(result.result ?? '').trim()
        const cannot = /^CANNOT:/i.test(message)
        resolve({ ok: !result.is_error && code === 0 && !cannot, message: message.replace(/^CANNOT:\s*/i, '') || 'No reply from Haiku.', costUsd: result.total_cost_usd })
      } catch {
        resolve({ ok: false, message: (err || out).trim().slice(0, 500) || `Claude Code exited with code ${code}.` })
      }
    })
  })

/** Returns why the demo doesn't build, or null when every file compiles. */
export type BuildCheck = (slug: string) => Promise<string | null>

/**
 * Asks the running playground (Vite) to compile every file in the demo's src. Vite reports
 * imports that don't resolve and syntax errors; it doesn't type-check.
 */
export function viteCheck(dir: string, playgroundUrl: string): BuildCheck {
  return async (slug) => {
    const src = join(demoFolder(dir, slug), 'src')
    const files = (await readdir(src, { recursive: true })).filter((f) => /\.(tsx?|jsx?)$/.test(f))
    for (const file of files) {
      const url = `${playgroundUrl}/demos/${slug}/src/${relative(src, join(src, file)).split('\\').join('/')}`
      const r = await fetch(url).catch(() => null)
      if (!r) return null // the playground isn't running: nothing to check against
      if (!r.ok) return `${file}: ${(await r.text()).replace(/\s+/g, ' ').slice(0, 600)}`
    }
    return null
  }
}

/** Fills {{name}} placeholders in the prompt template. */
export function renderPrompt(template: string, values: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? '')
}

export interface WatchEngine {
  state(slug: string): WatchState
  set(slug: string, on: boolean): Promise<WatchState>
  /** Checks for work now, such as after a comment is added. */
  poke(): void
  close(): void
}

interface Log {
  info(msg: string): void
  warn(msg: string): void
}

export function createWatchEngine({
  dir,
  repoRoot,
  log,
  run = runClaude,
  check = async () => null,
  intervalMs = 2000,
}: {
  dir: string
  repoRoot: string
  log: Log
  run?: Runner
  /** Whether the demo still builds after a change; one retry with the error if not. */
  check?: BuildCheck
  intervalMs?: number
}): WatchEngine {
  const watched = new Set<string>()
  let busy: { slug: string; id: string } | null = null
  const readDirs = [join(repoRoot, 'apps/playground/src'), join(repoRoot, 'packages/components/src')]

  async function work(slug: string, comment: DemoComment) {
    busy = { slug, id: comment.id }
    try {
      await updateComment(dir, slug, comment.id, { status: 'in-progress' })
      const template = await readFile(join(repoRoot, 'engines/watch-mode/prompt.md'), 'utf8')
      const demoDir = demoFolder(dir, slug)
      const prompt = renderPrompt(template, {
        slug,
        demoDir,
        comment: comment.text,
        author: comment.author,
        path: comment.path,
        selector: comment.selector,
        element: JSON.stringify(comment.element, null, 2),
        readme: join(dir, 'README.md'),
      })
      log.info(`Watch mode: ${slug}, comment ${comment.id}: "${comment.text}"`)
      let result = await run(claudeArgs({ prompt, demoDir, readDirs }), demoDir)
      let cost = result.costUsd ?? 0
      let broken = result.ok ? await check(slug) : null
      if (broken) {
        // One more go, with the build error.
        log.warn(`Watch mode: ${slug} doesn't build after comment ${comment.id}; asking Haiku to fix it.`)
        const fix = `${prompt}\n\n## Your change doesn't build\nYou already made a change for this comment, but the demo no longer compiles:\n\n${broken}\n\nFix the demo's src so it compiles, keeping the change the comment asked for. Then reply as before.`
        result = await run(claudeArgs({ prompt: fix, demoDir, readDirs }), demoDir)
        cost += result.costUsd ?? 0
        broken = result.ok ? await check(slug) : null
      }
      const ok = result.ok && !broken
      const message = broken ? `The change doesn't build: ${broken}` : result.message
      const note = cost ? `${message} (Haiku, $${cost.toFixed(3)})` : message
      await updateComment(dir, slug, comment.id, { status: ok ? 'done' : 'failed', agentNote: note })
      log.info(`Watch mode: ${slug}, comment ${comment.id} ${ok ? 'done' : 'failed'}.`)
    } catch (e) {
      log.warn(`Watch mode: ${slug}, comment ${comment.id} failed: ${(e as Error).message}`)
      await updateComment(dir, slug, comment.id, { status: 'failed', agentNote: (e as Error).message }).catch(() => {})
    } finally {
      busy = null
    }
  }

  async function tick() {
    if (busy) return
    for (const slug of watched) {
      let comments: DemoComment[]
      try {
        comments = await listComments(dir, slug)
      } catch {
        watched.delete(slug) // the demo was deleted
        continue
      }
      const next = comments.filter((c) => c.status === 'pending').sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0]
      if (next) {
        await work(slug, next)
        return void tick()
      }
    }
  }

  const timer = setInterval(() => void tick(), intervalMs)
  const state = (slug: string): WatchState => ({ on: watched.has(slug), busy: busy?.slug === slug, current: busy?.slug === slug ? busy.id : null })

  return {
    state,
    async set(slug, on) {
      const comments = await listComments(dir, slug) // throws 404 for an unknown demo
      if (on) {
        watched.add(slug)
        // A comment left in progress by a stopped server goes back in the queue.
        for (const c of comments) if (c.status === 'in-progress' && busy?.id !== c.id) await updateComment(dir, slug, c.id, { status: 'pending' })
        void tick()
      } else watched.delete(slug)
      return state(slug)
    },
    poke: () => void tick(),
    close: () => clearInterval(timer),
  }
}
