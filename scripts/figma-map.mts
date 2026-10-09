// pnpm figma-map: writes packages/components/figma-map.json, the component map code-to-figma
// uses to place Library instances (Phase 4e). Joins the Library read (inventory/figma.json,
// written by the component-inventory skill: keys, variables, text styles) with the maps in each
// component's <name>.figma.ts. Re-run after every Library change, straight after pnpm inventory.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildFigmaMap, type FigmaJson, type Mapping } from './lib/figma-map.mts'

const root = fileURLToPath(new URL('..', import.meta.url))
const src = join(root, 'packages/components/src')
const figma: FigmaJson = JSON.parse(readFileSync(join(root, 'packages/components/inventory/figma.json'), 'utf8'))

const mappings: Mapping[] = []
for (const folder of readdirSync(src, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue
  for (const file of readdirSync(join(src, folder.name))) {
    if (!file.endsWith('.figma.ts')) continue
    const mod = await import(pathToFileURL(join(src, folder.name, file)).href)
    for (const value of Object.values(mod)) if (value && typeof value === 'object' && 'set' in value && 'page' in value) mappings.push(value as Mapping)
  }
}

const map = buildFigmaMap(figma, mappings)
writeFileSync(join(root, 'packages/components/figma-map.json'), JSON.stringify(map, null, 2) + '\n')

console.log(`figma-map.json: ${Object.keys(map.leaves).length} components placed as instances, ${map.containers.length} rebuilt as frames.`)
if (!map.hasKeys) console.log('No component keys yet: run the component-inventory skill (Library read with keys) first.')
if (!map.variables.length) console.log('No variables or text styles yet: the Library read records them too.')
for (const [label, list] of [['Not mapped yet', map.notMapped], ['Missing in Figma', map.missingInFigma], ['Problems', map.problems]] as const)
  if (list.length) console.log(`\n${label} (${list.length}):\n  ${list.join('\n  ')}`)
