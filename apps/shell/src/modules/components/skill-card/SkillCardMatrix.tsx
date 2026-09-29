import { Box } from '@mui/material'
import { SkillCard, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

export const SKILL_ICON = <img src="/samples/skill-hard-skills.svg" alt="" />
export const LABEL = 'Pricing Strategy Automation'

// The Figma Card/skill set: Enabled, Hover, Remove, Remove hover, Disabled.
export function SkillCardMatrix({ mode }: { mode: Mode }) {
  const noop = () => undefined
  return (
    <Canvas mode={mode}>
      <Box data-testid={`skill-card-matrix-${mode}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <SkillCard label={LABEL} icon={SKILL_ICON} />
        <SkillCard label={LABEL} icon={SKILL_ICON} className="ds-hover" />
        <SkillCard label={LABEL} icon={SKILL_ICON} onRemove={noop} />
        <SkillCard label={LABEL} icon={SKILL_ICON} onRemove={noop} className="ds-hover" />
        <SkillCard label={LABEL} icon={SKILL_ICON} disabled />
      </Box>
    </Canvas>
  )
}
