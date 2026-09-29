import { useState } from 'react'
import { Box, Slider, Typography } from '@mui/material'
import { FolderCard, NewFolderCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { Control, PreviewLayout } from '../shared/PreviewLayout'
import { FolderCardMatrix, IMAGE } from './FolderCardMatrix'

export function FolderCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [count, setCount] = useState(5)
  const [last, setLast] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="folder-card-preview">
          <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <FolderCard title="Onboarding" count={count} image={IMAGE} onClick={() => setLast('Opened the folder')} />
            <NewFolderCard onClick={() => setLast('Clicked New Folder')} />
          </Box>
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click a card.'}
          </Typography>
        </Box>
      }
      controls={
        <Control label={`Courses: ${count}`}>
          <Slider size="small" min={0} max={10} value={count} onChange={(_, v) => setCount(v as number)} aria-label="Courses" />
        </Control>
      }
      hint="The deck shows up to three layers; an empty folder shows the empty artwork."
      matrix={<FolderCardMatrix mode={mode} />}
    />
  )
}
