import { functionIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { FunctionIllustrationMatrix } from './FunctionIllustrationMatrix'

// Figma = Function illustration (dark 9120:9874, light 9120:9874), checked 2026-09-30.
const compare: Compare = {
  page: functionIllustrationFigma.page,
  set: functionIllustrationFigma.set,
  frames: { light: '/figma/function-illustration-light.png', dark: '/figma/function-illustration-dark.png' },
  live: (mode) => <FunctionIllustrationMatrix mode={mode} />,
  differences: [
    { property: "Artwork", figma: "20 functions at 96px", reference: "The same 20, exported from Figma as SVG on 2026-09-30 and cut to the drawing (the prototype has none)", status: "Matches" },
    { property: "Light version", figma: "One copy, used as an instance on the light board; no variables, raw colours", reference: "One set of files", status: "Matches" },
    { property: "Size", figma: "People, Product, Marketing and Customer Experience export at 97 or 98, with a little art past the frame", reference: "Shown in a 96 box, scaled to fit", status: "Design to update", note: "Clip the art to the frame." },
  ],
  engineering: {
    mui: 'img',
    usage: "<FunctionIllustration fn=\"engineering\" />",
    props: [{ figma: "Function", code: "fn" }],
    theme: ['No theme override.'],
    files: ["packages/components/src/Illustrations/Illustrations.tsx", "packages/components/src/Illustrations/art/functions/*.svg"],
  },
}

export function FunctionIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
