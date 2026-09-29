import { Box } from '@mui/material'
import { Avatar, Emoji } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma Emojies set and playground/docs/design-system/avatars.md.
const g: Guidelines = {
  overview: 'Emojis are friendly faces: the picture for an avatar without a photo, and a light touch in empty or celebratory moments.',
  whenToUse: ['As the Avatar fallback when someone has no picture.', 'In friendly moments, such as a welcome or a streak.'],
  whenNotToUse: ['To show status or meaning on their own. Use a Badge or text.', 'In place of illustrations for empty states. Use the Empty state illustrations.'],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Emoji type="smile" size={72} />
        <Emoji type="love" size={72} />
      </Box>
    ),
    parts: [
      { name: 'Plain face', description: 'Input-background, so it follows the mode: Angel, Smile, Hand waving, Gossip, Shy, Tenant.' },
      { name: 'Gradient face', description: 'A fixed colour gradient, the same in both modes: Love, Sad smile, Pleased, Starving, Silly, Got an idea, Laugh with tear.' },
      { name: 'Features', description: 'Neutral-600 in both modes. Tenant is a house outline, for organisations.' },
    ],
  },
  variants: [{ name: 'In an Avatar', description: 'Fills the circle at the Avatar size.', example: <Avatar size={48} alt="Ana Costa"><Emoji type="angel" size={48} /></Avatar> }],
  states: [],
  dos: [
    {
      do: { example: <Emoji type="hand-waving" size={56} label="Hello" />, text: 'Name it when it carries meaning ("Hello").' },
      dont: { example: <Emoji type="sad-smile" size={56} />, text: 'Rely on a face alone to say something went wrong.' },
    },
  ],
  content: [],
  accessibility: ['Decorative by default (hidden from screen readers).', 'Pass a label when the emoji means something.'],
  figma: [
    { label: 'Emojies, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12368-97' },
    { label: 'Emojies, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10587-2256' },
  ],
  spec: 'playground/docs/design-system/avatars.md',
}

export function EmojiGuidelines() {
  return <GuidelinesTemplate g={g} />
}
