import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import MuiDialog, { type DialogProps } from '@mui/material/Dialog'
import { CloseButton } from './CloseButton'

// 5Mins Full screen modal (Figma Modal/Full screen: dark 3223:31934, light 11498:1694) on MUI
// Dialog with fullScreen: the whole viewport in Page-background, with the full-screen close
// button in the top-right corner. Lesson editors, Create Flashcard and the Add Content forms.
//
// Figma → props
//   Device=Desktop → the close button 20px from the top, 30px from the right
//   Device=Mobile  → 16px under the status bar (safe area), 20px from the right
//
// Closes on the close button and Escape. MUI traps focus inside and returns it on close.

export interface FullScreenModalProps extends Omit<DialogProps, 'fullScreen' | 'onClose' | 'children'> {
  onClose: () => void
  children: ReactNode
  /** Names the dialog when no heading inside does (otherwise pass aria-labelledby). */
  'aria-label'?: string
  closeLabel?: string
}

export function FullScreenModal({ onClose, children, closeLabel = 'Close', PaperProps, ...props }: FullScreenModalProps) {
  return (
    <MuiDialog
      fullScreen
      onClose={onClose}
      PaperProps={{
        ...PaperProps,
        className: ['ds-full-screen-modal', PaperProps?.className].filter(Boolean).join(' '),
        sx: (theme) => ({
          position: 'relative',
          margin: 0,
          padding: 0,
          maxWidth: 'none',
          maxHeight: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          backgroundColor: theme.tokens.semantic.pageBackground,
        }),
      }}
      {...props}
    >
      <FullScreenModalContent onClose={onClose} closeLabel={closeLabel}>
        {children}
      </FullScreenModalContent>
    </MuiDialog>
  )
}

/** The inside, also used to draw it in place in the docs. */
export function FullScreenModalContent({ onClose, children, closeLabel = 'Close' }: { onClose: () => void; children: ReactNode; closeLabel?: string }) {
  return (
    <>
      <CloseButton
        variant="fullscreen"
        aria-label={closeLabel}
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          zIndex: 1,
          top: `${theme.tokens.space.ml}px`,
          right: 30,
          [theme.breakpoints.down('sm')]: { top: `calc(${theme.tokens.space.m}px + env(safe-area-inset-top))`, right: `${theme.tokens.space.ml}px` },
        })}
      />
      <Box className="ds-full-screen-body" sx={{ height: '100%', overflow: 'auto' }}>
        {children}
      </Box>
    </>
  )
}
