import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { SxProps, Theme } from '@mui/material/styles'
import { CardRoot, CardTitle } from './CardBase'

// 5Mins Folder card (Figma Card/Folder: dark 10175:3106, light 10175:3183): an Admin library
// folder that previews its courses as a stacked deck, and the New Folder tile.
//
// Figma → props
//   Number of courses=0 / 1 / 2 / 3+ → count (the deck shows up to 3 layers; 0 shows the empty artwork)
//   New folder=true                   → <NewFolderCard />
//   State=Hover                       → :hover: Cards-background-hover; the deck steps back (200 wide)

export interface FolderCardProps {
  title: string
  count: number
  /** "3+ courses"; defaults from count. */
  countLabel?: string
  image?: string
  onClick?: () => void
  className?: string
  sx?: SxProps<Theme>
}

/** The empty-folder artwork: a video frame between two tilted cards, in Border-elevated. */
function EmptyFolder() {
  return (
    <Box component="svg" width={156} height={103} viewBox="0 0 156 103" fill="none" aria-hidden sx={(theme) => ({ display: 'block', color: theme.tokens.semantic.borderElevated })}>
      <rect x="-0.728516" y="44.4773" width="42.6667" height="51.8095" rx="9.14286" transform="rotate(-10 -0.728516 44.4773)" fill="currentColor" />
      <rect x="114.141" y="37.0711" width="42.6667" height="51.8095" rx="9.14286" transform="rotate(10 114.141 37.0711)" fill="currentColor" />
      <Box
        component="path"
        d="M122.286 28.9519C125.418 28.952 128.422 30.1963 130.637 32.4109C132.851 34.6255 134.096 37.6296 134.096 40.7615V88.7615C134.096 91.8934 132.851 94.8974 130.637 97.1121C128.422 99.3268 125.418 100.571 122.286 100.571H33.1436C30.0115 100.571 27.0077 99.3268 24.793 97.1121C22.5783 94.8974 21.334 91.8936 21.334 88.7615V40.7615C21.3341 37.6296 22.5784 34.6255 24.793 32.4109C27.0076 30.1964 30.0117 28.9519 33.1436 28.9519H122.286ZM67.4805 45.7166C67.1412 45.7079 66.8057 45.7903 66.5088 45.9548L66.5068 45.9558C66.2095 46.1203 65.9619 46.3615 65.7891 46.6541C65.6162 46.9468 65.5248 47.2809 65.5244 47.6209V81.905C65.5245 82.2449 65.6156 82.579 65.7881 82.8718C65.9606 83.1646 66.2086 83.4063 66.5059 83.5711C66.803 83.7357 67.1389 83.8182 67.4785 83.8093C67.8184 83.8004 68.1502 83.7005 68.4385 83.5203L95.8672 66.3767C96.141 66.2055 96.3669 65.9677 96.5234 65.6853C96.68 65.4028 96.7617 65.0845 96.7617 64.7615C96.7616 64.4386 96.6799 64.1211 96.5234 63.8386C96.3668 63.5561 96.1411 63.3175 95.8672 63.1463L68.4395 46.0037V46.0047C68.1512 45.825 67.82 45.7253 67.4805 45.7166ZM115.429 15.2381C116.742 15.2381 118.002 15.7596 118.931 16.6882C119.859 17.6169 120.381 18.8769 120.381 20.1902C120.381 21.5036 119.859 22.7634 118.931 23.6922C118.002 24.6209 116.742 25.1433 115.429 25.1433H40C38.6866 25.1433 37.4267 24.6208 36.498 23.6922C35.5695 22.7634 35.0479 21.5035 35.0479 20.1902C35.0479 18.8768 35.5694 17.6169 36.498 16.6882C37.4267 15.7596 38.6866 15.2381 40 15.2381H115.429ZM101.715 1.52419C103.028 1.52426 104.288 2.0457 105.217 2.97438C106.145 3.90311 106.667 5.16298 106.667 6.47633C106.667 7.7897 106.145 9.04957 105.217 9.97829C104.288 10.907 103.028 11.4284 101.715 11.4285H53.7148C52.4015 11.4285 51.1416 10.9069 50.2129 9.97829C49.2842 9.04957 48.7618 7.78974 48.7617 6.47633C48.7617 5.16288 49.2841 3.90313 50.2129 2.97438C51.1416 2.04567 52.4014 1.52419 53.7148 1.52419H101.715Z"
        fill="currentColor"
        strokeWidth={3.04762}
        sx={(theme) => ({ stroke: theme.tokens.semantic.cardsBackground, '.ds-card:hover &, .ds-card.ds-hover &': { stroke: theme.tokens.semantic.cardsBackgroundHover } })}
      />
    </Box>
  )
}

