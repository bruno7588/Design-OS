import { useState } from 'react'
import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material'
import { SkillCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { SKILL_ICON, SkillCardMatrix } from './SkillCardMatrix'

const START = ['Pricing Strategy Automation', 'Negotiation', 'Stakeholder Management']

export function SkillCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [skills, setSkills] = useState(START)
  const [removable, setRemovable] = useState(true)
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }} data-testid="skill-card-preview">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {skills.map((s) => (
              <SkillCard key={s} label={s} icon={SKILL_ICON} disabled={disabled} onRemove={removable ? () => setSkills((all) => all.filter((x) => x !== s)) : undefined} />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" role="status">
            {skills.length} skills.
          </Typography>
          {skills.length < START.length && (
            <Button size="small" onClick={() => setSkills(START)}>
              Reset Skills
            </Button>
          )}
        </Box>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={removable} onChange={(e) => setRemovable(e.target.checked)} />} label="Remove" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Skill illustrations are the Icons/Skill Icon set (Hugo Library); the docs use Pricing Strategy."
      matrix={<SkillCardMatrix mode={mode} />}
    />
  )
}
