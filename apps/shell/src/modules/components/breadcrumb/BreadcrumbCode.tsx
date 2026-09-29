import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Breadcrumb/Breadcrumb.tsx?raw'
import overrides from '@design-os/components/src/Breadcrumb/breadcrumb.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Breadcrumb } from '@design-os/components'

// The last item is the current page: not a link, no chevron.
<Breadcrumb
  items={[
    { label: 'Programs', href: '/programs' },
    { label: program.title, onClick: () => navigate(\`/programs/\${program.id}\`) },
    { label: course.title },
  ]}
/>

// Plain MUI renders the same trail
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

<Breadcrumbs aria-label="Breadcrumb">
  <Link href="/programs">Programs</Link>
  <Typography aria-current="page">{course.title}</Typography>
</Breadcrumbs>`

export function BreadcrumbCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Breadcrumbs. The theme gives it the Figma chevron, spacing and states, so plain MUI looks the same;
        the wrapper turns a list into links and marks the current page. The files below are read from the source, so they are always
        current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Breadcrumb.tsx" caption="packages/components/src/Breadcrumb" code={source} />
      <CodeBlock title="breadcrumb.overrides.tsx" caption="MuiBreadcrumbs theme overrides" code={overrides} />
    </Stack>
  )
}
