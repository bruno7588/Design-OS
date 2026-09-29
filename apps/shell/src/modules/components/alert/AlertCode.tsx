import { Stack, Typography } from '@mui/material'
import alertSource from '@design-os/components/src/Alert/Alert.tsx?raw'
import overridesSource from '@design-os/components/src/Alert/alert.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Alert } from '@design-os/components'

// Callout: guidance, with the pin illustration by default
<Alert>You can add your content and 5Mins content to a collection.</Alert>
<Alert icon action={{ label: 'Learn More', onClick: openHelp }}>You can add your content to a collection.</Alert>

// Callout with supporting text: the button moves under it
<Alert title="Collections are shared with your teams" action={{ label: 'Create', onClick: create, icon: <Add /> }}>
  Learners see them on their home page, in the order you set.
</Alert>

// Alert: a warning that needs attention
<Alert type="alert" action={{ label: 'Renew', onClick: renew }}>Your licence ends in 7 days</Alert>

// Plain MUI renders the same boxes: severity info is a Callout, warning an Alert
import MuiAlert from '@mui/material/Alert'

<MuiAlert severity="warning" role="status">Your licence ends in 7 days</MuiAlert>`

export function AlertCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Alert, variant standard. The theme draws the Callout and Alert boxes, so plain MUI looks the same;
        the wrapper picks the Figma illustration or icon and places the button. The filled variant stays the Toast. The files below
        are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Alert.tsx" caption="packages/components/src/Alert" code={alertSource} />
      <CodeBlock title="alert.overrides.ts" caption="MuiAlert variant standard, hooked into MuiAlert in toast.overrides.tsx" code={overridesSource} />
    </Stack>
  )
}
