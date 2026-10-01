import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Avatar, Badge, CellContent, SideDrawer, type BadgeType } from '@design-os/components'
import type { Course, Employee, Enrolment, EnrolmentStatus } from '@design-os/mock-data'

// A person's details and their courses, in the library Side drawer.

const ENROLMENT_BADGE: Record<EnrolmentStatus, BadgeType> = {
  Completed: 'success',
  'In progress': 'progress',
  'Not started': 'informative',
  Overdue: 'error',
  Failed: 'error',
  Retaking: 'warning',
}

// Most urgent first: what needs attention, then what's open, then what's done.
const ORDER: EnrolmentStatus[] = ['Overdue', 'Failed', 'Retaking', 'In progress', 'Not started', 'Completed']

const date = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function detail(e: Enrolment) {
  switch (e.status) {
    case 'Completed':
      return `Completed ${date(e.completedOn!)} · Score ${e.score}%`
    case 'Failed':
      return `Score ${e.score}% · ${e.attempts} ${e.attempts === 1 ? 'attempt' : 'attempts'}`
    case 'Retaking':
      return `Attempt ${e.attempts} · ${e.progress}% · Due ${date(e.dueOn)}`
    case 'Overdue':
      return `Was due ${date(e.dueOn)} · ${e.progress}%`
    case 'In progress':
      return `${e.progress}% · Due ${date(e.dueOn)}`
    default:
      return `Due ${date(e.dueOn)}`
  }
}

export interface PersonDrawerProps {
  person: Employee
  manager?: Employee
  enrolments: Enrolment[]
  courses: Course[]
  onClose: () => void
}

export function PersonDrawer({ person, manager, enrolments, courses, onClose }: PersonDrawerProps) {
  const course = new Map(courses.map((c) => [c.id, c]))
  const sorted = [...enrolments].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status) || a.dueOn.localeCompare(b.dueOn))
  const facts: [string, string][] = [
    ['Email', person.email],
    ['Department', person.department],
    ['Team', person.team],
    ['Reports to', manager?.name ?? '–'],
    ['Location', `${person.location}, ${person.region}`],
    ['Start date', date(person.startDate)],
    ['Status', person.status],
  ]

  return (
    <SideDrawer open title={person.name} supportingText={person.role} onClose={onClose}>
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.l}px` })}>
        <Avatar size={64} src={person.avatar} alt="" />

        <Box component="dl" sx={(theme) => ({ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: `${theme.tokens.space.s}px ${theme.tokens.space.m}px`, m: 0 })}>
          {facts.map(([label, value]) => (
            <Box key={label} sx={{ display: 'contents' }}>
              <Typography component="dt" variant="body2" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
                {label}
              </Typography>
              <Typography component="dd" variant="body2" sx={(theme) => ({ m: 0, color: theme.tokens.semantic.textPrimary, overflowWrap: 'anywhere' })}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px` })}>
          <Typography component="h3" variant="h4" sx={(theme) => ({ color: theme.tokens.semantic.textPrimary })}>
            Courses ({enrolments.length})
          </Typography>
          {sorted.length === 0 ? (
            <Typography variant="body2" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
              No courses assigned yet.
            </Typography>
          ) : (
            <Box component="ul" aria-label="Courses" sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px`, m: 0, p: 0, listStyle: 'none' })}>
              {sorted.map((e) => (
                <Typography component="li" variant="body2" key={e.id} sx={(theme) => ({ color: theme.tokens.semantic.textPrimary })}>
                  <CellContent primary={course.get(e.courseId)?.title} secondary={detail(e)}>
                    <Box sx={{ ml: 'auto', flexShrink: 0 }}>
                      <Badge type={ENROLMENT_BADGE[e.status]} label={e.status} />
                    </Box>
                  </CellContent>
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </SideDrawer>
  )
}
