import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const reports = [
  'metrics-summary.json',
  'release-decision.json'
];

await mkdir('public/reports/latest', { recursive: true });

for (const report of reports) {
  const source = `reports/latest/${report}`;
  if (existsSync(source)) {
    await cp(source, `public/reports/latest/${report}`);
    console.log(`Synced ${source} to public/reports/latest/${report}`);
  } else {
    console.warn(`Skipping ${source}; report has not been generated yet.`);
  }
}
