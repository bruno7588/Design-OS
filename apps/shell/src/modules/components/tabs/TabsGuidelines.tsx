import { Tabs } from '@mui/material'
import { Chip, Tab } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}

function Bar({ labels, counts = [], value = 0 }: { labels: string[]; counts?: (number | undefined)[]; value?: number }) {
  return (
    <Tabs value={value} aria-label="Example">
      {labels.map((l, i) => (
        <Tab key={l} value={i} label={l} count={counts[i]} tabIndex={-1} />
      ))}
    </Tabs>
  )
}

// Content from playground/docs/design-system/chips-switcher-tabs.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'Tabs split a page into sibling sections that people can move between without leaving the page, such as the overview, learners and lessons of a course. The selected tab is marked with a 2px underline.',
  whenToUse: [
    'To organise related content on one page into sections of the same level.',
    'When people need one section at a time and move between them often.',
    'With a counter, when the number in each section helps people choose.',
  ],
  whenNotToUse: [
    'To go to another page. Use the side navigation.',
    'To filter a list. Use chips.',
    'To switch between views of the same data, such as grid and list. Use a content switcher.',
    'For steps in a sequence. Use a stepper.',
  ],
  anatomy: {
    example: <Bar labels={['Overview', 'Learners', 'Lessons']} counts={[undefined, 24, undefined]} />,
    parts: [
      { name: 'Tab', description: 'Hugs its label. Tabs sit 16px apart in a 27px bar.' },
      { name: 'Label', description: 'Poppins 14px: Medium when not selected, Bold when selected.' },
      { name: 'Counter', description: 'Optional. A 20px pill in Input-background, 4px after the label, with the number in 14px Medium.' },
      { name: 'Indicator', description: 'Selected tab only. 2px tall, 4px under the label, as wide as the label and counter, in the Selected colour.' },
    ],
  },
  variants: [
    { name: 'Label only', description: 'The default.', example: <Bar labels={['Overview', 'Lessons']} /> },
    { name: 'With a counter', description: 'When the count helps people decide where to go.', example: <Bar labels={['Learners', 'Lessons']} counts={[24, 8]} /> },
  ],
  states: [
    { name: 'Enabled', description: 'Text-secondary label; counter in Text-tertiary.' },
    { name: 'Hover', description: 'The label and counter move to Text-primary and Text-secondary. No indicator.' },
    { name: 'Selected', description: 'Bold Text-primary label and the 2px indicator in Selected: Secondary-600 in light mode, Secondary-500 in dark mode.' },
    { name: 'Focus', description: 'Keyboard focus only: a 2px ring in the primary button colour, 2px outside the tab.' },
    { name: 'Disabled', description: 'Text-disabled label. Not in Figma; use sparingly, and prefer hiding a section that does not apply.' },
  ],
  dos: [
    {
      do: { example: <Bar labels={['Overview', 'Learners', 'Lessons']} />, text: 'Use short, one or two word labels.' },
      dont: { example: <Bar labels={['Course overview and details', 'Enrolled learners']} />, text: 'Write long labels. Keep to three words at most.' },
    },
    {
      do: { example: <><Chip label="All" selected onClick={noop} /><Chip label="Compliance" onClick={noop} /></>, text: 'Use chips to filter a list.' },
      dont: { example: <Bar labels={['All', 'Compliance']} />, text: 'Use tabs as filters.' },
    },
    {
      do: { example: <Bar labels={['Overview', 'Learners', 'Lessons', 'Settings']} />, text: 'Keep to about six tabs or fewer.' },
      dont: { example: <Bar labels={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']} />, text: 'Add so many tabs that they scroll or wrap.' },
    },
  ],
  content: [
    'One or two words, three at most. Sentence case.',
    'Name the section, not an action: "Learners", not "View learners".',
    'The first tab is selected by default.',
    'Show a counter only when the number is useful; keep it on every tab of the bar, or on none.',
  ],
  accessibility: [
    'MUI gives the bar role="tablist" and each tab role="tab" with aria-selected.',
    'The arrow keys move between tabs; Tab moves into the panel.',
    'Give each panel role="tabpanel" and link it to its tab with aria-controls and aria-labelledby.',
    'Selected is shown by the indicator and the Bold label, not by colour alone.',
  ],
  figma: [
    { label: 'Tab items, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12134-6969' },
    { label: 'Tab items, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=1939-18281' },
    { label: 'Tabs (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8497-24855' },
  ],
  spec: 'playground/docs/design-system/chips-switcher-tabs.md',
}

export function TabsGuidelines() {
  return <GuidelinesTemplate g={g} />
}
