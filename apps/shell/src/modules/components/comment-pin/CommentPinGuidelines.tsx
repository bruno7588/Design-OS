import { Box } from '@mui/material'
import { Badge, CommentPin } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const g: Guidelines = {
  overview: 'A comment pin marks a comment someone left on a live prototype, at the spot they clicked. Its colour says where the comment is: waiting, being worked on, done or failed.',
  whenToUse: ['On a running demo in the Prototypes module, to show where each comment is.', 'In docs and handoff screenshots that point at feedback on a screen.'],
  whenNotToUse: ['For notifications or counts. Use a badge.', 'For user avatars. Use an avatar.', 'In the 5Mins product itself: it is a Design OS tool.'],
  anatomy: {
    example: <CommentPin author="Bruno" aria-label="Comment from Bruno" />,
    parts: [
      { name: 'Pin', description: '28px, round with the bottom-left corner pointed at the spot. A 2px Page-background ring and Shadow S keep it readable on any surface.' },
      { name: 'Initial', description: "The author's first letter, Bold 12, in the button text colour." },
    ],
  },
  variants: [
    { name: 'Pending', description: 'Waiting: Primary button fill.', example: <CommentPin author="Ana" status="pending" aria-label="Pending" /> },
    { name: 'In progress', description: 'Watch mode is applying it: Warning button fill.', example: <CommentPin author="Ana" status="in-progress" aria-label="In progress" /> },
    { name: 'Done', description: 'Applied or resolved: Success button fill. Hidden unless "show resolved" is on.', example: <CommentPin author="Ana" status="done" aria-label="Done" /> },
    { name: 'Failed', description: "Watch mode couldn't apply it: Danger-500 fill.", example: <CommentPin author="Ana" status="failed" aria-label="Failed" /> },
  ],
  states: [
    { name: 'Hover and focus', description: 'The pin grows to 110%; with reduced motion it stays the same size. Keyboard focus also shows the selected ring.' },
    { name: 'Selected', description: 'A 4px Primary ring outside the Page-background ring while its thread is open.' },
  ],
  dos: [
    {
      do: { example: <CommentPin author="Bruno" status="pending" aria-label="Comment" />, text: 'Put the point on the exact spot the comment is about.' },
      dont: { example: <Badge type="informative" label="1 comment" />, text: 'Use a badge to mark a comment on the page.' },
    },
  ],
  content: ["One letter only: the author's initial. The comment itself goes in the thread."],
  accessibility: [
    'Each pin is a button named by the author and the comment, such as "Comment from Bruno: make the title shorter".',
    'aria-pressed shows whether its thread is open.',
    'Status is never colour alone: the thread and the Comments panel name it with a badge.',
  ],
  figma: [],
  spec: 'Code first (Phase 4c). Not in the Figma Library yet: add a light and a dark set.',
}

export function CommentPinGuidelines() {
  return (
    <Box>
      <GuidelinesTemplate g={g} />
    </Box>
  )
}
