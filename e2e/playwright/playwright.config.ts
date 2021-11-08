import { PlaywrightTestConfig } from '@playwright/test';
import * as path from 'path';

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,
  // Test directory
  testDir: path.join(__dirname, 'tests'),
  // If a test fails on CI, retry it additional 2 times
  retries: process.env.CI ? 2 : 0,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: 'test-results/',

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  // webServer: {
  //   command: 'npm run start',
  //   cwd: path.join(__dirname, '..'),
  //   port: 4200,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: true,
  // },

  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    contextOptions: {
      ignoreHTTPSErrors: true,
    },

    baseURL: 'http://localhost:4200',
  },

  // projects: [
  //   {
  //     name: 'Desktop Chrome',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //     },
  //   },
  //   {
  //     name: 'Desktop Firefox',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //     },
  //   },
  //   {
  //     name: 'Desktop Safari',
  //     use: {
  //       ...devices['Desktop Safari'],
  //     },
  //   },
  //   // Test against mobile viewports.
  //   {
  //     name: 'Mobile Chrome',
  //     use: {
  //       ...devices['Pixel 5'],
  //     },
  //   },
  //   {
  //     name: 'Mobile Safari',
  //     use: devices['iPhone 12'],
  //   },
  // ],
};
export default config;
