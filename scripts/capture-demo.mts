// pnpm capture-demo <slug> [--version vN] [--mode dark|light]: runs a demo's flows
// (demos/<slug>/flows.json) in the running playground and captures every step at 1440×900: a
// screenshot and a screen tree (scripts/lib/capture-dom.mts) for code-to-figma (Phase 4e).
// Needs pnpm dev. Output: demos/<slug>/figma-export/<version>/ (git-ignored).

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'
import { chromium, type Locator, type Page } from '@playwright/test'
import { extractScreen, simplify, summarise, type Leaf } from './lib/capture-dom.mts'

const root = fileURLToPath(new URL('..', import.meta.url))
const { values, positionals } = parseArgs({ allowPositionals: true, options: { version: { type: 'string' }, mode: { type: 'string', default: 'dark' } } })
const slug = positionals[0]
if (!slug) throw new Error('Usage: pnpm capture-demo <slug> [--version vN] [--mode dark|light]')
const mode = values.mode === 'light' ? 'light' : 'dark'
const config = JSON.parse(readFileSync(join(root, 'design-os.config.json'), 'utf8'))
const demoDir = join(root, config.playground.dir, 'demos', slug)
const demo = JSON.parse(readFileSync(join(demoDir, 'demo.json'), 'utf8'))
const version: string = values.version ?? demo.versions.at(-1)?.id ?? 'current'
const flows = JSON.parse(readFileSync(join(demoDir, 'flows.json'), 'utf8'))
const map = JSON.parse(readFileSync(join(root, 'packages/components/figma-map.json'), 'utf8'))
const leaves: Leaf[] = Object.values(map.leaves as Record<string, Leaf>).map((l) => ({ match: l.match, domRoot: l.domRoot }))
const base = `${config.playground.url}/demos/${slug}${version === 'current' ? '' : `/v/${version}`}`
const out = join(demoDir, 'figma-export', version)

// exact: false matches part of the name, such as a tab with a count ("Deactivated 27").
type Target = { role?: string; name?: string; exact?: boolean; text?: string; within?: Target }
type Action = { goto: string } | { click: Target } | { fill: Target & { value: string } } | { press: string } | { waitFor: Target } | { wait: number }

function locate(page: Page, t: Target): Locator {
  const scope: Page | Locator = t.within ? locate(page, t.within) : page
  if (t.text) return scope.getByText(t.text, { exact: false }).first()
  return scope.getByRole(t.role as Parameters<Page['getByRole']>[0], t.name ? { name: t.name, exact: t.exact ?? true } : {}).first()
}

async function run(page: Page, a: Action) {
  if ('goto' in a) await page.goto(base + a.goto, { waitUntil: 'networkidle' })
  else if ('click' in a) await locate(page, a.click).click()
  else if ('fill' in a) await locate(page, a.fill).fill(a.fill.value)
  else if ('press' in a) await page.keyboard.press(a.press)
  else if ('waitFor' in a) await locate(page, a.waitFor).waitFor({ state: 'visible', timeout: 10_000 })
  else if ('wait' in a) await page.waitForTimeout(a.wait)
}

const stepSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const { width, height } = flows.viewport ?? { width: 1440, height: 900 }
const index = { demo: { slug, name: demo.name, platform: demo.platform, version }, mode, viewport: { width, height }, capturedAt: new Date().toISOString(), flows: [] as unknown[] }

for (const flow of flows.flows) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  await context.addInitScript((m) => {
    localStorage.setItem('design-os-mode', m)
    ;(window as unknown as { __designOsThumbnail: boolean }).__designOsThumbnail = true // no comment pins
  }, mode)
  const page = await context.newPage()
  const steps = []
  mkdirSync(join(out, flow.id), { recursive: true })
  for (const [i, step] of flow.steps.entries()) {
    for (const action of step.actions) await run(page, action)
    await page.waitForTimeout(500) // let transitions finish
    await page.evaluate(() => document.fonts.ready)
    const file = `${String(i + 1).padStart(2, '0')}-${stepSlug(step.title)}`
    await page.screenshot({ path: join(out, flow.id, `${file}.png`), animations: 'disabled' })
    const tree = simplify(await page.evaluate(extractScreen, { leaves, width, height, skip: '[data-design-os-comments]' }))
    writeFileSync(join(out, flow.id, `${file}.json`), JSON.stringify(tree))
    const sum = summarise(tree)
    steps.push({ title: step.title, note: step.note, file, summary: sum })
    console.log(`${flow.name} › ${step.title}: ${sum.frames} frames, ${sum.texts} texts, ${Object.values(sum.instances).reduce((a, b) => a + b, 0)} instances, ${sum.icons} icons`)
  }
  index.flows.push({ id: flow.id, name: flow.name, goal: flow.goal, user: flow.user, entry: flow.entry, success: flow.success, steps })
  await context.close()
}
await browser.close()
writeFileSync(join(out, 'capture.json'), JSON.stringify(index, null, 2) + '\n')
console.log(`\nCaptured ${index.flows.length} flows into ${out}`)
