import { useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Box, Link, Stack, Tab, Tabs, Typography } from '@mui/material'
import { findComponent } from './registry'

const TABS = ['Preview', 'Code', 'Guidelines', 'Compare'] as const
type TabName = (typeof TABS)[number]

export function ComponentPage() {
  const { slug } = useParams()
  const doc = findComponent(slug)
  const [tab, setTab] = useState<TabName>('Preview')

  if (!doc) {
    return (
      <Box sx={{ p: 10 }}>
        <Typography variant="h1">Not found</Typography>
        <Link component={RouterLink} to="/components">
          Back to components
        </Link>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 10 }}>
      <Stack sx={{ gap: 2, mb: 6 }}>
        <Link component={RouterLink} to="/components" variant="body2">
          Components
        </Link>
        <Typography variant="h1">{doc.name}</Typography>
        <Typography color="text.secondary">{doc.summary}</Typography>
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={(theme) => ({ mb: 8, borderBottom: `1px solid ${theme.tokens.semantic.border}` })}
      >
        {TABS.map((t) => (
          <Tab key={t} value={t} label={t} />
        ))}
      </Tabs>

      {tab === 'Preview' && <doc.Preview />}
      {tab === 'Code' && <doc.Code />}
      {tab === 'Guidelines' && <doc.Guidelines />}
      {tab === 'Compare' && <doc.Compare />}
    </Box>
  )
}
