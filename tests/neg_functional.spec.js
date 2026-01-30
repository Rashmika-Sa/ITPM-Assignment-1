import { test, expect } from '@playwright/test';

const TARGET_URL = 'https://www.swifttranslator.com/';
const INPUT_SELECTOR = 'textarea';
const OUTPUT_SELECTOR = 'div.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50';

async function typeInput(page, text) {
  const input = page.locator(INPUT_SELECTOR);
  await input.clear();
  await input.pressSequentially(text, { delay: 50 });
  await page.waitForTimeout(1500);
}

test.describe('Negative Functional Tests', () => {

  test('Neg_Fun_0001: Completely joined long phrase', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mamaeeyaaekkalaagedharayanavaanaethammehetayannabaeriveyikaaranayakvisseedhavalaa');
    
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම ඒයා එක්කලා ගෙදර යනවා නැතම් මෙහෙට යන්න බැරි වෙයි කාරණයක් විස්සීධ වලා');
  });

  test('Neg_Fun_0002: Excessive spacing', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mama          heta          office          ekata          yanna          hadhannee          Traffic          nisaa');
   
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම හෙට office එකට යන්න හදන්නේ Traffic නිසා');
  });

  test('Neg_Fun_0003: Random capitalization', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mAmA gEdHaRa YaNaVaA');
    
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම ගෙදර යනවා');
  });

  test('Neg_Fun_0004: Punctuation handling', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Oyata kohomadaaaa????');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('ඔයාට කොහොමද????');
  });

  test('Neg_Fun_0005: Empty input', async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.locator(INPUT_SELECTOR).clear();
    await page.waitForTimeout(500);
    
    const content = await page.locator(OUTPUT_SELECTOR).innerText();
    expect(content.trim()).toBe(''); 
  });

  test('Neg_Fun_0006: Repeated Characters', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'xxxxx yyyyy zzzzz');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('xxxxx yyyyy zzzzz');
  });

  test('Neg_Fun_0007: Intentional misspelling', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mema gidara yenava');
    
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම ගෙදර යනවා');
  });

  test('Neg_Fun_0008: Random capitalization (Repeat)', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mAmA gEdHaRa YaNaVaA');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම ගෙදර යනවා');
  });

  test('Neg_Fun_0009: Special symbols', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'ma@ma heta pan$sal yann%a inne/.');
    
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම හෙට පන්සල් යන්න ඉන්නේ.');
  });

  test('Neg_Fun_0010: Numbers Only', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, '845 654');
    
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('845 654');
  });

});