import { useState } from 'react'
import { FormControlLabel, FormLabel, RadioGroup, Stack, Switch } from '@mui/material'
import { InputRadio, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { InputRadioMatrix } from './InputRadioMatrix'

// A quiz question: each answer is an option people type, and the radio marks the correct one.
export function InputRadioPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [answers, setAnswers] = useState(['Paris', 'Lyon', ''])
  const [correct, setCorrect] = useState('0')
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 400, maxWidth: '100%', gap: 2 }} data-testid="input-radio-preview">
          <FormLabel id="answers-label" component="div">
            Answers
          </FormLabel>
          <RadioGroup aria-labelledby="answers-label" name="correct-answer" value={correct} onChange={(e) => setCorrect(e.target.value)} sx={{ gap: 3 }}>
            {answers.map((a, i) => (
              <InputRadio
                key={i}
                radioValue={String(i)}
                radioLabel={`Answer ${i + 1} is correct`}
                inputProps={{ 'aria-label': `Answer ${i + 1}` }}
                placeholder="Add an answer"
                value={a}
                onChange={(e) => setAnswers((all) => all.map((x, j) => (j === i ? e.target.value : x)))}
                validation={checked && String(i) === correct ? 'success' : 'none'}
                disabled={disabled}
                fullWidth
              />
            ))}
          </RadioGroup>
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Show success" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Type an answer, then pick the correct one with its radio. Tab moves between the radio group and each field."
      matrix={<InputRadioMatrix mode={mode} />}
    />
  )
}
