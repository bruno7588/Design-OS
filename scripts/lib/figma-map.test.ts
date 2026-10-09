import { describe, expect, it } from 'vitest'
import { buildFigmaMap, resolveVariants, type FigmaJson, type Mapping } from './figma-map.mts'

const figma: FigmaJson = {
  fileKey: 'LIB',
  fetchedAt: '2026-10-09T10:00:00Z',
  pages: [
    {
      page: 'Buttons',
      items: [
        { name: 'Buttons', id: '1:1', type: 'set', key: 'dark-key', variants: { Configuration: ['Filled', 'Outlined', 'Danger-outlined'], Size: ['Small', 'Medium'], Disabled: ['false', 'true'] } },
        { name: 'Buttons', id: '2:2', type: 'set', key: 'light-key', variants: { Configuration: ['Filled', 'Outlined', 'Danger-outlined'], Size: ['Small', 'Medium'], Disabled: ['false', 'true'] } },
      ],
    },
  ],
}

const button: Mapping = {
  component: 'Button',
  mui: 'Button',
  page: 'Buttons',
  set: 'Buttons',
  nodes: { dark: '1:1', light: '2:2' },
  variants: {},
  map: {
    kind: 'leaf',
    props: {
      'variant|color': { figma: 'Configuration', values: { 'outlined|error': 'Danger-outlined', 'outlined|*': 'Outlined', '*': 'Filled' } },
      size: { figma: 'Size', values: { small: 'Small', '*': 'Medium' } },
      disabled: { figma: 'Disabled', values: { true: 'true', '*': 'false' } },
    },
  },
}

describe('figma map', () => {
  it('joins Library keys with the code map, per mode', () => {
    const map = buildFigmaMap(figma, [button])
    expect(map.hasKeys).toBe(true)
    expect(map.leaves.Button.keys).toEqual({ dark: 'dark-key', light: 'light-key' })
    expect(map.problems).toEqual([])
  })

  it('lists components without a map, containers, missing nodes and impossible values', () => {
    const map = buildFigmaMap(figma, [
      { ...button, component: 'Chip', map: undefined },
      { ...button, component: 'PageHeader', map: { kind: 'container' } },
      { ...button, component: 'Gone', nodes: { dark: '9:9', light: '9:8' } },
      { ...button, component: 'Typo', map: { kind: 'leaf', fixed: { Sise: 'Small', Size: 'Huge' } } },
    ])
    expect(map.notMapped).toEqual(['Chip (Buttons)'])
    expect(map.containers).toEqual(['PageHeader'])
    expect(map.missingInFigma).toEqual(['Gone (Buttons)'])
    expect(map.problems).toEqual(['Typo: Figma "Buttons" has no property "Sise"', 'Typo: "Buttons" Size has no value "Huge"'])
  })

  it('has no keys before the Library read records them', () => {
    const noKeys = { ...figma, pages: [{ page: 'Buttons', items: figma.pages[0].items.map(({ key: _k, ...rest }) => rest) }] }
    expect(buildFigmaMap(noKeys as FigmaJson, [button]).hasKeys).toBe(false)
  })

  it('resolves props to variants: compound keys, wildcards, defaults and React nodes', () => {
    const entry = buildFigmaMap(figma, [button]).leaves.Button
    expect(resolveVariants(entry, { variant: 'outlined', color: 'error', size: 'small' })).toEqual({ Configuration: 'Danger-outlined', Size: 'Small', Disabled: 'false' })
    expect(resolveVariants(entry, { variant: 'outlined' })).toEqual({ Configuration: 'Outlined', Size: 'Medium', Disabled: 'false' })
    expect(resolveVariants(entry, { disabled: true })).toEqual({ Configuration: 'Filled', Size: 'Medium', Disabled: 'true' })
    const icon = { fixed: {}, props: { icon: { figma: 'Icon', values: { undefined: 'false', '*': 'true' } } } }
    expect(resolveVariants(icon, { icon: { type: 'svg' } })).toEqual({ Icon: 'true' })
    expect(resolveVariants(icon, {})).toEqual({ Icon: 'false' })
  })
})
