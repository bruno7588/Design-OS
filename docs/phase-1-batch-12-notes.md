# Phase 1, batch 12: Tag, Slider and Calendar

Checked 2026-09-29.
- **Why this batch:** the smaller leftovers before the navigation work.
- **Sources:**
  - The Figma Library: the Badges / Tags, Slider and Calendar pages.
  - `playground/docs/design-system/calendar.md` and `src/components/DatePickerField`.
  - There's no prototype spec for Tag or Slider.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| Tag | Box (MUI has no equivalent) + `Tag` | Tags `4603:27712` dark, `12319:7504` light |
| Slider | plain `Slider`, theme only | <Slider> `10662:14039` dark, `11045:9459` light |
| Calendar | MUI X `DesktopDatePicker` + `DateField` wrapper | Calendar `11529:406` / `12204:5743`; Day item `5279:26511` / `11916:6094` |

## New dependency
- `@mui/x-date-pickers` 7.29 (the free MIT package) and `dayjs`, in `packages/components` and `apps/shell`. Bruno chose this on 2026-09-29.
- Version 7 works with MUI 5.18 and React 19.
- Engineering needs the same two packages to use the Calendar.
- The `en-gb` locale gives Monday weeks and dd/mm/yyyy dates.

## Built
- **Tag:**
  - Sizes: L 40, M 28 and S 24, with 4px padding.
  - A Border fill, rounded 8px at the bottom right only.
  - Bold icons in Text-secondary: 32, 20 and 16px. Four are Iconsax. Link (link-2) and Flashcard (note-2) are copied from Figma into `FigmaIcons.tsx`, because Iconsax React's Link2 is a different drawing and it has no note-2.
  - It's an image named by its media type.
- **Slider:**
  - A 4px Border rail and a 6px Selected track.
  - A 20px Selected thumb, with a new shadow token for Figma's 1px 1px 4px Secondary-800 at 24%.
  - Hover, focus and drag show a 42px Selected halo at 16%.
  - Disabled uses Button-background-disabled.
- **Calendar:**
  - **Field:** the Input field box. It hugs "dd/mm/yyyy" (Text-secondary) and a Linear calendar icon.
  - **Active and Error:** the border is Selected while the calendar is open. Error adds the Linear Danger icon before the calendar icon.
  - **Popover:** 352 × 344 (the stroke drawn inside, as in Figma), Cards-background, Border-elevated, radius 12, Shadow L, 8px below the field.
  - **Header:** "July 2024" in Semibold 16, with 20px chevrons.
  - **Grid:** Mon to Sun and 6 weeks of 40px days, 8px apart.
  - **Day items:** Hover (Cards-background-hover), Focus (a Selected ring), Current day (a Border-elevated ring), Selected (Secondary-500, Bold Neutral-800) and Disabled (Text-disabled).
  - **Keyboard and screen readers:** MUI X handles these, with a grid, arrow keys, Page Up and Down, Enter and Escape.

## Follow-up, 2026-09-29 (Bruno)
- **Calendar Active:** now uses Selected. I rebound the Active field border from Secondary-500 to the Selected variable in both Calendar sets (4 frames), and updated calendar.md.
- **Streak day:** the Day item Illustration variant is out of scope for the date field and isn't built.
- **Tag:** Bruno updated the set. L's corner is now 12 (radius sm), M and S stay 8, and the light copy is replaced (new set `12319:7504`). Code, the mapping and the frames follow.

## Mismatches recorded

**Figma**
- **Tag:** the Card sets don't use the Tags component.
- **Slider:**
  - There's no focus state.
  - The light copy sits on a board named "Dark mode", with only Surface colours set to Light.

**Prototype**
- **calendar.md:** it says Border for Enabled (Figma uses Border-elevated) and a 16px gap between the value and the icon (Figma uses 8).
- **DatePickerField:** it uses its own MiniCalendar, with no grid keyboard support.
- **Tag and Slider:** no components.
