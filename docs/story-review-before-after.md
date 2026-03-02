# Phase 4 — Turn Weak Requirements into Testable Requirements

This stage is where CycleReady earns its QA maturity badge. The artifacts in this repo should show how we transform fuzzy hopes into pass/fail rules that every reviewer and hiring manager can verify. The **before/after** contrast below borrows the Atlassian framing so the next reader immediately recognizes how acceptance criteria should evolve.

## Story-review before/after acceptance criteria example
| Category | Text |
| --- | --- |
| Weak | • User can log CME.  
• System shows reminders.  
• History should update. |
| Improved | • When a user submits a CME entry with all required fields completed, the new entry appears at the top of History within the same session (no reload required).  
• The submit action is blocked and an inline validation message appears beside the credits field whenever credits are missing.  
• If supporting info is missing for an entry marked “documentation required,” the dashboard shows a reminder banner on the next load and links to the missing-document detail view. |

Each improved criterion becomes an explicit testable condition; weak statements describe goals but leave the tester guessing about pass/fail boundaries. The reader should now be able to observe a behavior (entry placement, blocked submit, reminder banner) and either mark it **pass** or **fail**.

## Review checklist for Phase 4 stories
1. Capture the original “weak” phrasing as the story first appeared.  
2. Rewrite it into a fixed condition that includes the trigger, the visible system response, and the timing or session expectation.  
3. Link each improved criterion to a test case in `docs/test-cases-functional.md` (see referencing format in the traceability matrix).  
4. If a deadline or reminder is involved, record when it should appear; reminders are only valid if we can observe them (e.g., “on next load” or “in the same session”).

Solid acceptance criteria not only guide QA automation but also demonstrate that the team can consistently judge the “done” state from the user’s viewpoint. Use this document any time you validate a new story before it lands in the backlog.
