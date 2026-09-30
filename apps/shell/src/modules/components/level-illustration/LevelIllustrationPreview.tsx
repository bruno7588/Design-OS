import { useState } from 'react'
import { Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { LevelIllustration, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { LEVELS, LevelIllustrationMatrix } from './LevelIllustrationMatrix'

export function LevelIllustrationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [large, setLarge] = useState(false)
  const [disabled, setDisabled] = useState(false)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }} data-testid="level-illustration-preview">
          {LEVELS.map((l) => (
            <Box key={l} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <LevelIllustration level={l} size={large ? 'large' : 'small'} disabled={disabled} />
              <Typography variant="caption" color="text.secondary">
                {typeof l === 'number' ? `Level ${l}` : l[0].toUpperCase() + l.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={large} onChange={(e) => setLarge(e.target.checked)} />} label="Large" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Small is 56px with the number; large is 72px with a banner or ribbon."
      matrix={<LevelIllustrationMatrix mode={mode} />}
    />
  )
}
