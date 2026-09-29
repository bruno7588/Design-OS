import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import { Button, ToastBody, useToast, type Mode, type ToastType } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ToastMatrix, TYPES } from './ToastMatrix'

const SAMPLES: Record<ToastType, string> = {
  info: 'Report is being prepared',
  success: 'Course published',
  warning: 'Some learners have no team',
  error: 'Could not save changes',
}

export function ToastPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<ToastType>('success')
  const [icon, setIcon] = useState(true)
  const [undo, setUndo] = useState(false)
  const [message, setMessage] = useState(SAMPLES.success)
  const toast = useToast()

  const options = { type, message, icon, action: undo ? { label: 'Undo', onClick: () => {} } : undefined }

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 8, alignItems: 'center' }}>
          <ToastBody {...options} />
          <Button variant="outlined" onClick={() => toast(options)}>
            Show toast
          </Button>
        </Stack>
      }
      controls={
        <>
          <TextField
            select
            size="small"
            label="Type"
            value={type}
            onChange={(e) => {
              const next = e.target.value as ToastType
              setType(next)
              setMessage(SAMPLES[next])
            }}
          >
            {TYPES.map((t) => (
              <MenuItem key={t.type} value={t.type}>
                {t.figma}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={icon} onChange={(e) => setIcon(e.target.checked)} />} label="Icon" />
          <FormControlLabel control={<Switch checked={undo} onChange={(e) => setUndo(e.target.checked)} />} label="Undo action" />
          <TextField size="small" label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        </>
      }
      hint="Show toast places it at the bottom of the window for 5 seconds. Hover over it or focus it to keep it open; press it a few times to see the stack."
      matrix={<ToastMatrix mode={mode} />}
    />
  )
}
