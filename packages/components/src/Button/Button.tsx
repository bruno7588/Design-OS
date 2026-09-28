import { forwardRef, type ReactNode } from 'react'
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button'

// 5Mins Button. A thin layer over MUI Button: every visual rule lives in the
// theme (button.overrides.ts), so <MuiButton variant="outlined" color="error">
// looks the same as this component. The wrapper only adds what MUI 5 lacks:
// a leading `icon` shortcut and the Loading state.
//
// Figma → props
//   Configuration  Filled / Outlined / Outlined-2 / Text / Link → variant contained / outlined / outlined2 / text / link
//                  Danger / Warning / Success / AI               → color error / warning / success / ai
//   Size           Small / Medium / Large                        → size small / medium / large
//   Icon=true                                                    → icon (leading, Iconsax, colour currentColor)
//   State=Disabled / Loading                                     → disabled / loading

export interface ButtonProps extends Omit<MuiButtonProps, 'startIcon'> {
  /** Leading icon. Iconsax Linear with color="currentColor"; the size is set by the button (16 / 20 / 24). */
  icon?: ReactNode
  /** Swaps the content for a spinner, keeps the width, and disables the button. */
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { icon, loading = false, disabled, children, className, 'aria-label': ariaLabel, ...props },
  ref,
) {
  // The spinner hides the label, and the label is the accessible name, so keep it as aria-label.
  const name = ariaLabel ?? (loading && typeof children === 'string' ? children : undefined)

  return (
    <MuiButton
      ref={ref}
      startIcon={icon}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={name}
      className={[loading && 'ds-loading', className].filter(Boolean).join(' ') || undefined}
      {...props}
    >
      <span className="ds-btn-label">{children}</span>
      {loading && <span className="ds-btn-spinner" aria-hidden="true" />}
    </MuiButton>
  )
})
