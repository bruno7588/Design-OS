import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/CommentPin/CommentPin.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { CommentPin } from '@design-os/components'

// Over the element it points at; the bottom-left point sits on the clicked spot
<CommentPin
  author={comment.author}
  status={comment.status}            // pending | in-progress | done | failed
  selected={open === comment.id}
  aria-label={\`Comment from \${comment.author}: \${comment.text}\`}
  onClick={() => setOpen(comment.id)}
  sx={{ position: 'absolute', left: x, top: y - 28 }}
/>`

export function CommentPinCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        Built on MUI ButtonBase and styled from the tokens. It's a button: it opens the comment's thread. The file below is read from the
        source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="CommentPin.tsx" caption="packages/components/src/CommentPin" code={source} />
    </Stack>
  )
}
