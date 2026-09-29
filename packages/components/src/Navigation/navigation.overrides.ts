import type { Components, Theme } from '@mui/material/styles'

// Side navigation menu items: MuiListItemButton keyed on a class. Figma Library, Navigation
// page: Menu/Itens/WebApp (dark 4674:25675, light 12048:2401) and Menu/Itens/Admin (dark
// 10372:4045, light 12048:2440).
//
//   <ListItemButton className="ds-nav-web">   Web app: padding 16, 24px Bold icon, Regular 16
//   <ListItemButton className="ds-nav-admin"> Admin: padding 12/16, 20px Linear icon, Regular 14
//   <ListItemButton className="ds-nav-sub">   Admin sub-menu: padding 12/16/12/42, Text-tertiary
//   selected          → Text-selected, Bold (the icon turns Bold too; SideNav swaps it)
//   hover             → Input-background
//   className ds-collapsed → the icon-only tile: 56 × 56 (web), 52 × 44 (admin)
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.

export const MuiListItemButton: Components<Theme>['MuiListItemButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      const item = {
        flexGrow: 0,
        gap: t.space.s,
        borderRadius: t.radius.s,
        color: s.textSecondary,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        lineHeight: 1.5,
        '& .ds-nav-label': { flex: 1, minWidth: 0, textAlign: 'left' as const, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const },
        '& svg': { display: 'block', flexShrink: 0 },
        '&:hover, &.ds-hover': { backgroundColor: s.inputBackground },
        '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.ds-hover': { color: s.textSelected, fontWeight: 700 },
        '&.Mui-selected': { backgroundColor: 'transparent' },
        '&.Mui-selected:hover, &.Mui-selected.ds-hover': { backgroundColor: s.inputBackground },
        '&.Mui-focusVisible, &.ds-focus': { backgroundColor: 'transparent', outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: -2 },
        '&.Mui-focusVisible.Mui-selected, &.Mui-focusVisible:hover': { backgroundColor: s.inputBackground },
      }
      return {
        '&.ds-nav-web': {
          ...item,
          padding: t.space.m,
          fontSize: 16,
          '& svg': { ...item['& svg'], width: t.iconSize.lg, height: t.iconSize.lg },
          '&.ds-collapsed': { width: 56, height: 56, justifyContent: 'center' },
        },
        '&.ds-nav-admin, &.ds-nav-sub': {
          ...item,
          padding: `${t.space.sm}px ${t.space.m}px`,
          fontSize: 14,
          '& svg': { ...item['& svg'], width: t.iconSize.md, height: t.iconSize.md },
        },
        // A group whose child is selected: Bold label and icon, in Text-secondary.
        '&.ds-nav-admin.ds-has-selected': { fontWeight: 700 },
        '&.ds-nav-admin .ds-nav-chevron': { width: 14, height: 14 },
        '&.ds-nav-admin.ds-collapsed': { width: 52, height: 44, padding: 0, justifyContent: 'center' },
        '&.ds-nav-sub': { paddingLeft: 42, color: s.textTertiary },
      }
    },
  },
}
