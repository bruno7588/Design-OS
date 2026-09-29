import { modalFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ModalMatrix } from './ModalMatrix'

// Figma = the Modal component (7479:4350) and its light instance (11919:4717), checked 2026-09-29.
const compare: Compare = {
  page: modalFigma.page,
  set: modalFigma.set,
  frames: { light: '/figma/modal-light.png', dark: '/figma/modal-dark.png' },
  live: (mode) => <ModalMatrix mode={mode} />,
  differences: [
    { property: 'Surface', figma: '720px, Page-background, radius 12, padding 24, Shadow L, gap 20, centred', reference: 'Same (maxWidth="md")', status: 'Matches' },
    { property: 'Close button', figma: 'IoCloseOutline 24 in a 32px frame, 10px from the top right, Text-secondary', reference: 'Same; Text-primary on hover', status: 'Matches' },
    { property: 'Section header', figma: 'Bold 20 title, 14 supporting text 4px below, Border divider 12px under', reference: 'Same', status: 'Matches', note: 'overlays.md says 16px above the divider.' },
    { property: 'Content slot', figma: '672×320, radius 12', reference: 'At least 320px tall', status: 'Matches' },
    { property: 'Button', figma: 'Filled Medium, centred', reference: 'Same', status: 'Matches' },
    { property: 'Scrim', figma: 'Neutral-900 at 50%', reference: 'Scrim token: 50% in both modes', status: 'Matches' },
    { property: 'Light mode', figma: 'An instance in the Light mode frame (7861:25549), set to the Light variable modes', reference: 'Tokens resolve per mode', status: 'Matches' },
    { property: 'Closing', figma: 'Not shown', reference: 'Close button, Escape and a click on the scrim; focus returns', status: 'Matches', note: 'As overlays.md. The confirmation Dialog closes only on its buttons.' },
  ],
  engineering: {
    mui: 'Dialog (maxWidth="md")',
    usage: `import Dialog from '@mui/material/Dialog'

// With the 5Mins theme, maxWidth="md" is the 720px Modal surface and scrim.
<Dialog open={open} onClose={close} maxWidth="md" fullWidth aria-labelledby="edit-title">
  <CloseButton onClick={close} sx={{ position: 'absolute', top: 10, right: 10 }} />
  <SectionHeader title="Edit collection" titleId="edit-title" />
  {content}
  <Button onClick={save}>Save</Button>
</Dialog>`,
    props: [{ figma: 'Placeholder (slot)', code: 'children' }],
    theme: ['MuiDialog styleOverrides.paper: for maxWidth md, 720px and a centred column 20px apart.', 'No new tokens.'],
    files: [
      'packages/components/src/Dialog/dialog.overrides.ts',
      'packages/components/src/Overlay/Modal.tsx',
      'packages/components/src/Overlay/CloseButton.tsx and SectionHeader.tsx (shared with the Side drawer)',
      'packages/components/src/Overlay/overlay.figma.ts (Figma mapping)',
    ],
  },
}

export function ModalCompare() {
  return <CompareTemplate c={compare} />
}
