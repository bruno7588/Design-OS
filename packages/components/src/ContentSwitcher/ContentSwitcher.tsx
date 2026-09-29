import { forwardRef, type ReactNode } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup, { type ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup'

// 5Mins Content switcher: MUI ToggleButtonGroup, exclusive. The look is in the theme
// (contentSwitcher.overrides.ts). The wrapper maps a list of sections and keeps one
// selected: clicking the selected section doesn't clear it.
//
// Figma → props
//   Content switcher item Selected=True → value
//   icon left / icon right             → items[].iconLeft / iconRight
//   Disabled=true                      → items[].disabled

export interface ContentSwitcherItem {
  value: string
  label: string
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  /** For docs and visual tests: ds-hover, ds-focus. */
  className?: string
}

export interface ContentSwitcherProps extends Omit<ToggleButtonGroupProps, 'value' | 'onChange' | 'exclusive' | 'children'> {
  items: ContentSwitcherItem[]
  value: string
  onChange: (value: string) => void
}

export const ContentSwitcher = forwardRef<HTMLDivElement, ContentSwitcherProps>(function ContentSwitcher(
  { items, value, onChange, ...props },
  ref,
) {
  return (
    <ToggleButtonGroup ref={ref} exclusive value={value} onChange={(_, v: string | null) => v !== null && onChange(v)} {...props}>
      {items.map((item) => (
        <ToggleButton key={item.value} value={item.value} disabled={item.disabled} className={item.className}>
          {item.iconLeft}
          {item.label}
          {item.iconRight}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
})
