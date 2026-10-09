// pnpm figma-script <slug> [--version vN] [--page <figma page id>]: turns a demo's capture
// (pnpm capture-demo) into what code-to-figma runs in Figma (Phase 4e).
//   Without --page: 00-setup.js, which creates the page "<Demo> · <version>" (a numbered copy if
//   the name is taken; it never edits other pages), one section per flow with its description,
//   a note under each screen slot and arrows between steps. It returns the new page's id.
//   With --page, also:
//     payload/*.png       the runtime and each screen's data, as 1×1 PNGs (scripts/lib/payload-png.mts)
//     01-targets.js       makes one hidden "__payload:<name>" rectangle per PNG; upload each PNG
//                         onto its rectangle with upload_assets (nodeIds in manifest order)
//     NN-NN-<step>.js     tiny loaders: read the runtime and the screen's data, build the screen
//     99-cleanup.js       removes the payload rectangles
// Output: demos/<slug>/figma-export/<version>/scripts/ and manifest.json (the order to run them).

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'
import type { ScreenNode } from './lib/capture-dom.mts'
import { resolveVariants, type FigmaMap } from './lib/figma-map.mts'
import { buildLookups, layoutFor } from './lib/figma-script.mts'
import { READ_PAYLOAD, asciiJson, payloadPng } from './lib/payload-png.mts'

const root = fileURLToPath(new URL('..', import.meta.url))
const { values, positionals } = parseArgs({ allowPositionals: true, options: { version: { type: 'string' }, page: { type: 'string' } } })
const slug = positionals[0]
if (!slug) throw new Error('Usage: pnpm figma-script <slug> [--version vN] [--page <id>]')
const config = JSON.parse(readFileSync(join(root, 'design-os.config.json'), 'utf8'))
const demoDir = join(root, config.playground.dir, 'demos', slug)
const demo = JSON.parse(readFileSync(join(demoDir, 'demo.json'), 'utf8'))
const version: string = values.version ?? demo.versions.at(-1)?.id ?? 'current'
const exportDir = join(demoDir, 'figma-export', version)
const capture = JSON.parse(readFileSync(join(exportDir, 'capture.json'), 'utf8'))
const map: FigmaMap = JSON.parse(readFileSync(join(root, 'packages/components/figma-map.json'), 'utf8'))
const runtime = readFileSync(join(root, 'scripts/lib/figma-runtime.js'), 'utf8')
const SETUP = readFileSync(join(root, 'scripts/lib/figma-setup.js'), 'utf8')
const scriptsDir = join(exportDir, 'scripts')
const payloadDir = join(scriptsDir, 'payload')
rmSync(scriptsDir, { recursive: true, force: true })
mkdirSync(payloadDir, { recursive: true })

const lookups = buildLookups(map, capture.mode)
const layout = layoutFor(capture.flows.map((f: { steps: unknown[] }) => f.steps.length), capture.viewport)
const pageName = `${demo.name} · ${version === 'current' ? 'current' : version}`
type Step = { title: string; note: string; file: string }
type Flow = { id: string; name: string; goal: string; user: string; entry: string; success: string; steps: Step[] }
const flows: Flow[] = capture.flows

// 1. The setup script: page, sections, descriptions, notes, arrows.
const setupData = {
  pageName,
  layout,
  flows: flows.map((f) => ({
    name: f.name,
    description: [`Goal: ${f.goal}`, `User: ${f.user}`, `Entry point: ${f.entry}`, `Success: ${f.success}`].join('\n'),
    steps: f.steps.map((s, i) => ({ title: `${i + 1}. ${s.title}`, note: s.note })),
  })),
  source: `Design OS demo ${slug} ${version}, captured ${capture.capturedAt} in ${capture.mode} mode.`,
}
writeFileSync(join(scriptsDir, '00-setup.js'), `const D = ${JSON.stringify(setupData)}\n${SETUP}`)
type Entry = { file: string; flow?: string; step?: string; payload?: string }
const manifest: Entry[] = [{ file: '00-setup.js' }]
const payloads: string[] = []

