import './style.css';
import { ACTS, ACT_LORE, ROLES, EVENTS, TOTAL_FIGHTS, CARDS, ITEMS, TRINKETS, RELICS, ENEMIES, newGame, actIndex, encounterNumber, selectRole, startGame, chooseRoute, canChooseEvent, chooseEvent, canBuyShop, buyShop, leaveShop, selectTarget, intentFor, playCard, useItem, useTrinket, endTurn, chooseReward } from './battle-game.js';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const W = 1200, H = 800;
const ink = '#173241', cream = '#fff7e8', gold = '#eebd5d', coral = '#e96a55', teal = '#2e8d8b';
const artPaths = {
  office: '/assets/office.png', war: '/assets/war-room.png', cabinet: '/assets/artifact-cabinet.png', lead: '/assets/project-lead.png',
  scope: '/assets/scope-creep.png', bug: '/assets/clockwork-bug.png', handoff: '/assets/handoff-hydra.png',
  debt: '/assets/technical-debt.png', vendor: '/assets/vendor.png', goblin: '/assets/budget-goblin.png',
  kraken: '/assets/merge-kraken.png', dragon: '/assets/deadline-dragon.png',
  mimic: '/assets/meeting-mimic.png', wraith: '/assets/burnout-wraith.png',
  auditor: '/assets/process-auditor.png', spider: '/assets/dependency-spider.png', siren: '/assets/metrics-siren.png',
  chimera: '/assets/approval-chimera.png', slime: '/assets/regression-slime.png', swarm: '/assets/notification-swarm.png',
  archivist: '/assets/night-archivist.png', archive: '/assets/after-hours-archive.png',
  duck: '/assets/debug-duck.png', pizza: '/assets/emergency-pizza.png', blueprint: '/assets/one-page-blueprint.png'
};
const art = {};
for (const [id, path] of Object.entries(artPaths)) {
  const img = new Image(); img.src = `${import.meta.env.BASE_URL}${path.slice(1)}`; img.onload = () => render(); art[id] = img;
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const seedParam = new URLSearchParams(location.search).get('seed');
const fixedSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRun = () => newGame(fixedSeed ?? undefined);
let state = makeRun(), pointer = { x: -1, y: -1 }, hitboxes = [], showLoadout = false;
let clock = 0, lastFrame = 0, effect = null;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function rect(x, y, w, h, fill, radius = 0, stroke = null, line = 1) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}
function label(t, x, y, size = 20, color = ink, weight = 'normal', align = 'left', family = 'Georgia') {
  ctx.fillStyle = color; ctx.font = `${weight} ${size}px ${family}`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(String(t), x, y);
}
function wrap(t, x, y, maxW, size = 18, color = ink, line = 24, family = 'Georgia') {
  ctx.font = `${size}px ${family}`; ctx.fillStyle = color; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  const words = String(t).split(' '); let row = '', cy = y;
  for (const word of words) {
    const next = row ? `${row} ${word}` : word;
    if (row && ctx.measureText(next).width > maxW) { ctx.fillText(row, x, cy); cy += line; row = word; }
    else row = next;
  }
  if (row) ctx.fillText(row, x, cy);
  return cy + line;
}
function button(t, x, y, w, h, action, opts = {}) {
  const disabled = !!opts.disabled;
  const hot = !disabled && pointer.x >= x && pointer.x <= x + w && pointer.y >= y && pointer.y <= y + h;
  rect(x, y + 4, w, h, disabled ? '#91a1a1' : ink, 11);
  rect(x, y, w, h, disabled ? '#c7d0ce' : hot ? '#f9d98f' : (opts.fill || gold), 11, ink, 2);
  label(t, x + w / 2, y + h / 2 + 1, opts.size || 18, disabled ? '#697a7b' : ink, 'bold', 'center', 'Arial');
  if (!disabled) hitboxes.push({ x, y, w, h, action });
}
function imageContain(img, x, y, w, h) {
  if (!img?.complete || !img.naturalWidth) return;
  const scale = Math.min(w / img.width, h / img.height);
  const iw = img.width * scale, ih = img.height * scale;
  ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
}
function background() {
  const bossArena = state.mode === 'combat' && state.enemies.some(e => e.boss);
  ctx.fillStyle = bossArena ? '#162c39' : '#dac4a5'; ctx.fillRect(0, 0, W, H);
  const img = bossArena ? art.war : art.office;
  if (img?.complete && img.naturalWidth) {
    const scale = Math.max(W / img.width, H / img.height), sw = W / scale, sh = H / scale;
    const drift = reducedMotion ? 0 : Math.sin(clock * .22) * 10;
    ctx.drawImage(img, clamp((img.width - sw) / 2 + drift, 0, img.width - sw), (img.height - sh) / 2, sw, sh, 0, 0, W, H);
  }
  ctx.fillStyle = bossArena ? 'rgba(12,29,41,.18)' : 'rgba(13,36,48,.38)'; ctx.fillRect(0, 0, W, H);
  const vignette = ctx.createRadialGradient(600, 370, 190, 600, 400, 770);
  vignette.addColorStop(0, 'rgba(10,30,39,0)'); vignette.addColorStop(1, 'rgba(10,30,39,.2)');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, W, H);
}
function meter(x, y, w, h, value, max, color) {
  rect(x, y, w, h, '#d5dfd8', h / 2);
  rect(x, y, Math.max(0, w * clamp(value / Math.max(1, max), 0, 1)), h, color, h / 2);
}
function icon(kind, x, y, size = 20, color = gold) {
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = Math.max(2, size / 9);
  if (kind === 'coin') { ctx.beginPath(); ctx.arc(0, 0, size * .43, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, size * .25, 0, Math.PI * 2); ctx.stroke(); }
  else if (kind === 'heart') { ctx.beginPath(); ctx.moveTo(0, size * .42); ctx.bezierCurveTo(-size * .68, 0, -size * .36, -size * .5, 0, -size * .18); ctx.bezierCurveTo(size * .36, -size * .5, size * .68, 0, 0, size * .42); ctx.fill(); }
  else if (kind === 'bolt') { ctx.beginPath(); ctx.moveTo(size * .08, -size * .48); ctx.lineTo(-size * .34, size * .04); ctx.lineTo(-size * .03, size * .04); ctx.lineTo(-size * .14, size * .48); ctx.lineTo(size * .36, -size * .1); ctx.lineTo(size * .04, -size * .1); ctx.closePath(); ctx.fill(); }
  else if (kind === 'shield') { ctx.beginPath(); ctx.moveTo(0, -size * .45); ctx.lineTo(size * .4, -size * .25); ctx.lineTo(size * .29, size * .2); ctx.lineTo(0, size * .46); ctx.lineTo(-size * .29, size * .2); ctx.lineTo(-size * .4, -size * .25); ctx.closePath(); ctx.fill(); }
  else if (kind === 'sword') { ctx.beginPath(); ctx.moveTo(-size * .38, size * .38); ctx.lineTo(size * .32, -size * .32); ctx.moveTo(size * .18, -size * .4); ctx.lineTo(size * .4, -size * .18); ctx.moveTo(-size * .31, size * .07); ctx.lineTo(-size * .07, size * .31); ctx.stroke(); }
  else if (kind === 'clock') { ctx.beginPath(); ctx.arc(0, 0, size * .39, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -size * .2); ctx.lineTo(0, 0); ctx.lineTo(size * .19, size * .12); ctx.stroke(); }
  else if (kind === 'stamp') { ctx.beginPath(); ctx.arc(0, -size * .25, size * .14, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(-size * .08, -size * .13, size * .16, size * .32); ctx.fillRect(-size * .39, size * .2, size * .78, size * .15); }
  else if (kind === 'signal') { for (const r of [.15, .29, .43]) { ctx.beginPath(); ctx.arc(0, size * .27, size * r, Math.PI * 1.18, Math.PI * 1.82); ctx.stroke(); } ctx.beginPath(); ctx.arc(0, size * .27, size * .06, 0, Math.PI * 2); ctx.fill(); }
  else if (kind === 'pager') { ctx.beginPath(); ctx.roundRect(-size * .35, -size * .3, size * .7, size * .62, size * .08); ctx.stroke(); ctx.fillRect(-size * .23, -size * .17, size * .46, size * .22); ctx.fillRect(-size * .22, size * .15, size * .12, size * .06); }
  else if (kind === 'clip') { ctx.beginPath(); ctx.moveTo(size * .15, -size * .38); ctx.bezierCurveTo(size * .45, -size * .3, size * .4, 0, size * .12, size * .25); ctx.bezierCurveTo(-size * .22, size * .6, -size * .52, size * .16, -size * .23, -size * .14); ctx.lineTo(size * .04, -size * .4); ctx.bezierCurveTo(size * .31, -size * .55, size * .55, -size * .24, size * .34, 0); ctx.stroke(); }
  else if (kind === 'book') { ctx.beginPath(); ctx.moveTo(0, -size * .31); ctx.lineTo(-size * .39, -size * .4); ctx.lineTo(-size * .39, size * .3); ctx.lineTo(0, size * .4); ctx.lineTo(size * .39, size * .3); ctx.lineTo(size * .39, -size * .4); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -size * .3); ctx.lineTo(0, size * .39); ctx.stroke(); }
  else if (kind === 'lens') { ctx.beginPath(); ctx.arc(-size * .08, -size * .09, size * .28, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(size * .14, size * .14); ctx.lineTo(size * .4, size * .4); ctx.stroke(); }
  else if (kind === 'branch') { ctx.beginPath(); ctx.moveTo(-size * .28, size * .34); ctx.lineTo(0, 0); ctx.lineTo(size * .28, -size * .34); ctx.moveTo(0, 0); ctx.lineTo(size * .31, size * .34); ctx.stroke(); for (const [cx, cy] of [[-size * .28, size * .34], [size * .28, -size * .34], [size * .31, size * .34]]) { ctx.beginPath(); ctx.arc(cx, cy, size * .08, 0, Math.PI * 2); ctx.fill(); } }
  else { ctx.beginPath(); ctx.moveTo(0, -size * .48); ctx.lineTo(size * .4, 0); ctx.lineTo(0, size * .48); ctx.lineTo(-size * .4, 0); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
function runHeader() {
  rect(28, 22, 1144, 121, 'rgba(17,47,60,.97)', 17, '#f4e7c6', 2);
  label('DEADLINE DISASTER', 51, 57, 31, cream, 'bold');
  label(`CRISIS RUN  ·  ${ACTS[actIndex(state)].toUpperCase()} ACT  ·  ENCOUNTER ${encounterNumber(state)}/${TOTAL_FIGHTS}  ·  RUN ${state.seed}`, 52, 91, 13, gold, 'bold', 'left', 'Arial');
  label(`${ROLES[state.role].name.toUpperCase()}  ·  FLOW ${state.flow}`, 52, 116, 12, '#d7e4de', 'bold', 'left', 'Arial');
  for (let i = 0; i < TOTAL_FIGHTS; i++) {
    const x = 307 + i * 35, boss = i % 3 === 2, current = i === state.floor;
    ctx.beginPath(); ctx.arc(x, 115, boss ? 8 : 6, 0, Math.PI * 2);
    ctx.fillStyle = i < state.floor ? teal : current ? gold : '#647c83'; ctx.fill();
    if (current) { ctx.strokeStyle = cream; ctx.lineWidth = 2; ctx.stroke(); }
  }
  rect(493, 38, 126, 29, '#224453', 7, '#86a6a4', 1);
  label('C  ·  LOADOUT', 556, 53, 12, cream, 'bold', 'center', 'Arial');
  hitboxes.push({ x: 493, y: 38, w: 126, h: 29, action: () => { showLoadout = true; } });
  icon('coin', 644, 53, 18, gold); label(`${state.credits} CREDITS`, 661, 55, 13, gold, 'bold', 'left', 'Arial');
  label(`HP ${state.hp}/${state.maxHp}`, 776, 54, 18, cream, 'bold', 'left', 'Arial');
  meter(775, 72, 184, 13, state.hp, state.maxHp, coral);
  label(`SP ${state.sp}/${state.maxSp}`, 991, 54, 18, cream, 'bold', 'left', 'Arial');
  meter(990, 72, 145, 13, state.sp, state.maxSp, gold);
  label(`BLK ${state.block}  ·  DECK ${state.deck.length}  ·  TOOLS ${state.inventory.length}  ·  TRINKETS ${state.trinkets.length}/2  ·  RELICS ${state.relics.length}`, 776, 111, 12, '#d7e4de', 'bold', 'left', 'Arial');
}
function intro() {
  background();
  rect(109, 68, 982, 665, 'rgba(255,247,232,.98)', 22, ink, 4);
  label('DEADLINE DISASTER', 600, 136, 52, ink, 'bold', 'center');
  label('CRISIS RUN', 600, 185, 25, teal, 'bold', 'center', 'Arial');
  rect(174, 214, 852, 2, '#d7bfa1');
  label('THREE ACTS · NINE ENCOUNTERS · THREE BOSSES', 195, 252, 17, coral, 'bold', 'left', 'Arial');
  wrap('Fight the creatures of a late project. Build a playbook, read enemy intents, and spend credits at the Night Market. Support skills generate Flow for stronger attacks.', 195, 281, 530, 20, ink, 28);
  imageContain(art.lead, 749, 265, 115, 145);
  imageContain(art.dragon, 871, 260, 153, 155);
  label('CHOOSE YOUR LEAD', 600, 418, 15, teal, 'bold', 'center', 'Arial');
  Object.entries(ROLES).forEach(([id, role], i) => {
    const x = 170 + i * 288, y = 438, selected = state.role === id;
    rect(x, y, 273, 111, selected ? '#e7f2e8' : '#f5ecda', 13, selected ? teal : '#cbb99c', selected ? 3 : 2);
    icon('relic', x + 27, y + 27, 21, selected ? teal : coral);
    label(`${i + 1}. ${role.name}`, x + 50, y + 28, 19, ink, 'bold');
    wrap(role.detail, x + 17, y + 58, 240, 14, '#53666b', 19, 'Arial');
    hitboxes.push({ x, y, w: 273, h: 111, action: () => selectRole(state, id) });
  });
  button('START THE RUN', 390, 568, 420, 65, () => startGame(state), { size: 22 });
  label('Click or tap · 1–5 cards · Z/X trinkets · Space end turn · C loadout · F fullscreen', 600, 675, 14, '#65777c', 'normal', 'center', 'Arial');
}
function choiceArtwork(ids, x, y, w, h) {
  if (ids.length === 1) imageContain(art[ENEMIES[ids[0]].art], x, y, w, h);
  else ids.forEach((id, i) => imageContain(art[ENEMIES[id].art], x + i * w / ids.length, y, w / ids.length, h));
}
function route() {
  background(); runHeader();
  rect(75, 170, 1050, 569, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('CHOOSE THE NEXT INCIDENT', 600, 211, 35, ink, 'bold', 'center');
  wrap(ACT_LORE[actIndex(state)], 169, 238, 864, 17, teal, 23);
  const choices = state.routeChoices;
  choices.forEach((choice, i) => {
    const w = choices.length === 1 ? 510 : 337, x = choices.length === 1 ? 345 : 79 + i * 354;
    rect(x, 285, w, 370, '#f6ecda', 17, choice.boss ? coral : '#cfbda1', choice.boss ? 4 : 2);
    label(`${i + 1}. ${choice.label.toUpperCase()}`, x + w / 2, 319, 18, choice.boss ? coral : ink, 'bold', 'center', 'Arial');
    rect(x + 25, 346, w - 50, 210, '#263e48', 13);
    if (choice.kind === 'event') imageContain(art.archive, x + 32, 352, w - 64, 198);
    else if (choice.kind === 'shop') imageContain(art.archivist, x + 32, 352, w - 64, 198);
    else choiceArtwork(choice.ids, x + 33, 352, w - 66, 198);
    const names = choice.ids.map(id => ENEMIES[id].name).join(' + ');
    label(choice.kind === 'event' ? 'Unknown story · then ' + names : choice.kind === 'shop' ? 'Shop · then ' + names : names, x + w / 2, 579, 15, ink, 'bold', 'center', 'Arial');
    label(choice.detail, x + w / 2, 610, 14, '#617179', 'normal', 'center', 'Arial');
    button(choice.kind === 'event' ? 'EXPLORE' : choice.kind === 'shop' ? 'VISIT SHOP' : 'ENTER BATTLE', x + (w - 230) / 2, 667, 230, 51, () => chooseRoute(state, i), { fill: choice.boss ? coral : gold, size: 17 });
  });
}
function event() {
  background(); runHeader();
  const data = EVENTS[state.eventId];
  rect(67, 165, 1066, 577, 'rgba(255,247,232,.98)', 19, ink, 3);
  label('AN UNPLANNED CONVERSATION', 600, 204, 14, coral, 'bold', 'center', 'Arial');
  label(data.title.toUpperCase(), 600, 237, 32, ink, 'bold', 'center');
  rect(99, 273, 425, 250, '#263e48', 13);
  imageContain(art.archive, 105, 279, 413, 238);
  label(data.speaker.toUpperCase(), 557, 293, 15, teal, 'bold', 'left', 'Arial');
  wrap(`“${data.text}”`, 557, 326, 536, 22, ink, 30);
  label('EVERY ANSWER LEADS TO A REINFORCED FOE', 557, 471, 13, coral, 'bold', 'left', 'Arial');
  data.choices.forEach((choice, i) => {
    const x = 105 + i * 333, y = 542, available = canChooseEvent(state, i);
    rect(x, y, 313, 105, available ? '#f6ecd9' : '#e0e2da', 12, available ? '#cdbb9f' : '#acb8b2', 2);
    icon(choice.hpCost ? 'heart' : choice.cost ? 'coin' : 'relic', x + 24, y + 26, 19, choice.hpCost ? coral : teal);
    label(`${i + 1}. ${choice.label}`, x + 43, y + 26, 18, available ? ink : '#7b8884', 'bold');
    wrap(choice.detail, x + 17, y + 54, 278, 15, available ? '#5c6e71' : '#899692', 20, 'Arial');
    button('CHOOSE', x + 52, 659, 209, 53, () => chooseEvent(state, i), { disabled: !available, size: 17 });
  });
}
function shopOffer(offer, i) {
  const x = 296 + i * 273, y = 294, w = 257, available = canBuyShop(state, i);
  rect(x, y, w, 238, offer.sold ? '#e2e2d8' : '#f6ecda', 14, '#cbb99c', 2);
  const name = offer.kind === 'card' ? CARDS[offer.id].name : offer.kind === 'item' ? ITEMS[offer.id].name : offer.id ? RELICS[offer.id].name : 'Sold out';
  const detail = offer.kind === 'card' ? CARDS[offer.id].detail : offer.kind === 'item' ? ITEMS[offer.id].detail : offer.id ? RELICS[offer.id].detail : 'No more relics remain.';
  label(offer.kind.toUpperCase(), x + 15, y + 22, 12, teal, 'bold', 'left', 'Arial');
  icon(offer.kind === 'card' ? CARDS[offer.id].type === 'attack' ? 'sword' : 'shield' : offer.kind === 'item' ? 'heart' : RELICS[offer.id]?.icon || 'relic', x + w / 2, y + 72, 45, offer.kind === 'card' && CARDS[offer.id].type === 'attack' ? coral : gold);
  label(name, x + w / 2, y + 120, 17, ink, 'bold', 'center');
  wrap(detail, x + 16, y + 143, w - 32, 13, '#657377', 17, 'Arial');
  button(offer.sold ? 'SOLD' : `${i + 1} · ${offer.price} CREDITS`, x + 32, y + 188, w - 64, 38, () => buyShop(state, i), { disabled: !available, size: 14 });
}
function shopService(offer, i, x) {
  const available = canBuyShop(state, i), name = offer.kind === 'trinket' ? TRINKETS[offer.id]?.name || 'Sold out' : offer.kind === 'heal' ? 'Quiet Break' : 'Retire a Basic';
  const detail = offer.kind === 'trinket' ? TRINKETS[offer.id]?.detail || 'No charms remain.' : offer.kind === 'heal' ? 'Recover 15 HP.' : 'Remove one random Patch or Review.';
  rect(x, 550, 256, 137, offer.sold ? '#e2e2d8' : '#f6ecda', 13, '#cbb99c', 2);
  icon(offer.kind === 'trinket' ? TRINKETS[offer.id]?.icon || 'relic' : offer.kind === 'heal' ? 'heart' : 'shield', x + 29, 579, 25, offer.kind === 'heal' ? coral : teal);
  label(name, x + 53, 579, 18, ink, 'bold');
  wrap(detail, x + 18, 602, 220, 13, '#657377', 17, 'Arial');
  button(offer.sold ? 'SOLD' : `${i + 1} · ${offer.price} CREDITS`, x + 27, 646, 202, 33, () => buyShop(state, i), { disabled: !available, size: 14 });
}
function shop() {
  background(); runHeader();
  rect(59, 165, 1082, 577, 'rgba(255,247,232,.98)', 19, ink, 3);
  label('THE NIGHT MARKET', 600, 205, 35, ink, 'bold', 'center');
  label('Archivist: “Everything here was useful to someone. Eventually.”', 600, 248, 18, teal, 'italic', 'center');
  rect(83, 287, 193, 376, '#263e48', 13);
  imageContain(art.archivist, 91, 300, 177, 348);
  state.shopStock.slice(0, 3).forEach(shopOffer);
  shopService(state.shopStock[3], 3, 300);
  shopService(state.shopStock[4], 4, 573);
  shopService(state.shopStock[5], 5, 846);
  button('LEAVE FOR BATTLE  ·  ENTER', 826, 697, 277, 33, () => leaveShop(state), { fill: coral, size: 13 });
  icon('coin', 192, 708, 19, gold); label(`${state.credits} CREDITS`, 211, 708, 14, teal, 'bold', 'left', 'Arial');
}
function combatEnemyCard(enemy, i, x, w) {
  const selected = state.target === i;
  const y = 177, h = 304;
  rect(x, y, w, h, selected ? '#fff5df' : '#f7efdf', 16, selected ? gold : '#b8aca0', selected ? 4 : 2);
  const intent = intentFor(enemy);
  label(enemy.boss ? 'BOSS' : enemy.elite ? 'ELITE' : 'FOE', x + 15, y + 23, 13, enemy.boss ? coral : teal, 'bold', 'left', 'Arial');
  ctx.font = 'bold 13px Arial';
  icon(intent.kind === 'attack' ? 'sword' : intent.kind === 'shield' ? 'shield' : intent.kind === 'heal' ? 'heart' : intent.kind === 'tax' ? 'bolt' : 'branch', x + w - 23 - ctx.measureText(intent.label).width, y + 23, 14, intent.kind === 'attack' ? coral : teal);
  label(intent.label, x + w - 13, y + 23, 13, intent.kind === 'attack' ? coral : teal, 'bold', 'right', 'Arial');
  rect(x + 13, y + 44, w - 26, 171, '#263e48', 11);
  const bob = reducedMotion ? 0 : Math.sin(clock * 2 + i) * 3;
  imageContain(art[enemy.art], x + 22, y + 48 + bob, w - 44, 162);
  label(enemy.name, x + w / 2, y + 239, 18, ink, 'bold', 'center');
  meter(x + 18, y + 263, w - 36, 11, enemy.hp, enemy.maxHp, coral);
  label(`${enemy.hp}/${enemy.maxHp} HP   ·   ${enemy.block} BLOCK${enemy.weak ? `   ·   ${enemy.weak} WEAK` : ''}${enemy.vulnerable ? `   ·   ${enemy.vulnerable} VULN` : ''}`, x + w / 2, y + 290, 13, '#5f6f74', 'bold', 'center', 'Arial');
  hitboxes.push({ x, y, w, h, action: () => selectTarget(state, i) });
}
function playFromUI(index) {
  if (state.mode !== 'combat') return;
  const before = state.enemies.map(e => e.hp);
  const ok = playCard(state, index, state.target);
  if (ok) {
    const hit = before.some((hp, i) => state.enemies[i]?.hp < hp || state.mode !== 'combat');
    if (hit) effect = { kind: 'attack', at: clock, target: state.target };
  }
}
function itemFromUI(index) {
  if (state.mode !== 'combat') return;
  if (useItem(state, index, state.target)) effect = { kind: 'item', at: clock, target: state.target };
}
function trinketFromUI(index) {
  if (state.mode !== 'combat') return;
  if (useTrinket(state, index, state.target)) effect = { kind: 'item', at: clock, target: state.target };
}
function endFromUI() {
  if (endTurn(state)) effect = { kind: 'enemy', at: clock };
}
function combat() {
  background(); runHeader();
  rect(25, 158, 1150, 333, state.enemies.some(e => e.boss) ? 'rgba(20,49,61,.77)' : 'rgba(20,49,61,.89)', 17, '#d9bd85', 2);
  rect(41, 177, 276, 304, '#f7efdf', 16, teal, 3);
  label('PROJECT LEAD', 58, 202, 13, teal, 'bold', 'left', 'Arial');
  imageContain(art.lead, 64, 213, 220, 195);
  label(`${state.hp}/${state.maxHp} HP`, 62, 420, 17, ink, 'bold', 'left', 'Arial');
  meter(62, 436, 235, 12, state.hp, state.maxHp, coral);
  label(`${state.block} BLOCK  ·  ${state.vulnerable} VULN  ·  ${state.burnout} BURNOUT`, 62, 467, 13, '#63747a', 'bold', 'left', 'Arial');
  const count = state.enemies.length;
  if (count === 1) combatEnemyCard(state.enemies[0], 0, 554, 330);
  else if (count === 2) state.enemies.forEach((enemy, i) => combatEnemyCard(enemy, i, 365 + i * 407, 380));
  else state.enemies.forEach((enemy, i) => combatEnemyCard(enemy, i, 337 + i * 279, 265));
  if (effect && clock - effect.at < .35) {
    const alpha = 1 - (clock - effect.at) / .35;
    ctx.fillStyle = effect.kind === 'enemy' ? `rgba(233,106,85,${alpha * .23})` : `rgba(238,189,93,${alpha * .2})`;
    ctx.fillRect(25, 158, 1150, 333);
  }
  rect(25, 503, 1150, 75, 'rgba(19,47,58,.95)', 13);
  label('BATTLE LOG', 43, 523, 13, gold, 'bold', 'left', 'Arial');
  label(state.log[0] || '', 43, 551, 17, cream);
  label(`TURN ${state.turn}  ·  FLOW ${state.flow}  ·  TARGET: ${state.enemies[state.target]?.name || 'NONE'}`, 1156, 523, 13, '#d9e9dd', 'bold', 'right', 'Arial');
  label(`DRAW ${state.drawPile.length}  ·  DISCARD ${state.discardPile.length}`, 1154, 588, 12, cream, 'bold', 'right', 'Arial');
  state.hand.forEach((id, i) => {
    const card = CARDS[id], x = 26 + i * 190, y = 597, available = state.sp >= card.cost;
    const hot = pointer.x >= x && pointer.x <= x + 180 && pointer.y >= y && pointer.y <= y + 140;
    rect(x, y + 4, 180, 137, ink, 12);
    rect(x, y - (hot ? 5 : 0), 180, 137, available ? '#fff6e5' : '#d7dad4', 12, card.type === 'attack' ? coral : teal, 2);
    rect(x + 10, y + 9 - (hot ? 5 : 0), 29, 29, card.type === 'attack' ? coral : teal, 15);
    label(card.cost, x + 24, y + 25 - (hot ? 5 : 0), 17, cream, 'bold', 'center', 'Arial');
    icon(card.type === 'attack' ? 'sword' : 'shield', x + 156, y + 27 - (hot ? 5 : 0), 20, card.type === 'attack' ? coral : teal);
    label(`${i + 1}. ${card.name}`, x + 14, y + 56 - (hot ? 5 : 0), 16, available ? ink : '#788985', 'bold', 'left', 'Arial');
    wrap(card.detail, x + 14, y + 79 - (hot ? 5 : 0), 154, 14, available ? '#5d6c72' : '#899692', 20, 'Arial');
    label(card.rarity.toUpperCase(), x + 164, y + 119 - (hot ? 5 : 0), 11, card.type === 'attack' ? coral : teal, 'bold', 'right', 'Arial');
    if (available) hitboxes.push({ x, y: y - 5, w: 180, h: 143, action: () => playFromUI(i) });
  });
  button('END TURN  SPACE', 993, 612, 181, 111, () => endFromUI(), { fill: coral, size: 18 });
  rect(25, 749, 1150, 40, 'rgba(19,47,58,.96)', 10);
  label('TOOLS', 39, 769, 13, gold, 'bold', 'left', 'Arial');
  state.inventory.forEach((id, i) => {
    const x = 91 + i * 170, item = ITEMS[id], disabled = state.itemUsedThisTurn;
    rect(x, 754, 160, 30, disabled ? '#bac4bd' : '#f5ecdc', 7, '#b3a484', 1);
    imageContain(art[item.art], x + 2, 755, 28, 28);
    label(`${['Q', 'W', 'E'][i]}  ${item.name}`, x + 35, 769, 11, disabled ? '#607476' : ink, 'bold', 'left', 'Arial');
    if (!disabled) hitboxes.push({ x, y: 754, w: 160, h: 30, action: () => itemFromUI(i) });
  });
  label('TRINKETS', 612, 769, 12, gold, 'bold', 'left', 'Arial');
  state.trinkets.forEach((id, i) => {
    const x = 700 + i * 214, used = state.usedTrinkets.includes(id), charm = TRINKETS[id];
    rect(x, 754, 199, 30, used ? '#9caeaa' : '#e3f2e9', 7, used ? '#91a49f' : teal, 1);
    icon(charm.icon, x + 16, 769, 20, used ? '#607476' : teal);
    label(`${['Z', 'X'][i]}  ${charm.name}`, x + 34, 769, 11, used ? '#607476' : ink, 'bold', 'left', 'Arial');
    if (!used) hitboxes.push({ x, y: 754, w: 199, h: 30, action: () => trinketFromUI(i) });
  });
}
function reward() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('VICTORY · CHOOSE ONE REWARD', 600, 216, 34, ink, 'bold', 'center');
  label(`+${state.lastPayout} credits${state.lastPerfect ? ' · includes a 5-credit no-hit bonus' : ''}  ·  Choose a lasting reward.`, 600, 258, 17, teal, 'normal', 'center');
  state.rewardChoices.forEach((choice, i) => {
    const x = 126 + i * 327, y = 315, w = 295;
    rect(x, y, w, 328, '#f6ecdc', 16, choice.type === 'relic' ? gold : '#cdbba1', 2);
    label(choice.type === 'card' ? 'NEW SKILL' : choice.type === 'relic' ? 'PERMANENT RELIC' : 'RECOVERY', x + w / 2, y + 27, 14, choice.type === 'relic' ? coral : teal, 'bold', 'center', 'Arial');
    const name = choice.type === 'card' ? CARDS[choice.id].name : choice.type === 'relic' ? RELICS[choice.id].name : 'Rest the Team';
    const detail = choice.type === 'card' ? `${CARDS[choice.id].cost} SP · ${CARDS[choice.id].detail}` : choice.type === 'relic' ? RELICS[choice.id].detail : `Recover ${choice.amount} HP now.`;
    rect(x + 29, y + 53, w - 58, 155, '#263e48', 13);
    if (choice.type === 'relic') {
      ctx.beginPath(); ctx.arc(x + w / 2, y + 131, 56, 0, Math.PI * 2); ctx.fillStyle = '#35545b'; ctx.fill(); ctx.strokeStyle = gold; ctx.lineWidth = 3; ctx.stroke();
      icon(RELICS[choice.id].icon, x + w / 2, y + 131, 74, gold);
    }
    else if (choice.type === 'heal') imageContain(art.pizza, x + 78, y + 60, 140, 140);
    else icon(choice.type === 'card' && CARDS[choice.id].type === 'attack' ? 'sword' : 'shield', x + w / 2, y + 132, 92, choice.type === 'card' && CARDS[choice.id].type === 'attack' ? coral : gold);
    label(name, x + w / 2, y + 235, 20, ink, 'bold', 'center');
    wrap(detail, x + 27, y + 262, w - 54, 15, '#607078', 20, 'Arial');
    button('TAKE REWARD', x + 47, 662, 201, 52, () => chooseReward(state, i), { size: 17 });
  });
}
function loadout() {
  rect(0, 0, W, H, 'rgba(10,29,39,.78)');
  rect(92, 47, 1016, 706, '#fff8e9', 22, gold, 3);
  label('YOUR PLAYBOOK', 129, 87, 33, ink, 'bold');
  button('CLOSE  ·  C', 931, 64, 148, 43, () => { showLoadout = false; }, { size: 15 });
  rect(122, 122, 390, 226, '#263e48', 12);
  imageContain(art.cabinet, 129, 129, 376, 212);
  label(ROLES[state.role].name.toUpperCase(), 540, 149, 17, teal, 'bold', 'left', 'Arial');
  label(`${state.deck.length} skills · ${state.relics.length} relics · ${state.trinkets.length}/2 trinkets`, 540, 188, 20, ink, 'bold');
  wrap('Trinkets refresh each battle. Relics are permanent. Support skills build Flow, making later attacks stronger.', 540, 221, 500, 17, '#53676a', 24);
  rect(126, 370, 948, 2, '#d3bd9a');
  label('DECK', 137, 402, 17, teal, 'bold', 'left', 'Arial');
  label('RELICS', 455, 402, 17, teal, 'bold', 'left', 'Arial');
  label('TRINKETS & TOOLS', 773, 402, 17, teal, 'bold', 'left', 'Arial');
  const counts = new Map(); for (const id of state.deck) counts.set(id, (counts.get(id) || 0) + 1);
  [...counts].slice(0, 12).forEach(([id, count], i) => {
    icon(CARDS[id].type === 'attack' ? 'sword' : 'shield', 146, 433 + i * 22, 14, CARDS[id].type === 'attack' ? coral : teal);
    label(`${count}× ${CARDS[id].name}`, 164, 433 + i * 22, 14, ink, 'normal', 'left', 'Arial');
  });
  if (counts.size > 12) label(`+ ${counts.size - 12} more skills`, 145, 710, 13, teal, 'bold', 'left', 'Arial');
  state.relics.slice(0, 6).forEach((id, i) => {
    const y = 434 + i * 45; icon(RELICS[id].icon, 466, y, 20, gold); label(RELICS[id].name, 486, y, 14, ink, 'bold', 'left', 'Arial');
    label(RELICS[id].detail, 486, y + 18, 11, '#617276', 'normal', 'left', 'Arial');
  });
  if (!state.relics.length) label('No relics yet.', 455, 436, 14, '#718084', 'italic');
  state.trinkets.forEach((id, i) => {
    const y = 435 + i * 58, used = state.usedTrinkets.includes(id);
    icon(TRINKETS[id].icon, 788, y, 23, used ? '#899996' : teal);
    label(`${['Z', 'X'][i]} · ${TRINKETS[id].name}`, 812, y, 14, ink, 'bold', 'left', 'Arial');
    label(`${TRINKETS[id].detail} ${used ? 'Used.' : 'Ready.'}`, 812, y + 19, 11, '#617276', 'normal', 'left', 'Arial');
  });
  label('SINGLE-USE TOOLS', 775, 574, 13, teal, 'bold', 'left', 'Arial');
  state.inventory.forEach((id, i) => { imageContain(art[ITEMS[id].art], 777, 594 + i * 37, 28, 28); label(ITEMS[id].name, 812, 609 + i * 37, 13, ink, 'normal', 'left', 'Arial'); });
}
function ending() {
  background();
  const win = state.ending === 'win';
  rect(129, 76, 942, 646, 'rgba(255,247,232,.98)', 22, ink, 4);
  label(win ? 'THE RELEASE SURVIVES' : 'THE PROJECT FALLS', 600, 151, 45, win ? teal : coral, 'bold', 'center');
  label(win ? 'THE DEADLINE DRAGON IS DEFEATED' : 'THE BOARD REQUESTS A POSTMORTEM', 600, 199, 17, ink, 'bold', 'center', 'Arial');
  rect(193, 233, 814, 2, '#d7bfa1');
  const stats = [
    [`${state.floor}/${TOTAL_FIGHTS}`, 'FIGHTS WON'],
    [`${state.hp}/${state.maxHp}`, 'HEALTH'],
    [String(state.deck.length), 'SKILLS'],
    [String(state.defeatedBosses.length), 'BOSSES']
  ];
  stats.forEach(([value, name], i) => { const x = 286 + i * 210; label(value, x, 296, 35, ink, 'bold', 'center'); label(name, x, 336, 14, teal, 'bold', 'center', 'Arial'); });
  const words = win ? 'The team shipped by choosing its battles, protecting its health, and building a playbook that could face the final deadline.' : `The run ended in Act ${actIndex(state) + 1}. ${state.log[0]} Try a different route, keep Block for telegraphed attacks, and use tools before a crisis becomes terminal.`;
  wrap(words, 238, 393, 715, 21, ink, 29);
  label(`Run ${state.seed}  ·  ${state.cardsPlayed} skills played  ·  ${state.itemsUsed} tools used  ·  ${state.credits} credits`, 600, 529, 16, teal, 'bold', 'center', 'Arial');
  button('TRY ANOTHER RUN', 411, 578, 378, 63, () => { state = makeRun(); startGame(state); }, { size: 21 });
  label('A satirical tribute to the ideas of Frederick P. Brooks Jr.', 600, 683, 14, '#63767a', 'italic', 'center');
}
function render() {
  hitboxes = []; ctx.clearRect(0, 0, W, H);
  if (state.mode === 'intro') intro();
  else if (state.mode === 'route') route();
  else if (state.mode === 'event') event();
  else if (state.mode === 'shop') shop();
  else if (state.mode === 'combat') combat();
  else if (state.mode === 'reward') reward();
  else ending();
  if (showLoadout) { hitboxes = []; loadout(); }
}
function resize() {
  const scale = Math.min(innerWidth / W, innerHeight / H), dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.style.width = `${W * scale}px`; canvas.style.height = `${H * scale}px`;
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0); render();
}
function position(e) { const b = canvas.getBoundingClientRect(); return { x: (e.clientX - b.left) * W / b.width, y: (e.clientY - b.top) * H / b.height }; }
function animationLoop(now) {
  if (!lastFrame) lastFrame = now;
  if (document.visibilityState !== 'visible') lastFrame = now;
  else if (now - lastFrame >= 1000 / 30) { clock += Math.min(now - lastFrame, 100) / 1000; lastFrame = now; render(); }
  requestAnimationFrame(animationLoop);
}
canvas.addEventListener('pointermove', e => { pointer = position(e); render(); });
canvas.addEventListener('pointerleave', () => { pointer = { x: -1, y: -1 }; render(); });
canvas.addEventListener('pointerdown', e => {
  e.preventDefault(); pointer = position(e);
  const hit = [...hitboxes].reverse().find(b => pointer.x >= b.x && pointer.x <= b.x + b.w && pointer.y >= b.y && pointer.y <= b.y + b.h);
  if (hit) { hit.action(); render(); }
});
window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  if (key === 'c' && state.mode !== 'intro') { showLoadout = !showLoadout; render(); return; }
  if (showLoadout) { if (key === 'escape') { showLoadout = false; render(); } return; }
  if (key === 'f') { if (document.fullscreenElement) document.exitFullscreen?.(); else canvas.requestFullscreen?.(); }
  if (state.mode === 'intro' && e.key === 'Enter') startGame(state);
  else if (state.mode === 'intro' && ['1', '2', '3'].includes(e.key)) selectRole(state, Object.keys(ROLES)[Number(e.key) - 1]);
  else if (state.mode === 'route' && ['1', '2', '3'].includes(e.key)) chooseRoute(state, Number(e.key) - 1);
  else if (state.mode === 'event' && ['1', '2', '3'].includes(e.key)) chooseEvent(state, Number(e.key) - 1);
  else if (state.mode === 'shop' && ['1', '2', '3', '4', '5', '6'].includes(e.key)) buyShop(state, Number(e.key) - 1);
  else if (state.mode === 'shop' && e.key === 'Enter') leaveShop(state);
  else if (state.mode === 'reward' && ['1', '2', '3'].includes(e.key)) chooseReward(state, Number(e.key) - 1);
  else if (state.mode === 'combat') {
    if (['1', '2', '3', '4', '5'].includes(e.key)) playFromUI(Number(e.key) - 1);
    if (e.code === 'Space') { e.preventDefault(); endFromUI(); }
    if (e.code === 'Tab') { e.preventDefault(); selectTarget(state, (state.target + 1) % state.enemies.length); }
    const itemIndex = { q: 0, w: 1, e: 2 }[key];
    if (itemIndex !== undefined) itemFromUI(itemIndex);
    const charmIndex = { z: 0, x: 1 }[key];
    if (charmIndex !== undefined) trinketFromUI(charmIndex);
  } else if (state.mode === 'end' && key === 'r') { state = makeRun(); startGame(state); }
  render();
});
window.addEventListener('resize', resize);
document.addEventListener('fullscreenchange', resize);
window.advanceTime = ms => { if (!reducedMotion) clock += ms / 1000; render(); };
window.render_game_to_text = () => JSON.stringify({
  coordinateSystem: 'Canvas 1200x800; origin top-left, x right, y down.',
  mode: state.mode, seed: state.seed, act: ACTS[actIndex(state)], encounter: encounterNumber(state), role: state.role, loadoutOpen: showLoadout,
  hp: state.hp, maxHp: state.maxHp, sp: state.sp, maxSp: state.maxSp, block: state.block, flow: state.flow, credits: state.credits,
  vulnerable: state.vulnerable, burnout: state.burnout, turn: state.turn,
  routeChoices: state.mode === 'route' ? state.routeChoices.map(c => ({ label: c.label, kind: c.kind || 'combat', foes: c.ids.map(id => ENEMIES[id].name), elite: c.elite, boss: c.boss })) : [],
  event: state.mode === 'event' ? { title: EVENTS[state.eventId].title, speaker: EVENTS[state.eventId].speaker, text: EVENTS[state.eventId].text, choices: EVENTS[state.eventId].choices.map((c, i) => ({ label: c.label, detail: c.detail, available: canChooseEvent(state, i) })) } : null,
  shop: state.mode === 'shop' ? state.shopStock.map((o, i) => ({ kind: o.kind, name: o.kind === 'card' ? CARDS[o.id].name : o.kind === 'item' ? ITEMS[o.id].name : o.kind === 'relic' ? RELICS[o.id]?.name || 'Sold out' : o.kind === 'trinket' ? TRINKETS[o.id]?.name || 'Sold out' : o.kind === 'heal' ? 'Quiet Break' : 'Retire a Basic', price: o.price, sold: o.sold, available: canBuyShop(state, i) })) : [],
  enemies: state.mode === 'combat' ? state.enemies.map((enemy, i) => ({ index: i, name: enemy.name, hp: enemy.hp, maxHp: enemy.maxHp, block: enemy.block, weak: enemy.weak, vulnerable: enemy.vulnerable, intent: intentFor(enemy).label, boss: enemy.boss })) : [],
  selectedTarget: state.target,
  hand: state.mode === 'combat' ? state.hand.map((id, i) => ({ index: i, id, name: CARDS[id].name, cost: CARDS[id].cost, detail: CARDS[id].detail, playable: state.sp >= CARDS[id].cost })) : [],
  deckSize: state.deck.length, drawSize: state.drawPile.length, discardSize: state.discardPile.length,
  inventory: state.inventory.map(id => ({ id, name: ITEMS[id].name, detail: ITEMS[id].detail })), itemUsedThisTurn: state.itemUsedThisTurn,
  trinkets: state.trinkets.map((id, i) => ({ index: i, id, name: TRINKETS[id].name, detail: TRINKETS[id].detail, ready: !state.usedTrinkets.includes(id) })),
  relics: state.relics.map(id => RELICS[id].name),
  rewards: state.mode === 'reward' ? state.rewardChoices.map(choice => ({ type: choice.type, name: choice.type === 'card' ? CARDS[choice.id].name : choice.type === 'relic' ? RELICS[choice.id].name : 'Rest the Team' })) : [],
  bossesDefeated: state.defeatedBosses, log: state.log, ending: state.ending, lastPayout: state.lastPayout, lastPerfect: state.lastPerfect
});
resize();
if (!reducedMotion) requestAnimationFrame(animationLoop);
