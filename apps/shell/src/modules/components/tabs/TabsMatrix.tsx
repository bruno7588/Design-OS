import { Box, Stack, Tabs, Typography } from '@mui/material'
import { Tab, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// Same order as the Figma Tab items set: Selected, Hover, Enabled, each without
// and with a counter. Then the Tabs bar (Figma 8497:24855).
export const TAB_STATES = ['Selected', 'Hover', 'Enabled', 'Focus', 'Disabled'] as const
export type TabState = (typeof TAB_STATES)[number]

const BOARD_STATES: TabState[] = ['Selected', 'Hover', 'Enabled']

export function SingleTab({ state, count }: { state: TabState; count?: number }) {
  return (
    <Tabs value={state === 'Selected' ? 'tab' : false} aria-label={`${state} tab`}>
      <Tab
        value="tab"
        label="Tab Name"
        count={count}
        tabIndex={-1}
        disabled={state === 'Disabled'}
        className={state === 'Hover' ? 'ds-hover' : state === 'Focus' ? 'ds-focus' : undefined}
      />
    </Tabs>
  )
}

export function TabsMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: 12 }}>
        <Box
          data-testid={`tabs-matrix-${mode}`}
          sx={{ display: 'grid', gridTemplateColumns: 'max-content max-content', columnGap: 8, rowGap: 6, alignItems: 'start' }}
        >
          {BOARD_STATES.flatMap((state) => [
            <Typography key={`${state}-l`} variant="caption" color="text.secondary">
              {state}
            </Typography>,
            <Stack key={`${state}-t`} sx={{ gap: 6 }}>
              <SingleTab state={state} />
              <SingleTab state={state} count={0} />
            </Stack>,
          ])}
        </Box>
        <Stack sx={{ gap: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Tabs
          </Typography>
          <Tabs value={0} aria-label="Tabs example" data-testid={`tabs-bar-${mode}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Tab key={i} value={i} label="Tab Name" tabIndex={-1} />
            ))}
          </Tabs>
        </Stack>
      </Stack>
    </Canvas>
  )
}
