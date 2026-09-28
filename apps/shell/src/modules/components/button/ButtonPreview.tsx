import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Button, SparkleIcon, type Mode } from '@design-os/components'
import { Add } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { Canvas } from '../shared/Canvas'
import { ButtonMatrix } from './ButtonMatrix'
import { CONFIGURATIONS, SIZES, STATES, configuration, stateProps, type Configuration, type State } from './spec'

export function ButtonPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [config, setConfig] = useState<Configuration>('Filled')
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [icon, setIcon] = useState(true)
  const [state, setState] = useState<State>('Enabled')
  const [label, setLabel] = useState('Save changes')

  const c = configuration(config)
  const iconNode = icon ? c.color === 'ai' ? <SparkleIcon /> : <Add color="currentColor" /> : undefined

  return (
    <Stack sx={{ gap: 8 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ gap: 6, alignItems: 'stretch' }}>
        <Canvas mode={mode} sx={{ flex: 1, minHeight: 280, display: 'grid', placeItems: 'center' }}>
          <Button variant={c.variant} color={c.color} size={size} icon={iconNode} {...stateProps(state)}>
            {label}
          </Button>
        </Canvas>

        <Stack
          sx={(theme) => ({
            width: { lg: 320 },
            gap: 5,
            p: 6,
            border: `1px solid ${theme.tokens.semantic.border}`,
            borderRadius: `${theme.tokens.radius.sm}px`,
            bgcolor: 'background.paper',
          })}
        >
          <Typography variant="h5">Properties</Typography>
          <TextField select size="small" label="Configuration" value={config} onChange={(e) => setConfig(e.target.value as Configuration)}>
            {CONFIGURATIONS.map((o) => (
              <MenuItem key={o.figma} value={o.figma}>
                {o.figma}
              </MenuItem>
            ))}
          </TextField>
          <Control label="Size">
            <ToggleButtonGroup exclusive size="small" value={size} onChange={(_, v) => v && setSize(v)} fullWidth>
              {SIZES.map((s) => (
                <ToggleButton key={s.size} value={s.size}>
                  {s.figma}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Control>
          <TextField select size="small" label="State" value={state} onChange={(e) => setState(e.target.value as State)}>
            {STATES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={icon} onChange={(e) => setIcon(e.target.checked)} />} label="Icon" />
          <TextField size="small" label="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
          <Control label="Mode">
            <ToggleButtonGroup exclusive size="small" value={mode} onChange={(_, v) => v && setMode(v)} fullWidth>
              <ToggleButton value="light">Light</ToggleButton>
              <ToggleButton value="dark">Dark</ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <Typography variant="caption" color="text.secondary">
            Hover, press and tab to the button in the canvas to see the real states. The State control forces one.
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          All states
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Laid out like the Figma board, so the two can be compared frame by frame.
        </Typography>
        <ButtonMatrix mode={mode} />
      </Box>
    </Stack>
  )
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="subtitle2">{label}</Typography>
      {children}
    </Stack>
  )
}
