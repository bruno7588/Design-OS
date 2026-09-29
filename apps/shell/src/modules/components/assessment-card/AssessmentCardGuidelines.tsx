import { Box } from '@mui/material'
import { AssessmentCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { SAMPLE } from './AssessmentCardMatrix'

const Row = ({ children, width = 640 }: { children: React.ReactNode; width?: number }) => <Box sx={{ width, maxWidth: '100%' }}>{children}</Box>

// Content from playground/docs/design-system/cards.md and the Figma Card/Assessments set.
const g: Guidelines = {
  overview: 'An assessment card shows a quiz or assessment: its illustration, title and type, and whether the learner has done it.',
  whenToUse: ['In lists of assessments in the learner web app, the mobile app and Admin.'],
  whenNotToUse: ['For a quiz attached to a lesson. The Lesson card carries its Take Quiz button.', 'For lessons and courses. Use their cards.'],
  anatomy: {
    example: <Row><AssessmentCard {...SAMPLE} device="web" completed /></Row>,
    parts: [
      { name: 'Illustration', description: 'The assessment type’s artwork: 80px (web app), 48 (Admin), 56 (mobile, its own drawing).' },
      { name: 'Title', description: 'Bold 16/1.5 on one line (Bold 14, wrapping, on mobile), Text-primary.' },
      { name: 'Type', description: 'The assessment type alone, Regular 14 (12 on mobile), Text-secondary. A Success tick follows it when completed.' },
      { name: 'Review', description: 'Outlined, Medium on the web app, Small on mobile, when completed.' },
      { name: 'Card', description: 'Cards-background, radius 12, Shadow S in light mode.' },
    ],
  },
  variants: [
    { name: 'Admin', description: 'Adds the edit button and an Assessment badge.', example: <Row><AssessmentCard {...SAMPLE} device="admin" onEdit={() => undefined} /></Row> },
    { name: 'Mobile', description: 'Completed stacks Review under the type. No hover.', example: <Row width={344}><AssessmentCard {...SAMPLE} device="mobile" type="lesson-quiz" completed /></Row> },
  ],
  states: [
    { name: 'Hover', description: 'Cards-background-hover (web app and Admin). The title keeps its colour.' },
    { name: 'Completed', description: 'A Success tick after the type and a Review button.' },
    { name: 'Disabled', description: 'The illustration goes grey, text is Text-disabled and a Bold lock sits on the right (24px web, 20 mobile).' },
  ],
  dos: [
    {
      do: { example: <Row><AssessmentCard {...SAMPLE} device="web" typeLabel="Multiple choice" /></Row>, text: 'Name the type alone: "Multiple choice".' },
      dont: { example: <Row><AssessmentCard {...SAMPLE} device="web" typeLabel="Assessment · Multiple choice" /></Row>, text: 'Prefix it with "Assessment"; the card already says what it is.' },
    },
  ],
  content: ['Titles in sentence case.', 'Button labels in Title Case: "Review".'],
  accessibility: [
    'The card is an article; the title is its heading and its button.',
    'Review and Edit are separate buttons; Edit is named "Edit" plus the title.',
    'The illustration is decorative (empty alt); the type line says what it shows.',
  ],
  figma: [
    { label: 'Card/Assessments, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12104-3647' },
    { label: 'Card/Assessments, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=10242-2782' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function AssessmentCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
