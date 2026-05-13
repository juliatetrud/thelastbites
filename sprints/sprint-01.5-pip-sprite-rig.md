# Sprint 01.5: Pip Sprite Rig and Direction-Flip

## Goal

Refactor the placeholder Pip sprite from a single procedurally-drawn shape into a **three-layer rig** (body, eyes, mouth) drawn back to front, with each layer driven by its own state and animation timeline. Add direction-facing — Pip faces the direction of movement, with the flip implemented as a canvas transform.

This is a small, foundational refactor that pays off across every future sprite work. The change is scoped to Pip only in this sprint; the same pattern will extend to NPCs as they're added.

## Definition of done

- Pip's gameplay sprite is rendered as three separate draw passes per frame: body, eyes, mouth (in that back-to-front order)
- Each layer reads from its own state object and can be animated/replaced independently
- Pip's eye state supports at minimum: blinks (~3–6 second randomized cadence), and the *ability* to be widened/scaled/repositioned by future code without re-architecting the rig (the cadence is the only behavior shipped this sprint; the rig flexibility is the structural deliverable)
- Pip's mouth state ships with a single neutral mouth-shape; the rig must support swapping it out for future emotional shapes (small smile, surprised-open) without re-architecting
- Pip faces the direction he's moving. Moving right → faces right. Moving left → faces left. While stationary, he keeps the last-faced direction.
- Direction flip is implemented as a canvas transform (`ctx.scale(-1, 1)` around an appropriate anchor), not by drawing different sprite art
- All three layers flip together cleanly when direction changes (no glitches where eyes face left while body faces right, etc.)
- Idle bob animation still works
- Walk movement still works
- No regression in any Sprint 01 test-checklist item
- No console errors
- No new dependencies

## Context from design docs

### From `03-art-and-aesthetic.md` (newly added section "Sprite-rig layering")

> Pip's gameplay sprite is rendered as a *stack of separately animatable layers* on the canvas, not as a single monolithic image. Three layers, drawn back to front: **body** (silhouette, hair, apron, glow), **eyes** (two eye-dots, positioned and scaled independently of the body), **mouth** (small mouth-shape, positioned independently). Each layer can be replaced or animated on its own timeline. This means Pip can blink without redrawing his apron, can widen his eyes at a horror beat while his body stays still, can break into a small smile during tasting cinematics without a new full-sprite commission.

### From `03-art-and-aesthetic.md` (newly added section "Sprite direction")

> Pip faces the direction he's moving. Flipping is done at draw time via a horizontal scale transform on the canvas (`ctx.scale(-1, 1)` around the sprite's anchor), not via separate left- and right-facing art. Pip's silhouette and apron have no asymmetric details that would suffer from this.

### From `05-tech-architecture.md` (newly added section "Sprite Rig")

> Pip's rig has three layers:
> - **Body** — silhouette, hair, apron, glow. Driven by movement state (idle bob, walk frame, float pose).
> - **Eyes** — two eye-dots. Driven by an eye-state object: `{ openness, scaleX, scaleY, offsetX, offsetY }`. Enables blinks, widening, side-glances, and held-stare moments.
> - **Mouth** — small mouth-shape. Driven by a mouth-state object: `{ shape, openness, offsetX, offsetY }`. Enables small smiles, gasps, neutral, etc. Used sparingly — most of the time the mouth is a single neutral pixel.
>
> Each layer maintains its own animation timeline. Blinks happen on a randomized 3–6 second cadence by default.

### Why this matters (story-side context)

Pip's emotional bandwidth from sprites lives in his eyes and his mouth. Across the game, the player will see Pip widen his eyes at the mirror (Ch1), hold a stare on the dock as his grandparents walk away (Ch1), break into a small smile at his first taste of gravlaks (Ch1), look frozen-still as the Mamlambo's eye fills the porthole (Ch5). All of those land harder if the engine can move eyes and mouth independently of the body. This sprint puts the rig in place; future sprints use it.

## Implementation notes

