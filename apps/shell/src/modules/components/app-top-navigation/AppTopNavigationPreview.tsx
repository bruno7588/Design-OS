import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material'
import type { AppTopNavPage, Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { AppTopNavigationMatrix } from './AppTopNavigationMatrix'
import { PAGES, SAMPLE, Sample } from './samples'

export function AppTopNavigationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [page, setPage] = useState<AppTopNavPage>('home')
  const [statusBar, setStatusBar] = useState(true)
  const [overMedia, setOverMedia] = useState(false)
  const [chip, setChip] = useState(0)
  const [search, setSearch] = useState('')
  const [last, setLast] = useState('')
  const say = (s: string) => () => setLast(s)
  const chips = SAMPLE[page].chips?.map((c, i) => ({ label: c.label, selected: i === chip, onClick: () => setChip(i) }))

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: 375, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="app-top-navigation-preview">
          <Sample
            page={page}
            statusBar={statusBar}
            backOverMedia={page === 'lesson-feed' || overMedia}
            chips={chips}
            searchValue={search}
            onSearchChange={setSearch}
            onStreak={say('Streak')}
            onNotifications={say('Notifications')}
            onBack={say('Back')}
            onMore={say('More options')}
            onProfileSettings={say('Profile settings')}
            onAdd={say('Add')}
          />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `Clicked “${last}”.` : 'Click an action.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField
            select
            size="small"
            label="Page"
            value={page}
            onChange={(e) => {
              setPage(e.target.value as AppTopNavPage)
              setChip(0)
            }}
          >
            {PAGES.map((p) => (
              <MenuItem key={p.page} value={p.page}>
                {p.figma}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={statusBar} onChange={(e) => setStatusBar(e.target.checked)} />} label="Status bar" />
          {(page === 'detail' || page === 'skill') && (
            <FormControlLabel control={<Switch checked={overMedia} onChange={(e) => setOverMedia(e.target.checked)} />} label="Back over media" />
          )}
        </>
      }
      hint="The status bar is a stand-in for prototypes; on a phone the system draws it."
      matrix={<AppTopNavigationMatrix mode={mode} />}
    />
  )
}
