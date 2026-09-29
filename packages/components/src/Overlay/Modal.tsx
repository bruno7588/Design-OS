import { useId, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import MuiDialog, { type DialogProps } from '@mui/material/Dialog'
import { Button } from '../Button/Button'
import { dialogPaperStyles } from '../Dialog/dialog.overrides'
import { CloseButton } from './CloseButton'
import { SectionHeader } from './SectionHeader'

// 5Mins Modal (Figma 7479:4350) on MUI Dialog. The surface and scrim come from the theme
// (dialog.overrides.ts, maxWidth="md" is 720px); this lays out the Figma frame: the close
// button, the section header, the content slot (320px or taller) and one centred button.
//
// Unlike the confirmation Dialog, a Modal closes on the close button, a click on the
// scrim and Escape (overlays.md). MUI traps focus inside and returns it on close.

export interface ModalProps extends Omit<DialogProps, 'title' | 'children' | 'onClose'> {
  title: ReactNode
  supportingText?: ReactNode
  children: ReactNode
  onClose: () => void
  /** The centred Filled button. */
  action?: { label: string; onClick: () => void; disabled?: boolean }
  closeLabel?: string
}

export function Modal({ title, supportingText, children, onClose, action, closeLabel = 'Close', ...props }: ModalProps) {
  const id = useId()
  return (
    <MuiDialog
      maxWidth="md"
      fullWidth
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={supportingText ? `${id}-text` : undefined}
      {...props}
    >
      <ModalContent title={title} supportingText={supportingText} onClose={onClose} action={action} closeLabel={closeLabel} ids={id}>
        {children}
      </ModalContent>
    </MuiDialog>
  )
}

/** The Modal's inside, also used to draw it in place in the docs. */
export function ModalContent({
  title,
  supportingText,
  children,
  onClose,
  action,
  closeLabel = 'Close',
  ids,
}: Pick<ModalProps, 'title' | 'supportingText' | 'children' | 'onClose' | 'action' | 'closeLabel'> & { ids?: string }) {
  return (
    <>
      <CloseButton aria-label={closeLabel} onClick={onClose} sx={(theme) => ({ position: 'absolute', top: `${theme.tokens.space.ssm}px`, right: `${theme.tokens.space.ssm}px` })} />
      <SectionHeader title={title} supportingText={supportingText} titleId={ids && `${ids}-title`} supportingTextId={ids && `${ids}-text`} />
      <Box sx={(theme) => ({ width: '100%', minHeight: 320, borderRadius: `${theme.tokens.radius.sm}px` })}>{children}</Box>
      {action && (
        <Button onClick={action.onClick} disabled={action.disabled}>
          {action.label}
        </Button>
      )}
    </>
  )
}

/** The Modal drawn in place, without the scrim or focus trap: for docs and visual checks. */
export function ModalPreview(props: Pick<ModalProps, 'title' | 'supportingText' | 'children' | 'onClose' | 'action' | 'closeLabel'>) {
  return (
    <Box
      role="group"
      aria-label="Modal preview"
      sx={(theme) => ({
        ...dialogPaperStyles(theme),
        margin: 0,
        position: 'relative',
        width: 720,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${theme.tokens.space.ml}px`,
      })}
    >
      <ModalContent {...props} />
    </Box>
  )
}
