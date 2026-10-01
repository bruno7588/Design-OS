import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Alert, Breadcrumb, Button, CardRoot, Dropdown, EmptyState, InputField, Modal, PageHeader, SectionHeader, useToast } from '@design-os/components'
import { TEMPLATE_FEATURE, type DemoDetail, type DemoList, type DemoSummary, type DemoVersion } from '@design-os/demos'
import { ExportSquare } from 'iconsax-react'
import { Markdown } from '../../shared/Markdown'
import { DemoFrame } from './DemoFrame'
import { postJson, shortDate, useApi } from './useDemos'

// One demo: the running playground page in a frame, its versions, Save Version, Duplicate and
// the handoff beside it. ?version=v2 shows a frozen version.

export function DemoViewer() {
  const { slug = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const version = params.get('version') ?? undefined
  const navigate = useNavigate()
  const toast = useToast()
  const detail = useApi<DemoDetail>(`/api/demos/${slug}${version ? `?version=${version}` : ''}`)
  const list = useApi<DemoList>('/api/demos')
  const [handoff, setHandoff] = useState(true)
  const [saving, setSaving] = useState(false)
  const [duplicating, setDuplicating] = useState(false)

  if (detail.status === 'loading' || list.status === 'loading') return null
  if (detail.status === 'offline' || list.status === 'offline') {
    return (
      <Box sx={{ p: 10 }}>
        <Alert type="alert" icon illustration={false} title="The Design OS server isn't running">
          Prototypes reads the demo folders through the server. Start it with pnpm dev.
        </Alert>
      </Box>
    )
  }
  if (detail.status === 'error' || list.status === 'error') {
    const message = detail.status === 'error' ? detail.message : list.status === 'error' ? list.message : ''
    return (
      <Box sx={{ p: 10 }}>
        <EmptyState
          illustration="no-results"
          title="Demo not found"
          description={message}
          primaryAction={{ label: 'Back to Prototypes', onClick: () => navigate('/prototypes') }}
        />
      </Box>
    )
  }

  const demo = detail.data
  const { playgroundUrl, features } = list.data
  const src = `${playgroundUrl}/demos/${slug}${version ? `/v/${version}` : ''}`
  const shownVersion = demo.versions.find((v) => v.id === version)
  const setVersion = (v: string) => setParams(v === 'current' ? {} : { version: v })

  return (
    <Box sx={{ p: 10, height: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Breadcrumb items={[{ label: 'Prototypes', onClick: () => navigate('/prototypes') }, { label: demo.name }]} />
        <PageHeader
          title={demo.name}
          metadata={[
            { label: demo.template ? 'Starter' : demo.feature },
            { label: demo.platform },
            { label: `By ${demo.author}` },
            ...(demo.duplicatedFrom ? [{ label: `Duplicated from ${demo.duplicatedFrom.slug}${demo.duplicatedFrom.version ? ` ${demo.duplicatedFrom.version}` : ''}` }] : []),
          ]}
          actions={
            <>
              <Dropdown
                label="Version"
                labelPlacement="start"
                value={version ?? 'current'}
                onChange={setVersion}
                options={[{ value: 'current', label: 'Current' }, ...[...demo.versions].reverse().map((v) => ({ value: v.id, label: `${v.id} · ${v.note}` }))]}
              />
              <Button variant="contained" onClick={() => setSaving(true)} disabled={!!version}>
                Save Version
              </Button>
              <Button variant="outlined" onClick={() => setDuplicating(true)}>
                Duplicate
              </Button>
              <Button variant="text" icon={<ExportSquare color="currentColor" />} onClick={() => window.open(src, '_blank', 'noopener')}>
                Open in New Tab
              </Button>
              <Button variant="text" onClick={() => setHandoff((h) => !h)} aria-pressed={handoff}>
                {handoff ? 'Hide Handoff' : 'Show Handoff'}
              </Button>
            </>
          }
        />
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', gap: 6 }}>
        <DemoFrame src={src} title={`${demo.name} demo`} />
        {handoff && (
          <CardRoot hover={false} sx={{ width: 400, flexShrink: 0, overflowY: 'auto', p: 6, display: 'flex', flexDirection: 'column', gap: 4 }} data-testid="handoff">
            <SectionHeader
              title="Handoff"
              supportingText={shownVersion ? `${shownVersion.id}, saved ${shortDate(shownVersion.savedAt)}` : `Current, updated ${shortDate(demo.updatedAt)}`}
            />
            {demo.handoffBody.trim() ? (
              <Markdown body={demo.handoffBody} />
            ) : (
              <EmptyState illustration="resources" title="No handoff yet" description={`Write it in ${demo.handoff} in the demo's folder.`} titleComponent="h3" />
            )}
          </CardRoot>
        )}
      </Box>

      <SaveVersionModal
        open={saving}
        demo={demo}
        onClose={() => setSaving(false)}
        onSaved={(v) => {
          setSaving(false)
          toast({ type: 'success', message: `Saved ${v.id}` })
          detail.reload()
          list.reload()
        }}
      />
      <DuplicateModal
        open={duplicating}
        demo={demo}
        version={version}
        features={features}
        onClose={() => setDuplicating(false)}
        onDuplicated={(copy) => {
          setDuplicating(false)
          toast({ type: 'success', message: `Duplicated as ${copy.name}` })
          navigate(`/prototypes/${copy.slug}`)
        }}
      />
    </Box>
  )
}

function SaveVersionModal({ open, demo, onClose, onSaved }: { open: boolean; demo: DemoDetail; onClose: () => void; onSaved: (v: DemoVersion) => void }) {
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const next = `v${demo.versions.length + 1}`
  return (
    <Modal
      open={open}
      title={`Save ${next}`}
      supportingText="Freezes the demo, its handoff and thumbnail as they are now. You can keep working on the current copy."
      onClose={onClose}
      action={{
        label: 'Save Version',
        onClick: () =>
          postJson<DemoVersion>(`/api/demos/${demo.slug}/versions`, { note })
            .then((v) => {
              setNote('')
              setError('')
              onSaved(v)
            })
            .catch((e: Error) => setError(e.message)),
      }}
    >
      <InputField
        label="What changed"
        placeholder={`Version ${demo.versions.length + 1}`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        validation={error ? 'error' : 'none'}
        helperText={error || undefined}
        fullWidth
        autoFocus
      />
    </Modal>
  )
}

function DuplicateModal({
  open,
  demo,
  version,
  features,
  onClose,
  onDuplicated,
}: {
  open: boolean
  demo: DemoDetail
  version?: string
  features: string[]
  onClose: () => void
  onDuplicated: (copy: DemoSummary) => void
}) {
  const [name, setName] = useState('')
  const [feature, setFeature] = useState(demo.feature === TEMPLATE_FEATURE ? '' : demo.feature)
  const [error, setError] = useState('')
  const needsFeature = !feature
  const options = [...new Set([...features, ...(feature ? [feature] : [])])].map((f) => ({ value: f, label: f }))
  return (
    <Modal
      open={open}
      title={demo.template ? 'New demo' : `Duplicate ${demo.name}`}
      supportingText={`Copies ${version ? version : 'the current version'} into a new demo, without its version history.`}
      onClose={onClose}
      action={{
        label: 'Duplicate',
        disabled: !name.trim() || needsFeature,
        onClick: () =>
          postJson<DemoSummary>(`/api/demos/${demo.slug}/duplicate`, { name, feature, version })
            .then((copy) => {
              setName('')
              setError('')
              onDuplicated(copy)
            })
            .catch((e: Error) => setError(e.message)),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <InputField
          label="Name"
          placeholder={demo.template ? 'Bulk invite from CSV' : `${demo.name} copy`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          validation={error ? 'error' : 'none'}
          helperText={error || undefined}
          fullWidth
          autoFocus
        />
        <Dropdown label="Feature" value={feature} onChange={setFeature} options={options} placeholder="Pick a feature" fullWidth />
      </Box>
    </Modal>
  )
}
