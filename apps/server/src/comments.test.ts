import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { NewComment } from '@design-os/demos'
import { addComment, listComments, removeComment, updateComment } from './comments'
import { claudeArgs, createWatchEngine, renderPrompt, type Runner } from './watch'

let dir: string
const input = (text = 'Make the title shorter'): NewComment => ({
  text,
  author: 'Bruno',
  path: '/admin/people',
  selector: 'h1',
  element: { tag: 'h1', text: 'People' },
  x: 0.2,
  y: 0.5,
})

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'comments-'))
  await mkdir(join(dir, 'demo', 'src'), { recursive: true })
  await writeFile(join(dir, 'demo', 'demo.json'), JSON.stringify({ versions: [{ id: 'v1' }, { id: 'v2' }] }))
})
afterEach(async () => {
  await rm(dir, { recursive: true, force: true })
})

describe('comments', () => {
  it('adds pending comments on the current version, based on the latest saved one', async () => {
    const c = await addComment(dir, 'demo', input())
    expect(c).toMatchObject({ status: 'pending', version: 'current', basedOn: 'v2', author: 'Bruno' })
    expect(await listComments(dir, 'demo')).toHaveLength(1)
  })

  it('keeps every comment when many arrive at once', async () => {
    await Promise.all(Array.from({ length: 10 }, (_, i) => addComment(dir, 'demo', input(`Comment ${i}`))))
    expect(await listComments(dir, 'demo')).toHaveLength(10)
  })

  it('resolves, reopens (clearing the note) and deletes', async () => {
    const c = await addComment(dir, 'demo', input())
    await updateComment(dir, 'demo', c.id, { status: 'done', agentNote: 'Shortened it.' })
    expect((await updateComment(dir, 'demo', c.id, { status: 'pending' })).agentNote).toBeUndefined()
    await removeComment(dir, 'demo', c.id)
    expect(await listComments(dir, 'demo')).toEqual([])
  })

  it('rejects empty text, bad statuses, unknown ids and unknown demos', async () => {
    await expect(addComment(dir, 'demo', input('  '))).rejects.toMatchObject({ status: 400 })
    const c = await addComment(dir, 'demo', input())
    await expect(updateComment(dir, 'demo', c.id, { status: 'nope' as never })).rejects.toMatchObject({ status: 400 })
    await expect(removeComment(dir, 'demo', 'missing')).rejects.toMatchObject({ status: 404 })
    await expect(listComments(dir, 'other')).rejects.toMatchObject({ status: 404 })
  })
})

describe('watch mode', () => {
  it('runs Haiku with file tools only, and denies edits outside the demo src', () => {
    const args = claudeArgs({ prompt: 'p', demoDir: '/r/demos/x', readDirs: ['/r/apps/playground/src', '/r/packages/components/src'] })
    expect(args.slice(0, 4)).toEqual(['-p', 'p', '--model', 'claude-haiku-4-5'])
    expect(args[args.indexOf('--allowedTools') + 1]).toBe('Read,Edit,Write,Glob,Grep')
    const deny: string[] = JSON.parse(args[args.indexOf('--settings') + 1]).permissions.deny
    expect(deny).toContain('Edit(//r/apps/playground/src/**)')
    expect(deny).toContain('Write(//r/demos/x/versions/**)')
    expect(deny).toContain('Edit(//r/demos/x/comments.json)')
    expect(deny.some((d) => d.includes('/r/demos/x/src'))).toBe(false)
  })

  it('fills the prompt template', () => {
    expect(renderPrompt('Do "{{comment}}" in {{slug}}{{missing}}', { comment: 'this', slug: 'x' })).toBe('Do "this" in x')
  })

  it('works through pending comments oldest first, one at a time, and marks them done or failed', async () => {
    await mkdir(join(dir, 'engines', 'watch-mode'), { recursive: true })
    await writeFile(join(dir, 'engines', 'watch-mode', 'prompt.md'), '{{comment}}')
    const seen: string[] = []
    const run: Runner = async (args) => {
      const prompt = args[1]
      seen.push(prompt)
      return prompt === 'Impossible' ? { ok: false, message: 'No component for that.' } : { ok: true, message: `Did: ${prompt}`, costUsd: 0.01 }
    }
    const a = await addComment(dir, 'demo', input('First'), new Date('2026-10-01T10:00:00Z'))
    const b = await addComment(dir, 'demo', input('Impossible'), new Date('2026-10-01T10:01:00Z'))
    const engine = createWatchEngine({ dir, repoRoot: dir, log: { info() {}, warn() {} }, run, intervalMs: 50 })
    expect(engine.state('demo').on).toBe(false)
    await engine.set('demo', true)
    await expect.poll(async () => (await listComments(dir, 'demo')).map((c) => c.status), { timeout: 3000 }).toEqual(['done', 'failed'])
    engine.close()
    expect(seen).toEqual(['First', 'Impossible'])
    const [done, failed] = await listComments(dir, 'demo')
    expect(done).toMatchObject({ id: a.id, agentNote: 'Did: First (Haiku, $0.010)' })
    expect(failed).toMatchObject({ id: b.id, agentNote: 'No component for that.' })
  })

  it('gives Haiku one more go when the change does not build, then fails with the error', async () => {
    await mkdir(join(dir, 'engines', 'watch-mode'), { recursive: true })
    await writeFile(join(dir, 'engines', 'watch-mode', 'prompt.md'), '{{comment}}')
    const prompts: string[] = []
    const run: Runner = async (args) => (prompts.push(args[1]), { ok: true, message: 'Changed it.', costUsd: 0.05 })
    let checks = 0
    const check = async () => (++checks === 1 ? 'PeoplePage.tsx: Failed to resolve import' : null)
    await addComment(dir, 'demo', input('Fix me'))
    const engine = createWatchEngine({ dir, repoRoot: dir, log: { info() {}, warn() {} }, run, check, intervalMs: 50 })
    await engine.set('demo', true)
    await expect.poll(async () => (await listComments(dir, 'demo'))[0].status, { timeout: 3000 }).toBe('done')
    engine.close()
    expect(prompts).toHaveLength(2)
    expect(prompts[1]).toContain('Failed to resolve import')
    expect((await listComments(dir, 'demo'))[0].agentNote).toBe('Changed it. (Haiku, $0.100)')

    // Still broken after the retry: failed, with the build error.
    const stillBroken = async () => 'index.tsx: Failed to resolve import'
    await addComment(dir, 'demo', input('Break me'))
    const engine2 = createWatchEngine({ dir, repoRoot: dir, log: { info() {}, warn() {} }, run, check: stillBroken, intervalMs: 50 })
    await engine2.set('demo', true)
    await expect.poll(async () => (await listComments(dir, 'demo'))[1].status, { timeout: 3000 }).toBe('failed')
    engine2.close()
    expect((await listComments(dir, 'demo'))[1].agentNote).toContain("The change doesn't build: index.tsx")
  })

  it('does nothing while off', async () => {
    let calls = 0
    const engine = createWatchEngine({ dir, repoRoot: dir, log: { info() {}, warn() {} }, run: async () => (calls++, { ok: true, message: '' }), intervalMs: 20 })
    await addComment(dir, 'demo', input())
    await new Promise((r) => setTimeout(r, 120))
    engine.close()
    expect(calls).toBe(0)
  })
})
