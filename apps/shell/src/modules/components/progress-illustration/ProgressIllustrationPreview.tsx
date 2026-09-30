import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { ProgressIllustration, PROGRESS_ILLUSTRATIONS, type ProgressIllustrationType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ProgressIllustrationMatrix } from './ProgressIllustrationMatrix'

const ITEMS = (Object.keys(PROGRESS_ILLUSTRATIONS) as ProgressIllustrationType[]).map((t) => ({ key: t, node: <ProgressIllustration type={t} />, caption: PROGRESS_ILLUSTRATIONS[t] }))

export function ProgressIllustrationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box data-testid="progress-illustration-preview" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 6 }}>
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
      matrix={<ProgressIllustrationMatrix mode={mode} />}
    />
  )
}
