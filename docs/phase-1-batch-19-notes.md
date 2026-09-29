# Phase 1, batch 19: Gaps (Input field set, Tabs bar, Listbox)

Checked 2026-09-29.
- **Why this batch:** the sets that were still Figma-only outside Gamification. Most need only a mapping.
- **Also in this batch** (Bruno, 2026-09-29): the Scrim is now Neutral-900 at 50% in both modes (it was 25% in light), to match the Figma Overlay component. The token, the prototype's `tokens.css` and `layout.md`, and the overlay docs follow.

| Figma set | Code | Kind |
|---|---|---|
| Input field `11180:1982` / `12114:20552` (Type=Outlined, Radio, Integer, Inline) | InputField, InputRadio, InputInteger, InputInline | Mapping (`inputFieldSetFigma`) |
| Tabs `8497:24855` / light instance `11975:2581` | MUI Tabs + the 5Mins Tab | Mapping (`tabsBarFigma`) |
| Listbox `9162:1042` / `11923:3466` | MuiMenu + MuiList (+ Divider) | Mapping (`listboxFigma`), noted on the Dropdown Compare tab |

## Built
- **Mappings:**
  - The Input field parent set, the Tabs bar and the Listbox now count as in code.
  - The Input, Tabs and Dropdown Compare tabs each gain a row about them.
- **Inventory:** 65 components in code, 12 Figma-only: Emojies (discarded) and the Gamification and Empty state sets.

## Follow-up (Bruno, 2026-09-29)
- **Emoji removed:** the Emojies set was discarded, so the Emoji component, its docs page, spec, artwork and mapping are gone. I also deleted the light board I'd added in Figma. The set itself stays in the Library, so the inventory lists it as Figma-only until it's deleted there.
- **Listbox caret built:**
  - The Dropdown takes `caret` and `menuPosition` (`bottom` or `top`).
  - Any Menu gets it through the `ds-menu-caret-bottom` or `ds-menu-caret-top` class on its paper.
  - The caret is a 16 × 8 Cards-background triangle with a 1px Border edge, 24px from the end, on the side that faces the field. The list scrolls instead of the surface, so the caret isn't clipped.
- **Listbox group titles built:**
  - Dropdown options take `group`.
  - **Titles:** SemiBold 14/1.5 in Text-tertiary, padding 8/4.
  - **Dividers:** from the second group on, a Border line inset 4px, 4px gaps, then 12 above the title.
  - **Plain MUI menus:** a `ListSubheader` and a `Divider` inside get the same look.
- **Accessibility:** MUI Select makes every child an option, so a group title could be picked. A small `GroupTitle` wrapper ignores those props, so titles are presentational and can't be picked, and keyboard focus skips them.
- **Figma detail:** the Top caret sits 16 from the end, while the Bottom one is 24. Code uses 24 for both.
