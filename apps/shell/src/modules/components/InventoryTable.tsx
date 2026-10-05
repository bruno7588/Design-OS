import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { components } from './registry'
import { figmaNodeUrl, inventory, type InventoryRow, type Variants } from './inventory'

const FILTERS = {
  All: () => true,
  'Figma only': (r: InventoryRow) => r.inFigma && !r.inCode,
  'Code only': (r: InventoryRow) => !r.inFigma && r.inCode,
  Both: (r: InventoryRow) => r.inFigma && r.inCode,
} as const
type Filter = keyof typeof FILTERS

export function InventoryTable() {
  const [filter, setFilter] = useState<Filter>('All')
  const rows = inventory.rows.filter(FILTERS[filter])
  const { summary } = inventory

  return (
    <Stack sx={{ gap: 4 }}>
      <Typography color="text.secondary">
        {summary.inFigma} in Figma, {summary.inCode} in code, {summary.both} in both. Figma read on {inventory.figmaFetchedAt}; to
        refresh, run the component-inventory skill, then pnpm inventory.
      </Typography>
      <ToggleButtonGroup exclusive size="small" value={filter} onChange={(_, v) => v && setFilter(v)} sx={{ alignSelf: 'flex-start' }}>
        {(Object.keys(FILTERS) as Filter[]).map((f) => (
          <ToggleButton key={f} value={f} disableRipple data-testid={`inventory-filter-${f}`}>
            {f} ({inventory.rows.filter(FILTERS[f]).length})
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box
        sx={(theme) => ({
          border: `1px solid ${theme.tokens.semantic.border}`,
          borderRadius: `${theme.tokens.radius.sm}px`,
          overflowX: 'auto',
          bgcolor: 'background.paper',
        })}
      >
        <Table size="small" data-testid="inventory-table">
          <TableHead>
            <TableRow>
              {['Component', 'Figma page', 'In Figma', 'In code', 'Prototype', 'Missing in code', 'Missing in Figma'].map((h) => (
                <TableCell key={h}>
                  <Typography variant="h6" color="text.secondary">
                    {h}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={`${r.page}/${r.name}`} data-testid="inventory-row">
                <TableCell>
                  <NameLink row={r} />
                  {r.copiesDiffer && (
                    <Typography variant="caption" color="text.secondary" component="div">
                      Light and dark copies differ
                    </Typography>
                  )}
                  {r.inFigma && !['copy', 'instance'].includes(r.lightVersion) && (
                    <Typography variant="caption" color="error" component="div" data-testid="no-light-version">
                      No light version in Figma
                    </Typography>
                  )}
                  {r.namesDiffer && (
                    <Typography variant="caption" color="text.secondary" component="div">
                      Light and dark copies are named differently
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{r.page}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{r.inFigma ? `Yes (${r.nodes.length})` : 'No'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{r.inCode ? 'Yes' : 'No'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color={r.prototype ? 'text.primary' : 'text.secondary'}>
                    {r.prototype ?? 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Missing v={r.missingInCode} />
                </TableCell>
                <TableCell>
                  <Missing v={r.missingInFigma} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Stack>
  )
}

function NameLink({ row }: { row: InventoryRow }) {
  // A built page is linked by its Figma node, since code names differ (Tab, ConfirmDialog).
  const doc = components.find((c) =>
    row.nodes.some((n) => (c.figma ? [c.figma.light, c.figma.dark] : []).some((url) => url.endsWith(`node-id=${n.replace(':', '-')}`))),
  )
  if (doc) {
    return (
      <Link component={RouterLink} to={`/components/${doc.slug}`} variant="body2" sx={{ fontWeight: 600 }}>
        {row.name}
      </Link>
    )
  }
  if (row.nodes[0]) {
    return (
      <Link href={figmaNodeUrl(row.nodes[0])} target="_blank" rel="noreferrer" variant="body2">
        {row.name}
      </Link>
    )
  }
  return <Typography variant="body2">{row.name}</Typography>
}

function Missing({ v }: { v: Variants | null }) {
  if (!v) return <Typography variant="body2" color="text.secondary">n/a</Typography>
  const entries = Object.entries(v)
  if (!entries.length) return <Typography variant="body2">None</Typography>
  return (
    <Typography variant="body2">
      {entries.map(([k, values]) => `${k}: ${values.join(', ')}`).join('; ')}
    </Typography>
  )
}
