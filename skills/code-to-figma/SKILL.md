---
name: code-to-figma
description: "Sends a Design OS demo (a version of apps/playground/demos/<slug>) to Figma as editable frames: one section per flow, screens left to right with arrows, a description above each flow and a note under each screen. Places real 5Mins Library instances from the component map (figma-map.json), binds the 5Mins variables and text styles, and flags anything it couldn't link. Use when Bruno asks to send, push, export or rebuild a demo in Figma, or to compare a demo with its Figma version. Code Connect isn't active; never use it."
---

# Code to Figma

Turns a demo into Figma frames that match it 1:1, on a **new page** of the file Bruno gives. It never edits existing pages and never uses Code Connect.

Pieces:
- **`demos/<slug>/flows.json`**: the flows as steps a browser can run (written by you, from the handoff).
- **`pnpm capture-demo`**: runs the flows in the playground and captures each step: a screenshot and a screen tree of frames, text, icons, images and Library components with their props.
- **`packages/components/figma-map.json`** (`pnpm figma-map`): which Library set stands for each code component, and how its props become variants. Its keys, variables and text styles come from the component-inventory skill's Library read.
- **`pnpm figma-script`**: turns the capture into `use_figma` scripts. The runtime they share is `scripts/lib/figma-runtime.js`.

## Before you start
- **`pnpm dev` is running.** The capture needs the playground.
- **The Library is published** with the sets in `figma-map.json` `leaves`, its variables and its text styles, and it's enabled in the target file. Without that, everything is built as "Not linked" frames with annotations.
- **The keys are current.** If `figma-map.json` says `hasKeys: false`, or the Library has changed, run the component-inventory skill first (Library read, then `pnpm inventory`, then `pnpm figma-map`).
- **Ask Bruno for the target file** if he hasn't given one. Write only there.
- **Load the figma-use skill** before any `use_figma` call, and pass `figma-use` in `skillNames`.

## Steps
1. **Flows.** Read `demo.json` and `handoff.md`. Write or update `demos/<slug>/flows.json`: one flow per handoff flow, with `goal`, `user`, `entry` and `success` taken from the handoff, and one step per screen.
   - Each step has a `title`, a `note` (what happens, and what triggers the next step) and the `actions` that get there:
     - `goto` (a path inside the demo)
     - `click`, `fill` or `waitFor`, each by `role` and `name` (`exact: false` for names with counts, such as "Deactivated 27"), by `text`, or `within` another target
     - `press`, `wait`
   - Use what's on screen (the button labels, the dialog role), not CSS.
2. **Capture.** Run `pnpm capture-demo <slug> [--version vN] [--mode dark|light]`. The version defaults to the latest saved one, and the mode to dark (Admin's default).
   - Check its counts. Every screen should show Library instances; a screen with none usually means a component name didn't match.
3. **Set up the page.** Run `pnpm figma-script <slug> [--version vN]`. Then run `figma-export/<version>/scripts/00-setup.js` with `use_figma` in the target file. It returns `pageId`.
4. **Screens.** `use_figma` takes at most 50,000 characters of code and has no `fetch`, so the runtime and each screen's data travel as **payload PNGs**: 1×1 images carrying the text in a `tEXt` chunk, placed on hidden rectangles named `__payload:<name>`.
   1. Run `pnpm figma-script <slug> [--version vN] --page <pageId>`. It writes the loaders, `payload/*.png` and `manifest.json` into `figma-export/<version>/scripts/`.
   2. Run `01-targets.js` with `use_figma`. It makes (or finds) one hidden rectangle per payload and returns their `nodeIds` in manifest order.
   3. Call `upload_assets` with `count` set to the number of payloads, those `nodeIds` and `currentPageId`. Then run `pnpm upload-payloads <slug> <submitUrl...>` with the returned URLs, in the same order. The URLs expire after 10 minutes.
   4. Build the screens: run each `NN-NN-<flow>-<step>.js` loader with `use_figma`, or one script that loops over the payload names (it can take a few minutes and run in the background). Each loader reads the runtime and its screen from the payloads and returns `screenId` and a report: `unlinked`, `variantErrors`, `textMismatches`, `rawColours`, `rawText`, `layoutFallbacks` and `fontFallbacks`.
   - **To rebuild** after a fix: delete the old screen frames by ID, rerun `pnpm figma-script`, and upload again only the payloads that changed: `upload_assets` with just their rectangles' IDs, then `pnpm upload-payloads <slug> --only runtime <url>` after a runtime fix, or all of them after a new capture. The rectangles stay until cleanup.
   - **Cleanup:** when every screen is right, run `99-cleanup.js`. It removes the `__payload:` rectangles.
5. **Compare.** For each screen, call `get_screenshot` on the screen frame and look at it next to the capture's PNG (`figma-export/<version>/<flow>/<step>.png`).
6. **Report.** Write `demos/<slug>/figma-report.md`:
   - the Figma page link
   - per screen: what matches, and every difference (layout drift, wrong variant, text overflow, missing icon)
   - totals of unlinked components and raw values
   - what to fix in the maps or in the Library
   Tell Bruno the page link and the top differences.

## Rules
- **Never edit existing pages.** The setup script makes a new page, or "(2)" and so on if the name is taken.
- **No raw values without saying so.** Colours, spacing and radius bind to 5Mins variables when a value matches; text gets a 5Mins text style when one matches. Everything else is in the report.
- **No guessing components.** A code component without a map entry, a set without a key, or a failed import becomes a frame named "Not linked: <Component>" with an annotation, and is listed in the report.
- **Containers** (`kind: 'container'`: Page header, Modal, Side drawer, Table, Empty state) are rebuilt as frames with their children inside, because their Figma versions use slots.
- **Auto layout only where it's faithful.** Flex layouts become auto layout, and a frame whose children don't land where they are in code (CSS margins) falls back to fixed positions. That's counted in `layoutFallbacks`.
- **Screens are the visible 1440×900 area**, as a design screen would be.
- **Fix the source, not the output.** A wrong variant means fixing the `map` in that component's `.figma.ts` (then `pnpm figma-map`); a missing component means adding a map or a Library component. Don't hand-edit generated scripts.
