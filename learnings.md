---
lastSession: 5844ba5e-cc52-4a6c-9896-7d1b41ba7bfc
lastTimestamp: 2026-09-30T12:33:43.696Z
updated: 2026-09-30
---
# Learnings

Rules Bruno stated or corrected while working that aren't written down elsewhere. Written by the `learnings` skill; every agent reads this before building UI. Rules marked (×3) or more should move into `CLAUDE.md` or a skill.

## Components
- **Loading buttons hide the label and keep their Enabled width**, with or without an icon. Example: a Filled Medium "Save" keeps its width while the spinner shows. · 2026-09-28 · session 5844ba5e
- **Dropdowns and inputs have an error state.** Example: Dropdown Validation=error, built like the Input field's error. · 2026-09-29 · session 5844ba5e
- **Checkbox has an indeterminate state; disabled Checkbox and Toggle use Text-disabled.** · 2026-09-29 · session 5844ba5e
- **Callouts with more than 3 lines of supporting text collapse and expand.** · 2026-09-29 · session 5844ba5e
- **The Side drawer has a close icon.** · 2026-09-29 · session 5844ba5e
- **Fallback avatar faces sit on an opaque Border fill, never a coloured one.** Example: no purple behind the 64px fallback; the group's translucent face gets a Border backing; its info text is Text-tertiary with a 1px outline. · 2026-09-29 · session 5844ba5e
- **Table rows use the Figma Selected and Hover row variables, and table checkboxes are 24px.** · 2026-09-29 · session 5844ba5e
- **The Empty state has a dashed Dropzone surface**, as the course builder uses. · 2026-09-29 · session 5844ba5e
- **Every card has a hover state, on every device.** · 2026-09-29 · session 5844ba5e
- **The back button over media is Neutral-900 at 50% with a Neutral-25 arrow, and only over media.** Example: over a video, image or document in the mobile app; elsewhere it's the plain back button. · 2026-09-29 · session 5844ba5e
- **The full-screen modal close button is 40px.** · 2026-09-29 · session 5844ba5e
- **Listbox carets sit 16px from the end, on both the top and bottom variants.** · 2026-09-30 · session 5844ba5e
- **Quiz option rows keep their hover after the answer is checked.** · 2026-09-30 · session 5844ba5e
- **Ranking: numbers on medals are Neutral-25; from rank 4 the number is Text-tertiary in both modes.** · 2026-09-30 · session 5844ba5e
- **Admin: "Exit Admin" is a Small button.** · 2026-09-29 · session 5844ba5e

## Layout
- **Cards have a 12px corner on every size and device.** Example: mobile Lesson, Marketplace and the large Learning path and certificates all use radius SM (12). (×2) · 2026-09-30 · session 5844ba5e
- **Every card has Shadow S in light mode**, whether or not Figma draws it. (×2) · 2026-09-30 · session 5844ba5e
- **Top-level mobile app bars are 64px tall**, with badges on Input-background. · 2026-09-29 · session 5844ba5e
- **The scrim is Neutral-900 at 50% in both modes**, through the Scrim token. · 2026-09-29 · session 5844ba5e
- **Navigation and inline field icons are 20px.** Example: Side and Top navigation icons, the Inline input's status icons. (×2) · 2026-09-29 · session 5844ba5e

## Copy
- **British spelling applies to Figma variant names too.** Example: Type=Categorise, not Categorize. · 2026-09-30 · session 5844ba5e

## Platform
- (none yet)

## Data
- (none yet)

## Process
- **Figma naming is part of the job.** Default states are "Enabled", properties get real names (Rank, not "Property 1"), and placeholder variants such as "null" are deleted after swapping any instances to a real one. · 2026-09-30 · session 5844ba5e
- **When Figma and code disagree and Bruno picks a value, change both.** Claude may edit the Figma Library, and fixes the prototype's docs and code too, so the three sources agree. Example: "make it 12px everywhere, Figma and code"; "fix the prototype input.md according to Figma". (×2) · 2026-09-29 · session 5844ba5e
- **Use an existing token before adding a value.** Example: the Bottom sheet scrim uses the Scrim token and Figma's Overlay component. · 2026-09-29 · session 5844ba5e
- **Commit and push to GitHub when a batch is done**, including project settings such as `.claude/settings.json`. · 2026-09-28 · session 5844ba5e
- **Phase 1c waits on engineering**; everything else in Phase 1 was finished first. · 2026-09-30 · session 5844ba5e
- **Granola means Bruno's own account**, through the project `granola` MCP server, never the claude.ai connector signed in as Divjot. · 2026-09-30 · session 5844ba5e
