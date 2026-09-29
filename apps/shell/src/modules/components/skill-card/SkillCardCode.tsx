import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/SkillCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { SkillCard } from '@design-os/components'

<SkillCard label="Negotiation" icon={<SkillIllustration type="hard" />} />
<SkillCard label="Negotiation" icon={…} onRemove={() => remove(skill)} />   // in a skill picker
<SkillCard label="Negotiation" icon={…} disabled />`

export function SkillCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens, with MUI IconButton for Remove. The file below is read from the source, so it is
        always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="SkillCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
