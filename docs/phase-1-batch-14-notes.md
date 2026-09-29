# Phase 1, batch 14: Mobile navigation (Tab nav, Top nav/App)

Checked 2026-09-29.
- **Why this batch:** the learner app's chrome. Bruno asked to finish the remaining components before Phase 1c; Cards come next.
- **Sources:**
  - The Figma Library: the Navigation page.
  - `playground/docs/design-system/navigation.md` (Mobile App Navigation).
  - `src/components/mobile/{TabNav,TopNav}`.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| TabNav | BottomNavigation + BottomNavigationAction (theme) | Tab nav `1324:35285` / `9897:18192` |
| AppTopNav | Box (header) + Chip + Search + Avatar + IconButton | Top nav/ App `1910:18375` / `11235:11758` |

## Built
- **Tab bar:** `MuiBottomNavigation` and `MuiBottomNavigationAction` theme overrides, so a plain `<BottomNavigation showLabels>` renders the 5Mins bar.
  - The bar is 375 × 66: Page-background, a 1px Border on top (drawn inside), padding 8/16.
  - Each tab takes an equal share (69px), with padding 4 and a 4px gap: a 24px icon over a Regular 10/1.4 label.
  - Selected turns the icon and label Selected. MUI's label growth and ripple are off.
- **TabNav wrapper:** the five learner tabs (Home, SearchNormal1, Award, UserSquare Bold, and a custom Feed glyph), a nav landmark named "Main", and aria-current on the current page. `value={null}` is Page=Enabled.
- **AppTopNav:** one component with a `page` prop for the eight Figma pages:
  - **Home:** Chips 8px apart, then Streak (FlashCircle) and Notifications (NotificationBing), Bold 28, 16px apart, with an 8px Text-error Nudge dot.
  - **Search:** the 5Mins Search (M).
  - **Progress:** Chips 16px apart.
  - **Feed:** a centred Bold 16 title.
  - **Profile:** Avatar 40, an 18px settings badge, name Bold 14 (the h1), role Regular 12/1.2, and a 40px Primary-500 add button.
  - **Detail page:** back, a centred title and a 32px action slot.
  - **Skill:** back, the skill icon with a Bold 14 title, and more options.
  - **Lesson feed:** transparent, back on a dark 50% fill, and the points with the Points illustration.
  - **Sizes:** 64px on the top-level pages and 56 on the rest. The Border is drawn inside.
  - **Status bar:** `statusBar` adds an aria-hidden iOS stand-in for prototypes. It's off by default, because the phone draws the real one.
- **New icons:**
  - `FeedIcon` and `MoreVerticalIcon` (the Remix RiMore2Line), copied from Figma.
  - `PointsIllustration` (Illustrations/ Progress, Type=Points).
- **Shell:** Tab navigation and App top navigation pages with Preview, Code, Guidelines and Compare. Their frames are at 1:1 in `apps/shell/public/figma/`.
- **Tests:** `e2e/tab-navigation.spec.ts` and `e2e/app-top-navigation.spec.ts` (9 checks).

## Mismatches recorded
- **Lesson feed points (Design to update):** "45 Pt" uses Text-primary, so it turns dark over the video in the light set. Code keeps it Neutral-25, like the arrow.
- **Chip gaps:** Home spaces its chips 8px apart and Progress 16. It's the same group, so it's worth settling on one.
- **Detail page:** the title sits 4px right of centre, because the sides are 40 (back) and 32 (the slot).
- **Settings badge:** at 18px it's a small touch target. The Guidelines suggest the avatar opens settings too.
- **Focus:** Figma has no focus state for tabs or icon buttons. Code adds the 2px Primary ring used elsewhere.
- **Mobile web:** not built. It's the browser's own chrome, for mockups.
- **Skill icon:** the skill illustrations come with the Illustrations batch. The docs use an Iconsax stand-in until then.

## Follow-up (Bruno, 2026-09-29)
- **Top-level bars are 64px:** Home, Search, Progress and Feed went from 65 to 64 in both Figma sets (the variants are now 89 tall with the status bar), and in code. Profile was already 64.
- **The settings badge uses Input-background:**
  - In Figma it was bound to a deleted Input-background variable (`7625:28470`: solid Neutral-50 light, Neutral-700 dark).
  - It's now bound to the current Input-background (`10830:146`: Neutral-200 / Neutral-500 at 16%) in both sets.
  - Code uses the `inputBackground` token.

- **Back over media (Bruno):** only when the back button sits over a video, image or document is it Neutral-900 at 50% with a Neutral-25 arrow, in both modes. Code: `backOverMedia` on Detail page, Skill and Lesson feed (on by default for Lesson feed); otherwise it's Input-background with a Text-primary arrow. Both Figma sets are now bound to those variables (the dark set had a raw `#0F1014`, the light set had lost the fill). Code already did this.

## Prototype differences
- **navigation.md** is fixed to match Figma:
  - Home has a divider.
  - The header chips are the DS Chip: 6/12 padding, Border-elevated.
  - The bell is `notification-bing`.
  - The settings badge is 18px with a 12px icon.
  - It now lists the header heights.
- **`mobile/TopNav`:**
  - It uses the plain `Notification` bell.
  - It hand-builds the chips (with 12/8 padding) and the search.
  - It shows no divider on Home.
- **`mobile/TabNav`:** matches, and already sets aria-current.
