import { stepperFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { StepperMatrix } from './StepperMatrix'

// Figma = stepper (dark 8108:5464, light instance 11249:244), Step/Instances (8108:5472, 11249:219)
// and Step/line (8108:5482, 11248:125), checked 2026-09-29.
const compare: Compare = {
  page: stepperFigma.page,
  set: 'stepper, Step/Instances, Step/line',
  frames: { light: '/figma/stepper-light.png', dark: '/figma/stepper-dark.png' },
  live: (mode) => <StepperMatrix mode={mode} />,
  differences: [
    { property: 'Frame', figma: '900 × 53: 1px Border, radius 12, padding 16/20', reference: 'Same; fills its container', status: 'Matches' },
    { property: 'Step', figma: '20px tick-circle, 4px gap, Regular 14 label', reference: 'Same', status: 'Matches' },
    { property: 'Completed', figma: 'Bold tick-circle, Success-500; label Text-secondary', reference: 'Same', status: 'Matches' },
    { property: 'In progress', figma: 'Linear tick-circle and label, Text-secondary', reference: 'Same', status: 'Matches' },
    { property: 'Disabled', figma: 'Linear tick-circle and label, Text-disabled', reference: 'Same, for steps not started yet', status: 'Matches' },
    { property: 'Line', figma: '0.5px Text-tertiary, padding 10/12, fills the space; Incomplete dashed 2, 4', reference: 'Same', status: 'Matches' },
    { property: 'Current step', figma: 'Looks like a completed step without the fill', reference: 'Same', status: 'Design to update', note: 'Nothing marks the step people are on, apart from the Linear icon. Consider a Medium label or Text-primary.' },
    { property: 'Light version', figma: 'An instance on a board named "Dark mode", set to the Light modes', reference: '–', status: 'Design to update', note: 'Rename the board.' },
    { property: 'Built component', figma: '–', reference: 'Stepper', status: 'Code to update', note: 'The prototype has no stepper component or spec.' },
  ],
  engineering: {
    mui: 'Stepper, Step, StepLabel, StepConnector',
    usage: `<Stepper activeStep={2}>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>`,
    props: [
      { figma: 'Step State=Completed', code: 'a step before activeStep' },
      { figma: 'Step State=In progress', code: 'the step at activeStep' },
      { figma: 'Step State=Disabled', code: 'a step after activeStep' },
      { figma: 'Step/line State=Complete / Incomplete', code: 'the connector before a completed step / any other' },
    ],
    theme: [
      'MuiStepper horizontal: the Figma frame (Border, radius 12, padding 16/20).',
      'MuiStepLabel: StepIconComponent is the tick-circle (Bold when completed); icon and label colours per state; 4px gap.',
      'MuiStepConnector: 12px margins; a 0.5px Text-tertiary line, dotted with a repeating gradient, solid when completed.',
    ],
    files: [
      'packages/components/src/Stepper/stepper.overrides.tsx (theme overrides)',
      'packages/components/src/Stepper/Stepper.tsx (list semantics and state text)',
      'packages/components/src/Stepper/stepper.figma.ts (Figma mappings)',
    ],
  },
}

export function StepperCompare() {
  return <CompareTemplate c={compare} />
}
