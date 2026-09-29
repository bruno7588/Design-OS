import type { FigmaMapping } from '../figma'

export const dialogFigma: FigmaMapping = {
  component: 'ConfirmDialog',
  mui: 'Dialog',
  page: 'Dialog / Modal / Sheet',
  set: 'Dialog',
  nodes: { light: '12242:5728', dark: '7789:24651' },
  variants: {
    Type: ['Error', 'Warning', 'Info', 'Success'],
    Icon: ['True', 'False'],
    'Secondary text': ['True', 'False'],
  },
}
