# Sprint 13: Collect verb, stomach rework, blink-back, notebook Items

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

Specifically, every sprint is responsible for:

1. **Cross-references.** When a new doc is created, every related doc gets a pointer to it. When a doc is renamed or restructured, all inbound references are updated.
2. **Decisions Log entries.** Any decision settled in the sprint gets a row in the Decisions Log in `06-roadmap-and-open-questions.md`.
3. **Discrepancies surfaced, not silently resolved.** Contradictions between docs get flagged, not patched.
4. **Open-questions hygiene.** Resolved questions are removed and replaced with Decisions Log entries. New questions are added explicitly.

---

## Goal

Implement everything Sprint 12's doc patch describes that *can be implemented in code now*: the `↓` collect verb, the warm-humming collectible aura, the reframed stomach indicator with world-hazard-only drain rules, the blink-back failure mode, the notebook's new Items section, the `TAB`/`ESC` keybinding swap, and the Bamsemums tutorial collectible placed in Ch1's kitchen.

At the end of this sprint, a player can walk into the kitchen after Henrik, find the Bamsemums on the counter, press `↓`, watch it tween into the notebook icon, open the notebook with `TAB`, and see their first Items entry.

**Explicitly NOT in this sprint:** the new observation deck room, the cleaning-cart treat in the dark corridor, and the cabin replay-reward treat. Those three placements need the broader Ch1 content sprint that also adds the dark corridor, the kitchen, and the observation deck themselves — none of which are built yet (per progress report, Ch1 Beats 5+ are still TBD).

## Definition of done

### Input and verb

- `↓` is bound as a non-repeating keypress that triggers a `tryCollect()` function (parallel to `tryInspect()`).
- When Pip is within proximity of a collectible object: pressing `↓` picks it up.
- When no collectible is in proximity: pressing `↓` triggers a brief "squat" sprite-rig animation on Pip (a ~250ms compression of the body sprite). The animation is small and clear; it should read as "I tried to collect but found nothing."
- `↑ INSPECT` and `↓ COLLECT` are independent. A single object can be either inspectable or collectible, not both. Sprint 12 doc patch confirms this; if implementation reveals an edge case where one object reasonably should be both, **stop and ask.**

### Keybindings

- `TAB` opens the notebook (was `ESC`).
- `ESC` no longer opens the notebook. It opens the pause menu *if Sprint 05 has shipped*; otherwise, `ESC` is unbound (and pressing it does nothing). Add a `// TODO: ESC reserved for pause menu — Sprint 05` comment at the bindings.
- `TAB`'s default browser behavior (focus navigation) must be prevented inside the game wrap with `event.preventDefault()`.

### Collectibles data model

- A collectible is a new object type in the room's `objects` array. Shape:
  ```
  {
    id: string,
    x: number,
    type: 'collectible',
    sprite: string,           // sprite key for the small icon
    kind: 'treat' | 'item',   // determines consume-vs-pocket behavior
    name: string,             // display name in controls strip and notebook
    annotation: string,       // one-line notebook entry
    stomachValue: number,     // only for treats; null for items
    collected: false
  }
  ```
