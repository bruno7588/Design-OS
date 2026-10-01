import { COURSES, DEPARTMENTS, FIRST_NAMES, LAST_NAMES, ORG_NAME, PHOTOS, SITES, type DepartmentSpec } from './catalogue.ts'
import { addDays, createRng, daysBetween, type Rng } from './random.ts'
import type { Course, Department, Employee, EmployeeLevel, EmployeeStatus, Enrolment, EnrolmentStatus, Org } from './types.ts'

export interface GenerateOptions {
  /** How many people. Default 500. */
  employees?: number
  /** Same seed, same org. Default 1. */
  seed?: number
  /** The date the data is generated against (yyyy-mm-dd). Fixed by default so screenshots stay stable. */
  today?: string
  /** Share of people with a photo, 0 to 1. Default 0.15; the rest show the fallback face. */
  photoShare?: number
}

export const DEFAULT_TODAY = '2026-10-01'

// The general manager sits in their own department, above the seven in the catalogue.
const EXECUTIVE = { department: 'Executive Office', team: 'Leadership' }

const departments = (): Department[] => [
  { name: EXECUTIVE.department, teams: [EXECUTIVE.team] },
  ...DEPARTMENTS.map((d) => ({ name: d.name, teams: d.teams.map((t) => t.name) })),
]

/** An org at admin scale: a general manager, department heads, team managers and staff, with courses and enrolments in every state. */
export function generateOrg(options: GenerateOptions = {}): Org {
  const { employees = 500, seed = 1, today = DEFAULT_TODAY, photoShare = 0.15 } = options
  const rng = createRng(seed)
  const people = buildEmployees(employees, rng, today, photoShare)
  return withLearning({ name: ORG_NAME, today, departments: departments(), employees: people, courses: [], enrolments: [] }, rng)
}

/** The same org with nobody in it, for empty states. */
export function emptyOrg(today = DEFAULT_TODAY): Org {
  return { name: ORG_NAME, today, departments: departments(), employees: [], courses: [], enrolments: [] }
}

// People

export const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

export const initialsOf = (first: string, last: string) => `${first.trim()[0] ?? ''}${last.trim()[0] ?? ''}`.toUpperCase()

/** A unique work email; a second Amelia Smith gets amelia.smith2. */
export function emailFor(first: string, last: string, taken: Set<string>) {
  const base = `${slug(first)}.${slug(last)}`
  let email = `${base}@meridian.example`
  for (let n = 2; taken.has(email); n++) email = `${base}${n}@meridian.example`
  taken.add(email)
  return email
}

const siteWeights = Object.fromEntries(SITES.map((s, i) => [String(i), s.weight])) as Record<string, number>
const pickSite = (rng: Rng) => SITES[Number(rng.weighted(siteWeights))]

