import assert from 'node:assert/strict';
import { newGame, startGame, chooseRoute, playCard, chooseCombatOption, endTurn, cardInfo, CARDS, REWARD_CARDS, upgradeBranchDetail, projectEndTurn } from '../src/battle-game.js';

function fight(seed = 500) {
  const s = newGame(seed); startGame(s); chooseRoute(s, 0);
  s.enemies = [s.enemies[0]]; s.enemies[0].hp = s.enemies[0].maxHp = 150;
  s.hp = s.maxHp = 150; s.sp = 8; s.drawPile = []; s.discardPile = [];
  return s;
}
function play(s, id, target = 0) { s.hand = [id, ...s.hand]; assert.equal(playCard(s, 0, target), true, id); }

const ids = ['decisionrecord', 'releasecut', 'changefreeze', 'pagerduty', 'grooming', 'archiveticket', 'migration', 'handoffgate', 'scopechoice', 'loadbearing', 'evidence', 'sprintcommit'];
for (const id of ids) {
  assert.ok(REWARD_CARDS.includes(id), `${id} can appear as a reward`);
  assert.ok(CARDS[id].art, `${id} has art`);
  assert.ok(cardInfo(id).family, `${id} has a family`);
}
for (const id of ['decisionrecord', 'changefreeze', 'grooming', 'migration', 'scopechoice', 'sprintcommit']) {
  assert.notEqual(upgradeBranchDetail(id, 'force'), upgradeBranchDetail(id, 'flex'), `${id} has distinct branches`);
}

const flow = fight(); flow.flow = 2; play(flow, 'releasecut');
assert.equal(flow.flow, 0); assert.ok(flow.enemies[0].hp <= 132, 'Flow converts into damage');
flow.flow = 2; flow.drawPile = ['patch']; play(flow, 'decisionrecord');
assert.equal(flow.flow, 1, 'skill earns Flow before spending');
assert.ok(flow.block >= 12); assert.ok(flow.hand.includes('patch'));

const control = fight(); control.hand = ['patch']; control.drawPile = ['review', 'memo', 'pair'];
play(control, 'grooming'); assert.equal(control.pendingChoice.kind, 'grooming');
assert.equal(endTurn(control), false, 'must finish a choice before ending turn');
const asideId = control.hand[0]; assert.equal(chooseCombatOption(control, 0), true);
assert.deepEqual(control.setAside, [asideId]); endTurn(control);
assert.ok(control.hand.includes(asideId), 'set-aside card returns next turn');
control.hand = ['defect']; const debt = control.projectDebt = 3;
play(control, 'archiveticket'); assert.equal(control.pendingChoice.kind, 'archiveticket');
chooseCombatOption(control, 0); assert.equal(control.projectDebt, debt - 1);
assert.ok(control.exhausted.includes('defect'));

const choice = fight(); play(choice, 'scopechoice'); assert.equal(choice.pendingChoice.kind, 'scopechoice');
const hp = choice.enemies[0].hp; assert.equal(playCard(choice, 0), false);
chooseCombatOption(choice, 0); assert.equal(choice.enemies[0].hp, hp); assert.ok(choice.block >= 10);
play(choice, 'scopechoice+'); chooseCombatOption(choice, 1);
assert.ok(choice.enemies[0].hp <= hp - 16); assert.equal(choice.projectDebt, 1);

const freeze = fight(); freeze.enemies[0].id = 'scope'; freeze.enemies[0].step = 0;
play(freeze, 'changefreeze'); assert.equal(freeze.enemies[0].reactions[0].kind, 'freeze');
const preview = projectEndTurn(freeze); assert.ok(preview);
const before = freeze.hp; endTurn(freeze); assert.ok(freeze.hp >= before - 10, 'armed defense absorbs the hit');
const pager = fight(); pager.enemies[0].id = 'scope'; pager.enemies[0].step = 0;
play(pager, 'pagerduty'); endTurn(pager); assert.ok(pager.nextSp === 0 && pager.sp > 0);

const migration = fight(); play(migration, 'migration');
assert.equal(migration.initiatives[0].progress, 0);
play(migration, 'review'); assert.equal(migration.initiatives[0].progress, 1);
const mhp = migration.enemies[0].hp; play(migration, 'memo');
assert.equal(migration.initiatives.length, 0); assert.ok(migration.enemies[0].hp < mhp);
const missed = fight(); play(missed, 'migration'); endTurn(missed); endTurn(missed);
assert.equal(missed.projectDebt, 1, 'unfinished plan incurs debt');
const flexible = fight(); play(flexible, 'migration*'); endTurn(flexible); endTurn(flexible);
assert.equal(flexible.projectDebt, 0, 'flex plan avoids deadline debt');

const handoff = fight(); play(handoff, 'handoffgate'); play(handoff, 'patch');
assert.equal(handoff.initiatives[0].progress, 1);
play(handoff, 'patch'); assert.equal(handoff.initiatives.length, 0); assert.ok(handoff.nextSp >= 2);
const architect = fight(); architect.role = 'architect'; architect.reserveBlock = 6;
play(architect, 'loadbearing'); assert.equal(architect.reserveBlock, 0);
assert.ok(architect.enemies[0].hp <= 133);
const debuggerRun = fight(); debuggerRun.role = 'debugger'; debuggerRun.enemies[0].mark = 2; debuggerRun.drawPile = ['patch', 'review'];
const startSp = debuggerRun.sp; play(debuggerRun, 'evidence');
assert.equal(debuggerRun.enemies[0].mark, 0); assert.equal(debuggerRun.sp, startSp);
assert.ok(debuggerRun.hand.includes('patch'));
const producer = fight(); producer.role = 'producer'; play(producer, 'sprintcommit');
assert.equal(producer.sprintCommit, 2); play(producer, 'patch'); assert.equal(producer.sprintCommit, 1);
endTurn(producer); assert.equal(producer.projectDebt, 1);

const upgrades = fight(); upgrades.flow = 3; upgrades.drawPile = ['patch'];
play(upgrades, 'decisionrecord+'); assert.ok(upgrades.block >= 19);
play(upgrades, 'grooming*'); assert.equal(upgrades.pendingChoice.kind, 'grooming');
chooseCombatOption(upgrades, 0); assert.ok(upgrades.block >= 23, 'flex grooming adds Block after choice');
const quickPlan = fight(); play(quickPlan, 'migration+'); play(quickPlan, 'review');
assert.equal(quickPlan.initiatives.length, 0, 'force migration completes with one other skill');
const safeScope = fight(); play(safeScope, 'scopechoice*'); chooseCombatOption(safeScope, 0);
assert.ok(safeScope.block >= 15, 'flex scope decision strengthens the safe option');
const lightCommit = fight(); play(lightCommit, 'sprintcommit*'); play(lightCommit, 'patch'); endTurn(lightCommit);
assert.equal(lightCommit.projectDebt, 0, 'flex commitment needs only one attack');
const quietReaction = fight(); quietReaction.enemies[0].stalled = true;
play(quietReaction, 'changefreeze*'); endTurn(quietReaction);
assert.ok(quietReaction.sp >= quietReaction.maxSp + 1, 'flex freeze rewards a nonattack with extra SP');

console.log('Skill depth: 12 new skills, choices, reactions, deadlines, role synergies, Flow and upgrades passed.');
