import { Box } from '@mui/material'
import { ShareModalPreview } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { PEOPLE, TEAMS } from './samples'

const Example = () => (
  <Box sx={{ transform: 'scale(0.75)', transformOrigin: 'top left', height: 612 }}>
    <ShareModalPreview onClose={() => undefined} people={PEOPLE} teams={TEAMS} selected={['Jacob Patel']} onSelectedChange={() => undefined} />
  </Box>
)

// Content from the Figma Modal/Send set (not documented in the prototype).
const g: Guidelines = {
  overview: 'The share modal sends a lesson or course to people or teams, or copies its link.',
  whenToUse: ['When a learner or admin shares content with colleagues.'],
  whenNotToUse: ['To assign content. Use the assignment flow.', 'For a general choice from a list. Use the Dropdown or the Modal.'],
  anatomy: {
    example: <Example />,
    parts: [
      { name: 'Surface', description: '400 wide, Page-background, radius 12, Shadow L, padding 32, sections 24 apart.' },
      { name: 'Title', description: 'Bold 20/1.5, Text-primary: "Share lesson".' },
      { name: 'Search', description: 'The Search, Size L. It filters the list.' },
      { name: 'Switcher', description: 'The Content switcher: People and Teams.' },
      { name: 'List', description: 'Rows 56px: Avatar 40, name Bold 14, role or manager Regular 12, a Checkbox on the right; Border between rows. It scrolls.' },
      { name: 'Actions', description: 'Two Outlined buttons: Share To and Copy Link.' },
    ],
  },
  variants: [],
  states: [{ name: 'Selected', description: 'The row’s Checkbox is ticked.' }],
  dos: [
    {
      do: { example: <Box sx={{ p: 2 }}>Share lesson</Box>, text: 'Name what’s being shared in the title.' },
      dont: { example: <Box sx={{ p: 2 }}>Send</Box>, text: 'Use a vague title.' },
    },
  ],
  content: ['Title in sentence case: "Share lesson".', 'Button labels in Title Case: "Share To", "Copy Link".'],
  accessibility: [
    'It’s a dialog named by its title; focus stays inside and returns on close.',
    'The list is named People or Teams; each Checkbox is named by the person or team.',
    'The Search is named "Search people" or "Search teams".',
  ],
  figma: [
    { label: 'Modal/Send, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12358-472' },
    { label: 'Modal/Send, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5399-12437' },
  ],
  spec: 'playground/docs/design-system/overlays.md',
}

export function ShareModalGuidelines() {
  return <GuidelinesTemplate g={g} />
}
