import { Box } from '@mui/material'
import { CategoryCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { CATEGORY } from './CategoryCardMatrix'

const Pad = ({ children }: { children: React.ReactNode }) => <Box sx={{ pt: 4 }}>{children}</Box>

// Content from playground/docs/design-system/cards.md and the Figma Card/ Category set.
const g: Guidelines = {
  overview: 'A category card opens a group of courses in the learner’s browse experience.',
  whenToUse: ['On browse pages that list categories, in the web app and the mobile app.'],
  whenNotToUse: ['For a single course. Use the Course card.', 'For Admin library folders. Use the Folder card.'],
  anatomy: {
    example: <Pad><CategoryCard {...CATEGORY} isNew /></Pad>,
    parts: [
      { name: 'Glow', description: 'A blurred copy of the image fills 300 × 204 (272 × 180 on mobile) at 32%. The card has no surface of its own.' },
      { name: 'Image', description: '240 × 140 (208 × 116 on mobile), radius 12, centred on the glow.' },
      { name: 'Title', description: 'Bold 16 on one line (Bold 14 on mobile), Text-primary.' },
      { name: 'Meta', description: 'collection-play 20 and play-circle 16: "12 courses", "24 lessons", Regular 14 (12 on mobile).' },
      { name: 'New', description: 'The New Badge, "New Courses", over the top edge.' },
    ],
  },
  variants: [
    { name: 'Mobile', description: '272 wide, gaps 12 and 4. No hover.', example: <Pad><CategoryCard {...CATEGORY} device="mobile" /></Pad> },
    { name: 'Disabled', description: 'Greyscale, a 40px lock, Text-disabled. On desktop, a tooltip says why.', example: <Pad><CategoryCard {...CATEGORY} disabled /></Pad> },
  ],
  states: [{ name: 'Hover', description: 'The image grows to 281 × 164 and the glow to 348 × 237 at 48%. No motion with reduced motion.' }],
  dos: [
    {
      do: { example: <Pad><CategoryCard {...CATEGORY} title="Leadership" /></Pad>, text: 'Use a short category name that fits on one line.' },
      dont: { example: <Pad><CategoryCard {...CATEGORY} title="Leadership, management and people skills for new managers" /></Pad>, text: 'Use long names; the title is cut at one line.' },
    },
  ],
  content: ['Category names in sentence case.', 'Disabled tooltip: "Category not available in your plan. Please contact Customer Success".'],
  accessibility: [
    'The card is an article; the title is its heading and its button.',
    'The disabled tooltip also shows on keyboard focus, and is linked to the card as its description.',
    'The lock is named "Locked".',
  ],
  figma: [
    { label: 'Card/ Category, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10574-3913' },
    { label: 'Card/ Category, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10176-1806' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function CategoryCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
