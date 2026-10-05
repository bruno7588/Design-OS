import { Suspense, lazy, useMemo, type ComponentType } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { EmptyState } from '@design-os/components'
import { ReplicaBase } from './replicas/ReplicaBase'
import { CommentLayer } from './comments/CommentLayer'

// Runs one demo: /demos/<slug>/* is the working copy, /demos/<slug>/v/<version>/* a snapshot.
// Each demo's src/index.tsx default-exports a component that renders its own <Routes>,
// relative to this route. New demos and versions are picked up as they're written. The working
// copy gets the comment layer (Phase 4c).

type DemoModule = { default: ComponentType }
const workingCopies = import.meta.glob<DemoModule>('../demos/*/src/index.tsx')
const snapshots = import.meta.glob<DemoModule>('../demos/*/versions/*/src/index.tsx')

export function DemoRoute() {
  const { slug = '', version } = useParams()
  const key = version ? `../demos/${slug}/versions/${version}/src/index.tsx` : `../demos/${slug}/src/index.tsx`
  const load = (version ? snapshots : workingCopies)[key]
  const Demo = useMemo(() => (load ? lazy(load) : null), [load])

  if (!Demo) {
    return (
      <Box sx={(theme) => ({ padding: `${theme.tokens.space.xl}px` })}>
        <EmptyState
          illustration="no-results"
          title="Demo not found"
          description={version ? `${slug} has no ${version} in the playground.` : `There's no demo called ${slug} in apps/playground/demos.`}
        />
      </Box>
    )
  }
  const base = version ? `/demos/${slug}/v/${version}` : `/demos/${slug}`
  const demo = (
    <Suspense fallback={null}>
      <Demo />
    </Suspense>
  )
  return (
    <ReplicaBase value={base}>
      {/* Comments belong to the working copy; saved versions are frozen and show none. */}
      {version ? (
        demo
      ) : (
        <CommentLayer slug={slug} base={base}>
          {demo}
        </CommentLayer>
      )}
    </ReplicaBase>
  )
}
