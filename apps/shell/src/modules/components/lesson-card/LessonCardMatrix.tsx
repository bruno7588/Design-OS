import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { LessonCard, type LessonCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

export const THUMB = '/samples/thumbnail.png'
export const GRID: Partial<LessonCardProps> = { view: 'grid', title: 'The importance of Authentic Stories and How to Tell', instructor: 'Instructor name', image: THUMB, duration: '3m 45s', progress: 50 }
export const LIST: Partial<LessonCardProps> = { view: 'list', title: '50 free Tools and resources that everyone should know', meta: 'Lesson · Instructor name · 4min', image: THUMB, progress: 50 }

const Group = ({ label, width, children }: { label: string; width: number; children: ReactNode }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Typography variant="h6" color="text.secondary">
      {label}
    </Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, ${width}px)`, gap: 6, alignItems: 'start' }}>{children}</Box>
  </Box>
)

// The Figma Card/Lessons set, grouped by view and device, in the Figma order.
export function LessonCardMatrix({ mode }: { mode: Mode }) {
  const card = (p: Partial<LessonCardProps>, key: string) => <LessonCard key={key} {...(p as LessonCardProps)} />
  return (
    <Canvas mode={mode}>
      <Box data-testid={`lesson-card-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 1900 }}>
        <Group label="Grid" width={170}>
          {card(GRID, 'g1')}
          {card({ ...GRID, className: 'ds-hover' }, 'g2')}
          {card({ ...GRID, completed: true }, 'g3')}
          {card({ ...GRID, completed: true, className: 'ds-hover' }, 'g4')}
          {card({ ...GRID, disabled: true }, 'g5')}
          {card({ ...GRID, disabled: true, className: 'ds-hover' }, 'g6')}
        </Group>
        <Group label="List, mobile" width={343}>
          {card({ ...LIST, device: 'mobile' }, 'm1')}
          {card({ ...LIST, device: 'mobile', completed: true }, 'm2')}
          {card({ ...LIST, device: 'mobile', quiz: 'pending', progress: 87 }, 'm3')}
          {card({ ...LIST, device: 'mobile', quiz: 'pending', completed: true }, 'm4')}
          {card({ ...LIST, device: 'mobile', quiz: 'passed', completed: true }, 'm5')}
          {card({ ...LIST, device: 'mobile', disabled: true }, 'm6')}
        </Group>
        <Group label="List, Admin" width={900}>
          {card({ ...LIST, device: 'admin' }, 'a1')}
          {card({ ...LIST, device: 'admin', className: 'ds-hover' }, 'a2')}
        </Group>
        <Group label="List, web app" width={900}>
          {card({ ...LIST, device: 'web', progress: 37 }, 'w1')}
          {card({ ...LIST, device: 'web', progress: 37, className: 'ds-hover' }, 'w2')}
          {card({ ...LIST, device: 'web', quiz: 'pending' }, 'w3')}
          {card({ ...LIST, device: 'web', quiz: 'pending', className: 'ds-hover' }, 'w4')}
          {card({ ...LIST, device: 'web', quiz: 'pending', completed: true }, 'w5')}
          {card({ ...LIST, device: 'web', quiz: 'pending', completed: true, className: 'ds-hover' }, 'w6')}
          {card({ ...LIST, device: 'web', quiz: 'passed', completed: true }, 'w7')}
          {card({ ...LIST, device: 'web', quiz: 'passed', completed: true, className: 'ds-hover' }, 'w8')}
          {card({ ...LIST, device: 'web', disabled: true }, 'w9')}
          {card({ ...LIST, device: 'web', disabled: true, className: 'ds-hover' }, 'w10')}
        </Group>
      </Box>
    </Canvas>
  )
}
