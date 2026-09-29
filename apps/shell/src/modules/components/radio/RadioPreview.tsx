import { useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material'
import type { Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { RadioMatrix } from './RadioMatrix'

const MODES = [
  { value: 'auto', label: 'Automatic' },
  { value: 'manual', label: 'Manual review' },
  { value: 'hybrid', label: 'Hybrid' },
]

export function RadioPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState('auto')
  const [row, setRow] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <FormControl component="fieldset" disabled={disabled} data-testid="radio-preview">
          <FormLabel component="legend">Enrolment</FormLabel>
          <RadioGroup name="enrolment" value={value} onChange={(e) => setValue(e.target.value)} row={row} sx={{ columnGap: 6 }}>
            {MODES.map((m) => (
              <FormControlLabel key={m.value} value={m.value} control={<Radio />} label={m.label} />
            ))}
          </RadioGroup>
        </FormControl>
      }
      controls={
        <>
          <Control label="Direction">
            <ToggleButtonGroup exclusive size="small" value={row ? 'row' : 'column'} onChange={(_, v) => v && setRow(v === 'row')} fullWidth>
              <ToggleButton value="column" disableRipple>
                Vertical
              </ToggleButton>
              <ToggleButton value="row" disableRipple>
                Horizontal
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Tab moves into the group; the arrow keys move and pick. Clicking a label picks its option."
      matrix={<RadioMatrix mode={mode} />}
    />
  )
}
