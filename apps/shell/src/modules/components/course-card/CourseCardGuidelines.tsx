import { CourseCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { COURSE } from './CourseCardMatrix'

// Content from playground/docs/design-system/cards.md and the Figma Card/Courses set.
const g: Guidelines = {
  overview: 'A course card shows a course or playlist, a group of lessons, with how far the learner has got.',
  whenToUse: ['In course grids and carousels in the learner web app and the mobile app.'],
  whenNotToUse: ['For a single lesson. Use the Lesson card.', 'For a category of courses. Use the Category card.'],
  anatomy: {
    example: <CourseCard {...COURSE} isNew dueDate="Due on Aug 20" />,
    parts: [
      { name: 'Image', description: '300 × 140 (272 × 120 on mobile), top corners 12.' },
      { name: 'Progress', description: 'The Progress bar, 2px along the bottom of the image, in Selected (gold).' },
      { name: 'New', description: 'Danger-400 pill, Medium 12, top left.' },
      { name: 'Due date', description: 'The Warning Badge on Cards-background, top right.' },
      { name: 'Title', description: 'Bold 16/1.5 over up to three lines (Bold 14 on mobile).' },
      { name: 'Meta', description: 'play-circle and clock, 16px (14 on mobile): "17 lessons", "20 min", Regular 14 (12) in Text-secondary.' },
    ],
  },
  variants: [{ name: 'Mobile', description: '272 wide for carousels; body padding 16, gap 12.', example: <CourseCard {...COURSE} device="mobile" dueDate="Due on Aug 20" /> }],
  states: [{ name: 'Hover', description: 'Cards-background-hover, and the picture zooms 1.12× (300ms). No zoom with reduced motion.' }],
  dos: [
    {
      do: { example: <CourseCard {...COURSE} dueDate="Due on Aug 20" />, text: 'Show a due date only for courses with a deadline.' },
      dont: { example: <CourseCard {...COURSE} isNew dueDate="Due on Aug 20" title="Onboarding" />, text: 'Mark everything New; it stops meaning anything.' },
    },
  ],
  content: ['Titles in sentence case.', 'Due date: "Due on Aug 20".', 'Meta: "17 lessons", "20 min".'],
  accessibility: ['The card is an article; the title is its heading and its button.', 'The progress bar is named "Progress".', 'Badges are text, so screen readers read them.'],
  figma: [
    { label: 'Card/Courses, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11916-10292' },
    { label: 'Card/Courses, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5132-5756' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function CourseCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
