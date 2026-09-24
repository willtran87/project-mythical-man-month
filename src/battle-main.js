import './style.css';
import { ACTS, ACT_LORE, ROLES, SPECIALISTS, CHARTERS, CONTRACTS, CHALLENGES, OBJECTIVES, EVENTS, TOTAL_FIGHTS, CARDS, ITEMS, TRINKETS, RELICS, ENEMIES, cardInfo, cardBase, debtTier, specialistPrice, runScore, newGame, actIndex, encounterNumber, selectRole, startGame, chooseRoute, openHiring, cancelHiring, hireSpecialist, openCharter, cancelCharter, chooseCharter, openContract, cancelContract, chooseContract, openChallenge, cancelChallenge, chooseChallenge, canChooseEvent, chooseEvent, canBuyShop, buyShop, leaveShop, selectTarget, intentFor, playCard, useRoleAbility, useSpecialist, useItem, useTrinket, endTurn, chooseReward, chooseTune, cancelTune, chooseUpgrade, cancelUpgrade } from './battle-game.js';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const W = 1200, H = 800;
const ink = '#173241', cream = '#fff7e8', gold = '#eebd5d', coral = '#e96a55', teal = '#2e8d8b';
const rarityColors = { basic: '#9ca8a4', common: '#5f9a92', uncommon: '#467eaa', rare: '#c3933d' };
const artPaths = {
  cabinet: '/assets/artifact-cabinet.png',
  titleHero: '/assets/ui/title-hero.webp', quietBreak: '/assets/ui/quiet-break.webp', retireBasic: '/assets/ui/retire-basic.webp',
  scope: '/assets/scope-creep.png', bug: '/assets/clockwork-bug.png', handoff: '/assets/handoff-hydra.png',
  debt: '/assets/technical-debt.png', vendor: '/assets/vendor.png', goblin: '/assets/budget-goblin.png',
  kraken: '/assets/merge-kraken.png', dragon: '/assets/deadline-dragon.png',
  mimic: '/assets/meeting-mimic.png', wraith: '/assets/burnout-wraith.png',
  auditor: '/assets/process-auditor.png', spider: '/assets/dependency-spider.png', siren: '/assets/metrics-siren.png',
  chimera: '/assets/approval-chimera.png', slime: '/assets/regression-slime.png', swarm: '/assets/notification-swarm.png',
  shredder: '/assets/enemies/shredder.webp', collector: '/assets/enemies/collector.webp',
  archivist: '/assets/night-archivist.png', archive: '/assets/after-hours-archive.png',
  duck: '/assets/debug-duck.png', pizza: '/assets/emergency-pizza.png', blueprint: '/assets/one-page-blueprint.png',
  storyCouncil: '/assets/story/architecture-council.png', storyMidnight: '/assets/story/midnight-deploy.png',
  storyRetro: '/assets/story/blameless-postmortem.png', storySponsor: '/assets/story/executive-sponsor.png',
  storyLostFound: '/assets/story/lost-and-found.png', victory: '/assets/story/release-victory.png',
  defeat: '/assets/story/project-defeat.png'
};
const art = {};
for (const [id, path] of Object.entries(artPaths)) {
  const img = new Image(); img.src = `${import.meta.env.BASE_URL}${path.slice(1)}`; img.onload = () => render(); art[id] = img;
}
function loadCollection(folder, ids) {
  const images = {};
  for (const id of ids) {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}assets/${folder}/${id}.webp`;
    img.onload = () => render();
    images[id] = img;
  }
  return images;
}
const relicArt = loadCollection('relics', Object.keys(RELICS));
const trinketArt = loadCollection('trinkets', Object.keys(TRINKETS));
const roleArt = loadCollection('roles', Object.keys(ROLES));
const specialistArt = loadCollection('specialists', Object.keys(SPECIALISTS));
const charterArt = loadCollection('charters', Object.keys(CHARTERS));
const sceneArt = loadCollection('scenes', ['requirements', 'integration', 'release', 'goblin', 'kraken', 'dragon']);
const cardArt = {};
for (const key of new Set(Object.values(CARDS).map(card => card.art))) {
  const img = new Image(); img.src = `${import.meta.env.BASE_URL}assets/cards/${key.includes('.') ? key : `${key}.png`}`; img.onload = () => render(); cardArt[key] = img;
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const seedParam = new URLSearchParams(location.search).get('seed');
const fixedSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRun = () => newGame(fixedSeed ?? undefined);
let state = makeRun(), pointer = { x: -1, y: -1 }, hitboxes = [], showLoadout = false;
let clock = 0, lastFrame = 0, effect = null, previewCardIndex = null, hoverPreviewEnabled = false, rewardToast = null;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function rect(x, y, w, h, fill, radius = 0, stroke = null, line = 1) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}
function label(t, x, y, size = 20, color = ink, weight = 'normal', align = 'left', family = 'Georgia', maxWidth) {
  ctx.fillStyle = color; ctx.font = `${weight} ${size}px ${family}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (maxWidth === undefined) ctx.fillText(String(t), x, y);
  else ctx.fillText(String(t), x, y, maxWidth);
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
function imageCover(img, x, y, w, h, radius = 0) {
  if (!img?.complete || !img.naturalWidth) return false;
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale, sh = h / scale;
  ctx.save();
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.clip();
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
  ctx.restore();
  return true;
}
function collectiblePortrait(img, fallbackIcon, x, y, w, h, radius = 7) {
  rect(x, y, w, h, '#263e48', radius);
  if (!imageCover(img, x, y, w, h, radius)) icon(fallbackIcon, x + w / 2, y + h / 2, Math.min(w, h) * .56, gold);
}
function background() {
  const boss = state.mode === 'combat' ? state.enemies.find(e => e.boss) : null;
  const bossArena = !!boss;
  ctx.fillStyle = bossArena ? '#162c39' : '#dac4a5'; ctx.fillRect(0, 0, W, H);
  const img = boss ? sceneArt[boss.id] : sceneArt[ACTS[actIndex(state)].toLowerCase()];
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
  label(`DEBT ${state.projectDebt}/12  ·  PRESSURE TIER ${debtTier(state)}`, 626, 133, 11, state.projectDebt >= 8 ? coral : gold, 'bold', 'left', 'Arial');
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
  rect(189, 101, 822, 3, gold, 2);
  label('DEADLINE DISASTER', 600, 136, 52, ink, 'bold', 'center');
  label('CRISIS RUN', 600, 185, 25, teal, 'bold', 'center', 'Arial');
  rect(174, 214, 852, 2, '#d7bfa1');
  label('THREE ACTS · NINE ENCOUNTERS · THREE BOSSES', 195, 252, 17, coral, 'bold', 'left', 'Arial');
  wrap('Fight the creatures of a late project. Build a playbook, read enemy intents, and spend credits at the Night Market. Support skills generate Flow for stronger attacks.', 195, 281, 530, 20, ink, 28);
  rect(739, 262, 291, 151, '#263e48', 12, gold, 3);
  imageCover(art.titleHero, 744, 267, 281, 141, 8);
  label('CHOOSE YOUR LEAD', 600, 406, 15, teal, 'bold', 'center', 'Arial');
  Object.entries(ROLES).forEach(([id, role], i) => {
    const x = 170 + i * 288, y = 423, selected = state.role === id;
    rect(x, y, 273, 139, selected ? '#e7f2e8' : '#f5ecda', 13, selected ? teal : '#cbb99c', selected ? 3 : 2);
    rect(x + 8, y + 8, 84, 123, '#263e48', 8);
    imageContain(roleArt[id], x + 10, y + 10, 80, 119);
    label(`${i + 1}. ${role.name}`, x + 102, y + 30, 19, ink, 'bold');
    wrap(role.detail, x + 102, y + 55, 159, 13, '#53666b', 18, 'Arial');
    label(`A · ${role.ability}`, x + 102, y + 119, 11, teal, 'bold', 'left', 'Arial');
    hitboxes.push({ x, y, w: 273, h: 139, action: () => selectRole(state, id) });
  });
  button('START THE RUN', 390, 583, 420, 65, () => startGame(state), { size: 22 });
  button(state.challenge === 'standard' ? 'CHALLENGE MODE' : CHALLENGES[state.challenge].name.toUpperCase(), 826, 583, 203, 65, () => openChallenge(state), { size: 13, fill: '#b6ddd0' });
  label('Click or tap · 1–5 cards · A ability · Z/X trinkets · Space end turn · C loadout · F fullscreen', 600, 675, 14, '#65777c', 'normal', 'center', 'Arial');
}
function challenge() {
  background();
  rect(70, 98, 1060, 642, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('CHOOSE A RUN FORMAT', 600, 151, 36, ink, 'bold', 'center');
  label('Daily Brief uses the same seed for everyone on a UTC date. Best scores save on this device.', 600, 186, 16, teal, 'normal', 'center');
  button('BACK', 932, 119, 163, 39, () => cancelChallenge(state), { size: 13, fill: '#e0d3bc' });
  Object.entries(CHALLENGES).forEach(([id, data], i) => {
    const x = 91 + i * 255, selected = state.challenge === id;
    rect(x, 239, 244, 375, selected ? '#e8f2e8' : '#f5ecdc', 14, selected ? teal : gold, selected ? 4 : 2);
    rect(x + 11, 252, 222, 165, '#263e48', 9);
    imageCover(sceneArt[id === 'daily' ? 'release' : id === 'crunch' ? 'integration' : 'requirements'], x + 15, 256, 214, 157, 6);
    label(data.name, x + 122, 451, 20, ink, 'bold', 'center', 'Georgia', 220);
    wrap(data.detail, x + 18, 481, 208, 15, '#5d7074', 19, 'Arial');
    button(selected ? 'SELECTED' : 'SELECT RUN', x + 30, 630, 184, 53, () => chooseChallenge(state, id), { size: 14, fill: selected ? '#b6ddd0' : gold });
  });
}
function choiceArtwork(ids, x, y, w, h) {
  if (ids.length === 1) imageContain(art[ENEMIES[ids[0]].art], x, y, w, h);
  else ids.forEach((id, i) => imageContain(art[ENEMIES[id].art], x + i * w / ids.length, y, w / ids.length, h));
}
function route() {
  background(); runHeader();
  rect(75, 170, 1050, 569, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('CHOOSE THE NEXT INCIDENT', 600, 211, 31, ink, 'bold', 'center');
  wrap(ACT_LORE[actIndex(state)], 365, 239, 465, 15, teal, 19);
  button(state.charterChosen ? CHARTERS[state.charter].name.toUpperCase() : 'CHOOSE PROJECT CHARTER', 97, 180, 239, 37, () => openCharter(state), { disabled: state.charterChosen || state.floor > 0, size: 11, fill: '#e8d697' });
  const contractOpen = state.floor % 3 === 0 && !state.contractTakenActs.includes(actIndex(state));
  button(state.contract ? `${CONTRACTS[state.contract.id].name.toUpperCase()} · ${state.contract.progress || 0}` : contractOpen ? 'ACCEPT ACT CONTRACT' : 'NO ACTIVE CONTRACT', 97, 222, 239, 37, () => openContract(state), { disabled: !contractOpen, size: 11, fill: '#b6ddd0' });
  button(state.specialist ? `${SPECIALISTS[state.specialist].name.toUpperCase()} · CHANGE SUPPORT` : 'RECRUIT A SPECIALIST', 861, 180, 234, 38, () => openHiring(state), { size: 12, fill: '#b6ddd0' });
  const choices = state.routeChoices;
  choices.forEach((choice, i) => {
    const w = choices.length === 1 ? 510 : 337, x = choices.length === 1 ? 345 : 79 + i * 354;
    const detour = choice.kind === 'event' || choice.kind === 'shop';
    const accent = choice.boss ? coral : choice.elite ? '#c7804f' : detour ? teal : '#5f8792';
    const fill = choice.boss ? '#fff0e3' : choice.elite ? '#fff1dd' : detour ? '#eaf3e9' : '#f2eee2';
    const badge = choice.boss ? 'BOSS · RELIC REWARD' : choice.elite ? 'HIGHER RISK · EXTRA TOOL' : choice.kind === 'event' ? 'STORY · REINFORCED FOE' : choice.kind === 'shop' ? 'MARKET · REINFORCED FOE' : 'STEADY FIGHT · SKILL REWARD';
    rect(x, 285, w, 370, fill, 17, accent, choice.boss || choice.elite ? 3 : 2);
    rect(x + 13, 293, w - 26, 4, accent, 2);
    rect(x + 18, 304, 32, 32, accent, 16);
    label(i + 1, x + 34, 321, 17, cream, 'bold', 'center', 'Arial');
    label(choice.label.toUpperCase(), x + w / 2 + 12, 320, 17, ink, 'bold', 'center', 'Arial', w - 70);
    rect(x + 25, 346, w - 50, 210, '#263e48', 13, accent, 2);
    if (choice.kind === 'event') imageContain(art.archive, x + 32, 352, w - 64, 198);
    else if (choice.kind === 'shop') imageContain(art.archivist, x + 32, 352, w - 64, 198);
    else choiceArtwork(choice.ids, x + 33, 352, w - 66, 198);
    const names = choice.ids.map(id => ENEMIES[id].name).join(' + ');
    label(choice.kind === 'event' ? 'Unknown story · then ' + names : choice.kind === 'shop' ? 'Shop · then ' + names : names, x + w / 2, 579, 15, ink, 'bold', 'center', 'Arial');
    label(choice.detail, x + w / 2, 610, 14, '#617179', 'normal', 'center', 'Arial');
    rect(x + 25, 628, w - 50, 25, accent, 7);
    label(badge, x + w / 2, 641, 12, cream, 'bold', 'center', 'Arial', w - 58);
    button(choice.kind === 'event' ? 'EXPLORE' : choice.kind === 'shop' ? 'VISIT SHOP' : 'ENTER BATTLE', x + (w - 230) / 2, 667, 230, 51, () => chooseRoute(state, i), { fill: choice.boss ? coral : gold, size: 17 });
  });
}
function charter() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('A PRINCIPLE FOR THE WHOLE RUN', 600, 213, 33, ink, 'bold', 'center');
  label('One strong advantage, one real constraint. Choose before the first incident.', 600, 250, 16, teal, 'normal', 'center');
  button('BACK TO ROUTE', 934, 178, 166, 37, () => cancelCharter(state), { size: 12, fill: '#e0d3bc' });
  Object.entries(CHARTERS).forEach(([id, data], i) => {
    const x = 106 + i * 334;
    rect(x, 288, 316, 362, '#f7ebd9', 15, gold, 3);
    rect(x + 12, 301, 292, 210, '#263e48', 10);
    imageCover(charterArt[id], x + 17, 306, 282, 200, 7);
    label(data.name, x + 158, 541, 19, ink, 'bold', 'center', 'Georgia', 290);
    wrap(data.detail, x + 22, 574, 272, 14, '#556a70', 18, 'Arial');
    button('COMMIT TO CHARTER', x + 41, 668, 234, 52, () => chooseCharter(state, id), { size: 14 });
  });
}
function contract() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  label(`ACT ${actIndex(state) + 1} · CLIENT CONTRACTS`, 600, 213, 33, ink, 'bold', 'center');
  label('Complete the condition by the boss for a relic, 12 credits, and 6 HP.', 600, 250, 16, teal, 'normal', 'center');
  button('BACK TO ROUTE', 934, 178, 166, 37, () => cancelContract(state), { size: 12, fill: '#e0d3bc' });
  Object.entries(CONTRACTS).forEach(([id, data], i) => {
    const x = 106 + i * 334, artId = ['rollback', 'signal', 'blueprint'][i];
    rect(x, 288, 316, 362, '#f7ebd9', 15, i === 0 ? coral : teal, 3);
    rect(x + 12, 301, 292, 210, '#263e48', 10);
    imageCover(cardArt[CARDS[artId].art], x + 17, 306, 282, 200, 7);
    label(data.name, x + 158, 541, 21, ink, 'bold', 'center');
    wrap(data.detail, x + 22, 575, 272, 15, '#556a70', 20, 'Arial');
    button('ACCEPT CONTRACT', x + 41, 668, 234, 52, () => chooseContract(state, id), { size: 14, fill: i === 0 ? '#edb1a1' : gold });
  });
}
function hire() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('BUILD THE TEAM', 600, 214, 34, ink, 'bold', 'center');
  label(`One support slot · ${specialistPrice(state)} credits · ${state.floor >= 6 ? '2' : state.floor >= 3 ? '1' : '0'} SP onboarding cost next fight`, 600, 251, 16, teal, 'normal', 'center', 'Arial');
  button('BACK TO ROUTE', 934, 178, 166, 37, () => cancelHiring(state), { size: 12, fill: '#e0d3bc' });
  Object.entries(SPECIALISTS).forEach(([id, spec], i) => {
    const x = 106 + i * 334, owned = state.specialist === id, affordable = state.credits >= specialistPrice(state);
    rect(x, 288, 316, 362, owned ? '#e4f1e6' : '#f7ebd9', 15, owned ? teal : gold, 3);
    rect(x + 12, 301, 292, 229, '#263e48', 10);
    imageContain(specialistArt[id], x + 23, 305, 270, 221);
    label(spec.name, x + 158, 552, 21, ink, 'bold', 'center');
    wrap(`${spec.action}: ${spec.detail}`, x + 20, 578, 276, 14, '#556a70', 18, 'Arial');
    button(owned ? 'ON YOUR TEAM' : affordable ? `HIRE · ${specialistPrice(state)} CREDITS` : 'NOT ENOUGH CREDITS', x + 41, 669, 234, 52, () => hireSpecialist(state, id), { size: 14, disabled: owned || !affordable });
  });
}
function event() {
  background(); runHeader();
  const data = EVENTS[state.eventId];
  rect(67, 165, 1066, 577, 'rgba(255,247,232,.98)', 19, ink, 3);
  label('AN UNPLANNED CONVERSATION', 600, 204, 14, coral, 'bold', 'center', 'Arial');
  label(data.title.toUpperCase(), 600, 237, 32, ink, 'bold', 'center');
  rect(99, 273, 425, 250, '#263e48', 13);
  imageCover(art[data.art], 105, 279, 413, 238, 10);
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
  const name = offer.kind === 'card' ? cardInfo(offer.id).name : offer.kind === 'item' ? ITEMS[offer.id].name : offer.id ? RELICS[offer.id].name : 'Sold out';
  const detail = offer.kind === 'card' ? cardInfo(offer.id).detail : offer.kind === 'item' ? ITEMS[offer.id].detail : offer.id ? RELICS[offer.id].detail : 'No more relics remain.';
  const offeredCard = offer.kind === 'card' ? cardInfo(offer.id) : null;
  label(offeredCard ? offeredCard.rarity.toUpperCase() : offer.kind.toUpperCase(), x + 15, y + 22, 12, offeredCard ? rarityColors[offeredCard.rarity] : teal, 'bold', 'left', 'Arial');
  if (offeredCard) label(`PWR ${offeredCard.power}`, x + w - 15, y + 22, 12, rarityColors[offeredCard.rarity], 'bold', 'right', 'Arial');
  if (offer.kind === 'card') {
    rect(x + 13, y + 39, w - 26, 79, '#263e48', 8);
    imageCover(cardArt[CARDS[offer.id].art], x + 16, y + 42, w - 32, 73, 6);
  } else if (offer.kind === 'item') {
    rect(x + 13, y + 39, w - 26, 79, '#263e48', 8);
    imageContain(art[ITEMS[offer.id].art], x + 68, y + 40, 121, 77);
  } else if (offer.id) collectiblePortrait(relicArt[offer.id], RELICS[offer.id].icon, x + 78, y + 38, 101, 82);
  else icon('relic', x + w / 2, y + 77, 45, gold);
  label(name, x + w / 2, y + 129, 17, ink, 'bold', 'center', 'Georgia', w - 24);
  wrap(detail, x + 16, y + 148, w - 32, 13, '#657377', 17, 'Arial');
  button(offer.sold ? 'SOLD' : `${i + 1} · ${offer.price} CREDITS`, x + 32, y + 188, w - 64, 38, () => buyShop(state, i), { disabled: !available, size: 14 });
}
function shopService(offer, i, x) {
  const available = canBuyShop(state, i), name = offer.kind === 'trinket' ? TRINKETS[offer.id]?.name || 'Sold out' : offer.kind === 'heal' ? 'Quiet Break' : 'Retire a Basic';
  const detail = offer.kind === 'trinket' ? TRINKETS[offer.id]?.detail || 'No charms remain.' : offer.kind === 'heal' ? 'Recover 15 HP.' : 'Remove one random Patch or Review.';
  rect(x, 550, 256, 137, offer.sold ? '#e2e2d8' : '#f6ecda', 13, '#cbb99c', 2);
  const portrait = offer.kind === 'trinket' ? trinketArt[offer.id] : offer.kind === 'heal' ? art.quietBreak : art.retireBasic;
  collectiblePortrait(portrait, offer.kind === 'heal' ? 'heart' : 'shield', x + 12, 558, 52, 42, 6);
  label(name, x + 72, 579, 16, ink, 'bold', 'left', 'Georgia', 171);
  wrap(detail, x + 18, 605, 220, 13, '#657377', 17, 'Arial');
  button(offer.sold ? 'SOLD' : `${i + 1} · ${offer.price} CREDITS`, x + 27, 646, 202, 33, () => buyShop(state, i), { disabled: !available, size: 14 });
}
function shop() {
  background(); runHeader();
  rect(59, 165, 1082, 577, 'rgba(255,247,232,.98)', 19, ink, 3);
  label('THE NIGHT MARKET', 600, 205, 35, ink, 'bold', 'center');
  label('Archivist: “Everything here was useful to someone. Eventually.”', 600, 248, 18, teal, 'italic', 'center');
  rect(83, 287, 193, 376, '#263e48', 13);
  imageContain(art.archivist, 91, 300, 177, 348);
  rect(91, 601, 177, 54, 'rgba(20,48,57,.88)', 7);
  label('THE ARCHIVIST', 179, 619, 13, gold, 'bold', 'center', 'Arial');
  label('Curator of useful mistakes', 179, 639, 11, cream, 'italic', 'center', 'Georgia', 164);
  state.shopStock.slice(0, 3).forEach(shopOffer);
  shopService(state.shopStock[3], 3, 300);
  shopService(state.shopStock[4], 4, 573);
  shopService(state.shopStock[5], 5, 846);
  button('LEAVE FOR BATTLE  ·  ENTER', 826, 697, 277, 33, () => leaveShop(state), { fill: coral, size: 13 });
  icon('coin', 192, 708, 19, gold); label(`${state.credits} CREDITS`, 211, 708, 14, teal, 'bold', 'left', 'Arial');
}
function combatEnemyCard(enemy, i, x, w) {
  const selected = state.target === i;
  const y = enemy.boss ? 164 : 177, h = enemy.boss ? 322 : 304;
  rect(x, y, w, h, selected ? '#fff5df' : '#f7efdf', enemy.boss ? 20 : 16, enemy.boss ? coral : selected ? gold : '#b8aca0', enemy.boss ? 5 : selected ? 4 : 2);
  if (enemy.boss) {
    rect(x + 7, y + 7, w - 14, h - 14, 'rgba(255,247,232,0)', 16, gold, 1.5);
  }
  const intent = intentFor(enemy);
  label(enemy.boss ? 'BOSS' : enemy.elite ? 'ELITE' : 'FOE', x + 15, y + 23, 13, enemy.boss ? coral : teal, 'bold', 'left', 'Arial');
  ctx.font = 'bold 13px Arial';
  const hostileIntent = ['attack', 'erode', 'audit'].includes(intent.kind);
  icon(hostileIntent ? 'sword' : intent.kind === 'shield' ? 'shield' : intent.kind === 'heal' ? 'heart' : intent.kind === 'tax' ? 'bolt' : 'branch', x + w - 23 - ctx.measureText(intent.label).width, y + 23, 14, hostileIntent ? coral : teal);
  label(intent.label, x + w - 13, y + 23, 13, hostileIntent ? coral : teal, 'bold', 'right', 'Arial');
  const portraitY = enemy.boss ? y + 38 : y + 44, portraitH = enemy.boss ? 207 : 171;
  rect(x + 13, portraitY, w - 26, portraitH, '#263e48', 11);
  if (enemy.boss) {
    const glow = ctx.createRadialGradient(x + w / 2, portraitY + 102, 12, x + w / 2, portraitY + 102, w * .44);
    glow.addColorStop(0, 'rgba(238,189,93,.3)'); glow.addColorStop(1, 'rgba(238,189,93,0)');
    ctx.fillStyle = glow; ctx.fillRect(x + 14, portraitY + 1, w - 28, portraitH - 2);
  }
  const bob = reducedMotion ? 0 : Math.sin(clock * 2 + i) * 3;
  imageContain(art[enemy.art], x + 22, portraitY + 4 + bob, w - 44, portraitH - 8);
  if (enemy.boss) {
    rect(x + w / 2 - 143, portraitY + 8, 286, 25, 'rgba(18,45,57,.89)', 6);
    label(`${ENEMIES[enemy.id].phaseNames?.[enemy.phase - 1] || 'FINAL REVIEW'} · PHASE ${enemy.phase}/3`, x + w / 2, portraitY + 21, 12, gold, 'bold', 'center', 'Arial');
  }
  if (enemy.mark && !reducedMotion) {
    ctx.save(); ctx.strokeStyle = `rgba(82,200,205,${.45 + Math.sin(clock * 3) * .15})`; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(x + w / 2, portraitY + portraitH / 2, enemy.boss ? 95 : 77, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  const ailments = [enemy.weak && ['WEAK', enemy.weak, teal], enemy.vulnerable && ['VULN', enemy.vulnerable, coral], enemy.mark && ['MARK', enemy.mark, '#497fa9']].filter(Boolean);
  const pillWidth = Math.min(82, (w - 50) / Math.max(1, ailments.length) - 4);
  ailments.forEach(([name, count, color], j) => statusPill(`${name} ${count}`, x + 22 + j * (pillWidth + 4), enemy.boss ? y + 214 : y + 184, pillWidth, true, color));
  label(enemy.name, x + w / 2, enemy.boss ? y + 258 : y + 239, enemy.boss ? 24 : 18, ink, 'bold', 'center');
  meter(x + 18, enemy.boss ? y + 280 : y + 263, w - 36, 11, enemy.hp, enemy.maxHp, coral);
  label(`${enemy.hp}/${enemy.maxHp} HP   ·   ${enemy.block} BLOCK${enemy.weak ? `   ·   ${enemy.weak} WEAK` : ''}${enemy.vulnerable ? `   ·   ${enemy.vulnerable} VULN` : ''}${enemy.mark ? `   ·   ${enemy.mark} MARK` : ''}`, x + w / 2, enemy.boss ? y + 304 : y + 290, 13, '#5f6f74', 'bold', 'center', 'Arial', w - 20);
  hitboxes.push({ x, y, w, h, action: () => selectTarget(state, i) });
}
function playFromUI(index) {
  if (state.mode !== 'combat') return;
  previewCardIndex = null; hoverPreviewEnabled = false;
  const playedId = state.hand[index] ? cardBase(state.hand[index]) : '';
  const before = state.enemies.map(e => e.hp);
  const ok = playCard(state, index, state.target);
  if (ok) {
    const hit = before.some((hp, i) => state.enemies[i]?.hp < hp || state.mode !== 'combat');
    effect = { kind: ['reprioritize', 'escalate', 'mitigate', 'redirect'].includes(playedId) ? 'interrupt' : ['pipeline', 'protocol', 'rollout'].includes(playedId) ? 'plan' : ['probe', 'triangulate', 'tracesweep'].includes(playedId) ? 'mark' : hit ? 'attack' : 'support', at: clock, target: state.target };
  }
}
function itemFromUI(index) {
  if (state.mode !== 'combat') return;
  const id = state.inventory[index];
  if (useItem(state, index, state.target)) effect = { kind: id === 'duck' ? 'attack' : 'support', at: clock, target: state.target };
}
function trinketFromUI(index) {
  if (state.mode !== 'combat') return;
  const id = state.trinkets[index];
  if (useTrinket(state, index, state.target)) effect = { kind: id === 'paperclip' ? 'attack' : 'support', at: clock, target: state.target };
}
function abilityFromUI() {
  if (state.mode !== 'combat') return;
  if (useRoleAbility(state, state.target)) effect = { kind: state.role === 'debugger' ? 'attack' : 'support', at: clock, target: state.target };
}
function specialistFromUI() {
  if (state.mode !== 'combat') return;
  if (useSpecialist(state, state.target)) effect = { kind: state.specialist === 'qa' ? 'mark' : 'support', at: clock, target: state.target };
}
function endFromUI() {
  const active = state.activeInitiatives.length;
  if (endTurn(state)) effect = { kind: state.activeInitiatives.length > active ? 'plan' : 'enemy', at: clock };
}
function statusPill(text, x, y, w, active, activeFill) {
  rect(x, y, w, 23, active ? activeFill : '#dce2db', 6);
  label(text, x + w / 2, y + 12, 11, active ? cream : '#5b6d70', 'bold', 'center', 'Arial');
}
function combatPulse() {
  if (reducedMotion || !effect || clock - effect.at >= .45) return;
  const progress = clamp((clock - effect.at) / .45, 0, 1);
  const foeCount = state.enemies.length;
  const targetIndex = clamp(effect.target ?? 0, 0, foeCount - 1);
  const targetX = foeCount === 1 ? (state.enemies[0]?.boss ? 740 : 710) : foeCount === 2 ? 555 + targetIndex * 407 : 469 + targetIndex * 279;
  const x = ['enemy', 'support', 'plan'].includes(effect.kind) ? 179 : targetX;
  const y = 319;
  ctx.save();
  ctx.strokeStyle = effect.kind === 'enemy' ? `rgba(233,106,85,${(1 - progress) * .8})` : ['mark', 'interrupt'].includes(effect.kind) ? `rgba(70,171,186,${(1 - progress) * .9})` : effect.kind === 'plan' ? `rgba(137,218,168,${(1 - progress) * .9})` : `rgba(238,189,93,${(1 - progress) * .85})`;
  ctx.lineWidth = 5 - progress * 3;
  ctx.beginPath(); ctx.ellipse(x, y, 62 + progress * 67, 68 + progress * 56, 0, 0, Math.PI * 2); ctx.stroke();
  const spokes = effect.kind === 'attack' || effect.kind === 'enemy' ? 9 : 6;
  for (let i = 0; i < spokes; i++) {
    const angle = i * Math.PI * 2 / spokes + (effect.kind === 'enemy' ? .2 : -.2);
    const inner = 36 + progress * 46, outer = inner + 16 * (1 - progress);
    ctx.beginPath(); ctx.moveTo(x + Math.cos(angle) * inner, y + Math.sin(angle) * inner);
    ctx.lineTo(x + Math.cos(angle) * outer, y + Math.sin(angle) * outer); ctx.stroke();
  }
  if (['mark', 'interrupt'].includes(effect.kind)) {
    ctx.beginPath(); ctx.moveTo(x - 15, y); ctx.lineTo(x + 15, y); ctx.moveTo(x, y - 15); ctx.lineTo(x, y + 15); ctx.stroke();
  }
  ctx.restore();
}
function duelSigil(enemyX, boss) {
  const center = (317 + enemyX) / 2, y = 329;
  ctx.save(); ctx.strokeStyle = boss ? 'rgba(233,106,85,.7)' : 'rgba(238,189,93,.6)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(318, y); ctx.lineTo(center - 26, y); ctx.moveTo(center + 26, y); ctx.lineTo(enemyX, y); ctx.stroke();
  rect(center - 25, y - 25, 50, 50, '#1b3b48', 25, boss ? coral : gold, 2);
  label('VS', center, y + 1, 17, cream, 'bold', 'center', 'Arial'); ctx.restore();
}
function combat() {
  background(); runHeader();
  rect(25, 158, 1150, 333, state.enemies.some(e => e.boss) ? 'rgba(20,49,61,.77)' : 'rgba(20,49,61,.89)', 17, '#d9bd85', 2);
  rect(41, 177, 276, 304, '#f7efdf', 16, teal, 3);
  label(ROLES[state.role].name.toUpperCase(), 58, 202, 13, teal, 'bold', 'left', 'Arial');
  label('FLOW', 213, 202, 11, teal, 'bold', 'left', 'Arial');
  for (let i = 0; i < 3; i++) icon('relic', 253 + i * 16, 202, 12, i < state.flow ? gold : '#b7c7c2');
  imageContain(roleArt[state.role], 64, 213, 220, 195);
  label(`${state.hp}/${state.maxHp} HP`, 62, 420, 17, ink, 'bold', 'left', 'Arial');
  label(`BANK ${state.reserveBlock}${state.nextSp ? ` · NEXT SP +${state.nextSp}` : ''}`, 296, 420, 12, teal, 'bold', 'right', 'Arial', 150);
  meter(62, 436, 235, 12, state.hp, state.maxHp, coral);
  statusPill(`BLK ${state.block}`, 53, 455, 79, state.block > 0, teal);
  statusPill(`VULN ${state.vulnerable}`, 137, 455, 79, state.vulnerable > 0, coral);
  statusPill(`BURN ${state.burnout}`, 221, 455, 84, state.burnout > 0, '#a45b55');
  const count = state.enemies.length;
  if (count === 1) {
    const boss = state.enemies[0].boss, enemyX = boss ? 410 : 480;
    duelSigil(enemyX, boss);
    combatEnemyCard(state.enemies[0], 0, enemyX, boss ? 660 : 460);
  }
  else if (count === 2) state.enemies.forEach((enemy, i) => combatEnemyCard(enemy, i, 365 + i * 407, 380));
  else state.enemies.forEach((enemy, i) => combatEnemyCard(enemy, i, 337 + i * 279, 265));
  combatPulse();
  rect(25, 503, 1150, 66, 'rgba(19,47,58,.95)', 13);
  const brief = state.objective;
  label(brief ? `SPRINT BRIEF · ${OBJECTIVES[brief.id].name}: ${brief.done ? 'COMPLETE' : brief.failed ? 'MISSED' : OBJECTIVES[brief.id].detail}` : 'BATTLE LOG', 43, 518, 12, brief?.done ? '#9de0c7' : brief?.failed ? '#e9a394' : gold, 'bold', 'left', 'Arial', 640);
  const plans = [
    ...(state.contract ? [`CONTRACT: ${CONTRACTS[state.contract.id].name}${state.contract.failed ? ' MISSED' : state.contract.id === 'briefs' ? ` ${state.contract.progress}/2` : ''}`] : []),
    ...state.initiatives.map(p => `${CARDS[p.id].name} ${p.remaining}T`), ...state.activeInitiatives.map(id => `${CARDS[id].name} ACTIVE`)
  ];
  if (plans.length) label(plans.join('  ·  '), 43, 536, 11, '#a9ddd2', 'bold', 'left', 'Arial', 640);
  label(state.log[0] || '', 43, 554, 14, cream, 'normal', 'left', 'Georgia', 645);
  label(`TURN ${state.turn}  ·  FLOW ${state.flow}  ·  TARGET: ${state.enemies[state.target]?.name || 'NONE'}`, 1156, 523, 13, '#d9e9dd', 'bold', 'right', 'Arial');
  const abilityReady = !state.abilityUsed && (state.role !== 'architect' || (state.block > 0 && state.reserveBlock < 12));
  button(`A · ${ROLES[state.role].ability.toUpperCase()} ${state.abilityUsed ? 'USED' : abilityReady ? 'READY' : 'NEED BLOCK'}`, 711, 536, 211, 29, () => abilityFromUI(), { disabled: !abilityReady, size: 10, fill: '#a9ddd2' });
  button(state.specialist ? `S · ${SPECIALISTS[state.specialist].action.toUpperCase()} ${state.specialistUsed ? 'USED' : 'READY'}` : 'S · NO SPECIALIST', 929, 536, 225, 29, () => specialistFromUI(), { disabled: !state.specialist || state.specialistUsed, size: 10, fill: '#f0d698' });
  label(`DRAW ${state.drawPile.length}  ·  DISCARD ${state.discardPile.length}`, 1154, 588, 12, cream, 'bold', 'right', 'Arial');
  state.hand.forEach((id, i) => {
    const card = cardInfo(id), x = 26 + i * 190, y = 577, available = state.sp >= card.cost && !(cardBase(id) === 'escalate' && state.projectDebt > 10);
    const hot = pointer.x >= x && pointer.x <= x + 180 && pointer.y >= y && pointer.y <= y + 160;
    const top = y - (hot ? 6 : 0), color = card.type === 'attack' ? coral : teal;
    rect(x, y + 4, 180, 160, ink, 12);
    rect(x, top, 180, 160, available ? '#fff6e5' : '#d7dad4', 12, rarityColors[card.rarity], card.rarity === 'rare' ? 4 : 2);
    rect(x + 6, top + 6, 168, 82, '#263e48', 8);
    imageCover(cardArt[card.art], x + 8, top + 8, 164, 78, 6);
    if (!available) rect(x + 8, top + 8, 164, 78, 'rgba(221,227,220,.5)', 6);
    rect(x + 12, top + 12, 30, 30, color, 15, cream, 1);
    label(card.cost, x + 27, top + 27, 17, cream, 'bold', 'center', 'Arial');
    rect(x + 138, top + 12, 30, 30, 'rgba(18,45,57,.88)', 15);
    icon(card.type === 'attack' ? 'sword' : 'shield', x + 153, top + 27, 18, cream);
    rect(x + 138, top + 51, 30, 30, 'rgba(18,45,57,.9)', 15, cream, 1);
    icon('lens', x + 153, top + 66, 17, cream);
    rect(x + 45, top + 13, 89, 20, 'rgba(18,45,57,.88)', 6);
    label(`${card.rarity.toUpperCase()} · P${card.power}`, x + 89, top + 23, 10, card.rarity === 'rare' ? gold : cream, 'bold', 'center', 'Arial', 83);
    label(`${i + 1}. ${card.name}`, x + 12, top + 107, 15, available ? ink : '#788985', 'bold', 'left', 'Arial', 156);
    wrap(card.detail, x + 12, top + 124, 156, card.detail.length > 43 ? 12 : 13, available ? '#5d6c72' : '#899692', 14, 'Arial');
    if (available) hitboxes.push({ x, y: y - 6, w: 180, h: 166, action: () => playFromUI(i) });
    hitboxes.push({ x: x + 137, y: top + 50, w: 32, h: 32, action: () => { previewCardIndex = i; } });
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
    collectiblePortrait(trinketArt[id], charm.icon, x + 3, 756, 26, 26, 5);
    if (used) rect(x + 3, 756, 26, 26, 'rgba(200,212,207,.55)', 5);
    label(`${['Z', 'X'][i]}  ${charm.name}`, x + 34, 769, 11, used ? '#607476' : ink, 'bold', 'left', 'Arial');
    if (!used) hitboxes.push({ x, y: 754, w: 199, h: 30, action: () => trinketFromUI(i) });
  });
}
function hoveredCardIndex() {
  if (!hoverPreviewEnabled || state.mode !== 'combat') return -1;
  return state.hand.findIndex((_, i) => pointer.x >= 26 + i * 190 && pointer.x <= 206 + i * 190 && pointer.y >= 577 && pointer.y <= 743);
}
function cardPreview(index, modal = false) {
  const id = state.hand[index]; if (!id) return;
  const card = cardInfo(id), x = modal ? 338 : clamp(26 + index * 190 - 65, 30, 860);
  const y = modal ? 100 : 217, w = modal ? 524 : 310, h = modal ? 592 : 341;
  if (modal) rect(0, 0, W, H, 'rgba(10,29,39,.8)');
  rect(x, y, w, h, '#fff8e9', 16, rarityColors[card.rarity], card.rarity === 'rare' ? 5 : 3);
  rect(x + 13, y + 13, w - 26, 4, rarityColors[card.rarity], 2);
  label(`${card.rarity.toUpperCase()} · POWER ${card.power}`, x + 21, y + (modal ? 37 : 33), modal ? 14 : 12, rarityColors[card.rarity], 'bold', 'left', 'Arial');
  label(`${card.cost} SP`, x + w - 20, y + (modal ? 37 : 33), modal ? 16 : 13, card.type === 'attack' ? coral : teal, 'bold', 'right', 'Arial');
  const artY = y + (modal ? 84 : 55), artH = modal ? 265 : 150;
  rect(x + 20, artY, w - 40, artH, '#263e48', 10);
  imageCover(cardArt[card.art], x + 24, artY + 4, w - 48, artH - 8, 7);
  label(card.name, x + w / 2, artY + artH + (modal ? 32 : 26), modal ? 28 : 21, ink, 'bold', 'center', 'Georgia', w - 40);
  wrap(card.detail, x + 25, artY + artH + (modal ? 62 : 49), w - 50, modal ? 19 : 15, '#53676d', modal ? 28 : 21, 'Arial');
  if (modal) {
    label(`${card.type.toUpperCase()} · ${card.family.toUpperCase()} FAMILY`, x + w / 2, y + 499, 13, teal, 'bold', 'center', 'Arial');
    button('CLOSE  ·  ESC', x + 26, y + 524, 215, 49, () => { previewCardIndex = null; }, { size: 15, fill: '#dfd8c5' });
    button('PLAY THIS CARD', x + 271, y + 524, 226, 49, () => playFromUI(index), { size: 15, disabled: state.sp < card.cost });
  } else label('Tap the lens to inspect · click card to play', x + w / 2, y + h - 22, 11, teal, 'bold', 'center', 'Arial');
}
function takeRewardFromUI(index) {
  const choice = state.rewardChoices[index];
  if (!choice || !chooseReward(state, index) || choice.type === 'tune') return;
  const card = choice.type === 'card' ? cardInfo(choice.id) : null;
  const toast = {
    type: choice.type,
    name: card ? card.name : choice.type === 'relic' ? RELICS[choice.id].name : 'Rest the Team',
    detail: card ? `${card.rarity.toUpperCase()} SKILL · ADDED TO PLAYBOOK` : choice.type === 'relic' ? 'RELIC ACTIVE · ADDED TO PLAYBOOK' : 'HEALTH RESTORED',
    image: card ? cardArt[card.art] : choice.type === 'relic' ? relicArt[choice.id] : art.pizza,
    accent: choice.type === 'relic' || card?.rarity === 'rare' ? gold : teal,
    startedAt: performance.now()
  };
  rewardToast = toast;
  setTimeout(() => { if (rewardToast === toast) { rewardToast = null; render(); } }, 2200);
}
function drawRewardToast() {
  if (!rewardToast) return;
  const toast = rewardToast, elapsed = performance.now() - toast.startedAt;
  if (elapsed >= 2200) { rewardToast = null; return; }
  ctx.save();
  if (!reducedMotion) ctx.globalAlpha = Math.min(1, (2200 - elapsed) / 320);
  rect(348, 151, 504, 106, '#193946', 13, toast.accent, 3);
  rect(360, 163, 82, 82, '#263e48', 8);
  if (toast.type === 'heal') imageContain(toast.image, 365, 168, 72, 72);
  else imageCover(toast.image, 365, 168, 72, 72, 5);
  label(toast.detail, 461, 179, 12, toast.accent, 'bold', 'left', 'Arial', 371);
  label(toast.name, 461, 216, 24, cream, 'bold', 'left', 'Georgia', 365);
  icon('relic', 818, 205, 15, toast.accent);
  ctx.restore();
}
function reward() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('VICTORY · CHOOSE ONE REWARD', 600, 216, 34, ink, 'bold', 'center');
  label(`+${state.lastPayout} credits${state.lastContract === 'completed' ? ' · client contract fulfilled!' : state.lastObjective ? ' · brief complete: -1 Debt' : ''}${state.lastPerfect ? ' · no-hit bonus' : ''}  ·  Choose one.`, 600, 258, 16, teal, 'normal', 'center');
  state.rewardChoices.forEach((choice, i) => {
    const x = 88 + i * 258, y = 311, w = 245;
    const rewardCard = choice.type === 'card' ? cardInfo(choice.id) : null;
    const premium = choice.type === 'relic' || rewardCard?.rarity === 'rare';
    rect(x, y, w, 328, premium ? '#fff0d8' : '#f6ecdc', 16, premium ? gold : rewardCard ? rarityColors[rewardCard.rarity] : '#cdbba1', premium ? 4 : 2);
    if (premium) {
      rect(x + 8, y + 8, w - 16, 3, gold, 2);
      icon('relic', x + 15, y + 312, 11, gold);
      icon('relic', x + w - 15, y + 312, 11, gold);
    }
    label(rewardCard ? rewardCard.rarity.toUpperCase() : choice.type === 'relic' ? 'PERMANENT RELIC' : choice.type === 'heal' ? 'RECOVERY' : 'WORKSHOP', rewardCard ? x + 18 : x + w / 2, y + 27, 13, rewardCard ? rarityColors[rewardCard.rarity] : choice.type === 'relic' ? coral : teal, 'bold', rewardCard ? 'left' : 'center', 'Arial');
    if (rewardCard) label(`PWR ${rewardCard.power}`, x + w - 18, y + 27, 13, rarityColors[rewardCard.rarity], 'bold', 'right', 'Arial');
    const name = choice.type === 'card' ? cardInfo(choice.id).name : choice.type === 'relic' ? RELICS[choice.id].name : choice.type === 'heal' ? 'Rest the Team' : 'Tune the Playbook';
    const detail = choice.type === 'card' ? `${cardInfo(choice.id).cost} SP · ${cardInfo(choice.id).detail}` : choice.type === 'relic' ? RELICS[choice.id].detail : choice.type === 'heal' ? `Recover ${choice.amount} HP now.` : 'Branch-upgrade a skill, retire a basic, or pay down Debt.';
    rect(x + 20, y + 53, w - 40, 155, '#263e48', 13);
    if (choice.type === 'relic') {
      collectiblePortrait(relicArt[choice.id], RELICS[choice.id].icon, x + 25, y + 58, w - 50, 145, 9);
    }
    else if (choice.type === 'heal') imageContain(art.pizza, x + 58, y + 60, 129, 140);
    else if (choice.type === 'tune') imageCover(art.cabinet, x + 25, y + 58, w - 50, 145, 9);
    else imageCover(cardArt[cardInfo(choice.id).art], x + 25, y + 58, w - 50, 145, 9);
    label(name, x + w / 2, y + 235, 18, ink, 'bold', 'center', 'Georgia', w - 20);
    wrap(detail, x + 19, y + 260, w - 38, 14, '#607078', 18, 'Arial');
    if (choice.source === 'build') label(choice.fit >= 3 ? `BUILD FIT · ${choice.family.toUpperCase()}` : 'FLEX PICK', x + w / 2, y + 308, 11, teal, 'bold', 'center', 'Arial');
    button(choice.type === 'tune' ? 'OPEN WORKSHOP' : 'TAKE REWARD', x + 27, 662, w - 54, 52, () => takeRewardFromUI(i), { size: 15 });
  });
}
function tune() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  label('TUNE THE PLAYBOOK', 600, 216, 34, ink, 'bold', 'center');
  label('Choose one permanent deck change before the next incident.', 600, 257, 17, teal, 'normal', 'center');
  button('BACK TO REWARDS', 902, 180, 202, 38, () => cancelTune(state), { size: 13, fill: '#e0d3bc' });
  state.tuneChoices.forEach((choice, i) => {
    const four = state.tuneChoices.length === 4, w = four ? 244 : 295, x = four ? 91 + i * 255 : 126 + i * 327, y = 310, card = cardInfo(choice.id);
    const audit = choice.type === 'audit', upgrade = choice.type === 'upgrade';
    rect(x, y, w, 331, '#f6ecdc', 16, upgrade ? teal : audit ? gold : coral, 2);
    label(upgrade ? 'UPGRADE ONE COPY' : audit ? 'PAY DOWN DEBT' : 'REMOVE ONE COPY', x + w / 2, y + 27, 13, upgrade ? teal : audit ? '#9a681e' : coral, 'bold', 'center', 'Arial');
    rect(x + 29, y + 53, w - 58, 155, '#263e48', 13);
    if (audit) imageCover(art.cabinet, x + 34, y + 58, w - 68, 145, 9);
    else imageCover(cardArt[card.art], x + 34, y + 58, w - 68, 145, 9);
    label(audit ? 'Technical Audit' : card.name, x + w / 2, y + 235, 19, ink, 'bold', 'center', 'Georgia', w - 20);
    const detail = upgrade ? 'Choose Force for impact or Flex for tempo in the next step.' : audit ? `Reduce Project Debt by 4. Current: ${state.projectDebt}.` : 'Remove this basic skill. Draw your stronger cards more often.';
    wrap(detail, x + 24, y + 259, w - 48, 15, '#607078', 20, 'Arial');
    label(audit ? 'DEBT RELIEF' : `${card.rarity.toUpperCase()}  ·  PWR ${card.power}${upgrade ? ` → ${Math.min(5, card.power + 1)}` : ''}`, x + w / 2, y + 313, 12, audit ? teal : rarityColors[card.rarity], 'bold', 'center', 'Arial');
    button(upgrade ? 'CHOOSE PATH' : audit ? 'AUDIT' : 'RETIRE CARD', x + (w - 190) / 2, 660, 190, 53, () => chooseTune(state, i), { size: 15, fill: upgrade ? gold : audit ? '#b6ddd0' : '#edb1a1' });
  });
}
function upgrade() {
  background(); runHeader();
  rect(70, 165, 1060, 579, 'rgba(255,247,232,.98)', 20, ink, 3);
  const base = cardInfo(state.upgradePending.id), attack = base.type === 'attack';
  label(`CHOOSE A PATH FOR ${base.name.toUpperCase()}`, 600, 215, 31, ink, 'bold', 'center');
  label('Both paths keep the same SP cost. Choose the effect your deck needs.', 600, 253, 16, teal, 'normal', 'center');
  button('BACK TO WORKSHOP', 925, 668, 180, 52, () => cancelUpgrade(state), { size: 12, fill: '#e0d3bc' });
  [['force', 'FORCE', attack ? '+3 damage on each play.' : '+3 Block on each play.'], ['flex', 'FLEX', attack ? 'Gain 3 Block after each play.' : 'Draw 1 after each play.']].forEach(([branch, title, detail], i) => {
    const x = 238 + i * 380;
    rect(x, 301, 345, 343, '#f6ecdc', 16, i ? teal : coral, 3);
    rect(x + 24, 330, 297, 170, '#263e48', 10); imageCover(cardArt[base.art], x + 29, 335, 287, 160, 7);
    label(`${base.name}${i ? '*' : '+'}`, x + 172, 539, 25, ink, 'bold', 'center');
    label(title, x + 172, 571, 15, i ? teal : coral, 'bold', 'center', 'Arial');
    label(detail, x + 172, 600, 15, '#556a70', 'normal', 'center', 'Arial');
    button(`TAKE ${title}`, x + 72, 668, 201, 52, () => chooseUpgrade(state, branch), { size: 16, fill: i ? '#b6ddd0' : gold });
  });
}
function loadout() {
  rect(0, 0, W, H, 'rgba(10,29,39,.78)');
  rect(92, 47, 1016, 706, '#fff8e9', 22, gold, 3);
  label('YOUR PLAYBOOK', 129, 87, 33, ink, 'bold');
  button('CLOSE  ·  C', 931, 64, 148, 43, () => { showLoadout = false; }, { size: 15 });
  rect(122, 122, 390, 226, '#263e48', 12);
  imageCover(art.cabinet, 129, 129, 376, 212, 8);
  rect(129, 129, 376, 212, 'rgba(14,37,48,.28)', 8);
  imageContain(roleArt[state.role], 216, 132, 201, 207);
  label(ROLES[state.role].name.toUpperCase(), 540, 149, 17, teal, 'bold', 'left', 'Arial');
  label(`${state.deck.length} skills · ${state.relics.length} relics · ${state.trinkets.length}/2 trinkets`, 540, 188, 20, ink, 'bold');
  wrap(`${ROLES[state.role].ability}: ${ROLES[state.role].abilityDetail} Trinkets refresh each battle. Support skills build Flow for stronger attacks.`, 540, 221, 500, 17, '#53676a', 24);
  if (state.specialist) {
    imageContain(specialistArt[state.specialist], 540, 286, 43, 45);
    label(`${SPECIALISTS[state.specialist].name} · ${SPECIALISTS[state.specialist].action}`, 592, 307, 14, teal, 'bold', 'left', 'Arial');
  } else label('SPECIALIST SLOT EMPTY · Recruit from the route screen', 540, 309, 13, teal, 'bold', 'left', 'Arial');
  label(`PROJECT DEBT ${state.projectDebt}/12 · PRESSURE TIER ${debtTier(state)}`, 540, 329, 12, state.projectDebt >= 8 ? coral : teal, 'bold', 'left', 'Arial');
  label(`${state.charter ? CHARTERS[state.charter].name.toUpperCase() : 'NO CHARTER'}  ·  ${CHALLENGES[state.challenge].name.toUpperCase()}`, 540, 347, 11, teal, 'bold', 'left', 'Arial');
  label('DEBT 4: +2 FOE HP  ·  DEBT 8: +4 FOE HP AND +1 POWER', 540, 362, 10, '#647779', 'bold', 'left', 'Arial');
  rect(126, 370, 948, 2, '#d3bd9a');
  label('DECK', 137, 402, 17, teal, 'bold', 'left', 'Arial');
  label('RELICS', 455, 402, 17, teal, 'bold', 'left', 'Arial');
  label('TRINKETS & TOOLS', 773, 402, 17, teal, 'bold', 'left', 'Arial');
  const counts = new Map(); for (const id of state.deck) counts.set(id, (counts.get(id) || 0) + 1);
  [...counts].slice(0, 12).forEach(([id, count], i) => {
    const card = cardInfo(id), x = 136 + (i % 2) * 151, y = 416 + Math.floor(i / 2) * 49;
    rect(x, y, 145, 44, '#f6ecd9', 7, rarityColors[card.rarity], card.rarity === 'rare' ? 2 : 1);
    imageCover(cardArt[card.art], x + 4, y + 4, 38, 36, 4);
    label(card.name, x + 47, y + 14, 12, ink, 'bold', 'left', 'Arial', 91);
    label(`${count}×  ·  P${card.power}`, x + 47, y + 32, 11, rarityColors[card.rarity], 'bold', 'left', 'Arial');
  });
  if (counts.size > 12) label(`+ ${counts.size - 12} more skills`, 137, 718, 12, teal, 'bold', 'left', 'Arial');
  for (let i = 0; i < 6; i++) {
    const id = state.relics[i], y = 416 + i * 49;
    rect(451, y, 295, 44, id ? '#f6ecd9' : '#f2eddf', 7, id ? gold : '#d8d1bf', 1);
    if (id) {
      collectiblePortrait(relicArt[id], RELICS[id].icon, 456, y + 4, 36, 36, 5);
      label(RELICS[id].name, 499, y + 15, 13, ink, 'bold', 'left', 'Arial', 236);
      label(RELICS[id].detail, 499, y + 32, 10, '#617276', 'normal', 'left', 'Arial', 236);
    } else {
      icon('relic', 474, y + 22, 17, '#b8b8a9');
      label('Undiscovered relic', 499, y + 23, 12, '#8b948d', 'italic', 'left', 'Georgia');
    }
  }
  for (let i = 0; i < 2; i++) {
    const id = state.trinkets[i], x = 773 + i * 149, used = id && state.usedTrinkets.includes(id);
    rect(x, 416, 143, 103, id ? '#f6ecd9' : '#f2eddf', 8, id ? teal : '#d8d1bf', 1);
    if (id) {
      collectiblePortrait(trinketArt[id], TRINKETS[id].icon, x + 42, 422, 58, 53, 6);
      if (used) rect(x + 42, 422, 58, 53, 'rgba(200,212,207,.55)', 6);
      label(`${['Z', 'X'][i]} · ${TRINKETS[id].name}`, x + 71, 488, 11, ink, 'bold', 'center', 'Arial', 130);
      label(used ? 'USED THIS FIGHT' : 'READY', x + 71, 506, 10, used ? coral : teal, 'bold', 'center', 'Arial');
    } else {
      icon('relic', x + 71, 454, 24, '#b8b8a9');
      label('EMPTY SLOT', x + 71, 493, 11, '#8b948d', 'bold', 'center', 'Arial');
    }
  }
  label('SINGLE-USE TOOLS', 775, 550, 13, teal, 'bold', 'left', 'Arial');
  for (let i = 0; i < 3; i++) {
    const id = state.inventory[i], y = 564 + i * 46;
    rect(773, y, 292, 41, id ? '#f6ecd9' : '#f2eddf', 7, '#d8d1bf', 1);
    if (id) {
      imageContain(art[ITEMS[id].art], 780, y + 3, 38, 35);
      label(`${['Q', 'W', 'E'][i]} · ${ITEMS[id].name}`, 829, y + 20, 13, ink, 'bold', 'left', 'Arial', 224);
    } else label('Empty tool slot', 829, y + 20, 12, '#8b948d', 'italic', 'left', 'Georgia');
  }
}
function ending() {
  background();
  const win = state.ending === 'win';
  const score = runScore(state), recordKey = `deadline-disaster-best-${state.challenge === 'daily' ? state.dailyDate : state.challenge}`;
  let personalBest = score;
  try {
    personalBest = Math.max(score, Number(localStorage.getItem(recordKey) || 0));
    if (!state.scoreSaved) { localStorage.setItem(recordKey, String(personalBest)); state.scoreSaved = true; }
  } catch { /* Local storage may be unavailable in private browsing. */ }
  rect(129, 76, 942, 646, 'rgba(255,247,232,.98)', 22, ink, 4);
  label(win ? 'THE RELEASE SURVIVES' : 'THE PROJECT FALLS', 600, 139, 43, win ? teal : coral, 'bold', 'center');
  label(win ? 'THE DEADLINE DRAGON IS DEFEATED' : 'THE BOARD REQUESTS A POSTMORTEM', 600, 188, 17, ink, 'bold', 'center', 'Arial');
  rect(193, 218, 814, 2, '#d7bfa1');
  rect(172, 236, 475, 307, '#263e48', 14, win ? teal : coral, 3);
  imageCover(win ? art.victory : art.defeat, 179, 243, 461, 293, 10);
  const stats = [
    [`${state.floor}/${TOTAL_FIGHTS}`, 'FIGHTS WON'],
    [`${state.hp}/${state.maxHp}`, 'HEALTH'],
    [String(state.deck.length), 'SKILLS'],
    [String(state.defeatedBosses.length), 'BOSSES']
  ];
  stats.forEach(([value, name], i) => {
    const x = 757 + (i % 2) * 177, y = 273 + Math.floor(i / 2) * 82;
    label(value, x, y, 31, ink, 'bold', 'center');
    label(name, x, y + 28, 12, teal, 'bold', 'center', 'Arial');
  });
  rect(686, 410, 339, 2, '#d7bfa1');
  const words = win ? 'The team shipped by choosing its battles, protecting its health, and building a playbook that could face the final deadline.' : `The run ended in Act ${actIndex(state) + 1}. ${state.log[0]} The team can learn from this. Try a different route, save Block for telegraphed attacks, and use tools before a crisis turns terminal.`;
  wrap(words, 682, 425, 345, 17, ink, 23);
  label(`SCORE ${score}  ·  PERSONAL BEST ${personalBest}  ·  ${CHALLENGES[state.challenge].name.toUpperCase()}`, 600, 565, 16, teal, 'bold', 'center', 'Arial');
  label(`Run ${state.seed}  ·  ${state.contractsCompleted} contracts  ·  ${state.briefsCompleted} briefs  ·  ${state.credits} credits`, 600, 589, 13, '#63767a', 'bold', 'center', 'Arial');
  button('REPLAY FORMAT', 357, 612, 300, 54, () => { const previous = state; state = makeRun(); selectRole(state, previous.role); if (previous.challenge !== 'standard') { openChallenge(state); chooseChallenge(state, previous.challenge); } startGame(state); }, { size: 18 });
  button('NEW FORMAT', 690, 612, 190, 54, () => { state = makeRun(); }, { size: 16, fill: '#b6ddd0' });
  label('A satirical tribute to the ideas of Frederick P. Brooks Jr.', 600, 696, 14, '#63767a', 'italic', 'center');
}
function render() {
  hitboxes = []; ctx.clearRect(0, 0, W, H);
  if (state.mode === 'intro') intro();
  else if (state.mode === 'challenge') challenge();
  else if (state.mode === 'route') route();
  else if (state.mode === 'charter') charter();
  else if (state.mode === 'contract') contract();
  else if (state.mode === 'hire') hire();
  else if (state.mode === 'event') event();
  else if (state.mode === 'shop') shop();
  else if (state.mode === 'combat') combat();
  else if (state.mode === 'reward') reward();
  else if (state.mode === 'tune') tune();
  else if (state.mode === 'upgrade') upgrade();
  else ending();
  if (rewardToast && state.mode === 'route') drawRewardToast();
  if (showLoadout) { hitboxes = []; loadout(); }
  else if (previewCardIndex !== null && state.mode === 'combat') { hitboxes = []; cardPreview(previewCardIndex, true); }
  else if (state.mode === 'combat') { const hovered = hoveredCardIndex(); if (hovered >= 0) cardPreview(hovered); }
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
canvas.addEventListener('pointermove', e => { pointer = position(e); hoverPreviewEnabled = e.pointerType === 'mouse'; render(); });
canvas.addEventListener('pointerleave', () => { pointer = { x: -1, y: -1 }; hoverPreviewEnabled = false; render(); });
canvas.addEventListener('pointerdown', e => {
  e.preventDefault(); pointer = position(e); hoverPreviewEnabled = false;
  const hit = [...hitboxes].reverse().find(b => pointer.x >= b.x && pointer.x <= b.x + b.w && pointer.y >= b.y && pointer.y <= b.y + b.h);
  if (hit) { hit.action(); render(); }
});
window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  if (previewCardIndex !== null) {
    if (key === 'escape') previewCardIndex = null;
    else if (e.key === 'Enter' && state.sp >= cardInfo(state.hand[previewCardIndex]).cost) playFromUI(previewCardIndex);
    render(); return;
  }
  if (key === 'c' && state.mode !== 'intro') { showLoadout = !showLoadout; render(); return; }
  if (showLoadout) { if (key === 'escape') { showLoadout = false; render(); } return; }
  if (key === 'f') { if (document.fullscreenElement) document.exitFullscreen?.(); else canvas.requestFullscreen?.(); }
  if (state.mode === 'intro' && e.key === 'Enter') startGame(state);
  else if (state.mode === 'intro' && ['1', '2', '3'].includes(e.key)) selectRole(state, Object.keys(ROLES)[Number(e.key) - 1]);
  else if (state.mode === 'intro' && key === 'm') openChallenge(state);
  else if (state.mode === 'challenge' && ['1', '2', '3', '4'].includes(e.key)) chooseChallenge(state, Object.keys(CHALLENGES)[Number(e.key) - 1]);
  else if (state.mode === 'challenge' && key === 'escape') cancelChallenge(state);
  else if (state.mode === 'route' && ['1', '2', '3'].includes(e.key)) chooseRoute(state, Number(e.key) - 1);
  else if (state.mode === 'route' && key === 'h') openHiring(state);
  else if (state.mode === 'route' && key === 'p') openCharter(state);
  else if (state.mode === 'route' && key === 'k') openContract(state);
  else if (state.mode === 'charter' && ['1', '2', '3'].includes(e.key)) chooseCharter(state, Object.keys(CHARTERS)[Number(e.key) - 1]);
  else if (state.mode === 'charter' && key === 'escape') cancelCharter(state);
  else if (state.mode === 'contract' && ['1', '2', '3'].includes(e.key)) chooseContract(state, Object.keys(CONTRACTS)[Number(e.key) - 1]);
  else if (state.mode === 'contract' && key === 'escape') cancelContract(state);
  else if (state.mode === 'hire' && ['1', '2', '3'].includes(e.key)) hireSpecialist(state, Object.keys(SPECIALISTS)[Number(e.key) - 1]);
  else if (state.mode === 'hire' && key === 'escape') cancelHiring(state);
  else if (state.mode === 'event' && ['1', '2', '3'].includes(e.key)) chooseEvent(state, Number(e.key) - 1);
  else if (state.mode === 'shop' && ['1', '2', '3', '4', '5', '6'].includes(e.key)) buyShop(state, Number(e.key) - 1);
  else if (state.mode === 'shop' && e.key === 'Enter') leaveShop(state);
  else if (state.mode === 'reward' && ['1', '2', '3', '4'].includes(e.key)) takeRewardFromUI(Number(e.key) - 1);
  else if (state.mode === 'tune' && ['1', '2', '3', '4'].includes(e.key)) chooseTune(state, Number(e.key) - 1);
  else if (state.mode === 'tune' && key === 'escape') cancelTune(state);
  else if (state.mode === 'upgrade' && ['1', '2'].includes(e.key)) chooseUpgrade(state, e.key === '1' ? 'force' : 'flex');
  else if (state.mode === 'upgrade' && key === 'escape') cancelUpgrade(state);
  else if (state.mode === 'combat') {
    if (e.shiftKey && /^Digit[1-5]$/.test(e.code)) {
      const index = Number(e.code.slice(-1)) - 1;
      if (state.hand[index]) previewCardIndex = index;
      render(); return;
    }
    if (key === 'a') abilityFromUI();
    if (key === 's') specialistFromUI();
    if (['1', '2', '3', '4', '5'].includes(e.key)) playFromUI(Number(e.key) - 1);
    if (e.code === 'Space') { e.preventDefault(); endFromUI(); }
    if (e.code === 'Tab') { e.preventDefault(); selectTarget(state, (state.target + 1) % state.enemies.length); }
    const itemIndex = { q: 0, w: 1, e: 2 }[key];
    if (itemIndex !== undefined) itemFromUI(itemIndex);
    const charmIndex = { z: 0, x: 1 }[key];
    if (charmIndex !== undefined) trinketFromUI(charmIndex);
  } else if (state.mode === 'end' && key === 'r') { const previous = state; state = makeRun(); selectRole(state, previous.role); if (previous.challenge !== 'standard') { openChallenge(state); chooseChallenge(state, previous.challenge); } startGame(state); }
  render();
});
window.addEventListener('resize', resize);
document.addEventListener('fullscreenchange', resize);
window.advanceTime = ms => { if (!reducedMotion) clock += ms / 1000; render(); };
window.render_game_to_text = () => JSON.stringify({
  coordinateSystem: 'Canvas 1200x800; origin top-left, x right, y down.',
  mode: state.mode, seed: state.seed, act: ACTS[actIndex(state)], encounter: encounterNumber(state), role: state.role, loadoutOpen: showLoadout,
  challenge: state.challenge, challengeRule: state.challengeRule, dailyDate: state.dailyDate,
  challengeChoices: state.mode === 'challenge' ? Object.entries(CHALLENGES).map(([id, data]) => ({ id, name: data.name, detail: data.detail })) : [],
  charter: state.charter || null, charterChoices: state.mode === 'charter' ? Object.entries(CHARTERS).map(([id, data]) => ({ id, name: data.name, detail: data.detail })) : [],
  contract: state.contract ? { ...state.contract, name: CONTRACTS[state.contract.id].name, detail: CONTRACTS[state.contract.id].detail } : null,
  contractChoices: state.mode === 'contract' ? Object.entries(CONTRACTS).map(([id, data]) => ({ id, name: data.name, detail: data.detail })) : [],
  contractsCompleted: state.contractsCompleted, briefsCompleted: state.briefsCompleted,
  cardPreview: previewCardIndex !== null && state.mode === 'combat' ? { index: previewCardIndex, name: cardInfo(state.hand[previewCardIndex]).name } : null,
  rewardToast: rewardToast ? { type: rewardToast.type, name: rewardToast.name, detail: rewardToast.detail } : null,
  hp: state.hp, maxHp: state.maxHp, sp: state.sp, maxSp: state.maxSp, nextSp: state.nextSp, block: state.block, reserveBlock: state.reserveBlock, flow: state.flow, credits: state.credits, projectDebt: state.projectDebt, debtPressure: debtTier(state),
  specialist: state.specialist ? { id: state.specialist, name: SPECIALISTS[state.specialist].name, action: SPECIALISTS[state.specialist].action, detail: SPECIALISTS[state.specialist].detail, ready: state.mode === 'combat' && !state.specialistUsed } : null,
  hiring: state.mode === 'hire' ? { price: specialistPrice(state), onboardingSp: state.floor >= 6 ? 2 : state.floor >= 3 ? 1 : 0, choices: Object.entries(SPECIALISTS).map(([id, spec]) => ({ id, name: spec.name, detail: spec.detail, available: state.credits >= specialistPrice(state) && state.specialist !== id })) } : null,
  objective: state.mode === 'combat' && state.objective ? { ...state.objective, name: OBJECTIVES[state.objective.id].name, detail: OBJECTIVES[state.objective.id].detail } : null,
  ability: { name: ROLES[state.role].ability, detail: ROLES[state.role].abilityDetail, ready: state.mode === 'combat' && !state.abilityUsed && (state.role !== 'architect' || (state.block > 0 && state.reserveBlock < 12)) },
  vulnerable: state.vulnerable, burnout: state.burnout, turn: state.turn,
  routeChoices: state.mode === 'route' ? state.routeChoices.map(c => ({ label: c.label, kind: c.kind || 'combat', foes: c.ids.map(id => ENEMIES[id].name), elite: c.elite, boss: c.boss })) : [],
  event: state.mode === 'event' ? { title: EVENTS[state.eventId].title, speaker: EVENTS[state.eventId].speaker, text: EVENTS[state.eventId].text, choices: EVENTS[state.eventId].choices.map((c, i) => ({ label: c.label, detail: c.detail, available: canChooseEvent(state, i) })) } : null,
  shop: state.mode === 'shop' ? state.shopStock.map((o, i) => ({ kind: o.kind, name: o.kind === 'card' ? cardInfo(o.id).name : o.kind === 'item' ? ITEMS[o.id].name : o.kind === 'relic' ? RELICS[o.id]?.name || 'Sold out' : o.kind === 'trinket' ? TRINKETS[o.id]?.name || 'Sold out' : o.kind === 'heal' ? 'Quiet Break' : 'Retire a Basic', price: o.price, rarity: o.kind === 'card' ? cardInfo(o.id).rarity : null, power: o.kind === 'card' ? cardInfo(o.id).power : null, sold: o.sold, available: canBuyShop(state, i) })) : [],
  enemies: state.mode === 'combat' ? state.enemies.map((enemy, i) => ({ index: i, name: enemy.name, hp: enemy.hp, maxHp: enemy.maxHp, block: enemy.block, weak: enemy.weak, vulnerable: enemy.vulnerable, mark: enemy.mark || 0, intent: intentFor(enemy).label, boss: enemy.boss, phase: enemy.boss ? enemy.phase : null, phaseName: enemy.boss ? ENEMIES[enemy.id].phaseNames[enemy.phase - 1] : null })) : [],
  initiatives: state.mode === 'combat' ? state.initiatives.map(p => ({ id: p.id, name: CARDS[p.id].name, turns: p.remaining })) : [],
  activeInitiatives: state.mode === 'combat' ? state.activeInitiatives.map(id => CARDS[id].name) : [],
  selectedTarget: state.target,
  hand: state.mode === 'combat' ? state.hand.map((id, i) => ({ index: i, id, name: cardInfo(id).name, cost: cardInfo(id).cost, detail: cardInfo(id).detail, rarity: cardInfo(id).rarity, power: cardInfo(id).power, playable: state.sp >= cardInfo(id).cost && !(cardBase(id) === 'escalate' && state.projectDebt > 10) })) : [],
  deckSize: state.deck.length, drawSize: state.drawPile.length, discardSize: state.discardPile.length,
  inventory: state.inventory.map(id => ({ id, name: ITEMS[id].name, detail: ITEMS[id].detail })), itemUsedThisTurn: state.itemUsedThisTurn,
  trinkets: state.trinkets.map((id, i) => ({ index: i, id, name: TRINKETS[id].name, detail: TRINKETS[id].detail, ready: !state.usedTrinkets.includes(id) })),
  relics: state.relics.map(id => RELICS[id].name),
  rewards: state.mode === 'reward' ? state.rewardChoices.map(choice => ({ type: choice.type, name: choice.type === 'card' ? cardInfo(choice.id).name : choice.type === 'relic' ? RELICS[choice.id].name : choice.type === 'heal' ? 'Rest the Team' : 'Tune the Playbook', rarity: choice.type === 'card' ? cardInfo(choice.id).rarity : null, power: choice.type === 'card' ? cardInfo(choice.id).power : null, source: choice.source || null, fit: choice.fit || 0, family: choice.family || null })) : [],
  tuneChoices: state.mode === 'tune' ? state.tuneChoices.map(choice => ({ type: choice.type, name: choice.type === 'audit' ? 'Technical Audit' : cardInfo(choice.id).name, detail: choice.type === 'upgrade' ? 'Choose Force or Flex' : choice.type === 'audit' ? 'Reduce Debt by 4' : 'Remove one basic card' })) : [],
  upgradeChoices: state.mode === 'upgrade' ? ['force', 'flex'].map(branch => ({ branch, name: `${cardInfo(state.upgradePending.id).name}${branch === 'force' ? '+' : '*'}`, detail: branch === 'force' ? '+3 damage or Block' : cardInfo(state.upgradePending.id).type === 'attack' ? '+3 Block after playing' : 'Draw 1 after playing' })) : [],
  bossesDefeated: state.defeatedBosses, log: state.log, ending: state.ending, score: state.mode === 'end' ? runScore(state) : null, lastPayout: state.lastPayout, lastPerfect: state.lastPerfect, lastObjective: state.lastObjective, lastContract: state.lastContract
});
resize();
if (!reducedMotion) requestAnimationFrame(animationLoop);
