import assert from 'node:assert/strict';
import { CARDS, ENEMIES, REWARD_CARDS, canPlayCard, cardInfo, chooseCombatOption, choosePractice, chooseReward, chooseRoute, endTurn, hireSpecialist, intentFor, newGame, openHiring, playCard, startGame, upgradeBranchDetail } from '../src/battle-game.js';

function fight(seed = 1221) {
  const s = newGame(seed); startGame(s); chooseRoute(s, 0);
  s.enemies = [{ ...s.enemies[0], id: 'scope', name: 'Scope Creep', hp: 200, maxHp: 200, step: 0, power: 0 }];
  s.hp = s.maxHp = 200; s.sp = 12; s.hand = []; s.drawPile = []; s.discardPile = []; s.mission = null; s.crisis = '';
  return s;
}
function play(s, id, target = 0) { s.hand.unshift(id); assert.equal(playCard(s, 0, target), true, id); }

for (const id of ['criticalpathcontrol', 'killswitch', 'precisioncounter', 'hotfixforge', 'contractor']) {
  assert.ok(REWARD_CARDS.includes(id), `${id} is offered`);
  assert.ok(CARDS[id].art && cardInfo(id).family && cardInfo(id).power);
  assert.notEqual(upgradeBranchDetail(id, 'force'), upgradeBranchDetail(id, 'flex'));
}
assert.ok(ENEMIES.warden && ENEMIES.warden.pattern.some(intent => intent.kind === 'delay'));

const plan = fight();
plan.initiatives = [{ id: 'pipeline', remaining: 2 }, { id: 'protocol', remaining: 2 }];
play(plan, 'criticalpathcontrol');
assert.equal(plan.pendingChoice.kind, 'projectcontrol');
assert.equal(endTurn(plan), false, 'project choice blocks end turn');
assert.equal(chooseCombatOption(plan, 1), true);
assert.equal(plan.initiatives[0].remaining, 2);
assert.equal(plan.initiatives[1].remaining, 1, 'chosen project advanced');
play(plan, 'criticalpathcontrol*'); chooseCombatOption(plan, 1);
assert.ok(plan.activeInitiatives.includes('protocol'), 'countdown project starts early');
const gate = fight(); gate.initiatives = [{ id: 'releasegate', remaining: 3, progress: 0, goal: 3, actedTurn: 0 }];
play(gate, 'criticalpathcontrol+'); chooseCombatOption(gate, 0);
assert.equal(gate.initiatives[0].progress, 2, 'Force advances twice');

const abort = fight(); abort.initiatives = [{ id: 'rollout', remaining: 2 }];
const abortSp = abort.sp;
play(abort, 'killswitch'); chooseCombatOption(abort, 0);
assert.equal(abort.initiatives.length, 0);
assert.equal(abort.sp, abortSp + 1);
assert.equal(abort.block, 7); assert.equal(abort.projectDebt, 1);
assert.ok(abort.exhausted.includes('killswitch'));
abort.initiatives = [{ id: 'pipeline', remaining: 2 }];
play(abort, 'killswitch*'); chooseCombatOption(abort, 0);
assert.equal(abort.projectDebt, 1, 'Flex avoids new Debt');

const counter = fight(); counter.enemies[0].id = 'warden'; counter.enemies[0].step = 0;
counter.initiatives = [{ id: 'pipeline', remaining: 2 }];
counter.evidence = 2;
play(counter, 'precisioncounter');
assert.equal(counter.pendingChoice.kind, 'precisioncounter');
assert.equal(chooseCombatOption(counter, 1), true);
assert.equal(counter.evidence, 0); assert.equal(counter.enemies[0].mark, 1);
assert.match(intentFor(counter.enemies[0]).label, /CANCELED/);
endTurn(counter);
assert.equal(counter.initiatives[0].remaining, 1, 'counter prevented the red-tape delay');
const uncanceled = fight(); uncanceled.enemies[0].id = 'warden'; uncanceled.initiatives = [{ id: 'pipeline', remaining: 2 }];
endTurn(uncanceled);
assert.equal(uncanceled.initiatives[0].remaining, 2, 'warden delayed an active plan');
const lowEvidence = fight(); lowEvidence.enemies[0].id = 'warden';
play(lowEvidence, 'precisioncounter');
assert.equal(chooseCombatOption(lowEvidence, 1), false, 'counter needs Evidence');
assert.equal(chooseCombatOption(lowEvidence, 0), true); assert.equal(lowEvidence.block, 6);

const forge = fight(); forge.hand = ['review', 'defect', 'pair']; forge.deck.push('defect');
play(forge, 'hotfixforge+');
assert.deepEqual(forge.pendingChoice.eligible, [0, 1]);
assert.equal(chooseCombatOption(forge, 1), true);
assert.deepEqual(forge.hand, ['review', 'prototype+', 'pair']);
assert.ok(forge.deck.includes('defect'), 'rewrite lasts for this fight only');
assert.equal(playCard(forge, 1), true); assert.ok(forge.exhausted.includes('prototype+'));
const forgeFallback = fight(); play(forgeFallback, 'hotfixforge');
assert.equal(forgeFallback.pendingChoice, null); assert.equal(forgeFallback.block, 5);

const hire = fight(); hire.credits = 14;
assert.equal(canPlayCard(hire, 'contractor'), false);
hire.credits = 20; hire.drawPile = ['patch'];
play(hire, 'contractor');
assert.equal(hire.credits, 5); assert.equal(hire.sp, 14); assert.equal(hire.hand[0], 'patch');
assert.equal(hire.onboardingPending, 1); assert.equal(hire.contractorUsed, true);
hire.hand.unshift('contractor'); assert.equal(playCard(hire, 0), false, 'one contractor per fight');
hire.hand = ['patch']; hire.enemies[0].hp = 1;
assert.equal(playCard(hire, 0), true); assert.equal(hire.mode, 'reward');
assert.equal(chooseReward(hire, 2), true); assert.equal(hire.mode, 'practice');
assert.equal(choosePractice(hire, 'cohesion'), true);
const hireAndContract = structuredClone(hire); hireAndContract.floor = 3; hireAndContract.credits = 30;
assert.equal(openHiring(hireAndContract), true); assert.equal(hireSpecialist(hireAndContract, 'qa'), true);
assert.equal(hireAndContract.onboardingPending, 2, 'new hire stacks with contractor onboarding');
assert.equal(chooseRoute(hire, 0), true);
assert.equal(hire.sp, hire.maxSp - 1, 'next fight pays onboarding SP');
assert.equal(hire.onboardingPending, 0); assert.equal(hire.contractorUsed, false);

console.log('Meaningful skills: project acceleration/abandonment, counterplay, rewrite, contractor tradeoff, and Warden passed.');
