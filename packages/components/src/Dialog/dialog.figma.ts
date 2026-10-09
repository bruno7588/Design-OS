import type { FigmaMapping, MappedFigma } from '../figma'

export const dialogFigma: MappedFigma = {
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
  map: {
    kind: 'leaf',
    domRoot: '.MuiDialog-paper',
    props: {
      type: { figma: 'Type', values: { error: 'Error', warning: 'Warning', success: 'Success', '*': 'Info' } },
      icon: { figma: 'Icon', values: { false: 'False', '*': 'True' } },
      secondaryText: { figma: 'Secondary text', values: { undefined: 'False', '*': 'True' } },
    },
  },
}
