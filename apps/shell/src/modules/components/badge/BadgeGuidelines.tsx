import { Badge, Chip } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}

// Content from playground/docs/design-system/badges.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A badge labels the status or a property of something: a course that is completed, a deadline that is close, a lesson that is new. It is read, not clicked. A removable badge shows a value someone added, with a way to take it away.',
  whenToUse: [
    'To show the status of a row, card or item: completed, overdue, in progress.',
    'To flag something new.',
    'To show a short property, such as a count or a category.',
    'To list values someone added, such as skills, with a way to remove them.',
  ],
  whenNotToUse: [
    'To filter or select. Use chips.',
    'For a message about the whole page. Use an alert.',
    'For feedback after an action. Use a toast.',
    'On coloured surfaces, where the tint and the text lose contrast.',
  ],
  anatomy: {
    example: <Badge type="success" label="Completed" icon />,
    parts: [
      { name: 'Container', description: 'Hugs its content. 29px tall, fully rounded, a 16% tint of the type colour (Informative uses Input-background, New is solid Danger-400). No border.' },
      { name: 'Icon', description: 'Optional, before the label. 16px, in the label colour: tick circle, info circle, task square, danger or info outline.' },
      { name: 'Label', description: 'Poppins Medium 14px, line-height 1.2, in the type colour.' },
      { name: 'Remove icon', description: 'Optional, after the label, 8px away. It takes the place of the leading icon.' },
    ],
  },
  variants: [
    { name: 'Success', description: 'Completed, passed, active.', example: <Badge type="success" label="Completed" icon /> },
    { name: 'Warning', description: 'Needs attention soon, such as a deadline this week.', example: <Badge type="warning" label="Due in 3 days" icon /> },
    { name: 'Error', description: 'Failed, overdue, deactivated.', example: <Badge type="error" label="Overdue" icon /> },
    { name: 'In progress', description: 'Started but not finished, or pending.', example: <Badge type="progress" label="In progress" /> },
    { name: 'Informative', description: 'Neutral properties: a category, a count, metadata.', example: <Badge type="informative" label="12 lessons" /> },
    { name: 'New', description: 'Recently added. Never has an icon.', example: <Badge type="new" label="New" /> },
  ],
  states: [
    { name: 'Default', description: 'Badges have no hover, pressed or disabled state. They are labels.' },
    { name: 'Removable', description: 'The badge becomes a button: Backspace or Delete removes it, as does a click on the remove icon.' },
    { name: 'Focus', description: 'Removable badges only: a 2px ring in the primary button colour, 2px outside.' },
  ],
  dos: [
    {
      do: { example: <Badge type="error" label="Overdue" icon />, text: 'Say the status in the label. Colour supports it.' },
      dont: { example: <Badge type="error" label="3" />, text: 'Rely on colour alone to carry the meaning.' },
    },
    {
      do: { example: <><Chip label="Completed" onClick={noop} /><Chip label="Overdue" onClick={noop} /></>, text: 'Use chips to filter by status.' },
      dont: { example: <><Badge type="success" label="Completed" /><Badge type="error" label="Overdue" /></>, text: 'Use badges as filters or buttons.' },
    },
    {
      do: { example: <Badge type="new" label="New" />, text: 'Keep New plain.' },
      dont: { example: <Badge type="success" label="New" icon />, text: 'Use a status colour or an icon for New.' },
    },
  ],
  content: [
    'One or two words. Sentence case: "In progress", not "In Progress".',
    'Use the same word for the same status everywhere: "Overdue", not "Late" in one place and "Past due" in another.',
    'Numbers are fine: "12 lessons", "3 days left".',
    'No punctuation.',
  ],
  accessibility: [
    'The label carries the meaning; colour and icon support it.',
    'Badges are not live regions: a table full of them would flood screen readers. Announce changes elsewhere, for example with a toast.',
    'A removable badge is a button: Backspace or Delete removes it.',
    'When the last value is removed, move focus somewhere sensible, such as the field that adds values.',
  ],
  figma: [
    { label: 'Badge, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12186-1609' },
    { label: 'Badge, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5799-479' },
  ],
  spec: 'playground/docs/design-system/badges.md',
}

export function BadgeGuidelines() {
  return <GuidelinesTemplate g={g} />
}
