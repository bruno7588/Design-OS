import { Stack } from '@mui/material'
import { CertificateCard, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Certificate instances" set, top to bottom, 24 apart.
export function CertificateCardMatrix({ mode }: { mode: Mode }) {
  const noop = () => {}
  return (
    <Canvas mode={mode}>
      <Stack data-testid={`certificate-card-matrix-${mode}`} sx={{ gap: 6, width: 900 }}>
        <CertificateCard tier="master" subtitle="Mastery Achieved" />
        <CertificateCard tier="master" onDownload={noop} />
        <CertificateCard tier="expert" onDownload={noop} />
        <CertificateCard tier="advanced" onDownload={noop} />
        <CertificateCard tier="master" size="md" title="Skill Name Skill Name" subtitle="Mastery Achieved" />
        <CertificateCard tier="master" size="large" subtitle="Mastery Achieved" onDownload={noop} />
        <CertificateCard tier="expert" size="large" onDownload={noop} />
        <CertificateCard tier="advanced" size="large" onDownload={noop} />
      </Stack>
    </Canvas>
  )
}
