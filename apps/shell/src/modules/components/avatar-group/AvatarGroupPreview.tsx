import { useState } from 'react'
import { MenuItem, Stack, TextField, Typography } from '@mui/material'
import { Avatar, AvatarGroup, type AvatarGroupSize, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { PHOTO } from '../avatar/AvatarMatrix'
import { AvatarGroupMatrix, GROUP_SIZES } from './AvatarGroupMatrix'

const PEOPLE = ['Ana Costa', 'Ben Hall', 'Chloe Kim', 'Dev Patel', 'Eva Silva', 'Finn Ross', 'Gia Lopez', 'Hugo Chen', 'Ines Mota', 'Jack Moore', 'Kai Duarte', 'Lia Santos']

export function AvatarGroupPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [size, setSize] = useState<AvatarGroupSize>(32)
  const [count, setCount] = useState(8)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 2, alignItems: 'center' }} data-testid="avatar-group-preview">
          <AvatarGroup size={size} total={count}>
            {PEOPLE.slice(0, count).map((p, i) => (
              <Avatar key={p} src={i % 2 ? undefined : PHOTO} alt={p} />
            ))}
          </AvatarGroup>
          <Typography variant="body2" color="text.secondary">
            {count} people enrolled
          </Typography>
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(Number(e.target.value) as AvatarGroupSize)}>
            {GROUP_SIZES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}px
              </MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="People" value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {[2, 3, 4, 8, 12].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </TextField>
        </>
      }
      hint="Three avatars show; the counter says how many more. Each avatar sits on top of the one before, as in Figma."
      matrix={<AvatarGroupMatrix mode={mode} />}
    />
  )
}
