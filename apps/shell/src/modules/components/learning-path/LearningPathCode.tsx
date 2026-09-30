import { Stack, Typography } from '@mui/material'
import source0 from '@design-os/components/src/Gamification/LearningPathCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { LearningPathCard } from '@design-os/components'

<LearningPathCard
  state="in-progress"            // 'in-progress' | 'completed' | 'disabled' | 'pending'
  size="s"                       // 's' | 'md' | 'l'
  level={5}
  title="Master"
  description="Achieve mastery and lead in your domain"
  topics={['Pricing strategy', 'Negotiation']}
  progress={{ value: 80, total: 120 }}
  actionLabel="Keep Learning"
  onAction={openPath}
/>

// The certificate at the end of the path
<LearningPathCard type="certificate" tier="master" state="pending" title="Master Certificate" actionLabel="Get Started" onAction={start} />`

export function LearningPathCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        One step of a learning path: a level or the certificate. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="LearningPathCard.tsx" caption="packages/components/src/Gamification" code={source0} />
    </Stack>
  )
}
