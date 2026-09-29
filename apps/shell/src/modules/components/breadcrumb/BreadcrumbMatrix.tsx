import { Stack, Typography } from '@mui/material'
import { Breadcrumb, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma Breadcrumb item set (Link and Current page, each state), then the trail.
const noop = () => {}
const one = (props: { className?: string; disabled?: boolean }) => (
  <Breadcrumb items={[{ label: 'Breadcrumb', onClick: noop, ...props }, { label: '' }]} sx={{ '& .MuiBreadcrumbs-li:last-of-type': { display: 'none' } }} />
)

export function BreadcrumbMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack sx={{ gap: 8 }}>
        <StateGrid
          testId={`breadcrumb-matrix-${mode}`}
          columns={['Link', 'Current page']}
          rows={[
            { name: 'Enabled', cells: [one({}), <Breadcrumb key="c" items={[{ label: 'Breadcrumb' }]} />] },
            { name: 'Hover', cells: [one({ className: 'ds-hover' }), <span key="c" />] },
            { name: 'Disabled', cells: [one({ disabled: true }), <Breadcrumb key="c" items={[{ label: 'Breadcrumb', disabled: true }]} />] },
          ]}
        />
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Breadcrumb
          </Typography>
          <Breadcrumb data-testid={`breadcrumb-trail-${mode}`} items={[{ label: 'Breadcrumb', onClick: noop }, { label: 'Breadcrumb', onClick: noop }, { label: 'Breadcrumb' }]} />
        </Stack>
      </Stack>
    </Canvas>
  )
}
