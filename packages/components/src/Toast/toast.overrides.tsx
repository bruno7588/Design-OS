import type { Components, Theme } from '@mui/material/styles'
import type { AlertProps } from '@mui/material/Alert'
import { Danger, TickCircle } from 'iconsax-react'
import { InfoOutlineIcon } from '../icons/FigmaIcons'

// MuiAlert theme overrides for variant="filled": the Figma Toast set (5045:14119).
// A plain <Alert variant="filled" severity="success"> renders the 5Mins toast body;
// ToastProvider places, stacks and times it. The standard and outlined variants are
// left free for the inline Alert.
//
//   severity info / success / warning / error → Type Information / Success / Warning / Error
//   icon={false}                              → Icon=False
//
// The fills don't change with the mode. Figma binds Information to the Border
// variable, which would put white text on pale grey in light mode, so the reference
// fixes it at Neutral-700, Figma's resolved value.

function fill(theme: Theme, severity: AlertProps['severity']) {
  const p = theme.tokens.palette
  return { info: p.neutral[700], success: p.success[500], warning: p.warning[600], error: p.danger[500] }[severity ?? 'success']
}

export const MuiAlert: Components<Theme>['MuiAlert'] = {
  defaultProps: {
    iconMapping: {
      success: <TickCircle color="currentColor" />,
      info: <InfoOutlineIcon size={24} />,
      warning: <Danger color="currentColor" />,
      error: <Danger color="currentColor" />,
    },
  },
  styleOverrides: {
    root: ({ ownerState, theme }) => {
      if (ownerState.variant !== 'filled') return {}
      const t = theme.tokens
      return {
        alignItems: 'center',
        gap: t.space.s,
        width: 'fit-content',
        maxWidth: 560,
        padding: `${t.space.sm}px ${t.space.m}px`,
        borderRadius: t.radius.sm,
        backgroundColor: fill(theme, ownerState.severity),
        color: t.palette.neutral[25],
        boxShadow: t.shadow.l,
        fontFamily: theme.typography.fontFamily,
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.5,
        '& .MuiAlert-icon': {
          margin: 0,
          padding: 0,
          opacity: 1,
          color: 'inherit',
          '& svg': { display: 'block', width: t.iconSize.lg, height: t.iconSize.lg },
        },
        '& .MuiAlert-message': { padding: 0, overflow: 'visible' },
        '& .MuiAlert-action': { margin: `0 0 0 ${t.space.xs}px`, padding: 0 },
        // The Undo action from the prototype: an underlined text button in the toast colour.
        '& .ds-toast-action': {
          font: 'inherit',
          color: 'inherit',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          borderRadius: t.radius.xs,
          '&:hover': { opacity: 0.8 },
          '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 3 },
        },
      }
    },
  },
}
