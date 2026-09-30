import { Box } from '@mui/material'
import { RankingBadge, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Ranking, leaderboard" set: 1, 2, 3 and 4, 16px apart.
export function RankingBadgeMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`ranking-badge-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[1, 2, 3, 4].map((r) => (
          <RankingBadge key={r} rank={r} />
        ))}
      </Box>
    </Canvas>
  )
}
