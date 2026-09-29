import { Box } from '@mui/material'
import { InstructorCard, type InstructorCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { CardGroup } from '../shared/CardGroup'

const icon = <img src="/samples/skill-learning-program.svg" alt="" />
export const INSTRUCTOR: InstructorCardProps = {
  name: 'Instructor name',
  bio: 'Best-selling author featured in the Wall Street Journal, CNN and the BBC, with 20 years in learning design.',
  image: '/samples/thumbnail.png',
  skills: [
    { label: 'Learning Program Design & Development', icon },
    { label: 'Learning Program Design & Development', icon },
  ],
}

// The Figma Card/Instructor set: Mobile, Mobile Hover, Desktop, Desktop Hover.
export function InstructorCardMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`instructor-card-matrix-${mode}`}>
        <CardGroup label="Mobile and desktop, each Enabled then Hover">
          <InstructorCard {...INSTRUCTOR} device="mobile" />
          <InstructorCard {...INSTRUCTOR} device="mobile" className="ds-hover" />
          <InstructorCard {...INSTRUCTOR} />
          <InstructorCard {...INSTRUCTOR} className="ds-hover" />
        </CardGroup>
      </Box>
    </Canvas>
  )
}
