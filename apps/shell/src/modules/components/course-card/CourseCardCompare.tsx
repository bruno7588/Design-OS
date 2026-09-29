import { courseCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CourseCardMatrix } from './CourseCardMatrix'

// Figma = Card/Courses (dark 5132:5756, light 11916:10292), checked 2026-09-29.
const compare: Compare = {
  page: courseCardFigma.page,
  set: courseCardFigma.set,
  frames: { light: '/figma/course-card-light.png', dark: '/figma/course-card-dark.png' },
  live: (mode) => <CourseCardMatrix mode={mode} />,
  differences: [
    { property: 'Desktop', figma: '300 × 297; image 140; body padding 24, gap 16; title Bold 16 over 3 lines (72px)', reference: 'Same', status: 'Matches' },
    { property: 'Mobile', figma: '272 × 248; image 120; body padding 16, gap 12; title Bold 14 (63px); meta Regular 12/1.2, 14px icons', reference: 'Same', status: 'Matches' },
    { property: 'Progress', figma: 'Progress bar, 2px, Selected fill', reference: 'Same', status: 'Matches' },
    { property: 'Due date', figma: 'Badge Type=Warning on Cards-background; Medium 14/1.2 (Regular 12 on mobile)', reference: 'The 5Mins Badge, same overrides', status: 'Matches' },
    { property: 'New', figma: 'A plain frame: raw #E95C7B fill, #FFFFFF text, padding 4/8, radius 20, Medium 12/1.5', reference: 'Danger-400 and Neutral-25, same size', status: 'Design to update', note: 'Bind to Danger-400 and Neutral-25, or use the Badge (New) as the Category card does.' },
    { property: 'Hover', figma: 'Cards-background-hover; the picture grows to 336 × 157 (1.12×)', reference: 'Same, animated 300ms, off with reduced motion', status: 'Matches' },
    { property: 'State names', figma: 'Enabled in the dark set, Default in the light set', reference: '–', status: 'Design to update', note: 'Pick one name.' },
    { property: 'Shadow', figma: 'Shadow S in the light set', reference: 'Same', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'CourseCard', status: 'Code to update', note: 'The prototype has WorkspaceCourseCard and mobile/CourseCard.' },
  ],
  engineering: {
    mui: 'Box (article) + Badge + LinearProgress',
    usage: `<CourseCard title={c.title} image={c.cover} lessons="17 lessons" duration="20 min" progress={37} isNew dueDate="Due on Aug 20" onClick={open} />`,
    props: [
      { figma: 'Device', code: 'device: desktop | mobile' },
      { figma: 'New', code: 'isNew' },
      { figma: 'Due date', code: 'dueDate (the label)' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/CourseCard.tsx'],
  },
}

export function CourseCardCompare() {
  return <CompareTemplate c={compare} />
}
