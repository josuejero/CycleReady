# Reviewer Detail Page Wireframe

## Purpose
Give reviewers a complete snapshot of a submission along with clear status controls and decision context.

## Layout
- **Header:** Submission title, clinician name, status badge, reviewer decision buttons (Accept, Needs Correction, Reject) aligned horizontally with short helper text explaining status definitions.
- **Main grid:**
  - Left panel: Submission metadata (credits, category, provider, completion date), attached support summary, clinician notes, and key timeline events (log created, metadata added, previous review actions).
  - Right panel: Reviewer decision trail (chronological list of reviewer notes with timestamps), inline comment input, and reminder of UAT criteria.
- **Footer:** Decision confirmation area with optional note field and CTA to "Publish review note" plus toggles for notifying clinician/release team.

## Interactions
- Buttons show tooltips to explain each decision’s downstream effect and require confirmation if metadata is missing.
- Reviewer trail updates live, and selecting a timeline entry scrolls to that section.
- Lightweight in-line validation warns when reviewer tries to accept without comment on a correction history.
