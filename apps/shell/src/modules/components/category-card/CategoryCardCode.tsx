import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Card/CategoryCard.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { CategoryCard } from '@design-os/components'

<CategoryCard title="Leadership" image={cat.cover} courses="12 courses" lessons="24 lessons" onClick={open} />
<CategoryCard … isNew />
<CategoryCard … disabled />            // desktop: the Tooltip explains why
<CategoryCard device="mobile" … />`

export function CategoryCardCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is built from the tokens, the 5Mins Badge and MUI Tooltip. The title is the card’s button and its hit area
        covers the card. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="CategoryCard.tsx" caption="packages/components/src/Card" code={source} />
    </Stack>
  )
}
