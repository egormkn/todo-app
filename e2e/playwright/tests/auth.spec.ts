import { expect } from '@playwright/test';
import test from '../auth.fixture';

test.describe('Login page', () => {
  test('opens', async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('shows error message when user does not exist', async ({ page }) => {
    await page.goto('/auth/login');
    const form = page.locator('form');
    const username = 'doesnotexist';
    const password = 'doesnotexist';
    await form.locator('input[name=username]').type(username);
    await form.locator('input[name=password]').type(password);
    await form.locator('button[type=submit]').click();
    await expect(form).toContainText(`User "${username}" was not found`);
  });

  test.describe('when user exists', () => {
    test('allows user to log in', async ({ page, user, baseURL }) => {
      await page.goto('/auth/login');
      const form = page.locator('form');
      await form.locator('input[name=username]').type(user.username);
      await form.locator('input[name=password]').type(user.password);
      await form.locator('button[type=submit]').click();
      await expect(page).toHaveURL(`${baseURL}`);
    });
  });
});
