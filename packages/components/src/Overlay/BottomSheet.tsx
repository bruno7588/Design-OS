import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Drawer, { type DrawerProps } from '@mui/material/Drawer'

// 5Mins Bottom sheet (Figma Bottom sheet 7479:106; the light board has an instance) on MUI
// Drawer, anchored to the bottom. For the mobile app: options and short forms that rise
// over the page.
//
// Figma: Page-background, top corners 12, padding 0 16 20 16, 8px gap; a 36px header with a
// 64 × 4 Neutral-500 handle; the content slot below. The page dims behind it under the Scrim
// (the theme's MuiDrawer backdrop; Figma's Overlay component).
// Closes on a tap on the scrim and Escape; MUI traps focus inside and returns it on close.

export interface BottomSheetProps extends Omit<DrawerProps, 'anchor' | 'onClose' | 'children'> {
  onClose: () => void
  children: ReactNode
  /** Names the sheet when no heading inside does (otherwise pass aria-labelledby). */
  'aria-label'?: string
}

export function BottomSheet({ onClose, children, PaperProps, 'aria-label': label, 'aria-labelledby': labelledBy, ...props }: BottomSheetProps) {
  return (
    <Drawer
      anchor="bottom"
      onClose={onClose}
      PaperProps={{ ...PaperProps, role: 'dialog', 'aria-modal': true, 'aria-label': label, 'aria-labelledby': labelledBy, className: 'ds-bottom-sheet', sx: sheetStyles } as DrawerProps['PaperProps']}
      {...props}
    >
      <BottomSheetContent>{children}</BottomSheetContent>
    </Drawer>
  )
}

const sheetStyles = (theme: import('@mui/material/styles').Theme) => {
  const t = theme.tokens
  return {
    maxHeight: 'calc(100% - 40px)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: `${t.space.s}px`,
    padding: `0 ${t.space.m}px ${t.space.ml}px`,
    borderRadius: `${t.radius.sm}px ${t.radius.sm}px 0 0`,
    backgroundColor: t.semantic.pageBackground,
    backgroundImage: 'none',
    boxShadow: 'none',
  }
}

/** The inside: the handle and the content slot. Also used to draw it in place in the docs. */
export function BottomSheetContent({ children }: { children: ReactNode }) {
  return (
    <>
      <Box className="ds-sheet-handle" aria-hidden sx={(theme) => ({ display: 'flex', justifyContent: 'center', padding: `${theme.tokens.space.m}px`, flexShrink: 0 })}>
        <Box sx={(theme) => ({ width: 64, height: 4, borderRadius: `${theme.tokens.radius.s}px`, backgroundColor: theme.tokens.palette.neutral[500] })} />
      </Box>
      <Box className="ds-sheet-content" sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px`, overflow: 'auto', minHeight: 0 })}>
        {children}
      </Box>
    </>
  )
}

/** Draws the sheet in place (docs and visual tests): a phone-sized scrim with the sheet at the bottom. */
export function BottomSheetPreview({ children, height = 560 }: { children: ReactNode; height?: number }) {
  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        width: 375,
        height: 812,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: theme.tokens.semantic.scrim,
      })}
    >
      <Box className="ds-bottom-sheet" sx={[(theme) => sheetStyles(theme), { height, boxSizing: 'border-box' }]}>
        <BottomSheetContent>{children}</BottomSheetContent>
      </Box>
    </Box>
  )
}
