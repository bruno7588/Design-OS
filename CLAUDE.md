# Design OS

Bruno's home base for design work at 5Mins.ai. A local web app with six modules: Home, Components, Prototypes, Skills, Engines and Brain. Built in phases; the full plan is in `docs/design-os-build-plan.md`.

## Status
- Phase 0 (foundations): done. Empty shell and server, no modules yet.
- Next: Phase 1a, the 5Mins MUI theme and Button.

## Structure
- `apps/shell`: Vite + React 19.2 + TypeScript + MUI 5.18 front end (port 5173, proxies `/api` to the server)
- `apps/server`: Fastify, local only on 127.0.0.1:4310. For things the browser can't do (terminal, file access, headless Claude)
- `packages/components`: 5Mins reference components on MUI 5. Theme in `src/theme`. Exported as `@design-os/components`
- `playground/`: the 5mins-prototype repo (git subtree, own npm setup, not part of the pnpm workspace). Replicas and demos live here from Phase 4
- `skills/`: Claude skills, one folder per skill. `.claude/skills` links to `skills/`, `.agents/skills` links to `.claude/skills`
- `engines/`: background job definitions (Phase 6)
- `design-os.config.json`: vault path, Figma Library file key, server host and port
- Obsidian vault: `~/Documents/Projetos/5Mins/Design-OS-vault` (structure set up in Phase 2)

## Commands
- `pnpm install`
- `pnpm dev`: starts shell and server together
- `pnpm build`: type-checks and builds every package
- Playground: `cd playground && npm install && npm run dev`

## Stack (matches engineering, we have no access to production code)
React 19.2, TypeScript 6, Vite 7, React Router 6, MUI 5.18 with Emotion, Iconsax, Vitest 4, Playwright, pnpm 10. No Nx.

## Sources
- Figma Library: https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library (file key `EC26cSVe9KNTCWXvYovakw`)
- Code Connect isn't active. Don't use it.

## Rules
- British English. Sentence case in UI copy. No em dashes.
- Spacing in multiples of 2px or 4px. 5Mins design tokens only, never raw values.
- Talk to Bruno in Figma terms: auto layout not flexbox, hug and fill not fit-content, frames not divs, constraints not positioning.
- Keep a calm tone and explain what you're doing as you go. Don't over-engineer.
- If a component the shell needs doesn't exist in `packages/components`, stop and say so. Don't invent one-off styles.
- Build one phase per session, starting in plan mode. Update this file and commit when a phase works.
