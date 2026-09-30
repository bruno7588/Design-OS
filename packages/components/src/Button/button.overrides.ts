import { keyframes } from '@emotion/react'
import type { CSSObject } from '@emotion/react'
import type { ButtonProps } from '@mui/material/Button'
import type { Components, Theme } from '@mui/material/styles'
import type { FiveMinsTokens } from '../theme/tokens'

// MuiButton theme overrides. Implements playground/docs/design-system/buttons.md
// (Figma Library, light board 12016:14084, dark board 10825:3269).
//
// Everything is keyed on MUI's own props, so a plain <Button> from @mui/material
// renders the 5Mins button:
//   variant: contained (Filled) | outlined | outlined2 (Outlined-2) | text | link
//   color:   primary | error (Danger) | warning | success | ai
//   size:    small (33px) | medium (41px) | large (48px)
//
// Forced-state classes (ds-hover, ds-pressed, ds-focus) exist so docs and visual
// tests can show a state without a pointer. Product code never needs them.

const spin = keyframes`to { transform: rotate(360deg); }`

type Size = 'small' | 'medium' | 'large'
type Family = 'primary' | 'danger' | 'warning' | 'success' | 'ai'
type Shape = 'filled' | 'outlined' | 'outlined2' | 'text' | 'link'

function familyOf(color: ButtonProps['color']): Family {
  if (color === 'error') return 'danger'
  if (color === 'warning' || color === 'success' || color === 'ai') return color
  return 'primary'
}

function shapeOf(variant: ButtonProps['variant'], family: Family): Shape {
  const v = variant === 'contained' || variant === undefined ? 'filled' : variant
  if (family === 'primary') return v
  // Semantic families only have filled / outlined / text; AI only filled / outlined.
  if (v === 'outlined2') return 'outlined'
  if (family === 'ai') return v === 'filled' ? 'filled' : 'outlined'
  if (v === 'link') return 'text'
  return v
}

const HOVER = '&:hover, &.ds-hover'
const PRESSED = '&:active, &.ds-pressed'
const DISABLED = '&.Mui-disabled'

// Height comes from padding + line height: S 8+16.8+8 = 33, M 10+21+10 = 41, L 12+24+12 = 48.
// With a leading or trailing icon the icon side is one step tighter.
function sizeStyles(size: Size, t: FiveMinsTokens, hasIcon: boolean, borderWidth: number, hasEndIcon = false): CSSObject {
  const { space, iconSize } = t
  const spec = {
    small: { y: space.s, x: space.m, xIcon: space.sm, fontSize: 12, lineHeight: 1.4, gap: space.xs, icon: iconSize.sm },
    medium: { y: space.ssm, x: space.ml, xIcon: space.m, fontSize: 14, lineHeight: 1.5, gap: space.s, icon: iconSize.md },
    large: { y: space.sm, x: space.l, xIcon: space.ml, fontSize: 16, lineHeight: 1.5, gap: space.s, icon: iconSize.lg },
  }[size]
  const bw = borderWidth
  return {
    padding: `${spec.y - bw}px ${(hasEndIcon ? spec.xIcon : spec.x) - bw}px ${spec.y - bw}px ${(hasIcon ? spec.xIcon : spec.x) - bw}px`,
    fontSize: spec.fontSize,
    lineHeight: spec.lineHeight,
    gap: spec.gap,
    '& .MuiButton-startIcon svg, & .MuiButton-endIcon svg': { display: 'block', width: spec.icon, height: spec.icon },
  }
}

// Filled families: background ladder, label colour.
function filled(bg: string, hover: string, pressed: string, label: string, t: FiveMinsTokens): CSSObject {
  const s = t.semantic
  return {
    backgroundColor: bg,
    color: label,
    [HOVER]: { backgroundColor: hover },
    [PRESSED]: { backgroundColor: pressed },
    [DISABLED]: { backgroundColor: s.buttonBackgroundDisabled, color: s.textButtonDisabled },
  }
}

// Outlined families: transparent at rest, tint on hover, transparent on press.
function outlined(
  rest: string,
  hover: { fill: string; text: string; border: string },
  pressed: { text: string; border: string },
  t: FiveMinsTokens,
  restText = rest,
): CSSObject {
  return {
    backgroundColor: 'transparent',
    color: restText,
    borderColor: rest,
    [HOVER]: { backgroundColor: hover.fill, color: hover.text, borderColor: hover.border },
    [PRESSED]: { backgroundColor: 'transparent', color: pressed.text, borderColor: pressed.border },
    [DISABLED]: { backgroundColor: 'transparent', color: t.semantic.textDisabled, borderColor: t.semantic.textDisabled },
  }
}

