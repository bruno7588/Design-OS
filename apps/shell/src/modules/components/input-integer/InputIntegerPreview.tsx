import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import { InputInteger, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { InputIntegerMatrix } from './InputIntegerMatrix'

type Validation = 'none' | 'error' | 'success'

export function InputIntegerPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState<number | null>(3)
  const [label, setLabel] = useState('Maximum course attempts')
  const [helper, setHelper] = useState('After the last attempt, the course is marked failed.')
  const [max, setMax] = useState('10')
  const [validation, setValidation] = useState<Validation>('none')
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 360, maxWidth: '100%' }} data-testid="input-integer-preview">
          <InputInteger
            label={label || undefined}
            inputProps={label ? undefined : { 'aria-label': 'Attempts' }}
            helperText={validation === 'error' ? 'Choose between 1 and 10 attempts' : helper || undefined}
            value={value}
            onChange={setValue}
            min={1}
            max={max ? Number(max) : undefined}
            validation={validation}
            disabled={disabled}
          />
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Validation" value={validation} onChange={(e) => setValidation(e.target.value as Validation)}>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="success">Success</MenuItem>
          </TextField>
          <TextField size="small" label="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
          <TextField size="small" label="Helper text" value={helper} onChange={(e) => setHelper(e.target.value)} />
          <TextField size="small" label="Maximum" value={max} onChange={(e) => setMax(e.target.value.replace(/[^0-9]/g, ''))} />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Click − and +, type a number, or use the arrow keys, Home and End in the field."
      matrix={<InputIntegerMatrix mode={mode} />}
    />
  )
}
