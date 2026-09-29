import { useState } from 'react'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { MarketplaceCard, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { MarketplaceCardMatrix, SAMPLES } from './MarketplaceCardMatrix'

export function MarketplaceCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [type, setType] = useState(0)
  const [last, setLast] = useState('')
  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="marketplace-card-preview">
          <MarketplaceCard {...SAMPLES[type]} device={device} onClick={() => setLast('Opened the offer')} />
          <Typography variant="body2" color="text.secondary" role="status">
            {last ? `${last}.` : 'Click the card.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(Number(e.target.value))}>
            <MenuItem value={0}>Subscription</MenuItem>
            <MenuItem value={1}>Coaching</MenuItem>
            <MenuItem value={2}>Reward</MenuItem>
          </TextField>
          <TextField select size="small" label="Device" value={device} onChange={(e) => setDevice(e.target.value as typeof device)}>
            <MenuItem value="desktop">Desktop</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
          </TextField>
        </>
      }
      hint="Rewards are priced in points, with the Jewels illustration."
      matrix={<MarketplaceCardMatrix mode={mode} />}
    />
  )
}
