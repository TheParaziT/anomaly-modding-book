import { test, expect } from '@playwright/test';

test.describe('Core pages render', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Anomaly Modding Book/i);
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('docs index loads', async ({ page }) => {
    await page.goto('/docs');
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('blog loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('article, .blogHome, .blogListPage')).toBeTruthy();
  });
});
