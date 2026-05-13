# Sprint 04: The Grandparents' Cabin

## Goal

Build the chapter's first true cinematic — the gut-punch shot of Pip's grieving grandparents — alongside the small traversable room where the player can stand quietly in the aftermath. The grandparents' cabin door becomes a real story trigger, the phase-through-wood ability is discovered, and a reusable cinematic system gets established for the rest of the chapter.

## Definition of done

### A reusable cinematic display system exists

- A `cinematics` registry holds named cinematics, each defined by: an id, a draw function (renders the static painted scene to the cinematic canvas), an array of dialogue lines (`{speaker, text, italic}` — same shape as the dialogue system), an optional `onEnd` callback
- A `showCinematic(name, opts)` function activates a cinematic by id; opts may include an `onEnd` callback to override the registry default
- A dedicated full-canvas overlay layer renders cinematics above the room canvas but below the dialogue box and controls strip — see **Implementation Notes** for layering
- During a cinematic: room rendering pauses, room input is suppressed (same suppression pattern as room transitions), the dialogue system runs normally on top of the cinematic image, and the controls strip switches to the cinematic context (`SPACE  CONTINUE     ESC  SKIP` or similar — call it the way the existing strip handles dialogue context)
- The cinematic plays through its line sequence one line at a time, the same typewriter pacing as room dialogue, advancing with space
- When the final line dismisses, the cinematic fades to black over ~600ms (same feel as a room transition), `onEnd` fires, and control returns to the room (or wherever `onEnd` directs)
- Cinematics fire at most once per save state. The registry tracks which cinematics have played. Re-triggering a fired cinematic is a no-op (the trigger should not be reachable a second time — story-level guarantee — but the safety net stays in place)
- Pattern scales to the chapter's other cinematics (mirror, 6a gravlaks, 6b lefse, dock farewell)

### Cinematic 3 — GRANDPARENTS is implemented

- Registered under id `grandparents`
- Static painted scene rendered procedurally to the cinematic canvas: a wide shot of the small cabin interior — a bed on the right (Babcia seated/hunched on it), a window on the left (Dziadek standing in silhouette looking out), an open suitcase mid-frame, a small framed photograph on a nightstand near the bed. Warm dim lamp light from somewhere off-frame (a bedside lamp, off-canvas). Same palette family as the rest of the ship (cool base, warm pool). Procedural placeholder, not commissioned art — this is the locked Register A/B placeholder approach. *Aim for "you can read what each shape is" not "this looks finished."*
- The scene holds still (no looping animation in this sprint — small drift like dust motes is fine but not required)
- Plays the dialogue script verbatim from `04-chapter-01-cabin-646.md` — see **Implementation Notes** for the exact text
- After the final line dismisses, the cinematic fades out, the room appears, Pip stands at the room's left edge facing right

### The grandparents' cabin room exists

