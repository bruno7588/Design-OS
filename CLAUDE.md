# Design OS

Bruno's home base for design work at 5Mins.ai. A local web app with six modules: Home, Components, Prototypes, Skills, Engines and Brain. Built in phases; the full plan is in `docs/design-os-build-plan.md`.

## Status
- Phase 0 (foundations): done. Empty shell and server.
- Phase 1a (theme and Button): done. Light and dark MUI theme from the Figma tokens, Button on MUI Button, Components module with Preview, Code and Guidelines tabs (Compare is empty). Figma and prototype mismatches: `docs/phase-1a-button-notes.md`.
- Phase 1b (inventory and Compare): done. `component-inventory` skill plus `pnpm inventory`; overview with filters on `/components`; Button's Compare tab (Figma frame at 1:1 next to the live reference, differences, inventory status, notes for engineering).
- Phase 1, batch 2 (Chip, Tabs, Dialog): done. Notes and open decisions: `docs/phase-1-batch-2-notes.md`.
- Phase 1, batch 3 (Badge, Tooltip, Toast): done. Notes: `docs/phase-1-batch-3-notes.md`.
- Phase 1, batch 4 (Input field, Search, Dropdown): done. Notes: `docs/phase-1-batch-4-notes.md`. Shared field overrides in `packages/components/src/Field`.
- Phase 1, batch 5 (Checkbox, Radio, Toggle, plus Dropdown multi-select): done. Notes and one open decision (Toggle off colour in light mode): `docs/phase-1-batch-5-notes.md`. Shared overrides in `packages/components/src/Selection`.
- Phase 1, batch 6 (Modal, Side drawer, Alert): done. Notes: `docs/phase-1-batch-6-notes.md`. Shared overlay parts in `packages/components/src/Overlay`.
- Phase 1, batch 7 (Avatar, Avatar group, Breadcrumb, Content switcher): done. Notes: `docs/phase-1-batch-7-notes.md`.
- Phase 1, batch 8 (Table): done. Notes: `docs/phase-1-batch-8-notes.md`.
- Phase 1, batch 9 (Progress bar, Empty state): done. Notes: `docs/phase-1-batch-9-notes.md`.
- Phase 1, batch 10 (Integer, Radio button and Inline inputs): done. Notes: `docs/phase-1-batch-10-notes.md`. Shared rules in `packages/components/src/InputField/inputTypes.overrides.ts`.
- Phase 1, batch 11 (File uploader, Stepper): done. Notes: `docs/phase-1-batch-11-notes.md`.
- Phase 1, batch 12 (Tag, Slider, Calendar): done. Notes: `docs/phase-1-batch-12-notes.md`. The Calendar is MUI X Date Pickers 7 with dayjs (a new dependency).
- Phase 1, batch 13 (Side navigation, Top navigation, Page header): done. Notes: `docs/phase-1-batch-13-notes.md`. Shared parts in `packages/components/src/Navigation`.
- Phase 1, batch 14 (Tab navigation, App top navigation): done. Notes: `docs/phase-1-batch-14-notes.md`.
- Phase 1, batch 15 (Lesson, Assessment and Resource cards, Type thumbnail): done. Notes: `docs/phase-1-batch-15-notes.md`. Shared card parts in `packages/components/src/Card`.
- Phase 1, batch 16 (Course, Category, Folder and Skill cards): done. Notes: `docs/phase-1-batch-16-notes.md`.
- Phase 1, batch 17 (Instructor, External training and Marketplace cards): done. Notes: `docs/phase-1-batch-17-notes.md`. Every Cards-page set is now in code.
- Phase 1, batch 18 (Full screen modal, Share modal, Bottom sheet): done. Notes: `docs/phase-1-batch-18-notes.md`.
- Phase 1, batch 19 (gaps: Input field set and Tabs bar mappings; Listbox caret and group titles): done. Emojies was discarded. Notes: `docs/phase-1-batch-19-notes.md`. The Scrim is 50% in both modes.
- Next: finish the remaining components before Phase 1c (Bruno, 2026-09-29): Gamification and illustrations.

