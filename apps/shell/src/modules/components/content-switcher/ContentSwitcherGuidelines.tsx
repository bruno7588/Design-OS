import { Chip, ContentSwitcher, Tab } from '@design-os/components'
import { Tabs } from '@mui/material'
import { Element3, RowVertical } from 'iconsax-react'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const Switch = ({ labels, value = labels[0] }: { labels: string[]; value?: string }) => (
  <ContentSwitcher aria-label="Example" value={value} onChange={noop} items={labels.map((l) => ({ value: l, label: l }))} />
)

// Content from Part 2 of playground/docs/design-system/chips-switcher-tabs.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'A content switcher changes how the same content is shown: grid or list, week or month. The sections sit together in one track, and one is always selected.',
  whenToUse: ['To switch between 2 to 5 views of the same content.', 'Near the content it changes, usually above it.'],
  whenNotToUse: ['To filter. Use chips.', 'To move between different sections of a page. Use tabs.', 'For a setting. Use a toggle or radios.'],
  anatomy: {
    example: <Switch labels={['Grid', 'List', 'Calendar']} />,
    parts: [
      { name: 'Track', description: 'Input-background, radius 12, padding 4, sections 4px apart.' },
      { name: 'Section', description: 'Padding 6px by 12px, radius 8. Regular 14px in Text-secondary.' },
      { name: 'Selected', description: 'Secondary-500 with a Bold Neutral-800 label, in both modes.' },
      { name: 'Icon', description: 'Optional: 20px before the label, or 16px after it, 4px away.' },
    ],
  },
  variants: [
    { name: 'Text', description: 'The default.', example: <Switch labels={['Week', 'Month']} /> },
    {
      name: 'With icons',
      description: 'When the icon helps recognise the view. Use icons on every section, or none.',
      example: (
        <ContentSwitcher
          aria-label="View"
          value="grid"
          onChange={noop}
          items={[
            { value: 'grid', label: 'Grid', iconLeft: <Element3 color="currentColor" /> },
            { value: 'list', label: 'List', iconLeft: <RowVertical color="currentColor" /> },
          ]}
        />
      ),
    },
  ],
  states: [
    { name: 'Selected', description: 'Secondary-500, Bold label. No hover change.' },
    { name: 'Enabled', description: 'Transparent, Regular Text-secondary.' },
    { name: 'Hover', description: 'Input-background-hover.' },
    { name: 'Focus', description: 'A 2px ring in the primary button colour.' },
    { name: 'Disabled', description: 'Text-disabled.' },
  ],
  dos: [
    {
      do: { example: <Switch labels={['Grid', 'List']} />, text: 'Switch views of the same content.' },
      dont: { example: <Switch labels={['Overview', 'Lessons', 'Learners']} />, text: 'Switch between different sections. Use tabs.' },
    },
    {
      do: { example: <><Chip label="Completed" onClick={noop} /><Chip label="Overdue" selected onClick={noop} /></>, text: 'Use chips to filter.' },
      dont: { example: <Switch labels={['All', 'Completed', 'Overdue']} />, text: 'Use a switcher as a filter.' },
    },
    {
      do: { example: <Tabs value={0}><Tab label="Overview" /><Tab label="Lessons" /></Tabs>, text: 'Use tabs for page sections.' },
      dont: { example: <Switch labels={['Overview', 'Lessons']} />, text: 'Mix the two patterns.' },
    },
  ],
  content: ['One word per section where possible, in sentence case.', 'Keep labels parallel: "Week", "Month", not "Week", "Monthly view".'],
  accessibility: [
    'It is a group of toggle buttons named by aria-label; the selected one is aria-pressed.',
    'Tab reaches each section; Enter or Space selects it.',
    'Selection is shown by the fill and the Bold label, not by colour alone.',
  ],
  figma: [
    { label: 'Content switcher item, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11908-5278' },
    { label: 'Content switcher item, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8497-24186' },
  ],
  spec: 'playground/docs/design-system/chips-switcher-tabs.md',
}

export function ContentSwitcherGuidelines() {
  return <GuidelinesTemplate g={g} />
}
