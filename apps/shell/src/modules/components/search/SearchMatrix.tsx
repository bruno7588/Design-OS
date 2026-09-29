import { Box, Typography } from '@mui/material'
import { Search, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Search set: each state in M and L, 400px wide as on the board.
export const STATES = [
  { name: 'Enabled', value: '', className: undefined },
  { name: 'Hover', value: '', className: 'ds-hover' },
  { name: 'Active', value: 'Text', className: 'ds-focus' },
  { name: 'Filled', value: 'Text input', className: undefined },
  { name: 'Filled · hover', value: 'Text input', className: 'ds-hover' },
] as const

const noop = () => {}

export function SearchMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`search-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '100px repeat(2, 400px)', columnGap: 8, rowGap: 5, alignItems: 'center' }}
      >
        <Box />
        <Typography variant="h6" color="text.secondary">
          M
        </Typography>
        <Typography variant="h6" color="text.secondary">
          L
        </Typography>
        {STATES.flatMap((s) => [
          <Typography key={`${s.name}-l`} variant="caption" color="text.secondary">
            {s.name}
          </Typography>,
          ...(['M', 'L'] as const).map((size) => (
            <Search key={`${s.name}-${size}`} size={size} value={s.value} onChange={noop} className={s.className} fullWidth inputProps={{ tabIndex: -1 }} />
          )),
        ])}
      </Box>
    </Canvas>
  )
}
