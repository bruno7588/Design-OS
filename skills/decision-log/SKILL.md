---
name: decision-log
description: "Keeps each feature's decision log in the Design OS vault up to date: reads the meeting notes linked to a feature and appends new decisions to '20 features/<Feature>/decisions.md' with what was decided, why, options rejected, date and source meeting. Use after granola-sync, when Bruno asks what was decided about a feature, or asks to update or log decisions. Input: a feature name, or 'all'."
---

# Decision log

Works in the vault at `~/Documents/Projetos/5Mins/Design-OS-vault`. Read the vault's `CLAUDE.md` first (frontmatter and rules). Meeting notes come from `granola-sync`.

## Steps

1. **Resolve the feature.** Look it up in `20 features/_index.md` by name or alias.
   - For `all`, take every feature linked from a meeting note that still has it missing from `logged`.
   - If the feature isn't in the index, stop and ask Bruno whether to add it.
2. **Find its meetings.** Meeting notes in `10 meetings` whose `features` includes `[[Feature]]` and whose `logged` list doesn't. Oldest first.
3. **Collect the decisions.** From each note's `## Decisions`, take the ones about this feature: the decision, `Why:`, `Rejected:`, the meeting date and the note name.
   - Leave out decisions about other features in the same meeting.
   - If a reason is missing and the note has a `granola_id`, you may check the transcript with `get_meeting_transcript` on the project `granola` server (Bruno's account). Otherwise write "Reason not stated".
   - Never invent a reason.
4. **Set up the feature if it's new.** If `20 features/<Feature>/` has no `decisions.md` or `overview.md`, create them from `_templates/decisions.md` and `_templates/feature-overview.md`.
   - Replace the Templater tags with the feature name.
   - `aliases` comes from the index.
5. **Append to `decisions.md`.** Newest first, straight after the intro line and above older entries, one entry per decision:
   ```markdown
   ## 2026-09-14: Assessments ship without timed questions
   - **Decided:** the first release has no timed questions.
   - **Why:** the timer needs backend work that won't fit this sprint.
   - **Rejected:** a client-side timer (easy to bypass).
   - **Source:** [[2026-09-14 Weekly Product Planning]]
   ```
   - **Superseded decisions:** if a new decision changes an earlier one in the log, add `- **Supersedes:** 2026-09-01, <title>`. Leave the old entry as it is.
   - **Duplicates:** if the same decision is already logged from the same source, skip it.
6. **Mark the meetings.** Add the feature to each meeting note's `logged` list. When every feature in `features` is in `logged`, set `status: logged`. Only touch the frontmatter.
7. **Report:** per feature, the decisions added (titles and source meetings), any skipped as duplicates, and any with no reason given.

## Rules
- Append-only: never delete or rewrite an entry in `decisions.md`.
- Safe to re-run: `logged` stops a meeting being read twice for the same feature.
- British English, sentence case, no em dashes.
