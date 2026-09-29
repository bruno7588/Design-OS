import { useState } from 'react'
import { FormControlLabel, Stack, Switch } from '@mui/material'
import { Button, InputField, Modal, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ModalMatrix } from './ModalMatrix'

export function ModalPreviewTab() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [open, setOpen] = useState(false)
  const [supporting, setSupporting] = useState(true)
  const [action, setAction] = useState(true)
  const [name, setName] = useState('Onboarding')
  const [saved, setSaved] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ alignItems: 'center', gap: 3 }} data-testid="modal-preview">
          <Button onClick={() => setOpen(true)}>Edit collection</Button>
          {saved && <span aria-live="polite">Saved “{saved}”</span>}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Edit collection"
            supportingText={supporting ? 'Learners see the name on their home page.' : undefined}
            action={action ? { label: 'Save', onClick: () => { setSaved(name); setOpen(false) } } : undefined}
          >
            <Stack sx={{ gap: 5 }}>
              <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <InputField label="Description" placeholder="What is this collection for?" fullWidth />
            </Stack>
          </Modal>
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={supporting} onChange={(e) => setSupporting(e.target.checked)} />} label="Supporting text" />
          <FormControlLabel control={<Switch checked={action} onChange={(e) => setAction(e.target.checked)} />} label="Button" />
        </>
      }
      hint="Open it, then close it with the close button, Escape or a click on the scrim. Focus stays inside while it’s open and returns to the button."
      matrix={<ModalMatrix mode={mode} />}
    />
  )
}
