import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Navigation/TopNav.tsx?raw'
import logoSource from '@design-os/components/src/Navigation/Logo.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { TopNav } from '@design-os/components'

// Admin
<TopNav system="admin" darkMode={dark} onToggleTheme={toggle} onExitAdmin={goToApp} onLogout={logOut} />

// Web app
<TopNav system="web" eventsUnread={hasNew} onGetApp={…} onCreate={…} onStreak={…} onEvents={…} />

// Admin, small screens: the menu button opens the side navigation
<TopNav system="admin" small onMenu={openNav} />`

export function TopNavigationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is a header built from the tokens, the 5Mins Buttons and MUI IconButton. Icon buttons have names and
        tooltips; the theme button says which mode it switches to. The files below are read from the source, so they are
        always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="TopNav.tsx" caption="packages/components/src/Navigation" code={source} />
      <CodeBlock title="Logo.tsx" caption="The 5Mins.ai logo" code={logoSource} />
    </Stack>
  )
}
