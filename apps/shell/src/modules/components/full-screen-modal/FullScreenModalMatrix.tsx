import { Box, Typography } from '@mui/material'
import { FullScreenModalContent, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Modal/Full screen set: Desktop (1536 × 864) and Mobile (375 × 812), drawn in place.
export function FullScreenModalMatrix({ mode }: { mode: Mode }) {
  const frame = (w: number, h: number, label: string, small?: boolean) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" color="text.secondary">
        {label}
      </Typography>
      <Box
        className="ds-full-screen-frame"
        data-device={small ? 'mobile' : 'desktop'}
        sx={(theme) => ({
          position: 'relative',
          width: w,
          height: h,
          flexShrink: 0,
          backgroundColor: theme.tokens.semantic.pageBackground,
          outline: `1px solid ${theme.tokens.semantic.border}`,
          // Mobile: the close button sits 16px under the 44px status bar, 20px from the right.
          ...(small && { '& .MuiIconButton-root': { top: 60, right: 20 } }),
        })}
      >
        <FullScreenModalContent onClose={() => undefined}>{null}</FullScreenModalContent>
      </Box>
    </Box>
  )
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`full-screen-modal-matrix-${mode}`} sx={{ display: 'flex', gap: 8, alignItems: 'flex-start', width: 'max-content' }}>
        {frame(1536, 864, 'Desktop')}
        {frame(375, 812, 'Mobile', true)}
      </Box>
    </Canvas>
  )
}
