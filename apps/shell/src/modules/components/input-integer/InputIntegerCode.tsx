import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/InputField/InputInteger.tsx?raw'
import overridesSource from '@design-os/components/src/InputField/inputTypes.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { InputInteger } from '@design-os/components'

<InputInteger label="Maximum course attempts" value={attempts} onChange={setAttempts} min={1} max={10} />

// With helper text, then the error in its place
<InputInteger label="Due days" helperText="Days from enrolment" value={days} onChange={setDays} />
<InputInteger label="Due days" validation="error" helperText="Choose 1 day or more" value={days} onChange={setDays} />

// Empty: the "0" placeholder in Text-disabled
<InputInteger label="Seats" value={null} onChange={setSeats} />`

export function InputIntegerCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 TextField with the 5Mins theme and className "ds-integer" on the box: − and + are
        IconButton adornments with a 24px halo, 12px from the value. The value is a spinbutton, so the arrow keys, Home and
        End work, and typing is clamped to min and max. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="InputInteger.tsx" caption="packages/components/src/InputField" code={source} />
      <CodeBlock title="inputTypes.overrides.ts" caption="Theme rules for the Integer, Radio button and Inline inputs" code={overridesSource} />
    </Stack>
  )
}
