import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/ContentSwitcher/ContentSwitcher.tsx?raw'
import overrides from '@design-os/components/src/ContentSwitcher/contentSwitcher.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ContentSwitcher } from '@design-os/components'

<ContentSwitcher
  aria-label="View"
  value={view}
  onChange={setView}
  items={[
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
  ]}
/>

// Plain MUI renders the same: an exclusive ToggleButtonGroup
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

<ToggleButtonGroup exclusive value={view} onChange={(_, v) => v && setView(v)} aria-label="View">
  <ToggleButton value="grid">Grid</ToggleButton>
  <ToggleButton value="list">List</ToggleButton>
</ToggleButtonGroup>`

export function ContentSwitcherCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 ToggleButtonGroup, exclusive: MUI’s segmented control. The theme draws the track and sections, so
        plain MUI looks the same; the wrapper keeps one section selected. The files below are read from the source, so they are
        always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ContentSwitcher.tsx" caption="packages/components/src/ContentSwitcher" code={source} />
      <CodeBlock title="contentSwitcher.overrides.ts" caption="MuiToggleButtonGroup and MuiToggleButton theme overrides" code={overrides} />
    </Stack>
  )
}
