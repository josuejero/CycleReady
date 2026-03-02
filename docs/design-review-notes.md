# Design Review Notes

## Context
Phase 2 mock design review (self-led) to validate the proposed wireframes before development. Roles played: QA, Product, and End User, each challenging clarity.

## Attendees
- QA (self)
- Product (self)
- End User (self)

## Notes
### QA perspective
- Error states for the log CME form are still vague; we need explicit copy for each required field and a system message for failed submissions so we can test the failure paths.
- Reminder cards lack empty states—when there are no missing uploads, we should show a reassuring message rather than collapsed space so testers know the feature ran.
- Date rules used on the key dates view are undefined. We need to document how "due soon" and "overdue" thresholds are calculated so QA can script test cases.

### Product perspective
- Reminder wording in both the dashboard and reminders view is too generic; we should tighten it to say exactly what action is needed, e.g., "Upload provider certificate metadata for Cardiology CME log." This avoids misinterpretation by clinicians.
- The release summary page uses "Ready"/"Not Ready" interchangeably with reviewer statuses, which confuses stakeholders. Standardize review-status language (Accepted/Pending/Needs Correction/Rejected) across all tiles.
- Empty history filters need guidance text that encourages logging a new activity rather than presenting a blank table.

### End User perspective
- Support upload flow doesn't make it clear whether a file is required before saving metadata. The UI should show a placeholder state prompting for attachments and clarify when metadata-only saves are acceptable.
- Reviewer detail timeline should define which actions are visible to the clinician versus reviewer to reduce anxiety about who made a change.
- The reminders/key-dates date selector needs to specify timezone context since clinicians may be near midnight when the system recalculates days remaining.

## Action Items
1. Document clear error copy and hooks for QA assertions on the log CME form (QA).
2. Define empty-state messaging for reminders, history filters, and reviewer cubes (Product).
3. Standardize review-status terminology and clarify release summary language (Product).
4. Spell out date-rule calculations and timezone assumptions in the reminders view (QA + End User).
5. Ensure support upload flow shows mandatory vs. optional metadata fields (End User).
