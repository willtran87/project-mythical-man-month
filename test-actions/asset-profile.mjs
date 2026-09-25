import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('requestfailed', request => errors.push(`${request.failure()?.errorText} ${request.url()}`));
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
await page.goto(process.env.GAME_URL || 'http://127.0.0.1:5173/?seed=42', { waitUntil: 'networkidle' });
async function report(mode) {
  await page.waitForLoadState('networkidle');
  const result = await page.evaluate(() => {
    const entries = performance.getEntriesByType('resource').filter(entry => entry.name.includes('/assets/'));
    return { mode: JSON.parse(window.render_game_to_text()).mode, assets: entries.length, mb: +(entries.reduce((sum, entry) => sum + entry.encodedBodySize, 0) / 1048576).toFixed(2), files: entries.map(entry => entry.name.split('/').pop()) };
  });
  console.log(`${mode}: ${JSON.stringify({ mode: result.mode, assets: result.assets, mb: result.mb })}`);
  return result;
}
const title = await report('title');
await page.keyboard.press('Enter');
await page.waitForTimeout(750);
const route = await report('route');
await page.keyboard.press('1');
await page.waitForTimeout(750);
const combat = await report('combat');
console.log(`new combat assets: ${JSON.stringify(combat.files.filter(file => !route.files.includes(file)))}`);
console.log(`errors: ${JSON.stringify(errors)}`);
assert.ok(title.assets <= 8 && title.mb <= 1, 'title should request only its visible art');
assert.ok(route.mb <= 4 && combat.mb <= 5, 'preloaded combat art should fit the transfer budget');
assert.deepEqual(errors, []);
await browser.close();
