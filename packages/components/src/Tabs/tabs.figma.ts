import type { FigmaMapping } from '../figma'

export const tabsFigma: FigmaMapping = {
  component: 'Tab',
  mui: 'Tabs + Tab',
  page: 'Chips / Content Switcher / Tabs',
  set: 'Tab items',
  nodes: { light: '12134:6969', dark: '1939:18281' },
  variants: {
    Selected: ['true', 'false'],
    State: ['Enabled', 'Hover'],
    counter: ['false', 'true'],
  },
}

// A ready-made bar of five Tab items, 16px apart: MUI Tabs with the 5Mins Tab.
export const tabsBarFigma: FigmaMapping = {
  component: 'Tabs + Tab',
  mui: 'Tabs',
  page: 'Chips / Content Switcher / Tabs',
  set: 'Tabs',
  nodes: { light: '11975:2581', dark: '8497:24855' },
  variants: {},
}
