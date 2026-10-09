# Deactivate people v1 in Figma: comparison report

- **Figma page:** [Deactivate people · v1](https://www.figma.com/design/dBjKICnQSh7fMgnWwdtakk/People?node-id=10296-2), in the People file.
- **Built:** 2026-10-09, dark mode, from `pnpm capture-demo deactivate-people`.
- **Compared:** each Figma screen (`get_screenshot`) next to the capture PNG in `figma-export/v1/`.

## Totals (all 8 screens)
- **Unlinked components:** none. Every Library component the screens use is a real instance: Top navigation, Button, Tab items, Search, Dropdown, Checkbox, Avatar, Badge, List items, Input field, Dialog, Toast.
- **Variant errors:** none.
- **Text mismatches** (text in code vs text layers in the instance): none.
- **Raw colours:** one, the scrim behind the Dialog and the Invite modal (`#0f101480`). There's no Scrim variable; the Library draws it with an Overlay component.
- **Raw text:** 1 or 2 text layers per screen whose size and weight match no 5Mins text style. They keep the code's font settings.
- **Layout fallbacks:** 1 to 3 per screen. Frames whose children sit by CSS margins in code are placed at fixed positions, not auto layout.

## Per screen

### Deactivate one person
1. **People** (`10310:1326`): matches, apart from the shared differences below.
2. **Actions menu** (`10310:2045`): matches. The row menu (View Profile, Deactivate) uses List items instances.
3. **Confirm** (`10310:2711`): matches. The Dialog title and body wrap inside the dialog, as in code.
4. **Deactivated** (`10310:3393`): matches, with the success Toast.
5. **Deactivated tab** (`10310:4071`): matches, with one difference:
   - **Search** shows its resting outline. In code it's focused (yellow outline) because the flow just typed into it. The Search map has no focused state.

### Invite people
1. **People** (`10310:4453`): matches.
2. **Invite modal** (`10310:5112`): one difference:
   - **Email addresses** is a single-line field in Figma; in code it's a three-row text area. **The Library's Input field has no multi-line variant.**
3. **Invites sent** (`10310:5802`): matches.

## Shared differences (every screen)
- **Top navigation:**
  - The Library component has no side-nav collapse icon left of the logo.
  - Its theme icon is the moon; in code it's the sun (dark mode shows "switch to light").
  These are differences between the Library's Top navigation and the reference component, not the builder.
- **Invite People button:** the icon is the Library's default plus; in code it's Iconsax add-circle. Nested icon swaps inside instances aren't supported yet.
- **Checkboxes:** the Library's checkbox draws a 16px box in a 24px frame; code draws about 18px.

## What to fix
- **In the Library:**
  - a multi-line variant of Input field
  - a Scrim colour variable, or use the Overlay component in containers
  - align Top navigation's admin variant with the code (collapse icon, theme icon)
- **In the maps:**
  - a focused State for Search (and Input field) when the element has focus
- **In the builder (later):**
  - icon swaps inside instances (Button icons)
