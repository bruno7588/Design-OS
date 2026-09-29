import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material'
import type { Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma radio-button set: Selected false and true (columns) in each state (rows).
// Focus isn't in Figma.
const SELECTED = [
  { name: 'Not selected', checked: false },
  { name: 'Selected', checked: true },
]

const STATES = [
  { name: 'Enabled', props: {} },
  { name: 'Hover', props: { className: 'ds-hover' } },
  { name: 'Focus', props: { className: 'ds-focus' } },
  { name: 'Disabled', props: { disabled: true } },
]

export function RadioMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack direction="row" sx={{ gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <StateGrid
          testId={`radio-matrix-${mode}`}
          columns={SELECTED.map((c) => c.name)}
          rows={STATES.map((s) => ({
            name: s.name,
            cells: SELECTED.map((c) => <Radio key={c.name} checked={c.checked} {...s.props} tabIndex={-1} inputProps={{ 'aria-label': `${c.name}, ${s.name}` }} />),
          }))}
        />
        <RadioGroup value="weekly" name={`radio-labels-${mode}`} data-testid={`radio-labels-${mode}`}>
          <FormControlLabel value="daily" control={<Radio tabIndex={-1} />} label="With a label" />
          <FormControlLabel value="weekly" control={<Radio tabIndex={-1} />} label="Selected, with a label" />
          <FormControlLabel value="never" control={<Radio tabIndex={-1} />} label="Disabled, with a label" disabled />
        </RadioGroup>
      </Stack>
    </Canvas>
  )
}
