# Game 15 — Claude Code Project Context

A two-player browser puzzle game built with React, TypeScript, and BlueprintJS.
Players take turns picking numbered cubes from a common pool. First to own any
three cubes that sum to 15 wins. Equivalent to Tic-Tac-Toe on a 3×3 magic square.

---

## Environment

- **Node.js**: managed via `nvm` (v24 LTS). Always source nvm before running npm:
  ```bash
  export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
  ```
- **System npm** (`/usr/bin/npm`) is too old — always use the nvm one.
- **Dev server**: `npm run dev` (Vite, usually port 5173 or 5174 if busy)
- **Build**: `npm run build` — runs `tsc -b` then Vite

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React **18** | Must stay on 18 — BlueprintJS v6 does not support React 19 |
| UI library | BlueprintJS v6 | Import order in `main.tsx` matters (normalize → bp-icons → bp → app CSS) |
| Build tool | Vite 8 | `base: '/game15/'` set in `vite.config.ts` for GitHub Pages subpath |
| Language | TypeScript | `verbatimModuleSyntax` enabled — use `import type` for type-only imports |

---

## Repos & hosting

- **Game repo**: `github.com/IggShaman/game15` — source of truth
- **Hub repo**: `github.com/IggShaman/games-hub` — aggregates all games, deploys to GitHub Pages
- **Live URL**: `https://games.beleberda.com/game15/` (custom domain on games-hub)
- **games-hub pages branch**: `gh-pages` — each game lives in its own subfolder (`game15/`, etc.)

### Deploy flow
1. Push to `main` in game15 → GitHub Actions builds → dispatches `game-updated` event to games-hub
2. games-hub workflow checks out its own `gh-pages` branch, checks out & builds game15, copies `dist/` to `game15/`, pushes
3. GitHub Pages serves `games.beleberda.com`

### Secrets
- `HUB_DISPATCH_TOKEN` — PAT (classic, `repo` scope) stored in **game15** repo secrets.
  Used to trigger `repository_dispatch` on games-hub. Cross-repo — cannot use `GITHUB_TOKEN`.
- games-hub workflow uses its own `GITHUB_TOKEN` (with `contents: write` permission) to push to `gh-pages`.

---

## Source layout

```
src/
  main.tsx                  # Entry point — CSS imports, React root
  App.tsx                   # Top-level state: game, players, turn, outcome
  index.css                 # Global layout, turn indicator, result banner
  App.css                   # (unused scaffold remnant)
  game/
    logic.ts                # findWinningTriplet() — the 8 triplets that sum to 15
  components/
    Cube.tsx                # SVG 3D cube, scale prop, exports CUBE_W/CUBE_H
    GameBoard.tsx           # 3×3 grid, available cubes + dashed placeholders
    NewGameDialog.tsx       # Player name inputs + color swatches, K-pop defaults
    PlayerHand.tsx          # Player's collected cubes, winning tile highlight
    RulesCard.tsx           # ? help popup — rules + link to MagicTrickCard
    MagicTrickCard.tsx      # Magic square explanation popup
  styles/
    GameBoard.css
    PlayerHand.css
    RulesCard.css
    MagicTrickCard.css
```

---

## Game logic

- **Tiles**: 1–9, one common pool (`Set<number>`)
- **Win**: `findWinningTriplet(tiles)` — checks the 8 hardcoded triplets from `src/game/logic.ts`:
  `[1,5,9] [1,6,8] [2,4,9] [2,5,8] [2,6,7] [3,4,8] [3,5,7] [4,5,6]`
- **Draw**: board empty, neither player has a winning triplet
- Win is checked **immediately after each pick** for the player who just picked
- `outcome` in game state is `null | { kind:'win', player, triplet } | { kind:'draw' }`

---

## UI patterns & known gotchas

- **CSS animations + transform centering**: any `@keyframes` that sets `transform` will override
  `translateX(-50%)` centering. Always include the translation in every keyframe:
  ```css
  @keyframes pop-in {
    from { transform: translateX(-50%) scale(0.7); opacity: 0; }
    to   { transform: translateX(-50%) scale(1);   opacity: 1; }
  }
  ```
- **Blueprint `Overlay2` centering**: the `.bp5-overlay-content` wrapper does not fill the viewport.
  Position the card itself with `position: fixed; top: 20%; left: 50%; transform: translateX(-50%)`.
- **Blueprint Button props** (v6): `minimal` → `variant="minimal"`, `small` → `size="small"`.
- **Result banner centering**: needs `align-self: center` because it sits inside a flex column.
- **Cube SVG**: front face at `(0, DY)` to `(W, DY+H)`, top face parallelogram going up-right,
  right face parallelogram going right-down. Cabinet projection: `DX=20, DY=11`.
  Scale via `width/height` props on the `<svg>` element — viewBox stays fixed.
- **Color swatches**: chosen color is disabled in the other player's picker (cross-prop `disabledColor`).

---

## Default player names

Stray Kids puns used as pre-filled names in `NewGameDialog.tsx`:
`Lee Know-it-All`, `Changbin-go!`, `HyunJin Tiles`, `Felix Lucky Draw`,
`Bang Chan-cellor`, `Seungmin-imum Effort`, `I.N-vincible`, `Han-dling It`

---

## Adding a new game to games-hub

1. Add `HUB_DISPATCH_TOKEN` secret to the new game's repo
2. Add the `curl` dispatch step to its deploy workflow (copy from `game15/.github/workflows/deploy.yml`, change the game name)
3. games-hub workflow is already generic — no changes needed there
