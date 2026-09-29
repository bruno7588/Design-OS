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
