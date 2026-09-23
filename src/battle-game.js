export const ACTS = ['Requirements', 'Integration', 'Release'];
export const TOTAL_FIGHTS = 9;
export const ACT_LORE = [
  'The project charter was signed before anyone agreed what it meant. The first floor is full of promises.',
  'Every team built its own truth. Now the interfaces are opening doors for things that should not exist.',
  'The release clock has become a creature. One coherent plan is all that stands between the team and it.'
];
export const ROLES = {
  architect: { name: 'Architect', detail: 'Start with Clean Design. Build a careful, flexible deck.', icon: '◇' },
  debugger: { name: 'Debugger', detail: 'Start with Root Cause and an extra Debug Duck.', icon: '✦' },
  producer: { name: 'Producer', detail: 'Start with 78 HP, 18 credits, and Scope Lock.', icon: '◆' }
};

export const CARDS = {
  patch: { name: 'Patch', cost: 1, type: 'attack', detail: 'Deal 7 damage.', rarity: 'basic', art: 'patch' },
  review: { name: 'Review', cost: 1, type: 'skill', detail: 'Gain 7 Block.', rarity: 'basic', art: 'review' },
  pair: { name: 'Pair Debug', cost: 1, type: 'attack', detail: 'Deal 5 damage. Draw 1.', rarity: 'common', art: 'pair' },
  refactor: { name: 'Refactor', cost: 1, type: 'attack', detail: 'Deal 6. Apply 1 Weak.', rarity: 'common', art: 'pair' },
  panic: { name: 'Panic Fix', cost: 0, type: 'attack', detail: 'Deal 4. Gain 1 Burnout.', rarity: 'basic', art: 'sprint' },
  memo: { name: 'Decision Memo', cost: 1, type: 'skill', detail: 'Gain 5 Block. Draw 1.', rarity: 'common', art: 'blueprint' },
  sweep: { name: 'Test Sweep', cost: 2, type: 'attack', detail: 'Deal 7 to ALL foes.', rarity: 'uncommon', art: 'signal' },
  guardrail: { name: 'Guardrail', cost: 2, type: 'skill', detail: 'Gain 13 Block. Apply 1 Weak.', rarity: 'uncommon', art: 'review' },
  rollback: { name: 'Rollback', cost: 1, type: 'skill', detail: 'Heal 5. Gain 3 Block.', rarity: 'uncommon', art: 'rollback' },
  critical: { name: 'Critical Path', cost: 2, type: 'attack', detail: 'Deal 17 damage.', rarity: 'rare', art: 'critical' },
  overclock: { name: 'Overclock', cost: 0, type: 'skill', detail: 'Gain 2 SP. Lose 4 HP.', rarity: 'rare', art: 'sprint' },
  blueprint: { name: 'Clean Design', cost: 2, type: 'skill', detail: 'Gain 10 Block. Draw 2.', rarity: 'rare', art: 'blueprint' },
  rootcause: { name: 'Root Cause', cost: 1, type: 'attack', detail: 'Deal 9. +6 vs Weak foes.', rarity: 'uncommon', art: 'pair' },
  scopelock: { name: 'Scope Lock', cost: 1, type: 'attack', detail: 'Deal 5. Apply 2 Vulnerable.', rarity: 'uncommon', art: 'critical' },
  automation: { name: 'Automation', cost: 1, type: 'skill', detail: 'Gain 5 Block. At 2 Flow, gain 1 SP.', rarity: 'uncommon', art: 'signal' },
  handoffmap: { name: 'Handoff Map', cost: 0, type: 'skill', detail: 'Draw 2. Gain 1 Burnout.', rarity: 'common', art: 'blueprint' },
  incident: { name: 'Incident Room', cost: 2, type: 'attack', detail: 'Deal 8 to all. +2 per Flow.', rarity: 'rare', art: 'critical' },
  triage: { name: 'Triage', cost: 1, type: 'skill', detail: 'Heal 3. Gain 5 Block.', rarity: 'common', art: 'rollback' },
  signal: { name: 'Signal Boost', cost: 1, type: 'skill', detail: 'Apply 1 Weak to all foes. Draw 1.', rarity: 'uncommon', art: 'signal' },
  sprint: { name: 'Sprint Burst', cost: 1, type: 'attack', detail: 'Deal 6. +4 per trinket used this fight.', rarity: 'uncommon', art: 'sprint' },
  backlog: { name: 'Backlog Cut', cost: 2, type: 'attack', detail: 'Deal 13. Gain 1 SP if foe is Vulnerable.', rarity: 'rare', art: 'critical' }
};
export const REWARD_CARDS = ['pair', 'refactor', 'memo', 'sweep', 'guardrail', 'rollback', 'critical', 'overclock', 'blueprint', 'rootcause', 'scopelock', 'automation', 'handoffmap', 'incident', 'triage', 'signal', 'sprint', 'backlog'];

