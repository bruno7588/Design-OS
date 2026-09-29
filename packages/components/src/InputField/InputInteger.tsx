import { forwardRef, useState, type KeyboardEvent, type ReactElement } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { Add, Minus } from 'iconsax-react'

// 5Mins Integer input (Figma Input field/Integer): a whole number people can step
// with − and + or type. A TextField with className "ds-integer" on the box; the look
// is in the theme (inputTypes.overrides.ts).
//
// Figma → props
//   Label=true         → label
//   Helper text=true   → helperText (Text-secondary)
//   Validation=error   → validation="error": border, label and helper in Text-error
//   Validation=success → validation="success": no change in Figma, kept for parity
//   State=Enabled      → value null: the "0" placeholder in Text-disabled
//   State=Filled       → a value
//   Disabled=true      → disabled
//
// The value is a spinbutton: the arrow keys step, Home and End jump to min and max.
// The − and + buttons are for pointers, so they're skipped by Tab.

export type InputIntegerProps = Omit<
  TextFieldProps,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'variant' | 'error' | 'select' | 'multiline'
> & {
  /** null shows the "0" placeholder. */
  value: number | null
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  validation?: 'none' | 'error' | 'success'
}

export const InputInteger = forwardRef<HTMLDivElement, InputIntegerProps>(function InputInteger(
  { value, onChange, min = 0, max, step = 1, validation = 'none', disabled, placeholder = '0', InputProps, inputProps, ...props },
  ref,
) {
  // The raw text while typing, so clearing the field isn't undone by the number.
  const [draft, setDraft] = useState<string | null>(null)
  const current = value ?? min
  const clamp = (n: number) => Math.min(max ?? Infinity, Math.max(min, n))
  const atMin = value !== null && value <= min
  const atMax = max !== undefined && value !== null && value >= max
  const set = (n: number) => {
    const next = clamp(n)
    if (next !== value) onChange(next)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const keys: Record<string, () => void> = {
      ArrowUp: () => set(current + step),
      ArrowDown: () => set(current - step),
      Home: () => set(min),
      End: () => max !== undefined && set(max),
    }
    if (keys[e.key]) {
      e.preventDefault()
      setDraft(null)
      keys[e.key]()
    }
  }

  const stepButton = (label: string, icon: ReactElement, delta: number, off: boolean) => (
    <IconButton
      className="ds-integer-step"
      aria-label={label}
      tabIndex={-1}
      disabled={disabled || off}
      onClick={() => {
        setDraft(null)
        set(current + delta)
      }}
      disableRipple
    >
      {icon}
    </IconButton>
  )

  return (
    <TextField
      ref={ref}
      error={validation === 'error'}
      disabled={disabled}
      placeholder={placeholder}
      value={draft ?? (value === null ? '' : String(value))}
      onChange={(e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '')
        // Above max clamps as you type; below min waits for blur.
        const n = parseInt(raw, 10)
        const over = max !== undefined && n > max
        setDraft(over ? String(max) : raw)
        if (raw !== '' && n >= min) set(n)
      }}
      onBlur={() => {
        if (draft !== null) {
          const n = parseInt(draft, 10)
          set(Number.isNaN(n) ? current : n)
          setDraft(null)
        }
      }}
      InputProps={{
        ...InputProps,
        className: ['ds-integer', validation === 'success' && 'ds-success', InputProps?.className].filter(Boolean).join(' '),
        startAdornment: <InputAdornment position="start">{stepButton('Decrease', <Minus color="currentColor" />, -step, atMin)}</InputAdornment>,
        endAdornment: <InputAdornment position="end">{stepButton('Increase', <Add color="currentColor" />, step, atMax)}</InputAdornment>,
      }}
      inputProps={{
        role: 'spinbutton',
        inputMode: 'numeric',
        'aria-valuenow': value ?? undefined,
        'aria-valuemin': min,
        'aria-valuemax': max,
        onKeyDown,
        ...inputProps,
      }}
      {...props}
    />
  )
})
