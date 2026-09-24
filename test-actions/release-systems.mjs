import assert from 'node:assert/strict';
import { ARCHITECTURES, CRISES, BOSS_PROBLEMS, newGame, startGame, chooseRoute, setEscalation, playCard, endTurn, shipRelease, chooseArchitecture, resolveBossProblem, useRoleAbility, useSpecialist } from '../src/battle-game.js';

const routeRun = newGame(41);
startGame(routeRun);
assert.equal(new Set(routeRun.routeChoices.map(choice => choice.crisis)).size, 3);
assert.deepEqual(new Set(routeRun.routeChoices.map(choice => choice.crisis)), new Set(Object.keys(CRISES)));
for (const crisis of Object.keys(CRISES)) {
  const run = newGame(41); startGame(run);
  run.routeChoices = [{ ids: ['bug'], boss: false, elite: false, kind: 'combat', crisis, label: 'Crisis' }];
  chooseRoute(run, 0);
  if (crisis === 'legacy') assert.ok([...run.hand, ...run.drawPile].includes('defect'));
  if (crisis === 'blackout') assert.equal(run.sp, 2);
  if (crisis === 'demo') { const power = run.enemies[0].power; endTurn(run); endTurn(run); assert.equal(run.enemies[0].power, power + 2); }
}

const shipped = newGame(41); startGame(shipped); chooseRoute(shipped, 0);
shipped.hand = ['review', 'review', 'review']; shipped.sp = 3;
for (let i = 0; i < 3; i++) assert.equal(playCard(shipped, 0), true);
assert.equal(shipped.readiness, 6);
assert.equal(shipRelease(shipped), false, 'shipping requires surviving one enemy turn');
endTurn(shipped);
const debtBeforeShip = shipped.projectDebt;
assert.equal(shipRelease(shipped), true);
assert.equal(shipped.mode, 'reward');
assert.equal(shipped.floor, 1);
assert.ok(shipped.projectDebt > debtBeforeShip);
assert.equal(shipped.lastPerfect, false);

const escalation = newGame(8);
assert.equal(setEscalation(escalation, 3), true);
startGame(escalation); chooseRoute(escalation, 0);
assert.ok(escalation.enemies[0].maxHp >= 31, 'escalation should add enemy health');
assert.ok(escalation.enemies[0].power >= 1, 'higher escalation should add power');

const monolith = newGame(17); startGame(monolith);
monolith.mode = 'architecture'; monolith.architecturePending = true; monolith.floor = 3;
assert.equal(chooseArchitecture(monolith, 'monolith'), true);
assert.equal(monolith.architecture, 'monolith');
assert.equal(monolith.mode, 'reward');
monolith.mode = 'route'; chooseRoute(monolith, 0);
assert.equal(monolith.hand.length, 4);
monolith.hand = ['patch']; monolith.sp = 3;
const hpBeforePatch = monolith.enemies[0].hp;
playCard(monolith, 0);
assert.equal(hpBeforePatch - monolith.enemies[0].hp, 12, 'Monolith first attack bonus');

const eventbus = newGame(17); startGame(eventbus); eventbus.architecture = 'eventbus'; chooseRoute(eventbus, 0);
eventbus.hand = ['review', 'review', 'review']; eventbus.sp = 3;
for (let i = 0; i < 3; i++) playCard(eventbus, 0);
assert.equal(eventbus.sp, 1, 'third skill refunds 1 SP');

const observatory = newGame(17); startGame(observatory); observatory.architecture = 'observatory'; observatory.specialist = 'qa'; chooseRoute(observatory, 0);
assert.equal(useSpecialist(observatory), true);
assert.equal(observatory.enemies[0].mark, 3, 'Observability increases applied Mark');

const teamwork = newGame(21); startGame(teamwork); teamwork.specialist = 'qa'; chooseRoute(teamwork, 0);
teamwork.block = 7;
assert.equal(useSpecialist(teamwork), true);
assert.equal(useRoleAbility(teamwork), true);
assert.equal(teamwork.teamworkUsed, true);
assert.equal(teamwork.enemies[0].mark, 3);
assert.equal(teamwork.reserveBlock, 11);

for (const id of Object.keys(BOSS_PROBLEMS)) {
  const boss = newGame(11); startGame(boss);
  boss.routeChoices = [{ ids: [id], boss: true, elite: false, kind: 'combat', label: 'Boss' }];
  chooseRoute(boss, 0);
  assert.equal(boss.enemies[0].problemResolved, false);
  assert.equal(resolveBossProblem(boss), true);
  assert.equal(boss.sp, 1);
  assert.equal(boss.enemies[0].problemResolved, true);
  assert.equal(resolveBossProblem(boss), false);
}
const goblin = newGame(11); startGame(goblin);
goblin.routeChoices = [{ ids: ['goblin'], boss: true, elite: false, kind: 'combat', label: 'Boss' }];
chooseRoute(goblin, 0); endTurn(goblin);
assert.equal(goblin.sp, 2, 'unresolved Budget Freeze taxes the next turn');
const kraken = newGame(11); startGame(kraken);
kraken.routeChoices = [{ ids: ['kraken'], boss: true, elite: false, kind: 'combat', label: 'Boss' }];
chooseRoute(kraken, 0); endTurn(kraken);
assert.ok(kraken.discardPile.includes('defect'), 'unresolved Merge Conflict adds a Defect');
const dragon = newGame(11); startGame(dragon);
dragon.routeChoices = [{ ids: ['dragon'], boss: true, elite: false, kind: 'combat', label: 'Boss' }];
chooseRoute(dragon, 0); dragon.hp = dragon.maxHp = 200;
for (let i = 0; i < 3; i++) endTurn(dragon);
assert.equal(dragon.enemies[0].problemClock, 3);
assert.ok(dragon.log.some(line => line.includes('Countdown expired')));

assert.equal(Object.keys(ARCHITECTURES).length, 3);
console.log('Release systems passed: crisis routes, shipping, escalation, architecture effects, teamwork, and boss interventions.');
