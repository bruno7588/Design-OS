import Fastify from 'fastify'
import { readFileSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Local-only server for things the browser can't do (terminal, files, headless Claude).
const configPath = fileURLToPath(new URL('../../../design-os.config.json', import.meta.url))
const config = JSON.parse(readFileSync(configPath, 'utf8'))
const { host, port } = config.server
const vaultPath: string = config.vaultPath.replace(/^~(?=\/|$)/, homedir())
// Home only reads files: skills and engines write them here (see docs/phase-3-notes.md).
const dashboardDir = join(vaultPath, '50 outputs', 'dashboard')
const vault = basename(vaultPath)

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

await app.listen({ host, port })
