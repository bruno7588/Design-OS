import { Box } from '@mui/material'
import { ProgressIllustration, PROGRESS_ILLUSTRATIONS, type ProgressIllustrationType } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Progress illustration" set.
const ITEMS = (Object.keys(PROGRESS_ILLUSTRATIONS) as ProgressIllustrationType[]).map((t) => ({ key: t, node: <ProgressIllustration type={t} />, caption: PROGRESS_ILLUSTRATIONS[t] }))

const g: Guidelines = {
  overview: "Progress illustrations sit beside a learner’s stats (streak, points, jewels, certificates) and quiz outcomes (passed, nearly there, not passed).",
  whenToUse: ["Beside a number on progress summaries.", "For a quiz or assessment result."],
  whenNotToUse: ["As the only sign of a result. Say “Passed” in text too."],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, maxWidth: 560 }}>
        {ITEMS.slice(0, 4).map((i) => (
          <Box key={i.key}>{i.node}</Box>
        ))}
      </Box>
    ),
    parts: [
      { name: "Stats", description: "Streak, Points, Jewels, Certificates." },
      { name: "Results", description: "Passed (Success), Nearly there (Warning), Not passed (Danger), each ringed in Page-background." },
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
    { label: "Progress illustration, light mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11196-7723' },
    { label: "Progress illustration, dark mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10157-9081' },
  ],
  spec: "playground/docs/design-system/gamification.md",
}

export function ProgressIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
