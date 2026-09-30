import { useState } from 'react'
import { Box, MenuItem, Slider, TextField, Typography } from '@mui/material'
import { LearningPathCard, type LearningPathState, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { LearningPathMatrix } from './LearningPathMatrix'

const TOPICS = ['Pricing strategy', 'Negotiation', 'Stakeholder management', 'Forecasting', 'Team coaching']

export function LearningPathPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [size, setSize] = useState<'s' | 'md' | 'l'>('s')
  const [state, setState] = useState<Exclude<LearningPathState, 'pending'>>('in-progress')
  const [done, setDone] = useState(80)
  const [clicks, setClicks] = useState(0)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 900 }} data-testid="learning-path-preview">
          <LearningPathCard
            size={size}
            state={state}
            level={4}
            title="Expert"
            description="Apply your skills in complex situations"
            topics={TOPICS}
            progress={{ value: done, total: 120 }}
            actionLabel="Keep Learning"
            onAction={() => setClicks((c) => c + 1)}
          />
          <LearningPathCard type="certificate" size={size} state={state === 'in-progress' ? 'pending' : state} tier="expert" title="Expert Certificate" description="Expert level achieved" actionLabel="Get Started" onAction={() => setClicks((c) => c + 1)} onDownload={() => setClicks((c) => c + 1)} />
          <Typography variant="body2" color="text.secondary" role="status">
            {clicks ? `Buttons pressed ${clicks} times.` : 'No button pressed yet.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(e.target.value as typeof size)}>
            <MenuItem value="s">s (mobile, 343)</MenuItem>
            <MenuItem value="md">md (408)</MenuItem>
            <MenuItem value="l">l (900)</MenuItem>
          </TextField>
          <TextField select size="small" label="State" value={state} onChange={(e) => setState(e.target.value as typeof state)}>
            <MenuItem value="in-progress">In progress (certificate pending)</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </TextField>
          <Control label={`Modules: ${done}/120`}>
            <Slider size="small" min={0} max={120} value={done} onChange={(_, v) => setDone(v as number)} aria-label="Modules done" />
          </Control>
        </>
      }
      hint="On s, the chevron shows every topic. A completed certificate becomes the Certificate card."
      matrix={<LearningPathMatrix mode={mode} />}
    />
  )
}
