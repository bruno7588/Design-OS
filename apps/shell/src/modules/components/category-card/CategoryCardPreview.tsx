import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material'
import { CategoryCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { CATEGORY, CategoryCardMatrix } from './CategoryCardMatrix'

export function CategoryCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [isNew, setNew] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [last, setLast] = useState('')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 4 }} data-testid="category-card-preview">
          <CategoryCard {...CATEGORY} device={device} isNew={isNew} disabled={disabled} onClick={() => setLast('Opened the category')} />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the card.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Device" value={device} onChange={(e) => setDevice(e.target.value as typeof device)}>
            <MenuItem value="desktop">Desktop</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={isNew} onChange={(e) => setNew(e.target.checked)} />} label="New" />
          <FormControlLabel control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
        </>
      }
      hint="Hover the desktop card: the image and glow grow. A disabled desktop card explains itself in a tooltip."
      matrix={<CategoryCardMatrix mode={mode} />}
    />
  )
}
