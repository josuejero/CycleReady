import { test, expect } from '@playwright/test';
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

test.beforeEach(async ({ page }) => {
  await page.addInitScript((activities) => {
    window.localStorage.clear();
    window.localStorage.setItem(STORAGE_KEY, activities);
  }, serializedActivities);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Thin CME QA product/i })).toBeVisible();
});

test('successful CME submission queues a new log and surfaces the confirmation banner', async ({ page }) => {
  await page.getByLabel('Activity Title').fill('Remote collaboration workflow');
  await page.getByLabel('Provider').fill('Remote CME Consortium');
  await page.getByLabel('Credits').fill('3');
  await page.getByLabel('Completion date').type('2026-02-28');
  await page.getByLabel('Category').selectOption('Educational');
  await page.getByRole('button', { name: /Save & queue for review/i }).click();

  await expect(page.getByText(/CME log saved locally and pushed into history for review\./)).toBeVisible();
  await expect(page.getByText(/Metadata will be added via the upload simulator\./i).first()).toBeVisible();
});

test('invalid submission is blocked and the validation banner appears', async ({ page }) => {
  await page.getByRole('button', { name: /Save & queue for review/i }).click();

  await expect(page.getByText(/One or more required fields are invalid/i)).toBeVisible();
  await expect(page.getByText(/Title is required so QA knows which activity to test\./i)).toBeVisible();
});

test('reminders call out activities that still need supporting metadata', async ({ page }) => {
  const reasonText = /Upload provider certificate metadata for Simulation CME log to satisfy reminders\./i;
  await expect(page.getByText(reasonText)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Upload metadata' })).toHaveCount(2);
});

test('history reflects the latest reviewer update in the detail text', async ({ page }) => {
  const reviewNote = 'QA regression note recorded';
  await page.getByRole('radio', { name: 'Needs Correction' }).check();
  await page.getByLabel('Comment').fill(reviewNote);
  await page.getByRole('button', { name: 'Save reviewer update' }).click();

  await expect(page.getByText(/Reviewer update saved locally\./i)).toBeVisible();
  await expect(page.getByText(reviewNote).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /Newest submissions first/i })).toBeVisible();
});
