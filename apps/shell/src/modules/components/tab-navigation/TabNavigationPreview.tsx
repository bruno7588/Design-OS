import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { TabNav, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { TabNavigationMatrix } from './TabNavigationMatrix'

export function TabNavigationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [page, setPage] = useState('home')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: 375, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="tab-navigation-preview">
          <TabNav value={page} onChange={setPage} />
          <Typography variant="body2" color="text.secondary" role="status">
            Current page: {page}.
          </Typography>
        </Box>
      }
      controls={
        <Typography variant="body2" color="text.secondary">
          Tap a tab to change the page. Arrow keys aren’t used: each tab is a button in the tab order.
        </Typography>
      }
      hint="The bar sits at the bottom of the learner app, 375 wide in Figma."
      matrix={<TabNavigationMatrix mode={mode} />}
    />
  )
}
