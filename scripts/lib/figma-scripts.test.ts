import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { simplify, summarise, type ScreenNode } from './capture-dom.mts'
import { buildLookups, layoutFor, valueIn } from './figma-script.mts'
import type { FigmaMap } from './figma-map.mts'

// The use_figma runtime (figma-runtime.js) run against a small fake of the Figma plugin API, so
// its logic is checked without Figma: what it creates, what it links, binds and reports.

const runtime = readFileSync(join(fileURLToPath(new URL('.', import.meta.url)), 'figma-runtime.js'), 'utf8')

class FakeNode {
  children: FakeNode[] = []
  parent: FakeNode | null = null
  x = 0
  y = 0
  width = 100
  height = 100
  visible = true
  characters = ''
  layoutMode = 'NONE'
  layoutPositioning = 'AUTO'
  bound: Record<string, string> = {}
  modes: Record<string, string> = {}
  props: Record<string, string> = {};
  [k: string]: unknown
  constructor(
    public type: string,
    public id: string,
  ) {}
  appendChild(c: FakeNode) {
    c.parent = this
    this.children.push(c)
  }
  resize(w: number, h: number) {
    this.width = w
    this.height = h
  }
  findOne(fn: (n: FakeNode) => boolean): FakeNode | null {
    for (const c of this.children) {
      if (fn(c)) return c
      const d = c.findOne(fn)
      if (d) return d
    }
    return null
  }
  findAll(fn: (n: FakeNode) => boolean): FakeNode[] {
    return this.children.flatMap((c) => [...(fn(c) ? [c] : []), ...c.findAll(fn)])
  }
  setBoundVariable(field: string, v: { key: string }) {
    this.bound[field] = v.key
  }
  setExplicitVariableModeForCollection(c: { id: string }, modeId: string) {
    this.modes[c.id] = modeId
  }
  getStyledTextSegments() {
    return [{ fontName: { family: 'Poppins', style: 'Regular' } }]
  }
  async setTextStyleIdAsync(id: string) {
    this.textStyleId = id
  }
  setProperties(p: Record<string, string>) {
    if (Object.values(p).includes('Impossible')) throw new Error('no such variant')
    this.props = p
  }
}

function fakeFigma(opts: { keys: boolean }) {
  let n = 0
  const make = (type: string) => new FakeNode(type, `${type}:${++n}`)
  const page = make('PAGE')
  const section = make('SECTION')
  section.name = 'Deactivate one person'
  page.appendChild(section)
  const nodes = new Map([[page.id, page]])
  const component = () => {
    const main = make('COMPONENT')
    main.createInstance = () => {
      const inst = make('INSTANCE')
      const label = make('TEXT')
      inst.appendChild(label)
      return inst
    }
    const set = make('COMPONENT_SET')
    set.defaultVariant = main
    return set
  }
  // Like Figma, imported nodes throw when an unknown property is read.
  const strict = <T extends object>(node: T) => new Proxy(node, { get: (t, k) => { if (typeof k === 'string' && k !== 'then' && !(k in t)) throw new Error(`no such property '${k}'`); return (t as Record<string, unknown>)[k as string] } })
  const failIfNoKeys = async <T extends object,>(make: () => T) => {
    if (!opts.keys) throw new Error('not published')
    return strict(make())
  }
  return {
    page,
    figma: {
      root: { children: [page] },
      createFrame: () => make('FRAME'),
      createText: () => make('TEXT'),
      createRectangle: () => make('RECTANGLE'),
      createNodeFromSvg: () => make('FRAME'),
      createImage: () => ({ hash: 'img' }),
      base64Decode: () => new Uint8Array(),
      listAvailableFontsAsync: async () => ['Regular', 'Medium', 'SemiBold', 'Bold'].map((style) => ({ fontName: { family: 'Poppins', style } })),
      loadFontAsync: async () => {},
      getNodeByIdAsync: async (id: string) => nodes.get(id) ?? null,
      setCurrentPageAsync: async () => {},
      importComponentSetByKeyAsync: (key: string) => failIfNoKeys(() => component()),
      importComponentByKeyAsync: (key: string) => failIfNoKeys(() => component().defaultVariant),
      importStyleByKeyAsync: (key: string) => failIfNoKeys(() => ({ id: `style:${key}`, fontName: { family: 'Poppins', style: 'Regular' } })),
      variables: {
        importVariableByKeyAsync: (key: string) => failIfNoKeys(() => ({ key, variableCollectionId: 'coll' })),
        getVariableCollectionByIdAsync: async () => ({ id: 'coll', modes: [{ name: 'Dark mode', modeId: 'dark' }] }),
        setBoundVariableForPaint: (p: object, _f: string, v: { key: string }) => ({ ...p, boundTo: v.key }),
      },
    },
  }
}

const tree: ScreenNode = {
  kind: 'frame',
  name: 'Screen',
  box: { x: 0, y: 0, w: 1440, h: 900 },
  fill: '#20222aff',
  children: [
    {
      kind: 'frame',
      name: 'Toolbar',
      box: { x: 0, y: 0, w: 400, h: 40 },
      layout: { dir: 'row', gap: 16, wrap: false, pad: [0, 0, 0, 0], justify: 'flex-start', align: 'center' },
      children: [
        { kind: 'instance', component: 'Button', props: { variant: 'contained' }, texts: ['Invite People'], box: { x: 0, y: 0, w: 100, h: 40 }, fallback: { kind: 'frame', name: 'Button', box: { x: 0, y: 0, w: 100, h: 40 }, children: [] } },
        { kind: 'text', name: 'People', box: { x: 116, y: 10, w: 60, h: 21 }, text: 'People', font: { family: 'Poppins', size: 14, weight: 400, lineHeight: 21, letterSpacing: 0, italic: false }, color: '#ffffffff', align: 'left', truncate: false },
      ],
    },
  ],
}

