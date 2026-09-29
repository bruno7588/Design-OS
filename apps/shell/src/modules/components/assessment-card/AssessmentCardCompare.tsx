import { assessmentCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { AssessmentCardMatrix } from './AssessmentCardMatrix'

// Figma = Card/Assessments (dark 10242:2782, light 12104:3647), checked 2026-09-29.
const compare: Compare = {
  page: assessmentCardFigma.page,
  set: assessmentCardFigma.set,
  frames: { light: '/figma/assessment-card-light.png', dark: '/figma/assessment-card-dark.png' },
  live: (mode) => <AssessmentCardMatrix mode={mode} />,
  differences: [
    { property: 'Web app row', figma: 'Padding 16 (24 on the right when disabled), gap 16, centred; illustration 80; title Bold 16 on one line; type Regular 14', reference: 'Same', status: 'Matches' },
    { property: 'Admin row', figma: 'Padding 12, gap 12, top-aligned; illustration 48; edit-2 16 in a 22px box and an Informative Badge, 8 apart', reference: 'Same (Edit is a named button)', status: 'Matches' },
    { property: 'Mobile card', figma: 'Padding 12, gap 8; illustration 56 (mobile artwork); title Bold 14 wraps; type Regular 12/1.2', reference: 'Same', status: 'Matches' },
    { property: 'Completed', figma: 'Success tick after the type (20 web, 16 mobile); Review: Outlined Small on mobile', reference: 'Same', status: 'Matches' },
    { property: 'Review on the web app', figma: 'Outlined Medium, 41px (padding overrides reset on 2026-09-29; was 37)', reference: 'The same Medium', status: 'Matches' },
    { property: 'Completed, hover', figma: 'Review switches to Outlined-2 Hover, with a raw #00CEE6 at 16% fill', reference: 'Review keeps Outlined; it takes its own hover when pointed at', status: 'Design to update', note: 'The card hover shouldn’t restyle the button, and the fill should be a variable.' },
    { property: 'Disabled', figma: 'Illustration in Luminosity, Text-disabled, Bold lock (24 web, 20 mobile)', reference: 'Greyscale illustration, same text and lock', status: 'Matches' },
    { property: 'Title on hover', figma: 'Stays Text-primary', reference: 'Same', status: 'Matches', note: 'The Lesson card turns it Text-button-hover; worth making them agree.' },
    { property: 'Shadow', figma: 'Shadow S in the light set (added 2026-09-29), none in dark', reference: 'Same', status: 'Matches', note: 'Every card has Shadow S in light mode.' },
    { property: 'Illustrations', figma: 'Illustrations/ Assessments (9120:8850), 11 types × Mobile and Desktop', reference: 'The same artwork, copied from the prototype', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'AssessmentCard', status: 'Code to update', note: 'The prototype has mobile/AssessmentCard; the web and Admin rows are page-local.' },
  ],
  engineering: {
    mui: 'Box (article) + Badge + Button + IconButton',
    usage: `<AssessmentCard device="web" title={a.title} type="multiple-choice" completed onReview={review} />`,
    props: [
      { figma: 'Device', code: 'device: web | admin | mobile' },
      { figma: 'Completed / Disabled', code: 'completed / disabled' },
      { figma: 'Illustration Type', code: 'type (AssessmentType)' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/AssessmentCard.tsx', 'packages/components/src/Card/illustrations.tsx', 'packages/components/src/Card/illustrations/assessments/*.svg'],
  },
}

export function AssessmentCardCompare() {
  return <CompareTemplate c={compare} />
}
