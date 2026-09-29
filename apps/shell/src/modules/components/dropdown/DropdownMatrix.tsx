import { Box, ListItemIcon, MenuItem, MenuList, Stack, Typography } from '@mui/material'
import { Dropdown, menuPaperStyles, type DropdownProps, type Mode } from '@design-os/components'
import { Sort } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'

// The Figma Dropdown set: each state (rows) with no label, a label on top with
// helper text, a label at the start, and an icon (columns). Then the Listbox and
// its rows, drawn in place.
export const OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'A to Z' },
]

export const STATES = ['Enabled', 'Hover', 'Active', 'Error', 'Disabled'] as const
export type DropdownState = (typeof STATES)[number]

export function stateProps(state: DropdownState): Partial<DropdownProps> {
  switch (state) {
    case 'Hover':
      return { InputProps: { className: 'ds-hover' } }
    case 'Active':
      return { InputProps: { className: 'ds-focus' } }
    case 'Error':
      return { error: true }
    case 'Disabled':
      return { disabled: true }
    default:
      return {}
  }
}

const LAYOUTS: { name: string; props: Partial<DropdownProps> }[] = [
  { name: 'Field', props: {} },
  { name: 'Label top and helper', props: { label: 'Label', helperText: 'Helper text' } },
  { name: 'Label start', props: { label: 'Label', labelPlacement: 'start' } },
  { name: 'Icon left', props: { iconLeft: <Sort color="currentColor" /> } },
]

const noop = () => {}

export function DropdownMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Stack direction="row" sx={{ gap: 12, alignItems: 'flex-start' }}>
        <Box
          data-testid={`dropdown-matrix-${mode}`}
          sx={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 230px)', columnGap: 8, rowGap: 6, alignItems: 'end' }}
        >
          <Box />
          {LAYOUTS.map((l) => (
            <Typography key={l.name} variant="h6" color="text.secondary">
              {l.name}
            </Typography>
          ))}
          {STATES.flatMap((state) => [
            <Typography key={`${state}-l`} variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
              {state}
            </Typography>,
            ...LAYOUTS.map((l) => (
              <Dropdown
                key={`${state}-${l.name}`}
                options={OPTIONS}
                value="newest"
                onChange={noop}
                fullWidth
                {...l.props}
                {...stateProps(state)}
                helperText={state === 'Error' && l.props.helperText ? 'Error message' : l.props.helperText}
                SelectProps={{ tabIndex: -1 }}
              />
            )),
          ])}
        </Box>
        <Stack sx={{ gap: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Menu
          </Typography>
          <Box data-testid={`dropdown-menu-${mode}`} sx={(theme) => ({ ...menuPaperStyles(theme), width: 200 })}>
            <MenuList sx={{ p: 2 }}>
              <MenuItem>Enabled</MenuItem>
              <MenuItem className="ds-hover">Hover</MenuItem>
              <MenuItem selected>Selected</MenuItem>
              <MenuItem selected className="ds-hover">
                Selected · hover
              </MenuItem>
              <MenuItem disabled>Disabled</MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Sort color="currentColor" />
                </ListItemIcon>
                Icon left
              </MenuItem>
            </MenuList>
          </Box>
        </Stack>
      </Stack>
    </Canvas>
  )
}
