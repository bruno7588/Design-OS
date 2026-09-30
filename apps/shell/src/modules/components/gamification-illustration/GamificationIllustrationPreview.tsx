import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { GamificationIllustration, GAMIFICATION_ILLUSTRATIONS, type GamificationIllustrationType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { GamificationIllustrationMatrix } from './GamificationIllustrationMatrix'

const ITEMS = (Object.keys(GAMIFICATION_ILLUSTRATIONS) as GamificationIllustrationType[]).map((t) => ({ key: t, node: <GamificationIllustration type={t} />, caption: GAMIFICATION_ILLUSTRATIONS[t] }))

export function GamificationIllustrationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box data-testid="gamification-illustration-preview" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 6 }}>
          {ITEMS.map((i) => (
            <Box key={i.key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {i.node}
              <Typography variant="caption" color="text.secondary" sx={{ '&::first-letter': { textTransform: 'uppercase' } }}>
                {i.caption}
              </Typography>
            </Box>
          ))}
        </Box>
      }
      controls={<Typography variant="body2" color="text.secondary">Artwork is shown at its drawn size. Switch the mode to check it on both backgrounds.</Typography>}
      hint="Decorative by default; pass label when nothing beside it names it."
      matrix={<GamificationIllustrationMatrix mode={mode} />}
    />
  )
}
