import { FormControlLabel, Stack } from '@mui/material'
import { Toggle, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma Toggle set: Toggle false and true (columns). Figma draws no other states:
// focus and disabled come from the reference.
const TOGGLE = [
  { name: 'Off', checked: false },
  { name: 'On', checked: true },
]

const STATES = [
  { name: 'Enabled', props: {} },
  { name: 'Focus', props: { className: 'ds-focus' } },
  { name: 'Disabled', props: { disabled: true } },
]

export function ToggleMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack direction="row" sx={{ gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <StateGrid
          testId={`toggle-matrix-${mode}`}
          columns={TOGGLE.map((c) => c.name)}
          rows={STATES.map((s) => ({
            name: s.name,
            cells: TOGGLE.map((c) => <Toggle key={c.name} checked={c.checked} {...s.props} tabIndex={-1} inputProps={{ 'aria-label': `${c.name}, ${s.name}` }} />),
          }))}
        />
        <Stack sx={{ gap: 3 }} data-testid={`toggle-labels-${mode}`}>
          <FormControlLabel control={<Toggle checked tabIndex={-1} />} label="Email notifications" />
          <FormControlLabel control={<Toggle checked={false} tabIndex={-1} />} label="Weekly digest" labelPlacement="start" sx={{ justifyContent: 'flex-end' }} />
          <FormControlLabel control={<Toggle checked={false} disabled tabIndex={-1} />} label="Disabled" disabled />
        </Stack>
      </Stack>
    </Canvas>
  )
}
