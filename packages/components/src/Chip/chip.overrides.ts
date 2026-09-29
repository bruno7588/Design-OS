import type { CSSObject } from '@emotion/react'
import type { Components, Theme } from '@mui/material/styles'

// MuiChip theme overrides. Implements playground/docs/design-system/chips-switcher-tabs.md,
// cross-checked with the Figma Library Chips set (dark 5162:28510, light 12160:12109).
//
// Keyed on MUI's own props, so a plain <Chip> from @mui/material renders the 5Mins chip:
//   icon        → Icon left (16px)
//   onDelete    → Icon right (deleteIcon, 16px)
//   disabled    → Disabled
//   Mui-selected class (the Chip wrapper's `selected` prop) → Selected
//
// Only color="default" is styled. Coloured chips are left to MUI so the shell's status
// labels keep working until Badge is built.
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.

// Figma has no selected-hover state, so a selected chip keeps its fill.
const HOVER =
  '&.MuiChip-clickable:not(.Mui-selected):hover, &.MuiChip-deletable:not(.Mui-selected):hover, &.ds-hover:not(.Mui-selected)'

function chipStyles(theme: Theme): CSSObject {
  const t = theme.tokens
  const s = t.semantic

  return {
    // Figma draws the 1px border inside a 6/12 padded frame: 33px tall.
    height: 'auto',
    gap: t.space.xs,
    padding: `${t.space.xss - 1}px ${t.space.sm - 1}px`,
    border: `1px solid ${s.borderElevated}`,
    borderRadius: t.radius.l,
    backgroundColor: 'transparent',
    color: s.textSecondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    transition: 'background-color 150ms, border-color 150ms, color 150ms',

    // The side that carries an icon has 10px instead of 12px.
    '&:has(.MuiChip-icon)': { paddingLeft: t.space.ssm - 1 },
    '&.MuiChip-deletable': { paddingRight: t.space.ssm - 1 },

    '& .MuiChip-label': { padding: 0, maxWidth: 240 },
    '& .MuiChip-icon, & .MuiChip-deleteIcon': {
      margin: 0,
      width: t.iconSize.sm,
      height: t.iconSize.sm,
      fontSize: t.iconSize.sm,
      color: 'currentColor',
      flexShrink: 0,
    },
    '& .MuiChip-deleteIcon:hover': { color: 'currentColor' },

    [HOVER]: {
      backgroundColor: s.pageBackgroundHover,
      borderColor: s.borderHover,
    },

    '&.Mui-selected': {
      backgroundColor: s.chipSelectedBackground,
      borderColor: 'transparent',
      color: s.textOnSelected,
      fontWeight: 700,
    },

    '&.Mui-focusVisible, &.ds-focus': {
      backgroundColor: 'transparent',
      outline: `2px solid ${s.primaryButtonBackground}`,
      outlineOffset: 2,
    },
    '&.Mui-selected.Mui-focusVisible, &.Mui-selected.ds-focus': { backgroundColor: s.chipSelectedBackground },

    '&.Mui-disabled': {
      opacity: 1,
      backgroundColor: 'transparent',
      borderColor: s.border,
      color: s.textDisabled,
    },

    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  }
}

export const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => (ownerState.color && ownerState.color !== 'default' ? {} : chipStyles(theme)),
  },
}
