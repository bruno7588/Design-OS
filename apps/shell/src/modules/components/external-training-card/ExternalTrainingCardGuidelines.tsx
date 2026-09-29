import { ExternalTrainingCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { TRAINING } from './ExternalTrainingCardMatrix'

// Content from the Figma Card/External training set (not documented in the prototype).
const g: Guidelines = {
  overview: 'An external training card shows a course from outside 5Mins, such as a certification, with its provider and price.',
  whenToUse: ['On learning pages that list paid external courses.'],
  whenNotToUse: ['For 5Mins courses. Use the Course card.', 'For perks and rewards. Use the Marketplace card.'],
  anatomy: {
    example: <ExternalTrainingCard {...TRAINING} />,
    parts: [
      { name: 'Image', description: '160 tall, the card’s full width (300, or 272 on mobile).' },
      { name: 'Title', description: 'Bold 16/1.5 (14 on mobile), up to two lines.' },
      { name: 'Provider', description: 'Regular 14/1.5, Text-secondary, 8px under the title.' },
      { name: 'Price', description: 'Bold 16/1.5 (14 on mobile), Text-primary.' },
      { name: 'Card', description: 'Cards-background, radius 12, info padding 24 (16 on mobile), gap 16, Shadow S in light mode.' },
    ],
  },
  variants: [{ name: 'Mobile', description: '272 wide, padding 16. No hover.', example: <ExternalTrainingCard {...TRAINING} device="mobile" /> }],
  states: [{ name: 'Hover', description: 'Cards-background-hover (desktop).' }],
  dos: [
    {
      do: { example: <ExternalTrainingCard {...TRAINING} />, text: 'Show the full price with its currency.' },
      dont: { example: <ExternalTrainingCard {...TRAINING} price="From 399" />, text: 'Leave the currency out.' },
    },
  ],
  content: ['Titles as the provider names them.', 'Prices with the currency symbol: "£399".'],
  accessibility: ['The card is an article; the title is its heading and its button.'],
  figma: [
    { label: 'Card/External training, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9577-3582' },
    { label: 'Card/External training, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5908-21523' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function ExternalTrainingCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
