import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { EmptyState, PageHeader } from '@design-os/components'
import { webLabel } from './WebLayout'

/** Every web app page for now: the replica is the shell only. */
export function WebPlaceholder() {
  const { page = '' } = useParams()
  return (
    <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.l}px` })}>
      <PageHeader title={webLabel(page) ?? 'Not found'} />
      <EmptyState illustration="computer-screen" title="Not in the replica yet" description="The web app replica is the shell only for now. Demos add the pages they need." />
    </Box>
  )
}
