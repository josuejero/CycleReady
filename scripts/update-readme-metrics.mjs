import { readFile, writeFile } from 'node:fs/promises';

const readmePath = 'README.md';
const metricsPath = 'reports/latest/metrics-summary.json';

const readme = await readFile(readmePath, 'utf8');
const metrics = JSON.parse(await readFile(metricsPath, 'utf8'));

const block = `<!-- METRICS:START -->

| Metric | Value |
|---|---:|
| Requirements documented | ${metrics.requirements.total} |
| Requirements covered | ${metrics.requirements.covered} / ${metrics.requirements.total} |
| Requirement coverage rate | ${metrics.requirements.coverageRate}% |
| Manual test cases | ${metrics.tests.manual} |
| Automated Playwright tests | ${metrics.tests.automated.total} |
| Automated pass rate | ${metrics.tests.automated.passRate}% |
| Open Sev1 defects | ${metrics.defects.openBySeverity.sev1} |
| Open Sev2 defects | ${metrics.defects.openBySeverity.sev2} |
| Latest release decision | ${metrics.release.decision} |
| Last generated | ${metrics.generatedAt} |

<!-- METRICS:END -->`;

const updated = readme.replace(/<!-- METRICS:START -->[\s\S]*?<!-- METRICS:END -->/, block);

if (updated === readme) {
  throw new Error('README metrics markers not found. Add <!-- METRICS:START --> and <!-- METRICS:END --> first.');
}

await writeFile(readmePath, updated);
console.log('README metrics updated.');
