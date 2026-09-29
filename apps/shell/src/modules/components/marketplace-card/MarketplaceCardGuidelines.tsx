import { MarketplaceCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { SAMPLES } from './MarketplaceCardMatrix'

// Content from the Figma Card/Marketplace set (not documented in the prototype).
const g: Guidelines = {
  overview: 'A marketplace card shows an offer learners can buy or redeem: a subscription, a coaching session or a reward for points.',
  whenToUse: ['In the marketplace, in the web app and the mobile app.'],
  whenNotToUse: ['For external courses. Use the External training card.'],
  anatomy: {
    example: <MarketplaceCard {...SAMPLES[0]} />,
    parts: [
      { name: 'Image', description: '160 tall (140 on mobile).' },
      { name: 'Title', description: 'Bold 16/1.5 (14 on mobile), up to two lines.' },
      { name: 'Subtitle', description: 'Subscription: the description, Regular 14/1.5, up to three lines. Coaching and Reward: the coach or brand, one line (Regular 12/1.2 on mobile).' },
      { name: 'Price', description: 'Bold 16/1.5 (14 on mobile). Rewards show points after the Jewels illustration.' },
      { name: 'Card', description: 'Cards-background, radius 12, Shadow S in light mode.' },
    ],
  },
  variants: [
    { name: 'Coaching', description: 'The coach under the title.', example: <MarketplaceCard {...SAMPLES[1]} /> },
    { name: 'Reward', description: 'Priced in points.', example: <MarketplaceCard {...SAMPLES[2]} /> },
  ],
  states: [{ name: 'Hover', description: 'Cards-background-hover, like the other cards.' }],
  dos: [
    {
      do: { example: <MarketplaceCard {...SAMPLES[0]} />, text: 'Show what the price covers: "£59.99 / month".' },
      dont: { example: <MarketplaceCard {...SAMPLES[0]} price="59.99" />, text: 'Show a bare number for money.' },
    },
  ],
  content: ['Money with its currency and period: "£59.99 / month".', 'Points as a number: "2000".'],
  accessibility: ['The card is an article; the title is its heading and its button.', 'A reward price reads "2000 points".'],
  figma: [
    { label: 'Card/Marketplace, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9577-3648' },
    { label: 'Card/Marketplace, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5213-4524' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function MarketplaceCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
