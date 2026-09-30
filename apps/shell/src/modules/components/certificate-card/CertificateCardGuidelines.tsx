import { CertificateCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from the Figma "Certificate instances" set (not documented in the prototype).
const noop = () => {}
const g: Guidelines = {
  overview: 'The certificate card shows a certificate the learner has earned, on its tier’s artwork, with a way to download it.',
  whenToUse: ['At the end of a learning path once the certificate is earned.', 'In a list of the learner’s certificates.'],
  whenNotToUse: ['For a certificate not yet earned. Use the Learning path card (Type=Certificate, pending or disabled).'],
  anatomy: {
    example: <CertificateCard tier="master" onDownload={noop} />,
    parts: [
      { name: 'Surface', description: 'The tier artwork, radius 12 (16 on large), with a 4px inner edge on the right and bottom in the tier colour.' },
      { name: 'Medal', description: '64px with a soft glow behind it; 72px with its ribbon on large.' },
      { name: 'Title', description: 'Bold 14 (16 on md, 20 on large).' },
      { name: 'Subtitle or Download', description: 'Regular 12 (14 on md and large), or a Download text button.' },
      { name: 'Tick', description: 'Bold tick-circle in the text colour (small and md).' },
    ],
  },
  variants: [
    { name: 'Master', description: 'Orange, dark text (Neutral-800).', example: <CertificateCard tier="master" subtitle="Mastery Achieved" /> },
    { name: 'Expert', description: 'Purple, light text (Neutral-25).', example: <CertificateCard tier="expert" subtitle="Expert" /> },
    { name: 'Advanced', description: 'Blue, light text (Neutral-25).', example: <CertificateCard tier="advanced" subtitle="Advanced" /> },
  ],
  states: [],
  dos: [
    {
      do: { example: <CertificateCard tier="expert" onDownload={noop} />, text: 'Offer the download where the learner will look for it.' },
      dont: { example: <CertificateCard tier="expert" title="Expert" />, text: 'Shorten the title so the tier is lost.' },
    },
  ],
  content: ['Titles name the tier: “Master Certificate”.', 'Download is a button label, so Title Case.'],
  accessibility: ['The title is a heading; the tick is named “Earned”.', 'The artwork is decorative.', 'Master uses dark text on orange; Expert and Advanced use light text, for contrast.'],
  figma: [
    { label: 'Certificate instances, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8442-6119' },
    { label: 'Certificate instances, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5514-2390' },
  ],
  spec: 'playground/docs/design-system/gamification.md',
}

export function CertificateCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
