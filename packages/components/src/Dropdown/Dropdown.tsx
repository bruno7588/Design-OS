import { forwardRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { Danger } from 'iconsax-react'

// 5Mins Dropdown. MUI TextField with select: the field, chevron and menu are all
// styled in the theme (field.overrides.tsx), so <TextField select> looks the same.
// MUI gives it the combobox and listbox roles, arrow keys, type-ahead and Escape.
// The wrapper adds options, a placeholder, the leading icon and the label beside it.
//
// Figma → props
//   Label top / Label start → label + labelPlacement "top" / "start"
//   Icon left=true          → iconLeft
//   Helper text=true        → helperText
//   State=Active            → open
//   Disabled / Read-only    → disabled
//   (Error, not yet in Figma) → error + helperText: as the input field, with the Bold Danger icon

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

export type DropdownProps = Omit<TextFieldProps, 'select' | 'variant' | 'onChange' | 'value' | 'children'> & {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  labelPlacement?: 'top' | 'start'
  iconLeft?: ReactNode
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { options, value, onChange, placeholder = 'Select', labelPlacement = 'top', iconLeft, error, className, SelectProps, InputProps, ...props },
  ref,
) {
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label
  return (
    <TextField
      ref={ref}
      select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      className={[labelPlacement === 'start' && 'ds-label-start', className].filter(Boolean).join(' ') || undefined}
      SelectProps={{
        displayEmpty: true,
        renderValue: (v) =>
          v ? labelOf(v as string) : <Box component="span" sx={{ color: 'text.disabled' }}>{placeholder}</Box>,
        ...SelectProps,
      }}
      InputProps={{
        startAdornment: iconLeft ? <InputAdornment position="start">{iconLeft}</InputAdornment> : undefined,
        endAdornment: error ? (
          <InputAdornment position="end">
            <Danger variant="Bold" color="currentColor" className="ds-validation-icon ds-error" aria-hidden />
          </InputAdornment>
        ) : undefined,
        ...InputProps,
      }}
      {...props}
    >
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </MenuItem>
      ))}
    </TextField>
  )
})
