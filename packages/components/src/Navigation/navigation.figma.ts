import type { FigmaMapping } from '../figma'

export const sideNavFigma: FigmaMapping = {
  component: 'SideNav',
  mui: 'List + ListItemButton',
  page: 'Navigation',
  set: 'Side navigation',
  nodes: { light: '12048:2302', dark: '4697:13314' },
  variants: { System: ['Web app', 'Admin'], State: ['Collapsed', 'Expanded'] },
}

export const menuItemsWebFigma: FigmaMapping = {
  component: 'SideNav',
  mui: 'ListItemButton (className ds-nav-web)',
  page: 'Navigation',
  set: 'Menu/Itens/WebApp',
  nodes: { light: '12048:2401', dark: '4674:25675' },
  variants: { Selected: ['false', 'true'], State: ['Hover', 'Enabled'], Expanded: ['true', 'false'] },
}

export const menuItemsAdminFigma: FigmaMapping = {
  component: 'SideNav',
  mui: 'ListItemButton (className ds-nav-admin, ds-nav-sub)',
  page: 'Navigation',
  set: 'Menu/Itens/Admin',
  nodes: { light: '12048:2440', dark: '10372:4045' },
  variants: {
    Type: ['Menu', 'Sub-menu'],
    Selected: ['false', 'true'],
    'chevron right': ['false', 'true'],
    State: ['Hover', 'Enabled'],
    Expanded: ['true', 'false'],
  },
}

export const topNavFigma: FigmaMapping = {
  component: 'TopNav',
  mui: 'Box (header) + Button + IconButton',
  page: 'Navigation',
  set: 'Top Nav/Admin',
  nodes: { light: '12328:8954', dark: '5385:20137' },
  variants: { System: ['Admin', 'Web app'], Breakpoint: ['large', 'small'] },
}

export const pageHeaderFigma: FigmaMapping = {
  component: 'PageHeader',
  mui: 'Box + Typography + Divider',
  page: 'Header',
  set: 'Header',
  nodes: { light: '11921:13215', dark: '7902:1019' },
  variants: { Type: ['Page', 'Section'] },
}

export const tabNavFigma: FigmaMapping = {
  component: 'TabNav',
  mui: 'BottomNavigation + BottomNavigationAction',
  page: 'Navigation',
  set: 'Tab nav',
  nodes: { light: '9897:18192', dark: '1324:35285' },
  variants: { Page: ['Enabled', 'Home', 'Search', 'Progress', 'Feed', 'Profile'] },
}

export const appTopNavFigma: FigmaMapping = {
  component: 'AppTopNav',
  mui: 'Box (header) + Chip + Search + Avatar + IconButton',
  page: 'Navigation',
  set: 'Top nav/ App',
  nodes: { light: '11235:11758', dark: '1910:18375' },
  // Mobile web is the browser's chrome, so it isn't built.
  variants: { Page: ['Home', 'Detail page', 'Search', 'Progress', 'Feed', 'Profile', 'Lesson feed', 'Skill'] },
}
