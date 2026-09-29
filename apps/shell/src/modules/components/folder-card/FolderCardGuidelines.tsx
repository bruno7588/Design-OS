import { Box } from '@mui/material'
import { FolderCard, NewFolderCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { IMAGE } from './FolderCardMatrix'

// Content from playground/docs/design-system/cards.md and the Figma Card/Folder set.
const g: Guidelines = {
  overview: 'A folder card groups courses in the Admin library, previewing them as a stacked deck.',
  whenToUse: ['In the Admin content library, to organise courses into folders.'],
  whenNotToUse: ['For learner browse pages. Use the Category card.', 'For a single course. Use the Course card.'],
  anatomy: {
    example: <FolderCard title="Onboarding" count={5} image={IMAGE} />,
    parts: [
      { name: 'Surface', description: '308 × 272, Cards-background, radius 12, padding 24, Shadow S in light mode.' },
      { name: 'Deck', description: 'The cover, 240 × 140, radius 8, with up to two layers behind it: Border-elevated (224 × 132) and Cards-background-hover (208 × 118).' },
      { name: 'Title', description: 'Bold 16/1.5, Text-primary, 16px under the surface.' },
      { name: 'Count', description: '"5 courses", Regular 14, Text-secondary, 8px under the title.' },
    ],
  },
  variants: [
    { name: 'Empty', description: 'No deck: the empty-folder artwork in Border-elevated.', example: <FolderCard title="Drafts" count={0} /> },
    {
      name: 'New Folder',
      description: 'The last tile: a 1.5px dashed Border-elevated outline with a + and "New Folder".',
      example: (
        <Box>
          <NewFolderCard />
        </Box>
      ),
    },
  ],
  states: [{ name: 'Hover', description: 'The surface fills Cards-background-hover; the deck steps back to 200 wide and the back layers darken.' }],
  dos: [
    {
      do: { example: <FolderCard title="Onboarding" count={5} image={IMAGE} />, text: 'Show the real number of courses.' },
      dont: { example: <FolderCard title="Onboarding" count={5} countLabel="Some courses" image={IMAGE} />, text: 'Replace the count with vague text.' },
    },
  ],
  content: ['Folder names in sentence case.', 'Count: "1 course", "5 courses".', 'The creator tile says "New Folder" (Title Case, as a button).'],
  accessibility: ['The card is an article; the title is its heading and its button.', 'New Folder is a button; the + is decorative.'],
  figma: [
    { label: 'Card/folder, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10175-3183' },
    { label: 'Card/Folder, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10175-3106' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function FolderCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