const map = {
  variables: [
    { name: 'Page-background', key: 'v-page', collection: 'Surface colours', type: 'COLOR', scopes: ['FRAME_FILL'], values: { 'Dark mode': '#20222aff', 'Light mode': '#f7f7f8ff' } },
    { name: 'Text-primary', key: 'v-text', collection: 'Surface colours', type: 'COLOR', scopes: ['TEXT_FILL'], values: { 'Dark mode': '#ffffffff', 'Light mode': '#20222aff' } },
    { name: 'Neutral-25', key: 'v-n25', collection: 'Palette', type: 'COLOR', scopes: ['ALL_SCOPES'], values: { Value: '#ffffffff' } },
    { name: 'space-m', key: 'v-16', collection: 'Spacing', type: 'FLOAT', scopes: ['GAP'], values: { Value: 16 } },
  ],
  textStyles: [{ name: 'Paragraph/S', key: 's-14', family: 'Poppins', style: 'Regular', size: 14, lineHeight: 21 }],
  leaves: { Button: { keys: { dark: 'k-button', light: 'k-button-light' }, type: 'set' } },
} as unknown as FigmaMap

async function runScreen(keys: boolean) {
  const { figma, page } = fakeFigma({ keys })
  const lookups = buildLookups(map, 'dark')
  const withVariants = JSON.parse(JSON.stringify(tree))
  withVariants.children[0].children[0].variants = { Configuration: 'Filled' }
  const data = { ...lookups, images: {}, pageId: page.id, section: 'Deactivate one person', title: '1. People', at: { x: 120, y: 360 }, tree: withVariants }
  const body = `const DATA = ${JSON.stringify(data)}\n${runtime}\nconst screen = await buildScreen()\nreturn { screen, report }`
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
  return (await new AsyncFunction('figma', body)(figma)) as { screen: FakeNode; report: Record<string, unknown> }
}

describe('figma lookups', () => {
  it('prefers semantic variables in the demo mode, per use', () => {
    const l = buildLookups(map, 'dark')
    expect(l.colours.fill['#20222aff']).toBe('v-page')
    expect(l.colours.text['#ffffffff']).toBe('v-text') // the semantic one, not the palette one
    expect(l.colours.any['#ffffffff']).toBe('v-text')
    expect(l.floats.spacing['16']).toBe('v-16')
    expect(l.instances.Button).toEqual({ key: 'k-button', type: 'set' })
    expect(l.modes).toEqual([{ sampleKey: 'v-page', modeName: 'Dark mode' }])
    expect(valueIn(map.variables[0], 'light')).toBe('#f7f7f8ff')
  })

  it('lays flows out as rows of screens', () => {
    const layout = layoutFor([5, 3], { width: 1440, height: 900 })
    expect(layout.screen(0, 0)).toEqual({ x: 120, y: 360 })
    expect(layout.screen(1, 2)).toEqual({ x: 120 + 2 * (1440 + 240), y: 360 })
  })
})

describe('figma runtime', () => {
  it('builds the screen with a linked instance, bound colours, spacing and text styles', async () => {
    const { screen, report } = await runScreen(true)
    expect(screen.name).toBe('1. People')
    expect(screen.modes).toEqual({ coll: 'dark' })
    expect((screen.fills as { boundTo: string }[])[0].boundTo).toBe('v-page')
    const toolbar = screen.children[0]
    expect(toolbar.layoutMode).toBe('HORIZONTAL')
    expect(toolbar.bound.itemSpacing).toBe('v-16')
    const [button, label] = toolbar.children
    expect(button.type).toBe('INSTANCE')
    expect(button.props).toEqual({ Configuration: 'Filled' })
    expect(button.children[0].characters).toBe('Invite People')
    expect(label.characters).toBe('People')
    expect(label.textStyleId).toBe('style:s-14')
    expect((label.fills as { boundTo: string }[])[0].boundTo).toBe('v-text')
    expect(report.unlinked).toEqual([])
    expect(report.rawText).toBe(0)
  })

  it('builds "Not linked" frames with an annotation when the Library is not published', async () => {
    const { screen, report } = await runScreen(false)
    const button = screen.children[0].children[0]
    expect(button.type).toBe('FRAME')
    expect(button.name).toBe('Not linked: Button')
    expect((button.annotations as { label: string }[])[0].label).toContain('Not linked to the 5Mins Library: Button')
    expect(report.unlinked).toEqual(['Button'])
    expect(report.rawText).toBe(1)
  })
})

describe('capture tree', () => {
  it('merges plain wrappers that hold one child at the same size, and counts nodes', () => {
    const inner: ScreenNode = { kind: 'text', name: 't', box: { x: 0, y: 0, w: 10, h: 10 }, text: 'Hi', font: { family: 'Poppins', size: 14, weight: 400, lineHeight: 21, letterSpacing: 0, italic: false }, color: '#000000ff', align: 'left', truncate: false }
    const wrapped: ScreenNode = { kind: 'frame', name: 'div', box: { x: 0, y: 0, w: 10, h: 10 }, children: [inner] }
    expect(simplify(wrapped)).toEqual(inner)
    const kept: ScreenNode = { ...wrapped, fill: '#ff0000ff' }
    expect(simplify(kept).kind).toBe('frame')
    expect(summarise(kept)).toMatchObject({ frames: 1, texts: 1 })
  })
})
