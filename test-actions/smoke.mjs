import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const out = 'output/battle-smoke';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const canvas = page.locator('#game');
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
async function state() { return JSON.parse(await page.evaluate(() => window.render_game_to_text())); }
async function click(x, y) {
  const b = await canvas.boundingBox();
  await page.mouse.click(b.x + x * b.width / 1200, b.y + y * b.height / 800);
}
async function fresh(seed) {
  await page.goto(`http://127.0.0.1:5173/?seed=${seed}`);
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function');
  assert.equal((await state()).mode, 'intro');
}
async function target(index) {
  for (let i = 0; i < 4 && (await state()).selectedTarget !== index; i++) await page.keyboard.press('Tab');
  assert.equal((await state()).selectedTarget, index);
}
const cardPriority = ['Critical Path', 'Backlog Cut', 'Rollback', 'Guardrail', 'Test Sweep', 'Clean Design', 'Signal Boost', 'Decision Memo', 'Pair Debug', 'Refactor', 'Overclock'];
const relicPriority = ['Shared Mental Model', 'Test Harness', 'Design Binder', 'Reserve Battery', 'Clean Interface', 'Release Checklist', 'Office Coffee Machine'];
async function autopilot(seed, shots = false) {
  await fresh(seed);
  await page.keyboard.press('3');
  await page.keyboard.press('Enter');
  let steps = 0, bossShots = 0, rewardShots = 0, relicShot = false, signatureShot = false;
  const capturedFoes = new Set();
  while ((await state()).mode !== 'end' && steps++ < 2000) {
    const s = await state();
    if (s.mode === 'route') {
      if (shots && s.routeChoices[0].boss) await canvas.screenshot({ path: `${out}/boss-route-${bossShots}.png` });
      await page.keyboard.press('1');
      if (shots && s.routeChoices[0].boss) await canvas.screenshot({ path: `${out}/boss-fight-${bossShots++}.png` });
      continue;
    }
    if (s.mode === 'reward') {
      if (shots && rewardShots++ < 2) await canvas.screenshot({ path: `${out}/reward-${rewardShots}.png` });
      if (shots && s.rewards[0].type === 'relic' && !relicShot) {
        relicShot = true;
        await canvas.screenshot({ path: `${out}/relic-reward.png` });
      }
      const healIndex = s.rewards.findIndex(r => r.type === 'heal');
      let choice;
      if (s.maxHp - s.hp >= 13 && healIndex >= 0) choice = healIndex;
      else {
        const names = s.rewards.map(r => r.name);
        const preferred = (s.rewards[0].type === 'relic' ? relicPriority : cardPriority).find(name => names.includes(name));
        choice = Math.max(0, names.indexOf(preferred));
      }
      await page.keyboard.press(String(choice + 1));
      if (shots && rewardShots === 1 && s.rewards[choice].type === 'card') {
        assert.equal((await state()).rewardToast?.name, s.rewards[choice].name);
        await canvas.screenshot({ path: `${out}/reward-acquired.png` });
      }
      continue;
    }
    if (shots) for (const enemy of s.enemies) {
      if (['Dependency Spider', 'Metrics Siren', 'Process Auditor', 'Approval Chimera', 'Regression Slime', 'Notification Swarm'].includes(enemy.name) && !capturedFoes.has(enemy.name)) {
        capturedFoes.add(enemy.name);
        await canvas.screenshot({ path: `${out}/${enemy.name.toLowerCase().replaceAll(' ', '-')}.png` });
      }
    }
    if (shots && !signatureShot && s.hand.some(card => ['critical', 'rollback', 'sprint', 'signal'].includes(card.id))) {
      signatureShot = true;
      await canvas.screenshot({ path: `${out}/illustrated-skill-hand.png` });
    }
    const readyCharm = s.trinkets.findIndex(t => t.ready);
    if (readyCharm >= 0) { await page.keyboard.press(['z', 'x'][readyCharm]); continue; }
    const boss = s.enemies.findIndex(e => e.boss);
    const duck = s.inventory.findIndex(item => item.id === 'duck');
    if (boss >= 0 && duck >= 0 && !s.itemUsedThisTurn) { await target(boss); await page.keyboard.press(['q', 'w', 'e'][duck]); continue; }
    const pizza = s.inventory.findIndex(item => item.id === 'pizza');
    if (s.hp <= s.maxHp - 13 && pizza >= 0 && !s.itemUsedThisTurn) { await page.keyboard.press(['q', 'w', 'e'][pizza]); continue; }
    const blueprint = s.inventory.findIndex(item => item.id === 'blueprint');
    if (boss >= 0 && blueprint >= 0 && !s.itemUsedThisTurn && s.block < 5) { await page.keyboard.press(['q', 'w', 'e'][blueprint]); continue; }
    const lowest = s.enemies.reduce((best, enemy, i, all) => enemy.hp < all[best].hp ? i : best, 0);
    await target(lowest);
    const threat = s.enemies.reduce((n, enemy) => n + (/^(ATTACK|DRAIN|EXPOSE)/.test(enemy.intent) ? Number(enemy.intent.match(/\d+/)?.[0] || 0) : 0), 0);
    const playable = s.hand.filter(card => card.playable);
    const blocks = playable.filter(card => ['Guardrail', 'Clean Design', 'Review', 'Decision Memo', 'Rollback'].includes(card.name));
    const attacks = playable.filter(card => ['Critical Path', 'Backlog Cut', 'Incident Room', 'Sprint Burst', 'Root Cause', 'Scope Lock', 'Patch', 'Test Sweep', 'Refactor', 'Pair Debug', 'Panic Fix'].includes(card.name));
    if (threat > s.block + 3 && blocks.length) { await page.keyboard.press(String(blocks[0].index + 1)); continue; }
    if (attacks.length) {
      const damage = { 'Critical Path': 17, 'Backlog Cut': 13, 'Incident Room': 12, 'Root Cause': 9, 'Sprint Burst': 8, Patch: 7, 'Test Sweep': 12, Refactor: 6, 'Scope Lock': 5, 'Pair Debug': 5, 'Panic Fix': 4 };
      attacks.sort((a, b) => damage[b.name] - damage[a.name]);
      await page.keyboard.press(String(attacks[0].index + 1)); continue;
    }
    if (playable.length && playable[0].name !== 'Overclock') { await page.keyboard.press(String(playable[0].index + 1)); continue; }
    await page.keyboard.press('Space');
  }
  if (steps >= 2000) throw new Error(`browser autopilot stuck on seed ${seed}`);
  return await state();
}

