import { forwardRef, type ReactElement, type ReactNode } from 'react'
import MuiChip, { type ChipProps as MuiChipProps } from '@mui/material/Chip'

// 5Mins Chip. A thin layer over MUI Chip: every visual rule lives in the theme
// (chip.overrides.ts). The wrapper only adds what MUI 5 lacks: a `selected` state.
//
// Figma → props
//   Selected=true   → selected (adds the Mui-selected class and aria-pressed)
//   Icon left=true  → icon (Iconsax Linear, color="currentColor", 16px)
//   Icon right=true → iconRight + onDelete (the trailing icon removes the chip)
//   Disabled=true   → disabled

export interface ChipProps extends Omit<MuiChipProps, 'icon' | 'deleteIcon' | 'color' | 'variant' | 'size'> {
  /** Filter selected. Only meaningful with onClick. */
  selected?: boolean
  /** Leading icon. */
  icon?: ReactElement
  /** Trailing icon; shown when onDelete is set. Iconsax CloseCircle or Add, color="currentColor". */
  iconRight?: ReactElement
  label: ReactNode
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { selected = false, icon, iconRight, className, onClick, ...props },
  ref,
) {
  return (
    <MuiChip
      ref={ref}
      icon={icon}
      deleteIcon={iconRight}
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
      className={[selected && 'Mui-selected', className].filter(Boolean).join(' ') || undefined}
      {...props}
    />
  )
})
