import { test, expect } from '@playwright/test';

test.describe('Mobile responsiveness', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12 approx

  test('Home page has no horizontal scroll and hero adapts', async ({ page, baseURL }) => {
    await page.goto(baseURL || '/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth, 'No horizontal overflow').toBeLessThanOrEqual(viewportWidth);

    const hero = page.locator('section:has(video)');
    await expect(hero).toBeVisible();

    const heroBox = await hero.boundingBox();
    expect(heroBox?.height, 'Hero has reasonable height').toBeGreaterThan(320);
  });

  test('YouTube embeds are responsive', async ({ page, baseURL }) => {
    const target = new URL('/docs/tutorials/audio-video/', baseURL || 'http://localhost:3000').toString();
    await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const iframes = page.locator('iframe');
    const count = await iframes.count();
    if (count === 0) test.skip();
    for (let i = 0; i < count; i++) {
      const frame = iframes.nth(i);
      await expect(frame).toBeVisible();
      const box = await frame.boundingBox();
      expect((box?.width || 0) <= 390).toBeTruthy();
    }
  });
});


