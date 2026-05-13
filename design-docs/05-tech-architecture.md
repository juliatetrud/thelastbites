# Tech Architecture

How the prototype is built and how to extend it.

---

## Core Stack

- **Single HTML file** containing CSS, JS, and HTML
- **Vanilla JavaScript.** No frameworks, no build step, no dependencies (other than two Google Fonts).
- **HTML5 Canvas** for rendering.
- **Internal resolution: 320×180 pixels,** scaled up to fit the viewport with `image-rendering: pixelated` for crisp pixel art.
- **No external libraries** at the moment. If we need them later (e.g., a sound library), they should be CDN-loaded so the project stays single-file.

This stack was chosen because:
- It's trivially embeddable on any website (drop the HTML in an iframe or paste it into a page).
- It has no build step — open in browser, it works.
- It's easy for Claude Code to extend.
- It works on mobile and desktop with the same code.

---

## File Structure (current)

The whole game is in one file: `cabin646.html` (the prototype).

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

Use `localStorage`:
```javascript
function save() {
  localStorage.setItem('lastbites-save', JSON.stringify({
    chapter: currentChapter,
    room: currentRoom,
    abilities: pip.abilities,
    journal: journalEntries,
    pairedMemories: pairedMemoryInventory,  // Ch5+ — for the climax
    flags: storyFlags,
  }));
}

function load() {
  const data = JSON.parse(localStorage.getItem('lastbites-save') || 'null');
  if (data) { /* restore state */ }
}
```

Auto-save when:
- Entering a new room
- Completing a puzzle
- Triggering a cinematic
- Unlocking an ability
- Adding to the paired-memory inventory (Ch5+)

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
