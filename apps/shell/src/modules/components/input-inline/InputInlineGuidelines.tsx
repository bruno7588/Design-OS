import { Box } from '@mui/material'
import { InputField, InputInline, type InputInlineProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const Example = (props: Partial<InputInlineProps>) => (
  <Box sx={{ width: 420 }}>
    <InputInline title="" onTitleChange={noop} onDescriptionChange={noop} {...props} />
  </Box>
)

// Content from playground/docs/design-system/input.md (Inline), the Figma set and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'An inline input edits a page’s title and description in place, as they will look. It is used in builders, such as the course title and description.',
  whenToUse: [
    'For the title and description of something people are building: a course, a program, a card.',
    'When editing in place is clearer than a form, because people see the result.',
  ],
  whenNotToUse: [
    'In forms. Use an input field with a label.',
    'For text people only read. Use a heading.',
    'For long text with formatting. Use a text editor.',
  ],
  anatomy: {
    example: <Example title="Leadership essentials" description="Lead a team through change, one conversation at a time." />,
    parts: [
      { name: 'Title', description: 'Bold 32px (H1) in Text-primary. The placeholder is Text-disabled.' },
      { name: 'Error message', description: 'Regular 14px in Text-error, right under the title.' },
      { name: 'Description', description: 'Optional. Regular 16px in Text-secondary, 4px below. Grows onto more lines.' },
    ],
  },
  variants: [
    { name: 'Title and description', description: 'The default in builders.', example: <Example description="" /> },
    { name: 'Title only', description: 'Where a description isn’t needed, such as a card name.', example: <Example /> },
    { name: 'Error', description: 'The title is missing or too long. The title and the message turn Text-error.', example: <Example title="Leadership essentials" description="" error="Keep the title under 80 characters" /> },
  ],
  states: [
    { name: 'Enabled', description: 'The placeholders, "Add a title" and "Add a description", in Text-disabled. No hover: it reads as text until clicked.' },
    { name: 'Active', description: 'The caret in Text-primary.' },
    { name: 'Filled', description: 'Title Text-primary, description Text-secondary.' },
  ],
  dos: [
    {
      do: { example: <Example title="Leadership essentials" description="" />, text: 'Use it where the title is the page’s heading.' },
      dont: { example: <Box sx={{ width: 300 }}><InputField label="Title" defaultValue="Leadership essentials" fullWidth inputProps={{ tabIndex: -1 }} /></Box>, text: 'Use a form field for the page’s own heading in a builder.' },
    },
  ],
  content: [
    'Placeholders say what to do, in sentence case: "Add a title", "Add a description".',
    'Titles in sentence case, without a full stop.',
  ],
  accessibility: [
    'There is no visible label, so each field has an aria-label: "Course title", "Course description".',
    'An error sets aria-invalid on the title and links the message with aria-describedby.',
    'The page should still have a real heading for screen readers, such as a visually hidden h1 with the title.',
  ],
  figma: [
    { label: 'Input field/Inline, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12114-20828' },
    { label: 'Input field/Inline, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10330-4736' },
  ],
  spec: 'playground/docs/design-system/input.md',
}

export function InputInlineGuidelines() {
  return <GuidelinesTemplate g={g} />
}
