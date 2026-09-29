import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/ProductCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { MarketplaceCard } from '@design-os/components'

<MarketplaceCard type="subscription" title="Adobe Creative Cloud" subtitle="Try 20+ creative apps…" price="£59.99 / month" image={cover} onClick={open} />
<MarketplaceCard type="coaching" title="The Importance of Authentic Stories" subtitle="Ana Costa" price="£250" … />
<MarketplaceCard type="reward" title="3 months Spotify Premium" subtitle="Spotify" price="2000" … />   // points`

export function MarketplaceCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        Marketplace and External training cards share one layout, drawn by ProductCard.tsx. The file below is read from the
        source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ProductCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
