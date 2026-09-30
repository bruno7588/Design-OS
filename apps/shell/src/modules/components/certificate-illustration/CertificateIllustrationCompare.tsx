import { certificateIllustrationFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CertificateIllustrationMatrix } from './CertificateIllustrationMatrix'

// Figma = Certificate illustration (dark 9120:9301, light 11196:7670), checked 2026-09-30.
const compare: Compare = {
  page: certificateIllustrationFigma.page,
  set: certificateIllustrationFigma.set,
  frames: { light: '/figma/certificate-illustration-light.png', dark: '/figma/certificate-illustration-dark.png' },
  live: (mode) => <CertificateIllustrationMatrix mode={mode} />,
  differences: [
    { property: "Artwork", figma: "Four sizes, one drawing each (XL 240, L 80, M 56, S 20)", reference: "The same four SVGs (from the prototype, which exported them from this set)", status: "Matches" },
    { property: "Colours", figma: "Bound to Secondary-300 and the artwork's own gradients", reference: "The same, baked into the files", status: "Matches" },
    { property: "Modes", figma: "The light and dark sets draw the same artwork", reference: "One set of files", status: "Matches" },
  ],
  engineering: {
    mui: 'img',
    usage: "<CertificateIllustration size=\"xl\" />   // 240px, for celebrations",
    props: [{ figma: "Size", code: "size" }],
    theme: ['No theme override.'],
    files: ["packages/components/src/Illustrations/Illustrations.tsx", "packages/components/src/Illustrations/art/certificate/*.svg"],
  },
}

export function CertificateIllustrationCompare() {
  return <CompareTemplate c={compare} />
}
