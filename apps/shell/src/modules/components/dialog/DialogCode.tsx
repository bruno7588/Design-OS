import { Stack, Typography } from '@mui/material'
import dialogSource from '@design-os/components/src/Dialog/ConfirmDialog.tsx?raw'
import overridesSource from '@design-os/components/src/Dialog/dialog.overrides.ts?raw'
import iconsSource from '@design-os/components/src/icons/FigmaIcons.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ConfirmDialog } from '@design-os/components'

<ConfirmDialog
  open={confirming}
  type="error"
  title="Delete this course?"
  secondaryText="Learners lose access straight away. This cannot be undone."
  actionLabel="Delete course"
  onCancel={() => setConfirming(false)}
  onConfirm={deleteCourse}
/>

// Types: error (danger action), warning (warning action), info and success (primary action).
// Only Cancel or the action closes it; Escape and the scrim do nothing.`

export function DialogCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Dialog with the 5Mins theme. The surface and scrim live in the theme overrides; ConfirmDialog
        lays out the icon, title, text and buttons from the Figma set, using the reference Button. The files below are read
        from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ConfirmDialog.tsx" caption="packages/components/src/Dialog" code={dialogSource} />
      <CodeBlock title="dialog.overrides.ts" caption="MuiDialog theme overrides: surface and scrim" code={overridesSource} />
      <CodeBlock title="FigmaIcons.tsx" caption="The Info and Success icons from the Figma set" code={iconsSource} />
    </Stack>
  )
}
