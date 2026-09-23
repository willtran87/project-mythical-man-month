export const DAYS = 12;
export const MILESTONES = { 4: 82, 8: 175 };
export const PHASES = ['Requirements', 'Integration', 'Release'];
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const option = (label, detail, note, effect, cost = {}) => ({ label, detail, note, effect, cost });
const event = (id, phase, title, art, copy, lesson, options) => ({ id, phase, title, art, copy, lesson, options });

export const ITEMS = [
  { id: 'duck', name: 'Debug Duck', detail: 'Bugs −8 · debt −3', art: 'duck', effect: s => { s.bugs -= 8; s.debt -= 3; } },
  { id: 'pizza', name: 'Emergency Pizza', detail: 'Morale +12 · focus +2', art: 'pizza', effect: s => { s.morale += 12; s.focus += 2; } },
  { id: 'blueprint', name: 'One-Page Blueprint', detail: 'Integrity +8 · knowledge +5', art: 'blueprint', effect: s => { s.integrity += 8; s.knowledge += 5; } }
];
const itemById = Object.fromEntries(ITEMS.map(item => [item.id, item]));
export function gainItem(s, id) { if (!itemById[id] || s.inventory.length >= 3) return false; s.inventory.push(id); return true; }

export const ACTIONS = [
  { id: 'none', name: 'No extra action', detail: 'Save your focus and budget.', focus: 0, budget: 0, effect: () => {} },
  { id: 'sprint', name: 'Deep work sprint', detail: '+12 work · +2 bugs · morale −2', focus: 2, budget: 0, effect: s => { s.progress += 12; s.bugs += 2; s.morale -= 2; } },
  { id: 'bugbash', name: 'Bug bash', detail: 'Bugs −7 · debt −2', focus: 2, budget: 0, effect: s => { s.bugs -= 7; s.debt -= 2; } },
  { id: 'review', name: 'Design review', detail: 'Integrity +6 · knowledge +4 · work −3', focus: 1, budget: 1, effect: s => { s.integrity += 6; s.knowledge += 4; s.progress -= 3; } },
  { id: 'brief', name: 'Sponsor briefing', detail: 'Trust +6 · work −2', focus: 1, budget: 0, effect: s => { s.trust += 6; s.progress -= 2; } },
  { id: 'break', name: 'Team break', detail: 'Morale +9 · focus +1', focus: 0, budget: 2, effect: s => { s.morale += 9; s.focus += 1; } },
  { id: 'rig', name: 'Build a test rig', detail: 'Automation +1 · work −4', focus: 1, budget: 3, effect: s => { s.automation += 1; s.progress -= 4; } }
];
const actionById = Object.fromEntries(ACTIONS.map(action => [action.id, action]));

export const TWISTS = [
  { id: 'quiet', name: 'Quiet morning', detail: '+3 work', effect: s => { s.workMod += 3; } },
  { id: 'demo', name: 'Surprise demo', detail: '−3 work · trust +2', effect: s => { s.workMod -= 3; s.trust += 2; } },
  { id: 'alert', name: 'Production alert', detail: '+3 bugs', effect: s => { s.bugs += 3; } },
  { id: 'coffee', name: 'Coffee cart', detail: 'Morale +4', effect: s => { s.morale += 4; } },
  { id: 'outage', name: 'Network outage', detail: '−4 work · debt +1', effect: s => { s.workMod -= 4; s.debt += 1; } },
  { id: 'clear', name: 'Clear calendar', detail: '+2 work · knowledge +1', effect: s => { s.workMod += 2; s.knowledge += 1; } }
];
const twistById = Object.fromEntries(TWISTS.map(twist => [twist.id, twist]));

