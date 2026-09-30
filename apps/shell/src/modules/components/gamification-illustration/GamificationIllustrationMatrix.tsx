import { Box } from '@mui/material'
import { GamificationIllustration, GAMIFICATION_ILLUSTRATIONS, type GamificationIllustrationType, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Gamification illustration" set in one row, as the Library board draws it.
export function GamificationIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ p: 14, overflowX: 'auto' }}>
      <Box data-testid={`gamification-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 14, width: 'max-content' }}>
        {(Object.keys(GAMIFICATION_ILLUSTRATIONS) as GamificationIllustrationType[]).map((t) => <GamificationIllustration key={t} type={t} />)}
      </Box>
    </Canvas>
  )
}
