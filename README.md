# How this project was built with Claude

A log of the instructions used to build **Game 15** from scratch, as a reference for building similar projects with Claude Code.

---

## Environment setup

- Install Node.js package manager via apt:
  ```
  sudo apt install npm
  ```
- Install `nvm` (Node Version Manager) to get a modern Node.js, because the system npm/node was too old for current Vite:
  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
  nvm install --lts
  ```

---

## Project initialization

- Create a new React + TypeScript project using Vite in the current directory:
  ```
  npm create vite@latest . -- --template react-ts
  ```
- Install BlueprintJS UI library along with its required peer packages. Note: BlueprintJS v6 requires React 18, so downgrade from the React 19 that Vite scaffolds by default — edit `package.json` to set `react`, `react-dom`, `@types/react`, and `@types/react-dom` all to `^18.3.1`, then reinstall:
  ```
  npm install
  npm install @blueprintjs/core @blueprintjs/icons normalize.css
  ```
- Import BlueprintJS CSS in `src/main.tsx` in the correct order:
  ```ts
  import 'normalize.css'
  import '@blueprintjs/icons/lib/css/blueprint-icons.css'
  import '@blueprintjs/core/lib/css/blueprint.css'
  ```

---

## Feature instructions

1. Create a button to start a new game that opens a dialog asking for player names and a color chooser. Pre-fill the name fields with something funny, related to K-pop / Stray Kids.

2. In the game mode, display 9 cubes. Paint them in a cartoonish 3D view using pastel colors ranging from red (cube 1) to blue (cube 9). Each cube is labeled with its number.

3. Players take turns picking cubes from the common pile. Once picked, the cube appears in that player's list, sorted by increasing value. After each pick it becomes the other player's turn.

4. A player wins when any subset of exactly 3 cubes they own adds up to 15. If all cubes are taken and neither player has won, the game is a draw. Show a result banner when the game ends; highlight the three winning cubes in the winner's hand.

5. Add a `?` button that is always visible on screen (fixed, bottom-right corner). When clicked, it shows a popup card with the game rules summarized. The rules must clarify that only 3 cubes out of however many the player owns need to sum to 15. Include a secondary note mentioning the magic-square Tic-Tac-Toe equivalence.

6. Make the help popup centered on the screen — both horizontally centered and positioned 20% from the top of the viewport. (Fix: the `pop-in` CSS animation was overriding `translateX(-50%)`; the keyframes must include `translateX(-50%)` in both `from` and `to`.)

7. Make the help popup 25% wider.

8. In the Tic-Tac-Toe note, add a "Magic trick" button that opens a second popup with a full explanation of how to use the magic square to build a winning strategy, including the 3×3 grid rendered with the same pastel cube colors.

9. Make the "Magic trick" button look like a plain text link (underlined, no button chrome) rather than a UI button.

---

## Key implementation notes

- The 8 winning triplets from 1–9 that sum to 15 are exactly the 8 lines of the 3×3 magic square: rows, columns, and diagonals of `[[2,7,6],[9,5,1],[4,3,8]]`.
- Cube 3D appearance is pure SVG with three faces (front, top, right side) using cabinet projection. Colors are computed as `hsl(hue, 62%, 76%)` where hue steps from 0° (red) to 240° (blue) across tiles 1–9.
- Blueprint `Overlay2` wraps content in a `div.bp5-overlay-content` that does not fill the viewport. Work around this by positioning the card itself with `position: fixed` rather than relying on flex centering of the overlay container.
- Blueprint v6 deprecates `minimal` and `small` boolean props on `Button` in favor of `variant="minimal"` and `size="small"`.