export const EVENTS = [
  event('scope', 0, 'A “tiny” change request', 'scope',
    'The sponsor would love a dashboard. Surely a few extra charts cannot change the deadline?',
    'Scope grows more easily than schedules do.', [
      option('Protect the plan', 'Trust −3 · morale −2', 'A rare requirement was declined.', s => { s.trust -= 3; s.morale -= 2; }),
      option('Add the dashboard', 'Scope +18 · trust +6', 'The dashboard now contains six dashboards.', s => { s.scope += 18; s.trust += 6; }),
      option('Trade an old feature', 'Scope +4 · trust +2 · focus +1', 'The dashboard replaces a forgotten report.', s => { s.scope += 4; s.trust += 2; s.focus += 1; })
    ]),
  event('cavalry', 0, 'The cavalry arrives', 'handoff',
    'Management offers three new engineers to rescue the schedule. They will need mentors and introductions.',
    'Brooks’s Law: late staffing creates immediate coordination work.', [
      option('Hire all three', '+3 people · onboarding 2 days · budget −4 · trust +4', 'The first meeting begins now.', s => { s.team += 3; s.alloc.build += 3; s.onboarding = 2; s.budget -= 4; s.trust += 4; }, { budget: 4 }),
      option('Teach the small crew', 'Knowledge +8 · trust −3', 'The tiny team shares one mental model.', s => { s.knowledge += 8; s.trust -= 3; }),
      option('Hire one specialist', '+1 person · onboarding 1 day · budget −2 · trust +2', 'One pair of hands joins with a short handoff.', s => { s.team += 1; s.alloc.qa += 1; s.onboarding = 1; s.budget -= 2; s.trust += 2; }, { budget: 2 })
    ]),
  event('second', 0, 'The second system beckons', 'debt',
    'A senior engineer proposes replacing the simple design with a magnificent general-purpose platform.',
    'The second-system effect rewards restraint.', [
      option('Keep the simple design', 'Integrity +10 · debt −3', 'The design fits on one blueprint.', s => { s.integrity += 10; s.debt -= 3; }),
      option('Build the platform', 'Scope +20 · debt +4 · morale +7 · integrity −12', 'Its configuration file has a configuration file.', s => { s.scope += 20; s.debt += 4; s.morale += 7; s.integrity -= 12; }),
      option('Prototype one part', 'Work −6 · knowledge +7 · integrity +4', 'A small experiment answers the large argument.', s => { s.progress -= 6; s.knowledge += 7; s.integrity += 4; })
    ]),
  event('committee', 0, 'Everyone has an opinion', 'architect',
    'A committee wants to vote on every interface. The designer asks for one clear decision maker.',
    'Conceptual integrity needs a clear point of view.', [
      option('Name a design owner', 'Integrity +10 · morale −4', 'One voice gives the product a shape.', s => { s.integrity += 10; s.morale -= 4; }),
      option('Put it to a vote', 'Scope +10 · morale +5 · integrity −6', 'Every screen now has three search bars.', s => { s.scope += 10; s.morale += 5; s.integrity -= 6; }),
      option('Write design principles', 'Integrity +6 · knowledge +5 · work −4', 'A page of principles ends three meetings.', s => { s.integrity += 6; s.knowledge += 5; s.progress -= 4; })
    ]),
  event('budget', 0, 'The budget goblin visits', 'goblin',
    'Procurement froze the tool budget, then asked why the schedule had not improved.',
    'Resources and expectations belong in the same plan.', [
      option('Cut unused subscriptions', 'Budget +4 · trust −2', 'The team finds three tools nobody opened.', s => { s.budget += 4; s.trust -= 2; }),
      option('Promise a cheaper miracle', 'Budget +6 · debt +5 · integrity −5', 'The savings live in next quarter.', s => { s.budget += 6; s.debt += 5; s.integrity -= 5; }),
      option('Negotiate a small reserve', 'Budget +2 · trust +3 · focus −1', 'The sponsor funds a measured experiment.', s => { s.budget += 2; s.trust += 3; s.focus -= 1; }, { focus: 1 })
    ]),
  event('prototype', 0, 'The prototype applauded itself', 'scope',
    'The demo looks lovely, but the promised behavior is still a sketch. The applause is getting louder.',
    'A prototype is evidence, not a finished product.', [
      option('Label it honestly', 'Trust −2 · knowledge +6', 'The team writes down what is still missing.', s => { s.trust -= 2; s.knowledge += 6; }),
      option('Call it nearly done', 'Trust +5 · bugs +5 · debt +3', 'The applause enters the status report.', s => { s.trust += 5; s.bugs += 5; s.debt += 3; }),
      option('Run a real user test', 'Work −5 · integrity +6 · trust +2', 'Someone finally tries the blue button.', s => { s.progress -= 5; s.integrity += 6; s.trust += 2; })
    ]),

  event('suite', 1, 'The test suite objects', 'bug',
    'QA can automate smoke tests. It takes attention now and saves rework through release.',
    'Quality work belongs on the schedule.', [
      option('Automate the checks', 'Work −6 · automation +1 · debt −3', 'The robots catch regressions without a meeting.', s => { s.progress -= 6; s.automation += 1; s.debt -= 3; }),
      option('Ship by vibes', 'Work +8 · bugs +6 · debt +4 · trust +3', 'Confidence rises with the crash counter.', s => { s.progress += 8; s.bugs += 6; s.debt += 4; s.trust += 3; }),
      option('Pair QA with a builder', 'Bugs −4 · knowledge +4 · work −3', 'A bug becomes a shared lesson.', s => { s.bugs -= 4; s.knowledge += 4; s.progress -= 3; })
    ]),
  event('vendor', 1, 'A silver bullet, allegedly', 'vendor',
    'A vendor promises its new tool will make the remaining work disappear. The demo was very polished.',
    'There is no silver bullet for essential complexity.', [
      option('Fix the real bottleneck', 'Knowledge +8 · debt −3', 'The team improves the work it actually does.', s => { s.knowledge += 8; s.debt -= 3; }),
      option('Buy the miracle tool', 'Work +5 · bugs +4 · debt +8 · budget −3', 'The tool draws prettier charts of the same bugs.', s => { s.progress += 5; s.bugs += 4; s.debt += 8; s.budget -= 3; }, { budget: 3 }),
      option('Trial the tool briefly', 'Knowledge +3 · budget −1 · focus +1', 'A short trial answers the sales pitch.', s => { s.knowledge += 3; s.budget -= 1; s.focus += 1; }, { budget: 1 })
    ]),
  event('meetings', 1, 'The calendar fills with meetings', 'handoff',
    'Every dependency has a standing meeting. Someone suggests writing decisions down instead.',
    'Communication paths multiply as the team grows.', [
      option('Write a concise memo', 'Knowledge +5 · lasting coordination boost', 'One page replaces six invitations.', s => { s.knowledge += 5; s.async += 1; }),
      option('Hold an all-hands', 'Morale +6 · work −9 today', 'The meeting had excellent attendance.', s => { s.morale += 6; s.meetingTax = 9; }),
      option('Pair the team', 'Knowledge +4 · morale +3 · work −4', 'Two people talk; sixteen invitations vanish.', s => { s.knowledge += 4; s.morale += 3; s.progress -= 4; })
    ]),
  event('integrate', 1, 'Integration Friday', 'bug',
    'The branches finally meet. Fixing rough edges will delay the demo, but the demo is on the calendar.',
    'Integration is work, even when a slide deck ignores it.', [
      option('Integrate carefully', 'Work −8 · bugs −7 · debt −5', 'It works on more than one machine.', s => { s.progress -= 8; s.bugs -= 7; s.debt -= 5; }),
      option('Demo the happy path', 'Work +8 · bugs +8 · trust +4', 'Please do not click the blue button.', s => { s.progress += 8; s.bugs += 8; s.trust += 4; }),
      option('Stage the merge', 'Work −4 · bugs −4 · knowledge +3', 'A small integration catches a big surprise.', s => { s.progress -= 4; s.bugs -= 4; s.knowledge += 3; })
    ]),
  event('kraken', 1, 'The Merge Kraken wakes', 'kraken',
    'Six branches disagree on one shared interface. Every tentacle claims its version is the final one.',
    'Unmerged work is unfinished work.', [
      option('Freeze and untangle', 'Work −7 · bugs −6 · integrity +5', 'The team picks one contract and joins the branches.', s => { s.progress -= 7; s.bugs -= 6; s.integrity += 5; }),
      option('Force the merge', 'Work +7 · bugs +9 · debt +5', 'The build is green in one very specific window.', s => { s.progress += 7; s.bugs += 9; s.debt += 5; }),
      option('Bring in a mediator', 'Budget −2 · knowledge +6 · bugs −3', 'One engineer maps the conflict for everyone.', s => { s.budget -= 2; s.knowledge += 6; s.bugs -= 3; }, { budget: 2 })
    ]),
  event('docs', 1, 'The missing manual', 'architect',
    'A critical component has one maintainer and no notes. That maintainer has booked a vacation.',
    'Knowledge becomes a risk when it lives in one head.', [
      option('Document it now', 'Work −5 · knowledge +8', 'The component finally has a map.', s => { s.progress -= 5; s.knowledge += 8; }),
      option('Cancel the vacation', 'Morale −9 · trust +3', 'The calendar is saved. The team remembers.', s => { s.morale -= 9; s.trust += 3; }),
      option('Pair on the handoff', 'Knowledge +5 · morale +2 · work −3', 'A second person learns the odd corners.', s => { s.knowledge += 5; s.morale += 2; s.progress -= 3; })
    ]),

  event('regressions', 2, 'The regression pile', 'debt',
    'Old shortcuts are waking up. QA asks to triage the backlog before adding more features.',
    'Technical debt collects interest.', [
      option('Triage the backlog', 'Bugs −7 · debt −3 · trust −2', 'The bug list becomes shorter and more honest.', s => { s.bugs -= 7; s.debt -= 3; s.trust -= 2; }),
      option('Defer the ugly parts', 'Scope −8 · bugs +5 · trust +4', 'The deferred list gets a nicer name.', s => { s.scope -= 8; s.bugs += 5; s.trust += 4; }),
      option('Use the test lab', 'Budget −2 · bugs −5 · automation +1', 'The lab finds a pattern in the failures.', s => { s.budget -= 2; s.bugs -= 5; s.automation += 1; }, { budget: 2 })
    ]),
  event('status', 2, 'The status light is green?', 'vendor',
    'Executives want a confident release date. The team wants a report that reflects reality.',
    'A schedule only helps when it tells the truth.', [
      option('Report the real risk', 'Morale +5 · trust −4', 'The status slide contains numbers.', s => { s.morale += 5; s.trust -= 4; }),
      option('Declare it green', 'Work +8 · bugs +5 · debt +5 · trust +8', 'The green light is drawn in a very large font.', s => { s.progress += 8; s.bugs += 5; s.debt += 5; s.trust += 8; }),
      option('Show a recovery plan', 'Trust +2 · focus −1 · knowledge +3', 'The slide has a date and a contingency.', s => { s.trust += 2; s.focus -= 1; s.knowledge += 3; }, { focus: 1 })
    ]),
  event('dependency', 2, 'A critical dependency', 'architect',
    'One messy interface blocks three teams. A narrow redesign costs time but clears the path.',
    'Simple interfaces protect the whole system.', [
      option('Narrow the interface', 'Integrity +10 · debt −4', 'The teams can agree on one contract.', s => { s.integrity += 10; s.debt -= 4; }),
      option('Patch around it', 'Work +9 · debt +7 · bugs +3', 'The patch becomes part of the architecture.', s => { s.progress += 9; s.debt += 7; s.bugs += 3; }),
      option('Write an adapter', 'Work −4 · integrity +5 · bugs −3', 'One small layer keeps the rest clean.', s => { s.progress -= 4; s.integrity += 5; s.bugs -= 3; })
    ]),
  event('audit', 2, 'The surprise audit', 'goblin',
    'The release checklist arrives with sixteen questions nobody expected. Procurement brought a highlighter.',
    'Quality gates expose work that was always there.', [
      option('Answer every question', 'Work −6 · trust +6 · bugs −4', 'The answers improve the release.', s => { s.progress -= 6; s.trust += 6; s.bugs -= 4; }),
      option('Wave through the checklist', 'Trust +2 · debt +5 · bugs +4', 'The green boxes are very green.', s => { s.trust += 2; s.debt += 5; s.bugs += 4; }),
      option('Ask for the key risks', 'Work −3 · trust +3 · knowledge +4', 'Four useful questions replace sixteen vague ones.', s => { s.progress -= 3; s.trust += 3; s.knowledge += 4; })
    ]),
  event('burnout', 2, 'The hero needs a weekend', 'handoff',
    'The person holding the release together has been on call for too long. The sprint board has no rest column.',
    'A team is a renewable resource only if it can recover.', [
      option('Share the load', 'Morale +8 · knowledge +4 · work −4', 'The pager gets more than one owner.', s => { s.morale += 8; s.knowledge += 4; s.progress -= 4; }),
      option('Praise the hero', 'Work +7 · morale −9 · bugs +3', 'An award appears. The pager remains.', s => { s.progress += 7; s.morale -= 9; s.bugs += 3; }),
      option('Bring in relief', 'Budget −3 · morale +5 · focus +1', 'A short rotation buys a real weekend.', s => { s.budget -= 3; s.morale += 5; s.focus += 1; }, { budget: 3 })
    ]),
  event('release', 2, 'Release candidate', 'architect',
    'The last day arrives. Freeze the code for a careful release, or squeeze in one last visible feature?',
    'A project is finished when it works for its users.', [
      option('Freeze and verify', 'QA power +2 today · trust +2', 'The final build survives its own demo.', s => { s.qaBoost = 2; s.trust += 2; }),
      option('One last feature', 'Scope +15 · work +8 · debt +4 · trust +5', 'The release notes grow at the last minute.', s => { s.scope += 15; s.progress += 8; s.debt += 4; s.trust += 5; }),
      option('Cut a narrow release', 'Scope −12 · trust −5 · bugs −3', 'The smallest useful version goes out.', s => { s.scope -= 12; s.trust -= 5; s.bugs -= 3; })
    ])
];
const eventById = Object.fromEntries(EVENTS.map(ev => [ev.id, ev]));
export function currentEvent(s) { return eventById[s.schedule[s.day - 1]]; }
export function currentTwist(s) { return twistById[s.twists[s.day - 1]]; }

