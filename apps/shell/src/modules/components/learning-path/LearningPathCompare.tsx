import { learningPathFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { LearningPathMatrix } from './LearningPathMatrix'

// Figma = Learning path (dark 5514:8463, light 11984:7015), checked 2026-09-30.
const compare: Compare = {
  page: learningPathFigma.page,
  set: learningPathFigma.set,
  frames: { light: '/figma/learning-path-light.png', dark: '/figma/learning-path-dark.png' },
  live: (mode) => <LearningPathMatrix mode={mode} />,
  differences: [
    { property: 'Level s layout', figma: 'Padding 16, gap 16, radius 12; shield 56, Info 8 from it: headline (gap 4), topics, progress, 12 apart', reference: 'Same', status: 'Matches' },
    { property: 'Level l layout', figma: 'Padding 24, gap 16, radius 12 (SM; 16 until 2026-09-30); shield 72; header, topics (wrap, 12 apart) and progress 24 apart', reference: 'Same', status: 'Matches' },
    { property: 'Topic pills', figma: '1px Border, radius 8, padding 8/12 and Regular 12/1.2 (l: 8/16, Regular 14/1.5), Text-tertiary', reference: 'Same', status: 'Matches' },
    { property: 'Inner edge', figma: '-4, -4 inner shadow in raw #00CEE6 (in progress) and #18A957 (completed)', reference: 'Primary-500 and Success-500 (the same values)', status: 'Design to update', note: 'Bind the two shadows to the variables.' },
    { property: 'Shadow S', figma: 'No drop shadow in light', reference: 'Shadow S in light, as every card', status: 'Design to update', note: 'Bruno confirmed Shadow S stays (2026-09-30). Add it in Figma.' },
    { property: 'Buttons', figma: 'An older Medium: 45px on s, 37px on l', reference: 'The current Medium (41px)', status: 'Design to update' },
    { property: 'Button copy', figma: '“Keep learning” on l', reference: '“Keep Learning” (Title Case, as s)', status: 'Design to update' },
    { property: 'md height', figma: 'A fixed 122px, the body centred', reference: 'Hugs: 88px', status: 'Design to update', note: 'Set it to hug.' },
    { property: 'Certificate disabled s', figma: 'Padding 12, gap 8, radius 8', reference: 'Padding 16, radius 12, as the other s cards', status: 'Design to update' },
    { property: 'Pending note', figma: '“Certificate Pending”', reference: '“Certificate pending” (sentence case)', status: 'Design to update' },
    { property: 'Chevron', figma: 'A 32px chevron, no interaction drawn', reference: 'A button that shows or hides the other topics, with aria-expanded', status: 'Matches' },
    { property: 'Completed tick', figma: 'Two tick-circle icons stacked in the title row', reference: 'One', status: 'Design to update', note: 'Remove the hidden copy.' },
  ],
  engineering: {
    mui: 'Box (CardRoot), Button, LinearProgress (ProgressBar), IconButton',
    usage: `<LearningPathCard state="in-progress" level={5} title="Master" topics={topics} progress={{ value: 80, total: 120 }} actionLabel="Keep Learning" onAction={open} />`,
    props: [
      { figma: 'Type', code: 'type' },
      { figma: 'State', code: 'state' },
      { figma: 'Size', code: 'size' },
      { figma: 'Expanded', code: 'expanded / defaultExpanded' },
      { figma: 'Modules', code: 'topics' },
    ],
    theme: ['No theme override. Uses CardRoot, Button, ProgressBar and LevelIllustration.'],
    files: ['packages/components/src/Gamification/LearningPathCard.tsx', 'packages/components/src/Gamification/LevelIllustration.tsx'],
  },
}

export function LearningPathCompare() {
  return <CompareTemplate c={compare} />
}
