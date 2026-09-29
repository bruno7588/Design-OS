import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/InstructorCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { InstructorCard } from '@design-os/components'

<InstructorCard
  name={instructor.name}
  bio={instructor.bio}
  image={instructor.photo}
  skills={instructor.skills.map((s) => ({ label: s.name, icon: <img src={skillIcon(s.name)} alt="" /> }))}
  onClick={open}
/>`

export function InstructorCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens. The name is the card’s button and its hit area covers the card. The file below
        is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="InstructorCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
