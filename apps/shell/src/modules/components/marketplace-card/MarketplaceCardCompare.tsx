import { marketplaceCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { MarketplaceCardMatrix } from './MarketplaceCardMatrix'

// Figma = Card/Marketplace (dark 5213:4524, light 9577:3648), checked 2026-09-29.
const compare: Compare = {
  page: marketplaceCardFigma.page,
  set: marketplaceCardFigma.set,
  frames: { light: '/figma/marketplace-card-light.png', dark: '/figma/marketplace-card-dark.png' },
  live: (mode) => <MarketplaceCardMatrix mode={mode} />,
  differences: [
    { property: 'Desktop', figma: '300 wide; image 160; padding 24, gap 16; title Bold 16, subtitle Regular 14/1.5, 8 apart; price Bold 16', reference: 'Same (Subscription 367, Coaching and Reward 325)', status: 'Matches' },
    { property: 'Mobile', figma: '272 wide; image 140; padding 16, gap 12; title Bold 14, subtitle 4 under it; price Bold 14', reference: 'Same (Subscription 314, Coaching and Reward 265)', status: 'Matches' },
    { property: 'Mobile radius', figma: '12 (was 8; set 2026-09-29)', reference: 'Same', status: 'Matches' },
    { property: 'Reward price', figma: 'The Jewels illustration (Illustrations/ Progress, inside a layer named Illustrations/Certificate), 21 mobile, 24 desktop, and the points, 8 apart', reference: 'The Jewels illustration from the prototype; read as "2000 points"', status: 'Matches', note: 'The layer name says Certificate; worth renaming.' },
    { property: 'Hover', figma: 'State=Hover added to all six variants on 2026-09-29: Cards-background-hover', reference: 'Same', status: 'Matches' },
    { property: 'Mobile subtitle', figma: 'Subscription Regular 14/1.5; Coaching and Reward Regular 12/1.2', reference: 'Same', status: 'Matches' },
    { property: 'Shadow', figma: 'Shadow S in the light set', reference: 'Same', status: 'Matches' },
    { property: 'Docs', figma: '–', reference: '–', status: 'Code to update', note: 'cards.md doesn’t cover this card yet.' },
  ],
  engineering: {
    mui: 'Box (article)',
    usage: `<MarketplaceCard type="reward" title="3 months Spotify Premium" subtitle="Spotify" price="2000" image={cover} onClick={open} />`,
    props: [
      { figma: 'Type', code: 'type: subscription | coaching | reward' },
      { figma: 'Device', code: 'device: desktop | mobile' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/ProductCard.tsx', 'packages/components/src/Card/illustrations/jewels.svg'],
  },
}

export function MarketplaceCardCompare() {
  return <CompareTemplate c={compare} />
}
