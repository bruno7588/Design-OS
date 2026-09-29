# Phase 1, batch 19: Gaps (Input field set, Tabs bar, Listbox, Emoji)

Checked 2026-09-29.
- **Why this batch:** the sets that were still Figma-only outside Gamification. Most need only a mapping; Emoji needs artwork.
- **Also in this batch** (Bruno, 2026-09-29): the Scrim is now Neutral-900 at 50% in both modes (it was 25% in light), to match the Figma Overlay component. The token, the prototype's `tokens.css` and `layout.md`, and the overlay docs follow.

| Figma set | Code | Kind |
|---|---|---|
| Input field `11180:1982` / `12114:20552` (Type=Outlined, Radio, Integer, Inline) | InputField, InputRadio, InputInteger, InputInline | Mapping (`inputFieldSetFigma`) |
| Tabs `8497:24855` / light instance `11975:2581` | MUI Tabs + the 5Mins Tab | Mapping (`tabsBarFigma`) |
| Listbox `9162:1042` / `11923:3466` | MuiMenu + MuiList (+ Divider) | Mapping (`listboxFigma`), noted on the Dropdown Compare tab |
| Emojies `10587:2256` / light board `12368:97` (new) | Emoji | New component and docs page |

## Built
- **Emoji:**
  - **Plain emojis** (Angel, Smile, Hand waving, Gossip, Shy, Tenant) are drawn as SVG from the tokens, so the face follows the mode: an Input-background face with Neutral-600 features.
  - **Gradient emojis** (Love, Sad smile, Pleased, Starving, Silly, Got an idea, Laugh with tear) are the Figma artwork as 240px PNGs. They look the same in both modes.
  - **Accessibility:** decorative by default. Pass a label when the emoji carries meaning.
- **Mappings:**
  - The Input field parent set, the Tabs bar and the Listbox now count as in code.
  - The Input, Tabs and Dropdown Compare tabs each gain a row about them.
- **Tests:** `e2e/emoji.spec.ts` (4 checks).
- **Inventory:** 66 components in code, 11 Figma-only (all on the Gamification and Empty state pages).

## Changed in Figma
- **Emojies light version:** Emojies had no light version, only the light Avatars' fallbacks. I added an "Emojies, light mode" board (`12368:97`) with an instance of each.

## Mismatches recorded
- **Listbox (Code to update):** the Caret variant (a pointer towards the field) and the SemiBold Text-tertiary group titles aren't built.
- **Emojies (Design to update):** the spellings "Emojies" and "Straving".
