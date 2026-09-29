import { Box } from '@mui/material'
import { LessonCard, type LessonCardProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { GRID, LIST } from './LessonCardMatrix'

const Row = ({ children, width = 640 }: { children: React.ReactNode; width?: number }) => <Box sx={{ width, maxWidth: '100%' }}>{children}</Box>
const list = (p: Partial<LessonCardProps>) => <LessonCard {...({ ...LIST, ...p } as LessonCardProps)} />

// Content from playground/docs/design-system/cards.md and the Figma Card/Lessons set.
const g: Guidelines = {
  overview: 'A lesson card shows one video micro-lesson: its thumbnail, title, who teaches it and how far the learner has got.',
  whenToUse: ['In lesson lists and library grids, in the learner web app, the mobile app and Admin.'],
  whenNotToUse: ['For quizzes and assessments. Use the Assessment card.', 'For courses (a group of lessons). Use the Course card.'],
  anatomy: {
    example: <Row>{list({ device: 'web', progress: 37 })}</Row>,
    parts: [
      { name: 'Thumbnail', description: '80px (web app), 48 (Admin), 56 (mobile), radius 8 (4 on mobile). The media Tag sits in the top-left corner.' },
      { name: 'Title', description: 'Bold 16/1.5 in Text-primary, up to two lines (one in Admin, Bold 14 on mobile and in the grid).' },
      { name: 'Meta', description: '"Lesson · Instructor name · 4min", Regular 14 (12 on mobile) in Text-secondary.' },
      { name: 'Progress', description: 'The Progress bar: 96 × 4 in web rows, 2px along the bottom of the grid thumbnail and the mobile card. Success-500 when completed.' },
      { name: 'Quiz button', description: 'Small: Take Quiz (Warning outlined, danger icon) or Retake Quiz (Outlined).' },
      { name: 'Card', description: 'Cards-background, radius 12 (8 on mobile), Shadow S in light mode.' },
    ],
  },
  variants: [
    { name: 'Grid', description: '170 × 230, for library browse. The duration badge sits top right.', example: <LessonCard {...(GRID as LessonCardProps)} /> },
    { name: 'Admin', description: 'A compact row with a Lesson badge, for management lists.', example: <Row>{list({ device: 'admin' })}</Row> },
    { name: 'Mobile', description: 'For the learner app. No hover state.', example: <Row width={343}>{list({ device: 'mobile' })}</Row> },
  ],
  states: [
    { name: 'Hover', description: 'Cards-background-hover. In list rows the title turns Text-button-hover.' },
    { name: 'Completed', description: 'A full Success bar (grid, mobile) or a Success tick (web app).' },
    { name: 'Quiz pending', description: 'Take Quiz; once the lesson is completed, Retake Quiz.' },
    { name: 'Quiz passed', description: 'Retake Quiz, disabled.' },
    { name: 'Disabled', description: 'The thumbnail goes grey, text is Text-disabled and a Bold lock sits on the right. The card keeps its hover.' },
  ],
  dos: [
    {
      do: { example: <Row>{list({ device: 'web', progress: 37 })}</Row>, text: 'Keep the meta line to type, instructor and length.' },
      dont: { example: <Row>{list({ device: 'web', progress: 37, meta: 'Lesson · Ana Costa · 4min · Leadership · Added 3 days ago · 1,203 views' })}</Row>, text: 'Pack the meta line; it’s cut at one line.' },
    },
  ],
  content: ['Titles in sentence case.', 'Meta: "Lesson · Instructor name · 4min", with middle dots.', 'Button labels in Title Case: "Take Quiz", "Retake Quiz".'],
  accessibility: [
    'The card is an article; the title is its heading and its button, so the whole card opens the lesson.',
    'The quiz button is a separate button, never inside the title button.',
    'The media Tag is named ("Video"); the lock and tick are named "Locked" and "Completed".',
    'The keyboard focus ring goes round the whole card.',
  ],
  figma: [
    { label: 'Card/Lessons, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11916-9353' },
    { label: 'Card/Lessons, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5144-14181' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function LessonCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
