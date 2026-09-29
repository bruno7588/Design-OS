import { lessonCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { LessonCardMatrix } from './LessonCardMatrix'

// Figma = Card/Lessons (dark 5144:14181, light 11916:9353), checked 2026-09-29.
const compare: Compare = {
  page: lessonCardFigma.page,
  set: lessonCardFigma.set,
  frames: { light: '/figma/lesson-card-light.png', dark: '/figma/lesson-card-dark.png' },
  live: (mode) => <LessonCardMatrix mode={mode} />,
  differences: [
    { property: 'Grid tile', figma: '170 × 230; image fills, info padding 16, gap 12; title Bold 14 over 3 lines (63px), instructor Regular 12/1.2', reference: 'Same', status: 'Matches' },
    { property: 'Duration badge', figma: '6px from the corner, padding 4/6, radius 4, Neutral-900 at 50% (bound 2026-09-29), Neutral-0 Regular 10', reference: 'Same (Neutral-300 text when disabled)', status: 'Matches' },
    { property: 'Progress', figma: 'The Progress bar set: 2px on the grid and mobile, 96 × 4 in web rows; Success-500 when completed', reference: 'The 5Mins Progress bar at those heights', status: 'Matches', note: 'Web rows hover the empty track to Border-elevated, as Figma does.' },
    { property: 'Web app row', figma: 'Padding 16 (24 on the right with a button or lock), gap 16; thumb 80; title Bold 16 over 2 lines; meta and bar 24 apart', reference: 'Same', status: 'Matches' },
    { property: 'Admin row', figma: 'Padding 12, gap 12, thumb 48; one-line title; Informative Badge "Lesson"; 74px tall', reference: 'Same, 73px (what the contents add up to, like the Assessment row)', status: 'Matches' },
    { property: 'Mobile card', figma: 'Radius 12 (was 8), padding 12, gap 12, thumb 56 radius 4; progress along the bottom; Hover added 2026-09-29 (title Text-button-hover)', reference: 'Same', status: 'Matches' },
    { property: 'Title on hover', figma: 'Text-button-hover in list rows (web app and Admin), not on the grid', reference: 'Same', status: 'Matches', note: 'The Assessment card keeps Text-primary on hover.' },
    { property: 'Media Tag in Admin and mobile', figma: 'Resized instances: 20px, padding 2, a 16 icon (Admin); 22px, padding 4, a 14 icon (mobile)', reference: 'Same sizes (the Tag resized in the card)', status: 'Matches', note: 'Admin’s corner is 5.7 in Figma (a scaled 8); code keeps the Tag’s 8.' },
    { property: 'Quiz naming', figma: 'Web: Completed + Quiz=n/a shows a disabled Retake Quiz. Mobile: Quiz=Completed shows no button; Completed + Quiz=n/a shows the disabled one', reference: 'quiz "passed" shows the disabled Retake Quiz; no quiz, no button', status: 'Design to update', note: 'The two devices label the same states differently.' },
    { property: 'Quiz button', figma: 'Buttons Small: Warning-outlined with danger (Take Quiz), Outlined (Retake Quiz)', reference: 'The 5Mins Button, same configurations', status: 'Matches' },
    { property: 'Disabled', figma: 'Image in Luminosity, Text-disabled, Bold lock (24 web, 20 mobile); no progress on mobile', reference: 'Greyscale image, same text and lock', status: 'Matches' },
    { property: 'Shadow', figma: 'Shadow S in the light set, none in dark', reference: 'Same', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'LessonCard', status: 'Code to update', note: 'The prototype has LessonGridCard and mobile/LessonCard; the web and Admin rows are page-local.' },
  ],
  engineering: {
    mui: 'Box (article) + Tag + Badge + Button + LinearProgress',
    usage: `<LessonCard device="web" title={l.title} meta="Lesson · Ana Costa · 4min" image={l.thumb} progress={37} onClick={open} />`,
    props: [
      { figma: 'View', code: 'view: grid | list' },
      { figma: 'Device', code: 'device: web | admin | mobile' },
      { figma: 'Completed / Disabled', code: 'completed / disabled' },
      { figma: 'Quiz', code: 'quiz: pending | passed' },
    ],
    theme: ['No theme override: styled from the tokens. CardBase holds the shared surface and title.'],
    files: ['packages/components/src/Card/LessonCard.tsx', 'packages/components/src/Card/CardBase.tsx'],
  },
}

export function LessonCardCompare() {
  return <CompareTemplate c={compare} />
}
