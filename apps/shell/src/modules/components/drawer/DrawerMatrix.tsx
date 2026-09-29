import { Box } from '@mui/material'
import { SideDrawerPreview, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { SlotPlaceholder } from '../shared/SlotPlaceholder'

// The Figma Side Drawer (10871:12768): the panel against the right edge of the scrim.
export function DrawerMatrix({ mode }: { mode: Mode }) {
  const noop = () => {}
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto', p: 0 }}>
      <Box sx={(theme) => ({ bgcolor: theme.tokens.semantic.scrim, pl: 24, display: 'flex', justifyContent: 'flex-end', minWidth: 816 })}>
        <Box data-testid={`drawer-matrix-${mode}`}>
          <SideDrawerPreview
            title="Title of this section"
            supportingText="Supporting text"
            onClose={noop}
            primaryAction={{ label: 'Button', onClick: noop }}
            secondaryAction={{ label: 'Button', onClick: noop }}
          >
            <SlotPlaceholder label="Form slot" minHeight="100%" />
          </SideDrawerPreview>
        </Box>
      </Box>
    </Canvas>
  )
}
