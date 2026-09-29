import { FormControlLabel, Stack } from '@mui/material'
import { Toggle, Checkbox } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Row = ({ label, checked = false, indeterminate = false }: { label: string; checked?: boolean; indeterminate?: boolean }) => (
  <FormControlLabel control={<Checkbox checked={checked} indeterminate={indeterminate} tabIndex={-1} />} label={label} />
)

// Content from playground/docs/design-system/selection-controls.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A checkbox lets people pick any number of options from a list, including none, or accept a single statement. The choice is saved when the form is submitted.',
  whenToUse: [
    'To pick zero or more options from a list.',
    'To accept a single statement, such as terms or consent.',
    'To select all rows in a table, with the indeterminate state when only some are selected.',
  ],
  whenNotToUse: [
    'For options that exclude each other. Use radios.',
    'For a setting that applies at once. Use a toggle.',
    'For long lists. Use a multi-select dropdown.',
  ],
  anatomy: {
    example: <Row label="I agree to the terms" checked />,
    parts: [
      { name: 'Box', description: '16px, with a 1px Text-primary border. Checked and indeterminate fill it with Selected, with the tick or bar cut out.' },
      { name: 'Halo', description: '32px round frame with 8px padding. Page-background-hover on hover.' },
      { name: 'Label', description: 'Regular 14px in Text-primary, 12px from the box. Clicking it ticks the box.' },
    ],
  },
  variants: [
    { name: 'Not checked', description: 'The default.', example: <Checkbox checked={false} tabIndex={-1} inputProps={{ 'aria-label': 'Not checked' }} /> },
    { name: 'Checked', description: 'Picked.', example: <Checkbox checked tabIndex={-1} inputProps={{ 'aria-label': 'Checked' }} /> },
    { name: 'Indeterminate', description: 'A parent where some, but not all, of its children are picked.', example: <Checkbox indeterminate tabIndex={-1} inputProps={{ 'aria-label': 'Indeterminate' }} /> },
  ],
  states: [
    { name: 'Enabled', description: 'Text-primary border, or the Selected fill.' },
    { name: 'Hover', description: 'The 32px halo in Page-background-hover, over the box or its label.' },
    { name: 'Focus', description: 'A 2px ring in the primary button colour round the halo. Not in Figma yet.' },
    { name: 'Disabled', description: 'Text-disabled border, fill and label. Not focusable.' },
  ],
  dos: [
    {
      do: { example: <Stack><Row label="People" checked /><Row label="Sales" /></Stack>, text: 'Use checkboxes when people can pick several options.' },
      dont: { example: <Stack><Row label="Yes" checked /><Row label="No" /></Stack>, text: 'Use them for options that exclude each other. Use radios.' },
    },
    {
      do: { example: <FormControlLabel control={<Toggle checked tabIndex={-1} />} label="Email notifications" />, text: 'Use a toggle for a setting that applies at once.' },
      dont: { example: <Row label="Email notifications" checked />, text: 'Use a checkbox for a setting with no Save.' },
    },
    {
      do: { example: <Row label="Send me a weekly summary" />, text: 'Write labels that say what happens when it is ticked.' },
      dont: { example: <Row label="Don't send me a summary" />, text: 'Use negatives, which make people think twice.' },
    },
  ],
  content: [
    'Labels in sentence case, with no full stop.',
    'Say what ticking it does: "Send me a weekly summary".',
    'Avoid negatives: "Hide completed courses" rather than "Don\'t show completed courses".',
    'Order options logically: alphabetical, or most used first.',
  ],
  accessibility: [
    'Every checkbox has a label, visible or an aria-label (a table row: "Select row 3").',
    'The label is part of the target: clicking it ticks the box.',
    'Tab moves between checkboxes; Space ticks and unticks.',
    'Indeterminate is announced as mixed.',
    'Group related checkboxes in a fieldset with a legend.',
    'The tick or bar shows the state, not colour alone.',
  ],
  figma: [
    { label: 'Checkbox, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11917-3924' },
    { label: 'Checkbox, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=6339-10484' },
  ],
  spec: 'playground/docs/design-system/selection-controls.md',
}

export function CheckboxGuidelines() {
  return <GuidelinesTemplate g={g} />
}
