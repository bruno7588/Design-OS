import { useState } from 'react'
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Badge, Search, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { SearchMatrix } from './SearchMatrix'

const COURSES = ['Anti-bribery essentials', 'Data protection basics', 'Leading hybrid teams', 'Fire safety at work', 'Giving feedback']

export function SearchPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [size, setSize] = useState<'M' | 'L'>('L')
  const [query, setQuery] = useState('')
  const results = COURSES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 4, width: 400, maxWidth: '100%' }}>
          <Search size={size} value={query} onChange={setQuery} placeholder="Search courses" fullWidth data-testid="search-preview" />
          <Stack sx={{ gap: 2 }} aria-live="polite">
            <Typography variant="caption" color="text.secondary">
              {results.length} {results.length === 1 ? 'course' : 'courses'}
            </Typography>
            {results.map((c) => (
              <Stack key={c} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">{c}</Typography>
                <Badge type="informative" label="Course" />
              </Stack>
            ))}
          </Stack>
        </Stack>
      }
      controls={
        <Control label="Size">
          <ToggleButtonGroup exclusive size="small" value={size} onChange={(_, v) => v && setSize(v)} fullWidth>
            <ToggleButton value="M" disableRipple>
              M
            </ToggleButton>
            <ToggleButton value="L" disableRipple>
              L
            </ToggleButton>
          </ToggleButtonGroup>
        </Control>
      }
      hint="Type to filter the list. The clear button appears with text; Escape clears too."
      matrix={<SearchMatrix mode={mode} />}
    />
  )
}
