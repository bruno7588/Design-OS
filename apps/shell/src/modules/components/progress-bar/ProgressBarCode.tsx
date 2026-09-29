import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/ProgressBar/ProgressBar.tsx?raw'
import overrides from '@design-os/components/src/ProgressBar/progressBar.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ProgressBar } from '@design-os/components'

<ProgressBar value={62} aria-labelledby="course-title" />
<ProgressBar value={100} width={72} showLabel aria-label="Course progress" />  // table cell

// Plain MUI renders the same bar
import LinearProgress from '@mui/material/LinearProgress'

<LinearProgress variant="determinate" value={62} aria-label="Course progress" />`

export function ProgressBarCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 LinearProgress, determinate. The theme draws the Figma track and fill, and turns it Success-500
        at 100%; the wrapper adds the percentage label. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ProgressBar.tsx" caption="packages/components/src/ProgressBar" code={source} />
      <CodeBlock title="progressBar.overrides.ts" caption="MuiLinearProgress theme overrides" code={overrides} />
    </Stack>
  )
}
