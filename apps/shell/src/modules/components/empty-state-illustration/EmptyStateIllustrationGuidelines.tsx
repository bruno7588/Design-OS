import { Box } from '@mui/material'
import { EmptyStateIllustration, ILLUSTRATIONS, type IllustrationName } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Empty state illustration" set.
const ITEMS = (Object.keys(ILLUSTRATIONS) as IllustrationName[]).map((n) => ({ key: n, node: <EmptyStateIllustration name={n} />, caption: n.replace(/-/g, ' ') }))

const g: Guidelines = {
  overview: "Empty state illustrations show what is missing when a list or page has nothing in it yet. They are drawn in the Neutral palette, so they sit quietly in both modes.",
  whenToUse: ["In an Empty state, picked to match what is missing."],
  whenNotToUse: ["To decorate a page that has content."],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, maxWidth: 560 }}>
        {ITEMS.slice(0, 4).map((i) => (
          <Box key={i.key}>{i.node}</Box>
        ))}
      </Box>
    ),
    parts: [
      { name: "Size", description: "72px tall; 72 wide, except Share (120)." },
      { name: "Colour", description: "Neutral 100 to 700, the same in both modes." },
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
    { label: "Empty state illustration, light mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-8372' },
    { label: "Empty state illustration, dark mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-8372' },
  ],
  spec: "playground/docs/design-system/empty-state.md",
}

export function EmptyStateIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
