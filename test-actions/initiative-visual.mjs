import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const out = 'output/initiative-visual'; fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const canvas = page.locator('#game');
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const state = async () => JSON.parse(await page.evaluate(() => window.render_game_to_text()));

await page.goto('http://127.0.0.1:5173/?seed=37', { waitUntil: 'networkidle' });
await page.keyboard.press('Enter'); await page.keyboard.press('1');
for (let step = 0; step < 90 && (await state()).mode === 'combat'; step++) {
  const s = await state();
  if (!s.itemUsedThisTurn && s.inventory.some(item => item.id === 'duck')) { await page.keyboard.press('q'); continue; }
  const card = s.hand.find(card => card.playable && ['patch', 'pair', 'refactor', 'panic'].includes(card.id)) || s.hand.find(card => card.playable);
  if (card) await page.keyboard.press(String(card.index + 1)); else await page.keyboard.press('Space');
}
const reward = await state();
assert.equal(reward.mode, 'reward');
const pipelineIndex = reward.rewards.findIndex(choice => choice.name === 'Test Pipeline');
assert.ok(pipelineIndex >= 0, 'Seed 37 should offer Test Pipeline');
await page.keyboard.press(String(pipelineIndex + 1));
assert.equal((await state()).mode, 'route');
await page.keyboard.press('1');
assert.equal((await state()).mode, 'combat');
let scheduled = false;
for (let step = 0; step < 16 && (await state()).mode === 'combat'; step++) {
  const s = await state();
  const card = s.hand.find(choice => choice.id === 'pipeline' && choice.playable);
  if (card) {
    await page.keyboard.press(String(card.index + 1));
    scheduled = true;
    break;
  }
  await page.keyboard.press('Space');
}
assert.ok(scheduled, 'Test Pipeline should be drawn and played');
assert.equal((await state()).initiatives[0]?.id, 'pipeline');
await canvas.screenshot({ path: `${out}/pipeline-pending.png` });
for (let i = 0; i < 2; i++) await page.keyboard.press('Space');
assert.ok((await state()).activeInitiatives.includes('Test Pipeline'));
await canvas.screenshot({ path: `${out}/pipeline-active.png` });
assert.equal(errors.length, 0, errors.join('; '));
console.log('Initiative visual passed: scheduled and activated Test Pipeline with no browser errors.');
await browser.close();
