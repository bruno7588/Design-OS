import { useEffect, useState } from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  InfoTooltip,
  PageHeader,
  type BadgeType,
} from '@design-os/components'
import { DashboardCard } from './DashboardCard'
import { Markdown } from './Markdown'
import { obsidianUrl, useDashboardFile, type DashboardJson, type DashboardMarkdown } from './useDashboardFile'

// Home: a grid of cards, each reading one file from the vault's "50 outputs/dashboard"
// folder. Skills and engines write the files; Home only displays them.

interface Ticket {
  key: string
  summary: string
  status: string
  url?: string
}
interface Meetings {
  today: { time: string; title: string; attendees: string[] }[]
  recentNotes: { date: string; title: string; file: string }[]
}

// Attention first: what's stuck, then what's moving, then the rest.
const STATUSES: { status: string; badge: BadgeType }[] = [
  { status: 'Blocked', badge: 'error' },
  { status: 'In progress', badge: 'progress' },
  { status: 'In review', badge: 'warning' },
  { status: 'To do', badge: 'informative' },
  { status: 'Done', badge: 'success' },
]

export function HomePage() {
  const [online, setOnline] = useState(true)
  useEffect(() => {
    fetch('/api/health')
      .then((r) => setOnline(r.ok))
      .catch(() => setOnline(false))
  }, [])

  return (
    <Box sx={{ p: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PageHeader title="Home" supportingText="Tickets, meetings and decisions, read from the vault's dashboard folder." />
      {!online && (
        <Alert type="alert" icon illustration={false} title="The Design OS server isn't running">
          Home reads its cards through the server. Start it with pnpm dev.
        </Alert>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }, gap: 6, alignItems: 'start' }}>
        <TicketsCard />
        <MeetingsCard />
        <MarkdownCard title="Open decisions and questions" file="open-decisions.md" writtenBy="The open-decisions engine (Phase 6)" testId="home-open-decisions" />
        <MarkdownCard title="Weekly digest" file="weekly-digest.md" writtenBy="The weekly digest engine (Phase 6)" testId="home-weekly-digest" />
        <QuickRunCard />
      </Box>
    </Box>
  )
}

function TicketsCard() {
  const state = useDashboardFile<DashboardJson<{ tickets: Ticket[] }>>('des-tickets.json')
  const tickets = state.status === 'ok' ? state.data.tickets : []
  const known = new Set(STATUSES.map((s) => s.status))
  // Any status we don't map yet still shows, as Informative, at the end.
  const groups = [...STATUSES, ...[...new Set(tickets.map((t) => t.status))].filter((s) => !known.has(s)).map((status) => ({ status, badge: 'informative' as const }))]
    .map((g) => ({ ...g, tickets: tickets.filter((t) => t.status === g.status) }))
    .filter((g) => g.tickets.length > 0)

  return (
    <DashboardCard title="My DES tickets" file="des-tickets.json" state={state} writtenBy="The DES board digest engine (Phase 6)" illustration="no-results" testId="home-tickets">
      <Stack sx={{ gap: 5 }}>
        {groups.map((g) => (
          <Stack key={g.status} component="section" aria-label={g.status} sx={{ gap: 2, alignItems: 'flex-start' }}>
            <Badge type={g.badge} label={`${g.status} (${g.tickets.length})`} />
            <Stack component="ul" sx={{ m: 0, p: 0, listStyle: 'none', gap: 1, width: '100%' }}>
              {g.tickets.map((t) => (
                <Typography key={t.key} component="li" variant="body2" sx={{ display: 'flex', gap: 2 }}>
                  <Link href={t.url} target="_blank" rel="noreferrer" underline="hover" sx={{ fontWeight: 600, flexShrink: 0 }}>
                    {t.key}
                  </Link>
                  <Box component="span" sx={{ minWidth: 0 }}>
                    {t.summary}
                  </Box>
                </Typography>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  )
}

function MeetingsCard() {
  const state = useDashboardFile<DashboardJson<Meetings>>('meetings.json')
  if (state.status !== 'ok') return <DashboardCard title="Meetings" file="meetings.json" state={state} writtenBy="granola-sync" illustration="calendar" testId="home-meetings" />
  const { today, recentNotes } = state.data

  return (
    <DashboardCard title="Meetings" file="meetings.json" state={state} testId="home-meetings">
      <Stack sx={{ gap: 6 }}>
        <Stack component="section" sx={{ gap: 3 }}>
          <Typography variant="h5" component="h3">
            Today
          </Typography>
          {today.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No meetings today.
            </Typography>
          ) : (
            <Stack component="ul" sx={{ m: 0, p: 0, listStyle: 'none', gap: 3 }}>
              {today.map((m) => (
                <Box component="li" key={`${m.time}-${m.title}`} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography variant="subtitle2" sx={{ width: 48, flexShrink: 0 }}>
                    {m.time}
                  </Typography>
                  <Typography variant="body2" sx={{ flex: 1, minWidth: 0 }}>
                    {m.title}
                  </Typography>
                  <AvatarGroup size={24} max={4} aria-label={m.attendees.join(', ')}>
                    {m.attendees.map((a) => (
                      <Avatar key={a} title={a} />
                    ))}
                  </AvatarGroup>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
        <Stack component="section" sx={{ gap: 3 }}>
          <Typography variant="h5" component="h3">
            Last synced notes
          </Typography>
          <Stack component="ul" sx={{ m: 0, p: 0, listStyle: 'none', gap: 2 }}>
            {recentNotes.slice(0, 3).map((n) => (
              <Box component="li" key={n.file} sx={{ display: 'flex', gap: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 88, flexShrink: 0 }}>
                  {n.date}
                </Typography>
                <Link variant="body2" href={obsidianUrl(state.vault, n.file)} underline="hover" sx={{ minWidth: 0 }}>
                  {n.title}
                </Link>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </DashboardCard>
  )
}

function MarkdownCard({ title, file, writtenBy, testId }: { title: string; file: string; writtenBy: string; testId: string }) {
  const state = useDashboardFile<DashboardMarkdown>(file)
  return (
    <DashboardCard title={title} file={file} state={state} writtenBy={writtenBy} testId={testId}>
      {state.status === 'ok' && <Markdown body={state.body} vault={state.vault} />}
    </DashboardCard>
  )
}

// Favourite skills. They run from here once engines exist (Phase 6).
const QUICK_RUN = ['Granola Sync', 'Decision Log', 'Learnings']

function QuickRunCard() {
  return (
    <DashboardCard
      title="Quick run"
      action={<InfoTooltip title="These run from here in Phase 6, when engines exist." label="About quick run" />}
      testId="home-quick-run"
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {QUICK_RUN.map((label) => (
          <Button key={label} variant="outlined" size="medium" disabled>
            {label}
          </Button>
        ))}
      </Box>
    </DashboardCard>
  )
}
