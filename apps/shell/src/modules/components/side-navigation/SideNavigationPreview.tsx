import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material'
import { SideNav, type Mode, type SideNavItem } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { SideNavigationMatrix } from './SideNavigationMatrix'
import { adminHelp, adminItems, profile, webItems } from './navItems'

// Clicking an item selects it, as navigating would.
const withClicks = (items: SideNavItem[], select: (label: string) => void): SideNavItem[] =>
  items.map((i) => ({ ...i, onClick: () => select(i.label), children: i.children && withClicks(i.children, select) }))

export function SideNavigationPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [system, setSystem] = useState<'web' | 'admin'>('admin')
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState('Home')
  const items = system === 'web' ? webItems(selected) : adminItems(selected)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ height: 720 }} data-testid="side-navigation-preview">
          <SideNav system={system} items={withClicks(items, setSelected)} collapsed={collapsed} profile={profile} help={adminHelp} aria-label="Main" />
        </Box>
      }
      controls={
        <>
          <TextField
            select
            size="small"
            label="System"
            value={system}
            onChange={(e) => {
              const s = e.target.value as 'web' | 'admin'
              setSystem(s)
              setSelected(s === 'web' ? 'For You' : 'Home')
            }}
          >
            <MenuItem value="web">Web app</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={collapsed} onChange={(e) => setCollapsed(e.target.checked)} />} label="Collapsed" />
        </>
      }
      hint="Click an item to select it. In Admin, People & Teams and Content open and close. Collapsed, hover an icon for its label."
      matrix={<SideNavigationMatrix mode={mode} />}
    />
  )
}
