import { useState } from 'react'
import { FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { ContentSwitcher, type Mode } from '@design-os/components'
import { Element3, RowVertical } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { ContentSwitcherMatrix } from './ContentSwitcherMatrix'

export function ContentSwitcherPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [view, setView] = useState('grid')
  const [icons, setIcons] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 3, alignItems: 'center' }} data-testid="content-switcher-preview">
          <ContentSwitcher
            aria-label="View"
            value={view}
            onChange={setView}
            items={[
              { value: 'grid', label: 'Grid', iconLeft: icons ? <Element3 color="currentColor" /> : undefined },
              { value: 'list', label: 'List', iconLeft: icons ? <RowVertical color="currentColor" /> : undefined },
              { value: 'calendar', label: 'Calendar', disabled },
            ]}
          />
          <Typography variant="body2" color="text.secondary" aria-live="polite">
            Showing the {view} view
          </Typography>
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={icons} onChange={(e) => setIcons(e.target.checked)} />} label="Icons left" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Calendar disabled" />
        </>
      }
      hint="One section is always selected. Tab reaches each section; Enter or Space selects it."
      matrix={<ContentSwitcherMatrix mode={mode} />}
    />
  )
}
