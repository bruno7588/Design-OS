import { useState } from 'react'
import { Box, MenuItem, TextField } from '@mui/material'
import { Tag, TAG_TYPES, type Mode, type TagType } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { TagMatrix } from './TagMatrix'

// A tag in the corner of a lesson thumbnail, as it's used.
export function TagPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<TagType>('video')
  const [size, setSize] = useState<'L' | 'M' | 'S'>('M')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box
          data-testid="tag-preview"
          sx={(theme) => ({
            position: 'relative',
            width: 240,
            height: 135,
            borderRadius: `${theme.tokens.radius.s}px`,
            overflow: 'hidden',
            backgroundImage: 'url(/samples/thumbnail.png)',
            backgroundSize: 'cover',
          })}
        >
          <Tag type={type} size={size} sx={{ position: 'absolute', top: 0, left: 0 }} />
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Media type" value={type} onChange={(e) => setType(e.target.value as TagType)}>
            {(Object.keys(TAG_TYPES) as TagType[]).map((t) => (
              <MenuItem key={t} value={t}>
                {TAG_TYPES[t].label}
              </MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(e.target.value as 'L' | 'M' | 'S')}>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="S">S</MenuItem>
          </TextField>
        </>
      }
      hint="The tag sits in the top-left corner of a thumbnail; its rounded corner meets the image."
      matrix={<TagMatrix mode={mode} />}
    />
  )
}
