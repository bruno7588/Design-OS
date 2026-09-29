import { emojiFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { EmojiMatrix } from './EmojiMatrix'

// Figma = Emojies (dark 10587:2256; light board 12368:97, added 2026-09-29), checked 2026-09-29.
const compare: Compare = {
  page: emojiFigma.page,
  set: emojiFigma.set,
  frames: { light: '/figma/emoji-light.png', dark: '/figma/emoji-dark.png' },
  live: (mode) => <EmojiMatrix mode={mode} />,
  differences: [
    { property: 'Types', figma: '13: Angel, Smile, Hand waving, Love, Sad smile, Gossip, Pleased, Shy, Straving, Silly, Got an idea, Laugh with tear, Tenant', reference: 'The same 13 (Straving is "starving" in code)', status: 'Matches', note: 'Worth fixing the spelling in Figma: Straving, Emojies.' },
    { property: 'Plain faces', figma: 'Input-background face, Neutral-600 features', reference: 'SVG from the tokens: the face follows the mode', status: 'Matches' },
    { property: 'Gradient faces', figma: 'Fixed gradients, Neutral-600 features', reference: 'The Figma artwork as 240px PNG', status: 'Matches', note: 'Sharp up to 120px on 2× screens; the Avatar uses 24 to 72.' },
    { property: 'Light version', figma: 'Only inside the light Avatars until 2026-09-29', reference: '–', status: 'Matches', note: 'Added a light board (12368:97) with an instance of each.' },
    { property: 'Avatar fallback', figma: 'Avatar Picture=false uses Angel', reference: 'AvatarFallbackIcon (Angel) in the Avatar; Emoji for the rest', status: 'Matches' },
  ],
  engineering: {
    mui: 'Box (svg / img)',
    usage: `<Emoji type="hand-waving" size={72} label="Hello" />`,
    props: [{ figma: 'Type', code: 'type (kebab-case)' }],
    theme: ['No theme override: the plain face uses the Input-background token.'],
    files: ['packages/components/src/Avatar/Emoji.tsx', 'packages/components/src/Avatar/emoji/*.png'],
  },
}

export function EmojiCompare() {
  return <CompareTemplate c={compare} />
}