await fresh(7);
await canvas.screenshot({ path: `${out}/intro.png` });
await click(600, 602);
assert.equal((await state()).mode, 'route');
await canvas.screenshot({ path: `${out}/route.png` });
await click(360, 692);
let s = await state();
assert.equal(s.mode, 'combat');
assert.equal(s.enemies.length, 1);
assert.equal(s.hand.length, 5);
await canvas.screenshot({ path: `${out}/first-battle.png` });
const inspectIndex = s.hand.findIndex(card => card.name === 'Patch');
assert.ok(inspectIndex >= 0);
await click(26 + inspectIndex * 190 + 153, 643);
assert.equal((await state()).cardPreview?.name, 'Patch');
assert.equal((await state()).sp, 3, 'inspecting a card must not play it');
await canvas.screenshot({ path: `${out}/card-inspect.png` });
await page.keyboard.press('Escape');
assert.equal((await state()).cardPreview, null);
await page.keyboard.press('Shift+Digit1');
assert.equal((await state()).cardPreview?.index, 0, 'keyboard inspect should open the first card');
await page.keyboard.press('Escape');
const cardBounds = await canvas.boundingBox();
await page.mouse.move(cardBounds.x + (26 + inspectIndex * 190 + 85) * cardBounds.width / 1200, cardBounds.y + 660 * cardBounds.height / 800);
await canvas.screenshot({ path: `${out}/card-hover.png` });
await page.keyboard.press('c');
assert.equal((await state()).loadoutOpen, true);
await canvas.screenshot({ path: `${out}/loadout.png` });
await page.keyboard.press('c');
assert.equal((await state()).loadoutOpen, false);
await page.keyboard.press('z');
assert.equal((await state()).trinkets[0].ready, false);
assert.equal((await state()).block, 7);
await canvas.screenshot({ path: `${out}/status-block.png` });
await page.keyboard.press('z');
assert.equal((await state()).block, 7, 'trinket must not activate twice in one fight');
await page.keyboard.press('a');
assert.equal((await state()).reserveBlock, 7, 'Architect ability banks current Block');
assert.equal((await state()).ability.ready, false);
await canvas.screenshot({ path: `${out}/ability-bank.png` });
const attack = s.hand.find(card => card.name === 'Patch');
assert.ok(attack);
const hpBefore = s.enemies[0].hp;
await click(26 + attack.index * 190 + 80, 660);
s = await state();
assert.ok(s.enemies[0].hp < hpBefore, 'card click did not damage enemy');
assert.equal(s.sp, 2, 'card cost not charged');
await click(1080, 668);
s = await state();
assert.equal(s.turn, 2);
assert.equal(s.sp, 3, 'SP should refill on a new turn');
await click(175, 769);
s = await state();
assert.equal(s.itemUsedThisTurn, true);
assert.equal(s.inventory.length, 1);
await page.keyboard.press('q');
await canvas.screenshot({ path: `${out}/status-vulnerable.png` });
assert.equal((await state()).inventory.length, 1, 'second tool use in one turn should be blocked');
const modalCandidate = (await state()).hand.find(card => card.playable);
if (modalCandidate) {
  const logBeforePreviewPlay = (await state()).log[0];
  await click(26 + modalCandidate.index * 190 + 153, 643);
  assert.equal((await state()).cardPreview?.index, modalCandidate.index);
  await click(720, 648);
  assert.equal((await state()).cardPreview, null);
  assert.notEqual((await state()).log[0], logBeforePreviewPlay, 'preview play button should use the selected skill');
}

