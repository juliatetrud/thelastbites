# Sprint 06: Shared Visual Primitives, Contrast Lift, and Hallway Boat Polish

## Goal

Pull reusable draw primitives out of the per-room code, lift contrast significantly across all rendered scenes, and give the hallway proper ship-corridor flavor (portholes, riveted panels, brass door fittings, floor planks). Cabin, grandparents' room, and the grandparents' cinematic all get the contrast pass and switch to the new primitives where applicable.

## Definition of done

### A primitive library exists

A new section near the top of the rendering code (after the existing constants, before the per-room draw functions) defines reusable canvas-drawing primitives. Each one takes coordinates and parameters; none reference room-specific state. The expected primitives:

- `drawPorthole(x, y, radius, options)` — circular ship window. Brass ring, dark glass interior, optional pane-divider cross, optional moonlight glow. Used in the cabin (already has one — refactor to use this) and the hallway (new — multiple).
- `drawSconce(x, y, options)` — brass wall sconce with warm flickering light pool. Already exists in the hallway as inline code; refactor into this function. Options: `flicker` (boolean — should the light pool pulse), `intensity` (0-1).
- `drawShipPanel(x, y, w, h, options)` — riveted metal wall panel. Subtle metal-plate shading, rivet dots on the corners and seams. Replaces the current flat-line parallax panels in cabin/hallway/grandparents'.
- `drawBaseboard(x, y, w, options)` — dark wood baseboard running along the floor line. Currently inlined in every room; pull out.
- `drawFloorPlanks(camX, options)` — visible plank seams in the floor band, parallax-scrolling with the camera. Replaces the current flat floor surface.
- `drawBrassFitting(x, y, type)` — small brass details on doors: `'plaque'` (room number area, a small horizontal rectangle), `'handle'` (door handle), `'kickplate'` (lower-door brass strip). One function, three types.
- `drawDoor(x, y, options)` — vertical door silhouette with optional inset panels and brass fittings. Composes `drawBrassFitting`. Replaces the current inline door rendering in cabin and hallway.

Each primitive should be self-contained: it sets its own `fillStyle`, draws, and restores nothing it didn't change. No global state assumptions. Comments above each function describe its parameters and visual intent.

### Contrast lift across every rendered scene (Option C)

Significant lift, per design conversation. The chapter still feels dim and hushed — late at night, ship corridor, after grief — but objects read as *lit interiors*, not silhouettes-on-black.

Specific targets:

- **Wall base colors** lift from `#1e1408` / `#1a1208` / `#221608` (current near-black warm) to roughly `#322414` / `#2c2010` / `#3c2c18`. Still warm-brown, but now actually *brown*, not "barely-distinguishable-from-pure-black."
- **Floor band** lifts similarly. The floor line currently almost vanishes — it should clearly separate floor from wall.
- **Baseboards** become readable as a darker band against the lifted wall, not as invisible.
- **Furniture silhouettes** (bed, nightstand, suitcase, luggage cart) — the *frame* of each object lifts to read against the wall; the *interior* (bedding, contents) lifts further so detail is visible without sparkles. The existing bedding-contrast fix in the grandparents' cinematic is the rough target — apply that thinking everywhere.
- **Pip's glow** should still pop, but the room should be readable even before he enters. Test: pause the camera with Pip offscreen — can you still tell what's a bed and what's a suitcase? Currently no. After this sprint, yes.
- **Sconces and lamps** keep their warm pulse, but the warm pool now lands on *visible* surfaces, not on a uniform black wall. This will actually make the lighting feel more like lighting.
- **Cinematic background** also lifts. The dark warm fill (`#100c04`) and wall gradient lift in parallel with room-mode walls. Lamplight halo stays warm and pulsing but now reads as light against a textured-ish wall, not light against the void.

The grain overlay, edge vignette, and existing atmospheric layers stay — they're doing real mood work. Just dial the *base* darkness up.

### Hallway gets ship-corridor flavor

The hallway currently reads as "generic dim corridor with red carpet tint and doors." After this sprint it reads as "ship corridor at night." Specific additions:

- **Portholes between doors.** Three to four portholes spaced along the hallway wall (not in line with doors — between them). Each shows dark water with a faint suggestion of the distant shore (a few warm pinprick lights). Use `drawPorthole` with `moonlight: true`. The brass ring catches a faint warm reflection from the sconces. The motif echoes the porthole in Pip's cabin — same primitive, same world.
- **Riveted wall panels.** The current flat parallax panel lines get replaced with `drawShipPanel` calls — each "panel" between vertical seams has subtle rivet dots on its corners. Doesn't have to be hyper-realistic; just enough that the wall reads as *metal ship interior* rather than "drywall in a hotel."
- **Brass door fittings.** Each door in the hallway gets a brass plaque (where a room number would go), a brass handle/escutcheon, and a thin brass kick-plate at the bottom. Use `drawBrassFitting` for each. The grandparents' door (1180) and any other inspectable doors should be visually distinct from the non-interactive doors only in subtle ways (sparkle still does the interactive signaling).
- **Floor planks.** The floor band gets visible plank seams scrolling with camera. Not heavy — subtle dark lines every ~40-60px of game-world. Parallax with the floor, not separately. `drawFloorPlanks(camX)`.

