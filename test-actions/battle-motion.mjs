import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const out = 'output/battle-motion';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const url = process.env.GAME_URL || 'http://127.0.0.1:5174/';
const state = async target => JSON.parse(await target.evaluate(() => window.render_game_to_text()));
const advance = ms => page.evaluate(duration => window.advanceTime(duration), ms);
const shot = name => page.locator('#game').screenshot({ path: `${out}/${name}.png` });

await page.goto(`${url}?seed=41`, { waitUntil: 'networkidle' });
await page.clock.pauseAt(new Date());
await page.keyboard.press('Enter');
await page.keyboard.press('1');
assert.equal((await state(page)).mode, 'combat');
assert.equal((await state(page)).motion.drawingHand, true);
await advance(260);
await shot('hero-idle-a');
await advance(850);
await shot('hero-idle-b');

let s = await state(page);
const shield = s.hand.find(card => card.playable && card.id === 'review');
assert.ok(shield, 'starter hand needs a Block skill');
await page.keyboard.press(String(shield.index + 1));
assert.equal((await state(page)).motion.hero, 'shield');
await advance(90);
await shot('hero-block');
await page.keyboard.press('a');
assert.equal((await state(page)).motion.hero, 'role');
await advance(100);
await shot('architect-ability-accent');
await advance(210);
s = await state(page);
const attack = s.hand.find(card => card.playable && card.id === 'patch');
assert.ok(attack, 'starter hand needs an attack');
await page.keyboard.press(String(attack.index + 1));
s = await state(page);
assert.equal(s.motion.hero, 'attack');
assert.equal(s.motion.cardsInFlight, 1);
await advance(95);
await shot('card-in-flight');
await advance(220);
assert.equal((await state(page)).motion.cardsInFlight, 0);

const box = await page.locator('#game').boundingBox();
await page.mouse.move(box.x + 1083 * box.width / 1200, box.y + 640 * box.height / 800);
assert.equal((await state(page)).motion.enemyPreparing, true);
await advance(80);
await shot('enemy-intent-preview');
await page.keyboard.press('Space');
s = await state(page);
assert.equal(s.motion.enemyLunges > 0, true);
assert.ok(['hit', 'brace'].includes(s.motion.hero));
assert.equal(s.motion.drawingHand, true);
await advance(85);
await shot('enemy-windup-and-hero-reaction');
await advance(250);

const healIndex = (await state(page)).inventory.findIndex(item => item.id === 'pizza');
if (healIndex >= 0) {
  await page.keyboard.press(['q', 'w', 'e'][healIndex]);
  assert.equal((await state(page)).motion.hero, 'heal');
  await advance(100);
  await shot('hero-heal');
}

await page.clock.resume();
for (const [role, key] of [['debugger', '2'], ['producer', '3']]) {
  await page.goto(`${url}?seed=41`, { waitUntil: 'networkidle' });
  await page.clock.pauseAt(new Date());
  await page.keyboard.press(key);
  await page.keyboard.press('Enter');
  await page.keyboard.press('1');
  assert.equal((await state(page)).role, role);
  await page.keyboard.press('a');
  assert.equal((await state(page)).motion.hero, 'role');
  await advance(100);
  await shot(`${role}-ability-accent`);
  await page.clock.resume();
}

const quiet = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
await quiet.goto(`${url}?seed=41`, { waitUntil: 'networkidle' });
await quiet.keyboard.press('Enter');
await quiet.keyboard.press('1');
await quiet.keyboard.press('1');
assert.equal((await state(quiet)).motion, null);
await quiet.close();
assert.deepEqual(errors, []);
console.log('Battle motion passed: idle, card travel, intent anticipation, enemy lunge, hero block/hit/heal, role accents, and reduced motion.');
await browser.close();
