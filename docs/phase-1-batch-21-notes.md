# Phase 1, batch 21: Learning path, Certificate card, Level illustration

Checked 2026-09-30.
- **Why this batch:** the Gamification page after Quiz options and Ranking badge, from Bruno's order.
- **Sources:**
  - The Figma Library, Gamification page.
  - The prototype's `src/assets/level-illustrations`, whose SVGs were exported from the Figma set.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| LearningPathCard | CardRoot + Button + ProgressBar + IconButton | Learning path `5514:8463` / `11984:7015` (17 variants) |
| CertificateCard | Box + Button | Certificate instances `5514:2390` / `8442:6119` (8 variants) |
| LevelIllustration | img | Illustrations/ Learning path `9120:9437` / `11196:8794` (32 variants) |

## Built
- **LevelIllustration:**
  - 32 SVGs: levels 1 to 5, Advanced, Expert and Master, each small (56) or large (72), enabled or disabled.
  - The disabled files grey themselves with a luminosity blend. The blend only works against what's behind the image, so it's set on the `<img>`, as Figma blends it on the card.
  - `levelIllustrationUrl()` for anywhere that needs just the file.
- **CertificateCard:**
  - Tiers Master (dark text), Expert and Advanced (light text), on the tier backgrounds exported from Figma.
  - **small** 343, **md** 408, **large** 900.
  - Contents: the medal with a soft copy behind it, then a subtitle or a Download button, and a tick named "Earned".
  - A 4px inner edge on the right and bottom in the tier colour.
- **LearningPathCard:**
  - Type Level or Certificate; states In progress, Completed, Disabled, and Pending for a certificate; sizes s, md, l.
  - The chevron on s is a real button with `aria-expanded` that shows or hides the other topics.
  - Progress is named "80 of 120 modules".
  - A completed certificate renders a CertificateCard.
- **New tokens:** `palette.gamification.certificateMaster` (#FF7B00), `certificateExpert` (#822FAF) and `certificateAdvanced` (#5E60CE), the tier edge colours.
- **Button fix:**
  - A trailing icon (`endIcon`) is now sized like a leading one (16/20/24) and spaced by the button's gap. That side's padding is one step tighter.
  - Before this, iconsax icons without a size drew at 0 × 0.
  - It also applies to the Share modal's buttons.
- **Shell:** three pages with frames at 1:1.
- **Tests:** `e2e/{learning-path,certificate-card,level-illustration}.spec.ts` (12 checks).
- **Inventory:** 70 components in code, 7 Figma-only.

## Mismatches recorded (Design to update)
- **Raw colours:**
  - The inner edges are raw `#00CEE6` and `#18A957` on the Learning path, and raw tier colours on the certificates. Code uses Primary-500, Success-500 and the new tokens.
  - The certificate text is raw `#262933` and `#FFFFFF`. Code uses Neutral-800 and Neutral-25.
- **Old components:**
  - The buttons are an older Medium: 45px on s, 37px on l, and the certificate's Outlined is 145 × 45. Code uses the current Medium (41).
  - The small Expert and Advanced certificates use `Disabled=true` medals from an older Illustrations copy (`5555:5803`, `5504:24496`). The large ones use another old copy. Code uses the current set, enabled.
- **Copy:**
  - "Keep learning" on l should be "Keep Learning" (a button label).
  - "Certificate Pending" should be "Certificate pending" (sentence case).
- **Layout:**
  - md is a fixed 122px tall. Code hugs (88).
  - The disabled s certificate is padding 12, radius 8. Code uses 16 and 12, like the other s cards.
  - The completed title row stacks two tick icons.
- **Shadow S:** the Learning path draws no Shadow S in light. Code adds it, following the card rule.
- **Ranking badge (from batch 20):** rank 4 is Text-tertiary in dark and Text-disabled in light. Still open.

## Prototype differences
- The prototype has the level illustrations only; no Learning path or Certificate component.
