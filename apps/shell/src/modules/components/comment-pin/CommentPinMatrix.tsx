import { Box, Typography } from '@mui/material'
import { CommentPin, type CommentPinStatus, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// Every status (columns) in each state (rows).
export const STATUSES: { status: CommentPinStatus; label: string }[] = [
  { status: 'pending', label: 'Pending' },
  { status: 'in-progress', label: 'In progress' },
  { status: 'done', label: 'Done' },
  { status: 'failed', label: 'Failed' },
]
const STATES = ['Enabled', 'Hover', 'Selected'] as const

export function CommentPinMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`comment-pin-matrix-${mode}`} sx={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 96px)', columnGap: 4, rowGap: 6, alignItems: 'center' }}>
        <Box />
        {STATUSES.map((s) => (
          <Typography key={s.status} variant="h6" color="text.secondary">
            {s.label}
          </Typography>
        ))}
        {STATES.flatMap((state) => [
          <Typography key={`${state}-l`} variant="caption" color="text.secondary">
            {state}
          </Typography>,
          ...STATUSES.map((s) => (
            <Box key={`${state}-${s.status}`}>
              <CommentPin author="Bruno" status={s.status} selected={state === 'Selected'} className={state === 'Hover' ? 'ds-hover' : undefined} aria-label={`${s.label} comment, ${state}`} />
            </Box>
          )),
        ])}
      </Box>
    </Canvas>
  )
}
