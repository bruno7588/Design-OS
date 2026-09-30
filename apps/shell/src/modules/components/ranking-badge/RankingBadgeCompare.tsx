import { rankingBadgeFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { RankingBadgeMatrix } from './RankingBadgeMatrix'

// Figma = Ranking, leaderboard (dark 2613:26421, light 8442:6198), checked 2026-09-30.
const compare: Compare = {
  page: rankingBadgeFigma.page,
  set: rankingBadgeFigma.set,
  frames: { light: '/figma/ranking-badge-light.png', dark: '/figma/ranking-badge-dark.png' },
  live: (mode) => <RankingBadgeMatrix mode={mode} />,
  differences: [
    { property: '1 to 3', figma: '32px, padding 4: a 24px medal (Leaderboard/Ranking first, second, third) with a white Bold 14 number', reference: 'Same (the medals as artwork)', status: 'Matches' },
    { property: '4', figma: 'The number alone, Bold 14 in Text-disabled', reference: 'Same, for any rank from 4', status: 'Matches' },
    { property: 'Number colour', figma: 'A raw #FFFFFF on the medals', reference: 'Neutral-0', status: 'Design to update', note: 'Bind to Neutral-0.' },
    { property: 'Property name', figma: 'Rank (renamed from Property 1 on 2026-09-30)', reference: 'rank', status: 'Matches' },
  ],
  engineering: {
    mui: 'Box',
    usage: `<RankingBadge rank={1} />`,
    props: [{ figma: 'Rank', code: 'rank' }],
    theme: ['No theme override.'],
    files: ['packages/components/src/Gamification/RankingBadge.tsx', 'packages/components/src/Gamification/art/medal-*.svg'],
  },
}

export function RankingBadgeCompare() {
  return <CompareTemplate c={compare} />
}
