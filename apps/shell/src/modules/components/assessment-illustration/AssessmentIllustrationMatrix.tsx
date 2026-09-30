import { Box } from '@mui/material'
import { AssessmentIllustration, ASSESSMENT_TYPES, type AssessmentType, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Assessment illustration" set in one row, as the Library board draws it.
export function AssessmentIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ p: 14, overflowX: 'auto' }}>
      <Box data-testid={`assessment-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 14, width: 'max-content' }}>
        {(Object.keys(ASSESSMENT_TYPES) as AssessmentType[]).flatMap((t) => [<AssessmentIllustration key={`${t}-m`} type={t} device="mobile" />, <AssessmentIllustration key={`${t}-d`} type={t} />])}
      </Box>
    </Canvas>
  )
}
