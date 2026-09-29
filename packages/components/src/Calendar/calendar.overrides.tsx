import type {} from '@mui/x-date-pickers/themeAugmentation'
import type { Components, Theme } from '@mui/material/styles'
import type { Dayjs } from 'dayjs'
import { ArrowLeft2, ArrowRight2, Calendar } from 'iconsax-react'
import { menuPaperStyles } from '../Field/field.overrides'

// MUI X Date Pickers theme overrides. Figma Library, Calendar page: Calendar (the date
// field and its popover; dark 11529:406, light 12204:5743) and Day item (dark 5279:26511,
// light 11916:6094). Plain <DesktopDatePicker> and <DateCalendar> render the Figma calendar:
//
//   Field      → the Input field box (field.overrides.tsx), a Linear calendar icon at the end
//   Popover    → Cards-background, Border-elevated, radius 12, Shadow L, 8px below the field
//   Header     → "July 2024" Semibold 16, prev and next chevrons (ArrowLeft2 / ArrowRight2, 12px)
//   Weekdays   → Mon to Sun, Regular 14 in Text-secondary, 40px cells 8px apart
//   Day item   → 40px, Regular 14
//     Enabled      → no fill, Text-primary
//     Hover        → Cards-background-hover, radius 8
//     Focus        → a 1px Selected ring, radius 8
//     Current day  → a 1px Border-elevated ring, radius 8
//     Selected     → Secondary-500 fill, Neutral-800 Bold, radius 8
//     Disabled     → Text-disabled (days outside the month, and out of range)
// Weeks start on Monday (the en-gb locale, set by DateField) and the grid always shows 6 weeks.

const CELL = 40
const GAP = 8

export const MuiDesktopDatePicker: Components<Theme>['MuiDesktopDatePicker'] = {
  defaultProps: {
    format: 'DD/MM/YYYY',
    views: ['day'],
    showDaysOutsideCurrentMonth: true,
    fixedWeekNumber: 6,
    dayOfWeekFormatter: (day: Dayjs) => day.format('ddd'),
    slots: {
      openPickerIcon: () => <Calendar color="currentColor" size={20} aria-hidden />,
      leftArrowIcon: () => <ArrowLeft2 color="currentColor" size={12} aria-hidden />,
      rightArrowIcon: () => <ArrowRight2 color="currentColor" size={12} aria-hidden />,
    },
  },
}

export const MuiDateCalendar: Components<Theme>['MuiDateCalendar'] = {
  defaultProps: {
    views: ['day'],
    showDaysOutsideCurrentMonth: true,
    fixedWeekNumber: 6,
    dayOfWeekFormatter: (day: Dayjs) => day.format('ddd'),
    slots: {
      leftArrowIcon: () => <ArrowLeft2 color="currentColor" size={12} aria-hidden />,
      rightArrowIcon: () => <ArrowRight2 color="currentColor" size={12} aria-hidden />,
    },
  },
  styleOverrides: {
    // 7 × 40 cells + 6 × 8 gaps + 2 × 12 padding = 352; 40 header + 48 weekdays + 256 grid = 344.
    root: { width: 7 * CELL + 6 * GAP + 24, height: 'auto', maxHeight: 'none' },
  },
}

export const MuiPickersPopper: Components<Theme>['MuiPickersPopper'] = {
  styleOverrides: {
    root: ({ theme }) => ({ '&[data-popper-placement^="bottom"]': { paddingTop: theme.tokens.space.s }, '&[data-popper-placement^="top"]': { paddingBottom: theme.tokens.space.s } }),
    // The Figma stroke is inside the 352 × 344 frame: an inset shadow, not a border. No max height.
    paper: ({ theme }) => ({
      ...menuPaperStyles(theme),
      padding: 0,
      maxHeight: 'none',
      border: 0,
      boxShadow: `inset 0 0 0 1px ${theme.tokens.semantic.borderElevated}, ${theme.tokens.shadow.l}`,
    }),
  },
}

export const MuiPickersLayout: Components<Theme>['MuiPickersLayout'] = {
  styleOverrides: { root: { minWidth: 0 }, contentWrapper: { minWidth: 0 } },
}

export const MuiPickersCalendarHeader: Components<Theme>['MuiPickersCalendarHeader'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      return {
        margin: 0,
        padding: `${t.space.sm}px ${t.space.sm}px ${t.space.xs}px`,
        minHeight: CELL,
        maxHeight: CELL,
        boxSizing: 'border-box',
      }
    },
    labelContainer: { margin: 0, marginRight: 'auto', cursor: 'default', overflow: 'visible' },
    label: ({ theme }) => ({
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
      color: theme.tokens.semantic.textPrimary,
    }),
  },
}

// The Figma Chevron (overflow=false): a 20px button with a 12px glyph, 4px apart.
export const MuiPickersArrowSwitcher: Components<Theme>['MuiPickersArrowSwitcher'] = {
  styleOverrides: {
    root: ({ theme }) => ({ gap: theme.tokens.space.xs }),
    spacer: { display: 'none' },
    button: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        width: 20,
        height: 20,
        padding: 0,
        margin: 0,
        color: s.textSecondary,
        '&:hover': { backgroundColor: s.pageBackgroundHover },
        '&.Mui-disabled': { color: s.textDisabled },
        '&.Mui-focusVisible': { outline: `2px solid ${s.primaryButtonBackground}` },
      }
    },
  },
}

export const MuiDayCalendar: Components<Theme>['MuiDayCalendar'] = {
  styleOverrides: {
    header: ({ theme }) => ({ padding: `${theme.tokens.space.xs}px ${theme.tokens.space.sm}px`, gap: GAP, justifyContent: 'flex-start' }),
    weekDayLabel: ({ theme }) => ({
      width: CELL,
      height: CELL,
      margin: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: theme.tokens.semantic.textSecondary,
    }),
    slideTransition: { minHeight: 6 * CELL + 16 },
    monthContainer: ({ theme }) => ({ padding: `${theme.tokens.space.xs}px ${theme.tokens.space.sm}px ${theme.tokens.space.sm}px` }),
    weekContainer: { margin: 0, gap: GAP, justifyContent: 'flex-start' },
  },
}

export const MuiPickersDay: Components<Theme>['MuiPickersDay'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      return {
        width: CELL,
        height: CELL,
        margin: 0,
        borderRadius: t.radius.xs,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        color: s.textPrimary,
        backgroundColor: 'transparent',
        '&:hover, &.ds-hover': { backgroundColor: s.cardsBackgroundHover, borderRadius: t.radius.s },
        '&.Mui-focusVisible, &.ds-focus, &:focus-visible': {
          backgroundColor: 'transparent',
          borderRadius: t.radius.s,
          boxShadow: `inset 0 0 0 1px ${s.selected}`,
        },
        '&.MuiPickersDay-today:not(.Mui-selected)': { border: 0, borderRadius: t.radius.s, boxShadow: `inset 0 0 0 1px ${s.borderElevated}` },
        '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus, &.Mui-selected.Mui-focusVisible': {
          backgroundColor: t.palette.secondary[500],
          color: t.palette.neutral[800],
          fontWeight: 700,
          borderRadius: t.radius.s,
        },
        '&.Mui-disabled:not(.Mui-selected), &.MuiPickersDay-dayOutsideMonth': { color: s.textDisabled },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }
    },
  },
}
