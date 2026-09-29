import { Avatar, AvatarGroup } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { PHOTO } from './AvatarMatrix'

// Content from playground/docs/design-system/avatars.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'An avatar shows who a person is at a glance: their photo, or a friendly face when there is none.',
  whenToUse: [
    '24px in dense lists and chips, 32px in table rows, 40px in prominent rows and headers.',
    '48 to 72px in profiles and detail panels.',
    'Beside a name, so the name carries the identity.',
  ],
  whenNotToUse: ['For teams, companies or content. Use their own icon or thumbnail.', 'As a button on its own. Wrap it in a button with a name.'],
  anatomy: {
    example: <Avatar size={72} src={PHOTO} alt="Ana Costa" />,
    parts: [
      { name: 'Shape', description: 'Fully round, from 24 to 72px on the 8px grid. No border when it stands alone.' },
      { name: 'Picture', description: 'The photo fills the circle (cover).' },
      { name: 'Fallback', description: 'The Figma face (Emojies Type=Angel): Neutral-600 features on Input-background.' },
    ],
  },
  variants: [
    { name: 'Picture', description: 'When there is a photo.', example: <Avatar size={40} src={PHOTO} alt="Ana Costa" /> },
    { name: 'Fallback', description: 'No photo, or it fails to load.', example: <Avatar size={40} alt="" /> },
  ],
  states: [{ name: 'Default', description: 'Avatars have no hover or pressed state of their own.' }],
  dos: [
    {
      do: { example: <><Avatar size={32} src={PHOTO} alt="Ana Costa" /><Avatar size={32} src={PHOTO} alt="Ana Costa" /></>, text: 'Keep one size in a list.' },
      dont: { example: <><Avatar size={40} src={PHOTO} alt="Ana Costa" /><Avatar size={24} src={PHOTO} alt="Ana Costa" /></>, text: 'Mix sizes side by side.' },
    },
    {
      do: { example: <AvatarGroup size={24} total={8}><Avatar src={PHOTO} alt="" /><Avatar alt="" /><Avatar src={PHOTO} alt="" /><Avatar alt="" /></AvatarGroup>, text: 'Use a group for many people.' },
      dont: { example: <><Avatar size={24} src={PHOTO} alt="" /><Avatar size={24} alt="" /><Avatar size={24} src={PHOTO} alt="" /><Avatar size={24} alt="" /><Avatar size={24} alt="" /></>, text: 'Line up loose avatars.' },
    },
  ],
  content: ['The alt text is the person’s name. Leave it empty when the name is shown next to the avatar.'],
  accessibility: [
    'The picture has the person’s name as alt text, or an empty alt when the name is beside it.',
    'The fallback face is decorative.',
    'Never rely on the photo alone to identify someone.',
  ],
  figma: [
    { label: 'Avatar, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11914-2605' },
    { label: 'Avatar, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5097-5884' },
  ],
  spec: 'playground/docs/design-system/avatars.md',
}

export function AvatarGuidelines() {
  return <GuidelinesTemplate g={g} />
}
