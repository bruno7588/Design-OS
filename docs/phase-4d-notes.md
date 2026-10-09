# Phase 4d: Claude Code terminal, and the private shared site

Built 2026-10-09.

## Terminal (local only)
- **Show Terminal** in a demo's viewer opens Claude Code to the left of the running demo. Opening it hides the panel to keep the demo readable; Show Panel brings it back.
- **The session:**
  - Claude runs from the repo root, so it reads `CLAUDE.md`, and it's told which demo is open and to follow `demos/README.md`.
  - There's one session per demo. It keeps running when you leave the page, and the recent output replays when you come back.
  - **Restart** starts a fresh session. Sessions end when the server stops.
- **How it's built:**
  - Server: `apps/server/src/terminal.ts`, with `node-pty` and `@fastify/websocket`, at the WebSocket `/api/terminal?demo=<slug>`.
  - Shell: `apps/shell/src/modules/prototypes/Terminal.tsx`, with xterm.js, themed from tokens. It reconnects by itself.
- **Security:**
  - The server only listens on 127.0.0.1.
  - The terminal also refuses any page that isn't the Design OS shell (an Origin check), because any website open in the browser could otherwise reach it. The e2e test checks this from the playground's origin.
- **A macOS fix the server applies:** `node-pty`'s prebuilt `spawn-helper` gets unpacked without execute permission, which makes every spawn fail with "posix_spawnp failed". The server sets that permission again at start-up.
- **The terminal font** is the system monospace font. The 5Mins type scale has no fixed-width font, and a terminal needs one.

## The shared site (Vercel, read-only)
- **What's on it:**
  - **The shell** at `/`: Components and Prototypes only. Home reads the private vault.
  - **The playground** at `/playground/`.
  - **The demo data** at `/data/`: JSON exported from the demo folders, plus their thumbnails.
- **Read-only:** no Save Version, Duplicate, comments, watch mode or terminal. The viewer says "Shared copy: read-only".
- **How it's built:** `pnpm build:site` runs `scripts/build-site.mts` (with `tsx`):
  - it builds both apps with `VITE_STATIC=1`, the playground with base `/playground/`
  - it exports the demo data with `@design-os/demos/folders` (the same code the server uses, moved there from `apps/server/src/demos.ts`)
  - it puts everything in `site/`, which Git ignores
- **`vercel.json`:**
  - The install only fetches the root, the shell and the playground and their workspace packages, not the server. So `node-pty` (native) and Playwright never install on Vercel.
  - SPA rewrites for both apps.
  - `X-Robots-Tag: noindex` on everything.
- **Tested here:**
  - The exact Vercel install and build commands, on a clean copy of the repo: `node-pty` and Fastify weren't installed, and the build worked.
  - The output, served with the same rewrites, passes `apps/shell/e2e/site.spec.ts`: library, gallery thumbnails, read-only viewer, and a demo opening on its own under `/playground`.
  - That spec runs only when `SITE_URL` is set, so it can check a Vercel preview too.

### Bruno: one-time Vercel setup
1. **Create the project.** In Vercel, Add New → Project → import `bruno7588/Design-OS`.
   - Keep the root directory as the repo root.
   - Vercel reads the install command, build command and output directory from `vercel.json`, so leave the framework as "Other".
2. **Turn on protection.** Settings → Deployment Protection → **Vercel Authentication** → on.
   - Choose the scope that covers **production** as well as previews, if your plan offers it. Which scopes are available depends on the plan (some need Pro with Advanced Deployment Protection), so check what the page offers.
   - If production can't be protected on your plan, don't share the production domain; share the protected deployment links instead.
3. **Give people access.** Invite the people who should see it (engineering in Porto, PMs, QA) to the Vercel team. Vercel Authentication lets in signed-in team members only.
4. **Deploy:** push to `main`. Every push redeploys, and other branches get their own preview links.
5. **Check the first deploy:**
   - Open it signed out: you should get Vercel's sign-in page, not the site.
   - Signed in, `/components`, `/prototypes`, a demo, and `/playground/demos/admin-starter` should load.
   - Or run `SITE_URL=<deployment url> pnpm exec playwright test e2e/site.spec.ts` from `apps/shell` (that only works against an unprotected preview, or with a Vercel bypass token).

## Decisions
- **Vercel**, where the prototype already deploys, with Vercel Authentication.
- **Read-only for now.** Comments, watch mode and the terminal need Bruno's machine. Synced comments from the shared site would need a hosted store, and are a later step.
- **One Vercel project for the shell and the playground**, so there's one address and one access rule.

## Gaps
- **Access depends on the Vercel plan.** Viewers need to be on the Vercel team, and protecting production may need a plan upgrade (see step 2).
- **No synced comments from the shared site yet.**
- **No fixed-width font token.** The terminal uses the system monospace font.

## Next
4e: code-to-figma (send a demo to Figma as editable frames with flow descriptions).
