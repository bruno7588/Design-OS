import { Box } from '@mui/material'
import { AssessmentIllustration, ASSESSMENT_TYPES, type AssessmentType } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Assessment illustration" set.
const ITEMS = (Object.keys(ASSESSMENT_TYPES) as AssessmentType[]).map((t) => ({ key: t, node: <AssessmentIllustration type={t} />, caption: ASSESSMENT_TYPES[t] }))

const g: Guidelines = {
  overview: "Assessment illustrations tell the assessment types apart: lesson quiz, multiple choice, short text, exercise and the rest. Each type is drawn for mobile (56) and desktop (80).",
  whenToUse: ["On assessment cards and pickers."],
  whenNotToUse: ["For resources. Use the Type thumbnail."],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, maxWidth: 560 }}>
        {ITEMS.slice(0, 4).map((i) => (
          <Box key={i.key}>{i.node}</Box>
        ))}
      </Box>
    ),
    parts: [
      { name: "Mobile", description: "56px." },
      { name: "Desktop", description: "80px; the Admin row scales it to 48." },
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
    { label: "Assessment illustration, light mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12154-10371' },
    { label: "Assessment illustration, dark mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-8850' },
  ],
  spec: "playground/docs/design-system/gamification.md",
}

export function AssessmentIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
