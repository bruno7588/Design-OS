import { useState } from 'react'
import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { Button, QuizExplanation, QuizOptions, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { EXPLANATION, QuizOptionsMatrix } from './QuizOptionsMatrix'

const QUESTION = 'How often is user feedback the main driver of design changes?'
const OPTIONS = [
  { value: 'always', label: 'Always: every change starts with user feedback.' },
  { value: 'sometimes', label: "They are occasionally considered but aren't the main drivers of design changes." },
  { value: 'never', label: 'Never: design follows the roadmap only.' },
]

export function QuizOptionsPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const answer = 'sometimes'
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 600, maxWidth: '100%', gap: 4 }} data-testid="quiz-options-preview">
          <Typography variant="h5" id="quiz-q">
            {QUESTION}
          </Typography>
          <QuizOptions label={QUESTION} options={OPTIONS} value={value} onChange={setValue} answer={answer} revealed={revealed} disabled={disabled} />
          {revealed && value && <QuizExplanation result={value === answer ? 'correct' : 'incorrect'}>{EXPLANATION}</QuizExplanation>}
          <Box>
            {revealed ? (
              <Button variant="outlined" onClick={() => { setRevealed(false); setValue(null) }}>
                Try Again
              </Button>
            ) : (
              <Button disabled={!value || disabled} onClick={() => setRevealed(true)}>
                Check Answer
              </Button>
            )}
          </Box>
        </Stack>
      }
      controls={<FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />}
      hint="Pick an answer and check it: the rows show what was right."
      matrix={<QuizOptionsMatrix mode={mode} />}
    />
  )
}
