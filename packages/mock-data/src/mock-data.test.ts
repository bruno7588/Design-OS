import { describe, expect, it } from 'vitest'
import { ENROLMENT_STATUSES, emptyOrg, fromCsv, generateOrg, parseCsv, parseDate } from './index.ts'

describe('generateOrg', () => {
  const org = generateOrg()

  it('makes 500 people with unique ids and emails', () => {
    expect(org.employees).toHaveLength(500)
    expect(new Set(org.employees.map((e) => e.id)).size).toBe(500)
    expect(new Set(org.employees.map((e) => e.email)).size).toBe(500)
  })

  it('builds one manager tree under a single general manager', () => {
    const ids = new Set(org.employees.map((e) => e.id))
    const roots = org.employees.filter((e) => e.managerId === null)
    expect(roots).toHaveLength(1)
    expect(roots[0].level).toBe('General manager')
    for (const e of org.employees) if (e.managerId) expect(ids.has(e.managerId)).toBe(true)
    // No cycles: every chain reaches the root.
    const byId = new Map(org.employees.map((e) => [e.id, e]))
    for (const e of org.employees) {
      let cur = e
      for (let steps = 0; cur.managerId; steps++) {
        expect(steps).toBeLessThan(10)
        cur = byId.get(cur.managerId)!
      }
      expect(cur.id).toBe(roots[0].id)
    }
  })

  it('covers every person and enrolment state', () => {
    expect(new Set(org.employees.map((e) => e.status))).toEqual(new Set(['Registered', 'Invited', 'Deactivated']))
    expect(new Set(org.enrolments.map((e) => e.status))).toEqual(new Set(ENROLMENT_STATUSES))
  })

  it('keeps dates consistent', () => {
    for (const e of org.enrolments) {
      if (e.status === 'Overdue') expect(e.dueOn < org.today).toBe(true)
      if (e.status === 'Completed') expect(e.completedOn! <= org.today && e.completedOn! >= e.assignedOn).toBe(true)
      if (['Not started', 'In progress', 'Retaking'].includes(e.status)) expect(e.dueOn > org.today).toBe(true)
    }
  })

  it('includes long course names', () => {
    expect(org.courses.some((c) => c.title.length > 80)).toBe(true)
  })

  it('is deterministic for a seed and different across seeds', () => {
    expect(generateOrg()).toEqual(org)
    expect(generateOrg({ seed: 2 }).employees[10].name).not.toBe(org.employees[10].name)
  })

  it('handles small counts', () => {
    expect(generateOrg({ employees: 3 }).employees).toHaveLength(3)
  })
})

describe('emptyOrg', () => {
  it('has departments and nobody in them', () => {
    const org = emptyOrg()
    expect(org.employees).toHaveLength(0)
    expect(org.enrolments).toHaveLength(0)
    expect(org.departments.length).toBeGreaterThan(0)
  })
})

describe('CSV', () => {
  it('parses quotes, commas and CRLF', () => {
    expect(parseCsv('a,b\r\n"x, y","say ""hi"""\n\n')).toEqual([['a', 'b'], ['x, y', 'say "hi"']])
  })

  it('reads UK and ISO dates', () => {
    expect(parseDate('03/02/2024')).toBe('2024-02-03')
    expect(parseDate('2024-02-03T10:00:00Z')).toBe('2024-02-03')
    expect(parseDate('nope')).toBeNull()
  })

  it('shapes an export into the same Org, filling gaps and linking managers', () => {
    const csv = [
      'Full Name,Work Email,Job Title,Department,Reports To,Hire Date,Status',
      'Ana Costa,ana@acme.example,General Manager,,,01/01/2019,Active',
      '"Hall, Ben",,Waiter,Food & Beverage,ana@acme.example,2024-05-01,Invited',
      'Chloe Kim,chloe@acme.example,,Housekeeping,Ben Hall,,Terminated',
    ].join('\n')
    const org = fromCsv(csv)
    const [ana, ben, chloe] = org.employees
    expect(ben.firstName).toBe('Ben')
    expect(ben.email).toBe('ben.hall@meridian.example')
    expect(ben.managerId).toBe(ana.id)
    expect(chloe.managerId).toBe(ben.id)
    expect(ana.level).toBe('General manager')
    expect(ben.level).toBe('Manager')
    expect(ben.status).toBe('Invited')
    expect(chloe.status).toBe('Deactivated')
    expect(ana.startDate).toBe('2019-01-01')
    expect(chloe.role).not.toBe('')
    expect(ana.department).not.toBe('')
    expect(org.enrolments.length).toBeGreaterThan(0)
  })

  it('takes a column map for unusual headers', () => {
    const org = fromCsv('Who,Position held\nAna Costa,Sommelier', { columnMap: { name: 'Who', role: 'Position held' } })
    expect(org.employees[0].name).toBe('Ana Costa')
    expect(org.employees[0].role).toBe('Sommelier')
  })
})
