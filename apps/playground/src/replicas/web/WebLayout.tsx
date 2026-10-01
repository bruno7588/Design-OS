import { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { SideNav, TopNav, type SideNavItem } from '@design-os/components'
import { generateOrg } from '@design-os/mock-data'
import { Award, Home, Medal, MonitorMobbile, People, Profile2User, SearchNormal1, ShieldSecurity, UserSquare } from 'iconsax-react'

// The learner web app frame: the library's web Top navigation and web Side navigation (with the
// profile card), the routed page beside it. Shell only for now; items follow the Figma Side
// navigation set (Search, Feed and Skills glyphs use the closest Iconsax icons, as in the library).

const NAV: { label: string; icon: SideNavItem['icon'] }[] = [
  { label: 'For You', icon: Home },
  { label: 'Your Workspace', icon: Profile2User },
  { label: 'Knowledge Hub', icon: MonitorMobbile },
  { label: 'Search', icon: SearchNormal1 },
  { label: 'My Team', icon: Award },
  { label: 'My Progress', icon: Medal },
  { label: 'Feed', icon: People },
  { label: 'Profile', icon: UserSquare },
  { label: 'Admin', icon: ShieldSecurity },
]

export const webSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
export const webLabel = (slug: string) => NAV.find((n) => webSlug(n.label) === slug)?.label

export function WebLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const current = pathname.split('/')[2] ?? ''
  // The signed-in learner: someone from the generated org.
  const me = useMemo(() => generateOrg().employees.find((e) => e.level === 'Staff' && e.status === 'Registered')!, [])

  const items: SideNavItem[] = NAV.map((n) => ({
    label: n.label,
    icon: n.icon,
    selected: webSlug(n.label) === current,
    onClick: () => navigate(n.label === 'Admin' ? '/admin' : `/web/${webSlug(n.label)}`),
  }))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav system="web" onLogo={() => navigate('/web/for-you')} eventsUnread />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideNav system="web" items={items} profile={{ name: me.name, email: me.email }} aria-label="Web app" />
        <Box component="main" sx={(theme) => ({ flex: 1, minWidth: 0, overflowY: 'auto', padding: `${theme.tokens.space.xl}px` })}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
