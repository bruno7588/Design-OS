import type { ReactNode } from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Add, ArrowLeft, FlashCircle, NotificationBing, Setting2 } from 'iconsax-react'
import { Avatar } from '../Avatar/Avatar'
import { Chip } from '../Chip/Chip'
import { Search } from '../Search/Search'
import { MoreVerticalIcon } from '../icons/FigmaIcons'
import { PointsIllustration } from '../icons/Illustrations'

// 5Mins mobile app top bar (Figma Top nav/ App: dark 1910:18375, light 11235:11758). A
// header built from the tokens and the 5Mins Chip, Search and Avatar.
//
// Figma → props
//   Page=Home        → page "home": chips, Streak and Notifications (notificationsUnread: the Nudge dot)
//   Page=Search      → page "search": the Search field (M)
//   Page=Progress    → page "progress": chips
//   Page=Feed        → page "feed": a centred title
//   Page=Profile     → page "profile": avatar with a settings badge, name, role, the add button
//   Page=Detail page → page "detail": back, a centred title, an optional action on the right
//   Page=Skill       → page "skill": back, skill icon and title, more options
//   Page=Lesson feed → page "lesson-feed": transparent over the video, back and points
//   Page=Mobile web  → not built: it's the browser's own chrome
//   Status Bar/iOS   → statusBar (a decorative stand-in for prototypes; the phone draws the real one)

export type AppTopNavPage = 'home' | 'search' | 'progress' | 'feed' | 'profile' | 'detail' | 'skill' | 'lesson-feed'

export interface AppTopNavChip {
  label: string
  selected?: boolean
  onClick?: () => void
}

export interface AppTopNavProps {
  page: AppTopNavPage
  /** Show the iOS status bar stand-in above the bar (prototypes and docs). */
  statusBar?: boolean
  /** Home and Progress: the filter chips. */
  chips?: AppTopNavChip[]
  /** Home: the Nudge dot on Notifications. */
  notificationsUnread?: boolean
  onStreak?: () => void
  onNotifications?: () => void
  /** Search */
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  /** Feed, Detail page and Skill */
  title?: string
  /** Skill: the 24px skill illustration. */
  skillIcon?: ReactNode
  onBack?: () => void
  onMore?: () => void
  /** Detail page: an icon button on the right (the slot is 32px). */
  action?: ReactNode
  /** Lesson feed: the points total, such as "45 Pt". */
  points?: string
  /** Profile */
  name?: string
  role?: string
  avatarSrc?: string
  onProfileSettings?: () => void
  onAdd?: () => void
  className?: string
}

// Header heights per page, from Figma (the 1px Border is drawn inside).
const HEIGHT: Record<AppTopNavPage, number> = {
  home: 64,
  search: 64,
  progress: 64,
  feed: 64,
  profile: 64,
  detail: 56,
  skill: 56,
  'lesson-feed': 56,
}

function StatusBar() {
  return (
    <Box
      className="ds-status-bar"
      aria-hidden
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 25,
        boxSizing: 'border-box',
        padding: `${theme.tokens.space.xs}px ${theme.tokens.space.m}px`,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 'normal',
      })}
    >
      <span>9:41</span>
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '8.5px', '& svg': { display: 'block' } }}>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
          <rect x="0" y="6" width="3" height="4" rx="1" />
          <rect x="5" y="4" width="3" height="6" rx="1" />
          <rect x="10" y="2" width="3" height="8" rx="1" />
          <rect x="15" y="0" width="3" height="10" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M7.99 11.62a.37.37 0 0 0 .27-.1c.08-.07 1.77-1.77 2.15-2.11a.5.5 0 0 0 .09-.25.4.4 0 0 0-.13-.25 4 4 0 0 0-4.78 0 .5.5 0 0 0-.1.25.3.3 0 0 0 .1.25c.1.1 2.09 2.03 2.18 2.11.1.08.1.1.22.1Z" />
          <path d="M3 6.3c0 .09.05.17.11.23l1.15 1.3a.33.33 0 0 0 .45 0A4.7 4.7 0 0 1 8.02 6.42c1.24.03 2.42.53 3.3 1.41a.33.33 0 0 0 .44 0l1.16-1.3a.4.4 0 0 0 .09-.23.3.3 0 0 0-.09-.24 6.9 6.9 0 0 0-10.3 0C3.04 6.17 3 6.16 3 6.3Z" />
          <path d="M.1 3.2c-.07.1-.1.13-.1.25.01.09.04.17.1.24 0 0 .97 1.05 1.21 1.23a.38.38 0 0 0 .47 0 9.3 9.3 0 0 1 12.47 0s.26.19.45 0 1.2-1.23 1.2-1.23a.4.4 0 0 0 .1-.24.3.3 0 0 0-.1-.25A11.5 11.5 0 0 0 .1 3.2Z" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" fill="none" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="1" />
          <path d="M22 4a2 2 0 0 1 0 4V4Z" opacity="0.4" />
        </svg>
      </Box>
    </Box>
  )
}

