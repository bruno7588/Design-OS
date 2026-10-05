# Phase 4c: comments on live prototypes, and watch mode

Built 2026-10-05.

## What was built

### Comments (`apps/playground/src/comments`)
- Every demo's working copy has a comment layer.
- **Comment mode** turns on from the viewer's **Comment** button, the **C** key, or `?comment=1`.
  - Hovering outlines an element; clicking opens a composer.
  - The first comment asks for your name, which that browser then remembers.
  - Escape leaves comment mode. Comment mode stays on after you post, as in Figma.
- **Pins** sit where you clicked, on the route you were on, and follow the element on scroll and resize.
  - A pin's colour is its status: pending, in progress, done or failed.
  - Done pins are hidden.
  - Clicking a pin opens its thread, with Resolve or Reopen, and Delete.
- **Stored with each comment** in `demos/<slug>/comments.json`: a unique selector, plus the tag, role, accessible name, text and React component chain (best effort), the route, and the saved version it was based on.
- **Saved versions are frozen**, so they show no comments.
- **Thumbnails leave the pins out.** The thumbnailer sets `window.__designOsThumbnail`.

### Comment pin (`packages/components/src/CommentPin`)
- **New, and built in code first.** It has its own page in the Components module.
- Compare says "Not in Figma yet". `pnpm inventory` lists it as the one code-only component.

### Watch mode (`apps/server/src/watch.ts`, prompt in `engines/watch-mode/prompt.md`)
- **Switching it on:** per demo, from the **Comments** tab in the viewer. It's off by default, and off again after a server restart.
- **What it does:** it takes pending comments one at a time, oldest first, and runs headless Claude Code:
  - `claude -p --model claude-haiku-4-5`, from the demo folder
  - tools: Read, Edit, Write, Glob and Grep only
  - deny rules block edits to the replicas, the components, and the demo's own metadata, comments and versions
- **Build check:** after a change, the server asks the running playground to compile every file in the demo's `src`.
  - If something doesn't build, Haiku gets one more go with the error.
  - If it still doesn't build, the comment is marked failed with the reason. A broken demo is never marked done.
- **The comment's note** records what Haiku says it changed, and the cost.
- **Live updates:** edits arrive in the open demo through Vite's hot reload, and the gallery thumbnail refreshes.

### Viewer (`apps/shell/src/modules/prototypes`)
- **Comment** button (pressed while comment mode is on).
- The side panel now has **Handoff | Comments (n)** tabs; "Hide Handoff" is now "Hide Panel".
- The Comments tab has the watch-mode switch, says what Haiku is working on, and lists comments grouped In progress, Pending, Failed and Done. Clicking one opens its pin in the demo.
- The frame and the viewer talk through `postMessage` (`FrameMessage` in `@design-os/demos`):
  - The demo says when it's ready, so pressing Comment before it loads still works.
  - The viewer checks where every message comes from.
- Gallery cards show the open comment count.

## The manual watch-mode check (2026-10-05)
- **Comment:** "Change the page title to Team members", on the People title of a duplicate of the Admin starter.
- **First run:** Haiku copied the People page into the demo and changed the title, so the shared replica stayed untouched. But it left relative imports (`../../../replicas/...`) that don't resolve from the demo folder, and still reported done.
- **The fix:**
  - The prompt now spells out how to rewrite imports when copying.
  - The engine checks the build and gives Haiku one retry.
- **Second run:** clean on the first try. Imports went through `@replicas`, and the only files changed were in the demo's `src`. It took about a minute and cost $0.10.
- **Both runs used a temporary demo,** deleted afterwards.

## Decisions
- **Our own comment layer, not Agentation.** That keeps pins shared through the server, shows statuses on the pins, and uses library parts only.
- **Headless Claude Code, not the API.** It uses Bruno's Claude Code login, with no API key to manage, and its file tools.
- **Comments only on the working copy.** Watch mode only ever edits the working copy.

## Gaps
- **Comment pin isn't in the Figma Library yet.** It needs a light and a dark set, with Status (Pending, In progress, Done, Failed) and State (Enabled, Hover, Selected).
- **No popover or composer in Figma.** The composer and thread are MUI Popover with `menuPaperStyles`, InputField, Button and Badge.
- **The build check catches imports that don't resolve and syntax errors, not type errors.** Vite doesn't type-check.
- **Pins on the same spot overlap**; the panel lists them all.
- **Comment selectors can go stale.** After a big change, the element may no longer exist; its pin then stays hidden, but the comment is still in the panel.

## Next
4d: the Claude Code terminal beside the demo, and the private shared deploy.
