import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

const prefix = '/project-mythical-man-month/';
let server;
if (!process.env.PAGES_URL) {
  const dist = path.resolve('dist');
  server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const relative = pathname.startsWith(prefix) ? pathname.slice(prefix.length) || 'index.html' : '';
    const file = path.resolve(dist, relative);
    if (!relative || !file.startsWith(`${dist}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404).end();
      return;
    }
    const contentType = file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.png') ? 'image/png' : file.endsWith('.webp') ? 'image/webp' : 'text/html';
    response.writeHead(200, { 'content-type': contentType }).end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
}
const url = process.env.PAGES_URL || `http://127.0.0.1:${server.address().port}${prefix}`;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
const errors = [];
const artwork = new Set();
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('requestfailed', request => errors.push(`${request.failure()?.errorText} ${request.url()}`));
page.on('response', response => {
  if (response.url().includes('/assets/')) {
    artwork.add(response.url());
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  }
});

try {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  await page.waitForFunction(() => typeof window.render_game_to_text === 'function', null, { timeout: 10000 });
  assert.equal(JSON.parse(await page.evaluate(() => window.render_game_to_text())).mode, 'intro');
  const titleAssets = artwork.size;
  assert.ok(titleAssets >= 4 && titleAssets <= 8, `title should load only visible art, got ${titleAssets} assets`);
  await page.keyboard.press('Enter');
  assert.equal(JSON.parse(await page.evaluate(() => window.render_game_to_text())).mode, 'route');
  await page.waitForFunction(() => performance.getEntriesByType('resource').filter(asset => asset.name.includes('/assets/')).length >= 20);
  assert.ok(artwork.size >= 20 && artwork.size <= 40, `route should load its deck and effect art, got ${artwork.size} assets`);
  assert.equal([...artwork].filter(asset => /\/assets\/story\//.test(asset)).length, 0, 'unvisited story art should remain deferred');
  assert.equal([...artwork].filter(asset => /\/assets\/cards\/[^/]+\.png$/.test(asset)).length, 0, 'legacy card PNGs should not be requested');
  await page.keyboard.press('1');
  await page.waitForFunction(() => performance.getEntriesByType('resource').some(asset => asset.name.endsWith('/assets/debug-duck.webp')));
  await page.waitForLoadState('networkidle');
  assert.equal(JSON.parse(await page.evaluate(() => window.render_game_to_text())).mode, 'combat');
  assert.deepEqual(errors, []);
  fs.mkdirSync('output/pages-preview', { recursive: true });
  await page.locator('#game').screenshot({ path: 'output/pages-preview/combat.png' });
  console.log(`Pages preview passed: ${titleAssets} title assets, ${artwork.size} combat assets loaded from ${url}`);
} catch (error) {
  console.error(errors);
  throw error;
} finally {
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
