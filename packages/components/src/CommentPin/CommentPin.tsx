import { forwardRef } from 'react'
import ButtonBase, { type ButtonBaseProps } from '@mui/material/ButtonBase'

// 5Mins Comment pin: marks a comment on a live prototype, as Figma's comment pins do. A 28px
// round pin with its bottom-left corner pointed at the spot, showing the author's initial and
// filled by the comment's status. Code-first: not in the Figma Library yet (Phase 4c).
//
//   status pending      → Primary button fill (waiting)
//          in-progress  → Warning button fill (watch mode is working on it)
//          done         → Success button fill
//          failed       → Danger-500 (watch mode couldn't apply it)
//   selected            → 2px focus ring; hover and focus-visible look the same

export type CommentPinStatus = 'pending' | 'in-progress' | 'done' | 'failed'

export interface CommentPinProps extends Omit<ButtonBaseProps, 'children'> {
  /** The author's name; the pin shows its first letter. */
  author: string
  status?: CommentPinStatus
  selected?: boolean
}

export const CommentPin = forwardRef<HTMLButtonElement, CommentPinProps>(function CommentPin(
  { author, status = 'pending', selected = false, className, sx, ...props },
  ref,
) {
  return (
    <ButtonBase
      ref={ref}
      disableRipple
      aria-pressed={selected}
      className={['ds-comment-pin', selected && 'ds-selected', className].filter(Boolean).join(' ')}
      sx={[
        (theme) => {
          const t = theme.tokens
          const s = t.semantic
          const fill = {
            pending: s.primaryButtonBackground,
            'in-progress': s.buttonWarningBackground,
            done: s.buttonSuccessBackground,
            failed: t.palette.danger[500],
          }[status]
          const ring = `0 0 0 2px ${s.pageBackground}`
          return {
            width: 28,
            height: 28,
            flexShrink: 0,
            // Round, with the bottom-left corner as the point.
            borderRadius: `${t.radius.full}px ${t.radius.full}px ${t.radius.full}px 0`,
            backgroundColor: fill,
            color: status === 'failed' ? t.palette.neutral[25] : s.textButtonForeground,
            fontFamily: theme.typography.fontFamily,
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.2,
            boxShadow: `${ring}, ${t.shadow.s}`,
            transition: 'transform 150ms, box-shadow 150ms',
            '&:hover, &.Mui-focusVisible, &.ds-hover': { transform: 'scale(1.1)' },
            '&.ds-selected, &.Mui-focusVisible': { boxShadow: `${ring}, 0 0 0 4px ${s.primaryButtonBackground}` },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover, &.Mui-focusVisible, &.ds-hover': { transform: 'none' } },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {author.trim().charAt(0).toUpperCase() || '?'}
    </ButtonBase>
  )
})
