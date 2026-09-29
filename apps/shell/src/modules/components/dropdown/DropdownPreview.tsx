import { useState } from 'react'
import { FormControlLabel, Stack, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Dropdown, type Mode } from '@design-os/components'
import { Sort } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { DropdownMatrix } from './DropdownMatrix'

const DEPARTMENTS = [
  { value: 'people', label: 'People' },
  { value: 'sales', label: 'Sales' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal', disabled: true },
]

export function DropdownPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState('')
  const [placement, setPlacement] = useState<'top' | 'start'>('top')
  const [icon, setIcon] = useState(false)
  const [helper, setHelper] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 320, maxWidth: '100%' }}>
          <Dropdown
            label="Department"
            labelPlacement={placement}
            placeholder="Select a department"
            options={DEPARTMENTS}
            value={value}
            onChange={setValue}
            error={error}
            helperText={error ? 'Select a department to continue' : helper ? 'Learners see courses for their department first.' : undefined}
            iconLeft={icon ? <Sort color="currentColor" /> : undefined}
            disabled={disabled}
            fullWidth
          />
        </Stack>
      }
      controls={
        <>
          <Control label="Label">
            <ToggleButtonGroup exclusive size="small" value={placement} onChange={(_, v) => v && setPlacement(v)} fullWidth>
              <ToggleButton value="top" disableRipple>
                Top
              </ToggleButton>
              <ToggleButton value="start" disableRipple>
                Start
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <FormControlLabel control={<Switch checked={icon} onChange={(e) => setIcon(e.target.checked)} />} label="Icon left" />
          <FormControlLabel control={<Switch checked={helper} onChange={(e) => setHelper(e.target.checked)} />} label="Helper text" />
          <FormControlLabel control={<Switch checked={error} onChange={(e) => setError(e.target.checked)} />} label="Error" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Open it with a click, Enter, Space or the arrow keys. Arrows move, typing jumps to a match, Enter picks, Escape closes."
      matrix={<DropdownMatrix mode={mode} />}
    />
  )
}
