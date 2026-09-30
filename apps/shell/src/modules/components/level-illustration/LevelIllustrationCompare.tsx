import { levelIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { LevelIllustrationMatrix } from './LevelIllustrationMatrix'

// Figma = Illustrations/ Learning path (dark 9120:9437, light 11196:8794), checked 2026-09-30.
const compare: Compare = {
  page: levelIllustrationFigma.page,
  set: levelIllustrationFigma.set,
  frames: { light: '/figma/level-illustration-light.png', dark: '/figma/level-illustration-dark.png' },
  live: (mode) => <LevelIllustrationMatrix mode={mode} />,
  differences: [
    { property: 'Artwork', figma: '32 variants: 8 levels, small (56) and large (72), enabled and disabled', reference: 'The same 32 SVGs (from the prototype, which exported them from this set)', status: 'Matches' },
    { property: 'Modes', figma: 'The light and dark sets draw the same artwork', reference: 'One set of files for both modes', status: 'Matches' },
  ],
  engineering: {
    mui: 'img',
    usage: `<LevelIllustration level="expert" size="large" />`,
    props: [
      { figma: 'Level', code: 'level' },
      { figma: 'Disabled', code: 'disabled' },
      { figma: 'Size', code: 'size' },
    ],
    theme: ['No theme override.'],
    files: ['packages/components/src/Gamification/LevelIllustration.tsx', 'packages/components/src/Gamification/art/levels/*.svg'],
  },
}

export function LevelIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
