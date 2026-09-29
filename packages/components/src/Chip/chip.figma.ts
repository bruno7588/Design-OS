import type { FigmaMapping } from '../figma'

export const chipFigma: FigmaMapping = {
  component: 'Chip',
  mui: 'Chip',
  page: 'Chips / Content Switcher / Tabs',
  set: 'Chips',
  nodes: { light: '12160:12109', dark: '5162:28510' },
  variants: {
    Disabled: ['false', 'true'],
    Selected: ['false', 'true'],
    // Figma uses "n/a" for the disabled frames; the reference covers them with `disabled`.
    State: ['Enabled', 'Hover', 'n/a'],
    'Icon left': ['false', 'true'],
    'Icon right': ['True', 'False'],
  },
}
