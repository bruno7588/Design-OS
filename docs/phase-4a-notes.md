# Phase 4a: replicas and mock data

Built 2026-10-01. Phase 4 runs as 4a to 4e; this is 4a.

## What was built

- **`apps/playground`** (port 5175, part of `pnpm dev`): a new workspace app on MUI and `@design-os/components`. It holds the replicas now and the demos from 4b.
  - `/` lists the replicas.
  - `/admin/people` is the showcase: 500 generated people with search, a department filter, sorting, pagination (25 per page), selection, Active and Deactivated tabs, a person drawer, deactivate and reactivate, and an invite modal.
  - `/admin/people?data=empty` shows the empty state.
  - `/web/for-you` is the web app shell.
- **Admin replica** (`apps/playground/src/replicas/admin`):
  - `AdminLayout`: library Admin TopNav and SideNav, with items from the Figma Side navigation set. Every item routes to `/admin/<slug>`; pages that don't exist yet show `AdminPlaceholder`.
  - `AdminPage`: Page header plus a tabs row.
  - `DataTable`: the themed MUI Table with sorting, pagination, selection and a row actions menu. With no rows it shows the Empty state.
  - Drawers, modals and confirmations are the library `SideDrawer`, `Modal` and `ConfirmDialog`, used as they are.
- **Web app replica** (`apps/playground/src/replicas/web`): web TopNav and SideNav with the profile card. Shell only.
- **`packages/mock-data`** (`@design-os/mock-data`): a deterministic, seeded org.
  - `generateOrg`, `emptyOrg` and `fromCsv`.
  - CLI: `pnpm mock-data`.
  - Unit tests run with `pnpm test`.
  - Skill: `skills/mock-data/SKILL.md`.
- **`ThemeModeProvider`** moved from the shell into `packages/components`, so the shell and the playground share it. The shell's `theme-mode.tsx` re-exports it.
- **Root `vitest.config.ts`**: `pnpm test` was picking up the Playwright specs and failing; it now runs only `src/**/*.test.ts`.
- **Tests:** `apps/playground/e2e/admin-replica.spec.ts`, which also takes screenshots into `e2e/screenshots`.

## Decisions

- **Replicas live in `apps/playground`, not `playground/`.** The prototype is plain CSS on npm with its own React and its own Vercel deploy. Adding MUI there would mean two copies of React and two styling systems in one app. `playground/` stays untouched as the reference.
- **Native app deferred.** The components are MUI, which is web only. The options for later:
  - Expo DOM components (`'use dom'`), which reuse the MUI parts inside a web view
  - React Native versions of the components
  - a phone frame on the web
- **Mock org: Meridian Hotels.** Its seven departments are Front of House, Food & Beverage, Housekeeping, Finance, People, Compliance and Sales.
  - Above them is the general manager's Executive Office; it has heads, team managers and staff.
  - Today is fixed at 2026-10-01, and emails are `@meridian.example`.
- **Admin side navigation uses the Figma labels**, not the prototype's: Custom Fields, 5Mins Courses, Your Content, Your Courses.
- **Status badges:** Registered is Success and Invited is Warning (as in the prototype). Courses map Completed to Success, In progress to Progress, Not started to Informative, Overdue and Failed to Error, and Retaking to Warning.

## Gaps (nothing invented)

- **No bulk action bar in the library.**
  - The prototype has `BulkActionBar`.
  - When rows are selected, the replica shows a Danger-outlined "Deactivate N People" button (or "Reactivate N People") at the end of the filter row.
  - A Figma bulk action bar would replace it.
- **No initials avatar.** People without a photo show the fallback face (as in Phase 3). About 15% of people get one of the seven sample photos.
- **Every sortable header shows its arrow,** because the theme draws the Figma "Icon=true" header. Worth checking whether inactive sort arrows should be hidden or dimmed.
- **The row actions menu is MUI Menu with the library menu styles.** There's no Figma "row actions" component to compare it with.
- **Admin small breakpoint not wired.** The replica is desktop only. TopNav's `small` and menu button exist, but there's no mobile Admin layout yet.
- **Pagination reads "1-25 of 474"** (MUI's default with a hyphen), as in Figma's "1-10 of 28".

## Next

4b: demo folders with `demo.json`, the gallery with Playwright thumbnails, versions, Duplicate, and the handoff panel.
