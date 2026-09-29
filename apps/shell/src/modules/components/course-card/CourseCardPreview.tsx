import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Slider, Switch, TextField, Typography } from '@mui/material'
import { CourseCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { COURSE, CourseCardMatrix } from './CourseCardMatrix'

export function CourseCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [progress, setProgress] = useState(37)
  const [isNew, setNew] = useState(true)
  const [due, setDue] = useState(true)
  const [last, setLast] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="course-card-preview">
          <CourseCard {...COURSE} device={device} progress={progress} isNew={isNew} dueDate={due ? 'Due on Aug 20' : undefined} onClick={() => setLast('Opened the course')} />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the card.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Device" value={device} onChange={(e) => setDevice(e.target.value as typeof device)}>
            <MenuItem value="desktop">Desktop</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
          </TextField>
          <Control label={`Progress: ${progress}%`}>
            <Slider size="small" value={progress} onChange={(_, v) => setProgress(v as number)} aria-label="Progress" />
          </Control>
          <FormControlLabel control={<Switch checked={isNew} onChange={(e) => setNew(e.target.checked)} />} label="New" />
          <FormControlLabel control={<Switch checked={due} onChange={(e) => setDue(e.target.checked)} />} label="Due date" />
        </>
      }
      hint="Hover the desktop card: the picture zooms. Mobile has no hover."
      matrix={<CourseCardMatrix mode={mode} />}
    />
  )
}
