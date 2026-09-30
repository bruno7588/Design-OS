# Phase 1, batch 20: Quiz options and Ranking badge

Checked 2026-09-30.
- **Why this batch:** the first Gamification batch. Learning path and Certificate instances come next (they share the Learning path illustrations), then the illustration sets.
- **Sources:**
  - The Figma Library: the Gamification page.
  - The prototype documents only the illustrations (`gamification.md`), so Figma is the only spec here.
- **Also in this batch:** the Listbox caret sits 16px from the end on both sides (Bruno). In Figma, the light Bottom variant moved from 24 to 16.

| Component | MUI | Figma |
|---|---|---|
| QuizOptions, QuizExplanation | Radio in a radiogroup | Quiz/Options `5504:24966` / `12112:10047` (22 variants) |
| RankingBadge | Box | Ranking, leaderboard `2613:26421` / `8442:6198` (4) |

## Built
- **QuizOptions:**
  - **Group:** a radio group named by the question, where the arrow keys move between answers.
  - **Rows:** Cards-background, radius 12, padding 12, with a 3px inner shadow along the bottom (Cards-background-hover).
  - **Radio:** our radio at 20px.
  - **Selected:** Secondary-500, with a Secondary-600 edge and SemiBold Neutral-800 text.
  - **Revealed** (`answer` and `revealed`):
    - The picked right answer turns Success-500 with a tick.
    - The picked wrong answer turns Danger-500 with a cross.
    - The other rows show a tick or a cross in Text-primary.
    - Hidden text tells screen readers "your answer, correct", "your answer, incorrect" or "the correct answer".
  - **Hover:** Cards-background-hover with an Input-background edge, while answering.
- **QuizExplanation:** "Well done!" or "Not quite!" (Bold 16, in Success-500 or Text-error) with the Figma emoji, then the reason in Text-secondary. It's announced as a status.
- **RankingBadge:**
  - **Size:** 32px.
  - **1 to 3:** a gold, silver or bronze medal (Figma artwork) with a white number.
  - **From 4:** the number alone in Text-disabled.
  - **Name:** "Rank n".
- **Artwork:** `Gamification/art` holds the three medals and the two explanation emojis.
- **Shell:** two pages with frames at 1:1.
- **Tests:** `e2e/{quiz-options,ranking-badge}.spec.ts` (7 checks).
- **Inventory:** 67 components in code, 10 Figma-only.

## Follow-up (Bruno, 2026-09-30)
- **Quiz hover after checking:** plain rows (the ones you didn't pick) keep their hover after checking, as in Figma.
- **Quiz radio:** in Figma, the four disabled variants' old radio glyph is swapped for the radio-button set (Disabled=true, 20px).
- **Ranking property:** in Figma, "Property 1" is renamed Rank in both sets, and the code mapping follows.

## Mismatches recorded
- **Ranking number colour (Bruno, 2026-09-30):** Neutral-25 on the medals, bound in both sets. The light set was raw `#FFFFFF`; the dark set was raw orange, grey and bronze.
- **Ranking (Design to update):** Rank 4 is Text-disabled in light but Text-tertiary in dark.
