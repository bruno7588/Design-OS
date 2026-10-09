import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { Alert, Dropdown, EmptyState, PageHeader } from '@design-os/components'
import { PLATFORMS, type DemoList, type DemoSummary } from '@design-os/demos'
import { DemoCard } from './DemoCard'
import { demosUrl, useApi } from './useDemos'
import { STATIC } from '../../static'

// Prototypes: every demo in apps/playground/demos, with the starters to duplicate from.

function Grid({ demos, label }: { demos: DemoSummary[]; label: string }) {
  const navigate = useNavigate()
  return (
    <Box component="section" aria-label={label} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 6 }}>
      {demos.map((d) => (
        <DemoCard key={d.slug} demo={d} onOpen={() => navigate(`/prototypes/${d.slug}`)} />
      ))}
    </Box>
  )
}

export function PrototypesGallery() {
  const list = useApi<DemoList>(demosUrl())
  const [feature, setFeature] = useState('all')
  const [platform, setPlatform] = useState('all')

  const demos = list.status === 'ok' ? list.data.demos : []
  const starters = demos.filter((d) => d.template)
  const own = demos.filter((d) => !d.template)
  const shown = own.filter((d) => (feature === 'all' || d.feature === feature) && (platform === 'all' || d.platform === platform))
  const filtering = feature !== 'all' || platform !== 'all'
  // Every vault feature, plus any a demo uses that the vault doesn't list.
  const features = list.status === 'ok' ? [...new Set([...list.data.features, ...own.map((d) => d.feature)])].sort((a, b) => a.localeCompare(b)) : []

  return (
    <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageHeader
        title="Prototypes"
        supportingText={
          STATIC
            ? 'Demos built on the 5Mins replicas. Open one to run it, switch versions and read its handoff. This shared copy is read-only.'
            : 'Demos built on the 5Mins replicas. Open one to run it, save versions and read its handoff.'
        }
      />

      {list.status === 'offline' && (
        <Alert type="alert" icon illustration={false} title="The Design OS server isn't running">
          Prototypes reads the demo folders through the server. Start it with pnpm dev.
        </Alert>
      )}
      {list.status === 'error' && (
        <Alert type="alert" icon illustration={false}>
          {list.message}
        </Alert>
      )}

      {list.status === 'ok' && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <PageHeader type="section" title="Demos" />
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Dropdown
                label="Feature"
                labelPlacement="start"
                value={feature}
                onChange={setFeature}
                options={[{ value: 'all', label: 'All features' }, ...features.map((f) => ({ value: f, label: f }))]}
              />
              <Dropdown
                label="Platform"
                labelPlacement="start"
                value={platform}
                onChange={setPlatform}
                options={[{ value: 'all', label: 'All platforms' }, ...PLATFORMS.map((p) => ({ value: p, label: p }))]}
              />
            </Box>
            {shown.length > 0 ? (
              <Grid demos={shown} label="Demos" />
            ) : filtering && own.length > 0 ? (
              <EmptyState
                illustration="no-results"
                title="No demos match"
                description="Try another feature or platform."
                titleComponent="h3"
                secondaryAction={{
                  label: 'Clear Filters',
                  onClick: () => {
                    setFeature('all')
                    setPlatform('all')
                  },
                }}
              />
            ) : (
              <EmptyState
                illustration="rocket"
                title="No demos yet"
                description={STATIC ? 'Demos appear here once they are pushed.' : 'Open a starter below and press Duplicate to begin a demo.'}
                titleComponent="h3"
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <PageHeader type="section" title="Starters" supportingText="The replicas as they are. Duplicate one to start a demo." />
            <Grid demos={starters} label="Starters" />
          </Box>
        </>
      )}
    </Box>
  )
}
