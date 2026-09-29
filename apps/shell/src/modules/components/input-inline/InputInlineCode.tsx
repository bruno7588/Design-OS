import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/InputField/InputInline.tsx?raw'
import overridesSource from '@design-os/components/src/InputField/inputTypes.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { InputInline } from '@design-os/components'

// The course builder header
<InputInline
  title={title}
  onTitleChange={setTitle}
  description={description}
  onDescriptionChange={setDescription}
  titleLabel="Course title"
  descriptionLabel="Course description"
  error={titleError}
/>

// Plain MUI renders the same text fields
import InputBase from '@mui/material/InputBase'

<InputBase className="ds-inline-title" placeholder="Add a title" inputProps={{ 'aria-label': 'Course title' }} />
<InputBase className="ds-inline-description" multiline placeholder="Add a description" inputProps={{ 'aria-label': 'Course description' }} />`

export function InputInlineCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is two MUI 5.18 InputBase fields with the 5Mins theme: className "ds-inline-title" (Bold 32) and
        "ds-inline-description" (Regular 16, multiline), 4px apart, with no box. The error message sits under the title. The
        files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="InputInline.tsx" caption="packages/components/src/InputField" code={source} />
      <CodeBlock title="inputTypes.overrides.ts" caption="Theme rules for the Integer, Radio button and Inline inputs" code={overridesSource} />
    </Stack>
  )
}
