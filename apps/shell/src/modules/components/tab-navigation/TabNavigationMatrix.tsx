import { Box } from '@mui/material'
import { TabNav, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Tab nav set: Page=Enabled, then one bar per selected page, 24px apart.
const PAGES = [null, 'home', 'search', 'progress', 'feed', 'profile'] as const

export function TabNavigationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`tab-navigation-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: 375 }}>
        {PAGES.map((p) => (
          <TabNav key={p ?? 'enabled'} value={p} label={`Main, ${p ?? 'none'} selected`} />
        ))}
      </Box>
    </Canvas>
  )
}
