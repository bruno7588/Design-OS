import { Stack, Typography } from '@mui/material'
import source0 from '@design-os/components/src/Gamification/LevelIllustration.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { LevelIllustration, levelIllustrationUrl } from '@design-os/components'

<LevelIllustration level={3} />                     // 56px shield
<LevelIllustration level="expert" size="large" />   // 72px medal with its ribbon
<LevelIllustration level={5} disabled label="Level 5, locked" />
const src = levelIllustrationUrl('master', { size: 'large' })`

export function LevelIllustrationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The level shields and medals, as artwork. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="LevelIllustration.tsx" caption="packages/components/src/Gamification" code={source0} />
    </Stack>
  )
}
