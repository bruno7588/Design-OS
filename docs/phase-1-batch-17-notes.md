# Phase 1, batch 17: People and offer cards (Instructor, External training, Marketplace)

Checked 2026-09-29.
- **Why this batch:** the last of the three card batches. It finishes the Cards page. The remaining overlays and gaps come next.
- **Sources:**
  - The Figma Library: the Cards page.
  - `playground/docs/design-system/cards.md`, which covers the Instructor card. External training and Marketplace aren't documented.
- **Per-property detail:** each component's Compare tab.

| Component | Built on | Figma |
|---|---|---|
| InstructorCard | Box (article) | Card/Instructor `5149:27386` / `9926:2477` (3 variants) |
| ExternalTrainingCard | Box (article), via ProductCard | Card/External training `5908:21523` / `9577:3582` (3) |
| MarketplaceCard | Box (article), via ProductCard | Card/Marketplace `5213:4524` / `9577:3648` (6) |

## Built
- **InstructorCard:**
  - **Sizes:** 404 × 160 on desktop, 340 × 137 on mobile.
  - **Photo:** 120 wide.
  - **Text:** the name (the card's heading and button) and a bio clamped to two lines.
  - **Skills:** up to two rows, each a 16px skill icon slot (Icons/Skill Icon) and one line of text. They're a list named "Skills".
  - **Hover:** Cards-background-hover, on desktop.
- **ProductCard:** one layout for External training and Marketplace, which share their structure. It's exported as two components:
  - **ExternalTrainingCard:** title, provider and price. 300 × 325 on desktop, 272 × 300 on mobile.
  - **MarketplaceCard:**
    - **Subscription:** a three-line description.
    - **Coaching:** the coach's name.
    - **Reward:** the brand name, and a price in points after the Jewels illustration, read as "2000 points".
    - **Mobile:** radius 8 and a 140px image, as in Figma.
- **Artwork:** `Card/illustrations/jewels.svg`, copied from the prototype's `progress-illustrations`.
- **Shell:**
  - Three pages with frames at 1:1. The light External training set is 996 wide; the dark one is 968.
  - The Instructor sample uses the prototype's `learning-program-design-and-delivery` skill icon.
- **Tests:** `e2e/{instructor,external-training,marketplace}-card.spec.ts` (9 checks).
- **Inventory:** 59 components in code, 18 Figma-only. Every Cards-page set is now in code.

## Follow-up (Bruno, 2026-09-29)
- **Radius 12 on every card:** in Figma, the mobile Marketplace (6 variants) and mobile Lesson (12 variants) went from 8 to 12. Code has no 8 left.
- **Every card has a hover state.** In Figma, 48 Hover variants were added, 24 per mode:
  - **Mobile Lessons:** Cards-background-hover, and the title turns Text-button-hover (not when disabled).
  - **Mobile Assessments, Resources, Instructor and External training:** Cards-background-hover.
  - **Mobile Courses:** Cards-background-hover, and the picture zooms 1.12×.
  - **Mobile Category:** the images zoom and the glow goes to 48%, as on desktop.
  - **Marketplace:** gains a State property (Enabled, Hover) on all six variants.
  - **Skipped:** the disabled mobile Category card, whose desktop hover only adds the tooltip.
  - **Code:** every card now hovers on every device, and the matrices show the new variants.

## Mismatches recorded (Design to update)
- **Reward icon layer:** the Jewels illustration sits in a layer named "Illustrations/Certificate".
- **Truncation:** the Instructor bio and the Subscription description are cut by hand ("…") in Figma. Code clamps them at 2 and 3 lines.
- **Docs:** `cards.md` doesn't cover External training or Marketplace yet.
