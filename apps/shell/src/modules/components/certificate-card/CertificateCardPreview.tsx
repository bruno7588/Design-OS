import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material'
import { CertificateCard, type CertificateTier, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { CertificateCardMatrix } from './CertificateCardMatrix'

export function CertificateCardPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [tier, setTier] = useState<CertificateTier>('master')
  const [size, setSize] = useState<'small' | 'md' | 'large'>('small')
  const [download, setDownload] = useState(true)
  const [count, setCount] = useState(0)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 900 }} data-testid="certificate-card-preview">
          <CertificateCard tier={tier} size={size} subtitle={download ? undefined : 'Mastery Achieved'} onDownload={download ? () => setCount((c) => c + 1) : undefined} />
          <Typography variant="body2" color="text.secondary" role="status">
            {count ? `Downloaded ${count} times.` : 'Not downloaded yet.'}
          </Typography>
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Tier" value={tier} onChange={(e) => setTier(e.target.value as CertificateTier)}>
            <MenuItem value="master">Master</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </TextField>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(e.target.value as typeof size)}>
            <MenuItem value="small">Small (343)</MenuItem>
            <MenuItem value="md">md (408)</MenuItem>
            <MenuItem value="large">Large (900)</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={download} onChange={(e) => setDownload(e.target.checked)} />} label="Download" />
        </>
      }
      hint="The artwork is the same in both modes."
      matrix={<CertificateCardMatrix mode={mode} />}
    />
  )
}
