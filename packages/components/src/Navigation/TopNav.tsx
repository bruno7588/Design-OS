import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Add, CalendarTick, FlashCircle, HambergerMenu, Logout, Mobile, Moon, SidebarLeft, Sun1 } from 'iconsax-react'
import { Button } from '../Button/Button'
import { Logo } from './Logo'

// 5Mins top navigation (Figma Top Nav/Admin: dark 5385:20137, light 12328:8954). A 70px
// header: the logo on the left, actions on the right, a 1px Border underneath.
//
// Figma → props
//   System=Web app      → system "web": Get App, Create, Streak and Events (with a dot)
//   System=Admin        → system "admin": Exit Admin, theme and log out
//   Breakpoint=small    → small: 72px, padding 16, the menu button replaces the logo (Admin)
//   Admin, large: the sidebar-left button before the logo expands and collapses the side
//   navigation (sideNavExpanded, onToggleSideNav). Anything else before the logo → leading

export interface TopNavProps {
  system?: 'web' | 'admin'
  small?: boolean
  /** Before the logo, such as the side navigation toggle. */
  leading?: ReactNode
  onLogo?: () => void
  /** Admin, large: whether the side navigation is expanded; the button says what it does. */
  sideNavExpanded?: boolean
  onToggleSideNav?: () => void
  // Web app
  onGetApp?: () => void
  onCreate?: () => void
  onStreak?: () => void
  onEvents?: () => void
  /** Web app: a dot on Events. */
  eventsUnread?: boolean
  // Admin
  onExitAdmin?: () => void
  onToggleTheme?: () => void
  /** The current mode, so the button says what it switches to. */
  darkMode?: boolean
  onLogout?: () => void
  onMenu?: () => void
}

export function TopNav({
  system = 'web',
  small = false,
  leading,
  onLogo,
  sideNavExpanded = true,
  onToggleSideNav,
  onGetApp,
  onCreate,
  onStreak,
  onEvents,
  eventsUnread,
  onExitAdmin,
  onToggleTheme,
  darkMode,
  onLogout,
  onMenu,
}: TopNavProps) {
  const admin = system === 'admin'
  return (
    <Box
      component="header"
      className="ds-top-nav"
      sx={(theme) => {
        const t = theme.tokens
        return {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          height: small ? 72 : 70,
          padding: `${t.space.s}px ${small ? t.space.m : t.space.xl}px`,
          backgroundColor: t.semantic.pageBackground,
          boxShadow: `inset 0 -1px 0 ${t.semantic.border}`,
          '& .ds-top-nav-icon': {
            width: 32,
            height: 32,
            padding: `${t.space.xs}px`,
            color: t.semantic.textPrimary,
            '&:hover': { backgroundColor: t.semantic.pageBackgroundHover },
            '&.Mui-focusVisible': { outline: `2px solid ${t.semantic.primaryButtonBackground}` },
          },
        }
      }}
    >
      <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.m}px` })}>
        {small && admin ? (
          <IconButton className="ds-top-nav-icon" aria-label="Open the menu" onClick={onMenu} disableRipple>
            <HambergerMenu size={24} color="currentColor" />
          </IconButton>
        ) : (
          <>
            {admin && (
              <Tooltip title={sideNavExpanded ? 'Collapse menu' : 'Expand menu'}>
                <IconButton
                  className="ds-top-nav-icon"
                  aria-label={sideNavExpanded ? 'Collapse the menu' : 'Expand the menu'}
                  aria-expanded={sideNavExpanded}
                  onClick={onToggleSideNav}
                  disableRipple
                >
                  <SidebarLeft size={20} color="currentColor" />
                </IconButton>
              </Tooltip>
            )}
            {leading}
            <Box
              component={onLogo ? 'button' : 'span'}
              {...(onLogo && { type: 'button', onClick: onLogo, 'aria-label': 'Home' })}
              sx={{ display: 'flex', p: 0, border: 0, background: 'none', cursor: onLogo ? 'pointer' : 'default' }}
            >
              <Logo />
            </Box>
          </>
        )}
      </Box>

      {admin ? (
        <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${small ? theme.tokens.space.sm : theme.tokens.space.m}px` })}>
          <Button variant="outlined2" size="small" onClick={onExitAdmin}>
            Exit Admin
          </Button>
          {!small && (
            <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
              <IconButton className="ds-top-nav-icon" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} onClick={onToggleTheme} disableRipple>
                {darkMode ? <Sun1 size={20} color="currentColor" /> : <Moon size={20} color="currentColor" />}
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Log out">
            <IconButton className="ds-top-nav-icon" aria-label="Log out" onClick={onLogout} disableRipple>
              <Logout size={20} color="currentColor" variant="Bold" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.l}px` })}>
          <Button variant="text" size="medium" icon={<Mobile color="currentColor" />} onClick={onGetApp}>
            Get App
          </Button>
          <Button variant="outlined2" size="small" icon={<Add color="currentColor" />} onClick={onCreate}>
            Create
          </Button>
          <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.m}px` })}>
            <IconButton className="ds-top-nav-icon" aria-label="Streak" onClick={onStreak} disableRipple>
              <FlashCircle size={24} color="currentColor" variant="Bold" />
            </IconButton>
            <IconButton className="ds-top-nav-icon" aria-label={eventsUnread ? 'Events, new' : 'Events'} onClick={onEvents} disableRipple sx={{ position: 'relative' }}>
              <CalendarTick size={24} color="currentColor" variant="Bold" />
              {eventsUnread && (
                <Box
                  component="span"
                  aria-hidden
                  sx={(theme) => ({ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.tokens.semantic.textError })}
                />
              )}
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}
