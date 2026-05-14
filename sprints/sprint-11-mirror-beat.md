# Sprint 11: The Mirror Beat — Cabin Rework, Mirror Cinematic, Bed Reveal, Panic Exit

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

Specifically, every sprint is responsible for:

1. **Cross-references.** When a new doc is created, every related doc gets a pointer to it.
2. **Decisions Log entries.** Any decision settled in the sprint gets a row in the Decisions Log in `06-roadmap-and-open-questions.md`.
3. **Discrepancies surfaced, not silently resolved.** Contradictions between docs get flagged, not patched.
4. **Open-questions hygiene.** Resolved questions are removed and replaced with Decisions Log entries.
5. **Sprint History update.** Per Sprint 09.5, this sprint adds a row to the Sprint History table when it ships.

---

## Goal

Implement Beat 5 of Chapter 1 — the moment Pip understands he is dead. Rework the cabin to feel like an actual small ship cabin instead of a hallway with a bed in it. Add the mirror as an interactable object. Build the melting-mirror cinematic where Pip's human face dissolves into his ghost reflection. Add the bed-reveal moment where Pip pulls back the sheets and sees his own body. End with an involuntary panic-float and Pip gliding rapidly out of the cabin with comic tear-spray. Also establish the visual language for memory cinematics (foggy mist surround) so future sprints inherit it cleanly. The sprint also bundles in two carry-over items: the left-arrow-back input in dialogue, and Sprint 09.5's doc-patch deliverables if those haven't already shipped.

## Definition of done

### Cabin rework
- The cabin room geometry is reworked to feel like a small ship cabin — Pip's room, intimate, walls close. Specifics:
  - Room width reduced (or perceived-width reduced via geometry) so the cabin no longer reads as a hallway with a bed in it
  - The bed sits along one wall (player's right or left — implementer's choice based on what looks best); the mirror sits on the opposite wall or adjacent wall
  - Visible walls on left and right of the playable area (the room has *ends*, not the open hallway suggestion the current geometry conveys)
  - Floor, ceiling-suggestion (or upper-wall darkness), and at least one identifying detail that this is Pip's specific cabin (a small object: photograph, suitcase, child's drawing — pick one based on what fits the visual register established in the grandparents' room)
- Pip's existing cabin interactables from Sprint 02 (porthole, etc.) remain present and inspectable. Their dialogue is unchanged. Their positions may shift within the reworked geometry.

### Mirror as a new interactable
- A new object — the mirror — is added to the cabin objects array
- Visually: a small rectangular mirror on the wall (~24×32 px frame, ~20×28 px reflective surface) at Pip's standing-eye height
- Has the standard warm-amber aura per the Sprint 08.5 sparkle/aura design
- Cannot be interacted with until the grandparents' cinematic has played (state-gated)
- Once unlocked, pressing `↑` near the mirror triggers the mirror cinematic

### Breadcrumb aura logic
- After the grandparents' cinematic plays and Pip returns to the cabin, two objects in the cabin glow with **enhanced auras** that draw Pip toward them: the mirror, and the bed
- "Enhanced aura" = the standard distance-driven aura, but with a higher *baseline* intensity (~0.45 instead of 0.15) and a slow pulse on a ~3-second sine cycle, so the player's eye is drawn even when they're far from the object
- Once Pip has interacted with the mirror cinematic, the bed's enhanced aura intensifies further (it becomes the dominant warm pool in the room)
- After the bed reveal cinematic, all enhanced auras revert to baseline — the cinematic sequence is over; the visual prompts retire

### Mirror cinematic
- Plays when Pip interacts with the mirror (state-gated as above)
- Cinematic shows Pip's human face in close-up, looking into the mirror
- The face *melts* downward (liquid-drip effect: facial features drip like wax, pooling and reforming below as the ghost-face)
- The ghost-face that resolves is recognizable as Pip's current sprite's face, scaled up
- Mirror cinematic is *present-tense*: **no foggy-mist surround**
- A short dialogue line accompanies the resolve. Suggested (subject to your tweak): *"Pip looks. Pip looks again. The boy in the mirror is not the boy who walked in."* — italic narration per the locked voice rules, OR per your italics rule: this is third-person narration, so roman. Pip's interior reaction can be a follow-up italic line: *I'm not me.*
- Cinematic exits to gameplay with Pip standing in front of the mirror; the mirror's surface now shows the ghost-face permanently (small detail — the mirror is altered by what just happened)

