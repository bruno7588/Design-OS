import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { COMMENT_STATUSES, type CommentStatus, type DemoComment, type DemoMeta, type NewComment } from '@design-os/demos'
import { DemoError, demoFolder } from './demos'

// Comments on a demo's working copy: demos/<slug>/comments.json. Writes to one demo run one at
// a time (the viewer, the demo frame and watch mode can all write at once).

const queues = new Map<string, Promise<unknown>>()

function serial<T>(key: string, job: () => Promise<T>): Promise<T> {
  const run = (queues.get(key) ?? Promise.resolve()).then(job, job)
  queues.set(
    key,
    run.catch(() => {}),
  )
  return run
}

const file = (dir: string, slug: string) => join(demoFolder(dir, slug), 'comments.json')

export async function listComments(dir: string, slug: string): Promise<DemoComment[]> {
  if (!existsSync(join(demoFolder(dir, slug), 'demo.json'))) throw new DemoError(404, `There's no demo called ${slug}.`)
  try {
    return JSON.parse(await readFile(file(dir, slug), 'utf8')).comments ?? []
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw new DemoError(500, `${slug}/comments.json isn't valid JSON.`)
  }
}

async function save(dir: string, slug: string, comments: DemoComment[]) {
  const path = file(dir, slug)
  await writeFile(`${path}.tmp`, JSON.stringify({ comments }, null, 2) + '\n')
  await rename(`${path}.tmp`, path)
}

function mutate<T>(dir: string, slug: string, change: (comments: DemoComment[]) => T): Promise<T> {
  return serial(`${dir}/${slug}`, async () => {
    const comments = await listComments(dir, slug)
    const result = change(comments)
    await save(dir, slug, comments)
    return result
  })
}

function check(input: NewComment) {
  if (!input?.text?.trim()) throw new DemoError(400, 'A comment needs some text.')
  if (!input.author?.trim()) throw new DemoError(400, 'A comment needs an author.')
  if (!input.selector || !input.path?.startsWith('/')) throw new DemoError(400, 'A comment needs the element it points at.')
}

export async function addComment(dir: string, slug: string, input: NewComment, now = new Date()): Promise<DemoComment> {
  check(input)
  const meta: DemoMeta = JSON.parse(await readFile(join(demoFolder(dir, slug), 'demo.json'), 'utf8').catch(() => '{"versions":[]}'))
  const stamp = now.toISOString()
  const comment: DemoComment = {
    id: randomUUID().slice(0, 8),
    text: input.text.trim(),
    author: input.author.trim(),
    createdAt: stamp,
    updatedAt: stamp,
    version: 'current',
    basedOn: meta.versions.at(-1)?.id ?? null,
    path: input.path,
    selector: input.selector,
    element: input.element ?? { tag: 'div' },
    x: clamp01(input.x),
    y: clamp01(input.y),
    status: 'pending',
  }
  return mutate(dir, slug, (comments) => {
    comments.push(comment)
    return comment
  })
}

const clamp01 = (n: number) => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.5)

export async function updateComment(
  dir: string,
  slug: string,
  id: string,
  patch: { status?: CommentStatus; text?: string; agentNote?: string },
  now = new Date(),
): Promise<DemoComment> {
  if (patch.status && !COMMENT_STATUSES.includes(patch.status)) throw new DemoError(400, `"${patch.status}" isn't a comment status.`)
  if (patch.text !== undefined && !patch.text.trim()) throw new DemoError(400, 'A comment needs some text.')
  return mutate(dir, slug, (comments) => {
    const c = comments.find((x) => x.id === id)
    if (!c) throw new DemoError(404, `There's no comment ${id} on ${slug}.`)
    if (patch.status) c.status = patch.status
    if (patch.text !== undefined) c.text = patch.text.trim()
    if (patch.agentNote !== undefined) c.agentNote = patch.agentNote
    // Reopening clears what watch mode said last time.
    if (patch.status === 'pending' && patch.agentNote === undefined) delete c.agentNote
    c.updatedAt = now.toISOString()
    return { ...c }
  })
}

export async function removeComment(dir: string, slug: string, id: string) {
  return mutate(dir, slug, (comments) => {
    const i = comments.findIndex((x) => x.id === id)
    if (i < 0) throw new DemoError(404, `There's no comment ${id} on ${slug}.`)
    comments.splice(i, 1)
  })
}
