import { Stack, Typography } from '@mui/material'
import modalSource from '@design-os/components/src/Overlay/Modal.tsx?raw'
import dialogOverrides from '@design-os/components/src/Dialog/dialog.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Modal } from '@design-os/components'

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Edit collection"
  supportingText="Learners see the name on their home page."
  action={{ label: 'Save', onClick: save }}
>
  <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
</Modal>

// Plain MUI: maxWidth="md" is the 720px Modal surface
import Dialog from '@mui/material/Dialog'

<Dialog open={open} onClose={close} maxWidth="md" fullWidth aria-labelledby="title">
  <CloseButton onClick={close} />
  <SectionHeader title="Edit collection" titleId="title" />
  …
</Dialog>`

export function ModalCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Dialog with maxWidth md. The theme draws the 720px surface and the scrim; the wrapper lays out the
        close button, the section header, the content and the button. The files below are read from the source, so they are always
        current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Modal.tsx" caption="packages/components/src/Overlay (with CloseButton and SectionHeader)" code={modalSource} />
      <CodeBlock title="dialog.overrides.ts" caption="MuiDialog: the surface, the scrim and the 720px Modal" code={dialogOverrides} />
    </Stack>
  )
}
