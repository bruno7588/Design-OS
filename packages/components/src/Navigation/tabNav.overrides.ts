import type { Components, Theme } from '@mui/material/styles'

// Mobile app tab bar: MuiBottomNavigation and MuiBottomNavigationAction. Figma Library,
// Navigation page: Tab nav (dark 1324:35285, light 9897:18192).
//
// Keyed on MUI's own props, so a plain <BottomNavigation showLabels> renders the 5Mins bar:
//   bar      → 66px: Page-background, a 1px Border on top, padding 8/16
//   action   → fills its share; 4px padding, 24px icon, 4px gap, Regular 10/1.4 label
//   selected → the icon and label take Selected; nothing else changes (same Bold icon)
// Forced-state class ds-focus is for docs and visual tests.

export const MuiBottomNavigation: Components<Theme>['MuiBottomNavigation'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      return {
        height: 'auto',
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: `${t.space.s}px ${t.space.m}px`,
        backgroundColor: t.semantic.pageBackground,
        // Figma draws the border inside the 66px bar.
        boxShadow: `inset 0 1px 0 ${t.semantic.border}`,
      }
    },
  },
}

export const MuiBottomNavigationAction: Components<Theme>['MuiBottomNavigationAction'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        flex: 1,
        minWidth: 0,
        maxWidth: 'none',
        gap: t.space.xs,
        padding: t.space.xs,
        borderRadius: t.radius.s,
        color: s.textSecondary,
        transition: 'none',
        '& svg': { display: 'block', flexShrink: 0, width: t.iconSize.lg, height: t.iconSize.lg },
        '&.Mui-selected': { color: s.selected },
        '&.Mui-focusVisible, &.ds-focus': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: -2 },
      }
    },
    label: ({ theme }) => ({
      fontFamily: theme.typography.fontFamily,
      // Figma sets the label at 10px, below the type scale: the one place it does.
      fontSize: 10,
      fontWeight: 400,
      lineHeight: 1.4,
      transition: 'none',
      '&.Mui-selected': { fontSize: 10 },
    }),
  },
}
