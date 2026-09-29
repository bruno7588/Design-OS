import { Box, Typography } from '@mui/material'
import { Chip, type ChipProps, type Mode } from '@design-os/components'
import { Add } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'

// Same order as the Figma Chips set: Enabled, Hover, Selected, Disabled,
// each with no icon, an icon right and an icon left.
export const CHIP_STATES = ['Enabled', 'Hover', 'Selected', 'Disabled', 'Focus'] as const
export type ChipState = (typeof CHIP_STATES)[number]
export const ICONS = ['None', 'Right', 'Left'] as const
export type ChipIcon = (typeof ICONS)[number]

const noop = () => {}

export function chipProps(state: ChipState, icon: ChipIcon): Partial<ChipProps> {
  const add = <Add color="currentColor" />
  return {
    onClick: noop,
    tabIndex: -1,
    ...(icon === 'Left' && { icon: add }),
    ...(icon === 'Right' && { iconRight: add, onDelete: noop }),
    ...(state === 'Hover' && { className: 'ds-hover' }),
    ...(state === 'Focus' && { className: 'ds-focus' }),
    ...(state === 'Selected' && { selected: true }),
    ...(state === 'Disabled' && { disabled: true }),
  }
}

const BOARD_STATES: ChipState[] = ['Enabled', 'Hover', 'Selected', 'Disabled']

export function ChipMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`chip-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: `repeat(${BOARD_STATES.length * ICONS.length}, max-content)`, columnGap: 6, rowGap: 3 }}
      >
        {BOARD_STATES.flatMap((state) =>
          ICONS.map((icon) => (
            <Typography key={`${state}-${icon}-h`} variant="h6" color="text.secondary">
              {state}
              {icon !== 'None' && ` · icon ${icon.toLowerCase()}`}
            </Typography>
          )),
        )}
        {BOARD_STATES.flatMap((state) =>
          ICONS.map((icon) => (
            <Box key={`${state}-${icon}`}>
              <Chip label="Content" {...chipProps(state, icon)} />
            </Box>
          )),
        )}
      </Box>
    </Canvas>
  )
}
