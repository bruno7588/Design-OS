import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Slider, Switch, TextField, Typography } from '@mui/material'
import { LessonCard, type LessonCardProps, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { GRID, LessonCardMatrix, LIST } from './LessonCardMatrix'

type Kind = 'grid' | 'web' | 'admin' | 'mobile'

export function LessonCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [kind, setKind] = useState<Kind>('web')
  const [progress, setProgress] = useState(37)
  const [completed, setCompleted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [quiz, setQuiz] = useState<'none' | 'pending' | 'passed'>('none')
  const [last, setLast] = useState('')

  const props: LessonCardProps = {
    ...((kind === 'grid' ? GRID : { ...LIST, device: kind }) as LessonCardProps),
    progress,
    completed,
    disabled,
    quiz: quiz === 'none' ? undefined : quiz,
    onClick: () => setLast('Opened the lesson'),
    onQuiz: () => setLast('Clicked the quiz button'),
  }

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: kind === 'grid' ? 170 : kind === 'mobile' ? 343 : 900, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="lesson-card-preview">
          <LessonCard {...props} />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the card or its button.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="View" value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
            <MenuItem value="grid">Grid</MenuItem>
            <MenuItem value="web">List, web app</MenuItem>
            <MenuItem value="admin">List, Admin</MenuItem>
            <MenuItem value="mobile">List, mobile</MenuItem>
          </TextField>
          <Control label={`Progress: ${progress}%`}>
            <Slider size="small" value={progress} onChange={(_, v) => setProgress(v as number)} aria-label="Progress" />
          </Control>
          <TextField select size="small" label="Quiz" value={quiz} onChange={(e) => setQuiz(e.target.value as typeof quiz)}>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="passed">Passed</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={completed} onChange={(e) => setCompleted(e.target.checked)} />} label="Completed" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Admin rows have no completed, disabled or quiz states in Figma; the switches do nothing there."
      matrix={<LessonCardMatrix mode={mode} />}
    />
  )
}
