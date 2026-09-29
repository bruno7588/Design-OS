import { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Button, ShareModal, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ShareModalMatrix } from './ShareModalMatrix'
import { PEOPLE, TEAMS } from './samples'

export function ShareModalPreviewTab() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [last, setLast] = useState('')
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ alignItems: 'center', gap: 3 }} data-testid="share-modal-preview">
          <Button onClick={() => setOpen(true)}>Share Lesson</Button>
          <Typography variant="body2" color="text.secondary" role="status">
            {last || `${selected.length} selected.`}
          </Typography>
          <ShareModal
            open={open}
            onClose={() => setOpen(false)}
            people={PEOPLE}
            teams={TEAMS}
            selected={selected}
            onSelectedChange={setSelected}
            onShareTo={() => { setLast(`Shared with ${selected.length}.`); setOpen(false) }}
            onCopyLink={() => setLast('Link copied.')}
          />
        </Stack>
      }
      controls={<Typography variant="body2" color="text.secondary">Search, switch between People and Teams, and tick who to share with.</Typography>}
      hint="Closes on the close button, a click on the scrim or Escape."
      matrix={<ShareModalMatrix mode={mode} />}
    />
  )
}
