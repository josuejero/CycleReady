# Dashboard Wireframe

## Purpose
Summarize clinician readiness, highlight overdue reminders, and provide jump-off points for logging CME, reviewing history, and checking release readiness.

## Layout
- **Header row:** Branding + user avatar, cycle selector, and primary call-to-actions (Log CME, Upload Support).
- **Left column (60% width):** Large cycle-progress card with radial meter, earned vs. required credits, last activity date, and quick stats for credit buckets (clinical, educational, etc.).
- **Right column (40% width):** Stack of reminder cards (missing metadata, overdue dates) and a condensed release readiness panel that shows reviewer-accepted counts, defects, and target completion percentage.
- **Below columns:** Horizontal timeline of key dates with colored bars (on track, due soon, overdue) and a mini history feed showing the last three status changes.

## Interactions
- Card footers link to supporting flows (history, reviewer detail, reminders).
- Reminder cards display CTA buttons (e.g., "Upload metadata") and dismiss once the condition clears.
- Timeline bars open a lightbox with date rules and contextual actions.
