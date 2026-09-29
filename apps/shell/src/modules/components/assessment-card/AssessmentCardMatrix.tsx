import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { AssessmentCard, type AssessmentCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

export const SAMPLE: AssessmentCardProps = { title: '50 free Tools and resources that everyone should know', typeLabel: 'Type of assessment' }

const Group = ({ label, width, children }: { label: string; width: number; children: ReactNode }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Typography variant="h6" color="text.secondary">
      {label}
    </Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, ${width}px)`, gap: 6, alignItems: 'start' }}>{children}</Box>
  </Box>
)

// The Figma Card/Assessments set: Mobile app, Admin and Web App, in the Figma order.
export function AssessmentCardMatrix({ mode }: { mode: Mode }) {
  const card = (p: Partial<AssessmentCardProps>, key: string) => <AssessmentCard key={key} {...SAMPLE} {...p} />
  return (
    <Canvas mode={mode}>
      <Box data-testid={`assessment-card-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 1900 }}>
        <Group label="Mobile app" width={344}>
          {card({ device: 'mobile', type: 'lesson-quiz' }, 'm1')}
          {card({ device: 'mobile', type: 'lesson-quiz', className: 'ds-hover' }, 'm1h')}
          {card({ device: 'mobile', type: 'lesson-quiz', disabled: true }, 'm2')}
          {card({ device: 'mobile', type: 'lesson-quiz', disabled: true, className: 'ds-hover' }, 'm2h')}
          {card({ device: 'mobile', type: 'lesson-quiz', completed: true }, 'm3')}
          {card({ device: 'mobile', type: 'lesson-quiz', completed: true, className: 'ds-hover' }, 'm3h')}
        </Group>
        <Group label="Admin" width={900}>
          {card({ device: 'admin', onEdit: () => undefined }, 'a1')}
          {card({ device: 'admin', onEdit: () => undefined, className: 'ds-hover' }, 'a2')}
        </Group>
        <Group label="Web app" width={900}>
          {card({ device: 'web' }, 'w1')}
          {card({ device: 'web', className: 'ds-hover' }, 'w2')}
          {card({ device: 'web', disabled: true }, 'w3')}
          {card({ device: 'web', disabled: true, className: 'ds-hover' }, 'w4')}
          {card({ device: 'web', completed: true }, 'w5')}
          {card({ device: 'web', completed: true, className: 'ds-hover' }, 'w6')}
        </Group>
      </Box>
    </Canvas>
  )
}
