---
name: 5mins-prototype-builder
description: "Build interactive HTML prototypes that match the 5Mins.ai admin platform chrome (top header, page title row, tabs, sidebars, modals, floating guide). Use whenever the user wants to mock up, prototype, or visualize a new feature, page, or change to the 5mins admin UI, references a Jira ticket (especially DEV-prefixed) tied to admin work, or shares screenshots of the 5mins platform with intent to design or modify it. Trigger this skill even when the word \"prototype\" is not used, as long as the work is admin-UI design output."
---

# 5Mins UI Prototype Builder

This skill produces single-file interactive HTML prototypes that match the 5Mins.ai admin platform chrome exactly, so feedback focuses on the new surface and not on layout drift.

## Companion skills

This skill is the structural layer. Pull visual tokens from the dedicated skills, do not duplicate their values here:

- `5mins-brand-colors` for the raw palette
- `5mins-surface-colors` for backgrounds, borders, button surfaces
- `5mins-typography` for type scale, weights, line heights
- `5mins-iconography` for icon sizing and variants
- `buttons` for button variants, sizes, states

If those skills are not loaded, ask the user before falling back to ad hoc values.

## Workflow

### 1. Capture intent and scope

If a Jira ticket is referenced, fetch it through the Atlassian MCP integration (workspace: `5mins.atlassian.net`). DEV-prefixed tickets have historically returned empty via JQL by key, likely a permissions scope; if the fetch returns nothing, ask the user to paste the ticket body directly rather than guessing.

If screenshots are provided, identify:
- Which surface they show (creation flow, edit page, modal, list view, settings panel)
- What chrome elements appear (top header, page title row, tabs, left sidebar, right sidebar, floating guide)
- What is in scope for the change vs. what is incidental UI from the screenshot

Confirm scope before adding anything not explicitly in the ticket. Flag additions clearly so the user can accept or reject them.

### 2. Build the prototype

Start from `assets/admin-chrome.html`. It contains the base shell with all standard chrome elements, design tokens as CSS variables, the dark mode input fix, and clearly labelled drop-in zones for the new surface.

Single-file HTML output. No build step, no framework. Self-contained so it can be published to a static host or pasted into a prototype tool.

### 3. Critical technical fix: dark mode input rendering

Browsers in dark mode corrupt native input field rendering, making white-background inputs unreadable. The scaffold includes this fix; if writing custom inputs outside the scaffold, copy these rules:

```css
input,
textarea,
select {
  color-scheme: light;
  -webkit-box-shadow: inset 0 0 0 1000px var(--surface-input-bg);
  -webkit-text-fill-color: var(--text-primary);
}
```

This is non-negotiable for any prototype that contains a form field.

### 4. Common chrome patterns

See `references/chrome-patterns.md` for the full anatomy of each pattern. Quick index:

- **Top header**: tenant name top-left, Exit Admin + theme toggle + Account top-right
- **Page title row**: title left, action buttons + close X right
- **Tabs**: underline style, active tab in amber with bold label
- **Right sidebar**: section header + icon menu items (Add Content pattern)
- **Modal**: centered card with large amber alert icon, two-button footer (outlined secondary + filled amber primary), used for unsaved changes and similar confirmations
- **Edit page header**: title, AI sparkle, three-dot menu, primary action button, close X
- **Floating Guide button**: bottom-right pill, dark navy, cyan checkmark, label + numeric badge

### 5. Before/after framing

When the prototype changes something a learner sees (not just admin behaviour), build a side-by-side or toggle showing the learner-facing result before and after. This is a recurring pattern; do not skip it just because the ticket only describes the admin change.

### 6. Update Jira after publishing

**Always ask before writing to a ticket.** Never push an update, comment, link, or description change to Jira without explicit confirmation in the chat for that specific edit. Read-only fetches are fine; any write requires a go-ahead.

When the prototype is ready, propose the update for confirmation. The proposal should cover:
- The prototype artifact link to attach
- Any related pattern tickets to reference (e.g., DEV-3787 for the unsaved-changes pattern)
- A draft of any description edit, written in business-focused language. No implementation details, no technical constraints, no library names. Implementation autonomy stays with the development team.

Wait for explicit approval before calling any Atlassian write tool.

## Reference assets

- `assets/admin-chrome.html` is the base scaffold. Always start here.
- `references/chrome-patterns.md` documents each chrome element with the exact structure and tokens used.
- `references/jira-workflow.md` covers the Atlassian MCP calls and ticket conventions.