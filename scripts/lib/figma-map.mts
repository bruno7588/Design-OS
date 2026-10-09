// The component map (Phase 4e): which Library instance stands for each code component, and
// how its props become variant values. Used by scripts/figma-map.mts (to write figma-map.json)
// and scripts/figma-script.mts (to place instances).

export interface CodeMap {
  kind: 'leaf' | 'container'
  match?: string
  fixed?: Record<string, string>
  props?: Record<string, { figma: string; values: Record<string, string> }>
  domRoot?: string
}

export interface Mapping {
  component: string
  mui: string
  page: string
  set: string
  nodes: { light: string; dark: string }
  variants: Record<string, readonly string[]>
  map?: CodeMap
}

/** One item of figma.json (written by the component-inventory skill). */
export interface FigmaItem {
  name: string
  id: string
  type: 'set' | 'component'
  key?: string
  variants?: Record<string, string[]>
}

export interface FigmaVariable {
  name: string
  key: string
  collection: string
  type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN'
  scopes: string[]
  /** Resolved value per mode name: a colour as #rrggbbaa, a number, or a string. */
  values: Record<string, string | number | boolean>
}

export interface FigmaTextStyle {
  name: string
  key: string
  family: string
  style: string
  size: number
  /** Line height in px, or null for auto. */
  lineHeight: number | null
}

export interface FigmaJson {
  fileKey: string
  fetchedAt?: string
  pages: { page: string; pageId?: string; items: FigmaItem[] }[]
  variables?: FigmaVariable[]
  textStyles?: FigmaTextStyle[]
}

export interface MapEntry {
  /** The React component name the capture looks for. */
  match: string
  component: string
  page: string
  set: string
  kind: 'leaf' | 'container'
  fixed: Record<string, string>
  props: Record<string, { figma: string; values: Record<string, string> }>
  domRoot?: string
  /** Library keys per mode; null until the Library read records keys. */
  keys: { dark: string | null; light: string | null }
  /** The node is a set (import with importComponentSetByKeyAsync) or a single component. */
  type: 'set' | 'component' | null
  variants: Record<string, string[]>
}

export interface FigmaMap {
  generatedAt: string
  fileKey: string
  libraryReadAt: string | null
  /** False until the Library read has recorded component keys. */
  hasKeys: boolean
  leaves: Record<string, MapEntry>
  containers: string[]
  /** Code components with a Figma set but no machine-readable map yet. */
  notMapped: string[]
  /** Mapped components whose Figma node isn't in figma.json any more. */
  missingInFigma: string[]
  /** Figma properties a map sets that the set doesn't have, or values it doesn't offer. */
  problems: string[]
  variables: FigmaVariable[]
  textStyles: FigmaTextStyle[]
}

export function buildFigmaMap(figma: FigmaJson, mappings: Mapping[], now = new Date()): FigmaMap {
  const byId = new Map<string, FigmaItem>()
  for (const p of figma.pages) for (const it of p.items) byId.set(it.id, it)

  const out: FigmaMap = {
    generatedAt: now.toISOString(),
    fileKey: figma.fileKey,
    libraryReadAt: figma.fetchedAt ?? null,
    hasKeys: false,
    leaves: {},
    containers: [],
    notMapped: [],
    missingInFigma: [],
    problems: [],
    variables: figma.variables ?? [],
    textStyles: figma.textStyles ?? [],
  }

  for (const m of mappings) {
    if (!m.map) {
      out.notMapped.push(`${m.component} (${m.set})`)
      continue
    }
    if (m.map.kind === 'container') {
      out.containers.push(m.map.match ?? m.component)
      continue
    }
    const dark = byId.get(m.nodes.dark)
    const light = byId.get(m.nodes.light)
    const item = dark ?? light
    if (!item) {
      out.missingInFigma.push(`${m.component} (${m.set})`)
      continue
    }
    const variants = item.variants ?? {}
    const check = (prop: string, value: string) => {
      if (!(prop in variants)) out.problems.push(`${m.component}: Figma "${m.set}" has no property "${prop}"`)
      else if (!variants[prop].includes(value)) out.problems.push(`${m.component}: "${m.set}" ${prop} has no value "${value}"`)
    }
    for (const [prop, value] of Object.entries(m.map.fixed ?? {})) check(prop, value)
    for (const p of Object.values(m.map.props ?? {})) for (const v of new Set(Object.values(p.values))) check(p.figma, v)

    const match = m.map.match ?? m.component
    out.leaves[match] = {
      match,
      component: m.component,
      page: m.page,
      set: m.set,
      kind: 'leaf',
      fixed: m.map.fixed ?? {},
      props: m.map.props ?? {},
      domRoot: m.map.domRoot,
      // A light "copy" is its own set; a light "instance" board isn't a component, so the dark set
      // is used in Light mode.
      keys: { dark: dark?.key ?? null, light: (light?.key ?? dark?.key) ?? null },
      type: item.type ?? null,
      variants,
    }
  }
  out.hasKeys = Object.values(out.leaves).some((l) => l.keys.dark)
  return out
}

/** Code props → variant values, following the entry's fixed values and prop maps. */
export function resolveVariants(entry: Pick<MapEntry, 'fixed' | 'props'>, props: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = { ...entry.fixed }
  const asText = (v: unknown) => (v === undefined || v === null ? 'undefined' : typeof v === 'object' ? 'node' : String(v))
  for (const [key, map] of Object.entries(entry.props)) {
    const actual = key.split('|').map((k) => asText(props[k]))
    for (const [pattern, figmaValue] of Object.entries(map.values)) {
      const parts = pattern.split('|')
      const hit = pattern === '*' || (parts.length === actual.length && parts.every((p, i) => p === '*' || p === actual[i]))
      if (hit) {
        result[map.figma] = figmaValue
        break
      }
    }
  }
  return result
}
