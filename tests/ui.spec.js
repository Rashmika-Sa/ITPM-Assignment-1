import { test, expect } from '@playwright/test';

const TARGET_URL = 'https://www.swifttranslator.com/';
const INPUT_SELECTOR = 'textarea';
const OUTPUT_SELECTOR = 'div.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50';

test.describe('UI Tests', () => {

  test('Pos_UI_0001: Live output refresh after deleting characters', async ({ page }) => {
    await page.goto(TARGET_URL);
    const input = page.locator(INPUT_SELECTOR);
    const output = page.locator(OUTPUT_SELECTOR);

    await input.pressSequentially('Mama school yanavaa', { delay: 50 });
    await page.waitForTimeout(1000);
    
    await expect(output).toContainText('මම school යනවා');

    for (let i = 0; i < 7; i++) {
      await input.press('Backspace');
      await page.waitForTimeout(100);
    }
    
    await expect(output).not.toContainText('යනවා'); 
  });

});