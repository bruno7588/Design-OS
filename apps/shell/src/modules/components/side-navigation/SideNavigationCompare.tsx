import { sideNavFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { SideNavigationMatrix } from './SideNavigationMatrix'

// Figma = Side navigation (dark 4697:13314, light 12048:2302), Menu/Itens/WebApp (4674:25675,
// 12048:2401) and Menu/Itens/Admin (10372:4045, 12048:2440), checked 2026-09-29.
const compare: Compare = {
  page: sideNavFigma.page,
  set: 'Side navigation, Menu/Itens/WebApp, Menu/Itens/Admin',
  frames: { light: '/figma/side-navigation-light.png', dark: '/figma/side-navigation-dark.png' },
  live: (mode) => <SideNavigationMatrix mode={mode} />,
  differences: [
    { property: 'Panel', figma: '240 wide; collapsed 88 (web) and 68 (Admin); Admin 1px Border on the right', reference: 'Same', status: 'Matches' },
    { property: 'Web app item', figma: 'Padding 16, 24px Bold icon, Regular 16, radius 8; selected Text-selected Bold', reference: 'Same', status: 'Matches' },
    { property: 'Admin item', figma: 'Padding 12/16, 20px Linear icon (Bold when selected), Regular 14; menu gap 4', reference: 'Same', status: 'Matches' },
    { property: 'Sub-menu item', figma: 'Padding 12/16/12/42, 45px (the panels follow the component since 2026-09-29)', reference: 'Same', status: 'Matches' },
    { property: 'Hover', figma: 'Input-background', reference: 'Same', status: 'Matches' },
    { property: 'Collapsed hover', figma: 'The tile fills and a Tooltip (Position=Right) shows the label', reference: 'MUI Tooltip on the right, on hover and focus', status: 'Matches' },
    { property: 'Group with a selected item', figma: 'Bold label and icon in Text-secondary', reference: 'Same', status: 'Matches', note: 'navigation.md also gives it a Page-background-hover fill; Figma doesn’t.' },
    { property: 'Custom icons', figma: 'Search, Feed and Skills use custom glyphs; Skills is a detached frame', reference: 'Icons come from the caller; the docs use SearchNormal1, People and PathTool', status: 'Design to update', note: 'Swap in Iconsax icons, or add these to the icon set.' },
    { property: 'Profile card', figma: 'Input-background, radius 12, padding 8/16; name SemiBold 14, email Regular 12; Setting2 16', reference: 'Same (settings is a button)', status: 'Matches', note: 'navigation.md says Medium 14 for the name.' },
    { property: 'Built component', figma: '–', reference: 'SideNav', status: 'Code to update', note: 'The prototype’s LeftSidebar is Admin only, hand-built, with no aria-current or aria-expanded.' },
  ],
  engineering: {
    mui: 'List + ListItemButton (theme overrides) + Collapse + Tooltip',
    usage: `<SideNav system="admin" collapsed={collapsed} items={items} help={help} />`,
    props: [
      { figma: 'System', code: 'system: web | admin' },
      { figma: 'State=Collapsed', code: 'collapsed' },
      { figma: 'Menu/Itens Selected', code: 'item.selected' },
      { figma: 'Type=Sub-menu', code: 'item.children' },
    ],
    theme: ['MuiListItemButton: .ds-nav-web, .ds-nav-admin, .ds-nav-sub, .ds-collapsed and .ds-has-selected.'],
    files: [
      'packages/components/src/Navigation/navigation.overrides.ts (menu items)',
      'packages/components/src/Navigation/SideNav.tsx (panel, groups, collapsed tooltips)',
      'packages/components/src/Navigation/Logo.tsx',
    ],
  },
}

export function SideNavigationCompare() {
  return <CompareTemplate c={compare} />
}
