import { tableFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { TableMatrix } from './TableMatrix'

// Figma = Table (dark 7896:2624, light 11927:7332) and its row, header, data and thumbnail sets, checked 2026-09-29.
const compare: Compare = {
  page: tableFigma.page,
  set: tableFigma.set,
  frames: { light: '/figma/table-light.png', dark: '/figma/table-dark.png' },
  live: (mode) => <TableMatrix mode={mode} />,
  differences: [
    { property: 'Layout', figma: 'Header bar, then rows 12px apart; pagination right-aligned', reference: 'Same, as a real table (separate borders, 12px spacing)', status: 'Matches' },
    { property: 'Header', figma: 'Input-background bar, radius 12, cells 8/12, Regular 14 Text-secondary', reference: 'Same', status: 'Matches', note: 'table.md still says borderless in its opening section.' },
    { property: 'Rows', figma: '37px: 1px Border inside, radius 12, cells 8/12', reference: 'Same', status: 'Matches' },
    { property: 'Row hover', figma: 'Input-background', reference: 'Same', status: 'Matches' },
    {
      property: 'Selected row',
      figma: 'Secondary-500 at 12% (24% on hover), fill and border; not bound to a variable',
      reference: 'Same values, as tokens rowSelected and rowSelectedHover',
      status: 'Design to update',
      note: 'Bind them to variables. The prototype uses the #EDA30D amber.',
    },
    { property: 'Read-only row', figma: 'Text-disabled; avatars and thumbnails blend luminosity', reference: 'Same (aria-disabled on the row)', status: 'Matches' },
    { property: 'Cell text', figma: 'Hover turns it Text-button-hover', reference: 'Links in cells only (CellContent link)', status: 'Matches', note: 'table.md: only clickable text changes colour.' },
    { property: 'Two-line text', figma: 'SemiBold over Regular Text-secondary, 2px apart', reference: 'Same', status: 'Matches' },
    { property: 'Text with avatar and checkbox', figma: 'SemiBold on one line, where the other one-line cells are Regular', reference: 'Regular', status: 'Design to update' },
    { property: 'Checkbox in cells', figma: '24px frames; one variant (checkbox + illustration) uses a 16px frame', reference: '24px everywhere', status: 'Design to update' },
    { property: 'Pagination', figma: '"1-10 of 28" Text-secondary; 16px chevrons, disabled Text-disabled', reference: 'Same (TablePagination)', status: 'Matches' },
    { property: 'Sort', figma: 'ArrowDown 20px, 4px after the label', reference: 'Same; it turns when the order is ascending', status: 'Matches' },
    { property: 'Progress bar and illustration cells', figma: 'In the Table data set', reference: 'Not built', status: 'Code to update', note: 'They need the Progress bar and Illustrations components (Gamification page).' },
  ],
  engineering: {
    mui: 'Table, TableRow, TableCell, TableSortLabel, TablePagination',
    usage: `import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'

// With the 5Mins theme, plain MUI renders the Figma table.
<Table aria-label="Learners">
  <TableHead><TableRow><TableCell>Name</TableCell></TableRow></TableHead>
  <TableBody>
    <TableRow hover selected={isPicked}><TableCell>Ana Costa</TableCell></TableRow>
  </TableBody>
</Table>
<TablePagination count={28} page={0} rowsPerPage={10} onPageChange={setPage} />`,
    props: [
      { figma: 'Table row State=Hover', code: 'TableRow hover' },
      { figma: 'Table row Selected=true', code: 'TableRow selected' },
      { figma: 'Table row Disabled=true', code: 'TableRow aria-disabled' },
      { figma: 'Table header Checkbox / Icon', code: 'Checkbox and TableSortLabel in a head cell' },
      { figma: 'Table data (all types)', code: 'CellContent start / primary / secondary / end, CellDate, TableThumbnail' },
    ],
    theme: [
      'MuiTable: separate borders, 12px spacing, equal columns.',
      'MuiTableCell: header bar, card rows, 24px checkboxes, links and action icons.',
      'MuiTableRow: hover, selected and read-only on the cells.',
      'MuiTableSortLabel and MuiTablePagination: Figma icons and layout.',
      'New tokens: rowSelected and rowSelectedHover.',
    ],
    files: ['packages/components/src/Table/table.overrides.tsx', 'packages/components/src/Table/CellContent.tsx', 'packages/components/src/Table/table.figma.ts (Table, row, header, data, thumbnail)'],
  },
}

export function TableCompare() {
  return <CompareTemplate c={compare} />
}
