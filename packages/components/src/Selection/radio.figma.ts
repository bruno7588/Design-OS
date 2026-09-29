import type { FigmaMapping } from '../figma'

export const radioFigma: FigmaMapping = {
  component: 'Radio (plain MUI)',
  mui: 'Radio',
  page: 'Checkbox / Radio / Toggle',
  set: 'radio-button instances',
  nodes: { light: '11917:3950', dark: '5001:18926' },
  variants: {
    Disabled: ['false', 'true'],
    Selected: ['true', 'false'],
    State: ['Enabled', 'Hover', 'n/a'],
  },
}
