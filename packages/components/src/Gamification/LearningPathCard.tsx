import { useId, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import type { SxProps, Theme } from '@mui/material/styles'
import { ArrowDown2, ArrowUp2, InfoCircle, TickCircle } from 'iconsax-react'
import { Button } from '../Button/Button'
import { CardRoot } from '../Card/CardBase'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { CertificateCard, type CertificateTier } from './CertificateCard'
import { LevelIllustration, type SkillLevel } from './LevelIllustration'

// 5Mins Learning path card (Figma Learning path: dark 5514:8463, light 11984:7015): one step
// of a learner's path, a skill level or the certificate at the end.
//
// Figma → props
//   Type=Level / Certificate                    → type
//   State=In progress / Completed / Disabled   → state 'in-progress' / 'completed' / 'disabled'
//   State=Pending (Type=Certificate)            → state 'pending'
//   Size=s (343) / md (408) / l (900)           → size
//   Expanded=false / true                       → expanded (s: the topic list opens under a chevron; l: always open)
//   Modules=true / false                        → topics (shown when there are any)
//
// Radius 12 on every size. Level, s: padding 16. The 56px shield, then the title (Bold 16) and description
// (Regular 12), the topics, the progress and a full-width Medium button. md: the shield, the
// title and the progress. l: padding 24, the 72px shield; the title (Bold 20), blurb
// and button in a row, the topics wrap, then the progress.
// In progress has a 4px inner edge on the right and bottom in Primary-500, Completed in
// Success-500 with a tick. Disabled greys the shield and every text.
// A completed certificate is a <CertificateCard>.

export type LearningPathState = 'in-progress' | 'completed' | 'disabled' | 'pending'

export interface LearningPathCardProps {
  type?: 'level' | 'certificate'
  state: LearningPathState
  size?: 's' | 'md' | 'l'
  /** Level cards: the shield. */
  level?: SkillLevel
  /** Certificate cards: the medal. */
  tier?: CertificateTier
  title: string
  description?: string
  topics?: string[]
  /** s only; l always lists every topic. Uncontrolled when left out. */
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Modules done out of the total, e.g. { value: 80, total: 120 }. */
  progress?: { value: number; total: number }
  /** The button: "Keep Learning" on a level in progress, "Get Started" on a pending certificate. */
  actionLabel?: string
  onAction?: () => void
  /** A completed certificate. */
  onDownload?: () => void
  className?: string
  sx?: SxProps<Theme>
}

export function LearningPathCard({
  type = 'level',
  state,
  size = 's',
  level = 1,
  tier = 'master',
  title,
  description,
  topics = [],
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  progress,
  actionLabel,
  onAction,
  onDownload,
  className,
  sx,
}: LearningPathCardProps) {
  const id = useId()
  const [expandedState, setExpandedState] = useState(defaultExpanded)
  const expanded = expandedProp ?? expandedState
  const setExpanded = (v: boolean) => {
    setExpandedState(v)
    onExpandedChange?.(v)
  }

  if (type === 'certificate' && state === 'completed') {
    return <CertificateCard tier={tier} size={size === 'l' ? 'large' : size === 'md' ? 'md' : 'small'} title={title} subtitle={description} onDownload={onDownload} className={className} sx={sx} />
  }

  const large = size === 'l'
  const disabled = state === 'disabled'
  const art =
    type === 'certificate' ? (
      <LevelIllustration level={tier} size={large ? 'large' : 'small'} disabled={disabled} />
    ) : (
      <LevelIllustration level={level} size={large ? 'large' : 'small'} disabled={disabled} />
    )
  const action = actionLabel && !disabled && (state === 'in-progress' || state === 'pending') && (
    <Button variant="contained" fullWidth={size === 's'} onClick={onAction} sx={{ flexShrink: 0 }}>
      {actionLabel}
    </Button>
  )
  const tick = state === 'completed' && (
    <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0, color: theme.tokens.palette.success[500] })}>
      <TickCircle size={24} variant="Bold" color="currentColor" aria-label="Completed" role="img" />
    </Box>
  )
  const progressRow = progress && state === 'in-progress' && (
    <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.s}px`, width: '100%' })}>
      <ProgressBar value={(progress.value / progress.total) * 100} aria-label={`${progress.value} of ${progress.total} modules`} sx={{ flex: 1, width: 'auto' }} />
      <Box component="span" aria-hidden sx={(theme) => ({ fontSize: large ? 14 : 12, lineHeight: large ? 1.5 : 1.2, color: theme.tokens.semantic.textSecondary, whiteSpace: 'nowrap' })}>
        {progress.value}/{progress.total}
      </Box>
    </Box>
  )
  const pill = (topic: string, key?: number) => (
    <Box
      component="li"
      key={key}
      className="ds-learning-path-topic"
      sx={(theme) => ({
        boxSizing: 'border-box',
        padding: large ? `${theme.tokens.space.s}px ${theme.tokens.space.m}px` : `${theme.tokens.space.s}px ${theme.tokens.space.sm}px`,
        border: `1px solid ${theme.tokens.semantic.border}`,
        borderRadius: `${theme.tokens.radius.s}px`,
        fontSize: large ? 14 : 12,
        lineHeight: large ? 1.5 : 1.2,
        color: disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic.textTertiary,
      })}
    >
      {topic}
    </Box>
  )
  const listSx = (theme: Theme) => ({ m: 0, p: 0, listStyle: 'none', display: 'flex', gap: `${theme.tokens.space[large ? 'sm' : 's']}px` })
  const topicsBlock =
    topics.length > 0 &&
    (large ? (
      <Box component="ul" aria-label="Topics" sx={(theme) => ({ ...listSx(theme), flexWrap: 'wrap', width: '100%' })}>
        {topics.map((t, i) => pill(t, i))}
      </Box>
    ) : (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
        <Box component="ul" id={`${id}-topics`} aria-label="Topics" sx={(theme) => ({ ...listSx(theme), flexDirection: 'column', alignItems: 'flex-start' })}>
          {(expanded ? topics : topics.slice(0, 1)).map((t, i) => pill(t, i))}
        </Box>
        {topics.length > 1 && (
          <IconButton
            className="ds-card-action"
            aria-expanded={expanded}
            aria-controls={`${id}-topics`}
            aria-label={expanded ? 'Show fewer topics' : `Show all ${topics.length} topics`}
            onClick={() => setExpanded(!expanded)}
            sx={(theme) => ({ width: 32, height: 32, p: 0, color: disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic.textTertiary })}
          >
            {expanded ? <ArrowUp2 size={20} color="currentColor" /> : <ArrowDown2 size={20} color="currentColor" />}
          </IconButton>
        )}
      </Box>
    ))

  const titleEl = (
    <Box component="h3" sx={(theme) => ({ m: 0, flex: 1, minWidth: 0, fontSize: large ? 20 : 16, fontWeight: 700, lineHeight: 1.5, color: disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic.textPrimary })}>
      {title}
    </Box>
  )
  const descEl = description && (
    <Box sx={(theme) => ({ fontSize: large ? 16 : 12, lineHeight: large ? 1.5 : 1.2, color: disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic.textSecondary })}>{description}</Box>
  )
  const pending = type === 'certificate' && state === 'pending'
  const pendingNote = pending && size === 'md' && (
    <Box sx={(theme) => ({ fontSize: 12, lineHeight: 1.5, color: theme.tokens.semantic.textWarning })}>Certificate pending</Box>
  )

  let body
  if (large) {
    body = (
      <>
        {art}
        <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.l}px`, alignSelf: 'center' })}>
          <Box sx={(theme) => ({ display: 'flex', alignItems: type === 'certificate' ? 'center' : 'flex-start', gap: `${theme.tokens.space.l}px` })}>
            <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px` })}>
              {titleEl}
              {descEl}
            </Box>
            {action}
            {tick}
          </Box>
          {topicsBlock}
          {progressRow}
        </Box>
      </>
    )
  } else if (size === 'md') {
    body = (
      <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.s}px`, width: '100%' })}>
        {art}
        <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space[pending ? 'xs' : 's']}px` })}>
          {titleEl}
          {pendingNote}
          {progressRow}
        </Box>
        {pending && (
          <Box sx={(theme) => ({ display: 'flex', alignSelf: 'flex-start', color: theme.tokens.semantic.textWarning })}>
            <InfoCircle size={24} color="currentColor" aria-hidden />
          </Box>
        )}
        {tick}
      </Box>
    )
  } else {
    body = (
      <>
        <Box sx={(theme) => ({ display: 'flex', alignItems: type === 'certificate' ? 'center' : 'flex-start', gap: `${theme.tokens.space.s}px`, width: '100%' })}>
          {art}
          <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px` })}>
            <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px` })}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {titleEl}
                {tick}
              </Box>
              {descEl}
            </Box>
            {topicsBlock}
            {progressRow}
          </Box>
        </Box>
        {action}
      </>
    )
  }

  const edge = state === 'in-progress' ? 'primary' : state === 'completed' ? 'success' : null
  return (
    <CardRoot
      hover={false}
      className={['ds-learning-path-card', `ds-${state}`, className].filter(Boolean).join(' ')}
      sx={[
        (theme) => {
          const t = theme.tokens
          const shadows = [t.mode === 'light' ? t.shadow.s : '', edge ? `inset -4px -4px 0 ${t.palette[edge][500]}` : ''].filter(Boolean)
          return {
            display: 'flex',
            flexDirection: large ? 'row' : 'column',
            alignItems: large ? 'flex-start' : 'stretch',
            gap: `${large ? t.space.m : t.space.m}px`,
            width: large ? '100%' : size === 'md' ? 408 : 343,
            maxWidth: '100%',
            padding: `${large ? t.space.l : t.space.m}px`,
            borderRadius: `${t.radius.sm}px`,
            boxShadow: shadows.length ? shadows.join(', ') : 'none',
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {body}
    </CardRoot>
  )
}
