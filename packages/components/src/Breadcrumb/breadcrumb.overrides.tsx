import type { Components, Theme } from '@mui/material/styles'
import { ArrowRight2 } from 'iconsax-react'

// MuiBreadcrumbs theme overrides. Implements the Breadcrumb section of
// playground/docs/design-system/navigation.md, cross-checked with the Figma Library:
// Breadcrumb (8497:2231) and Breadcrumb item (dark 8497:1494, light 11935:2383).
//
// Plain MUI renders the 5Mins trail:
//   Type=Link           → a link (<a> or a button) in a crumb
//   Type=Current page   → the last crumb, with aria-current="page"
//   State=Hover         → :hover on the link; its chevron follows
//   Disabled=true       → aria-disabled="true" on the link
// Figma draws the chevron inside each Link item, 2px after the label, then 4px to the next.

export const MuiBreadcrumbs: Components<Theme>['MuiBreadcrumbs'] = {
  defaultProps: { separator: <ArrowRight2 size={16} color="currentColor" /> },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      const link = '& .MuiBreadcrumbs-li > a, & .MuiBreadcrumbs-li > button'
      return {
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        lineHeight: 1.5,
        color: s.textTertiary,
        [link]: {
          font: 'inherit',
          color: s.textTertiary,
          textDecoration: 'none',
          borderRadius: t.radius.xs,
          '&:hover, &.ds-hover': { color: s.textPrimary, textDecoration: 'underline' },
          '&:focus-visible, &.Mui-focusVisible, &.ds-focus': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 2 },
          '&[aria-disabled="true"]': { color: s.textDisabled, textDecoration: 'none', cursor: 'not-allowed', pointerEvents: 'none' },
        },
        '& .MuiBreadcrumbs-li > [aria-current="page"]': { font: 'inherit', color: s.textSecondary },
        '& .MuiBreadcrumbs-li:has(> [aria-current="page"][aria-disabled="true"]) > *': { color: s.textDisabled },
      }
    },
    separator: ({ theme }) => ({ margin: `0 ${theme.tokens.space.xs}px 0 ${theme.tokens.space.xxs}px`, color: 'inherit', '& svg': { display: 'block' } }),
    li: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        // The chevron takes the state of the link before it.
        '&:has(> a:hover, > button:hover, > .ds-hover) + .MuiBreadcrumbs-separator': { color: s.textPrimary },
        '&:has(> [aria-disabled="true"]) + .MuiBreadcrumbs-separator': { color: s.textDisabled },
      }
    },
  },
}
