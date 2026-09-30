import { useId, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import type { SxProps, Theme } from '@mui/material/styles'
import { CloseCircle, TickCircle } from 'iconsax-react'
import clap from './art/emoji-clap.svg'
import smile from './art/emoji-smile.svg'

// 5Mins Quiz options (Figma Quiz/Options: dark 5504:24966, light 12112:10047): the answers to a
// quiz question as a radio group, then the result once the learner has answered.
//
// Figma → props
//   Selected=true                      → value (Secondary-500 row, SemiBold Neutral-800, the radio in Neutral-800)
//   State=Read only, Validation=Success → answer + revealed: the picked right answer turns Success-500 with a tick
//   State=Read only, Validation=Error   → the picked wrong answer turns Danger-500 with a cross
//   Selected=false, Validation=…        → the others show a tick (the right answer) or a cross, in Text-primary
//   State=Hover (Desktop)               → :hover, Cards-background-hover (plain rows, before and after checking)
//   Disabled=true                       → disabled: Text-disabled
//   Device=Mobile / Desktop             → the same row; the text wraps on narrow screens
//   Explanation=true                   → <QuizExplanation> under the options

export interface QuizOption {
  value: string
  label: ReactNode
  /** For docs and visual tests: ds-hover. */
  className?: string
}

export interface QuizOptionsProps {
  /** The question, which names the radio group. */
  label: string
  options: QuizOption[]
  value: string | null
  onChange?: (value: string) => void
  /** The right answer. With revealed, every row shows whether it was right. */
  answer?: string
  revealed?: boolean
  disabled?: boolean
  className?: string
  sx?: SxProps<Theme>
}

export function QuizOptions({ label, options, value, onChange, answer, revealed = false, disabled = false, className, sx }: QuizOptionsProps) {
  const name = useId()
  const locked = revealed || disabled
  return (
    <Box
      role="radiogroup"
      aria-label={label}
      className={['ds-quiz-options', className].filter(Boolean).join(' ')}
      sx={[(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px` }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {options.map((o) => {
        const selected = o.value === value
        const correct = revealed && answer !== undefined ? o.value === answer : undefined
        const tone = revealed && selected ? (correct ? 'success' : 'error') : selected ? 'selected' : 'plain'
        const Icon = revealed ? (correct ? TickCircle : CloseCircle) : null
        return (
          <Box
            component="label"
            key={o.value}
            className={['ds-quiz-option', `ds-${tone}`, o.className].filter(Boolean).join(' ')}
            sx={(theme) => {
              const t = theme.tokens
              const s = t.semantic
              // Figma: a 3px inner shadow along the bottom, a shade darker than the fill.
              const look = {
                plain: { bg: s.cardsBackground, edge: s.cardsBackgroundHover, fg: disabled ? s.textDisabled : s.textPrimary, weight: 400 },
                selected: { bg: t.palette.secondary[500], edge: t.palette.secondary[600], fg: t.palette.neutral[800], weight: 600 },
                success: { bg: t.palette.success[500], edge: t.palette.success[600], fg: t.palette.neutral[25], weight: 600 },
                error: { bg: t.palette.danger[500], edge: s.buttonDangerHover, fg: t.palette.neutral[0], weight: 600 },
              }[tone]
              return {
                display: 'flex',
                alignItems: 'center',
                gap: `${t.space.s}px`,
                padding: `${t.space.sm}px`,
                borderRadius: `${t.radius.sm}px`,
                backgroundColor: look.bg,
                boxShadow: `inset 0 -3px 0 ${look.edge}`,
                color: look.fg,
                fontFamily: theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: look.weight,
                lineHeight: 1.5,
                cursor: locked ? 'default' : 'pointer',
                transition: 'background-color 150ms, box-shadow 150ms',
                // Plain rows hover while answering and after checking (Figma Validation rows, State=Hover).
                ...(!disabled && tone === 'plain' && { '&:hover, &.ds-hover': { backgroundColor: s.cardsBackgroundHover, boxShadow: `inset 0 -3px 0 ${s.inputBackground}` } }),
                '&:has(.Mui-focusVisible)': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 2 },
                '& .ds-quiz-mark': { display: 'flex', flexShrink: 0, color: disabled ? s.textDisabled : 'inherit' },
                // Figma: the quiz radio is 20px; on the selected row it's Neutral-800.
                '& .MuiRadio-root': { width: 20, height: 20, padding: 0, flexShrink: 0, color: disabled ? s.textDisabled : s.textPrimary, '&:hover': { backgroundColor: 'transparent' } },
                '& .MuiRadio-root.Mui-checked': { color: t.palette.neutral[800] },
                '& .MuiRadio-root svg': { width: 20, height: 20 },
              }
            }}
          >
            {Icon ? (
              <span className="ds-quiz-mark">
                <Icon size={20} color="currentColor" aria-hidden />
              </span>
            ) : (
              <Radio
                checked={selected}
                onChange={() => onChange?.(o.value)}
                value={o.value}
                name={name}
                disabled={disabled}
              />
            )}
            <Box component="span" sx={{ flex: 1, minWidth: 0 }}>
              {o.label}
              {revealed && (selected || correct) && (
                <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                  {correct ? (selected ? ', your answer, correct' : ', the correct answer') : ', your answer, incorrect'}
                </Box>
              )}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export interface QuizExplanationProps {
  result: 'correct' | 'incorrect'
  /** Defaults to "Well done!" or "Not quite!". */
  title?: string
  children: ReactNode
  sx?: SxProps<Theme>
}

/** The explanation under the options once answered (Figma Quiz/Options Explanation=true). */
export function QuizExplanation({ result, title, children, sx }: QuizExplanationProps) {
  const ok = result === 'correct'
  return (
    <Box
      className="ds-quiz-explanation"
      role="status"
      sx={[
        (theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: `${theme.tokens.space.sm}px`,
          [theme.breakpoints.down('sm')]: { gap: `${theme.tokens.space.s}px` },
          fontFamily: theme.typography.fontFamily,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: `${theme.tokens.space.sm}px`,
          [theme.breakpoints.down('sm')]: { gap: `${theme.tokens.space.s}px` },
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 1.5,
          color: ok ? theme.tokens.palette.success[500] : theme.tokens.semantic.textError,
          '& img': { width: 24, height: 24, [theme.breakpoints.down('sm')]: { width: 20, height: 20 } },
        })}
      >
        <img src={ok ? clap : smile} alt="" />
        {title ?? (ok ? 'Well done!' : 'Not quite!')}
      </Box>
      <Box sx={(theme) => ({ fontSize: 14, lineHeight: 1.5, color: theme.tokens.semantic.textSecondary })}>{children}</Box>
    </Box>
  )
}
