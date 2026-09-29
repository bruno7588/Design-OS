import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material'
import { AssessmentCard, ASSESSMENT_TYPES, type AssessmentType, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { AssessmentCardMatrix, SAMPLE } from './AssessmentCardMatrix'

export function AssessmentCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'web' | 'admin' | 'mobile'>('web')
  const [type, setType] = useState<AssessmentType>('multiple-choice')
  const [completed, setCompleted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [last, setLast] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: device === 'mobile' ? 344 : 900, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="assessment-card-preview">
          <AssessmentCard
            title={SAMPLE.title}
            device={device}
            type={type}
            completed={completed}
            disabled={disabled}
            onClick={() => setLast('Opened the assessment')}
            onReview={() => setLast('Clicked Review')}
            onEdit={() => setLast('Clicked Edit')}
          />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the card or its button.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Device" value={device} onChange={(e) => setDevice(e.target.value as typeof device)}>
            <MenuItem value="web">Web app</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="mobile">Mobile app</MenuItem>
          </TextField>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(e.target.value as AssessmentType)}>
            {Object.entries(ASSESSMENT_TYPES).map(([k, v]) => (
              <MenuItem key={k} value={k}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel control={<Switch checked={completed} onChange={(e) => setCompleted(e.target.checked)} />} label="Completed" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Admin has no completed or disabled state in Figma."
      matrix={<AssessmentCardMatrix mode={mode} />}
    />
  )
}
