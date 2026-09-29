import { Stack, Typography } from '@mui/material'
import badgeSource from '@design-os/components/src/Badge/Badge.tsx?raw'
import overridesSource from '@design-os/components/src/Chip/chip.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Badge } from '@design-os/components'

<Badge type="success" label="Completed" icon />
<Badge type="error" label="Overdue" icon />
<Badge type="progress" label="In progress" />
<Badge type="informative" label="12 lessons" />
<Badge type="new" label="New" />

// Removable value
<Badge type="informative" label="Leadership" onDismiss={() => remove('Leadership')} />

// Plain MUI renders the same: Badge is MUI Chip with variant="badge"
import Chip from '@mui/material/Chip'

<Chip variant="badge" color="success" label="Completed" />`

export function BadgeCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Chip with a custom badge variant, because MUI's own Badge is a notification dot. The styles
        live in the Chip theme overrides (badgeStyles); the wrapper picks the Figma icon for each type. The files below are
        read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Badge.tsx" caption="packages/components/src/Badge" code={badgeSource} />
      <CodeBlock title="chip.overrides.ts" caption="MuiChip theme overrides: badgeStyles is the badge variant" code={overridesSource} />
    </Stack>
  )
}
