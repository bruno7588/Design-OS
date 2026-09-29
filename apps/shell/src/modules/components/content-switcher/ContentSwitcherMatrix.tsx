import { Stack, Typography } from '@mui/material'
import { ContentSwitcher, type ContentSwitcherItem, type Mode } from '@design-os/components'
import { InfoCircle, Trash } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma Content switcher item set: selected, unselected, hover and disabled (rows),
// with no icon, an icon right and an icon left (columns), each shown on its own. Then the switcher.
const noop = () => {}
const ICONS: { name: string; item: Partial<ContentSwitcherItem> }[] = [
  { name: 'No icon', item: {} },
  { name: 'Icon right', item: { iconRight: <InfoCircle color="currentColor" className="ds-icon-right" /> } },
  { name: 'Icon left', item: { iconLeft: <Trash color="currentColor" /> } },
]
const ROWS: { name: string; selected: boolean; item: Partial<ContentSwitcherItem> }[] = [
  { name: 'Selected', selected: true, item: {} },
  { name: 'Enabled', selected: false, item: {} },
  { name: 'Hover', selected: false, item: { className: 'ds-hover' } },
  { name: 'Disabled', selected: false, item: { disabled: true } },
]

export function ContentSwitcherMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack sx={{ gap: 8 }}>
        <StateGrid
          testId={`content-switcher-matrix-${mode}`}
          columns={ICONS.map((i) => i.name)}
          rows={ROWS.map((r) => ({
            name: r.name,
            cells: ICONS.map((i) => (
              <ContentSwitcher
                key={i.name}
                aria-label={`${r.name}, ${i.name}`}
                value={r.selected ? 'a' : ''}
                onChange={noop}
                items={[{ value: 'a', label: 'Section', ...i.item, ...r.item }]}
                sx={{ bgcolor: 'transparent', p: 0 }}
              />
            )),
          }))}
        />
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Content switcher
          </Typography>
          <ContentSwitcher
            data-testid={`content-switcher-${mode}`}
            sx={{ alignSelf: 'flex-start' }}
            aria-label="Sections"
            value="1"
            onChange={noop}
            items={['1', '2', '3', '4'].map((v) => ({ value: v, label: 'Section' }))}
          />
        </Stack>
      </Stack>
    </Canvas>
  )
}
