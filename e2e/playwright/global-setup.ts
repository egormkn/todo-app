import { chromium, expect, FullConfig, request } from '@playwright/test';
import * as path from 'path';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const user = {
    username: 'testuser',
    password: 'password',
    name: 'Test User',
    email: 'test@example.com',
  };

  const requestContext = await request.newContext();
  const response = await requestContext.post(`${baseURL}/api/auth/signup`, {
    data: { ...user },
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  const token = body['access_token'];
  await requestContext.dispose();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${baseURL}`);
  await page.evaluate((token) => window.localStorage.setItem('access_token', token), token);
  await page.context().storageState({ path: path.join(__dirname, 'auth.json') });
  await browser.close();
}

export default globalSetup;
