# Phase 1, batch 16: Collection cards (Course, Category, Folder, Skill)

Checked 2026-09-29.
- **Why this batch:** the second of the three card batches. Instructor, External training and Marketplace come next.
- **Sources:**
  - The Figma Library: the Cards page.
  - `playground/docs/design-system/cards.md`.
  - `src/components/{WorkspaceCourseCard,CategoryCard,SkillCard,mobile/*}`.
- **Per-property detail:** each component's Compare tab.

| Component | Built on | Figma |
|---|---|---|
| CourseCard | Box (article) + Badge + LinearProgress | Card/Courses `5132:5756` / `11916:10292` (12 variants) |
| CategoryCard | Box (article) + Badge + Tooltip | Card/ Category `10176:1806` / `10574:3913` (9) |
| FolderCard, NewFolderCard | Box (article), ButtonBase | Card/Folder `10175:3106` / Card/folder `10175:3183` (10) |
| SkillCard | Box + IconButton | Card/skill `11802:3704` / `11828:5184` (5) |

## Built
- **CourseCard:**
  - **Desktop:** 300 × 297; the image is 140 tall, the body has padding 24 and gap 16, and the title is Bold 16 over three lines.
  - **Mobile:** 272 × 248; the image is 120, the body has padding 16 and gap 12, and the title is Bold 14.
  - **Progress:** the Progress bar in Selected.
  - **Due date:** the Warning Badge on Cards-background.
  - **New:** the Danger-400 pill.
  - **Hover:** the picture zooms 1.12× (300ms), with no zoom under reduced motion.
- **CategoryCard:**
  - No surface of its own: a blurred glow (blur 16px, 32%) sits behind the sharp image.
  - **Hover:** the image and the glow both grow.
  - **New Courses:** the New Badge, over the top edge.
  - **Disabled:** greyscale with a 40px lock. On desktop, a Tooltip says why; it's also shown on keyboard focus and linked as the card's description.
- **FolderCard:**
  - **Surface:** 308 × 272 with Shadow S in light mode.
  - **Deck:** up to three layers, depending on how many courses the folder holds. An empty folder shows the empty-folder artwork, drawn from the tokens.
  - **Hover:** the deck steps back to 5/6 and the back layers darken.
  - **Count:** the real number ("5 courses").
- **NewFolderCard:** a button with a 1.5px dashed Border-elevated outline, a + and "New Folder".
- **SkillCard:**
  - 37px, with the 1px outline drawn inside.
  - **Hover:** Page-background-hover with a Border-hover outline.
  - **Remove:** a named button.
  - **Disabled:** greyscale, Text-disabled and `aria-disabled`.
  - **Icon:** a slot. The docs use the Hard skills artwork, saved at `apps/shell/public/samples/skill-hard-skills.svg`.
- **New icon:** `CollectionPlayIcon`, copied from Figma.
- **Shared:** every card uses the CardBase title, which is a button whose hit area stretches over the card.
- **Shell:** four pages with frames at 1:1, and a shared `CardGroup` for the matrices.
- **Tests:** `e2e/{course,category,folder,skill}-card.spec.ts` (16 checks).
- **Inventory:** 56 components in code, 21 Figma-only.

## Fixed in Figma
- **Folder sets:** the deck, the empty artwork and the New Folder outline (22 layers in both sets) were bound to a deleted Border-elevated variable (`7423:2`, which resolved to Neutral-500 in dark). They're rebound to the current Border-elevated (`12113:10242`).

## Mismatches recorded (Design to update)
- **Course New pill:** a plain frame with a raw `#E95C7B` fill and `#FFFFFF` text. Code uses Danger-400 and Neutral-25. It could use the Badge (New), as the Category card does.
- **Course state names:** the rest state is Enabled in the dark set and Default in the light set.
- **Folder info gap:** 4 on the Default variants, but 8 on Hover and on 0 courses. Code uses 4 everywhere.
- **Folder set names:** Card/Folder (dark) against Card/folder (light).
- **Skill illustration:** the card's Illustrations set (`8990:21241`) is no longer on any page, so the instances point at a deleted component.
- **Category mobile height:** 238 in Figma, because it gives the 21px title a 24px box. Code is 235.
- **Category tooltip:** `cards.md` shows Customer Success as a link, but Figma's tooltip is plain text. A link would need an interactive tooltip.

## Prototype differences
- **The prototype has:** WorkspaceCourseCard, CategoryCard, SkillCard, and the mobile Course and Category cards.
- **Page-local:** the folders.
- **cards.md:**
  - It calls the Folder set "Card/category"; it's Card/Folder and Card/folder.
  - It puts the skill chip's padding at 12/8. The padding matches Figma, but its outline sits outside, so its chip is 39px.
