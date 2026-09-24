import assert from 'node:assert/strict';
import {
  newGame, selectRole, startGame, chooseRoute, openCharter, chooseCharter,
  openContract, chooseContract, openChallenge, chooseChallenge, playCard,
  useSpecialist, endTurn, intentFor, debtTier, runScore
} from '../src/battle-game.js';

function fight(seed = 101) { const s = newGame(seed); startGame(s); chooseRoute(s, 0); return s; }
function put(s, id, target = 0) { s.hand = [id]; s.sp = 5; return playCard(s, 0, target); }
function finish(s) { s.enemies = [s.enemies[0]]; s.enemies[0].hp = 1; put(s, 'patch'); }

const surgical = newGame(1); startGame(surgical);
assert.equal(openCharter(surgical), true);
assert.equal(chooseCharter(surgical, 'surgical'), true);
assert.equal(surgical.specialist, 'qa');
assert.equal(openCharter(surgical), false);
chooseRoute(surgical, 0);
assert.equal(surgical.hand.length, 4);
useSpecialist(surgical, 0);
assert.equal(surgical.enemies[0].mark, 3);

const integrity = newGame(2); startGame(integrity); openCharter(integrity); chooseCharter(integrity, 'integrity'); chooseRoute(integrity, 0);
integrity.flow = 0; put(integrity, 'charter');
assert.equal(integrity.flow, 2, 'role-family skill builds extra Flow');
put(integrity, 'review');
assert.equal(integrity.flow, 2, 'off-family skill builds no Flow');

const early = newGame(3); startGame(early); openCharter(early); chooseCharter(early, 'early');
assert.equal(early.projectDebt, 1); chooseRoute(early, 0); assert.equal(early.sp, 4);

const control = fight(4);
const originalStep = control.enemies[0].step;
const originalIntent = intentFor(control.enemies[0]).label;
put(control, 'reprioritize');
assert.equal(control.enemies[0].step, originalStep + 1);
assert.notEqual(intentFor(control.enemies[0]).label, originalIntent);
put(control, 'mitigate');
assert.equal(control.enemies[0].intentPenalty, 5);
const debtBefore = control.projectDebt;
put(control, 'escalate');
assert.equal(control.projectDebt, debtBefore + 2);
assert.match(intentFor(control.enemies[0]).label, /CANCELED/);
const hpBefore = control.hp;
endTurn(control);
assert.equal(control.hp, hpBefore, 'canceled intent does not hit the player');
assert.equal(control.enemies[0].stalled, false);

const redirected = fight(5);
redirected.enemies[0].id = 'scope'; redirected.enemies[0].step = 0;
redirected.enemies.push({ ...redirected.enemies[0], id: 'bug', name: 'Clockwork Bug', hp: 40, maxHp: 40, step: 0, block: 0, redirected: false });
redirected.enemies[1].stalled = true;
put(redirected, 'redirect', 0);
const otherHp = redirected.enemies[1].hp, playerHp = redirected.hp;
endTurn(redirected);
assert.ok(redirected.enemies[1].hp < otherHp, 'redirected attack hits the other foe');
assert.equal(redirected.hp, playerHp);

const initiatives = fight(6);
initiatives.enemies[0].hp = 100; initiatives.enemies[0].maxHp = 100;
put(initiatives, 'pipeline');
put(initiatives, 'protocol');
assert.equal(initiatives.initiatives.length, 2);
endTurn(initiatives);
assert.equal(initiatives.initiatives[0].remaining, 1);
endTurn(initiatives);
assert.deepEqual(initiatives.activeInitiatives.sort(), ['pipeline', 'protocol']);
assert.ok(initiatives.block >= 5);
assert.ok(initiatives.sp >= 4);

const rollout = fight(7); rollout.enemies[0].hp = 100; rollout.enemies[0].maxHp = 100;
put(rollout, 'rollout'); const initial = rollout.enemies[0].hp;
endTurn(rollout); endTurn(rollout); endTurn(rollout);
assert.ok(rollout.enemies[0].hp <= initial - 14, 'scheduled rollout resolves');
const rolloutWin = fight(17); rolloutWin.enemies[0].hp = 12;
put(rolloutWin, 'rollout'); endTurn(rolloutWin); endTurn(rolloutWin); endTurn(rolloutWin);
assert.equal(rolloutWin.mode, 'reward', 'scheduled lethal damage completes the fight');

const debt = newGame(8); startGame(debt); debt.projectDebt = 8; chooseRoute(debt, 0);
assert.equal(debtTier(debt), 2);
assert.equal([...debt.hand, ...debt.drawPile].filter(id => id === 'defect').length, 2);
const size = debt.deck.length;
put(debt, 'defect');
assert.equal(debt.projectDebt, 7);
assert.equal(debt.discardPile.includes('defect'), false, 'fixed defect exhausts');
assert.equal(debt.deck.length, size, 'temporary defects never enter the permanent deck');

const contract = newGame(9); startGame(contract); openContract(contract); chooseContract(contract, 'clean');
chooseRoute(contract, 0); finish(contract);
contract.floor = 2; contract.routeChoices = [{ ids: ['goblin'], boss: true, label: 'Boss' }]; contract.mode = 'route';
chooseRoute(contract, 0); finish(contract);
assert.equal(contract.lastContract, 'completed');
assert.equal(contract.contractsCompleted, 1);
assert.ok(contract.relics.length >= 1);
const failed = newGame(10); startGame(failed); openContract(failed); chooseContract(failed, 'clean'); chooseRoute(failed, 0);
put(failed, 'panic'); assert.equal(failed.contract.failed, true);
const evidence = newGame(12); startGame(evidence); openContract(evidence); chooseContract(evidence, 'briefs'); chooseRoute(evidence, 0);
evidence.objective.done = true; finish(evidence);
assert.equal(evidence.contract.progress, 1);
evidence.floor = 2; evidence.routeChoices = [{ ids: ['goblin'], boss: true, label: 'Boss' }]; evidence.mode = 'route';
chooseRoute(evidence, 0); evidence.objective.done = true; finish(evidence);
assert.equal(evidence.lastContract, 'completed');
const lean = newGame(13); startGame(lean); openContract(lean); chooseContract(lean, 'lean');
lean.floor = 2; lean.routeChoices = [{ ids: ['goblin'], boss: true, label: 'Boss' }]; chooseRoute(lean, 0); finish(lean);
assert.equal(lean.lastContract, 'completed');

const challenge = newGame(11); openChallenge(challenge); chooseChallenge(challenge, 'daily');
assert.equal(challenge.mode, 'intro'); assert.ok(challenge.dailyDate);
assert.equal(challenge.seed, Number(challenge.dailyDate.replaceAll('-', '')));
startGame(challenge); assert.ok(['crunch', 'austerity'].includes(challenge.challengeRule));
assert.ok(runScore(challenge) >= 0);
const crunch = newGame(14); openChallenge(crunch); chooseChallenge(crunch, 'crunch'); startGame(crunch);
assert.equal(crunch.projectDebt, 4); chooseRoute(crunch, 0); assert.equal(crunch.sp, 4);
const austerity = newGame(15); openChallenge(austerity); chooseChallenge(austerity, 'austerity'); startGame(austerity);
assert.equal(austerity.hp, 60); chooseRoute(austerity, 0); finish(austerity); assert.ok(austerity.lastPayout >= 16);

console.log('Strategy systems passed: charters, intent control, initiatives, Debt defects, contracts, and challenge formats.');
