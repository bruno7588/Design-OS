import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Navigation/PageHeader.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { PageHeader, Button, Tab } from '@design-os/components'
import Tabs from '@mui/material/Tabs'

<PageHeader
  title="Your Courses"
  supportingText="Courses you created or copied from 5Mins."
  metadata={[{ icon: <PlayCircle color="currentColor" />, label: '17 lessons' }]}
  actions={<Button icon={<Add color="currentColor" />}>Create Course</Button>}
  navigation={
    <Tabs value={tab} onChange={(_, v) => setTab(v)}>
      <Tab label="Published" />
      <Tab label="Drafts" />
    </Tabs>
  }
/>

// A section inside a page: smaller, and an h2
<PageHeader type="section" title="Lessons" actions={<Button variant="outlined">Add Lesson</Button>} />`

export function PageHeaderCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is a column of slots built from MUI Typography and Divider with the tokens: the label (metadata), the
        title with supporting text and actions, and the navigation under a divider. The title is an h1 for a page and an h2
        for a section. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="PageHeader.tsx" caption="packages/components/src/Navigation" code={source} />
    </Stack>
  )
}
