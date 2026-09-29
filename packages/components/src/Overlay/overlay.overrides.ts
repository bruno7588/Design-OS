import type { Components, Theme } from '@mui/material/styles'

// MuiDrawer theme overrides: the Figma Side Drawer (10871:12768). Implements the Side Drawer
// section of playground/docs/design-system/overlays.md. The Modal's surface is MuiDialog
// (dialog.overrides.ts): maxWidth="md" is the 720px Modal.
//
// A plain <Drawer anchor="right"> gets the 720px panel: Page-background, padding 20/24,
// sections 20px apart, no radius and no shadow, over the scrim.

export const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    root: ({ theme }) => ({ '& .MuiBackdrop-root': { backgroundColor: theme.tokens.semantic.scrim } }),
    paper: ({ theme, ownerState }) => {
      const t = theme.tokens
      const side = ownerState.anchor === 'left' || ownerState.anchor === 'right'
      return {
        backgroundColor: t.semantic.pageBackground,
        backgroundImage: 'none',
        boxShadow: 'none',
        color: t.semantic.textPrimary,
        ...(side && {
          width: 'min(720px, 100vw)',
          padding: `${t.space.ml}px ${t.space.l}px`,
          gap: t.space.ml,
        }),
      }
    },
  },
}