function seeded(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ x >>> 15, x | 1);
    x ^= x + Math.imul(x ^ x >>> 7, x | 61);
    return ((x ^ x >>> 14) >>> 0) / 4294967296;
  };
}
function shuffle(values, random) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function randomSeed() {
  if (globalThis.crypto?.getRandomValues) return globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor(Math.random() * 4294967296);
}
export function newGame(seed = randomSeed()) {
  seed = Number(seed) >>> 0;
  const random = seeded(seed);
  const schedule = [
    ...shuffle(EVENTS.filter(ev => ev.phase === 0).map(ev => ev.id), random).slice(0, 4),
    ...shuffle(EVENTS.filter(ev => ev.phase === 1).map(ev => ev.id), random).slice(0, 4),
    ...shuffle(EVENTS.filter(ev => ev.phase === 2 && ev.id !== 'release').map(ev => ev.id), random).slice(0, 3),
    'release'
  ];
  const twists = Array.from({ length: DAYS }, () => TWISTS[Math.floor(random() * TWISTS.length)].id);
  const drops = { 4: ITEMS[Math.floor(random() * ITEMS.length)].id, 8: ITEMS[Math.floor(random() * ITEMS.length)].id };
  return {
    mode: 'intro', seed, day: 1, maxDays: DAYS, phase: 0, schedule, twists, drops,
    team: 5, alloc: { build: 3, sync: 1, qa: 1 }, chosen: -1, action: 'none', itemIndex: -1,
    progress: 0, scope: 300, bugs: 3, debt: 2, morale: 72,
    integrity: 60, knowledge: 20, trust: 65, automation: 0,
    budget: 12, focus: 3, inventory: ['duck'], itemsUsed: 0, actionsUsed: 0,
    onboarding: 0, async: 0, meetingTax: 0, qaBoost: 0, workMod: 0,
    report: 'Choose a response. An action and a tool are optional.',
    last: null, ending: '', milestones: []
  };
}
export function assigned(s) { return s.alloc.build + s.alloc.sync + s.alloc.qa; }
export function assign(s, role, delta) {
  if (s.mode !== 'play' || !Object.hasOwn(s.alloc, role)) return;
  if (delta > 0 && assigned(s) < s.team) s.alloc[role]++;
  if (delta < 0 && s.alloc[role] > 0) s.alloc[role]--;
}
export function canOption(s, index, actionId = s.action) {
  const selected = currentEvent(s).options[index], action = actionById[actionId];
  return !!selected && !!action && s.focus >= (selected.cost.focus || 0) + action.focus && s.budget >= (selected.cost.budget || 0) + action.budget;
}
export function choose(s, index) {
  if (s.mode === 'play' && Number.isInteger(index) && canOption(s, index)) s.chosen = index;
}
export function canAction(s, id) {
  const action = actionById[id];
  return !!action && s.focus >= action.focus && s.budget >= action.budget && (id !== 'rig' || s.automation < 3);
}
export function chooseAction(s, id) {
  if (s.mode !== 'play' || !canAction(s, id)) return;
  s.action = id;
  if (s.chosen >= 0 && !canOption(s, s.chosen)) s.chosen = -1;
}
export function chooseItem(s, index) {
  if (s.mode !== 'play') return;
  if (index === -1 || (Number.isInteger(index) && index >= 0 && index < s.inventory.length)) s.itemIndex = index;
}
export function ready(s) { return s.mode === 'play' && s.chosen >= 0 && canOption(s, s.chosen) && assigned(s) === s.team && canAction(s, s.action); }

