# CycleReady Phase 1 Test Strategy

This strategy outlines how testing will cover the five believable workflows within the Vite + React + TypeScript + Tailwind static app, relying on synthetic JSON/localStorage data, Playwright automation, GitHub Actions, and manual UAT checkpoints before any interactive demo is published to GitHub Pages.

## Test Pyramid Overview
- **Unit-like checks (informal in Phase 1):** Document the expected shape of synthetic JSON payloads and localStorage keys so future components can render predictable data.
- **Playwright smoke suite:** A small set of end-to-end flows that run against the static app (likely served by `npm run dev` or `npm run build` + `serve`). Smoke tests cover dashboard accuracy, logging CME, uploading support metadata, history navigation, and reminder visibility. Playwright writes HTML reports to `playwright-report/` and is triggered via GitHub Actions.
- **Manual UAT/QA reviews:** Before release, testers manually step through acceptance criteria from `docs/acceptance-criteria-v1.md`, verify reminders, and confirm readiness metrics.

## Workflow Test Focus
1. **Dashboard (total credits, cycle progress, readiness metrics):**
   - Automation: Validate total credits card matches seeded JSON/localStorage sum, progress percentage updates after log flow, readiness metric label toggles between "On Track" and "At Risk" based on reviewer statuses and defect count.
   - Manual: Record numeric values and compare them to synthetic data table; note any UI discrepancy for review.

2. **Log CME workflow:**
   - Automation: Fill Log CME form fields, submit, and assert new entry appears under Submission History with status "Pending Review" and dashboard totals updated.
   - Manual: Try submitting with missing required fields to confirm inline errors; verify category/provider dropdowns use synthetic data.

3. **Upload Support metadata:**
   - Automation: Simulate metadata entry (document type, pseudo-file name, date) and confirm associated Reminder banner disappears. Ensure metadata badge renders beside the CME entry.
   - Manual: Verify metadata counts tie to the reminder logic and that metadata persists across reloads.

4. **Submission History:**
   - Automation: Check filter buttons (e.g., Show Rejected) and that statuses reflect reviewer actions; confirm chronological order as per history trail rules.
   - Manual: Review the history trail for at least three entries to confirm actor, action, and timestamp formatting.

5. **Key Dates/Reminders:**
   - Automation: Compare countdown days to the current date, verify overdue cards highlight when date < today, and ensure reminder banners list missing metadata entries.
   - Manual: Confirm at least three dates render with the expected format and that reminders recommend uploading metadata when needed.

## Automation & CI
- **Playwright smoke tests:** Run via `npx playwright test --config=tests/smoke/playwright.config.ts` (config to point at local dev server). Tests populate `playwright-report/` (check-in to repo or link from GitHub Actions artifacts).
- **GitHub Actions pipeline:** Trigger Playwright suite on push/PR to `main`; include steps for linting docs if required later. Use built-in caching for npm modules and produce HTML report artifact.
- **LocalStorage cleanup:** Each automation run clears/localStorage to prevent data bleed; test fixture seeds synthetic JSON data before each scenario.

## Manual UAT Strategy
1. **Acceptance criterion checklist:** QA reviewer runs through `docs/acceptance-criteria-v1.md`, marking pass/fail per story, noting actual vs. expected UI metrics.
2. **Defect lifecycle verification:** File GitHub issues via the repo's issue form template (Phase 1 doc mentions this) for any blockers; track them on GitHub Projects.
3. **Release readiness signoff:** Confirm release stakeholder metrics align with synthetic data (credits, reviewer statuses, defect count) and document in `docs/final-test-summary.md` in later phases.
4. **Reminders & metadata:** Manually verify reminders block until metadata exists, then clear when metadata is added and persists across reload.

## Data & Artifacts
- Use synthetic clinician names, CME entries, document metadata, and fake GitHub issue numbers; record all synthetic seeds in comments within the test scripts.
- Retain Playwright HTML report under `playwright-report/` and optionally link from `docs/test-strategy.md` once generated.
- Log manual findings (e.g., reminder verification) in `docs/uat-results.md` when available.

## Defect & Readiness Checks
- Track defects via GitHub Issues (see `defects/` for reproducible steps once created); tie them to readiness metrics by referencing issue IDs in the readiness panel.
- Automation ensures reviewer status changes (Accepted/Needs Correction/Rejected) update readiness counts; manual testers confirm that zero open critical defects result in "On Track" label.
- If reminders or metadata fail, testers document the scenario, create issues, and note the defect in the readiness panel narrative.

This strategy keeps Phase 1 tightly focused on documentation-critical QA artifacts while prepping automation and manual checking for the static CycleReady demo stack.