export const ITEMS = {
  duck: { name: 'Debug Duck', detail: 'Deal 10. Apply Vulnerable.', art: 'duck' },
  pizza: { name: 'Emergency Pizza', detail: 'Heal 13 HP.', art: 'pizza' },
  blueprint: { name: 'One-Page Blueprint', detail: 'Gain 10 Block. Draw 2.', art: 'blueprint' }
};
export const TRINKETS = {
  stopwatch: { name: 'Pocket Stopwatch', detail: 'Once per fight: gain 1 SP.', icon: 'clock' },
  stamp: { name: 'Approval Stamp', detail: 'Once per fight: gain 7 Block.', icon: 'stamp' },
  whistle: { name: 'Signal Whistle', detail: 'Once per fight: apply 1 Weak to all foes.', icon: 'signal' },
  pager: { name: 'Old Pager', detail: 'Once per fight: draw 2 cards.', icon: 'pager' },
  paperclip: { name: 'Lucky Paperclip', detail: 'Once per fight: deal 7 damage to a foe.', icon: 'clip' }
};
export const RELICS = {
  harness: { name: 'Test Harness', detail: 'Start each fight with 5 Block.', art: 'duck', icon: 'shield' },
  model: { name: 'Shared Mental Model', detail: '+1 maximum SP each turn.', art: 'blueprint', icon: 'branch' },
  interface: { name: 'Clean Interface', detail: 'Block cards grant +2 Block.', art: 'blueprint', icon: 'shield' },
  coffee: { name: 'Office Coffee Machine', detail: 'Heal 4 before each fight.', art: 'pizza', icon: 'heart' },
  checklist: { name: 'Release Checklist', detail: 'First attack each fight deals +4.', art: 'duck', icon: 'sword' },
  ledger: { name: 'Scope Ledger', detail: 'Earn +5 credits after every fight.', art: 'blueprint', icon: 'coin' },
  lantern: { name: 'Archive Lantern', detail: 'Start each fight with 1 Flow.', art: 'pizza', icon: 'bolt' },
  binder: { name: 'Design Binder', detail: 'First skill each turn grants +3 Block.', art: 'blueprint', icon: 'book' },
  battery: { name: 'Reserve Battery', detail: 'Start each fight with +1 SP.', art: 'duck', icon: 'bolt' },
  lens: { name: 'Diagnostic Lens', detail: 'Attacks against Weak foes deal +3.', art: 'blueprint', icon: 'lens' },
  thread: { name: 'Red Thread', detail: 'Using a trinket grants 1 Flow.', art: 'pizza', icon: 'branch' }
};

