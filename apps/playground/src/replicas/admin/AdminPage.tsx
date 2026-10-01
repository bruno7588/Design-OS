import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import { EmptyState, PageHeader, Tab } from '@design-os/components'
import { adminLabel } from './AdminLayout'

// The Admin page title row (library Page header) with an optional tabs row, then the page.

export interface AdminTab {
  value: string
  label: string
  count?: number
}

export interface AdminPageProps {
  title: string
  supportingText?: ReactNode
  actions?: ReactNode
  tabs?: AdminTab[]
  tab?: string
  onTabChange?: (value: string) => void
  children?: ReactNode
}

export function AdminPage({ title, supportingText, actions, tabs, tab, onTabChange, children }: AdminPageProps) {
  return (
    <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.l}px` })}>
      <PageHeader
        title={title}
        supportingText={supportingText}
        actions={actions}
        navigation={
          tabs && (
            <Tabs value={tab} onChange={(_, v: string) => onTabChange?.(v)} aria-label={`${title} sections`}>
              {tabs.map((t) => (
                <Tab key={t.value} value={t.value} label={t.label} count={t.count} />
              ))}
            </Tabs>
          )
        }
      />
      {children}
    </Box>
  )
}

/** Any Admin page the replica doesn't have yet. */
export function AdminPlaceholder() {
  const { page = '' } = useParams()
  const title = adminLabel(page) ?? 'Not found'
  return (
    <AdminPage title={title}>
      <EmptyState
        illustration="computer-screen"
        title="Not in the replica yet"
        description="Only People is built so far. Demos add the Admin pages they need."
      />
    </AdminPage>
  )
}
