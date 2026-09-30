# Meeting note format

An example of a finished note (the content is illustrative).

```markdown
---
type: meeting
date: 2026-09-14
granola_id: 0fa007f7-c384-4897-a75c-bb0473593151
granola_url: https://notes.granola.ai/d/0fa007f7-c384-4897-a75c-bb0473593151
attendees: [Bruno Carvalho, Nicolas Darriulat, Divjot Singh]
features: ["[[Assessments]]"]
status: synced
logged: []
---
# Weekly Product Planning

## Summary
Planned the sprint around the Assessments rework. Agreed the scope of the first release and who owns the question bank migration.

## Decisions
- **Assessments ship without timed questions in the first release.** Why: the timer needs backend work that won't fit this sprint. Rejected: a client-side timer (easy to bypass).
- **Question bank stays per course for now.** Why: Reason not stated.

## Open questions
- Should admins be able to reorder questions after an assessment is published?

## Actions
- [ ] Bruno: share the assessment builder flows in Figma by Friday
- [ ] Nicolas: estimate the timer backend work

## Source
[Granola note](https://notes.granola.ai/d/0fa007f7-c384-4897-a75c-bb0473593151)
```

## Notes
- **Decisions** start with the decision in bold, then `Why:` and `Rejected:` (leave out `Rejected:` when nothing else was discussed).
- **Sections:** keep all four even if one is empty ("None."), so Dataview queries and `decision-log` can rely on them.
- **Attendees:** full names as Granola gives them; drop email addresses.
