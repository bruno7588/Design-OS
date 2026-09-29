import type { CSSObject } from '@emotion/react'
import type { Components, Theme } from '@mui/material/styles'
import { ArrowDown2 } from 'iconsax-react'
import { inputTypeStyles, integerHelperStyles } from '../InputField/inputTypes.overrides'
import { dateFieldStyles } from '../Calendar/dateField.styles'

// Theme overrides shared by the text fields: Input field, Search and Dropdown.
// Figma Library: Input field/Outlined (8974:24610, 12114:20561), Search (697:33529,
// 11927:6338), Dropdown (8925:1408, 12113:14844), Listbox and List itens (9162:1042, 9162:941).
//
// A plain <TextField label helperText error> renders the Figma field: the label sits
// above (no floating label), then the 37px box, then the helper, 8px apart.
// <TextField select> is the Dropdown, and every MUI Menu gets the Listbox look.
// Search is an OutlinedInput with className="ds-search"; size small = M, medium = L.
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.

const HOVER = '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error), &.ds-hover'
const OUTLINE = '& .MuiOutlinedInput-notchedOutline'

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: { variant: 'outlined' },
  styleOverrides: {
    root: ({ theme }) => ({
      gap: theme.tokens.space.s,
      // Figma "Label start": the label beside the field, 12px away.
      '&.ds-label-start': {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.tokens.space.sm,
        '& > .MuiInputLabel-root': { flexShrink: 0, overflow: 'visible' },
        '& > .MuiInputBase-root': { flex: 1, minWidth: 0 },
      },
      ...integerHelperStyles(theme),
      ...dateFieldStyles(theme),
    }),
  },
}

export const MuiInputLabel: Components<Theme>['MuiInputLabel'] = {
  defaultProps: { shrink: true },
  styleOverrides: {
    root: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        position: 'static',
        transform: 'none',
        maxWidth: 'none',
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.5,
        color: s.textSecondary,
        '&.Mui-focused': { color: s.textSecondary },
        '&.Mui-error': { color: s.textError },
        '&.Mui-disabled': { color: s.textDisabled },
      }
    },
  },
}

export const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        margin: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        color: s.textTertiary,
        '&.Mui-error': { color: s.textError },
        '&.Mui-disabled': { color: s.textDisabled },
      }
    },
  },
}

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  defaultProps: { notched: false },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        // The border is the outline, drawn inside the 37px box as in Figma.
        padding: `0 ${t.space.sm}px`,
        gap: t.space.s,
        borderRadius: t.radius.sm,
        backgroundColor: 'transparent',
        color: s.textPrimary,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        transition: 'background-color 150ms, border-color 150ms',
        '& .MuiOutlinedInput-input': {
          padding: `${t.space.s}px 0`,
          height: 'auto',
          lineHeight: 1.5,
          '&::placeholder': { color: s.textDisabled, opacity: 1 },
        },
        [OUTLINE]: {
          top: 0,
          borderColor: s.borderElevated,
          borderWidth: 1,
          borderRadius: t.radius.sm,
          transition: 'border-color 150ms',
          '& legend': { display: 'none' },
        },
        [HOVER]: {
          backgroundColor: s.inputBackground,
          [OUTLINE]: { borderColor: s.borderHover },
        },
        '&.Mui-focused, &.ds-focus': { [OUTLINE]: { borderColor: s.selected, borderWidth: 1 } },
        '&.Mui-error': { [OUTLINE]: { borderColor: s.textError } },
        '&.Mui-disabled': {
          color: s.textDisabled,
          '& .MuiOutlinedInput-input': { WebkitTextFillColor: s.textDisabled },
          [OUTLINE]: { borderColor: s.borderElevated },
        },
        // Icons in the field: 20px, in the text colour unless they set their own.
        '& .MuiInputAdornment-root': { margin: 0, color: 'inherit', height: 'auto', maxHeight: 'none' },
        '& .MuiInputAdornment-root svg': { display: 'block', width: t.iconSize.md, height: t.iconSize.md },
        // The error and success icons sit 24px from the text.
        '& .ds-validation-icon': { marginLeft: t.space.m },
        '& .ds-validation-icon.ds-error': { color: s.textError },
        '& .ds-validation-icon.ds-success': { color: s.textSuccess },

        // Dropdown: Read-only and disabled use the quieter Border.
        '&.Mui-disabled:has(.MuiSelect-select)': { [OUTLINE]: { borderColor: s.border } },
        // Dropdown with an end icon (the error icon): it sits 8px before the chevron.
        '&:has(.MuiSelect-select):has(.MuiInputAdornment-positionEnd)': {
          '& .MuiSelect-select': { paddingRight: '0 !important' },
          '& .MuiInputAdornment-positionEnd': { marginRight: `${t.iconSize.md + t.space.s}px` },
        },

        // Search: a filled field. M is size small, L is size medium.
        '&.ds-search': {
          backgroundColor: s.inputBackground,
          [OUTLINE]: { borderColor: s.border },
          '& .MuiInputAdornment-root': { color: s.textTertiary },
          '& .ds-search-clear': { color: s.textSecondary },
        },
        '&.ds-search:hover:not(.Mui-focused), &.ds-search.ds-hover': {
          backgroundColor: s.inputBackgroundHover,
          [OUTLINE]: { borderColor: s.borderHover },
        },
        '&.ds-search.Mui-focused, &.ds-search.ds-focus': {
          backgroundColor: s.inputBackground,
          [OUTLINE]: { borderColor: s.selected },
        },
        '&.ds-search.MuiInputBase-sizeSmall .MuiInputAdornment-positionStart svg': { width: 18, height: 18 },
        // MUI only marks size small with a class, so L is the search that isn't small.
        '&.ds-search:not(.MuiInputBase-sizeSmall)': {
          padding: `0 ${t.space.m}px`,
          gap: t.space.sm,
          borderRadius: t.radius.m,
          fontSize: 16,
          [OUTLINE]: { borderRadius: t.radius.m },
          '& .MuiOutlinedInput-input': { padding: `${t.space.sm}px 0` },
          '& .ds-search-clear svg': { width: t.iconSize.lg, height: t.iconSize.lg },
        },
        '& input[type="search"]::-webkit-search-cancel-button': { display: 'none' },
        // Integer and Radio button (inputTypes.overrides.ts).
        ...inputTypeStyles(theme),
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }
    },
  },
}

