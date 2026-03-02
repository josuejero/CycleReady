# Support Upload Flow Wireframe

## Purpose
Allow clinicians to attach supporting metadata/documents for a CME entry and immediately see the impact on reminders.

## Layout
- **Top header:** "Attach Supporting Documentation" with a progress indicator (Step 2 of 3 - select entry, upload metadata, confirm).
- **Main body split:**
  - Left panel lists pending CME logs (status chips and dates) with a radio selector.
  - Right panel is the upload area featuring:
    - Drop zone (drag or click to attach) with suggested file types and a visual outline.
    - Fields for document type dropdown, pseudo file name, upload date (auto-filled), and notes.
    - Buttons: "Save Metadata" (primary) and "Cancel".
- **Bottom row:** Reminder preview showing which log entry’s reminder will clear once metadata is saved.

## Interactions
- Selecting a different CME entry reloads the drop zone and metadata form with existing data.
- Upload triggers a mock progress bar and then shows a success toast.
- Saving metadata updates the reminder preview to describe the cleared condition (e.g., "Missing support for Cardiology update").
