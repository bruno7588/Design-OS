import type { CSSObject } from '@emotion/react'
import type { AlertProps } from '@mui/material/Alert'
import type { Theme } from '@mui/material/styles'

// MuiAlert variant="standard": the inline Figma Alert set (dark 3658:32304, light 12060:2785).
// Implements the Alert and Callout sections of playground/docs/design-system/alerts-toast.md.
// Hooked into MuiAlert in toast.overrides.tsx, which owns variant="filled" (the Toast).
//
//   severity warning         → Type=Alert: Secondary-500 @ 12%, SemiBold Text-warning
//   any other severity       → Type=Callout: Input-background, Regular Text-secondary
//   AlertTitle               → Supporting text=true (the SemiBold line above the body)
//   action (a link Button)   → Button=true, at the end of the row
//   a Button in the message  → Button=true under supporting text (Outlined-2)
//   .ds-illustration icon    → Illustration=true; any other icon → Icon=true

export function inlineAlertStyles(theme: Theme, severity: AlertProps['severity']): CSSObject {
  const t = theme.tokens
  const s = t.semantic
  const alert = severity === 'warning'
  return {
    alignItems: 'center',
    gap: t.space.s,
    padding: `${t.space.s}px ${t.space.sm}px`,
    borderRadius: t.radius.sm,
    backgroundColor: alert ? s.alertBackground : s.inputBackground,
    color: alert ? s.textWarning : s.textSecondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: alert ? 600 : 400,
    lineHeight: 1.5,
    // With supporting text the row aligns to the top.
    '&:has(.MuiAlertTitle-root)': { alignItems: 'flex-start' },

    '& .MuiAlert-icon': {
      margin: 0,
      padding: 0,
      opacity: 1,
      color: 'inherit',
      '& svg': { display: 'block', width: t.iconSize.md, height: t.iconSize.md },
    },
    // Figma: the illustration sits 12px from an Alert title; the Danger icon 8px.
    ...(alert && { '& .MuiAlert-icon:has(.ds-illustration)': { marginRight: t.space.xs } }),
    '&:has(.MuiAlertTitle-root) .MuiAlert-icon:has(.ds-illustration)': { paddingTop: t.space.xxs },

    '& .MuiAlert-message': {
      display: 'flex',
      flexDirection: 'column',
      gap: t.space.s,
      flex: 1,
      minWidth: 0,
      padding: 0,
      overflow: 'visible',
    },
    '& .MuiAlertTitle-root': { margin: 0, font: 'inherit', fontWeight: 600, color: 'inherit' },
    '& .MuiAlert-message ul': { margin: 0, paddingLeft: t.space.ml },
    // The Outlined-2 button under supporting text: 16px below the body.
    '& .MuiAlert-message > .MuiButton-root': { alignSelf: 'flex-start', marginTop: t.space.s },

    // Alert keeps 24px between the title and its button; Callout 8px.
    '& .MuiAlert-action': {
      alignItems: 'center',
      margin: 0,
      marginLeft: alert ? t.space.m : 0,
      padding: 0,
    },
    '& .MuiAlert-action .MuiButton-root': { color: alert ? s.textWarning : s.textPrimary },
    '& .MuiAlert-action .MuiIconButton-root': { padding: 0, color: 'inherit' },
  }
}
