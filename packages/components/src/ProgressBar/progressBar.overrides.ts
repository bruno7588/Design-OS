import type { Components, Theme } from '@mui/material/styles'

// MuiLinearProgress theme overrides (determinate): the Figma Progress bar (dark 7046:25097,
// light 12000:10067, Gamification page).
//
// A plain <LinearProgress variant="determinate" value={n}> renders it: an 8px Border track,
// fully rounded, with a Primary-600 fill that has a rounded end. At 100% the whole bar turns
// Success-500. Figma draws the fill in eighths (0, 12, 25… 87%); the reference shows the
// exact value.

export const MuiLinearProgress: Components<Theme>['MuiLinearProgress'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      height: 8,
      borderRadius: 20,
      backgroundColor: theme.tokens.semantic.border,
    }),
    bar: ({ theme, ownerState }) => {
      const p = theme.tokens.palette
      const done = ownerState.variant === 'determinate' && (ownerState.value ?? 0) >= 100
      return { borderRadius: 20, backgroundColor: done ? p.success[500] : p.primary[600] }
    },
  },
}
