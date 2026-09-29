import { Box, Tooltip, type TooltipProps } from '@mui/material'
import { InfoTooltip, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Tooltip set, in its order, every tooltip open. Icon=False has no visible
// trigger in Figma, so it points at an invisible 20px box.
type Placement = NonNullable<TooltipProps['placement']>

export const VARIANTS: { placement: Placement; label: string }[] = [
  { placement: 'top', label: 'Top' },
  { placement: 'bottom', label: 'Bottom' },
  { placement: 'top-start', label: 'Top · start' },
  { placement: 'top-end', label: 'Top · end' },
  { placement: 'bottom-start', label: 'Bottom · start' },
  { placement: 'bottom-end', label: 'Bottom · end' },
  { placement: 'right', label: 'Right' },
  { placement: 'left', label: 'Left' },
]

// Where the trigger sits in its cell, so the open tooltip has room.
function anchorPosition(p: Placement) {
  const [side, align] = p.split('-')
  const vertical = side === 'top' ? 'flex-end' : side === 'bottom' ? 'flex-start' : 'center'
  const horizontal =
    side === 'left' ? 'flex-end' : side === 'right' ? 'flex-start' : align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center'
  return { alignItems: vertical, justifyContent: horizontal }
}

const popper = { popper: { disablePortal: true } }

export function TooltipCell({ placement, icon }: { placement: Placement; icon: boolean }) {
  const sideways = placement === 'left' || placement === 'right'
  return (
    <Box
      sx={{
        display: 'flex',
        width: sideways ? 150 : 110,
        height: sideways ? 44 : 70,
        px: sideways ? 0 : 2,
        ...anchorPosition(placement),
      }}
    >
      {icon ? (
        <InfoTooltip title="Tooltip text" placement={placement} open slotProps={popper} />
      ) : (
        <Tooltip title="Tooltip text" placement={placement} open slotProps={popper}>
          <Box sx={{ width: 20, height: 20 }} />
        </Tooltip>
      )}
    </Box>
  )
}

export function TooltipMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`tooltip-matrix-${mode}`} sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 8, rowGap: 6, alignItems: 'center' }}>
        {VARIANTS.flatMap((v) => [
          <TooltipCell key={`${v.placement}-icon`} placement={v.placement} icon />,
          <TooltipCell key={`${v.placement}-plain`} placement={v.placement} icon={false} />,
        ])}
      </Box>
    </Canvas>
  )
}
