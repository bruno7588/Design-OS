import { useState } from 'react'
import { FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material'
import { ProgressBar, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ProgressBarMatrix } from './ProgressBarMatrix'

export function ProgressBarPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState(62)
  const [label, setLabel] = useState(true)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 2, width: 400, maxWidth: '100%' }} data-testid="progress-bar-preview">
          <Typography variant="body2" sx={{ fontWeight: 600 }} id="course-progress">
            Leadership essentials
          </Typography>
          <ProgressBar value={value} showLabel={label} aria-labelledby="course-progress" />
        </Stack>
      }
      controls={
        <>
          <TextField
            size="small"
            type="number"
            label="Progress (%)"
            value={value}
            onChange={(e) => setValue(Math.max(0, Math.min(100, Number(e.target.value))))}
            inputProps={{ min: 0, max: 100, step: 1 }}
          />
          <FormControlLabel control={<Switch checked={label} onChange={(e) => setLabel(e.target.checked)} />} label="Percentage" />
        </>
      }
      hint="At 100% the bar turns Success-500. Screen readers hear the value as a progress bar named by the course."
      matrix={<ProgressBarMatrix mode={mode} />}
    />
  )
}
