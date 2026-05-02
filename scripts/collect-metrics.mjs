import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { parse } from 'csv-parse/sync';

const latestDir = 'reports/latest';
await mkdir(latestDir, { recursive: true });

async function readCsv(file) {
  const raw = await readFile(file, 'utf8');
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
}

function splitIds(value) {
  if (!value) return [];
  return value
    .split(/[;|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function pct(numerator, denominator) {
  if (!denominator) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function countPlaywrightTests(node) {
  let total = 0;
  let passed = 0;
  let failed = 0;
  let flaky = 0;
  let skipped = 0;

  function visit(item) {
    if (!item || typeof item !== 'object') return;

    if (Array.isArray(item.specs)) {
      for (const spec of item.specs) {
        for (const test of spec.tests ?? []) {
          total += 1;
          const results = test.results ?? [];
          const statuses = results.map((result) => result.status);

          if (test.outcome === 'expected' || statuses.includes('passed')) passed += 1;
          if (test.outcome === 'unexpected' || statuses.includes('failed') || statuses.includes('timedOut')) failed += 1;
          if (test.outcome === 'flaky' || results.length > 1) flaky += 1;
          if (statuses.includes('skipped') || test.outcome === 'skipped') skipped += 1;
        }
      }
    }

    for (const value of Object.values(item)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }

  visit(node);

  return {
    total,
    passed,
    failed,
    skipped,
    flaky,
    passRate: pct(passed, total),
    flakeRate: pct(flaky, total)
  };
}

async function readCoverageSummary() {
  const coveragePath = 'reports/coverage/coverage-summary.json';
  if (!existsSync(coveragePath)) return null;

  const raw = await readFile(coveragePath, 'utf8');
  const parsed = JSON.parse(raw);
  const total = parsed.total;
  if (!total) return null;

  return {
    lines: total.lines?.pct ?? 0,
    functions: total.functions?.pct ?? 0,
    branches: total.branches?.pct ?? 0,
    statements: total.statements?.pct ?? 0
  };
}

const rtm = await readCsv('docs/qa/rtm.csv');
const testCases = await readCsv('docs/qa/test-cases.csv');
const defects = await readCsv('docs/qa/defect-log.csv');

const totalRequirements = new Set(rtm.map((row) => row['Requirement ID'])).size;
const requirementsWithAnyCoverage = rtm.filter((row) =>
  splitIds(row['Manual Test IDs']).length ||
  splitIds(row['Automated Test IDs']).length ||
  splitIds(row['UAT IDs']).length
).length;
const requirementsWithAutomation = rtm.filter((row) => splitIds(row['Automated Test IDs']).length).length;
const requirementsWithManual = rtm.filter((row) => splitIds(row['Manual Test IDs']).length).length;
const requirementsWithUat = rtm.filter((row) => splitIds(row['UAT IDs']).length).length;

const openDefects = defects.filter((row) => !row['Closed Date'] && row.Status.toLowerCase() !== 'closed');
const openSev1 = openDefects.filter((row) => row.Severity === 'Sev1').length;
const openSev2 = openDefects.filter((row) => row.Severity === 'Sev2').length;
const openSev3 = openDefects.filter((row) => row.Severity === 'Sev3').length;
const openSev4 = openDefects.filter((row) => row.Severity === 'Sev4').length;

let playwright = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  flaky: 0,
  passRate: 0,
  flakeRate: 0
};

if (existsSync(`${latestDir}/playwright-results.json`)) {
  const raw = await readFile(`${latestDir}/playwright-results.json`, 'utf8');
  playwright = countPlaywrightTests(JSON.parse(raw));
}

const coverage = await readCoverageSummary();

const releaseDecision = (() => {
  if (openSev1 > 0) return 'No-go';
  if (playwright.total > 0 && playwright.failed > 0) return 'No-go';
  if (openSev2 > 0) return 'Conditional go';
  if (requirementsWithAnyCoverage < totalRequirements) return 'Conditional go';
  return 'Go';
})();

const summary = {
  generatedAt: new Date().toISOString(),
  requirements: {
    total: totalRequirements,
    covered: requirementsWithAnyCoverage,
    coverageRate: pct(requirementsWithAnyCoverage, totalRequirements),
    withManualTests: requirementsWithManual,
    manualCoverageRate: pct(requirementsWithManual, totalRequirements),
    withAutomatedTests: requirementsWithAutomation,
    automationCoverageRate: pct(requirementsWithAutomation, totalRequirements),
    withUat: requirementsWithUat,
    uatCoverageRate: pct(requirementsWithUat, totalRequirements)
  },
  tests: {
    manual: testCases.length,
    automated: playwright,
    unitCoverage: coverage
  },
  defects: {
    total: defects.length,
    open: openDefects.length,
    openBySeverity: {
      sev1: openSev1,
      sev2: openSev2,
      sev3: openSev3,
      sev4: openSev4
    }
  },
  release: {
    decision: releaseDecision,
    gates: {
      automationPassRate: playwright.passRate,
      requirementCoverageRate: pct(requirementsWithAnyCoverage, totalRequirements),
      openSev1,
      openSev2
    }
  }
};

await writeFile(`${latestDir}/metrics-summary.json`, `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(`${latestDir}/release-decision.json`, `${JSON.stringify(summary.release, null, 2)}\n`);

console.log(JSON.stringify(summary, null, 2));
