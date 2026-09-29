import type { FigmaMapping } from '../figma'

export const badgeFigma: FigmaMapping = {
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
}
