import { useState } from 'react'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { ResourceCard, RESOURCE_TYPES, type Mode, type ResourceType } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ResourceCardMatrix, TITLE } from './ResourceCardMatrix'

export function ResourceCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'web' | 'mobile'>('web')
  const [type, setType] = useState<ResourceType>('pdf')
  const [last, setLast] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: device === 'mobile' ? 344 : 900, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="resource-card-preview">
          <ResourceCard device={device} type={type} title={TITLE} size="1.1 MB" onOpen={() => setLast(type === 'link' ? 'Opened the link' : 'Downloaded the file')} />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the action.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Device" value={device} onChange={(e) => setDevice(e.target.value as typeof device)}>
            <MenuItem value="web">Web/Admin</MenuItem>
            <MenuItem value="mobile">Mobile app</MenuItem>
          </TextField>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(e.target.value as ResourceType)}>
            {Object.entries(RESOURCE_TYPES).map(([k, v]) => (
              <MenuItem key={k} value={k}>
                {v}
              </MenuItem>
            ))}
          </TextField>
        </>
      }
      hint="Files download; links open in a new tab."
      matrix={<ResourceCardMatrix mode={mode} />}
    />
  )
}