Don't go overboard. The hallway is a *transit space*; it should feel ship-like, not be the visual centerpiece. Lefse-eating cabin Henrik is the visual centerpiece (future sprint). The hallway should feel like a place a passenger walks through, with enough detail to ground the world.

### Cabin and grandparents' room refactor to use primitives

- The cabin's existing porthole becomes a `drawPorthole()` call.
- The cabin's existing door (the one Pip can't open) becomes a `drawDoor()` call with `drawBrassFitting` accents.
- The cabin's current parallax panels become `drawShipPanel()` calls.
- The cabin's baseboard becomes `drawBaseboard()`.
- The cabin's floor becomes `drawFloorPlanks()`.
- The grandparents' room window stays as-is for now (different from a porthole — it's a square window, intentional — they're in a cabin with a real window because they're old-fashioned). Its baseboard, floor, panels, and door (the one Pip enters through, which renders as the left edge of the room) use the new primitives.
- The bed, nightstand, suitcase, lamp in the grandparents' room *stay as inline draw code* — they're one-off scene elements, not reusable. Just lift their contrast.

### Cinematic also lifts

The grandparents' cinematic scene drawing function gets the contrast lift and uses the new primitives where applicable:

- The wall gradient lifts. Cinematic walls are slightly *warmer* than room walls (the lamplight pools further into the warmth), but the base is no longer near-black.
- The bed, nightstand, suitcase, lamp, photograph in the cinematic each get their contrast bumped to match the room-mode bumps. The bedding-contrast fix from the Sprint 04 follow-up is the baseline — apply that to every furniture element.
- The cinematic's own porthole-less window stays — same as the room.
- The cinematic does *not* use `drawShipPanel` or `drawFloorPlanks` because the cinematic is a wider shot of a single intimate room, not a corridor. The walls in the cinematic stay as a textured gradient without rivets — feels right for a domestic interior.
- Dziadek's window in the cinematic gets a `drawShipPanel`-style frame around it but no rivets in the panes — windows-in-rooms feel different from corridor walls.

### No regressions

- All inspectables in every room still trigger at the right positions
- Pip's float, dialogue typewriter, cinematic, passenger NPC, music — all behave unchanged
- The grandparents' cinematic still plays through cleanly (this was just fixed; don't undo it)
- No console errors anywhere
- Frame rate doesn't drop noticeably — the primitives shouldn't add expensive draws. If they do (per-pixel rivet rendering, expensive gradients per frame), simplify

## Context from design docs

### From `03-art-and-aesthetic.md` — visual register A (gameplay)

The gameplay art register is **sparse procedural pixel art** — silhouettes-with-detail, painterly *suggestions* of detail rather than full rendering. The current rooms over-index on "sparse" and under-index on "with-detail." This sprint corrects that. We're not making the art *busy*; we're making it *legible*.

### From `01-story-bible.md` — the ship

> The Mnemosyne is an old ocean liner, somewhere between a 1930s steamship and a modern cruise. Brass fittings. Wood paneling. Red carpet. It looks like a hotel that floats. It does not look like a haunted house. The dread is gentle; the comfort is real.

The current hallway leans haunted-house (silhouette-on-black). This sprint pulls it back toward the bible's "hotel that floats" direction — visible textures, brass that catches light, things you can actually see.

### From `03-art-and-aesthetic.md` — Aesthetic Rule 8

> Warm lights flicker. Subtle, not distracting. Adds life.

The flicker still happens. It just now flickers on visible surfaces, not on void.

### From the design conversation in chat (locked):

- Significant contrast lift (Option C) — rooms feel dim but legibly lit, not silhouettes-on-black
- Hallway adds: portholes between doors, riveted panels, brass door fittings, floor planks (the four-item kit)
- Skip: railings, ceiling detail (diminishing returns)
- Primitive style: pragmatic, function-based, no component-system abstraction (Option A)
- Full sweep including cinematic (Option B)

## Implementation notes

### Where the primitives live

Add a new section in `game/index.html` between the existing constants/state section and the per-room draw functions. Header comment like:

```
/* ============================================================
   VISUAL PRIMITIVES
   Reusable canvas-drawing functions composed by per-room
   draw functions. Each is self-contained; no room-specific
   state, no shared mutable assumptions.
   ============================================================ */
```

