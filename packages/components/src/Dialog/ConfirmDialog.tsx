import { useId, useRef, type ReactNode, type RefObject } from 'react'
import Box from '@mui/material/Box'
import MuiDialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { Danger, InfoCircle } from 'iconsax-react'
import { Button } from '../Button/Button'
import { InfoOutlineIcon, SuccessBadgeIcon } from '../icons/FigmaIcons'
import { dialogPaperStyles } from './dialog.overrides'

// 5Mins confirmation Dialog on MUI Dialog. The surface and scrim come from the theme
// (dialog.overrides.ts); this component lays out the Figma Dialog set:
// icon, title, secondary text, then Cancel and the action.
//
// Figma → props
//   Type=Error / Warning / Info / Success → type
//   Icon=True                             → icon (default true)
//   Secondary text=True                   → secondaryText
//
// Only Cancel or the action closes it: Escape and a click on the scrim do nothing
// (Bruno, 2026-09-28, as overlays.md says).

export type DialogType = 'error' | 'warning' | 'info' | 'success'

export interface ConfirmDialogContentProps {
  type?: DialogType
  /** Show the type's icon. */
  icon?: boolean
  title: string
  secondaryText?: ReactNode
  cancelLabel?: string
  actionLabel: string
  onCancel?: () => void
  onConfirm?: () => void
}

export interface ConfirmDialogProps extends ConfirmDialogContentProps {
  open: boolean
}

const ACTION_COLOUR = { error: 'error', warning: 'warning', info: 'primary', success: 'primary' } as const

function TypeIcon({ type }: { type: DialogType }) {
  switch (type) {
    case 'error':
      return (
        <Box sx={(theme) => ({ display: 'flex', color: theme.tokens.palette.danger[500] })}>
          <Danger size={56} color="currentColor" />
        </Box>
      )
    case 'warning':
      return (
        <Box sx={(theme) => ({ display: 'flex', color: theme.tokens.semantic.buttonWarningBackground })}>
          <InfoCircle size={56} color="currentColor" />
        </Box>
      )
    case 'info':
      return (
        <Box sx={(theme) => ({ display: 'flex', color: theme.tokens.semantic.textSecondary })}>
          <InfoOutlineIcon />
        </Box>
      )
    case 'success':
      return <SuccessBadgeIcon />
  }
}

/** The dialog's content. `ids` link the title and text to the dialog for screen readers. */
function Content({
  type = 'info',
  icon = true,
  title,
  secondaryText,
  cancelLabel = 'Cancel',
  actionLabel,
  onCancel,
  onConfirm,
  ids,
  cancelRef,
}: ConfirmDialogContentProps & { ids: { title: string; text: string }; cancelRef?: RefObject<HTMLButtonElement | null> }) {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${theme.tokens.space.ml}px`,
        textAlign: 'center',
      })}
    >
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${theme.tokens.space.m}px` })}>
        {icon && <TypeIcon type={type} />}
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${theme.tokens.space.s}px` })}>
          <Typography id={ids.title} component="h2" sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: 'text.primary' }}>
            {title}
          </Typography>
          {secondaryText && (
            <Typography id={ids.text} sx={{ fontSize: 16, fontWeight: 400, lineHeight: 1.5, color: 'text.secondary' }}>
              {secondaryText}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={(theme) => ({ display: 'flex', justifyContent: 'center', gap: `${theme.tokens.space.sm}px`, width: '100%' })}>
        <Button ref={cancelRef} variant="outlined2" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button color={ACTION_COLOUR[type]} onClick={onConfirm}>
          {actionLabel}
        </Button>
      </Box>
    </Box>
  )
}

const WIDTH = 345

export function ConfirmDialog({ open, ...props }: ConfirmDialogProps) {
  const id = useId()
  const ids = { title: `${id}-title`, text: `${id}-text` }
  const cancelRef = useRef<HTMLButtonElement>(null)
  return (
    <MuiDialog
      open={open}
      disableEscapeKeyDown
      // Start on Cancel, so a stray Enter never confirms a destructive action.
      TransitionProps={{ onEntering: () => cancelRef.current?.focus() }}
      aria-labelledby={ids.title}
      aria-describedby={props.secondaryText ? ids.text : undefined}
      PaperProps={{ role: 'alertdialog', sx: { width: WIDTH, maxWidth: 'calc(100% - 48px)' } }}
    >
      <Content {...props} ids={ids} cancelRef={cancelRef} />
    </MuiDialog>
  )
}

/** The same dialog drawn in place, without a scrim or focus trap. For docs and comparisons only. */
export function ConfirmDialogPreview(props: ConfirmDialogContentProps) {
  const id = useId()
  return (
    <Box sx={(theme) => ({ ...dialogPaperStyles(theme), margin: 0, width: WIDTH })}>
      <Content {...props} ids={{ title: `${id}-title`, text: `${id}-text` }} />
    </Box>
  )
}
