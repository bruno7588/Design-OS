import type { FigmaMapping, MappedFigma } from '../figma'

export const emptyStateFigma: MappedFigma = {
  component: 'EmptyState',
  mui: 'Typography + Button (no MUI equivalent)',
  page: 'Empty state',
  set: 'Empty state',
  nodes: { light: '11921:5779', dark: '5452:37234' },
  variants: { Device: ['Desktop', 'Mobile'], Surface: ['Plain', 'Dropzone'] },
  map: { kind: 'container' },
}
