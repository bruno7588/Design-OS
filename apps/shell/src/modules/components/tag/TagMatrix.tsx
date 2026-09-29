import { Box, Typography } from '@mui/material'
import { Tag, TAG_TYPES, type Mode, type TagType } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Tags set: each media type (columns) in L, M and S (rows).
const TYPES = Object.keys(TAG_TYPES) as TagType[]
const SIZES = ['L', 'M', 'S'] as const

export function TagMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`tag-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: `60px repeat(${TYPES.length}, 80px)`, columnGap: 4, rowGap: 6, alignItems: 'center' }}
      >
        <Box />
        {TYPES.map((t) => (
          <Typography key={t} variant="h6" color="text.secondary">
            {TAG_TYPES[t].label}
          </Typography>
        ))}
        {SIZES.flatMap((size) => [
          <Typography key={`${size}-l`} variant="caption" color="text.secondary">
            {size}
          </Typography>,
          ...TYPES.map((t) => (
            <Box key={`${size}-${t}`}>
              <Tag type={t} size={size} />
            </Box>
          )),
        ])}
      </Box>
    </Canvas>
  )
}
