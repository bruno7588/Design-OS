import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Avatar/Emoji.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Emoji, Avatar } from '@design-os/components'

<Emoji type="hand-waving" size={72} label="Hello" />

// An avatar without a picture
<Avatar size={40} alt={user.name}><Emoji type="angel" size={40} /></Avatar>`

export function EmojiCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        Plain emojis are drawn as SVG from the tokens; gradient emojis are the Figma artwork (240px PNG). The file below is read
        from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Emoji.tsx" caption="packages/components/src/Avatar" code={source} />
    </Stack>
  )
}
