# Demos

Each folder here is one demo, shown in the Design OS Prototypes module (`/prototypes`) and run by the playground at `/demos/<slug>`.

```
<slug>/
  demo.json      name, feature, platform, author, description, template, handoff, dates, versions
  handoff.md     the handoff document: goal, user, entry point, flows, states, open questions
  thumbnail.png  written by the Design OS server (Playwright) a couple of seconds after each save
  src/index.tsx  the working copy: default-exports a component that renders its own <Routes>
  versions/vN/   frozen snapshots (src, handoff.md, thumbnail.png), made by Save Version
```

## Starting a demo
Open a starter (Admin starter, Web app starter) in Prototypes and press Duplicate. Don't create folders by hand, and don't edit a starter for one demo.

## Rules
- **Chrome comes from the replicas, data from mock-data.** Import layouts and building blocks from `@replicas/...` (AdminLayout, AdminPage, DataTable, WebLayout) and data from `@design-os/mock-data` (see the `mock-data` skill). Every visual comes from `@design-os/components`; no one-off styles.
- **To change a replica page, copy it into the demo first.** For example, copy `@playground/pages/admin/PeoplePage.tsx` into `src/` and import the copy. Never edit `src/replicas` or `src/pages` for one demo.
- **Imports inside a demo are relative** (`./PeoplePage`), and everything outside goes through the aliases (`@replicas`, `@playground`, `@design-os/*`). That keeps version snapshots working, since they sit deeper in the folder.
- **Routes are relative.** The demo's `<Routes>` start at the demo's root, such as `<Route path="admin" element={<AdminLayout />}>`. Layouts navigate inside the demo by themselves.
- **Never edit `versions/`.** Snapshots are frozen; to rework an old version, duplicate it from that version.
- **Keep the handoff current.** Its headings are what engineering reads and what code-to-figma (Phase 4e) turns into flows.
