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

Play up to five cards from your hand against the selected foe. Cards cost skill points (SP); SP refreshes each turn. Playing support skills builds up to three Flow, adding two damage per Flow to attacks that turn. Enemy intents show their next action, including multi-hit attacks, SP tax, and splitting, so Block, Weak, Vulnerable, and Burnout matter. Click an enemy to target it, and end your turn to let enemies act. You can use one single-use tool per turn. Trinkets are different: up to two equipped trinkets each activate once per fight and refresh in the next battle. Elite fights can award a trinket. Relics are permanent passive effects. Defeating a regular encounter offers a new skill or healing; defeating a boss offers a relic or healing. Health, credits, deck, tools, trinkets, and relics carry through the run. Reaching zero health ends it.

The combat jokes draw on Brooks's themes: scope creep, coordination overhead, integration trouble, technical debt, conceptual integrity, and the seductive silver bullet.

Every skill card has illustrated artwork in combat, the Night Market, and reward choices. Eight generated scenes cover related skill families; the card name, cost, and effect remain live game text. The exact art prompts are in `public/assets/cards/prompts.md`.

## Controls

| Input | Action |
| --- | --- |
| Click or tap | Choose a role, route, event response, purchase, reward, enemy target, card, or tool |
| Enter | Start from the title screen or leave the shop for battle |
| 1–3 | Choose a role, route, event response, or reward |
| 1–5 | Play a card in combat |
| 1–6 | Buy a numbered shop offer |
| Tab | Cycle enemy targets |
| Q / W / E | Use the corresponding carried tool |
| Z / X | Activate an equipped trinket once per battle |
| C | Open or close the loadout view |
| Space | End the combat turn |
| F | Toggle fullscreen |
| R | Start another run from the ending screen |

## Checks

```powershell
npm run build
node test-actions/battle-balance.mjs
node test-actions/maturity.mjs
node test-actions/smoke.mjs
node test-actions/pages-preview.mjs
```

Run the Vite server before the browser smoke check. The balance script samples deterministic seeds with a simple automated policy; its win count is not a player win-rate estimate. The previous daily decision game remains in `src/day-game.js` and `src/day-main.js` as an inactive reference. Generated artwork and its exact prompts are in `public/assets/`.

Pushing to `main` builds and publishes `dist/` through the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`. The Pages preview check serves the production build under the repository subpath and confirms the generated artwork loads.
