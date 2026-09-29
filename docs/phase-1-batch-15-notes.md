# Phase 1, batch 15: Content cards (Lesson, Assessment, Resource, Type thumbnail)

Checked 2026-09-29.
- **Why this batch:** the first of three card batches. The Figma Cards page has 11 sets, too many for one batch:
  - **15 (this one), content rows:** Lessons, Assessments, Resources and Type thumbnail.
  - **16, collections:** Courses, Category, Folder and Skill.
  - **17, people and offers:** Instructor, External training and Marketplace.
- **Sources:**
  - The Figma Library: the Cards page.
  - `playground/docs/design-system/cards.md` and `resource-card.md`.
  - `src/components/{LessonGridCard,ResourceCard,mobile/*}`.
- **Per-property detail:** each component's Compare tab.

| Component | Built on | Figma |
|---|---|---|
| LessonCard | Box (article) + Tag + Badge + Button + LinearProgress | Card/Lessons `5144:14181` / `11916:9353` (24 variants) |
| AssessmentCard | Box (article) + Badge + Button + IconButton | Card/Assessments `10242:2782` / `12104:3647` (11) |
| ResourceCard | Box (article) + IconButton + Tooltip | Card/Resources `12213:3040` / `12228:2749` (3) |
| TypeThumbnail | Box (img) | Type thumbnail `12213:2984` / `12228:2778` |
| AssessmentIllustration | Box (img) | Illustrations/ Assessments `9120:8850` (11 types × Mobile, Desktop) |

## Built
- **CardBase** (shared surface and title):
  - **Surface:** an `article` in Cards-background with radius 12 (8 for the mobile Lesson card).
  - **Shadow:** Shadow S in light mode, none in dark, as in the Figma light and dark sets.
  - **Hover:** Cards-background-hover, forced with `ds-hover` for docs.
  - **Title:** the card's heading. With `onClick` it becomes a button whose hit area stretches over the card, so the whole card opens.
  - **Buttons inside:** Take Quiz, Review, Edit and Download sit above the title and stay separate. There's never a button inside a button.
  - **Focus:** the keyboard focus ring goes round the whole card.
- **LessonCard:**
  - **Views:** the 170 × 230 grid tile, plus Web app, Admin and Mobile rows.
  - **Parts it reuses:** the Tag (media type), the Progress bar (2px on the grid and mobile, 96 × 4 in web rows), the Badge (Admin "Lesson") and Buttons (Take Quiz: Warning outlined with danger; Retake Quiz: Outlined).
  - **States:** Completed (a Success bar or tick), Disabled (grey thumbnail, Text-disabled, a Bold lock) and Hover (in list rows the title turns Text-button-hover).
- **AssessmentCard:**
  - **Devices:** Web app, Admin (Edit plus the Assessment badge) and Mobile.
  - **Completed:** a tick after the type, then Review (Outlined; Medium on the web app, Small on mobile).
  - **Disabled:** the illustration goes grey and a lock sits on the right.
  - **Illustrations:** the 22 assessment SVGs are copied from the prototype into `Card/illustrations/assessments` (it downloaded them from Figma).
- **ResourceCard:**
  - **Devices:** Web/Admin and Mobile app.
  - **Action:** one, named with the title: Download (import-curve) or Open link (export-square). It has a Tooltip, and its hover fills Input-background-hover.
- **TypeThumbnail:**
  - PDF, Word, Excel, PowerPoint and Image are the prototype's finished tiles.
  - External link is a Certificate quiz tile with the Bold link-2 glyph in Neutral-25.
- **Shell:** Lesson card, Assessment card and Resource card pages, with frames at 1:1. The Resource page shows the whole Resources board, including Type thumbnail.
- **Tests:** `e2e/{lesson,assessment,resource}-card.spec.ts` (13 checks).
- **Inventory:** 52 components in code, 25 Figma-only.

## Mismatches recorded (Design to update)
- **Shadow:** the light Lessons and Resources sets carry Shadow S, but the light Assessments set doesn't. Code gives all three Shadow S in light mode.
- **Title on hover:** Lesson list rows turn the title Text-button-hover, but Assessment rows keep Text-primary.
- **Quiz naming on Lessons:**
  - On web, Completed with Quiz=n/a shows a disabled Retake Quiz.
  - On mobile, that disabled button sits on Completed with Quiz=n/a, and Quiz=Completed shows no button.
  - Code has `quiz: 'pending' | 'passed'`: passed shows the disabled Retake Quiz, and no quiz shows no button.
- **Media Tag sizes:** the Admin (20px, 16 icon) and mobile (22px, 14 icon) Tags are resized instances. Code uses Tag S (24, 16 icon).
- **Duration badge:** a raw `#0F1014` at 50%. Code uses Neutral-900 at 50%.
- **Review on the web app:** an older 37px Buttons Medium instance. Code uses the current Medium (41). The row stays 112 either way.
- **Completed Assessment hover:** Review switches to Outlined-2 Hover with a raw `#00CEE6` at 16% fill. In code the button only changes when it's pointed at itself.
- **Admin Lesson row:** it's 74px, while its contents add up to 73, the same as the Admin Assessment row. Code is 73.
- **Type thumbnail:** the light set has no Image variant.
- **Resource link action:** Figma draws only Download. Code adds Open link (export-square), from `resource-card.md`.

## Prototype differences
- **The prototype has:** `LessonGridCard`, `ResourceCard` and the mobile Lesson and Assessment cards.
- **Page-local:** the web and Admin Lesson and Assessment rows.
- **Nested buttons:** none of them stretch the title, so some nest buttons.
- **Doc to correct:** `cards.md` gives the quiz buttons a radius of 8, but the Figma Buttons Small is 12.
- **ResourceCard:** it has `onRemove` for authoring, which Figma doesn't show yet. It isn't built here.
