import { access, cp, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const docsSource = resolve(projectRoot, 'docs');
const docsTarget = resolve(projectRoot, 'public', 'docs');
const reportSource = resolve(projectRoot, 'playwright-report');
const reportTarget = resolve(projectRoot, 'public', 'playwright-report');

async function ensureSourceExists(source, name) {
  try {
    await access(source, constants.F_OK);
  } catch (err) {
    throw new Error(`Missing ${name} directory at ${source}`);
  }
}

async function syncDirectory(source, target, name) {
  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true });
  console.log(`Synced ${name} from ${source} to ${target}`);
}

async function main() {
  await ensureSourceExists(docsSource, 'docs');
  await ensureSourceExists(reportSource, 'playwright-report');
  await syncDirectory(docsSource, docsTarget, 'docs');
  await syncDirectory(reportSource, reportTarget, 'playwright report');
}

main().catch((error) => {
  console.error('Failed to sync static assets:', error);
  process.exit(1);
});
