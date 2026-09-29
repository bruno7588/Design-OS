import type { Components, Theme } from '@mui/material/styles'

// MuiToggleButtonGroup and MuiToggleButton theme overrides: the Figma Content switcher.
// Implements Part 2 of playground/docs/design-system/chips-switcher-tabs.md, cross-checked
// with the Figma Library: Content switcher (7128:23859) and Content switcher item
// (dark 8497:24186, light 11908:5278).
//
// Plain MUI renders the 5Mins switcher, whatever its size:
//   Selected=True  → selected (exclusive group)
//   State=Hover    → :hover
//   Disabled=true  → disabled
//   icon left / icon right → an icon before (20px) or after (16px, class ds-icon-right) the label
// The shell's own panels use ToggleButtonGroup, so they show it too.

export const MuiToggleButtonGroup: Components<Theme>['MuiToggleButtonGroup'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      return {
        display: 'inline-flex',
        gap: t.space.xs,
        padding: t.space.xs,
        borderRadius: t.radius.sm,
        backgroundColor: t.semantic.inputBackground,
        // MUI joins grouped buttons with shared borders; the Figma sections stand apart.
        '& .MuiToggleButtonGroup-grouped.MuiToggleButton-root': {
          margin: 0,
          border: 0,
          borderRadius: t.radius.s,
        },
      }
    },
  },
}

export const MuiToggleButton: Components<Theme>['MuiToggleButton'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        gap: t.space.xs,
        padding: `${t.space.xss}px ${t.space.sm}px`,
        border: 0,
        borderRadius: t.radius.s,
        backgroundColor: 'transparent',
        color: s.textSecondary,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        textTransform: 'none',
        transition: 'background-color 150ms',
        '& svg': { width: t.iconSize.md, height: t.iconSize.md, flexShrink: 0 },
        '& svg.ds-icon-right': { width: t.iconSize.sm, height: t.iconSize.sm },
        '&:hover, &.ds-hover': { backgroundColor: s.inputBackgroundHover },
        '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.ds-hover': {
          backgroundColor: s.chipSelectedBackground,
          color: s.textOnSelected,
          fontWeight: 700,
        },
        '&.Mui-disabled': { color: s.textDisabled, backgroundColor: 'transparent', border: 0 },
        '&.Mui-focusVisible, &.ds-focus': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 0 },
      }
    },
  },
}
