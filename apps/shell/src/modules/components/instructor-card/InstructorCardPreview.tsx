import { useState } from 'react'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { InstructorCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { INSTRUCTOR, InstructorCardMatrix } from './InstructorCardMatrix'

export function InstructorCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [last, setLast] = useState('')
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="instructor-card-preview">
          <InstructorCard {...INSTRUCTOR} device={device} onClick={() => setLast('Opened the instructor')} />
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
      hint="Up to two skill rows show; the bio is cut at two lines."
      matrix={<InstructorCardMatrix mode={mode} />}
    />
  )
}
