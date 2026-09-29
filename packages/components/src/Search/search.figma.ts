import type { FigmaMapping } from '../figma'

export const searchFigma: FigmaMapping = {
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
}
