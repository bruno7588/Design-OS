import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Illustrations/Illustrations.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { CertificateIllustration } from '@design-os/components'

<CertificateIllustration size="xl" />   // 240px, for celebrations
<CertificateIllustration size="l" />    // 80px, on cards and rows
<CertificateIllustration size="m" />    // 56px, mobile rows
<CertificateIllustration size="s" />    // 20px, inline`

export function CertificateIllustrationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The artwork files are the Figma exports. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Illustrations.tsx" caption="packages/components/src/Illustrations" code={source} />
    </Stack>
  )
}
