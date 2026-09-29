import type { Components, Theme } from '@mui/material/styles'

// MuiTabs and MuiTab theme overrides. Implements the Tabs section of
// playground/docs/design-system/chips-switcher-tabs.md, cross-checked with the
// Figma Library Tab items set (dark 1939:18281, light 12134:6969) and Tabs (8497:24855).
//
// A plain <Tabs><Tab label="…" /></Tabs> from @mui/material renders the 5Mins tabs:
//   label row 14px / 1.5, a 4px gap, then a 2px indicator as wide as the label row.
//   Tabs sit 16px apart; the bar is 27px tall.
// The Tab wrapper adds the counter pill (.ds-tab-counter) and keeps the width steady
// when the label turns Bold (.ds-tab-label).
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.

export const MuiTabs: Components<Theme>['MuiTabs'] = {
  defaultProps: { textColor: 'inherit' },
  styleOverrides: {
    root: { minHeight: 0, overflow: 'visible' },
    scroller: { overflow: 'visible !important' },
    flexContainer: ({ theme }) => ({ gap: theme.tokens.space.m }),
    indicator: ({ theme }) => ({
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.tokens.semantic.selected,
    }),
  },
}

export const MuiTab: Components<Theme>['MuiTab'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        minWidth: 0,
        minHeight: 0,
        // 4px gap + 2px indicator under the label row.
        padding: `0 0 ${t.space.xss}px`,
        flexDirection: 'row',
        gap: t.space.xs,
        textTransform: 'none',
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        color: s.textSecondary,
        opacity: 1,
        overflow: 'visible',

        '& .ds-tab-counter': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 20,
          height: 20,
          padding: `0 ${t.space.xss}px`,
          borderRadius: t.radius.full,
          backgroundColor: s.inputBackground,
          color: s.textTertiary,
          fontWeight: 500,
          lineHeight: 1,
        },

        // Reserve the Bold width so tabs don't shift when the selection moves.
        '& .ds-tab-label': { display: 'inline-flex', flexDirection: 'column' },
        '& .ds-tab-label::after': {
          content: 'attr(data-label)',
          fontWeight: 700,
          height: 0,
          visibility: 'hidden',
          overflow: 'hidden',
          userSelect: 'none',
          pointerEvents: 'none',
        },

        '&:hover, &.ds-hover': {
          color: s.textPrimary,
          '& .ds-tab-counter': { color: s.textSecondary },
        },
        '&.Mui-selected': {
          color: s.textPrimary,
          fontWeight: 700,
          '& .ds-tab-counter': { color: s.textSecondary },
        },
        '&.Mui-focusVisible, &.ds-focus': {
          outline: `2px solid ${s.primaryButtonBackground}`,
          outlineOffset: 2,
          borderRadius: t.radius.xs,
        },
        // Not in Figma; the prototype's lesson editor uses Text-disabled.
        '&.Mui-disabled': { color: s.textDisabled },
      }
    },
  },
}