Put each function in this section in the order: ship structure (panel, baseboard, floor), apertures (porthole, sconce), door + door details (brass fittings, door). This way reading the section top-to-bottom reads as: walls, lights, openings.

### Pattern: each primitive is called from per-room compose functions

A per-room function like `drawHallway(camX, now)` no longer has 200 lines of inline draw code. After this refactor it reads roughly like:

```
function drawHallway(camX, now) {
  // base fill + wall gradient (room-specific palette)
  // (inline — palette is what makes a room a room)

  drawShipPanel(...) for each panel-position;
  drawFloorPlanks(camX);
  drawBaseboard(...);

  drawPorthole(...) for each porthole-position (with parallax);
  drawSconce(...) for each sconce-position;
  drawDoor(...) for each door-position;

  // room-specific scene elements (luggage cart, far-right dark zone, etc.)
}
```

Per-room function gets shorter, easier to read, and changes to the primitive style propagate everywhere automatically.

### Camera parallax for portholes and sconces in the hallway

Portholes and sconces are wall-mounted — they should parallax at the camera's full speed (they're at the wall plane), not at the parallax-panel speed (half-speed background). Currently the hallway's parallax panels are a separate background pass at half-speed. Keep that as-is for the *deep wall* feel, but draw portholes/sconces/doors/brass at full camera speed (subtract `camX` directly from world coordinates).

### Cinematic palette tweak — slightly *warmer* base after lift

Room walls in the grandparents' room lift to roughly `#322414` (warm dark brown). The cinematic walls lift to roughly `#3a2818` — a hair warmer and a hair lighter, so the cinematic *feels* like a more emotionally-saturated version of the room. The lamplight pool extends further into the wall (currently 145px radius — bump to ~180px). This is the cinematic doing its job: same space, more emotional temperature.

### Contrast lift implementation pattern

Don't just multiply every color by 1.5. Specifically:

- **Wall gradients:** lift the *darkest* stop (the bottom of the gradient) more than the lightest stop. Walls should feel lit from above (where lamplight and sconce-light land) and dimmer at the floor.
- **Furniture (bed, suitcase, nightstand):** lift the *frame* color (object edge) to ~one step lighter than the wall. Lift the *interior* (bedding, shirt-in-suitcase, etc.) to ~two steps lighter than the frame. This is the contrast hierarchy that makes things read.
- **Baseboards:** stay darker than the wall and floor. They're a contrast *anchor* — visible because they're the darkest band in a now-lighter room.
- **Pip:** unchanged. His glow already works.

### Test-as-you-go pattern

Implement primitives one at a time. After each primitive, test that one room renders correctly using it. Don't refactor all three rooms in one batch — too many things changing at once is hard to debug. Suggested order: `drawBaseboard` → cabin → confirm → `drawShipPanel` → cabin → confirm → `drawPorthole` → cabin → confirm → … → then hallway → then grandparents' → then cinematic.

### Decisions Log update (add to `06-roadmap-and-open-questions.md` when complete)

When this sprint completes, add these entries to the Decisions Log:

- *"Shared visual primitive library established Sprint 06. Reusable canvas-draw functions for porthole, sconce, ship panel, baseboard, floor planks, brass fitting, and door. Each is self-contained and composed by per-room draw functions. Pattern is pragmatic (not declarative-data-driven); rooms remain imperative compose functions that call primitives plus inline scene-specific code."*
- *"Contrast lifted significantly across all room and cinematic art (Option C from design conversation). Wall bases moved from near-black warm to readable warm-brown (~`#322414`). Furniture silhouettes lifted to read against walls without relying on sparkles. The chapter still feels dim and hushed but is now *legibly* dim — pause-and-look reveals objects, not silhouettes."*
- *"Hallway boat-flavor kit (Sprint 06): portholes between doors, riveted ship panels replacing flat parallax lines, brass door fittings (plaque/handle/kickplate), floor planks. Establishes the Mnemosyne's visual identity. Future ship corridors (kitchen approach, dining halls, etc.) reuse the same kit."*
- *"Cinematic base palette is slightly warmer and lighter than corresponding room palette. Wall gradient and lamp halo extend further. Convention: a cinematic of a space is an emotionally-saturated rendering of the same space, not a stylistically-disconnected one. Applied retroactively to grandparents' cinematic; reused for all future cinematics."*

## Files to create or modify

**Modify only:**
- `game/index.html` — add the visual primitive section, refactor `drawCabin`, `drawHallway`, `drawGrandparents`, and `drawGrandparentsCinematic` to use it. Apply contrast lift across all four. Add boat-flavor elements to the hallway.
- `design-docs/06-roadmap-and-open-questions.md` — add the four Decisions Log entries.

No new files. No changes to dialogue, story, mechanics, music, or audio.

## Out of scope

This sprint does **not** include:

