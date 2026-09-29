import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { EmptyState, ILLUSTRATIONS, type IllustrationName, type Mode } from '@design-os/components'
import { Add } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { EmptyStateMatrix } from './EmptyStateMatrix'

export function EmptyStatePreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [illustration, setIllustration] = useState<IllustrationName>('resources')
  const [secondary, setSecondary] = useState(true)
  const [primary, setPrimary] = useState(true)
  const [clicked, setClicked] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: device === 'mobile' ? 375 : 'auto', maxWidth: '100%', alignItems: 'center' }} data-testid="empty-state-preview">
          <EmptyState
            device={device}
            illustration={illustration}
            title="Add resources to your course"
            description="Upload PDF, Word, Excel, PowerPoint or image files, or add links, so learners have everything in one place."
            secondaryAction={secondary ? { label: 'Add link', onClick: () => setClicked('Add link') } : undefined}
            primaryAction={primary ? { label: 'Upload files', icon: <Add color="currentColor" />, onClick: () => setClicked('Upload files') } : undefined}
          />
          {clicked && <span aria-live="polite">Clicked “{clicked}”</span>}
        </Stack>
      }
      controls={
        <>
          <Control label="Device">
            <ToggleButtonGroup exclusive size="small" value={device} onChange={(_, v) => v && setDevice(v)} fullWidth>
              <ToggleButton value="desktop" disableRipple>
                Desktop
              </ToggleButton>
              <ToggleButton value="mobile" disableRipple>
                Mobile
              </ToggleButton>
            </ToggleButtonGroup>
          </Control>
          <TextField select size="small" label="Illustration" value={illustration} onChange={(e) => setIllustration(e.target.value as IllustrationName)}>
            {Object.keys(ILLUSTRATIONS).map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={secondary} onChange={(e) => setSecondary(e.target.checked)} />} label="Outlined button" />
          <FormControlLabel control={<Switch checked={primary} onChange={(e) => setPrimary(e.target.checked)} />} label="Filled button" />
        </>
      }
      hint="Pair every empty state with the action that fills it. The Outlined button comes first, the Filled one last."
      matrix={<EmptyStateMatrix mode={mode} />}
    />
  )
}
