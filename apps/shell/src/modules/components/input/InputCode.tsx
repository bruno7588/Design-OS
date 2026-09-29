import { Stack, Typography } from '@mui/material'
import inputSource from '@design-os/components/src/InputField/InputField.tsx?raw'
import overridesSource from '@design-os/components/src/Field/field.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { InputField } from '@design-os/components'

<InputField label="Course title" placeholder="Add a title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />

// Helper text, then the error in its place
<InputField label="Email" helperText="We send the invite here" />
<InputField label="Email" validation="error" helperText="Enter an email address, like name@company.com" />

// A password with a show and hide button
<InputField label="Password" type={shown ? 'text' : 'password'} iconRight={<ShowPasswordButton />} />

// Plain MUI renders the same field
import TextField from '@mui/material/TextField'

<TextField label="Course title" helperText="Learners see this on their feed" error={invalid} />`

export function InputCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 TextField with the 5Mins theme: the label sits above the field, the border is the outline
        drawn inside the 37px box, and the helper sits below, 8px apart. The wrapper adds the success state and the validation
        icons. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="InputField.tsx" caption="packages/components/src/InputField" code={inputSource} />
      <CodeBlock title="field.overrides.tsx" caption="Theme overrides shared by Input field, Search and Dropdown" code={overridesSource} />
    </Stack>
  )
}
