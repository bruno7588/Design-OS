import { Stack, Typography } from '@mui/material'
import infoSource from '@design-os/components/src/Tooltip/InfoTooltip.tsx?raw'
import overridesSource from '@design-os/components/src/Tooltip/tooltip.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import Tooltip from '@mui/material/Tooltip'
import { InfoTooltip } from '@design-os/components'

// Icon=True: an info button next to a label
<InfoTooltip title="Learners see this skill on their profile." />

// Icon=False: any element as the trigger
<Tooltip title="Duplicate">
  <IconButton aria-label="Duplicate"><Copy /></IconButton>
</Tooltip>

// Position and alignment
<Tooltip title="…" placement="bottom-start">…</Tooltip>`

export function TooltipCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Tooltip with the 5Mins theme: the bubble, the 12×6 caret and the offsets all live in the theme
        overrides, so plain MUI renders the same. InfoTooltip adds the info button from the Figma set. The files below are
        read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="InfoTooltip.tsx" caption="packages/components/src/Tooltip" code={infoSource} />
      <CodeBlock title="tooltip.overrides.ts" caption="MuiTooltip theme overrides" code={overridesSource} />
    </Stack>
  )
}
