import type { FigmaMapping, MappedFigma } from '../figma'

export const searchFigma: MappedFigma = {
  component: 'Search',
  mui: 'OutlinedInput (className="ds-search")',
  page: 'Search',
  set: 'Search',
  nodes: { light: '11927:6338', dark: '697:33529' },
  variants: {
    State: ['Enabled', 'Active', 'Hover'],
    Filled: ['false', 'true'],
    Size: ['M', 'L'],
  },
  map: {
    kind: 'leaf',
    fixed: { State: 'Enabled' },
    props: {
      size: { figma: 'Size', values: { L: 'L', '*': 'M' } },
      value: { figma: 'Filled', values: { '': 'false', undefined: 'false', '*': 'true' } },
    },
  },
}