function text(rest: string, hover: string, pressed: string, t: FiveMinsTokens): CSSObject {
  return {
    color: rest,
    [HOVER]: { color: hover, backgroundColor: 'transparent' },
    [PRESSED]: { color: pressed, backgroundColor: 'transparent' },
    [DISABLED]: { color: t.semantic.textDisabled },
  }
}

const aiGradient = (start: string, end: string) => `radial-gradient(circle at top left, ${start} 0%, ${end} 100%)`

function appearance(family: Family, shape: Shape, t: FiveMinsTokens): CSSObject {
  const s = t.semantic
  const p = t.palette
  const blaze = p.gamification.blazeQuiz
  const primaryPressed = { text: s.primaryButtonBackgroundPressed, border: s.primaryButtonBackgroundPressed }
  const primaryHover = { fill: s.buttonOutlineFillHover, text: s.textButtonHover, border: s.textButtonHover }

  switch (`${family}-${shape}`) {
    case 'primary-filled':
      return filled(s.primaryButtonBackground, s.primaryButtonBackgroundHover, s.primaryButtonBackgroundPressed, s.textButtonForeground, t)
    case 'primary-outlined':
      return outlined(s.textButtonOutlined, primaryHover, primaryPressed, t)
    case 'primary-outlined2':
      return outlined(s.borderElevated, primaryHover, primaryPressed, t, s.textPrimary)
    case 'primary-text':
      return text(s.primaryButtonBackground, s.primaryButtonBackgroundHover, s.primaryButtonBackgroundPressed, t)
    case 'primary-link':
      // Figma 10825:3269, Link updated 2026-09-28: Paragraph medium label (500) on the
      // filled-button colour ladder, underline at the font's own position.
      return {
        ...text(s.primaryButtonBackground, s.primaryButtonBackgroundHover, s.primaryButtonBackgroundPressed, t),
        fontWeight: 500,
        textDecoration: 'underline',
        textUnderlinePosition: 'from-font',
        [HOVER]: { color: s.primaryButtonBackgroundHover, textDecoration: 'underline', backgroundColor: 'transparent' },
      }

    case 'danger-filled':
      return filled(p.danger[500], s.buttonDangerHover, s.buttonDangerPressed, p.neutral[25], t)
    case 'danger-outlined':
      return outlined(
        p.danger[500],
        { fill: 'rgba(223, 22, 66, 0.24)', text: s.textError, border: s.textError },
        { text: s.buttonDangerHover, border: s.buttonDangerPressed },
        t,
      )
    case 'danger-text':
      return text(p.danger[500], s.textError, s.buttonDangerPressed, t)

    case 'warning-filled':
      return filled(s.buttonWarningBackground, s.buttonWarningBackgroundHover, s.buttonWarningBackgroundPressed, p.neutral[25], t)
    case 'warning-outlined':
      return outlined(
        s.buttonWarningBackground,
        { fill: 'rgba(255, 165, 56, 0.24)', text: s.textWarning, border: s.textWarning },
        { text: s.buttonWarningBackgroundPressed, border: s.buttonWarningBackgroundPressed },
        t,
      )
    case 'warning-text':
      return text(s.buttonWarningBackground, s.textWarning, s.buttonWarningBackgroundPressed, t)

    case 'success-filled':
      return filled(s.buttonSuccessBackground, s.buttonSuccessBackgroundHover, s.buttonSuccessBackgroundPressed, p.neutral[25], t)
    case 'success-outlined':
      return outlined(
        s.buttonSuccessBackground,
        { fill: 'rgba(24, 169, 87, 0.24)', text: s.buttonSuccessBackground, border: s.buttonSuccessBackgroundHover },
        { text: s.buttonSuccessBackgroundPressed, border: s.buttonSuccessBackgroundPressed },
        t,
      )
    case 'success-text':
      return text(s.buttonSuccessBackground, s.textSuccess, s.buttonSuccessBackgroundPressed, t)

    case 'ai-filled':
      return {
        background: aiGradient(s.primaryButtonBackground, blaze),
        color: p.neutral[25],
        [HOVER]: {
          background: aiGradient(s.primaryButtonBackgroundHover, blaze),
          boxShadow: `inset 0 0 0 2px ${p.primary[500]}`,
          filter: 'drop-shadow(1px 1px 16px rgba(129, 88, 236, 0.5))',
        },
        [PRESSED]: {
          background: aiGradient(s.primaryButtonBackgroundPressed, blaze),
          boxShadow: `inset 0 0 0 1px ${p.primary[500]}`,
          filter: 'none',
        },
        [DISABLED]: { background: s.buttonBackgroundDisabled, color: s.textButtonDisabled },
      }
    case 'ai-outlined': {
      // The 1px stroke and the label are the AI gradient. The ring is a masked
      // pseudo-element because the button is transparent at rest.
      const ring = (start: string) => ({ background: aiGradient(start, blaze) })
      const label = (start: string) => ({ backgroundImage: aiGradient(start, blaze) })
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          padding: 1,
          ...ring(s.textButtonOutlined),
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        },
        '& .ds-btn-label': {
          ...label(s.textButtonOutlined),
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        },
        // background-clip: text has no glyphs to paint on an SVG, so icons take the first stop.
        '& .MuiButton-startIcon > svg': { color: s.textButtonOutlined },
        [HOVER]: {
          background: aiGradient(`color-mix(in srgb, ${s.primaryButtonBackgroundHover} 24%, transparent)`, 'rgba(129, 88, 236, 0.24)'),
          boxShadow: '1px 1px 32px 0 rgba(129, 88, 236, 0.16)',
          '&::before': ring(s.textButtonHover),
          '& .ds-btn-label': label(s.textButtonHover),
        },
        [PRESSED]: {
          background: 'transparent',
          boxShadow: 'none',
          '&::before': ring(s.primaryButtonBackgroundPressed),
          '& .ds-btn-label': label(s.primaryButtonBackgroundPressed),
        },
        [DISABLED]: {
          background: s.buttonBackgroundDisabled,
          color: s.textButtonDisabled,
          '&::before': { display: 'none' },
          '& .ds-btn-label': { background: 'none', color: s.textButtonDisabled },
          '& .MuiButton-startIcon > svg': { color: s.textButtonDisabled },
        },
      }
    }
  }
  return {}
}

