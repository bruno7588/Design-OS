import type { FigmaMapping, MappedFigma } from '../figma'

// Modal and Side Drawer are single components with a content slot. The dark board holds the
// component; the light board holds an instance set to the Light variable modes.
export const modalFigma: MappedFigma = {
  component: 'Modal',
  mui: 'Dialog (maxWidth="md")',
  page: 'Dialog / Modal / Sheet',
  set: 'Modal',
  nodes: { light: '11919:4717', dark: '7479:4350' },
  variants: {},
  map: { kind: 'container' },
}

export const sideDrawerFigma: MappedFigma = {
  component: 'SideDrawer',
  mui: 'Drawer (anchor="right")',
  page: 'Dialog / Modal / Sheet',
  set: 'Side Drawer',
  nodes: { light: '11919:4738', dark: '10871:12768' },
  variants: {},
  map: { kind: 'container' },
}

export const fullScreenModalFigma: FigmaMapping = {
  component: 'FullScreenModal',
  mui: 'Dialog (fullScreen) + CloseButton (fullscreen)',
  page: 'Dialog / Modal / Sheet',
  set: 'Modal/Full screen',
  nodes: { light: '11498:1694', dark: '3223:31934' },
  variants: { State: ['Default'], Device: ['Desktop', 'Mobile'] },
}

export const shareModalFigma: FigmaMapping = {
  component: 'ShareModal',
  mui: 'Dialog + Search + ContentSwitcher + Avatar + Checkbox + Button',
  page: 'Dialog / Modal / Sheet',
  set: 'Modal/Send',
  // The light board (12358:472) holds instances of both variants.
  nodes: { light: '12358:472', dark: '5399:12437' },
  variants: { Type: ['Team', 'Company'] },
}

export const bottomSheetFigma: FigmaMapping = {
  component: 'BottomSheet',
  mui: 'Drawer (anchor bottom)',
  page: 'Dialog / Modal / Sheet',
  set: 'Bottom sheet',
  // The light board has an instance (12279:281).
  nodes: { light: '12279:281', dark: '7479:106' },
  variants: {},
}
