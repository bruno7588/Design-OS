import { dialogFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { DialogMatrix } from './DialogMatrix'

// Figma = the Dialog set (dark 7789:24651, light 12242:5728), checked 2026-09-29.
// The prototype's ConfirmModal differs from both its own spec (overlays.md) and Figma.
const compare: Compare = {
  page: dialogFigma.page,
  set: dialogFigma.set,
  frames: { light: '/figma/dialog-light.png', dark: '/figma/dialog-dark.png' },
  live: (mode) => <DialogMatrix mode={mode} />,
  differences: [
    { property: 'Surface', figma: '345 wide, padding 24, radius 12, Page-background', reference: 'Same', status: 'Matches', note: 'The prototype ConfirmModal is 560px wide.' },
    { property: 'Layout', figma: 'Centred; gaps 16 (icon), 8 (title to text), 20 (to buttons)', reference: 'Same', status: 'Matches', note: 'The prototype is left-aligned with an 8px title gap; overlays.md says 4px.' },
    { property: 'Type', figma: 'H3 20/700; Paragraph L 16/400 Text-secondary', reference: 'Same', status: 'Matches' },
    { property: 'Icon', figma: '56px: Iconsax Danger, Iconsax InfoCircle, Ionicons info outline, green tick badge', reference: 'Same icons and colours', status: 'Matches', note: 'The prototype uses a 72px Iconsax icon. The Info icon is the only Ionicons icon in the Library.' },
    { property: 'Buttons', figma: 'Medium Outlined-2 Cancel and a filled action, 12 apart', reference: 'Same, using the reference Button', status: 'Matches', note: 'overlays.md says 16 apart and an 8px radius.' },
    { property: 'Shadow', figma: 'Shadow L: -4, 0, 24 at 12%', reference: 'Same (shadow.l updated)', status: 'Matches', note: "The prototype's --shadow-l token is 4, 4, 24." },
    { property: 'Error action label', figma: 'The filled button says "Cancel"', reference: '"Cancel" in the matrix, to match; a real verb in use', status: 'Design to update', note: 'Both buttons say Cancel in every Error variant.' },
    { property: 'Closing', figma: 'Not shown', reference: 'Only Cancel or the action; Escape and scrim ignored', status: 'Matches', note: 'Bruno, 2026-09-28, as overlays.md says. The prototype ConfirmModal closes on both: code to update there.' },
    { property: 'Scrim', figma: 'Not shown', reference: 'Scrim token: 25% light, 50% dark', status: 'Design to update' },
  ],
  engineering: {
    mui: 'Dialog',
    usage: `import Dialog from '@mui/material/Dialog'

// With the 5Mins theme, plain MUI gets the surface and scrim.
// The content layout is ConfirmDialog's; copy it or use the component.
<Dialog
  open={open}
  disableEscapeKeyDown
  aria-labelledby="delete-title"
  PaperProps={{ role: 'alertdialog', sx: { width: 345 } }}
>
  …
</Dialog>`,
    props: [
      { figma: 'Type', code: 'type on ConfirmDialog: sets the icon and the action Button colour (error, warning, primary)' },
      { figma: 'Icon', code: 'icon (boolean)' },
      { figma: 'Secondary text', code: 'secondaryText' },
      { figma: 'Buttons', code: 'Button variant="outlined2" (Cancel) and Button color={…} (action)' },
    ],
    theme: [
      'MuiDialog paper: Page-background, radius 12, padding 24, Shadow L, no background image (MUI adds one in dark mode).',
      'MuiDialog root: the backdrop uses the Scrim token.',
      'No onClose and disableEscapeKeyDown, so Escape and the scrim do nothing.',
    ],
    files: [
      'packages/components/src/Dialog/dialog.overrides.ts (theme overrides)',
      'packages/components/src/Dialog/ConfirmDialog.tsx (layout, focus and ARIA)',
      'packages/components/src/icons/DialogIcons.tsx (Info and Success icons)',
      'packages/components/src/Dialog/dialog.figma.ts (Figma mapping)',
    ],
  },
}

export function DialogCompare() {
  return <CompareTemplate c={compare} />
}
