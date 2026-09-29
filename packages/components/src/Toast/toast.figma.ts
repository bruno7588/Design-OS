import type { FigmaMapping } from '../figma'

// The Toast set has one copy, with the same colours in both modes. The light board holds
// instances of it, set to the Light variable modes (a frame, 12279:19203).
export const toastFigma: FigmaMapping = {
  component: 'Toast',
  mui: 'Alert (variant="filled")',
  page: 'Toast',
  set: 'Toast',
  nodes: { light: '12279:19203', dark: '5045:14119' },
  variants: {
    Icon: ['True', 'False'],
    Type: ['Success', 'Warning', 'Error', 'Info'],
  },
}
