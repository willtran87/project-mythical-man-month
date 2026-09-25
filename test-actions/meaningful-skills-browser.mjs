import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { newGame, startGame, chooseRoute } from '../src/battle-game.js';

const origin = process.env.GAME_URL || 'http://127.0.0.1:5173/';
const small = process.env.GAME_VIEWPORT === 'small';
const fullMotion = process.env.GAME_MOTION === 'full';
const output = `test-actions/output/meaningful-skills${small ? '-small' : ''}${fullMotion ? '-motion' : ''}`;
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: small ? { width: 900, height: 650 } : { width: 1200, height: 800 }, reducedMotion: fullMotion ? 'no-preference' : 'reduce' });
let page;
const errors = [];
async function openFight(cards, configure = () => {}) {
  const s = newGame(1250); startGame(s); chooseRoute(s, 0);
  s.hand = cards; s.sp = 12; s.hp = s.maxHp = 200; s.drawPile = ['patch']; s.discardPile = [];
  s.enemies = [{ ...s.enemies[0], id: 'warden', name: 'Red Tape Warden', art: 'warden', step: 0, power: 0, hp: 200, maxHp: 200 }];
  s.mission = null; s.crisis = '';
  configure(s);
  if (page) await page.close();
  page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(origin);
  await page.evaluate(run => localStorage.setItem('deadline-disaster-active-v1', JSON.stringify({ version: 1, savedAt: Date.now(), state: run })), s);
  await page.reload(); await page.keyboard.press('l');
  return state();
}
async function state() { return JSON.parse(await page.evaluate(() => window.render_game_to_text())); }
async function shot(name) { await page.locator('#game').screenshot({ path: `${output}/${name}.png` }); return state(); }

await openFight(['criticalpathcontrol', 'killswitch'], s => { s.initiatives = [{ id: 'pipeline', remaining: 2 }, { id: 'protocol', remaining: 2 }]; });
await shot('warden-and-projects');
await page.keyboard.press('1'); let seen = await shot('choose-project');
assert.equal(seen.pendingChoice.kind, 'projectcontrol');
assert.deepEqual(seen.choiceOptions.map(option => option.name), ['Test Pipeline', 'Handoff Protocol']);
await page.reload(); await page.keyboard.press('l'); seen = await state();
assert.equal(seen.pendingChoice.kind, 'projectcontrol', 'project choice survives save and resume');
await page.keyboard.press('2'); seen = await shot('project-advanced');
assert.equal(seen.initiatives[1].turns, 1);
await page.keyboard.press('1'); seen = await shot('abandon-project');
assert.equal(seen.pendingChoice.action, 'abort');
await page.keyboard.press('1'); seen = await state();
assert.equal(seen.initiatives.length, 1); assert.equal(seen.projectDebt, 1);

await openFight(['precisioncounter'], s => { s.evidence = 2; s.initiatives = [{ id: 'pipeline', remaining: 2 }]; });
await page.keyboard.press('1'); seen = await shot('precision-choice');
assert.equal(seen.choiceOptions[1].available, true);
await page.reload(); await page.keyboard.press('l'); seen = await state();
assert.equal(seen.pendingChoice.kind, 'precisioncounter', 'counter choice survives save and resume');
await page.keyboard.press('2'); seen = await shot('precision-canceled');
assert.match(seen.enemies[0].intent, /CANCELED/); assert.equal(seen.evidence, 0);
await page.keyboard.press('Space'); seen = await state(); assert.equal(seen.initiatives[0].turns, 1);

await openFight(['hotfixforge', 'defect', 'patch']);
await page.keyboard.press('1'); seen = await shot('rewrite-choice');
assert.deepEqual(seen.choiceOptions.map(option => option.name), ['Open Defect', 'Patch']);
await page.keyboard.press('1'); seen = await shot('rewritten-prototype');
assert.ok(seen.hand.some(card => card.id === 'prototype'));

await openFight(['contractor'], s => { s.credits = 20; });
seen = await shot('contractor-ready'); assert.equal(seen.hand[0].playable, true);
await page.keyboard.press('1'); seen = await shot('contractor-used');
assert.equal(seen.credits, 5); assert.equal(seen.onboardingPending, 1); assert.equal(seen.contractorUsed, true);

for (const file of ['critical-path-control.webp', 'precision-counter.webp', 'hotfix-forge.webp', 'emergency-contractor.webp']) {
  const response = await page.request.get(new URL(`assets/cards/${file}`, origin).toString());
  assert.equal(response.status(), 200, file);
}
assert.equal((await page.request.get(new URL('assets/enemies/red-tape-warden.webp', origin).toString())).status(), 200);
assert.deepEqual(errors, []);
console.log('Meaningful skills browser: choices, Warden, art, and console passed.');
await browser.close();
