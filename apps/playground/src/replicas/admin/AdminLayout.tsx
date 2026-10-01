import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { SideNav, TopNav, useThemeMode, type SideNavItem } from '@design-os/components'
import { Book, CalendarTick, Chart, Flash, Home, MessageQuestion, PathTool, Setting2, TaskSquare, Teacher, User } from 'iconsax-react'

// The Admin portal frame: the library's Admin Top navigation across the top and Admin Side
// navigation down the left, with the routed page beside it. Items follow the Figma Side
// navigation set; each one routes to /admin/<slug>, and pages the replica doesn't have yet
// show AdminPlaceholder.

interface NavEntry {
  label: string
  icon?: SideNavItem['icon']
  children?: string[]
}

const NAV: NavEntry[] = [
  { label: 'Home', icon: Home },
  { label: 'People & Teams', icon: User, children: ['People', 'Teams', 'Cohorts', 'Custom Fields', 'Roles'] },
  { label: 'Content', icon: Book, children: ['Programs', '5Mins Courses', 'Your Content', 'Your Courses'] },
  { label: 'Automations', icon: Flash },
  { label: 'Reports', icon: Chart },
  { label: 'Skills', icon: PathTool },
  { label: 'Learning Records', icon: TaskSquare },
  { label: 'Events', icon: CalendarTick },
  { label: 'Account & Settings', icon: Setting2 },
]

const HELP: NavEntry[] = [
  { label: '5Mins Academy', icon: Teacher },
  { label: 'Help', icon: MessageQuestion },
]

/** "Account & Settings" → "account-settings", "5Mins Courses" → "5mins-courses". */
export const adminSlug = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** The nav label for a slug, for page titles. */
export const adminLabel = (slug: string) => [...NAV, ...HELP].flatMap((n) => [n.label, ...(n.children ?? [])]).find((l) => adminSlug(l) === slug)

export function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { mode, toggle } = useThemeMode()
  const [collapsed, setCollapsed] = useState(false)
  const current = pathname.split('/')[2] ?? ''

  const item = (label: string, icon?: NavEntry['icon']): SideNavItem => ({
    label,
    icon,
    selected: adminSlug(label) === current,
    onClick: () => navigate(`/admin/${adminSlug(label)}`),
  })
  const items = NAV.map((n) => (n.children ? { ...item(n.label, n.icon), onClick: undefined, children: n.children.map((c) => item(c)) } : item(n.label, n.icon)))
  const help = HELP.map((n) => item(n.label, n.icon))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav
        system="admin"
        sideNavExpanded={!collapsed}
        onToggleSideNav={() => setCollapsed((c) => !c)}
        onLogo={() => navigate('/admin/home')}
        onExitAdmin={() => navigate('/web')}
        onToggleTheme={toggle}
        darkMode={mode === 'dark'}
        onLogout={() => navigate('/')}
      />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideNav system="admin" items={items} help={help} collapsed={collapsed} aria-label="Admin" />
        <Box component="main" sx={(theme) => ({ flex: 1, minWidth: 0, overflowY: 'auto', padding: `${theme.tokens.space.xl}px` })}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
