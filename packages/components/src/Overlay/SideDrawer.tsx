import { useId, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer, { type DrawerProps } from '@mui/material/Drawer'
import { Button } from '../Button/Button'
import { CloseButton } from './CloseButton'
import { SectionHeader } from './SectionHeader'

// 5Mins Side Drawer (Figma 10871:12768) on MUI Drawer, anchored right. The panel comes from
// the theme (overlay.overrides.ts); this lays out the Figma frame: the section header, the
// scrolling content slot, and the footer (a divider, then Filled and Outlined buttons).
//
// It closes on the close button, a click on the scrim and Escape (overlays.md). The close
// button sits at the end of the header row, as in Figma (the Modal's is in the corner).

export interface DrawerAction {
  label: string
  onClick: () => void
  disabled?: boolean
}

export interface SideDrawerProps extends Omit<DrawerProps, 'title' | 'children' | 'onClose' | 'anchor'> {
  title: ReactNode
  supportingText?: ReactNode
  children: ReactNode
  onClose: () => void
  /** Footer: the Filled action, and an optional Outlined one (often Cancel). */
  primaryAction?: DrawerAction
  secondaryAction?: DrawerAction
  closeLabel?: string
}

export function SideDrawer({ title, supportingText, children, onClose, primaryAction, secondaryAction, closeLabel = 'Close', PaperProps, ...props }: SideDrawerProps) {
  const id = useId()
  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      PaperProps={{ role: 'dialog', 'aria-modal': true, 'aria-labelledby': `${id}-title`, 'aria-describedby': supportingText ? `${id}-text` : undefined, ...PaperProps }}
      {...props}
    >
      <SideDrawerContent
        title={title}
        supportingText={supportingText}
        onClose={onClose}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        closeLabel={closeLabel}
        ids={id}
      >
        {children}
      </SideDrawerContent>
    </Drawer>
  )
}

/** The drawer's inside, also used to draw it in place in the docs. */
export function SideDrawerContent({
  title,
  supportingText,
  children,
  onClose,
  primaryAction,
  secondaryAction,
  closeLabel = 'Close',
  ids,
}: Pick<SideDrawerProps, 'title' | 'supportingText' | 'children' | 'onClose' | 'primaryAction' | 'secondaryAction' | 'closeLabel'> & { ids?: string }) {
  return (
    <>
      <SectionHeader
        title={title}
        supportingText={supportingText}
        titleId={ids && `${ids}-title`}
        supportingTextId={ids && `${ids}-text`}
        action={<CloseButton aria-label={closeLabel} onClick={onClose} />}
      />
      <Box sx={(theme) => ({ flex: '1 0 0', minHeight: 0, overflowY: 'auto', borderRadius: `${theme.tokens.radius.sm}px` })}>{children}</Box>
      {(primaryAction || secondaryAction) && (
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.m}px` })}>
          <Divider sx={(theme) => ({ borderColor: theme.tokens.semantic.border })} />
          <Box sx={(theme) => ({ display: 'flex', gap: `${theme.tokens.space.m}px` })}>
            {primaryAction && (
              <Button onClick={primaryAction.onClick} disabled={primaryAction.disabled}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outlined" onClick={secondaryAction.onClick} disabled={secondaryAction.disabled}>
                {secondaryAction.label}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

/** The drawer drawn in place, without the scrim or focus trap: for docs and visual checks. */
export function SideDrawerPreview({
  height = 640,
  ...props
}: Pick<SideDrawerProps, 'title' | 'supportingText' | 'children' | 'onClose' | 'primaryAction' | 'secondaryAction' | 'closeLabel'> & { height?: number }) {
  return (
    <Box
      role="group"
      aria-label="Side drawer preview"
      sx={(theme) => ({
        position: 'relative',
        width: 720,
        maxWidth: '100%',
        height,
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.tokens.space.ml}px`,
        padding: `${theme.tokens.space.ml}px ${theme.tokens.space.l}px`,
        backgroundColor: theme.tokens.semantic.pageBackground,
        color: theme.tokens.semantic.textPrimary,
      })}
    >
      <SideDrawerContent {...props} />
    </Box>
  )
}
