import { Box } from '@mui/material'
import { ModalPreview, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { SlotPlaceholder } from '../shared/SlotPlaceholder'

// The Figma Modal (7479:4350): the panel on the scrim, with the content slot.
export function ModalMatrix({ mode }: { mode: Mode }) {
  const noop = () => {}
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto', p: 0 }}>
      <Box sx={(theme) => ({ bgcolor: theme.tokens.semantic.scrim, p: 12, display: 'flex', justifyContent: 'center', minWidth: 816 })}>
        <Box data-testid={`modal-matrix-${mode}`}>
          <ModalPreview title="Title of this section" supportingText="Supporting text" onClose={noop} action={{ label: 'Button', onClick: noop }}>
            <SlotPlaceholder />
          </ModalPreview>
        </Box>
      </Box>
    </Canvas>
  )
}
