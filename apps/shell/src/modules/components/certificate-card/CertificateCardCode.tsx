import { Stack, Typography } from '@mui/material'
import source0 from '@design-os/components/src/Gamification/CertificateCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { CertificateCard } from '@design-os/components'

<CertificateCard tier="master" subtitle="Mastery Achieved" />
<CertificateCard tier="expert" onDownload={download} />
<CertificateCard tier="advanced" size="large" onDownload={download} />`

export function CertificateCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        An earned certificate on its tier artwork. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="CertificateCard.tsx" caption="packages/components/src/Gamification" code={source0} />
    </Stack>
  )
}
