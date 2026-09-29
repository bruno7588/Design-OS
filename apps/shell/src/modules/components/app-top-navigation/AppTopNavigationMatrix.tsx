import { Box } from '@mui/material'
import type { Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { PAGES, Sample } from './samples'

// The Figma Top nav/ App set: one 375-wide bar per page, 24px apart, each with the status bar.
// Figma lays them in one row; here they wrap, four to a row, so the whole set fits.
// Mobile web (the browser's chrome) isn't built.
export function AppTopNavigationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`app-top-navigation-matrix-${mode}`} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 6, maxWidth: 375 * 4 + 72 }}>
        {PAGES.map(({ page }) => (
          <Box key={page} sx={{ width: 375, flexShrink: 0 }} data-page={page}>
            <Sample page={page} />
          </Box>
        ))}
      </Box>
    </Canvas>
  )
}
