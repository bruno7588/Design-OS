import { Box } from '@mui/material'
import { EmptyStateIllustration, type IllustrationName, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

const FIGMA_ORDER: IllustrationName[] = ['certificates', 'pie-chart', 'empty-box', 'search', 'share', 'no-bookmarks', 'no-automations', 'connect-brain', 'no-likes', 'not-following', 'cloud', 'ufo', 'party', 'flashcards', 'custom-fields', 'computer-screen', 'calendar', 'rocket', 'message', 'buble', 'no-results', 'no-activity', 'no-internet', 'skill-level', 'add-users', 'no-playlists', 'add', 'category', 'quiz', 'resources', 'deactivated', 'hris-mapping', 'programs']

// The Figma "Empty state illustration" set in one row, as the Library board draws it.
export function EmptyStateIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ p: 6, overflowX: 'auto' }}>
      <Box data-testid={`empty-state-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 6, width: 'max-content' }}>
        {FIGMA_ORDER.map((n) => <EmptyStateIllustration key={n} name={n} />)}
      </Box>
    </Canvas>
  )
}
