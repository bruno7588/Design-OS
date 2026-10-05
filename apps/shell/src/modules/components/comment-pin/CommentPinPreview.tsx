import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material'
import { CommentPin, PageHeader, type CommentPinStatus, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { CommentPinMatrix, STATUSES } from './CommentPinMatrix'

// A pin on a page title, as it sits on a running demo.
export function CommentPinPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [status, setStatus] = useState<CommentPinStatus>('pending')
  const [selected, setSelected] = useState(false)
  const [author, setAuthor] = useState('Bruno')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box data-testid="comment-pin-preview" sx={{ position: 'relative', width: 420, p: 6 }}>
          <PageHeader title="People" supportingText="Everyone at Meridian Hotels who can access 5Mins." />
          <CommentPin author={author} status={status} selected={selected} onClick={() => setSelected((s) => !s)} aria-label={`Comment from ${author}`} sx={{ position: 'absolute', left: 120, top: 10 }} />
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Status" value={status} onChange={(e) => setStatus(e.target.value as CommentPinStatus)}>
            {STATUSES.map((s) => (
              <MenuItem key={s.status} value={s.status}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField size="small" label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <FormControlLabel control={<Switch checked={selected} onChange={(e) => setSelected(e.target.checked)} />} label="Selected" />
        </>
      }
      hint="Click the pin to select it, as opening its thread does. The point of the pin sits on the spot that was clicked."
      matrix={<CommentPinMatrix mode={mode} />}
    />
  )
}
