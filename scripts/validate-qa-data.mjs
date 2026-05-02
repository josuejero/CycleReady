import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'csv-parse/sync';

async function readCsv(file) {
  const raw = await readFile(file, 'utf8');
  return parse(raw, { columns: true, skip_empty_lines: true, trim: true });
}

function splitIds(value) {
  if (!value) return [];
  return value.split(/[;|]/).map((item) => item.trim()).filter(Boolean);
}

async function collectSpecFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectSpecFiles(fullPath));
    } else if (entry.name.endsWith('.spec.ts') || entry.name.endsWith('.spec.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function collectAutomationIds() {
  const files = await collectSpecFiles('tests');
  const ids = new Set();
  const idPattern = /\bPW-(?:SMOKE|REG)-\d{3}\b/g;

  for (const file of files) {
    const contents = await readFile(file, 'utf8');
    for (const match of contents.matchAll(idPattern)) {
      ids.add(match[0]);
    }
  }

  return ids;
}

function checkUniqueIds(rows, column, label, errors) {
  const seen = new Set();
  for (const row of rows) {
    const id = row[column];
    if (!id) {
      errors.push(`${label} row is missing ${column}.`);
      continue;
    }
    if (seen.has(id)) errors.push(`Duplicate ${label} ID ${id}.`);
    seen.add(id);
  }
  return seen;
}

const rtm = await readCsv('docs/qa/rtm.csv');
const tests = await readCsv('docs/qa/test-cases.csv');
const defects = await readCsv('docs/qa/defect-log.csv');
const automationIds = await collectAutomationIds();

const errors = [];
const requirementIds = checkUniqueIds(rtm, 'Requirement ID', 'RTM', errors);
const testIds = checkUniqueIds(tests, 'Test ID', 'test case', errors);
const defectIds = checkUniqueIds(defects, 'Defect ID', 'defect', errors);

for (const row of rtm) {
  const reqId = row['Requirement ID'];
  const manualIds = splitIds(row['Manual Test IDs']);
  const automatedIds = splitIds(row['Automated Test IDs']);
  const uatIds = splitIds(row['UAT IDs']);

  if (!manualIds.length && !automatedIds.length && !uatIds.length) {
    errors.push(`${reqId} has no manual automated or UAT coverage.`);
  }

  for (const manualId of manualIds) {
    if (!testIds.has(manualId)) errors.push(`${reqId} references missing manual test ${manualId}.`);
  }

  for (const automatedId of automatedIds) {
    if (!automationIds.has(automatedId)) errors.push(`${reqId} references missing Playwright test title ${automatedId}.`);
  }

  for (const defectId of splitIds(row['Defect IDs'])) {
    if (!defectIds.has(defectId)) errors.push(`${reqId} references missing defect ${defectId}.`);
  }
}

for (const test of tests) {
  const reqId = test['Requirement ID'];
  if (reqId && !requirementIds.has(reqId)) {
    errors.push(`${test['Test ID']} references missing requirement ${reqId}.`);
  }
}

for (const defect of defects) {
  const reqId = defect['Requirement ID'];
  if (reqId && !requirementIds.has(reqId)) {
    errors.push(`${defect['Defect ID']} references missing requirement ${reqId}.`);
  }
  if (defect.Status.toLowerCase() !== 'closed' && !defect['Workflow Area']) {
    errors.push(`${defect['Defect ID']} is open but missing Workflow Area.`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('QA data validation passed.');
