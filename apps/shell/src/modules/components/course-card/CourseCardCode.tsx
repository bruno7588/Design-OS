import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/CourseCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { CourseCard } from '@design-os/components'

<CourseCard title={c.title} image={c.cover} lessons="17 lessons" duration="20 min" progress={37} onClick={open} />
<CourseCard … isNew dueDate="Due on Aug 20" />
<CourseCard device="mobile" … />`

export function CourseCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens, the 5Mins Badge and the Progress bar (in Selected). The title is the card’s
        button and its hit area covers the card. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="CourseCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
