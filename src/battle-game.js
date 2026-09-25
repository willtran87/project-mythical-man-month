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
export const MASTERY_KITS = {
  architect: { name: 'Contingency Kit', detail: 'Replace one Patch with Buffer Budget.', remove: 'patch', add: 'reserve' },
  debugger: { name: 'Investigation Kit', detail: 'Replace one Review with Diagnostic Probe.', remove: 'review', add: 'probe' },
  producer: { name: 'Recovery Kit', detail: 'Replace one Patch with Quiet Hours.', remove: 'patch', add: 'quiet' }
};
export const SPECIALISTS = {
  qa: { name: 'QA Analyst', action: 'Repro Sweep', detail: 'Once per fight: apply 2 Mark and 1 Weak to a foe.', art: 'qa' },
  integrator: { name: 'Integration Lead', action: 'Clean Handoff', detail: 'Once per fight: gain 7 Block and draw 1.', art: 'integrator' },
  captain: { name: 'Release Captain', action: 'Release Window', detail: 'Once per fight: gain 1 SP and clear 1 Burnout.', art: 'captain' }
};
export const TEAMWORK = {
  qa: { architect: 'Mark +1; bank 4 Block', debugger: 'Mark +2; draw 1', producer: 'Mark +1; clear 1 Burnout' },
  integrator: { architect: '+4 Block; bank 4', debugger: 'Weak all; draw 1', producer: '+1 SP; draw 1' },
  captain: { architect: '+2 SP next turn', debugger: 'Mark all +1', producer: '+1 SP; clear 1 Burnout' }
};
export const CHARTERS = {
  integrity: { name: 'Single Source of Truth', detail: 'Role-family skills build 2 Flow; other skills build none.', art: 'integrity' },
  surgical: { name: 'Surgical Team', detail: 'Start with a QA Analyst; specialists are stronger. Hand limit 4.', art: 'surgical' },
  early: { name: 'Deliver Early', detail: '+1 SP on turn one of each fight; +1 Debt at the start of each act.', art: 'early' }
};
export const CONTRACTS = {
  clean: { name: 'No Shortcuts', detail: 'Gain no Project Debt during this act.' },
  briefs: { name: 'Evidence First', detail: 'Complete 2 Sprint Briefs this act.' },
  lean: { name: 'Lean Playbook', detail: 'Defeat the act boss with 12 or fewer cards.' }
};
export const CHALLENGES = {
  standard: { name: 'Standard Run', detail: 'The familiar nine-encounter campaign.' },
  crunch: { name: 'Crunch Culture', detail: 'Start at 4 Debt. Gain 1 opening SP each fight. Score ×1.2.' },
  austerity: { name: 'Austerity Order', detail: 'Start with 12 less HP. Earn 5 extra credits per fight. Score ×1.3.' },
  daily: { name: 'Daily Brief', detail: 'One shared date seed, rotating hardship, personal best score.' }
};
export const CRISES = {
  legacy: { name: 'Legacy System', detail: 'Extra Open Defect in the draw pile. +4 credits on victory.' },
  demo: { name: 'Executive Demo', detail: 'Foes gain 2 power from turn 3. +6 credits on victory.' },
  blackout: { name: 'Build Blackout', detail: 'Start with 1 less SP. +5 credits on victory.' }
};
export const ARCHITECTURES = {
  monolith: { name: 'The Monolith', detail: 'First attack each turn deals +5. Draw one fewer card each turn.' },
  eventbus: { name: 'Event Bus', detail: 'Every third skill played each fight refunds 1 SP.' },
  observatory: { name: 'Observability', detail: 'Applying Mark adds one extra. Attacks against marked foes gain +2.' }
};
export const PRACTICES = {
  cohesion: { name: 'Small, Coherent Team', detail: 'Start fights with 7 Block. First role-family skill each turn refunds 1 SP. First attack each turn deals 1 less.', art: 'integrity.webp' },
  automation: { name: 'Continuous Integration', detail: 'Replace a Review with Test Pipeline. Initiatives finish one turn sooner; fights add one Open Defect.', art: 'signal' },
  triage: { name: 'Root Cause First', detail: 'First attack each turn against a Weak or Marked foe deals +6. Start fights with 1 less SP.', art: 'probe.webp' }
};
export const MISSIONS = {
  handoff: { name: 'Unstable Handoff', detail: 'Spend 1 SP to stabilize before the third enemy turn, or gain 1 Project Debt.' },
  coupled: { name: 'Coupled Systems', detail: 'Both foes have +1 power while linked. Defeat either or sever their interface.' },
  audit: { name: 'Compliance Audit', detail: 'End a turn with at least 1 unspent SP. Each miss adds 1 Debt; two clean turns earn bonus credits.' }
};
export const BOSS_PROBLEMS = {
  goblin: { name: 'Budget Freeze', detail: 'Unresolved: lose 1 SP next turn.' },
  kraken: { name: 'Merge Conflict', detail: 'Unresolved: an Open Defect enters your discard.' },
  dragon: { name: 'Launch Countdown', detail: 'Unresolved: 12 damage every third turn.' }
};
export const cardBase = id => id.replace(/[+*]$/, '');
export const debtTier = s => Math.min(2, Math.floor((s.projectDebt || 0) / 4));

