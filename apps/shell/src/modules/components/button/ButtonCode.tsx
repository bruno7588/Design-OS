import { Stack, Typography } from '@mui/material'
import buttonSource from '@design-os/components/src/Button/Button.tsx?raw'
import overridesSource from '@design-os/components/src/Button/button.overrides.ts?raw'
import tokensSource from '@design-os/components/src/theme/tokens.ts?raw'
import themeSource from '@design-os/components/src/theme/index.ts?raw'
import augmentSource from '@design-os/components/src/theme/augment.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'
import { usageSnippet } from './spec'

const examples = [
  usageSnippet({ config: 'Filled', size: 'medium', icon: false, state: 'Enabled', label: 'Save changes' }),
  `// Primary and secondary pair
<Button variant="outlined">Cancel</Button>
<Button>Save Changes</Button>`,
  `// Destructive confirmation
<Button variant="outlined">Cancel</Button>
<Button color="error">Delete Course</Button>`,
  `// AI action
import { Button, SparkleIcon } from '@design-os/components'

<Button color="ai" icon={<SparkleIcon />}>Generate</Button>`,
  `// Loading keeps the width and the accessible name
<Button loading={saving}>Save Changes</Button>`,
  `// Plain MUI renders the same, because every rule is in the theme
import MuiButton from '@mui/material/Button'

<MuiButton variant="outlined" color="error" size="small">Remove</MuiButton>`,
].join('\n\n')

export function ButtonCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Button with the 5Mins theme. Every visual rule lives in the theme overrides, so the
        wrapper only adds a leading icon shortcut and the loading state. The files below are read from the source, so they
        are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Button.tsx" caption="packages/components/src/Button" code={buttonSource} />
      <CodeBlock title="button.overrides.ts" caption="MuiButton theme overrides: variants, families, sizes and states" code={overridesSource} />
      <CodeBlock title="theme/index.ts" caption="createFiveMinsTheme: palette, typography, spacing, shape" code={themeSource} />
      <CodeBlock title="theme/augment.ts" caption={'Adds color="ai", the outlined2 and link variants, and theme.tokens'} code={augmentSource} />
      <CodeBlock title="theme/tokens.ts" caption="Raw and semantic tokens, light and dark" code={tokensSource} />
    </Stack>
  )
}
