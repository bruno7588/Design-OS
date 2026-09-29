import type { FigmaMapping } from '../figma'

export const tooltipFigma: FigmaMapping = {
  component: 'Tooltip',
  mui: 'Tooltip',
  page: 'Tooltip',
  set: 'Tooltip',
  nodes: { light: '11927:8087', dark: '2683:29027' },
  variants: {
    Position: ['Top', 'Bottom', 'Left', 'Right'],
    Alignment: ['Center', 'Start', 'End'],
    Icon: ['True', 'False'],
  },
}