function BackButton({ onBack, overVideo }: { onBack?: () => void; overVideo?: boolean }) {
  return (
    <IconButton
      className="ds-app-back"
      aria-label="Back"
      onClick={onBack}
      disableRipple
      sx={(theme) => ({
        width: 40,
        height: 40,
        padding: `${theme.tokens.space.s}px`,
        color: 'inherit',
        // Over a video the button keeps a fixed dark fill in both modes, so it stays legible.
        backgroundColor: overVideo ? alpha(theme.tokens.palette.neutral[900], 0.5) : theme.tokens.semantic.inputBackground,
        '&:hover': { backgroundColor: overVideo ? alpha(theme.tokens.palette.neutral[900], 0.5) : theme.tokens.semantic.inputBackgroundHover },
      })}
    >
      <ArrowLeft size={24} color="currentColor" />
    </IconButton>
  )
}

function Chips({ chips, gap }: { chips: AppTopNavChip[]; gap: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: `${gap}px`, minWidth: 0 }}>
      {chips.map((c) => (
        <Chip key={c.label} label={c.label} selected={c.selected} onClick={c.onClick ?? (() => undefined)} />
      ))}
    </Box>
  )
}

const Title = ({ children, small }: { children: ReactNode; small?: boolean }) => (
  <Typography component="h1" sx={{ m: 0, fontSize: small ? 14 : 16, fontWeight: 700, lineHeight: 1.5, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {children}
  </Typography>
)

export function AppTopNav({
  page,
  statusBar = false,
  chips = [],
  notificationsUnread,
  onStreak,
  onNotifications,
  searchValue = '',
  onSearchChange = () => undefined,
  searchPlaceholder = 'Search',
  title,
  skillIcon,
  onBack,
  onMore,
  action,
  points,
  name,
  role,
  avatarSrc,
  onProfileSettings,
  onAdd,
  className,
}: AppTopNavProps) {
  const overVideo = page === 'lesson-feed'

  let row: ReactNode
  switch (page) {
    case 'home':
      row = (
        <>
          <Chips chips={chips} gap={8} />
          <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.m}px` })}>
            <IconButton className="ds-app-icon" aria-label="Streak" onClick={onStreak} disableRipple>
              <FlashCircle size={28} color="currentColor" variant="Bold" />
            </IconButton>
            <IconButton
              className="ds-app-icon"
              aria-label={notificationsUnread ? 'Notifications, new' : 'Notifications'}
              onClick={onNotifications}
              disableRipple
              sx={{ position: 'relative' }}
            >
              <NotificationBing size={28} color="currentColor" variant="Bold" />
              {notificationsUnread && (
                <Box
                  component="span"
                  aria-hidden
                  className="ds-nudge"
                  sx={(theme) => ({ position: 'absolute', top: -4, right: 0, width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.tokens.semantic.textError })}
                />
              )}
            </IconButton>
          </Box>
        </>
      )
      break
    case 'progress':
      row = <Chips chips={chips} gap={16} />
      break
    case 'search':
      row = <Search size="M" value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} sx={{ flex: 1 }} />
      break
    case 'feed':
      row = (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
          <Title>{title}</Title>
        </Box>
      )
      break
    case 'profile':
      row = (
        <>
          <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.sm}px`, minWidth: 0 })}>
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Avatar size={40} src={avatarSrc} alt="" />
              <ButtonBase
                className="ds-app-settings"
                aria-label="Profile settings"
                onClick={onProfileSettings}
                disableRipple
                sx={(theme) => ({
                  position: 'absolute',
                  left: 28,
                  top: -5,
                  width: 18,
                  height: 18,
                  borderRadius: theme.tokens.radius.full,
                  backgroundColor: theme.tokens.semantic.inputBackground,
                  color: theme.tokens.semantic.textPrimary,
                  '&.Mui-focusVisible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}` },
                })}
              >
                <Setting2 size={12} color="currentColor" />
              </ButtonBase>
            </Box>
            <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.xxs}px`, minWidth: 0 })}>
              <Typography component="h1" sx={{ m: 0, fontSize: 14, fontWeight: 700, lineHeight: 1.5, color: 'text.primary' }}>
                {name}
              </Typography>
              <Typography sx={{ fontSize: 12, lineHeight: 1.2, color: 'text.secondary' }}>{role}</Typography>
            </Box>
          </Box>
          <IconButton
            className="ds-app-add"
            aria-label="Add"
            onClick={onAdd}
            disableRipple
            sx={(theme) => ({
              width: 40,
              height: 40,
              padding: 0,
              backgroundColor: theme.tokens.palette.primary[500],
              color: theme.tokens.palette.neutral[800],
              '&:hover': { backgroundColor: theme.tokens.palette.primary[600] },
            })}
          >
            <Add size={40} color="currentColor" />
          </IconButton>
        </>
      )
      break
    case 'detail':
      row = (
        <>
          <BackButton onBack={onBack} />
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
            <Title>{title}</Title>
          </Box>
          <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{action}</Box>
        </>
      )
      break
    case 'skill':
      row = (
        <>
          <BackButton onBack={onBack} />
          <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.s}px`, minWidth: 0, '& > svg, & > img': { width: 24, height: 24, flexShrink: 0 } })}>
            {skillIcon}
            <Title small>{title}</Title>
          </Box>
          <IconButton className="ds-app-icon ds-app-more" aria-label="More options" onClick={onMore} disableRipple>
            <MoreVerticalIcon />
          </IconButton>
        </>
      )
      break
    case 'lesson-feed':
      row = (
        <>
          <BackButton onBack={onBack} overVideo />
          <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.xs}px` })}>
            <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, color: 'inherit' }}>
              {points}
            </Typography>
            <PointsIllustration />
          </Box>
        </>
      )
      break
  }

  const compact = page === 'detail' || page === 'skill' || page === 'lesson-feed'

  return (
    <Box
      component="header"
      className={['ds-app-top-nav', className].filter(Boolean).join(' ')}
      sx={(theme) => {
        const t = theme.tokens
        return {
          display: 'flex',
          flexDirection: 'column',
          fontFamily: theme.typography.fontFamily,
          // Lesson feed floats over the video: no fill, no border, light content in both modes.
          backgroundColor: overVideo ? 'transparent' : t.semantic.pageBackground,
          color: overVideo ? t.palette.neutral[25] : t.semantic.textPrimary,
          '& .ds-app-icon': {
            padding: page === 'skill' ? `${t.space.xs}px` : 0,
            color: 'inherit',
            '&:hover': { backgroundColor: t.semantic.pageBackgroundHover },
          },
          '& .MuiIconButton-root.Mui-focusVisible': { outline: `2px solid ${t.semantic.primaryButtonBackground}` },
        }
      }}
    >
      {statusBar && <StatusBar />}
      <Box
        className="ds-app-top-nav-row"
        sx={(theme) => {
          const t = theme.tokens
          return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: `${t.space.s}px`,
            boxSizing: 'border-box',
            height: HEIGHT[page],
            padding: `${compact ? t.space.s : t.space.sm}px ${t.space.m}px`,
            boxShadow: overVideo ? 'none' : `inset 0 -1px 0 ${t.semantic.border}`,
          }
        }}
      >
        {row}
      </Box>
    </Box>
  )
}
