# Deadline Disaster: Crisis Run

A satirical turn-based roguelike battle game inspired by the ideas in Frederick P. Brooks Jr.'s *The Mythical Man-Month*. Fight software project crises with a growing deck of skills. Each run has three acts, nine encounters, and three bosses: the Budget Goblin, Merge Kraken, and Deadline Dragon.

The game is a canvas-based Vite app. It has no maze or movement controls.

**Play online:** [Deadline Disaster on GitHub Pages](https://willtran87.github.io/project-mythical-man-month/)

## Play

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Add `?seed=42` to replay a particular run's route offers, shuffled hands, and rewards.

Choose an Architect, Debugger, or Producer loadout, then choose a route. Standard and risky routes lead directly into combat; the third route leads through a story event or shop before a reinforced foe. Events offer bargains with health, credits, deck size, tools, and trinkets. The Night Archivist sells skills, tools, trinkets, relics, healing, and removal of basic cards. Fights award credits, with higher payouts on risky routes and bosses; avoiding all enemy damage earns a five-credit bonus.

Play up to five cards from your hand against the selected foe. Cards cost skill points (SP); SP refreshes each turn. Playing support skills builds up to three Flow, adding two damage per Flow to attacks that turn. Each lead has eight exclusive skills, a signature starting deck, and a once-per-fight ability: Architect banks Block, Debugger exposes a target, and Producer borrows SP at the cost of Burnout. The new Mark effect adds four damage to the next attack on that foe and spends one stack; Exploit Path can spend the whole stack at once. Role-specific relics reinforce these play styles. Enemy intents show their next action, including multi-hit attacks, SP tax, splitting, Block shredding, and Burnout audits. Click an enemy to target it, and end your turn to let enemies act. You can use one single-use tool per turn. Trinkets are different: up to two equipped trinkets each activate once per fight and refresh in the next battle. Elite fights can award a trinket. Relics are permanent passive effects. After a fight, choose a role skill, a build-aware skill, healing, or a workshop visit to upgrade one card or remove a basic card. Bosses offer relics in place of cards. Health, credits, deck, tools, trinkets, and relics carry through the run. Reaching zero health ends it.

Skills show a rarity tier and a 1–5 Power rating. Power estimates a card's baseline impact; combinations can outperform that rating. Rarity changes offer frequency across acts: common/uncommon/rare odds are 55/35/10% in Requirements, 40/40/20% in Integration, and 25/40/35% in Release. Offers favor skills not yet in your deck within the rolled rarity tier. The second battle reward and shop skill offers also favor card families that match your deck, lead, and relics; the reward labels show when a card fits the build. Shop skill prices are 17/25/37 credits by rarity. Upgrading a card raises its displayed Power by one, up to five, alongside the existing damage or Block improvement.

The combat jokes draw on Brooks's themes: scope creep, coordination overhead, integration trouble, technical debt, conceptual integrity, and the seductive silver bullet.

Story detours have event-specific illustrations, and both run endings have dedicated art. The exact prompts for the new scenes are in `public/assets/story/prompts.md`.

All relics and trinkets have individual collectible art in rewards, shops, the combat bar, and the loadout view. The three playable leads have separate portraits; each act and boss has its own backdrop. Combat uses labeled status badges, Flow markers, and short action pulses, with pulses disabled for reduced-motion settings. The collectible, role, and backdrop prompts are in `public/assets/collectibles-and-scenes-prompts.md`.

Route cards use separate visual treatments for steady fights, risky fights, story detours, market stops, and bosses, with clear consequence labels. Skill cards have larger hover and tap-to-inspect views; rare rewards and relics receive special frames and an acquisition toast. The title has a dedicated project-crisis illustration, and the Night Market has illustrated healing and card-retirement services. Combat uses a duel sigil, a larger boss presentation, and short action bursts; the Playbook displays card art and collectible slots. These effects respect reduced-motion settings. The three new illustration prompts are in `public/assets/ui/aesthetic-pass-prompts.md`.

Every skill card has illustrated artwork in combat, the Night Market, and reward choices. Eight original scenes, six earlier role scenes, six rarity expansion scenes, and nine new scenes cover related skill families; the card name, cost, rarity, Power, and effect remain live game text. The role relics and enemies have their own art. Prompts are in `public/assets/cards/prompts.md`, `public/assets/role-expansion-prompts.md`, `public/assets/rarity-expansion-prompts.md`, and `public/assets/build-expansion-prompts.md`.

## Controls

| Input | Action |
| --- | --- |
| Click or tap | Choose a role, route, event response, purchase, reward, enemy target, card, or tool |
| Enter | Start from the title screen or leave the shop for battle |
| 1–3 | Choose a role, route, event response, or workshop choice |
| 1–4 | Choose a battle reward |
| 1–5 | Play a card in combat |
| Hover a card or tap its lens | Preview its art and full effect |
| Shift+1–5 | Inspect a hand card |
| Enter / Escape in card preview | Play the inspected card / close the preview |
| 1–6 | Buy a numbered shop offer |
| Tab | Cycle enemy targets |
| Q / W / E | Use the corresponding carried tool |
| Z / X | Activate an equipped trinket once per battle |
| A | Use your role ability once per battle |
| Escape | Return from the workshop to rewards |
| C | Open or close the loadout view |
| Space | End the combat turn |
| F | Toggle fullscreen |
| R | Start another run from the ending screen |

## Checks

```powershell
npm run build
node test-actions/battle-balance.mjs
node test-actions/maturity.mjs
node test-actions/role-depth.mjs
node test-actions/build-depth.mjs
node test-actions/rarity-depth.mjs
node test-actions/rarity-visual.mjs
node test-actions/smoke.mjs
node test-actions/pages-preview.mjs
```

Run the Vite server before the browser smoke check. The balance script samples deterministic seeds with a simple automated policy; its win count is not a player win-rate estimate. The previous daily decision game remains in `src/day-game.js` and `src/day-main.js` as an inactive reference. Generated artwork and its exact prompts are in `public/assets/`.

Pushing to `main` builds and publishes `dist/` through the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`. The Pages preview check serves the production build under the repository subpath and confirms the generated artwork loads.
