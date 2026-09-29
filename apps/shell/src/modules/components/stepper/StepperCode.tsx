import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Stepper/Stepper.tsx?raw'
import overridesSource from '@design-os/components/src/Stepper/stepper.overrides.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { Stepper } from '@design-os/components'

<Stepper aria-label="Course setup" steps={['Warm-up', 'Lessons', 'Assessments', 'Certification']} activeStep={step} />

// Plain MUI renders the same look
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

<Stepper activeStep={2}>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>`

export function StepperCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 Stepper with the 5Mins theme: the frame, the tick-circle icons and the lines are theme
        overrides, so plain MUI Stepper looks the same. The wrapper adds an ordered list, aria-current on the step in progress,
        and each step’s state for screen readers. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="Stepper.tsx" caption="packages/components/src/Stepper" code={source} />
      <CodeBlock title="stepper.overrides.tsx" caption="Theme overrides for MUI Stepper, Step, StepLabel and StepConnector" code={overridesSource} />
    </Stack>
  )
}
