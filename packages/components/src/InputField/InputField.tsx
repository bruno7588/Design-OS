import { forwardRef, type ReactNode } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { Danger, TickCircle } from 'iconsax-react'

// 5Mins Input field (Figma Input field/Outlined). A thin layer over MUI TextField:
// every visual rule lives in the theme (field.overrides.tsx), so
// <TextField label="Name" helperText="…" error /> looks the same. The wrapper adds
// the success state and the validation icons from Figma.
//
// Figma → props
//   Label=true        → label
//   Helper text=true  → helperText
//   Validation=error  → validation="error" (MUI error, aria-invalid, Bold Danger icon)
//   Validation=success → validation="success" (Bold TickCircle)
//   Icon right=true   → iconRight
//   Disabled=true     → disabled

export type InputFieldProps = Omit<TextFieldProps, 'variant' | 'error' | 'select'> & {
  validation?: 'none' | 'error' | 'success'
  /** An icon at the end of the field, such as Eye for a password. 20px, Iconsax Linear. */
  iconRight?: ReactNode
}

export const InputField = forwardRef<HTMLDivElement, InputFieldProps>(function InputField(
  { validation = 'none', iconRight, InputProps, ...props },
  ref,
) {
  const icon =
    validation === 'error' ? (
      <Danger variant="Bold" color="currentColor" className="ds-validation-icon ds-error" aria-hidden />
    ) : validation === 'success' ? (
      <TickCircle variant="Bold" color="currentColor" className="ds-validation-icon ds-success" aria-hidden />
    ) : null
  const end =
    icon || iconRight ? (
      <InputAdornment position="end">
        {icon}
        {iconRight}
      </InputAdornment>
    ) : undefined

  return <TextField ref={ref} error={validation === 'error'} InputProps={{ endAdornment: end, ...InputProps }} {...props} />
})