if (values.page) {
  // Images: fetched once from the playground and embedded (Figma can't reach localhost).
  const images: Record<string, { base64?: string; svg?: string }> = {}
  const photoOf = (n: ScreenNode) => (n.kind === 'instance' && typeof n.props.src === 'string' && n.props.src ? new URL(n.props.src, config.playground.url).href : undefined)
  const collect = (n: ScreenNode) => {
    if (n.kind === 'image') images[n.src] = {}
    if (n.kind === 'frame') n.children.forEach(collect)
    if (n.kind === 'instance') {
      const photo = photoOf(n)
      if (photo) images[photo] = {}
      collect(n.fallback)
    }
  }
  const trees: Record<string, ScreenNode> = {}
  for (const f of flows) for (const s of f.steps) collect((trees[`${f.id}/${s.file}`] = JSON.parse(readFileSync(join(exportDir, f.id, `${s.file}.json`), 'utf8'))))
  for (const src of Object.keys(images)) {
    const r = await fetch(src).catch(() => null)
    if (!r?.ok) continue
    const type = r.headers.get('content-type') ?? ''
    images[src] = type.includes('svg') || src.endsWith('.svg') ? { svg: await r.text() } : { base64: Buffer.from(await r.arrayBuffer()).toString('base64') }
  }
  // Variants, worked out here from the component map.
  const withVariants = (n: ScreenNode): ScreenNode => {
    if (n.kind === 'instance') return { ...n, variants: map.leaves[n.component] ? resolveVariants(map.leaves[n.component], n.props) : {}, image: photoOf(n), fallback: withVariants(n.fallback) } as ScreenNode
    if (n.kind === 'frame') return { ...n, children: n.children.map(withVariants) }
    return n
  }

  writeFileSync(join(payloadDir, 'runtime.png'), payloadPng(runtime))
  payloads.push('runtime')

  flows.forEach((f, i) =>
    f.steps.forEach((s, j) => {
      const name = `${String(i + 1).padStart(2, '0')}-${String(j + 1).padStart(2, '0')}-${f.id}-${s.file.replace(/^\d+-/, '')}`
      const data = { ...lookups, images, pageId: values.page, section: f.name, title: `${j + 1}. ${s.title}`, at: layout.screen(i, j), tree: withVariants(trees[`${f.id}/${s.file}`]) }
      writeFileSync(join(payloadDir, `${name}.png`), payloadPng(asciiJson(data)))
      payloads.push(name)
      writeFileSync(
        join(scriptsDir, `${name}.js`),
        `const page = await figma.getNodeByIdAsync(${JSON.stringify(values.page)})
await figma.setCurrentPageAsync(page)
${READ_PAYLOAD}
const code = await readPayload(page, 'runtime')
const DATA = JSON.parse(await readPayload(page, ${JSON.stringify(name)}))
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
return await new AsyncFunction('figma', 'DATA', code + '\\nconst screen = await buildScreen()\\nreturn { screenId: screen.id, ...report, rawColours: Object.entries(report.rawColours).sort((a, b) => b[1] - a[1]) }')(figma, DATA)
`,
      )
      manifest.push({ file: `${name}.js`, flow: f.name, step: s.title })
    }),
  )

  writeFileSync(
    join(scriptsDir, '01-targets.js'),
    `const page = await figma.getNodeByIdAsync(${JSON.stringify(values.page)})
await figma.setCurrentPageAsync(page)
const names = ${JSON.stringify(payloads)}
const ids = []
for (const [i, name] of names.entries()) {
  let r = page.findOne((n) => n.name === '__payload:' + name)
  if (!r) {
    r = figma.createRectangle()
    page.appendChild(r)
    r.name = '__payload:' + name
    r.resize(1, 1)
    r.x = -4000
    r.y = 400 + i * 4
  }
  r.visible = false
  ids.push(r.id)
}
return { nodeIds: ids, names }
`,
  )
  manifest.splice(1, 0, { file: '01-targets.js' })
  writeFileSync(
    join(scriptsDir, '99-cleanup.js'),
    `const page = await figma.getNodeByIdAsync(${JSON.stringify(values.page)})
await figma.setCurrentPageAsync(page)
const removed = page.findAll((n) => n.name.startsWith('__payload:') || n.name === '__code-to-figma runtime').map((n) => { const id = n.id; n.locked = false; n.remove(); return id })
return { removedNodeIds: removed }
`,
  )
  manifest.push({ file: '99-cleanup.js' })
}
writeFileSync(join(scriptsDir, 'manifest.json'), JSON.stringify({ demo: slug, version, pageName, pageId: values.page ?? null, mode: capture.mode, hasKeys: map.hasKeys, payloads, scripts: manifest }, null, 2) + '\n')
console.log(
  values.page
    ? `${manifest.length} scripts and ${payloads.length} payload PNGs in ${scriptsDir}`
    : `00-setup.js in ${scriptsDir}\nRun it with use_figma, then run this again with --page <the id it returns>.`,
)
if (!map.hasKeys) console.log('No Library keys yet: instances will be built as "Not linked" frames, and nothing binds to variables.')
