import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { alpha, type SxProps, type Theme } from '@mui/material/styles'
import { Danger, Lock, TickCircle } from 'iconsax-react'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Tag, type TagType } from '../Tag/Tag'
import { CardRoot, CardTitle, clamp } from './CardBase'

// 5Mins Lesson card (Figma Card/Lessons: dark 5144:14181, light 11916:9353). Built from the
// tokens and the 5Mins Tag, Badge, Button and Progress bar.
//
// Figma → props
//   View=grid                  → view "grid": the 170 × 230 tile
//   View=list, Device=Mobile   → view "list", device "mobile"
//   View=list, Device=Admin    → view "list", device "admin"
//   View=list, Device=Web app  → view "list", device "web"
//   Disabled / Completed       → disabled / completed
//   Quiz=Pending               → quiz "pending": Take Quiz, or Retake Quiz once the lesson is completed
//   Quiz=Completed (mobile), Completed + Quiz=n/a (web) → quiz "passed": Retake Quiz, disabled
//   State=Hover                → :hover (className ds-hover forces it)

export type LessonCardDevice = 'web' | 'admin' | 'mobile'

export interface LessonCardProps {
  view?: 'grid' | 'list'
  device?: LessonCardDevice
  title: string
  /** Grid: the instructor. */
  instructor?: string
  /** List rows: "Lesson · Instructor name · 4min". */
  meta?: string
  /** Thumbnail image URL. */
  image?: string
  /** Grid: the video length, such as "3m 45s". */
  duration?: string
  /** 0 to 100. Completed lessons show a full Success bar. */
  progress?: number
  completed?: boolean
  disabled?: boolean
  quiz?: 'pending' | 'passed'
  onQuiz?: () => void
  /** Opens the lesson; the title becomes the card's button. */
  onClick?: () => void
  mediaType?: TagType
  /** Admin: the content-type badge. */
  badge?: string
  className?: string
  sx?: SxProps<Theme>
}

// Figma resizes the media Tag inside two rows. Mobile: 22px, padding 4, a 14px icon.
// Admin: 20px, padding 2, a 16px icon (Figma scales the corner to 5.7; the Tag keeps its 8).
const TAG_MOBILE = { width: 22, height: 22, '& svg': { width: 14, height: 14 } }
const TAG_ADMIN = (theme: Theme) => ({ width: 20, height: 20, padding: `${theme.tokens.space.xxs}px`, '& svg': { width: 16, height: 16 } })

const Thumb = ({ image, size, radius, disabled, children }: { image?: string; size?: number; radius: number; disabled?: boolean; children?: ReactNode }) => (
  <Box
    className="ds-card-thumb"
    sx={(theme) => ({
      position: 'relative',
      flexShrink: 0,
      overflow: 'hidden',
      ...(size ? { width: size, height: size } : { flex: 1, minHeight: 0 }),
      borderRadius: `${radius}px`,
      backgroundColor: theme.tokens.semantic.inputBackground,
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // Figma: the image blends in Luminosity, so it goes grey.
      ...(disabled && { filter: 'grayscale(1)' }),
    })}
  >
    {children}
  </Box>
)

