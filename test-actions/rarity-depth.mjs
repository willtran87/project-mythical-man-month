import assert from 'node:assert/strict';
import { CARDS, CARD_POWER, REWARD_CARDS, cardInfo, newGame, selectRole, startGame, chooseRoute, playCard, endTurn, pickSkillOffer, skillPrice } from '../src/battle-game.js';

function combat(role, seed) {
  const s = newGame(seed);
  selectRole(s, role);
  startGame(s);
  chooseRoute(s, 0);
  return s;
}
function foe(id = 'bug') {
  return { id, name: id, hp: 70, maxHp: 70, block: 0, weak: 0, vulnerable: 0, mark: 0, step: 2, power: 0 };
}

assert.deepEqual(Object.keys(CARD_POWER).sort(), Object.keys(CARDS).sort(), 'every skill needs a power rating');
for (const id of REWARD_CARDS) assert.ok(['common', 'uncommon', 'rare'].includes(CARDS[id].rarity));
assert.equal(cardInfo('patch').power, 2);
assert.equal(cardInfo('patch+').power, 3);
assert.equal(cardInfo('exploit+').power, 5, 'power labels cap at five');
assert.equal(skillPrice('reserve'), 17);
assert.equal(skillPrice('riskmatrix'), 25);
assert.equal(skillPrice('exploit'), 37);

const offerRun = newGame(1234);
const sample = floor => {
  offerRun.floor = floor;
  let rare = 0;
  for (let n = 0; n < 2000; n++) rare += CARDS[pickSkillOffer(offerRun, REWARD_CARDS)].rarity === 'rare';
  return rare;
};
const earlyRare = sample(0), lateRare = sample(6);
assert.ok(earlyRare > 120 && earlyRare < 290 && lateRare > 580, `rare offers should grow across acts (${earlyRare} -> ${lateRare})`);
assert.equal(CARDS[pickSkillOffer(offerRun, ['probe'])].role, 'debugger', 'a restricted offer pool stays restricted');
offerRun.deck.push('reserve');
offerRun.deck = offerRun.deck.filter(id => id !== 'charter');
assert.equal(pickSkillOffer(offerRun, ['reserve', 'charter']), 'charter', 'offers prefer unseen cards at the same tier');

const debuggerRun = combat('debugger', 40);
debuggerRun.enemies = [foe()]; debuggerRun.hand = ['probe', 'patch', 'exploit']; debuggerRun.sp = 5;
assert.equal(playCard(debuggerRun, 0), true);
assert.equal(debuggerRun.enemies[0].mark, 2);
assert.equal(debuggerRun.enemies[0].hp, 66);
playCard(debuggerRun, 0);
assert.equal(debuggerRun.enemies[0].mark, 1);
assert.equal(debuggerRun.enemies[0].hp, 55, 'ordinary attacks spend Mark for +4 damage');
playCard(debuggerRun, 0);
assert.equal(debuggerRun.enemies[0].mark, 0);
assert.equal(debuggerRun.enemies[0].hp, 43, 'Exploit spends the stack for +5 per Mark without double counting');

const architect = combat('architect', 41);
architect.enemies = [foe()]; architect.hand = ['riskmatrix', 'reserve']; architect.sp = 3;
playCard(architect, 0);
assert.equal(architect.nextSp, 1);
playCard(architect, 0);
assert.equal(architect.reserveBlock, 2);
endTurn(architect);
assert.equal(architect.sp, 4);
assert.equal(architect.block, 2);
assert.equal(architect.nextSp, 0);

const producer = combat('producer', 42);
producer.enemies = [foe()]; producer.hand = ['burnrate', 'weekend']; producer.sp = 4;
producer.burnout = 2; producer.hp = 60;
playCard(producer, 0);
assert.equal(producer.enemies[0].hp, 57, 'Burn Rate scales from existing Burnout');
assert.equal(producer.burnout, 3);
playCard(producer, 0);
assert.equal(producer.burnout, 0);
assert.equal(producer.hp, 67);
assert.equal(producer.block, 5);

const neutral = combat('architect', 43);
neutral.enemies = [foe(), foe('scope')]; neutral.hand = ['hardstop', 'retro', 'warroom']; neutral.sp = 5;
neutral.burnout = 1; neutral.hp = 25; neutral.drawPile = ['review', 'patch'];
playCard(neutral, 0);
assert.equal(neutral.burnout, 0);
playCard(neutral, 0);
assert.equal(neutral.hp, 28);
assert.equal(neutral.hand.length, 3);
playCard(neutral, 0);
assert.ok(neutral.enemies.every(enemy => enemy.weak === 1));

console.log(`Rarity and depth passed: all power ratings, tier prices, late rare offers (${earlyRare} -> ${lateRare}), Mark combos, delayed SP, Burnout and neutral skills.`);
