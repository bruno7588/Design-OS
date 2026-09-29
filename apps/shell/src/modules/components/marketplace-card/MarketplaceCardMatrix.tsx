import { Box } from '@mui/material'
import { MarketplaceCard, type MarketplaceCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { CardGroup } from '../shared/CardGroup'

const image = '/samples/thumbnail.png'
export const SAMPLES: MarketplaceCardProps[] = [
  { type: 'subscription', title: 'Adobe Creative Cloud Could Be 2 Lines', subtitle: 'Try 20+ creative apps, including Photoshop and Acrobat Pro, plus all the perks', price: '£59.99 / month', image },
  { type: 'coaching', title: 'The Importance of Authentic Stories', subtitle: 'Coach name', price: '£250', image },
  { type: 'reward', title: '3 months Subscription Spotify Premium', subtitle: 'Spotify', price: '2000', image },
]

// The Figma Card/Marketplace set: Subscription, Coaching and Reward, each Mobile then Desktop, Enabled then Hover.
export function MarketplaceCardMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`marketplace-card-matrix-${mode}`}>
        <CardGroup label="Subscription, Coaching and Reward">
          {SAMPLES.flatMap((s) => [
            <MarketplaceCard key={s.type + 'm'} {...s} device="mobile" />,
            <MarketplaceCard key={s.type + 'mh'} {...s} device="mobile" className="ds-hover" />,
            <MarketplaceCard key={s.type + 'd'} {...s} />,
            <MarketplaceCard key={s.type + 'dh'} {...s} className="ds-hover" />,
          ])}
        </CardGroup>
      </Box>
    </Canvas>
  )
}
