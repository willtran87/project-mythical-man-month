import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const out = 'output/rarity-visual';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const canvas = page.locator('#game');
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('requestfailed', request => errors.push(`${request.failure()?.errorText} ${request.url()}`));
const state = async () => JSON.parse(await page.evaluate(() => window.render_game_to_text()));

try {
  await page.goto('http://127.0.0.1:5173/?seed=1', { waitUntil: 'networkidle' });
  await page.keyboard.press('2'); // Debugger
  await page.keyboard.press('Enter');
  await page.keyboard.press('1');
  for (let step = 0; step < 100 && (await state()).mode === 'combat'; step++) {
    const s = await state();
    if (!s.itemUsedThisTurn && s.inventory.some(item => item.id === 'duck')) {
      await page.keyboard.press('q');
      continue;
    }
    const card = s.hand.find(card => card.playable && ['patch', 'pair', 'refactor', 'panic', 'trace', 'rootcause'].includes(card.id)) || s.hand.find(card => card.playable);
    if (card) await page.keyboard.press(String(card.index + 1));
    else await page.keyboard.press('Space');
  }
  let s = await state();
  assert.equal(s.mode, 'reward');
  assert.equal(s.rewards[0].name, 'Diagnostic Probe');
  assert.equal(s.rewards[0].rarity, 'common');
  assert.equal(s.rewards[0].power, 3);
  await canvas.screenshot({ path: `${out}/probe-reward.png` });
  await page.keyboard.press('1');
  await page.keyboard.press('1');
  for (let turn = 0; turn < 5; turn++) {
    s = await state();
    if (s.hand.some(card => card.id === 'probe')) break;
    assert.equal(s.mode, 'combat');
    await page.keyboard.press('Space');
  }
  s = await state();
  const probe = s.hand.find(card => card.id === 'probe');
  assert.ok(probe, 'the new skill should be drawn in the next fight');
  await canvas.screenshot({ path: `${out}/probe-hand.png` });
  await page.keyboard.press(String(probe.index + 1));
  s = await state();
  assert.ok(s.enemies.some(enemy => enemy.mark > 0), 'playing Probe should show Mark on a foe');
  await canvas.screenshot({ path: `${out}/marked-foe.png` });
  assert.deepEqual(errors, []);
  console.log('Rarity visual passed: tiered reward, illustrated skill, Mark status, no browser errors.');
} finally {
  await browser.close();
}
