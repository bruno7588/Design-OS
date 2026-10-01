---
name: mock-data
description: "Generates realistic 5Mins data at admin scale for replicas and demos: 500 employees across departments, roles and a real manager tree; courses with long names; enrolments that are completed, in progress, overdue, failed and retaking; and empty orgs for empty states. Can also shape an anonymised CSV export into the same data. Use when a demo or replica needs people, courses or progress data, when Bruno asks for mock data, test data or 'realistic data', or gives a CSV export to use."
---

# Mock data

Demos must look like a real customer account, not a tidy sample of ten people. This skill uses `@design-os/mock-data` (`packages/mock-data`), which is deterministic: the same seed always gives the same org, so screenshots stay stable.

The org is Meridian Hotels, a hotel group like 5Mins' hospitality customers: a general manager, seven departments (Front of House, Food & Beverage, Housekeeping, Finance, People, Compliance, Sales) with heads, team managers and staff, across eight sites in four regions.

## Steps

1. **Decide what the demo needs.** People only, people with progress, or an empty account. Pick a scale: 500 by default; under 50 only when the screen is about a small team.
2. **In playground code (`apps/playground`), import the package:**
   ```ts
   import { generateOrg, emptyOrg, enrolmentsByEmployee } from '@design-os/mock-data'
   const org = useMemo(() => generateOrg({ employees: 500, seed: 1 }), [])
   ```
   `org` has `employees`, `departments`, `courses` and `enrolments`. `enrolmentsByEmployee(org)` gives a lookup by person. Keep the default `today` (2026-10-01) unless the demo is about dates.
3. **For an empty state, use `emptyOrg()`** and wire it to a URL switch such as `?data=empty`, as `/admin/people` does, so both states can be shown and screenshotted.
4. **Outside code (a JSON file for a fixture or another tool), use the CLI:**
   `pnpm mock-data --employees 500 --seed 1 --out org.json`. Add `--empty` for the empty org. It prints a summary of the counts by state.
5. **From a CSV export:** `pnpm mock-data --csv export.csv --out org.json`, or `fromCsv(text, { columnMap })` in code.
   - Headers are matched by common names: Name or First name and Last name, Email, Department, Team, Role or Job title, Manager or Reports to (an email or a name), Region, Location or Site, Start date or Hire date (UK dd/mm/yyyy or ISO), and Status (active, invited, terminated…).
   - For other headers, pass a `columnMap` such as `{ role: 'Position held' }`.
   - Missing fields are filled from the catalogue, and courses and enrolments are generated for the people in the file.
   - The CSV must already be anonymised. Never commit a customer export; keep it outside the repo and point the CLI at it.
6. **Check the result looks real.** Every state should be on screen somewhere: Registered, Invited and Deactivated people; Not started, In progress, Completed, Overdue, Failed and Retaking courses.

## Rules

- **Admin scale by default.** Tables get 500 people, with pagination, search and filters. A demo that only works with ten rows hides real problems.
- **Long names are on purpose.** Courses such as "Anti-Money Laundering and Counter-Terrorist Financing Awareness…" and names such as Fitzgerald-Hughes test truncation. Don't shorten them to make a screen look tidy.
- **Always cover the empty state and the bad states.** Every demo needs its empty version, and progress screens must show Overdue and Failed, not just Completed.
- **Change the generator, not the output.** If a demo needs a new field, state or department, add it to `packages/mock-data/src` (with a test) so every demo gets it. Don't hand-edit generated JSON.
- **Fake but plausible.** Emails use `@meridian.example`. Photos are the prototype's seven sample faces (`/avatars/a1.jpg` to `a7.jpg`, in `apps/playground/public/avatars`); everyone else shows the fallback face.
- British English in all generated copy.