- **The rig is procedural for now.** Pip is drawn in canvas primitives until commissioned art arrives. The three-layer structure must be authored as if each layer were eventually a separate sprite-sheet — the body draws first as one self-contained function, then the eyes as another, then the mouth as another. When art is commissioned, those three functions get swapped for image-draw calls without changing the rest of the engine.
- **State separation:** the Pip object should hold three sub-states:
  ```javascript
  pip.body  = { facing: 'right', bobPhase: 0, animState: 'idle' };
  pip.eyes  = { openness: 1.0, scaleX: 1.0, scaleY: 1.0, offsetX: 0, offsetY: 0, blinkTimer: 3.2 };
  pip.mouth = { shape: 'neutral', openness: 0.4, offsetX: 0, offsetY: 0 };
  ```
  (Property names are illustrative; pick what reads well.)
- **The blink cadence:** randomized between 3 and 6 seconds. When the timer fires, drive `eyes.openness` down to ~0 over ~80ms, hold for ~60ms, return to 1.0 over ~80ms. Reset the timer to a new random value.
- **The transform-flip:**
  ```javascript
  function drawPip() {
    ctx.save();
    if (pip.body.facing === 'left') {
      ctx.translate(pip.x + spriteWidth, pip.y);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(pip.x, pip.y);
    }
    drawBodyLayer();
    drawEyesLayer();
    drawMouthLayer();
    ctx.restore();
  }
  ```
- **Facing logic:** when horizontal movement input changes the velocity sign, update `pip.body.facing`. When velocity is zero, retain the last facing.
- **Eye placement under flip:** because the entire rig is flipped via `ctx.scale(-1, 1)`, the eyes' local x-coordinates within the sprite stay the same in both directions — the flip handles the mirroring. Don't manually swap left/right eye positions.
- **Don't over-engineer.** The eye and mouth state objects are scaffolding for future expressiveness. Ship the blink behavior and the neutral mouth shape and stop. Future sprints add the situational expressions.

## Files to create or modify

**Modify:**
- `game/index.html` — refactor the existing `drawPip()` (or equivalent) into the three-layer structure, add facing-direction state, add blink cadence

**No new files.**

## Out of scope

This sprint does **not** include:

- Specific emotional expressions for any cinematic (the wide-eyed mirror reaction, the dock-stare, the tasting-smile — those come with their respective cinematic sprints later)
- Walk-cycle frame variation in the body layer (the existing idle bob is enough; full walk cycles come when art is commissioned)
- Any NPC sprite rigging (Henrik, Marta, Jan, etc.) — same pattern will be applied when those NPCs are added in their respective sprints
- Eye-tracking, eye-following-cursor, or any reactive eye behavior beyond blinks
- Mouth animation tied to dialogue (no lip-flap, no typewriter sync)
- Any new sprite art — the procedural placeholder shapes get rearranged, not replaced

## Test checklist

Launch `game/index.html` in a browser and verify each item:

- [ ] Pip is visible and his body, eyes, and mouth are still recognizable shapes
- [ ] Move Pip to the right with `→` or `D`; Pip's body faces right
- [ ] Move Pip to the left with `←` or `A`; Pip's body faces left
- [ ] Stop moving — Pip keeps facing the last direction (does not snap to a default)
- [ ] When facing direction changes, all three layers flip together — no glitch where eyes face one way and body faces another
- [ ] Pip's eyes blink on a randomized cadence (watch for ~30 seconds and confirm blinks occur but not on a fixed metronome)
- [ ] Blinks read smoothly — the eyes close, briefly disappear, and reopen, over roughly 200ms total
- [ ] Pip's idle bob animation still works
- [ ] Pip's mouth is visible (neutral shape) and stays put while body and eyes animate
- [ ] Movement speed unchanged from Sprint 01
- [ ] No console errors on load
- [ ] No console errors during movement, facing changes, or blinks
- [ ] Re-run the Sprint 01 test checklist — every item still passes (room bounds, camera follow, film grain, vignette, font loading, etc.)

## Notes for after completion

When this sprint closes, leave a short note in the issue with:
- A 5-second screen recording or a series of screenshots showing Pip facing right, then left, with a blink visible
- Any open questions about how the rig should be exercised in upcoming sprints (e.g., what should the eyes do during the mirror cinematic — should Sprint 02 specify the wide-eye behavior, or should that wait?)
- Confirmation that the three-layer code organization is clean enough that future sprints can swap in commissioned image art for any one of the three layers without re-architecting
