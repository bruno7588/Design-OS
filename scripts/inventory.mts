// pnpm inventory: merges the Figma list (packages/components/inventory/figma.json,
// written by the component-inventory skill) with what exists in code
// (packages/components/src/*/*.figma.ts) and in the prototype (playground/src/components).
// Writes packages/components/inventory/inventory.json. Needs no Figma access.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { FigmaMapping } from '../packages/components/src/figma.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const dir = join(root, 'packages/components/inventory')
const src = join(root, 'packages/components/src')
const prototypeDir = join(root, 'playground/src/components')

type Variants = Record<string, string[]>
// light: how the item's light version exists. 'copy' (a second set, on a Light-mode board),
// 'instance' (an instance on a board set to the Light variable modes), or 'none'.
type Light = 'copy' | 'instance' | 'none' | 'light only'
interface FigmaItem { name: string; id: string; type: 'set' | 'component'; variants?: Variants; props?: string[]; light?: Light }
interface FigmaFile { fileKey: string; fetchedAt: string; pages: { page: string; pageId: string; items: FigmaItem[] }[] }

const figma: FigmaFile = JSON.parse(readFileSync(join(dir, 'figma.json'), 'utf8'))

// Code side: every <name>.figma.ts in a component folder.
const mappings: { mapping: FigmaMapping; path: string }[] = []
for (const folder of readdirSync(src, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue
  for (const file of readdirSync(join(src, folder.name))) {
    if (!file.endsWith('.figma.ts')) continue
    const mod = await import(pathToFileURL(join(src, folder.name, file)).href)
    for (const value of Object.values(mod)) {
      if (value && typeof value === 'object' && 'set' in value && 'page' in value) {
        mappings.push({ mapping: value as FigmaMapping, path: relative(root, join(src, folder.name)) })
      }
    }
  }
}

// Prototype side: a hint only. Folder names compared loosely, plus a few known aliases.
const prototypeFolders = existsSync(prototypeDir)
  ? readdirSync(prototypeDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
  : []
const ALIASES: Record<string, string> = {
  'radio-button instances': 'Radio',
  'Input field/Integer': 'InputInteger',
  'Input field/Outlined': 'InputField',
  'Top Nav/Admin': 'TopNav',
}
const loose = (s: string) => s.toLowerCase().replace(/instances/g, '').replace(/[^a-z0-9]/g, '')
function prototypeFor(name: string) {
  if (ALIASES[name]) return prototypeFolders.includes(ALIASES[name]) ? ALIASES[name] : null
  const key = loose(name)
  return prototypeFolders.find((f) => [key, key.replace(/s$/, '')].includes(loose(f))) ?? null
}

const sameVariants = (a?: Variants, b?: Variants) =>
  JSON.stringify(Object.entries(a ?? {}).map(([k, v]) => [k, [...v].sort()]).sort()) ===
  JSON.stringify(Object.entries(b ?? {}).map(([k, v]) => [k, [...v].sort()]).sort())

function diff(from: Variants, to: Record<string, readonly string[]>) {
  const missing: Variants = {}
  for (const [prop, values] of Object.entries(from)) {
    const gone = values.filter((v) => !(to[prop] ?? []).includes(v))
    if (gone.length) missing[prop] = gone
  }
  return missing
}

// Figma side: merge the light and dark copies of each set (same page, same name).
const rows = []
const matched = new Set<FigmaMapping>()
for (const { page, pageId, items } of figma.pages) {
  const groups = new Map<string, FigmaItem[]>()
  for (const item of items) {
    const key = item.name.trim().toLowerCase()
    groups.set(key, [...(groups.get(key) ?? []), item])
  }
  for (const copies of groups.values()) {
    const first = copies[0]
    const variants: Variants = {}
    for (const c of copies)
      for (const [k, v] of Object.entries(c.variants ?? {})) variants[k] = [...new Set([...(variants[k] ?? []), ...v])]
    const code = mappings.find((m) => m.mapping.page === page && m.mapping.set === first.name)
    if (code) matched.add(code.mapping)
    rows.push({
      name: first.name.trim(),
      page,
      pageId,
      type: first.type,
      nodes: copies.map((c) => c.id),
      copiesDiffer: copies.some((c) => !sameVariants(c.variants, first.variants)),
      // Every component needs a dark and a light version (Bruno, 2026-09-29).
      lightVersion: (copies.length > 1 ? 'copy' : (first.light ?? 'unknown')) as Light | 'unknown',
      namesDiffer: new Set(copies.map((c) => c.name.trim())).size > 1,
      variants,
      slots: first.props ?? [],
      inFigma: true,
      inCode: Boolean(code),
      code: code ? { component: code.mapping.component, mui: code.mapping.mui, path: code.path } : null,
      prototype: prototypeFor(first.name.trim()),
      missingInCode: code ? diff(variants, code.mapping.variants) : null,
      missingInFigma: code ? diff({ ...code.mapping.variants } as Variants, variants) : null,
    })
  }
}

// Code only: mappings with no Figma set of that name.
for (const { mapping, path } of mappings) {
  if (matched.has(mapping)) continue
  rows.push({
    name: mapping.set, page: mapping.page, pageId: null, type: 'set', nodes: [], copiesDiffer: false,
    lightVersion: 'unknown', namesDiffer: false,
    variants: {}, slots: [], inFigma: false, inCode: true,
    code: { component: mapping.component, mui: mapping.mui, path }, prototype: prototypeFor(mapping.set),
    missingInCode: null, missingInFigma: { ...mapping.variants },
  })
}

const summary = {
  inFigma: rows.filter((r) => r.inFigma).length,
  inCode: rows.filter((r) => r.inCode).length,
  both: rows.filter((r) => r.inFigma && r.inCode).length,
  figmaOnly: rows.filter((r) => r.inFigma && !r.inCode).length,
  codeOnly: rows.filter((r) => !r.inFigma && r.inCode).length,
  noLightVersion: rows.filter((r) => r.inFigma && !['copy', 'instance'].includes(r.lightVersion)).length,
}

const out = { fileKey: figma.fileKey, figmaFetchedAt: figma.fetchedAt, summary, rows }
writeFileSync(join(dir, 'inventory.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`inventory.json: ${rows.length} components.`, summary)
