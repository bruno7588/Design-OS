import { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Button, FullScreenModal, InputField, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { FullScreenModalMatrix } from './FullScreenModalMatrix'

export function FullScreenModalPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [open, setOpen] = useState(false)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ alignItems: 'center', gap: 3 }} data-testid="full-screen-modal-preview">
          <Button onClick={() => setOpen(true)}>Create Flashcard</Button>
          <FullScreenModal open={open} onClose={() => setOpen(false)} aria-labelledby="fs-title">
            <Stack sx={{ maxWidth: 720, mx: 'auto', px: 6, py: 16, gap: 6 }}>
              <Typography id="fs-title" variant="h3">
                Create flashcard
              </Typography>
              <InputField label="Front" placeholder="The question" fullWidth />
              <InputField label="Back" placeholder="The answer" fullWidth />
              <Button onClick={() => setOpen(false)} sx={{ alignSelf: 'flex-start' }}>
                Save Flashcard
              </Button>
            </Stack>
          </FullScreenModal>
        </Stack>
      }
      controls={<Typography variant="body2" color="text.secondary">Open it, then close it with the close button or Escape.</Typography>}
      hint="The whole viewport, in Page-background. Focus stays inside and returns to the button."
      matrix={<FullScreenModalMatrix mode={mode} />}
    />
  )
}
