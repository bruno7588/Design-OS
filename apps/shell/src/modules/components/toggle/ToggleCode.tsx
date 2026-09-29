import { Stack, Typography } from '@mui/material'
import toggleSource from '@design-os/components/src/Selection/Toggle.tsx?raw'
import overridesSource from '@design-os/components/src/Selection/selection.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Toggle } from '@design-os/components'
import FormControlLabel from '@mui/material/FormControlLabel'

<FormControlLabel control={<Toggle checked={on} onChange={(e) => setOn(e.target.checked)} />} label="Email notifications" />

// Settings row: the title names it, the help text describes it
<Toggle checked={on} onChange={save} inputProps={{ 'aria-labelledby': 'email-title', 'aria-describedby': 'email-help' }} />

// Plain MUI Switch looks the same. Add the switch role yourself:
import Switch from '@mui/material/Switch'

<Switch checked={on} onChange={save} inputProps={{ role: 'switch', 'aria-label': 'Email notifications' }} />`

export function ToggleCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Switch. The theme draws the Figma Toggle (track, thumb, colours and focus ring), so plain MUI looks the same. MUI 5 renders a plain checkbox, so the thin Toggle wrapper adds role switch. The files below are read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Toggle.tsx" caption="packages/components/src/Selection" code={toggleSource} />
      <CodeBlock title="selection.overrides.tsx" caption="packages/components/src/Selection: MuiCheckbox, MuiRadio, MuiSwitch, MuiFormControlLabel and MuiFormLabel" code={overridesSource} />
    </Stack>
  )
}