- A new room named `grandparents` is defined in the `rooms` registry alongside `cabin` and `hallway`
- The room is small — `width: 720` (smaller than the cabin's 960, half the hallway's 1440). It should feel like an interior bedroom, not a long space to explore
- Same draw conventions as cabin/hallway: stays above `FLOOR_Y`, base fill below, cool-base palette with warm pool from the lamp
- Procedural placeholder background: bed, window, suitcase, photograph on nightstand — same elements as the cinematic but rendered at room-mode scale. Babcia and Dziadek are also present as in-scene NPCs (procedural silhouettes, no glow, similar approach to the passenger from Sprint 03)
- Babcia is on the bed (right side of the room). She is making soft sounds, head bowed — a very slight downward bob (sob cadence, slow — slower than the passenger's footstep bob). She does not move from the bed
- Dziadek is at the window (left side of the room). His back is to the player. Very still — no bob. He may occasionally bring a hand to his face (optional polish; skip if it complicates the sprite)
- Neither NPC sees Pip. They never react to him. They never look toward him. This is the rule the room is teaching

### Pip walks into the room via the cinematic trigger

- The hallway's grandparents'-door inspectable changes behavior. Currently it plays a 2-line placeholder ("you reach for the handle, your hand passes through, you step back — not yet"). This sprint replaces that with the cinematic trigger
- Inspecting the door (↑) opens a single dialogue choice: *"Try the handle."* Selecting it triggers the phase-through-wood discovery and the cinematic — see **Implementation Notes** for the exact sequence
- After the cinematic ends, Pip is in the room at the left edge (just inside the door), facing right
- Walking back to the left edge of the room transitions back to the hallway, same fade pattern as cabin↔hallway. Pip enters the hallway at the position of the grandparents' door, facing left (or facing right — see **Implementation Notes**; the natural choice is facing-left, because he just stepped out of a door on his right)
- The cinematic does *not* re-play on subsequent visits to the room. The door dialogue also changes after the first visit — see **Implementation Notes**

### Four inspectables in the grandparents' room

Same proximity-sparkle pattern as cabin and hallway. The dialogue is *new* — drafted in this spec, marked draft. Adjust before merging if anything feels off.

1. **Babcia** (on the bed, right of center)
2. **Dziadek** (at the window, left of center)
3. **The photograph** (on the nightstand near the bed)
4. **The open suitcase** (mid-room floor)

All four lines are atmospheric — italic narration with one or two Pip lines folded in. No choices. The voice is the same gentle ghost-witness register the cinematic uses. Each inspectable is a small repetition of the unseen-ness: Pip *trying* to reach across the gap, and the gap holding.

### Phase-through-wood ability is discovered (narratively)

- The discovery is the single beat of Pip reaching for the handle and his hand passing through. There's no menu unlock, no ability earned notification, no journal entry yet (the journal stub doesn't exist — that's a separate sprint)
- After the cinematic, Pip can phase through wooden doors he encounters going forward. *In this sprint there are no other wooden doors to phase through* — the ability is established narratively, not yet exercised mechanically. Future sprints (e.g. Beat 8) may exercise it
- The cabin door's existing dialogue from Sprint 02 (the "Try the handle / Press your ear / Wait" interactive) stays untouched — that beat is from earlier in the chapter and reads as Pip *not yet realizing* he can pass through, even though he can. (The outline notes this small inconsistency. We accept it. The phase-through is *narratively* discovered at the grandparents' door, which is the door that matters.)

### Controls strip context

- The grandparents' room uses the same room-mode controls strip as cabin and hallway (`← →  MOVE     ↑  LOOK     ESC  JOURNAL`; floatable in dev mode adds `SPACE  FLOAT`)
- During the cinematic, strip uses the cinematic context (`SPACE  CONTINUE     ESC  SKIP` — match the existing dialogue-context conventions)

### No regressions

- Sprint 01, 01.5, 02, 02.5, tune-up, and 03 behaviors still work
- Cabin and hallway inspectables, transitions, passenger NPC all behave as before
- Walking from cabin → hallway → grandparents' cabin and back works in both directions
- Float in dev mode works in all three rooms
- No console errors at any point

## Context from design docs

### From `ch01-cabin-646-outline.md` — Beat 6 framing

> Chapter 1 is the **exposition** of the seven-beat arc. […]
>
> **Five rooms in this chapter:** Cabin 646, the hallway, grandparents' cabin, dark corridor / stairwell, the kitchen.
>
> **Abilities earned:** 1. Walk through wood (not metal). Discovered at the cabin door (Beat 4). Hand passes through the doorknob.

