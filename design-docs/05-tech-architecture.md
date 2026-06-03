# Tech Architecture

How the prototype is built and how to extend it.

---

## Core Stack

- **Single HTML file** containing CSS, JS, and HTML
- **Vanilla JavaScript.** No frameworks, no build step, no dependencies (other than two Google Fonts).
- **HTML5 Canvas** for rendering.
- **Internal resolution: 480×270 pixels,** scaled up to fit the viewport with `image-rendering: pixelated` for crisp pixel art. *(Bumped from 320×180 in Sprint 01 — see `06-roadmap-and-open-questions.md` §Decisions Log 2026-05-07.)*
- **No external libraries** at the moment. If we need them later (e.g., a sound library), they should be CDN-loaded so the project stays single-file.

This stack was chosen because:
- It's trivially embeddable on any website (drop the HTML in an iframe or paste it into a page).
- It has no build step — open in browser, it works.
- It's easy for Claude Code to extend.
- It works on mobile and desktop with the same code.

---

## File Structure (current)

The whole game is in one file: `game/index.html`. The prototype (`prototype/three-doors-demo.html`) is reference only — do not edit it.

When the project grows, the recommended structure is:

```
last-bites/
├── index.html             # main entry point
├── css/
│   └── style.css          # extracted styles
├── js/
│   ├── main.js            # game loop, input handling
│   ├── dialogue.js        # dialogue system
│   ├── cinematics.js      # cinematic registry and renderers
│   ├── rooms/
│   │   ├── cabin646.js
│   │   ├── hallway.js
│   │   ├── grandparents.js
│   │   ├── radio-room.js
│   │   ├── stairwell.js
│   │   └── kitchen.js
│   ├── pip.js             # player sprite and abilities
│   ├── inspect.js         # inspection logic
│   ├── journal.js         # journal system (including paired-memory inventory from Ch5+)
│   └── save.js            # localStorage save/load
├── art/
│   ├── cinematics/
│   │   ├── wakeup.png
│   │   ├── mirror.png
│   │   ├── grandparents.png
│   │   ├── kitchen.png
│   │   ├── henrik-sits.png
│   │   ├── first-taste-gravlaks.png   # 6a
│   │   ├── first-taste-lefse.png      # 6b
│   │   ├── dock.png
│   │   └── henriks-offer.png
│   ├── rooms/
│   │   └── ... background images
│   └── sprites/
│       ├── pip.png
│       └── ... NPCs
└── design-docs/
    ├── README.md
    ├── 01-story-bible.md
    ├── 02-game-design.md
    ├── 03-art-and-aesthetic.md
    ├── 04-chapter-01-cabin-646.md
    ├── 05-tech-architecture.md
    └── 06-roadmap-and-open-questions.md
```

For embedding on a recipe site, the final build can still concatenate to a single file if needed.

---

## The Prototype's Key Systems

### Display Pipeline
- One `<canvas>` for room/gameplay rendering
- One overlaid `<canvas>` for cinematic mode
- HTML overlays for dialogue, hints, controls, title screen
- CSS handles letterboxing/aspect-ratio (`16:9`)
- A film-grain CSS overlay sits on top of everything

### Scaling strategy and what we deliberately do not do

**Letterbox-only, capped at 3× internal resolution.** The `#game` element is sized by CSS to the largest 16:9 box that fits inside the viewport, with a hard cap at 1440×810 (3× internal resolution of 480×270). It never scales beyond that. On smaller displays the aspect-ratio math wins; on larger displays the cap wins.

**No DPR scaling.** We do not multiply by `devicePixelRatio`. The canvas renders at 480×270 physical pixels regardless of display DPI. Chunky pixels are the aesthetic; sub-pixel softening would fight it.

**`image-rendering: pixelated`.** CSS ensures the pixel art scales with hard edges, no interpolation. Firefox requires `crisp-edges` as an alias.

