import { Box } from '@mui/material'
import { LevelIllustration, type Mode, type SkillLevel } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Illustrations/ Learning path" row: 1, 2, 3, Advanced, 4, Expert, 5, Master, each
// small, large, then both disabled. 56 apart.
export const LEVELS: SkillLevel[] = [1, 2, 3, 'advanced', 4, 'expert', 5, 'master']

export function LevelIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`level-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 14, width: 'max-content' }}>
        {LEVELS.flatMap((l) =>
          [false, true].flatMap((disabled) =>
            (['small', 'large'] as const).map((size) => <LevelIllustration key={`${l}-${size}-${disabled}`} level={l} size={size} disabled={disabled} />),
          ),
        )}
      </Box>
    </Canvas>
  )
}
