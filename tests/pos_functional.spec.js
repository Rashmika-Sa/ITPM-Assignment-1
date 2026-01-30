import { test, expect } from '@playwright/test';

const TARGET_URL = 'https://www.swifttranslator.com/';
const INPUT_SELECTOR = 'textarea';
const OUTPUT_SELECTOR = 'div.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50';

// Helper for realistic typing
async function typeInput(page, text) {
  const input = page.locator(INPUT_SELECTOR);
  await input.clear();
  await input.pressSequentially(text, { delay: 50 });
  await page.waitForTimeout(1500);
}

test.describe('Positive Functional Tests', () => {

  test('Pos_Fun_0001: Simple sentence', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mama mal kadanavaa');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම මල් කඩනවා');
  });

  test('Pos_Fun_0002: Long mixed-language', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Mata saniipa naethi nisaa, heta enna baeri veyi');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මට සනීප නැති නිසා, හෙට එන්න බැරි වෙයි');
  });

  test('Pos_Fun_0003: Short request + English phrase', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mata help ekak karanna puLuvandha?');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මට help එකක් කරන්න පුළුවන්ද?');
  });

  test('Pos_Fun_0004: Compound + Interrogative', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Oyaa hodhin innavaa nedha?');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('ඔයා හොදින් ඉන්නවා නේද?');
  });

  test('Pos_Fun_0005: Complex + Imperative', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'karunaakara mata ee gaena dhanuvath karanna, mokadha eeka mata ithaamath vaedhagath .');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('කරුනාකර මට ඒ ගැන දනුවත් කරන්න, මොකද ඒක මට ඉතාමත් වැදගත් .');
  });

  test('Pos_Fun_0006: Present tense daily activity', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mama dhaen office ekea vaeda.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම දැන් office එකේ වැඩ.');
  });

  test('Pos_Fun_0007: Future tense with negation', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mama iiLaGa vaessa avoth paasal yannee naehae');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම ඊළඟ වැස්ස අවොත් පාසල් යන්නේ නැහැ');
  });

  test('Pos_Fun_0008: Informal response', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'ov mama karannan');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('ඔව් මම කරන්නන්');
  });

  test('Pos_Fun_0009: Polite command', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'samaavenna, mata thavath tika velaavak oonee meeka kiyavanna');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('සමාවෙන්න, මට තවත් ටික වෙලාවක් ඕනේ මේක කියවන්න');
  });

  test('Pos_Fun_0010: Long paragraph', async ({ page }) => {
    await page.goto(TARGET_URL);
    const input = `Api edhaa oyaa enakam balan hitiyaa, haebaeyi oyaa avee naethi nisaa edhaa api giyeth naehae.`;
    await typeInput(page, input);
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අපි එදා ඔයා එනකම් බලන් හිටියා');
  });

  test('Pos_Fun_0011: Repeated emphasis', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'loku loku dhevaal tika gannan.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('ලොකු ලොකු දෙවාල් ටික ගන්නන්.');
  });

  test('Pos_Fun_0012: Mixed English brand', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'api passee WhatsApp group ekee message dhaala LinkedIn profile eka update karamu');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අපි පස්සේ WhatsApp group එකේ message දාල LinkedIn profile එක update කරමු');
  });

  test('Pos_Fun_0013: Units of measurement', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Ammaa edhdhi parippu 2kg genavaa.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අම්මා එද්දි පරිප්පු 2kg ගෙනවා.');
  });

  test('Pos_Fun_0014: Sentences containing places', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Api heta Galle yanavaa');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අපි හෙට Galle යනවා');
  });

  test('Pos_Fun_0015: Line breaks', async ({ page }) => {
    await page.goto(TARGET_URL);
    // Note: Manual typing needed for newlines to register correctly in some UIs
    await page.locator(INPUT_SELECTOR).pressSequentially('oyaa yanna,\nmama innam', {delay: 50});
    await page.waitForTimeout(1500);
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('ඔයා යන්න,');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම ඉන්නම්');
  });

  test('Pos_Fun_0016: Currency and measurement', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mama meeka Rs10000 vikuNalaa, aluth vaahanayak gannavaa.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම මේක Rs10000 විකුණලා, අලුත් වාහනයක් ගන්නවා.');
  });

  test('Pos_Fun_0017: Colloquial expression', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'machan mata PIN code ekayi OTP ekayi SMS ekaking evanna FYI.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මචන් මට PIN code එකයි OTP එකයි SMS එකකින්ග් එවන්න FYI.');
  });

  test('Pos_Fun_0018: Question with plural subject', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Api dhaen mokadha karannea?');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අපි දැන් මොකද කරන්නේ?');
  });

  test('Pos_Fun_0019: Slang', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Ammatasiri, supiriyak thamaa!');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අම්මටසිරි, සුපිරියක් තමා!');
  });

  test('Pos_Fun_0020: Simple daily activity', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Ammaa kadee giyaa.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('අම්මා කඩේ ගියා.');
  });

  test('Pos_Fun_0021: Interrogative phrase', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Oyaata meaka mathakadha?');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('ඔයාට මේක මතකද?');
  });

  test('Pos_Fun_0022: Imperative phrase', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'Ennayi kivve mehaata');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('එන්නයි කිව්වෙ මෙහාට');
  });

  test('Pos_Fun_0023: Question with multiple ideas', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'mama dhaen yanna hadhanne, oyath enavadha maath ekka yanna?');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('මම දැන් යන්න හදන්නෙ, ඔයත් එනවද මාත් එක්ක යන්න?');
  });

  test('Pos_Fun_0024: Sentences with multiple spaces', async ({ page }) => {
    await page.goto(TARGET_URL);
    await typeInput(page, 'thaaththaa        gedhara          avaa.');
    await expect(page.locator(OUTPUT_SELECTOR)).toContainText('තාත්තා        ගෙදර          අවා.');
  });

});