import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material'
import { Avatar, type AvatarSize, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { AvatarMatrix, PHOTO, SIZES } from './AvatarMatrix'

export function AvatarPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [size, setSize] = useState<AvatarSize>(40)
  const [picture, setPicture] = useState(true)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack direction="row" sx={{ gap: 3, alignItems: 'center' }} data-testid="avatar-preview">
          <Avatar size={size} src={picture ? PHOTO : undefined} alt={picture ? 'Ana Costa' : ''} />
          <Stack>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Ana Costa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              People team
            </Typography>
          </Stack>
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(Number(e.target.value) as AvatarSize)}>
            {SIZES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}px
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={picture} onChange={(e) => setPicture(e.target.checked)} />} label="Picture" />
        </>
      }
      hint="Without a picture, or when it fails to load, the avatar shows the Figma fallback face."
      matrix={<AvatarMatrix mode={mode} />}
    />
  )
}
