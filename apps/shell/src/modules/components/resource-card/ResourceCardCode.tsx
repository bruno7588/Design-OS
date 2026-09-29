import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/ResourceCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ResourceCard, TypeThumbnail } from '@design-os/components'

<ResourceCard type="pdf" title="Brand guidelines" size="1.1 MB" onOpen={download} />
<ResourceCard type="link" title="Our careers page" onOpen={() => window.open(url, '_blank')} />
<ResourceCard device="mobile" type="excel" title="Q3 targets" size="240 KB" onOpen={download} />

// The tile on its own, such as in the File uploader
<TypeThumbnail type="word" size={40} />`

export function ResourceCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens and MUI IconButton and Tooltip, with the Type thumbnail artwork. The file below is
        read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ResourceCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
