import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material'
import { TopNav, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { TopNavigationMatrix } from './TopNavigationMatrix'

export function TopNavigationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [system, setSystem] = useState<'web' | 'admin'>('admin')
  const [small, setSmall] = useState(false)
  const [last, setLast] = useState('')
  const say = (s: string) => () => setLast(s)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: small ? 375 : 900, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="top-navigation-preview">
          <TopNav
            system={system}
            small={small}
            darkMode={mode === 'dark'}
            eventsUnread
            onToggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            onExitAdmin={say('Exit Admin')}
            onLogout={say('Log out')}
            onMenu={say('Menu')}
            onGetApp={say('Get App')}
            onCreate={say('Create')}
            onStreak={say('Streak')}
            onEvents={say('Events')}
          />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `Clicked “${last}”.` : 'Click an action.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="System" value={system} onChange={(e) => setSystem(e.target.value as 'web' | 'admin')}>
            <MenuItem value="web">Web app</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={small} onChange={(e) => setSmall(e.target.checked)} />} label="Small (Admin)" />
        </>
      }
      hint="The theme button switches this preview between light and dark."
      matrix={<TopNavigationMatrix mode={mode} />}
    />
  )
}
