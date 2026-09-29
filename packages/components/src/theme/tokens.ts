// 5Mins design tokens. The only place raw values live.
// Source: playground/src/styles/tokens.css (the 5mins-prototype reference),
// cross-checked against the Figma Library variables (file EC26cSVe9KNTCWXvYovakw,
// light board 8889:10831, dark board 10825:3269) on 2026-09-28.
// Names follow the Figma variables, camel-cased.

export const palette = {
  primary: { 100: '#CCF8FD', 200: '#99F1FB', 300: '#66E9F9', 400: '#33E2F7', 500: '#00CEE6', 600: '#00AFC4', 700: '#008393', 800: '#005862', 900: '#002C31' },
  secondary: { 100: '#FFF8EB', 200: '#FFF1D7', 300: '#FFE4AF', 400: '#FFCF74', 500: '#FFBB38', 600: '#EDA30D', 700: '#664B16', 800: '#33250B', 900: '#191306' },
  success: { 100: '#E8F6EE', 200: '#D1EEDD', 300: '#A3DDBC', 400: '#5DC389', 500: '#18A957', 600: '#11763D', 700: '#0A4423', 800: '#052211', 900: '#021109' },
  warning: { 100: '#FFEDD7', 200: '#FFDBAF', 300: '#FFC988', 400: '#FFB760', 500: '#FFA538', 600: '#E88206', 700: '#996322', 800: '#664216', 900: '#33210B' },
  danger: { 100: '#FCE8EC', 200: '#F9D0D9', 300: '#F2A2B3', 400: '#E95C7B', 500: '#DF1642', 600: '#9C0F2E', 700: '#59091A', 800: '#2D040D', 900: '#160207' },
  neutral: { 0: '#FFFFFF', 25: '#F9F9FA', 50: '#EFF0F2', 100: '#DFE1E6', 200: '#BFC2CC', 300: '#9EA4B3', 400: '#656B7C', 500: '#454C5E', 600: '#383D4C', 700: '#2D313D', 800: '#20222A', 900: '#0F1014' },
  gamification: { blazeQuiz: '#8158EC', flashPoll: '#9B55C9', lessonQuiz: '#FA715F', certificateQuiz: '#6368DB', courseAssessments: '#2A90D8' },
} as const

const p = palette

// Semantic tokens: same names in both modes, different values.
const light = {
  pageBackground: p.neutral[25],
  pageBackgroundHover: p.neutral[50],
  cardsBackground: p.neutral[0],
  cardsBackgroundHover: p.neutral[50],
  inputBackground: 'rgba(191, 194, 204, 0.16)',
  inputBackgroundHover: p.neutral[100],
  border: p.neutral[100],
  borderElevated: p.neutral[100],
  borderHover: p.neutral[300],
  tooltipBackground: p.neutral[800],
  textPrimary: p.neutral[800],
  textSecondary: p.neutral[500],
  textTertiary: p.neutral[400],
  textDisabled: p.neutral[300],
  textSuccess: p.success[600],
  textWarning: p.warning[600],
  textError: p.danger[500],
  textSelected: p.secondary[600],
  textProgress: p.primary[700],
  // Badge fills: 16% tints, the same in both modes (Figma Badge set).
  badgeSuccessBackground: 'rgba(24, 169, 87, 0.16)', // Success-500 @ 16%
  badgeWarningBackground: 'rgba(255, 165, 56, 0.16)', // Warning-500 @ 16%
  badgeErrorBackground: 'rgba(223, 22, 66, 0.16)', // Danger-500 @ 16%
  badgeProgressBackground: 'rgba(0, 206, 230, 0.16)', // Primary-500 @ 16%
  primaryButtonBackground: p.primary[700],
  primaryButtonBackgroundHover: p.primary[800],
  primaryButtonBackgroundPressed: p.primary[900],
  buttonBackgroundDisabled: p.neutral[100],
  buttonDangerHover: p.danger[600],
  buttonDangerPressed: p.danger[700],
  buttonWarningBackground: p.warning[600],
  buttonWarningBackgroundHover: p.warning[700],
  buttonWarningBackgroundPressed: p.warning[800],
  buttonSuccessBackground: p.success[500],
  buttonSuccessBackgroundHover: p.success[600],
  buttonSuccessBackgroundPressed: p.success[700],
  textButtonForeground: p.neutral[25],
  textButtonDisabled: p.neutral[300],
  textButtonHover: p.primary[700],
  textButtonOutlined: p.primary[700],
  buttonOutlineFillHover: 'rgba(0, 206, 230, 0.16)', // Primary-500 @ 16%
  selected: p.secondary[600],
  // Selected chip fill: Secondary-500 in both modes (Figma Chips), unlike `selected`.
  chipSelectedBackground: p.secondary[500],
  textOnSelected: p.neutral[800],
  // Figma Alert (Type=Alert) fill: Secondary-500 @ 12% in both modes, not bound to a variable.
  // alerts-toast.md says Warning-500 @ 16% in one place and this value in another.
  alertBackground: 'rgba(255, 187, 56, 0.12)',
  // Figma variables Selected-row and Selected-row-hover (Surface colours): Secondary-500 at 16%
  // and 24%, the same in both modes. The prototype uses the #EDA30D amber instead.
  rowSelected: 'rgba(255, 187, 56, 0.16)',
  rowSelectedHover: 'rgba(255, 187, 56, 0.24)',
  scrim: 'rgba(15, 16, 20, 0.25)',
}

