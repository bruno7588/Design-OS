import { Box } from '@mui/material'
import { CourseCard, type CourseCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { CardGroup } from '../shared/CardGroup'

export const COURSE: CourseCardProps = {
  title: 'Inside the Product-led Playbook of Winning Brands',
  image: '/samples/thumbnail.png',
  lessons: '17 lessons',
  duration: '20 min',
  progress: 37,
}

// The Figma Card/Courses set: Mobile, then Desktop, then Desktop Hover.
export function CourseCardMatrix({ mode }: { mode: Mode }) {
  const combos: Partial<CourseCardProps>[] = [{}, { dueDate: 'Due on Aug 20' }, { isNew: true, dueDate: 'Due on Aug 20' }, { isNew: true }]
  return (
    <Canvas mode={mode}>
      <Box data-testid={`course-card-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <CardGroup label="Mobile">
          {combos.map((c, i) => <CourseCard key={i} {...COURSE} {...c} device="mobile" />)}
        </CardGroup>
        <CardGroup label="Desktop">
          {[{}, { dueDate: 'Due on Aug 20' }, { isNew: true }, { isNew: true, dueDate: 'Due on Aug 20' }].map((c, i) => <CourseCard key={i} {...COURSE} {...c} />)}
        </CardGroup>
        <CardGroup label="Desktop, hover">
          {[{}, { dueDate: 'Due on Aug 20' }, { isNew: true }, { isNew: true, dueDate: 'Due on Aug 20' }].map((c, i) => <CourseCard key={i} {...COURSE} {...c} className="ds-hover" />)}
        </CardGroup>
      </Box>
    </Canvas>
  )
}
