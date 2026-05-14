# Sprint 09: Character visual identity, gallery scaffold, and pilot batch

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

Specifically, every sprint is responsible for:

1. **Cross-references.** When a new doc is created, every related doc gets a pointer to it. When a doc is renamed or restructured, all inbound references are updated. No broken or stale cross-references after a sprint lands.
2. **Decisions Log entries.** Any decision settled in the sprint gets a row in the Decisions Log in `06-roadmap-and-open-questions.md`. The Decisions Log is the project's memory; if a decision lives only in a commit message or chat history, it doesn't exist.
3. **Discrepancies surfaced, not silently resolved.** If a sprint discovers a contradiction between docs (e.g. doc 03 says a component is X px but the prototype renders it at Y px), the contradiction is *flagged* in the sprint's output — not silently patched in either direction. The user resolves the discrepancy in a follow-up sprint or by direct instruction. The principle: catalogue first, decide second, never both in the same pass without review.
4. **Open-questions hygiene.** If a sprint answers an open question listed in any doc, the resolved question is removed from the open list and replaced with a Decisions Log entry pointing to the resolution. If a sprint surfaces a new open question, it's added to the open list explicitly.

This is the standing pattern. Each sprint spec's "Files to create or modify" and "Definition of done" sections call out the specific doc hygiene work for that sprint.

---

## Goal

Establish the project's character design vocabulary — locked color signatures, locked silhouette tells, and locked per-character movement registers — then build a single growing HTML character gallery and design the first six characters into it as a pilot batch. The gallery is the visual surface where the cast's design is reviewed and iterated; the design vocabulary it makes concrete is what every subsequent character sprint inherits.

## Definition of done

- A new section **"Character visual identity"** added to `design-docs/08-character-reference-sheets.md` codifying three vocabulary elements that apply to every character in the game (see "Implementation notes" for content).
- A new HTML page exists at `game/character-gallery.html` that:
  - Displays every named character from doc 08 as a slot, organized by category (Pip, the cats, the Greenpoint family, the ship, the chefs by chapter, the ghost-children, the monsters, the echo-creatures).
  - For characters not yet designed in this sprint, shows a labeled empty slot with the character's name, silhouette tells, color signature (once locked), and door-fraction — a "to be designed" placeholder.
  - For the **pilot batch of six** (Pip, Pätu, Henrik present-day, Babcia, Erik ghost-form, the Pocong), shows the *fully designed and animated* sprite at canonical scale.
  - Has a **"speaking" toggle** per designed character — click and the character cycles into talking-state animation, returning to idle when clicked again. Multiple characters can be in speaking state at once for comparison.
  - Has a **canonical 110px door silhouette** visible alongside the cast for live scale verification.
  - Renders without errors in a current browser. Hard pixel edges, no anti-aliasing, ImageRendering: pixelated.
- Per-character color signatures locked for every named character in doc 08 (not just the pilot batch). Some are already canonical from earlier decisions; this sprint codifies them all in one table.
- **Doc-hygiene deliverables for this sprint:**
  - Cross-reference pointer added to `03-art-and-aesthetic.md` Visual Registers section, pointing to the new "Character visual identity" section in doc 08 and the gallery.
  - Cross-reference pointer added to `09-component-scale-reference.md`'s Characters section, pointing to the gallery as the visual source-of-truth for character appearance.
  - Per-character color signature listed in each character's entry in doc 08 (where not already present from prior decisions).
  - Per-character movement register listed in each character's entry in doc 08.
  - Decisions Log entry appended to `06-roadmap-and-open-questions.md` (text below).
- All files committed in a single commit.

## Context from design docs

### What's already locked (don't redesign these)

**Pip's ghost form (Register A).** From `03-art-and-aesthetic.md`:
- ~16–20 px wide, 22–24 px tall (this sprint extends to canonical scale per Scale Anchor — Pip becomes ~32–38 px tall, door-fraction 0.30–0.35)
- Single rounded ghost shape, head and body one continuous form
- Three classic waves at the bottom
- Cool-white body, slightly translucent (alpha ~0.85), color `#f0f8ff`
- Two small dark eye-dots (`#1a1428`), set wide
- Two pink blush pixels (`#ff9888`) under the eyes
- One tiny dark mouth pixel
- Soft cool drop-shadow glow on the floor (`#a8c0ff`)
- Subtle cool halo around the body
- **No hair, no apron, no clothing, no human body underneath**
- Idle bob: 1 pixel up, 1 pixel down on a gentle cycle
- Existing reference implementation: `pip-patu-register-a.html` and `patu-animation-test.html`