export type SemanticTokens = { [K in keyof typeof light]: string }

const dark: SemanticTokens = {
  ...light,
  pageBackground: p.neutral[800],
  pageBackgroundHover: p.neutral[700],
  cardsBackground: p.neutral[700],
  cardsBackgroundHover: p.neutral[600],
  inputBackground: 'rgba(69, 76, 94, 0.16)',
  inputBackgroundHover: p.neutral[700],
  // Figma: Border is Neutral-700, Border-elevated Neutral-600 (Bruno, 2026-09-29).
  // The prototype's tokens.css uses Neutral-600 for both, so borders show on cards.
  border: p.neutral[700],
  borderElevated: p.neutral[600],
  tooltipBackground: p.neutral[900],
  textPrimary: p.neutral[25],
  textSecondary: p.neutral[200],
  textTertiary: p.neutral[300],
  textDisabled: p.neutral[400],
  textSuccess: p.success[500],
  textWarning: p.warning[500],
  textError: p.danger[400],
  textSelected: p.secondary[500],
  textProgress: p.primary[500],
  primaryButtonBackground: p.primary[500],
  primaryButtonBackgroundHover: p.primary[400],
  // Figma's dark Primary-button-background-pressed is #00AFC4 (Primary-600).
  // The prototype's tokens.css still has Primary-700.
  primaryButtonBackgroundPressed: p.primary[600],
  buttonBackgroundDisabled: p.neutral[400],
  textButtonForeground: p.neutral[800],
  textButtonHover: p.primary[400],
  textButtonOutlined: p.primary[500],
  selected: p.secondary[500],
  scrim: 'rgba(15, 16, 20, 0.5)',
}

export const semantic = { light, dark }

// Spacing scale in px (4px base, with the 2/6/10px micro steps).
export const space = { xxs: 2, xs: 4, xss: 6, s: 8, ssm: 10, sm: 12, m: 16, ml: 20, l: 24, xl: 32, xxl: 40 } as const

export const radius = { none: 0, xs: 4, s: 8, sm: 12, m: 16, ml: 20, l: 24, full: 9999 } as const

export const iconSize = { sm: 16, md: 20, lg: 24, xl: 32 } as const

export const shadow = {
  s: '-1px -1px 4px 0 rgba(32, 34, 42, 0.04), 1px 1px 4px 0 rgba(32, 34, 42, 0.04)',
  // Figma Shadow L (checked on the Dialog set, 2026-09-28). The prototype's tokens.css has 4px 4px 24px.
  l: '-4px 0 24px 0 rgba(32, 34, 42, 0.12)',
  xl: '0 4px 32px 0 rgba(32, 34, 42, 0.24)',
  panel: '-24px 0px 24px 0px rgba(32, 34, 42, 0.04)',
} as const

export const fontFamily = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

export type Mode = 'light' | 'dark'

export interface FiveMinsTokens {
  mode: Mode
  palette: typeof palette
  semantic: SemanticTokens
  space: typeof space
  radius: typeof radius
  iconSize: typeof iconSize
  shadow: typeof shadow
}

export function tokensFor(mode: Mode): FiveMinsTokens {
  return { mode, palette, semantic: semantic[mode], space, radius, iconSize, shadow }
}
