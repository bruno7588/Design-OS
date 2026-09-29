import { Stack, Typography } from '@mui/material'
import { EmptyState, ILLUSTRATIONS, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

const noop = () => {}
const COPY = 'Uploading your own content makes the learning experience more relevant and drives a 38% boost in information retention.'

// The Figma Empty state set: Desktop and Mobile, Plain and Dropzone. Then the exported illustrations.
export function EmptyStateMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Stack sx={{ gap: 8 }}>
        <Stack direction="row" sx={{ gap: 6, alignItems: 'center', minWidth: 1040 }} data-testid={`empty-state-matrix-${mode}`}>
          <EmptyState title="Empty state title" description={COPY} secondaryAction={{ label: 'Button', onClick: noop }} primaryAction={{ label: 'Button', onClick: noop }} />
          <Stack sx={{ width: 375 }}>
            <EmptyState device="mobile" title="Empty state title" description={COPY} secondaryAction={{ label: 'Button', onClick: noop }} primaryAction={{ label: 'Button', onClick: noop }} />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ gap: 6, alignItems: 'center', minWidth: 1040 }} data-testid={`empty-state-dropzone-${mode}`}>
          <Stack sx={{ width: 664, flexShrink: 0 }}>
            <EmptyState surface="dropzone" title="Empty state title" description={COPY} secondaryAction={{ label: 'Button', onClick: noop }} primaryAction={{ label: 'Button', onClick: noop }} />
          </Stack>
          <Stack sx={{ width: 375, flexShrink: 0 }}>
            <EmptyState device="mobile" surface="dropzone" title="Empty state title" description={COPY} secondaryAction={{ label: 'Button', onClick: noop }} primaryAction={{ label: 'Button', onClick: noop }} />
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Illustrations (from the Figma set)
          </Typography>
          <Stack direction="row" sx={{ gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(ILLUSTRATIONS).map(([name, src]) => (
              <Stack key={name} sx={{ alignItems: 'center', gap: 1 }}>
                <img src={src} alt="" width={72} height={72} />
                <Typography variant="caption" color="text.secondary">
                  {name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Canvas>
  )
}
