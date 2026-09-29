import type { FigmaMapping } from '../figma'

export const checkboxFigma: FigmaMapping = {
  component: 'Checkbox',
  mui: 'Checkbox',
  page: 'Checkbox / Radio / Toggle',
  set: 'Checkbox instances',
  nodes: { light: '11917:3924', dark: '6339:10484' },
  variants: {
    Disabled: ['false', 'true'],
    // Figma uses "n/a" for the disabled frames; the reference covers them with `disabled`.
    State: ['Enabled', 'Hover', 'n/a'],
    Checked: ['Checked', 'Not checked', 'Indeterminate'],
  },
}
