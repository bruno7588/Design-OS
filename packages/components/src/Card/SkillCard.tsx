import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import type { SxProps, Theme } from '@mui/material/styles'
import { CloseOutlineIcon } from '../icons/FigmaIcons'

// 5Mins Skill card (Figma Card/skill: dark 11802:3704, light 11828:5184): a skill as a compact
// outlined tag.
//
// Figma → props
//   Remove=true    → onRemove: the close button (named "Remove" plus the skill)
//   Disabled=true  → disabled: greyscale icon, Text-disabled, no remove
//   State=Hover    → :hover: Page-background-hover fill, Border-hover outline

export interface SkillCardProps {
  label: string
  /** The 20px skill illustration. */
  icon?: ReactNode
  onRemove?: () => void
  disabled?: boolean
  className?: string
  sx?: SxProps<Theme>
}

export function SkillCard({ label, icon, onRemove, disabled = false, className, sx }: SkillCardProps) {
  return (
    <Box
      className={['ds-skill-card', className].filter(Boolean).join(' ')}
      aria-disabled={disabled || undefined}
      sx={[
        (theme) => {
          const t = theme.tokens
          const s = t.semantic
          return {
            display: 'inline-flex',
            alignItems: 'center',
            gap: `${t.space.s}px`,
            boxSizing: 'border-box',
            padding: `${t.space.s}px ${t.space.sm}px`,
            // Figma draws the 1px stroke inside the 37px card.
            boxShadow: `inset 0 0 0 1px ${s.border}`,
            borderRadius: `${t.radius.sm}px`,
            fontFamily: theme.typography.fontFamily,
            fontSize: 14,
            lineHeight: 1.5,
            color: disabled ? s.textDisabled : s.textSecondary,
            transition: 'background-color 150ms, box-shadow 150ms',
            ...(!disabled && { '&:hover, &.ds-hover': { backgroundColor: s.pageBackgroundHover, boxShadow: `inset 0 0 0 1px ${s.borderHover}` } }),
            '& .ds-skill-icon': { display: 'flex', width: 20, height: 20, flexShrink: 0, filter: disabled ? 'grayscale(1)' : undefined },
            '& .ds-skill-icon > svg, & .ds-skill-icon > img': { width: 20, height: 20 },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon && (
        <Box component="span" className="ds-skill-icon" aria-hidden>
          {icon}
        </Box>
      )}
      <span>{label}</span>
      {onRemove && !disabled && (
        <IconButton
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          disableRipple
          sx={(theme) => ({
            width: 20,
            height: 20,
            padding: 0,
            color: 'inherit',
            '&:hover': { color: theme.tokens.semantic.textPrimary },
            '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}` },
          })}
        >
          <CloseOutlineIcon size={20} />
        </IconButton>
      )}
    </Box>
  )
}
