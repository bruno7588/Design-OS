import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { Alert, Button, CardRoot, EmptyState, SectionHeader, type IllustrationName } from '@design-os/components'
import { DASHBOARD_FOLDER, obsidianUrl, type DashboardJson, type DashboardMarkdown, type DashboardState } from './useDashboardFile'

// One Home card. There's no Dashboard card in Figma yet, so this is the shared card surface
// (CardRoot) with the Section header the prototype docs use for dashboard widgets.

export interface DashboardCardProps {
  title: string
  /** The file this card reads, and its state. Leave out for cards with no file (Quick run). */
  file?: string
  state?: DashboardState<DashboardJson<unknown> | DashboardMarkdown>
  /** What writes the file, shown when it's missing. */
  writtenBy?: string
  illustration?: IllustrationName
  /** Replaces the Open in Obsidian button. */
  action?: ReactNode
  children?: ReactNode
  testId?: string
}

export function DashboardCard({ title, file, state, writtenBy, illustration = 'empty-box', action, children, testId }: DashboardCardProps) {
  const ok = state?.status === 'ok' ? state : null
  const supporting = ok ? `${ok.sample ? 'Sample file, updated' : 'Updated'} ${dayjs(ok.updatedAt).format('D MMM, HH:mm')}` : file

  return (
    <CardRoot sx={{ p: 6, display: 'flex', flexDirection: 'column', gap: 4 }} data-testid={testId}>
      <SectionHeader
        title={title}
        supportingText={supporting}
        action={
          action ??
          (ok && file ? (
            <Button variant="text" size="small" href={obsidianUrl(ok.vault, `${DASHBOARD_FOLDER}/${file}`)}>
              Open in Obsidian
            </Button>
          ) : undefined)
        }
      />
      {state?.status === 'missing' && (
        <EmptyState
          title={`No ${file} yet`}
          description={writtenBy ? `${writtenBy} writes it to ${DASHBOARD_FOLDER} in the vault.` : `Add it to ${DASHBOARD_FOLDER} in the vault.`}
          illustration={illustration}
          titleComponent="h3"
        />
      )}
      {state?.status === 'error' && <Alert type="alert" icon illustration={false}>{state.message}</Alert>}
      {(ok || !state) && <Box sx={{ minWidth: 0 }}>{children}</Box>}
    </CardRoot>
  )
}
