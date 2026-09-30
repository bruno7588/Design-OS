import { Box } from '@mui/material'
import { QuizExplanation, QuizOptions } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { EXPLANATION, TEXT } from './QuizOptionsMatrix'

const W = ({ children }: { children: React.ReactNode }) => <Box sx={{ width: 560, maxWidth: '100%' }}>{children}</Box>
const opts = [{ value: 'a', label: TEXT }, { value: 'b', label: 'User feedback drives every design change.' }]

// Content from the Figma Quiz/Options set (not documented in the prototype).
const g: Guidelines = {
  overview: 'Quiz options are the answers to a quiz question. The learner picks one, then sees which was right.',
  whenToUse: ['For single-answer questions in lesson quizzes and assessments.'],
  whenNotToUse: ['For settings or forms. Use the Radio button.', 'For several answers at once. Use checkboxes.'],
  anatomy: {
    example: <W><QuizOptions label="Question" options={opts} value="a" /></W>,
    parts: [
      { name: 'Row', description: 'Cards-background, radius 12, padding 12, with a 3px Cards-background-hover edge along the bottom.' },
      { name: 'Radio', description: 'The 5Mins radio at 20px, 8px from the text.' },
      { name: 'Text', description: 'Regular 14/1.5 in Text-primary; it wraps on narrow screens.' },
      { name: 'Selected', description: 'Secondary-500 with a Secondary-600 edge; SemiBold Neutral-800 text.' },
    ],
  },
  variants: [
    { name: 'Right answer', description: 'Your pick turns Success-500 with a tick; the right answer you didn’t pick shows a tick.', example: <W><QuizOptions label="Q" options={opts} value="a" answer="a" revealed /></W> },
    { name: 'Wrong answer', description: 'Your pick turns Danger-500 with a cross; the right answer shows a tick.', example: <W><QuizOptions label="Q" options={opts} value="b" answer="a" revealed /></W> },
    { name: 'Explanation', description: '"Well done!" or "Not quite!" (Bold 16, Success-500 or Text-error, with an emoji) and the reason in Text-secondary.', example: <W><QuizExplanation result="correct">{EXPLANATION}</QuizExplanation></W> },
  ],
  states: [
    { name: 'Hover', description: 'Cards-background-hover with an Input-background edge, while answering.' },
    { name: 'Disabled', description: 'Text-disabled, no hover.' },
  ],
  dos: [
    {
      do: { example: <W><QuizOptions label="Q" options={opts} value="b" answer="a" revealed /></W>, text: 'Show the right answer as well as the learner’s.' },
      dont: { example: <W><QuizOptions label="Q" options={opts} value="b" /></W>, text: 'Leave them guessing after they check.' },
    },
  ],
  content: ['Answers in sentence case, with no full stop unless they’re sentences.', 'Explanation titles: "Well done!", "Not quite!".'],
  accessibility: [
    'A radio group named by the question; arrow keys move between answers.',
    'Once revealed, each row says whether it was your answer and whether it was right (hidden text for screen readers).',
    'The explanation is announced as a status.',
  ],
  figma: [
    { label: 'Quiz/Options, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12112-10047' },
    { label: 'Quiz/Options, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5504-24966' },
  ],
  spec: 'playground/docs/design-system/gamification.md',
}

export function QuizOptionsGuidelines() {
  return <GuidelinesTemplate g={g} />
}
