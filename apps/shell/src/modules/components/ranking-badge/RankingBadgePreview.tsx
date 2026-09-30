import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Avatar, RankingBadge, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { RankingBadgeMatrix } from './RankingBadgeMatrix'

const PEOPLE = [['Ana Costa', 2450], ['Jacob Patel', 2310], ['Mia Thompson', 2105], ['Samuel Lee', 1980], ['Chloe Campbell', 1720]] as const

export function RankingBadgePreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack component="ol" sx={{ m: 0, p: 0, listStyle: 'none', width: 360, gap: 2 }} data-testid="ranking-badge-preview" aria-label="Leaderboard">
          {PEOPLE.map(([name, points], i) => (
            <Box component="li" key={name} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <RankingBadge rank={i + 1} />
              <Avatar size={32} src="/samples/avatar.png" alt="" />
              <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{name}</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {points} Pt
              </Typography>
            </Box>
          ))}
        </Stack>
      }
      controls={<Typography variant="body2" color="text.secondary">A leaderboard: medals for the top three, then numbers.</Typography>}
      hint="Each badge is named “Rank 1”, “Rank 2”…"
      matrix={<RankingBadgeMatrix mode={mode} />}
    />
  )
}
