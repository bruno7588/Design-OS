import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { SxProps, Theme } from '@mui/material/styles'

// Shared parts of the 5Mins cards (Figma Cards page).
//
// CardRoot: the surface. Cards-background, a 12px corner by default, Shadow S in light mode
// (Figma draws no shadow in dark mode), Cards-background-hover on hover. Forced-state class
// ds-hover is for docs and visual tests.
//
// CardTitle: when the card opens something (onClick), its title is the button and its hit
// area stretches over the whole card. Buttons inside the card sit above it and stay separate,
// so there is never a button inside a button.

export interface CardRootProps {
  children: ReactNode
  className?: string
  radius?: 's' | 'sm'
  /** Figma's disabled cards keep their hover fill, so hover stays on unless this is false. */
  hover?: boolean
  sx?: SxProps<Theme>
  'data-testid'?: string
}

export function CardRoot({ children, className, radius = 'sm', hover = true, sx, ...rest }: CardRootProps) {
  return (
    <Box
      component="article"
      className={['ds-card', className].filter(Boolean).join(' ')}
      sx={[
        (theme) => {
          const t = theme.tokens
          return {
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
            borderRadius: `${t.radius[radius]}px`,
            backgroundColor: t.semantic.cardsBackground,
            boxShadow: t.mode === 'light' ? t.shadow.s : 'none',
            fontFamily: theme.typography.fontFamily,
            transition: 'background-color 150ms',
            ...(hover && { '&:hover, &.ds-hover': { backgroundColor: t.semantic.cardsBackgroundHover } }),
            // The focus ring goes round the whole card when its title button has keyboard focus.
            '&:has(.ds-card-title.Mui-focusVisible)': { outline: `2px solid ${t.semantic.primaryButtonBackground}`, outlineOffset: 2 },
            // Anything interactive inside the card sits above the stretched title.
            '& .MuiButton-root, & .MuiIconButton-root, & .ds-card-action': { position: 'relative', zIndex: 1 },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  )
}

export interface CardTitleProps {
  children: ReactNode
  onClick?: () => void
  sx?: SxProps<Theme>
}

/** The card title: a heading, and the card's button when it opens something. */
export function CardTitle({ children, onClick, sx }: CardTitleProps) {
  const style = [
    { m: 0, p: 0, font: 'inherit', color: 'inherit', textAlign: 'left' as const, overflowWrap: 'anywhere' as const },
    ...(Array.isArray(sx) ? sx : [sx]),
  ]
  return (
    <Box component="h3" className="ds-card-heading" sx={style}>
      {onClick ? (
        <ButtonBase
          className="ds-card-title"
          onClick={onClick}
          disableRipple
          sx={{
            display: 'inline',
            font: 'inherit',
            color: 'inherit',
            textAlign: 'inherit',
            verticalAlign: 'baseline',
            // Stretch the hit area over the card.
            '&::after': { content: '""', position: 'absolute', inset: 0 },
          }}
        >
          {children}
        </ButtonBase>
      ) : (
        children
      )}
    </Box>
  )
}

/** Clamp text to a number of lines, with an ellipsis. */
export const clamp = (lines: number) =>
  lines === 1
    ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }
    : { overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' as const }