*(Note the outline assigns the phase-through discovery to Beat 4 / the cabin door. This sprint treats the grandparents' door as the *narrative* discovery moment instead — see Decisions Log entry to add.)*

### From `04-chapter-01-cabin-646.md` — Beat 6 verbatim

> ### Beat 6: GRANDPARENTS' CABIN (the gut punch)
> **Mode:** Cinematic 3 (GRANDPARENTS)
>
> Pip phases through the door. The screen transitions to the cinematic — the wide shot of Babcia weeping on the bed, Dziadek at the window, the open suitcase, the small photograph of Pip on the nightstand.
>
> Dialogue:
> > *Babcia is on the bed. She is making a sound that Pip has never heard her make.*
> > *Dziadek stands at the window. His shoulders are shaking. He says nothing.*
> > *On the nightstand, a photograph. Pip on his sixth birthday, holding a pierogi as big as his face.*
> > PIP: *Babcia…*
> > *She does not look up.*
> > PIP: *I'm here. I'm right here.*
> > *She does not look up.*
> > *Dziadek turns. For a moment, just a moment, he looks toward the doorway. He frowns. He shakes his head and turns back to the window.*
> > PIP: *…you almost saw me.*
>
> The cinematic holds for a beat longer than feels comfortable. Then fades.

### From `01-story-bible.md` — character details

- **Marta (Babcia)** — Pip's grandmother. The cook of the family. Her apron was passed to Pip; her recipes are the journal he hasn't yet been given
- **Jan (Dziadek)** — Pip's grandfather. Quieter. Watches the water
- They were traveling with Pip to teach him to cook through their family's foods. Pip's death is recent enough that they are still in shock — the suitcase isn't unpacked; they may not even know yet that they are returning home tomorrow with his body

### From `05-tech-architecture.md` — cinematic registry pattern

> 1. Define a draw function: `drawGrandparentsCinematic()` that draws the static scene to `cineCtx`.
> 2. Add it to `drawCinematic(name)`'s switch statement.
> 3. Trigger it from a story beat: `showCinematic('grandparents', [...lines], onEnd)`.
> 4. Later, when commissioned art arrives, swap the procedural draw for a `drawImage` call.

This sprint implements that pattern for the first time. The mirror cinematic from the original prototype is *not* in scope here — it lives in the pre-pivot prototype and gets ported in a later sprint.

### From `06-roadmap-and-open-questions.md` — Decisions Log

> **Multi-room architecture established Sprint 03.** Rooms are keyed by id in a `rooms` object; transitions use `startTransition(toRoom, entryEdge)` with input suppressed.
>
> **Scripted-walk NPCs use a one-shot trigger pattern.** Used for the Passenger (Sprint 03). NPCs who only walk use one-piece silhouettes, not the body/eyes/mouth sprite rig — the rig is reserved for NPCs who speak or react.

Babcia and Dziadek in this sprint are *not* scripted-walk NPCs — they're stationary. They're closer to room props with a sob/stillness animation than to the passenger. Use one-piece silhouettes (no sprite rig). They never speak in this sprint, so no rig is needed.

## Implementation notes

### Cinematic system

Add a new state object alongside `dialogue` and `transition`:

```javascript
const cinematic = {
  active: false,
  name: null,           // currently playing cinematic id
  lineIndex: 0,
  fadingOut: false,
  fadingIn: false,
  played: new Set(),    // ids that have been played; persists for session
  onEnd: null,
};
```

A new DOM/CSS overlay layer for cinematic content sits between the room canvas and the dialogue box. Two natural approaches — pick whichever is cleaner against the existing code:

1. **A dedicated `<canvas id="cine-canvas">` element** above the main canvas, with its own `cineCtx` 2D context, positioned absolutely at the same coordinates and z-index ~40 (just below the dialogue box z-index, just above the grain z-index). Hidden by default (`display: none` or `opacity: 0`).
2. **A second draw pass on the existing canvas** when `cinematic.active` is true — clears the canvas, draws the cinematic scene, dialogue overlays on top via HTML. Simpler; one less DOM element.

I lean toward (2) since the dialogue box is already an HTML overlay and a second canvas is needed only if a cinematic and the room need to render simultaneously, which they don't.

If you take approach (2): in `render()`, branch — if `cinematic.active`, call `drawCinematicScene(name, now)` instead of the room draw call. The dialogue overlay runs the same way it does in room mode.

### `showCinematic(name, onEnd)` flow

```
showCinematic('grandparents', () => enterRoom('grandparents', 'fromLeft')):
  1. Mark cinematic.active = true, cinematic.name = 'grandparents'
  2. cinematic.played.add('grandparents')
  3. Set up dialogue with the cinematic's lines (use existing showDialogue() but flag
     that we're inside a cinematic — see step 5)
  4. Render loop now branches to drawCinematicScene('grandparents', now)
  5. When the last line dismisses, instead of closeDialogue() returning control to
     the room directly, it fades the cinematic out:
       - cinematic.fadingOut = true
       - 600ms fade
       - cinematic.active = false
       - call onEnd if provided
```

### Trigger sequence at the door

Replace the current hallway grandparents'-door inspectable's 2-line dialogue with a 3-line setup followed by a choice:

```
Lines (italic narration unless marked PIP):
  - "From inside, the sound of someone crying. Soft. Familiar."
  - "You reach for the handle."

Choices:
  - "Try the handle." → triggers the phase-through + cinematic sequence
```

When the choice fires:
1. Close the choice dialogue
2. Brief 1-line follow-up dialogue: *"Your hand goes through. You step closer. You step through the door."* (italic)
3. On that line dismissing, `startTransition` to the grandparents' room — but instead of dropping Pip directly into the room, call `showCinematic('grandparents', () => { … })` from inside the transition's onComplete
4. The cinematic plays through its full script
5. The cinematic's `onEnd` enters the room: Pip at left edge facing right, room visible

### Cinematic dialogue script (verbatim)

```javascript
[
  { speaker: null, text: 'Babcia is on the bed. She is making a sound that Pip has never heard her make.', italic: true },
  { speaker: null, text: 'Dziadek stands at the window. His shoulders are shaking. He says nothing.', italic: true },
  { speaker: null, text: 'On the nightstand, a photograph. Pip on his sixth birthday, holding a pierogi as big as his face.', italic: true },
  { speaker: 'PIP', text: 'Babcia\u2026', italic: false },
  { speaker: null, text: 'She does not look up.', italic: true },
  { speaker: 'PIP', text: 'I\u2019m here. I\u2019m right here.', italic: false },
  { speaker: null, text: 'She does not look up.', italic: true },
  { speaker: null, text: 'Dziadek turns. For a moment, just a moment, he looks toward the doorway. He frowns. He shakes his head and turns back to the window.', italic: true },
  { speaker: 'PIP', text: '\u2026you almost saw me.', italic: false },
]
```

The eighth line (Dziadek's near-look) is the longest and the most important — let the typewriter pace land it. The ninth line is the closer; after it dismisses, *hold the cinematic on screen* for ~1.2s in silence before starting the fade. The "longer than comfortable" beat the doc asks for.

### Grandparents room data

```javascript
const grandparents = {
  width: 720,
  pipMaxX: 720 - PIP_HALF_W,
  objects: grandparentsObjects,  // see below
  draw: drawGrandparents,
  pipEntryX: {
    fromLeft: PIP_HALF_W + 8,
    fromRight: 720 - PIP_HALF_W - 8,
  },
};
```

Hallway ↔ grandparents transition: triggered when Pip walks to the **specific x-position of the grandparents' door in the hallway** (currently `x = 1180` in `drawHallway()`). This is *not* the same pattern as cabin↔hallway (which uses the room edge). The door is a specific position in the middle of the hallway, not at its right edge.

Two options for the trigger:
1. **Inspectable-triggered.** The cinematic + room transition fires only when Pip uses the door inspectable's "Try the handle" choice. He doesn't enter by walking. (This matches the current spec above.)
2. **Edge-triggered at door position.** If Pip walks to within ~8px of door x-position, room transitions automatically. (Faster, but less deliberate; the choice-to-enter beat is part of the emotional staging.)

**Go with (1)** — the inspectable choice is the deliberate moment. Walking past the door is fine; only the chosen "Try the handle" enters. *(This means leaving the grandparents' room dumps Pip back at the door position in the hallway via the inspectable's exit logic, not via a room-edge collision. See next note.)*

### Returning to the hallway

When Pip walks to the left edge of the grandparents' room, transition fires:
- Pip exits to the hallway
- Pip enters the hallway at `x = 1180` (the grandparents' door position) + a small offset (~16px left of the door so he's standing next to it, not on it)
- Pip faces left (he just stepped out of a door to his right)
- The hallway state is otherwise as he left it (passenger doesn't re-trigger, other inspectables remain inspectable)

The grandparents' door inspectable in the hallway should detect that the cinematic has been played, and on subsequent inspections show a different dialogue — see below.

### Grandparents' door post-cinematic dialogue

After the cinematic has fired once, re-inspecting the hallway's grandparents' door shows:

```
Lines (italic):
  - "Babcia and Dziadek are still inside. You can go in, but they cannot hear you."

Choices:
  - "Go in." → re-enters the grandparents' room directly (no cinematic), Pip enters from left
  - "Not now." → closes dialogue
```

This lets the player revisit the room without re-playing the cinematic, and surfaces the choice as a small ongoing moment in the chapter.

### Grandparents' room inspectable dialogue (DRAFT — adjust before merge if needed)

All four are atmospheric (no choices). Italic except where marked PIP. Two or three lines each.

**1. Babcia** (`id: 'gp-babcia'`, x near bed, e.g. x=560)

```
- "Babcia is on the bed. Her hands are folded in her apron. She is making the smallest sound."
- "You can stand right next to her. She will not look up."
- PIP: "Babciu, jestem tutaj." (italic: false, but with the line itself feeling small)
```

*(Polish — "Babcia, I'm here." If you want this English-only, use: "Babcia, I'm here. Right here." The Polish version was Babcia's language with him, so it lands harder. Your call.)*

**2. Dziadek** (`id: 'gp-dziadek'`, x near window, e.g. x=160)

```
- "Dziadek's back is to you. He hasn't turned. His shoulders are very still."
- "On the windowsill, the small radio he listens to in the evenings. Off, now."
- "You wait, in case he turns. He does not turn."
```

*(The radio is a deliberate prop — it forward-references the talk-through-speakers ability in Beat 7. Don't say more than this.)*

**3. The photograph** (`id: 'gp-photo'`, x near bed on nightstand, e.g. x=620)

```
- "Your sixth birthday. The pierogi was nearly as big as your face. You remember it tasted like butter and onions and being allowed to use the big knife."
- "You remember Babcia laughing. You don't remember if you said thank you."
```

**4. The open suitcase** (`id: 'gp-suitcase'`, x mid-room floor, e.g. x=380)

```
- "The suitcase is open. Nothing is folded. A shirt of yours is on top — the one with the boat on it."
- "They didn't have time to unpack. They didn't think they would need to."
```

If any of these feel off in tone, adjust before merge. The principle: each line is a small repetition of the unseen-ness, set against something specific and tender. Don't editorialize. Don't tell the player what to feel.

### Room art (procedural placeholder)

The grandparents' room background, drawn in `drawGrandparents(camX, now)`:

- Base fill below `FLOOR_Y`: same dark cool `#080e20` as other rooms (UI zone reservation)
- Wall gradient above `FLOOR_Y`: similar to cabin (cool base with slightly warmer pool toward bed area, where the bedside lamp is). Soften the cool tones — this is a *home* on the ship, not a hallway. Slightly warmer than the cabin
- A bedside lamp (procedural — small box with a warm radial gradient around it) in the bed area. This is the room's single dominant warm light source. Aesthetic Rule 4 applies
- A bed silhouette on the right (a low rectangle with rounded corners, a darker rectangle on top representing bedding — Babcia sits on it)
- A window on the left (a tall thin rectangle with a faint cool blue-gray fill — moonlight through portside glass at night). Dziadek's silhouette in front of it
- The suitcase: small open rectangle mid-floor, near the room center. Faint shirt-shape visible inside
- The nightstand: small box next to the bed. Photograph: tiny rectangle on top of it
- Babcia and Dziadek as one-piece silhouettes drawn procedurally (similar simplicity to the passenger from Sprint 03 — see "NPC sprites" below)
- A faint sob-cadence bob on Babcia: very slow, ~1500ms period, ~1px amplitude. Slower than the passenger's footstep bob — sob breath, not walking
- Dziadek: no animation. Stillness is the read

### NPC sprites (procedural)

Both Babcia and Dziadek follow the passenger pattern from Sprint 03: a `drawBabcia(screenX, groundY, now)` and `drawDziadek(screenX, groundY, now)` function, each rendering a one-piece silhouette in `#2a2438` (the same cool-dark tone as the passenger, to read as "of this world, not Pip's spectral one") with no glow.

**Babcia** (~24px tall): hunched-on-bed pose — wider at the bottom (skirt/legs folded), narrower at top (head bowed, shoulders rounded). Suggestion of an apron at her waist (a slightly lighter horizontal band). Hair pulled back in a small bun (a tiny circle behind the head silhouette).

**Dziadek** (~30px tall): standing tall, back to the player. Square shoulders, a tilted-down head (he's looking out, slightly down at the water). Suggestion of a flat cap or similar (squared shape at top of head). His pose conveys *holding very still*. Drawn facing left (toward the window). Don't mirror; this is his only direction.

Both are drawn beneath Pip in the render order — Pip can stand in front of them and walk past them. (This is the reverse of the passenger, who draws *over* Pip. Here, Pip is the one moving freely; the grandparents are fixtures of the room.)

### Cinematic scene rendering

In `drawCinematicScene('grandparents', now)`:

- Clear the canvas with a warm-dim base fill (`#1a1208` or similar — this is a *warm room*, the warmest in the chapter so far)
- Wider visual reference frame than room-mode — characters fill more of the vertical space than they do in the room
- Compose the scene with five elements positioned cinematically:
  1. **Window with Dziadek silhouette** on the left third — taller silhouette than room-mode, more detail (shoulders visible, the suggestion of him being a real grandfather not a sprite). Moonlit blue window behind him
  2. **Open suitcase** mid-frame, lower — partial contents visible (folded shirt, the boat-shirt sleeve, maybe a small toothbrush)
  3. **Bed with Babcia seated** on the right third — Babcia drawn with slightly more detail than her room sprite (visible curve of bent back, hand at her face). The bed has rumpled bedding
  4. **Bedside lamp** off to the very right edge, glowing warm — anchors the single-warm-light rule
  5. **Nightstand with photograph** between the bed and the suitcase — a tiny frame with a recognizable child shape inside (Pip at 6, abstractly)
- Subtle dust-motes drifting through the lamp's light cone (a few particles with random slow motion — optional, but it adds the held-still quality)
- The scene is *still*. Babcia may have a very slow sob-bob (same period as room-mode but rendered slightly more visibly here). Dziadek is still. The dust-motes are the only other motion
- The lamp light may pulse very subtly (warm flicker — Aesthetic Rule 8) but should not be distracting

This is procedural-placeholder art. It will be replaced with commissioned Register B art per the visual registers section of `03-art-and-aesthetic.md`. For now: read clearly, hold emotionally.

### State persistence

Cinematic-played state lives in `cinematic.played` (a `Set` of ids). For this sprint, persistence is **session-only** — refreshing the page resets it. Save/load is a future sprint.

If the player walks back to the hallway and returns to the grandparents' door before refreshing, the door's post-cinematic dialogue should appear (with the "Go in / Not now" choice), and entering the room should skip the cinematic.

### Decisions Log updates (add to `06-roadmap-and-open-questions.md` when complete)

When this sprint completes, add these entries to the Decisions Log:

- *"Cinematic system established Sprint 04. Cinematics are named scenes with a draw function, a dialogue script, and an onEnd callback. They render full-canvas over the room, use the existing dialogue typewriter for lines, and fade out on completion. The `cinematic.played` Set tracks which have fired this session. Pattern reused for mirror, Cinematic 6a/6b, dock farewell, and every chapter from Ch2 onward."*
- *"Phase-through-wood ability is narratively discovered at the grandparents' door (Sprint 04), not the cabin door as the outline originally stated. The cabin door's existing dialogue from Sprint 02 stays as a placeholder. The grandparents' door is the *story moment*; the cabin door's earlier scene reads as Pip not yet realizing what he can do."* — flag this for confirmation against the outline doc
- *"Stationary NPCs (Babcia, Dziadek, Sprint 04) use single-direction one-piece silhouettes with optional slow-cadence motion (sob-bob for Babcia, stillness for Dziadek). Drawn beneath Pip in render order — Pip is the foreground character; the grandparents are fixtures of the room they cannot see him in. Pattern extends to all stationary scene-occupants in future rooms (e.g. crowd extras in port chapters)."*

## Files to create or modify

**Modify:**
- `game/index.html` — add the `cinematic` state object, the cinematic registry, `showCinematic()` and `drawCinematicScene()` functions; add `grandparentsObjects` array and the `grandparents` room entry in `rooms`; add `drawGrandparents()`, `drawBabcia()`, `drawDziadek()`, `drawGrandparentsCinematic()` render functions; modify the hallway's `hallway-grandparents-door` inspectable to show the new trigger dialogue and post-cinematic dialogue
- `design-docs/06-roadmap-and-open-questions.md` — add the three Decisions Log entries above

**No new files.** Single-file constraint holds.

## Out of scope

This sprint does **not** include:

- The mirror cinematic (Beat 5) — separate sprint to port it from the pre-pivot prototype
- The radio (Beat 7) and the talk-through-speakers ability — separate sprint. The radio is *visible* in the grandparents' room as Dziadek's windowsill prop but is not yet inspectable as a story trigger
- A journal entry for this beat — the journal stub doesn't exist yet (separate sprint). The "memory" of seeing the grandparents will not be persisted
- An ability menu, ability counter, or unlock notification for phase-through-wood
- Phase-through-wood being mechanically used on any *other* door — the grandparents' door is the only door it's used on this sprint
- Animation for Dziadek bringing his hand to his face (optional polish — skip)
- Babcia ever looking up
- Audio cues (footsteps muting in the room, the soft crying sound, the lamp hum) — audio is a later pass
- Save/load — cinematic-played state is session-only
- Mobile / touch support
- Refactoring the dialogue system to handle cinematic-context differently — the same dialogue overlay does double duty

If implementation reveals one of these is unavoidable, **stop and ask**.

## Test checklist

After implementing, walk this list in the browser:

- [ ] Game starts in the cabin as before; cabin behaviors unchanged
- [ ] Walking to the hallway works; passenger walkthrough fires once on first entry
- [ ] Walk to the grandparents' door (x ≈ 1180 in the hallway); sparkle appears
- [ ] Press ↑ on the door — dialogue shows the 2-line setup ("From inside…" / "You reach for the handle.") followed by a single choice: "Try the handle."
- [ ] Selecting "Try the handle." closes the choice, shows the 1-line phase-through follow-up ("Your hand goes through…")
- [ ] After the follow-up dismisses, screen fades to black (~600ms)
- [ ] The grandparents' cinematic plays — wide painted scene appears: Babcia on the bed, Dziadek at the window, suitcase, photograph, lamp
- [ ] Dialogue plays through all 9 lines in order, advancing with space, with typewriter pacing
- [ ] The Dziadek near-look line ("Dziadek turns. For a moment…") has the typewriter time to land
- [ ] The final line ("…you almost saw me.") dismisses; cinematic holds in silence for ~1.2s
- [ ] Cinematic fades to black (~600ms); room appears with Pip at the left edge, facing right
- [ ] Pip is in a small interior room — bed on the right, window on the left, suitcase mid-floor, photograph on nightstand
- [ ] Babcia is visible on the bed, doing a slow soft sob-bob (very subtle, very slow)
- [ ] Dziadek is visible at the window, completely still, facing left
- [ ] Neither sees Pip, ever
- [ ] Walk near Babcia — sparkle, ↑ triggers her 3-line inspection
- [ ] Walk near Dziadek — sparkle, ↑ triggers his 3-line inspection (radio prop is mentioned)
- [ ] Walk near the photograph — sparkle, ↑ triggers its 2-line inspection
- [ ] Walk near the suitcase — sparkle, ↑ triggers its 2-line inspection
- [ ] Walk to the left edge of the room — transitions back to the hallway
- [ ] Pip enters the hallway near the grandparents' door (x ≈ 1180 - 16), facing left
- [ ] Passenger does not re-trigger (he already walked once)
- [ ] Re-inspect the grandparents' door — dialogue is now different: "Babcia and Dziadek are still inside…" with two choices ("Go in." / "Not now.")
- [ ] "Go in." re-enters the grandparents' room directly (no cinematic)
- [ ] "Not now." closes the dialogue; Pip stays in the hallway
- [ ] Controls strip switches correctly during the cinematic (cinematic context) and back to room mode after
- [ ] In dev mode (`?dev=1`), float works in the grandparents' room
- [ ] Refresh the page — full cinematic plays again on first entry (session-only state confirmed)
- [ ] No console errors at any point
- [ ] No regressions in any prior sprint

## Notes for after completion

When closing the Sprint 04 issue, include:
- Screenshots of: the cinematic at the Babcia-on-bed framing, the cinematic at the Dziadek-near-look line, the room itself with Pip standing in it, one inspectable triggered (Babcia or the photograph works well — they're the most emotionally loaded), the post-cinematic door dialogue
- The three Decisions Log entries to add to `06-roadmap-and-open-questions.md`
- Any tonal flags on the draft inspectable lines — if any felt off in playtest, note them for revision
- Open questions about feel: does the cinematic hold long enough on the final line? Is the sob-bob right? Does the room feel quiet enough? Is the Polish line in Babcia's inspection working, or is English better here?

After this sprint, Chapter 1 has its first true emotional peak. The "no one can see me" rule has been *shown* (Sprint 03), *taught* (this sprint, against the people who love him most), and is ready to be *broken* by Henrik in the kitchen. The cinematic system is in place for everything that comes next.
