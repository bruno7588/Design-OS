import type { FigmaMapping, MappedFigma } from '../figma'

export const toggleFigma: MappedFigma = {
  component: 'Toggle',
  mui: 'Switch',
  page: 'Checkbox / Radio / Toggle',
  set: 'Toggle',
  nodes: { light: '11917:3970', dark: '8160:364' },
  variants: { Toggle: ['true', 'false'] },
  map: {
    kind: 'leaf',
    props: { checked: { figma: 'Toggle', values: { true: 'true', '*': 'false' } } },
  },
}
