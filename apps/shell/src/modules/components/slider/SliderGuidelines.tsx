import { Box, Slider } from '@mui/material'
import { InputInteger } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Example = ({ value = 50, disabled = false }: { value?: number; disabled?: boolean }) => (
  <Box sx={{ width: 240 }}>
    <Slider value={value} disabled={disabled} aria-label="Example" slotProps={{ thumb: { tabIndex: -1 } as object }} />
  </Box>
)
const noop = () => {}

// Content from the Figma <Slider> set and the 5mins-copy-review skill (no prototype spec).
const g: Guidelines = {
  overview: 'A slider picks a value from a range by dragging, where the rough amount matters more than the exact number, such as a pass mark.',
  whenToUse: ['For a value in a known range, such as 0 to 100%.', 'When people judge by eye and fine-tune after.'],
  whenNotToUse: [
    'For an exact number. Use an input field or an integer input.',
    'For a few steps, such as 1 to 5. Use an integer input or radios.',
    'For progress. Use a progress bar.',
  ],
  anatomy: {
    example: <Example value={80} />,
    parts: [
      { name: 'Rail', description: '4px, fully rounded, in Border.' },
      { name: 'Track', description: '6px, fully rounded, in Selected, from the start to the thumb.' },
      { name: 'Thumb', description: '20px, Selected, with a 1px 1px 4px shadow. On hover, a 42px Selected halo at 16%.' },
    ],
  },
  variants: [
    { name: 'Default', description: 'Show the value next to the label.', example: <Example value={50} /> },
    { name: 'Disabled', description: 'Track and thumb in Button-background-disabled.', example: <Example value={50} disabled /> },
  ],
  states: [
    { name: 'Enabled', description: 'Selected track and thumb.' },
    { name: 'Hover', description: 'The thumb’s 42px halo.' },
    { name: 'Focus', description: 'The halo and a 2px focus ring round the thumb.' },
    { name: 'Disabled', description: 'Button-background-disabled track and thumb. Not focusable.' },
  ],
  dos: [
    {
      do: { example: <Example value={80} />, text: 'Show the value in the label, such as "Pass mark: 80%".' },
      dont: { example: <InputInteger value={80} onChange={noop} max={100} inputProps={{ 'aria-label': 'Pass mark', tabIndex: -1 }} />, text: 'Use a slider when the exact number matters; use an integer input.' },
    },
  ],
  content: ['Label: a noun with the current value: "Pass mark: 80%".', 'Say the unit in the label or the value text, not only on the track.'],
  accessibility: [
    'The thumb is a slider named by its label (aria-labelledby) with aria-valuenow, min and max.',
    'Arrow keys step it; Page Up and Down take bigger steps; Home and End go to the ends.',
    'Use getAriaValueText to say the unit: "80%".',
  ],
  figma: [
    { label: 'Slider, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11045-9459' },
    { label: 'Slider, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10662-14039' },
  ],
  spec: 'Figma Library, Slider page (no prototype spec)',
}

export function SliderGuidelines() {
  return <GuidelinesTemplate g={g} />
}
