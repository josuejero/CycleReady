# Log CME Form Wireframe

## Purpose
Capture a new CME entry with structured metadata, validate required fields, and reassure clinicians on what is missing before submission.

## Layout
- **Header bar:** Title "Log CME" plus breadcrumb/back control and save/submit buttons that stay sticky at top when scrolling.
- **Form grid:** Two-column layout with sections:
  - Left column: Title input, provider dropdown, category pills, credit value stepper, completion date picker, and related note textarea.
  - Right column: Context panel showing cycle requirements, current progress, and inline helper text.
- **Metadata row (below main fields):** Attachment placeholder (click to associate support) and status badge showing whether metadata exists.
- **Footer:** Submission status toggle (Draft vs. Submit) and a list of detected missing required fields.

## Interactions
- Each required field shows inline validation messages (title, credits, date, category) and highlights the label in red if needed.
- Helper panel updates live to reflect the credit totals once values change.
- Clicking "Submit" with validation errors surfaces a persistent banner at the top describing why the log cannot be saved.
