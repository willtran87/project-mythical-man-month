import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
await page.goto(process.env.GAME_URL || 'http://127.0.0.1:5173/?seed=42', { waitUntil: 'networkidle' });
await page.keyboard.press('Enter');
await page.keyboard.press('1');
await page.waitForTimeout(900);

async function countFrames(duration) {
  return page.evaluate(async ms => {
    const original = CanvasRenderingContext2D.prototype.fillRect;
    const canvas = document.querySelector('#game');
    let frames = 0;
    CanvasRenderingContext2D.prototype.fillRect = function (...args) {
      if (this.canvas === canvas && args[0] === 0 && args[1] === 0 && args[2] === 1200 && args[3] === 800 && ['#dac4a5', '#162c39'].includes(this.fillStyle)) frames++;
      return original.apply(this, args);
    };
    try { await new Promise(resolve => setTimeout(resolve, ms)); }
    finally { CanvasRenderingContext2D.prototype.fillRect = original; }
    return frames;
  }, duration);
}

const idle = await countFrames(1000);
await page.keyboard.press('1');
const action = await countFrames(450);
assert.ok(idle >= 20 && idle <= 40, `idle scene should redraw near 30 fps, got ${idle}`);
assert.ok(action >= 20, `combat action should redraw fluidly, got ${action} frames in 450 ms`);
console.log(`Render cadence: ${idle} idle frames/s; ${action} action frames/450ms.`);
await browser.close();
