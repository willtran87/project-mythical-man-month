import assert from 'node:assert/strict';
import { newGame, startGame, chooseRoute, playCard, chooseCombatOption, openReleaseGate, endTurn, projectEndTurn, intentFor, nextIntentFor, cardInfo, CARDS, REWARD_CARDS, upgradeBranchDetail } from '../src/battle-game.js';

function fight(seed = 800) {
  const s = newGame(seed); startGame(s); chooseRoute(s, 0);
  s.enemies = [s.enemies[0]]; s.enemies[0].id = 'scope'; s.enemies[0].hp = s.enemies[0].maxHp = 200;
  s.hp = s.maxHp = 200; s.sp = 12; s.hand = []; s.drawPile = []; s.discardPile = []; s.mission = null; s.crisis = '';
  return s;
}
function play(s, id, target = 0) { s.hand.unshift(id); assert.equal(playCard(s, 0, target), true, id); }

const cards = ['decouple', 'interfaceaudit', 'traceledger', 'watchpoint', 'casefile', 'forensicbrief', 'releasegate', 'gatecheck', 'bugbudget', 'prototype', 'salvage', 'reclaim'];
for (const id of cards) {
  assert.ok(REWARD_CARDS.includes(id), `${id} enters rewards`);
  assert.ok(CARDS[id].art && cardInfo(id).family && cardInfo(id).power, `${id} has art and metadata`);
}
for (const id of ['decouple', 'traceledger', 'casefile', 'releasegate', 'salvage']) {
  assert.notEqual(upgradeBranchDetail(id, 'force'), upgradeBranchDetail(id, 'flex'));
}

const coupled = fight();
coupled.enemies.push({ ...coupled.enemies[0], name: 'Linked partner', hp: 200, maxHp: 200 });
coupled.mission = { id: 'coupled', resolved: false, failed: false };
for (const enemy of coupled.enemies) { enemy.linkedPower = true; enemy.power++; }
const powers = coupled.enemies.map(enemy => enemy.power);
play(coupled, 'decouple');
assert.ok(coupled.enemies.every((enemy, i) => !enemy.linkedPower && enemy.power === powers[i] - 1));
assert.equal(coupled.mission.resolved, true);
assert.ok(coupled.block >= 5);
const audit = fight(); audit.enemies[0].linkedPower = true; audit.enemies[0].power++;
play(audit, 'interfaceaudit'); assert.equal(audit.enemies[0].linkedPower, false); assert.ok(audit.block >= 10);

const evidence = fight();
assert.ok(nextIntentFor(evidence.enemies[0]).label);
const forecast = fight(); forecast.enemies[0].weak = 1;
const predicted = nextIntentFor(forecast.enemies[0]).label;
endTurn(forecast); assert.equal(intentFor(forecast.enemies[0]).label, predicted, 'Evidence forecast accounts for Weak expiring');
play(evidence, 'traceledger+'); assert.equal(evidence.evidence, 2);
evidence.drawPile = ['patch']; play(evidence, 'forensicbrief');
assert.equal(evidence.evidence, 1); assert.ok(evidence.block >= 9 && evidence.hand.includes('patch'));
const hpBefore = evidence.enemies[0].hp;
play(evidence, 'casefile*'); assert.equal(evidence.evidence, 1); assert.ok(evidence.enemies[0].hp < hpBefore - 7);
play(evidence, 'watchpoint'); assert.equal(evidence.enemies[0].reactions[0].kind, 'watch');
endTurn(evidence); assert.equal(evidence.evidence, 3, 'hostile watchpoint adds two Evidence up to cap');

const gate = fight(); gate.enemies.push({ ...gate.enemies[0], name: 'Second foe', hp: 200, maxHp: 200 });
play(gate, 'releasegate');
assert.equal(openReleaseGate(gate), true); assert.equal(endTurn(gate), false, 'gate choice blocks end turn');
const spBefore = gate.sp; chooseCombatOption(gate, 0);
assert.equal(gate.sp, spBefore - 1); assert.equal(gate.initiatives[0].progress, 1);
assert.equal(openReleaseGate(gate), false, 'one gate action per turn');
endTurn(gate); const gateHp = gate.enemies.map(enemy => enemy.hp);
assert.equal(openReleaseGate(gate), true); chooseCombatOption(gate, 1);
assert.equal(gate.initiatives.length, 0); assert.ok(gate.enemies.every((enemy, i) => enemy.hp <= gateHp[i] - 18));
assert.equal(gate.projectDebt, 1, 'rush adds Debt');
const abort = fight(); play(abort, 'releasegate'); openReleaseGate(abort); chooseCombatOption(abort, 2);
assert.equal(abort.initiatives.length, 0); assert.ok(abort.block >= 4);
const expire = fight(); play(expire, 'releasegate'); endTurn(expire); endTurn(expire); endTurn(expire);
assert.equal(expire.initiatives.length, 0); assert.equal(expire.projectDebt, 1, 'missed gate adds Debt');
const check = fight(); play(check, 'releasegate+'); play(check, 'gatecheck');
assert.equal(check.initiatives[0].progress, 2); assert.ok(check.block >= 7);
const soloCheck = fight(); play(soloCheck, 'gatecheck'); assert.equal(soloCheck.evidence, 1);

const triage = fight(); triage.projectDebt = 4; triage.drawPile = ['patch'];
play(triage, 'defect'); assert.equal(triage.pendingChoice.kind, 'defect'); assert.equal(endTurn(triage), false);
assert.equal(chooseCombatOption(triage, 2), false, 'automation needs Evidence');
chooseCombatOption(triage, 0); assert.equal(triage.projectDebt, 3); assert.ok(triage.hand.includes('patch'));
play(triage, 'defect'); const deferredSp = triage.sp; chooseCombatOption(triage, 1);
assert.equal(triage.sp, deferredSp + 1); assert.equal(triage.projectDebt, 4); assert.ok(triage.discardPile.includes('defect'));
triage.evidence = 2; triage.drawPile = ['review']; play(triage, 'defect'); chooseCombatOption(triage, 2);
assert.equal(triage.evidence, 0); assert.equal(triage.projectDebt, 2); assert.ok(triage.hand.includes('review'));
play(triage, 'bugbudget'); assert.equal(triage.projectDebt, 3); assert.ok(triage.discardPile.includes('defect'));

const archive = fight(); play(archive, 'prototype');
assert.ok(archive.exhausted.includes('prototype') && !archive.discardPile.includes('prototype'));
play(archive, 'reclaim'); assert.equal(archive.pendingChoice.kind, 'reclaim');
chooseCombatOption(archive, 0); assert.ok(archive.hand.includes('prototype') && archive.exhausted.includes('reclaim'));
archive.discardPile = ['patch', 'review', 'memo']; play(archive, 'salvage*');
assert.equal(archive.pendingChoice.kind, 'salvage'); chooseCombatOption(archive, 1);
assert.ok(archive.hand.includes('review') && archive.exhausted.includes('salvage*'));
assert.ok(!archive.discardPile.includes('review'));
const resumed = JSON.parse(JSON.stringify(archive)); assert.ok(projectEndTurn(resumed));
assert.deepEqual(archive, JSON.parse(JSON.stringify(archive)), 'combat state remains saveable');

console.log('Systems depth: Coupling, Evidence, Release Gates, Defect Triage, Deck Recovery, upgrades, and saveable state passed.');