const LAYERS = [
  // Back (3+), middle (2+), front (the cover). Figma: 208 × 118, 224 × 132, 240 × 140, radius 8.
  { w: 208, h: 118, top: 0, fill: 'cardsBackgroundHover', hover: 'borderElevated' },
  { w: 224, h: 132, top: 12, fill: 'borderElevated', hover: 'neutral400' },
] as const

export function FolderCard({ title, count, countLabel, image, onClick, className, sx }: FolderCardProps) {
  const label = countLabel ?? `${count} ${count === 1 ? 'course' : 'courses'}`
  const layers = count >= 3 ? LAYERS : count === 2 ? LAYERS.slice(1) : []

  return (
    <CardRoot
      className={['ds-folder-card', className].filter(Boolean).join(' ')}
      hover={false}
      sx={[
        (theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: `${theme.tokens.space.m}px`,
          width: 308,
          overflow: 'visible',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '&:hover .ds-folder-surface, &.ds-hover .ds-folder-surface': { backgroundColor: theme.tokens.semantic.cardsBackgroundHover },
          // Figma Hover: the deck steps back to 200 wide (5/6) and the back layers darken.
          '&:hover .ds-folder-deck, &.ds-hover .ds-folder-deck': { transform: 'scale(0.8333)' },
          '& .ds-folder-deck': { transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)' },
          '@media (prefers-reduced-motion: reduce)': { '& .ds-folder-deck': { transition: 'none' } },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className="ds-folder-surface"
        sx={(theme) => ({
          height: 272,
          boxSizing: 'border-box',
          display: 'grid',
          placeItems: 'center',
          padding: `${theme.tokens.space.l}px`,
          borderRadius: `${theme.tokens.radius.sm}px`,
          backgroundColor: theme.tokens.semantic.cardsBackground,
          boxShadow: theme.tokens.mode === 'light' ? theme.tokens.shadow.s : 'none',
          transition: 'background-color 150ms',
        })}
      >
        {count === 0 ? (
          <EmptyFolder />
        ) : (
          <Box className="ds-folder-deck" sx={{ position: 'relative', width: 240, height: 164 }}>
            {layers.map((l) => (
              <Box
                key={l.w}
                sx={(theme) => {
                  const colour = (k: string) => (k === 'neutral400' ? theme.tokens.palette.neutral[400] : theme.tokens.semantic[k as 'borderElevated'])
                  return {
                    position: 'absolute',
                    top: l.top,
                    left: (240 - l.w) / 2,
                    width: l.w,
                    height: l.h,
                    borderRadius: `${theme.tokens.radius.s}px`,
                    backgroundColor: colour(l.fill),
                    '.ds-card:hover &, .ds-card.ds-hover &': { backgroundColor: colour(l.hover) },
                  }
                }}
              />
            ))}
            <Box
              sx={(theme) => ({
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 240,
                height: 140,
                borderRadius: `${theme.tokens.radius.s}px`,
                backgroundColor: theme.tokens.semantic.inputBackground,
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              })}
            />
          </Box>
        )}
      </Box>
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xs}px` })}>
        <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary })}>
          {title}
        </CardTitle>
        <Box component="p" sx={(theme) => ({ m: 0, fontSize: 14, lineHeight: 1.5, color: theme.tokens.semantic.textSecondary })}>
          {label}
        </Box>
      </Box>
    </CardRoot>
  )
}

export interface NewFolderCardProps {
  label?: string
  onClick?: () => void
  className?: string
  sx?: SxProps<Theme>
}

/** The last tile in a folder grid: creates a folder. A dashed Border-elevated outline. */
export function NewFolderCard({ label = 'New Folder', onClick, className, sx }: NewFolderCardProps) {
  return (
    <ButtonBase
      className={['ds-new-folder', className].filter(Boolean).join(' ')}
      onClick={onClick}
      disableRipple
      sx={[
        (theme) => {
          const t = theme.tokens
          return {
            width: 308,
            height: 272,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            padding: `${t.space.l}px`,
            borderRadius: `${t.radius.sm}px`,
            // Figma: a 1.5px dashed Border-elevated stroke, 4 on, 4 off.
            border: `1.5px dashed ${t.semantic.borderElevated}`,
            color: t.semantic.textSecondary,
            fontFamily: theme.typography.fontFamily,
            transition: 'background-color 150ms',
            '&:hover, &.ds-hover': { backgroundColor: t.semantic.cardsBackgroundHover },
            '&.Mui-focusVisible': { outline: `2px solid ${t.semantic.primaryButtonBackground}`, outlineOffset: 2 },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box component="span" aria-hidden sx={{ fontSize: 48, lineHeight: 1.5 }}>
        +
      </Box>
      <Box component="span" sx={{ fontSize: 16, lineHeight: 1.5 }}>
        {label}
      </Box>
    </ButtonBase>
  )
}
