import { Stack, Typography } from '@mui/material'
import chipSource from '@design-os/components/src/Chip/Chip.tsx?raw'
import overridesSource from '@design-os/components/src/Chip/chip.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Chip } from '@design-os/components'
import { CloseCircle, User } from 'iconsax-react'

// Filter chips: one per option, selected toggles on click
<Chip label="Compliance" selected={active} onClick={() => setActive(!active)} />

// A person, with a leading icon
<Chip label="Maria Silva" icon={<User color="currentColor" />} />

// Removable: the trailing icon removes the chip (Backspace and Delete work too)
<Chip label="Leadership" iconRight={<CloseCircle color="currentColor" />} onDelete={() => remove('Leadership')} />

// Plain MUI renders the same; add the Mui-selected class for Selected
import MuiChip from '@mui/material/Chip'

<MuiChip label="Compliance" className={active ? 'Mui-selected' : undefined} onClick={toggle} />`

export function ChipCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Chip with the 5Mins theme. Every visual rule lives in the theme overrides; the wrapper only
        adds the selected state. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Chip.tsx" caption="packages/components/src/Chip" code={chipSource} />
      <CodeBlock title="chip.overrides.ts" caption="MuiChip theme overrides" code={overridesSource} />
    </Stack>
  )
}
