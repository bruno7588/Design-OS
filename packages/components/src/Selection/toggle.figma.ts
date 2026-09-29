import type { FigmaMapping } from '../figma'

export const toggleFigma: FigmaMapping = {
  component: 'Toggle',
  mui: 'Switch',
  page: 'Checkbox / Radio / Toggle',
  set: 'Toggle',
  nodes: { light: '11917:3970', dark: '8160:364' },
  variants: { Toggle: ['true', 'false'] },
}
