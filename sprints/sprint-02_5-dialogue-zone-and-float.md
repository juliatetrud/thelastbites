# Sprint 02.5: Dialogue Zone, Float Capability, and Dev Flag

## Goal

Two related fixes layered into one short sprint:

1. **Reposition the floor and Pip so the bottom of the screen is reserved space for the dialogue box and the controls strip.** Currently the dialogue box overlaps Pip. From here forward, the bottom ~30% of the canvas is "UI zone" — the room composition leaves it intentionally clear.
2. **Implement Pip's float capability in the engine, but gate it behind a dev flag.** In production, space-bar still does nothing in room mode (per the locked design — float is discovered at Chapter 1 Beat 8). With `?dev=1` in the URL, float is unlocked for playtesting movement feel. This sprint puts the system in place; the Chapter 1 Beat 8 sprint will later flip the gate from "dev flag" to "story flag."

## Definition of done

### Dialogue zone (room composition)

- The cabin room's floor line is raised so that Pip stands in the **upper two-thirds of the canvas**, with the bottom ~30% of the canvas visually empty of game-world content (no walls, no floor, no objects appearing there)
- When the dialogue box appears at its locked `bottom: 10%` position, it does **not** visually overlap Pip
- When no dialogue is open, the empty bottom band still feels like part of the room — it's the dark area beneath the floor, not a glaring blank rectangle. (Suggested: a subtle vignette-darkened "below-floor" zone, or just deep-cool ambient color filling the band. Pick something quiet.)
- The sparkle indicators for inspectables still align visually with the objects they describe (porthole sparkle still reads as "near the porthole," etc.)
- The controls strip and the dialogue box continue to render correctly with no overlap

### Float capability (engine)

- A `pip.float` state object exists with at minimum: `unlocked` (bool), `altitude` (number, pixels above floor), `rising` (bool), `vy` (vertical velocity for descent)
- When `unlocked === true` and `Space` is held in room mode (no dialogue active), Pip rises smoothly to a maximum altitude of **~36 pixels above the floor** (≈ 1.5 × his sprite height of 24px)
- The rise has gentle ease — not a constant-velocity climb. Suggestion: accelerate from 0 toward a target velocity, decelerate as he approaches max altitude. Final rise duration to top: roughly 500–700ms with the key held.
- Releasing `Space` causes Pip to descend under simulated gravity — not instant teleport. Descent duration from full altitude to floor: roughly 400–600ms.
- While floating, Pip's idle bob continues at its normal amplitude, layered on top of the float altitude
- While floating, Pip can still move horizontally (left/right input still works, floor bounds still apply)
- Pip's underglow ellipse moves with him as he rises — it's part of his sprite, drawn relative to his feet position
- When `unlocked === false`, holding `Space` in room mode does nothing — no altitude change, no animation

### Dev flag

- On page load, the engine parses `window.location.search` for `dev=1`
- If present, `pip.float.unlocked` is set to `true`
- If absent (production default), `pip.float.unlocked` is set to `false`
- No UI indication that dev mode is active — silent flag; the only outward sign is that float works
- *(Optional, low-cost-if-easy: log a single line to the console like `[dev mode] float unlocked` so the developer knows it took effect.)*

### Controls strip

- When dev mode is **off**: room-mode strip reads exactly what Sprint 02 set up: `← →  MOVE     ↑  LOOK     ESC  JOURNAL`
- When dev mode is **on**: room-mode strip reads the post-float version per `03b-ui-spec.md` §1: `← →  MOVE     ↑  LOOK     SPACE  FLOAT     ESC  JOURNAL`
- In Sprint 02 we defined two strip contexts (`room`, `atmospheric-dialogue`, `interactive-dialogue`). This sprint adds the `room-floatable` context. The engine picks `room` vs `room-floatable` based on `pip.float.unlocked` whenever it sets the room strip.

### No regressions

- All Sprint 01, 01.5, and 02 behaviors still work: walking, facing, blinking, idle bob, room bounds, camera follow, sparkles, dialogue box, all three inspectables, controls strip transitions
- No console errors at any point
- The dev flag is fully opt-in — production play (no URL parameter) is identical to Sprint 02 except for the floor repositioning

## Context from design docs

### From `06-roadmap-and-open-questions.md` Decisions Log

> **Float ability:** Pip can float upward roughly 1.5 character-heights, briefly, with effort. Hold space to rise, release to descend. Float only — no jump. He's a ghost; he doesn't push off the ground.
>
> **Float discovery:** built into Beat 8 of Chapter 1 (the dark corridor / fallen-sconce moment, combined with electricity discovery). Before Beat 8, space-bar does nothing.

This sprint does **not** override the "before Beat 8, space-bar does nothing" rule. Production play remains as locked. The dev flag is a build-and-test affordance, not a story change.

