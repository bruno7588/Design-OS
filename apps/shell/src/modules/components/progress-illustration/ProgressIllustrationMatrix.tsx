import { Box } from '@mui/material'
import { ProgressIllustration, PROGRESS_ILLUSTRATIONS, type ProgressIllustrationType, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Progress illustration" set in one row, as the Library board draws it.
export function ProgressIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ p: 14, overflowX: 'auto' }}>
      <Box data-testid={`progress-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 14, width: 'max-content' }}>
        {(Object.keys(PROGRESS_ILLUSTRATIONS) as ProgressIllustrationType[]).map((t) => <ProgressIllustration key={t} type={t} />)}
      </Box>
    </Canvas>
  )
}
