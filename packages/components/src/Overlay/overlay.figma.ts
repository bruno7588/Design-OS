import type { FigmaMapping } from '../figma'

// Modal and Side Drawer are single components with a content slot, drawn once (dark).
export const modalFigma: FigmaMapping = {
  component: 'Modal',
  mui: 'Dialog (maxWidth="md")',
  page: 'Dialog / Modal / Sheet',
  set: 'Modal',
  nodes: { light: '7479:4350', dark: '7479:4350' },
  variants: {},
}

export const sideDrawerFigma: FigmaMapping = {
  component: 'SideDrawer',
  mui: 'Drawer (anchor="right")',
  page: 'Dialog / Modal / Sheet',
  set: 'Side Drawer',
  nodes: { light: '10871:12768', dark: '10871:12768' },
  variants: {},
}