**Decorative padding-fx surround.** Whenever padding is visible — fullscreen on a display larger than 1440×810, or windowed at an off-aspect-ratio size — a `#padding-fx` layer renders behind `#game` with: extended film grain matching the game's grain pattern (same SVG noise, same opacity, same `grain-shift` animation), ~40 cold-white twinkling stars at fixed positions, and ~20 warm-amber drifting fireflies with occasional glow pulses. This is the project's standard surround treatment for all padding states. Stars sit at fixed positions and twinkle; fireflies drift via compounded sine motion and pulse occasionally. Fireflies are softly culled when they drift over the game area.

**Unified viewport vignette.** The vignette darkens the outer edges of the *full viewport*, not just the game area, so the boundary between game and padding reads as one continuous darkening rather than a hard seam. Both `#grain` (inside `#game`) and `#padding-fx` use the same radial-gradient: `ellipse 100vw 100vh` centered at the viewport center, `transparent 30%` to `rgba(0,0,0,0.85) 100%`. Because the gradient is identical on both sides of the game/padding boundary, no seam is visible.

**F-key fullscreen toggle.** Pressing F calls `#game-wrap.requestFullscreen()`. Pressing F again or Escape exits fullscreen. The fullscreen hint in the controls strip updates accordingly. The hint is omitted during dialogue and cinematics to avoid cluttering context-specific keys. M key toggles music at any time (undocumented quality-of-life shortcut). The music toggle button lives inside `#game-wrap` so it remains visible in fullscreen.

### Game Loop
Standard `requestAnimationFrame` loop. Each frame:
1. Calculate `dt` since last frame
2. If player can move and no dialogue is active, apply input to Pip's position
3. Update bobbing animation
4. Update dialogue typing animation
5. Draw the room (or cinematic if active)
6. Draw Pip
7. Draw foreground shadow gradient

### Input
- `keydown` and `keyup` listeners track held keys for movement
- `keydown` for one-shot actions (inspect, advance dialogue)
- Supports arrows, WASD, and click-to-advance

### Dialogue System
- Lines are queued in an array
- Each line has `{ speaker, text }`
- Typewriter effect (~28ms per character)
- Press space to skip typing or advance to next line
- Optional `onEnd` callback runs when queue empties

### Cinematic System
- Triggered by `showCinematic(name, lines, onEnd)`
- Fades in a separate canvas overlay
- Calls a draw function for the named cinematic (procedural placeholder, will be replaced with image draw calls)
- Plays the dialogue queue
- Fades out and returns control

### Inspection System
- Each room has an array of objects: `{ id, x, lines, triggerCinematic, inspected }`
- When Pip is within 18 pixels of an object's x position, a sparkle is drawn and inspection is enabled
- Pressing up triggers either dialogue or a cinematic based on the object's properties

### Sprite Rig (Pip and all characters)
Character sprites are rendered as a **stack of independent layers**, drawn back to front in the same `requestAnimationFrame` pass. Each layer is its own draw call (procedurally drawn for placeholders, switched to image draws when art is commissioned).

Pip's rig has three layers:
- **Body** — silhouette, hair, apron, glow. Driven by movement state (idle bob, walk frame, float pose).
- **Eyes** — two eye-dots. Driven by an eye-state object: `{ openness, scaleX, scaleY, offsetX, offsetY }`. Enables blinks, widening, side-glances, and held-stare moments.
- **Mouth** — small mouth-shape. Driven by a mouth-state object: `{ shape, openness, offsetX, offsetY }`. Enables small smiles, gasps, neutral, etc. Used sparingly — most of the time the mouth is a single neutral pixel.

Each layer maintains its own animation timeline. Blinks happen on a randomized 3–6 second cadence by default; specific story beats override (the mirror cinematic should freeze the blink, taste-memory should hold the eyes wide, etc.).

**Direction (facing).** Sprites face the direction of movement. Flip is performed at draw time:

