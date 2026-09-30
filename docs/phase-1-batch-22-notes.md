# Phase 1, batch 22: Illustration sets

Checked 2026-09-30.
- **Why this batch:** the last Figma-only sets, from Bruno's order (after Learning path and Certificate instances).
- **Sources:**
  - The Figma Library, Gamification and Empty state pages.
  - The prototype's `src/assets/*-illustrations`, exported from those sets.
- **Per-property detail:** each set's Compare tab.

| Component | Figma | Size | Files |
|---|---|---|---|
| CertificateIllustration | Illustrations/Certificate `9120:9301` / `11196:7670` | XL 240, L 80, M 56, S 20 | prototype |
| GamificationIllustration | Illustrations/Gamification `11196:7607` / `11196:7707` | 96 | prototype |
| ProgressIllustration | Illustrations/ Progress `10157:9081` / `11196:7723` | 40 | prototype, plus light versions of three |
| AssessmentIllustration | Illustrations/ Assessments `9120:8850` / `12154:10371` | Mobile 56, Desktop 80 | in code since batch 15; now mapped |
| EmptyStateIllustration | Illustrations Empty state `9120:8372` (one copy) | 72 tall (Share 120 wide) | prototype, corrected |
| FunctionIllustration | Illustrations/ Functions `9120:9874` (one copy) | 96 | exported from Figma |

## Built
- **New folder:** `packages/components/src/Illustrations` for Certificate, Gamification, Progress and Function illustrations. They share one `Art` helper: an `img` at the drawn size, decorative unless given a `label`.
- **Progress rings by mode:** Passed, Nearly there and Not passed have a ring bound to Page-background, so each has a file per mode. The ring is Neutral-800 in dark and Neutral-25 in light. `ProgressIllustration` picks the file from the theme mode.
- **Empty state:**
  - The `illustration` prop now takes any of the 33 Figma illustrations (it had 4).
  - `EmptyStateIllustration` is exported on its own.
  - The illustration frame hugs its width, so Share (120 × 72) fits.
- **Functions:** exported from Figma as SVG. The export included the Library board around each variant (a grey canvas rect, the white board and the Body frame), so each file keeps only the variant's drawing and its defs.
- **Shell:** six pages with frames at 1:1. The Empty state and Functions matrices follow the Figma order.
- **Tests:** `e2e/illustrations.spec.ts`:
  - Every file loads at its drawn size in both modes.
  - The progress rings switch with the mode.
  - Share is 120 wide.
- **Inventory:** 76 components in code. Only Emojies is Figma-only, and it's discarded.

## Changed in Figma
- **Assessments light set:** it was missing "Lesson quiz, Desktop". I added a copy of the dark variant (`12393:2`) and laid the light set out to mirror the dark one, 2784 wide.

## Fixed in the prototype
- **Empty state illustrations:** Share is 120 wide, so every variant after it sits 48px further along the set. The prototype's files assumed 72:
  - 28 files had viewBoxes 48px short, which cut the art. They now use the Figma positions.
  - `share.svg` was cropped to 72 wide. It's re-exported.
  - The same fixes are in `packages/components`.

## Mismatches recorded (Design to update)
- **Unnamed variant:** the Empty state set has a 34th variant called "null". Name it or delete it.
- **Spelling:** Assessments "Categorize" is "Categorise" in UI copy (British English).
- **Raw colours:** Functions uses raw colours with no variables. They don't change by mode, so nothing breaks.
- **Page:** the Empty state illustrations live on the Empty state page, the others on Gamification.
