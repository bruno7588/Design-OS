import { Stack, Typography } from '@mui/material'
import avatarSource from '@design-os/components/src/Avatar/Avatar.tsx?raw'
import overridesSource from '@design-os/components/src/Avatar/avatar.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Avatar, AvatarGroup } from '@design-os/components'

<Avatar size={40} src={user.photo} alt={user.name} />
<Avatar size={32} alt="" />   // no picture: the fallback face

<AvatarGroup size={24} total={members.length}>
  {members.map((m) => <Avatar key={m.id} src={m.photo} alt={m.name} />)}
</AvatarGroup>

// Plain MUI renders the same: size is width and height
import MuiAvatar from '@mui/material/Avatar'

<MuiAvatar src={user.photo} alt={user.name} sx={{ width: 40, height: 40 }} />`

export function AvatarCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Avatar and AvatarGroup. The theme gives them the Figma fallback face, the group ring and the
        counter; the wrappers turn the Figma sizes into dimensions and overlaps. The files below are read from the source, so they
        are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Avatar.tsx" caption="packages/components/src/Avatar (Avatar and AvatarGroup)" code={avatarSource} />
      <CodeBlock title="avatar.overrides.tsx" caption="MuiAvatar and MuiAvatarGroup theme overrides" code={overridesSource} />
    </Stack>
  )
}
