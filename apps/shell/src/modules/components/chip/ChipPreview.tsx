import { useState } from 'react'
import { MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Chip, type Mode } from '@design-os/components'
import { CloseCircle, User } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { CHIP_STATES, ChipMatrix, ICONS, type ChipIcon, type ChipState } from './ChipMatrix'

const FILTERS = ['All', 'Compliance', 'Leadership', 'Onboarding']

export function ChipPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [state, setState] = useState<ChipState>('Enabled')
  const [icon, setIcon] = useState<ChipIcon>('None')
  const [label, setLabel] = useState('Compliance')
  const [selected, setSelected] = useState<string[]>(['All'])

  const toggle = (f: string) => setSelected((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 8, alignItems: 'center' }}>
          <Chip
            label={label}
            onClick={() => {}}
            icon={icon === 'Left' ? <User color="currentColor" /> : undefined}
            iconRight={icon === 'Right' ? <CloseCircle color="currentColor" /> : undefined}
            onDelete={icon === 'Right' ? () => {} : undefined}
            selected={state === 'Selected'}
            disabled={state === 'Disabled'}
            className={state === 'Hover' ? 'ds-hover' : state === 'Focus' ? 'ds-focus' : undefined}
          />
          <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap', justifyContent: 'center' }} aria-label="Filter by topic" role="group">
            {FILTERS.map((f) => (
              <Chip key={f} label={f} selected={selected.includes(f)} onClick={() => toggle(f)} />
            ))}
          </Stack>
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="State" value={state} onChange={(e) => setState(e.target.value as ChipState)}>
            {CHIP_STATES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <Control label="Icon">
            <ToggleButtonGroup exclusive size="small" value={icon} onChange={(_, v) => v && setIcon(v)} fullWidth>
              {ICONS.map((i) => (
                <ToggleButton key={i} value={i} disableRipple>
                  {i}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Control>
          <TextField size="small" label="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        </>
      }
      hint="The row under the chip is a live filter: click the chips to select them, or tab to them and press Space."
      matrix={<ChipMatrix mode={mode} />}
    />
  )
}
