import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Overlay/FullScreenModal.tsx?raw'
import close from '@design-os/components/src/Overlay/CloseButton.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { FullScreenModal } from '@design-os/components'

<FullScreenModal open={open} onClose={close} aria-labelledby="editor-title">
  <h1 id="editor-title">Create flashcard</h1>
  …
</FullScreenModal>`

export function FullScreenModalCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI Dialog with fullScreen and the 5Mins CloseButton (variant fullscreen). The files below are read
        from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="FullScreenModal.tsx" caption="packages/components/src/Overlay" code={source} />
      <CodeBlock title="CloseButton.tsx" caption="The close button, both variants" code={close} />
    </Stack>
  )
}
