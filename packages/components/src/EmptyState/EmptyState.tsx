import { forwardRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '../Button/Button'
import es_add from './illustrations/add.svg'
import es_addUsers from './illustrations/add-users.svg'
import es_buble from './illustrations/buble.svg'
import es_calendar from './illustrations/calendar.svg'
import es_category from './illustrations/category.svg'
import es_certificates from './illustrations/certificates.svg'
import es_cloud from './illustrations/cloud.svg'
import es_computerScreen from './illustrations/computer-screen.svg'
import es_connectBrain from './illustrations/connect-brain.svg'
import es_customFields from './illustrations/custom-fields.svg'
import es_deactivated from './illustrations/deactivated.svg'
import es_emptyBox from './illustrations/empty-box.svg'
import es_flashcards from './illustrations/flashcards.svg'
import es_hrisMapping from './illustrations/hris-mapping.svg'
import es_message from './illustrations/message.svg'
import es_noActivity from './illustrations/no-activity.svg'
import es_noAutomations from './illustrations/no-automations.svg'
import es_noBookmarks from './illustrations/no-bookmarks.svg'
import es_noInternet from './illustrations/no-internet.svg'
import es_noLikes from './illustrations/no-likes.svg'
import es_noPlaylists from './illustrations/no-playlists.svg'
import es_noResults from './illustrations/no-results.svg'
import es_notFollowing from './illustrations/not-following.svg'
import es_party from './illustrations/party.svg'
import es_pieChart from './illustrations/pie-chart.svg'
import es_programs from './illustrations/programs.svg'
import es_quiz from './illustrations/quiz.svg'
import es_resources from './illustrations/resources.svg'
import es_rocket from './illustrations/rocket.svg'
import es_search from './illustrations/search.svg'
import es_share from './illustrations/share.svg'
import es_skillLevel from './illustrations/skill-level.svg'
import es_ufo from './illustrations/ufo.svg'

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
export const ILLUSTRATIONS = {
  'add': es_add,
  'add-users': es_addUsers,
  'buble': es_buble,
  'calendar': es_calendar,
  'category': es_category,
  'certificates': es_certificates,
  'cloud': es_cloud,
  'computer-screen': es_computerScreen,
  'connect-brain': es_connectBrain,
  'custom-fields': es_customFields,
  'deactivated': es_deactivated,
  'empty-box': es_emptyBox,
  'flashcards': es_flashcards,
  'hris-mapping': es_hrisMapping,
  'message': es_message,
  'no-activity': es_noActivity,
  'no-automations': es_noAutomations,
  'no-bookmarks': es_noBookmarks,
  'no-internet': es_noInternet,
  'no-likes': es_noLikes,
  'no-playlists': es_noPlaylists,
  'no-results': es_noResults,
  'not-following': es_notFollowing,
  'party': es_party,
  'pie-chart': es_pieChart,
  'programs': es_programs,
  'quiz': es_quiz,
  'resources': es_resources,
  'rocket': es_rocket,
  'search': es_search,
  'share': es_share,
  'skill-level': es_skillLevel,
  'ufo': es_ufo,
} as const
export type IllustrationName = keyof typeof ILLUSTRATIONS

/** One illustration from the Figma "Illustrations Empty state" set: 72px tall (Share is 120 wide). Decorative by default. */
export function EmptyStateIllustration({ name, label }: { name: IllustrationName; label?: string }) {
  return <Box component="img" className="ds-empty-state-illustration" src={ILLUSTRATIONS[name]} alt={label ?? ''} sx={{ width: 'auto', height: 72, display: 'block' }} />
}

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
      <EmptyStateIllustration name={illustration as IllustrationName} />
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
      <Box sx={{ minWidth: 72, height: 72, flexShrink: 0, display: 'grid', placeItems: 'center' }}>{art}</Box>
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
