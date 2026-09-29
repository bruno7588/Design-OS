import { InputInteger, InputField, type InputIntegerProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const Example = (props: Partial<InputIntegerProps>) => (
  <InputInteger value={3} onChange={noop} min={1} inputProps={{ tabIndex: -1 }} {...props} />
)

// Content from playground/docs/design-system/input.md (Integer), the Figma set and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'An integer input sets a small whole number. People step it with − and +, or type it. It suits settings such as course attempts or days to complete.',
  whenToUse: [
    'For small whole numbers with a sensible range: attempts, days, seats.',
    'When people usually change the value by one or two.',
  ],
  whenNotToUse: [
    'For large or precise numbers such as prices or IDs. Use an input field.',
    'For a choice of a few fixed values. Use radios or a dropdown.',
    'For a percentage people judge by eye. Use a slider.',
  ],
  anatomy: {
    example: <Example label="Maximum course attempts" helperText="After the last attempt, the course is marked failed." />,
    parts: [
      { name: 'Label', description: 'Semibold 14px in Text-secondary, 8px above the field.' },
      { name: 'Field', description: '37px, radius 12, Border-elevated, padding 8px by 12px. Hugs its content.' },
      { name: '− and +', description: 'Iconsax Minus and Add, 20px in Text-secondary, with a 24px round halo on hover. 12px from the value.' },
      { name: 'Value', description: 'Regular 14px, centred in 26px. Empty shows "0" in Text-disabled.' },
      { name: 'Helper text', description: 'Regular 14px in Text-secondary (the input field uses Text-tertiary), 8px below.' },
    ],
  },
  variants: [
    { name: 'Label on top', description: 'The default in forms.', example: <Example label="Due days" /> },
    { name: 'Error', description: 'The value is out of range or missing. The message says what to do.', example: <Example label="Due days" value={0} validation="error" helperText="Choose 1 day or more" /> },
    { name: 'Without a label', description: 'Only where the text around it names the value. Give it an aria-label.', example: <Example inputProps={{ 'aria-label': 'Attempts', tabIndex: -1 }} /> },
  ],
  states: [
    { name: 'Enabled', description: 'Border-elevated.' },
    { name: 'Hover', description: 'Border-hover, with no fill. The − or + under the pointer shows its Page-background-hover halo.' },
    { name: 'Active', description: 'While typing: the border turns Selected.' },
    { name: 'At min or max', description: 'The − or + turns Text-disabled and does nothing.' },
    { name: 'Error', description: 'The border, label and helper turn Text-error.' },
    { name: 'Disabled', description: 'The quieter Border; label, value, icons and helper in Text-disabled.' },
  ],
  dos: [
    {
      do: { example: <Example label="Maximum course attempts" max={10} />, text: 'Set min and max, so people can’t step past a sensible value.' },
      dont: { example: <InputField label="Maximum course attempts" defaultValue="3" inputProps={{ tabIndex: -1 }} />, text: 'Use a plain input field for a small number people step.' },
    },
  ],
  content: [
    'Label: a noun phrase in sentence case: "Maximum course attempts", "Due days".',
    'Say the unit in the label or the helper, not in the field.',
    'Error: say the range: "Choose between 1 and 10 attempts".',
  ],
  accessibility: [
    'The value is a spinbutton with aria-valuenow, aria-valuemin and aria-valuemax, named by the label.',
    'Arrow up and down step it; Home and End jump to min and max. Typing works too.',
    '− and + are labelled "Decrease" and "Increase" and skipped by Tab, since the keys do the same.',
    'Helper and error text are linked with aria-describedby; an error sets aria-invalid.',
  ],
  figma: [
    { label: 'Input field/Integer, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12114-20914' },
    { label: 'Input field/Integer, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10145-10895' },
  ],
  spec: 'playground/docs/design-system/input.md',
}

export function InputIntegerGuidelines() {
  return <GuidelinesTemplate g={g} />
}
