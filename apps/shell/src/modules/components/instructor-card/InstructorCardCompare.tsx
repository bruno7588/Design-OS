import { instructorCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { InstructorCardMatrix } from './InstructorCardMatrix'

// Figma = Card/Instructor (dark 5149:27386, light 9926:2477), checked 2026-09-29.
const compare: Compare = {
  page: instructorCardFigma.page,
  set: instructorCardFigma.set,
  frames: { light: '/figma/instructor-card-light.png', dark: '/figma/instructor-card-dark.png' },
  live: (mode) => <InstructorCardMatrix mode={mode} />,
  differences: [
    { property: 'Desktop', figma: '404 × 160; photo 120; info padding 16, gap 12; name Bold 16; bio Regular 14/1.5', reference: 'Same', status: 'Matches' },
    { property: 'Mobile', figma: '340 × 137; info padding 12, gap 16; name Bold 14; bio Regular 12/1.2', reference: 'Same', status: 'Matches' },
    { property: 'Skills', figma: 'Rows 8 apart; Icons/Skill Icon 16 + Regular 12/1.2 Text-tertiary, cut at one line', reference: 'Same; the icon is a slot per skill', status: 'Matches' },
    { property: 'Bio', figma: 'The sample text is cut by hand ("…"); no truncation set', reference: 'Clamped at two lines', status: 'Matches' },
    { property: 'Hover', figma: 'Cards-background-hover; mobile Hover added 2026-09-29', reference: 'Same', status: 'Matches' },
    { property: 'Shadow', figma: 'Shadow S in the light set', reference: 'Same', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'InstructorCard', status: 'Code to update', note: 'The prototype has mobile/InstructorCard.' },
  ],
  engineering: {
    mui: 'Box (article)',
    usage: `<InstructorCard name={i.name} bio={i.bio} image={i.photo} skills={skills} onClick={open} />`,
    props: [{ figma: 'Device', code: 'device: desktop | mobile' }],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/InstructorCard.tsx'],
  },
}

export function InstructorCardCompare() {
  return <CompareTemplate c={compare} />
}
