import { useState } from 'react'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { ExternalTrainingCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ExternalTrainingCardMatrix, TRAINING } from './ExternalTrainingCardMatrix'

export function ExternalTrainingCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [last, setLast] = useState('')
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="external-training-card-preview">
          <ExternalTrainingCard {...TRAINING} device={device} onClick={() => setLast('Opened the training')} />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the card.'}
          </Typography>
        </Box>
      }
      controls={
        <TextField select size="small" label="Device" value={device} onChange={(e) => setDevice(e.target.value as typeof device)}>
          <MenuItem value="desktop">Desktop</MenuItem>
          <MenuItem value="mobile">Mobile</MenuItem>
        </TextField>
      }
      hint="The title is cut at two lines."
      matrix={<ExternalTrainingCardMatrix mode={mode} />}
    />
  )
}
