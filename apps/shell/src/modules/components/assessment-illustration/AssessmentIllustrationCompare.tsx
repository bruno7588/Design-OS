import { assessmentIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { AssessmentIllustrationMatrix } from './AssessmentIllustrationMatrix'

// Figma = Assessment illustration (dark 9120:8850, light 12154:10371), checked 2026-09-30.
const compare: Compare = {
  page: assessmentIllustrationFigma.page,
  set: assessmentIllustrationFigma.set,
  frames: { light: '/figma/assessment-illustration-light.png', dark: '/figma/assessment-illustration-dark.png' },
  live: (mode) => <AssessmentIllustrationMatrix mode={mode} />,
  differences: [
    { property: "Artwork", figma: "Eleven types, Mobile 56 and Desktop 80", reference: "The same 22 SVGs (from the prototype), used by the Assessment card since batch 15", status: "Matches" },
    { property: "Light set", figma: "Lesson quiz, Desktop was missing from the light set", reference: "Added on 2026-09-30 (a copy of the dark variant); the light set now mirrors the dark one", status: "Matches" },
    { property: "Colours", figma: "Bound to the assessment type colours (Blaze quiz, Flash Poll…)", reference: "The same values, baked into the files", status: "Matches" },
    { property: "Spelling", figma: "“Categorise” (renamed from Categorize on 2026-09-30, both sets)", reference: "“Categorise”", status: "Matches" },
  ],
  engineering: {
    mui: 'img',
    usage: "<AssessmentIllustration type=\"multiple-choice\" />                 // 80px, desktop",
    props: [{ figma: "Type", code: "type" }, { figma: "Device", code: "device" }],
    theme: ['No theme override.'],
    files: ["packages/components/src/Card/illustrations.tsx", "packages/components/src/Card/illustrations/assessments/*.svg"],
  },
}

export function AssessmentIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