## Structure
- `apps/shell`: Vite + React 19.2 + TypeScript + MUI 5.18 front end (port 5173, proxies `/api` to the server)
- `apps/server`: Fastify, local only on 127.0.0.1:4310. For things the browser can't do (terminal, file access, headless Claude)
- `packages/components`: 5Mins reference components on MUI 5. Theme in `src/theme` (`tokens.ts` is the only place raw values live; `createFiveMinsTheme('light' | 'dark')`). Visual rules live in each component's `*.overrides.ts`, keyed on MUI props, so plain MUI renders the same. Each component folder has a `<name>.figma.ts` mapping (`FigmaMapping`: Figma page, set, node IDs and the variant values it covers). Exported as `@design-os/components`
- `packages/components/inventory`: `figma.json` (raw Library read, written by the component-inventory skill) and `inventory.json` (written by `pnpm inventory`, imported by the shell)
- `apps/shell/src/modules/components`: one registry entry and one folder per component (Preview, Code, Guidelines, Compare). `shared/GuidelinesTemplate` and `shared/CompareTemplate` are the templates for every component. Figma frames for Compare live in `apps/shell/public/figma/<slug>-<mode>.png`, exported at 1:1
- `playground/`: the 5mins-prototype repo (git subtree, own npm setup, not part of the pnpm workspace). Replicas and demos live here from Phase 4
- `skills/`: Claude skills, one folder per skill. `.claude/skills` links to `skills/`, `.agents/skills` links to `.claude/skills`
- `engines/`: background job definitions (Phase 6)
- `design-os.config.json`: vault path, Figma Library file key, server host and port
- Obsidian vault: `~/Documents/Projetos/5Mins/Design-OS-vault` (structure set up in Phase 2)

## Commands
- `pnpm install`
- `pnpm dev`: starts shell and server together
- `pnpm build`: type-checks and builds every package
- `pnpm inventory`: rebuilds `inventory.json` from `figma.json` and the code (no Figma needed)
- `cd apps/shell && pnpm exec playwright test`: component, inventory and Compare checks, plus screenshots (`e2e/screenshots`). `e2e/review.spec.ts` captures each component's Preview and Compare tabs for sign-off
- Playground: `cd playground && npm install && npm run dev`

## Stack (matches engineering, we have no access to production code)
React 19.2, TypeScript 6, Vite 7, React Router 6, MUI 5.18 with Emotion, Iconsax, Vitest 4, Playwright, pnpm 10. No Nx.

## Sources
- Figma Library: https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library (file key `EC26cSVe9KNTCWXvYovakw`)
- The prototype is the reference for components: specs in `playground/docs/design-system/` (start with `design-system-guidelines.md`, then the component doc), tokens in `playground/src/styles/tokens.css`, code in `playground/src/components`. Cross-check each component with the Figma Library; where they disagree, follow Figma and record the mismatch.
- The Figma MCP's `get_metadata` only lists the Library's Cover page, but read-only `use_figma` scripts see every page (load the figma-use skill first; one call per page, in parallel). Most component sets exist twice, a light and a dark copy (Buttons: dark `10825:3269`, light `12141:7567`); node IDs are in `packages/components/inventory/figma.json`.
- The components in the prototype and the Figma Library are the correct ones. Never use a skill as a component spec. The old `buttons`, brand colours, typography, surface colours and iconography skills were removed from `skills/`; ignore any global copies of them (such as `anthropic-skills:buttons`).
- Code Connect isn't active. Don't use it.

## Rules
- British English. Sentence case in UI copy, except button labels, which are always Title Case ("Select File", "Mark as Complete"). No em dashes.
- Spacing in multiples of 2px or 4px. 5Mins design tokens only, never raw values.
- Every component has a dark and a light version, in Figma and in code. In Figma that's a copy on the light board or an instance on a board set to the Light variable modes; `pnpm inventory` flags any without one.
- Talk to Bruno in Figma terms: auto layout not flexbox, hug and fill not fit-content, frames not divs, constraints not positioning.
- Keep a calm tone and explain what you're doing as you go. Don't over-engineer.
- If a component the shell needs doesn't exist in `packages/components`, stop and say so. Don't invent one-off styles.
- Build one phase per session, starting in plan mode. Update this file and commit when a phase works.
