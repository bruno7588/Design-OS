import { Breadcrumb, Tab } from '@design-os/components'
import { Tabs } from '@mui/material'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}

// Content from the Breadcrumb section of playground/docs/design-system/navigation.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'A breadcrumb shows where a page sits in the hierarchy and lets people go back up it in one click.',
  whenToUse: ['On pages two or more levels deep: a course inside a program, a lesson inside a course.', 'Above the page title.'],
  whenNotToUse: ['On top-level pages.', 'To move between sibling sections. Use tabs.', 'As the only way back. Keep the side navigation.'],
  anatomy: {
    example: <Breadcrumb items={[{ label: 'Programs', onClick: noop }, { label: 'Leadership essentials', onClick: noop }, { label: 'Giving feedback' }]} />,
    parts: [
      { name: 'Link', description: 'Regular 14px in Text-tertiary. Hover: Text-primary, underlined.' },
      { name: 'Chevron', description: 'ArrowRight2, 16px, 2px after the link, in the link’s colour. 4px to the next item.' },
      { name: 'Current page', description: 'The last item: Text-secondary, not a link, no chevron.' },
    ],
  },
  variants: [
    { name: 'Two levels', description: 'The most common.', example: <Breadcrumb items={[{ label: 'Programs', onClick: noop }, { label: 'Leadership essentials' }]} /> },
    { name: 'Three levels', description: 'Deeper content.', example: <Breadcrumb items={[{ label: 'Programs', onClick: noop }, { label: 'Leadership', onClick: noop }, { label: 'Giving feedback' }]} /> },
  ],
  states: [
    { name: 'Enabled', description: 'Links in Text-tertiary.' },
    { name: 'Hover', description: 'Text-primary and underlined; the chevron follows.' },
    { name: 'Focus', description: 'A 2px ring in the primary button colour.' },
    { name: 'Disabled', description: 'Text-disabled, not focusable. Rare: prefer leaving the level out.' },
  ],
  dos: [
    {
      do: { example: <Breadcrumb items={[{ label: 'Programs', onClick: noop }, { label: 'Giving feedback' }]} />, text: 'Use the page titles people see.' },
      dont: { example: <Breadcrumb items={[{ label: 'Home', onClick: noop }, { label: 'Section 2', onClick: noop }, { label: 'Page' }]} />, text: 'Use generic labels, or start with Home.' },
    },
    {
      do: { example: <Tabs value={0}><Tab label="Overview" /><Tab label="Lessons" /></Tabs>, text: 'Use tabs for sections of one page.' },
      dont: { example: <Breadcrumb items={[{ label: 'Overview', onClick: noop }, { label: 'Lessons' }]} />, text: 'Use a breadcrumb for siblings.' },
    },
  ],
  content: ['Labels match the page titles, in sentence case.', 'Long titles can be shortened with an ellipsis; keep the full title as the page heading.'],
  accessibility: [
    'It is a nav landmark named "Breadcrumb", with an ordered list inside.',
    'The current page has aria-current="page" and isn’t a link.',
    'The chevrons are decorative and hidden from screen readers.',
  ],
  figma: [
    { label: 'Breadcrumb item, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11935-2383' },
    { label: 'Breadcrumb item, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8497-1494' },
  ],
  spec: 'playground/docs/design-system/navigation.md',
}

export function BreadcrumbGuidelines() {
  return <GuidelinesTemplate g={g} />
}
