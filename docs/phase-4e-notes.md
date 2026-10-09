# Phase 4e: code-to-figma

Built 2026-10-09.

Any demo version can now be sent to Figma as editable frames: one section per flow, screens left to right with arrows, a description above each flow and a note under each screen. Screens use real 5Mins Library instances, variables and text styles. The skill is `skills/code-to-figma`. It only ever adds a new page, and never uses Code Connect.

## The component map
- **Figma side:** the component-inventory skill now also records each set's **key**, plus the Library's **variables** (113, with their values per mode) and **text styles** (15). All of these go in `inventory/figma.json`.
  - Variables that alias another with an opacity were resolved to their final value (Input-background, Selected-row).
- **Code side:** each `<name>.figma.ts` can have a `map` (`FigmaCodeMap` in `src/figma.ts`):
  - `kind: 'leaf'` is placed as a Library instance. Its `props` turn code props into Figma variants. Keys can combine props (`'variant|color'`) and values can use `*`; the first match wins.
  - `kind: 'container'` is rebuilt as frames with its children inside, because the Figma version uses slots. This covers Page header, Modal, Side drawer, Empty state and the Table parts.
  - `match` names the React component when it differs (Toast → `ToastBody`). `domRoot` picks the element to measure (Dialog → `.MuiDialog-paper`).
- **`pnpm figma-map`** joins the two into `packages/components/figma-map.json`: 13 leaves, 9 containers and 55 components not mapped yet, with no problems. Re-run it after every Library read.

## Capture
- **`demos/<slug>/flows.json`** holds the flows as steps a browser can run (`goto`, `click`, `fill`, `waitFor`, `press`, `wait`). Each step targets by role and name, by text, or `within` another target.
- **`pnpm capture-demo <slug>`** runs the flows with Playwright at 1440×900. For each step it writes a screenshot and a screen tree to `figma-export/<version>/`, which Git ignores.
  - **Library components** are found through React's fibre. The bundler renames `forwardRef` functions (`Button2`), so the trailing digits are dropped.
  - **The tree** holds:
    - frames: flex layout, fill, radius and borders
    - text: font, colour and truncation
    - icons: SVG, including rotation
    - images
    - instances: code props, plus visible text and input values
  - Comment pins are hidden during capture.

## Building in Figma
- **`use_figma` limits:** 50,000 characters of code, a 20 KB return value, and no `fetch`. The builder (`scripts/lib/figma-runtime.js`) and each screen's data are too big to paste in.
  - **The fix:** they travel as **payload PNGs**. These are 1×1 images with the text in a `tEXt` chunk, uploaded with the connector's `upload_assets` onto hidden `__payload:` rectangles.
  - The plugin reads the bytes back with `getImageByHash().getBytesAsync()`, so each loader script is about 1.5 KB.
  - Earlier tries were splitting scripts, compressing them, and a runtime text layer. All of them hit the limits.
- **What the builder does:**
  - **Instances:** imports each set by key, sets the variants, and fills the text layers in order. It also swaps in the code's avatar photo and sizes auto layout instances to the code's box.
  - **Text that changes length:**
    - a counter that would wrap in a fixed badge goes to one line, and the badge hugs it
    - a long line set to hug that runs far wider than the component wraps inside it
  - **Variables:** binds colour variables by use (fill, text or stroke; Surface and Text colours first), plus spacing and radius. Text gets the matching text style.
  - **Layout:** flex becomes auto layout. When the children don't land where they are in code, it falls back to fixed positions (counted as `layoutFallbacks`). Absolute children are made absolute before they're positioned.
  - **Not linked:** a component without a key, or a failed import, becomes a "Not linked" frame with an annotation.
- **`figma-setup.js`** makes the page "<Demo> · <version>" (numbered if the name is taken), the sections, descriptions, notes and arrows.

## The test: Deactivate people v1
- **New demo:** `deactivate-people`, duplicated from the Admin starter, with a real handoff. Two flows: Deactivate one person (5 steps) and Invite people (3 steps).
- **Built into** the People file, on the page [Deactivate people · v1](https://www.figma.com/design/dBjKICnQSh7fMgnWwdtakk/People?node-id=10296-2).
- **The result:**
  - all 8 screens with no unlinked components, variant errors or text mismatches
  - one raw colour (the scrim)
  - one or two text layers per screen with no text style
- **The full comparison** is in `apps/playground/demos/deactivate-people/figma-report.md`.

## Gaps
- **Not in the Library:**
  - a multi-line Input field (the Invite modal's email box is single-line in Figma)
  - a Scrim variable
- **Top navigation:** the Library's version has no collapse icon, and shows the moon where code shows the sun.
- **Icons inside instances** (the Invite People button's icon) keep the Library default. Nested swaps aren't built yet.
- **Focus states** (the focused Search) aren't mapped.
- **Checkbox:** the Library draws a 16px box, while code draws about 18px.
- **Screens are the visible 1440×900 area.** Long tables stop at the fold.
