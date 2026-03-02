# CycleReady Phase 1 Stories

This document treats the ten provided persona-driven needs as user stories and captures two passes of acceptance notes: a deliberately weak first pass (to show typical vague requirements) and a QA-reviewed second pass that drives clarity, testability, and outcome focus. Each story references the five CycleReady workflows (dashboard, log CME, upload support, submission history, key dates/reminders) and the synthetic stack chosen for the MVP.

## Clinician Stories

1. **As a clinician, I can see my current cycle progress.**
   - _First pass:_ The dashboard shows how far along I am in the cycle, maybe with progress bars or numbers.
   - _QA-reviewed:_ Dashboard presents total logged credits (sum from synthetic JSON), cycle progress percentage (earned/required), and last activity date. Testable by comparing expected totals from the JSON seed data and ensuring progress percentage updates when localStorage entries are added.

2. **As a clinician, I can log a CME activity with credits and date.**
   - _First pass:_ There is a form to add CME activities that includes credits and a date field.
   - _QA-reviewed:_ The Log CME workflow validates required fields (activity title, credit value, completion date, category, provider, and optional note) and persists the new entry into localStorage. After submission, the dashboard credit total refreshes immediately and the history list shows the new entry with status "Pending Review." The form also displays inline errors if fields are missing.

3. **As a clinician, I can attach supporting documentation metadata.**
   - _First pass:_ I can upload documents to back up my CME log.
   - _QA-reviewed:_ The Upload Support workflow captures metadata (file name placeholder, document type, associated CME entry ID, and upload date) without sending actual files; metadata is stored alongside the related CME log entry in localStorage. UI shows a badge or tag when metadata exists and flags missing uploads for a CME entry for reminders later.

4. **As a clinician, I can view past submissions and statuses.**
   - _First pass:_ There is some history page that lists what I submitted before.
   - _QA-reviewed:_ The Submission History view lists all synthetic submissions grouped by their reviewer status (Submitted, Pending Review, Rejected, Corrected). Each row shows the CME title, credits, submission date, reviewer decision note (if any), and any missing documentation banner. Filtering by status and sorting by date should be possible, and the data reflects localStorage state.

5. **As a clinician, I can see upcoming key dates.**
   - _First pass:_ The app has a section for dates.
   - _QA-reviewed:_ The Key Dates/Reminders area surfaces at least three upcoming certification/review deadlines (from static JSON data), marks overdue ones in red, and auto-calculates days until each date. Dates update relative to today (using browser date) and can be tied to the cycle data so missing credits trigger the upcoming-finish reminder.

6. **As a clinician, I can see reminders for missing supporting info.**
   - _First pass:_ The system reminds me to submit missing docs.
   - _QA-reviewed:_ Reminder banners on both Dashboard and Submission History identify CME entries lacking metadata. They list the entry titles and show actions ("Upload support metadata") and persist once metadata is added (i.e., reminder disappears). Reminder conditions are derived from localStorage checking for metadata objects linked to each CME ID.

## Reviewer Stories

7. **As a reviewer, I can view a submission detail page.**
   - _First pass:_ Reviewers have a page with the details of each submission.
   - _QA-reviewed:_ The reviewer detail screen displays the CME activity information, attached metadata (document type, pseudo-file name, upload date), clinician notes, and synthetic calculated credits. Action buttons to accept, request correction, or reject are present and disabled until the form loads. The detail view pulls from the same localStorage/data source used by clinicians, ensuring parity.

8. **As a reviewer, I can mark an item accepted, needs correction, or rejected.**
   - _First pass:_ Reviewers can flag statuses.
   - _QA-reviewed:_ The reviewer screen includes three explicit buttons (Accept, Needs Correction, Reject) that update the submission status in localStorage and append a timestamped reviewer note. Status changes immediately reflect in the Submission History list and drive the release stakeholder metrics. Confirmation toast or feedback ensures reviewers know the new state.

9. **As a reviewer, I can see a history trail of changes.**
   - _First pass:_ There is some log of what happened to the submission.
   - _QA-reviewed:_ Each submission detail includes a chronological trail showing clinician edits, reviewer decisions, and reminders. Each entry notes actor, action (e.g., "Clinician added metadata"), date/time (relative/ISO string), and resulting status or flag. Trail entries align with synthetic data increments and update whenever the status changes or metadata is added.

## Release Stakeholder Stories

10. **As a release stakeholder, I can view readiness metrics and open defects.**
    - _First pass:_ There's a dashboard with metrics and defects.
    - _QA-reviewed:_ A Readiness panel (part of the Dashboard) summarizes open defects (mocked by GitHub issue metadata), cycle completion percentage, and critical reminders. The metrics tie to reviewer states (e.g., number of items Accepted vs. pending) plus defect counts seeded from static JSON, and explicitly call out whether readiness is within the target completion band (e.g., 80% of credits logged, zero overdue critical dates). GitHub defects are referenced via placeholder issue numbers.

The QA-reviewed criteria align with the five workflows and set up testable expectations for the static Vite/React/Tailwind proof-of-concept.
