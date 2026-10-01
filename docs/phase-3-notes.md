# Phase 3: shell and Home dashboard

Built 2026-10-01.

## What was built
- **Shell frame** (`apps/shell/src/App.tsx`): the library's Side navigation, Admin system, replaces the hand-styled sidebar. Six modules with Iconsax icons (Home2, Category, Mobile, Magicpen, Cpu, Book1); the selected item follows the route. The light and dark switch is the help item at the bottom. The frame is pinned while the page scrolls. `/` opens Home.
- **Dark by default.** The shell opens dark and remembers the switch (`design-os-mode` in local storage).
- **Page headers.** Home, Components and the placeholder modules start with `PageHeader`.
- **Server** (`apps/server`): `GET /api/dashboard/:file` reads one `.json` or `.md` file from `<vault>/50 outputs/dashboard/`. Plain file names only. Returns `{ file, vault, updatedAt, sample, kind, data | body }`; Markdown comes without its frontmatter. 404 when the file is missing.
- **Home** (`apps/shell/src/modules/home`): a two-column grid of cards (one column on narrow screens). Each card reads one file and has Open in Obsidian. A missing file shows the Empty state; a broken file shows an Alert in its card; a stopped server shows one Alert above the grid.
- **Library:** `CardRoot` and `CardTitle` are now exported. No style changes.
- **New dependency:** `react-markdown` in the shell. Headings, text, lists and links map to the theme's type scale. Obsidian `[[links]]` open the note in Obsidian.
- **Check:** `apps/shell/e2e/home.spec.ts` covers navigation, the cards, the empty and offline states, and the `home-dark.png` and `home-light.png` screenshots.

## Decisions and gaps
- **No Dashboard card in Figma.** Home cards are `CardRoot` (Cards-background, radius 12, Shadow S in light mode, hover fill) with the Overlay `SectionHeader`, as the prototype docs suggest for dashboard widgets. Worth drawing a Dashboard card in the Library.
- **Section header divider in dark mode.** Border and Cards-background are both Neutral-700 in dark mode, so the divider under a card's Section header doesn't show. Decide whether a Section header on a card should use another divider colour.
- **#14161E isn't a token.** The build plan asked for a #14161E background; the shell uses Page-background (Neutral-800, #20222A).
- **No TopNav.** The Admin Top nav always has Exit Admin and Log out, which mean nothing in Design OS.
- **Attendees use the fallback face.** Figma's Avatar has no initials variant; names are the accessible label and the hover title.
- **Ticket groups** run Blocked, In progress, In review, To do, Done (attention first). Badge types: error, progress, warning, informative, success. Unknown statuses show at the end as Informative.

## Dashboard file formats
Skills and engines (Phase 6) write these to `50 outputs/dashboard/` in the vault. `sample: true` marks hand-written sample data; the card then says "Sample file". The card's date is the file's modified time.

`des-tickets.json`
```json
{ "updatedAt": "ISO date", "tickets": [{ "key": "DES-142", "summary": "…", "status": "In progress", "url": "https://…" }] }
```
Statuses: To do, In progress, In review, Blocked, Done.

`meetings.json`
```json
{
  "updatedAt": "ISO date",
  "today": [{ "time": "10:00", "title": "…", "attendees": ["Bruno Carvalho"] }],
  "recentNotes": [{ "date": "2026-09-21", "title": "…", "file": "10 meetings/2026-09-21 ….md" }]
}
```
`file` is the path from the vault root. Home shows the first three notes.

`open-decisions.md` and `weekly-digest.md`: output frontmatter (`type: output`, `date`, `skill`), then Markdown. `##` is a group (a feature, or the week), `###` a sub-heading. Link sources with `[[note name]]`.

## Sample data
The tickets and today's meetings are made up; the Jira URLs guess `5mins.atlassian.net`. The recent notes, open questions and digest come from the real meeting notes (14 to 21 September).
