import type { FigmaMapping } from '../figma'

export const contentSwitcherItemFigma: FigmaMapping = {
  component: 'ContentSwitcher',
  mui: 'ToggleButtonGroup (exclusive)',
  page: 'Chips / Content Switcher / Tabs',
  set: 'Content switcher item',
  nodes: { light: '11908:5278', dark: '8497:24186' },
  variants: {
    Disabled: ['false', 'true'],
    Selected: ['True', 'False'],
    State: ['Enabled', 'Hover'],
    'icon right': ['false', 'true'],
    'icon left': ['false', 'true'],
  },
}

// The track: a component with no variants; its light version is an instance.
export const contentSwitcherFigma: FigmaMapping = {
  component: 'ContentSwitcher',
  mui: 'ToggleButtonGroup (exclusive)',
  page: 'Chips / Content Switcher / Tabs',
  set: 'Content switcher',
  nodes: { light: '11918:4241', dark: '7128:23859' },
  variants: {},
}
