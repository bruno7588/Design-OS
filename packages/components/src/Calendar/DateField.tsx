import { useState } from 'react'
import InputAdornment, { type InputAdornmentProps } from '@mui/material/InputAdornment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker, type DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker'
import type { Dayjs } from 'dayjs'
import 'dayjs/locale/en-gb'
import { Danger } from 'iconsax-react'

// 5Mins date field (Figma Calendar): MUI X DesktopDatePicker with the 5Mins theme
// (calendar.overrides.tsx). The wrapper adds what the theme can't:
//   - the en-gb locale, so weeks start on Monday and dates read dd/mm/yyyy
//   - Calendar=Active: the Selected border while the calendar is open, as focus moves into it
//   - Calendar=Error: the Linear Danger icon before the calendar icon, and the message below
//
// Figma → props
//   Label=true       → label
//   Calendar=Error   → error (the message)
//   Calendar=Active  → open

export interface DateFieldProps extends Omit<DesktopDatePickerProps<Dayjs>, 'label' | 'slotProps'> {
  label?: string
  /** The error message. Shown under the field; the field turns Text-error. */
  error?: string
  helperText?: string
  fullWidth?: boolean
  /** For docs and visual tests: a forced-state class on the field box (ds-hover). */
  fieldClassName?: string
  /** For docs: keep the popover inside the page instead of a portal. */
  disablePortal?: boolean
}

// Figma shows "dd/mm/yyyy" in lower case.
const PLACEHOLDERS = { fieldDayPlaceholder: () => 'dd', fieldMonthPlaceholder: () => 'mm', fieldYearPlaceholder: () => 'yyyy' }

function Adornment({ children, className, ...props }: InputAdornmentProps) {
  return (
    <InputAdornment {...props} className={className}>
      {className?.includes('ds-error') && <Danger color="currentColor" size={20} className="ds-date-error-icon" aria-hidden />}
      {children}
    </InputAdornment>
  )
}

export function DateField({ label, error, helperText, fullWidth, fieldClassName, disablePortal, onOpen, onClose, slots, ...props }: DateFieldProps) {
  const [open, setOpen] = useState(false)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" localeText={PLACEHOLDERS}>
      <DesktopDatePicker
        {...props}
        label={label}
        onOpen={() => {
          setOpen(true)
          onOpen?.()
        }}
        onClose={() => {
          setOpen(false)
          onClose?.()
        }}
        slots={{ inputAdornment: Adornment, ...slots }}
        slotProps={{
          textField: {
            className: 'ds-date-field',
            error: !!error,
            helperText: error ?? helperText,
            fullWidth,
            InputProps: { className: [open || props.open ? 'ds-focus' : '', fieldClassName].filter(Boolean).join(' ') || undefined },
          },
          inputAdornment: { className: error ? 'ds-error' : undefined },
          openPickerButton: { disableRipple: true },
          // In docs (disablePortal) it stays below the field, as in Figma, even near the window's edge.
          popper: { placement: 'bottom-start', disablePortal, ...(disablePortal && { modifiers: [{ name: 'flip', enabled: false }] }) },
        }}
      />
    </LocalizationProvider>
  )
}
