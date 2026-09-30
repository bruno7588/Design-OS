import { Box } from '@mui/material'
import { CertificateIllustration } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Certificate illustration" set.
const ITEMS = (['xl', 'l', 'm', 's'] as const).map((s) => ({ key: s, node: <CertificateIllustration size={s} />, caption: `${s.toUpperCase()}, ${({ xl: 240, l: 80, m: 56, s: 20 })[s]}px` }))

const g: Guidelines = {
  overview: "The certificate seal marks certificates: earned, on offer, or counted. Each size is its own drawing, so pick the size rather than scaling one.",
  whenToUse: ["On certificate celebrations (xl), cards and rows (l, m), and inline counts (s)."],
  whenNotToUse: ["For an earned certificate card. Use the Certificate card, which has its own medals."],
  anatomy: {
    example: (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4, maxWidth: 560 }}>
        {ITEMS.slice(0, 4).map((i) => (
          <Box key={i.key}>{i.node}</Box>
        ))}
      </Box>
    ),
    parts: [
      { name: "XL", description: "240px, for a celebration screen." },
      { name: "L", description: "80px, on cards and rows." },
      { name: "M", description: "56px, on mobile rows." },
      { name: "S", description: "20px, inline beside text." },
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
    { label: "Certificate illustration, light mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11196-7670' },
    { label: "Certificate illustration, dark mode (Figma Library)", url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9120-9301' },
  ],
  spec: "playground/docs/design-system/gamification.md",
}

export function CertificateIllustrationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
