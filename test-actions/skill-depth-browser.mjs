import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { newGame, startGame, chooseRoute } from '../src/battle-game.js';

const origin = process.env.GAME_URL || 'http://127.0.0.1:5173/';
const output = 'test-actions/output/skill-depth';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1200, height: 800 }, reducedMotion: 'reduce' });
let page = await context.newPage();
const errors = [];
function watch(current) {
  current.on('pageerror', error => errors.push(error.message));
  current.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
}
watch(page);
await page.goto(origin);
async function openFight(cards, seed = 771, configure = () => {}) {
  const s = newGame(seed); startGame(s); chooseRoute(s, 0);
  s.hand = cards; s.sp = 8; s.drawPile = ['patch', 'review', 'memo']; s.discardPile = [];
  s.enemies = [s.enemies[0]]; s.enemies[0].hp = s.enemies[0].maxHp = 120;
  configure(s);
  await page.evaluate(run => localStorage.setItem('deadline-disaster-active-v1', JSON.stringify({ version: 1, savedAt: Date.now(), state: run })), s);
  page = await context.newPage(); watch(page);
  await page.goto(origin); await page.keyboard.press('l');
  const state = JSON.parse(await page.evaluate(() => window.render_game_to_text()));
  assert.equal(state.mode, 'combat');
  return state;
}
async function openSaved(run) {
  await page.evaluate(state => localStorage.setItem('deadline-disaster-active-v1', JSON.stringify({ version: 1, savedAt: Date.now(), state })), run);
  page = await context.newPage(); watch(page);
  await page.goto(origin); await page.keyboard.press('l');
  return JSON.parse(await page.evaluate(() => window.render_game_to_text()));
}
async function snapshot(name) {
  await page.screenshot({ path: `${output}/${name}.png` });
  return JSON.parse(await page.evaluate(() => window.render_game_to_text()));
}

await openFight(['scopechoice', 'grooming', 'migration', 'changefreeze', 'decisionrecord']);
await snapshot('new-hand');
await page.keyboard.press('1');
let state = await snapshot('scope-choice');
assert.equal(state.pendingChoice.kind, 'scopechoice');
await page.keyboard.press('2');
state = await snapshot('scope-result');
assert.equal(state.pendingChoice, null); assert.equal(state.projectDebt, 1);

await openFight(['grooming', 'patch', 'review']);
await page.keyboard.press('1');
state = await snapshot('grooming-choice'); assert.equal(state.pendingChoice.kind, 'grooming');
await page.keyboard.press('1');
state = await snapshot('grooming-result'); assert.equal(state.setAside.length, 1);
await page.keyboard.press('Space');
state = await snapshot('grooming-return'); assert.equal(state.setAside.length, 0);
assert.ok(state.hand.some(c => c.name === 'Patch'), 'selected card returns next turn');

await openFight(['migration', 'review', 'memo']);
await page.keyboard.press('1');
state = await snapshot('project-armed'); assert.equal(state.initiatives[0].progress, 0);
await page.keyboard.press('1');
state = await snapshot('project-progress'); assert.equal(state.initiatives[0].progress, 1);
await page.keyboard.press('1');
state = await snapshot('project-complete'); assert.equal(state.initiatives.length, 0);

await openFight(['changefreeze', 'pagerduty'], 772, s => { s.enemies[0].id = 'scope'; s.enemies[0].step = 0; });
await page.keyboard.press('1'); await page.keyboard.press('1');
state = await snapshot('reactions-armed'); assert.equal(state.enemies[0].reactions.length, 2);
await page.keyboard.press('Space');
state = await snapshot('reactions-resolved'); assert.equal(state.enemies[0].reactions.length, 0);
assert.ok(state.enemies[0].weak >= 1);

await openFight(['archiveticket', 'defect', 'patch']);
await page.keyboard.press('1');
state = await snapshot('archive-choice'); assert.equal(state.pendingChoice.kind, 'archiveticket');
await page.keyboard.press('1');
state = await snapshot('archive-result'); assert.ok(state.exhausted.includes('Open Defect'));

const upgrade = newGame(779); startGame(upgrade); chooseRoute(upgrade, 0);
upgrade.mode = 'upgrade'; upgrade.deck[0] = 'migration'; upgrade.upgradePending = { id: 'migration', index: 0 };
state = await openSaved(upgrade);
assert.match(state.upgradeChoices[0].detail, /Only 1 more skill/);
assert.match(state.upgradeChoices[1].detail, /no Debt/);
await snapshot('upgrade-branches');
await page.keyboard.press('1');
state = await snapshot('upgrade-selected'); assert.equal(state.mode, 'route');

for (const file of ['decision-record.webp', 'change-freeze.webp', 'backlog-grooming.webp', 'migration-plan.webp', 'scope-decision.webp']) {
  const response = await page.request.get(new URL(`assets/cards/${file}`, origin).toString());
  assert.equal(response.status(), 200, file);
  assert.match(response.headers()['content-type'], /image\/webp/, file);
}
assert.deepEqual(errors, []);
console.log('Skill depth browser: choices, set-aside, project completion, five art files and console passed.');
await browser.close();
