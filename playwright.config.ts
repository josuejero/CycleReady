import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/smoke',
  timeout: 60_000,
  expect: {
    timeout: 5000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    actionTimeout: 10000,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }
  },
  webServer: {
    command: 'npm run dev -- --host 0.0.0.0 --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI
  }
});