- Pip himself (sprite, animation, glow) — unchanged
- NPCs (Babcia, Dziadek, the passenger) — silhouettes unchanged; only their *backdrops* lift
- Dialogue UI, controls strip, music toggle — UI chrome unchanged
- New rooms (radio room, dark corridor, kitchen) — those are future sprints
- The journal (Sprint 07)
- A title screen, save/load, or any new system
- New atmospheric effects (rain, fog, particles) beyond what's already there
- Sound effects (footsteps, door creaks)
- Mobile / responsive considerations
- Replacing procedural art with painterly Register B art — that's a future post-MVP pass once the chapter is fully built

If implementation reveals a primitive is more complex than expected (e.g. parallax math for portholes turns out tricky), **simplify the primitive** rather than expanding scope.

## Test checklist

After implementing, walk this list in the browser. This sprint touches *every visible surface*, so the playthrough is thorough.

### Primitive library

- [ ] All 7 primitives exist as standalone functions with clear comments
- [ ] No function references room-specific state or global mutables it didn't create
- [ ] Per-room draw functions are noticeably shorter and read as compositions

### Contrast lift — every scene

- [ ] **Cabin:** with Pip offscreen (e.g. dev console: `pip.x = -100`), the room still reads — porthole, bed, door, walls are visible
- [ ] Cabin baseboard is a readable darker band against the lifted wall
- [ ] Cabin floor reads as floor (planks visible, parallax-scrolling), wall-floor boundary clear
- [ ] **Hallway:** same readability test — without Pip, every door, sconce, porthole, panel reads
- [ ] **Grandparents' room:** bed reads as bed, nightstand reads as nightstand, suitcase reads as suitcase, all from across the room without sparkles
- [ ] **Grandparents' cinematic:** wall is lifted, all five elements (window+Dziadek, suitcase, bed+Babcia, lamp, nightstand+photo) read with clear individual silhouettes; bedding is fabric-visible
- [ ] Pip still glows and reads as the foreground character in every scene
- [ ] No scene feels brightened beyond "dim at night" — mood is dim, just legibly dim

### Hallway ship-flavor

- [ ] Three to four portholes visible between doors, showing dark water + a few distant warm lights
- [ ] Portholes have visible brass rings, faintly catching warm light from sconces
- [ ] Walls show subtle rivet patterns on panel seams (not overdone — barely-noticeable detail at a glance, but clearly *not* drywall)
- [ ] Doors have visible brass plaques, handles/escutcheons, and kick-plates
- [ ] Floor shows visible plank seams, parallax-scrolling with camera
- [ ] The hallway *feels* like a ship corridor at night, not a generic hotel hallway

### Cabin and grandparents' room

- [ ] Cabin porthole still works as inspectable, looks like the new `drawPorthole` rendering (consistent with hallway portholes)
- [ ] Cabin door (uninspectable) looks like the new `drawDoor` rendering, has brass fittings
- [ ] Grandparents' room window stays square-window (intentional, not a porthole), but its frame and walls use the new primitives
- [ ] Grandparents' room bed/nightstand/suitcase/lamp/photograph still in their established positions, just lifted in contrast

### Cinematic

- [ ] Wall is visibly warm and textured, not near-black
- [ ] All five elements (Dziadek+window, suitcase, bed+Babcia, lamp, nightstand+photo) read clearly
- [ ] Lamplight halo extends visibly into the surrounding wall
- [ ] Pip's typewriter dialogue + the 9-line script still play cleanly through to the 1.2s hold and fade
- [ ] ESC still skips
- [ ] Babcia is on the bed; not at the nightstand (the Sprint 04 fix holds)
- [ ] Dust motes still drift in the lamp's cone

### No regressions

- [ ] Walk full chapter path: cabin → hallway → grandparents' door → cinematic → grandparents' room → back to hallway. All transitions work
- [ ] All inspectables in all rooms trigger at expected positions
- [ ] Passenger NPC walks once on first hallway entry
- [ ] Music still plays / toggles
- [ ] Float still works in `?dev=1`
- [ ] No console errors
- [ ] Frame rate feels smooth (60fps subjectively); no stutter when scrolling through the hallway

## Notes for after completion

When closing the Sprint 06 issue, include:

- A note on whether the contrast lift feels *right* — too far (room now feels like daytime, mood broken) or correct (dim but legibly dim) or not far enough (still squinting). One screen-capture from each room (cabin, hallway, grandparents', cinematic) would help calibrate.
- A note on the hallway ship flavor — does it feel like a ship corridor, or did the additions read as decoration rather than worldbuilding? If the latter, what specifically didn't land.
- Any primitive that turned out to be more painful to extract than expected — flag for a future refactor pass.
- Optional: a screenshot comparison of one room before/after, for the project's design archive.

After Sprint 06, the visual foundation is stable. Sprint 07 (Journal MVP) can build on top of it.
