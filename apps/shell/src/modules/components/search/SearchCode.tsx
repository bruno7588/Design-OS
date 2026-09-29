import { Stack, Typography } from '@mui/material'
import searchSource from '@design-os/components/src/Search/Search.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Search } from '@design-os/components'

// Page-level search: L
<Search size="L" value={query} onChange={setQuery} placeholder="Search courses" fullWidth />

// In a panel, drawer or filter row: M
<Search value={query} onChange={setQuery} placeholder="Search people" />

// Plain MUI with the ds-search class gets the same look
import OutlinedInput from '@mui/material/OutlinedInput'

<OutlinedInput className="ds-search" size="small" type="search" startAdornment={…} />`

export function SearchCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 OutlinedInput with the ds-search class; its look lives in the shared field overrides (see the
        Input field page). The wrapper adds the search icon, the clear button and Escape to clear. The file below is read from
        the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Search.tsx" caption="packages/components/src/Search" code={searchSource} />
    </Stack>
  )
}
