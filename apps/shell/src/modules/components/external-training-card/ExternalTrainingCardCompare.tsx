import { externalTrainingCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ExternalTrainingCardMatrix } from './ExternalTrainingCardMatrix'

// Figma = Card/External training (dark 5908:21523, light 9577:3582), checked 2026-09-29.
const compare: Compare = {
  page: externalTrainingCardFigma.page,
  set: externalTrainingCardFigma.set,
  frames: { light: '/figma/external-training-card-light.png', dark: '/figma/external-training-card-dark.png' },
  live: (mode) => <ExternalTrainingCardMatrix mode={mode} />,
  differences: [
    { property: 'Desktop', figma: '300 × 325; image 160; info padding 24, gap 16; title Bold 16 (2 lines), provider Regular 14, 8 apart; price Bold 16', reference: 'Same', status: 'Matches' },
    { property: 'Mobile', figma: '272 × 300; image 160; padding 16, gap 16; title and price Bold 14; provider Regular 14', reference: 'Same', status: 'Matches' },
    { property: 'Title', figma: 'No truncation set', reference: 'Clamped at two lines', status: 'Matches' },
    { property: 'Hover', figma: 'Cards-background-hover; mobile Hover added 2026-09-29', reference: 'Same', status: 'Matches' },
    { property: 'Shadow', figma: 'Shadow S in the light set', reference: 'Same', status: 'Matches' },
    { property: 'Docs', figma: '–', reference: '–', status: 'Code to update', note: 'cards.md doesn’t cover this card yet.' },
  ],
  engineering: {
    mui: 'Box (article)',
    usage: `<ExternalTrainingCard title={t.title} provider={t.provider} price="£399" image={t.cover} onClick={open} />`,
    props: [{ figma: 'Device', code: 'device: desktop | mobile' }],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/ProductCard.tsx'],
  },
}

export function ExternalTrainingCardCompare() {
  return <CompareTemplate c={compare} />
}
