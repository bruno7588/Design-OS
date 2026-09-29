import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Navigation/TabNav.tsx?raw'
import overrides from '@design-os/components/src/Navigation/tabNav.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { TabNav } from '@design-os/components'

<TabNav value={page} onChange={(p) => navigate(\`/\${p}\`)} />

// Plain MUI renders the same bar
<BottomNavigation showLabels value={page} onChange={(_, p) => setPage(p)}>
  <BottomNavigationAction value="home" label="Home" icon={<Home variant="Bold" color="currentColor" />} />
  …
</BottomNavigation>`

export function TabNavigationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI BottomNavigation. The look lives in the theme, so plain MUI renders the 5Mins bar; the wrapper adds
        the five learner tabs, the nav landmark and aria-current. The files below are read from the source, so they are always
        current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="TabNav.tsx" caption="packages/components/src/Navigation" code={source} />
      <CodeBlock title="tabNav.overrides.ts" caption="Theme overrides" code={overrides} />
    </Stack>
  )
}
