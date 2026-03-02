# History Page Wireframe

## Purpose
Surface all submissions with filterable statuses so clinicians and reviewers can spot trends, missing metadata, and pending actions.

## Layout
- **Sticky header:** Search bar + filter pills (All, Pending Review, Accepted, Rejected, Needs Correction) + sort toggle (Date desc/asc).
- **Primary list:** Vertical list of cards, each containing:
  - Left section: CME title, credited value, submission date, reviewer status chip (color-coded).
  - Right section: Action buttons (View detail, Upload metadata) and a mini checklist (metadata, reviewer note, reminders).
  - Divider row showing reviewer decision summary and any missing field banners.
- **Sidebar (right):** Summary of counts per status, next reminder countdown, quick CTA to log new CME.

## Interactions
- Filtering toggles the list with animated transitions and updates the sidebar counts.
- Cards expand on hover to show reviewer comments and missing metadata bullets.
- If there are no submissions for a filter, show an empty state message with contextual guidance and a CTA to log a new activity.
