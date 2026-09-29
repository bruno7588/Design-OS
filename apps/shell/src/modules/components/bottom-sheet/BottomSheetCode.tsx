import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Overlay/BottomSheet.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { BottomSheet } from '@design-os/components'

<BottomSheet open={open} onClose={close} aria-labelledby="sheet-title">
  <h2 id="sheet-title">Lesson options</h2>
  …
</BottomSheet>`

export function BottomSheetCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI Drawer anchored to the bottom. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="BottomSheet.tsx" caption="packages/components/src/Overlay" code={source} />
    </Stack>
  )
}