### From `03b-ui-spec.md` §1 — Controls Strip Contexts

> Room mode, pre-float: `← →  MOVE     ↑  LOOK     ESC  JOURNAL`
>
> Room mode, post-float: `← →  MOVE     ↑  LOOK     SPACE  FLOAT     ESC  JOURNAL`

The spec already anticipates both states. This sprint wires them up.

### From `03b-ui-spec.md` §2 — Dialogue Box Position

> Bottom offset: `10%` of viewport height
>
> Horizontally centered, `transform: translateX(-50%)`
>
> Width: `76%` of viewport width, max-width `700px`

This is a locked position. The dialogue box does not move. The room moves to accommodate it.

### Visual-composition note (new convention this sprint establishes)

After this sprint, **every room in the game** should leave the bottom ~30% of the canvas clear of game-world content. This is a permanent convention. Classic adventure-game UI: the bottom band is dedicated to dialogue + controls, the top two-thirds are dedicated to the room. When future chapter rooms are built (Hallway, Grandparents' Cabin, Kitchen, Tallinn streets, etc.), their floor lines and tile arrangements should respect this rule.

*(This decision should be added to the Decisions Log in `06-roadmap-and-open-questions.md` after this sprint completes — note it in the post-sprint summary.)*

## Implementation notes

### Floor reposition

Currently `FLOOR_Y` is set somewhere in the room constants. The fix is mechanical: raise `FLOOR_Y` so that Pip's feet sit at roughly 65–70% of the canvas height, not 90%. With the 480×270 internal canvas, that means `FLOOR_Y` around **180** (≈67% down the canvas), not the current ~240.

The room's wall art (the deep-blue vertical panels) should extend only down to `FLOOR_Y`. Below that, fill with a darker shade of the same cool palette — the unseen "floor decking and shadow" beneath the room. Don't draw the floor pattern down into the UI zone.

Inspectable `sparkleY` values may need adjustment after the floor moves. Re-check each (door, porthole, bed) so the sparkle still reads as being *at* the object, not floating mid-air. Adjust each sparkleY to sit just above the new floor line, near the object's expected position.

### Float math (suggested approach)

```
const FLOAT_MAX_ALT     = 36;     // pixels above floor
const FLOAT_RISE_ACCEL  = 220;    // px/s², while space held
const FLOAT_GRAVITY     = 180;    // px/s² when space released
const FLOAT_MAX_RISE_V  = 80;     // px/s upward, caps the rise

// In update():
if (pip.float.unlocked && spaceHeld && !dialogue.active) {
  // Accelerate upward, capped
  pip.float.vy = Math.min(FLOAT_MAX_RISE_V, pip.float.vy + FLOAT_RISE_ACCEL * dt);
  pip.float.altitude += pip.float.vy * dt;
  if (pip.float.altitude >= FLOAT_MAX_ALT) {
    pip.float.altitude = FLOAT_MAX_ALT;
    pip.float.vy = 0;
  }
} else {
  // Gravity pulls altitude down
  pip.float.vy = Math.max(-FLOAT_MAX_RISE_V * 1.5, pip.float.vy - FLOAT_GRAVITY * dt);
  pip.float.altitude += pip.float.vy * dt;
  if (pip.float.altitude <= 0) {
    pip.float.altitude = 0;
    pip.float.vy = 0;
  }
}
```

(Numbers are starting suggestions — tune to feel during testing. The right feel is "buoyant but with weight," not "rocket ship.")

When rendering Pip, the y-coordinate becomes `FLOOR_Y - pip.float.altitude` (then idle bob is added on top of that as before).

### Space-bar input

`Space` is currently handled in `handleKeyAction()` for dialogue contexts only. For float, the relevant signal is "is Space currently held?" — that's `keysHeld['Space']`. Read it directly in `update()`, gated by `pip.float.unlocked && !dialogue.active`.

Be careful: when the dialogue box opens, if Pip was mid-air, he should descend naturally (gravity continues, just no upward force). When the dialogue closes, he should be back on the floor before regaining float control — let the gravity tick handle that organically while the dialogue is open. *(If this feels weird in testing, we can revisit.)*

### Dev flag detection

```javascript
const URL_PARAMS = new URLSearchParams(window.location.search);
const DEV_MODE = URL_PARAMS.get('dev') === '1';
if (DEV_MODE) {
  pip.float.unlocked = true;
  console.log('[dev mode] float unlocked');
}
```

This runs once at startup. No runtime toggling.

### Controls strip context

In Sprint 02's `setControlsStrip()`, the room context is keyed `'room'`. Add a `'room-floatable'` entry to `STRIP_STRINGS`. Anywhere the code currently calls `setControlsStrip('room')` (kick-off, closeDialogue), change it to call a small helper that picks the right one:

```javascript
function setRoomStrip() {
  setControlsStrip(pip.float.unlocked ? 'room-floatable' : 'room');
}
```

## Files to create or modify

**Modify:**
- `game/index.html` — adjust `FLOOR_Y`, repaint the room to respect the new floor and the UI zone below, adjust `sparkleY` values for the three inspectables, add `pip.float` state, add float math in `update()`, add dev-flag URL parse, add `room-floatable` strip context, replace `setControlsStrip('room')` calls with `setRoomStrip()`

**No new files.** Single-file constraint holds.

## Out of scope

This sprint does **not** include:

- Story-side unlocking of float at Chapter 1 Beat 8 (that's a future sprint; this sprint provides the engine capability and the dev flag, not the narrative unlock)
- Adding new float-related dialogue choices to existing inspectables (the door, porthole, and bed don't gain a "float over" option this sprint — they wouldn't make sense anyway)
- Changing the cabin's wall art, lamp, or other decorative elements beyond what's needed to respect the new floor line
- Float-related sound effects or visual effects (the "softly rising" feel comes from motion alone for now)
- Mobile tap support for float (out of scope; spec'd in §11 of `03b-ui-spec.md` for a future mobile sprint)
- Other ability work — phase-through, electricity, memory-gifting are all separate future sprints
- A debug HUD or any visible dev-mode indicator beyond the optional console log

## Test checklist

After implementing, list the checklist split between items you can confirm from code review and items needing browser verification. Julia plays it.

Items to walk through in the browser, in **production mode** (open `game/index.html` with no URL parameters):

- [ ] Pip stands in the upper portion of the canvas; there's visible empty space below him
- [ ] The room's walls and floor only extend down to roughly two-thirds of the canvas; below that is a darker cool band
- [ ] All three inspectables' sparkles still appear near their objects (not floating in midair, not buried below the floor)
- [ ] Walk Pip near each inspectable, press `↑` — dialogue still triggers correctly
- [ ] When dialogue opens, it sits in the bottom band **below Pip**, not on top of him
- [ ] The controls strip is still visible below the dialogue box
- [ ] Hold `Space` in room mode — **nothing happens** (Pip stays on the floor)
- [ ] Press `Space` during dialogue — still skips/advances the line (unchanged from Sprint 02)
- [ ] Controls strip on load reads `← →  MOVE     ↑  LOOK     ESC  JOURNAL` (no `SPACE  FLOAT` since dev mode is off)
- [ ] All Sprint 02 behaviors still work: typewriter, choice list, controls strip transitions, etc.

Items to walk through in **dev mode** (open `game/index.html?dev=1`):

- [ ] On load, console shows `[dev mode] float unlocked` (if you added the log)
- [ ] Controls strip on load reads `← →  MOVE     ↑  LOOK     SPACE  FLOAT     ESC  JOURNAL`
- [ ] Hold `Space` — Pip rises smoothly to roughly 1.5× his sprite height above the floor
- [ ] The rise has gentle ease, not a constant climb; total rise time is roughly half a second
- [ ] Release `Space` — Pip descends under gravity, not instant snap
- [ ] At max altitude, holding `Space` longer does nothing — he caps out
- [ ] While floating, idle bob is still visible (he's still gently bobbing)
- [ ] While floating, walking left/right still works
- [ ] Pip's underglow ellipse moves with him as he rises (the glow follows his feet)
- [ ] Walking to the right edge while floating: he still stops at the wall horizontally
- [ ] Open dialogue while mid-float: Pip's altitude continues descending (gravity pulls him down) but he doesn't get stuck
- [ ] Close dialogue: Pip is on the floor, float controls work again
- [ ] No console errors at any point in either mode

## Notes for after completion

When closing the Sprint 02.5 issue, include:
- A note for the Decisions Log entry to add to `06-roadmap-and-open-questions.md`: *"Bottom ~30% of the canvas reserved for UI (dialogue, controls strip). Every room's composition must leave this band clear of game-world content. Established Sprint 02.5."*
- A second note for the Decisions Log: *"Dev-mode URL flag (`?dev=1`) unlocks abilities that are story-locked in production. Float unlocked first; future story-locked abilities (electricity, phase-through, memory-gifting) follow the same pattern. Engine capability and dev flag arrive together; story unlock arrives in the relevant chapter sprint."*
- Confirmation that the float feel is tunable via the constants at the top of the float code, so playtesting can adjust without re-architecting
- Any open questions about the float feel — too floaty, too fast, too sluggish — to consider in a polish pass

After this sprint, the room finally feels composed for a narrative adventure game — Pip in the upper frame, the dialogue box below him, the controls strip at the bottom. And the float capability is ready to ship at Beat 8 the moment the story sprint hits.
