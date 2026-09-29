import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import { Button, ConfirmDialog, ConfirmDialogPreview, type DialogType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { DialogMatrix, TYPES } from './DialogMatrix'

export function DialogPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<DialogType>('error')
  const [icon, setIcon] = useState(true)
  const [text, setText] = useState(true)
  const [title, setTitle] = useState('Delete this course?')
  const [action, setAction] = useState('Delete course')
  const [open, setOpen] = useState(false)

  const content = {
    type,
    icon,
    title,
    secondaryText: text ? 'Learners lose access straight away. This cannot be undone.' : undefined,
    actionLabel: action,
  }

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 8, alignItems: 'center', py: 4 }}>
          <ConfirmDialogPreview {...content} />
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Open the dialog
          </Button>
          <ConfirmDialog {...content} open={open} onCancel={() => setOpen(false)} onConfirm={() => setOpen(false)} />
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(e.target.value as DialogType)}>
            {TYPES.map((t) => (
              <MenuItem key={t.type} value={t.type}>
                {t.figma}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={icon} onChange={(e) => setIcon(e.target.checked)} />} label="Icon" />
          <FormControlLabel control={<Switch checked={text} onChange={(e) => setText(e.target.checked)} />} label="Secondary text" />
          <TextField size="small" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField size="small" label="Action" value={action} onChange={(e) => setAction(e.target.value)} />
        </>
      }
      hint="Open the dialog to try it for real: focus starts on Cancel, Tab stays inside, and Escape or a click on the scrim does nothing."
      matrix={<DialogMatrix mode={mode} />}
    />
  )
}
