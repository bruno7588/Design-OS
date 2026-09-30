import { progressIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ProgressIllustrationMatrix } from './ProgressIllustrationMatrix'

// Figma = Progress illustration (dark 10157:9081, light 11196:7723), checked 2026-09-30.
const compare: Compare = {
  page: progressIllustrationFigma.page,
  set: progressIllustrationFigma.set,
  frames: { light: '/figma/progress-illustration-light.png', dark: '/figma/progress-illustration-dark.png' },
  live: (mode) => <ProgressIllustrationMatrix mode={mode} />,
  differences: [
    { property: "Artwork", figma: "Seven 40px icons", reference: "The same seven SVGs (from the prototype)", status: "Matches" },
    { property: "Result ring", figma: "Passed, Nearly there and Not passed have a ring bound to Page-background, so it changes with the mode", reference: "A file per mode for those three: Neutral-800 ring in dark, Neutral-25 in light", status: "Matches" },
    { property: "Colours", figma: "Bound to Success, Warning and Danger 300/500/600", reference: "The same values, baked into the files", status: "Matches" },
  ],
  engineering: {
    mui: 'img',
    usage: "<ProgressIllustration type=\"streak\" />",
    props: [{ figma: "Type", code: "type" }],
    theme: ['No theme override.'],
    files: ["packages/components/src/Illustrations/Illustrations.tsx", "packages/components/src/Illustrations/art/progress/*.svg"],
  },
}

export function ProgressIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
