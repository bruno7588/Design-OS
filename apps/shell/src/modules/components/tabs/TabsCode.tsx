import { Stack, Typography } from '@mui/material'
import tabSource from '@design-os/components/src/Tabs/Tab.tsx?raw'
import overridesSource from '@design-os/components/src/Tabs/tabs.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import Tabs from '@mui/material/Tabs'
import { Tab } from '@design-os/components'

<Tabs value={section} onChange={(_, v) => setSection(v)} aria-label="Course sections">
  <Tab value="overview" label="Overview" />
  <Tab value="learners" label="Learners" count={24} />
  <Tab value="lessons" label="Lessons" count={8} />
</Tabs>

// A divider under the bar, when the page needs one, belongs to the parent
<Tabs sx={{ borderBottom: 1, borderColor: 'divider' }} …>

// Plain MUI renders the same (without the counter and the steady width)
import MuiTab from '@mui/material/Tab'

<Tabs value={0}><MuiTab label="Overview" /></Tabs>`

export function TabsCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Tabs and Tab with the 5Mins theme. Every visual rule lives in the theme overrides; the Tab
        wrapper only adds the counter and keeps each tab's width steady when its label turns Bold. The files below are read
        from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Tab.tsx" caption="packages/components/src/Tabs" code={tabSource} />
      <CodeBlock title="tabs.overrides.ts" caption="MuiTabs and MuiTab theme overrides" code={overridesSource} />
    </Stack>
  )
}