const win = await autopilot(3, true);
assert.equal(win.ending, 'win', JSON.stringify(win));
assert.equal(win.bossesDefeated.length, 3);
assert.equal(win.encounter, 9);
await canvas.screenshot({ path: `${out}/win.png` });
await page.keyboard.press('r');
assert.equal((await state()).mode, 'route', 'keyboard restart failed');

await fresh(6);
await page.keyboard.press('Enter');
await page.keyboard.press('2');
for (let turn = 0; turn < 100 && (await state()).mode === 'combat'; turn++) await page.keyboard.press('Space');
const loss = await state();
assert.equal(loss.ending, 'lose');
await canvas.screenshot({ path: `${out}/lose.png` });
await click(600, 609);
assert.equal((await state()).mode, 'route', 'button restart failed');

await fresh(7);
await page.keyboard.press('3');
assert.equal((await state()).role, 'producer');
assert.equal((await state()).maxHp, 78);
await canvas.screenshot({ path: `${out}/roles.png` });
await page.keyboard.press('Enter');
assert.equal((await state()).routeChoices.length, 3);
await page.keyboard.press('3');
let detour = await state();
assert.equal(detour.mode, 'event');
await canvas.screenshot({ path: `${out}/event.png` });
const eventChoice = detour.event.choices.findIndex(c => c.available);
await page.keyboard.press(String(eventChoice + 1));
assert.equal((await state()).mode, 'combat', 'event response should lead to battle');

await fresh(6);
await page.keyboard.press('Enter');
await page.keyboard.press('1');
await page.keyboard.press('q');
for (let turn = 0; turn < 60 && (await state()).mode === 'combat'; turn++) {
  const current = await state();
  const attackCard = current.hand.find(c => c.playable && ['Patch', 'Pair Debug', 'Refactor', 'Panic Fix', 'Root Cause', 'Scope Lock', 'Incident Room', 'Test Sweep', 'Critical Path'].includes(c.name));
  if (attackCard) await page.keyboard.press(String(attackCard.index + 1));
  else await page.keyboard.press('Space');
}
assert.equal((await state()).mode, 'reward', 'first incident should lead to a reward');
await page.keyboard.press('4');
assert.equal((await state()).mode, 'tune');
await canvas.screenshot({ path: `${out}/workshop.png` });
await page.keyboard.press('Escape');
assert.equal((await state()).mode, 'reward');
await page.keyboard.press('4');
await page.keyboard.press('1');
assert.equal((await state()).mode, 'route');
await page.keyboard.press('3');
let market = await state();
assert.equal(market.mode, 'shop');
await canvas.screenshot({ path: `${out}/shop.png` });
const charmPrice = market.shop[3].price, oldCredits = market.credits, oldTrinkets = market.trinkets.length;
await page.keyboard.press('4');
market = await state();
assert.equal(market.credits, oldCredits - charmPrice);
assert.equal(market.trinkets.length, oldTrinkets + 1);
assert.equal(market.shop[3].sold, true);
await page.keyboard.press('Enter');
assert.equal((await state()).mode, 'combat', 'leaving shop should lead to battle');
await canvas.screenshot({ path: `${out}/second-trinket.png` });
await page.keyboard.press('x');
assert.equal((await state()).trinkets[1].ready, false);
assert.equal(errors.length, 0, `browser errors: ${errors.join('; ')}`);
console.log('Battle browser smoke passed: roles, events, shop purchase, combat, three bosses, full win/loss, restart, no browser errors.');
await browser.close();
