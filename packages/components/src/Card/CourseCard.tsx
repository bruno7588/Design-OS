import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { Clock, PlayCircle } from 'iconsax-react'
import { Badge } from '../Badge/Badge'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { CardRoot, CardTitle, clamp } from './CardBase'

// 5Mins Course card (Figma Card/Courses: dark 5132:5756, light 11916:10292): a course or
// playlist, a group of lessons.
//
// Figma → props
//   Device=Desktop / Mobile → device "desktop" (300 wide) | "mobile" (272 wide)
//   New=true                → isNew: the New pill, top left of the image
//   Due date=true           → dueDate: the Warning Badge on Cards-background, top right
//   State=Hover             → :hover (desktop): Cards-background-hover, the picture zooms 1.12×

export interface CourseCardProps {
  device?: 'desktop' | 'mobile'
  title: string
  image?: string
  /** "17 lessons" */
  lessons?: string
  /** "20 min" */
  duration?: string
  /** 0 to 100, in Selected. */
  progress?: number
  isNew?: boolean
  /** "Due on Aug 20" */
  dueDate?: string
  onClick?: () => void
  className?: string
  sx?: SxProps<Theme>
}

export function CourseCard({ device = 'desktop', title, image, lessons, duration, progress = 0, isNew, dueDate, onClick, className, sx }: CourseCardProps) {
  const mobile = device === 'mobile'
  const icon = mobile ? 14 : 16

  return (
    <CardRoot
      className={['ds-course-card', className].filter(Boolean).join(' ')}
      hover={!mobile}
      sx={[
        (theme) => ({
          display: 'flex',
          flexDirection: 'column',
          width: mobile ? 272 : 300,
          ...(!mobile && {
            '&:hover .ds-course-picture, &.ds-hover .ds-course-picture': { transform: 'scale(1.12)' },
          }),
          '@media (prefers-reduced-motion: reduce)': { '& .ds-course-picture': { transition: 'none' } },
          '& .MuiLinearProgress-bar': { backgroundColor: theme.tokens.semantic.selected },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ position: 'relative', height: mobile ? 120 : 140, overflow: 'hidden', flexShrink: 0 }}>
        <Box
          className="ds-course-picture"
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            backgroundColor: theme.tokens.semantic.inputBackground,
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
          })}
        />
        {isNew && (
          <Box
            component="span"
            sx={(theme) => ({
              position: 'absolute',
              top: 10,
              left: 10,
              padding: `${theme.tokens.space.xs}px ${theme.tokens.space.s}px`,
              borderRadius: `${theme.tokens.radius.ml}px`,
              backgroundColor: theme.tokens.palette.danger[400],
              color: theme.tokens.palette.neutral[25],
              fontSize: 12,
              fontWeight: 500,
              lineHeight: 1.5,
            })}
          >
            New
          </Box>
        )}
        {dueDate && (
          <Badge
            type="warning"
            label={dueDate}
            sx={(theme) => ({
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: theme.tokens.semantic.cardsBackground,
              ...(mobile && { fontSize: 12, fontWeight: 400 }),
            })}
          />
        )}
        <ProgressBar value={progress} aria-label="Progress" sx={{ position: 'absolute', left: 0, bottom: 0, height: 2 }} />
      </Box>
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${mobile ? theme.tokens.space.sm : theme.tokens.space.m}px`, padding: `${mobile ? theme.tokens.space.m : theme.tokens.space.l}px` })}>
        <CardTitle onClick={onClick} sx={(theme) => ({ height: mobile ? 63 : 72, fontSize: mobile ? 14 : 16, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary, ...clamp(3) })}>
          {title}
        </CardTitle>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: `${theme.tokens.space.s}px`,
            minHeight: 21,
            color: theme.tokens.semantic.textSecondary,
            fontSize: mobile ? 12 : 14,
            lineHeight: mobile ? 1.2 : 1.5,
            '& > span': { display: 'inline-flex', alignItems: 'center', gap: `${theme.tokens.space.xs}px`, whiteSpace: 'nowrap' },
          })}
        >
          {lessons && (
            <span>
              <PlayCircle size={icon} color="currentColor" aria-hidden />
              {lessons}
            </span>
          )}
          {duration && (
            <span>
              <Clock size={icon} color="currentColor" aria-hidden />
              {duration}
            </span>
          )}
        </Box>
      </Box>
    </CardRoot>
  )
}
