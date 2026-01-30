import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';

test.describe('UI Translation Tests', () => {

  test('Pos_UI_0001 - Page loads successfully', async ({ page }) => {
    await page.goto(URL);

    const input = page.locator('textarea');
    await expect(input).toBeVisible();
  });

});