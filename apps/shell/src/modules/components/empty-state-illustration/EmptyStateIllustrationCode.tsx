import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/EmptyState/EmptyState.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { EmptyStateIllustration } from '@design-os/components'

<EmptyStateIllustration name="no-results" />

// Usually through the Empty state
<EmptyState illustration="no-bookmarks" title="No bookmarks yet" />`

export function EmptyStateIllustrationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The artwork files are the Figma exports. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="EmptyState.tsx" caption="packages/components/src/EmptyState" code={source} />
    </Stack>
  )
}
