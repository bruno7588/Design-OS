import type { CSSObject } from '@emotion/react'
import type { Components, Theme } from '@mui/material/styles'

// The Integer, Radio button and Inline inputs. Figma Library, Input page:
// Input field/Integer (dark 10145:10895, light 12114:20914),
// Input field/Radio button (dark 8974:30479, light 12114:20857),
// Input field/Inline (dark 10330:4736, light 12114:20828).
//
// Integer and Radio button are the Input field box (field.overrides.tsx) with a class:
//   <OutlinedInput className="ds-integer">      the − value + stepper
//   <OutlinedInput className="ds-radio-input">  a 21px radio before the text
// Inline is a borderless InputBase:
//   <InputBase className="ds-inline-title">       Bold 32
//   <InputBase className="ds-inline-description"> Regular 16
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.

const OUTLINE = '& .MuiOutlinedInput-notchedOutline'
const HOVER = ':hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error)'

/** Spread into the MuiOutlinedInput root, after the Input field rules. */
export function inputTypeStyles(theme: Theme): CSSObject {
  const t = theme.tokens
  const s = t.semantic
  return {
    // Integer: hugs its content, 12px between − value +. Hover turns the border
    // Border-hover but leaves the box unfilled: the halo on the button is the hover.
    '&.ds-integer': {
      gap: t.space.sm,
      width: 'fit-content',
      '& .MuiOutlinedInput-input': { width: 26, textAlign: 'center' },
      '&.Mui-disabled': { [OUTLINE]: { borderColor: s.border } },
    },
    [`&.ds-integer${HOVER}, &.ds-integer.ds-hover`]: { backgroundColor: 'transparent' },
    // Forced hover for docs: the Figma Hover variant has the halo on +.
    '&.ds-integer.ds-hover .MuiInputAdornment-positionEnd .ds-integer-step': { backgroundColor: s.pageBackgroundHover },
    // The − and + buttons: 20px icons with a 24px round halo that doesn't grow the 37px box.
    '& .ds-integer-step': {
      width: 24,
      height: 24,
      margin: -t.space.xxs,
      padding: t.space.xxs,
      borderRadius: t.radius.full,
      color: s.textSecondary,
      '& svg': { width: t.iconSize.md, height: t.iconSize.md },
      '&:hover, &.ds-hover': { backgroundColor: s.pageBackgroundHover },
      '&.Mui-disabled': { color: s.textDisabled },
      '&.Mui-focusVisible': { outline: `2px solid ${s.primaryButtonBackground}` },
    },

    // Radio button: the radio is 21px, as in Figma, so the box stays 37px.
    '&.ds-radio-input': {
      '& .MuiRadio-root': { width: 21, height: 21, padding: 0 },
      '& .MuiRadio-root svg': { width: 21, height: 21 },
      '&.Mui-disabled': { [OUTLINE]: { borderColor: s.border } },
      // Figma Validation=success: the selected radio turns Success-500. No icon.
      '&.ds-success .MuiRadio-root.Mui-checked': { color: t.palette.success[500] },
    },
    // Hovering the field shows the radio's halo, as in the Figma Hover variant.
    [`&.ds-radio-input${HOVER} .MuiRadio-root:not(.Mui-disabled), &.ds-radio-input.ds-hover .MuiRadio-root`]: {
      backgroundColor: s.pageBackgroundHover,
    },
  }
}

/** Integer helper text is Text-secondary (the Input field's is Text-tertiary). */
export function integerHelperStyles(theme: Theme): CSSObject {
  return {
    '&:has(> .ds-integer) > .MuiFormHelperText-root:not(.Mui-error):not(.Mui-disabled)': {
      color: theme.tokens.semantic.textSecondary,
    },
  }
}

// Inline: no box and no label; the text style is the field. Placeholders are
// Text-disabled. Filled, the title is Text-primary and the description Text-secondary.
export const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const s = theme.tokens.semantic
      const text: CSSObject = {
        padding: 0,
        height: 'auto',
        '&::placeholder': { color: s.textDisabled, opacity: 1 },
      }
      return {
        '&.ds-inline-title, &.ds-inline-description': {
          padding: 0,
          fontFamily: theme.typography.fontFamily,
          lineHeight: 1.5,
          '& .MuiInputBase-input': text,
          '&.Mui-disabled': { color: s.textDisabled, '& .MuiInputBase-input': { WebkitTextFillColor: s.textDisabled } },
        },
        '&.ds-inline-title': {
          fontSize: 32,
          fontWeight: 700,
          color: s.textPrimary,
          '&.Mui-error': { color: s.textError },
        },
        '&.ds-inline-description': { fontSize: 16, fontWeight: 400, color: s.textSecondary },
      }
    },
  },
}
