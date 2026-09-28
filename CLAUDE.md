# Design OS

Bruno's home base for design work at 5Mins.ai. A local web app with six modules: Home, Components, Prototypes, Skills, Engines and Brain. Built in phases; the full plan is in `docs/design-os-build-plan.md`.

## Status
- Phase 0 (foundations): done. Empty shell and server.
- Phase 1a (theme and Button): done. Light and dark MUI theme from the Figma tokens, Button on MUI Button, Components module with Preview, Code and Guidelines tabs (Compare is empty). Figma and prototype mismatches: `docs/phase-1a-button-notes.md`.
- Next: Phase 1b, the component inventory and the Compare tab.

## Structure
- `apps/shell`: Vite + React 19.2 + TypeScript + MUI 5.18 front end (port 5173, proxies `/api` to the server)
- `apps/server`: Fastify, local only on 127.0.0.1:4310. For things the browser can't do (terminal, file access, headless Claude)
- `packages/components`: 5Mins reference components on MUI 5. Theme in `src/theme` (`tokens.ts` is the only place raw values live; `createFiveMinsTheme('light' | 'dark')`). Visual rules live in each component's `*.overrides.ts`, keyed on MUI props, so plain MUI renders the same. Exported as `@design-os/components`
- `apps/shell/src/modules/components`: one registry entry and one folder per component (Preview, Code, Guidelines). `shared/GuidelinesTemplate` is the Guidelines template for every component
- `playground/`: the 5mins-prototype repo (git subtree, own npm setup, not part of the pnpm workspace). Replicas and demos live here from Phase 4
- `skills/`: Claude skills, one folder per skill. `.claude/skills` links to `skills/`, `.agents/skills` links to `.claude/skills`
- `engines/`: background job definitions (Phase 6)
- `design-os.config.json`: vault path, Figma Library file key, server host and port
- Obsidian vault: `~/Documents/Projetos/5Mins/Design-OS-vault` (structure set up in Phase 2)

## Commands
- `pnpm install`
- `pnpm dev`: starts shell and server together
- `pnpm build`: type-checks and builds every package
- `cd apps/shell && pnpm exec playwright test`: component checks and matrix screenshots (`e2e/screenshots`)
- Playground: `cd playground && npm install && npm run dev`

## Stack (matches engineering, we have no access to production code)
React 19.2, TypeScript 6, Vite 7, React Router 6, MUI 5.18 with Emotion, Iconsax, Vitest 4, Playwright, pnpm 10. No Nx.

## Sources
- Figma Library: https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library (file key `EC26cSVe9KNTCWXvYovakw`)
- The prototype is the reference for components: specs in `playground/docs/design-system/` (start with `design-system-guidelines.md`, then the component doc), tokens in `playground/src/styles/tokens.css`, code in `playground/src/components`. Cross-check each component with the Figma Library; where they disagree, follow Figma and record the mismatch.
- The Figma MCP only lists the Library's Cover page. Ask Bruno for node links (Buttons: dark `10825:3269`, light `12141:7567`).
- The components in the prototype and the Figma Library are the correct ones. Never use a skill as a component spec. The old `buttons`, brand colours, typography, surface colours and iconography skills were removed from `skills/`; ignore any global copies of them (such as `anthropic-skills:buttons`).
- Code Connect isn't active. Don't use it.

## Rules
- British English. Sentence case in UI copy. No em dashes.
- Spacing in multiples of 2px or 4px. 5Mins design tokens only, never raw values.
- Talk to Bruno in Figma terms: auto layout not flexbox, hug and fill not fit-content, frames not divs, constraints not positioning.
- Keep a calm tone and explain what you're doing as you go. Don't over-engineer.
- If a component the shell needs doesn't exist in `packages/components`, stop and say so. Don't invent one-off styles.
- Build one phase per session, starting in plan mode. Update this file and commit when a phase works.
