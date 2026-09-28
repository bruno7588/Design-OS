import type { FiveMinsTokens } from './tokens'

declare module '@mui/material/styles' {
  interface Theme {
    tokens: FiveMinsTokens
  }
  interface ThemeOptions {
    tokens?: FiveMinsTokens
  }
  interface Palette {
    ai: Palette['primary']
  }
  interface PaletteOptions {
    ai?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outlined2: true
    link: true
  }
  interface ButtonPropsColorOverrides {
    ai: true
  }
}
