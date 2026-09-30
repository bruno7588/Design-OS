import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import first from './art/medal-first.svg'
import second from './art/medal-second.svg'
import third from './art/medal-third.svg'

// 5Mins Ranking badge (Figma "Ranking, leaderboard": dark 2613:26421, light 8442:6198): a
// leaderboard position in a 32px box. 1 to 3 sit on a gold, silver or bronze medal with the
// number in Neutral-25; from 4 on, the number alone in Text-tertiary. Bold 14/1.5.

const MEDALS: Record<number, string> = { 1: first, 2: second, 3: third }

export interface RankingBadgeProps {
  rank: number
  sx?: SxProps<Theme>
}

export function RankingBadge({ rank, sx }: RankingBadgeProps) {
  const medal = MEDALS[rank]
  return (
    <Box
      className="ds-ranking-badge"
      aria-label={`Rank ${rank}`}
      role="img"
      sx={[
        (theme) => ({
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          flexShrink: 0,
          fontFamily: theme.typography.fontFamily,
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1.5,
          color: medal ? theme.tokens.palette.neutral[25] : theme.tokens.semantic.textTertiary,
          '& img': { position: 'absolute', inset: 4, width: 24, height: 24 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {medal && <img src={medal} alt="" />}
      <Box component="span" aria-hidden sx={{ position: 'relative' }}>
        {rank}
      </Box>
    </Box>
  )
}
