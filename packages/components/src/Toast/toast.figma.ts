import type { FigmaMapping } from '../figma'

// The Toast set has one copy, with the same colours in both modes.
export const toastFigma: FigmaMapping = {
  component: 'Toast',
  mui: 'Alert (variant="filled")',
  page: 'Toast',
  set: 'Toast',
  nodes: { light: '5045:14119', dark: '5045:14119' },
  variants: {
    Icon: ['True', 'False'],
    Type: ['Success', 'Warning', 'Error', 'Info'],
  },
}
