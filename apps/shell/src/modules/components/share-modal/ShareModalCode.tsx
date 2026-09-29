import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Overlay/ShareModal.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ShareModal } from '@design-os/components'

<ShareModal
  open={open}
  onClose={close}
  title="Share lesson"
  people={people}          // { id, name, detail: role, avatar }
  teams={teams}            // { id, name, detail: manager, avatar }
  selected={selected}
  onSelectedChange={setSelected}
  onShareTo={share}
  onCopyLink={copyLink}
/>`

export function ShareModalCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI Dialog with the 5Mins Search, Content switcher, Avatar, Checkbox and Button. The file below is read
        from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ShareModal.tsx" caption="packages/components/src/Overlay" code={source} />
    </Stack>
  )
}
