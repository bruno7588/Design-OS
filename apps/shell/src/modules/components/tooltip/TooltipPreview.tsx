import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField, Tooltip } from '@mui/material'
import { Button, InfoTooltip, type Mode } from '@design-os/components'
import { Copy } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { TooltipMatrix, VARIANTS } from './TooltipMatrix'

type Placement = (typeof VARIANTS)[number]['placement']

export function TooltipPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [placement, setPlacement] = useState<Placement>('top')
  const [icon, setIcon] = useState(true)
  const [text, setText] = useState('Learners see this skill on their profile.')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 12, alignItems: 'center' }}>
          {icon ? (
            <InfoTooltip title={text} placement={placement} />
          ) : (
            <Tooltip title={text} placement={placement}>
              <Button variant="outlined2" size="small" icon={<Copy color="currentColor" />}>
                Duplicate
              </Button>
            </Tooltip>
          )}
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Position" value={placement} onChange={(e) => setPlacement(e.target.value as Placement)}>
            {VARIANTS.map((v) => (
              <MenuItem key={v.placement} value={v.placement}>
                {v.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={icon} onChange={(e) => setIcon(e.target.checked)} />} label="Icon" />
          <TextField size="small" label="Text" value={text} onChange={(e) => setText(e.target.value)} multiline />
        </>
      }
      hint="Hover or tab to the trigger to open the tooltip; Escape closes it. Near the edge of the window it flips to stay visible."
      matrix={<TooltipMatrix mode={mode} />}
    />
  )
}