function buildEmployees(count: number, rng: Rng, today: string, photoShare: number): Employee[] {
  const taken = new Set<string>()
  const people: Employee[] = []

  const add = (level: EmployeeLevel, department: string, team: string, role: string, managerId: string | null) => {
    if (people.length >= count) return null
    const firstName = rng.pick(FIRST_NAMES)
    const lastName = rng.pick(LAST_NAMES)
    const site = level === 'General manager' || level === 'Head' ? SITES[0] : pickSite(rng)
    const status: EmployeeStatus = level === 'Staff' ? rng.weighted({ Registered: 85, Invited: 8, Deactivated: 7 }) : 'Registered'
    const startDate =
      status === 'Invited' ? addDays(today, -rng.int(0, 21)) : addDays(today, -(level === 'Staff' ? rng.int(30, 3600) : rng.int(700, 4000)))
    const person: Employee = {
      id: `emp-${String(people.length + 1).padStart(4, '0')}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: emailFor(firstName, lastName, taken),
      initials: initialsOf(firstName, lastName),
      ...(status !== 'Invited' && rng.chance(photoShare) ? { avatar: rng.pick(PHOTOS) } : {}),
      department,
      team,
      role,
      level,
      managerId,
      region: site.region,
      location: site.location,
      startDate,
      status,
    }
    if (status === 'Deactivated') person.deactivatedOn = addDays(today, -rng.int(1, Math.max(1, Math.min(365, -daysBetween(today, startDate) - 30))))
    people.push(person)
    return person.id
  }

  // Leaders first, so everyone below has a manager to report to.
  const gm = add('General manager', EXECUTIVE.department, EXECUTIVE.team, 'General Manager', null)
  const managers: { dept: DepartmentSpec; team: DepartmentSpec['teams'][number]; id: string }[] = []
  for (const dept of DEPARTMENTS) {
    const head = add('Head', dept.name, dept.teams[0].name, dept.head, gm)
    for (const team of dept.teams) {
      const id = add('Manager', dept.name, team.name, team.manager, head ?? gm)
      if (id) managers.push({ dept, team, id })
    }
  }

  const deptWeights = Object.fromEntries(DEPARTMENTS.map((d) => [d.name, d.weight])) as Record<string, number>
  while (people.length < count && managers.length) {
    const deptName = rng.weighted(deptWeights)
    const options = managers.filter((m) => m.dept.name === deptName)
    if (!options.length) continue
    const { dept, team, id } = rng.pick(options)
    add('Staff', dept.name, team.name, rng.pick(team.roles), id)
  }
  return people
}

// Learning

/** Adds the course catalogue and an enrolment history to any list of people (generated or from a CSV). */
export function withLearning(org: Org, rng: Rng = createRng(1)): Org {
  const courses: Course[] = COURSES.map((c, i) => ({
    id: `course-${String(i + 1).padStart(2, '0')}`,
    title: c.title,
    category: c.category,
    lessons: c.lessons,
    durationMinutes: c.lessons * 5,
    mandatory: !!c.mandatory,
    departments: c.departments ?? [],
  }))

  const enrolments: Enrolment[] = []
  for (const person of org.employees) {
    const leader = person.level !== 'Staff'
    const assigned = courses.filter((c) => {
      if (c.mandatory) return true
      if (c.departments.length) return c.departments.includes(person.department)
      if (c.category === 'Leadership') return leader || rng.chance(0.1)
      return rng.chance(0.3)
    })
    for (const course of assigned) {
      if (person.status === 'Invited' && !course.mandatory) continue
      enrolments.push(enrol(person, course, enrolments.length, org.today, rng))
    }
  }
  return { ...org, courses, enrolments }
}

function enrol(person: Employee, course: Course, index: number, today: string, rng: Rng): Enrolment {
  const status: EnrolmentStatus =
    person.status === 'Invited'
      ? 'Not started'
      : rng.weighted({ Completed: 50, 'In progress': 17, 'Not started': 12, Overdue: 10, Failed: 5, Retaking: 6 })
  const latest = person.deactivatedOn ?? today
  const earliest = person.startDate > addDays(latest, -400) ? person.startDate : addDays(latest, -400)
  let assignedOn = addDays(earliest, rng.int(0, Math.max(0, daysBetween(earliest, latest))))
  let dueOn = addDays(assignedOn, rng.int(14, 90))
  let completedOn: string | null = null
  let progress = 0
  let score: number | null = null
  let attempts = 0

  switch (status) {
    case 'Completed':
      completedOn = addDays(assignedOn, rng.int(1, 60))
      if (completedOn > latest) completedOn = latest
      progress = 100
      score = rng.int(70, 100)
      attempts = rng.chance(0.15) ? 2 : 1
      break
    case 'Overdue':
      dueOn = addDays(today, -rng.int(1, 60))
      assignedOn = addDays(dueOn, -rng.int(14, 60))
      progress = rng.chance(0.4) ? 0 : rng.int(5, 80)
      attempts = progress ? 1 : 0
      break
    case 'Failed':
      progress = 100
      score = rng.int(20, 69)
      attempts = rng.int(1, 2)
      break
    case 'Retaking':
      progress = rng.int(10, 80)
      score = rng.int(30, 69)
      attempts = rng.int(2, 3)
      break
    case 'In progress':
      progress = rng.int(5, 95)
      attempts = 1
      break
    case 'Not started':
      break
  }
  // Anything still open is due in the future; only Overdue is past its date.
  if ((status === 'Not started' || status === 'In progress' || status === 'Retaking') && dueOn <= today) dueOn = addDays(today, rng.int(3, 45))

  return { id: `enr-${String(index + 1).padStart(5, '0')}`, employeeId: person.id, courseId: course.id, status, assignedOn, dueOn, completedOn, progress, score, attempts }
}

// Lookups

export function enrolmentsByEmployee(org: Org): Map<string, Enrolment[]> {
  const map = new Map<string, Enrolment[]>()
  for (const e of org.enrolments) {
    const list = map.get(e.employeeId)
    if (list) list.push(e)
    else map.set(e.employeeId, [e])
  }
  return map
}

/** Counts for a quick sense of the data: people by status and level, enrolments by status. */
export function summarise(org: Org) {
  const count = <T extends string>(values: T[]) => values.reduce<Record<string, number>>((acc, v) => ((acc[v] = (acc[v] ?? 0) + 1), acc), {})
  return {
    employees: org.employees.length,
    byStatus: count(org.employees.map((e) => e.status)),
    byLevel: count(org.employees.map((e) => e.level)),
    byDepartment: count(org.employees.map((e) => e.department)),
    courses: org.courses.length,
    enrolments: org.enrolments.length,
    enrolmentsByStatus: count(org.enrolments.map((e) => e.status)),
  }
}
