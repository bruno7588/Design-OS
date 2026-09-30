import { quizOptionsFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { QuizOptionsMatrix } from './QuizOptionsMatrix'

// Figma = Quiz/Options (dark 5504:24966, light 12112:10047), checked 2026-09-30.
const compare: Compare = {
  page: quizOptionsFigma.page,
  set: quizOptionsFigma.set,
  frames: { light: '/figma/quiz-options-light.png', dark: '/figma/quiz-options-dark.png' },
  live: (mode) => <QuizOptionsMatrix mode={mode} />,
  differences: [
    { property: 'Row', figma: 'Cards-background, radius 12, padding 12, gap 8; 3px inner shadow at the bottom (Cards-background-hover)', reference: 'Same', status: 'Matches' },
    { property: 'Selected', figma: 'Secondary-500, Secondary-600 edge, SemiBold Neutral-800, radio in Neutral-800', reference: 'Same', status: 'Matches' },
    { property: 'Right / wrong (picked)', figma: 'Success-500 + Success-600 edge, tick; Danger-500 + Button-danger-hover edge, cross; SemiBold light text', reference: 'Same', status: 'Matches' },
    { property: 'Right / wrong (not picked)', figma: 'Cards-background, tick or cross in Text-primary; Enabled and Hover variants', reference: 'Same, with hover', status: 'Matches' },
    { property: 'Disabled', figma: 'Text-disabled; the radio-button set, Disabled=true (swapped in 2026-09-30 for an older glyph)', reference: 'The 5Mins radio, disabled', status: 'Matches' },
    { property: 'Explanation', figma: 'Title Bold 16 (Success-500 / Text-error) with an emoji (24 desktop, 20 mobile); text Regular 14 Text-secondary; gap 12 (8 on mobile)', reference: 'Same', status: 'Matches' },
    { property: 'Device', figma: 'Mobile 343 and Desktop 900 variants', reference: 'One row; the text wraps', status: 'Matches' },
  ],
  engineering: {
    mui: 'Radio in a radiogroup',
    usage: `<QuizOptions label={q} options={opts} value={v} onChange={setV} answer={a} revealed={checked} />`,
    props: [
      { figma: 'Selected', code: 'value' },
      { figma: 'Validation, State=Read only', code: 'answer + revealed' },
      { figma: 'Disabled', code: 'disabled' },
      { figma: 'Explanation=true', code: '<QuizExplanation result>' },
    ],
    theme: ['No theme override: styled from the tokens; the radio is the themed MUI Radio at 20px.'],
    files: ['packages/components/src/Gamification/QuizOptions.tsx', 'packages/components/src/Gamification/art/emoji-*.svg'],
  },
}

export function QuizOptionsCompare() {
  return <CompareTemplate c={compare} />
}
