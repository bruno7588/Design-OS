import type { FigmaMapping, MappedFigma } from '../figma'

export const dropdownFigma: MappedFigma = {
  component: 'Dropdown',
  mui: 'TextField (select)',
  page: 'Dropdown',
  set: 'Dropdown',
  nodes: { light: '12113:14844', dark: '8925:1408' },
  variants: {
    Disabled: ['false', 'true'],
    State: ['Enabled', 'Hover', 'Active', 'Read-only', 'Error'],
    'Icon left': ['true', 'false'],
    'Label top': ['false', 'true'],
    'Label start': ['false', 'true'],
    'Helper text': ['false', 'true'],
  },
  map: {
    kind: 'leaf',
    props: {
      'label|labelPlacement': { figma: 'Label start', values: { 'undefined|*': 'false', '*|start': 'true', '*': 'false' } },
      'label|labelPlacement|_': { figma: 'Label top', values: { 'undefined|*|*': 'false', '*|start|*': 'false', '*': 'true' } },
      iconLeft: { figma: 'Icon left', values: { undefined: 'false', '*': 'true' } },
      helperText: { figma: 'Helper text', values: { undefined: 'false', '*': 'true' } },
      disabled: { figma: 'Disabled', values: { true: 'true', '*': 'false' } },
      error: { figma: 'State', values: { true: 'Error', '*': 'Enabled' } },
    },
  },
}

// The menu rows. Only plain rows are built; checkbox, radio, avatar, skill icon,
// search, helper and supporting text rows wait for later batches.
export const listItemsFigma: MappedFigma = {
  component: 'Dropdown (menu rows)',
  mui: 'MenuItem',
  page: 'Listbox / Multiselect',
  set: 'List itens',
  nodes: { light: '12202:2766', dark: '9162:941' },
  variants: {
    Disabled: ['false', 'true'],
    Selected: ['false', 'true'],
    State: ['Enabled', 'Hover', 'Read-only'],
    'Helper text': ['false'],
    'Supporting text': ['false'],
    'Icon left': ['true', 'false'],
    'Icon right': ['false'],
    Avatar: ['false'],
    'Skill icon': ['false'],
    Checkbox: ['false'],
    Radio: ['false'],
    Search: ['false'],
  },
  map: {
    kind: 'leaf',
    match: 'MenuItem',
    fixed: { State: 'Enabled' },
    props: {
      selected: { figma: 'Selected', values: { true: 'true', '*': 'false' } },
      disabled: { figma: 'Disabled', values: { true: 'true', '*': 'false' } },
    },
  },
}

// The menu surface (Cards-background, Border-elevated, radius 12, padding 8): MuiMenu / MuiList.
// Caret=true → caret (+ menuPosition for Top/Bottom); Wrapping menu itens=true → options[].group.
export const listboxFigma: FigmaMapping = {
  component: 'Dropdown (menu)',
  mui: 'Menu + List (+ Divider)',
  page: 'Listbox / Multiselect',
  set: 'Listbox',
  nodes: { light: '11923:3466', dark: '9162:1042' },
  variants: { Caret: ['true', 'false'], Position: ['Bottom', 'Top', 'n/a'], 'Wrapping menu itens': ['false', 'true'] },
}
