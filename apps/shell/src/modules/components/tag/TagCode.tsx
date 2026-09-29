import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Tag/Tag.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Tag } from '@design-os/components'

// In the top-left corner of a thumbnail
<Box sx={{ position: 'relative' }}>
  <img src={lesson.thumbnail} alt="" />
  <Tag type="video" size="M" sx={{ position: 'absolute', top: 0, left: 0 }} />
</Box>`

export function TagCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        MUI has no equivalent, so the reference is a Box styled from the tokens with an Iconsax Bold icon. It is an image named
        by the media type ("Video"), so screen readers say what the thumbnail is. The file below is read from the source, so it
        is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Tag.tsx" caption="packages/components/src/Tag" code={source} />
    </Stack>
  )
}
