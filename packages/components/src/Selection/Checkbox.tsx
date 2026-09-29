import { forwardRef, useEffect, useRef } from 'react'
import MuiCheckbox, { type CheckboxProps } from '@mui/material/Checkbox'
import { useForkRef } from '@mui/material/utils'

// 5Mins Checkbox. The look is all in the theme (selection.overrides.tsx), so a plain
// MUI Checkbox renders the same. MUI draws the indeterminate glyph but leaves the
// input unchecked, so screen readers say "not checked". This wrapper sets the native
// indeterminate property, which is announced as mixed.
//
// Figma → props
//   Checked=Checked       → checked
//   Checked=Indeterminate → indeterminate
//   Disabled=true         → disabled

export type { CheckboxProps }

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox({ indeterminate = false, inputRef, ...props }, ref) {
  const input = useRef<HTMLInputElement>(null)
  const handleRef = useForkRef(input, inputRef)
  // Every render: a click clears the native property, and the parent may keep it indeterminate.
  useEffect(() => {
    if (input.current) input.current.indeterminate = indeterminate
  })
  return <MuiCheckbox ref={ref} indeterminate={indeterminate} inputRef={handleRef} {...props} />
})
