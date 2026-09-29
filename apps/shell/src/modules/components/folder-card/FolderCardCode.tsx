import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/FolderCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { FolderCard, NewFolderCard } from '@design-os/components'

<FolderCard title="Onboarding" count={folder.courses.length} image={folder.cover} onClick={open} />
<NewFolderCard onClick={createFolder} />`

export function FolderCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens. The title is the card’s button and its hit area covers the card; New Folder is
        a button. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="FolderCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