export function LessonCard({
  view = 'list',
  device = 'web',
  title,
  instructor,
  meta,
  image,
  duration,
  progress = 0,
  completed = false,
  disabled = false,
  quiz,
  onQuiz,
  onClick,
  mediaType = 'video',
  badge = 'Lesson',
  className,
  sx,
}: LessonCardProps) {
  const value = completed ? 100 : disabled ? 0 : progress
  const textColour = (theme: Theme, colour: 'textPrimary' | 'textSecondary') => (disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic[colour])
  const titleHover = { '&:hover .ds-card-heading, &.ds-hover .ds-card-heading': { color: 'var(--ds-title-hover)' } }

  const quizButton =
    quiz && !disabled ? (
      quiz === 'pending' && !completed ? (
        <Button variant="outlined" color="warning" size="small" icon={<Danger color="currentColor" />} onClick={onQuiz}>
          Take Quiz
        </Button>
      ) : (
        <Button variant="outlined" size="small" disabled={quiz === 'passed'} onClick={onQuiz}>
          Retake Quiz
        </Button>
      )
    ) : null

  if (view === 'grid') {
    return (
      <CardRoot className={['ds-lesson-card', className].filter(Boolean).join(' ')} sx={[{ display: 'flex', flexDirection: 'column', width: 170, height: 230 }, ...(Array.isArray(sx) ? sx : [sx])]}>
        <Thumb image={image} radius={0} disabled={disabled}>
          <Tag type={mediaType} size="M" sx={{ position: 'absolute', top: 0, left: 0 }} />
          {duration && (
            <Box
              component="span"
              sx={(theme) => ({
                position: 'absolute',
                top: 6,
                right: 6,
                padding: `${theme.tokens.space.xs}px ${theme.tokens.space.xss}px`,
                borderRadius: `${theme.tokens.radius.xs}px`,
                backgroundColor: alpha(theme.tokens.palette.neutral[900], 0.5),
                color: disabled ? theme.tokens.palette.neutral[300] : theme.tokens.palette.neutral[0],
                fontSize: 10,
                lineHeight: 1,
              })}
            >
              {duration}
            </Box>
          )}
          <ProgressBar value={value} aria-label="Progress" sx={{ position: 'absolute', left: 0, bottom: 0, height: 2 }} />
        </Thumb>
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px`, padding: `${theme.tokens.space.m}px` })}>
          <CardTitle onClick={onClick} sx={(theme) => ({ height: 63, fontSize: 14, fontWeight: 700, lineHeight: 1.5, color: textColour(theme, 'textPrimary'), ...clamp(3) })}>
            {title}
          </CardTitle>
          <Box component="p" sx={(theme) => ({ m: 0, fontSize: 12, lineHeight: 1.2, color: textColour(theme, 'textSecondary'), ...clamp(1) })}>
            {instructor}
          </Box>
        </Box>
      </CardRoot>
    )
  }

  const metaLine = (fontSize: number, lineHeight: number) => (
    <Box component="p" sx={(theme) => ({ m: 0, minWidth: 0, fontSize, lineHeight, color: textColour(theme, 'textSecondary'), ...clamp(1) })}>
      {meta}
    </Box>
  )

  if (device === 'mobile') {
    return (
      <CardRoot className={['ds-lesson-card', className].filter(Boolean).join(' ')} radius="s" hover={false} sx={[(theme) => ({ display: 'flex', flexDirection: 'column', color: disabled ? theme.tokens.semantic.textDisabled : undefined }), ...(Array.isArray(sx) ? sx : [sx])]}>
        <Box sx={(theme) => ({ display: 'flex', alignItems: 'flex-start', gap: `${theme.tokens.space.sm}px`, padding: `${theme.tokens.space.sm}px` })}>
          <Thumb image={image} size={56} radius={4} disabled={disabled}>
            <Tag type={mediaType} size="S" sx={[{ position: 'absolute', top: 0, left: 0 }, TAG_MOBILE]} />
          </Thumb>
          <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: `${quizButton ? theme.tokens.space.sm : theme.tokens.space.xs}px` })}>
            <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px`, alignSelf: 'stretch', minWidth: 0 })}>
              <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: 14, fontWeight: 700, lineHeight: 1.5, color: textColour(theme, 'textPrimary') })}>
                {title}
              </CardTitle>
              {metaLine(12, 1.2)}
            </Box>
            {quizButton}
          </Box>
          {disabled && <Lock size={20} variant="Bold" color="currentColor" style={{ flexShrink: 0 }} aria-label="Locked" />}
        </Box>
        {!disabled && <ProgressBar value={value} aria-label="Progress" sx={{ height: 2, borderRadius: 0 }} />}
      </CardRoot>
    )
  }

  if (device === 'admin') {
    return (
      <CardRoot
        className={['ds-lesson-card', className].filter(Boolean).join(' ')}
        sx={[
          (theme) => ({
            '--ds-title-hover': theme.tokens.semantic.textButtonHover,
            display: 'flex',
            alignItems: 'flex-start',
            gap: `${theme.tokens.space.sm}px`,
            padding: `${theme.tokens.space.sm}px`,
            ...titleHover,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Thumb image={image} size={48} radius={8}>
          <Tag type={mediaType} size="S" sx={[{ position: 'absolute', top: 0, left: 0 }, TAG_ADMIN]} />
        </Thumb>
        <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px` })}>
          <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary, ...clamp(1) })}>
            {title}
          </CardTitle>
          {metaLine(14, 1.5)}
        </Box>
        <Badge label={badge} className="ds-card-action" />
      </CardRoot>
    )
  }

  // Web app
  const trailing = disabled ? (
    <Lock size={24} variant="Bold" color="currentColor" style={{ flexShrink: 0 }} aria-label="Locked" />
  ) : (
    quizButton
  )
  return (
    <CardRoot
      className={['ds-lesson-card', className].filter(Boolean).join(' ')}
      sx={[
        (theme) => {
          const t = theme.tokens
          return {
            '--ds-title-hover': disabled ? t.semantic.textDisabled : t.semantic.textButtonHover,
            display: 'flex',
            alignItems: quizButton ? 'flex-start' : 'center',
            gap: `${t.space.m}px`,
            padding: `${t.space.m}px ${trailing ? t.space.l : t.space.m}px ${t.space.m}px ${t.space.m}px`,
            color: disabled ? t.semantic.textDisabled : undefined,
            ...titleHover,
            '&:hover .MuiLinearProgress-root, &.ds-hover .MuiLinearProgress-root': { backgroundColor: t.semantic.borderElevated },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Thumb image={image} size={80} radius={8} disabled={disabled}>
        <Tag type={mediaType} size="M" sx={{ position: 'absolute', top: 0, left: 0 }} />
      </Thumb>
      <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.s}px` })}>
        <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: textColour(theme, 'textPrimary'), ...clamp(2) })}>
          {title}
        </CardTitle>
        <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${completed ? theme.tokens.space.s : theme.tokens.space.l}px`, minWidth: 0 })}>
          {metaLine(14, 1.5)}
          {completed && !disabled && (
            <Box component="span" sx={(theme) => ({ display: 'flex', flexShrink: 0, color: theme.tokens.palette.success[500] })}>
              <TickCircle size={20} variant="Bold" color="currentColor" aria-label="Completed" />
            </Box>
          )}
          {!completed && !quiz && !disabled && <ProgressBar value={value} width={96} aria-label="Progress" sx={{ height: 4 }} />}
        </Box>
      </Box>
      {trailing}
    </CardRoot>
  )
}
