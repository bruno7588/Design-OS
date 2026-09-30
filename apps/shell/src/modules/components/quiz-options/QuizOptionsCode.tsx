import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Gamification/QuizOptions.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { QuizOptions, QuizExplanation } from '@design-os/components'

<QuizOptions label={question} options={options} value={value} onChange={setValue} answer={correct} revealed={checked} />
{checked && <QuizExplanation result={value === correct ? 'correct' : 'incorrect'}>{explanation}</QuizExplanation>}`

export function QuizOptionsCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is a radio group built on MUI Radio: arrow keys move between answers, and the question names the group.
        The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="QuizOptions.tsx" caption="packages/components/src/Gamification" code={source} />
    </Stack>
  )
}
