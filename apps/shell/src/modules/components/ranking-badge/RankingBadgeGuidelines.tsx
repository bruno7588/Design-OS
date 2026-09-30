import { Box } from '@mui/material'
import { RankingBadge } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Ranking, leaderboard" set (not documented in the prototype).
const g: Guidelines = {
  overview: 'The ranking badge shows a place on a leaderboard: a medal for the top three, the number from fourth on.',
  whenToUse: ['On leaderboards, before each learner or team.'],
  whenNotToUse: ['For counts or scores. Use the Badge or plain text.'],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4].map((r) => (
          <RankingBadge key={r} rank={r} />
        ))}
      </Box>
    ),
    parts: [
      { name: 'Box', description: '32 × 32.' },
      { name: 'Medal', description: 'Gold, silver or bronze, 24px (artwork).' },
      { name: 'Number', description: 'Bold 14/1.5: white on a medal, Text-disabled without one.' },
    ],
  },
  variants: [],
  states: [],
  dos: [
    {
      do: { example: <RankingBadge rank={1} />, text: 'Use it in an ordered list, so the order is clear without the medals.' },
      dont: { example: <RankingBadge rank={12} />, text: 'Rely on colour alone to say who won.' },
    },
  ],
  content: [],
  accessibility: ['Named "Rank 1", "Rank 2"…; the medal is decorative.', 'Put leaderboards in an ordered list.'],
  figma: [
    { label: 'Ranking, leaderboard, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8442-6198' },
    { label: 'Ranking, leaderboard, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=2613-26421' },
  ],
  spec: 'playground/docs/design-system/gamification.md',
}

export function RankingBadgeGuidelines() {
  return <GuidelinesTemplate g={g} />
}
