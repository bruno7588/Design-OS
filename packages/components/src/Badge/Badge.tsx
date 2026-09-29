import { forwardRef } from 'react'
import MuiChip, { type ChipProps } from '@mui/material/Chip'
import { Danger, InfoCircle, TaskSquare, TickCircle } from 'iconsax-react'
import { CloseOutlineIcon, InfoOutlineIcon } from '../icons/FigmaIcons'

// 5Mins Badge: a status label. Built on MUI Chip with variant="badge"; every visual
// rule lives in the theme (chip.overrides.ts, badgeStyles), so
// <Chip variant="badge" color="success" label="Completed" /> renders the same.
// The wrapper picks the Figma icon for each type.
//
// Figma → props
//   Type=Success / Warning / Error / In progress / Informative / New → type
//   Icon left=true  → icon
//   Icon right=true → onDismiss (the remove icon replaces the leading icon)

export type BadgeType = 'success' | 'warning' | 'error' | 'progress' | 'informative' | 'new'

export interface BadgeProps extends Omit<ChipProps, 'variant' | 'color' | 'icon' | 'onDelete' | 'deleteIcon'> {
  type?: BadgeType
  /** Show the type's icon. New never has one. */
  icon?: boolean
  /** Makes the badge removable: Backspace or Delete, or a click on the remove icon. */
  onDismiss?: () => void
}

const COLOUR = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  progress: 'progress',
  informative: 'default',
  new: 'new',
} as const

// The Figma icons: Iconsax Linear, except Informative (Ionicons, as in Figma).
const ICON = {
  success: <TickCircle color="currentColor" />,
  warning: <InfoCircle color="currentColor" />,
  error: <Danger color="currentColor" />,
  progress: <TaskSquare color="currentColor" />,
  informative: <InfoOutlineIcon size={16} />,
  new: undefined,
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  { type = 'informative', icon = false, onDismiss, ...props },
  ref,
) {
  return (
    <MuiChip
      ref={ref}
      variant="badge"
      color={COLOUR[type]}
      icon={icon && !onDismiss ? ICON[type] : undefined}
      onDelete={onDismiss}
      deleteIcon={onDismiss ? <CloseOutlineIcon /> : undefined}
      {...props}
    />
  )
})
