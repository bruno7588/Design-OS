import { useState } from 'react'
import { FormControlLabel, Slider, Stack, Switch, Typography } from '@mui/material'
import type { Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { SliderMatrix } from './SliderMatrix'

export function SliderPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState(80)
  const [disabled, setDisabled] = useState(false)
  const [label, setLabel] = useState(true)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 320, gap: 2 }} data-testid="slider-preview">
          <Typography id="pass-mark" variant="body2" sx={{ fontWeight: 600 }} color="text.secondary">
            Pass mark: {value}%
          </Typography>
          <Slider
            aria-labelledby="pass-mark"
            value={value}
            onChange={(_, v) => setValue(v as number)}
            step={5}
            disabled={disabled}
            valueLabelDisplay={label ? 'auto' : 'off'}
            getAriaValueText={(v) => `${v}%`}
          />
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={label} onChange={(e) => setLabel(e.target.checked)} />} label="Value label" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Drag the thumb, or tab to it and use the arrow keys, Page Up and Down, Home and End."
      matrix={<SliderMatrix mode={mode} />}
    />
  )
}
