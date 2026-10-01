import { useMemo, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { CellContent, Checkbox, EmptyState, type EmptyStateProps } from '@design-os/components'
import { More } from 'iconsax-react'

// The Admin data table: the library's themed MUI Table (filled header bar, each row a card)
// with sorting, pagination, checkbox selection and a row actions menu. With no rows it shows
// the library Empty state instead. Every visual comes from the theme.

export interface Column<T> {
  key: string
  header: string
  /** A CSS width for the column, such as '30%' or 120. Others share what's left. */
  width?: string | number
  /** Makes the column sortable. */
  compare?: (a: T, b: T) => number
  render: (row: T) => ReactNode
}

export interface RowAction<T> {
  label: string
  onClick: (row: T) => void
}

export interface DataTableProps<T> {
  label: string
  rows: T[]
  columns: Column<T>[]
  getRowId: (row: T) => string
  /** Used in the checkbox and actions labels, such as "Select Amelia Smith". */
  getRowName: (row: T) => string
  initialSort?: { key: string; direction: 'asc' | 'desc' }
  selectable?: boolean
  selected?: Set<string>
  onSelectedChange?: (selected: Set<string>) => void
  rowActions?: RowAction<T>[]
  /** What to show when there are no rows. */
  empty: EmptyStateProps
  rowsPerPageOptions?: number[]
}

export function DataTable<T>({
  label,
  rows,
  columns,
  getRowId,
  getRowName,
  initialSort,
  selectable = false,
  selected = new Set(),
  onSelectedChange,
  rowActions,
  empty,
  rowsPerPageOptions = [10, 25, 50, 100],
}: DataTableProps<T>) {
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [menu, setMenu] = useState<{ anchor: HTMLElement; row: T } | null>(null)

  const sorted = useMemo(() => {
    const compare = columns.find((c) => c.key === sort?.key)?.compare
    if (!compare || !sort) return rows
    const dir = sort.direction === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => dir * compare(a, b))
  }, [rows, columns, sort])

  // Back to a page that exists when the rows shrink (a search, a deactivation).
  const lastPage = Math.max(0, Math.ceil(sorted.length / perPage) - 1)
  const current = Math.min(page, lastPage)
  const pageRows = sorted.slice(current * perPage, current * perPage + perPage)

  if (rows.length === 0) return <EmptyState {...empty} />

  const ids = pageRows.map(getRowId)
  const all = ids.length > 0 && ids.every((id) => selected.has(id))
  const some = ids.some((id) => selected.has(id))
  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onSelectedChange?.(next)
  }
  const toggleAll = () => {
    const next = new Set(selected)
    ids.forEach((id) => (all ? next.delete(id) : next.add(id)))
    onSelectedChange?.(next)
  }

  const header = (col: Column<T>) => {
    if (!col.compare) return col.header
    const active = sort?.key === col.key
    return (
      <TableSortLabel
        active={active}
        direction={active ? sort!.direction : 'asc'}
        onClick={() => setSort({ key: col.key, direction: active && sort!.direction === 'asc' ? 'desc' : 'asc' })}
      >
        {col.header}
      </TableSortLabel>
    )
  }

  return (
    <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.l}px` })}>
      <Table aria-label={label}>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={col.key} sx={{ width: col.width }} sortDirection={sort?.key === col.key ? sort.direction : false}>
                {i === 0 && selectable ? (
                  <CellContent
                    start={<Checkbox checked={all} indeterminate={some && !all} onChange={toggleAll} inputProps={{ 'aria-label': 'Select everyone on this page' }} />}
                    primary={header(col)}
                  />
                ) : (
                  header(col)
                )}
              </TableCell>
            ))}
            {rowActions && <TableCell sx={{ width: 52 }} aria-label="Actions" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {pageRows.map((row) => {
            const id = getRowId(row)
            return (
              <TableRow key={id} hover selected={selected.has(id)}>
                {columns.map((col, i) => (
                  <TableCell key={col.key}>
                    {i === 0 && selectable ? (
                      <CellContent start={<Checkbox checked={selected.has(id)} onChange={() => toggle(id)} inputProps={{ 'aria-label': `Select ${getRowName(row)}` }} />}>
                        {col.render(row)}
                      </CellContent>
                    ) : (
                      col.render(row)
                    )}
                  </TableCell>
                ))}
                {rowActions && (
                  <TableCell>
                    <IconButton aria-label={`Actions for ${getRowName(row)}`} aria-haspopup="menu" onClick={(e) => setMenu({ anchor: e.currentTarget, row })}>
                      <More size={20} color="currentColor" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={sorted.length}
        page={current}
        rowsPerPage={perPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setPerPage(Number(e.target.value))
          setPage(0)
        }}
      />
      {rowActions && (
        <Menu anchorEl={menu?.anchor} open={!!menu} onClose={() => setMenu(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          {rowActions.map((a) => (
            <MenuItem
              key={a.label}
              onClick={() => {
                const row = menu!.row
                setMenu(null)
                a.onClick(row)
              }}
            >
              {a.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  )
}
