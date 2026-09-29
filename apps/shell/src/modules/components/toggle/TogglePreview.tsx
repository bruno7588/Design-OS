import { useState } from 'react'
import { Box, FormControlLabel, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Toggle, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { ToggleMatrix } from './ToggleMatrix'

export function TogglePreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [on, setOn] = useState(true)
  const [layout, setLayout] = useState<'label' | 'settings'>('settings')
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box data-testid="toggle-preview" sx={{ width: 360, maxWidth: '100%' }}>
          {layout === 'label' ? (
            <FormControlLabel control={<Toggle checked={on} onChange={(e) => setOn(e.target.checked)} />} label="Email notifications" disabled={disabled} />
          ) : (
            <Stack direction="row" sx={{ gap: 6, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography id="email-title" variant="body2" sx={{ fontWeight: 600 }} color={disabled ? 'text.disabled' : 'text.primary'}>
                  Email notifications
                </Typography>
                <Typography id="email-help" variant="body2" color={disabled ? 'text.disabled' : 'text.secondary'}>
                  Get an email when a learner finishes a course.
                </Typography>
              </Box>
              <Toggle
                checked={on}
                onChange={(e) => setOn(e.target.checked)}
                disabled={disabled}
                inputProps={{ 'aria-labelledby': 'email-title', 'aria-describedby': 'email-help' }}
              />
            </Stack>
          )}
        </Box>
      }
      controls={
        <>
          <Control label="Layout">
            <ToggleButtonGroup exclusive size="small" value={layout} onChange={(_, v) => v && setLayout(v)} fullWidth>
              <ToggleButton value="settings" disableRipple>
                Settings row
              </ToggleButton>
              <ToggleButton value="label" disableRipple>
                Label
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="A toggle applies at once, with no Save. Space switches it; it's announced as a switch, on or off."
      matrix={<ToggleMatrix mode={mode} />}
    />
  )
}
