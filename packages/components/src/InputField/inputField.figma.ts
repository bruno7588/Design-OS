import type { FigmaMapping } from '../figma'

export const inputFieldFigma: FigmaMapping = {
  component: 'InputField',
  mui: 'TextField (outlined)',
  page: 'Input',
  set: 'Input field/Outlined',
  nodes: { light: '12114:20561', dark: '8974:24610' },
  variants: {
    Disabled: ['false', 'true'],
    State: ['Enabled', 'Active', 'Filled', 'n/a'],
    Hovering: ['false', 'true'],
    Validation: ['none', 'error', 'success'],
    'Icon right': ['false', 'true'],
    Label: ['true', 'false'],
    'Helper text': ['false', 'true'],
  },
}
