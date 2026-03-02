# Functional Test Cases — Phase 4
This collection defines the functional test cases that prove the improved Phase 4 acceptance criteria in `docs/story-review-before-after.md` and the traceability matrix. Each test case maps directly back to a requirement ID from `docs/requirements-traceability-matrix.md` so the QA reviewer knows what to automate or execute manually.

## TC-001 — CME entry appears at the top of History (Requirement RQ-001)
- **Purpose:** Verify that a completed CME submission immediately surfaces at the top of the History list during the same session.  
- **Precondition:** The clinician has at least one existing entry in History and the app loads synthetic/local data.  
- **Steps:**  
  1. Open the CME form.  
  2. Enter all required fields (title, credits, completion date, category, provider).  
  3. Submit the form.  
- **Expected Result:** The form clears, and the newly created entry appears in History at position one without a full page reload; timestamps/order reflect submission time.

## TC-002 — Credits validation blocks submission (Requirement RQ-002)
- **Purpose:** Ensure the form rejects submissions that omit the credits field and surfaces inline guidance.  
- **Precondition:** CME form is visible.  
- **Steps:**  
  1. Fill every required field except credits.  
  2. Attempt to submit the form.  
- **Expected Result:** Submission is blocked; the credits field shows an inline validation message (for example, “Credits required”), and the History list remains unchanged.

## TC-003 — Reminder banner for missing documentation (Requirement RQ-003)
- **Purpose:** Confirm that documentation-required submissions without supporting info trigger a reminder on the dashboard.  
- **Precondition:** At least one CME entry is flagged as “documentation required” in the current session and lacks supporting info metadata.  
- **Steps:**  
  1. Load the dashboard.  
  2. Observe the reminder banner.  
  3. Click the reminder link to open the relevant entry or detail view (if implemented).  
- **Expected Result:** On load, a reminder banner appears describing the missing documentation and links to the entry detail; the banner persists until metadata is attached.
