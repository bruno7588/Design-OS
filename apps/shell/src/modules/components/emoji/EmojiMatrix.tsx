import { Box } from '@mui/material'
import { Emoji, EMOJI_TYPES, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Emojies set, in its order, at 240px, 40px apart (as the light board).
export function EmojiMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`emoji-matrix-${mode}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 10, width: 800 }}>
        {EMOJI_TYPES.map((t) => (
          <Emoji key={t} type={t} size={240} />
        ))}
      </Box>
    </Canvas>
  )
}
