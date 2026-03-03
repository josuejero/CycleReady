
# CycleReady QA Release Room

Thin-demo proof of a clinician QA workflow that tracks CME logging, reminders, reviewer interactions, and release readiness for a CME recertification release. Built as a Phase 8 “Release Room” microsite, it bundles the live dashboard, release summary, QA artifacts, and final memo into a single portfolio-ready experience.

![Defect board snapshot](public/assets/portfolio/defect-board.svg)
![UAT checklist snapshot](public/assets/portfolio/uat-checklist.svg)
![Release summary snapshot](public/assets/portfolio/release-summary.svg)

## Table of contents
- [What it demonstrates](#what-it-demonstrates)
- [Release narrative](#release-narrative)
- [Data & UX](#data--ux)
- [Tech stack & automation](#tech-stack--automation)
- [Getting started](#getting-started)
- [Release artifacts](#release-artifacts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Résumé-ready takeaway](#résumé-ready-takeaway)

## What it demonstrates
- **Clinician QA dashboard**: seeded CME activities stored in `src/data/seed.json` feed `src/App.tsx`, showing credits logged, completion %, reviewer statuses, key dates, and timeline widgets.
- **Reviewer workflow controls**: `LogForm`, `UploadSimulator`, `ReviewerPanel`, and `RemindersPanel` keep the dashboard in sync while the reviewer can request corrections, change status, or mark uploads complete.
- **History & reminders**: `HistoryList` highlights the clinician’s timeline, and `RemindersPanel` surfaces missing metadata or correction requests tied to each activity.
- **Release-room microsite**: `src/components/ReleaseRoomPage.tsx` aggregates readiness metrics, defect board, evidence links, and the QA signoff memo for an executive snapshot, while `ReleaseSummaryPanel` powers the accompanying summary entrypoint (`release-summary.html`).
- **Static proof of release readiness**: no backend is required—React + Vite renders the experience using LocalStorage to persist clinician activities between sessions.

## Release narrative
1. **Dashboard (root `/`)** mirrors a clinician logbook with seeded entries plus timeline history, making it easy to step through QA scenarios (approved activities, pending reviews, requested corrections).
2. **Release Room (`release-room.html`)** surfaces QA readiness by combining the story coverage percentage, Playwright smoke suite summary, open defect board (`src/data/release-room.ts`), and linked evidence (UAT plans, results, triage guidelines).
3. **Release Summary (`release-summary.html`)** distills the recommendation, blocker owners, and final QA memo so stakeholders get a fast go/no-go brief.

## Data & UX
- **Seeded content**: `src/data/seed.json` contains clinician activity logs, key NCCPA dates, and defect summary metadata that feeds `seedActivities`, `keyDates`, and `defectSummary` across the app.
- **Activity lifecycle**: adding or editing an entry updates `LocalStorage` via `persistActivities`, ensuring status counts, reminders, and reviewer notes stay consistent for credit tracking.
- **Timeline storytelling**: Each activity’s timeline entries (`activity.timeline`) capture clinician submissions and reviewer actions so QA reviewers can replay conversations.

## Tech stack & automation
- **UI layer**: Vite + React + TypeScript + Tailwind CSS keeps the microsite bundle light whilst providing responsive layouts and gradient styling.
- **Data modeling**: Type definitions in `src/data/types.ts` (used by components and helpers) keep CME logs, reviews, and release metadata strongly typed.
- **Automation & docs**: Playwright (`npm run test:e2e`) powers the smoke suite (reports land under `playwright-report/index.html`), and `npm run docs:pdf` uses Pandoc + WeasyPrint to re-export `docs/uat-plan.md` as a PDF proof (`public/assets/cycleready-uat-packet.pdf`).

## Getting started
1. `npm install`
2. `npm run dev` → visit `http://localhost:5173/` for the dashboard, open `http://localhost:5173/release-room.html` for the Release Room, and `http://localhost:5173/release-summary.html` for the executive summary experience.
3. `npm run build` produces the static `dist/` bundle that includes both `release-room` and `release-summary` entrypoints (ready for GitHub Pages).

## Release artifacts
- **UAT packet**: `npm run docs:pdf` converts `docs/uat-plan.md` to `public/assets/cycleready-uat-packet.pdf`; requires WeasyPrint (`python3 -m pip install --user weasyprint`). The script prepends the user’s `bin` directory via `python3 -c 'import site, os; print(os.path.join(site.USER_BASE, "bin"))'` so the binary is discoverable.
- **Test evidence**: `Playwright smoke report` lives in `playwright-report/index.html`, while UAT logs and triage guidelines link back to `docs/uat-results.md` and `docs/triage-guidelines.md`.
- **Defect tracking**: `src/data/release-room.ts` defines open issues (IDs CR-401, CR-312, CR-287) complete with severity, owner, status, and triage steps, which power the Release Room board.

## Testing
- `npm run test:e2e` runs the Playwright smoke suite and writes artifacts to `playwright-report/` for reference.
- `npm run build` ensures both entrypoints bundle correctly for static hosting.

## Deployment
- GitHub Pages workflow (`.github/workflows/pages.yml`) publishes `dist/` to `gh-pages` on every push/PR to `master`, making the Release Room available at `https://josuejero.github.io/CycleReady/release-room` and the summary at `https://josuejero.github.io/CycleReady/release-summary.html`.
- `npm run docs:pdf` must be rerun whenever `docs/uat-plan.md` changes to keep the published PDF in sync.

## Résumé-ready takeaway
> Led a QA release-readiness simulation for a CME/recertification workflow, including acceptance-criteria review, UAT design, defect triage, smoke automation with Playwright, and final release reporting.

## Why it matters
- Demonstrates ownership across a full QA loop: from clinician submissions through reviewer remediation, through automation, and into the final go/no-go memo.
- Offers a portfolio-friendly narrative with live release-room evidence, exportable UAT packet, and automation proof points that remix existing Vite/React tooling into a single release-ready experience.
