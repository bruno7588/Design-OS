import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import { InputField, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { InputMatrix } from './InputMatrix'

type Validation = 'none' | 'error' | 'success'

export function InputPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState('')
  const [label, setLabel] = useState('Course title')
  const [helper, setHelper] = useState('Learners see this on their feed.')
  const [validation, setValidation] = useState<Validation>('none')
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 360, maxWidth: '100%' }}>
          <InputField
            label={label || undefined}
            placeholder="Add a title"
            helperText={validation === 'error' ? 'Add a title of 3 characters or more' : helper || undefined}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            validation={validation}
            disabled={disabled}
            fullWidth
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
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Type in the field, hover over it and tab to it to see the real states."
      matrix={<InputMatrix mode={mode} />}
    />
  )
}
