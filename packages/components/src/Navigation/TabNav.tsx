import type { ReactNode } from 'react'
import BottomNavigation, { type BottomNavigationProps } from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Award, Home, SearchNormal1, UserSquare } from 'iconsax-react'
import { FeedIcon } from '../icons/FigmaIcons'

// 5Mins mobile app tab bar (Figma Tab nav: dark 1324:35285, light 9897:18192). MUI
// BottomNavigation; the look lives in the theme (tabNav.overrides.ts). The wrapper adds the
// five learner tabs, a nav landmark and aria-current on the current page.
//
// Figma → props
//   Page=Enabled                  → value null (no tab selected)
//   Page=Home / Search / Progress / Feed / Profile → value "home" … "profile"

export type TabNavPage = 'home' | 'search' | 'progress' | 'feed' | 'profile'

export interface TabNavItem {
  value: string
  label: string
  icon: ReactNode
}

/** The learner app's five tabs, in Figma order. Icons are Iconsax Bold (Feed is custom). */
export const TAB_NAV_ITEMS: TabNavItem[] = [
  { value: 'home', label: 'Home', icon: <Home variant="Bold" color="currentColor" /> },
  { value: 'search', label: 'Search', icon: <SearchNormal1 variant="Bold" color="currentColor" /> },
  { value: 'progress', label: 'Progress', icon: <Award variant="Bold" color="currentColor" /> },
  { value: 'feed', label: 'Feed', icon: <FeedIcon /> },
  { value: 'profile', label: 'Profile', icon: <UserSquare variant="Bold" color="currentColor" /> },
]

export interface TabNavProps extends Omit<BottomNavigationProps, 'value' | 'onChange' | 'children'> {
  /** The current page; null selects nothing (Page=Enabled). */
  value: TabNavPage | string | null
  onChange?: (value: string) => void
  items?: TabNavItem[]
  /** Names the nav landmark. */
  label?: string
}

export function TabNav({ value, onChange, items = TAB_NAV_ITEMS, label = 'Main', className, ...props }: TabNavProps) {
  return (
    <BottomNavigation
      component="nav"
      aria-label={label}
      showLabels
      value={value}
      onChange={(_, v: string) => onChange?.(v)}
      className={['ds-tab-nav', className].filter(Boolean).join(' ')}
      {...props}
    >
      {items.map((item) => (
        <BottomNavigationAction
          key={item.value}
          value={item.value}
          label={item.label}
          icon={item.icon}
          aria-current={item.value === value ? 'page' : undefined}
        />
      ))}
    </BottomNavigation>
  )
}
