import type { SideNavItem } from '@design-os/components'
import {
  Award,
  Book,
  CalendarTick,
  Chart,
  Flash,
  Home,
  Medal,
  MessageQuestion,
  MonitorMobbile,
  PathTool,
  People,
  Profile2User,
  SearchNormal1,
  Setting2,
  ShieldSecurity,
  TaskSquare,
  Teacher,
  User,
  UserSquare,
} from 'iconsax-react'

// The menus in the Figma Side navigation set. Search, Feed and Skills use custom glyphs in
// Figma; the closest Iconsax icons stand in (SearchNormal1, People, PathTool).

export const webItems = (selected = 'For You'): SideNavItem[] =>
  [
    { label: 'For You', icon: Home },
    { label: 'Your Workspace', icon: Profile2User },
    { label: 'Knowledge Hub', icon: MonitorMobbile },
    { label: 'Search', icon: SearchNormal1 },
    { label: 'My Team', icon: Award },
    { label: 'My Progress', icon: Medal },
    { label: 'Feed', icon: People },
    { label: 'Profile', icon: UserSquare },
    { label: 'Admin', icon: ShieldSecurity },
  ].map((i) => ({ ...i, selected: i.label === selected }))

export const adminItems = (selected = 'Home'): SideNavItem[] => {
  const mark = (i: SideNavItem): SideNavItem => ({ ...i, selected: i.label === selected, children: i.children?.map(mark) })
  return [
    { label: 'Home', icon: Home },
    { label: 'People & Teams', icon: User, children: ['People', 'Teams', 'Cohorts', 'Custom Fields', 'Roles'].map((label) => ({ label })) },
    { label: 'Content', icon: Book, children: ['Programs', '5Mins Courses', 'Your Content', 'Your Courses'].map((label) => ({ label })) },
    { label: 'Automations', icon: Flash },
    { label: 'Reports', icon: Chart },
    { label: 'Skills', icon: PathTool },
    { label: 'Learning Records', icon: TaskSquare },
    { label: 'Events', icon: CalendarTick },
    { label: 'Account & Settings', icon: Setting2 },
  ].map(mark)
}

export const adminHelp: SideNavItem[] = [
  { label: '5Mins Academy', icon: Teacher },
  { label: 'Help', icon: MessageQuestion },
]

export const profile = { name: 'Anthonny Wallace', email: 'anthonny@email.com' }
