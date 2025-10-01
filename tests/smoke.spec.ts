import { test, expect } from '@playwright/test';

test.describe('Smoke navigation', () => {
  const routes = ['/', '/docs', '/docs/getting-started', '/blog'];

  for (const route of routes) {
    test(`navigates to ${route}`, async ({ page }) => {
      await page.goto(route);
      const anyNav = page.getByRole('navigation').first();
      await expect(anyNav).toBeVisible();
      if (route === '/') {
        await expect(page.getByRole('heading', { name: /Anomaly Modding Book/i })).toBeVisible();
      } else {
        // main may be empty briefly on Firefox; assert any heading present
        await expect(page.locator('h1, h2').first()).toBeVisible();
      }
    });
  }
});


