# Reminders & Key Dates View Wireframe

## Purpose
Provide a dedicated space for tracking critical deadlines, overdue reminders, and actions tied to missing documentation or upcoming certifications.

## Layout
- **Top banner:** "Key Dates & Reminders" with a date picker to choose the reference date (default today).
- **Three-column grid:**
  - Column 1: Upcoming deadlines list showing date, type (certification, review, support), status (on track, due soon, overdue), and days remaining/overdue.
  - Column 2: Reminder stream (cards) for missing metadata, incomplete reviewer feedback, or pending uploads, each with severity icon and CTA.
  - Column 3: Rules panel displaying how the date thresholds are calculated (e.g., "Overdue once past 14 days from due date") and quick toggles for email/SMS reminders.
- **Bottom table:** Historical snapshot showing how reminders have moved (e.g., escalations from pending to overdue) with filter options.

## Interactions
- Date picker adjusts all columns, emphasizing the correct start-of-day zone.
- Clicking a reminder card opens contextual help about how to resolve it.
- Rules panel contains inline examples to clarify vague phrasing (e.g., what "due soon" means in days).
