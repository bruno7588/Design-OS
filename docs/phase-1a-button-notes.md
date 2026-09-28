# Phase 1a: Button, Figma and prototype check

Checked 2026-09-28. Reference: `packages/components` (MUI 5.18 + 5Mins theme).
Sources: the prototype (`playground/docs/design-system/buttons.md`, `playground/src/styles/tokens.css`, `playground/src/components/Button`) cross-checked with the Figma Library (`EC26cSVe9KNTCWXvYovakw`, dark board `10825:3269`, light board `12141:7567`).
Rule: the prototype is the reference; where it disagrees with Figma, Figma wins and the mismatch is listed here.

## Verified (Playwright, `apps/shell/e2e/button.spec.ts`)
- Every boxed configuration: Small 33px, Medium 41px, Large 48px, in all states.
- Link: Medium 500, 14 / 21 / 24px tall.
- Keyboard focus: 2px ring, 2px offset.
- Loading keeps the width and the accessible name (`aria-busy`, `aria-label`).
- Radius 12px, padding and icon gap confirmed with `get_design_context` on node `12141:8260`.
- Every light and dark token value pulled with `get_variable_defs` matches the prototype's `tokens.css`, except the one listed below.

## Where the reference follows Figma, not the prototype
| Property | Figma | Prototype | Reference |
|---|---|---|---|
| Dark `Primary-button-background-pressed` | `#00AFC4` (Primary-600) | Primary-700 `#008393` | Figma |
| Link label | Medium 500, Paragraph S/M/L (updated 2026-09-28) | Bold 700, Button S/M/L | Figma |
| Link colours | Filled ladder: `Primary-Button-background` / `-hover` / `-pressed`, disabled `Text-disabled` | `Text-button-outlined` / `Text-button-hover` | Figma |
| Primary Text colours | Filled ladder, same as Link | `Text-button-outlined` / `Text-button-hover` | Figma (light hover is now Primary-800, was 700) |
| Danger / Warning / Success text hover | `Text-error` / `Text-warning` / `Text-success` | No hover rule | Figma |

## Open: needs a decision
- **Loading.** Figma keeps the label and puts the spinner in the icon slot when the button has an icon, and shrinks to the spinner when it has none (for example Warning Large goes from 104px to 72px wide). The prototype and this reference always hide the label and keep the width. Which is right?

## Out of date, to update
- Figma light board `12141:7567` still has the old Link (Bold, `skip-ink: none`). It looks like a separate copy of the set rather than the dark board in light mode.
- `playground/docs/design-system/buttons.md` and `tokens.css`: dark pressed, Link, Text ladders (table above).
- `playground/docs/design-system/design-system-guidelines.md` quick reference says buttons use `--radius-s` (8px). Figma and `buttons.md` say 12px.
- `skills/buttons`, `skills/5mins-brand-colors`, `skills/5mins-typography`, `skills/5mins-surface-colors`, `skills/5mins-iconography` in Design OS are older copies. The prototype's `5mins-design-system` skill and `docs/design-system/` are current.
- `buttons.md` shows Title Case labels. The copy-review skill says sentence case; the Guidelines tab uses sentence case.

## Shell notes
- The shell chrome uses stock MUI Tabs, Select, Switch, ToggleButton, List and Card with the 5Mins theme. Their 5Mins reference versions arrive in later batches (Tabs is in the next one).
- Code blocks use a system monospace font; there is no mono token.
- `SparkleIcon` was ported to `packages/components` without its `gradient` option.
