import { forwardRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '../Button/Button'
import emptyBox from './illustrations/empty-box.svg'
import noActivity from './illustrations/no-activity.svg'
import resources from './illustrations/resources.svg'
import search from './illustrations/search.svg'

// 5Mins Empty state (Figma: dark 5452:37234, light 11921:5779). Implements
// playground/docs/design-system/empty-state.md. MUI has no empty state, so this is a small
// layout of MUI Typography and the 5Mins Button, on tokens only:
//   Desktop: padding 24, gap 20, title Bold 20, description up to 600px
//   Mobile:  padding 16, gap 16, title Bold 16, description full width
//   Both:    72px illustration, info gap 8, Outlined + Filled Medium buttons 16px apart, radius 20
//   Surface=Dropzone (added to Figma 2026-09-29, from the prototype): an area the admin fills
//            themselves. Input-background, a dashed Border-elevated outline (8px dashes, 8px gaps,
//            1px inside), padding 32 on desktop, the full width of its area.
//
// Figma → props
//   Device=Desktop / Mobile      → device
//   Surface=Plain / Dropzone     → surface
//   Illustrations Empty state    → illustration (a name from ILLUSTRATIONS, or any node)
//   CTA (Outlined, Filled)       → secondaryAction, primaryAction

/** Illustrations exported from the Figma set (9120:8372). Neutral palette: the same in both modes. */
export const ILLUSTRATIONS = { 'empty-box': emptyBox, search, resources, 'no-activity': noActivity } as const
export type IllustrationName = keyof typeof ILLUSTRATIONS

export interface EmptyStateAction {
  label: string
  onClick: () => void
  icon?: ReactNode
}

export interface EmptyStateProps {
  title: string
  description?: ReactNode
  illustration?: IllustrationName | ReactNode
  primaryAction?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  device?: 'desktop' | 'mobile'
  surface?: 'plain' | 'dropzone'
  /** The heading level of the title. */
  titleComponent?: 'h2' | 'h3' | 'h4'
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, illustration = 'empty-box', primaryAction, secondaryAction, device = 'desktop', surface = 'plain', titleComponent = 'h2' },
  ref,
) {
  const mobile = device === 'mobile'
  const dropzone = surface === 'dropzone'
  const art =
    typeof illustration === 'string' && illustration in ILLUSTRATIONS ? (
      <Box component="img" src={ILLUSTRATIONS[illustration as IllustrationName]} alt="" sx={{ width: 72, height: 72, display: 'block' }} />
    ) : (
      illustration
    )
  return (
    <Box
      ref={ref}
      sx={(theme) => {
        const t = theme.tokens
        return {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: `${mobile ? t.space.m : dropzone ? t.space.xl : t.space.l}px`,
          gap: `${mobile ? t.space.m : t.space.ml}px`,
          borderRadius: `${t.radius.ml}px`,
          width: mobile || dropzone ? '100%' : 'auto',
          boxSizing: 'border-box',
          ...(dropzone && { backgroundColor: t.semantic.inputBackground }),
        }
      }}
    >
      {dropzone && (
        // A CSS dashed border can't set the dash length or gap: an SVG outline can.
        // A 2px stroke centred on the edge, clipped by the SVG, shows 1px inside.
        <Box
          component="svg"
          aria-hidden
          className="ds-dropzone-outline"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}
        >
          <Box
            component="rect"
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="20"
            ry="20"
            fill="none"
            strokeWidth={2}
            strokeDasharray="8 8"
            sx={(theme) => ({ stroke: theme.tokens.semantic.borderElevated })}
          />
        </Box>
      )}
      <Box sx={{ width: 72, height: 72, flexShrink: 0, display: 'grid', placeItems: 'center' }}>{art}</Box>
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${theme.tokens.space.s}px` })}>
        <Typography component={titleComponent} sx={(theme) => ({ m: 0, fontSize: mobile ? 16 : 20, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary })}>
          {title}
        </Typography>
        {description && (
          <Typography sx={(theme) => ({ m: 0, maxWidth: mobile ? 'none' : 600, fontSize: 14, lineHeight: 1.5, color: theme.tokens.semantic.textSecondary })}>
            {description}
          </Typography>
        )}
      </Box>
      {(primaryAction || secondaryAction) && (
        <Box sx={(theme) => ({ display: 'flex', gap: `${theme.tokens.space.m}px`, justifyContent: 'center', flexWrap: 'wrap' })}>
          {secondaryAction && (
            <Button variant="outlined" icon={secondaryAction.icon} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button icon={primaryAction.icon} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
})
