import { Stack, Typography } from '@mui/material'
import toastSource from '@design-os/components/src/Toast/Toast.tsx?raw'
import overridesSource from '@design-os/components/src/Toast/toast.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ToastProvider, useToast } from '@design-os/components'

// Once, at the root of the app
<ToastProvider>
  <App />
</ToastProvider>

// Anywhere below it
const toast = useToast()
toast({ type: 'success', message: 'Course published' })
toast({ type: 'error', message: 'Could not save changes' })
toast({ type: 'info', message: 'Lesson deleted', action: { label: 'Undo', onClick: restore } })

// The body alone is plain MUI with the 5Mins theme
import Alert from '@mui/material/Alert'

<Alert variant="filled" severity="success">Course published</Alert>`

export function ToastCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The toast body is MUI 5.18 Alert with variant="filled", styled in the theme. ToastProvider adds the stack at the bottom of
        the window, the 5 second timer that pauses on hover and focus, and the live role. The files below are read from the
        source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Toast.tsx" caption="packages/components/src/Toast" code={toastSource} />
      <CodeBlock title="toast.overrides.tsx" caption="MuiAlert theme overrides for the filled variant" code={overridesSource} />
    </Stack>
  )
}
