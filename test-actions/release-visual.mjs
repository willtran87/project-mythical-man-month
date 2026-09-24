import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const out = 'output/release-visual'; fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const canvas = page.locator('#game');
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const state = async () => JSON.parse(await page.evaluate(() => window.render_game_to_text()));

await page.goto('http://127.0.0.1:5173/?seed=41', { waitUntil: 'networkidle' });
await page.keyboard.press('j');
assert.equal((await state()).archiveOpen, true);
await canvas.screenshot({ path: `${out}/archive.png` });
await page.keyboard.press('Escape');
await page.keyboard.press('Enter');
assert.equal((await state()).mode, 'route');
assert.ok((await state()).routeChoices.every(choice => choice.crisis));
await canvas.screenshot({ path: `${out}/crisis-route.png` });
await page.keyboard.press('m');
assert.equal((await state()).menuConfirmOpen, true);
await canvas.screenshot({ path: `${out}/menu-confirm.png` });
await page.keyboard.press('Escape');
assert.equal((await state()).mode, 'route');
assert.equal((await state()).menuConfirmOpen, false);
await page.keyboard.press('m');
await page.keyboard.press('Enter');
assert.equal((await state()).mode, 'intro');
await page.keyboard.press('2');
assert.equal((await state()).role, 'debugger');
await page.keyboard.press('Enter');
assert.equal((await state()).role, 'debugger');
assert.equal((await state()).mode, 'route');

await page.goto('http://127.0.0.1:5173/?seed=41', { waitUntil: 'networkidle' });
await page.keyboard.press('Enter'); await page.keyboard.press('1');
for (let step = 0; step < 35 && (await state()).mode === 'combat'; step++) {
  const s = await state();
  if (s.canShip) {
    await canvas.screenshot({ path: `${out}/release-ready.png` });
    await page.keyboard.press('r');
    break;
  }
  const skill = s.hand.find(card => card.playable && ['review', 'blueprint', 'charter', 'memo', 'hardstop'].includes(card.id));
  if (skill) await page.keyboard.press(String(skill.index + 1));
  else await page.keyboard.press('Space');
}
const shipped = await state();
assert.equal(shipped.mode, 'reward');
assert.ok(shipped.projectDebt >= 1);
assert.equal(errors.length, 0, errors.join('; '));
console.log('Release visual passed: archive, menu return and lead switch, crisis route, and early shipping.');
await browser.close();
