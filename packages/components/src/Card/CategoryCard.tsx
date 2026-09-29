import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { Lock, PlayCircle } from 'iconsax-react'
import { Badge } from '../Badge/Badge'
import { CollectionPlayIcon } from '../icons/FigmaIcons'
import { CardRoot, CardTitle, clamp } from './CardBase'

// 5Mins Category card (Figma Card/ Category: dark 10176:1806, light 10574:3913). No surface:
// a blurred copy of the image glows behind the sharp one.
//
// Figma → props
//   Device=Desktop / Mobile → device "desktop" (300 wide) | "mobile" (272 wide)
//   New=true                → isNew: the New Badge ("New Courses") over the top edge
//   Disabled=true           → disabled: greyscale, a 40px lock, Text-disabled; desktop shows a Tooltip
//   State=Hover             → :hover (desktop): both images grow, the glow gets stronger

export interface CategoryCardProps {
  device?: 'desktop' | 'mobile'
  title: string
  image?: string
  /** "12 courses" */
  courses?: string
  /** "24 lessons" */
  lessons?: string
  isNew?: boolean
  newLabel?: string
  disabled?: boolean
  /** Desktop, disabled: the Tooltip on hover. */
  disabledReason?: string
  onClick?: () => void
  className?: string
  sx?: SxProps<Theme>
}

const DISABLED_REASON = 'Category not available in your plan. Please contact Customer Success'

export function CategoryCard({
  device = 'desktop',
  title,
  image,
  courses,
  lessons,
  isNew,
  newLabel = 'New Courses',
  disabled = false,
  disabledReason = DISABLED_REASON,
  onClick,
  className,
  sx,
}: CategoryCardProps) {
  const mobile = device === 'mobile'
  const bg = (theme: Theme) => ({
    backgroundColor: theme.tokens.semantic.inputBackground,
    backgroundImage: image ? `url(${image})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: `${theme.tokens.radius.sm}px`,
  })
  const text = (theme: Theme, colour: 'textPrimary' | 'textSecondary') => (disabled ? theme.tokens.semantic.textDisabled : theme.tokens.semantic[colour])

  const card = (
    <CardRoot
      className={['ds-category-card', className].filter(Boolean).join(' ')}
      hover={false}
      sx={[
        (theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: `${mobile ? theme.tokens.space.sm : theme.tokens.space.m}px`,
          width: mobile ? 272 : 300,
          overflow: 'visible',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          ...(!mobile && {
            // Figma Hover: the glow grows to 348 × 237 at 48%, the image to 281 × 164.
            '&:hover .ds-category-glow, &.ds-hover .ds-category-glow': { transform: 'scale(1.16)', opacity: 0.48 },
            '&:hover .ds-category-image, &.ds-hover .ds-category-image': { transform: 'scale(1.17)' },
          }),
          '& .ds-category-glow, & .ds-category-image': { transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms' },
          '@media (prefers-reduced-motion: reduce)': { '& .ds-category-glow, & .ds-category-image': { transition: 'none' } },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className="ds-category-thumb"
        sx={{
          position: 'relative',
          height: mobile ? 180 : 204,
          display: 'grid',
          placeItems: 'center',
          // Figma: the thumbnail blends in Luminosity when disabled.
          filter: disabled ? 'grayscale(1)' : undefined,
        }}
      >
        <Box className="ds-category-glow" sx={(theme) => ({ position: 'absolute', inset: 0, filter: 'blur(16px)', opacity: 0.32, ...bg(theme) })} />
        <Box
          className="ds-category-image"
          sx={(theme) => ({ position: 'relative', width: mobile ? 208 : 240, height: mobile ? 116 : 140, display: 'grid', placeItems: 'center', ...bg(theme) })}
        >
          {disabled && (
            <Box component="span" sx={(theme) => ({ display: 'flex', color: theme.tokens.semantic.textSecondary })}>
              <Lock size={40} variant="Bold" color="currentColor" aria-label="Locked" />
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${mobile ? theme.tokens.space.xs : theme.tokens.space.s}px`, minWidth: 0 })}>
        <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: mobile ? 14 : 16, fontWeight: 700, lineHeight: 1.5, color: text(theme, 'textPrimary'), ...clamp(1) })}>
          {title}
        </CardTitle>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: `${mobile ? theme.tokens.space.s : theme.tokens.space.m}px`,
            color: text(theme, 'textSecondary'),
            fontSize: mobile ? 12 : 14,
            lineHeight: mobile ? 1.2 : 1.5,
            '& > span': { display: 'inline-flex', alignItems: 'center', gap: `${theme.tokens.space.xs}px`, whiteSpace: 'nowrap' },
          })}
        >
          {courses && (
            <span>
              <CollectionPlayIcon size={mobile ? 18 : 20} />
              {courses}
            </span>
          )}
          {lessons && (
            <span>
              <PlayCircle size={16} color="currentColor" aria-hidden />
              {lessons}
            </span>
          )}
        </Box>
      </Box>
      {isNew && !disabled && (
        <Box className="ds-card-action" sx={{ position: 'absolute !important', top: -11, left: 30, display: 'flex' }}>
          <Badge type="new" label={newLabel} sx={{ fontSize: 12, fontWeight: 600 }} />
        </Box>
      )}
    </CardRoot>
  )

  // Desktop only: the disabled card explains itself on hover (mobile has no hover).
  if (disabled && !mobile) {
    return (
      <Tooltip title={disabledReason} placement="top" describeChild>
        <Box sx={{ display: 'inline-flex' }}>{card}</Box>
      </Tooltip>
    )
  }
  return card
}
