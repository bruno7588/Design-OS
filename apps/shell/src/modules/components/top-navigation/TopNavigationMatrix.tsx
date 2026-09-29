import { Box, Typography } from '@mui/material'
import { TopNav, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Top Nav/Admin set: Web app and Admin at large, Admin at small (375).
export function TopNavigationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`top-navigation-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: 1100 }}>
        <Typography variant="h6" color="text.secondary">
          Web app, large
        </Typography>
        <TopNav system="web" eventsUnread />
        <Typography variant="h6" color="text.secondary">
          Admin, large
        </Typography>
        <TopNav system="admin" darkMode={mode === 'dark'} />
        <Typography variant="h6" color="text.secondary">
          Admin, small
        </Typography>
        <Box sx={{ width: 375 }}>
          <TopNav system="admin" small />
        </Box>
      </Box>
    </Canvas>
  )
}
