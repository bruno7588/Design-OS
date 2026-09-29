import type { CSSObject } from '@emotion/react'
import type { Components, Theme } from '@mui/material/styles'
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  CheckboxIndeterminateIcon,
  RadioCheckedIcon,
  RadioIcon,
} from '../icons/FigmaIcons'

// MuiCheckbox, MuiRadio, MuiSwitch and MuiFormControlLabel theme overrides. Implements
// playground/docs/design-system/selection-controls.md, cross-checked with the Figma Library:
// Checkbox (dark 6339:10484, light 11917:3924), radio-button (dark 5001:18926, light 11917:3950)
// and Toggle (dark 8160:364, light 11917:3970). Where they disagree, Figma wins.
//
// Plain MUI renders the 5Mins controls, so there are no wrappers:
//   Checked=Checked / Indeterminate → checked / indeterminate
//   Selected=true (radio)           → checked
//   Toggle=true                     → <Switch checked>
//   State=Hover                     → :hover (or hovering the label)
//   Disabled                        → disabled
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.

// Checkbox and radio share the round hover halo and the colours.
function controlStyles(theme: Theme, halo: number, glyph: number): CSSObject {
  const t = theme.tokens
  const s = t.semantic
  return {
    width: halo,
    height: halo,
    padding: (halo - glyph) / 2,
    borderRadius: t.radius.full,
    color: s.textPrimary,
    transition: 'background-color 120ms',
    '& svg': { display: 'block' },
    '&:hover, &.ds-hover': { backgroundColor: s.pageBackgroundHover },
    '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: s.selected },
    '&.Mui-disabled': { color: s.textDisabled, backgroundColor: 'transparent' },
    // Disabled is Text-disabled whatever the value, indeterminate included.
    // Figma has no focus frames: the ring the other components use, on the halo.
    '&.Mui-focusVisible, &.ds-focus': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 0 },
  }
}

// Figma: the halo is 32px round the 16px box, 24px round the 15px ring.
export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  defaultProps: {
    disableRipple: true,
    icon: <CheckboxIcon />,
    checkedIcon: <CheckboxCheckedIcon />,
    indeterminateIcon: <CheckboxIndeterminateIcon />,
  },
  styleOverrides: { root: ({ theme }) => controlStyles(theme, 32, 16) },
}

export const MuiRadio: Components<Theme>['MuiRadio'] = {
  defaultProps: { disableRipple: true, icon: <RadioIcon />, checkedIcon: <RadioCheckedIcon /> },
  styleOverrides: { root: ({ theme }) => controlStyles(theme, 24, 24) },
}

// Figma Toggle: a 36×20 track, a 16px Neutral-25 thumb 2px in, no shadow and no hover.
// Off is Text-disabled, on is Selected. Figma has no disabled toggle: disabled is
// Text-disabled, on or off (Bruno, 2026-09-29), like the disabled checkbox and radio.
export const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      const p = t.palette
      return {
        width: 36,
        height: 20,
        padding: 0,
        overflow: 'visible',
        '& .MuiSwitch-switchBase': {
          padding: t.space.xxs,
          '&:hover': { backgroundColor: 'transparent' },
          '&.Mui-checked': { transform: 'translateX(16px)' },
          '&.Mui-checked + .MuiSwitch-track': { backgroundColor: s.selected, opacity: 1 },
          '&.Mui-disabled + .MuiSwitch-track': { backgroundColor: s.textDisabled, opacity: 1 },
        },
        '& .Mui-focusVisible + .MuiSwitch-track, &.ds-focus .MuiSwitch-track': {
          outline: `2px solid ${s.primaryButtonBackground}`,
          outlineOffset: 2,
        },
        '& .MuiSwitch-thumb': { width: 16, height: 16, boxShadow: 'none', backgroundColor: p.neutral[25] },
        '& .MuiSwitch-track': {
          borderRadius: 10,
          backgroundColor: s.textDisabled,
          opacity: 1,
          transition: 'background-color 150ms',
        },
      }
    },
  },
}

// A control with its label. The glyph lines up with the text above it and sits 12px
// from the label, as in the Figma list rows. Hovering the label shows the halo.
export const MuiFormControlLabel: Components<Theme>['MuiFormControlLabel'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        marginLeft: 0,
        marginRight: 0,
        gap: t.space.s,
        '&.MuiFormControlLabel-labelPlacementStart': { marginLeft: 0, marginRight: 0 },
        '&:has(> .MuiCheckbox-root)': { marginLeft: -t.space.s, gap: t.space.xs },
        '&:has(> .MuiRadio-root)': { marginLeft: -t.space.xs, gap: t.space.s },
        '&:hover > .MuiCheckbox-root:not(.Mui-disabled), &:hover > .MuiRadio-root:not(.Mui-disabled)': {
          backgroundColor: s.pageBackgroundHover,
        },
      }
    },
    label: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        color: s.textPrimary,
        '&.Mui-disabled': { color: s.textDisabled },
      }
    },
  },
}

// The group label (a fieldset legend): the field label look, as MuiInputLabel.
// It sits 8px above the first glyph (4px plus the halo's inset).
export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.5,
        color: s.textSecondary,
        '&.Mui-focused': { color: s.textSecondary },
        '&.Mui-error': { color: s.textError },
        '&.Mui-disabled': { color: s.textDisabled },
        'legend&': { padding: 0, marginBottom: t.space.xs },
      }
    },
  },
}
