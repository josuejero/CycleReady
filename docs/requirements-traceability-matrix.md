# Requirements Traceability Matrix

This matrix tracks key Phase 4 requirements from the story review and shows where they land in acceptance criteria and functional tests. It keeps the QA runway honest by preventing requirements from drifting away from test coverage.

| Requirement ID | Requirement description | Source story or artifact | Acceptance criteria (summary) | Functional test case(s) |
| --- | --- | --- | --- | --- |
| RQ-001 | New CME entries appear immediately in History when required fields are filled. | Story: “Clinician: log a CME activity” (see `docs/acceptance-criteria-v1.md`). | Submission adds the entry to History at the top within the same session without a reload. | `TC-001` |
| RQ-002 | Credits are required for submission; missing credits block form entry and show inline validation. | Story: “Clinician: log a CME activity” + Phase 4 improved criterion from `docs/story-review-before-after.md`. | Submit button stays disabled (or rejected) when credits are blank and shows an inline message next to the credits field. | `TC-002` |
| RQ-003 | Dashboard surfaces reminders when supporting documentation is still needed for documentation-required entries. | Story: “Clinician: attach supporting documentation metadata” + Phase 4 reminder criterion. | Dashboard displays a reminder banner with a link to the detail view on the next load after the supporting info is missing. | `TC-003` |

As new Phase 4 requirements arrive, expand this table first and then update the related acceptance criteria and test cases so every row stays traceable. Use the IDs above when referencing requirements in pull requests or traceability reports.
