import { useState } from 'react'
import { FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { Breadcrumb, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { BreadcrumbMatrix } from './BreadcrumbMatrix'

const TRAIL = ['Programs', 'Leadership essentials', 'Giving feedback']

export function BreadcrumbPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [depth, setDepth] = useState(TRAIL.length)
  const [disabled, setDisabled] = useState(false)

  const shown = TRAIL.slice(0, depth)
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 3 }} data-testid="breadcrumb-preview">
          <Breadcrumb items={shown.map((label, i) => ({ label, onClick: () => setDepth(i + 1), disabled: disabled && i === 0 }))} />
          <Typography variant="h3">{shown[shown.length - 1]}</Typography>
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="First link disabled" />
          <FormControlLabel control={<Switch checked={depth === TRAIL.length} onChange={() => setDepth(TRAIL.length)} />} label="Full trail" />
        </>
      }
      hint="Click a link to go back up the trail. The last item is the current page: not a link, no chevron."
      matrix={<BreadcrumbMatrix mode={mode} />}
    />
  )
}
