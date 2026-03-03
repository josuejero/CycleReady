# Playwright Smoke Test Suite

This suite only covers the four critical user-visible scenarios called out for Phase 7. Each test seeds `localStorage` from `src/data/seed.json` before the app loads so assertions always see the same history/reminder state.

## Covered scenarios

- successful CME submission surfaces the confirmation banner and adds the new log to history
- invalid submissions are blocked with a validation banner and no state change
- reminders highlight activities missing supporting documentation
- the history card's “Latest action” detail reflects reviewer updates after a status change

## Running the suite

1. Install dependencies if you haven't already: `npm install`.
2. Start the Playwright suite: `npm run test:e2e`.
3. Once the run finishes, open the generated report at `playwright-report/index.html` to review the detailed results, traces, and screenshots.

The report directory can be uploaded as a standalone GitHub Actions artifact (the workflow already does this) or zipped manually for release documentation. Re-running the suite simply overwrites the `playwright-report` folder, so copy the folder before running again if you need separate “before/after” artifacts.

## Capturing the intentionally failing artifact and regression rerun

1. Introduce a temporary regression (e.g., comment out the validation message expectation in `tests/smoke/cme-smoke.spec.ts` or force the app state to skip the `CME log saved locally` banner).
2. Run `npm run test:e2e` and archive the `playwright-report` output; you now have a failing artifact to demonstrate the regression.
3. Revert the regression (restore the expectation or fix the UI) and re-run the suite. Save the new `playwright-report` folder to document the fixed regression run.

Keeping both sets of HTML reports is the easiest way to provide “evidence for the repo and release packet” that Playwright recommends.
