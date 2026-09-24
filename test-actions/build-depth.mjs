import assert from 'node:assert/strict';
import { CARDS, CARD_FAMILY, REWARD_CARDS, buildFit, newGame, selectRole, startGame, chooseRoute, pickSkillOffer, playCard } from '../src/battle-game.js';

function combat(role, seed) {
  const s = newGame(seed);
  selectRole(s, role);
  startGame(s);
  chooseRoute(s, 0);
  return s;
}
function foe(id = 'bug', hp = 70) {
  return { id, name: id, hp, maxHp: hp, block: 0, weak: 0, vulnerable: 0, mark: 0, step: 2, power: 0 };
}

assert.deepEqual(Object.keys(CARD_FAMILY).sort(), Object.keys(CARDS).sort(), 'every skill has a family for reward fit');
assert.equal(REWARD_CARDS.length, 52, 'intent-control and initiative skills are in the reward pool');

const fitRun = newGame(100);
selectRole(fitRun, 'debugger');
fitRun.deck.push('probe', 'probe');
assert.ok(buildFit(fitRun, 'triangulate') > buildFit(fitRun, 'repro'));
let markOffers = 0;
for (let n = 0; n < 1000; n++) markOffers += pickSkillOffer(fitRun, ['triangulate', 'repro'], { fit: true }) === 'triangulate';
assert.ok(markOffers > 700, `build-aligned Mark offer should be favored (${markOffers}/1000)`);

const architect = combat('architect', 101);
architect.enemies = [foe()]; architect.hand = ['bufferexchange']; architect.sp = 1; architect.reserveBlock = 3;
playCard(architect, 0);
assert.equal(architect.sp, 1, 'Buffer Exchange refunds SP when Block is banked');
assert.equal(architect.enemies[0].hp, 63);
const contingency = combat('architect', 102);
contingency.enemies = [foe('bug', 20), foe('scope', 20)]; contingency.hand = ['contingency']; contingency.sp = 2;
playCard(contingency, 0);
assert.equal(contingency.block, 8);
assert.equal(contingency.reserveBlock, 4);
assert.deepEqual(contingency.enemies.map(enemy => enemy.hp), [13, 13], 'Contingency hits all foes after building Flow');
const contingencyKill = combat('architect', 103);
contingencyKill.enemies = [foe('bug', 1)]; contingencyKill.hand = ['contingency']; contingencyKill.sp = 2;
playCard(contingencyKill, 0);
assert.equal(contingencyKill.mode, 'reward', 'a damaging skill must finish the fight');

const debuggerRun = combat('debugger', 104);
debuggerRun.enemies = [foe()]; debuggerRun.enemies[0].mark = 1;
debuggerRun.hand = ['triangulate']; debuggerRun.drawPile = ['review']; debuggerRun.sp = 2;
playCard(debuggerRun, 0);
assert.equal(debuggerRun.enemies[0].weak, 1);
assert.equal(debuggerRun.enemies[0].mark, 2);
assert.deepEqual(debuggerRun.hand, ['review']);
const sweep = combat('debugger', 105);
sweep.enemies = [foe(), foe('scope')]; sweep.hand = ['tracesweep']; sweep.sp = 2;
playCard(sweep, 0);
assert.deepEqual(sweep.enemies.map(enemy => enemy.hp), [65, 65]);
assert.ok(sweep.enemies.every(enemy => enemy.mark === 1));

const producer = combat('producer', 106);
producer.enemies = [foe()]; producer.hand = ['borrow', 'reallocate']; producer.sp = 3;
producer.drawPile = ['patch', 'review', 'standup'];
playCard(producer, 0);
assert.equal(producer.sp, 5);
assert.equal(producer.burnout, 2);
playCard(producer, 0);
assert.equal(producer.sp, 5, 'Reallocate returns SP after clearing Burnout');
assert.equal(producer.burnout, 0);
assert.equal(producer.hand.length, 3, 'borrow and reallocate drew three cards');

const reward = combat('debugger', 107);
reward.enemies = [foe('bug', 1)]; reward.hand = ['patch']; reward.sp = 3;
playCard(reward, 0);
assert.equal(reward.rewardChoices[0].source, 'role');
assert.equal(reward.rewardChoices[1].source, 'build');
assert.notEqual(reward.rewardChoices[0].id, reward.rewardChoices[1].id);
assert.ok(CARD_FAMILY[reward.rewardChoices[1].id]);

console.log(`Build depth passed: six skills, family coverage, aligned offers (${markOffers}/1000), all new combat effects and victory transition.`);
