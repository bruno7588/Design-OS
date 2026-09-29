import { useState } from 'react'
import { FormControlLabel, Stack, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Alert, type AlertType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { AlertMatrix } from './AlertMatrix'

export function AlertPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<AlertType>('callout')
  const [lead, setLead] = useState<'illustration' | 'icon' | 'none'>('illustration')
  const [button, setButton] = useState(true)
  const [supporting, setSupporting] = useState(false)
  const [long, setLong] = useState(false)
  const [clicks, setClicks] = useState(0)

  const callout = type === 'callout'
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 560, maxWidth: '100%', gap: 3 }} data-testid="alert-preview">
          <Alert
            type={type}
            icon={lead === 'icon'}
            illustration={lead === 'illustration'}
            title={callout && supporting ? 'Collections are shared with your teams' : undefined}
            action={button ? { label: callout ? 'Learn More' : 'Renew', onClick: () => setClicks((c) => c + 1) } : undefined}
          >
            {callout ? (
              supporting ? (
                long ? (
                  <ul>
                    <li>Collections group courses, lessons and resources.</li>
                    <li>Learners see them on their home page.</li>
                    <li>They appear in the order you set.</li>
                    <li>You can share a collection with teams or the whole company.</li>
                  </ul>
                ) : (
                  'Learners see them on their home page, in the order you set.'
                )
              ) : (
                'You can add your content and 5Mins content to a collection.'
              )
            ) : (
              'Your licence ends in 7 days'
            )}
          </Alert>
          {clicks > 0 && <span aria-live="polite">Button clicked {clicks} times</span>}
        </Stack>
      }
      controls={
        <>
          <Control label="Type">
            <ToggleButtonGroup exclusive size="small" value={type} onChange={(_, v) => v && setType(v)} fullWidth>
              <ToggleButton value="callout" disableRipple>
                Callout
              </ToggleButton>
              <ToggleButton value="alert" disableRipple>
                Alert
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <Control label="Leading">
            <ToggleButtonGroup exclusive size="small" value={lead} onChange={(_, v) => v && setLead(v)} fullWidth>
              <ToggleButton value="illustration" disableRipple>
                Illustration
              </ToggleButton>
              <ToggleButton value="icon" disableRipple>
                Icon
              </ToggleButton>
              <ToggleButton value="none" disableRipple>
                None
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <FormControlLabel control={<Switch checked={button} onChange={(e) => setButton(e.target.checked)} />} label="Button" />
          <FormControlLabel
            control={<Switch checked={supporting && callout} disabled={!callout} onChange={(e) => setSupporting(e.target.checked)} />}
            label="Supporting text"
          />
          <FormControlLabel
            control={<Switch checked={long && supporting && callout} disabled={!callout || !supporting} onChange={(e) => setLong(e.target.checked)} />}
            label="More than 3 lines"
          />
        </>
      }
      hint="Callouts guide; Alerts warn. Supporting text is for Callouts only: with it, the button moves under the text. Past 3 lines, the chevron collapses and expands it."
      matrix={<AlertMatrix mode={mode} />}
    />
  )
}
