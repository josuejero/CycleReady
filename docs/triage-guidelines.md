# Phase 6 Defect Triage Guidelines

A real defect lifecycle is the heart of Phase 6. Every bug is captured as a GitHub Issue, triaged against agreed-upon criteria, and surfaced on the repo's GitHub Project board so the team can see board/table views, charts, release readiness, and historical cadence. This document, the companion meeting notes template, and the `.github/ISSUE_TEMPLATE/defect.yml` form are the living artifacts that keep the workflow consistent.

## Deliverables
- **Live GitHub Project board:** Create a project called _CycleReady Defect Triage_ under this repo (use the new GitHub Projects experience so you can build board, table, and chart views). Link the board in each triage note entry so the log always points to the live view.
- **Issue intake form:** Use `.github/ISSUE_TEMPLATE/defect.yml` to require the fields listed below; every defect in GitHub Issues must use this template so custom field metadata stays in sync with the board.
- **Triage docs:** This guideline file plus `docs/triage-meeting-notes.md` describe how to surface blockers, share status, and keep decisions auditable.

## Guiding goals
- Defects document why they matter (summary, environment, expected vs actual, test case, screenshots) so triage can start immediately.
- The project board records structured metadata (severity, priority, repro rate, owner, story ID, target fix version, release blocker, found-in stream) that feeds dashboards and release gating.
- Regular triage meetings keep the board accurate; notes live in `docs/triage-meeting-notes.md` with links to the board snapshot and the highest-risk issues.

## Issue intake + metadata sync
- The defect form already requires summary, environment, reproduction steps, expected result, actual result, screenshots, severity, priority, repro rate, found in, and linked story/test case. Extend it when necessary but never soften the required fields—clarity is the triage fuel.
- Add owner, story ID, and target fix version inline if known so the GitHub Project custom fields can be populated without guessing. Release blockers must be marked explicitly as _Yes_ or _No_.
- After filing, add the issue to the Project (board or table view) so the metadata (single selects, text, numbers) can feed charts and saved views. Issues should stay unassigned only until triage confirms an owner.

## GitHub Project board configuration
The board mirrors the lifecycle. Configure these single-select/text/date custom fields under the project settings:

| Field | Type | Options / Description |
| --- | --- | --- |
| Severity | Single-select | `Sev1 - Blocker`, `Sev2 - Critical`, `Sev3 - Major`, `Sev4 - Minor` (driven from the issue form). |
| Priority | Single-select | `P1 - Fix now`, `P2 - Fix before next release`, `P3 - Fix in a future release`, `P4 - Informational`. |
| Repro Rate | Single-select | `Always`, `Intermittent`, `Rare`. |
| Owner | Text | Team or person accountable for resolving the defect. |
| Story ID | Text | Backlog/story cross reference (e.g., `ST-1234`). |
| Target Fix Version | Text | Release/QA milestone (e.g., `v1.2.0`). |
| Release Blocker | Single-select | `Yes`, `No`—mark `Yes` when the defect must be resolved before shipping. |
| Found In | Single-select | `Functional`, `Smoke`, `Regression`, `UAT`.

Set up these additional views to make the board actionable:
- **Board view:** Columns that follow the lifecycle: `New`, `Needs Triage`, `In Progress`, `Ready for QA`, `Release Review`, `Ready to Close`, `Closed`. Use automation rules (if available) to move issues when status changes.
- **Table view:** Include metadata columns (Severity, Priority, Repro Rate, Target Fix Version, Release Blocker) so release owners can sort/filter by release-specific criteria.
- **Charts:** Save at least three charts—severity distribution, release blockers by fix version, and aging defects (e.g., total days in `Needs Triage`). Pin these boards to the tab so stakeholders can see where the risk is each sprint.
- **Saved views:** Examples:
  - _Active triage_ (Severity >= Sev2, Release Blocker = Yes, column in `Needs Triage` or `In Progress`).
  - _Release readiness_ (Target Fix Version = current release, Release Blocker filter, sorted by Priority).
  - _Owner view_ (filter by a particular owner or squad to serve as a quick stand-up board).

## Defect lifecycle steps
1. **Report:** File the issue via the defect issue template. Attach repro steps, logs, screenshots, linked story/test case, and describe environment. Label the issue with `needs triage` and add it to the project board under the `New` column.
2. **Triage:** QA/Product review issues at least every other workday (or every sprint planning session). Confirm or refine severity/priority/repro rate, set the `Owner` field, assign to a developer, decide whether the issue is a release blocker, and move the card to `Needs Triage` or `In Progress` depending on readiness.
3. **Fix & verify:** Developers work through defects in `In Progress`, pushing PRs/branches that reference the issue. QA moves the card to `Ready for QA` once a build is available; set `Target Fix Version` before moving to `Release Review` so release managers can gate confidently.
4. **Release readiness:** Release managers review the `Ready for QA` and `Release Review` columns; they consult the charts to see whether high-severity or blocking defects remain. The `Release Blocker` custom field drives whether the release can ship.
5. **Closure:** After verification, QA closes the issue by moving it to `Ready to Close`/`Closed`, updating `Release Blocker` to `No` if resolved, and noting test coverage or regression suites executed.

## Roles & responsibilities
- **QA triage lead:** Owns the board, keeps metadata fresh, drives the replication of the required fields, and chairs the recurring triage review that feeds into `docs/triage-meeting-notes.md`.
- **Developers:** Own the fix, keep the `Owner` field updated, and communicate readiness (via PRs) so QA can pull the card into `Ready for QA`.
- **Product/Release:** Validates severity/priority definitions, tags release blockers, and uses saved views/charts to decide whether to delay or ship.
- **Ops/UX:** Optional partners who weigh in when defects impact delivery or documented flows.

## Triage meetings & metrics
Run stand-up triage sessions at least weekly (daily during a stabilizing sprint). Use `docs/triage-meeting-notes.md` to record the discussion, decisions, and action items. Each entry should include:
- Link to the live GitHub Project board view being referenced.
- Snapshot of release blockers and Sev1/Sev2 issues.
- Owner handoffs, follow-up actions, and expected due dates.

This keeps the workflow auditable, lets Release Managers track the release unblockers, and ensures the GitHub Project chart panels stay aligned with what the team is actually fixing.
