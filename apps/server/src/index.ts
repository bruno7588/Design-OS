import Fastify from 'fastify'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Local-only server for things the browser can't do (terminal, files, headless Claude).
const configPath = fileURLToPath(new URL('../../../design-os.config.json', import.meta.url))
const config = JSON.parse(readFileSync(configPath, 'utf8'))
const { host, port } = config.server

const app = Fastify({ logger: true })

app.get('/api/health', async () => ({ status: 'ok' }))

await app.listen({ host, port })
