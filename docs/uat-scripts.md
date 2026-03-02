# CycleReady Phase 5 UAT Scripts

Each script below corresponds to a scenario derived from the Phase 5 requirements. Record actual results, defects, and the tester signoff immediately after executing each script.

### Legend
- **Expected Result:** Business outcome that must be met for the scenario to pass.
- **Actual Result:** Filled in during execution (Pass/Fail and observations).
- **Signoff:** Tester initials and date once the scenario is validated.

---

## UAT-01: Complete happy-path CME submission
- **Persona:** Clinician — “Credithound”
- **Preconditions:** Clinician is logged in, dashboard shows “On Track,” reminders cleared except for the targeted submission row.
- **Steps:**
  1. Open Log CME form, select approved activity type, enter date within current cycle, quantity of credits, and provider.
  2. Upload required supporting document (PDF placeholder), add description, and submit.
  3. Navigate to Submission History and confirm the new entry appears with status “Pending Review,” metadata badge, and reminder cleared.
  4. Confirm dashboard totals update to include the new credits and “On Track” status remains.
- **Expected Result:** Submission persists, reminders removed, dashboard totals updated, history shows timestamp, and readiness remains green.
- **Actual Result:** 
- **Signoff:** 

## UAT-02: Invalid submission blocked
- **Persona:** Clinician — “Credithound”
- **Preconditions:** Clinician is on the Log CME screen without a supporting metadata upload.
- **Steps:**
  1. Try submitting CME entry with a future date beyond the current key date range and missing required document.
  2. Observe inline validation and prevent submission.
  3. Verify status remains “Draft,” reminder still indicates missing support.
  4. Attempt to bypass validation via browser refresh and confirm the requirement persists.
- **Expected Result:** Application blocks submission, displays validation messages for date and missing support, no history entry added.
- **Actual Result:** 
- **Signoff:** 

## UAT-03: Reminder appears for missing support
- **Persona:** Clinician — “Busy Documenter”
- **Preconditions:** Clinician has previously logged CME without uploading supporting document; reminder should refresh after login.
- **Steps:**
  1. Log in as Busy Documenter.
  2. Open dashboard and confirm the reminder banner notes missing supporting documentation for the target CME entry.
  3. Click the reminder CTA to open the Upload Support flow, attach the missing document, and submit.
  4. Confirm reminder clears from dashboard and history row now shows metadata badge.
- **Expected Result:** Reminder displays on login, CTA drives clinician to document upload, and the reminder disappears once the document is attached.
- **Actual Result:** 
- **Signoff:** 

## UAT-04: History updates after correction
- **Persona:** Clinician — “Busy Documenter”
- **Preconditions:** Clinician previously received a “Needs Correction” status on a submission; supporting document is now ready.
- **Steps:**
  1. Locate the flagged submission in History.
  2. Attach the required metadata, resubmit, and confirm status changes back to “Pending Review.”
  3. Refresh history and evidence that the timeline shows the “Needs Correction” action, clinician upload, and current submission status.
  4. Verify the reviewer audit entry now appears with a new timestamp.
- **Expected Result:** History reflects the correction workflow, showing both the prior reviewer action and the clinician’s fix with updated status.
- **Actual Result:** 
- **Signoff:** 

## UAT-05: Reviewer changes status to Needs Correction
- **Persona:** Reviewer/Staff Auditor
- **Preconditions:** Reviewer is assigned to pending submissions; the target submission reached “Pending Review.”
- **Steps:**
  1. Log in as reviewer, open the pending submission, and add audit comments referencing missing metadata.
  2. Change status to “Needs Correction” and save.
  3. Confirm history log shows reviewer details and NEW status.
  4. Alert the Busy Documenter persona (via in-app notification or manual email if supported).
- **Expected Result:** Submission status flips to “Needs Correction,” history captures audit notes, clinician reminders (if any) reflect the reviewer action.
- **Actual Result:** 
- **Signoff:** 

## UAT-06: Overdue key date warning appears
- **Persona:** Clinician — “Credithound”
- **Preconditions:** One key cycle date is simulated as past due (e.g., `Renewal Due Date` < today).
- **Steps:**
  1. Login and review dashboard cards tied to key dates.
  2. Confirm overdue date card is highlighted (e.g., “Overdue” label, red icon) and message instructs clinician to catch up.
  3. Attempt to submit new CME after the due date; ensure the warning persists until a reviewer or staff user updates the date.
  4. Reviewer updates the date in settings; verify warning clears in the dashboard.
- **Expected Result:** Overdue warning is visible, prevents misleading readiness signaling, and clears only after reviewer adjusts key date or new submission is accepted.
- **Actual Result:** 
- **Signoff:** 

