import type { FigmaMapping, MappedFigma } from '../figma'

export const badgeFigma: MappedFigma = {
  component: 'Badge',
  mui: 'Chip (variant="badge")',
  page: 'Badges / Tags',
  set: 'Badge',
  nodes: { light: '12186:1609', dark: '5799:479' },
  variants: {
    Type: ['Success', 'Warning', 'Error', 'New', 'Informative', 'In progress'],
    'Icon left': ['true', 'false'],
    'Icon right': ['false', 'true'],
  },
  map: {
    kind: 'leaf',
    props: {
      type: { figma: 'Type', values: { success: 'Success', warning: 'Warning', error: 'Error', progress: 'In progress', new: 'New', '*': 'Informative' } },
      icon: { figma: 'Icon left', values: { true: 'true', '*': 'false' } },
      onDismiss: { figma: 'Icon right', values: { undefined: 'false', '*': 'true' } },
    },
  },
}
