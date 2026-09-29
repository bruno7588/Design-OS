import { sideDrawerFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { DrawerMatrix } from './DrawerMatrix'

// Figma = the Side Drawer component (10871:12768) and its light instance (11919:4738), checked 2026-09-29.
const compare: Compare = {
  page: sideDrawerFigma.page,
  set: sideDrawerFigma.set,
  frames: { light: '/figma/drawer-light.png', dark: '/figma/drawer-dark.png' },
  live: (mode) => <DrawerMatrix mode={mode} />,
  differences: [
    { property: 'Panel', figma: '720px, full height, Page-background, padding 20/24, gap 20, no radius or shadow', reference: 'Same (anchor="right")', status: 'Matches' },
    { property: 'Section header', figma: 'As the Modal', reference: 'Same', status: 'Matches' },
    { property: 'Form slot', figma: 'Fills the height, radius 12', reference: 'Fills the height and scrolls', status: 'Matches' },
    { property: 'Footer', figma: 'Divider, then Filled and Outlined Medium buttons, 16px apart', reference: 'Same', status: 'Matches' },
    { property: 'Footer width', figma: '656px, narrower than the 672px content', reference: 'The full content width', status: 'Design to update', note: 'overlays.md explains 656 as 8px internal padding; nothing else in the frame has it.' },
    { property: 'Close button', figma: 'In the section header row: a 32px frame, 24px from the right, level with the title', reference: 'Same (SectionHeader action)', status: 'Matches', note: 'The Modal’s sits in the corner instead, 10px from the edges.' },
    { property: 'Scrim', figma: 'Neutral-900 at 50%', reference: 'Scrim token: 50% in both modes', status: 'Matches', note: 'overlays.md’s diagram says 64%.' },
    { property: 'Light mode', figma: 'An instance in the Light mode frame (10871:13180), set to the Light variable modes', reference: 'Tokens resolve per mode', status: 'Matches' },
    { property: 'Semantics', figma: 'Not shown', reference: 'The panel is a dialog, named by its title; Escape closes; focus returns', status: 'Matches', note: 'MUI Drawer gives the panel no role: the wrapper adds it.' },
  ],
  engineering: {
    mui: 'Drawer (anchor="right")',
    usage: `import Drawer from '@mui/material/Drawer'

// With the 5Mins theme, anchor="right" is the 720px panel and scrim.
<Drawer anchor="right" open={open} onClose={close} PaperProps={{ role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'edit-title' }}>
  <CloseButton onClick={close} sx={{ position: 'absolute', top: 10, right: 10 }} />
  <SectionHeader title="Edit learner" titleId="edit-title" />
  <Box sx={{ flex: '1 0 0', minHeight: 0, overflowY: 'auto' }}>{form}</Box>
  {footer}
</Drawer>`,
    props: [{ figma: 'Form (slot)', code: 'children' }],
    theme: ['MuiDrawer styleOverrides: the side panel (720px, padding, gap, no shadow) and the scrim.', 'No new tokens.'],
    files: [
      'packages/components/src/Overlay/overlay.overrides.ts',
      'packages/components/src/Overlay/SideDrawer.tsx',
      'packages/components/src/Overlay/overlay.figma.ts (Figma mapping)',
    ],
  },
}

export function DrawerCompare() {
  return <CompareTemplate c={compare} />
}
