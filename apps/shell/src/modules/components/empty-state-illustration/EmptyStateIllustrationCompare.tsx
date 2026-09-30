import { emptyStateIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { EmptyStateIllustrationMatrix } from './EmptyStateIllustrationMatrix'

// Figma = Empty state illustration (dark 9120:8372, light 9120:8372), checked 2026-09-30.
const compare: Compare = {
  page: emptyStateIllustrationFigma.page,
  set: emptyStateIllustrationFigma.set,
  frames: { light: '/figma/empty-state-illustration-light.png', dark: '/figma/empty-state-illustration-dark.png' },
  live: (mode) => <EmptyStateIllustrationMatrix mode={mode} />,
  differences: [
    { property: "Artwork", figma: "33 illustrations, 72px tall", reference: "The same 33 SVGs (from the prototype; empty box, search, resources and no activity exported from Figma in batch 9)", status: "Matches" },
    { property: "Prototype files", figma: "Share is 120 wide, so every variant after it sits 48px further along the set", reference: "The prototype cropped 28 files 48px short and Share to 72 wide, cutting the art. Fixed here and in the prototype (viewBoxes from the Figma positions; Share re-exported)", status: "Matches" },
    { property: "Unnamed variant", figma: "A 34th variant called “null”", reference: "Left out", status: "Design to update", note: "Name it or delete it." },
    { property: "Light version", figma: "One copy, used as an instance on the light board", reference: "One set of files: the Neutral colours don't change with the mode", status: "Matches" },
  ],
  engineering: {
    mui: 'img',
    usage: "<EmptyStateIllustration name=\"no-results\" />",
    props: [{ figma: "Illustration", code: "name (EmptyState illustration)" }],
    theme: ['No theme override.'],
    files: ["packages/components/src/EmptyState/EmptyState.tsx", "packages/components/src/EmptyState/illustrations/*.svg"],
  },
}

export function EmptyStateIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
