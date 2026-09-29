import type { CSSObject } from '@emotion/react'
import type { ChipProps } from '@mui/material/Chip'
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
// variant="badge" is the Figma Badge: a status pill (see badgeStyles below).
// Other coloured chips are left to MUI.
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

// The Figma Badge set (dark 5799:479, light 12186:1609): a status label, not an option.
//   color success / warning / error / progress (In progress) / default (Informative) / new
//   icon     → Icon left (16px)
//   onDelete → Icon right: the remove icon takes the leading icon's place, and the gap grows to 8px
function badgeStyles(theme: Theme, color: ChipProps['color']): CSSObject {
  const t = theme.tokens
  const s = t.semantic
  const look = {
    success: [s.badgeSuccessBackground, s.textSuccess],
    warning: [s.badgeWarningBackground, s.textWarning],
    error: [s.badgeErrorBackground, s.textError],
    progress: [s.badgeProgressBackground, s.textProgress],
    new: [t.palette.danger[400], t.palette.neutral[25]],
  }[color as string] ?? [s.inputBackground, s.textSecondary]

  return {
    height: 'auto',
    gap: t.space.xs,
    padding: `${t.space.xss}px ${t.space.sm}px`,
    border: 'none',
    borderRadius: t.radius.full,
    backgroundColor: look[0],
    color: look[1],
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.2,
    '& .MuiChip-label': { padding: 0 },
    '& .MuiChip-icon, & .MuiChip-deleteIcon': {
      margin: 0,
      width: t.iconSize.sm,
      height: t.iconSize.sm,
      fontSize: t.iconSize.sm,
      color: 'currentColor',
      flexShrink: 0,
    },
    '&.MuiChip-deletable': { gap: t.space.s },
    '& .MuiChip-deleteIcon:hover': { color: 'currentColor' },
    '&.MuiChip-clickable:hover, &.MuiChip-deletable:hover': { backgroundColor: look[0] },
    '&.Mui-focusVisible': {
      backgroundColor: look[0],
      outline: `2px solid ${s.primaryButtonBackground}`,
      outlineOffset: 2,
    },
  }
}

export const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => {
      if (ownerState.variant === 'badge') return badgeStyles(theme, ownerState.color)
      return ownerState.color && ownerState.color !== 'default' ? {} : chipStyles(theme)
    },
  },
}
