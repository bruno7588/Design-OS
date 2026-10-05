import type { FigmaMapping } from '../figma'

// Code-first (Phase 4c): there's no Comment pin in the Figma Library yet, so the nodes are
// empty and pnpm inventory lists it as code only. Add a light and a dark set to Figma.
export const commentPinFigma: FigmaMapping = {
  component: 'CommentPin',
  mui: 'ButtonBase',
  page: 'Comments',
  set: 'Comment pin',
  nodes: { light: '', dark: '' },
  variants: {
    Status: ['Pending', 'In progress', 'Done', 'Failed'],
    State: ['Enabled', 'Hover', 'Selected'],
  },
}
