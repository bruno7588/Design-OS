import { Box } from '@mui/material'
import { FunctionIllustration, FUNCTION_ILLUSTRATIONS, type FunctionIllustrationName } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Function illustration" set.
const ITEMS = (Object.keys(FUNCTION_ILLUSTRATIONS) as FunctionIllustrationName[]).map((f) => ({ key: f, node: <FunctionIllustration fn={f} />, caption: FUNCTION_ILLUSTRATIONS[f] }))

const g: Guidelines = {
  overview: "Function illustrations stand for a team’s function (Engineering, Sales, People…) when a workspace is set up or a team is picked.",
  whenToUse: ["On function pickers and team set-up."],
  whenNotToUse: ["For skills. Use the skill icons."],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, maxWidth: 560 }}>
        {ITEMS.slice(0, 4).map((i) => (
          <Box key={i.key}>{i.node}</Box>
        ))}
      </Box>
    ),
    parts: [
      { name: "Size", description: "96px." },
      { name: "Custom", description: "For a function not in the list." },
    ],
  },
  variants: [],
  states: [],
  dos: [
    {
      do: { example: ITEMS[0].node, text: 'Show it at its drawn size, next to text that says what it means.' },
      dont: { example: <Box sx={{ filter: 'hue-rotate(120deg)' }}>{ITEMS[0].node}</Box>, text: 'Recolour, stretch or crop the artwork.' },
    },
  ],
  content: [],
  accessibility: ['Decorative by default (empty alt), as the text beside it carries the meaning.', 'Pass label when the illustration stands alone.'],
  figma: [
    { label: "Function illustration, light mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-9874' },
    { label: "Function illustration, dark mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-9874' },
  ],
  spec: "playground/docs/design-system/gamification.md",
}

export function FunctionIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
