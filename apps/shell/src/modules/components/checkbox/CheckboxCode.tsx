import { Stack, Typography } from '@mui/material'
import checkboxSource from '@design-os/components/src/Selection/Checkbox.tsx?raw'
import overridesSource from '@design-os/components/src/Selection/selection.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Checkbox } from '@design-os/components'
import FormControlLabel from '@mui/material/FormControlLabel'

<FormControlLabel control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />} label="I agree to the terms" />

// Select all, with the indeterminate state
<Checkbox
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={toggleAll}
  inputProps={{ 'aria-label': 'Select all rows' }}
/>

// Plain MUI Checkbox looks the same. It doesn't announce indeterminate as mixed:
// the wrapper sets the native indeterminate property for that.
import MuiCheckbox from '@mui/material/Checkbox'

// A group: a fieldset with a legend
<FormControl component="fieldset">
  <FormLabel component="legend">Departments</FormLabel>
  {departments.map((d) => (
    <FormControlLabel key={d.id} control={<Checkbox checked={picked.has(d.id)} onChange={() => toggle(d.id)} />} label={d.name} />
  ))}
</FormControl>`

export function CheckboxCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Checkbox. The theme sets the Figma glyphs as its default icons and styles the halo, colours and label row, so plain MUI looks the same. The thin wrapper only makes indeterminate announce as mixed. The files below are read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Checkbox.tsx" caption="packages/components/src/Selection" code={checkboxSource} />
      <CodeBlock title="selection.overrides.tsx" caption="packages/components/src/Selection: MuiCheckbox, MuiRadio, MuiSwitch, MuiFormControlLabel and MuiFormLabel" code={overridesSource} />
    </Stack>
  )
}
