import { Stack, Typography } from '@mui/material'
import { ProgressBar, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma Progress bar set: 0 to 100% in eighths, 400px wide. Then the 72px table cell.
export const STEPS = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100]

export function ProgressBarMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack sx={{ gap: 8 }}>
        <StateGrid
          testId={`progress-bar-matrix-${mode}`}
          columns={['Progress']}
          rows={STEPS.map((v) => ({ name: `${Math.floor(v)}%`, cells: [<ProgressBar key={v} value={v} width={400} aria-label={`${Math.floor(v)}%`} />] }))}
        />
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h6" color="text.secondary">
            In a table cell
          </Typography>
          <ProgressBar value={100} width={72} showLabel aria-label="Course progress" data-testid={`progress-bar-cell-${mode}`} />
        </Stack>
      </Stack>
    </Canvas>
  )
}
