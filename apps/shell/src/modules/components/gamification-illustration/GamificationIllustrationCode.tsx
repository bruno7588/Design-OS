import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Illustrations/Illustrations.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { GamificationIllustration } from '@design-os/components'

<GamificationIllustration type="progress" />       // streak flame
<GamificationIllustration type="certificate" />
<GamificationIllustration type="quiz" />
<GamificationIllustration type="learning-path" />`

export function GamificationIllustrationCode() {
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
