# Metrics dictionary

This file defines the metrics used in CycleReady's README, release room, and QA evidence reports. Every promoted metric has a source of truth and update rule.

## Requirement count

Definition: Total number of documented requirement IDs in the QA traceability data.

Source of truth: `docs/qa/rtm.csv`

Formula: Count unique `Requirement ID` values.

Update cadence: Every release or whenever scope changes.

Employer meaning: Shows the size of the tested scope.

## Requirement coverage rate

Definition: Percentage of requirements mapped to at least one manual test, automated test, or UAT scenario.

Source of truth: `docs/qa/rtm.csv`

Formula: `covered_requirements / total_requirements * 100`

Update cadence: Every release.

Employer meaning: Shows whether requirements are connected to test evidence.

## Automation coverage rate

Definition: Percentage of requirements mapped to at least one automated Playwright test.

Source of truth: `docs/qa/rtm.csv`

Formula: `requirements_with_automated_tests / total_requirements * 100`

Update cadence: Every release.

Employer meaning: Shows how much of the release scope has automated regression protection.

## Manual test count

Definition: Number of manual test cases documented for functional, smoke, regression, or UAT review.

Source of truth: `docs/qa/test-cases.csv`

Formula: Count unique `Test ID` values.

Update cadence: Every release.

Employer meaning: Shows test design depth beyond automated happy paths.

## Automated test count

Definition: Number of Playwright tests executed in the latest test run.

Source of truth: `reports/latest/playwright-results.json`

Formula: Count test case results in the latest Playwright JSON report.

Update cadence: Every CI run.

Employer meaning: Shows repeatable automation evidence.

## Flake rate

Definition: Percentage of tests that required a retry to pass.

Source of truth: `reports/latest/playwright-results.json`

Formula: `tests_with_retry / total_tests * 100`

Update cadence: Every CI run.

Employer meaning: Shows stability of automated checks.

## Release decision

Definition: Go, conditional go, or no-go decision for the current release evidence snapshot.

Source of truth: `reports/latest/release-decision.json`

Formula: Derived from release gates.

Recommended rule:
- No-go if any open Sev1 defect exists.
- Conditional go if any open Sev2 defect exists.
- Go if smoke passes, regression passes, requirements are covered, and no Sev1 or Sev2 blockers remain.

Employer meaning: Shows QA judgment, not just test execution.

## Open Sev1 and Sev2 defects

Definition: Count of unresolved high-impact defects.

Source of truth: `docs/qa/defect-log.csv`

Formula: Count open defects where severity is Sev1 or Sev2.

Update cadence: Every release and after triage.

Employer meaning: Shows risk awareness and blocker management.

## CI pass rate

Definition: Percentage of recent workflow runs that passed.

Source of truth: GitHub Actions history or a future `reports/history/ci-history.csv`.

Formula: `passing_runs / total_runs * 100`

Update cadence: Weekly or before each portfolio review.

Employer meaning: Shows repeatability of build and test process.

## Lighthouse score

Definition: Lighthouse lab score for performance, accessibility, best practices, and SEO.

Source of truth: `reports/lighthouse/` artifacts.

Update cadence: Before release or after UI changes.

Employer meaning: Shows frontend quality awareness.
