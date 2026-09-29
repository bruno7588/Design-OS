import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/AssessmentCard.tsx?raw'
import illustrations from '@design-os/components/src/Card/illustrations.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { AssessmentCard } from '@design-os/components'

<AssessmentCard device="web" title={a.title} type="multiple-choice" onClick={open} />
<AssessmentCard device="web" title={a.title} type="poll" completed onReview={review} />
<AssessmentCard device="admin" title={a.title} type="exercise" onEdit={edit} />
<AssessmentCard device="mobile" title={a.title} type="lesson-quiz" disabled />`

export function AssessmentCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens and the 5Mins Badge and Button, with the assessment illustrations as artwork. The
        title is the card’s button; Review and Edit stay separate. The files below are read from the source, so they are
        always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="AssessmentCard.tsx" caption="packages/components/src/Card" code={source} />
      <CodeBlock title="illustrations.tsx" caption="Assessment illustrations and Type thumbnails" code={illustrations} />
    </Stack>
  )
}
