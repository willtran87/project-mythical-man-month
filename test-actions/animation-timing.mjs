import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const dpr = Number(process.env.DPR || 1);
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: dpr });
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.addInitScript(() => {
  window.__paintTimes = [];
  const original = CanvasRenderingContext2D.prototype.fillRect;
  CanvasRenderingContext2D.prototype.fillRect = function (...args) {
    if (this.canvas.id === 'game' && args[0] === 0 && args[1] === 0 && args[2] === 1200 && args[3] === 800 && ['#dac4a5', '#162c39'].includes(this.fillStyle)) window.__paintTimes.push(performance.now());
    return original.apply(this, args);
  };
});
await page.goto('http://127.0.0.1:5173/?seed=41', { waitUntil: 'networkidle' });
await page.keyboard.press('Enter');
await page.keyboard.press('1');
await page.waitForTimeout(1000);
const paints = await page.evaluate(() => window.__paintTimes.slice());
const recent = paints.filter(time => time >= paints.at(-1) - 750);
const frameRate = (recent.length - 1) * 1000 / (recent.at(-1) - recent[0]);
console.log(`Combat redraw rate at ${dpr}x display scale: ${frameRate.toFixed(1)} fps`);

const state = async () => JSON.parse(await page.evaluate(() => window.render_game_to_text()));
const attack = (await state()).hand.find(card => card.playable && ['patch', 'pair', 'refactor'].includes(card.id));
assert.ok(attack);
await page.clock.pauseAt(new Date());
await page.keyboard.press(String(attack.index + 1));
assert.ok((await state()).fx.includes('strike'));
await page.evaluate(() => window.advanceTime(130));
fs.mkdirSync('output/animation-timing', { recursive: true });
await page.locator('#game').screenshot({ path: 'output/animation-timing/impact-130ms.png' });
await page.evaluate(() => window.advanceTime(600));
assert.ok(!(await state()).fx.includes('strike'), 'strike should clear promptly after its impact');
await page.locator('#game').screenshot({ path: 'output/animation-timing/after-730ms.png' });
assert.deepEqual(errors, []);
await browser.close();
