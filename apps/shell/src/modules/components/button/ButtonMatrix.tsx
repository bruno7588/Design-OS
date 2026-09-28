import { Box, Typography } from '@mui/material'
import { Button, SparkleIcon, type Mode } from '@design-os/components'
import { Add } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'
import { CONFIGURATIONS, SIZES, stateProps, type State } from './spec'

// Same layout as the Figma board: Large, Medium, Small side by side, the five
// states in columns, each configuration with and without an icon.
const BOARD_STATES: State[] = ['Enabled', 'Hover', 'Pressed', 'Disabled', 'Loading']
const BOARD_SIZES = [...SIZES].reverse()

export function ButtonMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`button-matrix-${mode}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: `160px repeat(${BOARD_SIZES.length * BOARD_STATES.length}, max-content)`,
          columnGap: 6,
          rowGap: 4,
          alignItems: 'center',
        }}
      >
        <Box />
        {BOARD_SIZES.map((s) =>
          BOARD_STATES.map((state) => (
            <Typography key={`${s.size}-${state}`} variant="h6" color="text.secondary">
              {s.figma} · {state}
            </Typography>
          )),
        )}
        {CONFIGURATIONS.flatMap((c) =>
          // As in Figma: AI always carries the sparkle, Link never has an icon.
          (c.color === 'ai' ? [true] : c.variant === 'link' ? [false] : [true, false]).map((withIcon) => (
            <Row key={`${c.figma}-${withIcon}`} label={`${c.figma}${withIcon ? ' + icon' : ''}`}>
              {BOARD_SIZES.map((s) =>
                BOARD_STATES.map((state) => (
                  <Box key={`${s.size}-${state}`}>
                    <Button
                      variant={c.variant}
                      color={c.color}
                      size={s.size}
                      icon={withIcon ? c.color === 'ai' ? <SparkleIcon /> : <Add color="currentColor" /> : undefined}
                      tabIndex={-1}
                      {...stateProps(state)}
                    >
                      Button
                    </Button>
                  </Box>
                )),
              )}
            </Row>
          )),
        )}
      </Box>
    </Canvas>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      {children}
    </>
  )
}
