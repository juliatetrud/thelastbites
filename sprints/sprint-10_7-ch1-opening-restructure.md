# Sprint 10.7: Chapter 1 opening restructure — hallway start, pixelate-in yawn, lump-in-bed

> **⚠ PARTIALLY SUPERSEDED — 2026-05-18.** The section of this spec that described cabin entry order as ambiguous ("between the first-door man and the grandparents' room, **or after** — implementer's discretion") and the test question framing "hallway → cabin → grandparents' room" encode the wrong play order. Canonical beat order is: hallway → grandparents' cabin (x=920) → Cabin 646 (x=1180). See Decisions Log entry dated 2026-05-18 in `design-docs/06-roadmap-and-open-questions.md`.

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

This sprint is partly a story change. The bible (`01-story-bible.md`) and chapter outline (`04-chapter-01-cabin-646.md`) are updated *first*, then the code follows. The order matters — story is the source of truth, code serves it.

---

## Goal

Move Chapter 1's opening from "Pip wakes in the cabin" to "Pip materializes in the hallway, sleepy and unaware, and finds his cabin later." The hallway becomes the chapter's true starting point — the *neutral plane* where the ghost-world introduces itself before Pip is asked to confront what's in his bed. The cabin still exists as a destination Pip enters mid-chapter; the bed already contains a lump under the covers that Pip can sense but does not want to investigate. The bed reveal cinematic (Sprint 11) replaces the dread with knowledge.

## Definition of done

### Story / bible updates (do these first)
- `design-docs/01-story-bible.md` gains a short subsection in its Worldbuilding / Setting area explaining the **neutral plane** framing: the ghost-world is "funny" — newly-dead spirits don't wake where their body sleeps; they wake in the most-traveled space (a hallway, a sidewalk, a kitchen) so the transition is less jarring. This is canonical lore that the chapter openings rely on. Pip's hallway start is the first instance.
- `design-docs/04-chapter-01-cabin-646.md` Beat 1 is rewritten to reflect the new opening: Pip materializes pixel-by-pixel into the hallway, mid-yawn, leftmost position. He does not perceive the materialization as unusual. He yawns, narration plays, gameplay begins.
- `design-docs/04-chapter-01-cabin-646.md` is updated throughout to reflect the new flow: hallway is the home base; the cabin is a destination Pip enters from the hallway, not the chapter's starting room. The grandparents' room is also entered from the hallway. The mirror beat (Sprint 11) is contextualized as a *return* to the cabin Pip has already entered earlier in the chapter.
- The bed-with-lump is added to Beat 1 (or wherever Pip first enters the cabin in the chapter) as a pre-existing dread that Pip carries through the chapter until Sprint 11's reveal moment.

### Game-start state
- On hard game load, Pip starts in the **hallway**, at the leftmost playable x-coordinate.
- Pip cannot move further left than the start position (the hallway has a left wall — implementer adds or confirms it). Movement is right-only at game start until Pip naturally moves past the start zone.
- The existing hallway content (the first door with the man's three-choice dialogue, the porthole, the cabin door, the grandparents' door) is **preserved as-is in dialogue and behavior**. This sprint may shift positions within the hallway to accommodate the new flow but does not change what each interaction says or does.