export const MuiSelect: Components<Theme>['MuiSelect'] = {
  defaultProps: {
    IconComponent: (props: { className?: string }) => <ArrowDown2 color="currentColor" {...props} />,
    MenuProps: { transitionDuration: 150 },
  },
  styleOverrides: {
    select: ({ theme }) => ({
      minHeight: 0,
      // Room for the 20px chevron and its 8px gap.
      paddingRight: `${theme.tokens.space.xl - 4}px !important`,
    }),
    icon: ({ theme }) => ({
      right: theme.tokens.space.sm,
      top: 'calc(50% - 10px)',
      width: theme.tokens.iconSize.md,
      height: theme.tokens.iconSize.md,
      color: theme.tokens.semantic.textSecondary,
      transition: 'transform 150ms',
      '&.Mui-disabled': { color: theme.tokens.semantic.textDisabled },
    }),
  },
}

// Every MUI Menu gets the Figma Listbox: Cards-background, Border-elevated, radius 12,
// padding 8, Shadow L; rows 37px with radius 8.
/** The menu surface. Also used to show a menu in place in the docs. Pixel strings, as it also runs through sx. */
export function menuPaperStyles(theme: Theme): CSSObject {
  const t = theme.tokens
  return {
    backgroundColor: t.semantic.cardsBackground,
    backgroundImage: 'none',
    border: `1px solid ${t.semantic.borderElevated}`,
    borderRadius: `${t.radius.sm}px`,
    boxShadow: t.shadow.l,
    maxHeight: '320px',
  }
}

