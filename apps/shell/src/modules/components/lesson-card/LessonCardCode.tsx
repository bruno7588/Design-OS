import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/LessonCard.tsx?raw'
import base from '@design-os/components/src/Card/CardBase.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { LessonCard } from '@design-os/components'

// Grid tile (library browse)
<LessonCard view="grid" title={lesson.title} instructor={lesson.instructor} image={lesson.thumbnail} duration="3m 45s" progress={50} onClick={open} />

// Learner web app row
<LessonCard device="web" title={lesson.title} meta="Lesson · Ana Costa · 4min" image={lesson.thumbnail} progress={37} onClick={open} />

// With a quiz
<LessonCard device="web" … quiz="pending" onQuiz={startQuiz} />

// Admin row and mobile card
<LessonCard device="admin" … />
<LessonCard device="mobile" … />`

export function LessonCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens and the 5Mins Tag, Badge, Button and Progress bar. The title is the card’s
        button; its hit area covers the card, and the quiz button stays separate. The files below are read from the source, so
        they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="LessonCard.tsx" caption="packages/components/src/Card" code={source} />
      <CodeBlock title="CardBase.tsx" caption="Shared card surface and title" code={base} />
    </Stack>
  )
}