```javascript
ctx.save();
if (pip.facing === 'left') {
  ctx.translate(pip.x + spriteWidth, pip.y);
  ctx.scale(-1, 1);
} else {
  ctx.translate(pip.x, pip.y);
}
drawPipBody();
drawPipEyes();
drawPipMouth();
ctx.restore();
```

No separate left/right sprite art needed. This rule applies to every character whose silhouette has no asymmetric tells.

**Why this matters.** Most of the game's emotional bandwidth from sprites lives in the eyes and the mouth — Pip widening his eyes at the mirror, his small smile when tasting Henrik's gravlaks, his eyes filling with the held-still grief on the dock. Treating those layers as independent rigs gives every future cinematic and gameplay beat the room to do that work without a new sprite commission. Same pattern extends to NPCs (Henrik's weary patience in the eyes, Marta's grief in the mouth).

---

## How to Add a New Room

When adding (e.g.) the hallway:

1. **Define the room data:**
   ```javascript
   const hallwayObjects = [
     { id: 'bulletin', x: 30, lines: [...] },     // Mnemosyne reinforcement
     { id: 'luggage', x: 60, lines: [...] },
     { id: 'sconce', x: 140, lines: [...] },
     { id: 'grandparents-door', x: 240, triggerCinematic: 'grandparents' },
   ];
   ```

2. **Write the room's draw function:** `drawHallway(now)` — draws the background, walls, lighting, props.

3. **Add a room manager** that switches between rooms based on Pip's position (when he reaches the right edge of the cabin, swap to the hallway).

4. **Add the cinematic** (if any) to the cinematic registry.

5. **Update the journal** when story beats are completed.

The existing prototype's structure makes each of these straightforward.

---

## How to Add a Cinematic

1. Define a draw function: `drawGrandparentsCinematic()` that draws the static scene to `cineCtx`.
2. Add it to `drawCinematic(name)`'s switch statement.
3. Trigger it from a story beat: `showCinematic('grandparents', [...lines], onEnd)`.
4. Later, when commissioned art arrives:
   ```javascript
   const grandparentsImg = new Image();
   grandparentsImg.src = 'art/cinematics/grandparents.png';
   function drawGrandparentsCinematic() {
     cineCtx.drawImage(grandparentsImg, 0, 0, W, H);
   }
   ```

---

## How to Add an Ability

1. Add the ability to Pip's state object:
   ```javascript
   pip.abilities = {
     walkThroughWalls: false,
     radio: false,
     electricity: false,
     tasteMemory: false,
     possessSmallObjects: false,
     memoryGifting: false,    // earned Ch5 from Iris
     hearTheSea: false,
     beSeenByGrieving: false,
     crossWater: false
   };
   ```
2. Trigger the ability unlock at the right story beat:
   ```javascript
   pip.abilities.walkThroughWalls = true;
   updateJournal('I can pass through wood. Not metal — that still feels solid.');
   ```
3. Use the ability as a puzzle gate:
   ```javascript
   if (puzzle === 'sconce' && pip.abilities.electricity) { ... }
   ```

---

## Saving and Loading

**Shipped Sprint 17. This section reflects the implementation as of 2026-05-17.**

Single auto-save slot in `localStorage` under the key `tlb-save-v1`. The doc's earlier `lastbites-save` key is superseded.

### Key and schema

```javascript
const SAVE_KEY     = 'tlb-save-v1';
const SAVE_VERSION = 1;

// Save shape (v1)
{
  version:         1,
  savedAt:         "<ISO timestamp>",
  currentRoom:     "hallway" | "cabin" | "grandparents",
  pip: {
    x:             <number>,
    facing:        "left" | "right",
    stomachValue:  <number 0–100>,
    floatUnlocked: <boolean>,
  },
  cabinState:      { bedRevealed, beatStage, mirrorRevealed, doctorSeen },
  chapterState:    { openingPlayed },
  cinematicPlayed: [<array of cinematic name strings>],
  passenger:       { thoughtBeatFired: <boolean> },
  notebookItems:   [{ id, name, annotation, kind, sprite }],
}
```

