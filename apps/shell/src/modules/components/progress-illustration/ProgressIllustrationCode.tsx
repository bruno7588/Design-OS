import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Illustrations/Illustrations.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ProgressIllustration } from '@design-os/components'

<ProgressIllustration type="streak" />
<ProgressIllustration type="passed" label="Passed" />   // named when it stands alone`

export function ProgressIllustrationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The artwork files are the Figma exports. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Illustrations.tsx" caption="packages/components/src/Illustrations" code={source} />
    </Stack>
  )
}
