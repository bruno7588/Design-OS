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
    paper: ({ theme, ownerState }) => ({
      ...dialogPaperStyles(theme),
      // maxWidth="md" is the Figma Modal (7479:4350): 720px, sections 20px apart, centred.
      ...(ownerState.maxWidth === 'md' && {
        maxWidth: 720,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${theme.tokens.space.ml}px`,
        '&.MuiDialog-paperFullWidth': { width: `calc(100% - ${theme.tokens.space.l * 2}px)` },
      }),
    }),
  },
}
