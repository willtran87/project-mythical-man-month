import assert from 'node:assert/strict';
import { DAYS, EVENTS, ITEMS, newGame, currentEvent, currentTwist, assigned, assign, choose, chooseAction, chooseItem, canAction, canOption, ready, forecast, endDay } from '../src/day-game.js';

assert.equal(EVENTS.length, 18);
assert.ok(EVENTS.every(ev => ev.options.length === 3));
const a = newGame(42), b = newGame(42), c = newGame(43);
assert.deepEqual(a.schedule, b.schedule, 'same seed reproduces the crisis deck');
assert.deepEqual(a.twists, b.twists, 'same seed reproduces the twists');
assert.notDeepEqual(a.schedule, c.schedule, 'different seeds vary the crisis deck');
assert.equal(new Set(a.schedule).size, DAYS, 'no crisis repeats in one run');
assert.equal(a.schedule.at(-1), 'release', 'final release candidate is guaranteed');
assert.equal(a.inventory[0], 'duck', 'starter tool is available');

function takeDay(s, choice, action = 'none', itemIndex = -1) {
  const day = s.day;
  choose(s, choice);
  chooseAction(s, action);
  chooseItem(s, itemIndex);
  assert.ok(ready(s), `day ${day} ready`);
  const prediction = forecast(s);
  assert.ok(prediction);
  const before = { progress: s.progress, bugs: s.bugs, debt: s.debt };
  assert.ok(endDay(s));
  assert.equal(prediction.netWork, s.progress - before.progress, `day ${day} net work`);
  assert.equal(prediction.netBugs, s.bugs - before.bugs, `day ${day} net bugs`);
  assert.equal(prediction.netDebt, s.debt - before.debt, `day ${day} net debt`);
  for (const [key, expected] of Object.entries({
    progress: prediction.progress, scope: prediction.scope, bugs: prediction.totalBugs,
    debt: prediction.totalDebt, trust: prediction.trust, morale: prediction.morale,
    focus: prediction.focus, budget: prediction.budget
  })) assert.equal(s[key], expected, `day ${day} ${key} forecast`);
  assert.deepEqual(s.inventory, prediction.inventory, `day ${day} inventory forecast`);
  return s;
}
function prudent(seed, sprintOnFirstDay = false) {
  const s = newGame(seed); s.mode = 'play';
  while (s.mode === 'play') {
    const ev = currentEvent(s);
    takeDay(s, ev.id === 'cavalry' ? 1 : 0, sprintOnFirstDay && s.day === 1 ? 'sprint' : 'none');
  }
  return s;
}

const initial = newGame(1); initial.mode = 'play';
assert.equal(assigned(initial), initial.team);
assert.equal(ready(initial), false, 'crisis choice is required');
assert.ok(currentTwist(initial));
assign(initial, 'build', -1);
choose(initial, 2);
assert.equal(ready(initial), false, 'unassigned engineer blocks end day');
assign(initial, 'qa', 1);
assert.equal(ready(initial), true);
chooseAction(initial, 'sprint');
assert.equal(initial.action, 'sprint');
chooseItem(initial, 0);
const itemPrediction = forecast(initial);
assert.equal(itemPrediction.usedItem, ITEMS[0].name);
endDay(initial);
assert.equal(initial.itemsUsed, 1);
assert.equal(initial.inventory.length, 0);

const exhausted = newGame(1); exhausted.mode = 'play'; exhausted.focus = 0; exhausted.budget = 0;
assert.equal(canAction(exhausted, 'sprint'), false);
assert.equal(canAction(exhausted, 'break'), false);
assert.equal(canOption(exhausted, 2), false, 'unaffordable crisis response should be disabled');
choose(exhausted, 2);
assert.equal(exhausted.chosen, -1);
chooseAction(exhausted, 'sprint');
assert.equal(exhausted.action, 'none', 'unaffordable action is rejected');
const competing = newGame(1); competing.mode = 'play'; competing.focus = 2;
choose(competing, 2);
assert.equal(competing.chosen, 2);
chooseAction(competing, 'sprint');
assert.equal(competing.chosen, -1, 'action spending required focus clears an unaffordable response');

const carefulLoss = prudent(1);
assert.equal(carefulLoss.ending, 'lose', 'seed 1 needs an extra intervention');
const rescued = prudent(1, true);
assert.equal(rescued.ending, 'win', 'one well-timed sprint rescues seed 1');
assert.equal(rescued.milestones.length, 2);
assert.equal(rescued.inventory.length, 3, 'starter tool plus two care packages');
const anotherWin = prudent(2);
assert.equal(anotherWin.ending, 'win');

const hired = newGame(1); hired.mode = 'play';
takeDay(hired, 0);
assert.equal(currentEvent(hired).id, 'cavalry');
takeDay(hired, 0);
assert.equal(hired.team, 8);
assert.equal(assigned(hired), 8);
assert.equal(hired.onboarding, 1);

const reckless = newGame(1); reckless.mode = 'play';
while (reckless.mode === 'play') takeDay(reckless, 1);
assert.equal(reckless.ending, 'lose');
assert.ok(reckless.bugs > 18);

let passiveWins = 0;
for (let seed = 1; seed <= 100; seed++) passiveWins += prudent(seed).ending === 'win' ? 1 : 0;
assert.ok(passiveWins > 20 && passiveWins < 90, `seeded variance should matter; got ${passiveWins} passive wins`);
console.log(`Daily engine passed: 18 crises, seeded replay, actions, tools, forecasts, hiring, wins/losses; prudent no-action plan won ${passiveWins}/100 seeds.`);
