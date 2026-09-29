import type { FigmaMapping } from '../figma'

export const inputIntegerFigma: FigmaMapping = {
  component: 'InputInteger',
  mui: 'TextField (outlined) with IconButton adornments',
  page: 'Input',
  set: 'Input field/Integer',
  nodes: { light: '12114:20914', dark: '10145:10895' },
  variants: {
    Validation: ['none', 'success', 'error'],
    Disabled: ['false', 'true'],
    Label: ['true', 'false'],
    'Helper text': ['false', 'true'],
    State: ['Enabled', 'Hover', 'Active', 'Filled', 'n/a'],
  },
}

export const inputRadioFigma: FigmaMapping = {
  component: 'InputRadio',
  mui: 'TextField (outlined) with a Radio adornment',
  page: 'Input',
  set: 'Input field/Radio button',
  nodes: { light: '12114:20857', dark: '8974:30479' },
  variants: {
    Validation: ['none', 'success'],
    Disabled: ['false', 'true'],
    Label: ['true', 'false'],
    Selected: ['false', 'true'],
    State: ['Enabled', 'Hover', 'Active', 'Filled', 'n/a'],
  },
}

export const inputInlineFigma: FigmaMapping = {
  component: 'InputInline',
  mui: 'InputBase',
  page: 'Input',
  set: 'Input field/Inline',
  nodes: { light: '12300:6403', dark: '10330:4736' },
  variants: {
    Disabled: ['false'],
    Validation: ['none', 'error'],
    State: ['Enabled', 'Active', 'Filled'],
    Description: ['true', 'false'],
    Size: ['L', 'M'],
  },
}

// The parent set that switches between the four input types; each type is its own component.
export const inputFieldSetFigma: FigmaMapping = {
  component: 'InputField, InputRadio, InputInteger, InputInline',
  mui: 'TextField / OutlinedInput',
  page: 'Input',
  set: 'Input field',
  nodes: { light: '12114:20552', dark: '11180:1982' },
  variants: { Type: ['Outlined', 'Radio', 'Integer', 'Inline'] },
}
