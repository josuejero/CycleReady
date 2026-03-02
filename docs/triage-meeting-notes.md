# Triage Meeting Notes

Use this file to capture the live context from every Phase 6 defect triage meeting. Each meeting entry should link to the live GitHub Project board, call out Sev1/Sev2 issues, and record decision/action items so defects never slip between triage and release.

## How to use this template
1. Start a new section for each scheduled triage (date-based heading, e.g., `## 2026-03-02 — Defect triage`).
2. Drop in the board link (the board should already host the required custom fields, charts, and saved views described in `docs/triage-guidelines.md:1`).
3. Capture the column counts, release blockers, and high-risk defects discussed.
4. Close out with actions, owners, and due dates; reference the linked issue numbers so follow-up remains traceable.

## Entry template
### YYYY-MM-DD — Defect triage
- **Facilitator:**
- **Attendees:**
- **GitHub Projects board view:** _(paste the live board or table URL)_
- **Focus for this meeting:** _(e.g., release block list, UAT regression, smoke stability)_
- **Key metrics:** _Sev1 open, Sev2 open, Release blocker yes count, Aging cards in Needs Triage_

#### Board snapshot
- **New / Needs Triage:**
- **In Progress:**
- **Ready for QA:**
- **Release Review:**
- **Ready to Close / Closed:**

#### Release blockers & stories under pressure
- `#123` (Sev1, Release Blocker = Yes, Owner @team)
- `#456` (Sev2, Target Fix Version = v1.2.0, Found In = Regression)

#### Decisions
- Document any changes to severity/priority, release scope, or rerouting of owners.

#### Action items
| Action | Owner | Due | Status |
| --- | --- | --- | --- |
| Example: Reproduce issue with data set X | @qa | 2026-03-04 | In progress |

#### Follow-up artifacts
- Screenshots, Playwright tickets, release notes updates, etc.
- Link to any supporting test cases or automation checks that were run.
