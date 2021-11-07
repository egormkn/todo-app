import { expect, test } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/auth/login');
  // await page.locator('text=Log In').click();
  await expect(page).toHaveTitle(/ToDo/);
});
