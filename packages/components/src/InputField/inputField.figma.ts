import type { FigmaMapping, MappedFigma } from '../figma'

export const inputFieldFigma: MappedFigma = {
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
  map: {
    kind: 'leaf',
    fixed: { Hovering: 'false' },
    props: {
      'disabled|value': { figma: 'State', values: { 'true|*': 'n/a', '*|': 'Enabled', '*|undefined': 'Enabled', '*': 'Filled' } },
      disabled: { figma: 'Disabled', values: { true: 'true', '*': 'false' } },
      validation: { figma: 'Validation', values: { error: 'error', success: 'success', '*': 'none' } },
      iconRight: { figma: 'Icon right', values: { undefined: 'false', '*': 'true' } },
      label: { figma: 'Label', values: { undefined: 'false', '*': 'true' } },
      helperText: { figma: 'Helper text', values: { undefined: 'false', '*': 'true' } },
    },
  },
}
