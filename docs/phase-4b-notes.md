# Phase 4b: demo gallery, versions and handoff

Built 2026-10-01.

## What was built

### Demo folders (`apps/playground/demos/<slug>/`)
- Each folder holds `demo.json`, `handoff.md`, `thumbnail.png` and `src/index.tsx` (the working copy).
- Each saved version is a frozen copy in `versions/vN/`.
- The rules for building a demo are in `apps/playground/demos/README.md`.
- The types are in `packages/demos` (`@design-os/demos`), shared by the server and the shell.
- Two starters, both templates:
  - **Admin starter**: AdminLayout with the People page.
  - **Web app starter**: the web app shell.
- Each starter has a handoff template with these headings: Goal, User, Entry point, Flows, States, Open questions. Phase 4e reads the Flows.

### Playground
- `/demos/<slug>/*` runs the working copy; `/demos/<slug>/v/<vN>/*` runs a saved version.
- Demos are found with `import.meta.glob`, so new demos and versions show up without a restart.
- Demos import through the aliases `@replicas` (`src/replicas`) and `@playground` (`src`), so a version copied deeper into the folder still resolves.
- `ReplicaBase` lets `AdminLayout` and `WebLayout` navigate inside the demo they're mounted in. The `/admin` and `/web` replica routes work as before.

### Server (`apps/server/src/demos.ts`, `thumbnails.ts`)
- `/api/demos` routes for the list, one demo with its handoff, thumbnails, Save Version, Duplicate and Delete.
- Delete is API only; the tests use it, and starters can't be deleted.
- Features come from the vault's `20 features/_index.md`.
- **Thumbnails**:
  - Playwright Chromium photographs `/demos/<slug>` at 1440×900 in dark mode.
  - The demos folder is watched: a save in `<slug>/src` takes a new shot after 2 seconds of quiet.
  - At start-up, any demo without a thumbnail gets one.
  - A deleted demo never gets a shot. An early version recreated a deleted folder by writing its thumbnail; that's fixed and checked by the e2e test.
- `design-os.config.json` has new `playground` (dir, url) and `author` entries.

### Shell Prototypes module
- **Gallery** (`/prototypes`):
  - Feature and Platform filters.
  - "Demos", then "Starters".
  - Cards with the thumbnail, feature, version count and last update.
- **Viewer** (`/prototypes/<slug>?version=vN`):
  - A breadcrumb back to the gallery, and the demo's metadata.
  - A Version dropdown.
  - Save Version, which is disabled while you're looking at an old version.
  - Duplicate, from the version on screen. Starters need a feature picked.
  - Open in New Tab, and Hide Handoff or Show Handoff.
  - The demo, with the handoff panel beside it.
  - `DemoFrame` draws the demo at 1440px wide and scales it down to fit, like zoom to fit, so Admin layouts never squash.
- `Markdown` moved to `apps/shell/src/shared`; Home and Prototypes share it.
- **Tests**:
  - `apps/shell/e2e/prototypes.spec.ts` runs in order. It covers the gallery and filters, the viewer and handoff, the full duplicate, edit, save version and switch loop, and the thumbnail watcher. It deletes its own test demo.
  - Server unit tests are in `apps/server/src/demos.test.ts`.

## Decisions
- **Versions are folder snapshots**, not Git tags. They're easy to read, run side by side and diff, and everything stays in Git.
- **Duplicate doesn't copy version history**, as in Figma.
- **No Delete button.** Removing a demo stays a deliberate act; ask Claude, or delete the folder.
- **A demo runs in its own theme.** The frame is a separate origin (the playground), so its light and dark mode is the playground's, not the shell's.

## Gaps (nothing invented)
- **No Demo card in Figma.** The gallery card is `CardRoot` with a thumbnail, `CardTitle`, a caption and a platform Badge.
- **No docked side panel in the library.** The handoff panel is `CardRoot` with `SectionHeader`. The library's Side drawer is modal, with a scrim.
- **The viewer's header actions** (Version dropdown and four buttons) run long at narrow widths. Fine at desktop sizes; a "More" menu would help on small screens.

## Next
4c: comments on the live prototype and the watch-mode engine.
