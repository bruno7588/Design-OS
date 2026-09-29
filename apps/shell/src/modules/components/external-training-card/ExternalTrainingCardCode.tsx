import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/ProductCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { ExternalTrainingCard } from '@design-os/components'

<ExternalTrainingCard title="Technical Product Manager Certification" provider="Self paced online course" price="£399" image={cover} onClick={open} />
<ExternalTrainingCard device="mobile" … />`

export function ExternalTrainingCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        External training and Marketplace cards share one layout, drawn by ProductCard.tsx. The file below is read from the
        source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="ProductCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
