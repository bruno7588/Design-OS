import { Box } from '@mui/material'
import { CertificateIllustration, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Certificate illustration" set in one row, as the Library board draws it.
export function CertificateIllustrationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ p: 14, overflowX: 'auto' }}>
      <Box data-testid={`certificate-illustration-matrix-${mode}`} sx={{ display: 'flex', alignItems: 'center', gap: 14, width: 'max-content' }}>
        {(['xl', 'l', 'm', 's'] as const).map((s) => <CertificateIllustration key={s} size={s} />)}
      </Box>
    </Canvas>
  )
}
