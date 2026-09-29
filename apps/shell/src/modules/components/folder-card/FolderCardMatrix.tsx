import { Box } from '@mui/material'
import { FolderCard, NewFolderCard, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { CardGroup } from '../shared/CardGroup'

export const IMAGE = '/samples/thumbnail.png'

// The Figma Card/Folder set: 3+, 2, 1 and 0 courses, each Default then Hover, then New Folder.
export function FolderCardMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`folder-card-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <CardGroup label="Default">
          <FolderCard title="All courses" count={3} countLabel="3+ courses" image={IMAGE} />
          <FolderCard title="All courses" count={2} image={IMAGE} />
          <FolderCard title="All courses" count={1} image={IMAGE} />
          <FolderCard title="All courses" count={0} />
          <NewFolderCard />
        </CardGroup>
        <CardGroup label="Hover">
          <FolderCard title="All courses" count={3} countLabel="3+ courses" image={IMAGE} className="ds-hover" />
          <FolderCard title="All courses" count={2} image={IMAGE} className="ds-hover" />
          <FolderCard title="All courses" count={1} image={IMAGE} className="ds-hover" />
          <FolderCard title="All courses" count={0} className="ds-hover" />
          <NewFolderCard className="ds-hover" />
        </CardGroup>
      </Box>
    </Canvas>
  )
}
