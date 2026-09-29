import { forwardRef } from 'react'
import Box from '@mui/material/Box'
import LinearProgress, { type LinearProgressProps } from '@mui/material/LinearProgress'

// 5Mins Progress bar: MUI LinearProgress, determinate. The look is in the theme
// (progressBar.overrides.ts). The wrapper adds the optional percentage beside it, as in the
// Figma Table data progress cell (a 72px bar, 8px from the label).
//
// Figma → props
//   Progress=0%…100% → value (0 to 100); 100% turns the bar Success-500

export interface ProgressBarProps extends Omit<LinearProgressProps, 'variant' | 'value'> {
  value: number
  /** Show "NN%" after the bar. */
  showLabel?: boolean
  /** Bar width; fills the parent by default. */
  width?: number | string
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, showLabel = false, width, sx, ...props },
  ref,
) {
  const v = Math.max(0, Math.min(100, value))
  const bar = <LinearProgress ref={ref} variant="determinate" value={v} sx={[{ width: width ?? '100%', flexShrink: 0 }, ...(Array.isArray(sx) ? sx : [sx])]} {...props} />
  if (!showLabel) return bar
  return (
    <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.s}px`, width: width ? 'auto' : '100%' })}>
      {bar}
      <Box component="span" aria-hidden sx={{ fontSize: 14, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
        {Math.round(v)}%
      </Box>
    </Box>
  )
})