export const CARDS = {
  patch: { name: 'Patch', cost: 1, type: 'attack', detail: 'Deal 7 damage.', rarity: 'basic', art: 'patch' },
  review: { name: 'Review', cost: 1, type: 'skill', detail: 'Gain 7 Block.', rarity: 'basic', art: 'review' },
  pair: { name: 'Pair Debug', cost: 1, type: 'attack', detail: 'Deal 5 damage. Draw 1.', rarity: 'common', art: 'pair' },
  refactor: { name: 'Refactor', cost: 1, type: 'attack', detail: 'Deal 6. Apply 1 Weak.', rarity: 'common', art: 'pair' },
  panic: { name: 'Panic Fix', cost: 0, type: 'attack', detail: 'Deal 4. +1 Burnout. +1 Debt first use/fight.', rarity: 'basic', art: 'sprint' },
  memo: { name: 'Decision Memo', cost: 1, type: 'skill', detail: 'Gain 5 Block. Draw 1.', rarity: 'common', art: 'blueprint' },
  sweep: { name: 'Test Sweep', cost: 2, type: 'attack', detail: 'Deal 7 to ALL foes.', rarity: 'uncommon', art: 'signal' },
  guardrail: { name: 'Guardrail', cost: 2, type: 'skill', detail: 'Gain 13 Block. Apply 1 Weak.', rarity: 'uncommon', art: 'review' },
  rollback: { name: 'Rollback', cost: 1, type: 'skill', detail: 'Heal 5. Gain 3 Block.', rarity: 'uncommon', art: 'rollback' },
  critical: { name: 'Critical Path', cost: 2, type: 'attack', detail: 'Deal 17 damage.', rarity: 'rare', art: 'critical' },
  overclock: { name: 'Overclock', cost: 0, type: 'skill', detail: '+2 SP. Lose 4 HP. +1 Debt first use/fight.', rarity: 'rare', art: 'overclock.webp' },
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
  trade: { name: 'Scope Trade', cost: 1, type: 'attack', detail: 'Deal 11. Lose 3 HP. +1 Debt first use/fight.', rarity: 'uncommon', role: 'producer', art: 'standup.webp' },
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
  borrow: { name: 'Borrowed Weekend', cost: 0, type: 'skill', detail: '+2 SP. Draw 1. +2 Burnout. +1 Debt first use/fight.', rarity: 'rare', role: 'producer', art: 'borrow.webp' },
  reallocate: { name: 'Reallocate', cost: 1, type: 'skill', detail: 'Burnout -2. If any: draw 2, +1 SP.', rarity: 'uncommon', role: 'producer', art: 'reallocate.webp' },
  reprioritize: { name: 'Reprioritize', cost: 1, type: 'skill', detail: 'Advance a foe to its next intent. Draw 1.', rarity: 'common', art: 'risk.webp' },
  escalate: { name: 'Escalate Issue', cost: 1, type: 'skill', detail: 'Cancel a foe’s next intent. Gain 2 Debt.', rarity: 'rare', art: 'warroom.webp' },
  mitigate: { name: 'Mitigation Plan', cost: 1, type: 'skill', detail: 'Next foe attack -5 per hit. Gain 4 Block.', rarity: 'uncommon', art: 'contingency.webp' },
  redirect: { name: 'Redirect Blame', cost: 2, type: 'skill', detail: 'Next foe attack hits a foe for half damage.', rarity: 'rare', art: 'triangulate.webp' },
  pipeline: { name: 'Test Pipeline', cost: 2, type: 'skill', detail: 'In 2 turns: gain 5 Block each turn this fight.', rarity: 'uncommon', art: 'signal' },
  protocol: { name: 'Handoff Protocol', cost: 2, type: 'skill', detail: 'In 2 turns: gain 1 SP each turn this fight.', rarity: 'rare', art: 'charter.webp' },
  rollout: { name: 'Staged Rollout', cost: 1, type: 'skill', detail: 'In 3 turns: deal 14 to all foes.', rarity: 'uncommon', art: 'launch.webp' },
  decisionrecord: { name: 'Decision Record', cost: 1, type: 'skill', detail: '4 Block. Spend up to 2 Flow: +4 each. At 2, draw 1.', rarity: 'uncommon', art: 'decision-record.webp' },
  releasecut: { name: 'Release Cut', cost: 1, type: 'attack', detail: 'Spend up to 2 Flow. Deal 6 +6 each.', rarity: 'uncommon', art: 'scope-decision.webp' },
  changefreeze: { name: 'Change Freeze', cost: 1, type: 'skill', detail: '4 Block. Arm foe: attack +8 Block; else next SP +1.', rarity: 'uncommon', art: 'change-freeze.webp' },
  pagerduty: { name: 'Pager Duty', cost: 1, type: 'skill', detail: 'Arm foe. If it attacks: 2 Weak, next SP +1.', rarity: 'common', art: 'change-freeze.webp' },
  grooming: { name: 'Backlog Grooming', cost: 1, type: 'skill', detail: 'Draw 2. Set aside 1 hand card for next turn.', rarity: 'common', art: 'backlog-grooming.webp' },
  archiveticket: { name: 'Archive Ticket', cost: 0, type: 'skill', detail: 'Archive 1 hand card. Costly: +1 SP. Defect: -1 Debt.', rarity: 'uncommon', art: 'backlog-grooming.webp' },
  migration: { name: 'Migration Plan', cost: 2, type: 'skill', detail: '2 skills/2 turns: 16 ALL, 6 Block. Miss: 1 Debt.', rarity: 'rare', art: 'migration-plan.webp' },
  handoffgate: { name: 'Handoff Gate', cost: 1, type: 'skill', detail: '2 attacks in 2 turns: 6 Block, next SP +2. Miss: Burnout.', rarity: 'uncommon', art: 'migration-plan.webp' },
  scopechoice: { name: 'Scope Decision', cost: 1, type: 'skill', detail: 'Choose: 10 Block OR 11 damage and +1 Debt.', rarity: 'common', art: 'scope-decision.webp' },
  loadbearing: { name: 'Load-Bearing Fix', cost: 1, type: 'attack', detail: 'Spend up to 6 banked Block. Deal 5 +2 each.', rarity: 'uncommon', role: 'architect', art: 'buffer.webp' },
  evidence: { name: 'Evidence Chain', cost: 1, type: 'skill', detail: 'Spend up to 2 Mark: draw 1 each; at 2, +1 SP.', rarity: 'uncommon', role: 'debugger', art: 'probe.webp' },
  sprintcommit: { name: 'Sprint Commitment', cost: 0, type: 'skill', detail: '+2 SP. Play 2 attacks this turn or +1 Debt per miss.', rarity: 'rare', role: 'producer', art: 'borrow.webp' },
  decouple: { name: 'Decouple', cost: 1, type: 'attack', detail: 'Deal 8. Sever linked foes; if linked, gain 5 Block.', rarity: 'uncommon', art: 'coupling.webp' },
  interfaceaudit: { name: 'Interface Audit', cost: 1, type: 'skill', detail: 'Gain 7 Block. Sever links; +3 Block per freed foe.', rarity: 'common', art: 'coupling.webp' },
  traceledger: { name: 'Trace Ledger', cost: 1, type: 'skill', detail: '1 Evidence, 1 Weak. Evidence reveals next intents.', rarity: 'common', art: 'evidence-ledger.webp' },
  watchpoint: { name: 'Watchpoint', cost: 1, type: 'skill', detail: 'Arm foe: gain 2 Evidence if it attacks, else 1.', rarity: 'uncommon', art: 'evidence-ledger.webp' },
  casefile: { name: 'Case File', cost: 1, type: 'attack', detail: 'Deal 7 +5 per Evidence. Spend all Evidence.', rarity: 'uncommon', art: 'evidence-ledger.webp' },
  forensicbrief: { name: 'Forensic Brief', cost: 1, type: 'skill', detail: 'Gain 5 Block. Spend 1 Evidence for +4 Block and draw 1.', rarity: 'uncommon', art: 'evidence-ledger.webp' },
  releasegate: { name: 'Release Gate', cost: 2, type: 'skill', detail: 'Complete 3 steps: 18 to ALL. Miss: Debt.', rarity: 'rare', art: 'release-gate.webp' },
  gatecheck: { name: 'Gate Check', cost: 1, type: 'skill', detail: '7 Block. Gate +1; if no Gate, Evidence +1.', rarity: 'uncommon', art: 'release-gate.webp' },
  bugbudget: { name: 'Bug Budget', cost: 0, type: 'skill', detail: 'Gain 2 SP. Add an Open Defect to discard. Debt +1.', rarity: 'rare', art: 'defect-triage.webp' },
  prototype: { name: 'One-Off Prototype', cost: 0, type: 'attack', detail: 'Deal 10. Exhaust this fight.', rarity: 'uncommon', art: 'deck-recovery.webp' },
  salvage: { name: 'Salvage Plan', cost: 1, type: 'skill', detail: 'Gain 5 Block. Choose a discard card to topdeck. Exhaust.', rarity: 'common', art: 'deck-recovery.webp' },
  reclaim: { name: 'Reclaim Work', cost: 1, type: 'skill', detail: 'Return an exhausted card to hand, or gain 7 Block. Exhaust.', rarity: 'rare', art: 'deck-recovery.webp' },
  defect: { name: 'Open Defect', cost: 1, type: 'skill', detail: 'Choose: fix, defer, or automate with 2 Evidence.', rarity: 'basic', art: 'defect-triage.webp' }
};
export const REWARD_CARDS = ['pair', 'refactor', 'memo', 'sweep', 'guardrail', 'rollback', 'critical', 'overclock', 'blueprint', 'rootcause', 'scopelock', 'automation', 'handoffmap', 'incident', 'triage', 'signal', 'sprint', 'backlog', 'charter', 'map', 'contract', 'integrity', 'trace', 'repro', 'breakpoint', 'cascade', 'standup', 'trade', 'quiet', 'launch', 'reserve', 'riskmatrix', 'probe', 'exploit', 'burnrate', 'weekend', 'hardstop', 'retro', 'warroom', 'bufferexchange', 'contingency', 'triangulate', 'tracesweep', 'borrow', 'reallocate', 'reprioritize', 'escalate', 'mitigate', 'redirect', 'pipeline', 'protocol', 'rollout', 'decisionrecord', 'releasecut', 'changefreeze', 'pagerduty', 'grooming', 'archiveticket', 'migration', 'handoffgate', 'scopechoice', 'loadbearing', 'evidence', 'sprintcommit', 'decouple', 'interfaceaudit', 'traceledger', 'watchpoint', 'casefile', 'forensicbrief', 'releasegate', 'gatecheck', 'bugbudget', 'prototype', 'salvage', 'reclaim'];
export const CARD_POWER = {
  patch: 2, review: 2, panic: 1, pair: 3, refactor: 3, memo: 3, sweep: 3, guardrail: 4,
  rollback: 4, critical: 4, overclock: 4, blueprint: 5, rootcause: 4, scopelock: 4,
  automation: 3, handoffmap: 2, incident: 5, triage: 3, signal: 4, sprint: 3, backlog: 4,
  charter: 3, map: 3, contract: 4, integrity: 5, trace: 3, repro: 3, breakpoint: 4,
  cascade: 5, standup: 2, trade: 4, quiet: 4, launch: 5,
  reserve: 2, riskmatrix: 3, probe: 3, exploit: 5, burnrate: 4, weekend: 5,
  hardstop: 3, retro: 3, warroom: 4, bufferexchange: 3, contingency: 5,
  triangulate: 4, tracesweep: 4, borrow: 4, reallocate: 4,
  reprioritize: 3, escalate: 5, mitigate: 3, redirect: 5, pipeline: 4, protocol: 5, rollout: 4,
  decisionrecord: 4, releasecut: 4, changefreeze: 4, pagerduty: 3, grooming: 3, archiveticket: 4, migration: 5, handoffgate: 4, scopechoice: 3, loadbearing: 4, evidence: 4, sprintcommit: 5,
  decouple: 4, interfaceaudit: 3, traceledger: 3, watchpoint: 3, casefile: 4, forensicbrief: 4, releasegate: 5, gatecheck: 3, bugbudget: 4, prototype: 4, salvage: 3, reclaim: 4, defect: 1
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
  triangulate: 'mark', tracesweep: 'mark', borrow: 'burnout', reallocate: 'burnout',
  reprioritize: 'tempo', escalate: 'tempo', mitigate: 'block', redirect: 'weak',
  pipeline: 'initiative', protocol: 'initiative', rollout: 'initiative',
  decisionrecord: 'flow', releasecut: 'flow', changefreeze: 'reaction', pagerduty: 'reaction', grooming: 'control', archiveticket: 'control', migration: 'initiative', handoffgate: 'initiative', scopechoice: 'choice', loadbearing: 'bank', evidence: 'mark', sprintcommit: 'burnout',
  decouple: 'coupling', interfaceaudit: 'coupling', traceledger: 'evidence', watchpoint: 'evidence', casefile: 'evidence', forensicbrief: 'evidence', releasegate: 'initiative', gatecheck: 'initiative', bugbudget: 'debt', prototype: 'recovery', salvage: 'recovery', reclaim: 'recovery', defect: 'debt'
};
export const SPECIAL_UPGRADES = {
  decisionrecord: { force: 'Spend up to 3 Flow; +5 Block per Flow.', flex: 'Draw 1 after spending any Flow.' },
  changefreeze: { force: 'Gain 6 Block now and 10 if attacked.', flex: 'If the foe does not attack, next SP +2.' },
  grooming: { force: 'Draw 3 before setting a card aside.', flex: 'Gain 4 Block after setting a card aside.' },
  migration: { force: 'Only 1 more skill needed to complete.', flex: 'Failure adds no Debt; completion grants 10 Block.' },
  scopechoice: { force: 'Risky choice deals 16 damage.', flex: 'Safe choice grants 15 Block.' },
  sprintcommit: { force: 'Gain 3 SP; still requires 2 attacks.', flex: 'Requires only 1 attack this turn.' },
  decouple: { force: 'Deal 11 before severing a link.', flex: 'Gain 8 Block when a link is severed.' },
  traceledger: { force: 'Gain 2 Evidence instead of 1.', flex: 'Draw 1 after recording Evidence.' },
  casefile: { force: '+7 damage per Evidence instead of +5.', flex: 'Keep 1 Evidence after spending it.' },
  releasegate: { force: 'Start the gate with 1 progress.', flex: 'Recover 1 SP when starting the gate.' },
  salvage: { force: 'Gain 8 Block before choosing a card.', flex: 'Draw the chosen card if your hand has room.' }
};
const SPECIAL_CARD_DETAIL = {
  decisionrecord: { force: '4 Block. Spend up to 3 Flow: +5 each. At 2, draw 1.', flex: '4 Block. Spend up to 2 Flow: +4 each. Draw 1 if any spent.' },
  changefreeze: { force: '6 Block. Arm foe: attack +10 Block; else next SP +1.', flex: '4 Block. Arm foe: attack +8 Block; else next SP +2.' },
  grooming: { force: 'Draw 3. Set aside 1 hand card for next turn.', flex: 'Draw 2. Set aside 1 hand card for next turn. +4 Block.' },
  migration: { force: '1 skill/2 turns: 16 ALL, 6 Block. Miss: 1 Debt.', flex: '2 skills/2 turns: 16 ALL, 10 Block. Miss: no Debt.' },
  scopechoice: { force: 'Choose: 10 Block OR 16 damage and +1 Debt.', flex: 'Choose: 15 Block OR 11 damage and +1 Debt.' },
  sprintcommit: { force: '+3 SP. Play 2 attacks this turn or +1 Debt per miss.', flex: '+2 SP. Play 1 attack this turn or +1 Debt.' },
  decouple: { force: 'Deal 11. Sever linked foes; if linked, gain 5 Block.', flex: 'Deal 8. Sever linked foes; if linked, gain 8 Block.' },
  traceledger: { force: 'Gain 2 Evidence. Apply 1 Weak. Reveal next intents.', flex: 'Gain 1 Evidence. Apply 1 Weak. Draw 1.' },
  casefile: { force: 'Deal 7 +7 per Evidence. Spend all Evidence.', flex: 'Deal 7 +5 per Evidence. Keep 1 Evidence.' },
  releasegate: { force: 'Start at 1/3. Finish: 18 to ALL; miss: Debt.', flex: 'Start Gate, regain 1 SP. Finish: 18 to ALL.' },
  salvage: { force: 'Gain 8 Block. Choose a discard card to topdeck. Exhaust.', flex: 'Gain 5 Block. Topdeck, then draw if room. Exhaust.' }
};
export function upgradeBranchDetail(id, branch) {
  const base = cardBase(id), card = CARDS[base];
  return SPECIAL_UPGRADES[base]?.[branch] || (branch === 'force' ? card.type === 'attack' ? '+3 damage.' : '+3 Block.' : card.type === 'attack' ? '+3 Block.' : 'Draw 1.');
}
export const RARITY_WEIGHTS = [
  { common: 55, uncommon: 35, rare: 10 },
  { common: 40, uncommon: 40, rare: 20 },
  { common: 25, uncommon: 40, rare: 35 }
];
export function cardInfo(id) {
  const upgraded = /[+*]$/.test(id), branch = id.endsWith('*') ? 'flex' : 'force', base = cardBase(id);
  const card = CARDS[base];
  if (!card) return card;
  const power = Math.min(5, CARD_POWER[base] + (upgraded ? 1 : 0));
  const family = CARD_FAMILY[base];
  if (!upgraded) return { ...card, power, family };
  return { ...card, name: `${card.name}${branch === 'flex' ? '*' : '+'}`, detail: SPECIAL_CARD_DETAIL[base]?.[branch] || `${card.detail} ${upgradeBranchDetail(base, branch)}`, upgraded: true, branch, power, family };
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
  goblin: { name: 'Budget Goblin', art: 'goblin', hp: 58, boss: true, phaseNames: ['Budget Review', 'Cost Cutting', 'Emergency Freeze'], pattern: [strike(8), strike(6, { burnout: 1 }), shield(10), strike(12)], phases: [[strike(7, { burnout: 1 }), shield(7), strike(10)], [{ kind: 'tax', amount: 1 }, strike(10), shield(5)]] },
  kraken: { name: 'Merge Kraken', art: 'kraken', hp: 74, boss: true, phaseNames: ['Open Branches', 'Conflict Storm', 'Forced Merge'], pattern: [strike(9), strike(7, { vulnerable: 1 }), summon('bug'), strike(13), shield(11)], phases: [[strike(8, { vulnerable: 1 }), shield(7), strike(10)], [strike(7, { hits: 2 }), shield(6), strike(11)]] },
  dragon: { name: 'Deadline Dragon', art: 'dragon', hp: 100, boss: true, phaseNames: ['Planning', 'Crunch', 'Launch Night'], pattern: [strike(11), strike(8, { vulnerable: 1 }), shield(12), strike(17), summon('scope'), strike(19)], phases: [[strike(10, { burnout: 1 }), shield(9), strike(14)], [strike(11, { vulnerable: 1 }), strike(8, { hits: 2 }), strike(16)]] }
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
    hp: 72, maxHp: 72, sp: 3, maxSp: 3, block: 0, vulnerable: 0, burnout: 0, flow: 0, evidence: 0, spTax: 0, nextSp: 0,
    deck: ['patch', 'patch', 'patch', 'patch', 'review', 'review', 'review', 'pair', 'refactor', 'panic'],
    drawPile: [], discardPile: [], hand: [], setAside: [], exhausted: [], pendingChoice: null, sprintCommit: 0,
    inventory: ['duck', 'pizza'], trinkets: [], usedTrinkets: [], relics: [], credits: 14, role: 'architect', masteryKit: false, specialist: '', specialistUsed: false, onboardingPending: 0, projectDebt: 0, itemsUsed: 0, trinketUses: 0, cardsPlayed: 0,
    charter: '', charterChosen: false, practice: '', practiceRefunded: false, challenge: 'standard', challengeRule: '', dailyDate: '', escalation: 0, architecture: '', architecturesChosen: [], architecturePending: false, contract: null, contractTakenActs: [], contractsCompleted: 0, briefsCompleted: 0, briefsCompletedAct: 0, lastContract: '', earlyDebtActs: [],
    enemies: [], target: 0, itemUsedThisTurn: false, firstAttack: true, firstSkillTurn: true, damageTakenFight: 0, turnBlockUsed: 0, turnBlockShred: 0, lastPayout: 0, lastPerfect: false,
    reserveBlock: 0, abilityUsed: false, notebookTurn: 0, redlineUsed: false, upgradeDamage: 0, debtChargedFight: [], charterFlowTurn: 0,
    initiatives: [], activeInitiatives: [], crisis: '', mission: null, missionWins: 0, readiness: 0, shippedEarly: false, earlyShips: 0, skillChain: 0, teamworkUsed: false,
    routeChoices: [], rewardChoices: [], tuneChoices: [], upgradePending: null, objective: null, lastObjective: false, defeatedBosses: [], eventId: '', shopStock: [], pendingRoute: null,
    lastFightElite: false, log: ['Your first crisis awaits.'], ending: '', deathCause: '', telemetry: { routes: [], cardOffers: [], cardPicks: [] }
  };
  selectRole(s, 'architect');
  return s;
}
export function selectRole(s, role) {
  if (s.mode !== 'intro' || !ROLES[role]) return false;
  s.role = role;
  s.masteryKit = false;
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
export function openChallenge(s) { if (s.mode !== 'intro') return false; s.mode = 'challenge'; return true; }
export function cancelChallenge(s) { if (s.mode !== 'challenge') return false; s.mode = 'intro'; return true; }
export function chooseChallenge(s, id) {
  if (s.mode !== 'challenge' || !CHALLENGES[id]) return false;
  s.challenge = id; s.challengeRule = id;
  if (id === 'daily') {
    s.dailyDate = new Date().toISOString().slice(0, 10);
    s.seed = Number(s.dailyDate.replaceAll('-', ''));
    s.rng = s.seed;
    s.challengeRule = s.seed % 2 ? 'crunch' : 'austerity';
  }
  s.mode = 'intro'; return true;
}
export function openCharter(s) { if (s.mode !== 'route' || s.floor !== 0 || s.charterChosen) return false; s.mode = 'charter'; return true; }
export function cancelCharter(s) { if (s.mode !== 'charter') return false; s.mode = 'route'; return true; }
export function chooseCharter(s, id) {
  if (s.mode !== 'charter' || !CHARTERS[id] || s.charterChosen) return false;
  s.charter = id; s.charterChosen = true; s.mode = 'route';
  if (id === 'surgical' && !s.specialist) s.specialist = 'qa';
  if (id === 'early') { addDebt(s, 1); s.earlyDebtActs.push(0); }
  note(s, `${CHARTERS[id].name} became the project charter.`);
  return true;
}
export function openContract(s) {
  if (s.mode !== 'route' || s.floor % 3 !== 0 || s.contractTakenActs.includes(actIndex(s))) return false;
  s.mode = 'contract'; return true;
}
export function cancelContract(s) { if (s.mode !== 'contract') return false; s.mode = 'route'; return true; }
export function chooseContract(s, id) {
  if (s.mode !== 'contract' || !CONTRACTS[id] || s.floor % 3 !== 0 || s.contractTakenActs.includes(actIndex(s))) return false;
  s.contract = { id, act: actIndex(s), progress: 0, failed: false };
  s.contractTakenActs.push(actIndex(s)); s.mode = 'route'; note(s, `Client contract accepted: ${CONTRACTS[id].name}.`);
  return true;
}
export function runScore(s) {
  const raw = s.floor * 100 + s.defeatedBosses.length * 75 + s.hp * 2 + s.contractsCompleted * 100 + s.briefsCompleted * 20 - s.projectDebt * 5 - s.earlyShips * 50;
  const multiplier = s.challenge === 'daily' ? 1.25 : s.challenge === 'austerity' ? 1.3 : s.challenge === 'crunch' ? 1.2 : 1;
  return Math.max(0, Math.round(raw * multiplier * (1 + s.escalation * .15)));
}
export function setEscalation(s, level) {
  if (s.mode !== 'intro' || !Number.isInteger(level) || level < 0 || level > 3) return false;
  s.escalation = level;
  return true;
}
export function chooseArchitecture(s, id) {
  if (s.mode !== 'architecture' || !s.architecturePending || !ARCHITECTURES[id]) return false;
  s.architecture = id; s.architecturesChosen.push(id); s.architecturePending = false;
  s.rewardChoices = makeRewards(s, true); s.mode = 'reward';
  note(s, `${ARCHITECTURES[id].name} now shapes the playbook.`);
  return true;
}
export function choosePractice(s, id) {
  if (s.mode !== 'practice' || s.practice || !PRACTICES[id]) return false;
  s.practice = id;
  if (id === 'automation') {
    const index = s.deck.indexOf('review');
    if (index >= 0) s.deck.splice(index, 1, 'pipeline');
    else s.deck.push('pipeline');
  }
  note(s, `${PRACTICES[id].name} is now the team's working practice.`);
  offerRoute(s);
  return true;
}
export const OBJECTIVES = {
  shield: { name: 'Defend the plan', detail: 'Block 8 incoming damage this fight.' },
  flow: { name: 'Keep the thread', detail: 'Attack while at 2+ Flow this fight.' },
  quick: { name: 'Beat the estimate', detail: 'Win by the end of turn 3.' },
  team: { name: 'Use the whole team', detail: 'Use a role ability and a specialist action.' }
};
export const specialistPrice = s => 12 + actIndex(s) * 5;
export function openHiring(s) { if (s.mode !== 'route') return false; s.mode = 'hire'; return true; }
export function cancelHiring(s) { if (s.mode !== 'hire') return false; s.mode = 'route'; return true; }
export function hireSpecialist(s, id) {
  if (s.mode !== 'hire' || !SPECIALISTS[id] || s.specialist === id || s.credits < specialistPrice(s)) return false;
  s.credits -= specialistPrice(s); s.specialist = id;
  s.onboardingPending = s.floor >= 6 ? 2 : s.floor >= 3 ? 1 : 0;
  s.mode = 'route'; note(s, `${SPECIALISTS[id].name} joined the team${s.onboardingPending ? `; next fight starts with ${s.onboardingPending} less SP for onboarding` : ''}.`);
  return true;
}
function addDebt(s, amount) {
  const previous = s.projectDebt;
  s.projectDebt = clamp(s.projectDebt + amount, 0, 12);
  if (amount > 0 && s.projectDebt > previous && s.contract?.id === 'clean') s.contract.failed = true;
}
function chargeDebt(s, source) { if (s.debtChargedFight.includes(source)) return; s.debtChargedFight.push(source); addDebt(s, 1); }
function completeObjective(s) { if (s.objective) s.objective.done = true; }

function offerRoute(s) {
  const act = actIndex(s), boss = s.floor % 3 === 2;
  if (s.charter === 'early' && s.floor % 3 === 0 && !s.earlyDebtActs.includes(act)) { addDebt(s, 1); s.earlyDebtActs.push(act); }
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
    const crises = shuffle(s, Object.keys(CRISES));
    s.routeChoices.forEach((choice, index) => { choice.crisis = crises[index]; choice.mission = choice.ids.length > 1 ? 'coupled' : index === 1 ? 'audit' : 'handoff'; });
  }
  s.routeForecast = Array.from({ length: Math.min(2, TOTAL_FIGHTS - s.floor - 1) }, (_, offset) => {
    const next = s.floor + offset + 1;
    return { encounter: next + 1, act: ACTS[Math.min(2, Math.floor(next / 3))], kind: next % 3 === 2 ? 'Boss · relic' : next % 3 === 1 ? 'Duo / elite / market' : 'Fight / elite / story' };
  });
  s.mode = 'route';
  note(s, `Act ${act + 1}: choose the next incident.`);
}
export function startGame(s) {
  if (s.mode !== 'intro') return false;
  if (s.masteryKit) {
    const kit = MASTERY_KITS[s.role], index = s.deck.indexOf(kit.remove);
    if (index >= 0) s.deck.splice(index, 1, kit.add);
  }
  if (s.challengeRule === 'crunch') addDebt(s, 4);
  if (s.challengeRule === 'austerity') s.hp = Math.max(1, s.hp - 12);
  offerRoute(s); return true;
}

