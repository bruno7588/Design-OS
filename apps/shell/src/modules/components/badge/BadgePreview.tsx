import { useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import { Badge, type BadgeType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { BadgeMatrix, TYPES } from './BadgeMatrix'

const SKILLS = ['Compliance', 'Leadership', 'Data protection']

export function BadgePreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<BadgeType>('success')
  const [icon, setIcon] = useState(true)
  const [removable, setRemovable] = useState(false)
  const [label, setLabel] = useState('Completed')
  const [skills, setSkills] = useState(SKILLS)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ gap: 8, alignItems: 'center' }}>
          <Badge type={type} label={label} icon={icon} onDismiss={removable ? () => {} : undefined} />
          <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap', justifyContent: 'center' }} data-testid="skills-row">
            {skills.map((s) => (
              <Badge key={s} type="informative" label={s} onDismiss={() => setSkills((all) => all.filter((x) => x !== s))} />
            ))}
          </Stack>
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(e.target.value as BadgeType)}>
            {TYPES.map((t) => (
              <MenuItem key={t.type} value={t.type}>
                {t.figma}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={icon} onChange={(e) => setIcon(e.target.checked)} />} label="Icon left" />
          <FormControlLabel control={<Switch checked={removable} onChange={(e) => setRemovable(e.target.checked)} />} label="Icon right (remove)" />
          <TextField size="small" label="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        </>
      }
      hint="The skills row is live: click a remove icon, or tab to a badge and press Delete."
      matrix={<BadgeMatrix mode={mode} />}
    />
  )
}
