import { Box } from '@mui/material'
import { ProgressBar } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Bar = ({ value, label = false }: { value: number; label?: boolean }) => (
  <Box sx={{ width: 240 }}>
    <ProgressBar value={value} showLabel={label} aria-label="Progress" />
  </Box>
)

// Content from the Figma Progress bar set, playground/docs/design-system/table.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'A progress bar shows how much of something is done: a course, a program, a learning path.',
  whenToUse: ['For learning progress on cards, rows and headers.', 'When the total is known and progress is measured.'],
  whenNotToUse: ['For loading. Use a spinner or a skeleton.', 'For scores or ratings.', 'When the number matters more than the shape. Show the number.'],
  anatomy: {
    example: <Bar value={62} label />,
    parts: [
      { name: 'Track', description: '8px tall, fully rounded, in Border.' },
      { name: 'Fill', description: 'Primary-600 with a rounded end. Success-500 across the whole bar at 100%.' },
      { name: 'Label', description: 'Optional: the percentage, Regular 14px, 8px after the bar.' },
    ],
  },
  variants: [
    { name: 'In progress', description: 'Primary-600 fill.', example: <Bar value={37} /> },
    { name: 'Complete', description: 'Success-500, the whole bar.', example: <Bar value={100} /> },
    { name: 'With percentage', description: 'In tables and anywhere the exact value helps.', example: <Bar value={62} label /> },
  ],
  states: [{ name: 'Default', description: 'Progress bars have no interactive states.' }],
  dos: [
    { do: { example: <Bar value={100} label />, text: 'Show the percentage where people compare progress.' }, dont: { example: <Bar value={100} />, text: 'Rely on colour alone for complete: say it too.' } },
  ],
  content: ['Say what the progress is of, nearby: the course title, "Your progress".', 'Round the percentage to whole numbers.'],
  accessibility: ['It is a progressbar with aria-valuenow, min 0 and max 100.', 'Name it with aria-label or aria-labelledby (the course title).', 'The percentage label is visual; the value is already announced.'],
  figma: [
    { label: 'Progress bar, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12000-10067' },
    { label: 'Progress bar, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=7046-25097' },
  ],
  spec: 'playground/docs/design-system/gamification.md',
}

export function ProgressBarGuidelines() {
  return <GuidelinesTemplate g={g} />
}