// Figma Listbox Caret=true: a 16 × 8 Cards-background triangle with a 1px Border edge, 24px
// from the end, on the side that faces the field. Put ds-menu-caret-bottom (the menu opens
// below the field) or ds-menu-caret-top on the menu paper. The list scrolls instead of the
// paper, so the caret isn't clipped.
export function menuCaretStyles(theme: Theme, side: 'top' | 'bottom'): CSSObject {
  const t = theme.tokens
  const up = side === 'bottom'
  return {
    overflow: 'visible',
    maxHeight: 'none',
    marginTop: up ? `${t.space.sm}px` : `-${t.space.sm}px`,
    '& .MuiMenu-list': { maxHeight: '302px', overflowY: 'auto' },
    '&::before': {
      content: '""',
      position: 'absolute',
      right: `${t.space.l}px`,
      [up ? 'top' : 'bottom']: -8,
      width: 16,
      height: 8,
      backgroundColor: t.semantic.cardsBackground,
      clipPath: up ? 'polygon(0 100%, 50% 0, 100% 100%)' : 'polygon(0 0, 50% 100%, 100% 0)',
      filter: `drop-shadow(0 ${up ? -1 : 1}px 0 ${t.semantic.borderElevated})`,
    },
  }
}

export const MuiMenu: Components<Theme>['MuiMenu'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      ...menuPaperStyles(theme),
      marginTop: `${theme.tokens.space.xs}px`,
      '&.ds-menu-caret-bottom': menuCaretStyles(theme, 'bottom'),
      '&.ds-menu-caret-top': menuCaretStyles(theme, 'top'),
    }),
    list: ({ theme }) => menuListStyles(theme),
  },
}

/** The menu list: padding 8, and the Figma Listbox groups (Wrapping menu itens=true). Also for docs. */
export function menuListStyles(theme: Theme): CSSObject {
  const t = theme.tokens
  return {
    padding: `${t.space.s}px`,
    // Group titles (Figma List/Item): SemiBold 14/1.5 in Text-tertiary, padding 8/4; 12 on top
    // after a divider. A plain <ListSubheader> inside a Menu gets it.
    '& .MuiListSubheader-root': {
      position: 'static',
      padding: `${t.space.s}px ${t.space.xs}px`,
      backgroundColor: 'transparent',
      fontFamily: theme.typography.fontFamily,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
      color: t.semantic.textTertiary,
    },
    // Between groups: a Border divider inset 4px, 4px above and below.
    '& .MuiDivider-root': { margin: `${t.space.xs}px`, borderColor: t.semantic.border },
    '& .MuiDivider-root + .MuiListSubheader-root': { paddingTop: `${t.space.sm}px` },
    // In a Select, a later group title draws the divider itself (a Divider there would become an
    // option): 4px gap, the 1px Border line inset 4px, 4px gap, then the title's 12px padding.
    '& .MuiListSubheader-root.ds-group-divided': {
      position: 'relative',
      marginTop: `${t.space.xs}px`,
      paddingTop: `${t.space.xs + 1 + t.space.sm}px`,
      '&::before': { content: '""', position: 'absolute', top: 0, left: t.space.xs, right: t.space.xs, height: 1, backgroundColor: t.semantic.border },
    },
  }
}

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        minHeight: 0,
        padding: `${t.space.s}px ${t.space.sm}px`,
        gap: t.space.s,
        borderRadius: t.radius.s,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        color: s.textPrimary,
        '&:hover, &.Mui-focusVisible, &.ds-hover': { backgroundColor: s.cardsBackgroundHover },
        // Figma: selected rows are Secondary-500 with a Medium Neutral-800 label, hovered or not.
        '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': {
          backgroundColor: s.chipSelectedBackground,
          color: s.textOnSelected,
          fontWeight: 500,
        },
        '&.Mui-disabled': { opacity: 1, color: s.textDisabled },
        // Figma List itens Checkbox=true: a 16px checkbox 12px from the label. The checkbox
        // shows the selection, so selected rows keep the plain fill.
        '&:has(> .ds-row-check)': {
          gap: t.space.sm,
          '&.Mui-selected': { backgroundColor: 'transparent', color: s.textPrimary, fontWeight: 400 },
          '&.Mui-selected:hover, &.Mui-selected.Mui-focusVisible, &.Mui-selected.ds-hover': {
            backgroundColor: s.cardsBackgroundHover,
          },
        },
        '& > .ds-row-check': { flexShrink: 0, color: s.textPrimary },
        '&.Mui-selected > .ds-row-check': { color: s.selected },
        '&.Mui-disabled > .ds-row-check': { color: s.textDisabled },
        '& .MuiListItemIcon-root': { minWidth: 0, color: 'inherit' },
        '& .MuiListItemIcon-root svg': { width: t.iconSize.md, height: t.iconSize.md },
      }
    },
  },
}