### Pixelate-in materialization
- The chapter opens with Pip not yet visible.
- Over approximately **1.5 seconds**, Pip materializes pixel-by-pixel into existence at his start position. Implementation: render his sprite to an offscreen buffer, then progressively reveal pixels (random or scan-based pattern, implementer's choice based on what reads cleanest at this resolution).
- Pip cannot be moved or interacted with during the materialization.
- The materialization happens **once per hard game load** — refreshing the page replays it; transitioning between rooms does not.

### The yawn — opening register
- The pixelate-in and the yawn happen **together**. Pip materializes *during* the yawn, so the materialization itself feels sleepy and groggy.
- Yawn visual:
  - Pip's ghostly mouth opens wide — the existing two-pixel mouth dot becomes a small open shape (~4×3 px tall oval or trapezoid, dark interior matching the existing mouth color `#1a1428`)
  - Pip's eyes narrow to slits — eye height drops from the standard ~5px down to 1px (effectively closed) for the duration of the yawn, then opens back gradually
  - The yawn lasts approximately 1.0–1.2 seconds, peaking around 0.6s in
  - The sprite remains static otherwise — no body movement, no head tilt
- The yawn animation runs in lockstep with the pixelate-in. By the time the yawn finishes, Pip is fully materialized and idle.

### Opening narration
- Once the yawn completes (and pixelate-in is finished), a dialogue box appears with narration. Suggested text (subject to your tweak):
  - Roman narration: *Pip yawns. He doesn't remember falling asleep, but that's not unusual. The hallway hums softly around him.*
- After the narration finishes typing out, the player can press Space to dismiss. Once dismissed, player control begins.
- The opening narration plays **once per hard game load**, like the materialization.

### Lump-in-bed in the cabin
- When Pip enters the cabin (via the cabin door from the hallway), a new visual is present from this sprint onward: a **lump under the covers** on the bed. The lump is a soft shape suggesting a small body — a long bump along the bed's length, slightly larger toward where a head would be, with a slight rise where shoulders would be. Do not draw facial features, hair, or limbs. The lump is *implied*, not displayed.
- The lump has the standard warm-amber aura per the Sprint 08.5 system. Aura baseline is standard (~0.15) — this is **not** a breadcrumb-elevated aura. The pre-mirror state does not push Pip toward the bed; the dread is ambient, not directive.
- Pressing `↑` near the bed/lump triggers a single-line dialogue:
  - Italic Pip's thought: *I wonder what that lump is. Maybe I don't want to know.*
- The dialogue closes on Space. No choices. The player can re-interact, and the same dialogue plays each time (until Sprint 11's bed reveal changes the state).

### Post-reveal bed dialogue (Sprint 11 dependency, pre-wire here)
- After the Sprint 11 bed-reveal cinematic plays, the bed's state changes. The new post-reveal dialogue is:
  - Italic Pip's thought: *Hmm, my old bed.*
- This sprint adds the post-reveal dialogue *to the code* even though it can't be triggered until Sprint 11 ships. The dialogue is gated on a state flag — e.g., `cabinState.bedRevealed === true` — that Sprint 11 will set. Until then, the pre-reveal dialogue plays.

### Cabin door in the hallway
- The hallway contains a door labeled (in the dialogue / inspection prompt) as Pip's cabin. This is the door Pip uses to enter the cabin from the hallway.
- The cabin door's interaction text is updated to reflect that this is *his* room — e.g., a brief inspection line establishes that Pip recognizes the door / number as his own. Suggested text (subject to your tweak):
  - Roman narration: *Cabin 646. Pip's cabin. The door is closed but unlocked.*
- Standard interaction: press `↑` to enter (or the existing room-transition pattern).

### Cabin geometry — light cleanup pass
- This sprint does **not** do the full cabin rework that Sprint 11 will do (walls, identifying detail, mirror). But it does need to make sure the cabin contains the bed-with-lump visibly and that the room reads at least *passably* as a cabin Pip just entered. The full intimacy pass — narrow walls, identifying detail, mirror on the wall — is still Sprint 11's responsibility.
- The bed itself may need geometry updates: it must be drawable both with the lump (pre-reveal) and without (post-reveal). The lump is rendered as an overlay on the existing bed geometry, not a replacement of it.

### No regressions
- All Sprint 01–08.5 behaviors still work: hallway content, dialogue system, music toggle, grandparents' cinematic, etc.
- The grandparents' room is still entered from the hallway as before. Its content is unchanged.
- The porthole inspectable is unchanged.
- The first door's three-choice dialogue is unchanged.

## Context from design docs

### From `01-story-bible.md` (current — to be expanded)

Pip is a young ghost-boy on a haunted cruise ship. He starts the chapter not knowing he's dead. The chapter's arc carries him to that realization via the mirror.

The new lore being established this sprint: **the ghost-world is gentle by design.** Newly-dead spirits don't wake where their body lies — that would be too jarring. They wake in *neutral planes*: spaces of transit and habit rather than spaces of self. The hallway is Pip's neutral plane. He wakes there because something in the ghost-world is being kind to him.

This framing matters beyond Chapter 1: every chapter's opening can reuse it. Chapter 2's opening, Chapter 3's opening — each new port-of-call begins Pip in a neutral plane appropriate to the place. Establish the principle once, here.

### From `04-chapter-01-cabin-646.md` (current — to be revised)

The chapter currently begins with Pip in the cabin. That's being replaced. The new opening is in the hallway; the cabin becomes a destination Pip enters mid-Beat-1 or Beat-2. The mirror and bed-reveal moments (Beat 5) are unchanged in *what* they show; they're now reframed as *returns* to a space Pip has been in before.

The bed-with-lump is new content not in the prior outline. It's introduced from Beat 1 onward as ambient dread.

### From `03-art-and-aesthetic.md` §Interactable object affordances (Sprint 08.5 locked)

The aura system is unchanged. The lump uses the **standard** aura (baseline 0.15, ramp to 1.0 at 30px). It is not breadcrumb-elevated. This is deliberate — the lump is *not* asking Pip to investigate; it's quietly *being there*. The mirror beat in Sprint 11 will use breadcrumb auras to draw Pip to the mirror and then the bed. Until then, the bed is one inspectable among many.

### From `01-story-bible.md` Narrative Voice (Sprint 09.5 locked)

> Roman = third-person narration. Italics = Pip's first-person interior thought. Quoted = spoken dialogue with attribution.

The new dialogue this sprint follows this convention. Narration is roman. Pip's reactions are italicized first-person.

### From the existing hallway implementation

The hallway is implemented in `game/index.html`. It already contains: the first door with three-choice dialogue, the porthole, the grandparents' door, the cabin door (currently a wall-decoration that doesn't lead anywhere meaningful, or — TBD pending Claude Code's audit of current state — a door that needs new behavior). The cabin currently exists as a separate room that Pip starts in. This sprint inverts that: hallway is the start; cabin is a destination.

## Implementation notes

### 1. Story doc updates — do these before any code

**`design-docs/01-story-bible.md`:**

Add a new short subsection under whatever the existing Worldbuilding / Setting / The Ghost World section is called. Title: **Neutral planes**. Body:

> The ghost-world doesn't wake the newly-dead in their own beds. That would be too cruel — too jarring to confront one's own body before one knows what's happened. Instead, ghosts wake in *neutral planes*: spaces of habit, transit, or shared use. A hallway. A sidewalk. A kitchen at three in the morning. Spaces that belong to no single person.
>
> Pip wakes in the hallway of the *RMS Concordia*. He has, as far as he can tell, always woken in this hallway. He doesn't remember waking up anywhere else. The ghost-world is being kind to him; it has not yet asked him to remember.
>
> Every chapter's opening uses a neutral plane appropriate to the place. The hallway is Chapter 1's. Each chapter following has its own.

**`design-docs/04-chapter-01-cabin-646.md`:**

Beat 1 is rewritten. The new structure:

> **Beat 1 — Pip wakes in the hallway.** Pip materializes pixel-by-pixel into the leftmost end of the ship's hallway, mid-yawn. He has no memory of going to sleep; that doesn't strike him as unusual. The hallway hums faintly. He yawns; he stretches; he is awake. The player gains control. *(See Sprint 10.7 for materialization spec; player movement is right-only at start due to the hallway's left wall.)*

The cabin section in the outline is moved later. The cabin is now a destination Pip enters during the hallway exploration (between meeting the first-door man and the grandparents' room, or after — implementer's discretion based on what reads in the current implementation). The cabin contains: the porthole's prior content if it was in the cabin (verify and migrate if needed), the bed-with-lump, and the mirror (Sprint 11). The bed-with-lump is **introduced in Beat 1's first cabin visit** as ambient dread.

Update Beat 5 (mirror moment) language to reflect that it's a *return* to the cabin Pip has been in before — not a first visit. The dread is now compounded: Pip has been walking past this lump for the whole chapter; the mirror gives him no choice but to investigate.

Confirm the rest of the chapter's beats still work with the new opening. If any later beat references "Pip wakes" or "Pip in the cabin at the start," update those references.

### 2. Game-start state

Find the game's initialization code (likely in `game/index.html` near the canvas setup, room state initialization, and the first `requestAnimationFrame` call). Currently, the game starts with `currentRoom = 'cabin'` (or similar) and Pip's position somewhere inside the cabin.

Change the initial state to:
- `currentRoom = 'hallway'`
- `pip.x = <hallway leftmost playable x>` — confirm by reading the hallway's `pipMaxX` / left bound and use a coordinate just to the right of it
- A new state flag: `chapterState.openingPlayed = false` — gates the materialization sequence

If the hallway does not yet have a *visual* left wall (a rendered wall, not just a movement clamp), add one. The player should *see* that they can't go further left, not just feel it as an input dead zone.

### 3. Pixelate-in materialization + yawn

Implement as a coordinated sequence that runs once at game load, before normal game-loop logic resumes:

**State machine:**
- `openingState = 'materializing' | 'yawning' | 'narrating' | 'complete'`

**Materializing phase (~1.5s):**
- Pip is not drawn normally. Instead, an offscreen rendering of Pip's sprite is generated.
- A per-pixel `revealMask` array tracks which pixels are currently visible. Start: all hidden. End: all visible.
- Each frame, advance a "reveal counter" — number of pixels visible — proportional to elapsed time / total materialization duration.
- The order of pixel reveal: implementer's choice between random sprinkle, scan-line top-to-bottom, scan-line bottom-to-top, or center-outward radial. **My suggested default: random sprinkle, with a slight bias toward later-revealing the eyes and mouth so the face "completes" last.**
- Render only the revealed pixels each frame.

**Yawning phase (overlapping with materializing):**
- Begins at materialization t=0.
- The yawn is rendered as part of the standard `drawPipMouth()` and `drawPipEyes()` functions, gated by an `openingState === 'materializing' || openingState === 'yawning'` check.
- Mouth: replace the standard 2×2 dot with an open shape. Suggested geometry: an oval ~4 px wide × 3 px tall (or a small trapezoid), interior dark. The exact shape opens over ~0.3s, holds peak open for ~0.3s, closes over ~0.4s.
- Eyes: narrow from `eyeH = 5` (or whatever the current open value is, scaled per the Sprint 08.5 sizing) down to `eyeH = 1` (slits) over the same timing as the mouth opening. Hold slits during peak yawn. Reopen as the mouth closes.

**Narrating phase (~3-5s for typewriter):**
- After the yawn ends, the dialogue box opens with the opening narration.
- Standard typewriter behavior, standard Space-to-dismiss. The dialogue is registered as a one-shot atmospheric dialogue (no choices).
- `openingState = 'narrating'` during this phase.

**Complete:**
- `openingState = 'complete'`. `chapterState.openingPlayed = true`. Normal player input resumes.

**Critical detail:** the entire opening sequence must be skippable on subsequent reloads only if `chapterState.openingPlayed` is true — and it should NOT be (game starts fresh each hard load). Refreshing the browser replays the opening. This is by design — the materialization is a chapter-opening moment, not a one-time-per-save event.

### 4. Hallway content gating and the cabin door

Audit the current hallway implementation:
- Where is the cabin door positioned in the hallway? (Or does the hallway currently have a placeholder for it that isn't wired?)
- If wired: verify pressing `↑` near it triggers a room transition to the cabin. Update the cabin-door inspection text to use the new line: *Cabin 646. Pip's cabin. The door is closed but unlocked.*
- If not wired: add the cabin door at a sensible position in the hallway (between the first-door's man and the grandparents' door, or wherever the existing geometry suggests). Wire the room transition.

### 5. The bed and its lump

Find the current bed-draw function (likely `drawBed()` or inline in the cabin's draw function).

Add a layered overlay representing the lump:
- A long bump along the bed's length, ~12 px tall, ~50 px wide, slightly larger toward the "head" end (~14 px tall at the head, tapering to ~10 px at the foot)
- Color: slightly different from the bed's covers — a faint shadow tint suggesting the bulk of a body underneath
- The lump is drawn **conditionally** based on `cabinState.bedRevealed`:
  - `false` (default): lump is drawn
  - `true` (after Sprint 11): lump is not drawn; just the made bed

Add the bed to the cabin's `objects` array (if it isn't already) as an inspectable, with:
- `sparkleY` aligned to the lump's vertical center
- An `inspect()` function (or dialogue node) that branches on `cabinState.bedRevealed`:
  - `false`: italic narration *"I wonder what that lump is. Maybe I don't want to know."*
  - `true`: italic narration *"Hmm, my old bed."*
- Standard aura (not breadcrumb-elevated).

### 6. Doc updates — Decisions Log entries

Append to `06-roadmap-and-open-questions.md` Decisions Log:

> | YYYY-MM-DD | **Chapter 1 opening restructured.** Pip now starts in the hallway, not the cabin. The cabin becomes a destination Pip enters mid-chapter. Pip materializes pixel-by-pixel into the hallway over ~1.5s, mid-yawn, with no awareness of the materialization. Standard for ghost-world openings: every chapter opens in a "neutral plane." Documented in `01-story-bible.md` (new Neutral planes subsection) and `04-chapter-01-cabin-646.md` (Beat 1 rewrite). |
>
> | YYYY-MM-DD | **Neutral planes — ghost-world lore.** Newly-dead spirits don't wake where their body sleeps; they wake in neutral planes (hallways, sidewalks, shared spaces) so the transition is gentle. Pip's Chapter 1 opening establishes this; every chapter's opening uses an appropriate neutral plane. |
>
> | YYYY-MM-DD | **Bed-with-lump introduced as ambient dread.** The lump is visible in Pip's bed from Beat 1 onward. It uses standard aura (not breadcrumb-elevated) — the dread is ambient, not directive. Pip can investigate; the dialogue ("I wonder what that lump is. Maybe I don't want to know") establishes that he chooses not to look. The lump remains until Sprint 11's bed reveal cinematic; afterward, the lump is removed and the bed shows a post-reveal dialogue ("Hmm, my old bed"). |

### 7. Sprint History row

Per Sprint 09.5's convention, add a row to the Sprint History table:

> | 10.7 | Chapter 1 opening restructure | YYYY-MM-DD | Hallway start with materialization + yawn opening, lump-in-bed pre-reveal dialogue, post-reveal dialogue wired but state-gated to Sprint 11, neutral-plane lore established. |

## Files to create or modify

Modify (story / docs — do these first):
- `design-docs/01-story-bible.md` — add Neutral planes subsection
- `design-docs/04-chapter-01-cabin-646.md` — Beat 1 rewrite, bed-with-lump introduction, Beat 5 reframing as "return"
- `design-docs/06-roadmap-and-open-questions.md` — three new Decisions Log entries, Sprint History row

Modify (code — do these after the story is locked):
- `game/index.html`:
  - Initial game state: `currentRoom = 'hallway'`, Pip's position at hallway-leftmost
  - Hallway left wall (visual, if not already present)
  - Materialization + yawn opening sequence
  - Cabin door in hallway, wired with new dialogue
  - Bed draw function: lump overlay, conditional on `cabinState.bedRevealed`
  - Bed inspectable: state-gated dialogue (pre-reveal italic, post-reveal italic)

Do not modify:
- The first door's three-choice dialogue text or behavior
- The grandparents' room or its cinematic
- The porthole's content (only its position if needed)
- The dialogue box system, controls strip, music toggle, room transition system
- Any sprite designs (Pip's sprite rig is unchanged — the yawn uses the existing layer system)
- `prototype/` — frozen

## Out of scope

- The mirror, the mirror cinematic, the bed reveal cinematic — Sprint 11.
- The full cabin intimacy rework (narrow walls, identifying detail, perpendicular wall geometry) — Sprint 11.
- The breadcrumb aura system — Sprint 11.
- Memory cinematic visual language (foggy mist) — Sprint 11.
- Panic float and tear-spray glide — Sprint 11.
- Left-arrow-back in dialogue — Sprint 11.
- Sound design for the materialization or yawn.
- Save/load persistence of the `chapterState.openingPlayed` flag (the opening replays on hard reload by design).
- Other chapters' neutral-plane openings — those are established here as canonical, but built per-chapter when those chapters are scoped.

## Test checklist

1. **Hard reload starts in hallway.**
   - Open `game/index.html`. Pip is not yet visible. Over ~1.5s, his sprite materializes pixel-by-pixel at the leftmost end of the hallway, mid-yawn.

2. **Yawn animation reads.**
   - During materialization, Pip's mouth is wide open and his eyes are narrowed to slits. As materialization completes, the mouth closes and eyes reopen.

3. **Opening narration plays.**
   - After the yawn completes, a dialogue box appears with the narration. Player presses Space to dismiss.

4. **Player control begins.**
   - After dismissing the narration, the player can move Pip with arrow keys.

5. **Left wall stops movement.**
   - Pip cannot move further left than his start position. The hallway visibly ends in a wall on the left.

6. **Rightward movement works.**
   - Pip walks right through the hallway. Existing content (first door, porthole, grandparents' door) all work as before.

7. **Cabin door wired.**
   - Pip walks to the cabin door in the hallway. Inspection text: *Cabin 646. Pip's cabin. The door is closed but unlocked.* Pressing `↑` transitions to the cabin room.

8. **Cabin contains lump-in-bed.**
   - Inside the cabin, the bed is visible with a soft, body-shaped lump under the covers. The lump has standard aura behavior (faint at baseline, brightens as Pip approaches).

9. **Lump dialogue plays.**
   - Pip walks to the bed. Pressing `↑` triggers the dialogue: *(italic) "I wonder what that lump is. Maybe I don't want to know."* Dialogue closes on Space.

10. **Re-interacting plays the same line.**
    - Pip can interact with the bed multiple times. The same italic line plays each time. No state change.

11. **Bed reveal flag wired (Sprint 11 dependency).**
    - In code, the `cabinState.bedRevealed` flag exists. Setting it manually to `true` (via dev console or debug command) and re-interacting with the bed should show the post-reveal dialogue: *(italic) "Hmm, my old bed."* and the lump should not be drawn. Set the flag back to `false` before commit.

12. **Hard reload replays the opening.**
    - Refresh the browser. The materialization + yawn + narration play again from the start.

13. **No regressions.**
    - Grandparents' cinematic still plays correctly.
    - Music toggle works.
    - Room transitions work normally for all rooms.
    - No console errors.

14. **Doc updates landed.**
    - `01-story-bible.md` has the new Neutral planes subsection.
    - `04-chapter-01-cabin-646.md` Beat 1 is rewritten. Beat 5 mirror moment is reframed as a return. Bed-with-lump is introduced in Beat 1's cabin visit.
    - `06-roadmap-and-open-questions.md` has three new Decisions Log entries and a Sprint History row.

## Report back

After Sprint 10.7 lands, Claude Code reports:

1. The materialization effect — describe what it looks like in one sentence. Confirm it reads as gentle / sleepy / groggy (per the design intent) and not as glitchy / jarring.
2. The yawn animation — confirm the mouth-open + eyes-narrow combination reads as a yawn at the sprite scale, not as a grimace or surprise expression.
3. Whether the narration line landed well at typewriter speed, or whether it feels too long / too short.
4. Whether the new flow (hallway → cabin → grandparents' room) reads as natural exploration, or whether the player gets confused about where to go next. Specifically: does the cabin feel like *Pip's* cabin from the moment he enters it, or does it feel generic?
5. Any new discrepancies surfaced — specifically, anything in the existing hallway implementation that doesn't fit the new flow (e.g., if the cabin door was previously a placeholder, what work was needed to wire it cleanly).
6. Any new open questions surfaced during implementation.
