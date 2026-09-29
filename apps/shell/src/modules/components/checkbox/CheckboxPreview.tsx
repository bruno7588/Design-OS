import { useState } from 'react'
import { Box, FormControl, FormControlLabel, FormLabel, Stack, Switch } from '@mui/material'
import { Checkbox, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { CheckboxMatrix } from './CheckboxMatrix'

const DEPARTMENTS = ['People', 'Sales', 'Engineering']

export function CheckboxPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [picked, setPicked] = useState<string[]>(['Sales'])
  const [labels, setLabels] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const all = picked.length === DEPARTMENTS.length
  const some = picked.length > 0 && !all
  const toggle = (d: string) => setPicked((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]))

  const row = (label: string, control: React.ReactElement) =>
    labels ? <FormControlLabel key={label} control={control} label={label} disabled={disabled} /> : <Box key={label}>{control}</Box>

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <FormControl component="fieldset" data-testid="checkbox-preview">
          <FormLabel component="legend">Departments</FormLabel>
          {row(
            'All departments',
            <Checkbox
              checked={all}
              indeterminate={some}
              onChange={() => setPicked(all ? [] : DEPARTMENTS)}
              disabled={disabled}
              inputProps={labels ? undefined : { 'aria-label': 'All departments' }}
            />,
          )}
          <Stack sx={{ pl: 8 }}>
            {DEPARTMENTS.map((d) =>
              row(d, <Checkbox checked={picked.includes(d)} onChange={() => toggle(d)} disabled={disabled} inputProps={labels ? undefined : { 'aria-label': d }} />),
            )}
          </Stack>
        </FormControl>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={labels} onChange={(e) => setLabels(e.target.checked)} />} label="Labels" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="The parent is indeterminate while some departments are picked. Tab between boxes, Space ticks one, and the label ticks it too."
      matrix={<CheckboxMatrix mode={mode} />}
    />
  )
}
