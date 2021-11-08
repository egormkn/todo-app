import { expect } from '@playwright/test';
import * as path from 'path';
import test from '../auth.fixture';

test.describe('Index page', () => {
  test('opens', async ({ page }) => {
    await page.goto('/');
  });

  test('contains header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('ToDo');
  });

  test('contains a hero block with screenshot', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main');
    await expect(main).toContainText('Organize it all');
    await expect(main.locator('img')).toHaveAttribute('src', /screenshot\.png/);
  });

  test.describe('when not authenticated', () => {
    test('header contains Sign Up and Log In buttons', async ({ page }) => {
      await page.goto('/');
      const header = page.locator('header');
      await expect(header).toBeVisible();
      await expect(header.locator('a:has-text("Sign Up")')).toBeVisible();
      await expect(header.locator('a:has-text("Log In")')).toBeVisible();
    });

    test('hero block contains Sign Up and Log In buttons', async ({ page }) => {
      await page.goto('/');
      const main = page.locator('main');
      await expect(main).toBeVisible();
      await expect(main.locator('a:has-text("Sign Up")')).toBeVisible();
      await expect(main.locator('a:has-text("Log In")')).toBeVisible();
    });
  });

  test.describe('when authenticated', () => {
    test.use({ storageState: path.join(__dirname, '..', 'auth.json') });

    test('header contains profile button', async ({ page, user }) => {
      await page.goto('/');
      const header = page.locator('header');
      await expect(header).toBeVisible();
      await expect(header.locator(`button:has-text("${user.name}")`)).toBeVisible();
    });

    test('hero block contains Launch button', async ({ page }) => {
      await page.goto('/');
      const main = page.locator('main');
      await expect(main).toBeVisible();
      await expect(main.locator(`a:has-text("Launch")`)).toBeVisible();
    });
  });
});
