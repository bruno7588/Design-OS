// pnpm upload-payloads <slug> [--version vN] [--only a,b] <submitUrl>...: posts a demo's payload PNGs (from
// pnpm figma-script) to the upload URLs the Figma connector's upload_assets returned, in the
// manifest's payload order (the same order as the nodeIds passed to upload_assets). --only
// re-uploads some of them, such as `runtime` after a runtime fix, in the order given.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const { values, positionals } = parseArgs({ allowPositionals: true, options: { version: { type: 'string' }, only: { type: 'string' } } })
const [slug, ...urls] = positionals
const config = JSON.parse(readFileSync(join(root, 'design-os.config.json'), 'utf8'))
const demoDir = join(root, config.playground.dir, 'demos', slug)
const demo = JSON.parse(readFileSync(join(demoDir, 'demo.json'), 'utf8'))
const version: string = values.version ?? demo.versions.at(-1)?.id ?? 'current'
const scripts = join(demoDir, 'figma-export', version, 'scripts')
const manifest: { payloads: string[] } = JSON.parse(readFileSync(join(scripts, 'manifest.json'), 'utf8'))
const payloads = values.only ? values.only.split(',') : manifest.payloads
const unknown = payloads.filter((p) => !manifest.payloads.includes(p))
if (unknown.length) throw new Error(`No payload named ${unknown.join(', ')}.`)
if (urls.length !== payloads.length) throw new Error(`Expected ${payloads.length} upload URLs (${payloads.join(', ')}), got ${urls.length}.`)

const results = await Promise.all(
  payloads.map(async (name: string, i: number) => {
    const r = await fetch(urls[i], { method: 'POST', headers: { 'content-type': 'image/png' }, body: readFileSync(join(scripts, 'payload', `${name}.png`)) })
    const body = await r.json().catch(() => ({}))
    return `${body.success ? 'ok ' : 'FAILED'} ${name} → ${body.placedOnNodeId ?? body.error ?? r.status}`
  }),
)
console.log(results.join('\n'))
if (results.some((r) => r.startsWith('FAILED'))) process.exit(1)
