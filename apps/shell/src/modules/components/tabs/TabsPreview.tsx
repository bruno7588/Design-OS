import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, Tabs, TextField, Typography } from '@mui/material'
import { Tab, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { SingleTab, TAB_STATES, TabsMatrix, type TabState } from './TabsMatrix'

const SECTIONS = [
  { label: 'Overview', count: undefined },
  { label: 'Learners', count: 24 },
  { label: 'Lessons', count: 8 },
  { label: 'Settings', count: undefined },
]

export function TabsPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [state, setState] = useState<TabState>('Selected')
  const [counter, setCounter] = useState(false)
  const [value, setValue] = useState(0)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 10, alignItems: 'center' }}>
          <SingleTab state={state} count={counter ? 3 : undefined} />
          <Stack sx={{ gap: 4, width: 420, maxWidth: '100%' }}>
            <Tabs
              value={value}
              onChange={(_, v) => setValue(v)}
              aria-label="Course sections"
              sx={(theme) => ({ borderBottom: `1px solid ${theme.tokens.semantic.border}` })}
            >
              {SECTIONS.map((s, i) => (
                <Tab key={s.label} value={i} label={s.label} count={s.count} id={`tab-${i}`} aria-controls={`panel-${i}`} />
              ))}
            </Tabs>
            <Typography role="tabpanel" id={`panel-${value}`} aria-labelledby={`tab-${value}`} variant="body2" color="text.secondary">
              {SECTIONS[value].label} panel
            </Typography>
          </Stack>
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="State" value={state} onChange={(e) => setState(e.target.value as TabState)}>
            {TAB_STATES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={counter} onChange={(e) => setCounter(e.target.checked)} />} label="Counter" />
        </>
      }
      hint="The bar under the single tab is live: click a tab, or focus it and use the arrow keys."
      matrix={<TabsMatrix mode={mode} />}
    />
  )
}