Paired-memory inventory and port history (Ch5+) are not yet persisted — fields will be added in a future sprint.

### Save-at-exit principle

Saves fire at the **end** of a beat, never at the start. A returning player never re-watches content they have already seen. Specifically, `autoSave()` is called from:

1. `startTransition()` — after the fade-in completes and `transition.active` is cleared
2. `startCinematicFadeOut()` — inside the 600ms callback, after `onEnd()` fires
3. `pickupCollectible()` — inside the tween `onComplete`, after the notebook pulse
4. Opening narration `onEnd` callback — after `showHUD()`
5. Blink-back `narrating` phase completion — after `setRoomStrip()`

### Schema version handling

On load, if `data.version !== SAVE_VERSION`, a console warning is logged and the save is treated as non-existent. The orphan data remains in localStorage (for potential future migration). JSON parse failures are caught and treated the same way.

### Incognito / storage disabled

All `localStorage` calls are wrapped in `try/catch`. If storage is unavailable, `autoSave()` silently no-ops and `loadSave()` returns `null`. Game plays normally without persistence.

### Title screen integration

- `initGate()` calls `loadSave()`. A valid save → `titleState.savedGame` is set and the gate auto-dismisses.
- `initTitleScreen()` reads `titleState.savedGame` to switch the menu between 2-item (Play/About) and 3-item (Continue/About/Start over) layouts.
- `startContinueToGameplay()` calls `applySave()` then fades into gameplay at the saved room.
- `Start over` calls `clearSave()` and `startTitleToGameplay()` immediately, no confirmation prompt.

### Pause menu Save and quit

Fourth pause item. Calls `autoSave()` then `window.location.reload()`. Disabled (faint, `pointer-events:none`) when `cinematic.active`, `transition.active`, or `openingSeq.state !== 'complete'` — prevents mid-beat saves that would violate the save-at-exit principle.

---

## Parallax Scenery Engine (Sprint 42)

