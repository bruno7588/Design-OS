import type { TypographyVariantsOptions } from '@mui/material/styles'
import { fontFamily } from './tokens'

// Poppins scale from playground/docs/design-system/typography.md (Figma 5445:24009).
// Headings and buttons are Bold. Every 12px style is 1.2 line height except Button S (1.4).
export const typography: TypographyVariantsOptions = {
  fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: 32, fontWeight: 700, lineHeight: 1.5 },
  h2: { fontSize: 24, fontWeight: 700, lineHeight: 1.5 },
  h3: { fontSize: 20, fontWeight: 700, lineHeight: 1.5 },
  h4: { fontSize: 16, fontWeight: 700, lineHeight: 1.5 },
  h5: { fontSize: 14, fontWeight: 700, lineHeight: 1.5 },
  h6: { fontSize: 12, fontWeight: 700, lineHeight: 1.2 },
  // Paragraph L / M / S
  body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.2 },
  subtitle1: { fontSize: 16, fontWeight: 600, lineHeight: 1.5 },
  subtitle2: { fontSize: 14, fontWeight: 600, lineHeight: 1.5 },
  overline: undefined,
  button: { fontSize: 14, fontWeight: 700, lineHeight: 1.5, textTransform: 'none' },
}
