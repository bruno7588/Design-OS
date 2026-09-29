import { Stack, Typography } from '@mui/material'
import cellSource from '@design-os/components/src/Table/CellContent.tsx?raw'
import overrides from '@design-os/components/src/Table/table.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { Avatar, Badge, CellContent, CellDate, Checkbox } from '@design-os/components'

// With the 5Mins theme, plain MUI renders the Figma table: a header bar and card rows.
<Table aria-label="Learners">
  <TableHead>
    <TableRow>
      <TableCell sortDirection={order}>
        <CellContent
          start={<Checkbox checked={all} indeterminate={some && !all} onChange={toggleAll} inputProps={{ 'aria-label': 'Select all' }} />}
          primary={<TableSortLabel active direction={order} onClick={flip}>Name</TableSortLabel>}
        />
      </TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Due</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.id} hover selected={picked.has(r.id)} aria-disabled={r.archived || undefined}>
        <TableCell>
          <CellContent start={<Avatar size={40} src={r.photo} alt="" />} primary={r.name} secondary={r.email} />
        </TableCell>
        <TableCell><Badge type="success" label="Completed" /></TableCell>
        <TableCell><CellDate date={r.due} /></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
<TablePagination count={28} page={page} rowsPerPage={10} onPageChange={(_, p) => setPage(p)} />`

export function TableCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Table, TableSortLabel and TablePagination: a real table, so screen readers get rows, columns and
        headers. The theme draws the Figma header bar, card rows, states and pagination. CellContent lays out what goes inside a
        cell. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="CellContent.tsx" caption="packages/components/src/Table (CellContent, CellDate, TableThumbnail)" code={cellSource} />
      <CodeBlock title="table.overrides.tsx" caption="MuiTable, MuiTableCell, MuiTableRow, MuiTableSortLabel, MuiTablePagination" code={overrides} />
    </Stack>
  )
}
