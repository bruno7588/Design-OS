import { forwardRef } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Radio, { type RadioProps } from '@mui/material/Radio'
import TextField, { type TextFieldProps } from '@mui/material/TextField'

// 5Mins Radio button input (Figma Input field/Radio button): an option people pick
// and type into, such as a quiz answer. The Input field box with a 21px radio at the
// start; the look is in the theme (inputTypes.overrides.ts, className "ds-radio-input").
//
// Figma → props
//   Label=true         → label
//   Selected=true      → checked (or the RadioGroup value matching radioValue)
//   Validation=success → validation="success": the selected radio in Success-500
//   State=Hover        → hover: the field and the radio's halo
//   State=Active       → focus in the text
//   Disabled=true      → disabled
//
// Put a group of them in a MUI RadioGroup and give each a radioValue: the group then
// handles checked, the name and the arrow keys between radios.

export type InputRadioProps = Omit<TextFieldProps, 'variant' | 'error' | 'select'> & {
  /** Standalone: whether the radio is selected. In a RadioGroup, use radioValue. */
  checked?: boolean
  radioValue?: string
  onSelect?: () => void
  /** The radio's accessible name, such as "Correct answer". */
  radioLabel: string
  validation?: 'none' | 'success'
  radioProps?: Omit<RadioProps, 'checked' | 'value'>
}

export const InputRadio = forwardRef<HTMLDivElement, InputRadioProps>(function InputRadio(
  { checked, radioValue, onSelect, radioLabel, validation = 'none', radioProps, disabled, InputProps, ...props },
  ref,
) {
  return (
    <TextField
      ref={ref}
      disabled={disabled}
      InputProps={{
        ...InputProps,
        className: ['ds-radio-input', validation === 'success' && 'ds-success', InputProps?.className].filter(Boolean).join(' '),
        startAdornment: (
          <InputAdornment position="start">
            <Radio
              {...(checked !== undefined && { checked })}
              value={radioValue}
              disabled={disabled}
              onChange={() => onSelect?.()}
              inputProps={{ 'aria-label': radioLabel }}
              {...radioProps}
            />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
})