const strike = (damage, extra = {}) => ({ kind: 'attack', damage, ...extra });
const shield = amount => ({ kind: 'shield', amount });
const summon = id => ({ kind: 'summon', id });
export const ENEMIES = {
  scope: { name: 'Scope Creep', art: 'scope', hp: 26, pattern: [strike(6), strike(5, { vulnerable: 1 }), strike(8)] },
  bug: { name: 'Clockwork Bug', art: 'bug', hp: 22, pattern: [strike(5), strike(4, { burnout: 1 }), shield(6)] },
  handoff: { name: 'Handoff Hydra', art: 'handoff', hp: 25, pattern: [strike(6), shield(7), strike(8)] },
  debt: { name: 'Debt Golem', art: 'debt', hp: 32, pattern: [shield(8), strike(8), strike(9)] },
  vendor: { name: 'Silver-Bullet Vendor', art: 'vendor', hp: 28, pattern: [strike(7), shield(7), strike(6, { burnout: 1 })] },
  mimic: { name: 'Meeting Mimic', art: 'mimic', hp: 28, pattern: [strike(5, { burnout: 1 }), shield(6), strike(9)] },
  wraith: { name: 'Burnout Wraith', art: 'wraith', hp: 25, pattern: [strike(4, { burnout: 1 }), strike(7), { kind: 'heal', amount: 5 }] },
  auditor: { name: 'Process Auditor', art: 'auditor', hp: 29, pattern: [shield(9), strike(7, { burnout: 1 }), strike(9)] },
  spider: { name: 'Dependency Spider', art: 'spider', hp: 27, pattern: [strike(6, { vulnerable: 1 }), summon('bug'), strike(8)] },
  siren: { name: 'Metrics Siren', art: 'siren', hp: 30, pattern: [strike(5, { vulnerable: 1 }), { kind: 'heal', amount: 6 }, strike(10)] },
  chimera: { name: 'Approval Chimera', art: 'chimera', hp: 34, pattern: [{ kind: 'tax', amount: 1 }, strike(9), shield(8), strike(7, { vulnerable: 1 })] },
  slime: { name: 'Regression Slime', art: 'slime', hp: 27, pattern: [strike(5), { kind: 'split' }, strike(7)] },
  swarm: { name: 'Notification Swarm', art: 'swarm', hp: 24, pattern: [strike(3, { hits: 2, burnout: 1 }), shield(5), strike(5, { hits: 2 })] },
  goblin: { name: 'Budget Goblin', art: 'goblin', hp: 58, boss: true, pattern: [strike(8), strike(6, { burnout: 1 }), shield(10), strike(12)] },
  kraken: { name: 'Merge Kraken', art: 'kraken', hp: 74, boss: true, pattern: [strike(9), strike(7, { vulnerable: 1 }), summon('bug'), strike(13), shield(11)] },
  dragon: { name: 'Deadline Dragon', art: 'dragon', hp: 100, boss: true, pattern: [strike(11), strike(8, { vulnerable: 1 }), shield(12), strike(17), summon('scope'), strike(19)] }
};
const REGULARS = [
  ['scope', 'bug', 'handoff', 'mimic', 'auditor', 'swarm'],
  ['debt', 'mimic', 'vendor', 'wraith', 'bug', 'spider', 'siren', 'slime'],
  ['debt', 'vendor', 'wraith', 'scope', 'handoff', 'auditor', 'spider', 'siren', 'chimera', 'slime', 'swarm']
];
const BOSSES = ['goblin', 'kraken', 'dragon'];
const BOSS_LINES = {
  goblin: '“The numbers are final. Your plan is a suggestion.”',
  kraken: '“Every branch returns to me.”',
  dragon: '“Yesterday was your last safe deadline.”'
};
export const EVENTS = {
  council: { title: 'The Architecture Council', speaker: 'Principal Architect', text: 'Three diagrams disagree. The council asks which one you will defend when the deadline arrives.', choices: [
    { label: 'Write one design', detail: 'Pay 12 credits. Add Clean Design.', effect: 'design', cost: 12 },
    { label: 'Cut a promise', detail: 'Lose 4 HP. Remove a basic card.', effect: 'purge', hpCost: 4 },
    { label: 'Request a study', detail: 'Gain 10 credits.', effect: 'funding' }
  ] },
  night: { title: 'The Midnight Deploy', speaker: 'Operations Engineer', text: 'The build light turns red. Someone offers to skip the checklist and call it momentum.', choices: [
    { label: 'Ship the hotfix', detail: 'Lose 8 HP. Gain 22 credits.', effect: 'rush', hpCost: 8 },
    { label: 'Roll back calmly', detail: 'Heal 10 HP.', effect: 'rest' },
    { label: 'Automate the check', detail: 'Pay 10 credits. Add Automation.', effect: 'automation', cost: 10 }
  ] },
  retro: { title: 'The Blameless Postmortem', speaker: 'Team Lead', text: 'The incident report has twelve authors. Only the useful lessons fit on one page.', choices: [
    { label: 'Retire an old habit', detail: 'Remove a basic card. Heal 4 HP.', effect: 'retire' },
    { label: 'Name a scapegoat', detail: 'Gain 16 credits. Lose 5 HP.', effect: 'scapegoat', hpCost: 5 },
    { label: 'Practice root cause', detail: 'Lose 4 HP. Add Root Cause.', effect: 'root', hpCost: 4 }
  ] },
  sponsor: { title: 'The Executive Sponsor', speaker: 'Vice President of Synergy', text: 'A sponsor smiles and offers funding, provided the deck looks impressive by Friday.', choices: [
    { label: 'Take the grant', detail: 'Pay 18 credits. Gain a random relic.', effect: 'relic', cost: 18 },
    { label: 'Ask for a small budget', detail: 'Gain 12 credits.', effect: 'funding12' },
    { label: 'Insist on scope control', detail: 'Lose 3 HP. Add Scope Lock.', effect: 'scope', hpCost: 3 }
  ] },
  archive: { title: 'The Forgotten Archive', speaker: 'Night Archivist', text: 'In the basement, abandoned plans whisper that every shortcut was once a brilliant idea.', choices: [
    { label: 'Study the map', detail: 'Add Handoff Map. Heal 5 HP.', effect: 'map' },
    { label: 'Reclaim the old tool', detail: 'Gain a random tool, if space allows.', effect: 'tool' },
    { label: 'Leave the clutter', detail: 'Remove a basic card.', effect: 'retire' }
  ] },
  lostfound: { title: 'Lost and Found', speaker: 'Facilities Keeper', text: 'A locked drawer contains the little objects that kept earlier teams going.', choices: [
    { label: 'Borrow a charm', detail: 'Gain a random trinket, if a slot is free.', effect: 'trinket' },
    { label: 'Sell your spare tool', detail: 'Lose one tool. Gain 20 credits.', effect: 'selltool' },
    { label: 'Take a quiet break', detail: 'Heal 7 HP.', effect: 'rest7' }
  ] }
};
export const SHOP_PRICES = { card: 17, item: 11, relic: 38, trinket: 23, heal: 14, remove: 16 };
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function nextRandom(s) {
  s.rng = (s.rng + 0x6D2B79F5) >>> 0;
  let x = s.rng;
  x = Math.imul(x ^ x >>> 15, x | 1);
  x ^= x + Math.imul(x ^ x >>> 7, x | 61);
  return ((x ^ x >>> 14) >>> 0) / 4294967296;
}
function pick(s, values) { return values[Math.floor(nextRandom(s) * values.length)]; }
function shuffle(s, values) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(nextRandom(s) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function randomSeed() {
  if (globalThis.crypto?.getRandomValues) return globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor(Math.random() * 4294967296);
}
function note(s, message) { s.log.unshift(message); s.log.length = Math.min(s.log.length, 3); }

export function newGame(seed = randomSeed()) {
  seed = Number(seed) >>> 0;
  const s = {
    mode: 'intro', seed, rng: seed || 0x9e3779b9, floor: 0, turn: 0,
    hp: 72, maxHp: 72, sp: 3, maxSp: 3, block: 0, vulnerable: 0, burnout: 0, flow: 0, spTax: 0,
    deck: ['patch', 'patch', 'patch', 'patch', 'review', 'review', 'review', 'pair', 'refactor', 'panic'],
    drawPile: [], discardPile: [], hand: [],
    inventory: ['duck', 'pizza'], trinkets: [], usedTrinkets: [], relics: [], credits: 14, role: 'architect', itemsUsed: 0, trinketUses: 0, cardsPlayed: 0,
    enemies: [], target: 0, itemUsedThisTurn: false, firstAttack: true, firstSkillTurn: true, damageTakenFight: 0, lastPayout: 0, lastPerfect: false,
    routeChoices: [], rewardChoices: [], defeatedBosses: [], eventId: '', shopStock: [], pendingRoute: null,
    lastFightElite: false, log: ['Your first crisis awaits.'], ending: ''
  };
  selectRole(s, 'architect');
  return s;
}
export function selectRole(s, role) {
  if (s.mode !== 'intro' || !ROLES[role]) return false;
  s.role = role;
  s.maxHp = role === 'producer' ? 78 : 72; s.hp = s.maxHp;
  s.credits = role === 'producer' ? 18 : 14;
  s.deck = ['patch', 'patch', 'patch', 'patch', 'review', 'review', 'review', 'pair', 'refactor', 'panic'];
  s.inventory = role === 'debugger' ? ['duck', 'duck', 'pizza'] : ['duck', 'pizza'];
  s.trinkets = [role === 'debugger' ? 'paperclip' : role === 'producer' ? 'stopwatch' : 'stamp'];
  s.usedTrinkets = [];
  if (role === 'architect') { s.deck.splice(s.deck.indexOf('review'), 1); s.deck.push('blueprint'); }
  if (role === 'debugger') { s.deck.splice(s.deck.indexOf('review'), 1); s.deck.push('rootcause'); }
  if (role === 'producer') { s.deck.splice(s.deck.indexOf('patch'), 1); s.deck.push('scopelock'); }
  return true;
}
export function actIndex(s) { return Math.min(2, Math.floor(s.floor / 3)); }
export function encounterNumber(s) { return Math.min(TOTAL_FIGHTS, s.floor + 1); }

function offerRoute(s) {
  const act = actIndex(s), boss = s.floor % 3 === 2;
  if (boss) {
    const id = BOSSES[act];
    s.routeChoices = [{ label: `BOSS: ${ENEMIES[id].name}`, detail: 'Major encounter · relic reward', ids: [id], elite: false, boss: true }];
  } else {
    const pool = REGULARS[act];
    const first = pick(s, pool);
    let second = pick(s, pool);
    if (second === first) second = pool[(pool.indexOf(first) + 1) % pool.length];
    const duo = s.floor % 3 === 1;
    let partner = pick(s, pool);
    if (partner === first) partner = pool[(pool.indexOf(first) + 2) % pool.length];
    const detour = s.floor % 3 === 1 ? 'shop' : 'event';
    s.routeChoices = [
      { label: duo ? 'Team incident' : 'Standard incident', detail: 'Normal threat · skill reward', ids: duo ? [first, partner] : [first], elite: false, boss: false, kind: 'combat' },
      { label: 'Risky incident', detail: 'Tougher foe · extra tool', ids: [second], elite: true, boss: false, kind: 'combat' },
      { label: detour === 'shop' ? 'Night market' : 'Unknown detour', detail: detour === 'shop' ? 'Shop · reinforced foe' : 'Story event · reinforced foe', ids: [pick(s, pool)], elite: false, boss: false, kind: detour }
    ];
  }
  s.mode = 'route';
  note(s, `Act ${act + 1}: choose the next incident.`);
}
export function startGame(s) { if (s.mode === 'intro') offerRoute(s); }

function createEnemy(s, id, elite = false) {
  const data = ENEMIES[id], act = actIndex(s);
  const maxHp = data.hp + (data.boss ? 0 : act * 4) + (elite ? 14 + act * 3 : 0);
  return { id, name: data.name, art: data.art, hp: maxHp, maxHp, block: 0, weak: 0, vulnerable: 0, step: 0, power: act + (elite ? 2 : 0), elite, boss: !!data.boss };
}
function drawOne(s) {
  if (s.hand.length >= 5) return;
  if (!s.drawPile.length) {
    if (!s.discardPile.length) return;
    s.drawPile = shuffle(s, s.discardPile);
    s.discardPile = [];
  }
  s.hand.push(s.drawPile.pop());
}
function drawHand(s) { while (s.hand.length < 5 && (s.drawPile.length || s.discardPile.length)) drawOne(s); }
function beginCombat(s, route) {
  s.enemies = route.ids.map(id => createEnemy(s, id, route.elite));
  if (route.kind === 'event' || route.kind === 'shop') for (const enemy of s.enemies) {
    enemy.maxHp += 8 + actIndex(s) * 2; enemy.hp = enemy.maxHp; enemy.power++;
  }
  s.lastFightElite = route.elite;
  s.turn = 1; s.sp = s.maxSp + (s.relics.includes('battery') ? 1 : 0); s.block = s.relics.includes('harness') ? 5 : 0;
  s.itemUsedThisTurn = false; s.firstAttack = true; s.firstSkillTurn = true; s.vulnerable = 0; s.burnout = 0; s.flow = s.relics.includes('lantern') ? 1 : 0;
  s.spTax = 0; s.damageTakenFight = 0; s.usedTrinkets = [];
  if (s.relics.includes('coffee')) s.hp = Math.min(s.maxHp, s.hp + 4);
  s.drawPile = shuffle(s, s.deck); s.discardPile = []; s.hand = []; drawHand(s);
  s.target = 0; s.mode = 'combat';
  note(s, route.boss ? `${s.enemies[0].name}: ${BOSS_LINES[s.enemies[0].id]}` : `${route.label}: ${s.enemies.map(e => e.name).join(' and ')}.`);
  return true;
}
export function chooseRoute(s, index) {
  if (s.mode !== 'route' || !s.routeChoices[index]) return false;
  const route = s.routeChoices[index];
  if (route.kind === 'event') {
    s.pendingRoute = route; s.eventId = pick(s, Object.keys(EVENTS)); s.mode = 'event';
    note(s, `${EVENTS[s.eventId].speaker}: ${EVENTS[s.eventId].title}.`); return true;
  }
  if (route.kind === 'shop') {
    s.pendingRoute = route;
    const availableRelics = Object.keys(RELICS).filter(id => !s.relics.includes(id));
    const availableTrinkets = Object.keys(TRINKETS).filter(id => !s.trinkets.includes(id));
    s.shopStock = [
      { kind: 'card', id: pick(s, REWARD_CARDS), price: SHOP_PRICES.card, sold: false },
      { kind: 'item', id: pick(s, Object.keys(ITEMS)), price: SHOP_PRICES.item, sold: false },
      { kind: 'relic', id: availableRelics.length ? pick(s, availableRelics) : '', price: SHOP_PRICES.relic, sold: false },
      { kind: 'trinket', id: availableTrinkets.length ? pick(s, availableTrinkets) : '', price: SHOP_PRICES.trinket, sold: false },
      { kind: 'heal', id: '', price: SHOP_PRICES.heal, sold: false },
      { kind: 'remove', id: '', price: SHOP_PRICES.remove, sold: false }
    ];
    s.mode = 'shop'; note(s, 'The Night Archivist opens the cabinet of almost-useful things.'); return true;
  }
  return beginCombat(s, route);
}
function removeBasic(s) {
  const choices = s.deck.map((id, i) => ['patch', 'review'].includes(id) ? i : -1).filter(i => i >= 0);
  if (!choices.length) return false;
  const index = pick(s, choices), removed = s.deck.splice(index, 1)[0];
  note(s, `${CARDS[removed].name} was retired from the playbook.`);
  return true;
}
function randomRelic(s) {
  const available = Object.keys(RELICS).filter(id => !s.relics.includes(id));
  if (!available.length) return false;
  const id = pick(s, available); s.relics.push(id);
  if (id === 'model') { s.maxSp++; s.sp = s.maxSp; }
  note(s, `Found ${RELICS[id].name}.`);
  return true;
}
function randomTrinket(s) {
  const available = Object.keys(TRINKETS).filter(id => !s.trinkets.includes(id));
  if (s.trinkets.length >= 2 || !available.length) return false;
  const id = pick(s, available); s.trinkets.push(id);
  note(s, `Equipped ${TRINKETS[id].name}.`);
  return true;
}
export function canChooseEvent(s, index) {
  if (s.mode !== 'event') return false;
  const choice = EVENTS[s.eventId]?.choices[index];
  if (!choice || s.credits < (choice.cost || 0) || s.hp <= (choice.hpCost || 0)) return false;
  if (['purge', 'retire'].includes(choice.effect) && !s.deck.some(id => ['patch', 'review'].includes(id))) return false;
  if (choice.effect === 'tool' && s.inventory.length >= 3) return false;
  if (choice.effect === 'relic' && s.relics.length >= Object.keys(RELICS).length) return false;
  if (choice.effect === 'trinket' && s.trinkets.length >= 2) return false;
  if (choice.effect === 'selltool' && !s.inventory.length) return false;
  return true;
}
export function chooseEvent(s, index) {
  if (!canChooseEvent(s, index)) return false;
  const choice = EVENTS[s.eventId].choices[index];
  s.credits -= choice.cost || 0; s.hp -= choice.hpCost || 0;
  switch (choice.effect) {
    case 'design': s.deck.push('blueprint'); break;
    case 'purge': removeBasic(s); break;
    case 'funding': s.credits += 10; break;
    case 'rush': s.credits += 22; break;
    case 'rest': heal(s, 10); break;
    case 'automation': s.deck.push('automation'); break;
    case 'retire': removeBasic(s); if (s.eventId === 'retro') heal(s, 4); break;
    case 'scapegoat': s.credits += 16; break;
    case 'root': s.deck.push('rootcause'); break;
    case 'relic': randomRelic(s); break;
    case 'funding12': s.credits += 12; break;
    case 'scope': s.deck.push('scopelock'); break;
    case 'map': s.deck.push('handoffmap'); heal(s, 5); break;
    case 'tool': s.inventory.push(pick(s, Object.keys(ITEMS))); break;
    case 'trinket': randomTrinket(s); break;
    case 'selltool': s.inventory.pop(); s.credits += 20; break;
    case 'rest7': heal(s, 7); break;
  }
  note(s, `${EVENTS[s.eventId].speaker}: “${choice.label}.”`);
  const route = s.pendingRoute; s.pendingRoute = null; s.eventId = '';
  return beginCombat(s, route);
}
export function canBuyShop(s, index) {
  if (s.mode !== 'shop') return false;
  const offer = s.shopStock[index];
  if (!offer || offer.sold || s.credits < offer.price) return false;
  if (['relic', 'trinket'].includes(offer.kind) && !offer.id) return false;
  if (offer.kind === 'item' && s.inventory.length >= 3) return false;
  if (offer.kind === 'trinket' && (s.trinkets.length >= 2 || s.trinkets.includes(offer.id))) return false;
  if (offer.kind === 'heal' && s.hp >= s.maxHp) return false;
  if (offer.kind === 'remove' && !s.deck.some(id => ['patch', 'review'].includes(id))) return false;
  return true;
}
export function buyShop(s, index) {
  if (!canBuyShop(s, index)) return false;
  const offer = s.shopStock[index]; s.credits -= offer.price; offer.sold = true;
  if (offer.kind === 'card') s.deck.push(offer.id);
  if (offer.kind === 'item') s.inventory.push(offer.id);
  if (offer.kind === 'trinket') s.trinkets.push(offer.id);
  if (offer.kind === 'relic') { s.relics.push(offer.id); if (offer.id === 'model') { s.maxSp++; s.sp = s.maxSp; } }
  if (offer.kind === 'heal') heal(s, 15);
  if (offer.kind === 'remove') removeBasic(s);
  note(s, `Archivist: ${offer.kind === 'remove' ? 'Old habits filed away' : offer.kind === 'heal' ? 'A restorative break' : `Purchased ${offer.kind === 'card' ? CARDS[offer.id].name : offer.kind === 'item' ? ITEMS[offer.id].name : offer.kind === 'trinket' ? TRINKETS[offer.id].name : RELICS[offer.id].name}`}.`);
  return true;
}
export function leaveShop(s) {
  if (s.mode !== 'shop' || !s.pendingRoute) return false;
  const route = s.pendingRoute; s.pendingRoute = null; s.shopStock = [];
  return beginCombat(s, route);
}
export function selectTarget(s, index) {
  if (s.mode !== 'combat' || !s.enemies[index]) return false;
  s.target = index;
  return true;
}
export function intentFor(enemy) {
  const intent = ENEMIES[enemy.id].pattern[enemy.step % ENEMIES[enemy.id].pattern.length];
  if (intent.kind === 'attack') {
    const n = Math.max(0, intent.damage + enemy.power - (enemy.weak ? 2 : 0));
    return { ...intent, damage: n, label: `${intent.hits ? `MULTI ${intent.hits} × ${n}` : `${intent.burnout ? 'DRAIN' : intent.vulnerable ? 'EXPOSE' : 'ATTACK'} ${n}`}${intent.burnout ? ' · Burnout' : intent.vulnerable ? ' · Vulnerable' : ''}` };
  }
  if (intent.kind === 'shield') return { ...intent, label: `BLOCK ${intent.amount + enemy.power}` };
  if (intent.kind === 'summon') return { ...intent, label: `SUMMON ${ENEMIES[intent.id].name}` };
  if (intent.kind === 'tax') return { ...intent, label: `TAX ${intent.amount} SP` };
  if (intent.kind === 'split') return { ...intent, label: 'SPLIT · HALF HP' };
  return { ...intent, label: `RECOVER ${intent.amount}` };
}
function attackEnemy(s, enemy, amount) {
  if (!enemy) return 0;
  amount += s.flow * 2;
  if (enemy.weak && s.relics.includes('lens')) amount += 3;
  if (s.firstAttack && s.relics.includes('checklist')) amount += 4;
  s.firstAttack = false;
  if (enemy.vulnerable) { amount += 3; enemy.vulnerable--; }
  const blocked = Math.min(enemy.block, amount);
  enemy.block -= blocked;
  const damage = Math.max(0, amount - blocked);
  enemy.hp = Math.max(0, enemy.hp - damage);
  return damage;
}
function gainBlock(s, amount, fromCard = true) { s.block += amount + (fromCard && s.relics.includes('interface') ? 2 : 0); }
function heal(s, amount) { s.hp = Math.min(s.maxHp, s.hp + amount); }
function afterDamage(s) {
  s.enemies = s.enemies.filter(enemy => enemy.hp > 0);
  s.target = clamp(s.target, 0, Math.max(0, s.enemies.length - 1));
  if (!s.enemies.length) finishFight(s);
}
export function playCard(s, handIndex, targetIndex = s.target) {
  if (s.mode !== 'combat' || !Number.isInteger(handIndex) || handIndex < 0 || handIndex >= s.hand.length) return false;
  const id = s.hand[handIndex], card = CARDS[id];
  if (s.sp < card.cost) return false;
  if ((card.type === 'attack' || id === 'guardrail') && id !== 'sweep' && !s.enemies[targetIndex]) return false;
  s.sp -= card.cost;
  s.hand.splice(handIndex, 1); s.discardPile.push(id); s.cardsPlayed++;
  if (card.type === 'skill') {
    s.flow = Math.min(3, s.flow + 1);
    if (s.firstSkillTurn && s.relics.includes('binder')) gainBlock(s, 3, false);
    s.firstSkillTurn = false;
  }
  const enemy = s.enemies[targetIndex];
  let message = card.name;
  switch (id) {
    case 'patch': message += ` dealt ${attackEnemy(s, enemy, 7)}.`; break;
    case 'pair': message += ` dealt ${attackEnemy(s, enemy, 5)} and drew a card.`; drawOne(s); break;
    case 'refactor': message += ` dealt ${attackEnemy(s, enemy, 6)} and weakened ${enemy.name}.`; enemy.weak++; break;
    case 'panic': message += ` dealt ${attackEnemy(s, enemy, 4)}. Burnout +1.`; s.burnout++; break;
    case 'critical': message += ` dealt ${attackEnemy(s, enemy, 17)}.`; break;
    case 'sweep': {
      let total = 0;
      for (const foe of s.enemies) total += attackEnemy(s, foe, 7);
      message += ` hit all foes for ${total} total.`; break;
    }
    case 'review': gainBlock(s, 7); message += ' raised Block.'; break;
    case 'memo': gainBlock(s, 5); drawOne(s); message += ' raised Block and drew a card.'; break;
    case 'guardrail': gainBlock(s, 13); enemy.weak++; message += ` raised Block and weakened ${enemy.name}.`; break;
    case 'rollback': heal(s, 5); gainBlock(s, 3); message += ' healed and raised Block.'; break;
    case 'overclock': s.sp += 2; s.hp = Math.max(1, s.hp - 4); message += ' gained 2 SP at the cost of 4 HP.'; break;
    case 'blueprint': gainBlock(s, 10); drawOne(s); drawOne(s); message += ' raised Block and drew two cards.'; break;
    case 'rootcause': message += ` dealt ${attackEnemy(s, enemy, enemy.weak ? 15 : 9)}.`; break;
    case 'scopelock': message += ` dealt ${attackEnemy(s, enemy, 5)} and exposed ${enemy.name}.`; enemy.vulnerable += 2; break;
    case 'automation': gainBlock(s, 5); if (s.flow >= 2) s.sp++; message += s.flow >= 2 ? ' raised Block and recovered 1 SP.' : ' raised Block.'; break;
    case 'handoffmap': drawOne(s); drawOne(s); s.burnout++; message += ' drew two cards at the cost of Burnout.'; break;
    case 'incident': { let total = 0; for (const foe of s.enemies) total += attackEnemy(s, foe, 8); message += ` hit all foes for ${total} total.`; break; }
    case 'triage': heal(s, 3); gainBlock(s, 5); message += ' healed and raised Block.'; break;
    case 'signal': for (const foe of s.enemies) foe.weak++; drawOne(s); message += ' weakened all foes and drew a card.'; break;
    case 'sprint': message += ` dealt ${attackEnemy(s, enemy, 6 + s.usedTrinkets.length * 4)}.`; break;
    case 'backlog': { const exposed = enemy.vulnerable > 0; message += ` dealt ${attackEnemy(s, enemy, 13)}.`; if (exposed) { s.sp++; message += ' Recovered 1 SP.'; } break; }
  }
  note(s, message);
  if (card.type === 'attack') afterDamage(s);
  return true;
}
export function useItem(s, index, targetIndex = s.target) {
  if (s.mode !== 'combat' || s.itemUsedThisTurn || !s.inventory[index]) return false;
  const id = s.inventory[index];
  if (id === 'duck' && !s.enemies[targetIndex]) return false;
  s.inventory.splice(index, 1); s.itemUsedThisTurn = true; s.itemsUsed++;
  if (id === 'duck') {
    const enemy = s.enemies[targetIndex];
    const damage = attackEnemy(s, enemy, 10);
    enemy.vulnerable++;
    note(s, `Debug Duck pecked ${enemy.name} for ${damage} and exposed a weakness.`);
    afterDamage(s);
  } else if (id === 'pizza') { heal(s, 13); note(s, 'Emergency Pizza restored 13 HP.'); }
  else { gainBlock(s, 10, false); drawOne(s); drawOne(s); note(s, 'One-Page Blueprint raised Block and drew two cards.'); }
  return true;
}
export function useTrinket(s, index, targetIndex = s.target) {
  if (s.mode !== 'combat' || !s.trinkets[index]) return false;
  const id = s.trinkets[index];
  if (s.usedTrinkets.includes(id) || (id === 'paperclip' && !s.enemies[targetIndex])) return false;
  s.usedTrinkets.push(id); s.trinketUses++;
  if (s.relics.includes('thread')) s.flow = Math.min(3, s.flow + 1);
  if (id === 'stopwatch') { s.sp++; note(s, 'Pocket Stopwatch found one more moment: +1 SP.'); }
  if (id === 'stamp') { gainBlock(s, 7, false); note(s, 'Approval Stamp granted 7 Block.'); }
  if (id === 'whistle') { for (const foe of s.enemies) foe.weak++; note(s, 'Signal Whistle weakened every foe.'); }
  if (id === 'pager') { drawOne(s); drawOne(s); note(s, 'Old Pager drew two cards.'); }
  if (id === 'paperclip') {
    const foe = s.enemies[targetIndex], damage = attackEnemy(s, foe, 7);
    note(s, `Lucky Paperclip dealt ${damage} to ${foe.name}.`); afterDamage(s);
  }
  return true;
}
function hitPlayer(s, amount) {
  if (s.vulnerable) { amount += 2; s.vulnerable--; }
  const absorbed = Math.min(s.block, amount);
  s.block -= absorbed;
  const damage = Math.max(0, amount - absorbed);
  s.hp = Math.max(0, s.hp - damage);
  s.damageTakenFight += damage;
  return damage;
}
export function endTurn(s) {
  if (s.mode !== 'combat') return false;
  s.discardPile.push(...s.hand); s.hand = [];
  for (const enemy of [...s.enemies]) {
    if (enemy.hp <= 0) continue;
    enemy.block = 0;
    const intent = intentFor(enemy);
    if (intent.kind === 'attack') {
      let damage = 0;
      for (let hit = 0; hit < (intent.hits || 1); hit++) damage += hitPlayer(s, intent.damage);
      if (intent.burnout) s.burnout += intent.burnout;
      if (intent.vulnerable) s.vulnerable += intent.vulnerable;
      note(s, `${enemy.name} dealt ${damage}${intent.burnout ? ' and caused Burnout' : intent.vulnerable ? ' and exposed you' : ''}.`);
      if (enemy.weak) enemy.weak--;
    } else if (intent.kind === 'shield') { enemy.block += intent.amount + enemy.power; note(s, `${enemy.name} gained ${enemy.block} Block.`); }
    else if (intent.kind === 'heal') { enemy.hp = Math.min(enemy.maxHp, enemy.hp + intent.amount); note(s, `${enemy.name} recovered ${intent.amount} HP.`); }
    else if (intent.kind === 'tax') { s.spTax += intent.amount; note(s, `${enemy.name} reserved ${intent.amount} SP from your next turn.`); }
    else if (intent.kind === 'split') {
      if (s.enemies.length < 3) {
        const clone = createEnemy(s, 'slime'); clone.maxHp = Math.max(8, Math.ceil(enemy.maxHp / 2)); clone.hp = clone.maxHp; clone.step = 2;
        s.enemies.push(clone); note(s, `${enemy.name} split into another slime.`);
      } else { enemy.hp = Math.min(enemy.maxHp, enemy.hp + 5); note(s, `${enemy.name} recombined and healed.`); }
    }
    else if (intent.kind === 'summon') {
      if (s.enemies.length < 3) { s.enemies.push(createEnemy(s, intent.id)); note(s, `${enemy.name} summoned ${ENEMIES[intent.id].name}.`); }
      else { hitPlayer(s, 5); note(s, `${enemy.name} struck when no room remained for a minion.`); }
    }
    enemy.step++;
    if (s.hp <= 0) { s.mode = 'end'; s.ending = 'lose'; note(s, 'The project lead fell in battle.'); return true; }
  }
  s.block = 0;
  s.turn++;
  s.sp = Math.max(1, s.maxSp - s.burnout - s.spTax);
  s.burnout = 0;
  s.spTax = 0; s.firstSkillTurn = true;
  s.flow = 0;
  s.itemUsedThisTurn = false;
  drawHand(s);
  return true;
}
function makeRewards(s, boss) {
  if (boss) {
    const available = Object.keys(RELICS).filter(id => !s.relics.includes(id));
    const choices = shuffle(s, available).slice(0, 2).map(id => ({ type: 'relic', id }));
    choices.push({ type: 'heal', amount: 18 });
    return choices;
  }
  const choices = shuffle(s, REWARD_CARDS).slice(0, 2).map(id => ({ type: 'card', id }));
  choices.push({ type: 'heal', amount: 11 });
  return choices;
}
function finishFight(s) {
  const boss = s.floor % 3 === 2;
  if (boss) s.defeatedBosses.push(BOSSES[actIndex(s)]);
  if (s.lastFightElite) {
    const available = Object.keys(TRINKETS).filter(id => !s.trinkets.includes(id));
    if (s.trinkets.length < 2 && available.length) {
      const id = pick(s, available); s.trinkets.push(id); note(s, `Elite cache: equipped ${TRINKETS[id].name}.`);
    } else if (s.inventory.length < 3) {
      const id = pick(s, Object.keys(ITEMS)); s.inventory.push(id); note(s, `Elite cache: ${ITEMS[id].name}.`);
    }
  }
  s.lastPerfect = s.damageTakenFight === 0;
  const payout = (boss ? 22 : s.lastFightElite ? 19 : 11) + actIndex(s) * 2 + (s.relics.includes('ledger') ? 5 : 0) + (s.lastPerfect ? 5 : 0);
  s.lastPayout = payout;
  s.credits += payout;
  note(s, `The team recovered ${payout} credits from the incident budget.`);
  s.floor++;
  s.sp = s.maxSp; s.block = 0; s.vulnerable = 0; s.burnout = 0; s.flow = 0;
  s.hand = []; s.drawPile = []; s.discardPile = [];
  if (s.floor >= TOTAL_FIGHTS) { s.mode = 'end'; s.ending = 'win'; note(s, 'The Deadline Dragon is defeated. The release ships.'); }
  else { s.rewardChoices = makeRewards(s, boss); s.mode = 'reward'; note(s, `Victory! Choose one reward.`); }
}
export function chooseReward(s, index) {
  if (s.mode !== 'reward' || !s.rewardChoices[index]) return false;
  const choice = s.rewardChoices[index];
  if (choice.type === 'card') { s.deck.push(choice.id); note(s, `${CARDS[choice.id].name} joined your deck.`); }
  else if (choice.type === 'relic') {
    s.relics.push(choice.id);
    if (choice.id === 'model') { s.maxSp++; s.sp = s.maxSp; }
    note(s, `${RELICS[choice.id].name} is now active.`);
  } else { heal(s, choice.amount); note(s, `Recovered ${choice.amount} HP.`); }
  s.rewardChoices = [];
  offerRoute(s);
  return true;
}
