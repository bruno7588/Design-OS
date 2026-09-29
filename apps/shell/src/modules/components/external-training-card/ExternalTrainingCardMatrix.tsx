import { Box } from '@mui/material'
import { ExternalTrainingCard, type ExternalTrainingCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { CardGroup } from '../shared/CardGroup'

export const TRAINING: ExternalTrainingCardProps = {
  title: 'Technical Product Manager Certification',
  provider: 'Self paced online course',
  price: '£399',
  image: '/samples/thumbnail.png',
}

// The Figma Card/External training set: Mobile, Desktop, Desktop Hover.
export function ExternalTrainingCardMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`external-training-card-matrix-${mode}`}>
        <CardGroup label="Mobile, desktop and desktop hover">
          <ExternalTrainingCard {...TRAINING} device="mobile" />
          <ExternalTrainingCard {...TRAINING} />
          <ExternalTrainingCard {...TRAINING} className="ds-hover" />
        </CardGroup>
      </Box>
    </Canvas>
  )
}
