import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const STORAGE_KEY = 'cycleready:v3:activities';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.resolve(__dirname, '../../src/data/seed.json');
let serializedActivities = '';

test.beforeAll(async () => {
  const raw = await readFile(seedPath, 'utf-8');
  const parsed = JSON.parse(raw) as { activities: Array<{ id: string; timeline: Array<Record<string, unknown>> }>; };
  const activitiesWithIds = parsed.activities.map((activity) => ({
    ...activity,
    timeline: activity.timeline.map((entry, index) => ({
      ...entry,
      id: `${activity.id}-timeline-${index}`
    }))
  }));
  serializedActivities = JSON.stringify(activitiesWithIds);
});

async function seedDashboard(page: Page) {
  await page.goto('/CycleReady/');
  await page.evaluate(({ storageKey, activities }) => {
    window.localStorage.clear();
    window.localStorage.setItem(storageKey, activities);
  }, { storageKey: STORAGE_KEY, activities: serializedActivities });
  await page.reload();
}

test('RQ-007 PW-REG-001 release room shows defect board generated metrics and evidence links', async ({ page }) => {
  await page.goto('/CycleReady/release-room.html');

  await expect(page.getByRole('heading', { name: /Release-ready microsite/i })).toBeVisible();
  await expect(page.getByText(/Tracked blockers/i)).toBeVisible();
  await expect(page.getByText(/Playwright smoke report/i)).toBeVisible();
  await expect(page.getByText(/Phase 5 UAT results log/i)).toBeVisible();
  await expect(page.getByText(/Metrics summary JSON/i)).toBeVisible();
  await expect(page.getByText(/Release decision JSON/i)).toBeVisible();
});

test('RQ-008 PW-REG-002 release summary shows no-go recommendation and signoff date', async ({ page }) => {
  await page.goto('/CycleReady/release-summary.html');

  await expect(page.getByRole('heading', { level: 1, name: /Release summary/i })).toBeVisible();
  await expect(page.getByText(/QA release recommendation/i)).toBeVisible();
  await expect(page.getByText(/Do Not Ship/i).first()).toBeVisible();
  await expect(page.getByText(/Signed off/i)).toBeVisible();
});

test('RQ-010 PW-REG-003 LocalStorage preserves clinician activities and reviewer notes across reload', async ({ page }) => {
  await seedDashboard(page);
  await expect(page.getByRole('heading', { name: /Thin CME QA product/i })).toBeVisible();

  const reviewNote = 'Persistent reviewer note recorded';
  await page.getByRole('radio', { name: 'Needs Correction' }).check();
  await page.getByLabel('Comment').fill(reviewNote);
  await page.getByRole('button', { name: 'Save reviewer update' }).click();
  await expect(page.getByText(/Reviewer update saved locally\./i)).toBeVisible();

  await page.reload();
  await expect(page.getByText(reviewNote).first()).toBeVisible();
});

test('RQ-015 PW-REG-004 static deployment entrypoints render dashboard release room and release summary', async ({ page }) => {
  await page.goto('/CycleReady/');
  await expect(page.getByRole('heading', { name: /Thin CME QA product/i })).toBeVisible();

  await page.goto('/CycleReady/release-room.html');
  await expect(page.getByRole('heading', { name: /Release-ready microsite/i })).toBeVisible();

  await page.goto('/CycleReady/release-summary.html');
  await expect(page.getByRole('heading', { level: 1, name: /Release summary/i })).toBeVisible();
});

test('RQ-005 PW-REG-005 upload simulator stores supporting metadata for selected activity', async ({ page }) => {
  await seedDashboard(page);
  await expect(page.getByRole('heading', { name: /Thin CME QA product/i })).toBeVisible();

  await page.locator('input[type="file"]').setInputFiles({
    name: 'supporting-evidence.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('CycleReady QA metadata fixture')
  });

  await expect(page.getByText(/Metadata stored in localStorage for QA verification\./i)).toBeVisible();
  await expect(page.getByText('supporting-evidence.pdf').first()).toBeVisible();
});