### Bed reveal — Pip pulls back the sheets
- After the mirror cinematic, the bed's aura intensifies (per breadcrumb logic above)
- Pip walks to the bed; pressing `↑` triggers a new interaction
- The interaction is *not* a dialogue choice — it's a scripted action: Pip walks up to the bed, the player loses control, Pip reaches forward, the sheets pull back (procedural animation or a brief cinematic cut — see implementation notes)
- The reveal shows a small child-shaped form lying still under where the sheets were. *Do not draw the body in detail.* It's a small pale shape, face turned away, motionless. The visual is gentle, not graphic.
- Brief dialogue: *(narration, roman)* "The boy in the bed does not move." *(italics, Pip's thought)* "Oh."
- Sheets do not pull back fully — implementer leaves the body partially obscured by sheet edge. The image is implied, not displayed.

### Involuntary panic-float
- After the bed reveal dialogue closes, Pip's sprite involuntarily floats upward — same float physics as the existing float capability but scripted, not player-controlled
- He rises ~30 px above the floor, hangs briefly (~0.5s), then drifts back down
- Player has no input control during the float (movement, space, etc. are all suspended)
- This **does not unlock the float ability**. It's a one-shot story moment foreshadowing Beat 8. After the float, space-bar still does nothing for the player.

### Panic exit — fast glide with tear spray
- After Pip's feet touch back down, his sprite is animated **gliding** out of the cabin at roughly 1.8× normal walk speed — clearly faster than normal, deliberately a little comic in pace
- Glide direction is toward the cabin door (toward the hallway exit)
- **Tear spray:** small comic-strip teardrops emit from Pip's eyes/face area as he glides, arcing backward and downward, fading within ~0.4s
- Drops are simple shapes: ~2×3 px droplets, cool-white/cyan tint matching Pip's color (`#c0d8ff` or similar)
- Emit rate: ~6 drops per second while gliding
- Pip continues gliding through the door and into the hallway; the sprint ends with him paused in the hallway, player control restored
- Tears stop spraying once player control is restored

### Foggy-mist memory-cinematic visual language (defined but not used yet)
- A new reusable visual effect is added to the cinematic system: **memory mist**
- Soft white/blue mist drifts in from the four edges of the cinematic frame, semi-transparent, slowly swirling
- The effect is added to the cinematic system as an opt-in flag: `cinematic.isMemory = true` causes the mist to render
- **No cinematic in this sprint uses the flag** — the mirror cinematic and bed-reveal cinematic are both present-tense, so they do not get mist
- A test verification is included: temporarily toggle the flag on the mirror cinematic, confirm the mist renders correctly, then turn it back off before commit
- This visual language is locked: future memory cinematics (first-taste with Henrik in Sprint 12, future chapter memories) use this exact effect with no per-chapter variation

### Left-arrow-back in dialogue
- During a multi-line dialogue (atmospheric or interactive), pressing the left arrow steps the player **backward** one line
- If at the first line of a node, left arrow does nothing (no behavior, no error)
- If at a choice screen, left arrow steps backward to the previous narration line
- The controls strip during dialogue updates to include `← BACK` alongside the existing prompts
- This works for all existing dialogue nodes in the game, not just the new ones added this sprint

### Sprint 09.5 doc patches (if not yet shipped)
- If Sprint 09.5 has already shipped: skip this section entirely
- If not: this sprint includes Sprint 09.5's deliverables (echo-creature exception resolution, italics convention, sprint history section, back-key open question). See `sprint-09_5-doc-patch.md` for full spec.

### Doc updates
- New Decisions Log entries in `06-roadmap-and-open-questions.md` for:
  - Memory mist visual language locked
  - Mirror cinematic implementation + melting effect
  - Bed-reveal moment added to Chapter 1 outline (was not in original outline)
  - Involuntary panic-float as foreshadowing for Beat 8 (story decision: float unlock stays at Beat 8)
  - Left-arrow-back input in dialogue
- `04-chapter-01-cabin-646.md` updated to reflect the new bed-reveal moment in Beat 5; confirm Beat 8 float-unlock still canonical and add a forward-pointer note
- `03-art-and-aesthetic.md` Aesthetic Rules section gains a short subsection on memory-mist visual treatment
- Sprint History row added per Sprint 09.5 convention

## Context from design docs

### From `01-story-bible.md` (Beat 5 — the realization)

The mirror moment is the chapter's emotional pivot. Pip starts the chapter not knowing he's dead. By the end of Beat 5 he knows. Everything else in the chapter — finding Henrik, the first taste, the dock farewell — depends on Pip having understood his condition. The mirror must do its work; the bed must do its work; the panic must read as genuine.

The tone reminder applies with full force here: **gentle horror, never cruel.** The body in the bed is not a corpse-as-shock. It's a small still shape, face turned, implied not displayed. The melting mirror is not body-horror grotesque. It is the kind of unsettling that earns sympathy, not revulsion.

### From `03-art-and-aesthetic.md` §Aesthetic Rules

> A single warm-amber light source per scene. Deep velvety blacks. Ornate Victorian/baroque detail where present. Strong vignette. Subtle film grain.

The mirror itself becomes a warm-amber light source post-cinematic — a small pool of cool-white spirit-glow reflecting back at the player's eye.

### From `03-art-and-aesthetic.md` §Interactable object affordances (locked Sprint 08.5)

> Every object Pip can inspect, carry, or interact with carries a warm-amber aura in gameplay Register A. […] Always-on outer aura […] Distance-driven intensity […] Sparkle particle at close range […] Hidden during dialogue.

The breadcrumb logic in this sprint *extends* this system with a "story-prompted" mode: elevated baseline + slow pulse. The standard aura behavior is unchanged for non-story-prompted objects.

### From `01-story-bible.md` Narrative Voice (per Sprint 09.5)

> Roman = third-person narration. Italics = Pip's first-person interior thought. Quoted = spoken dialogue with attribution.

Apply throughout the new dialogue in this sprint. Narration is roman. Pip's reactions are italicized first-person. There is no spoken dialogue in this beat — Pip says nothing aloud in the cabin during this sequence.

### From `04-chapter-01-cabin-646.md` Beat 8 (float unlock)

Float is unlocked at Beat 8 (kitchen/Henrik sequence). This sprint deliberately does **not** unlock float. The panic-float is a scripted one-shot; it does not change `pip.float.enabled` (or whatever the existing flag is). After the cinematic ends, space bar continues to do nothing.

### From Sprint 04 (grandparents' cabin)

The cinematic system established in Sprint 04 supports named scenes with draw functions, dialogue scripts, and onEnd callbacks. The mirror and bed-reveal cinematics use the same pattern: register them in the cinematic registry, draw with their own scene functions, fade out on completion.

### From Sprint 02.5 (dialogue zone + float)

Pip's float capability exists in code. The state machine for float rise/gravity/altitude is in place. The panic-float reuses this physics — it just runs as a scripted sequence rather than player-controlled input.

## Implementation notes

### 1. Cabin rework

Find the cabin room's draw function and geometry constants. The current width feels hallway-like; reduce the playable horizontal range so the room reads as confined. Suggested approach:

- Keep `ROOM_W` constant in the global definitions, but increase the rendered wall thickness on both ends so the *playable* corridor is narrower
- Add vertical wall details (a corner of cabinetry, a wall sconce, ship-panel rivets like the hallway's `drawShipPanel`) so the room visually closes
- Position the bed along one wall, the mirror on a perpendicular wall (or visible at the back wall depending on perspective convention)
- One identifying detail in the cabin that makes it Pip's room specifically — propose: a small framed child's drawing on the wall, or a stuffed bear on the bed (the bear Babcia gave him, per the existing chat-thought reference)

The visual register should match the hallway and grandparents' room — same baseboard treatment, same panel logic, same lighting register. This is still Cabin 646. It just now feels lived-in.

### 2. Mirror geometry and aura

Add the mirror to the cabin's `objects` array with a new entry following the existing inspectable pattern. Position: somewhere along the wall opposite the bed. `sparkleY` should align with the mirror's center (eye-height of a small boy looking up at it).

The mirror's draw function is procedural: a thin frame rectangle in a darker brown/bronze, a slightly-darker rectangle inside for the reflective surface. Post-cinematic, the reflective surface shows the ghost-face — see "Mirror cinematic post-state" below.

### 3. Breadcrumb aura logic

Extend the existing `drawObjectAura()` function (from Sprint 08.5) to support a per-object override:

- Add an optional `breadcrumb` property to inspectable object entries: `breadcrumb: true | false`
- Inside `drawObjectAura()`, when `obj.breadcrumb === true`, replace the baseline intensity calculation:
  - Standard baseline: `0.15`
  - Breadcrumb baseline: `0.45 + Math.sin(now / 1000 * Math.PI / 1.5) * 0.15` (pulses 0.30 to 0.60)
- The 30 px proximity ramp continues as normal on top of the elevated baseline
- A new state flag — e.g. `chapterState.bedRevealStage` with values like `'pre-grandparents' | 'pre-mirror' | 'pre-bed' | 'post-bed'` — controls which objects have `breadcrumb: true` set at any moment. The flag transitions on cinematic completions and on the bed reveal.

### 4. Mirror cinematic — the melting effect

The mirror cinematic plays full-canvas over the cabin. Cinematic registry entry: `mirror-realization` or similar.

**Visual sequence:**

1. Open: Cinematic fades in to a tight zoom on the mirror. Pip's human face fills most of the frame — drawn at cinematic scale, more detailed than gameplay register. Camera zoom convention per Sprint 08.5: scale a sub-region of the canvas to fill the frame; the underlying Pip is the canonical pixel size, the *viewport* shows him close up.
2. Hold: Pip's face is shown for ~1.5s. Subtle blink, faint trembling.
3. Melt begins: The face starts to liquefy. Approach the melt procedurally:

   **Primary approach — liquid drip:**
   - The face is composited from a set of named regions: forehead, eyes, nose, mouth, cheeks, jaw
   - Each region has a "drip progress" that increments over time
   - As progress grows, each region's pixels are translated downward by a per-region offset (eyes drip slower than mouth, jaw drips fastest)
   - The region's silhouette fills in below with the corresponding region of the ghost-face
   - Total drip duration: ~2s

   **Fallback approach — pixel-level distortion:**
   - If the liquid drip doesn't read well during implementation, fall back to: the face is rasterized to a temporary canvas; pixels are selectively shifted downward by 1-4 rows each, with the destination cells fading in as ghost-face pixels
   - Same total duration: ~2s

   The implementer chooses based on what looks better in test. The spec doesn't lock the technique; it locks the result: face melts downward into ghost reflection over ~2s.

4. Resolve: The ghost-face is now in the mirror. Pip's underlying body sprite (drawn at canonical scale) is still visible in the room behind/below the cinematic frame's focal point.
5. Dialogue overlay (per the locked voice rules):
   - Roman narration: *Pip looks. Pip looks again. The boy in the mirror is not the boy who walked in.*
   - Italic interior: *I'm not me.*
6. Fade out cinematic back to gameplay. The mirror's reflective surface remains showing the ghost-face from this point onward.

**Mirror cinematic post-state:** After the cinematic, the mirror's `draw` function checks a state flag (`mirrorState === 'revealed'`) and renders the ghost-face inside the reflective surface instead of an empty dark rectangle. Use a tiny scaled-down version of `drawPip()` clipped to the mirror's interior.

### 5. Bed reveal cinematic

Cinematic registry entry: `bed-reveal` or similar.

**Visual sequence:**

1. Pip walks up to the bed (this is a scripted walk if the cinematic is triggered by approaching; or the player triggers it manually with `↑` while in range — implementer's choice based on what reads better)
2. Cinematic fades in, viewport zooms in on the bed
3. The sheets pull back via brief frame-by-frame animation (~3 frames, ~0.6s total): full coverage → halfway pulled back → resting at the foot of the bed
4. Underneath the sheets: a small still child-shaped form. Pale, motionless, face turned away from the viewer (toward the wall the bed sits against). **Do not draw facial features.** Hair (soft brown, matching Pip's described coloring) is visible. The body is wrapped slightly in the remaining undersheet.
5. Hold: ~2s. No movement. The form is still.
6. Dialogue overlay:
   - Roman narration: *The boy in the bed does not move.*
   - Italic interior: *Oh.*
7. Fade out cinematic. The cinematic does NOT return the bed to a sheets-covered state in the underlying cabin room — but per the spec definition above, **the body does not stay visible in the cabin after the cinematic ends.** When the cinematic fades, Pip is back in the cabin, the bed is rendered as it always was (sheets in place). The player has just experienced the reveal; the room does not preserve it.

This is a deliberate decision discussed in chat — the image lives in the player's head; keeping it on screen would be cruel.

### 6. Panic float and gliding exit

After the bed-reveal cinematic dialogue completes, the next sequence runs as a scripted action sequence (player input suspended throughout):

1. **Panic float trigger:** Cinematic ends, control nominally returns to the room. Immediately, `pip.float.altitude` is animated upward over ~0.4s (reuse existing float physics — set `pip.float.input = 'scripted-rise'` or equivalent; the existing rise-accel logic carries Pip upward).
2. **Float hold:** Pip hangs at peak altitude (~30 px) for ~0.5s.
3. **Float descent:** Existing float-gravity drops Pip back to the floor over ~0.6s.
4. **Glide start:** As soon as Pip's feet touch the floor, his sprite begins moving toward the cabin door at 1.8× the standard `PIP_SPEED`. The walk animation runs (existing walk cycle, if implemented; otherwise the idle sprite slides — either is acceptable for this sprint).
5. **Tear spray during glide:**
   - Each frame while gliding, with a 1-in-10 chance per frame, spawn a teardrop particle
   - Particles spawn at Pip's eye y-coordinate, biased toward whichever side of his face is "trailing" relative to his direction of motion
   - Each particle has: initial velocity `(−px speed × 0.3, −20 px/s)` (small backward+upward arc), gravity `100 px/s²`, alpha decay over 0.4s, then despawn
   - Color: `#c0d8ff` matching Pip's cool-spirit palette (the article on tone called for cool-white/cyan, matching Pip)
   - Render size: 2×3 px rectangles or small triangular drips (implementer's choice)
6. **Exit through door:** Pip continues until he reaches the cabin's exit position (whatever x-coordinate maps to the hallway transition). The standard room transition fires — Pip ends up in the hallway.
7. **Player control restored:** Once Pip is in the hallway and the transition completes, the panic glide ends. Tears stop spawning immediately. Pip is back to standard walk speed. Player input resumes.

The tone of this sequence is the trickiest part: it has to read as Pip-genuinely-devastated *and* as gentle-comic in execution. The comic register comes from the *fast glide + tear spray* contrast — he's grief-stricken but he's still a small ghost going about 70 km/h. Lean into it. Don't dampen.

### 7. Memory mist — defined but not used

Add a new function in the cinematic rendering layer: `drawMemoryMist(now)`.

Implementation: each frame during a memory cinematic, draw four soft mist patches at the canvas edges (top, bottom, left, right). Each patch is a radial gradient with `rgba(220, 230, 255, 0.15)` at the inward end and transparent at the outward end. Animate the patches' positions on slow sine waves (period ~6s, amplitude ~8 px) so they appear to swirl gently inward.

Add a flag to the cinematic state: `cinematic.isMemory = false` by default. Inside the cinematic render path, if `cinematic.isMemory === true`, call `drawMemoryMist()` after the cinematic's own scene render but before the dialogue overlay.

**Test the flag works** by temporarily setting `cinematic.isMemory = true` on the mirror cinematic during development, confirming the mist renders correctly, then setting it back to `false` before commit. The mirror cinematic is present-tense and must not ship with mist enabled.

### 8. Left-arrow-back in dialogue

The dialogue system from Sprint 02 advances forward on Space. Add a left-arrow handler:

- Track a `dialogue.lineHistory` array (or use the existing line index — implementer's choice)
- Pressing left arrow while a dialogue is active:
  - If `currentLineIndex > 0`: decrement the index, re-render the previous line in full (no typewriter re-animation; just show the text)
  - If at choice screen with prior narration: step back to the last narration line
  - If at first line of the node: no-op (consume the input quietly)
- The controls-strip dialogue mode strings gain `← BACK` as an extra hint, formatted alongside the existing `SPACE CONTINUE` / `↑↓ CHOOSE` strings

This should work for the new mirror and bed-reveal dialogue lines *and* every existing dialogue node (cabin porthole, hallway interactions, grandparents' room atmospherics, etc.).

### 9. Doc updates — Decisions Log entries

Append the following to `06-roadmap-and-open-questions.md` Decisions Log:

> | YYYY-MM-DD | **Memory cinematic visual language locked.** Memory/flashback cinematics receive a soft white/blue mist surround drifting in from the four edges of the cinematic frame, swirling gently inward on a ~6s cycle. Present-tense cinematics (grandparents' cabin, mirror realization, bed reveal) do NOT receive this treatment — the mist is meaningful, not decorative. Defined in Sprint 11 but not used by any cinematic in that sprint. First use: the Sprint 12 first-taste cinematic with Henrik. Documented in `03-art-and-aesthetic.md` Aesthetic Rules. |
>
> | YYYY-MM-DD | **Mirror cinematic implementation locked.** Pip's human face melts (liquid drip primary; pixel-distortion fallback if liquid doesn't read) into his ghost reflection over ~2s. Mirror's reflective surface shows the ghost-face permanently after the cinematic. Triggers when Pip interacts with the mirror after the grandparents' cinematic has played. |
>
> | YYYY-MM-DD | **Bed-reveal moment added to Chapter 1 Beat 5.** This is new content not in the original outline. After the mirror cinematic, the bed's aura intensifies; Pip approaches the bed and a cinematic plays — sheets pull back, revealing a small motionless child-shaped form, face turned away, hair visible. The body does not stay visible in the cabin after the cinematic; the room reverts to its prior state when the cinematic ends. The image lives in the player's head, not on screen. |
>
> | YYYY-MM-DD | **Involuntary panic-float locked as foreshadowing for Beat 8.** After the bed reveal, Pip's ghost-body involuntarily floats up ~30 px in panic, hangs, drops back. This is a scripted one-shot — the float ability is NOT unlocked here; space bar continues to do nothing for the player. Float remains gated to Beat 8 (kitchen/Henrik sequence). This moment plants the seed narratively; Beat 8 unlocks it as a player skill. |
>
> | YYYY-MM-DD | **Panic-exit register locked.** After the panic-float resolves, Pip glides out of the cabin at 1.8× walk speed with comic tear spray from his eyes (cool-white droplets, ~6/s, arcing backward and fading). Tone is gentle-comic: he is grief-stricken AND he is a small ghost moving very fast. Both registers live in the same beat without one undercutting the other. Player control suspended throughout; restored once Pip is in the hallway. |
>
> | YYYY-MM-DD | **Left-arrow-back in dialogue.** Pressing left arrow during dialogue steps backward one line. At first line, no-op. Controls strip during dialogue gains `← BACK` hint. Works on every dialogue node in the game. Closes the open question logged 2026-05-14. |

### 10. Doc updates — Chapter 1 outline

In `design-docs/04-chapter-01-cabin-646.md`:
- Beat 5 section updated to include the bed-reveal moment (between the mirror cinematic and the panic exit)
- Beat 5 section updated to note the involuntary panic-float and panic-glide exit
- Beat 8 section confirmed as still the canonical float unlock — add a forward-pointer note saying the panic-float in Beat 5 is foreshadowing, not the unlock

### 11. Doc updates — Aesthetic doc

In `design-docs/03-art-and-aesthetic.md` Aesthetic Rules section, add a short subsection titled **Memory cinematic visual language** describing the foggy-mist treatment as locked above. Cross-reference Sprint 11.

### 12. Sprint History row

Per Sprint 09.5's convention, add a row to the Sprint History table:

> | 11 | The mirror beat | YYYY-MM-DD | Cabin rework, mirror cinematic with melting effect, bed reveal of Pip's body, scripted panic-float and comic tear-spray exit, memory-mist visual language defined, left-arrow-back in dialogue. |

## Files to create or modify

Modify:
- `game/index.html` — substantial. Cabin geometry rework, mirror object and draw function, breadcrumb-aura extension to `drawObjectAura()`, mirror cinematic implementation and registry entry, bed-reveal cinematic implementation, panic-float and glide sequencing, tear-spray particle system, `drawMemoryMist()` function and `cinematic.isMemory` flag, left-arrow-back dialogue input.
- `design-docs/06-roadmap-and-open-questions.md` — six new Decisions Log entries; new Sprint History row; the open question on back-key resolved and removed.
- `design-docs/04-chapter-01-cabin-646.md` — Beat 5 updated with bed reveal + panic float; Beat 8 forward-pointer note.
- `design-docs/03-art-and-aesthetic.md` — new memory-mist subsection in Aesthetic Rules.

Do not modify:
- The existing `#grain` element or vignette overlay — left exactly as is.
- The existing grandparents' cinematic — it is present-tense, no memory mist, no changes.
- Sprint 09 (character gallery) deliverables — separate work.
- Sprint 10 (fullscreen) deliverables — separate work.
- The Sprint 02 porthole dialogue text or position — only its rendered position in the reworked cabin may shift.
- `prototype/` — frozen.

## Out of scope

- The first-taste cinematic with Henrik (Sprint 12 — uses the memory-mist visual language defined here, but is its own sprint)
- The kitchen room geometry, Henrik NPC, or any Beat 6/7/8 content
- The float ability *unlock* — that's Beat 8 / Sprint 12 or later
- Sound design / SFX for any of the cinematics (sound is a future sprint)
- Save/load state for the cabin's post-cinematic state (mirror showing ghost-face, etc.). For now, refreshing the page resets the chapter; the multi-sprint state-persistence work is a future system sprint.
- A general "memory journal" UI showing which memories the player has experienced (Sprint 04 deferred journal work; this remains deferred)
- Designing additional cabin objects beyond the one identifying detail (bear / drawing / etc.) called out above
- Any change to the visual register or color palette established in prior sprints
- Mobile / touch input handling for any of the new interactions
- Reactive behavior of tears or mist to player actions (purely procedural this sprint)

## Test checklist

1. **Cabin no longer reads as a hallway.**
   - Open `game/index.html`. Walk Pip around the cabin from the title-screen / room-load state. The cabin should now feel like a small ship cabin — visible walls on both ends, bed against a wall (not free-floating), mirror visible on a wall, identifying detail present.

2. **Mirror visible and gated.**
   - Before the grandparents' cinematic has played, the mirror is visible in the cabin but its aura is baseline (~0.15). Pressing `↑` near it produces no interaction (or a "the mirror is dim, somehow" placeholder if implementer chooses — flag for review).
   - After the grandparents' cinematic plays and Pip returns to the cabin, the mirror's aura is elevated (~0.45 baseline + pulse). Pressing `↑` near it triggers the mirror cinematic.

3. **Mirror cinematic plays correctly.**
   - Cinematic fades in, shows Pip's human face. Face melts (liquid drip primary; observe whether the implementation chose liquid or pixel-distortion fallback). Total melt duration ~2s. Ghost-face resolves. Dialogue overlay plays (roman narration + italic Pip's thought). Cinematic fades out.

4. **Mirror post-state.**
   - After the cinematic, the mirror's reflective surface shows Pip's ghost-face when looked at again. The original empty-mirror state does not return.

5. **Bed aura intensifies after mirror cinematic.**
   - The bed's aura is now elevated (per breadcrumb logic).

6. **Bed reveal cinematic plays correctly.**
   - Pip walks to the bed; pressing `↑` triggers the cinematic. Sheets pull back over ~0.6s. The body is visible as a small pale form with hair, face turned away. Dialogue plays. Cinematic fades out.

7. **Bed reverts after cinematic.**
   - After the bed-reveal cinematic, the bed is rendered as if the sheets were never pulled back. No body remains visible in the cabin geometry.

8. **Panic-float triggers.**
   - Immediately after the bed-reveal dialogue closes, Pip's sprite floats upward. He hangs briefly, drops back down. Player has no control during this sequence.

9. **Panic glide and tear spray.**
   - After Pip's feet touch back down, his sprite glides toward the cabin door at noticeably faster than normal walk speed. Tear droplets emit from his face area, arcing backward and downward, fading within ~0.4s.

10. **Hallway transition and control restoration.**
    - Pip exits the cabin, enters the hallway via the normal transition. The tear spray stops. Player input resumes. Pip is standing in the hallway.

11. **Float not unlocked.**
    - Pressing space bar (or whichever key is the float input) does nothing. Pip remains grounded. Float remains gated for Beat 8.

12. **Memory mist defined but not active.**
    - During the mirror cinematic: no mist visible.
    - During the bed-reveal cinematic: no mist visible.
    - Temporarily toggle `cinematic.isMemory = true` on the mirror cinematic in a development build and verify the mist renders correctly. Confirm the toggle is set back to `false` in the shipped commit.

13. **Left-arrow-back works.**
    - Open any dialogue with multiple lines (e.g., a grandparents' room atmospheric inspectable). Press left arrow. Confirm the previous line re-displays.
    - At the first line of a dialogue, press left arrow. Confirm nothing happens (no error, no crash).
    - Confirm the controls strip during dialogue includes `← BACK`.

14. **No regressions.**
    - All Sprint 01–08.5 behaviors still work — Pip walks, the hallway works, the grandparents' cinematic still plays, the porthole still inspects, music toggle still works, no console errors.

15. **Doc updates landed.**
    - `06-roadmap-and-open-questions.md` has the six new Decisions Log entries, the Sprint History row, and the resolved-and-removed open question on back-key.
    - `04-chapter-01-cabin-646.md` Beat 5 reflects the new content; Beat 8 has the forward-pointer note.
    - `03-art-and-aesthetic.md` has the new memory-mist subsection.

## Report back

After Sprint 11 lands, Claude Code reports:

1. Whether the liquid drip approach was used for the mirror, or the pixel-distortion fallback. If fallback, describe what made liquid drip not work — this informs the climax cinematic that reuses the effect.
2. Whether the bed-reveal moment landed with the right tone — gentle, not gruesome. The user's eye is the final test. Confirm by self-review: is the image of the body in the bed unsettling-as-care, or unsettling-as-shock?
3. How the panic-glide-plus-tears reads. Is the tone shift from grief to comic-relief glide cohesive, or does it feel like two different scenes stitched together? Flag if dampening is needed.
4. Whether the breadcrumb aura logic feels natural — does the player's eye get drawn to the mirror, then the bed, in the right order without explicit hand-holding?
5. The memory mist test: confirm the mist effect renders correctly when the flag is on. Describe what it looks like in one sentence so Julia can sanity-check it before Sprint 12.
6. Any discrepancies surfaced between Chapter 1 outline and the new content. Bed reveal is new — confirm doc 04 reflects it.
7. Any new open questions surfaced during implementation.
