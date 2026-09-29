import { Box } from '@mui/material'
import { Chip, Dropdown, type DropdownProps } from '@design-os/components'
import { Sort } from 'iconsax-react'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const OPTIONS = [
  { value: 'people', label: 'People' },
  { value: 'sales', label: 'Sales' },
]
const Example = (props: Partial<DropdownProps>) => (
  <Box sx={{ width: 260 }}>
    <Dropdown options={OPTIONS} value="" onChange={noop} fullWidth SelectProps={{ tabIndex: -1 }} {...props} />
  </Box>
)

// Content from playground/docs/design-system/dropdown.md and listbox.md, and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A dropdown lets people pick one option from a list that opens under the field. It saves space when there are more options than fit as chips or radios.',
  whenToUse: [
    'To pick one value from about 5 to 15 options.',
    'For settings and form fields with a known set of answers: department, language, role.',
    'For sorting a list, with the label beside the field.',
  ],
  whenNotToUse: [
    'For 2 to 4 options people should see at once. Use radios or chips.',
    'For long lists that need typing to find. Use search, or a searchable listbox.',
    'For actions. Use a button or a menu button.',
    'To pick several options: multi-select arrives with the checkbox rows.',
  ],
  anatomy: {
    example: <Example label="Department" value="people" helperText="Learners see courses for their department first." />,
    parts: [
      { name: 'Label', description: 'Semibold 14px in Text-secondary, above the field (8px) or beside it (12px).' },
      { name: 'Field', description: 'As the input field: 37px, radius 12, Border-elevated, padding 8px by 12px.' },
      { name: 'Icon', description: 'Optional, 20px, before the value, such as Sort.' },
      { name: 'Chevron', description: 'ArrowDown2, 20px, in Text-secondary. Turns up while the menu is open.' },
      { name: 'Menu', description: 'Cards-background, Border-elevated, radius 12, padding 8, Shadow L, 4px below the field, up to 320px tall. Rows are 37px with radius 8.' },
    ],
  },
  variants: [
    { name: 'Label on top', description: 'The default in forms.', example: <Example label="Language" placeholder="Select a language" /> },
    { name: 'Label at the start', description: 'For compact controls such as sorting a table.', example: <Example label="Sort by" labelPlacement="start" iconLeft={<Sort color="currentColor" />} value="people" /> },
  ],
  states: [
    { name: 'Enabled', description: 'Border-elevated border; the placeholder in Text-disabled.' },
    { name: 'Hover', description: 'Border-hover and a 16% Input-background fill.' },
    { name: 'Active', description: 'While open: the border turns Selected and the chevron turns up.' },
    { name: 'Menu rows', description: 'Hover: Cards-background-hover. Selected: Secondary-500 with a Medium Neutral-800 label. Disabled: Text-disabled.' },
    { name: 'Disabled and read-only', description: 'The quieter Border and Text-disabled. Not focusable.' },
  ],
  dos: [
    {
      do: { example: <Example label="Department" placeholder="Select a department" />, text: 'Use a clear label and a placeholder that says what to do.' },
      dont: { example: <Example placeholder="Choose…" />, text: 'Leave out the label or use a vague placeholder.' },
    },
    {
      do: { example: <><Chip label="Draft" onClick={noop} /><Chip label="Published" selected onClick={noop} /></>, text: 'Show 2 to 4 options as chips or radios.' },
      dont: { example: <Example label="Status" value="people" />, text: 'Hide a two-option choice in a dropdown.' },
    },
  ],
  content: [
    'Label: a noun in sentence case: "Department", "Sort by".',
    'Placeholder: "Select" plus the noun: "Select a department".',
    'Options: short, parallel and in a sensible order (alphabetical, or most used first).',
    'Say why an option is disabled nearby, or hide it.',
  ],
  accessibility: [
    'The field is a combobox named by its label; the menu is a listbox.',
    'Enter, Space or the arrow keys open it; arrows move, typing jumps to a match, Enter picks, Escape closes and returns focus.',
    'Helper and error text are linked with aria-describedby.',
    'Selected rows are shown by the fill and the Medium label, not by colour alone.',
  ],
  figma: [
    { label: 'Dropdown, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12113-14844' },
    { label: 'Dropdown, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8925-1408' },
    { label: 'Listbox and List itens (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9162-1042' },
  ],
  spec: 'playground/docs/design-system/dropdown.md',
}

export function DropdownGuidelines() {
  return <GuidelinesTemplate g={g} />
}
