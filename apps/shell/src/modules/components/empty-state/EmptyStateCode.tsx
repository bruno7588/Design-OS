import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/EmptyState/EmptyState.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { EmptyState } from '@design-os/components'

<EmptyState
  illustration="resources"
  title="Add resources to your course"
  description="Upload PDF, Word, Excel, PowerPoint or image files, or add links."
  secondaryAction={{ label: 'Add Link', onClick: addLink }}
  primaryAction={{ label: 'Upload Files', icon: <Add />, onClick: upload }}
/>

// An area the admin fills themselves: the dashed dropzone
<EmptyState surface="dropzone" illustration="resources" title="Add resources" primaryAction={{ label: 'Upload Files', onClick: upload }} />

// Mobile app frames
<EmptyState device="mobile" title="No courses yet" />`

export function EmptyStateCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        MUI has no empty state, so the reference is a small layout of MUI Typography and the 5Mins Button, on tokens only. The file
        below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="EmptyState.tsx" caption="packages/components/src/EmptyState (with four Figma illustrations)" code={source} />
    </Stack>
  )
}
