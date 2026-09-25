import './style.css';
import { DAYS, PHASES, ITEMS, ACTIONS, newGame, currentEvent, currentTwist, assigned, assign, choose, chooseAction, chooseItem, canAction, canOption, ready, forecast, endDay } from './day-game.js';

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const W = 1200, H = 800;
const ink = '#173241', cream = '#fff7e8', teal = '#2e8d8b', coral = '#e96a55', gold = '#eebd5d';
const paths = {
  office: '/assets/office.png', lead: '/assets/project-lead.png',
  scope: '/assets/scope-creep.webp', handoff: '/assets/handoff-hydra.webp', bug: '/assets/clockwork-bug.webp',
  debt: '/assets/technical-debt.webp', vendor: '/assets/vendor.webp', architect: '/assets/architect.png',
  goblin: '/assets/budget-goblin.webp', kraken: '/assets/merge-kraken.webp', duck: '/assets/debug-duck.webp',
  pizza: '/assets/emergency-pizza.webp', blueprint: '/assets/one-page-blueprint.webp'
};
const art = {};
for (const [id, path] of Object.entries(paths)) {
  const img = new Image(); img.src = `${import.meta.env.BASE_URL}${path.slice(1)}`; img.onload = () => render(); art[id] = img;
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const seedParam = new URLSearchParams(location.search).get('seed');
const fixedSeed = seedParam !== null && /^\d+$/.test(seedParam) ? Number(seedParam) : null;
const makeRun = () => newGame(fixedSeed ?? undefined);
let state = makeRun(), pointer = { x: -1, y: -1 }, hitboxes = [], activeTab = 'actions';
let clock = 0, lastFrame = 0, popAt = -10;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function rect(x, y, w, h, fill, radius = 0, stroke = null, line = 1) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = line; ctx.stroke(); }
}
function label(t, x, y, size = 20, color = ink, weight = 'normal', align = 'left', family = 'Georgia') {
  ctx.fillStyle = color; ctx.font = `${weight} ${size}px ${family}`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(t, x, y);
}
function wrap(t, x, y, maxW, size = 18, color = ink, line = 24, family = 'Georgia') {
  ctx.font = `${size}px ${family}`; ctx.fillStyle = color; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  let words = String(t).split(' '), row = '', cy = y;
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
  rect(x, y + 4, w, h, disabled ? '#99aaa8' : ink, 11);
  rect(x, y, w, h, disabled ? '#c5ceca' : hot ? (opts.hover || '#f7d489') : (opts.fill || gold), 11, ink, 2);
  label(t, x + w / 2, y + h / 2 + 1, opts.size || 17, disabled ? '#6d7e7d' : ink, 'bold', 'center', 'Arial');
  if (!disabled) hitboxes.push({ x, y, w, h, action });
}
function imageContain(img, x, y, w, h) {
  if (!img?.complete || !img.naturalWidth) return;
  const scale = Math.min(w / img.width, h / img.height);
  const iw = img.width * scale, ih = img.height * scale;
  ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
}
function background() {
  ctx.fillStyle = '#dac4a5'; ctx.fillRect(0, 0, W, H);
  const img = art.office;
  if (img.complete && img.naturalWidth) {
    const scale = Math.max(W / img.width, H / img.height), sw = W / scale, sh = H / scale;
    const drift = reducedMotion ? 0 : Math.sin(clock * .25) * 12;
    ctx.drawImage(img, clamp((img.width - sw) / 2 + drift, 0, img.width - sw), (img.height - sh) / 2, sw, sh, 0, 0, W, H);
  }
  ctx.fillStyle = 'rgba(16,43,55,.36)'; ctx.fillRect(0, 0, W, H);
}
function intro() {
  background();
  rect(133, 82, 934, 636, 'rgba(255,247,232,.97)', 22, ink, 4);
  label('DEADLINE DISASTER', 600, 150, 54, ink, 'bold', 'center');
  label('A VERY MYTHICAL MAN-MONTH', 600, 197, 20, teal, 'bold', 'center', 'Arial');
  rect(195, 227, 810, 2, '#d6bda1');
  label('ONE CRISIS. ONE DAY. TWELVE DAYS TO SHIP.', 215, 268, 18, coral, 'bold', 'left', 'Arial');
  wrap('Every run shuffles the crises. Pick one of three responses each day. Spend focus or budget on an optional action, save one-use tools, and decide how the crew works.', 215, 301, 525, 21, ink, 30);
  label('BROOKS’S LAW', 215, 435, 15, teal, 'bold', 'left', 'Arial');
  label('More people mean more handoffs and onboarding.', 344, 435, 16);
  label('TECHNICAL DEBT', 215, 466, 15, teal, 'bold', 'left', 'Arial');
  label('Today’s shortcut slows tomorrow’s work.', 366, 466, 16);
  label('QUALITY', 215, 497, 15, teal, 'bold', 'left', 'Arial');
  label('Testing clears bugs and keeps the design healthy.', 302, 497, 16);
  label('Release needs scope built, ≤18 bugs, ≥30 trust, and morale.', 215, 535, 15, ink, 'normal', 'left', 'Arial');
  imageContain(art.lead, 770, 251, 225, 286);
  button('START A NEW RUN', 405, 572, 390, 62, () => { state.mode = 'play'; pointer = { x: -1, y: -1 }; }, { size: 21 });
  label('Click or tap · 1/2/3 choose · Enter ends day · F fullscreen', 600, 664, 14, '#607179', 'normal', 'center', 'Arial');
}
function statCard(name, value, max, x, color, note = '') {
  rect(x, 120, 176, 65, '#f8f0df', 9, '#b4c1b8', 1);
  label(name, x + 10, 136, 12, '#54676e', 'bold', 'left', 'Arial');
  label(value + note, x + 10, 160, 21, color, 'bold', 'left', 'Arial');
  rect(x + 104, 153, 61, 8, '#dae3d9', 4);
  rect(x + 104, 153, Math.max(0, Math.min(61, 61 * value / max)), 8, color, 4);
}
function header() {
  rect(30, 24, 1140, 179, 'rgba(19,47,58,.96)', 18, '#f9e8c6', 2);
  label('DEADLINE DISASTER', 53, 61, 31, cream, 'bold');
  label(`${PHASES[state.phase].toUpperCase()} PHASE  ·  ${state.team} ENGINEERS  ·  ${state.team - assigned(state)} UNASSIGNED${state.onboarding ? `  ·  ${state.onboarding} DAY ONBOARDING` : ''}`, 55, 98, 14, gold, 'bold', 'left', 'Arial');
  label(`RUN ${state.seed}`, 988, 98, 12, '#d4e4df', 'bold', 'right', 'Arial');
  rect(1010, 42, 133, 43, gold, 11);
  label(`DAY ${state.day} / ${DAYS}`, 1076, 64, 19, ink, 'bold', 'center', 'Arial');
  const stats = [
    ['BUILT / SCOPE', state.progress, Math.max(state.scope, 1), teal, ` / ${state.scope}`],
    ['OPEN BUGS', state.bugs, 30, coral, ''],
    ['TECH DEBT', state.debt, 40, '#a97548', ''],
    ['MORALE', state.morale, 100, gold, ''],
    ['INTEGRITY', state.integrity, 100, '#5fa9ac', ''],
    ['TRUST', state.trust, 100, '#9fa7d9', '']
  ];
  stats.forEach(([name, value, max, color, note], i) => statCard(name, value, max, 50 + i * 184, color, note));
}
function portrait(id) {
  rect(535, 245, 170, 170, '#263c45', 13, '#d6bd92', 2);
  ctx.save();
  ctx.beginPath(); ctx.roundRect(541, 251, 158, 158, 10); ctx.clip();
  ctx.fillStyle = '#263c45'; ctx.fillRect(541, 251, 158, 158);
  const img = art[id];
  const bob = reducedMotion ? 0 : Math.sin(clock * 2 + state.day) * 3;
  const t = clock - popAt;
  const pop = reducedMotion || t < 0 || t > 1 ? 1 : 1 + .06 * Math.exp(-t * 4) * Math.sin(t * 15);
  ctx.translate(620, 330 + bob);
  ctx.scale(pop, pop);
  imageContain(img, -76, -76, 152, 152);
  ctx.restore();
}
function eventPanel() {
  const ev = currentEvent(state), twist = currentTwist(state);
  rect(30, 218, 690, 437, 'rgba(255,247,232,.98)', 18, ink, 3);
  label('TODAY’S CRISIS', 55, 255, 15, coral, 'bold', 'left', 'Arial');
  let size = 30;
  while (size > 22) { ctx.font = `bold ${size}px Georgia`; if (ctx.measureText(ev.title).width <= 458) break; size--; }
  label(ev.title, 55, 297, size, ink, 'bold');
  wrap(ev.copy, 55, 330, 458, 17, ink, 22);
  portrait(ev.art);
  label(`TODAY'S TWIST  ${twist.name}: ${twist.detail}`, 55, 403, 13, teal, 'bold', 'left', 'Arial');
  ev.options.forEach((op, i) => {
    const y = 426 + i * 69, selected = state.chosen === i, available = canOption(state, i);
    rect(54, y, 650, 61, selected ? '#d6eee4' : available ? '#f6ecdc' : '#e6e2d9', 12, selected ? teal : '#c9b9a3', selected ? 3 : 1);
    label(`${i + 1}. ${op.label}`, 73, y + 20, 18, available ? ink : '#84918e', 'bold', 'left', 'Arial');
    label(op.detail, 73, y + 45, 14, available ? '#5b6b70' : '#84918e', 'normal', 'left', 'Arial');
    if (available) hitboxes.push({ x: 54, y, w: 650, h: 61, action: () => { choose(state, i); popAt = clock; } });
  });
  label(ev.lesson, 55, 639, 14, '#5f6e70', 'italic');
}
function crewPanel() {
  label('Assignments persist until you change them.', 760, 302, 16, ink);
  const rows = [
    ['build', 'BUILD', 'Features · bugs · debt', '#8fcaba'],
    ['sync', 'COORDINATE', 'Knowledge · fewer handoffs', '#edc66e'],
    ['qa', 'TEST', 'Fewer bugs · less debt', '#eda08a']
  ];
  rows.forEach(([role, title, subtitle, color], i) => {
    const y = 336 + i * 83;
    rect(758, y, 390, 68, '#f4ebda', 11, '#dfd1bc');
    rect(758, y, 8, 68, color, 4);
    label(title, 781, y + 21, 18, ink, 'bold', 'left', 'Arial');
    label(subtitle, 781, y + 48, 14, '#607078', 'normal', 'left', 'Arial');
    button('−', 1004, y + 15, 37, 39, () => assign(state, role, -1), { disabled: state.alloc[role] === 0, fill: '#d9e8df', size: 26 });
    label(String(state.alloc[role]), 1064, y + 35, 27, ink, 'bold', 'center', 'Arial');
    button('+', 1091, y + 15, 37, 39, () => assign(state, role, 1), { disabled: assigned(state) >= state.team, fill: '#d9e8df', size: 25 });
  });
  label(`UNASSIGNED: ${state.team - assigned(state)}`, 759, 626, 15, assigned(state) === state.team ? teal : coral, 'bold', 'left', 'Arial');
  label(`KNOWLEDGE ${state.knowledge}  ·  AUTOMATION ${state.automation}`, 1144, 626, 13, '#5e6f73', 'bold', 'right', 'Arial');
}
function actionsPanel() {
  label(`FOCUS ${state.focus}/5  ·  BUDGET ${state.budget}/20`, 760, 301, 15, teal, 'bold', 'left', 'Arial');
  ACTIONS.forEach((action, i) => {
    const y = 315 + i * 46, selected = state.action === action.id, available = canAction(state, action.id);
    rect(758, y, 390, 43, selected ? '#d6eee4' : available ? '#f4ebda' : '#e1e0d9', 9, selected ? teal : '#d5c7b6', selected ? 2 : 1);
    label(action.name, 772, y + 14, 16, available ? ink : '#82908e', 'bold', 'left', 'Arial');
    const cost = [action.focus ? `${action.focus} focus` : '', action.budget ? `${action.budget} budget` : ''].filter(Boolean).join(' · ');
    if (cost) label(cost, 1135, y + 14, 12, available ? coral : '#87928d', 'bold', 'right', 'Arial');
    label(action.detail, 772, y + 32, 12, available ? '#5b6b70' : '#87928d', 'normal', 'left', 'Arial');
    if (available) hitboxes.push({ x: 758, y, w: 390, h: 43, action: () => chooseAction(state, action.id) });
  });
}
function toolsPanel() {
  label('Queue one tool for this day. It is used once.', 760, 301, 16, ink);
  const noTool = state.itemIndex === -1;
  rect(758, 318, 390, 34, noTool ? '#d6eee4' : '#f4ebda', 8, noTool ? teal : '#d5c7b6', noTool ? 2 : 1);
  label('NO TOOL', 775, 336, 15, ink, 'bold', 'left', 'Arial');
  hitboxes.push({ x: 758, y: 318, w: 390, h: 34, action: () => chooseItem(state, -1) });
  for (let i = 0; i < 3; i++) {
    const y = 365 + i * 82, id = state.inventory[i], item = ITEMS.find(v => v.id === id), selected = state.itemIndex === i;
    rect(758, y, 390, 74, selected ? '#d6eee4' : '#f4ebda', 10, selected ? teal : '#d5c7b6', selected ? 2 : 1);
    if (item) {
      rect(769, y + 8, 59, 58, '#263c45', 8);
      imageContain(art[item.art], 771, y + 9, 55, 55);
      label(item.name, 842, y + 26, 17, ink, 'bold', 'left', 'Arial');
      label(item.detail, 842, y + 51, 14, '#5b6b70', 'normal', 'left', 'Arial');
      hitboxes.push({ x: 758, y, w: 390, h: 74, action: () => chooseItem(state, state.itemIndex === i ? -1 : i) });
    } else label('EMPTY SLOT', 842, y + 38, 15, '#9aa29a', 'bold', 'left', 'Arial');
  }
  label('Care packages arrive after days 4 and 8.', 760, 638, 13, '#627278', 'normal', 'left', 'Arial');
}
function sidePanel() {
  rect(737, 218, 433, 437, 'rgba(255,247,232,.98)', 18, ink, 3);
  const tabs = [['actions', 'ACTIONS'], ['crew', 'CREW'], ['tools', `TOOLS (${state.inventory.length})`]];
  tabs.forEach(([id, title], i) => {
    const x = 757 + i * 130, selected = activeTab === id;
    rect(x, 242, 124, 39, selected ? gold : '#ecdfca', 9, selected ? ink : '#c9b9a3', selected ? 2 : 1);
    label(title, x + 62, 262, 14, ink, 'bold', 'center', 'Arial');
    hitboxes.push({ x, y: 242, w: 124, h: 39, action: () => { activeTab = id; } });
  });
  if (activeTab === 'actions') actionsPanel();
  else if (activeTab === 'crew') crewPanel();
  else toolsPanel();
}
function bottomPanel() {
  rect(30, 670, 780, 110, 'rgba(19,47,58,.96)', 15);
  const f = forecast(state);
  if (f) {
    label(`FORECAST  ·  ${f.action}${f.usedItem ? `  ·  ${f.usedItem}` : ''}`, 52, 692, 14, gold, 'bold', 'left', 'Arial');
    label(`${f.netWork >= 0 ? '+' : ''}${f.netWork} WORK     ${f.netBugs >= 0 ? '+' : ''}${f.netBugs} BUGS     ${f.netDebt >= 0 ? '+' : ''}${f.netDebt} DEBT     ${f.handoffs} HANDOFFS`, 52, 722, 19, cream, 'bold', 'left', 'Arial');
    label(`After: ${f.progress}/${f.scope} built · ${f.totalBugs} bugs · trust ${f.trust} · focus ${f.focus} · budget ${f.budget}`, 52, 753, 14, '#d3e5dc', 'normal', 'left', 'Arial');
  } else {
    label('FIELD NOTES', 52, 693, 14, gold, 'bold', 'left', 'Arial');
    wrap(state.report, 52, 715, 730, 17, cream, 22);
  }
  button(state.day === DAYS ? 'SHIP IT' : 'END DAY →', 840, 690, 330, 65, () => { endDay(state); pointer = { x: -1, y: -1 }; }, { disabled: !ready(state), fill: coral, hover: '#f18d7c', size: 22 });
  if (!ready(state)) label(state.chosen < 0 ? 'Choose one response' : 'Assign every engineer', 1005, 775, 15, cream, 'normal', 'center', 'Arial');
}
function play() { background(); header(); eventPanel(); sidePanel(); bottomPanel(); }
function endScreen() {
  background();
  const won = state.ending === 'win';
  rect(136, 80, 928, 600, 'rgba(255,247,232,.98)', 22, ink, 4);
  label(won ? 'MIRACLE: IT WORKS' : 'THE DEADLINE WON', 600, 153, 48, won ? teal : coral, 'bold', 'center');
  label(won ? 'A RELEASE THE TEAM CAN DEFEND' : 'THE STATUS LIGHT WAS OPTIMISTIC', 600, 203, 18, ink, 'bold', 'center', 'Arial');
  rect(200, 238, 800, 2, '#d4bba0');
  const stats = [
    [`${state.progress}/${state.scope}`, 'BUILT / SCOPE'],
    [String(state.bugs), 'OPEN BUGS'],
    [String(state.debt), 'TECH DEBT'],
    [String(state.trust), 'TRUST']
  ];
  stats.forEach(([value, name], i) => { const x = 292 + i * 206; label(value, x, 302, 33, ink, 'bold', 'center'); label(name, x, 340, 14, i === 1 ? coral : teal, 'bold', 'center', 'Arial'); });
  wrap(won ? 'The team protected the design, controlled defects, and finished the promised work. Somewhere, a schedule is telling the truth.' : `Release needed ${state.scope} work, at most 18 bugs, trust of 30, and a team still standing. ${state.report}`, 238, 391, 720, 21, ink, 29);
  const milestoneCount = state.milestones.filter(m => m.met).length;
  const diagnosis = won ? 'The team made room for both progress and quality.' : state.bugs > 18 ? 'The defect pile outgrew the release gate.' : state.progress < state.scope ? 'The promised scope outgrew the work completed.' : state.trust < 30 ? 'The sponsor no longer believed the schedule.' : 'The team ran out of room to recover.';
  label('PROJECT RETROSPECTIVE', 238, 493, 14, teal, 'bold', 'left', 'Arial');
  wrap(`${diagnosis}  ${milestoneCount}/2 milestones met · ${state.actionsUsed} action${state.actionsUsed === 1 ? '' : 's'} · ${state.itemsUsed} tool${state.itemsUsed === 1 ? '' : 's'}.`, 238, 512, 720, 16, ink, 22);
  button('TRY ANOTHER RUN', 420, 572, 360, 62, () => { state = makeRun(); state.mode = 'play'; activeTab = 'actions'; pointer = { x: -1, y: -1 }; }, { size: 21 });
  label(`Run ${state.seed} · Inspired by Frederick P. Brooks Jr.`, 600, 661, 14, '#64747a', 'italic', 'center');
}
function render() {
  hitboxes = []; ctx.clearRect(0, 0, W, H);
  if (state.mode === 'intro') intro();
  else if (state.mode === 'play') play();
  else endScreen();
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
  if (e.key.toLowerCase() === 'f') { if (document.fullscreenElement) document.exitFullscreen?.(); else canvas.requestFullscreen?.(); }
  if (state.mode === 'intro' && e.key === 'Enter') state.mode = 'play';
  else if (state.mode === 'play') {
    if (['1', '2', '3'].includes(e.key)) { choose(state, Number(e.key) - 1); popAt = clock; }
    if (e.key.toLowerCase() === 'a') activeTab = 'actions';
    if (e.key.toLowerCase() === 'c') activeTab = 'crew';
    if (e.key.toLowerCase() === 'i') activeTab = 'tools';
    if (e.key === 'Enter') endDay(state);
  } else if (state.mode === 'end' && e.key.toLowerCase() === 'r') { state = makeRun(); state.mode = 'play'; activeTab = 'actions'; }
  render();
});
window.addEventListener('resize', resize);
document.addEventListener('fullscreenchange', resize);
window.advanceTime = ms => { if (!reducedMotion) clock += ms / 1000; render(); };
window.render_game_to_text = () => JSON.stringify({
  coordinateSystem: 'Canvas 1200x800; origin top-left, x right, y down.',
  mode: state.mode, seed: state.seed, day: state.day, phase: PHASES[state.phase], team: state.team,
  allocation: state.alloc, unassigned: state.team - assigned(state), choice: state.chosen,
  event: state.mode === 'play' ? { title: currentEvent(state).title, options: currentEvent(state).options.map((o, i) => ({ label: o.label, detail: o.detail, available: canOption(state, i) })) } : null,
  twist: state.mode === 'play' ? currentTwist(state).name : null,
  action: state.action, actions: ACTIONS.map(a => ({ id: a.id, available: canAction(state, a.id) })),
  inventory: state.inventory, itemIndex: state.itemIndex, activeTab,
  progress: state.progress, scope: state.scope, bugs: state.bugs, debt: state.debt, morale: state.morale,
  integrity: state.integrity, knowledge: state.knowledge, trust: state.trust, automation: state.automation,
  budget: state.budget, focus: state.focus, itemsUsed: state.itemsUsed, actionsUsed: state.actionsUsed,
  onboardingDays: state.onboarding, forecast: forecast(state), report: state.report, milestones: state.milestones,
  ending: state.ending
});
resize();
if (!reducedMotion) requestAnimationFrame(animationLoop);
