import { forwardRef } from 'react'
import Switch, { type SwitchProps } from '@mui/material/Switch'

// 5Mins Toggle: MUI Switch. The look is all in the theme (selection.overrides.tsx), so a
// plain MUI Switch renders the same. MUI 5 leaves the input a plain checkbox; the wrapper
// adds role="switch", so it's announced as a switch, on or off.
//
// Figma → props
//   Toggle=true / false → checked

export type ToggleProps = SwitchProps

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle({ inputProps, ...props }, ref) {
  return <Switch ref={ref} inputProps={{ role: 'switch', ...inputProps }} {...props} />
})
