import { Stack, Typography } from '@mui/material'
import overridesSource from '@design-os/components/src/Selection/selection.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// With the 5Mins theme, plain MUI is the reference: no wrapper.
<FormControl component="fieldset">
  <FormLabel component="legend">Enrolment</FormLabel>
  <RadioGroup name="enrolment" value={mode} onChange={(e) => setMode(e.target.value)}>
    <FormControlLabel value="auto" control={<Radio />} label="Automatic" />
    <FormControlLabel value="manual" control={<Radio />} label="Manual review" />
  </RadioGroup>
</FormControl>

// Side by side
<RadioGroup row name="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}>…</RadioGroup>`

export function RadioCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is plain MUI 5.18 Radio in a RadioGroup. The theme sets the Figma ring and dot as its default icons and styles the halo, colours and label row. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="selection.overrides.tsx" caption="packages/components/src/Selection: MuiCheckbox, MuiRadio, MuiSwitch, MuiFormControlLabel and MuiFormLabel" code={overridesSource} />
    </Stack>
  )
}
