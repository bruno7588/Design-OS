import { useState } from 'react'
import { Box } from '@mui/material'
import { ShareModalPreview, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { PEOPLE, TEAMS } from './samples'

// The Figma Modal/Send set: Type=Team (People) and Type=Company (Teams), drawn in place.
function One({ tab }: { tab: 'people' | 'teams' }) {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <Box data-tab={tab}>
      <ShareModalPreview onClose={() => undefined} people={tab === 'people' ? PEOPLE : TEAMS} teams={TEAMS} selected={selected} onSelectedChange={setSelected} />
    </Box>
  )
}

export function ShareModalMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`share-modal-matrix-${mode}`} sx={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <One tab="people" />
        <One tab="teams" />
      </Box>
    </Canvas>
  )
}
