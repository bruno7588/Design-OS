import { Box } from '@mui/material'
import { BottomSheetPreview, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { SlotPlaceholder } from '../shared/SlotPlaceholder'

// The Figma Bottom sheet (7479:106): the sheet over the dimmed page, 375 × 812.
export function BottomSheetMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`bottom-sheet-matrix-${mode}`} sx={{ width: 375 }}>
        <BottomSheetPreview>
          <SlotPlaceholder />
        </BottomSheetPreview>
      </Box>
    </Canvas>
  )
}
