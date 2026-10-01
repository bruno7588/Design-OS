import { DEPARTMENTS, FIRST_NAMES, LAST_NAMES, ORG_NAME, SITES } from './catalogue.ts'
import { DEFAULT_TODAY, emailFor, initialsOf, withLearning } from './generate.ts'
import { addDays, createRng, toIso, type Rng } from './random.ts'
import type { Department, Employee, EmployeeStatus, Org } from './types.ts'

// Turns an anonymised CSV export into the same Org shape as generateOrg. Columns are matched
// by common header names (or columnMap); anything missing is filled from the catalogue, and
// courses and enrolments are generated for the people in the file.

export type CsvField =
  | 'name'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'department'
  | 'team'
  | 'role'
  | 'manager'
  | 'region'
  | 'location'
  | 'startDate'
  | 'status'

const ALIASES: Record<CsvField, string[]> = {
  name: ['name', 'full name', 'employee name', 'employee', 'display name'],
  firstName: ['first name', 'firstname', 'given name', 'forename'],
  lastName: ['last name', 'lastname', 'surname', 'family name'],
  email: ['email', 'email address', 'work email', 'e mail'],
  department: ['department', 'dept', 'division'],
  team: ['team', 'sub department', 'group'],
  role: ['role', 'job title', 'title', 'position'],
  manager: ['manager', 'reports to', 'line manager', 'manager email', 'manager name'],
  region: ['region', 'country'],
  location: ['location', 'site', 'property', 'hotel', 'office'],
  startDate: ['start date', 'hire date', 'date joined', 'joined', 'joining date'],
  status: ['status', 'account status', 'employment status'],
}

export interface CsvOptions {
  /** Header names for fields the aliases don't catch, such as { role: 'Position held' }. */
  columnMap?: Partial<Record<CsvField, string>>
  /** Seed for filling gaps and generating learning. Default 1. */
  seed?: number
  today?: string
}

/** RFC 4180 style: commas, double-quoted fields with "" escapes, CRLF or LF. Drops blank lines. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  const src = text.replace(/^﻿/, '')
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else field += c
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((v) => v.trim() !== ''))
}

const norm = (s: string) => s.toLowerCase().replace(/[_\-.]/g, ' ').replace(/\s+/g, ' ').trim()

/** yyyy-mm-dd, dd/mm/yyyy (UK order) or anything Date.parse understands. */
export function parseDate(value: string): string | null {
  const v = value.trim()
  if (!v) return null
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10)
  const uk = v.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/)
  if (uk) return `${uk[3]}-${uk[2].padStart(2, '0')}-${uk[1].padStart(2, '0')}`
  const t = Date.parse(v)
  return Number.isNaN(t) ? null : toIso(new Date(t))
}

function parseStatus(value: string): EmployeeStatus | null {
  const v = norm(value)
  if (!v) return null
  if (/invit|pending/.test(v)) return 'Invited'
  if (/deactiv|inactive|terminat|leaver|left|disabled/.test(v)) return 'Deactivated'
  return 'Registered'
}

export function fromCsv(text: string, options: CsvOptions = {}): Org {
  const { columnMap = {}, seed = 1, today = DEFAULT_TODAY } = options
  const rng = createRng(seed)
  const [header = [], ...rows] = parseCsv(text)
  const headers = header.map(norm)

  const column = {} as Record<CsvField, number>
  for (const field of Object.keys(ALIASES) as CsvField[]) {
    const wanted = columnMap[field] ? [norm(columnMap[field]!)] : ALIASES[field]
    column[field] = headers.findIndex((h) => wanted.includes(h))
  }
  const get = (row: string[], field: CsvField) => (column[field] >= 0 ? (row[column[field]] ?? '').trim() : '')

  const taken = new Set<string>()
  const managerRef = new Map<string, string>()
  const people: Employee[] = rows.map((row, i) => {
    let firstName = get(row, 'firstName')
    let lastName = get(row, 'lastName')
    const full = get(row, 'name')
    if (!firstName && !lastName && full) [firstName, lastName = ''] = splitName(full)
    if (!firstName) firstName = rng.pick(FIRST_NAMES)
    if (!lastName) lastName = rng.pick(LAST_NAMES)

    const email = get(row, 'email').toLowerCase()
    if (email) taken.add(email)
    const { department, team, role } = fillJob(get(row, 'department'), get(row, 'team'), get(row, 'role'), rng)
    const site = fillSite(get(row, 'region'), get(row, 'location'), rng)
    const status = parseStatus(get(row, 'status')) ?? 'Registered'
    const startDate = parseDate(get(row, 'startDate')) ?? addDays(today, -rng.int(30, 3600))
    const id = `emp-${String(i + 1).padStart(4, '0')}`
    const manager = get(row, 'manager')
    if (manager) managerRef.set(id, norm(manager))

    return {
      id,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: email || emailFor(firstName, lastName, taken),
      initials: initialsOf(firstName, lastName),
      department,
      team,
      role,
      level: 'Staff',
      managerId: null,
      region: site.region,
      location: site.location,
      startDate,
      status,
      ...(status === 'Deactivated' ? { deactivatedOn: addDays(today, -rng.int(1, 120)) } : {}),
    }
  })

  // Managers are referenced by email or name; anyone others report to is a manager.
  const byKey = new Map<string, string>()
  for (const p of people) {
    byKey.set(norm(p.email), p.id)
    byKey.set(norm(p.name), p.id)
  }
  for (const p of people) {
    const ref = managerRef.get(p.id)
    const managerId = ref ? byKey.get(ref) : undefined
    if (managerId && managerId !== p.id) p.managerId = managerId
  }
  const manages = new Set(people.map((p) => p.managerId).filter(Boolean))
  for (const p of people) if (manages.has(p.id)) p.level = p.managerId ? 'Manager' : 'General manager'

  const departments: Department[] = []
  for (const p of people) {
    let d = departments.find((x) => x.name === p.department)
    if (!d) departments.push((d = { name: p.department, teams: [] }))
    if (!d.teams.includes(p.team)) d.teams.push(p.team)
  }

  return withLearning({ name: ORG_NAME, today, departments, employees: people, courses: [], enrolments: [] }, rng)
}

function splitName(full: string): [string, string] {
  // "Smith, Amelia" or "Amelia Smith"
  if (full.includes(',')) {
    const [last, first] = full.split(',').map((s) => s.trim())
    return [first, last]
  }
  const parts = full.trim().split(/\s+/)
  return [parts[0], parts.slice(1).join(' ')]
}

function fillJob(department: string, team: string, role: string, rng: Rng) {
  const spec = DEPARTMENTS.find((d) => norm(d.name) === norm(department)) ?? (department ? undefined : rng.pick(DEPARTMENTS))
  const dept = department || spec!.name
  const teamSpec = spec?.teams.find((t) => norm(t.name) === norm(team)) ?? (team || !spec ? undefined : rng.pick(spec.teams))
  return {
    department: dept,
    team: team || teamSpec?.name || dept,
    role: role || (teamSpec ? rng.pick(teamSpec.roles) : 'Team Member'),
  }
}

function fillSite(region: string, location: string, rng: Rng) {
  if (region && location) return { region, location }
  const known = SITES.find((s) => norm(s.location) === norm(location))
  if (known) return { region: known.region, location: known.location }
  if (location) return { region: region || '', location }
  const inRegion = SITES.filter((s) => norm(s.region) === norm(region))
  const site = rng.pick(inRegion.length ? inRegion : SITES)
  return { region: region || site.region, location: site.location }
}