*(Shipped Sprint 42. The single most-reused visual system in the game — every chapter's windows use it.)*

### Overview

The parallax scenery engine renders ship exterior scenery through every room's windows and portholes. All windows in a room reveal the **same unified scenery state** — the world outside is consistent, not a per-porthole mini-scene.

### Architecture

**`shipTravel` state object** (global, driven by game clock):
- `chapter`: which `SCENERY_SETS` entry to use (e.g. `'ch1-bergen'`)
- `progress`: 0.0–1.0 scroll position within the current state
- `stateIdx`: which state in the set's `states` array is active
- `speed`: progress units per second (slow ambient drift; ~62s per state at default 0.016)

`updateShipTravel(dt)` is called each frame to advance `progress` and transition between states when `progress` reaches 1.0.

**`SCENERY_SETS` registry** (per-chapter swappable data, no engine changes needed):
```javascript
SCENERY_SETS['ch1-bergen'] = {
  states: [
    { id: 'harbor',     label: 'Bergen harbor — at anchor'       },
    { id: 'open-water', label: 'Open water — Mnemosyne underway' },
  ],
  layers: [
    { kind: 'sky-base',         parallaxFactor: 0    },  // static deep sky
    { kind: 'aurora-ch1',       parallaxFactor: 0    },  // faint aurora (static)
    { kind: 'stars-ch1',        parallaxFactor: 0.04 },  // very slow star drift
    { kind: 'fjord-silhouette', parallaxFactor: 0.06 },  // distant mountains, slowest
    { kind: 'midground-bergen', parallaxFactor: 0.16 },  // houses, docks
    { kind: 'water-ch1',        parallaxFactor: 0.32 },  // foreground water, fastest
  ],
};
```

Layers are ordered back-to-front. `parallaxFactor` scales the effective horizontal scroll per W-of-progress. Factor 0 = static; factor 1 = shifts a full canvas width per state.

**Adding a new chapter** = define a new `SCENERY_SETS` entry. No engine code changes.

### Render order (each frame, room mode)

1. `drawSceneryBackground(now)` — renders the full scenery stack to the full canvas (480×270). Room walls will cover most of this; windows will reveal it.
2. `rooms[currentRoom].draw(camX, now)` — draws room interior over the scenery background.
3. For each porthole: `drawSceneryInPorthole(x, y, r, now)` — clips to the circular brass porthole and re-renders the scenery stack inside.
4. For each rectangular window: `drawSceneryInWindow(x, y, w, h, now)` — clips to the rect and re-renders.
5. Porthole brass frames and window frames draw after the clip, on top.
6. Props, Pip, collect auras, etc. draw above everything.

### Window reveal: "cutouts in the wall"

Windows are not independent mini-scenes. They are **cutouts that reveal the same background world**. The scenery renders full-canvas first; the room walls paint over it; porthole/window clip calls re-draw the scenery inside each glass shape. All windows show the same parallax state simultaneously.

### Aurora integration

The Ch1 faint aurora (originally Sprint 35's `aurora-faint` per-porthole layer) is now the `aurora-ch1` layer in the scenery stack. All windows receive it automatically via `_drawSceneryStack`. The `AURORA_GREEN_BASE` / `AURORA_VIOLET_BASE` constants are still used. The observation deck's full aurora (`drawAuroraCurtain`) is a separate dedicated system and is not part of `SCENERY_SETS`.

### State sequencing

Scenery sets define ordered states the ship travels through. `updateShipTravel(dt)` advances `stateIdx` when `progress >= 1.0`. Per-layer rendering can condition on `stateIdx` and `progress` (e.g., the `midground-bergen` layer fades out as the ship leaves harbor). Future port-departure beats will hook into this by adjusting `shipTravel.speed` or triggering a state advance at a story beat.

### Key functions

| Function | Purpose |
|---|---|
| `updateShipTravel(dt)` | Advance progress; transition states |
| `drawSceneryBackground(now)` | Full-canvas back-of-frame draw |
| `_drawSceneryStack(now, cx, cy, cw, ch)` | Draw all layers into a rect (clip set by caller) |
| `_drawSceneryLayer(kind, factor, now, cx, cy, cw, ch)` | Draw one layer inside a rect |
| `drawSceneryInPorthole(x, y, r, now)` | Circular porthole with brass frame + scenery |
| `drawSceneryInWindow(x, y, w, h, now)` | Rectangular window + scenery (frame by caller) |

---

## Performance Notes

- Internal canvas resolution is 320×180 — extremely cheap to render.
- No physics, no complex collision — just position checks.
- Procedural drawing in the prototype is fine, but when you replace with images, drawing is even faster (`drawImage` is GPU-accelerated).
- Animations use `requestAnimationFrame` which throttles to display refresh rate.
- This game can run on a potato. Mobile, low-end laptops, anything.

---

## Embedding on the Recipe Site

When ready to ship:
- The simplest option: an `<iframe src="game/index.html">` on a dedicated page of the recipe site.
- The slightly fancier option: a popup modal that loads the game.
- The most integrated option: build the game directly into the site's pages, sharing the same nav so the journal can deep-link to recipe pages.

Recommend starting with the iframe option for simplicity, then upgrading once the integration with the recipe pages becomes important.

---

## Recipe Site Integration

The journal-to-recipe link is the project's commercial heart. Two integration approaches:

### Approach A: localStorage shared
Game and recipe site live on the same domain. Game writes to localStorage when a recipe is unlocked. Recipe site reads localStorage to show "unlocked" state and allow access.

### Approach B: URL-based unlock
Game completes a chapter → opens a unique URL on the recipe site (e.g., `/recipes/lefse-and-gravlaks?unlocked=ch1abc`). Recipe site validates the unlock token. This works even if the game is on a different domain.

Approach A is simpler. Approach B is more secure but requires backend logic.

For a fun project that doesn't need to actually gate content, **just unlocking the journal entry in-game and letting players visit the recipes whenever they want** is also totally fine. The "unlock" is a narrative reward, not a paywall.
