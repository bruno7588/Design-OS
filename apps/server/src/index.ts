import Fastify from 'fastify'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CommentStatus, DemoList, NewComment } from '@design-os/demos'
import { addComment, listComments, removeComment, updateComment } from './comments'
import { DemoError, deleteDemo, demoFolder, duplicateDemo, listDemos, readDemo, readFeatures, saveVersion } from './demos'
import { createThumbnailer } from './thumbnails'
import { createWatchEngine, viteCheck } from './watch'

// Local-only server for things the browser can't do (terminal, files, headless Claude).
const configPath = fileURLToPath(new URL('../../../design-os.config.json', import.meta.url))
const config = JSON.parse(readFileSync(configPath, 'utf8'))
const { host, port } = config.server
const vaultPath: string = config.vaultPath.replace(/^~(?=\/|$)/, homedir())
// Home only reads files: skills and engines write them here (see docs/phase-3-notes.md).
const dashboardDir = join(vaultPath, '50 outputs', 'dashboard')
const vault = basename(vaultPath)
// Demos live in the playground app (Phase 4b); see apps/playground/demos/README.md.
const demosDir = fileURLToPath(new URL(`../../../${config.playground.dir}/demos`, import.meta.url))
const playgroundUrl: string = config.playground.url
const author: string = config.author
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url))

const app = Fastify({ logger: true })

app.get('/api/health', async () => ({ status: 'ok' }))

// One file from the dashboard folder: a plain name ending in .json or .md, nothing else.
app.get<{ Params: { file: string } }>('/api/dashboard/:file', async (req, reply) => {
  const { file } = req.params
  if (!/^[\w.-]+\.(json|md)$/.test(file) || file.startsWith('.')) {
    return reply.code(400).send({ error: 'Only .json and .md file names are allowed.' })
  }
  const path = join(dashboardDir, file)
  let text: string
  let updatedAt: string
  try {
    ;[text, updatedAt] = await Promise.all([readFile(path, 'utf8'), stat(path).then((s) => s.mtime.toISOString())])
  } catch {
    return reply.code(404).send({ error: `${file} isn't in the dashboard folder yet.` })
  }
  if (file.endsWith('.json')) {
    try {
      const data = JSON.parse(text)
      return { file, vault, updatedAt, sample: data?.sample === true, kind: 'json', data }
    } catch {
      return reply.code(500).send({ error: `${file} isn't valid JSON.` })
    }
  }
  // Markdown: drop the YAML frontmatter, which is for Obsidian, but keep its sample flag.
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  const sample = !!frontmatter && /^sample:\s*true\s*$/m.test(frontmatter[1])
  return { file, vault, updatedAt, sample, kind: 'markdown', body: frontmatter ? text.slice(frontmatter[0].length) : text }
})

// Demos: the Prototypes module's gallery, versions and duplicates.
const thumbnails = createThumbnailer({ dir: demosDir, playgroundUrl, log: app.log })

type SlugParams = { Params: { slug: string }; Querystring: { version?: string } }

app.setErrorHandler((error, _req, reply) => {
  if (error instanceof DemoError) return reply.code(error.status).send({ error: error.message })
  app.log.error(error)
  return reply.code(500).send({ error: 'Something went wrong on the Design OS server.' })
})

app.get('/api/demos', async (): Promise<DemoList> => ({
  demos: await listDemos(demosDir),
  features: await readFeatures(vaultPath),
  playgroundUrl,
}))

app.get<SlugParams>('/api/demos/:slug', async (req) => readDemo(demosDir, req.params.slug, req.query.version))

app.get<SlugParams>('/api/demos/:slug/thumbnail', async (req, reply) => {
  const path = join(demoFolder(demosDir, req.params.slug, req.query.version), 'thumbnail.png')
  if (!existsSync(path)) return reply.code(404).send({ error: 'No thumbnail yet.' })
  return reply.type('image/png').header('cache-control', 'no-cache').send(createReadStream(path))
})

app.post<SlugParams>('/api/demos/:slug/thumbnail', async (req) => ({ written: await thumbnails.shoot(req.params.slug) }))

app.post<SlugParams & { Body: { note?: string } }>('/api/demos/:slug/versions', async (req) =>
  saveVersion({ dir: demosDir, author }, req.params.slug, req.body?.note ?? ''),
)

app.post<SlugParams & { Body: { name: string; feature?: string; version?: string } }>('/api/demos/:slug/duplicate', async (req) => {
  const demo = await duplicateDemo({ dir: demosDir, author }, req.params.slug, req.body ?? { name: '' })
  thumbnails.schedule(demo.slug, 500)
  return demo
})

app.delete<SlugParams>('/api/demos/:slug', async (req) => {
  thumbnails.cancel(req.params.slug)
  await deleteDemo(demosDir, req.params.slug)
  return { deleted: req.params.slug }
})

// Comments on a demo's working copy, and watch mode (Phase 4c).
const watch = createWatchEngine({ dir: demosDir, repoRoot, log: app.log, check: viteCheck(demosDir, playgroundUrl) })
type CommentParams = { Params: { slug: string; id: string } }

app.get<SlugParams>('/api/demos/:slug/comments', async (req) => ({ comments: await listComments(demosDir, req.params.slug) }))

app.post<SlugParams & { Body: NewComment }>('/api/demos/:slug/comments', async (req) => {
  const comment = await addComment(demosDir, req.params.slug, req.body)
  watch.poke()
  return comment
})

app.patch<CommentParams & { Body: { status?: CommentStatus; text?: string } }>('/api/demos/:slug/comments/:id', async (req) => {
  const comment = await updateComment(demosDir, req.params.slug, req.params.id, { status: req.body?.status, text: req.body?.text })
  watch.poke()
  return comment
})

app.delete<CommentParams>('/api/demos/:slug/comments/:id', async (req) => {
  await removeComment(demosDir, req.params.slug, req.params.id)
  return { deleted: req.params.id }
})

app.get<SlugParams>('/api/demos/:slug/watch', async (req) => {
  await listComments(demosDir, req.params.slug) // 404 for an unknown demo
  return watch.state(req.params.slug)
})

app.put<SlugParams & { Body: { on: boolean } }>('/api/demos/:slug/watch', async (req) => watch.set(req.params.slug, !!req.body?.on))

app.addHook('onClose', async () => {
  watch.close()
  await thumbnails.close()
})

await app.listen({ host, port })
thumbnails.watch()
void thumbnails.fillMissing()