function capStats(s) {
  s.progress = Math.max(0, s.progress);
  s.scope = Math.max(1, s.scope);
  s.bugs = Math.max(0, s.bugs);
  s.debt = clamp(s.debt, 0, 100);
  s.morale = clamp(s.morale, 0, 100);
  s.integrity = clamp(s.integrity, 0, 100);
  s.knowledge = clamp(s.knowledge, 0, 100);
  s.trust = clamp(s.trust, 0, 100);
  s.budget = clamp(s.budget, 0, 20);
  s.focus = clamp(s.focus, 0, 5);
  s.automation = clamp(s.automation, 0, 3);
  s.async = clamp(s.async, 0, 3);
}
function processDay(s) {
  const before = { progress: s.progress, bugs: s.bugs, debt: s.debt };
  const ev = currentEvent(s), selected = ev.options[s.chosen];
  const action = actionById[s.action];
  const twist = currentTwist(s);
  action.effect(s);
  if (action.id !== 'none') s.actionsUsed++;
  s.focus -= action.focus;
  s.budget -= action.budget;
  selected.effect(s);
  let usedItem = '';
  if (s.itemIndex >= 0 && s.itemIndex < s.inventory.length) {
    const [id] = s.inventory.splice(s.itemIndex, 1);
    itemById[id].effect(s);
    usedItem = itemById[id].name;
    s.itemsUsed++;
  }
  twist.effect(s);
  capStats(s);
  const pairs = s.team * (s.team - 1) / 2;
  const capacity = s.alloc.sync * (6 + s.knowledge / 25 + s.async * 3);
  const handoffs = Math.max(0, pairs - capacity);
  const onboardingCost = s.onboarding > 0 ? 16 : 0;
  const base = s.alloc.build * (7 + s.integrity / 50 + s.knowledge / 80 + s.morale / 120);
  const gain = Math.max(0, Math.round(base - handoffs * .65 - s.debt * .28 - onboardingCost - s.meetingTax + s.workMod));
  const bugs = Math.round(s.alloc.build * (1.5 + s.debt / 50) + handoffs * .22 - s.alloc.qa * (3.6 + s.automation * 1.7 + s.qaBoost) - s.integrity / 80);
  const debt = Math.round(s.alloc.build * .9 - s.alloc.qa * 1.25 - s.integrity / 100 - s.automation * .5);
  const knowledge = Math.round(s.alloc.sync * (2 + s.async) - (s.onboarding > 0 ? 2 : 0));
  s.progress += gain;
  s.bugs += bugs;
  s.debt += debt;
  s.knowledge += knowledge;
  s.morale += gain >= 20 ? 1 : -2;
  if (s.bugs > 18) s.morale -= 3;
  if (s.trust < 30) s.morale -= 2;
  s.focus += 1;
  s.budget += 1;
  s.onboarding = Math.max(0, s.onboarding - 1);
  s.meetingTax = 0;
  s.qaBoost = 0;
  s.workMod = 0;
  capStats(s);
  let milestone = '', delivery = '';
  if (MILESTONES[s.day]) {
    const target = MILESTONES[s.day];
    if (s.progress >= target) { s.trust = clamp(s.trust + 4, 0, 100); milestone = `Milestone met (${target}): trust +4.`; }
    else { s.trust = clamp(s.trust - 12, 0, 100); s.morale = clamp(s.morale - 6, 0, 100); milestone = `Milestone missed (${target}): trust −12, morale −6.`; }
    s.milestones.push({ day: s.day, target, met: s.progress >= target });
    const id = s.drops[s.day];
    if (gainItem(s, id)) delivery = `Care package: ${itemById[id].name}.`;
    else delivery = 'Care package returned: toolbox full.';
  }
  return {
    gain, bugs, debt, knowledge, handoffs: Math.round(handoffs),
    netWork: s.progress - before.progress, netBugs: s.bugs - before.bugs, netDebt: s.debt - before.debt,
    option: selected.label, note: selected.note, action: action.name, twist: twist.name, usedItem, milestone, delivery
  };
}
export function forecast(s) {
  if (!ready(s)) return null;
  const copy = { ...s, alloc: { ...s.alloc }, inventory: [...s.inventory], milestones: [...s.milestones] };
  const result = processDay(copy);
  return { ...result, progress: copy.progress, scope: copy.scope, totalBugs: copy.bugs, totalDebt: copy.debt, morale: copy.morale, trust: copy.trust, budget: copy.budget, focus: copy.focus, inventory: copy.inventory };
}
export function endDay(s) {
  if (!ready(s)) return false;
  const result = processDay(s);
  s.last = result;
  s.report = `${result.note} Work ${result.netWork >= 0 ? '+' : ''}${result.netWork}; bugs ${result.netBugs >= 0 ? '+' : ''}${result.netBugs}. ${result.milestone} ${result.delivery}`.trim();
  if (s.day === DAYS || s.morale <= 0 || s.trust <= 0) {
    s.mode = 'end';
    s.ending = s.progress >= s.scope && s.bugs <= 18 && s.trust >= 30 && s.morale > 0 ? 'win' : 'lose';
  } else {
    s.day++;
    s.phase = Math.floor((s.day - 1) / 4);
    s.chosen = -1;
    s.action = 'none';
    s.itemIndex = -1;
  }
  return true;
}
