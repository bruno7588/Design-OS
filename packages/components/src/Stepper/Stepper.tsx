import { forwardRef } from 'react'
import Box from '@mui/material/Box'
import MuiStepper, { type StepperProps as MuiStepperProps } from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

// 5Mins Stepper (Figma stepper, Step/Instances and Step/line). The look is in the theme
// (stepper.overrides.tsx), so plain MUI Stepper renders the same. The wrapper adds what
// MUI leaves out: the steps are an ordered list, the current one is aria-current="step",
// and each says its state to screen readers, since the ticks are only drawn.

export interface StepperProps extends Omit<MuiStepperProps, 'children' | 'orientation' | 'alternativeLabel'> {
  steps: string[]
  /** The step in progress, from 0. Steps before it are completed. */
  activeStep: number
}

const hidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper({ steps, activeStep, ...props }, ref) {
  return (
    <MuiStepper ref={ref} component="ol" activeStep={activeStep} {...props}>
      {steps.map((label, i) => (
        <Step key={label} component="li" aria-current={i === activeStep ? 'step' : undefined}>
          <StepLabel>
            {label}
            <Box component="span" sx={hidden}>
              {i < activeStep ? ', completed' : i === activeStep ? ', in progress' : ', not started'}
            </Box>
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  )
})
