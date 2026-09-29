import { useState } from 'react'
import { Box, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material'
import type { Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { HeaderExample, PageHeaderMatrix } from './PageHeaderMatrix'

export function PageHeaderPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [type, setType] = useState<'page' | 'section'>('page')
  const [meta, setMeta] = useState(true)
  const [nav, setNav] = useState(true)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Box sx={{ width: 1000, maxWidth: '100%' }} data-testid="page-header-preview">
          <HeaderExample type={type} headingComponent="h2" {...(!meta && { metadata: [] })} {...(!nav && { navigation: undefined })} />
        </Box>
      }
      controls={
        <>
          <TextField select size="small" label="Type" value={type} onChange={(e) => setType(e.target.value as 'page' | 'section')}>
            <MenuItem value="page">Page</MenuItem>
            <MenuItem value="section">Section</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={meta} onChange={(e) => setMeta(e.target.checked)} />} label="Label" />
          <FormControlLabel control={<Switch checked={nav} onChange={(e) => setNav(e.target.checked)} />} label="Navigation" />
        </>
      }
      hint="Every slot is optional. The actions wrap under the title when the space runs out."
      matrix={<PageHeaderMatrix mode={mode} />}
    />
  )
}
