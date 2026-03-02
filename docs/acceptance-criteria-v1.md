# CycleReady Phase 1 Acceptance Checklist (Version 1)

This checklist consolidates the QA-reviewed acceptance criteria into measurable outcomes for each of the ten CycleReady stories, emphasizing what "done" looks like for the MVP. Every criterion ties back to the static Vite + React + TypeScript + Tailwind app, synthetic JSON/localStorage data, and the five workflows described in the project description.

| Story | Measurable Outcome | Acceptance Detail |
| --- | --- | --- |
| Clinician: see current cycle progress | Dashboard reflects actual totals | Total logged credits (sum from synthetic data/localStorage) and cycle percentage display concurrently; when a new CME entry is added locally, the figures refresh without page reload. |
| Clinician: log a CME activity | CME form validates and persists | Log CME form requires title, credits, completion date, category, provider; submission stores an entry in localStorage flagged with "Pending Review" and adds an entry to Submission History within 200ms. |
| Clinician: attach supporting documentation metadata | Metadata attaches to CME entry | Upload Support simulates metadata capture (document type, pseudo-filename, date); metadata persists to localStorage and surfaces as a badge under the related CME entry. |
| Clinician: view past submissions/statuses | History view is accurate and filterable | Submission History lists each CME entry with reviewer status (Submitted/Pending/Rejected/Corrected), missing document indicators, and optional reviewer notes; sorting by newest submission works, and items reflect localStorage state. |
| Clinician: see upcoming key dates | Key Dates panel shows deadlines | Key Dates cards show at least three dates with label, deadline (formatted MM/DD/YYYY), days until due, overdue highlighting (red) when date < today, and link to relevant cycle milestone; data comes from synthetic JSON using the system date. |
| Clinician: see reminders for missing info | Reminder banners trigger correctly | Reminder banners identify entries lacking metadata, listing title plus action "Upload support metadata"; banners disappear once metadata is stored locally. |
| Reviewer: view submission detail | Reviewer page mirrors clinician data | Submission detail displays the CME activity info, metadata, and clinician notes taken from the shared localStorage payload; load states and skeleton UI exist until data is ready. |
| Reviewer: mark status | Reviewer actions update state | Accept/Needs Correction/Reject buttons update status fields in localStorage, append reviewer note with timestamp, and push status change to Submission History and readiness metrics immediately. |
| Reviewer: history trail | Change log is chronological | Detail view shows a timeline of actions (clinician adds metadata, reviewer decision, reminder triggered) with actor, action, and ISO timestamps; entries append in order. |
| Release stakeholder: view readiness metrics | Dashboard integrates metrics and defects | Readiness panel shows cycle completion percentage, ratio of accepted submissions to pending, and open defect count (mocked from JSON); readiness status (e.g., "On Track" if ≥80% credits logged and zero critical defects) is derived from the same localStorage + synthetic defect data.

Each row ties directly to the five workflows and reinforces the static-app constraints (local data, mocked documents, GitHub-based defect framing, and Playwright-targeted automation-ready behaviors).
