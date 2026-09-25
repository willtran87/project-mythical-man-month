import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { newGame, startGame, chooseRoute } from '../src/battle-game.js';

const origin = process.env.GAME_URL || 'http://127.0.0.1:5173/';
const fullMotion = process.env.GAME_MOTION === 'full';
const small = process.env.GAME_VIEWPORT === 'small';
const output = `test-actions/output/systems-depth${fullMotion ? '-motion' : ''}${small ? '-small' : ''}`;
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: small ? { width: 900, height: 650 } : { width: 1200, height: 800 }, reducedMotion: fullMotion ? 'no-preference' : 'reduce' });
let page = await context.newPage();
const errors = [];
function watch(current) {
  current.on('pageerror', error => errors.push(error.message));
  current.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  current.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
}
watch(page);
await page.goto(origin);
async function openFight(cards, seed = 900, configure = () => {}) {
  const s = newGame(seed); startGame(s); chooseRoute(s, 0);
  s.hand = cards; s.sp = 12; s.hp = s.maxHp = 200; s.drawPile = ['patch', 'review']; s.discardPile = [];
  s.enemies = [s.enemies[0]]; s.enemies[0].id = 'scope'; s.enemies[0].hp = s.enemies[0].maxHp = 200;
  s.mission = null; s.crisis = '';
  configure(s);
  await page.close();
  page = await context.newPage(); watch(page);
  await page.goto(origin);
  await page.evaluate(run => localStorage.setItem('deadline-disaster-active-v1', JSON.stringify({ version: 1, savedAt: Date.now(), state: run })), s);
  await page.reload(); await page.keyboard.press('l');
  return state();
}
async function state() { return JSON.parse(await page.evaluate(() => window.render_game_to_text())); }
async function shot(name) { await page.locator('#game').screenshot({ path: `${output}/${name}.png` }); return state(); }

await openFight(['decouple', 'interfaceaudit'], 901, s => {
  s.enemies.push({ ...s.enemies[0], name: 'Linked partner', hp: 200, maxHp: 200 });
  s.mission = { id: 'coupled', resolved: false, failed: false };
  for (const enemy of s.enemies) { enemy.linkedPower = true; enemy.power++; }
});
let seen = await shot('linked-foes'); assert.ok(seen.enemies.every(enemy => enemy.linked));
await page.keyboard.press('1'); seen = await shot('coupling-severed');
assert.ok(seen.enemies.every(enemy => !enemy.linked)); assert.equal(seen.mission.resolved, true);

await openFight(['traceledger', 'watchpoint', 'casefile']);
await page.keyboard.press('1'); seen = await shot('evidence-forecast');
assert.equal(seen.evidence, 1); assert.ok(seen.enemies[0].nextIntent);
await page.keyboard.press('1'); await page.keyboard.press('Space');
seen = await shot('watchpoint-trigger'); assert.equal(seen.evidence, 3);
const caseIndex = seen.hand.findIndex(card => card.id === 'casefile'); assert.ok(caseIndex >= 0);
await page.keyboard.press(String(caseIndex + 1)); seen = await shot('evidence-spent'); assert.equal(seen.evidence, 0);

await openFight(['releasegate', 'gatecheck']);
await shot('gate-hand');
await page.keyboard.press('1'); seen = await shot('gate-active'); assert.equal(seen.initiatives[0].needed, 3);
await page.keyboard.press('g'); seen = await shot('gate-choice'); assert.equal(seen.pendingChoice.kind, 'releasegate');
assert.deepEqual(seen.choiceOptions.map(option => option.name), ['Test', 'Rush', 'Abort']);
await page.keyboard.press('1'); seen = await shot('gate-tested'); assert.equal(seen.initiatives[0].progress, 1);
await page.reload(); await page.keyboard.press('l'); seen = await state();
assert.equal(seen.initiatives[0].progress, 1, 'gate progress survives save and resume');
await page.keyboard.press('Space'); await page.keyboard.press('g'); await page.keyboard.press('2');
seen = await shot('gate-cleared'); assert.equal(seen.initiatives.length, 0); assert.equal(seen.projectDebt, 1);

await openFight(['defect', 'patch'], 902, s => { s.projectDebt = 4; s.evidence = 2; });
await shot('defect-hand');
await page.keyboard.press('1'); seen = await shot('defect-choice');
assert.equal(seen.pendingChoice.kind, 'defect'); assert.equal(seen.choiceOptions[2].available, true);
await page.keyboard.press('3'); seen = await shot('defect-automated');
assert.equal(seen.projectDebt, 2); assert.equal(seen.evidence, 0);

await openFight(['prototype', 'reclaim', 'salvage'], 903, s => { s.discardPile = ['patch', 'review']; });
await page.keyboard.press('1'); seen = await shot('prototype-exhausted'); assert.ok(seen.exhausted.includes('One-Off Prototype'));
await page.keyboard.press('1'); seen = await shot('reclaim-choice'); assert.equal(seen.pendingChoice.kind, 'reclaim');
await page.keyboard.press('1'); seen = await shot('prototype-reclaimed'); assert.ok(seen.hand.some(card => card.name === 'One-Off Prototype'));
await page.keyboard.press('1'); seen = await shot('salvage-choice'); assert.equal(seen.pendingChoice.kind, 'salvage');
await page.keyboard.press('1'); seen = await shot('salvage-result'); assert.equal(seen.pendingChoice, null); assert.ok(seen.drawSize >= 1);

await openFight(['salvage'], 904, s => { s.discardPile = ['patch', 'review', 'memo', 'pair', 'refactor', 'critical']; });
await page.keyboard.press('1'); await page.keyboard.press('ArrowRight');
seen = await shot('salvage-page-two'); assert.equal(seen.pendingChoice.page, 1);
assert.equal(seen.choiceOptions[0].name, 'Critical Path');
await page.keyboard.press('1'); seen = await state(); assert.equal(seen.pendingChoice, null);

for (const file of ['coupling.webp', 'evidence-ledger.webp', 'release-gate.webp', 'defect-triage.webp', 'deck-recovery.webp']) {
  const response = await page.request.get(new URL(`assets/cards/${file}`, origin).toString());
  assert.equal(response.status(), 200, file);
  assert.match(response.headers()['content-type'], /image\/webp/, file);
}
assert.deepEqual(errors, []);
console.log('Systems depth browser: five mechanics, choices, art, and console passed.');
await browser.close();