**Pätu (Register A).** Locked as gray tabby. Canonical palette tokens:
- `catLight: #7a8298`, `catMid: #5a6278`, `catDark: #2a2f3a`, `catBelly: #8a92a8`
- `catEye: #ffd84a` (yellow), `catEyeBright: #ffe88a`, `catNose: #6a3a3a`, `catMouth: #1a0808`
- Door-fraction 0.20–0.25 (~22–28 px tall)
- Existing reference implementation: `patu-animation-test.html` (six state variants)

**Locked spirit color signatures.** From `03b-ui-spec.md` and decisions log:
- Pip: `#f0f8ff` (cool-white)
- Haldjas: `#ffe088` (warm gold-amber)
- Iris: `#88b8b0` (sea-green-blue underwater)
- Mamlambo / bad-ghost: `#7a1418` (blood-iron)

**Universal palette tokens** (from `03-art-and-aesthetic.md`, already in `index.html` and supporting prototypes):
- Warm pool: `--warm-pool-amber: #ffc868`, `--warm-pool-deep: #c87830`, `--warm-pool-glow: #ffe088`
- Moonlit blue region: `--region-base: #1c2858`, `--region-deep: #0e1a3a`, `--region-shadow: #5a4878`, `--region-floor: #1a2848`

### The three-layer rig pattern (locked, extends to every character)

From `03-art-and-aesthetic.md` ("Sprite-rig layering"):

> Pip's gameplay sprite is rendered as a stack of separately animatable layers on the canvas, not as a single monolithic image. Three layers, drawn back to front: **body** (silhouette, hair, apron, glow), **eyes** (two eye-dots, positioned and scaled independently of the body), **mouth** (small mouth-shape, positioned independently). Each layer can be replaced or animated on its own timeline. […] The same pattern extends to every other character sprite — Henrik, Marta, Jan, Leida, Sandy, Muhittin, Johannes, etc. — when their commissioned art arrives.

