import { Box } from '@mui/material'
import { GamificationIllustration, GAMIFICATION_ILLUSTRATIONS, type GamificationIllustrationType } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Gamification illustration" set.
const ITEMS = (Object.keys(GAMIFICATION_ILLUSTRATIONS) as GamificationIllustrationType[]).map((t) => ({ key: t, node: <GamificationIllustration type={t} />, caption: GAMIFICATION_ILLUSTRATIONS[t] }))

const g: Guidelines = {
  overview: "Gamification illustrations introduce the four gamification features: progress, certificates, quizzes and learning paths.",
  whenToUse: ["On feature introductions, onboarding and settings for gamification."],
  whenNotToUse: ["As status icons or in dense lists. Use the Progress illustrations (40px)."],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, maxWidth: 560 }}>
        {ITEMS.slice(0, 4).map((i) => (
          <Box key={i.key}>{i.node}</Box>
        ))}
      </Box>
    ),
    parts: [
      { name: "Progress", description: "A streak flame." },
      { name: "Certificate", description: "The certificate seal." },
      { name: "Quiz", description: "A light bulb." },
      { name: "Learning Path", description: "The Level 1 shield." },
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
    { label: "Gamification illustration, light mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11196-7707' },
    { label: "Gamification illustration, dark mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11196-7607' },
  ],
  spec: "playground/docs/design-system/gamification.md",
}

export function GamificationIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
