import { useState } from 'react'
import { Stack } from '@mui/material'
import { Button, Stepper, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { STEPS, StepperMatrix } from './StepperMatrix'

export function StepperPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [active, setActive] = useState(2)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 820, maxWidth: '100%', gap: 6 }} data-testid="stepper-preview">
          <Stepper steps={STEPS} activeStep={active} aria-label="Course setup" />
          <Stack direction="row" sx={{ gap: 3, justifyContent: 'flex-end' }}>
            <Button variant="outlined2" disabled={active === 0} onClick={() => setActive((a) => a - 1)}>
              Back
            </Button>
            <Button disabled={active === STEPS.length} onClick={() => setActive((a) => a + 1)}>
              {active >= STEPS.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Stack>
        </Stack>
      }
      controls={null}
      hint="Next and Back move through the steps. Completed steps get the green tick; the lines before them turn solid."
      matrix={<StepperMatrix mode={mode} />}
    />
  )
}
