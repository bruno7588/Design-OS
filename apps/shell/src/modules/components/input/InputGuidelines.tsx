import { Box } from '@mui/material'
import { InputField } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Field = (props: Parameters<typeof InputField>[0]) => (
  <Box sx={{ width: 280 }}>
    <InputField fullWidth inputProps={{ tabIndex: -1 }} {...props} />
  </Box>
)

// Content from playground/docs/design-system/input.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'An input field lets people type a short piece of text: a name, a title, an email address. It has a label above, the field, and optional helper text below that turns into the error when something is wrong.',
  whenToUse: [
    'For short, free text: names, titles, emails, numbers.',
    'When the answer cannot be picked from a list.',
  ],
  whenNotToUse: [
    'To choose from a known list. Use a dropdown.',
    'To filter a list as people type. Use search.',
    'For long text, such as a description. Use a text area.',
    'For a whole number with steps. Use the integer input.',
  ],
  anatomy: {
    example: <Field label="Course title" placeholder="Add a title" helperText="Learners see this on their feed." />,
    parts: [
      { name: 'Label', description: 'Poppins Semibold 14px in Text-secondary, 8px above the field.' },
      { name: 'Field', description: '37px tall, radius 12, a 1px Border-elevated border drawn inside, padding 8px by 12px.' },
      { name: 'Value and placeholder', description: 'Poppins Regular 14px: the value in Text-primary, the placeholder in Text-disabled.' },
      { name: 'Icons', description: 'Optional, 20px, at the end. The error and success icons sit 24px from the text.' },
      { name: 'Helper text', description: 'Optional, Regular 14px in Text-tertiary, 8px below. The error message replaces it.' },
    ],
  },
  variants: [
    { name: 'With label', description: 'The default. Every field needs a label, visible or not.', example: <Field label="First name" placeholder="Maria" /> },
    { name: 'With helper text', description: 'A hint about format or use.', example: <Field label="Email" placeholder="name@company.com" helperText="We send the invite here." /> },
    { name: 'Error', description: 'The label, border and message turn Text-error, with the danger icon.', example: <Field label="Email" defaultValue="maria@" validation="error" helperText="Enter an email address, like name@company.com" /> },
    { name: 'Success', description: 'Confirms a value that was checked, such as an available name.', example: <Field label="Workspace name" defaultValue="acme-training" validation="success" /> },
  ],
  states: [
    { name: 'Enabled', description: 'Border-elevated border, no fill.' },
    { name: 'Hover', description: 'Border-hover border and a 16% Input-background fill.' },
    { name: 'Active', description: 'While typing: the border turns Selected (Secondary-600 light, Secondary-500 dark).' },
    { name: 'Filled', description: 'The value in Text-primary; the border goes back to Border-elevated.' },
    { name: 'Error and success', description: 'Error overrides every other border colour; success only adds its icon.' },
    { name: 'Disabled', description: 'Label, value and helper in Text-disabled. Not editable or focusable.' },
  ],
  dos: [
    {
      do: { example: <Field label="Email" placeholder="name@company.com" />, text: 'Use a label that names the value, and a placeholder that shows an example.' },
      dont: { example: <Field placeholder="Email" />, text: 'Use the placeholder as the label. It disappears as soon as people type.' },
    },
    {
      do: { example: <Field label="Email" defaultValue="maria@" validation="error" helperText="Enter an email address, like name@company.com" />, text: 'Say what is wrong and how to fix it.' },
      dont: { example: <Field label="Email" defaultValue="maria@" validation="error" helperText="Invalid input" />, text: 'Write vague errors such as "Invalid input".' },
    },
  ],
  content: [
    'Labels: a noun in sentence case, no colon: "Course title", not "Course Title:".',
    'Placeholders show an example or format, never instructions that people need.',
    'Errors say what is wrong and how to fix it, without blame: "Enter an email address, like name@company.com".',
    'Helper text is one short sentence.',
  ],
  accessibility: [
    'The label is linked to the field, so screen readers read it and clicking it focuses the field.',
    'Helper and error text are linked with aria-describedby; an error sets aria-invalid.',
    'Error is shown by the message and the icon, not by the red border alone.',
    'Disabled fields cannot be focused. If people need to read the value, show it as text instead.',
  ],
  figma: [
    { label: 'Input field/Outlined, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12114-20561' },
    { label: 'Input field/Outlined, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8974-24610' },
  ],
  spec: 'playground/docs/design-system/input.md',
}

export function InputGuidelines() {
  return <GuidelinesTemplate g={g} />
}
