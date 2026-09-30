import { certificateCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CertificateCardMatrix } from './CertificateCardMatrix'

// Figma = Certificate instances (dark 5514:2390, light 8442:6119), checked 2026-09-30.
const compare: Compare = {
  page: certificateCardFigma.page,
  set: certificateCardFigma.set,
  frames: { light: '/figma/certificate-card-light.png', dark: '/figma/certificate-card-dark.png' },
  live: (mode) => <CertificateCardMatrix mode={mode} />,
  differences: [
    { property: 'Layout', figma: 'small 343 and md 408: padding 16, radius 12, 64px medal with a blur-4 copy at 2,2; large 900: padding 24, radius 12 (SM; 16 until 2026-09-30), 72px medal', reference: 'Same', status: 'Matches' },
    { property: 'Artwork', figma: 'Tier backgrounds (orange, purple, blue)', reference: 'The same backgrounds, exported from Figma', status: 'Matches' },
    { property: 'Tier colours', figma: 'Raw #FF7B00, #822FAF, #5E60CE on the inner edge', reference: 'New tokens gamification.certificateMaster, certificateExpert, certificateAdvanced (same values)', status: 'Design to update', note: 'Make them variables.' },
    { property: 'Text', figma: 'Raw #262933 on Master, raw #FFFFFF on Expert and Advanced', reference: 'Neutral-800 and Neutral-25', status: 'Design to update' },
    { property: 'Small Expert and Advanced medals', figma: 'Disabled=true medals from an older Illustrations copy (5555:5803, 5504:24496): pale pink and blue', reference: 'The current Illustrations/ Learning path medals, enabled', status: 'Design to update', note: 'Swap to the current set.' },
    { property: 'Large medals', figma: 'An older Illustrations/ Learning path/…/In progress copy', reference: 'The current large medals', status: 'Design to update' },
    { property: 'Download, large', figma: 'An older Outlined Medium, 145 × 45; the plus in Primary', reference: 'The current Outlined Medium (41px) in the text colour, plus included', status: 'Design to update' },
    { property: 'Subtitle, large Expert and Advanced', figma: 'None', reference: 'Optional (subtitle prop)', status: 'Matches' },
  ],
  engineering: {
    mui: 'Box, Button',
    usage: `<CertificateCard tier="master" onDownload={download} />`,
    props: [
      { figma: 'Type', code: 'tier (+ subtitle or onDownload)' },
      { figma: 'Size', code: 'size' },
    ],
    theme: ['No theme override. New palette tokens: gamification.certificateMaster, certificateExpert, certificateAdvanced.'],
    files: ['packages/components/src/Gamification/CertificateCard.tsx', 'packages/components/src/Gamification/art/certificate/*.png'],
  },
}

export function CertificateCardCompare() {
  return <CompareTemplate c={compare} />
}
