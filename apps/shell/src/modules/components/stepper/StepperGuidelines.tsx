import { Box } from '@mui/material'
import { Stepper } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Example = ({ steps = ['Warm-up', 'Lessons', 'Assessments', 'Certification'], active = 2 }: { steps?: string[]; active?: number }) => (
  <Box sx={{ width: 560, maxWidth: '100%' }}>
    <Stepper steps={steps} activeStep={active} />
  </Box>
)

// Content from the Figma Stepper page and the 5mins-copy-review skill (no prototype spec).
const g: Guidelines = {
  overview: 'A stepper shows where people are in a task with a few steps in order, such as setting up a course.',
  whenToUse: ['For a task split into 3 to 5 steps people go through in order.', 'When knowing what comes next helps people finish.'],
  whenNotToUse: [
    'For 2 steps, or more than 6. Use a heading with "Step 2 of 2", or split the task.',
    'For navigation between sections people visit in any order. Use tabs.',
    'For learning progress. Use a progress bar.',
  ],
  anatomy: {
    example: <Example />,
    parts: [
      { name: 'Frame', description: 'A 1px Border outline, radius 12, padding 16px by 20px.' },
      { name: 'Step', description: 'A 20px tick-circle 4px before a Regular 14px label.' },
      { name: 'Line', description: 'A thin Text-tertiary line filling the space between steps, 12px from each. Solid before a completed step, dotted otherwise.' },
    ],
  },
  variants: [
    { name: 'In progress', description: 'Steps before the current one are completed; the ones after it are not started.', example: <Example /> },
    { name: 'All completed', description: 'After the last step.', example: <Example active={4} /> },
  ],
  states: [
    { name: 'Completed', description: 'Bold tick-circle in Success-500, label in Text-secondary.' },
    { name: 'In progress', description: 'Linear tick-circle and label in Text-secondary.' },
    { name: 'Not started', description: 'Linear tick-circle and label in Text-disabled (Figma State=Disabled).' },
  ],
  dos: [
    {
      do: { example: <Example />, text: 'Name steps with a noun or two: "Lessons", "Assessments".' },
      dont: { example: <Example steps={['Add your warm-up content', 'Create lessons', 'Set up assessments']} active={1} />, text: 'Write sentences in the labels.' },
    },
  ],
  content: ['Labels: one or two words, sentence case, no numbers.', 'Keep the same steps in the same order every time.'],
  accessibility: [
    'The steps are an ordered list; the current one has aria-current="step".',
    'Each step says its state to screen readers ("completed", "in progress", "not started"), since the ticks are only drawn.',
    'Name the stepper with aria-label, such as "Course setup".',
    'Completed and in-progress steps differ by icon shape (Bold and Linear), not only colour.',
  ],
  figma: [
    { label: 'Stepper, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11249-244' },
    { label: 'Stepper, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=8108-5464' },
  ],
  spec: 'Figma Library, Stepper page (no prototype spec)',
}

export function StepperGuidelines() {
  return <GuidelinesTemplate g={g} />
}
