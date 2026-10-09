import type { FigmaMapping, MappedFigma } from '../figma'

export const checkboxFigma: MappedFigma = {
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
  map: {
    kind: 'leaf',
    props: {
      'checked|indeterminate': { figma: 'Checked', values: { '*|true': 'Indeterminate', 'true|*': 'Checked', '*': 'Not checked' } },
      disabled: { figma: 'Disabled', values: { true: 'true', '*': 'false' } },
      'disabled|_': { figma: 'State', values: { 'true|*': 'n/a', '*': 'Enabled' } },
    },
  },
}
