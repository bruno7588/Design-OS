import { Box, Slider, Typography } from '@mui/material'
import type { Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma <Slider> set: each state (rows) at 0, 50 and 80% (columns).
const STATES = ['Enabled', 'Hover', 'Disabled'] as const
const VALUES = [0, 50, 80]

export function SliderMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`slider-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '90px repeat(3, 240px)', columnGap: 10, rowGap: 4, alignItems: 'center' }}
      >
        <Box />
        {VALUES.map((v) => (
          <Typography key={v} variant="h6" color="text.secondary">
            {v}%
          </Typography>
        ))}
        {STATES.flatMap((state) => [
          <Typography key={`${state}-l`} variant="caption" color="text.secondary">
            {state}
          </Typography>,
          ...VALUES.map((v) => (
            <Slider
              key={`${state}-${v}`}
              value={v}
              disabled={state === 'Disabled'}
              aria-label={`${state} ${v}`}
              slotProps={{ thumb: { className: state === 'Hover' ? 'ds-hover' : undefined, tabIndex: -1 } as object }}
            />
          )),
        ])}
      </Box>
    </Canvas>
  )
}
