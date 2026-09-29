import { Box, Typography } from '@mui/material'
import { Stepper, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma stepper (Warm-up, Lessons, Assessments, Certification with Assessments in
// progress), then the start and the end, which show every Step and Step/line state.
export const STEPS = ['Warm-up', 'Lessons', 'Assessments', 'Certification']
const ROWS = [
  { name: 'As in Figma', active: 2 },
  { name: 'First step', active: 0 },
  { name: 'All completed', active: 4 },
]

export function StepperMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`stepper-matrix-${mode}`} sx={{ display: 'grid', gridTemplateColumns: '110px 820px', columnGap: 8, rowGap: 6, alignItems: 'center' }}>
        {ROWS.flatMap((r) => [
          <Typography key={`${r.name}-l`} variant="caption" color="text.secondary">
            {r.name}
          </Typography>,
          <Stepper key={r.name} steps={STEPS} activeStep={r.active} />,
        ])}
      </Box>
    </Canvas>
  )
}
