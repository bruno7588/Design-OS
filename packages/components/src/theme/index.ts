import { createTheme, type Theme } from '@mui/material/styles'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import './augment'
import { tokensFor, type Mode } from './tokens'
import { typography } from './typography'
import { MuiButton } from '../Button/button.overrides'
import { MuiChip } from '../Chip/chip.overrides'
import { MuiTab, MuiTabs } from '../Tabs/tabs.overrides'
import { MuiDialog } from '../Dialog/dialog.overrides'
import { MuiTooltip } from '../Tooltip/tooltip.overrides'
import { MuiAlert } from '../Toast/toast.overrides'
import {
  MuiFormHelperText,
  MuiInputLabel,
  MuiMenu,
  MuiMenuItem,
  MuiOutlinedInput,
  MuiSelect,
  MuiTextField,
} from '../Field/field.overrides'
import { MuiInputBase } from '../InputField/inputTypes.overrides'
import { MuiListItemButton } from '../Navigation/navigation.overrides'
import { MuiBottomNavigation, MuiBottomNavigationAction } from '../Navigation/tabNav.overrides'
import { MuiSlider } from '../Slider/slider.overrides'
import {
  MuiDateCalendar,
  MuiDayCalendar,
  MuiDesktopDatePicker,
  MuiPickersArrowSwitcher,
  MuiPickersCalendarHeader,
  MuiPickersDay,
  MuiPickersLayout,
  MuiPickersPopper,
} from '../Calendar/calendar.overrides'
import { MuiStep, MuiStepConnector, MuiStepLabel, MuiStepper } from '../Stepper/stepper.overrides'
import { MuiDrawer } from '../Overlay/overlay.overrides'
import { MuiAvatar, MuiAvatarGroup } from '../Avatar/avatar.overrides'
import { MuiBreadcrumbs } from '../Breadcrumb/breadcrumb.overrides'
import { MuiToggleButton, MuiToggleButtonGroup } from '../ContentSwitcher/contentSwitcher.overrides'
import { MuiLinearProgress } from '../ProgressBar/progressBar.overrides'
import { MuiTable, MuiTableCell, MuiTablePagination, MuiTableRow, MuiTableSortLabel } from '../Table/table.overrides'
import { MuiCheckbox, MuiFormControlLabel, MuiFormLabel, MuiRadio, MuiSwitch } from '../Selection/selection.overrides'

export function createFiveMinsTheme(mode: Mode = 'light'): Theme {
  const t = tokensFor(mode)
  const s = t.semantic
  const p = t.palette

  return createTheme({
    tokens: t,
    palette: {
      mode,
      primary: { main: s.primaryButtonBackground, contrastText: s.textButtonForeground },
      secondary: { main: p.secondary[500], contrastText: p.neutral[800] },
      error: { main: p.danger[500], contrastText: p.neutral[25] },
      warning: { main: s.buttonWarningBackground, contrastText: p.neutral[25] },
      success: { main: s.buttonSuccessBackground, contrastText: p.neutral[25] },
      ai: { main: p.gamification.blazeQuiz, contrastText: p.neutral[25] },
      progress: { main: s.textProgress, contrastText: p.neutral[25] },
      new: { main: p.danger[400], contrastText: p.neutral[25] },
      grey: { 50: p.neutral[50], 100: p.neutral[100], 200: p.neutral[200], 300: p.neutral[300], 400: p.neutral[400], 500: p.neutral[500], 600: p.neutral[600], 700: p.neutral[700], 800: p.neutral[800], 900: p.neutral[900] },
      text: { primary: s.textPrimary, secondary: s.textSecondary, disabled: s.textDisabled },
      background: { default: s.pageBackground, paper: s.cardsBackground },
      divider: s.border,
    },
    typography,
    spacing: 4,
    shape: { borderRadius: t.radius.sm },
    components: {
      MuiButton,
      MuiChip,
      MuiTabs,
      MuiTab,
      MuiDialog,
      MuiTooltip,
      MuiAlert,
      MuiTextField,
      MuiInputLabel,
      MuiFormHelperText,
      MuiInputBase,
      MuiOutlinedInput,
      MuiSelect,
      MuiMenu,
      MuiMenuItem,
      MuiCheckbox,
      MuiRadio,
      MuiSwitch,
      MuiFormControlLabel,
      MuiFormLabel,
      MuiDrawer,
      MuiAvatar,
      MuiAvatarGroup,
      MuiBreadcrumbs,
      MuiToggleButtonGroup,
      MuiToggleButton,
      MuiTable,
      MuiTableCell,
      MuiTableRow,
      MuiTableSortLabel,
      MuiTablePagination,
      MuiLinearProgress,
      MuiStepper,
      MuiStep,
      MuiStepLabel,
      MuiStepConnector,
      MuiSlider,
      MuiListItemButton,
      MuiBottomNavigation,
      MuiBottomNavigationAction,
      MuiDesktopDatePicker,
      MuiDateCalendar,
      MuiPickersPopper,
      MuiPickersLayout,
      MuiPickersCalendarHeader,
      MuiPickersArrowSwitcher,
      MuiDayCalendar,
      MuiPickersDay,
      MuiCssBaseline: { styleOverrides: { body: { color: s.textPrimary } } },
    },
  })
}

export const lightTheme = createFiveMinsTheme('light')
export const darkTheme = createFiveMinsTheme('dark')
/** Default theme (light). */
export const theme = lightTheme

export * from './tokens'
