import type { CSSObject } from '@emotion/react'
import type { Theme } from '@mui/material/styles'

// The date field (Figma Calendar): the Input field box, with a few differences.
// Spread into the MuiTextField root; the picker's TextField has className "ds-date-field".
//   - The placeholder "dd/mm/yyyy" is Text-secondary (Text-disabled in other fields).
//   - It hugs "dd/mm/yyyy" (93px) and the icons, 8px apart.
//   - The calendar icon is Text-primary; in Error the Linear Danger icon before it is Text-error.
export function dateFieldStyles(theme: Theme): CSSObject {
  const s = theme.tokens.semantic
  return {
    '&.ds-date-field': {
      '& .MuiOutlinedInput-input::placeholder': { color: s.textSecondary },
      '&:not(.MuiFormControl-fullWidth) .MuiOutlinedInput-input': { width: 93 },
      '& .MuiInputAdornment-root': { gap: theme.tokens.space.s, color: s.textPrimary },
      '& .MuiInputAdornment-root .MuiIconButton-root': {
        padding: 0,
        margin: 0,
        color: s.textPrimary,
        '&:hover': { backgroundColor: 'transparent' },
        '&.Mui-focusVisible': { outline: `2px solid ${s.primaryButtonBackground}`, borderRadius: 4 },
      },
      '& .ds-date-error-icon': { color: s.textError, flexShrink: 0 },
    },
  }
}
