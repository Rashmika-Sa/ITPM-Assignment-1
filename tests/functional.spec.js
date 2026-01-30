import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';

async function translate(page, text) {
  // Input textarea
  const input = page.locator('textarea');

  // Output Sinhala text container
  const output = page.locator('div').filter({
    hasText: /[\u0D80-\u0DFF]/ // Sinhala Unicode range
  }).first();

  await input.waitFor({ state: 'visible' });
  await input.fill(text);

  // Wait until Sinhala characters appear
  await page.waitForFunction(() => {
    const divs = document.querySelectorAll('div');
    return [...divs].some(d => /[\u0D80-\u0DFF]/.test(d.innerText));
  }, { timeout: 15000 });

  return await output.textContent();
}


test.describe('Functional Translation Tests', () => {

  test('Pos_Fun_0001 - Daily usage short sentence', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, 'mama mal kadanavaa');

    expect(result).not.toBeNull();
    expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0002 - Long mixed language input', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Mata saniipa naethi nisaa, heta enna baeri veyi?');
  expect(result.trim().length).toBeGreaterThan(0);
  });

   test('Pos_Fun_0003 - Short request+common english phrase', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'mata help ekak karanna puLuvandha?');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0004 - Converts a compund +  Interrogative phrase', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Oyaa hodhin innavaa nedha?');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0005 - Converts a complex + Imperative phrase', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'karunaakara mata ee gaena dhanuvath karanna, mokadha eeka mata ithaamath vaedhagath .');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0006 - Convert present tense daily activity', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'mama dhaen office ekea vaeda');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0007 - Convert future tense with negation', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'mama iiLaGa vaessa avoth paasal yannee naehae');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0008 - Convert informal response with pronoun', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'ov mama karannan');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0009 - Convert polite command with multiple words', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'samaavenna, mata thavath tika velaavak oonee meeka kiyavanna');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0010 - Long paragraph with complex narrative', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Api edhaa oyaa enakam balan hitiyaa, haebaeyi oyaa avee naethi nisaa edhaa api giyeth naehae. api aayee ee gamana labana sathiyee yanna innea oyaata enna puluvan nam enna api ekka edhaata yanna, mokadha api ekka yanna thava dhennek enavaa kiyuvvaa . Ithin api thava thaen godakata yanna hithan inne. Oyaatath enna puluvan nam enna edhaata apita hodhata vinoodha venna puluvan. ');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0011 - Convert phrase with repeated emphasis', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'loku loku dhevaal tika gannan');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0012 - Mixed English brand with Singlish', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'api passee WhatsApp group ekee message dhaala LinkedIn profile eka update karamu');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0013 - Units of measurement', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Ammaa edhdhi parippu 2kg genavaa.');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0014 - Sentences containing places', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Api heta Galle yanavaa');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0015 - Line breaks (multi-line input)', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'oyaa yanna,mama innam.');
  expect(result.trim().length).toBeGreaterThan(0);
  });

   test('Pos_Fun_0016 - Input with currency and measurement', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'mama meeka Rs10000 vikuNalaa, aluth vaahanayak gannavaa.');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0017 - Colloquial expression with abbreviations', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'machan mata PIN code ekayi OTP ekayi SMS ekaking evanna FYI.');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0018 - Convert question with plural subject', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Api dhaen mokadha karannea?');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0019 - Convert line breaks(multi-line input)', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Ammatasiri, supiriyak thamaa!');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0020 - Convert simple daily activity sentence', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Ammaa kadee giyaa.');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0021 - Converts a  Interrogative phrase', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Oyaata meaka mathakadha?');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0022 - Converts a  Imperative phrase', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'Ennayi kivve mehaata');
  expect(result.trim().length).toBeGreaterThan(0);
  });

   test('Pos_Fun_0023 - Convert question with multiple ideas', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'mama dhaen yanna hadhanne, oyath enavadha maath ekka yanna?');
  expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0024 - Convers sentences with multiple spaces', async ({ page }) => {
  await page.goto(URL);
  const result = await translate(page, 'thaaththaa        gedhara          avaa.');
  expect(result.trim().length).toBeGreaterThan(0);
  });

});
test.describe('Negative Functional Translation Tests', () => {

  test('Neg_Fun_0001 - Completely joined long phrase', async ({ page }) => {
    await page.goto(URL);

    const input =
      'mamaeeyaaekkalaagedharayanavaanaethammehetayannabaeriveyikaaranayakvisseedhavalaa';

    const result = await translate(page, input);

    await test.info().attach('Observed Output', {
      body: result,  
      contentType: 'text/plain'
    });

    expect(result).not.toBeNull();
  });

  test('Neg_Fun_0002 - Excessive spacing in medium text', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(
      page,
      'mama          heta          office          ekata          yanna          hadhannee          Traffic          nisaa'
    );

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Neg_Fun_0003 - Random capitalization pattern', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, 'mAmA gEdHaRa YaNaVaA');

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result).not.toBeNull();
  });

  test('Neg_Fun_0004 - Excessive repeated punctuation', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, 'Oyata kohomadaaaa????');

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Neg_Fun_0005 - Empty input handling', async ({ page }) => {
    await page.goto(URL);

    const input = page.locator('textarea');
    await input.fill('');

    await page.waitForTimeout(1000);

    const pageText = await page.textContent('body');

    await test.info().attach('Observed Output', {
      body: pageText || 'No output generated',
      contentType: 'text/plain'
    });

    expect(pageText).not.toBeNull();
  });

  test('Neg_Fun_0006 - Repeated random characters', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, 'xxxxx yyyyy zzzzz');

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result).not.toBeNull();
  });

  test('Neg_Fun_0007 - Misspelled words with wrong vowels', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, 'mema gidara yenava');

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Neg_Fun_0008 - Mixed random uppercase letters', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, 'mAmA gEdHaRa YaNaVaA');

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result).not.toBeNull();
  });

  test('Neg_Fun_0009 - Special symbols inside words', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(
      page,
      'ma@ma heta pan$sal yann%a inne/.'
    );

    await test.info().attach('Observed Output', {
      body: result,
      contentType: 'text/plain'
    });

    expect(result.trim().length).toBeGreaterThan(0);
  });

  test('Neg_Fun_0010 - Numbers only input', async ({ page }) => {
    await page.goto(URL);

    const result = await translate(page, '845 654');

    await test.info().attach('Observed Output', {
      body: result || 'No conversion',
      contentType: 'text/plain'
    });

    expect(result).not.toBeNull();
  });

});



