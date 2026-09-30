import { Box } from '@mui/material'
import { FunctionIllustration, type FunctionIllustrationName, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

const FIGMA_ORDER: FunctionIllustrationName[] = ['customer-happiness', 'customer-success', 'engineering', 'finances', 'general-admin', 'it-network-security', 'leadership', 'legal', 'marketing', 'operations', 'partnerships', 'people', 'product', 'rev-ops', 'sales', 'logistics', 'creative', 'customer-experience', 'custom', 'contact-centre']

// The Figma "Function illustration" set in one row, as the Library board draws it.
export function FunctionIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ p: 6, overflowX: 'auto' }}>
      <Box data-testid={`function-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 6, width: 'max-content' }}>
        {FIGMA_ORDER.map((f) => <FunctionIllustration key={f} fn={f} />)}
      </Box>
    </Canvas>
  )
}
