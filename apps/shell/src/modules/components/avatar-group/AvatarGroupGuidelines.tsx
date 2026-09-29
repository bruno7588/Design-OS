import { Avatar, AvatarGroup } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { PHOTO } from '../avatar/AvatarMatrix'

const Group = ({ size = 24 as 24 | 32 | 40, total = 6 }) => (
  <AvatarGroup size={size} total={total}>
    <Avatar src={PHOTO} alt="" />
    <Avatar alt="" />
    <Avatar src={PHOTO} alt="" />
    <Avatar alt="" />
  </AvatarGroup>
)

// Content from playground/docs/design-system/avatars.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'An avatar group shows a few of the people involved, overlapping, with a count of the rest.',
  whenToUse: ['For members, enrolled learners or recipients, where the number matters more than each face.', '24px in table cells, 32 or 40px where the group is the focus.'],
  whenNotToUse: ['When people need to find one person. Use a list.', 'For one or two people. Show the avatars and names.'],
  anatomy: {
    example: <Group size={40} />,
    parts: [
      { name: 'Avatars', description: 'Three, overlapping by 8, 12 or 16px. Each sits on top of the one before.' },
      { name: 'Ring', description: '1px Page-background round each one, so the overlaps read on any surface.' },
      { name: '+N counter', description: 'The same size, Page-background-hover, Regular Text-tertiary at 8, 10 or 12px.' },
    ],
  },
  variants: [
    { name: '24px', description: 'Dense rows and cells.', example: <Group size={24} /> },
    { name: '32px', description: 'Rows where the group matters.', example: <Group size={32} /> },
    { name: '40px', description: 'Headers and summaries.', example: <Group size={40} /> },
  ],
  states: [{ name: 'Default', description: 'No hover state. If the group opens a list of people, wrap it in a button.' }],
  dos: [
    { do: { example: <Group total={24} />, text: 'Put the true total in the counter.' }, dont: { example: <AvatarGroup size={24} max={9}>{Array.from({ length: 8 }, (_, i) => <Avatar key={i} alt="" />)}</AvatarGroup>, text: 'Show more than three before the counter.' } },
  ],
  content: ['Give the group a label nearby: "12 people enrolled".'],
  accessibility: ['Name the group with the text beside it; the avatars themselves have empty alt text.', 'The counter is read as "+N": keep the total in the visible text as well.'],
  figma: [
    { label: 'Avatar group, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11915-3296' },
    { label: 'Avatar group, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5097-5584' },
  ],
  spec: 'playground/docs/design-system/avatars.md',
}

export function AvatarGroupGuidelines() {
  return <GuidelinesTemplate g={g} />
}
