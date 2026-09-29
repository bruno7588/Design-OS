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
    progress: Palette['primary']
    new: Palette['primary']
  }
  interface PaletteOptions {
    ai?: PaletteOptions['primary']
    progress?: PaletteOptions['primary']
    new?: PaletteOptions['primary']
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

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    badge: true
  }
  interface ChipPropsColorOverrides {
    progress: true
    new: true
  }
}
