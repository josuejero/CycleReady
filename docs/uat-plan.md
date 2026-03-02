# CycleReady Phase 5 UAT Plan

Phase 5 treats UAT as the final business-flow validation before a release candidate is signed off. The goal is to confirm the end-to-end CycleReady workflows meet the agreed requirements by exercising them with realistic personas, data, and success/failure conditions.

## Objectives
- Validate the clinician CME logging and reminder flows from submission through reviewer disposition.
- Confirm that reviewer/staff actions (status changes, audit notes) influence downstream readiness, reminders, and history displays.
- Demonstrate that blocking conditions (missing documentation, invalid dates, overdue milestones) are surfaced to the business owner via reminders, warnings, and status flags.
- Capture observable results, defects, and approvals in dedicated artifacts so stakeholders can review and agree before release.

## Scope
1. **CME Submission & Support Metadata** – Happy-path logging, required document attachments, and reminder resolution.
2. **Validation & Blocking Conditions** – Prevent invalid submissions and surface missing support reminders.
3. **Reviewer Interventions** – Status changes, audit trail updates, rework guidance, and readiness calculations.
4. **Key Date Tracking & Reminders** – Overdue date warnings appear and clear once corrected.
5. **History & Audit** – Timeline updates after corrections and reviewer actions.

## Personas
| Persona | Role | Key Behavior |
| --- | --- | --- |
| Clinician — “Credithound” | Logs credits regularly, follows workflows, uses reminders to stay on track. | Submits multiple CME entries per month, ensures metadata is complete before status change. |
| Clinician — “Busy Documenter” | Frequently forgets supporting documents and relies on reminders to fix submissions. | Submits CME but skips uploads, needs reminders and resubmits history tracked. |
| Reviewer/Staff Auditor | Audits logged credits, changes status to reflect quality, and leaves audit notes for clinicians. | Moves submissions to “Needs Correction” or “Accepted” and ensures history reflects each change. |

## Preconditions
- Environment: Deploy the current build to the QA environment flagged for Phase 5 UAT (e.g., `uat.cycleready.local` or a stable Vite build served via `npm run preview`).
- Seeded data: Reset localStorage/storage to the QA seed set, including clinicians, reviewer accounts, key dates, and reminders described in `docs/test-strategy.md`.
- Access: Each tester has credentials matching assigned persona (with supporting data such as email/role).
- Reminders: Ensure at least one submission is missing supporting documents to trigger the reminder flow.

## Logistics
- **Schedule:** Plan a single UAT week (e.g., March 9–13, 2026) with two-hour slots for each persona. Actual dates may adjust but always reference explicit dates (e.g., March 11, 2026).
- **Tools:** Use the web interface deployed to `CycleReady QA` plus shared documents in `docs/uat-results.md` and `docs/uat-scripts.md`.
- **Communication:** Bugs are reported via GitHub Issues with the `phase-5-uat` label; include the Test ID and persona in the title (e.g., “UAT-03 Busy Documenter – Missing Doc Reminder Stays”). Notify the UAT lead (qa-lead@cycleready.com) via Slack when issues block further testing.
- **Defect Lifecycle:** Blockers are raised immediately, medium-impact issues are tracked with status “Needs Correction,” and observations are noted in `docs/uat-results.md`.

## Test Deliverables
1. **Test Plan (this document)** – Covers objectives, personas, entry/exit criteria, and communication standards.
2. **Detailed Scripts** – Documented in `docs/uat-scripts.md` with steps, preconditions, and expected results.
3. **Results Log** – Populated in `docs/uat-results.md` during execution with actual results and defects.
4. **Signoff Sheet** – Final approvals recorded in `docs/uat-signoff-sheet.md`.

## Entry & Exit Criteria
- **Entry:** All Phase 5 requirements are implemented (e.g., CME logging, reminders, history updates, reviewer statuses). QA environment is stable, and personas have working accounts.
- **Exit:** Every script in `docs/uat-scripts.md` has Actual Results recorded, defects are documented or resolved, and all required signatures appear in the signoff sheet. Critical defects must be resolved or deferred with stakeholder approval before exit.

## Bug Communication Standards
- **Title Format:** `[Test ID] [Persona] – concise issue]`
- **Severity Definitions:** Critical (blocks business flow), Major (requires fix before release), Minor (cosmetic or low-impact).
- **Attachments:** Include screenshots/videos of failures, log snippets, and steps to reproduce.
- **Notification:** Ping qa-lead@cycleready.com and the responsible product owner on Slack after filing.
- **Retests:** Document retest results in `docs/uat-results.md` and reference the GitHub issue number.