function createEnemy(s, id, elite = false) {
  const data = ENEMIES[id], act = actIndex(s);
  const pressure = debtTier(s), maxHp = data.hp + (data.boss ? 0 : act * 4 + pressure * 2) + (elite ? 14 + act * 3 : 0) + s.escalation * 3;
  return { id, name: data.name, art: data.art, hp: maxHp, maxHp, block: 0, weak: 0, vulnerable: 0, mark: 0, step: 0, phase: 1, power: act + (data.boss ? 0 : Math.max(0, pressure - 1)) + (elite ? 2 : 0) + Math.floor(s.escalation / 2), elite, boss: !!data.boss, stalled: false, intentPenalty: 0, redirected: false, problemResolved: false, problemClock: 0 };
}
function drawOne(s) {
  if (s.hand.length >= handLimit(s)) return;
  if (!s.drawPile.length) {
    if (!s.discardPile.length) return;
    s.drawPile = shuffle(s, s.discardPile);
    s.discardPile = [];
  }
  s.hand.push(s.drawPile.pop());
}
function handLimit(s) { return Math.max(3, (s.charter === 'surgical' ? 4 : 5) - (s.architecture === 'monolith' ? 1 : 0)); }
function drawHand(s, limit = handLimit(s)) { while (s.hand.length < limit && (s.drawPile.length || s.discardPile.length)) drawOne(s); }
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
    const base = cardBase(owned);
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
  const unseen = tierChoices.filter(id => !s.deck.some(owned => cardBase(owned) === id));
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
  s.lastFightElite = route.elite; s.crisis = route.crisis || '';
  s.mission = route.mission ? { id: route.mission, countdown: 3, resolved: false, failed: false, cleanTurns: 0, misses: 0 } : null;
  if (s.mission?.id === 'coupled') for (const enemy of s.enemies) { enemy.power++; enemy.linkedPower = true; }
  s.turn = 1; s.sp = s.maxSp + (s.relics.includes('battery') ? 1 : 0) + (s.charter === 'early' ? 1 : 0) + (s.challengeRule === 'crunch' ? 1 : 0); s.block = (s.relics.includes('harness') ? 5 : 0) + (s.practice === 'cohesion' ? 7 : 0);
  if (s.crisis === 'blackout') s.sp = Math.max(1, s.sp - 1);
  if (s.practice === 'triage') s.sp = Math.max(1, s.sp - 1);
  if (s.onboardingPending) { s.sp = Math.max(1, s.sp - s.onboardingPending); s.onboardingPending = 0; }
  s.itemUsedThisTurn = false; s.firstAttack = true; s.firstAttackTurn = true; s.firstSkillTurn = true; s.vulnerable = 0; s.burnout = 0; s.flow = s.relics.includes('lantern') ? 1 : 0; s.evidence = 0;
  s.spTax = 0; s.nextSp = 0; s.damageTakenFight = 0; s.usedTrinkets = [];
  s.reserveBlock = 0; s.abilityUsed = false; s.specialistUsed = false; s.notebookTurn = 0; s.redlineUsed = false; s.upgradeDamage = 0; s.debtChargedFight = []; s.initiatives = []; s.activeInitiatives = []; s.readiness = 0; s.shippedEarly = false; s.skillChain = 0; s.teamworkUsed = false; s.practiceRefunded = false; s.practiceStrikeUsed = false;
  s.setAside = []; s.exhausted = []; s.pendingChoice = null; s.sprintCommit = 0;
  const objectiveIds = s.specialist ? ['shield', 'flow', 'quick', 'team'] : ['shield', 'flow', 'quick'];
  s.objective = { id: objectiveIds[(s.seed + s.floor * 7) % objectiveIds.length], progress: 0, done: false, failed: false };
  if (s.relics.includes('coffee')) s.hp = Math.min(s.maxHp, s.hp + 4);
  s.drawPile = shuffle(s, [...s.deck, ...Array(debtTier(s) + (s.crisis === 'legacy' ? 1 : 0) + (s.practice === 'automation' ? 1 : 0)).fill('defect')]); s.discardPile = []; s.hand = []; drawHand(s);
  s.target = 0; s.mode = 'combat';
  note(s, route.boss ? `${s.enemies[0].name}: ${BOSS_LINES[s.enemies[0].id]}` : `${route.label}${s.crisis ? ` · ${CRISES[s.crisis].name}` : ''}: ${s.enemies.map(e => e.name).join(' and ')}.`);
  return true;
}
export function chooseRoute(s, index) {
  if (s.mode !== 'route' || !s.routeChoices[index]) return false;
  const route = s.routeChoices[index];
  s.telemetry?.routes.push({ kind: route.kind || 'combat', elite: !!route.elite, mission: route.mission || '' });
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
    s.telemetry?.cardOffers.push(s.shopStock[0].id);
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
  if (offer.kind === 'card') { s.deck.push(offer.id); s.telemetry?.cardPicks.push(offer.id); }
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
  if (enemy.stalled) return { kind: 'stalled', label: 'CANCELED · skips action' };
  const data = ENEMIES[enemy.id];
  const pattern = enemy.phase > 1 ? data.phases?.[enemy.phase - 2] || data.pattern : data.pattern;
  const intent = pattern[enemy.step % pattern.length];
  if (intent.kind === 'attack') {
    const n = Math.max(0, intent.damage + enemy.power - (enemy.weak ? 2 : 0) - (enemy.intentPenalty || 0));
    return { ...intent, damage: n, label: `${intent.hits ? `MULTI ${intent.hits} × ${n}` : `${intent.burnout ? 'DRAIN' : intent.vulnerable ? 'EXPOSE' : 'ATTACK'} ${n}`}${enemy.redirected ? ' · REDIRECT' : intent.burnout ? ' · Burnout' : intent.vulnerable ? ' · Vulnerable' : ''}` };
  }
  if (intent.kind === 'shield') return { ...intent, label: `BLOCK ${intent.amount + enemy.power}` };
  if (intent.kind === 'summon') return { ...intent, label: `SUMMON ${ENEMIES[intent.id].name}` };
  if (intent.kind === 'tax') return { ...intent, label: `TAX ${intent.amount} SP` };
  if (intent.kind === 'erode') {
    const damage = Math.max(0, intent.damage + enemy.power - (enemy.weak ? 2 : 0) - (enemy.intentPenalty || 0));
    return { ...intent, damage, label: `SHRED ${intent.amount} BLK · HIT ${damage}` };
  }
  if (intent.kind === 'audit') {
    const damage = Math.max(0, intent.damage + enemy.power - (enemy.weak ? 2 : 0) - (enemy.intentPenalty || 0));
    return { ...intent, damage, label: `AUDIT ${damage} +2/BURN · TAX 1` };
  }
  if (intent.kind === 'split') return { ...intent, label: 'SPLIT · HALF HP' };
  return { ...intent, label: `RECOVER ${intent.amount}` };
}
export function nextIntentFor(enemy) {
  const current = intentFor(enemy), attacks = ['attack', 'erode', 'audit'].includes(current.kind);
  return intentFor({ ...enemy, stalled: false, redirected: false, step: enemy.step + 1,
    weak: Math.max(0, enemy.weak - (attacks ? 1 : 0)), intentPenalty: attacks ? 0 : enemy.intentPenalty });
}
function attackEnemy(s, enemy, amount, useMark = true) {
  if (!enemy) return 0;
  if (s.objective?.id === 'flow' && s.flow >= 2) completeObjective(s);
  const notebookDraw = enemy.weak && s.relics.includes('notebook') && s.notebookTurn !== s.turn;
  amount += s.flow * 2 + s.upgradeDamage;
  if (s.practice === 'triage' && !s.practiceStrikeUsed && (enemy.weak || enemy.mark)) { amount += 6; s.practiceStrikeUsed = true; }
  if (s.practice === 'cohesion' && s.firstAttackTurn) amount--;
  if (s.architecture === 'monolith' && s.firstAttackTurn) amount += 5;
  s.firstAttackTurn = false;
  if (s.architecture === 'observatory' && enemy.mark) amount += 2;
  if (useMark && enemy.mark) { amount += 4; enemy.mark--; }
  if (enemy.weak && s.relics.includes('lens')) amount += 3;
  if (s.firstAttack && s.relics.includes('checklist')) amount += 4;
  s.firstAttack = false;
  if (enemy.vulnerable) { amount += 3; enemy.vulnerable--; }
  const blocked = Math.min(enemy.block, amount);
  enemy.block -= blocked;
  const damage = Math.max(0, amount - blocked);
  enemy.hp = Math.max(0, enemy.hp - damage);
  advanceBossPhase(s, enemy);
  if (notebookDraw) { s.notebookTurn = s.turn; drawOne(s); }
  return damage;
}
function advanceBossPhase(s, enemy) {
  if (enemy.boss && enemy.hp > 0) {
    const nextPhase = enemy.hp <= enemy.maxHp * .3 ? 3 : enemy.hp <= enemy.maxHp * .65 ? 2 : 1;
    if (nextPhase > enemy.phase) {
      enemy.phase = nextPhase; enemy.step = 0; enemy.problemResolved = false; enemy.problemClock = 0;
      note(s, `${enemy.name} enters ${ENEMIES[enemy.id].phaseNames[nextPhase - 1]}! Next intent: ${intentFor(enemy).label}.`);
    }
  }
}
function gainBlock(s, amount, fromCard = true) { s.block += amount + (fromCard && s.relics.includes('interface') ? 2 : 0); }
function addSelfBurnout(s, amount) {
  s.burnout += amount;
  if (amount && s.relics.includes('redline') && !s.redlineUsed) { s.sp++; s.redlineUsed = true; }
}
function heal(s, amount) { s.hp = Math.min(s.maxHp, s.hp + amount); }
function applyMark(s, enemy, amount) { enemy.mark = Math.min(3, (enemy.mark || 0) + amount + (s.architecture === 'observatory' ? 1 : 0)); }
function gainEvidence(s, amount) { s.evidence = Math.min(3, (s.evidence || 0) + amount); }
function breakCoupling(s) {
  const linked = s.enemies.filter(enemy => enemy.linkedPower);
  for (const enemy of linked) { enemy.power = Math.max(0, enemy.power - 1); enemy.linkedPower = false; }
  if (linked.length && s.mission?.id === 'coupled' && !s.mission.resolved) s.mission.resolved = true;
  if (linked.length) note(s, 'The coupled interface was severed. Linked foes lost 1 power.');
  return linked.length;
}
function releaseGate(s) { return s.initiatives.find(project => project.id === 'releasegate'); }
function advanceReleaseGate(s, amount) {
  const gate = releaseGate(s);
  if (!gate) return false;
  gate.progress = Math.min(3, (gate.progress || 0) + amount);
  if (gate.progress < 3) return false;
  s.initiatives.splice(s.initiatives.indexOf(gate), 1);
  for (const foe of s.enemies) attackEnemy(s, foe, 18);
  note(s, 'Release Gate cleared: 18 damage to every foe.');
  return true;
}
function afterDamage(s) {
  s.enemies = s.enemies.filter(enemy => enemy.hp > 0);
  if (s.mission?.id === 'coupled' && s.enemies.length <= 1 && !s.mission.resolved) breakCoupling(s);
  s.target = clamp(s.target, 0, Math.max(0, s.enemies.length - 1));
  if (!s.enemies.length) finishFight(s);
}
function advanceCardProjects(s, type, playedId) {
  let dealtDamage = false;
  for (const project of [...s.initiatives]) {
    if (project.id !== 'migration' && project.id !== 'handoffgate') continue;
    if (project.id === playedId || (project.id === 'migration' ? type !== 'skill' : type !== 'attack')) continue;
    project.progress = (project.progress || 0) + 1;
    if (project.progress < (project.goal || 2)) continue;
    s.initiatives.splice(s.initiatives.indexOf(project), 1);
    if (project.id === 'migration') {
      for (const foe of s.enemies) attackEnemy(s, foe, 16);
      gainBlock(s, project.flex ? 10 : 6, false);
      dealtDamage = true;
      note(s, 'Migration Plan finished early: 16 to every foe and Block.');
    } else { gainBlock(s, 6, false); s.nextSp += 2; note(s, 'Handoff Gate cleared: 6 Block and +2 SP next turn.'); }
  }
  return dealtDamage;
}
export function playCard(s, handIndex, targetIndex = s.target) {
  if (s.mode !== 'combat' || s.pendingChoice || !Number.isInteger(handIndex) || handIndex < 0 || handIndex >= s.hand.length) return false;
  const id = s.hand[handIndex], baseId = cardBase(id), card = cardInfo(id);
  if (s.sp < card.cost) return false;
  if (baseId === 'escalate' && s.projectDebt > 10) return false;
  if (((card.type === 'attack' && !['sweep', 'incident', 'cascade', 'tracesweep'].includes(baseId)) || ['guardrail', 'repro', 'triangulate', 'reprioritize', 'escalate', 'mitigate', 'redirect', 'changefreeze', 'pagerduty', 'evidence', 'scopechoice', 'traceledger', 'watchpoint'].includes(baseId)) && !s.enemies[targetIndex]) return false;
  s.sp -= card.cost;
  s.hand.splice(handIndex, 1);
  if (['prototype', 'salvage'].includes(baseId)) s.exhausted.push(id);
  else if (baseId !== 'defect' && baseId !== 'reclaim') s.discardPile.push(id);
  s.cardsPlayed++;
  if (baseId !== 'defect') s.readiness = Math.min(6, s.readiness + (card.type === 'skill' ? 2 : 1));
  if (card.type === 'skill') {
    const roleFamily = card.family === ROLE_FAMILY[s.role];
    const flowGain = s.charter === 'integrity' ? (roleFamily ? 2 : 0) : 1;
    s.flow = Math.min(3, s.flow + flowGain);
    if (s.practice === 'cohesion' && roleFamily && !s.practiceRefunded && baseId !== 'defect') { s.sp++; s.practiceRefunded = true; note(s, 'Coherent practice refunded 1 SP.'); }
    if (s.firstSkillTurn && s.relics.includes('binder')) gainBlock(s, 3, false);
    if (s.architecture === 'eventbus' && baseId !== 'defect' && ++s.skillChain % 3 === 0) { s.sp++; note(s, 'Event Bus recycled the third skill into 1 SP.'); }
    s.firstSkillTurn = false;
  }
  const enemy = s.enemies[targetIndex];
  let message = card.name;
  let gateDamage = false;
  s.upgradeDamage = id.endsWith('+') && card.type === 'attack' && !SPECIAL_UPGRADES[baseId] ? 3 : 0;
  switch (baseId) {
    case 'patch': message += ` dealt ${attackEnemy(s, enemy, 7)}.`; break;
    case 'pair': message += ` dealt ${attackEnemy(s, enemy, 5)} and drew a card.`; drawOne(s); break;
    case 'refactor': message += ` dealt ${attackEnemy(s, enemy, 6)} and weakened ${enemy.name}.`; enemy.weak++; break;
    case 'panic': message += ` dealt ${attackEnemy(s, enemy, 4)}. Burnout +1, Debt +1 first use this fight.`; addSelfBurnout(s, 1); chargeDebt(s, 'panic'); break;
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
    case 'overclock': s.sp += 2; s.hp = Math.max(1, s.hp - 4); chargeDebt(s, 'overclock'); message += ' gained 2 SP at the cost of 4 HP and Debt.'; break;
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
    case 'trade': message += ` dealt ${attackEnemy(s, enemy, 11)} at a cost of 3 HP and Debt.`; s.hp = Math.max(1, s.hp - 3); chargeDebt(s, 'trade'); break;
    case 'quiet': s.burnout = Math.max(0, s.burnout - 2); gainBlock(s, 6); message += ' cleared Burnout and raised Block.'; break;
    case 'launch': { const burnout = s.burnout; message += ` dealt ${attackEnemy(s, enemy, 12 + burnout * 5)} and cleared ${burnout} Burnout.`; s.burnout = 0; break; }
    case 'reserve': gainBlock(s, 3); s.reserveBlock = Math.min(12, s.reserveBlock + 2); message += ' raised Block and banked 2.'; break;
    case 'riskmatrix': gainBlock(s, 5); s.nextSp++; message += ' raised Block and planned +1 SP next turn.'; break;
    case 'probe': message += ` dealt ${attackEnemy(s, enemy, 4)} and marked ${enemy.name}.`; applyMark(s, enemy, 2); break;
    case 'exploit': { const marks = enemy.mark || 0; message += ` dealt ${attackEnemy(s, enemy, 7 + marks * 5, false)} from ${marks} Mark.`; enemy.mark = 0; break; }
    case 'burnrate': message += ` dealt ${attackEnemy(s, enemy, 7 + s.burnout * 3)}. Burnout +1.`; addSelfBurnout(s, 1); break;
    case 'weekend': heal(s, 7); s.burnout = Math.max(0, s.burnout - 3); gainBlock(s, 5); message += ' healed, cleared Burnout, and raised Block.'; break;
    case 'hardstop': gainBlock(s, 7); s.burnout = Math.max(0, s.burnout - 1); message += ' raised Block and cleared 1 Burnout.'; break;
    case 'retro': drawOne(s); drawOne(s); if (s.hp * 2 < s.maxHp) heal(s, 3); message += ' drew 2 and recovered when needed.'; break;
    case 'warroom': gainBlock(s, 6); for (const foe of s.enemies) foe.weak++; drawOne(s); message += ' raised Block, weakened all foes, and drew 1.'; break;
    case 'bufferexchange': { const banked = s.reserveBlock > 0; message += ` dealt ${attackEnemy(s, enemy, 7)}.`; if (banked) { s.sp++; message += ' Banked Block recovered 1 SP.'; } break; }
    case 'contingency': { gainBlock(s, 8); s.reserveBlock = Math.min(12, s.reserveBlock + 4); let total = 0; for (const foe of s.enemies) total += attackEnemy(s, foe, 5); message += ` raised Block, banked 4, and hit all foes for ${total}.`; break; }
    case 'triangulate': { const marked = enemy.mark > 0; enemy.weak++; applyMark(s, enemy, 1); if (marked) drawOne(s); message += marked ? ` weakened and marked ${enemy.name}, then drew 1.` : ` weakened and marked ${enemy.name}.`; break; }
    case 'tracesweep': { let total = 0; for (const foe of s.enemies) { total += attackEnemy(s, foe, 5); applyMark(s, foe, 1); } message += ` hit all foes for ${total} and marked each.`; break; }
    case 'borrow': s.sp += 2; drawOne(s); addSelfBurnout(s, 2); chargeDebt(s, 'borrow'); message += ' gained 2 SP and a card at a cost of 2 Burnout and Debt.'; break;
    case 'reallocate': { const cleared = Math.min(2, s.burnout); s.burnout -= cleared; if (cleared) { drawOne(s); drawOne(s); s.sp++; } message += cleared ? ` cleared ${cleared} Burnout, drew 2, and gained 1 SP.` : ' found no Burnout to reallocate.'; break; }
    case 'reprioritize': enemy.step++; drawOne(s); message += ` advanced ${enemy.name}'s plan to ${intentFor(enemy).label} and drew 1.`; break;
    case 'escalate': enemy.stalled = true; addDebt(s, 2); message += ` canceled ${enemy.name}'s next action and raised Debt by 2.`; break;
    case 'mitigate': enemy.intentPenalty = Math.min(12, (enemy.intentPenalty || 0) + 5); gainBlock(s, 4); message += ` reduced ${enemy.name}'s next attack by 5 and gained 4 Block.`; break;
    case 'redirect': enemy.redirected = true; message += ` redirected ${enemy.name}'s next attack toward a foe.`; break;
    case 'pipeline': s.initiatives.push({ id: 'pipeline', remaining: s.practice === 'automation' ? 1 : 2 }); message += ' started a Test Pipeline.'; break;
    case 'protocol': s.initiatives.push({ id: 'protocol', remaining: s.practice === 'automation' ? 1 : 2 }); message += ' started a Handoff Protocol.'; break;
    case 'rollout': s.initiatives.push({ id: 'rollout', remaining: s.practice === 'automation' ? 2 : 3 }); message += ' started a Staged Rollout.'; break;
    case 'decisionrecord': {
      const spent = Math.min(s.flow, id.endsWith('+') ? 3 : 2);
      s.flow -= spent;
      gainBlock(s, 4 + spent * (id.endsWith('+') ? 5 : 4));
      if (spent >= (id.endsWith('*') ? 1 : 2)) drawOne(s);
      message += ` spent ${spent} Flow for Block${spent >= (id.endsWith('*') ? 1 : 2) ? ' and a card' : ''}.`;
      break;
    }
    case 'releasecut': { const spent = Math.min(s.flow, 2); s.flow -= spent; message += ` spent ${spent} Flow and dealt ${attackEnemy(s, enemy, 6 + spent * 6)}.`; break; }
    case 'changefreeze': {
      gainBlock(s, id.endsWith('+') ? 6 : 4);
      (enemy.reactions ||= []).push({ kind: 'freeze', block: id.endsWith('+') ? 10 : 8, missSp: id.endsWith('*') ? 2 : 1 });
      message += ` guarded against ${enemy.name}'s next action.`;
      break;
    }
    case 'pagerduty': (enemy.reactions ||= []).push({ kind: 'pager' }); message += ` set a pager for ${enemy.name}.`; break;
    case 'grooming': {
      drawOne(s); drawOne(s); if (id.endsWith('+')) drawOne(s);
      if (s.hand.length && (s.setAside || []).length < 2) s.pendingChoice = { kind: 'grooming', flex: id.endsWith('*') };
      message += s.pendingChoice ? ' drew cards; choose one to set aside for next turn.' : ' drew cards.';
      break;
    }
    case 'archiveticket': {
      if (s.hand.length) s.pendingChoice = { kind: 'archiveticket' };
      else gainBlock(s, 3);
      message += s.pendingChoice ? ' opened the archive; choose one card to exhaust this fight.' : ' found no card to archive; gained 3 Block.';
      break;
    }
    case 'migration': s.initiatives.push({ id: 'migration', remaining: 2, progress: 0, goal: id.endsWith('+') ? 1 : 2, flex: id.endsWith('*') }); message += ' started a Migration Plan.'; break;
    case 'handoffgate': s.initiatives.push({ id: 'handoffgate', remaining: 2, progress: 0, goal: 2 }); message += ' started a Handoff Gate.'; break;
    case 'scopechoice': s.pendingChoice = { kind: 'scopechoice', target: targetIndex, id }; message += ' opened a scope decision; choose a safe or risky outcome.'; break;
    case 'loadbearing': { const spent = Math.min(6, s.reserveBlock); s.reserveBlock -= spent; message += ` spent ${spent} banked Block and dealt ${attackEnemy(s, enemy, 5 + spent * 2)}.`; break; }
    case 'evidence': { const spent = Math.min(2, enemy.mark || 0); enemy.mark -= spent; for (let i = 0; i < spent; i++) drawOne(s); if (spent === 2) s.sp++; message += ` spent ${spent} Mark for ${spent} cards${spent === 2 ? ' and 1 SP' : ''}.`; break; }
    case 'sprintcommit': s.sp += id.endsWith('+') ? 3 : 2; s.sprintCommit += id.endsWith('*') ? 1 : 2; message += ' borrowed capacity; play the promised attacks or gain Debt.'; break;
    case 'decouple': { const linked = s.enemies.some(foe => foe.linkedPower); message += ` dealt ${attackEnemy(s, enemy, id.endsWith('+') ? 11 : 8)}.`; if (linked) { breakCoupling(s); const block = id.endsWith('*') ? 8 : 5; gainBlock(s, block); message += ` Severed the interface and gained ${block} Block.`; } break; }
    case 'interfaceaudit': { gainBlock(s, 7); const freed = breakCoupling(s); if (freed) gainBlock(s, freed * 3); message += ` gained ${7 + freed * 3} Block${freed ? ' and severed the link' : ''}.`; break; }
    case 'traceledger': { const amount = id.endsWith('+') ? 2 : 1; gainEvidence(s, amount); enemy.weak++; if (id.endsWith('*')) drawOne(s); message += ` logged ${enemy.name}'s behavior: Evidence +${amount}, Weak +1${id.endsWith('*') ? ', draw 1' : ''}.`; break; }
    case 'watchpoint': (enemy.reactions ||= []).push({ kind: 'watch' }); message += ` armed a watchpoint on ${enemy.name}.`; break;
    case 'casefile': { const spent = s.evidence || 0; s.evidence = id.endsWith('*') && spent ? 1 : 0; message += ` spent ${spent} Evidence and dealt ${attackEnemy(s, enemy, 7 + spent * (id.endsWith('+') ? 7 : 5))}${s.evidence ? ', keeping 1 Evidence' : ''}.`; break; }
    case 'forensicbrief': { gainBlock(s, 5); if (s.evidence) { s.evidence--; gainBlock(s, 4); drawOne(s); message += ' spent 1 Evidence for 9 Block and a card.'; } else message += ' gained 5 Block without Evidence.'; break; }
    case 'releasegate': s.initiatives.push({ id: 'releasegate', remaining: s.practice === 'automation' ? 2 : 3, progress: id.endsWith('+') ? 1 : 0, goal: 3, actedTurn: 0 }); if (id.endsWith('*')) s.sp++; message += ' started a Release Gate. Choose Test, Rush, or Abort once each turn.'; break;
    case 'gatecheck': { const hadGate = !!releaseGate(s); gainBlock(s, 7); gateDamage = advanceReleaseGate(s, 1); if (!hadGate) gainEvidence(s, 1); message += gateDamage ? ' gained 7 Block and cleared the Release Gate.' : hadGate ? ' gained 7 Block and advanced the Release Gate.' : ' gained 7 Block and 1 Evidence.'; break; }
    case 'bugbudget': s.sp += 2; s.discardPile.push('defect'); addDebt(s, 1); message += ' borrowed 2 SP, added an Open Defect, and raised Debt by 1.'; break;
    case 'prototype': message += ` dealt ${attackEnemy(s, enemy, 10)} and exhausted.`; break;
    case 'salvage': { const block = id.endsWith('+') ? 8 : 5; gainBlock(s, block); if (s.discardPile.length) s.pendingChoice = { kind: 'salvage', flex: id.endsWith('*') }; message += s.pendingChoice ? ` gained ${block} Block; choose a discard card to ${id.endsWith('*') ? 'draw' : 'topdeck'}.` : ` gained ${block} Block; the discard was empty.`; break; }
    case 'reclaim': if (s.exhausted.length) { s.pendingChoice = { kind: 'reclaim', selfId: id }; message += ' opened the archive; choose an exhausted card to recover.'; } else { gainBlock(s, 7); s.exhausted.push(id); message += ' found nothing to reclaim; gained 7 Block and exhausted.'; } break;
    case 'defect': s.pendingChoice = { kind: 'defect' }; message += ' opened triage: fix, defer, or automate.'; break;
  }
  s.upgradeDamage = 0;
  if (id.endsWith('+') && card.type === 'skill' && !SPECIAL_UPGRADES[baseId]) { gainBlock(s, 3, false); message += ' Upgrade: +3 Block.'; }
  if (id.endsWith('*') && !SPECIAL_UPGRADES[baseId]) {
    if (card.type === 'attack') { gainBlock(s, 3, false); message += ' Flex: +3 Block.'; }
    else { drawOne(s); message += ' Flex: drew 1.'; }
  }
  if (card.type === 'attack' && s.sprintCommit > 0) s.sprintCommit--;
  const projectDamage = !s.pendingChoice && advanceCardProjects(s, card.type, baseId);
  note(s, message);
  if (card.type === 'attack' || baseId === 'contingency' || projectDamage || gateDamage) afterDamage(s);
  return true;
}
export function chooseCombatOption(s, index) {
  if (s.mode !== 'combat' || !s.pendingChoice || !Number.isInteger(index)) return false;
  const choice = s.pendingChoice;
  if (choice.kind === 'releasegate') {
    const gate = releaseGate(s);
    if (!gate || index < 0 || index > 2 || gate.actedTurn === s.turn || (index === 0 && s.sp < 1)) return false;
    s.pendingChoice = null;
    gate.actedTurn = s.turn;
    if (index === 2) {
      s.initiatives.splice(s.initiatives.indexOf(gate), 1);
      s.sp++; gainBlock(s, 4, false);
      note(s, 'Release Gate aborted: recovered 1 SP and 4 Block.');
    } else {
      if (index === 0) { s.sp--; gainBlock(s, 4, false); note(s, 'Release Gate tested: +1 progress and 4 Block.'); }
      else { addDebt(s, 1); note(s, 'Release Gate rushed: +2 progress, Debt +1.'); }
      if (advanceReleaseGate(s, index === 0 ? 1 : 2)) afterDamage(s);
    }
    return true;
  }
  if (choice.kind === 'defect') {
    if (index < 0 || index > 2 || (index === 2 && (s.evidence || 0) < 2)) return false;
    s.pendingChoice = null;
    if (index === 0) { addDebt(s, -1); drawOne(s); note(s, 'Open Defect fixed: Debt -1, draw 1.'); }
    else if (index === 1) { s.sp++; addDebt(s, 1); s.discardPile.push('defect'); note(s, 'Open Defect deferred: recovered 1 SP, Debt +1; it will return.'); }
    else { s.evidence -= 2; addDebt(s, -2); drawOne(s); note(s, 'Open Defect automated: spent 2 Evidence, Debt -2, draw 1.'); }
    if (advanceCardProjects(s, 'skill', 'defect')) afterDamage(s);
    return true;
  }
  if (choice.kind === 'scopechoice') {
    if (index < 0 || index > 1) return false;
    const foe = s.enemies[choice.target];
    if (index === 1 && !foe) return false;
    s.pendingChoice = null;
    if (index === 0) { gainBlock(s, choice.id.endsWith('*') ? 15 : 10); note(s, 'Scope Decision protected the team.'); }
    else { const damage = attackEnemy(s, foe, choice.id.endsWith('+') ? 16 : 11); addDebt(s, 1); note(s, `Scope Decision cut through ${foe.name} for ${damage}; Debt +1.`); }
    const projectDamage = advanceCardProjects(s, 'skill', 'scopechoice');
    if (index === 1 || projectDamage) afterDamage(s);
    return true;
  }
  if (choice.kind === 'salvage' || choice.kind === 'reclaim') {
    const pile = choice.kind === 'salvage' ? s.discardPile : s.exhausted;
    if (index < 0 || index >= pile.length) return false;
    const id = pile.splice(index, 1)[0];
    s.pendingChoice = null;
    if (choice.kind === 'salvage') { const draw = choice.flex && s.hand.length < handLimit(s); s.drawPile.push(id); if (draw) drawOne(s); note(s, `${cardInfo(id).name} was ${draw ? 'drawn from the discard' : 'moved to the top of the draw pile'}.`); }
    else {
      const toHand = s.hand.length < handLimit(s);
      if (toHand) s.hand.push(id);
      else s.drawPile.push(id);
      s.exhausted.push(choice.selfId);
      note(s, `${cardInfo(id).name} was reclaimed${toHand ? ' into hand' : ' onto the draw pile'}.`);
    }
    if (advanceCardProjects(s, 'skill', choice.kind)) afterDamage(s);
    return true;
  }
  if (index < 0 || index >= s.hand.length) return false;
  const id = s.hand.splice(index, 1)[0];
  s.pendingChoice = null;
  if (choice.kind === 'grooming') {
    (s.setAside ||= []).push(id);
    if (choice.flex) gainBlock(s, 4);
    note(s, `${cardInfo(id).name} is set aside for next turn.`);
  } else if (choice.kind === 'archiveticket') {
    (s.exhausted ||= []).push(id);
    if (cardInfo(id).cost > 0) s.sp++;
    if (cardBase(id) === 'defect') addDebt(s, -1);
    note(s, `${cardInfo(id).name} was archived for this fight.`);
  } else { s.hand.splice(index, 0, id); return false; }
  if (advanceCardProjects(s, 'skill', choice.kind)) afterDamage(s);
  return true;
}
export function openReleaseGate(s) {
  const gate = s.mode === 'combat' && !s.pendingChoice ? releaseGate(s) : null;
  if (!gate || gate.actedTurn === s.turn) return false;
  s.pendingChoice = { kind: 'releasegate' };
  return true;
}
export function useRoleAbility(s, targetIndex = s.target) {
  if (s.mode !== 'combat' || s.pendingChoice || s.abilityUsed) return false;
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
  if (s.objective?.id === 'team' && s.specialistUsed) completeObjective(s);
  triggerTeamwork(s, targetIndex);
  return true;
}
function triggerTeamwork(s, targetIndex) {
  if (!s.abilityUsed || !s.specialistUsed || s.teamworkUsed || !s.specialist) return;
  s.teamworkUsed = true;
  const foe = s.enemies[targetIndex] || s.enemies[0];
  if (s.specialist === 'qa') {
    if (foe) applyMark(s, foe, s.role === 'debugger' ? 2 : 1);
    if (s.role === 'architect') s.reserveBlock = Math.min(12, s.reserveBlock + 4);
    if (s.role === 'debugger') drawOne(s);
    if (s.role === 'producer') s.burnout = Math.max(0, s.burnout - 1);
  } else if (s.specialist === 'integrator') {
    if (s.role === 'architect') { gainBlock(s, 4, false); s.reserveBlock = Math.min(12, s.reserveBlock + 4); }
    if (s.role === 'debugger') for (const enemy of s.enemies) enemy.weak++;
    if (s.role === 'producer') s.sp++;
    if (s.role !== 'architect') drawOne(s);
  } else {
    if (s.role === 'architect') s.nextSp += 2;
    if (s.role === 'debugger') for (const enemy of s.enemies) applyMark(s, enemy, 1);
    if (s.role === 'producer') { s.sp++; s.burnout = Math.max(0, s.burnout - 1); }
  }
  note(s, `Teamwork: ${ROLES[s.role].name} + ${SPECIALISTS[s.specialist].name}: ${TEAMWORK[s.specialist][s.role]}.`);
}
export function useSpecialist(s, targetIndex = s.target) {
  if (s.mode !== 'combat' || s.pendingChoice || !s.specialist || s.specialistUsed) return false;
  if (s.specialist === 'qa') {
    const foe = s.enemies[targetIndex]; if (!foe) return false;
    const marks = s.charter === 'surgical' ? 3 : 2;
    applyMark(s, foe, marks); foe.weak++;
    note(s, `QA Analyst reproduced the flaw: ${foe.name} gained ${marks} Mark and Weak.`);
  } else if (s.specialist === 'integrator') {
    const block = s.charter === 'surgical' ? 10 : 7;
    gainBlock(s, block, false); drawOne(s); note(s, `Integration Lead made a clean handoff: ${block} Block and draw 1.`);
  } else {
    const sp = s.charter === 'surgical' ? 2 : 1;
    s.sp += sp; s.burnout = Math.max(0, s.burnout - 1); note(s, `Release Captain found a window: +${sp} SP, -1 Burnout.`);
  }
  s.specialistUsed = true;
  if (s.objective?.id === 'team' && s.abilityUsed) completeObjective(s);
  triggerTeamwork(s, targetIndex);
  return true;
}
export function resolveBossProblem(s) {
  if (s.mode !== 'combat' || s.pendingChoice || s.sp < 2) return false;
  const boss = s.enemies.find(enemy => enemy.boss && enemy.hp > 0 && !enemy.problemResolved);
  if (!boss) return false;
  s.sp -= 2; boss.problemResolved = true;
  s.readiness = Math.min(6, s.readiness + 2);
  note(s, `${BOSS_PROBLEMS[boss.id].name} resolved for this phase. Readiness +2.`);
  return true;
}
export function resolveMission(s) {
  if (s.mode !== 'combat' || s.pendingChoice || s.mission?.id !== 'handoff' || s.mission.resolved || s.mission.failed || s.sp < 1) return false;
  s.sp--;
  s.mission.resolved = true;
  s.readiness = Math.min(6, s.readiness + 2);
  note(s, 'The handoff was stabilized. Readiness +2.');
  return true;
}
export function shipRelease(s) {
  if (s.mode !== 'combat' || s.pendingChoice || s.enemies.some(enemy => enemy.boss) || s.readiness < 6 || s.turn < 2) return false;
  const remaining = s.enemies.filter(enemy => enemy.hp > 0).length;
  if (!remaining) return false;
  s.shippedEarly = true;
  s.earlyShips++;
  addDebt(s, remaining);
  s.objective.failed = true; s.objective.done = false;
  note(s, `Release shipped with ${remaining} unresolved incident${remaining === 1 ? '' : 's'}; Debt +${remaining}.`);
  finishFight(s);
  return true;
}
export function useItem(s, index, targetIndex = s.target) {
  if (s.mode !== 'combat' || s.pendingChoice || s.itemUsedThisTurn || !s.inventory[index]) return false;
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
  if (s.mode !== 'combat' || s.pendingChoice || !s.trinkets[index]) return false;
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
  s.turnBlockUsed = (s.turnBlockUsed || 0) + absorbed;
  if (s.objective?.id === 'shield' && !s.objective.done) {
    s.objective.progress += absorbed;
    if (s.objective.progress >= 8) completeObjective(s);
  }
  const damage = Math.max(0, amount - absorbed);
  s.hp = Math.max(0, s.hp - damage);
  s.damageTakenFight += damage;
  return damage;
}
export function endTurn(s) {
  if (s.mode !== 'combat' || s.pendingChoice) return false;
  s.turnBlockUsed = 0; s.turnBlockShred = 0;
  s.discardPile.push(...s.hand); s.hand = [];
  if (s.sprintCommit > 0) { addDebt(s, s.sprintCommit); note(s, `Sprint Commitment missed ${s.sprintCommit} attack${s.sprintCommit === 1 ? '' : 's'}: Debt +${s.sprintCommit}.`); s.sprintCommit = 0; }
  if (s.mission?.id === 'audit') {
    if (s.sp >= 1) s.mission.cleanTurns++;
    else { s.mission.misses++; addDebt(s, 1); note(s, 'The audit found no spare capacity: Project Debt +1.'); }
  }
  let redirectedHit = false;
  for (const enemy of [...s.enemies]) {
    if (enemy.hp <= 0) continue;
    enemy.block = 0;
    let intent = intentFor(enemy);
    const hostile = ['attack', 'erode', 'audit'].includes(intent.kind) && !enemy.redirected;
    for (const reaction of enemy.reactions || []) {
      if (reaction.kind === 'freeze') {
        if (hostile) gainBlock(s, reaction.block, false);
        else s.nextSp += reaction.missSp;
        note(s, hostile ? `Change Freeze braced for ${enemy.name}.` : `Change Freeze found a quiet window: next SP +${reaction.missSp}.`);
      } else if (reaction.kind === 'pager' && hostile) { enemy.weak += 2; s.nextSp++; note(s, `Pager Duty caught ${enemy.name}: 2 Weak and next SP +1.`); }
      else if (reaction.kind === 'watch') { const gained = hostile ? 2 : 1; gainEvidence(s, gained); note(s, `Watchpoint observed ${enemy.name}: Evidence +${gained}.`); }
    }
    enemy.reactions = [];
    intent = intentFor(enemy);
    if (intent.kind === 'stalled') { enemy.stalled = false; note(s, `${enemy.name}'s escalation was canceled.`); }
    else if (enemy.redirected && ['attack', 'erode', 'audit'].includes(intent.kind)) {
      const foe = s.enemies.find(other => other !== enemy && other.hp > 0) || enemy;
      const raw = Math.ceil((intent.damage || 0) * (intent.hits || 1) / 2);
      const blocked = Math.min(foe.block, raw); foe.block -= blocked; foe.hp = Math.max(0, foe.hp - (raw - blocked));
      advanceBossPhase(s, foe);
      enemy.redirected = false; redirectedHit = true;
      note(s, `${enemy.name}'s attack was redirected into ${foe.name} for ${raw - blocked}.`);
      if (enemy.weak) enemy.weak--;
    } else if (intent.kind === 'attack') {
      let damage = 0;
      for (let hit = 0; hit < (intent.hits || 1); hit++) damage += hitPlayer(s, intent.damage);
      if (intent.burnout) s.burnout += intent.burnout;
      if (intent.vulnerable) s.vulnerable += intent.vulnerable;
      note(s, `${enemy.name} dealt ${damage}${intent.burnout ? ' and caused Burnout' : intent.vulnerable ? ' and exposed you' : ''}.`);
      if (enemy.weak) enemy.weak--;
    } else if (intent.kind === 'erode') {
      const shredded = Math.min(s.block, intent.amount);
      s.block -= shredded;
      s.turnBlockShred += shredded;
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
    if (['attack', 'erode', 'audit'].includes(intent.kind)) enemy.intentPenalty = 0;
    enemy.step++;
    if (s.hp <= 0) { s.mode = 'end'; s.ending = 'lose'; s.deathCause = `${enemy.name}: ${intent.label}`; note(s, 'The project lead fell in battle.'); return true; }
  }
  if (s.mission?.id === 'handoff' && !s.mission.resolved && !s.mission.failed) {
    s.mission.countdown--;
    if (s.mission.countdown <= 0) {
      s.mission.failed = true;
      addDebt(s, 1);
      note(s, 'The handoff failed: +1 Project Debt.');
    }
  }
  const boss = s.enemies.find(enemy => enemy.boss && enemy.hp > 0 && !enemy.problemResolved);
  if (boss) {
    boss.problemClock++;
    if (boss.id === 'goblin') { s.spTax++; note(s, 'Budget Freeze reserved 1 SP from next turn.'); }
    if (boss.id === 'kraken') { s.discardPile.push('defect'); note(s, 'Merge Conflict added an Open Defect to the discard.'); }
    if (boss.id === 'dragon' && boss.problemClock % 3 === 0) {
      hitPlayer(s, 12); note(s, 'Launch Countdown expired: 12 damage.');
      if (s.hp <= 0) { s.mode = 'end'; s.ending = 'lose'; s.deathCause = 'Deadline Dragon: Launch Countdown'; return true; }
    }
  }
  if (redirectedHit) { afterDamage(s); if (s.mode !== 'combat') return true; }
  for (const initiative of s.initiatives) initiative.remaining--;
  const completed = s.initiatives.filter(initiative => initiative.remaining <= 0);
  s.initiatives = s.initiatives.filter(initiative => initiative.remaining > 0);
  for (const initiative of completed) {
    if (initiative.id === 'rollout') {
      for (const foe of s.enemies) attackEnemy(s, foe, 14);
      note(s, 'Staged Rollout landed: 14 damage to every foe.');
      afterDamage(s); if (s.mode !== 'combat') return true;
    } else if (initiative.id === 'releasegate') {
      addDebt(s, 1);
      note(s, 'Release Gate missed its window: Debt +1.');
    } else if (initiative.id === 'migration') {
      if (!initiative.flex) addDebt(s, 1);
      note(s, initiative.flex ? 'Migration Plan expired safely.' : 'Migration Plan missed its deadline: Debt +1.');
    } else if (initiative.id === 'handoffgate') { addSelfBurnout(s, 1); note(s, 'Handoff Gate missed its deadline: next turn starts with Burnout.'); }
    else { s.activeInitiatives.push(initiative.id); note(s, `${CARDS[initiative.id].name} is now running.`); }
  }
  s.block = Math.min(15, s.reserveBlock + (s.relics.includes('grid') ? Math.min(3, s.block) : 0));
  s.block += s.activeInitiatives.filter(id => id === 'pipeline').length * 5;
  s.reserveBlock = 0;
  s.turn++;
  if (s.crisis === 'demo' && s.turn === 3) { for (const enemy of s.enemies) enemy.power += 2; note(s, 'The Executive Demo begins: foes gain 2 power.'); }
  if (s.objective?.id === 'quick' && s.turn > 3 && !s.objective.done) s.objective.failed = true;
  s.sp = Math.max(1, s.maxSp - s.burnout - s.spTax + s.nextSp);
  s.sp += s.activeInitiatives.filter(id => id === 'protocol').length;
  s.burnout = 0;
  s.spTax = 0; s.nextSp = 0; s.firstSkillTurn = true;
  s.flow = 0;
  s.itemUsedThisTurn = false; s.firstAttackTurn = true; s.practiceRefunded = false; s.practiceStrikeUsed = false;
  drawHand(s, Math.max(0, handLimit(s) - (s.setAside || []).length));
  s.hand.push(...(s.setAside || [])); s.setAside = [];
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
  const entries = s.deck.map((id, index) => ({ id, index })).filter(entry => !/[+*]$/.test(entry.id));
  const basics = entries.filter(entry => ['patch', 'review'].includes(entry.id));
  const unique = new Set(), upgrades = [];
  for (const entry of [...shuffle(s, entries.filter(entry => !['patch', 'review'].includes(entry.id))), ...shuffle(s, basics)]) {
    if (unique.has(entry.id)) continue;
    unique.add(entry.id);
    upgrades.push({ type: 'upgrade', ...entry });
    if (upgrades.length >= (basics.length ? 2 : 3)) break;
  }
  if (basics.length) upgrades.push({ type: 'remove', ...pick(s, basics) });
  if (s.projectDebt > 0) upgrades.push({ type: 'audit', id: 'review', index: -1 });
  return upgrades;
}
function finishFight(s) {
  if (s.sprintCommit > 0) { addDebt(s, s.sprintCommit); note(s, `Unfinished Sprint Commitment: Debt +${s.sprintCommit}.`); s.sprintCommit = 0; }
  s.lastContract = '';
  if (s.objective?.id === 'quick' && s.turn <= 3 && !s.shippedEarly) completeObjective(s);
  s.lastObjective = !!s.objective?.done;
  if (s.lastObjective) { s.briefsCompleted++; s.briefsCompletedAct++; if (s.contract?.id === 'briefs') s.contract.progress++; }
  if (s.lastObjective) addDebt(s, -1);
  const boss = s.floor % 3 === 2;
  if (boss) s.defeatedBosses.push(BOSSES[actIndex(s)]);
  if (s.lastFightElite && !s.shippedEarly) {
    const available = Object.keys(TRINKETS).filter(id => !s.trinkets.includes(id));
    if (s.trinkets.length < 2 && available.length) {
      const id = pick(s, available); s.trinkets.push(id); note(s, `Elite cache: equipped ${TRINKETS[id].name}.`);
    } else if (s.inventory.length < 3) {
      const id = pick(s, Object.keys(ITEMS)); s.inventory.push(id); note(s, `Elite cache: ${ITEMS[id].name}.`);
    }
  }
  s.lastPerfect = s.damageTakenFight === 0 && !s.shippedEarly;
  let payout = (boss ? 22 : s.lastFightElite ? 19 : 11) + actIndex(s) * 2 + (s.relics.includes('ledger') ? 5 : 0) + (s.lastPerfect ? 5 : 0) + (s.lastObjective ? 8 : 0) + (s.challengeRule === 'austerity' ? 5 : 0);
  s.lastMission = false;
  if (s.mission && !s.shippedEarly) {
    const accomplished = s.mission.id === 'handoff' ? s.mission.resolved : s.mission.id === 'coupled' ? s.mission.resolved : s.mission.cleanTurns >= 2 && s.mission.misses === 0;
    if (accomplished) { payout += 6; s.missionWins++; s.lastMission = true; note(s, `${MISSIONS[s.mission.id].name} handled: +6 credits.`); }
  }
  if (s.crisis) payout += { legacy: 4, demo: 6, blackout: 5 }[s.crisis];
  if (s.shippedEarly) { payout = Math.max(3, Math.ceil(payout / 2)); s.lastPerfect = false; }
  if (boss && s.contract?.act === actIndex(s)) {
    const success = s.contract.id === 'clean' ? !s.contract.failed : s.contract.id === 'briefs' ? s.contract.progress >= 2 : s.deck.length <= 12;
    s.lastContract = success ? 'completed' : 'missed';
    if (success) { payout += 12; heal(s, 6); randomRelic(s); s.contractsCompleted++; note(s, `${CONTRACTS[s.contract.id].name} fulfilled: bonus relic, 12 credits, and 6 HP.`); }
    else note(s, `${CONTRACTS[s.contract.id].name} was not fulfilled.`);
    s.contract = null;
  }
  if (boss) s.briefsCompletedAct = 0;
  s.lastPayout = payout;
  s.credits += payout;
  note(s, `The team recovered ${payout} credits from the incident budget.`);
  s.floor++;
  s.sp = s.maxSp; s.block = 0; s.vulnerable = 0; s.burnout = 0; s.flow = 0; s.reserveBlock = 0;
  s.hand = []; s.drawPile = []; s.discardPile = []; s.setAside = []; s.exhausted = []; s.pendingChoice = null;
  if (s.floor >= TOTAL_FIGHTS) { s.mode = 'end'; s.ending = 'win'; note(s, 'The Deadline Dragon is defeated. The release ships.'); }
  else if (boss) { s.architecturePending = true; s.mode = 'architecture'; note(s, 'Choose the architecture that shapes the next act.'); }
  else { s.rewardChoices = makeRewards(s, boss); s.telemetry?.cardOffers.push(...s.rewardChoices.filter(choice => choice.type === 'card').map(choice => choice.id)); s.mode = 'reward'; note(s, `Victory! Choose one reward.`); }
}
export function chooseReward(s, index) {
  if (s.mode !== 'reward' || !s.rewardChoices[index]) return false;
  const choice = s.rewardChoices[index];
  if (choice.type === 'tune') {
    if (!s.tuneChoices.length) s.tuneChoices = makeTuneChoices(s);
    if (!s.tuneChoices.length) return false;
    s.mode = 'tune'; note(s, 'Choose one improvement for the playbook.'); return true;
  }
  if (choice.type === 'card') { s.deck.push(choice.id); s.telemetry?.cardPicks.push(choice.id); note(s, `${CARDS[choice.id].name} joined your deck.`); }
  else if (choice.type === 'relic') {
    s.relics.push(choice.id);
    if (choice.id === 'model') { s.maxSp++; s.sp = s.maxSp; }
    note(s, `${RELICS[choice.id].name} is now active.`);
  } else { heal(s, choice.amount); note(s, `Recovered ${choice.amount} HP.`); }
  s.rewardChoices = []; s.tuneChoices = [];
  proceedFromReward(s);
  return true;
}
export function chooseTune(s, index) {
  if (s.mode !== 'tune' || !s.tuneChoices[index]) return false;
  const choice = s.tuneChoices[index];
  if (choice.type === 'audit') {
    addDebt(s, -4); note(s, 'The team paid down 4 Project Debt.');
    s.rewardChoices = []; s.tuneChoices = []; proceedFromReward(s); return true;
  }
  if (s.deck[choice.index] !== choice.id) return false;
  if (choice.type === 'upgrade') {
    s.upgradePending = { ...choice }; s.mode = 'upgrade'; return true;
  } else {
    s.deck.splice(choice.index, 1);
    note(s, `${CARDS[choice.id].name} was retired.`);
  }
  s.rewardChoices = []; s.tuneChoices = [];
  proceedFromReward(s);
  return true;
}
export function chooseUpgrade(s, branch) {
  if (s.mode !== 'upgrade' || !['force', 'flex'].includes(branch) || !s.upgradePending) return false;
  const { id, index } = s.upgradePending;
  if (s.deck[index] !== id) return false;
  s.deck[index] = `${id}${branch === 'force' ? '+' : '*'}`;
  note(s, `${CARDS[id].name} gained the ${branch === 'force' ? 'Force' : 'Flex'} upgrade.`);
  s.upgradePending = null; s.rewardChoices = []; s.tuneChoices = []; proceedFromReward(s);
  return true;
}
export function cancelUpgrade(s) { if (s.mode !== 'upgrade') return false; s.mode = 'tune'; s.upgradePending = null; return true; }
export function cancelTune(s) {
  if (s.mode !== 'tune') return false;
  s.mode = 'reward'; return true;
}
function proceedFromReward(s) {
  if (s.floor === 1 && !s.practice) { s.mode = 'practice'; note(s, 'Choose a working practice for the rest of this run.'); }
  else offerRoute(s);
}
export function projectEndTurn(s) {
  if (s.mode !== 'combat' || s.pendingChoice) return null;
  const copy = JSON.parse(JSON.stringify(s));
  const before = { hp: copy.hp, debt: copy.projectDebt, enemies: copy.enemies.length };
  endTurn(copy);
  return {
    hp: copy.hp, damage: before.hp - copy.hp, blockAbsorbed: copy.turnBlockUsed || 0, blockShredded: copy.turnBlockShred || 0,
    debt: copy.projectDebt, debtAdded: copy.projectDebt - before.debt,
    nextSp: copy.mode === 'combat' ? copy.sp : null, incomingFoes: Math.max(0, copy.enemies.length - before.enemies),
    missionFailed: !!copy.mission?.failed && !s.mission?.failed,
    lethal: copy.ending === 'lose', outcome: copy.mode
  };
}
