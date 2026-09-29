import { FormControlLabel, Radio, RadioGroup, Tab, Tabs } from '@mui/material'
import { Toggle, Button } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Labelled = ({ label, checked = true }: { label: string; checked?: boolean }) => (
  <FormControlLabel control={<Toggle checked={checked} tabIndex={-1} />} label={label} />
)

// Content from playground/docs/design-system/selection-controls.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A toggle turns a single setting on or off, and the change applies at once, with no Save. In code it is MUI Switch.',
  whenToUse: [
    'For a setting that takes effect immediately: notifications, a feature, a visibility option.',
    'In settings lists, one toggle per row.',
  ],
  whenNotToUse: [
    'In a form that is saved with a button. Use a checkbox.',
    'To pick between options. Use radios or tabs.',
    'To switch between two views. Use tabs or a content switcher.',
  ],
  anatomy: {
    example: <Labelled label="Email notifications" />,
    parts: [
      { name: 'Track', description: '36 by 20px, fully rounded. Selected when on, Text-disabled when off.' },
      { name: 'Thumb', description: '16px, Neutral-25, 2px inside the track. Moves 16px to the right when on.' },
      { name: 'Label', description: 'Regular 14px in Text-primary, 8px away, or the title of a settings row.' },
    ],
  },
  variants: [
    { name: 'Off', description: 'Text-disabled track, thumb on the left.', example: <Toggle checked={false} tabIndex={-1} inputProps={{ 'aria-label': 'Off' }} /> },
    { name: 'On', description: 'Selected track, thumb on the right.', example: <Toggle checked tabIndex={-1} inputProps={{ 'aria-label': 'On' }} /> },
  ],
  states: [
    { name: 'Enabled', description: 'On or off. Figma has no hover state.' },
    { name: 'Focus', description: 'A 2px ring in the primary button colour, 2px outside the track. Not in Figma yet.' },
    { name: 'Disabled', description: 'Text-disabled track, on or off: only the thumb shows the value. The label in Text-disabled. Not in Figma yet.' },
  ],
  dos: [
    {
      do: { example: <Labelled label="Email notifications" />, text: 'Use a toggle when the change applies at once.' },
      dont: { example: <><Labelled label="Email notifications" /><Button size="small">Save</Button></>, text: 'Pair a toggle with a Save button. Use a checkbox.' },
    },
    {
      do: { example: <Tabs value={0}><Tab label="List" /><Tab label="Grid" /></Tabs>, text: 'Use tabs to switch between views.' },
      dont: { example: <Labelled label="Grid view" />, text: 'Use a toggle to switch views.' },
    },
    {
      do: { example: <RadioGroup value="weekly"><FormControlLabel value="weekly" control={<Radio tabIndex={-1} />} label="Weekly" /><FormControlLabel value="monthly" control={<Radio tabIndex={-1} />} label="Monthly" /></RadioGroup>, text: 'Use radios for a choice between named options.' },
      dont: { example: <Labelled label="Weekly or monthly" checked={false} />, text: 'Make people guess what on and off mean.' },
    },
  ],
  content: [
    'The label names the setting, not the action: "Email notifications", not "Turn on email notifications".',
    'Sentence case, with no full stop.',
    "Don't add On and Off text: the thumb and colour already show it.",
  ],
  accessibility: [
    'The Toggle is a checkbox with role switch, so it is announced as a switch, on or off.',
    'Every toggle has a label: a visible label, or aria-labelledby pointing at the settings row title.',
    'Space switches it. The label is part of the target.',
    'The thumb position shows the state, not colour alone.',
  ],
  figma: [
    { label: 'Toggle, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11917-3970' },
    { label: 'Toggle, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8160-364' },
  ],
  spec: 'playground/docs/design-system/selection-controls.md',
}

export function ToggleGuidelines() {
  return <GuidelinesTemplate g={g} />
}
