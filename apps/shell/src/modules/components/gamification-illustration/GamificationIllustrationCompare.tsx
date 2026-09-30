import { gamificationIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { GamificationIllustrationMatrix } from './GamificationIllustrationMatrix'

// Figma = Gamification illustration (dark 11196:7607, light 11196:7707), checked 2026-09-30.
const compare: Compare = {
  page: gamificationIllustrationFigma.page,
  set: gamificationIllustrationFigma.set,
  frames: { light: '/figma/gamification-illustration-light.png', dark: '/figma/gamification-illustration-dark.png' },
  live: (mode) => <GamificationIllustrationMatrix mode={mode} />,
  differences: [
    { property: "Artwork", figma: "Progress, Certificate, Quiz and Learning Path at 96px", reference: "The same four SVGs (from the prototype)", status: "Matches" },
    { property: "Modes", figma: "The light and dark sets draw the same artwork", reference: "One set of files", status: "Matches" },
  ],
  engineering: {
    mui: 'img',
    usage: "<GamificationIllustration type=\"progress\" />       // streak flame",
    props: [{ figma: "Type", code: "type" }],
    theme: ['No theme override.'],
    files: ["packages/components/src/Illustrations/Illustrations.tsx", "packages/components/src/Illustrations/art/gamification/*.svg"],
  },
}

export function GamificationIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
