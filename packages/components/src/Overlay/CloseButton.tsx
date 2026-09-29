import { forwardRef } from 'react'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import { CloseOutlineIcon } from '../icons/FigmaIcons'

// The close button of the Modal and Side drawer (Figma "close" in Modal 7479:4350):
// a 32px frame, 4px padding, IoCloseOutline 24px in Text-secondary; Text-primary on hover.
// The prototype's CloseButton (default variant); its full-screen variant isn't built.

export const CloseButton = forwardRef<HTMLButtonElement, IconButtonProps>(function CloseButton(
  { 'aria-label': label = 'Close', sx, ...props },
  ref,
) {
  return (
    <IconButton
      ref={ref}
      aria-label={label}
      disableRipple
      sx={[
        (theme) => ({
          padding: `${theme.tokens.space.xs}px`,
          borderRadius: `${theme.tokens.radius.s}px`,
          color: theme.tokens.semantic.textSecondary,
          '&:hover': { color: theme.tokens.semantic.textPrimary, backgroundColor: 'transparent' },
          '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}`, outlineOffset: 0 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <CloseOutlineIcon size={24} />
    </IconButton>
  )
})
