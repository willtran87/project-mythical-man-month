export const ACTS = ['Requirements', 'Integration', 'Release'];
export const TOTAL_FIGHTS = 9;
export const ACT_LORE = [
  'The project charter was signed before anyone agreed what it meant. The first floor is full of promises.',
  'Every team built its own truth. Now the interfaces are opening doors for things that should not exist.',
  'The release clock has become a creature. One coherent plan is all that stands between the team and it.'
];
export const ROLES = {
  architect: { name: 'Architect', detail: 'Bank Block across turns. Shape one coherent plan.', ability: 'Design Review', abilityDetail: 'Once per fight: bank up to 8 current Block for next turn.', icon: '◇' },
  debugger: { name: 'Debugger', detail: 'Expose Weak foes and strike at the root cause.', ability: 'Breakpoint', abilityDetail: 'Once per fight: apply 2 Weak and 1 Vulnerable to a foe.', icon: '✦' },
  producer: { name: 'Producer', detail: 'Push the sprint, then manage the Burnout.', ability: 'Crunch Time', abilityDetail: 'Once per fight: gain 2 SP now and 1 Burnout.', icon: '◆' }
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
  overclock: { name: 'Overclock', cost: 0, type: 'skill', detail: 'Gain 2 SP. Lose 4 HP.', rarity: 'rare', art: 'overclock.webp' },
  blueprint: { name: 'Clean Design', cost: 2, type: 'skill', detail: 'Gain 10 Block. Draw 2.', rarity: 'rare', art: 'blueprint' },
  rootcause: { name: 'Root Cause', cost: 1, type: 'attack', detail: 'Deal 9. +6 vs Weak foes.', rarity: 'uncommon', art: 'pair' },
  scopelock: { name: 'Scope Lock', cost: 1, type: 'attack', detail: 'Deal 5. Apply 2 Vulnerable.', rarity: 'uncommon', art: 'critical' },
  automation: { name: 'Automation', cost: 1, type: 'skill', detail: 'Gain 5 Block. At 2 Flow, gain 1 SP.', rarity: 'uncommon', art: 'signal' },
  handoffmap: { name: 'Handoff Map', cost: 0, type: 'skill', detail: 'Draw 2. Gain 1 Burnout.', rarity: 'common', art: 'blueprint' },
  incident: { name: 'Incident Room', cost: 2, type: 'attack', detail: 'Deal 8 to all. +2 per Flow.', rarity: 'rare', art: 'incident.webp' },
  triage: { name: 'Triage', cost: 1, type: 'skill', detail: 'Heal 3. Gain 5 Block.', rarity: 'common', art: 'rollback' },
  signal: { name: 'Signal Boost', cost: 1, type: 'skill', detail: 'Apply 1 Weak to all foes. Draw 1.', rarity: 'uncommon', art: 'signal' },
  sprint: { name: 'Sprint Burst', cost: 1, type: 'attack', detail: 'Deal 6. +4 per trinket used this fight.', rarity: 'uncommon', art: 'sprint' },
  backlog: { name: 'Backlog Cut', cost: 2, type: 'attack', detail: 'Deal 13. Gain 1 SP if foe is Vulnerable.', rarity: 'rare', art: 'backlog.webp' },
  charter: { name: 'Design Charter', cost: 1, type: 'skill', detail: 'Gain 6 Block. Bank 3 for next turn.', rarity: 'common', role: 'architect', art: 'charter.webp' },
  map: { name: 'Dependency Map', cost: 1, type: 'skill', detail: '4 Block. Draw 1. +1 SP if banked.', rarity: 'uncommon', role: 'architect', art: 'charter.webp' },
  contract: { name: 'Interface Contract', cost: 2, type: 'attack', detail: 'Deal 7 + up to 10 from half Block.', rarity: 'uncommon', role: 'architect', art: 'integrity.webp' },
  integrity: { name: 'Conceptual Integrity', cost: 2, type: 'skill', detail: '9 Block. Bank 6. Draw 1.', rarity: 'rare', role: 'architect', art: 'integrity.webp' },
  trace: { name: 'Trace Route', cost: 1, type: 'attack', detail: 'Deal 5. 1 Weak. Draw 1 if already Weak.', rarity: 'common', role: 'debugger', art: 'trace.webp' },
  repro: { name: 'Repro Case', cost: 1, type: 'skill', detail: 'Apply 2 Vulnerable. Draw 1.', rarity: 'uncommon', role: 'debugger', art: 'trace.webp' },
  breakpoint: { name: 'Breakpoint', cost: 1, type: 'attack', detail: 'Deal 8. +8 vs Weak + Vulnerable.', rarity: 'uncommon', role: 'debugger', art: 'cascade.webp' },
  cascade: { name: 'Root-Cause Cascade', cost: 2, type: 'attack', detail: 'Deal 7 to ALL. +6 vs Weak foes.', rarity: 'rare', role: 'debugger', art: 'cascade.webp' },
  standup: { name: 'Standup Sprint', cost: 0, type: 'skill', detail: 'Gain 1 SP. Gain 1 Burnout.', rarity: 'common', role: 'producer', art: 'standup.webp' },
  trade: { name: 'Scope Trade', cost: 1, type: 'attack', detail: 'Deal 11. Lose 3 HP.', rarity: 'uncommon', role: 'producer', art: 'standup.webp' },
  quiet: { name: 'Quiet Hours', cost: 1, type: 'skill', detail: 'Clear up to 2 Burnout. Gain 6 Block.', rarity: 'uncommon', role: 'producer', art: 'rollback' },
  launch: { name: 'Launch Window', cost: 2, type: 'attack', detail: 'Deal 12 +5 per Burnout, then clear Burnout.', rarity: 'rare', role: 'producer', art: 'launch.webp' },
  reserve: { name: 'Buffer Budget', cost: 0, type: 'skill', detail: 'Gain 3 Block. Bank 2 for next turn.', rarity: 'common', role: 'architect', art: 'risk.webp' },
  riskmatrix: { name: 'Risk Matrix', cost: 1, type: 'skill', detail: 'Gain 5 Block. +1 SP next turn.', rarity: 'uncommon', role: 'architect', art: 'risk.webp' },
  probe: { name: 'Diagnostic Probe', cost: 1, type: 'attack', detail: 'Deal 4. Apply 2 Mark.', rarity: 'common', role: 'debugger', art: 'probe.webp' },
  exploit: { name: 'Exploit Path', cost: 2, type: 'attack', detail: 'Deal 7 +5 per Mark. Clear Mark.', rarity: 'rare', role: 'debugger', art: 'exploit.webp' },
  burnrate: { name: 'Burn Rate', cost: 1, type: 'attack', detail: 'Deal 7 +3 per Burnout. Gain 1 Burnout.', rarity: 'uncommon', role: 'producer', art: 'burn.webp' },
  weekend: { name: 'Recovery Weekend', cost: 2, type: 'skill', detail: 'Heal 7. Clear 3 Burnout. Gain 5 Block.', rarity: 'rare', role: 'producer', art: 'recovery.webp' },
  hardstop: { name: 'Hard Stop', cost: 1, type: 'skill', detail: 'Gain 7 Block. Clear 1 Burnout.', rarity: 'common', art: 'recovery.webp' },
  retro: { name: 'Retrospective', cost: 1, type: 'skill', detail: 'Draw 2. Heal 3 if below half HP.', rarity: 'uncommon', art: 'warroom.webp' },
  warroom: { name: 'War Room', cost: 2, type: 'skill', detail: '6 Block. 1 Weak to ALL. Draw 1.', rarity: 'rare', art: 'warroom.webp' },
  bufferexchange: { name: 'Buffer Exchange', cost: 1, type: 'attack', detail: 'Deal 7. +1 SP if Block is banked.', rarity: 'uncommon', role: 'architect', art: 'buffer.webp' },
  contingency: { name: 'Contingency Plan', cost: 2, type: 'skill', detail: '8 Block. Bank 4. Deal 5 to ALL.', rarity: 'rare', role: 'architect', art: 'contingency.webp' },
  triangulate: { name: 'Triangulate', cost: 1, type: 'skill', detail: '1 Weak, 1 Mark. Draw 1 if marked.', rarity: 'uncommon', role: 'debugger', art: 'triangulate.webp' },
  tracesweep: { name: 'Trace Sweep', cost: 2, type: 'attack', detail: 'Deal 5 to ALL. Mark each foe.', rarity: 'rare', role: 'debugger', art: 'tracesweep.webp' },
  borrow: { name: 'Borrowed Weekend', cost: 0, type: 'skill', detail: 'Gain 2 SP. Draw 1. Gain 2 Burnout.', rarity: 'rare', role: 'producer', art: 'borrow.webp' },
  reallocate: { name: 'Reallocate', cost: 1, type: 'skill', detail: 'Burnout -2. If any: draw 2, +1 SP.', rarity: 'uncommon', role: 'producer', art: 'reallocate.webp' }
};
export const REWARD_CARDS = ['pair', 'refactor', 'memo', 'sweep', 'guardrail', 'rollback', 'critical', 'overclock', 'blueprint', 'rootcause', 'scopelock', 'automation', 'handoffmap', 'incident', 'triage', 'signal', 'sprint', 'backlog', 'charter', 'map', 'contract', 'integrity', 'trace', 'repro', 'breakpoint', 'cascade', 'standup', 'trade', 'quiet', 'launch', 'reserve', 'riskmatrix', 'probe', 'exploit', 'burnrate', 'weekend', 'hardstop', 'retro', 'warroom', 'bufferexchange', 'contingency', 'triangulate', 'tracesweep', 'borrow', 'reallocate'];
export const CARD_POWER = {
  patch: 2, review: 2, panic: 1, pair: 3, refactor: 3, memo: 3, sweep: 3, guardrail: 4,
  rollback: 4, critical: 4, overclock: 4, blueprint: 5, rootcause: 4, scopelock: 4,
  automation: 3, handoffmap: 2, incident: 5, triage: 3, signal: 4, sprint: 3, backlog: 4,
  charter: 3, map: 3, contract: 4, integrity: 5, trace: 3, repro: 3, breakpoint: 4,
  cascade: 5, standup: 2, trade: 4, quiet: 4, launch: 5,
  reserve: 2, riskmatrix: 3, probe: 3, exploit: 5, burnrate: 4, weekend: 5,
  hardstop: 3, retro: 3, warroom: 4, bufferexchange: 3, contingency: 5,
  triangulate: 4, tracesweep: 4, borrow: 4, reallocate: 4
};
export const CARD_FAMILY = {
  patch: 'strike', review: 'block', panic: 'burnout', pair: 'draw', refactor: 'weak', memo: 'draw',
  sweep: 'area', guardrail: 'block', rollback: 'recovery', critical: 'strike', overclock: 'tempo',
  blueprint: 'draw', rootcause: 'weak', scopelock: 'vulnerable', automation: 'flow',
  handoffmap: 'draw', incident: 'area', triage: 'recovery', signal: 'weak', sprint: 'tempo',
  backlog: 'vulnerable', charter: 'bank', map: 'bank', contract: 'block', integrity: 'bank',
  trace: 'weak', repro: 'vulnerable', breakpoint: 'weak', cascade: 'weak', standup: 'burnout',
  trade: 'tempo', quiet: 'recovery', launch: 'burnout', reserve: 'bank', riskmatrix: 'bank',
  probe: 'mark', exploit: 'mark', burnrate: 'burnout', weekend: 'recovery', hardstop: 'recovery',
  retro: 'draw', warroom: 'weak', bufferexchange: 'bank', contingency: 'bank',
  triangulate: 'mark', tracesweep: 'mark', borrow: 'burnout', reallocate: 'burnout'
};
export const RARITY_WEIGHTS = [
  { common: 55, uncommon: 35, rare: 10 },
  { common: 40, uncommon: 40, rare: 20 },
  { common: 25, uncommon: 40, rare: 35 }
];
export function cardInfo(id) {
  const upgraded = id.endsWith('+');
  const card = CARDS[upgraded ? id.slice(0, -1) : id];
  if (!card) return card;
  const power = Math.min(5, CARD_POWER[upgraded ? id.slice(0, -1) : id] + (upgraded ? 1 : 0));
  const family = CARD_FAMILY[upgraded ? id.slice(0, -1) : id];
  if (!upgraded) return { ...card, power, family };
  return { ...card, name: `${card.name}+`, detail: `${card.detail} ${card.type === 'attack' ? '+3 dmg.' : '+3 Block.'}`, upgraded: true, power, family };
}

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
  thread: { name: 'Red Thread', detail: 'Using a trinket grants 1 Flow.', art: 'pizza', icon: 'branch' },
  grid: { name: 'Planning Grid', detail: 'Carry up to 3 leftover Block into the next turn.', icon: 'shield', role: 'architect' },
  notebook: { name: 'Fault Notebook', detail: 'First attack on a Weak foe each turn draws 1.', icon: 'book', role: 'debugger' },
  redline: { name: 'Redline Calendar', detail: 'First self-inflicted Burnout each fight grants 1 SP.', icon: 'clock', role: 'producer' }
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
  shredder: { name: 'Spec Shredder', art: 'shredder', hp: 29, pattern: [strike(5), { kind: 'erode', amount: 5, damage: 6 }, shield(6)] },
  collector: { name: 'Overtime Collector', art: 'collector', hp: 32, pattern: [strike(6, { burnout: 1 }), { kind: 'audit', damage: 5 }, shield(6)] },
  goblin: { name: 'Budget Goblin', art: 'goblin', hp: 58, boss: true, pattern: [strike(8), strike(6, { burnout: 1 }), shield(10), strike(12)] },
  kraken: { name: 'Merge Kraken', art: 'kraken', hp: 74, boss: true, pattern: [strike(9), strike(7, { vulnerable: 1 }), summon('bug'), strike(13), shield(11)] },
  dragon: { name: 'Deadline Dragon', art: 'dragon', hp: 100, boss: true, pattern: [strike(11), strike(8, { vulnerable: 1 }), shield(12), strike(17), summon('scope'), strike(19)] }
};
const REGULARS = [
  ['scope', 'bug', 'handoff', 'mimic', 'auditor', 'swarm', 'shredder'],
  ['debt', 'mimic', 'vendor', 'wraith', 'bug', 'spider', 'siren', 'slime', 'shredder', 'collector'],
  ['debt', 'vendor', 'wraith', 'scope', 'handoff', 'auditor', 'spider', 'siren', 'chimera', 'slime', 'swarm', 'shredder', 'collector']
];
const BOSSES = ['goblin', 'kraken', 'dragon'];
const BOSS_LINES = {
  goblin: '“The numbers are final. Your plan is a suggestion.”',
  kraken: '“Every branch returns to me.”',
  dragon: '“Yesterday was your last safe deadline.”'
};
export const EVENTS = {
  council: { title: 'The Architecture Council', speaker: 'Principal Architect', art: 'storyCouncil', text: 'Three diagrams disagree. The council asks which one you will defend when the deadline arrives.', choices: [
    { label: 'Write one design', detail: 'Pay 12 credits. Add Clean Design.', effect: 'design', cost: 12 },
    { label: 'Cut a promise', detail: 'Lose 4 HP. Remove a basic card.', effect: 'purge', hpCost: 4 },
    { label: 'Request a study', detail: 'Gain 10 credits.', effect: 'funding' }
  ] },
  night: { title: 'The Midnight Deploy', speaker: 'Operations Engineer', art: 'storyMidnight', text: 'The build light turns red. Someone offers to skip the checklist and call it momentum.', choices: [
    { label: 'Ship the hotfix', detail: 'Lose 8 HP. Gain 22 credits.', effect: 'rush', hpCost: 8 },
    { label: 'Roll back calmly', detail: 'Heal 10 HP.', effect: 'rest' },
    { label: 'Automate the check', detail: 'Pay 10 credits. Add Automation.', effect: 'automation', cost: 10 }
  ] },
  retro: { title: 'The Blameless Postmortem', speaker: 'Team Lead', art: 'storyRetro', text: 'The incident report has twelve authors. Only the useful lessons fit on one page.', choices: [
    { label: 'Retire an old habit', detail: 'Remove a basic card. Heal 4 HP.', effect: 'retire' },
    { label: 'Name a scapegoat', detail: 'Gain 16 credits. Lose 5 HP.', effect: 'scapegoat', hpCost: 5 },
    { label: 'Practice root cause', detail: 'Lose 4 HP. Add Root Cause.', effect: 'root', hpCost: 4 }
  ] },
  sponsor: { title: 'The Executive Sponsor', speaker: 'Vice President of Synergy', art: 'storySponsor', text: 'A sponsor smiles and offers funding, provided the deck looks impressive by Friday.', choices: [
    { label: 'Take the grant', detail: 'Pay 18 credits. Gain a random relic.', effect: 'relic', cost: 18 },
    { label: 'Ask for a small budget', detail: 'Gain 12 credits.', effect: 'funding12' },
    { label: 'Insist on scope control', detail: 'Lose 3 HP. Add Scope Lock.', effect: 'scope', hpCost: 3 }
  ] },
  archive: { title: 'The Forgotten Archive', speaker: 'Night Archivist', art: 'archive', text: 'In the basement, abandoned plans whisper that every shortcut was once a brilliant idea.', choices: [
    { label: 'Study the map', detail: 'Add Handoff Map. Heal 5 HP.', effect: 'map' },
    { label: 'Reclaim the old tool', detail: 'Gain a random tool, if space allows.', effect: 'tool' },
    { label: 'Leave the clutter', detail: 'Remove a basic card.', effect: 'retire' }
  ] },
  lostfound: { title: 'Lost and Found', speaker: 'Facilities Keeper', art: 'storyLostFound', text: 'A locked drawer contains the little objects that kept earlier teams going.', choices: [
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
    hp: 72, maxHp: 72, sp: 3, maxSp: 3, block: 0, vulnerable: 0, burnout: 0, flow: 0, spTax: 0, nextSp: 0,
    deck: ['patch', 'patch', 'patch', 'patch', 'review', 'review', 'review', 'pair', 'refactor', 'panic'],
    drawPile: [], discardPile: [], hand: [],
    inventory: ['duck', 'pizza'], trinkets: [], usedTrinkets: [], relics: [], credits: 14, role: 'architect', itemsUsed: 0, trinketUses: 0, cardsPlayed: 0,
    enemies: [], target: 0, itemUsedThisTurn: false, firstAttack: true, firstSkillTurn: true, damageTakenFight: 0, lastPayout: 0, lastPerfect: false,
    reserveBlock: 0, abilityUsed: false, notebookTurn: 0, redlineUsed: false, upgradeDamage: 0,
    routeChoices: [], rewardChoices: [], tuneChoices: [], defeatedBosses: [], eventId: '', shopStock: [], pendingRoute: null,
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
  if (role === 'architect') { s.deck.splice(s.deck.indexOf('review'), 2); s.deck.push('blueprint', 'charter'); }
  if (role === 'debugger') { s.deck.splice(s.deck.indexOf('review'), 2); s.deck.push('rootcause', 'trace'); }
  if (role === 'producer') { s.deck.splice(s.deck.indexOf('patch'), 1); s.deck.splice(s.deck.indexOf('review'), 1); s.deck.push('scopelock', 'standup'); }
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
  return { id, name: data.name, art: data.art, hp: maxHp, maxHp, block: 0, weak: 0, vulnerable: 0, mark: 0, step: 0, power: act + (elite ? 2 : 0), elite, boss: !!data.boss };
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
function rewardCardPools(s) {
  return {
    role: REWARD_CARDS.filter(id => CARDS[id].role === s.role),
    neutral: REWARD_CARDS.filter(id => !CARDS[id].role)
  };
}
const ROLE_FAMILY = { architect: 'bank', debugger: 'mark', producer: 'burnout' };
const RELIC_FAMILY = { harness: 'block', model: 'tempo', interface: 'block', checklist: 'strike',
  binder: 'block', battery: 'tempo', lens: 'weak', thread: 'tempo', grid: 'bank',
  notebook: 'weak', redline: 'burnout' };
export function buildFit(s, id) {
  const family = CARD_FAMILY[id];
  if (!family) return 0;
  let score = family === ROLE_FAMILY[s.role] ? 2 : 0;
  if (CARDS[id].role === s.role) score++;
  for (const owned of s.deck) {
    const base = owned.endsWith('+') ? owned.slice(0, -1) : owned;
    if (CARDS[base]?.rarity !== 'basic' && CARD_FAMILY[base] === family) score += 2;
  }
  for (const relic of s.relics) if (RELIC_FAMILY[relic] === family) score += 2;
  return score;
}
export function pickSkillOffer(s, pool, { exclude = [], fit = false } = {}) {
  const weights = RARITY_WEIGHTS[actIndex(s)];
  const choices = pool.filter(id => CARDS[id] && !exclude.includes(id));
  if (!choices.length) return undefined;
  const available = ['common', 'uncommon', 'rare'].filter(rarity => choices.some(id => CARDS[id].rarity === rarity));
  const total = available.reduce((sum, rarity) => sum + weights[rarity], 0);
  let roll = nextRandom(s) * total;
  let tier = available.at(-1);
  for (const rarity of available) {
    roll -= weights[rarity];
    if (roll < 0) { tier = rarity; break; }
  }
  const tierChoices = choices.filter(id => CARDS[id].rarity === tier);
  const unseen = tierChoices.filter(id => !s.deck.some(owned => owned === id || owned === `${id}+`));
  const candidates = unseen.length ? unseen : tierChoices;
  if (!fit) return pick(s, candidates);
  const totalFit = candidates.reduce((sum, id) => sum + 1 + buildFit(s, id), 0);
  let fitRoll = nextRandom(s) * totalFit;
  for (const id of candidates) {
    fitRoll -= 1 + buildFit(s, id);
    if (fitRoll < 0) return id;
  }
  return candidates.at(-1);
}
export function skillPrice(id) {
  return { common: 17, uncommon: 25, rare: 37 }[CARDS[id].rarity];
}
function beginCombat(s, route) {
  s.enemies = route.ids.map(id => createEnemy(s, id, route.elite));
  if (route.kind === 'event' || route.kind === 'shop') for (const enemy of s.enemies) {
    enemy.maxHp += 8 + actIndex(s) * 2; enemy.hp = enemy.maxHp; enemy.power++;
  }
  s.lastFightElite = route.elite;
  s.turn = 1; s.sp = s.maxSp + (s.relics.includes('battery') ? 1 : 0); s.block = s.relics.includes('harness') ? 5 : 0;
  s.itemUsedThisTurn = false; s.firstAttack = true; s.firstSkillTurn = true; s.vulnerable = 0; s.burnout = 0; s.flow = s.relics.includes('lantern') ? 1 : 0;
  s.spTax = 0; s.nextSp = 0; s.damageTakenFight = 0; s.usedTrinkets = [];
  s.reserveBlock = 0; s.abilityUsed = false; s.notebookTurn = 0; s.redlineUsed = false; s.upgradeDamage = 0;
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
    const pools = rewardCardPools(s);
    const tailoredRelics = availableRelics.filter(id => RELICS[id].role === s.role);
    s.shopStock = [
      { kind: 'card', id: pickSkillOffer(s, nextRandom(s) < .65 ? pools.role : pools.neutral, { fit: true }), price: 0, sold: false },
      { kind: 'item', id: pick(s, Object.keys(ITEMS)), price: SHOP_PRICES.item, sold: false },
      { kind: 'relic', id: availableRelics.length ? pick(s, tailoredRelics.length && nextRandom(s) < .5 ? tailoredRelics : availableRelics) : '', price: SHOP_PRICES.relic, sold: false },
      { kind: 'trinket', id: availableTrinkets.length ? pick(s, availableTrinkets) : '', price: SHOP_PRICES.trinket, sold: false },
      { kind: 'heal', id: '', price: SHOP_PRICES.heal, sold: false },
      { kind: 'remove', id: '', price: SHOP_PRICES.remove, sold: false }
    ];
    s.shopStock[0].price = skillPrice(s.shopStock[0].id);
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
  if (intent.kind === 'erode') {
    const damage = Math.max(0, intent.damage + enemy.power - (enemy.weak ? 2 : 0));
    return { ...intent, damage, label: `SHRED ${intent.amount} BLK · HIT ${damage}` };
  }
  if (intent.kind === 'audit') {
    const damage = Math.max(0, intent.damage + enemy.power - (enemy.weak ? 2 : 0));
    return { ...intent, damage, label: `AUDIT ${damage} +2/BURN · TAX 1` };
  }
  if (intent.kind === 'split') return { ...intent, label: 'SPLIT · HALF HP' };
  return { ...intent, label: `RECOVER ${intent.amount}` };
}
function attackEnemy(s, enemy, amount, useMark = true) {
  if (!enemy) return 0;
  const notebookDraw = enemy.weak && s.relics.includes('notebook') && s.notebookTurn !== s.turn;
  amount += s.flow * 2 + s.upgradeDamage;
  if (useMark && enemy.mark) { amount += 4; enemy.mark--; }
  if (enemy.weak && s.relics.includes('lens')) amount += 3;
  if (s.firstAttack && s.relics.includes('checklist')) amount += 4;
  s.firstAttack = false;
  if (enemy.vulnerable) { amount += 3; enemy.vulnerable--; }
  const blocked = Math.min(enemy.block, amount);
  enemy.block -= blocked;
  const damage = Math.max(0, amount - blocked);
  enemy.hp = Math.max(0, enemy.hp - damage);
  if (notebookDraw) { s.notebookTurn = s.turn; drawOne(s); }
  return damage;
}
function gainBlock(s, amount, fromCard = true) { s.block += amount + (fromCard && s.relics.includes('interface') ? 2 : 0); }
function addSelfBurnout(s, amount) {
  s.burnout += amount;
  if (amount && s.relics.includes('redline') && !s.redlineUsed) { s.sp++; s.redlineUsed = true; }
}
function heal(s, amount) { s.hp = Math.min(s.maxHp, s.hp + amount); }
function afterDamage(s) {
  s.enemies = s.enemies.filter(enemy => enemy.hp > 0);
  s.target = clamp(s.target, 0, Math.max(0, s.enemies.length - 1));
  if (!s.enemies.length) finishFight(s);
}
export function playCard(s, handIndex, targetIndex = s.target) {
  if (s.mode !== 'combat' || !Number.isInteger(handIndex) || handIndex < 0 || handIndex >= s.hand.length) return false;
  const id = s.hand[handIndex], baseId = id.endsWith('+') ? id.slice(0, -1) : id, card = cardInfo(id);
  if (s.sp < card.cost) return false;
  if (((card.type === 'attack' && !['sweep', 'incident', 'cascade', 'tracesweep'].includes(baseId)) || ['guardrail', 'repro', 'triangulate'].includes(baseId)) && !s.enemies[targetIndex]) return false;
  s.sp -= card.cost;
  s.hand.splice(handIndex, 1); s.discardPile.push(id); s.cardsPlayed++;
  if (card.type === 'skill') {
    s.flow = Math.min(3, s.flow + 1);
    if (s.firstSkillTurn && s.relics.includes('binder')) gainBlock(s, 3, false);
    s.firstSkillTurn = false;
  }
  const enemy = s.enemies[targetIndex];
  let message = card.name;
  s.upgradeDamage = id.endsWith('+') && card.type === 'attack' ? 3 : 0;
  switch (baseId) {
    case 'patch': message += ` dealt ${attackEnemy(s, enemy, 7)}.`; break;
    case 'pair': message += ` dealt ${attackEnemy(s, enemy, 5)} and drew a card.`; drawOne(s); break;
    case 'refactor': message += ` dealt ${attackEnemy(s, enemy, 6)} and weakened ${enemy.name}.`; enemy.weak++; break;
    case 'panic': message += ` dealt ${attackEnemy(s, enemy, 4)}. Burnout +1.`; addSelfBurnout(s, 1); break;
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
    case 'handoffmap': drawOne(s); drawOne(s); addSelfBurnout(s, 1); message += ' drew two cards at the cost of Burnout.'; break;
    case 'incident': { let total = 0; for (const foe of s.enemies) total += attackEnemy(s, foe, 8); message += ` hit all foes for ${total} total.`; break; }
    case 'triage': heal(s, 3); gainBlock(s, 5); message += ' healed and raised Block.'; break;
    case 'signal': for (const foe of s.enemies) foe.weak++; drawOne(s); message += ' weakened all foes and drew a card.'; break;
    case 'sprint': message += ` dealt ${attackEnemy(s, enemy, 6 + s.usedTrinkets.length * 4)}.`; break;
    case 'backlog': { const exposed = enemy.vulnerable > 0; message += ` dealt ${attackEnemy(s, enemy, 13)}.`; if (exposed) { s.sp++; message += ' Recovered 1 SP.'; } break; }
    case 'charter': gainBlock(s, 6); s.reserveBlock = Math.min(12, s.reserveBlock + 3); message += ' raised Block and banked 3.'; break;
    case 'map': gainBlock(s, 4); drawOne(s); if (s.reserveBlock) s.sp++; message += s.reserveBlock ? ' raised Block, drew 1, and recovered 1 SP.' : ' raised Block and drew 1.'; break;
    case 'contract': message += ` dealt ${attackEnemy(s, enemy, 7 + Math.min(10, Math.floor(s.block / 2)))} from a defended position.`; break;
    case 'integrity': gainBlock(s, 9); s.reserveBlock = Math.min(12, s.reserveBlock + 6); drawOne(s); message += ' raised Block, banked 6, and drew 1.'; break;
    case 'trace': { const alreadyWeak = enemy.weak > 0; message += ` dealt ${attackEnemy(s, enemy, 5)} and weakened ${enemy.name}.`; enemy.weak++; if (alreadyWeak) { drawOne(s); message += ' Drew 1.'; } break; }
    case 'repro': enemy.vulnerable += 2; drawOne(s); message += ` exposed ${enemy.name} and drew 1.`; break;
    case 'breakpoint': message += ` dealt ${attackEnemy(s, enemy, 8 + (enemy.weak && enemy.vulnerable ? 8 : 0))}.`; break;
    case 'cascade': { let total = 0; for (const foe of s.enemies) total += attackEnemy(s, foe, 7 + (foe.weak ? 6 : 0)); message += ` hit all foes for ${total} total.`; break; }
    case 'standup': s.sp++; addSelfBurnout(s, 1); message += ' gained 1 SP and 1 Burnout.'; break;
    case 'trade': message += ` dealt ${attackEnemy(s, enemy, 11)} at a cost of 3 HP.`; s.hp = Math.max(1, s.hp - 3); break;
    case 'quiet': s.burnout = Math.max(0, s.burnout - 2); gainBlock(s, 6); message += ' cleared Burnout and raised Block.'; break;
    case 'launch': { const burnout = s.burnout; message += ` dealt ${attackEnemy(s, enemy, 12 + burnout * 5)} and cleared ${burnout} Burnout.`; s.burnout = 0; break; }
    case 'reserve': gainBlock(s, 3); s.reserveBlock = Math.min(12, s.reserveBlock + 2); message += ' raised Block and banked 2.'; break;
    case 'riskmatrix': gainBlock(s, 5); s.nextSp++; message += ' raised Block and planned +1 SP next turn.'; break;
    case 'probe': message += ` dealt ${attackEnemy(s, enemy, 4)} and marked ${enemy.name}.`; enemy.mark = Math.min(3, (enemy.mark || 0) + 2); break;
    case 'exploit': { const marks = enemy.mark || 0; message += ` dealt ${attackEnemy(s, enemy, 7 + marks * 5, false)} from ${marks} Mark.`; enemy.mark = 0; break; }
    case 'burnrate': message += ` dealt ${attackEnemy(s, enemy, 7 + s.burnout * 3)}. Burnout +1.`; addSelfBurnout(s, 1); break;
    case 'weekend': heal(s, 7); s.burnout = Math.max(0, s.burnout - 3); gainBlock(s, 5); message += ' healed, cleared Burnout, and raised Block.'; break;
    case 'hardstop': gainBlock(s, 7); s.burnout = Math.max(0, s.burnout - 1); message += ' raised Block and cleared 1 Burnout.'; break;
    case 'retro': drawOne(s); drawOne(s); if (s.hp * 2 < s.maxHp) heal(s, 3); message += ' drew 2 and recovered when needed.'; break;
    case 'warroom': gainBlock(s, 6); for (const foe of s.enemies) foe.weak++; drawOne(s); message += ' raised Block, weakened all foes, and drew 1.'; break;
    case 'bufferexchange': { const banked = s.reserveBlock > 0; message += ` dealt ${attackEnemy(s, enemy, 7)}.`; if (banked) { s.sp++; message += ' Banked Block recovered 1 SP.'; } break; }
    case 'contingency': { gainBlock(s, 8); s.reserveBlock = Math.min(12, s.reserveBlock + 4); let total = 0; for (const foe of s.enemies) total += attackEnemy(s, foe, 5); message += ` raised Block, banked 4, and hit all foes for ${total}.`; break; }
    case 'triangulate': { const marked = enemy.mark > 0; enemy.weak++; enemy.mark = Math.min(3, (enemy.mark || 0) + 1); if (marked) drawOne(s); message += marked ? ` weakened and marked ${enemy.name}, then drew 1.` : ` weakened and marked ${enemy.name}.`; break; }
    case 'tracesweep': { let total = 0; for (const foe of s.enemies) { total += attackEnemy(s, foe, 5); foe.mark = Math.min(3, (foe.mark || 0) + 1); } message += ` hit all foes for ${total} and marked each.`; break; }
    case 'borrow': s.sp += 2; drawOne(s); addSelfBurnout(s, 2); message += ' gained 2 SP and a card at a cost of 2 Burnout.'; break;
    case 'reallocate': { const cleared = Math.min(2, s.burnout); s.burnout -= cleared; if (cleared) { drawOne(s); drawOne(s); s.sp++; } message += cleared ? ` cleared ${cleared} Burnout, drew 2, and gained 1 SP.` : ' found no Burnout to reallocate.'; break; }
  }
  s.upgradeDamage = 0;
  if (id.endsWith('+') && card.type === 'skill') { gainBlock(s, 3, false); message += ' Upgrade: +3 Block.'; }
  note(s, message);
  if (card.type === 'attack' || baseId === 'contingency') afterDamage(s);
  return true;
}
export function useRoleAbility(s, targetIndex = s.target) {
  if (s.mode !== 'combat' || s.abilityUsed) return false;
  if (s.role === 'architect') {
    const banked = Math.min(8, s.block, 12 - s.reserveBlock);
    if (banked < 1) return false;
    s.block -= banked; s.reserveBlock += banked;
    note(s, `Design Review banked ${banked} Block for next turn.`);
  } else if (s.role === 'debugger') {
    const foe = s.enemies[targetIndex];
    if (!foe) return false;
    foe.weak += 2; foe.vulnerable++;
    note(s, `Breakpoint exposed and weakened ${foe.name}.`);
  } else {
    s.sp += 2; addSelfBurnout(s, 1);
    note(s, 'Crunch Time granted 2 SP at the cost of 1 Burnout.');
  }
  s.abilityUsed = true;
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
    } else if (intent.kind === 'erode') {
      const shredded = Math.min(s.block, intent.amount);
      s.block -= shredded;
      const damage = hitPlayer(s, intent.damage);
      note(s, `${enemy.name} shredded ${shredded} Block and dealt ${damage}.`);
      if (enemy.weak) enemy.weak--;
    } else if (intent.kind === 'audit') {
      const damage = hitPlayer(s, intent.damage + Math.min(6, s.burnout * 2));
      s.spTax++;
      note(s, `${enemy.name} audited Burnout, dealt ${damage}, and reserved 1 SP.`);
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
  s.block = Math.min(15, s.reserveBlock + (s.relics.includes('grid') ? Math.min(3, s.block) : 0));
  s.reserveBlock = 0;
  s.turn++;
  s.sp = Math.max(1, s.maxSp - s.burnout - s.spTax + s.nextSp);
  s.burnout = 0;
  s.spTax = 0; s.nextSp = 0; s.firstSkillTurn = true;
  s.flow = 0;
  s.itemUsedThisTurn = false;
  drawHand(s);
  return true;
}
function makeRewards(s, boss) {
  if (boss) {
    const available = Object.keys(RELICS).filter(id => !s.relics.includes(id));
    const tailored = available.filter(id => RELICS[id].role === s.role);
    const first = tailored.length ? pick(s, tailored) : pick(s, available);
    const secondPool = available.filter(id => id !== first && !RELICS[id].role);
    const second = pick(s, secondPool.length ? secondPool : available.filter(id => id !== first));
    const choices = [first, second].filter(Boolean).map(id => ({ type: 'relic', id }));
    choices.push({ type: 'heal', amount: 18 }, { type: 'tune' });
    return choices;
  }
  const pools = rewardCardPools(s);
  const roleId = pickSkillOffer(s, pools.role);
  const matchId = pickSkillOffer(s, [...pools.role, ...pools.neutral], { exclude: [roleId], fit: true });
  return [
    { type: 'card', id: roleId, source: 'role' },
    { type: 'card', id: matchId, source: 'build', fit: buildFit(s, matchId), family: CARD_FAMILY[matchId] },
    { type: 'heal', amount: 11 },
    { type: 'tune' }
  ];
}
function makeTuneChoices(s) {
  const entries = s.deck.map((id, index) => ({ id, index })).filter(entry => !entry.id.endsWith('+'));
  const basics = entries.filter(entry => ['patch', 'review'].includes(entry.id));
  const unique = new Set(), upgrades = [];
  for (const entry of [...shuffle(s, entries.filter(entry => !['patch', 'review'].includes(entry.id))), ...shuffle(s, basics)]) {
    if (unique.has(entry.id)) continue;
    unique.add(entry.id);
    upgrades.push({ type: 'upgrade', ...entry });
    if (upgrades.length >= (basics.length ? 2 : 3)) break;
  }
  if (basics.length) upgrades.push({ type: 'remove', ...pick(s, basics) });
  return upgrades;
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
  s.sp = s.maxSp; s.block = 0; s.vulnerable = 0; s.burnout = 0; s.flow = 0; s.reserveBlock = 0;
  s.hand = []; s.drawPile = []; s.discardPile = [];
  if (s.floor >= TOTAL_FIGHTS) { s.mode = 'end'; s.ending = 'win'; note(s, 'The Deadline Dragon is defeated. The release ships.'); }
  else { s.rewardChoices = makeRewards(s, boss); s.mode = 'reward'; note(s, `Victory! Choose one reward.`); }
}
export function chooseReward(s, index) {
  if (s.mode !== 'reward' || !s.rewardChoices[index]) return false;
  const choice = s.rewardChoices[index];
  if (choice.type === 'tune') {
    if (!s.tuneChoices.length) s.tuneChoices = makeTuneChoices(s);
    if (!s.tuneChoices.length) return false;
    s.mode = 'tune'; note(s, 'Choose one improvement for the playbook.'); return true;
  }
  if (choice.type === 'card') { s.deck.push(choice.id); note(s, `${CARDS[choice.id].name} joined your deck.`); }
  else if (choice.type === 'relic') {
    s.relics.push(choice.id);
    if (choice.id === 'model') { s.maxSp++; s.sp = s.maxSp; }
    note(s, `${RELICS[choice.id].name} is now active.`);
  } else { heal(s, choice.amount); note(s, `Recovered ${choice.amount} HP.`); }
  s.rewardChoices = []; s.tuneChoices = [];
  offerRoute(s);
  return true;
}
export function chooseTune(s, index) {
  if (s.mode !== 'tune' || !s.tuneChoices[index]) return false;
  const choice = s.tuneChoices[index];
  if (s.deck[choice.index] !== choice.id) return false;
  if (choice.type === 'upgrade') {
    s.deck[choice.index] += '+';
    note(s, `${CARDS[choice.id].name} was upgraded.`);
  } else {
    s.deck.splice(choice.index, 1);
    note(s, `${CARDS[choice.id].name} was retired.`);
  }
  s.rewardChoices = []; s.tuneChoices = [];
  offerRoute(s);
  return true;
}
export function cancelTune(s) {
  if (s.mode !== 'tune') return false;
  s.mode = 'reward'; return true;
}
