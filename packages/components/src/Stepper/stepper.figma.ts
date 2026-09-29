import type { FigmaMapping } from '../figma'

export const stepperFigma: FigmaMapping = {
  component: 'Stepper',
  mui: 'Stepper',
  page: 'Stepper',
  set: 'stepper',
  // The light version is an instance on a board set to the Light modes.
  nodes: { light: '11249:244', dark: '8108:5464' },
  variants: {},
}

export const stepFigma: FigmaMapping = {
  component: 'Stepper',
  mui: 'Step + StepLabel',
  page: 'Stepper',
  set: 'Step/Instances',
  nodes: { light: '11249:219', dark: '8108:5472' },
  variants: { State: ['Disabled', 'In progress', 'Completed'] },
}

export const stepLineFigma: FigmaMapping = {
  component: 'Stepper',
  mui: 'StepConnector',
  page: 'Stepper',
  set: 'Step/line',
  nodes: { light: '11248:125', dark: '8108:5482' },
  variants: { State: ['Complete', 'Incomplete'] },
}
