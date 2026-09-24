import assert from 'node:assert/strict';
import { CARDS, cardInfo, newGame, selectRole, startGame, chooseRoute, playCard, useRoleAbility, endTurn, intentFor, chooseReward, chooseTune } from '../src/battle-game.js';

function combat(role, seed) {
  const s = newGame(seed);
  selectRole(s, role);
  startGame(s);
  chooseRoute(s, 0);
  return s;
}
function foe(id, step = 0, weak = 0) {
  return { id, name: id, hp: 40, maxHp: 40, block: 0, weak, vulnerable: 0, step, power: 0 };
}

const architect = combat('architect', 11);
architect.enemies = [foe('shredder', 2)];
architect.hand = ['charter']; architect.sp = 3;
assert.equal(playCard(architect, 0), true);
assert.equal(architect.block, 6);
assert.equal(architect.reserveBlock, 3);
assert.equal(useRoleAbility(architect), true);
assert.equal(architect.block, 0);
assert.equal(architect.reserveBlock, 9);
assert.equal(useRoleAbility(architect), false);
endTurn(architect);
assert.equal(architect.block, 9, 'banked Block arrives on the next turn');
architect.relics.push('grid');
architect.block = 7; architect.enemies[0].step = 2;
endTurn(architect);
assert.equal(architect.block, 3, 'Planning Grid carries leftover Block');

const debuggerRun = combat('debugger', 12);
debuggerRun.enemies = [foe('bug')];
assert.equal(useRoleAbility(debuggerRun), true);
assert.equal(debuggerRun.enemies[0].weak, 2);
assert.equal(debuggerRun.enemies[0].vulnerable, 1);
debuggerRun.hand = ['breakpoint']; debuggerRun.sp = 3;
playCard(debuggerRun, 0);
assert.equal(debuggerRun.enemies[0].hp, 21, 'Breakpoint combines Weak, Vulnerable, and its dual-condition bonus');
debuggerRun.relics.push('notebook');
debuggerRun.hand = ['trace']; debuggerRun.drawPile = ['review']; debuggerRun.sp = 3;
playCard(debuggerRun, 0);
assert.ok(debuggerRun.hand.includes('review'), 'Fault Notebook draws on the first Weak target attack');

const producer = combat('producer', 13);
producer.enemies = [foe('bug')]; producer.relics.push('redline');
assert.equal(useRoleAbility(producer), true);
assert.equal(producer.sp, 6, 'Crunch Time and Redline Calendar each grant SP');
assert.equal(producer.burnout, 1);
producer.hand = ['standup', 'launch'];
playCard(producer, 0);
assert.equal(producer.sp, 7, 'Redline Calendar triggers only once per fight');
assert.equal(producer.burnout, 2);
playCard(producer, 0);
assert.equal(producer.enemies[0].hp, 16, 'Launch Window cashes in Burnout and uses Flow');
assert.equal(producer.burnout, 0);

const reward = combat('architect', 14);
reward.enemies = [foe('bug')]; reward.enemies[0].hp = 1;
reward.hand = ['patch']; reward.sp = 3;
playCard(reward, 0);
assert.equal(reward.mode, 'reward');
assert.equal(reward.rewardChoices.length, 4);
assert.equal(CARDS[reward.rewardChoices[0].id].role, 'architect', 'first offer is role-specific');
assert.notEqual(reward.rewardChoices[1].id, reward.rewardChoices[0].id, 'build offer differs from role offer');
assert.equal(reward.rewardChoices[1].source, 'build');
assert.equal(chooseReward(reward, 3), true);
assert.equal(reward.mode, 'tune');
const choice = reward.tuneChoices.findIndex(c => c.type === 'upgrade');
const id = reward.tuneChoices[choice].id;
assert.equal(chooseTune(reward, choice), true);
assert.equal(reward.mode, 'route');
assert.ok(reward.deck.includes(`${id}+`));
assert.ok(cardInfo(`${id}+`).name.endsWith('+'));

const upgraded = combat('architect', 15);
upgraded.enemies = [foe('bug')]; upgraded.hand = ['patch+']; upgraded.sp = 3;
playCard(upgraded, 0);
assert.equal(upgraded.enemies[0].hp, 30, 'upgraded attack adds 3 damage');
upgraded.hand = ['review+']; upgraded.sp = 3;
playCard(upgraded, 0);
assert.equal(upgraded.block, 10, 'upgraded skill adds 3 Block');

const shredder = combat('architect', 16);
shredder.enemies = [foe('shredder', 1, 1)]; shredder.block = 7;
assert.equal(intentFor(shredder.enemies[0]).damage, 4, 'Weak reduces special attack damage');
endTurn(shredder);
assert.equal(shredder.hp, shredder.maxHp - 2, 'Shred removes Block before hitting');
const collector = combat('producer', 17);
collector.enemies = [foe('collector', 1, 1)]; collector.burnout = 2;
assert.equal(intentFor(collector.enemies[0]).damage, 3);
endTurn(collector);
assert.equal(collector.hp, collector.maxHp - 7, 'Audit scales with Burnout');
assert.equal(collector.sp, 1, 'Audit taxes next turn SP');

console.log('Role depth passed: all abilities, role card synergies, relics, upgrades, tailored rewards, and new enemy counters.');
