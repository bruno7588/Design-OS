import { Box } from '@mui/material'
import { ToastBody, type Mode, type ToastType } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Toast set, in its order and with its sample text: each type with and
// without the icon. Toast colours are the same in both modes.
export const TYPES: { figma: string; type: ToastType; message: string }[] = [
  { figma: 'Information', type: 'info', message: 'Information message' },
  { figma: 'Success', type: 'success', message: 'Success message' },
  { figma: 'Warning', type: 'warning', message: 'Warning message!' },
  { figma: 'Error', type: 'error', message: 'Error message!' },
]

export function ToastMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`toast-matrix-${mode}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 1016 }}>
        {TYPES.flatMap((t) => [
          <ToastBody key={`${t.type}-icon`} type={t.type} message={t.message} />,
          <ToastBody key={`${t.type}-plain`} type={t.type} message={t.message} icon={false} />,
        ])}
      </Box>
    </Canvas>
  )
}
