import type { FigmaMapping } from '../figma'

export const dropdownFigma: FigmaMapping = {
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
}

// The menu rows. Only plain rows are built; checkbox, radio, avatar, skill icon,
// search, helper and supporting text rows wait for later batches.
export const listItemsFigma: FigmaMapping = {
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
}

// The menu surface (Cards-background, Border-elevated, radius 12, padding 8): MuiMenu / MuiList.
// Caret=true (the arrow pointing at the field) isn't built; grouped items use a Divider.
export const listboxFigma: FigmaMapping = {
  component: 'Dropdown (menu)',
  mui: 'Menu + List (+ Divider)',
  page: 'Listbox / Multiselect',
  set: 'Listbox',
  nodes: { light: '11923:3466', dark: '9162:1042' },
  variants: { Caret: ['false'], Position: ['n/a'], 'Wrapping menu itens': ['false', 'true'] },
}
