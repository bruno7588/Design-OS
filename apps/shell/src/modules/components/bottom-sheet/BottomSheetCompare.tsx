import { bottomSheetFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { BottomSheetMatrix } from './BottomSheetMatrix'

// Figma = Bottom sheet (dark 7479:106; light instance 12279:281), checked 2026-09-29.
const compare: Compare = {
  page: bottomSheetFigma.page,
  set: bottomSheetFigma.set,
  frames: { light: '/figma/bottom-sheet-light.png', dark: '/figma/bottom-sheet-dark.png' },
  live: (mode) => <BottomSheetMatrix mode={mode} />,
  differences: [
    { property: 'Sheet', figma: '375 × 560, Page-background, top corners 12, padding 0/16/20/16, gap 8', reference: 'Same; the height follows the content', status: 'Matches' },
    { property: 'Handle', figma: '64 × 4, Neutral-500, radius 8, in a 36px header (padding 16)', reference: 'Same', status: 'Matches' },
    { property: 'Content', figma: 'A slot, 12px gap', reference: 'Same', status: 'Matches' },
    { property: 'Scrim', figma: 'The Overlay component (Device=Mobile), as the Modal and Side drawer use; swapped in for a raw #0F1014 at 64% on 2026-09-29', reference: 'The Scrim token', status: 'Matches' },
    { property: 'Swipe to close', figma: 'The handle suggests it', reference: 'Not built: Escape and the scrim close it', status: 'Code to update', note: 'MUI SwipeableDrawer can add it.' },
    { property: 'Built component', figma: '–', reference: 'BottomSheet', status: 'Code to update', note: 'overlays.md has no bottom sheet section yet.' },
  ],
  engineering: {
    mui: 'Drawer (anchor="bottom")',
    usage: `<BottomSheet open={open} onClose={close} aria-labelledby="title">…</BottomSheet>`,
    props: [],
    theme: ['MuiDrawer: the bottom anchor keeps the Page-background surface; the sheet shape is set in the component.'],
    files: ['packages/components/src/Overlay/BottomSheet.tsx'],
  },
}

export function BottomSheetCompare() {
  return <CompareTemplate c={compare} />
}
