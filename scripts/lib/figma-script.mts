// Lookups and layout for the use_figma scripts code-to-figma writes (scripts/figma-script.mts).

import type { FigmaMap, FigmaVariable } from './figma-map.mts'

const FILL = ['ALL_SCOPES', 'ALL_FILLS', 'FRAME_FILL', 'SHAPE_FILL']
const TEXT = ['ALL_SCOPES', 'ALL_FILLS', 'TEXT_FILL']
const STROKE = ['ALL_SCOPES', 'STROKE_COLOR']
const GAP = ['ALL_SCOPES', 'GAP', 'WIDTH_HEIGHT']
const RADIUS = ['ALL_SCOPES', 'CORNER_RADIUS']

/** The value a variable has in the demo's mode: the mode named Dark/Light, or its only mode. */
export function valueIn(v: FigmaVariable, mode: 'dark' | 'light') {
  const names = Object.keys(v.values)
  const name = names.find((n) => n.toLowerCase().includes(mode)) ?? (names.length === 1 ? names[0] : undefined)
  return name === undefined ? undefined : v.values[name]
}

// When several variables share a value, prefer the semantic one: a collection with Dark and
// Light modes, then the narrowest scopes.
// For each use, its own collection first (text from Text colours, fills and strokes from Surface
// colours), as the Library's own components do.
const rank = (v: FigmaVariable, prefer?: RegExp) =>
  (prefer && prefer.test(v.collection) ? 0 : 20) + (Object.keys(v.values).some((n) => /dark|light/i.test(n)) ? 0 : 10) + (v.scopes.includes('ALL_SCOPES') ? 5 : 0) + v.scopes.length

export function buildLookups(map: FigmaMap, mode: 'dark' | 'light') {
  const colours = { fill: {} as Record<string, string>, text: {} as Record<string, string>, stroke: {} as Record<string, string>, any: {} as Record<string, string> }
  const floats = { spacing: {} as Record<string, string>, radius: {} as Record<string, string> }
  const colour = (v: FigmaVariable) => {
    const value = valueIn(v, mode)
    if (v.type !== 'COLOR' || typeof value !== 'string') return null
    return value.toLowerCase().length === 7 ? value.toLowerCase() + 'ff' : value.toLowerCase()
  }
  const fillIn = (target: Record<string, string>, scopes: string[], prefer?: RegExp) => {
    for (const v of [...map.variables].sort((a, b) => rank(a, prefer) - rank(b, prefer))) {
      const hex = colour(v)
      if (hex && v.scopes.some((s) => scopes.includes(s))) target[hex] ??= v.key
    }
  }
  fillIn(colours.fill, FILL, /surface/i)
  fillIn(colours.text, TEXT, /text/i)
  fillIn(colours.stroke, STROKE, /surface/i)
  fillIn(colours.any, ['ALL_SCOPES', ...FILL, ...TEXT, ...STROKE], /surface|text/i)
  for (const v of [...map.variables].sort((a, b) => rank(a) - rank(b))) {
    const value = valueIn(v, mode)
    if (value === undefined || value === null) continue
    if (v.type === 'FLOAT' && typeof value === 'number') {
      if (v.scopes.some((s) => GAP.includes(s))) floats.spacing[String(value)] ??= v.key
      if (v.scopes.some((s) => RADIUS.includes(s))) floats.radius[String(value)] ??= v.key
    }
  }
  const instances: Record<string, { key: string | null; type: string | null }> = {}
  for (const [name, leaf] of Object.entries(map.leaves)) instances[name] = { key: leaf.keys[mode] ?? leaf.keys.dark, type: leaf.type }
  // Collections with Dark/Light modes: the screen frame is set to the demo's mode in each.
  const modes: { sampleKey: string; modeName: string }[] = []
  const seen = new Set<string>()
  for (const v of map.variables) {
    if (seen.has(v.collection)) continue
    const modeName = Object.keys(v.values).find((n) => n.toLowerCase().includes(mode))
    if (modeName) {
      seen.add(v.collection)
      modes.push({ sampleKey: v.key, modeName })
    }
  }
  const textStyles = map.textStyles.map((t) => ({ key: t.key, size: t.size, style: t.style, lineHeight: t.lineHeight }))
  return { colours, floats, instances, modes, textStyles }
}

/** Where everything goes on the page: one section per flow, screens left to right. */
export function layoutFor(stepsPerFlow: number[], viewport: { width: number; height: number }) {
  const pad = 120
  const gapX = 240
  const headerHeight = 360
  const noteHeight = 260
  const sectionHeight = headerHeight + viewport.height + noteHeight
  return {
    pad,
    gapX,
    headerHeight,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
    sectionHeight,
    flowStep: sectionHeight + 400,
    flows: stepsPerFlow.length,
    screen: (_flow: number, step: number) => ({ x: pad + step * (viewport.width + gapX), y: headerHeight }),
  }
}
