# Release Summary Page Wireframe

## Purpose
Highlight readiness for the next release cycle with metrics, risks, and a quick view of unresolved reviewer and support issues.

## Layout
- **Header:** Release name, target date, overall readiness score with gauge, and primary action (Generate release report).
- **Three sections below:**
  - Section 1: Metrics grid (Accepted submissions count, In-review, Needs correction, Critical defects) with sparklines tracking the last few days.
  - Section 2: Risk list showing blockers (e.g., overdue documentation, review gaps) with severity chips and owner tags.
  - Section 3: Dependency board linking to reviewer detail and release stakeholders, with cards for "Awaiting QA sign-off" and "Blocked by documentation".
- **Sidebar:** Timeline of release milestones plus a tiny reminder summary connecting to key dates view.

## Interactions
- Gauges update as statuses change; hovering reveals definitions.
- Risk chips reveal mitigation steps and owners.
- Dependency cards can be expanded into the reviewer detail view or history page.
