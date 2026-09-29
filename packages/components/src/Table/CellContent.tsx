import type { ReactNode } from 'react'
import Box from '@mui/material/Box'

// The inside of a Figma Table data cell. A table cell can't be a flex box without breaking the
// table, so its content sits in this row: leading items (checkbox, avatar, thumbnail), the text,
// and a trailing icon, 12px apart. With supporting text the text is two lines, 2px apart:
// SemiBold Text-primary over Regular Text-secondary.
//
// Figma → props
//   Text / Supporting text   → primary / secondary
//   date                     → CellDate
//   Checkbox, Avatar, Thumbnail, Illustration → start
//   Icon                     → end (or start for a lone icon)
//   Button, Badge, Dropdown  → children

export interface CellContentProps {
  start?: ReactNode
  primary?: ReactNode
  secondary?: ReactNode
  end?: ReactNode
  children?: ReactNode
  /** Makes the text a link-style action that turns Text-button-hover on hover. */
  link?: boolean
}

export function CellContent({ start, primary, secondary, end, children, link }: CellContentProps) {
  return (
    <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.sm}px`, minWidth: 0 })}>
      {start}
      {(primary !== undefined || secondary !== undefined) && (
        <Box
          className={link ? 'ds-cell-link' : undefined}
          sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xxs}px`, minWidth: 0, flex: '0 1 auto' })}
        >
          <Box component="span" sx={{ fontWeight: secondary !== undefined ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {primary}
          </Box>
          {secondary !== undefined && (
            <Box
              component="span"
              className="ds-cell-secondary"
              sx={(theme) => ({ color: theme.tokens.semantic.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })}
            >
              {secondary}
            </Box>
          )}
        </Box>
      )}
      {children}
      {end}
    </Box>
  )
}

/** Figma date cell: "Jan 1," at 14px over the year at 12px in Text-secondary. */
export function CellDate({ date, locale = 'en-GB' }: { date: Date; locale?: string }) {
  const day = date.toLocaleDateString(locale, { day: 'numeric', month: 'short' })
  return (
    <Box component="time" dateTime={date.toISOString().slice(0, 10)} sx={{ display: 'flex', flexDirection: 'column' }}>
      <span>{day},</span>
      <Box component="span" className="ds-cell-secondary" sx={(theme) => ({ fontSize: 12, lineHeight: 1.2, color: theme.tokens.semantic.textSecondary })}>
        {date.getFullYear()}
      </Box>
    </Box>
  )
}

export type ThumbnailType = 'course' | 'your-content' | 'lesson'

/** Figma Thumbnail type (9537:7400): Course 72×44 radius 8; Your content 44×64 and Lesson 44×44, radius 4. */
export function TableThumbnail({ type = 'course', src, alt = '' }: { type?: ThumbnailType; src: string; alt?: string }) {
  const size = { course: [72, 44, 8], 'your-content': [44, 64, 4], lesson: [44, 44, 4] }[type]
  return <Box component="img" src={src} alt={alt} sx={{ width: size[0], height: size[1], borderRadius: `${size[2]}px`, objectFit: 'cover', flexShrink: 0, display: 'block' }} />
}
