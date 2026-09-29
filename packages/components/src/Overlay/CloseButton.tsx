import { forwardRef } from 'react'
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import { CloseOutlineIcon } from '../icons/FigmaIcons'

// The close button of the Modal and Side drawer (Figma "close" in Modal 7479:4350):
// a 32px frame, 4px padding, IoCloseOutline 24px in Text-secondary; Text-primary on hover.
//
// variant="fullscreen" (Figma Modal/Full screen 3223:31934): a 40px disc, 4px padding,
// Input-background fill, a 32px glyph in Text-secondary; Input-background-hover and
// Text-primary on hover.

export interface CloseButtonProps extends IconButtonProps {
  variant?: 'default' | 'fullscreen'
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  { 'aria-label': label = 'Close', variant = 'default', sx, ...props },
  ref,
) {
  const full = variant === 'fullscreen'
  return (
    <IconButton
      ref={ref}
      aria-label={label}
      disableRipple
      sx={[
        (theme) => ({
          padding: `${theme.tokens.space.xs}px`,
          borderRadius: `${full ? theme.tokens.radius.full : theme.tokens.radius.s}px`,
          color: theme.tokens.semantic.textSecondary,
          ...(full && { width: 40, height: 40, backgroundColor: theme.tokens.semantic.inputBackground }),
          '&:hover': { color: theme.tokens.semantic.textPrimary, backgroundColor: full ? theme.tokens.semantic.inputBackgroundHover : 'transparent' },
          '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}`, outlineOffset: 0 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <CloseOutlineIcon size={full ? 32 : 24} />
    </IconButton>
  )
})
