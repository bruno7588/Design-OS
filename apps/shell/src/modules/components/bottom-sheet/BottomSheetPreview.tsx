import { useState } from 'react'
import { List, ListItemButton, Stack, Typography } from '@mui/material'
import { BottomSheet, Button, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { BottomSheetMatrix } from './BottomSheetMatrix'

export function BottomSheetPreviewTab() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState('')
  const pick = (s: string) => () => {
    setLast(s)
    setOpen(false)
  }
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ alignItems: 'center', gap: 3 }} data-testid="bottom-sheet-preview">
          <Button onClick={() => setOpen(true)}>Open Sheet</Button>
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `Picked “${last}”.` : 'Nothing picked.'}
          </Typography>
          <BottomSheet open={open} onClose={() => setOpen(false)} aria-labelledby="sheet-title">
            <Typography id="sheet-title" variant="h5">
              Lesson options
            </Typography>
            <List disablePadding>
              {['Save for later', 'Share', 'Report a problem'].map((s) => (
                <ListItemButton key={s} className="ds-nav-admin" onClick={pick(s)}>
                  {s}
                </ListItemButton>
              ))}
            </List>
          </BottomSheet>
        </Stack>
      }
      controls={<Typography variant="body2" color="text.secondary">Open it, then close it with Escape or a click on the dimmed page.</Typography>}
      hint="For the mobile app. Focus stays inside and returns to the button."
      matrix={<BottomSheetMatrix mode={mode} />}
    />
  )
}
