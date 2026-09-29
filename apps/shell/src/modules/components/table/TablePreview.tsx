import { useMemo, useState } from 'react'
import { FormControlLabel, IconButton, Stack, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { Avatar, Badge, CellContent, CellDate, Checkbox, type Mode } from '@design-os/components'
import { More } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { PHOTO } from '../avatar/AvatarMatrix'
import { TableMatrix } from './TableMatrix'

interface Learner {
  id: number
  name: string
  email: string
  team: string
  status: 'done' | 'progress' | 'overdue'
  due: Date
  archived?: boolean
}

const NAMES = ['Ana Costa', 'Ben Hall', 'Chloe Kim', 'Dev Patel', 'Eva Silva', 'Finn Ross', 'Gia Lopez', 'Hugo Chen', 'Ines Mota', 'Jack Moore', 'Kai Duarte', 'Lia Santos', 'Max Weber', 'Nia Okafor']
const TEAMS = ['People', 'Sales', 'Engineering', 'Finance']
const LEARNERS: Learner[] = NAMES.map((name, i) => ({
  id: i,
  name,
  email: `${name.split(' ')[0].toLowerCase()}@example.com`,
  team: TEAMS[i % TEAMS.length],
  status: (['done', 'progress', 'overdue'] as const)[i % 3],
  due: new Date(2025, i % 12, 1 + i),
  archived: i === 4,
}))
const STATUS = {
  done: { type: 'success', label: 'Completed' },
  progress: { type: 'progress', label: 'In progress' },
  overdue: { type: 'error', label: 'Overdue' },
} as const

export function TablePreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [selectable, setSelectable] = useState(true)
  const [picked, setPicked] = useState<Set<number>>(new Set([1]))
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)
  const perPage = 5

  const sorted = useMemo(() => [...LEARNERS].sort((a, b) => (order === 'asc' ? 1 : -1) * a.name.localeCompare(b.name)), [order])
  const rows = sorted.slice(page * perPage, page * perPage + perPage)
  const pickable = rows.filter((r) => !r.archived)
  const all = pickable.length > 0 && pickable.every((r) => picked.has(r.id))
  const some = pickable.some((r) => picked.has(r.id))
  const toggle = (id: number) => setPicked((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n })
  const toggleAll = () => setPicked((p) => { const n = new Set(p); pickable.forEach((r) => (all ? n.delete(r.id) : n.add(r.id))); return n })

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 3, alignItems: 'flex-end', width: '100%' }} data-testid="table-preview">
          <Table aria-label="Learners">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '34%' }} sortDirection={order}>
                  <CellContent
                    start={selectable ? <Checkbox checked={all} indeterminate={some && !all} onChange={toggleAll} inputProps={{ 'aria-label': 'Select all learners on this page' }} /> : undefined}
                    primary={
                      <TableSortLabel active direction={order} onClick={() => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}>
                        Name
                      </TableSortLabel>
                    }
                  />
                </TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due</TableCell>
                <TableCell sx={{ width: 52 }} aria-label="Actions" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} hover={!r.archived} selected={picked.has(r.id)} aria-disabled={r.archived || undefined}>
                  <TableCell>
                    <CellContent
                      start={
                        <>
                          {selectable && (
                            <Checkbox checked={picked.has(r.id)} disabled={r.archived} onChange={() => toggle(r.id)} inputProps={{ 'aria-label': `Select ${r.name}` }} />
                          )}
                          <Avatar size={40} src={r.id % 2 ? undefined : PHOTO} alt="" />
                        </>
                      }
                      primary={r.name}
                      secondary={r.archived ? 'Archived' : r.email}
                    />
                  </TableCell>
                  <TableCell>{r.team}</TableCell>
                  <TableCell>
                    <Badge type={STATUS[r.status].type} label={STATUS[r.status].label} />
                  </TableCell>
                  <TableCell>
                    <CellDate date={r.due} />
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label={`Actions for ${r.name}`} disabled={r.archived}>
                      <More size={20} color="currentColor" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination count={LEARNERS.length} page={page} rowsPerPage={perPage} onPageChange={(_, p) => setPage(p)} />
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={selectable} onChange={(e) => setSelectable(e.target.checked)} />} label="Selectable rows" />
        </>
      }
      hint="Hover a row, tick rows or select all on the page, sort by name and page through. The archived row is read-only."
      matrix={<TableMatrix mode={mode} />}
    />
  )
}
