import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Avatar, Badge, Button, CellContent, CellDate, ConfirmDialog, Dropdown, InputField, Modal, Search, useToast } from '@design-os/components'
import { emptyOrg, enrolmentsByEmployee, generateOrg, type Employee } from '@design-os/mock-data'
import { AddCircle } from 'iconsax-react'
import { AdminPage } from '../../replicas/admin/AdminPage'
import { DataTable, type Column } from '../../replicas/admin/DataTable'
import { PersonDrawer } from './PersonDrawer'

// The admin replica's showcase: People, with 500 generated employees. ?data=empty swaps in
// the empty org to show the empty states.

const byText = (pick: (e: Employee) => string) => (a: Employee, b: Employee) => pick(a).localeCompare(pick(b))

const STATUS_BADGE = { Registered: 'success', Invited: 'warning', Deactivated: 'informative' } as const

export function PeoplePage() {
  const [params] = useSearchParams()
  const empty = params.get('data') === 'empty'
  // A new org (and fresh state) when switching between the full and the empty data.
  return <People key={empty ? 'empty' : 'full'} empty={empty} />
}

function People({ empty }: { empty: boolean }) {
  const toast = useToast()
  const org = useMemo(() => (empty ? emptyOrg() : generateOrg()), [empty])
  const learning = useMemo(() => enrolmentsByEmployee(org), [org])
  const [people, setPeople] = useState(org.employees)
  const [tab, setTab] = useState<'active' | 'deactivated'>('active')
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState<Employee | null>(null)
  const [confirm, setConfirm] = useState<Employee[] | null>(null)
  const [inviting, setInviting] = useState(false)
  const [invites, setInvites] = useState('')

  const byId = useMemo(() => new Map(people.map((p) => [p.id, p])), [people])
  const managerName = (e: Employee) => (e.managerId ? (byId.get(e.managerId)?.name ?? '–') : '–')

  const active = people.filter((p) => p.status !== 'Deactivated')
  const deactivated = people.filter((p) => p.status === 'Deactivated')
  const inTab = tab === 'active' ? active : deactivated
  const q = query.trim().toLowerCase()
  const rows = inTab.filter(
    (p) => (department === 'all' || p.department === department) && (!q || [p.name, p.email, p.role, p.team].some((v) => v.toLowerCase().includes(q))),
  )
  const filtering = q !== '' || department !== 'all'

  const setStatus = (ids: Set<string>, status: Employee['status']) =>
    setPeople((list) =>
      list.map((p) => (ids.has(p.id) ? { ...p, status, deactivatedOn: status === 'Deactivated' ? org.today : undefined } : p)),
    )

  const switchTab = (value: string) => {
    setTab(value as typeof tab)
    setSelected(new Set())
  }

  const name: Column<Employee> = {
    key: 'name',
    header: 'Name',
    width: '28%',
    compare: byText((e) => e.name),
    render: (e) => (
      <CellContent
        start={<Avatar size={40} src={e.avatar} alt="" />}
        primary={
          <a
            href={`/admin/people/${e.id}`}
            onClick={(ev) => {
              ev.preventDefault()
              setOpen(e)
            }}
          >
            {e.name}
          </a>
        }
        secondary={e.email}
      />
    ),
  }
  const role: Column<Employee> = { key: 'role', header: 'Role', compare: byText((e) => e.role), render: (e) => <CellContent primary={e.role} /> }
  const team: Column<Employee> = { key: 'team', header: 'Team', compare: byText((e) => e.team), render: (e) => <CellContent primary={e.team} secondary={e.department} /> }
  const location: Column<Employee> = {
    key: 'location',
    header: 'Location',
    compare: byText((e) => e.location),
    render: (e) => <CellContent primary={e.location} secondary={e.region} />,
  }

  const columns: Column<Employee>[] =
    tab === 'active'
      ? [
          name,
          role,
          team,
          { key: 'manager', header: 'Reports to', compare: byText(managerName), render: (e) => <CellContent primary={managerName(e)} /> },
          location,
          {
            key: 'status',
            header: 'Status',
            width: 128,
            compare: byText((e) => e.status),
            render: (e) => <Badge type={STATUS_BADGE[e.status]} label={e.status} />,
          },
        ]
      : [
          name,
          role,
          team,
          location,
          {
            key: 'deactivatedOn',
            header: 'Deactivated on',
            width: 144,
            compare: byText((e) => e.deactivatedOn ?? ''),
            render: (e) => (e.deactivatedOn ? <CellDate date={new Date(e.deactivatedOn)} /> : null),
          },
        ]

  const emptyState = filtering
    ? {
        illustration: 'no-results' as const,
        title: 'No people match',
        description: 'Try a different name, email, role or department.',
        secondaryAction: {
          label: 'Clear Filters',
          onClick: () => {
            setQuery('')
            setDepartment('all')
          },
        },
      }
    : tab === 'active'
      ? {
          illustration: 'add-users' as const,
          title: 'No people yet',
          description: 'Invite your team to start assigning courses and tracking their progress.',
          primaryAction: { label: 'Invite People', onClick: () => setInviting(true) },
        }
      : {
          illustration: 'deactivated' as const,
          title: 'No deactivated people',
          description: 'People you deactivate show here, and you can reactivate them at any time.',
        }

  return (
    <AdminPage
      title="People"
      supportingText={`Everyone at ${org.name} who can access 5Mins.`}
      actions={
        <Button variant="contained" icon={<AddCircle color="currentColor" />} onClick={() => setInviting(true)}>
          Invite People
        </Button>
      }
      tabs={[
        { value: 'active', label: 'Active', count: active.length },
        { value: 'deactivated', label: 'Deactivated', count: deactivated.length },
      ]}
      tab={tab}
      onTabChange={switchTab}
    >
      {people.length > 0 && (
        <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: `${theme.tokens.space.m}px`, flexWrap: 'wrap' })}>
          <Search value={query} onChange={setQuery} placeholder="Search people" />
          <Dropdown
            label="Department"
            labelPlacement="start"
            value={department}
            onChange={setDepartment}
            options={[{ value: 'all', label: 'All departments' }, ...org.departments.map((d) => ({ value: d.name, label: d.name }))]}
          />
          {selected.size > 0 && (
            <Box sx={{ ml: 'auto' }}>
              {tab === 'active' ? (
                <Button variant="outlined" color="error" onClick={() => setConfirm(people.filter((p) => selected.has(p.id)))}>
                  Deactivate {selected.size === 1 ? '1 Person' : `${selected.size} People`}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setStatus(selected, 'Registered')
                    toast({ type: 'success', message: `${selected.size === 1 ? '1 person' : `${selected.size} people`} reactivated` })
                    setSelected(new Set())
                  }}
                >
                  Reactivate {selected.size === 1 ? '1 Person' : `${selected.size} People`}
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}

      <DataTable
        label={tab === 'active' ? 'Active people' : 'Deactivated people'}
        rows={rows}
        columns={columns}
        getRowId={(e) => e.id}
        getRowName={(e) => e.name}
        initialSort={{ key: 'name', direction: 'asc' }}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        rowActions={
          tab === 'active'
            ? [
                { label: 'View Profile', onClick: setOpen },
                { label: 'Deactivate', onClick: (e) => setConfirm([e]) },
              ]
            : [
                {
                  label: 'Reactivate',
                  onClick: (e) => {
                    setStatus(new Set([e.id]), 'Registered')
                    toast({ type: 'success', message: `${e.name} reactivated` })
                  },
                },
              ]
        }
        empty={emptyState}
      />

      {open && (
        <PersonDrawer
          person={open}
          manager={open.managerId ? byId.get(open.managerId) : undefined}
          enrolments={learning.get(open.id) ?? []}
          courses={org.courses}
          onClose={() => setOpen(null)}
        />
      )}

      <ConfirmDialog
        open={!!confirm}
        type="error"
        title={confirm?.length === 1 ? `Deactivate ${confirm[0].name}?` : `Deactivate ${confirm?.length ?? 0} people?`}
        secondaryText="They lose access to 5Mins straight away and keep their learning history. You can reactivate them from the Deactivated tab."
        actionLabel="Deactivate"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          if (!confirm) return
          setStatus(new Set(confirm.map((p) => p.id)), 'Deactivated')
          toast({ type: 'success', message: confirm.length === 1 ? `${confirm[0].name} deactivated` : `${confirm.length} people deactivated` })
          setSelected(new Set())
          setConfirm(null)
        }}
      />

      <Modal
        open={inviting}
        title="Invite people"
        supportingText={`They'll get an email with a link to join ${org.name} on 5Mins.`}
        onClose={() => setInviting(false)}
        action={{
          label: 'Send Invites',
          disabled: !invites.trim(),
          onClick: () => {
            const count = invites.split(/[\s,;]+/).filter(Boolean).length
            toast({ type: 'success', message: count === 1 ? 'Invite sent' : `${count} invites sent` })
            setInvites('')
            setInviting(false)
          },
        }}
      >
        <InputField label="Email addresses" placeholder="name@company.com, name@company.com" value={invites} onChange={(e) => setInvites(e.target.value)} fullWidth multiline minRows={3} />
      </Modal>
    </AdminPage>
  )
}
