import type { ReactNode } from 'react'
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import type { Mode } from '@design-os/components'
import { Canvas } from './Canvas'

// The Preview tab frame: live canvas and properties on top, the Figma-style matrix below.
export function PreviewLayout({
  mode,
  onModeChange,
  canvas,
  controls,
  hint,
  matrix,
}: {
  mode: Mode
  onModeChange: (mode: Mode) => void
  canvas: ReactNode
  controls: ReactNode
  hint: string
  matrix: ReactNode
}) {
  return (
    <Stack sx={{ gap: 8 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: 6, alignItems: 'stretch' }}>
        <Canvas mode={mode} sx={{ flex: 1, minHeight: 280, display: 'grid', placeItems: 'center' }}>
          {canvas}
        </Canvas>
        <Stack
          sx={(theme) => ({
            width: { lg: 320 },
            gap: 5,
            p: 6,
            border: `1px solid ${theme.tokens.semantic.border}`,
            borderRadius: `${theme.tokens.radius.sm}px`,
            bgcolor: 'background.paper',
          })}
        >
          <Typography variant="h5">Properties</Typography>
          {controls}
          <Control label="Mode">
            <ToggleButtonGroup exclusive size="small" value={mode} onChange={(_, v) => v && onModeChange(v)} fullWidth>
              <ToggleButton value="light" disableRipple>
                Light
              </ToggleButton>
              <ToggleButton value="dark" disableRipple>
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <Typography variant="caption" color="text.secondary">
            {hint}
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          All states
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Laid out like the Figma board, so the two can be compared frame by frame.
        </Typography>
        {matrix}
      </Box>
    </Stack>
  )
}

export function Control({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="subtitle2">{label}</Typography>
      {children}
    </Stack>
  )
}
