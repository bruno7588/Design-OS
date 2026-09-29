import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Navigation/SideNav.tsx?raw'
import overridesSource from '@design-os/components/src/Navigation/navigation.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { SideNav } from '@design-os/components'
import { Home, User, Book } from 'iconsax-react'

<SideNav
  system="admin"
  collapsed={collapsed}
  items={[
    { label: 'Home', icon: Home, href: '/admin', selected: path === '/admin' },
    { label: 'People & Teams', icon: User, children: [
      { label: 'People', href: '/admin/people', selected: path === '/admin/people' },
      { label: 'Teams', href: '/admin/teams' },
    ] },
    { label: 'Content', icon: Book, children: [/* … */] },
  ]}
  help={[{ label: 'Help', icon: MessageQuestion, href: '/help' }]}
/>

// The menu items are plain MUI with the 5Mins theme
import ListItemButton from '@mui/material/ListItemButton'

<ListItemButton className="ds-nav-admin" selected><Home variant="Bold" size={20} color="currentColor" /> Home</ListItemButton>`

export function SideNavigationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 List and ListItemButton. The menu item looks (Web app, Admin, sub-menu, selected, hover,
        collapsed) are theme overrides on ListItemButton, keyed on a class. SideNav lays out the panel: the menu, the profile
        card or help, and Powered by. Groups open and close with aria-expanded; collapsed items show their label in a tooltip.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="SideNav.tsx" caption="packages/components/src/Navigation" code={source} />
      <CodeBlock title="navigation.overrides.ts" caption="Theme overrides for the menu items (MuiListItemButton)" code={overridesSource} />
    </Stack>
  )
}
