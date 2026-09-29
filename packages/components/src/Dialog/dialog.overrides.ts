import type { CSSObject } from '@emotion/react'
import type { Components, Theme } from '@mui/material/styles'

// MuiDialog theme overrides: the Dialog surface and scrim. Implements the Dialog
// section of playground/docs/design-system/overlays.md, cross-checked with the
// Figma Library Dialog set (dark 7789:24651, light 12242:5728).
// The confirmation layout (icon, title, text, buttons) lives in ConfirmDialog.

/** The Dialog surface. Also used to show the dialog inline in the docs. */
export function dialogPaperStyles(theme: Theme): CSSObject {
  const t = theme.tokens
  return {
    // Pixel strings, not numbers: this also runs through sx, where numbers are spacing steps.
    margin: `${t.space.l}px`,
    padding: `${t.space.l}px`,
    borderRadius: `${t.radius.sm}px`,
    backgroundColor: t.semantic.pageBackground,
    backgroundImage: 'none',
    boxShadow: t.shadow.l,
    color: t.semantic.textPrimary,
  }
}

export const MuiDialog: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiBackdrop-root': { backgroundColor: theme.tokens.semantic.scrim },
    }),
    paper: ({ theme }) => dialogPaperStyles(theme),
  },
}
