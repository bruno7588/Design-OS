import { FormControlLabel, Stack } from '@mui/material'
import { Checkbox, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma Checkbox set: Not checked, Checked and Indeterminate (columns) in each state (rows).
// Focus isn't in Figma; Disabled is drawn for Not checked only there.
export const CHECKED = [
  { name: 'Not checked', props: {} },
  { name: 'Checked', props: { checked: true } },
  { name: 'Indeterminate', props: { indeterminate: true } },
]

const STATES = [
  { name: 'Enabled', props: {} },
  { name: 'Hover', props: { className: 'ds-hover' } },
  { name: 'Focus', props: { className: 'ds-focus' } },
  { name: 'Disabled', props: { disabled: true } },
]

export function CheckboxMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack direction="row" sx={{ gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <StateGrid
          testId={`checkbox-matrix-${mode}`}
          columns={CHECKED.map((c) => c.name)}
          rows={STATES.map((s) => ({
            name: s.name,
            cells: CHECKED.map((c) => <Checkbox key={c.name} checked={false} {...c.props} {...s.props} tabIndex={-1} inputProps={{ 'aria-label': `${c.name}, ${s.name}` }} />),
          }))}
        />
        <Stack sx={{ gap: 1 }} data-testid={`checkbox-labels-${mode}`}>
          <FormControlLabel control={<Checkbox checked={false} tabIndex={-1} />} label="With a label" />
          <FormControlLabel control={<Checkbox checked tabIndex={-1} />} label="Checked, with a label" />
          <FormControlLabel control={<Checkbox checked={false} disabled tabIndex={-1} />} label="Disabled, with a label" disabled />
        </Stack>
      </Stack>
    </Canvas>
  )
}
