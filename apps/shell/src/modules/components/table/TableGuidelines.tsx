import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Avatar, Badge, CellContent, Checkbox } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { PHOTO } from '../avatar/AvatarMatrix'

const Mini = ({ rows, head = ['Name', 'Status'] }: { rows: React.ReactNode[][]; head?: string[] }) => (
  <Table sx={{ width: 320 }}>
    <TableHead>
      <TableRow>
        {head.map((h) => (
          <TableCell key={h}>{h}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((r, i) => (
        <TableRow key={i}>
          {r.map((c, j) => (
            <TableCell key={j}>{c}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

// Content from playground/docs/design-system/table.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A table lists records people compare, sort and act on: learners, enrolments, courses, reports. Each row is its own card under a filled header bar.',
  whenToUse: ['For rows of records with the same fields.', 'When people sort, select several rows, or scan a column.'],
  whenNotToUse: ['For a few items with rich content. Use cards.', 'For layout. Use auto layout frames.', 'For key and value pairs about one thing. Use a description list.'],
  anatomy: {
    example: <Mini rows={[[<CellContent key="a" start={<Avatar size={32} src={PHOTO} alt="" />} primary="Ana Costa" />, <Badge key="b" type="success" label="Completed" />]]} />,
    parts: [
      { name: 'Header', description: 'A bar in Input-background, radius 12. Regular 14px in Text-secondary; optional select-all checkbox and sort arrow (ArrowDown 20px, 4px away).' },
      { name: 'Row', description: 'A card: 1px Border, radius 12, 12px from the next. Cells padded 8px by 12px, Regular 14px in Text-primary.' },
      { name: 'Cell content', description: 'Checkbox, avatar or thumbnail first, then the text, then an icon: 12px apart. Two-line text is SemiBold over Regular Text-secondary, 2px apart.' },
      { name: 'Pagination', description: 'Right-aligned under the table: "1-10 of 28" in Text-secondary, then two 16px chevrons, 16px apart.' },
    ],
  },
  variants: [
    { name: 'Plain', description: 'Read-only records.', example: <Mini rows={[['Ana Costa', 'People'], ['Ben Hall', 'Sales']]} head={['Name', 'Team']} /> },
    {
      name: 'Selectable',
      description: 'A checkbox on each row, and select-all in the header.',
      example: <Mini rows={[[<CellContent key="a" start={<Checkbox checked tabIndex={-1} inputProps={{ 'aria-label': 'Select' }} />} primary="Ana Costa" />, 'People']]} head={['Name', 'Team']} />,
    },
  ],
  states: [
    { name: 'Hover', description: 'The row fills with Input-background. Links in it turn Text-button-hover.' },
    { name: 'Selected', description: 'Secondary-500 at 12% on the fill and border; 24% on hover.' },
    { name: 'Disabled (read-only)', description: 'Text-disabled; pictures lose their colour. Set it on the row, not on cells.' },
    { name: 'Focus', description: 'Controls in cells show the 2px primary button ring.' },
  ],
  dos: [
    {
      do: { example: <Mini rows={[['Ana Costa', <Badge key="b" type="error" label="Overdue" />]]} />, text: 'Use badges for status, and keep one status per cell.' },
      dont: { example: <Mini rows={[['Ana Costa', <Stack key="b" direction="row" sx={{ gap: 1 }}><Badge type="error" label="Overdue" /><Badge type="progress" label="In progress" /></Stack>]]} />, text: 'Crowd several badges into one cell.' },
    },
  ],
  content: ['Headers are short nouns in sentence case: "Name", "Due date".', 'Dates as "Jan 1," over the year.', 'Say why a row is read-only, for example "Archived" as its supporting text.'],
  accessibility: [
    'It is a real table: columns have headers, and the table has an accessible name.',
    'Checkboxes are named after the row ("Select Ana Costa"); select-all says what it covers.',
    'Sortable headers are buttons; the sorted column says its direction (aria-sort).',
    'Icon-only buttons have names ("Actions for Ana Costa"), and pagination buttons are named too.',
    'Selected rows are shown by the ticked checkbox, not by colour alone.',
  ],
  figma: [
    { label: 'Table, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11927-7332' },
    { label: 'Table, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=7896-2624' },
    { label: 'Table data, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11927-7602' },
  ],
  spec: 'playground/docs/design-system/table.md',
}

export function TableGuidelines() {
  return <GuidelinesTemplate g={g} />
}
