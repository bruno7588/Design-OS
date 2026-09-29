import { avatarFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { AvatarMatrix } from './AvatarMatrix'

// Figma = the Avatar set (dark 5097:5884, light 11914:2605), checked 2026-09-29.
const compare: Compare = {
  page: avatarFigma.page,
  set: avatarFigma.set,
  frames: { light: '/figma/avatar-light.png', dark: '/figma/avatar-dark.png' },
  live: (mode) => <AvatarMatrix mode={mode} />,
  differences: [
    { property: 'Sizes', figma: '24, 32, 40, 48, 56, 64, 72; radius 100', reference: 'Same', status: 'Matches' },
    { property: 'Picture', figma: 'Image fill, cover', reference: 'Same', status: 'Matches' },
    { property: 'Fallback', figma: 'Emojies Type=Angel: an opaque Border face with Text-tertiary features (updated 2026-09-29)', reference: 'Same, drawn from the Figma paths', status: 'Matches', note: 'The prototype often shows two-letter initials instead; Figma has no initials variant.' },
    { property: '64px fallback', figma: 'Like the others (the purple frame fill was removed 2026-09-29)', reference: 'Same', status: 'Matches' },
    { property: 'Broken photo', figma: 'Not shown', reference: 'Falls back to the face', status: 'Matches' },
  ],
  engineering: {
    mui: 'Avatar',
    usage: `import Avatar from '@mui/material/Avatar'

// With the 5Mins theme: no src shows the Figma face.
<Avatar src={user.photo} alt={user.name} sx={{ width: 40, height: 40 }} />`,
    props: [
      { figma: 'Size', code: 'width and height (the Avatar wrapper: size)' },
      { figma: 'Picture=true', code: 'src and alt' },
      { figma: 'Picture=false', code: 'no src' },
    ],
    theme: ['MuiAvatar defaultProps.children: the fallback face (AvatarFallbackIcon).', 'MuiAvatar colorDefault: Border and Text-tertiary.', 'No new tokens.'],
    files: ['packages/components/src/Avatar/avatar.overrides.tsx', 'packages/components/src/Avatar/Avatar.tsx', 'packages/components/src/icons/FigmaIcons.tsx (AvatarFallbackIcon)'],
  },
}

export function AvatarCompare() {
  return <CompareTemplate c={compare} />
}
