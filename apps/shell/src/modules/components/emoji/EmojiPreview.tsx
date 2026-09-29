import { useState } from 'react'
import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { Avatar, Emoji, EMOJI_TYPES, type EmojiType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { EmojiMatrix } from './EmojiMatrix'

const SIZES = [24, 32, 40, 48, 56, 64, 72, 120]

export function EmojiPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<EmojiType>('smile')
  const [size, setSize] = useState(72)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ alignItems: 'center', gap: 4 }} data-testid="emoji-preview">
          <Emoji type={type} size={size} label={type.replace(/-/g, ' ')} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar size={40} alt="Ana Costa">
              <Emoji type={type} size={40} />
            </Avatar>
            <span>In an Avatar without a picture</span>
          </Box>
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(e.target.value as EmojiType)}>
            {EMOJI_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t.replace(/-/g, ' ')}
              </MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(Number(e.target.value))}>
            {SIZES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}px
              </MenuItem>
            ))}
          </TextField>
        </>
      }
      hint="Plain faces follow the mode; gradient faces are the same in both."
      matrix={<EmojiMatrix mode={mode} />}
    />
  )
}
