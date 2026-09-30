import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/illustrations.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { AssessmentIllustration } from '@design-os/components'

<AssessmentIllustration type="multiple-choice" />                 // 80px, desktop
<AssessmentIllustration type="poll" device="mobile" />            // 56px
<AssessmentIllustration type="sequence" size={48} />             // the Admin row`

export function AssessmentIllustrationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The artwork files are the Figma exports. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="illustrations.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
