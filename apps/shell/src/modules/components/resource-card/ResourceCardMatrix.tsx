import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { ResourceCard, TypeThumbnail, RESOURCE_TYPES, type Mode, type ResourceType } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

export const TITLE = 'Resources that everyone should know'

const Group = ({ label, children }: { label: string; children: ReactNode }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Typography variant="h6" color="text.secondary">
      {label}
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'flex-start' }}>{children}</Box>
  </Box>
)

// The Figma Resources board: Card/Resources (Mobile app, Web/Admin, Hover) and Type thumbnail.
export function ResourceCardMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`resource-card-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 1900 }}>
        <Group label="Card">
          <Box sx={{ width: 344 }}>
            <ResourceCard device="mobile" type="pdf" title={TITLE} size="1.1 MB" />
          </Box>
          <Box sx={{ width: 900 }}>
            <ResourceCard type="pdf" title={TITLE} size="1.1 MB" />
          </Box>
          <Box sx={{ width: 900 }}>
            <ResourceCard type="pdf" title={TITLE} size="1.1 MB" className="ds-hover" />
          </Box>
        </Group>
        <Group label="Type thumbnail">
          {(Object.keys(RESOURCE_TYPES) as ResourceType[]).map((t) => (
            <TypeThumbnail key={t} type={t} />
          ))}
        </Group>
      </Box>
    </Canvas>
  )
}