- Once `collected: true`, the object no longer renders its aura or is targetable by `↓`.
- The collected-state persists for the current session (no save/load yet — that's a separate sprint).

### Collect aura (visual)

- A new procedural draw function `drawCollectAura(ctx, x, y)` draws a warm-amber pulsing aura at the collectible's position.
- The aura is distinct from the inspect sparkle: broader radius (~`12px` vs sparkle's ~`6px`), pulsing slowly (1.2s cycle), saturated warm amber, no upward drift. The visual vocabulary should clearly read as "hum" vs the existing "shimmer."
- Aura intensity scales with Pip's proximity, the same way the existing `drawObjectAura()` (Sprint 08.5) does for inspect targets. Beyond ~`60px` it's barely visible; under `18px` it's at peak intensity and a small "ready to collect" pulse is added.

### Pickup tween animation

- When `↓` is pressed near a collectible, the following sequence plays:
  1. The collectible's sprite is duplicated as an animation token.
  2. The duplicate tweens from the collectible's world position to the notebook icon's HUD position over `600ms` with an ease-out arc (slight upward curve).
  3. On arrival, the notebook icon pulses warm (a single 200ms warm-amber glow).
  4. If the collectible is a treat, a second tween chains: an amber blob travels from the notebook icon back down to the stomach indicator's mouth area over `400ms`, then the stomach fill animates up by the treat's `stomachValue` over `400ms ease-out`. (Reuses the existing eating animation from Section 3 of `03b-ui-spec.md`.)
  5. If the collectible is a useful item, no second tween. The item is recorded; nothing happens to the stomach.
- During the pickup tween, player input is locked (no movement, no other actions). Total lock duration: ~`1000ms` for treats, ~`800ms` for items.

### Notebook icon (new HUD element)

- A small notebook icon appears in the HUD, positioned in the top-right corner (mirror of strength indicator). Size ~`28×36px`.
- The icon is the closed-leather-journal placeholder from `art-asset-list.md` (`ui-journal-cover.png`), rendered procedurally for now if no commissioned asset exists.
- The icon is the pickup tween's destination point. It also serves as a visual indicator: a small numeral or pip at its corner shows the count of items in the Items section (or shows nothing if zero). Designer call: numeral, dot, or no badge. *Go with no badge for first pass; add only if testing shows it's needed.*
- Clicking the notebook icon opens the notebook (same as `TAB`).

### Notebook: Items section

- The notebook (now opened with `TAB`) gains a third spread, accessible by paging right past the existing Memories page.
- Layout:
  - Section header at top: `ITEMS` in `Special Elite`, dark brown — matching the existing `MEMORIES` header style.
  - Grid of item cards, 3 columns wide.
  - Each card: ~`80×100px`. Contains:
    - Item icon at top (the actual collectible sprite, scaled to ~`16×16px`)
    - Item name below icon in `Cormorant Garamond` regular
    - One-line annotation below name in `Cormorant Garamond` italic, small
    - For treats: card displays at full opacity, no further state
    - For used items: card displays at `40%` opacity with a small strikethrough on the name
- The page starts empty until the first collectible is found. Empty state: a faint italic note at the center of the page: *"Nothing yet."*
- Page navigation: `←` / `→` between Recipes, Memories, Items (was just Recipes ↔ Memories).

### Strength indicator rework

- Section 3 of `03b-ui-spec.md` is now formally the *stomach* indicator. The chewing-boy + stomach-pouch visual is unchanged.
- Drain triggers are now restricted to world hazards only. Find any existing call to `loseStrength()` from puzzle failure paths and remove it. (As of Sprint 11, no puzzle code that drains strength on failure exists, but check carefully — Sprint 06 outlines the death sequence as if it could fire on puzzle failure. Confirm no actual hookup.)
- Eating animation: triggered by `↓` collect of a treat. Reuses existing eating tween, chained after the pickup tween.

### Blink-back failure mode

- New function `triggerBlinkBack()`. Triggered when stomach reaches 0.
- Sequence:
  1. Pip's sprite fades from current opacity to `0.05` over `1.2s` (with the body-glow trailing downward — same vocabulary as the retired lives-fade animation).
  2. Black overlay fades in to fully opaque over the final `0.3s` of the fade.
  3. `0.4s` pause on full black.
  4. Pip is repositioned to the *last room threshold entry x* (use `rooms[currentRoom].pipEntryX.fromLeft` or `fromRight` depending on entry direction — this is already tracked in the rooms object per `index.html`).
  5. Pip's sprite fades back from `0.05` to standard opacity (0.85) over `1.0s`.
  6. Stomach is restored to `60/100` (baseline, not full).
  7. A centered italic narration line displays for `2s` then fades: *"The ship lets him back in."* (Placeholder; refine in content review.)
  8. Player regains control.
- Total sequence duration: ~`5s`. No flash, no shake, no sound effect on the death itself. The respawn narration is the only audio/visual cue.
- The `lives` variable and any related code is *removed*, not just disabled. The HUD's Section 4 chrome (the three Pip-icon ghosts) is removed from the DOM. If commits have orphan references, clean them up.

### Lives system removal

- Remove the lives display DOM and CSS from `index.html`.
- Remove `lives` variable, `loseLife()` and related functions.
- Remove the puddle-ghost game-over screen DOM and CSS.
- Search for any string references to lives, life, lives-display, puddle, game-over, restart-chapter, restart-checkpoint — confirm only retired-doc references remain, no live code.

### Controls strip updates

- Default exploration: `↑ INSPECT  •  ↓ COLLECT  •  TAB NOTEBOOK  •  ESC PAUSE`
- Near a collectible (Pip within `18px` of a collectible's x): replace `↓ COLLECT` with `↓ COLLECT [NAME]` where `[NAME]` is the collectible's `name` field, rendered in `var(--warm-pool-amber)`.
- Near an inspectable: existing behavior — the `↑ INSPECT` segment can highlight, per Sprint 02 spec.
- Both proximity rules can fire simultaneously if Pip is near both an inspectable and a collectible (separate objects). The strip shows both highlights.

### Ch1 content: the Bamsemums

**Note on chapter readiness:** Per the progress report, the kitchen room itself (room 5 of 6 in Ch1's now-six-room structure) is not yet implemented. If by the time Sprint 13 runs the kitchen room exists, this sprint places the Bamsemums there as specified. If the kitchen does not yet exist, **stop and ask** — the Bamsemums placement depends on the kitchen room existing. One of three things will be true:

- **(a) The kitchen exists.** Proceed as specified below.
- **(b) The kitchen does not exist but is being built in a parallel sprint.** Coordinate with that sprint; the Bamsemums placement may need to fold into that sprint's spec instead.
- **(c) The kitchen does not exist and is not yet being built.** Sprint 13 still ships the *system* (the `↓` verb, the aura, the stomach rework, the blink-back, the notebook Items section). The Bamsemums placement is deferred until the kitchen exists. In this case: add a temporary debug-placement of a collectible somewhere already-built (e.g. in the cabin or hallway) purely for testing the system. Remove the debug placement before merging if the kitchen lands soon, or note it clearly as a temporary debug item.

**The Bamsemums placement, when the kitchen exists:**

- A new collectible is added to the kitchen room's `objects` array, positioned on the counter (or wherever the kitchen room's geometry has counter space). Use a sensible x value — adjacent to but not overlapping Henrik's position.
- Object data:
  ```
  {
    id: 'kitchen-bamsemums',
    type: 'collectible',
    kind: 'treat',
    sprite: 'treat-ch01-bamsemums',
    name: 'Bamsemums',
    annotation: 'Bamsemums — from Henrik, in the kitchen.',
    stomachValue: 25,
    collected: false
  }
  ```
- The Bamsemums sprite is drawn procedurally (placeholder pixel art) until commissioned. Reference `art-asset-list.md` entry `treat-ch01-bamsemums.png`.
- The collectible only appears in the kitchen *after* Henrik's main scene completes (he places it on the counter as part of the scene's wind-down). Implementation: gate the collectible's render and proximity-check behind a flag `kitchen.henrikSceneComplete = true`, set when the Henrik scene's final dialogue node closes.
- When the player first approaches the Bamsemums, the inspect-style aura *does not* fire. Instead, the warm humming aura fires. The first time the player gets within `18px`, the controls strip displays `↓ COLLECT BAMSEMUMS`.
- A one-time auto-narration plays the first time Pip approaches the Bamsemums (before any `↓` press) — a small atmospheric inspect-like text but triggered by proximity rather than `↑`. This is the tutorial line. Use the dialogue system's existing showDialogue() with an atmospheric (no-choices) node:
  > Line 1: *A small bag of Bamsemums, foam-and-chocolate bears, sits on the counter.*
  > Line 2: *Henrik didn't say they were for him. They are.*
  > Line 3: *He could pocket this. ↓ to collect. He'll find it later in his notebook.*
- After the auto-narration, normal input resumes. The player presses `↓` (or backs away and comes back). On `↓`, the pickup tween plays, the Bamsemums appears in the notebook Items page as the first entry, and Pip's stomach refills by 25.
- After this first pickup, no other Ch1 treats exist yet (those land in the Ch1 content sprint).

## Out of scope

This sprint does **not** include:

- **The observation deck room.** Per Sprint 12's doc patch, the observation deck is locked into Ch1's structure as room 6, positioned between the kitchen and the dock farewell. Its implementation — background, navigation, the aurora visual, beat dialogue, inspectables, and its treat — is its own future sprint (likely the Ch1 content sprint).
- **The cleaning-cart treat in the dark corridor.** Per Sprint 12, this is one of Ch1's four treats. Placement is deferred to the Ch1 content sprint (which also needs to build the dark corridor itself if it isn't built yet).
- **The cabin replay-reward treat.** Per Sprint 12, this is the early-chapter Ch1 treat collectible only on replay. Placement is deferred to the Ch1 content sprint.
- **Implementing useful items** (knife, matches, candle) — only the *category* is defined in code. No actual useful item is placed in Ch1. The `kind: 'item'` branch should be coded as a stub that pockets the item without consuming, but no test case exercises it this sprint.
- **The in-dialogue 4th-choice mechanic** for using items. Flagged as Open Question; resolved before Ch3.
- **The pause menu** (Sprint 05). `ESC` is unbound this sprint.
- **Save/load** of the collected state across sessions. Treats and items reset when the page reloads. Save/load is its own sprint (Sprint 04 in the original plan).
- **Audio cues** for collect, pickup tween, blink-back, or notebook open. All audio deferred to a future audio-pass sprint.
- **World-hazard drain.** Echo-creatures, snail slime, and dark-corridor lingering aren't yet implemented — so no stomach drain actually fires in Ch1 yet. The stomach can still be drained by *manually testing* `loseStrength(N)` via console, which is sufficient for verifying blink-back. **Add a temporary debug binding:** holding `Shift` and pressing `-` drains 10 stomach. Useful for testing blink-back. Remove or comment-out before final.
- **Commissioned art.** All sprites in this sprint are procedural placeholders.
- **Refining the tutorial narration line.** Use the placeholder above. Content refinement is a separate pass.

If implementation reveals one of these is unavoidable, **stop and ask.**

## Context from design docs

This sprint assumes Sprint 12's doc patches have already shipped. The relevant sections to reference during implementation:

- **`02-game-design.md`** — sections on collect verb, stomach model, treats, useful items vs treats.
- **`03b-ui-spec.md`** — Section 1 controls strip; Section 3 stomach indicator; renamed Section 5 notebook (with Items page); new collectible sparkle convention section; new blink-back section. Sections 4 and 10 are retired.
- **`04-chapter-01-cabin-646.md`** — the new Bamsemums beat after Henrik's kitchen scene; the observation deck section (read for context — not implemented this sprint).
- **`ch01-cabin-646-outline.md`** — the "Treats in Ch1" section (read for the full picture of Ch1's treat plan — only the Bamsemums is placed this sprint).
- **`06-roadmap-and-open-questions.md`** — the thirteen Decisions Log entries from Sprint 12.
- **`art-asset-list.md`** — `treat-ch01-bamsemums.png` placeholder, `ui-collect-aura.png` placeholder.

If any of these sections aren't found in the docs when you start this sprint, **Sprint 12 hasn't shipped** — stop and confirm with Julia before proceeding.

## Implementation notes

### Where the new code goes

All in `game/index.html`, the single-file architecture.

- **Bindings:** add `↓` and `TAB` to the existing keydown handler. Remove the existing `ESC` notebook binding.
- **Collect logic:** new `tryCollect()` function adjacent to existing `tryInspect()`. Same proximity check pattern (within `18px`).
- **Squat animation:** add a sprite-rig state to Pip's existing body layer. Use a brief `squatTimer` field on the `pip` state object; the body renders compressed when the timer is active.
- **Collectibles in rooms:** add a `collectibles` array to each room (parallel to `objects`), or extend `objects` with a `type` discriminator. The latter is cleaner — recommend extending `objects`. Existing inspectables get an implicit `type: 'inspectable'` if missing.
- **Collect aura draw:** new `drawCollectAura(ctx, x, y, intensity)` function. Called from the per-frame room render loop, the same way the inspect aura is currently called.
- **Pickup tween:** new `activeTweens` array on the global state. Each tween has start position, end position, start time, duration, sprite to render, and an onComplete callback. The render loop iterates and draws each active tween, then prunes completed ones. The onComplete fires the eating animation (for treats) or just removes the tween (for items).
- **Notebook icon HUD element:** new DOM element, positioned absolute, top-right of `#game`. Click handler binds to `openNotebook()`.
- **Notebook Items section:** extend the existing notebook DOM. The notebook is already a Sprint 04 stub — extend it carefully without breaking the Recipes / Memories layout. If the notebook DOM doesn't yet exist (i.e., Sprint 04 hasn't shipped), this sprint must first stand up a minimal notebook that *only* contains the Items section. **Stop and confirm** if you find this is the case.
- **Blink-back:** new `triggerBlinkBack()` function. Hooks into `loseStrength()` — when stomach hits 0, call this function instead of the old death sequence.
- **Stomach: remove old lives wiring.** Carefully audit the existing strength/death code. Remove `lives` variable, `loseLife()`, the lives-display DOM, the puddle-ghost screen. If anything references `lives` in a way that's load-bearing for any other system, **stop and ask** — but it shouldn't be.

### Pattern to follow

The existing inspect system (Sprint 02) is the canonical pattern. Mirror it:

- `tryInspect()` → `tryCollect()`
- Inspect proximity check → collect proximity check (same `18px` radius)
- Inspect sparkle (cool, drifting, `drawObjectAura`) → collect aura (warm, pulsing, `drawCollectAura`)
- Inspect controls strip context → collect controls strip context

The pickup tween is new; nothing in the prototype yet uses HUD-targeted animation. Build it cleanly so future sprints (e.g. the cooking animation, the recipe-earned moment) can reuse the same `activeTweens` infrastructure.

### Aura visual specifics

Use these as starting values, tune by eye:

```
function drawCollectAura(ctx, x, y, intensity) {
  // intensity is 0..1 based on Pip's proximity (1 = at peak, 0 = beyond ~60px)
  // pulse is a slow 1.2s sine wave: pulse = 0.7 + 0.3 * sin(time * 2π / 1.2s)
  // outer glow: radial gradient, warm amber #ffc868 at alpha intensity * pulse * 0.5
  //             radius ~12px
  // inner core: smaller radial gradient, same color, alpha intensity * pulse * 0.9
  //             radius ~6px
}
```

The aura should *hum* — slowly, present, never sharp or sudden. If it ends up reading as a flicker or a flash, the timing is wrong; slow it down.

## Files to create or modify

**Modify:**

- `game/index.html` — all of the above. Single-file architecture holds.

**No new files.**

## Test checklist

Some of these are verifiable by reading the code; most require a browser session.

### Verify by Claude Code

- The down arrow keybinding exists and calls `tryCollect()`.
- The `TAB` keybinding exists, opens the notebook, and calls `event.preventDefault()`.
- The `ESC` keybinding no longer opens the notebook.
- `lives`, `loseLife`, and puddle-ghost code are removed.
- The Bamsemums collectible exists in the kitchen room's objects array with the correct data (if the kitchen exists; otherwise the debug-placement collectible exists somewhere already-built).
- The `treat-ch01-bamsemums` sprite is drawn procedurally somewhere in the render code.
- The `triggerBlinkBack()` function exists and is hooked to stomach-reaches-zero.
- The debug `Shift+-` binding exists and drains stomach.

### Verify in browser (Julia tests these)

1. **Squat on empty `↓`.** In the cabin (no collectibles in the first-playthrough state — the replay-treat hasn't been added yet at this sprint), press `↓`. Pip squats briefly, then returns to standing.
2. **`TAB` opens notebook.** Press `TAB`. Notebook opens. The Items page is reachable by paging right. Empty state shows: *"Nothing yet."*
3. **`ESC` does nothing.** Press `ESC` outside any dialogue. Nothing happens (no notebook open, no pause). Console may log a TODO.
4. **Pre-Henrik kitchen** (if the kitchen exists). Walk into the kitchen *before* Henrik's scene completes. The Bamsemums should *not* be visible — no aura, no controls-strip hint.
5. **Post-Henrik kitchen** (if the kitchen exists). After Henrik's main scene completes, walk back toward the counter. A warm humming aura appears on the Bamsemums. The controls strip changes to show `↓ COLLECT BAMSEMUMS`.
6. **Tutorial auto-narration.** First approach to the Bamsemums (after Henrik scene) auto-triggers a 3-line dialogue:
   - *A small bag of Bamsemums, foam-and-chocolate bears, sits on the counter.*
   - *Henrik didn't say they were for him. They are.*
   - *He could pocket this. ↓ to collect. He'll find it later in his notebook.*
   Dismiss with `SPACE`.
7. **Pickup tween.** Press `↓` near the Bamsemums. The sprite tweens into the notebook icon over ~`600ms`. The notebook icon pulses warm. A second amber tween fires from the notebook icon to the stomach. Stomach fill animates up by 25.
8. **Input locked during tween.** During the pickup, pressing arrow keys does nothing. Resumes after the tween completes.
9. **Bamsemums no longer collectible.** After pickup, the aura is gone. Re-approaching the counter does nothing. `↓` makes Pip squat.
10. **Notebook entry exists.** Press `TAB`. Navigate to the Items page. The Bamsemums appears as a small icon with the annotation *"Bamsemums — from Henrik, in the kitchen."*
11. **Blink-back via debug.** Hold `Shift` and press `-` repeatedly until stomach reaches 0. Pip fades. Black screen for `~0.4s`. Pip respawns at the room's entry threshold with stomach at 60/100. Centered narration: *"The ship lets him back in."* Fades after 2s. Control resumes.
12. **No lives counter.** At any point during the test, confirm the three-life display from the old HUD is gone. No lives ghost icons visible.
13. **No game-over.** Drain stomach to zero three times in a row (using debug). The third zero should trigger another blink-back, not a game-over screen. The puddle-ghost should not appear.
14. **Controls strip stable.** While walking through the kitchen, the strip reads `↑ INSPECT  •  ↓ COLLECT  •  TAB NOTEBOOK  •  ESC PAUSE` normally. Near the Bamsemums, the `↓ COLLECT` becomes `↓ COLLECT BAMSEMUMS` in warm amber. After pickup, it reverts.
15. **Notebook icon visible.** The notebook icon is visible in the HUD top-right corner whenever the strength indicator is also visible (i.e., during normal gameplay, hidden during cinematics and dialogue and the notebook itself).

## Report back

After Sprint 13 lands, Claude Code reports:

1. Confirmation that all test-checklist items pass.
2. Which scenario applied (a, b, or c) regarding the kitchen room's readiness. If (c), report the debug-placement location used for testing.
3. Any places where the implementation deviated from the spec, and why.
4. Any docs that needed patching beyond Sprint 12 to make the implementation make sense (these become a Sprint 13.5 doc-patch, if needed).
5. Any open questions surfaced — especially around the useful-item-use UI (deferred but worth flagging if anything implementation-shaped came up), and around the empty squat animation feel (does it feel right, or does it need tuning?).
6. The final wording of the placeholder blink-back narration line, in case Julia wants to refine before content review.
