import { Stack, Typography } from '@mui/material'
import drawerSource from '@design-os/components/src/Overlay/SideDrawer.tsx?raw'
import overrides from '@design-os/components/src/Overlay/overlay.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { SideDrawer } from '@design-os/components'

<SideDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Edit learner"
  supportingText="Changes apply the next time they sign in."
  primaryAction={{ label: 'Save', onClick: save }}
  secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
>
  {form}
</SideDrawer>

// Plain MUI: anchor="right" is the 720px panel
import Drawer from '@mui/material/Drawer'

<Drawer anchor="right" open={open} onClose={close} PaperProps={{ role: 'dialog', 'aria-labelledby': 'title' }}>…</Drawer>`

export function DrawerCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Drawer, anchored right. The theme draws the 720px panel and the scrim; the wrapper lays out the close
        button, the section header, the scrolling content and the footer, and names the panel as a dialog. The files below are read
        from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="SideDrawer.tsx" caption="packages/components/src/Overlay" code={drawerSource} />
      <CodeBlock title="overlay.overrides.ts" caption="MuiDrawer theme overrides" code={overrides} />
    </Stack>
  )
}
