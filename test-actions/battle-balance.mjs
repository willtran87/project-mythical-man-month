import assert from 'node:assert/strict';
import { CARDS, ENEMIES, TOTAL_FIGHTS, newGame, startGame, chooseRoute, chooseArchitecture, choosePractice, resolveMission, selectTarget, intentFor, playCard, chooseCombatOption, useItem, endTurn, chooseReward } from '../src/battle-game.js';

const first = newGame(7), replay = newGame(7), changed = newGame(8);
startGame(first); startGame(replay); startGame(changed);
assert.deepEqual(first.routeChoices, replay.routeChoices, 'seed should replay route choices');
assert.notDeepEqual(first.routeChoices, changed.routeChoices, 'different seeds should vary routes');
assert.equal(first.mode, 'route');
assert.equal(chooseRoute(first, 0), true);
assert.equal(first.mode, 'combat');
assert.equal(first.hand.length, 5);
assert.ok(intentFor(first.enemies[0]).label);
const initialHp = first.enemies[0].hp;
const attackIndex = first.hand.findIndex(id => CARDS[id].type === 'attack');
assert.ok(attackIndex >= 0);
assert.equal(playCard(first, attackIndex, 0), true);
assert.ok(first.enemies[0].hp < initialHp, 'attack should damage target');
const turnBefore = first.turn;
endTurn(first);
assert.equal(first.turn, turnBefore + 1);
assert.equal(first.sp, first.maxSp, 'skill points replenish on next turn');

const itemRun = newGame(1); startGame(itemRun); chooseRoute(itemRun, 0);
assert.equal(useItem(itemRun, 0, 0), true);
assert.equal(itemRun.itemUsedThisTurn, true);
assert.equal(useItem(itemRun, 0, 0), false, 'only one item each turn');
assert.equal(itemRun.itemsUsed, 1);

const cardPriority = ['critical', 'rollback', 'guardrail', 'sweep', 'blueprint', 'memo', 'pair', 'refactor', 'overclock'];
const relicPriority = ['model', 'harness', 'interface', 'checklist', 'coffee'];
function autopilot(seed, verbose = false) {
  const s = newGame(seed); startGame(s);
  let steps = 0;
  while (s.mode !== 'end' && steps++ < 2000) {
    if (s.mode === 'route') { chooseRoute(s, 0); continue; }
    if (s.mode === 'architecture') { chooseArchitecture(s, 'eventbus'); continue; }
    if (s.mode === 'practice') { choosePractice(s, 'cohesion'); continue; }
    if (s.mode === 'reward') {
      const healIndex = s.rewardChoices.findIndex(x => x.type === 'heal');
      if (s.maxHp - s.hp >= 13 && healIndex >= 0) { chooseReward(s, healIndex); continue; }
      const ids = s.rewardChoices.map(x => x.id);
      const priority = s.rewardChoices[0].type === 'relic' ? relicPriority : cardPriority;
      const preferred = priority.find(id => ids.includes(id));
      chooseReward(s, Math.max(0, ids.indexOf(preferred)));
      continue;
    }
    if (s.pendingChoice) {
      const index = s.pendingChoice.kind === 'scopechoice' ? (s.block >= 10 ? 1 : 0) : 0;
      chooseCombatOption(s, index);
      continue;
    }
    if (s.mission?.id === 'handoff' && !s.mission.resolved && !s.mission.failed && s.mission.countdown === 1 && s.sp >= 1) { resolveMission(s); continue; }
    const boss = s.enemies.findIndex(e => e.boss);
    const duckIndex = s.inventory.indexOf('duck');
    if (boss >= 0 && duckIndex >= 0 && !s.itemUsedThisTurn) { useItem(s, duckIndex, boss); continue; }
    const pizzaIndex = s.inventory.indexOf('pizza');
    if (s.hp <= s.maxHp - 13 && pizzaIndex >= 0 && !s.itemUsedThisTurn) { useItem(s, pizzaIndex); continue; }
    const blueprintIndex = s.inventory.indexOf('blueprint');
    if (boss >= 0 && blueprintIndex >= 0 && !s.itemUsedThisTurn && s.block < 5) { useItem(s, blueprintIndex); continue; }
    const target = s.enemies.reduce((best, enemy, i, all) => enemy.hp < all[best].hp ? i : best, 0);
    selectTarget(s, target);
    const threat = s.enemies.reduce((n, e) => n + (intentFor(e).kind === 'attack' ? intentFor(e).damage : 0), 0);
    const playable = s.hand.map((id, i) => ({ id, i, card: CARDS[id] })).filter(x => x.card.cost <= s.sp);
    const blocks = playable.filter(x => x.card.type === 'skill' && !['overclock'].includes(x.id));
    const attacks = playable.filter(x => x.card.type === 'attack');
    const blockIndex = blocks.find(x => ['guardrail', 'blueprint', 'review', 'memo', 'rollback'].includes(x.id));
    if (threat > s.block + 3 && blockIndex) { playCard(s, blockIndex.i, target); continue; }
    if (attacks.length) {
      const best = attacks.sort((a, b) => ({ critical: 17, patch: 7, sweep: 12, refactor: 6, pair: 5, panic: 4 }[b.id] || 0) - ({ critical: 17, patch: 7, sweep: 12, refactor: 6, pair: 5, panic: 4 }[a.id] || 0))[0];
      playCard(s, best.i, target); continue;
    }
    if (playable.length && playable[0].id !== 'overclock') { playCard(s, playable[0].i, target); continue; }
    endTurn(s);
  }
  if (steps >= 2000) throw new Error(`autopilot stuck on seed ${seed}`);
  if (verbose) console.log(seed, s.ending, s.floor, s.hp, s.deck.length, s.relics, s.log[0]);
  return s;
}

let wins = 0, reachedFinal = 0;
for (let seed = 1; seed <= 30; seed++) {
  const s = autopilot(seed, seed <= 5);
  wins += s.ending === 'win' ? 1 : 0;
  reachedFinal += s.floor >= TOTAL_FIGHTS - 1 ? 1 : 0;
}
console.log(`Battle engine: autopilot won ${wins}/30, reached the final encounter ${reachedFinal}/30.`);
assert.ok(wins > 0, 'at least one full run should be winnable');
