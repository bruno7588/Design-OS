import { avatarGroupFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { AvatarGroupMatrix } from './AvatarGroupMatrix'

// Figma = the Avatar group set (dark 5097:5584, light 11915:3296), checked 2026-09-29.
const compare: Compare = {
  page: avatarGroupFigma.page,
  set: avatarGroupFigma.set,
  frames: { light: '/figma/avatar-group-light.png', dark: '/figma/avatar-group-dark.png' },
  live: (mode) => <AvatarGroupMatrix mode={mode} />,
  differences: [
    { property: 'Overlap', figma: '−8, −12, −16px', reference: 'Same (spacing)', status: 'Matches' },
    { property: 'Ring', figma: '1px Page-background, centred on the edge', reference: '1px Page-background inside the edge', status: 'Matches', note: 'Inside keeps each avatar at its size; the difference is half a pixel.' },
    { property: 'Counter', figma: 'Page-background-hover; Regular Text-tertiary 8/10/12px', reference: 'Same', status: 'Matches' },
    { property: 'Counter ring', figma: '1px at every size (24px updated from 0.5px, 2026-09-29)', reference: '1px', status: 'Matches' },
    { property: 'Stacking', figma: 'Each avatar on top of the one before; the counter on top', reference: 'Same (z-index in the theme; MUI puts the first on top)', status: 'Matches', note: 'avatars.md says the first is frontmost: out of date.' },
    { property: 'Fallback in a group', figma: 'An opaque Border face (updated 2026-09-29), so nothing shows through', reference: 'Same', status: 'Matches' },
    { property: 'Shown avatars', figma: 'Three, then +N', reference: 'max 4 (three and the counter)', status: 'Matches' },
  ],
  engineering: {
    mui: 'AvatarGroup',
    usage: `import AvatarGroup from '@mui/material/AvatarGroup'

// With the 5Mins theme: the ring and counter come from the theme; size and overlap from you.
<AvatarGroup max={4} total={members.length} spacing={8} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 8 } }}>
  {members.map((m) => <Avatar key={m.id} src={m.photo} alt="" />)}
</AvatarGroup>`,
    props: [
      { figma: 'Size', code: 'size (24, 32, 40): overlap 8/12/16 and counter 8/10/12px' },
      { figma: 'Num remaining', code: 'max and total' },
    ],
    theme: ['MuiAvatarGroup: the 1px Page-background ring and the counter colours.'],
    files: ['packages/components/src/Avatar/avatar.overrides.tsx', 'packages/components/src/Avatar/Avatar.tsx (AvatarGroup)'],
  },
}

export function AvatarGroupCompare() {
  return <CompareTemplate c={compare} />
}