Every designed character in this sprint follows this rig. The body layer can be subdivided where useful (e.g. Henrik's body + apron + pipe-arm as three rendering passes within the body layer), but the *layer separation* of body, eyes, mouth is non-negotiable. It's what makes mouth animation universal and blinking independent.

### What we have working aesthetically (the project's house style)

The aesthetic vocabulary this sprint codifies is **not from external references** (the docs list Owlboy, Hyper Light Drifter, Hob's Barrow, Thimbleweed Park, Coraline, 7th Guest, Over the Garden Wall, Luigi's Mansion — but none of those *fully* capture what this project is doing).

The project's own style is anchored in **Pip and Pätu as they currently exist**. The pilot batch designs new characters by *extending the same sparse, silhouette-driven, palette-locked language* — not by importing a different aesthetic. Treat `pip-patu-register-a.html` and `patu-animation-test.html` as the visual touchstones.

The principles already implicit in those references:
- **Sparse but distinct.** A face is two eye-dots and a single mouth pixel. The character's identity comes from silhouette + color + movement, not detail density.
- **Color does heavy lifting.** Pätu's yellow eyes against the cool palette, Pip's cool-white against the blue room — the small color decisions are the personality.
- **Movement is small but specific.** Pip's bob is one pixel. Pätu's hiss is unmistakable from a single frame. Personality at sprite scale is animation, not finer art.
- **Warmth signals home.** Anything warm-colored in this game means *care, family, food, safety*. The humans Pip meets carry small pockets of that warmth.

### The design intent the user has given (locked this sprint)

From the design conversation that preceded this sprint:

1. **Every named human character gets a locked color signature.** Extends the existing logic (Pip cool-white, Pätu gray, Iris sea-green-blue, Mamlambo blood-iron) to the human cast.
2. **Spooky lives in the world, not on the warm characters.** Humans and chefs are warm with small spooky accents (a wisp of smoke, a faint translucence, a downcast eye). Monsters and echoes are genuinely spooky/eerie. The named ghost-children (Pip, Iris, Erik, Sandy) sit in between — they're warm-spooky.
3. **Personality lives in movement.** Every character has a personal movement register that triggers when they're speaking (the speaker is always identifiable). Eye and mouth expressions are simple but clear.
4. **No external aesthetic reference fully captures this project.** Pip and Pätu are the in-house style anchors. New characters extend from them.

### The pilot batch's job

Six characters, picked to exercise every register:

1. **Pip** — the locked anchor. May get a small refinement pass (e.g. canonical scale bump from ~24 px to ~32–38 px) but should look essentially the same as the existing implementation. Tests that the new framework doesn't break what already works.
2. **Pätu** — the second locked anchor. Same situation. Tests the cat-register works inside the new gallery.
3. **Henrik present-day** — the hub adult human. Sets the template for every other human adult.
4. **Babcia** — the second adult human, deliberately a different silhouette from Henrik (kerchief, quilted-squares, soft round). Tests whether *two* adults can read as distinct at sprite scale.
5. **Erik (ghost form)** — the translucent-human register. Sits between Pip's bald-ghost and the bald human adults. Tests that translucent-but-recognizable-human works.
6. **The Pocong** — the simplest monster (vertical white shrouded capsule, knots at the feet). Tests whether the spooky-scary register reads against the warm-human register in the same gallery.

## Implementation notes

### 1. Lock the color signatures (codified in doc 08)

Add a new section to `08-character-reference-sheets.md`, just before the "Locked-canon humans" header, titled **"Character visual identity"**. The section contains three tables.

**Table A: Color signatures.**

Every named character in doc 08 gets a row. Pre-locked values (Pip, Pätu, Iris, Haldjas, Mamlambo) are imported as-is. New values to lock this sprint:

| Character | Primary signature | Notes |
|---|---|---|
| Pip | `#f0f8ff` cool-white | Locked. Body color. |
| Pätu | Gray-tabby (`#7a8298` / `#5a6278` / `#2a2f3a`) with yellow eyes `#ffd84a` | Locked. |
| Henrik present-day | **`#e8d8b0` amber-cream apron**, gray beard `#aaaaa0`, white chef's coat `#f4eee0` | New. Apron is the silhouette tell that reads at sprite scale. |
| Babcia | **`#8a2a2a` kerchief-red** + quilted-square pattern in cream `#e8d8b0` and brown `#5a3820`; dark coat base `#2a1f28` | New. The kerchief is the silhouette tell. |
| Dziadek | **`#2a3a5a` wool deep-blue** + dark-charcoal flat cap `#1a1f2a`; patch-squares visible in Babcia's cream/red | New. The patches carry her with him. |
| Erik (ghost form) | **`#ffd8a8` warm-amber translucent** glow + dark-brown hair `#3a2818` + Norwegian working-family clothes (sweater `#5a4438`, trousers `#3a2818`) | New. Locked Q3. At-peace warm. |
| Iris | `#88b8b0` sea-green-blue translucent glow + pale-pale hair `#f8f4e8` + Edwardian dress mourning-blue `#1f2a4a` | Locked. Glow is the spirit-color; hair is the albino-looking tell. |
| Sandy (ghost form) | **`#ffc868` warm-amber translucent** glow + brown hair `#5a3820` + casual rumpled clothes | New. Q8 logic. Locked. |
| Janitor | Crew uniform muted slate `#3a4458` + brass name-tag accent `#a08664` | New, low-stakes (sprite only). |
| Passenger | Evening-wear black `#1a1f2a` + white shirt-front `#e8e0d0` + bow-tie or gown accent | New, low-stakes. |
| Pip's mother | Blonde hair `#d8c890` + pale skin + warm casual `#7a5848` knit | New per Q1. Veil-crossing translucence in warm-amber range. |
| Pip's father | Brown hair `#3a2818` + olive skin + wool sweater `#3a4438` | New per Q1. Same translucence as mother at veil-crossing. |
| Leida (elder) | Working apron neutral cream `#d8c8a0` + headscarf in muted Estonian-blue `#3a4858` | New, locked at Ch2 commission time but signature locked here. |
| Sandy's family | (see character ref for individual descriptions) — household sits in `#ffc868` warm-amber kitchen palette | New. Family-register, not individual signatures. |
| Muhittin | Sweater warm-rust `#a85838` + apron cream | New. |
| Omer | Tennis-casual whites + athletic build | New. |
| Brian | Tennis-casual blue accent | New. |
| Johannes | Working-Afrikaner brown `#5a4438` + apron + beard | New. |
| Tirta | Warung apron + warm-clay accent `#a85838` | New. |
| Joana | Brown-from-the-sun `#5a3a28` skin + forest-green accent | New. |
| Beatriz | Faded cotton dress `#a89878` + apron | New. |
| Pocong | All-white shroud `#f4eee0` against any background | Locked. |
| Haldjas | `#ffe088` warm gold-amber sparkles | Locked. |
| Karakoncolos | Dark-furred all-over `#1a1408` / `#0a0408` + eye-glow (color **[OPEN]** — cold-blue `#88a8c8` or red `#ff5050`) | New per Q9. Folkloric-hairy locked. |
| Mamlambo | `#7a1418` blood-iron eye/coil | Locked. |
| Boitatá | Fire-amber `#ffc868` / `#c87830` body + lantern-eyes | New, but warm-amber locks naturally to existing palette. |
| Black Shuck | Black-on-black body `#0a0408` + warm-amber glowing eyes `#ffc868` | New. |
| Capuchin | Capuchin coloring — brown body `#5a3a28` + white face/chest `#e8e0d0` + white ear tips | New. |
| Echo-creatures (all) | Warm-amber translucent (`#ffc868` at low alpha) | Pre-existing convention. |

**Table B: Silhouette tells.** Already documented per-character in doc 08; this sprint adds a one-line summary row per character so the table can be read at a glance. Don't duplicate the full sections — link out to each character's existing entry.

**Table C: Movement registers.** This is new and entirely this sprint's work. Each character gets a per-character movement signature that triggers when speaking. Mouth animation is universal (every character cycles closed → open → small-open → closed when speaking); the body/gesture flavor varies.

| Character | Idle | Speaking |
|---|---|---|
| Pip | Gentle 1-px vertical bob | Mouth cycle + body bob slightly more pronounced (1.5 px) |
| Pätu | Tail flick every 3-4 sec; small ear twitch | (Pätu doesn't speak — N/A) |
| Henrik | Almost still. Occasional 1-px shoulder shift. Pipe-smoke wisp drifts up from his pipe-arm. | Mouth cycle + a slow nod every 2-3 sec while speaking (he chooses his words). Pipe-arm stays down. |
| Babcia | Hands clasp and unclasp slightly in her apron (1-px hand-pixel cycle). Soft full-body sway. | Mouth cycle + slight head-bob downward (downcast, looking at her hands). Hands keep clasping. |
| Dziadek | Hands behind his back; almost-imperceptible body sway. Shoulders shake every 8-10 sec (very small — `1-2 px lateral`). | Mouth cycle + slow nod every 3-4 sec. The shoulder-shake stops while speaking (effort). |
| Erik (ghost) | Bouncing on the balls of his feet (small recurring vertical pulse, faster than Pip's bob). Translucence shimmers gently. | Mouth cycle + a delighted full-body bounce (slightly bigger amplitude). He's excited to be seen. |
| Sandy (ghost) | Stands like he owns the room. Slow rocking heel-to-toe (1-2 px horizontal). | Mouth cycle + large gesture (head tilt, shoulder shrug — exaggerated character movement). He's mid-story always. |
| Iris | Straight-backed Victorian portrait stillness. Hands loose at sides — fingers occasionally twitch (1-px finger-pixel). When in form-blur state, the body fades to ~50% alpha. | Mouth cycle + chin slightly raised (1 px). The stillness is her personality. |
| Janitor | Walks with purpose (cycle implies forward motion). | Mouth cycle + nothing else (walks past, weary). |
| Passenger | Oblivious walk. | Doesn't speak to Pip. |
| Leida | Soft elder breathing-cycle, body very gentle expand/contract. | Mouth cycle + warm cheek-raise (smile-pixel changes color slightly). |
| Pocong | Cannot walk — hops in small frantic jumps every 3-4 sec. Closed eyes flicker open briefly. | Mouth cycle + voice-as-wind: the shroud edges shimmer (1-px outline alpha cycle). Hops continue while speaking. |
| Haldjas | Sparkle cluster (procedural particle system, see existing reference). | Speaks rarely — when she does, the sparkles cluster denser and a faint mouth-line briefly appears. |
| Karakoncolos | Stooped, slow heavy breathing (frost-cloud pulse around body). Body very still otherwise. | Mouth cycle + breath cloud larger and more violent while speaking. "I don't remember" gibbering — mouth animation more erratic than other characters. |
| Mamlambo | Eye blinks slowly (vertical eyelid sweep) — every 8-10 sec. Coil motion against the porthole frame is environmental, not character. | Not a speaking character — eye-blink only. |
| Boitatá | Fire-flicker on body (procedural — fire-particle pattern). Lantern-eyes glow slowly pulse. | Speaks once, slowly. Mouth opens wide; coil rears slightly. |
| Black Shuck | Heavy breathing (chest pulse). Tail occasional sweep. | Speaks once (`a deep, satisfied bark` after feeding). No mouth-cycle — single open-mouth frame held briefly. |
| Echo-creatures | Per-type movement (skitter, swarm, drift, etc.). | Don't speak. |

The remaining characters (Sandy's family, Muhittin/Omer/Brian, Johannes, Tirta, Joana/Beatriz, Pip's parents, Henrietta if she ever surfaces, the capuchin, Iris's family) get a movement-register entry filled in at their respective sprint times.

### 2. The character gallery scaffold (`game/character-gallery.html`)

Single self-contained HTML file. No build step, vanilla JS, ImageRendering: pixelated. Follows the same conventions as `patu-animation-test.html` and `pip-patu-register-a.html` for canvas setup, palette constants, and drawing primitives.

**Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ The Last Bites — Character Gallery                                  │
│ All characters at canonical Scale Anchor (door = 110 px).           │
│                                                                     │
│ [sticky nav: Pip & Pätu | Greenpoint | Ship | Chefs | Ghosts |     │
│  Monsters | Echoes]                                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  [door]  │  │  [door]  │  │  [door]  │  │  [door]  │            │
│  │   110px  │  │   110px  │  │   110px  │  │   110px  │  ...       │
│  │  [Pip]   │  │  [Pätu]  │  │ [Henrik] │  │ [Babcia] │            │
│  │  walking │  │ sitting  │  │  idle    │  │  idle    │            │
│  │          │  │          │  │  +pipe   │  │  +hands  │            │
│  │ [SPEAK ▶]│  │  [---]   │  │ [SPEAK ▶]│  │ [SPEAK ▶]│            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
│  Pip            Pätu          Henrik        Babcia                 │
│  cool-white     gray tabby    amber-cream   kerchief-red           │
│  0.30-0.35      0.20-0.25     0.55-0.65     0.55-0.65              │
└─────────────────────────────────────────────────────────────────────┘
```

**Each character cell:**
- A canvas (say 180 × 200 px) with the canonical 110px door silhouette on the left (faint outline, not full door) and the character drawn at canonical scale on the right
- Below the canvas: character name, color signature label, door-fraction label, current state (idle / speaking / hissing / etc.)
- A "speaking" toggle button — clicking cycles the character into speaking-state animation. Multiple cells can be in speaking state simultaneously so the user can compare how different characters' movement registers read side by side
- A small dropdown (where applicable) for state variants — Pätu has six states; Pip has idle / float / surprise; Iris has wet / dry / form-blurred. The pilot batch shows the *default idle and speaking states only*; state variants for not-yet-designed characters get empty placeholder slots within the cell

**Empty slots (for not-yet-designed characters):**
- Same cell shape (canvas + label area)
- Inside the canvas: a faint outline at the canonical scale (just a rectangle of the right pixel dimensions, in a muted color), labeled with the character's name, silhouette tells (e.g. "kerchief, stoop, quilted squares"), color signature ("kerchief-red"), and door-fraction
- No speaking button (or grayed out)
- These let the user see at-a-glance who hasn't been designed yet and what the design brief is for them

**Background:** the gallery uses the same moonlit-blue base palette as the existing prototypes — `#1c2858` / `#0e1a3a` gradient — so characters render in the lighting they'll appear in during gameplay. A small toggle in the header lets the user switch backgrounds (moonlit-blue, warm-amber kitchen, neutral gray for silhouette inspection).

**The "speaking" animation:**
- Mouth-pixel cycles closed (no pixel) → small-open (1 px wide) → open (2 px wide, 1 px tall) → small-open → closed, on a loop with ~150-200ms per frame
- Body movement layers on top per the Movement Register table — different per character

### 3. Designing the pilot batch (six characters)

The six are: Pip, Pätu, Henrik present-day, Babcia, Erik ghost-form, Pocong.

For each, Claude Code writes:
- A `drawCharacterName(x, y, state, time)` function following the three-layer rig pattern (body / eyes / mouth)
- State machine for at least two states: idle and speaking
- All pixel positions, all color references to the locked palette
- Anchored to the door-fraction from the Scale Anchor / character ref sheet

**For Pip and Pätu:** port the existing implementations from `pip-patu-register-a.html` and `patu-animation-test.html` into the gallery file. Adjust to canonical scale (Pip bumps from ~24px to ~32–38px). Do not redesign visually; this is a scale-and-port pass for these two.

**For Henrik:** new design. Three-layer rig. Body includes the white chef's coat, amber-cream apron, gray beard. Pipe held in his right hand by default, drifting smoke wisp (procedural — 2-3 amber pixels rising from pipe tip). Eyes layer: two dark eye-dots, weary-set (slight downward angle). Mouth: single dark pixel, mostly closed. Stoop visible in body silhouette (top of head ~5 px right of foot center). Movement: idle = almost still, shoulder shift every 4-5 sec; speaking = slow nod every 2-3 sec, mouth cycle.

**For Babcia:** new design. Body includes kerchief-red kerchief (top of head), dark coat with visible quilted-square pattern (3-4 cream squares in a grid on the coat body), soft round outline. Hands at apron level — they cycle clasped (1 px wide) and unclasped (2 px wide, hands apart) every 2-3 sec. Eyes downcast (eye-dots positioned slightly low and narrow). Mouth small closed. Movement: idle = hands cycle + soft body sway; speaking = head-bob downward + mouth cycle + hands keep clasping.

**For Erik ghost-form:** new design. Translucent (alpha 0.7) with warm-amber halo (`#ffd8a8`). Dark hair (visible as a 2-3 px cluster on top of head). Sweater (warm-rust) and trousers (dark-brown) visible. Body has feet — he stands like a boy, not a ghost-shape. Eyes wide, mouth slightly open in delight. Movement: idle = bouncing on balls of feet (rapid 1-2 px vertical pulse, faster than Pip's bob); speaking = bigger bounce + mouth cycle.

**For Pocong:** new design. Vertical white capsule shape (~40-56 px tall, narrow). Three horizontal lines at the bottom indicating knots. Closed eyes (no visible eye-dots in idle; flicker open every 4-5 sec). No mouth visible normally — when speaking, the shroud edges shimmer (1-px outline alpha cycle) and a faint vertical line in the head area suggests speech. Cannot walk — every 3-4 sec hops in place (small vertical jump of 2-3 px).

### 4. What this sprint does NOT do

- Does not design the remaining ~20 characters. They get placeholder slots in the gallery.
- Does not modify `game/index.html`. The new gallery is a standalone reference page like the scale chart.
- Does not modify Pip's existing in-game sprite. The pilot's Pip in the gallery is a scale-and-port; reconciling the in-game Pip to canonical scale is part of the Scale Reconciliation work (a separate sprint, see Open Questions).
- Does not commit to the Karakoncolos eye-glow color (cold-blue or red) — flagged as `[OPEN]` in the color signatures table, decided at Ch4 commission time.

## Files to create or modify

Create:
- `game/character-gallery.html` (the gallery)

Modify (substantive — primary sprint deliverable):
- `design-docs/08-character-reference-sheets.md` — add the new "Character visual identity" section with Tables A, B, C. Update every existing character entry to include their color signature and movement register (where locked).

Modify (doc hygiene):
- `design-docs/03-art-and-aesthetic.md` — add a cross-reference pointer in the Visual Registers section: *"For locked per-character color signatures, silhouette tells, and movement registers, see `08-character-reference-sheets.md` § Character visual identity. For the visual gallery, see `game/character-gallery.html`."*
- `design-docs/09-component-scale-reference.md` — in the Characters section header, add a pointer: *"For the live visual reference (each character drawn at canonical scale with animation), see `game/character-gallery.html`."*
- `design-docs/06-roadmap-and-open-questions.md` — append the Decisions Log entry below.

Decisions Log entry to append:

> | 2026-05-13 | **Character visual identity locked.** Color signatures, silhouette tells, and per-character movement registers codified for the full named cast in `08-character-reference-sheets.md` § Character visual identity. The signatures extend the project's spirit-color logic (Pip cool-white, Iris sea-green-blue, etc.) to human characters: Henrik amber-cream, Babcia kerchief-red, Dziadek wool-deep-blue, Sandy warm-amber-with-brown-hair, Erik warm-amber translucent, etc. Movement registers locked per-character: each speaking character has a personal body/gesture flavor on top of universal mouth animation. Pilot batch of six characters (Pip, Pätu, Henrik, Babcia, Erik, Pocong) designed into `game/character-gallery.html` as the visual surface for ongoing cast design. Subsequent character sprints add to this gallery. The project's house style is anchored in Pip and Pätu as in-house references; no external aesthetic dominates. |

Do not modify:
- `game/index.html` (no in-game sprite changes this sprint)
- `art-asset-list.md` (this sprint doesn't touch commissioned-art prompts)
- `pip-patu-register-a.html` or `patu-animation-test.html` (preserved as historical reference implementations)
- The Pip and Pätu visual designs themselves — only their scale renders into the gallery, not the design

## Out of scope

- Designing the remaining ~20 characters. Each gets a placeholder slot.
- Reconciling the in-game Pip / Babcia / Dziadek / passenger sprites to canonical scale. That's the scale reconciliation sprint (Sprint 08.5 or 10).
- Locking color hexes for characters whose chapters haven't been fully designed yet (where canonical color isn't yet derivable from outlines — flag `[PROPOSED]` if Claude Code has to guess).
- Building animation tooling beyond what the rig already supports (no new state-machine framework, no new physics).
- The Karakoncolos eye-glow color decision — `[OPEN]`, deferred to Ch4 commission.
- Any change to the existing in-game prototype's look or feel.

## Test checklist

1. Open `game/character-gallery.html` in a browser.
   - **Expected:** every named character from doc 08 appears as a slot, organized by category. Pip, Pätu, Henrik, Babcia, Erik, Pocong render with full sprites and idle animation. Every other character shows a placeholder slot labeled with their silhouette tells, color signature, and door-fraction.

2. **Sanity-check scale relationships visually:**
   - Pip is roughly one-third the door's height.
   - Pätu is roughly one-fifth.
   - Henrik and Babcia are roughly two-thirds.
   - Erik is between Pip and the adult humans in height.
   - Pocong is taller than the adults.

3. **Click the "speaking" toggle** on each designed character.
   - **Expected:** mouth animation cycles. Each character has its own body/gesture flavor — Henrik nods slowly, Babcia head-bobs downward with clasping hands, Erik bounces more enthusiastically, etc. The differences should be readable side-by-side.

4. **Toggle multiple characters into speaking state simultaneously.**
   - **Expected:** their different movement registers contrast clearly. You can pick out "who's the calm one, who's the energetic one, who's the still one" at a glance.

5. **Switch the background between moonlit-blue and warm-amber-kitchen.**
   - **Expected:** color signatures read clearly in both. Pip looks cool against warm, Henrik looks home against warm, the Pocong looks ghostly against both.

6. **Cross-check `08-character-reference-sheets.md`.**
   - **Expected:** every character has a color signature listed. Every character has a movement register listed (or flagged for later if their chapter isn't designed). The new "Character visual identity" section reads cleanly.

7. **Cross-check the Decisions Log entry** in `06-roadmap-and-open-questions.md` — appears at the bottom, dated 2026-05-13.

8. **One sanity question for the user:** does the cast read as *one project's characters*? Do Pip and Henrik and Babcia and Erik feel like they live in the same world? Or does one feel off — too cute, too detailed, too plain? The user's eye is the final test. Flag anything that doesn't sit right for a follow-up adjustment sprint.

## Report back

After Sprint 09 lands, Claude Code reports:
1. The six pilot characters complete and rendering. Confirm.
2. Any open questions surfaced during design — character details that were underspec'd in doc 08 and required improvisation.
3. Any discrepancies discovered between doc 08 and the pilot designs (similar to Sprint 08's discrepancy log).
4. The total count of placeholder slots in the gallery awaiting future sprints.
5. Any animation behavior that proved hard to read at sprite scale and might need rethinking before Sprint 10 designs more characters.
