import { defineConfig } from '@playwright/test';

const isCi = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 60_000,
  expect: {
    timeout: 5000
  },
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/latest/playwright-results.json' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    actionTimeout: 10000,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }
  },
  projects: isCi
    ? [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        { name: 'webkit', use: { browserName: 'webkit' } }
      ]
    : [
        { name: 'chromium', use: { browserName: 'chromium' } }
      ],
  webServer: {
    command: isCi
      ? 'npm run build && npm run preview -- --host 0.0.0.0 --port 4173'
      : 'npm run dev -- --host 0.0.0.0 --port 4173',
    port: 4173,
    reuseExistingServer: !isCi,
    timeout: 120_000
  }
});
