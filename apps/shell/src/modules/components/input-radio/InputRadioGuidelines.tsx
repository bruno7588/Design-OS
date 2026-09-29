import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { InputRadio, type InputRadioProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Example = (props: Partial<InputRadioProps>) => (
  <Box sx={{ width: 300 }}>
    <InputRadio
      radioLabel="Correct answer"
      placeholder="Add an answer"
      fullWidth
      checked={false}
      inputProps={{ tabIndex: -1, 'aria-label': 'Answer' }}
      radioProps={{ tabIndex: -1 }}
      {...props}
    />
  </Box>
)

// Content from playground/docs/design-system/input.md (Radio), the Figma set and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A radio button input is an option people both write and pick, such as a quiz answer: they type the answer, and the radio marks the correct one.',
  whenToUse: [
    'For quiz and survey answers people write and mark as correct.',
    'For an "Other" option people fill in.',
  ],
  whenNotToUse: [
    'For options people only pick. Use radios.',
    'For several correct answers. Use a checkbox with a field instead.',
  ],
  anatomy: {
    example: <Example label="Answer 1" checked defaultValue="Paris" />,
    parts: [
      { name: 'Label', description: 'Optional. Semibold 14px in Text-secondary, 8px above.' },
      { name: 'Field', description: 'As the input field: 37px, radius 12, Border-elevated, padding 8px by 12px.' },
      { name: 'Radio', description: '21px, 8px before the text. Selected is the Selected ring and dot.' },
      { name: 'Text', description: 'Regular 14px in Text-primary; the placeholder in Text-disabled.' },
    ],
  },
  variants: [
    { name: 'Without a label', description: 'In a list of answers, where a group label names them all.', example: <Example defaultValue="Lyon" /> },
    { name: 'Selected', description: 'The radio on. The border stays Border-elevated.', example: <Example checked defaultValue="Paris" /> },
    { name: 'Success', description: 'The selected radio in Success-500, for a confirmed correct answer.', example: <Example checked defaultValue="Paris" validation="success" /> },
  ],
  states: [
    { name: 'Enabled', description: 'Border-elevated, the radio off.' },
    { name: 'Hover', description: 'Border-hover with the Input-background fill, and the radio’s Page-background-hover halo.' },
    { name: 'Active', description: 'While typing: the border turns Selected.' },
    { name: 'Disabled', description: 'The quieter Border; label, radio and text in Text-disabled.' },
  ],
  dos: [
    {
      do: { example: <Example checked defaultValue="Paris" />, text: 'Use it where people write the option and pick it.' },
      dont: {
        example: (
          <RadioGroup value="a">
            <FormControlLabel value="a" control={<Radio tabIndex={-1} />} label="Paris" />
          </RadioGroup>
        ),
        text: 'Use it for fixed options. Plain radios are clearer.',
      },
    },
  ],
  content: [
    'Placeholder: say what to write: "Add an answer".',
    'Keep answers short and parallel in form.',
  ],
  accessibility: [
    'The radio and the text field are separate controls, each with its own name: "Answer 1 is correct" and "Answer 1".',
    'Put the answers in a MUI RadioGroup named by the question, so the radios are one group and the arrow keys move between them.',
    'Success is shown by colour: say it in text too, such as "Correct answer".',
  ],
  figma: [
    { label: 'Input field/Radio button, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12114-20857' },
    { label: 'Input field/Radio button, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8974-30479' },
  ],
  spec: 'playground/docs/design-system/input.md',
}

export function InputRadioGuidelines() {
  return <GuidelinesTemplate g={g} />
}
