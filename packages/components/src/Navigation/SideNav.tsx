import { useId, useState, type ComponentType, type ElementType, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Tooltip from '@mui/material/Tooltip'
import { ArrowDown2, ArrowUp2, Setting2 } from 'iconsax-react'
import { Logo } from './Logo'

// 5Mins side navigation (Figma Side navigation: dark 4697:13314, light 12048:2302), built from
// MUI List and ListItemButton with the menu item styles in the theme (navigation.overrides.ts).
//
// Figma → props
//   System=Web app / Admin   → system "web" | "admin"
//   State=Expanded/Collapsed → collapsed
//   Menu/Itens Selected      → item.selected (aria-current="page")
//   Admin Type=Sub-menu      → item.children; the group opens and closes (aria-expanded)
//   Web app footer           → profile (name, email, settings)
//   Admin footer             → help (5Mins Academy, Help)
//
// Collapsed, each item is an icon tile named by its label, with the label in a tooltip on
// the right, as in the Figma Hover variants.

type Icon = ComponentType<{ size?: number; color?: string; variant?: 'Linear' | 'Bold' }>

export interface SideNavItem {
  label: string
  icon?: Icon
  selected?: boolean
  href?: string
  onClick?: () => void
  /** Admin only: sub-menu items. */
  children?: SideNavItem[]
}

export interface SideNavProps {
  system?: 'web' | 'admin'
  items: SideNavItem[]
  collapsed?: boolean
  /** Web app: the profile card at the bottom. */
  profile?: { name: string; email: string; onSettings?: () => void }
  /** Admin: the help items under the menu. */
  help?: SideNavItem[]
  'aria-label'?: string
  /** Forced states for docs: the label of an item to draw hovered. */
  hoverItem?: string
}

export function SideNav({ system = 'web', items, collapsed = false, profile, help, hoverItem, 'aria-label': ariaLabel = 'Main' }: SideNavProps) {
  const web = system === 'web'
  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
      className="ds-side-nav"
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: collapsed ? (web ? 88 : 68) : 240,
        height: '100%',
        backgroundColor: theme.tokens.semantic.pageBackground,
        // Admin only: a 1px Border on the right, inside the width.
        boxShadow: web ? 'none' : `inset -1px 0 0 ${theme.tokens.semantic.border}`,
        transition: 'width 150ms',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      })}
    >
      <List
        disablePadding
        sx={(theme) => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: collapsed ? 'center' : 'stretch',
          gap: web ? 0 : `${theme.tokens.space.xs}px`,
          padding: web ? `${theme.tokens.space.m}px` : `${theme.tokens.space.m}px ${collapsed ? theme.tokens.space.s : theme.tokens.space.sm}px`,
          overflowY: 'auto',
        })}
      >
        {items.map((item) => (
          <NavEntry key={item.label} item={item} web={web} collapsed={collapsed} hoverItem={hoverItem} />
        ))}
        {web && collapsed && (
          <Box sx={{ mt: 'auto' }}>
            <NavEntry item={{ label: 'Settings', icon: Setting2, onClick: profile?.onSettings }} web collapsed linear />
          </Box>
        )}
      </List>

      {web && profile && !collapsed && (
        <Box sx={(theme) => ({ padding: `${theme.tokens.space.sm}px` })}>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              gap: `${theme.tokens.space.s}px`,
              padding: `${theme.tokens.space.s}px ${theme.tokens.space.m}px`,
              borderRadius: `${theme.tokens.radius.sm}px`,
              backgroundColor: theme.tokens.semantic.inputBackground,
            })}
          >
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Box sx={(theme) => ({ fontSize: 14, fontWeight: 600, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })}>
                {profile.name}
              </Box>
              <Box sx={(theme) => ({ fontSize: 12, lineHeight: 1.2, color: theme.tokens.semantic.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })}>
                {profile.email}
              </Box>
            </Box>
            <Box
              component="button"
              type="button"
              aria-label="Settings"
              onClick={profile.onSettings}
              sx={(theme) => ({
                display: 'flex',
                p: 0,
                border: 0,
                background: 'none',
                cursor: 'pointer',
                color: theme.tokens.semantic.textSecondary,
                '&:focus-visible': { outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}`, borderRadius: '4px' },
              })}
            >
              <Setting2 size={16} color="currentColor" aria-hidden />
            </Box>
          </Box>
        </Box>
      )}

      {!web && help && (
        <List disablePadding sx={(theme) => ({ display: 'flex', flexDirection: 'column', alignItems: collapsed ? 'center' : 'stretch', padding: `0 ${collapsed ? theme.tokens.space.s : theme.tokens.space.sm}px` })}>
          {help.map((item) => (
            <NavEntry key={item.label} item={item} web={false} collapsed={collapsed} hoverItem={hoverItem} />
          ))}
        </List>
      )}

      {!collapsed && <PoweredBy web={web} />}
    </Box>
  )
}

function NavEntry({ item, web, collapsed, hoverItem, linear }: { item: SideNavItem; web: boolean; collapsed: boolean; hoverItem?: string; linear?: boolean }) {
  const childSelected = !!item.children?.some((c) => c.selected)
  const [open, setOpen] = useState(childSelected)
  const listId = useId()
  const Icon = item.icon
  const group = !web && !!item.children?.length && !collapsed
  // Web icons are Bold; Admin icons are Linear and turn Bold when the item (or a child) is selected.
  const bold = !linear && (web || item.selected || childSelected)
  const link = item.href ? { component: 'a' as ElementType, href: item.href } : {}

  const button = (
    <ListItemButton
      {...link}
      selected={!!item.selected}
      aria-current={item.selected ? 'page' : undefined}
      aria-label={collapsed ? item.label : undefined}
      aria-expanded={group ? open : undefined}
      aria-controls={group ? listId : undefined}
      onClick={group ? () => setOpen((o) => !o) : item.onClick}
      disableRipple
      className={[web ? 'ds-nav-web' : 'ds-nav-admin', collapsed && 'ds-collapsed', childSelected && 'ds-has-selected', hoverItem === item.label && 'ds-hover']
        .filter(Boolean)
        .join(' ')}
    >
      {Icon && <Icon size={web ? 24 : 20} color="currentColor" variant={bold ? 'Bold' : 'Linear'} />}
      {!collapsed && <span className="ds-nav-label">{item.label}</span>}
      {group && (open ? <ArrowUp2 className="ds-nav-chevron" color="currentColor" aria-hidden /> : <ArrowDown2 className="ds-nav-chevron" color="currentColor" aria-hidden />)}
    </ListItemButton>
  )

  return (
    <li style={{ listStyle: 'none' }}>
      {collapsed ? (
        <Tooltip title={item.label} placement="right" disableInteractive>
          {button}
        </Tooltip>
      ) : (
        button
      )}
      {group && (
        <Collapse in={open} timeout={150}>
          <List id={listId} disablePadding>
            {item.children!.map((child) => (
              <li key={child.label} style={{ listStyle: 'none' }}>
                <ListItemButton
                  {...(child.href ? { component: 'a' as ElementType, href: child.href } : {})}
                  selected={!!child.selected}
                  aria-current={child.selected ? 'page' : undefined}
                  onClick={child.onClick}
                  disableRipple
                  className={['ds-nav-sub', hoverItem === child.label && 'ds-hover'].filter(Boolean).join(' ')}
                >
                  <span className="ds-nav-label">{child.label}</span>
                </ListItemButton>
              </li>
            ))}
          </List>
        </Collapse>
      )}
    </li>
  )
}

// "Powered by" and the logo: Regular 10 / logo 12 in the web app, Regular 12 / logo 14 in Admin.
function PoweredBy({ web }: { web: boolean }): ReactNode {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: `${theme.tokens.space.xs}px`,
        padding: `${theme.tokens.space.sm}px ${web ? theme.tokens.space.l : 28}px`,
        fontSize: web ? 10 : 12,
        lineHeight: 1.4,
        color: theme.tokens.semantic.textTertiary,
      })}
    >
      Powered by
      <Logo height={web ? 12 : 14} />
    </Box>
  )
}