export function buttonStyles(ownerState: ButtonProps, t: FiveMinsTokens): CSSObject {
  const family = familyOf(ownerState.color)
  const shape = shapeOf(ownerState.variant, family)
  const size = (ownerState.size ?? 'medium') as Size
  const bare = shape === 'text' || shape === 'link'
  const bordered = shape === 'outlined' || shape === 'outlined2'

  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    border: bordered ? '1px solid transparent' : 'none',
    borderRadius: t.radius.sm,
    fontWeight: 700,
    textTransform: 'none',
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
    '& .MuiButton-startIcon, & .MuiButton-endIcon': { margin: 0, display: 'inline-flex' },
    ...sizeStyles(size, t, Boolean(ownerState.startIcon), bordered ? 1 : 0, Boolean(ownerState.endIcon)),
    ...(bare && { padding: 0, backgroundColor: 'transparent' }),
    ...appearance(family, shape, t),
    // Link Small is Paragraph S medium: 12px at 1.2, not Button S's 1.4.
    ...(shape === 'link' && size === 'small' && { lineHeight: 1.2 }),

    '&.Mui-focusVisible, &.ds-focus': {
      outline: `2px solid ${t.semantic.primaryButtonBackground}`,
      outlineOffset: 2,
    },

    // Loading: label and icon keep their space (so the width holds) but hide,
    // and a 20px currentColor spinner sits in the centre.
    '&.ds-loading': {
      '& .ds-btn-label, & .MuiButton-startIcon': { visibility: 'hidden' },
    },
    '& .ds-btn-spinner': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 20,
      height: 20,
      margin: -10,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: `${spin} 0.8s linear infinite`,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      '& .ds-btn-spinner': { animationDuration: '1.6s' },
    },
  }
}

export const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disableRipple: true,
    disableElevation: true,
  },
  styleOverrides: {
    root: ({ ownerState, theme }) => buttonStyles(ownerState, theme.tokens) as never,
  },
}
