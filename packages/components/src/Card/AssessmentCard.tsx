import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import type { SxProps, Theme } from '@mui/material/styles'
import { Edit2, Lock, TickCircle } from 'iconsax-react'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { CardRoot, CardTitle, clamp } from './CardBase'
import { AssessmentIllustration, ASSESSMENT_TYPES, type AssessmentType } from './illustrations'

// 5Mins Assessment card (Figma Card/Assessments: dark 10242:2782, light 12104:3647). The
// assessment illustration stands in for a thumbnail.
//
// Figma → props
//   Device=Web App / Admin / Mobile app → device "web" | "admin" | "mobile"
//   Disabled=true   → disabled: grey illustration, Text-disabled, a Bold lock
//   Completed=true  → completed: a Success tick after the type and a Review button
//   State=Hover     → :hover (className ds-hover forces it)
//   Admin           → onEdit (the edit-2 button) and the Assessment badge

export interface AssessmentCardProps {
  device?: 'web' | 'admin' | 'mobile'
  title: string
  /** The illustration, and the type line unless typeLabel is set. */
  type?: AssessmentType
  typeLabel?: string
  completed?: boolean
  disabled?: boolean
  onClick?: () => void
  onReview?: () => void
  onEdit?: () => void
  badge?: string
  className?: string
  sx?: SxProps<Theme>
}

export function AssessmentCard({
  device = 'web',
  title,
  type = 'multiple-choice',
  typeLabel = ASSESSMENT_TYPES[type],
  completed = false,
  disabled = false,
  onClick,
  onReview,
  onEdit,
  badge = 'Assessment',
  className,
  sx,
}: AssessmentCardProps) {
  const mobile = device === 'mobile'
  const done = completed && !disabled && device !== 'admin'
  const grey = { filter: disabled ? 'grayscale(1)' : undefined }
  const size = mobile ? 56 : device === 'admin' ? 48 : 80
  const titleSize = mobile ? 14 : 16
  const cls = ['ds-assessment-card', className].filter(Boolean).join(' ')

  const heading = (
    <CardTitle
      onClick={onClick}
      sx={(theme) => ({
        fontSize: titleSize,
        fontWeight: 700,
        lineHeight: 1.5,
        color: disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic.textPrimary,
        ...(mobile ? {} : clamp(1)),
      })}
    >
      {title}
    </CardTitle>
  )
  const typeLine = (
    <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.s}px`, minWidth: 0 })}>
      <Box
        component="p"
        sx={(theme) => ({
          m: 0,
          fontSize: mobile ? 12 : 14,
          lineHeight: mobile ? 1.2 : 1.5,
          color: disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic.textSecondary,
          ...clamp(1),
        })}
      >
        {typeLabel}
      </Box>
      {done && (
        <Box component="span" sx={(theme) => ({ display: 'flex', flexShrink: 0, color: theme.tokens.palette.success[500] })}>
          <TickCircle size={mobile ? 16 : 20} variant="Bold" color="currentColor" aria-label="Completed" />
        </Box>
      )}
    </Box>
  )
  const lock = disabled && device !== 'admin' && <Lock size={mobile ? 20 : 24} variant="Bold" color="currentColor" style={{ flexShrink: 0 }} aria-label="Locked" />
  const review = (size: 'small' | 'medium') => (
    <Button variant="outlined" size={size} onClick={onReview}>
      Review
    </Button>
  )

  if (mobile) {
    return (
      <CardRoot
        className={cls}
        sx={[
          (theme) => ({
            display: 'flex',
            alignItems: done ? 'flex-start' : 'center',
            gap: `${theme.tokens.space.s}px`,
            padding: `${theme.tokens.space.sm}px`,
            color: disabled ? theme.tokens.semantic.textDisabled : undefined,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <AssessmentIllustration type={type} device="mobile" sx={grey} />
        <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: `${done ? theme.tokens.space.sm : theme.tokens.space.xs}px` })}>
          <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px`, alignSelf: 'stretch', minWidth: 0 })}>
            {heading}
            {typeLine}
          </Box>
          {done && review('small')}
        </Box>
        {lock}
      </CardRoot>
    )
  }

  if (device === 'admin') {
    return (
      <CardRoot className={cls} sx={[(theme) => ({ display: 'flex', alignItems: 'flex-start', gap: `${theme.tokens.space.sm}px`, padding: `${theme.tokens.space.sm}px` }), ...(Array.isArray(sx) ? sx : [sx])]}>
        <AssessmentIllustration type={type} device="desktop" size={48} />
        <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px` })}>
          {heading}
          {typeLine}
        </Box>
        <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.s}px`, flexShrink: 0 })}>
          {onEdit && (
            <IconButton
              aria-label={`Edit ${title}`}
              onClick={onEdit}
              disableRipple
              sx={(theme) => ({
                width: 22,
                height: 22,
                padding: '3px',
                color: theme.tokens.semantic.textSecondary,
                '&:hover': { backgroundColor: theme.tokens.semantic.inputBackgroundHover, color: theme.tokens.semantic.textPrimary },
                '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}` },
              })}
            >
              <Edit2 size={16} color="currentColor" />
            </IconButton>
          )}
          <Badge label={badge} className="ds-card-action" />
        </Box>
      </CardRoot>
    )
  }

  // Web app
  const trailing = lock || (done && review('medium'))
  return (
    <CardRoot
      className={cls}
      sx={[
        (theme) => {
          const t = theme.tokens
          return {
            display: 'flex',
            alignItems: 'center',
            gap: `${t.space.m}px`,
            padding: `${t.space.m}px ${disabled ? t.space.l : t.space.m}px ${t.space.m}px ${t.space.m}px`,
            color: disabled ? t.semantic.textDisabled : undefined,
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AssessmentIllustration type={type} device="desktop" sx={grey} />
      <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.s}px` })}>
        {heading}
        {typeLine}
      </Box>
      {trailing}
    </CardRoot>
  )
}
