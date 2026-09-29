import { Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material'
import { Avatar, Badge, Button, CellContent, CellDate, Checkbox, Dropdown, ProgressBar, TableThumbnail, type Mode } from '@design-os/components'
import { Danger, More } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'
import { PHOTO } from '../avatar/AvatarMatrix'

export const THUMB = '/samples/thumbnail.png'
const noop = () => {}
const COLS = 6

// The Figma Table (7896:2624): the header bar, ten text rows and the pagination. Then the
// row states (Table row), the header types (Table header) and the cell types (Table data).
export function TableMatrix({ mode }: { mode: Mode }) {
  const text = Array.from({ length: COLS }, (_, i) => i)
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Stack sx={{ gap: 10, minWidth: 1000 }}>
        <Stack sx={{ gap: 3, alignItems: 'flex-end' }} data-testid={`table-figma-${mode}`}>
          <Table>
            <TableHead>
              <TableRow>
                {text.map((i) => (
                  <TableCell key={i}>Text</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 10 }, (_, r) => (
                <TableRow key={r}>
                  {text.map((i) => (
                    <TableCell key={i}>Text</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination count={28} page={0} rowsPerPage={10} onPageChange={noop} />
        </Stack>

        <Stack sx={{ gap: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Row states
          </Typography>
          <Table data-testid={`table-rows-${mode}`}>
            <TableBody>
              {[
                { name: 'Enabled', props: {} },
                { name: 'Hover', props: { hover: true, className: 'ds-hover' } },
                { name: 'Selected', props: { selected: true } },
                { name: 'Selected, hover', props: { selected: true, hover: true, className: 'ds-hover' } },
                { name: 'Disabled', props: { 'aria-disabled': true } },
              ].map((r) => (
                <TableRow key={r.name} {...r.props}>
                  <TableCell>{r.name}</TableCell>
                  {text.slice(1).map((i) => (
                    <TableCell key={i}>Text</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>

        <Stack sx={{ gap: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Header types
          </Typography>
          <Table data-testid={`table-header-${mode}`}>
            <TableHead>
              <TableRow>
                <TableCell>Text</TableCell>
                <TableCell>
                  <CellContent start={<Checkbox checked={false} tabIndex={-1} inputProps={{ 'aria-label': 'Select all' }} />} primary="Checkbox" />
                </TableCell>
                <TableCell>
                  <TableSortLabel active={false} tabIndex={-1}>
                    Sort
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <CellContent
                    start={<Checkbox checked={false} tabIndex={-1} inputProps={{ 'aria-label': 'Select all' }} />}
                    primary={
                      <TableSortLabel active={false} tabIndex={-1}>
                        Checkbox, sort
                      </TableSortLabel>
                    }
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.disabled' }}>Disabled</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Stack>

        <Stack sx={{ gap: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Cell types
          </Typography>
          <Table data-testid={`table-cells-${mode}`}>
            <TableBody>
              <TableRow>
                <TableCell>Text</TableCell>
                <TableCell>
                  <CellContent primary="Text" secondary="Supporting text" />
                </TableCell>
                <TableCell>
                  <CellDate date={new Date(2025, 0, 1)} />
                </TableCell>
                <TableCell>
                  <CellContent primary="Text" end={<Danger size={20} color="currentColor" />} />
                </TableCell>
                <TableCell>
                  <CellContent start={<Checkbox checked={false} tabIndex={-1} inputProps={{ 'aria-label': 'Select row' }} />} primary="Text" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CellContent start={<Avatar size={32} src={PHOTO} alt="" />} primary="Text" />
                </TableCell>
                <TableCell>
                  <CellContent start={<Avatar size={40} src={PHOTO} alt="" />} primary="Text" secondary="Supporting text" />
                </TableCell>
                <TableCell>
                  <CellContent start={<TableThumbnail src={THUMB} />} primary="Text" />
                </TableCell>
                <TableCell>
                  <CellContent start={<TableThumbnail src={THUMB} />} primary="Text" secondary="Supporting text" />
                </TableCell>
                <TableCell>
                  <ProgressBar value={100} width={72} showLabel aria-label="Progress" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CellContent>
                    <Badge type="success" label="Success" icon />
                  </CellContent>
                </TableCell>
                <TableCell>
                  <CellContent>
                    <Button variant="outlined" size="small" tabIndex={-1}>
                      Button
                    </Button>
                  </CellContent>
                </TableCell>
                <TableCell>
                  <CellContent>
                    <Dropdown options={[{ value: 'a', label: 'Text' }]} value="a" onChange={noop} SelectProps={{ tabIndex: -1 }} />
                  </CellContent>
                </TableCell>
                <TableCell>
                  <CellContent start={<More size={20} color="currentColor" />} />
                </TableCell>
                <TableCell>
                  <CellContent start={<Checkbox checked tabIndex={-1} inputProps={{ 'aria-label': 'Select row' }} />} primary="Text" secondary="Supporting text" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Stack>
    </Canvas>
  )
}
