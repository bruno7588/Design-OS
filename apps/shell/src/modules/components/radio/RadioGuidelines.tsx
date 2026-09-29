import { Checkbox, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material'
import { Dropdown } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const Group = ({ options, value, row }: { options: string[]; value?: string; row?: boolean }) => (
  <RadioGroup value={value ?? ''} row={row} sx={{ columnGap: 6 }}>
    {options.map((o) => (
      <FormControlLabel key={o} value={o} control={<Radio tabIndex={-1} />} label={o} />
    ))}
  </RadioGroup>
)

// Content from playground/docs/design-system/selection-controls.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A radio lets people pick exactly one option from a short list, with every option in view. The choice is saved when the form is submitted.',
  whenToUse: [
    'To pick one of 2 to 6 options that exclude each other.',
    'When people should compare the options side by side before picking.',
    'For a yes or no question in a form.',
  ],
  whenNotToUse: [
    'For more than about 6 options. Use a dropdown.',
    'To pick several options. Use checkboxes.',
    'For a setting that applies at once. Use a toggle.',
    'On its own: a single radio can’t be unticked. Use a checkbox.',
  ],
  anatomy: {
    example: <Group options={['Automatic', 'Manual review']} value="Automatic" />,
    parts: [
      { name: 'Ring', description: '15px, a 1px Text-primary stroke. Selected turns it Selected, with a 7.5px dot.' },
      { name: 'Halo', description: '24px round frame. Page-background-hover on hover.' },
      { name: 'Label', description: 'Regular 14px in Text-primary, about 12px from the ring. Clicking it picks the option.' },
      { name: 'Group label', description: 'Semibold 14px in Text-secondary, as the field label, above the options.' },
    ],
  },
  variants: [
    { name: 'Vertical', description: 'The default: easiest to scan.', example: <Group options={['Daily', 'Weekly']} value="Weekly" /> },
    { name: 'Horizontal', description: 'For two or three short options, such as Yes and No.', example: <Group options={['Yes', 'No']} value="Yes" row /> },
  ],
  states: [
    { name: 'Enabled', description: 'Text-primary ring, or the Selected ring and dot.' },
    { name: 'Hover', description: 'The 24px halo in Page-background-hover, over the ring or its label.' },
    { name: 'Focus', description: 'A 2px ring in the primary button colour round the halo. Not in Figma yet.' },
    { name: 'Disabled', description: 'Text-disabled ring, dot and label. Not focusable.' },
  ],
  dos: [
    {
      do: { example: <Group options={['Automatic', 'Manual review']} value="Automatic" />, text: 'Pick a sensible default when there is one.' },
      dont: { example: <Stack><FormControlLabel control={<Checkbox tabIndex={-1} />} label="Automatic" /><FormControlLabel control={<Checkbox checked tabIndex={-1} />} label="Manual review" /></Stack>, text: 'Use checkboxes for options that exclude each other.' },
    },
    {
      do: { example: <Dropdown label="Country" options={[{ value: 'pt', label: 'Portugal' }]} value="pt" onChange={noop} SelectProps={{ tabIndex: -1 }} />, text: 'Use a dropdown for long lists.' },
      dont: { example: <Group options={['Portugal', 'Spain', 'France', 'Italy', 'Germany', 'Ireland', 'Poland']} />, text: 'List more than about 6 radios.' },
    },
  ],
  content: [
    'Labels in sentence case, with no full stop.',
    'Keep options short and parallel.',
    'Order them logically: by size, by time, or most used first.',
    'The group label asks the question or names the setting: "Enrolment", "How often?".',
  ],
  accessibility: [
    'Group radios in a fieldset with a legend (MUI RadioGroup has role radiogroup).',
    'Tab moves into the group, onto the picked option. The arrow keys move and pick.',
    'The label is part of the target.',
    'The dot shows the choice, not colour alone.',
  ],
  figma: [
    { label: 'Radio, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11917-3950' },
    { label: 'Radio, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5001-18926' },
  ],
  spec: 'playground/docs/design-system/selection-controls.md',
}

export function RadioGuidelines() {
  return <GuidelinesTemplate g={g} />
}
