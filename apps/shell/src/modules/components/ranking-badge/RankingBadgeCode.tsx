import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Gamification/RankingBadge.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { RankingBadge } from '@design-os/components'

<RankingBadge rank={1} />   // gold medal
<RankingBadge rank={7} />   // the number alone`

export function RankingBadgeCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The medals are the Figma artwork; the number is text. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="RankingBadge.tsx" caption="packages/components/src/Gamification" code={source} />
    </Stack>
  )
}
