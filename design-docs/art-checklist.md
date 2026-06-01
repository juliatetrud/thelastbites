# Chapter 1: Art Checklist

The complete art-asset list for Ch1, with status, references, and gaps. This is the reference doc for the build sprint to know what art needs commissioning, what's already drawn procedurally, and what's still on the to-do list.

This doc complements `art-asset-list.md` (the AI-prompt-bearing master list). Where the master list has the prompt and description, this doc has the **Ch1-specific status** and ties each asset to the room/beat/puzzle docs where it's used.

Where this doc and `art-asset-list.md` disagree, this doc supersedes for Ch1 — and `art-asset-list.md` should be patched to match.

---

## Status legend

- **Shipped procedural** — drawn procedurally in `game/index.html`. Functional. Replaceable with commissioned art later.
- **Shipped commissioned** — final commissioned art is in the game. Locked.
- **Stub procedural** — drawn procedurally as a temporary placeholder. Visible in code but needs revisit before chapter ships.
- **Designed not built** — character design exists in `08-character-reference-sheets.md` but no sprite implementation yet.
- **Not built** — neither designed nor implemented. Build sprint targets.
- **Retired** — listed in old docs but no longer needed.

---

## Style anchor (reference for any new art commission)

Per `03-art-and-aesthetic.md`:

- **Canvas:** 480×270 internal resolution, scaled up cleanly.
- **Register A (gameplay sprite):** True pixel art. Pip ~16-24 px. Sparse facial detail (eye-dots, blush, mouth). Three-layer rig (body, eyes, mouth) for animation.
- **Register B (cinematic):** 480×270 pixel art, same canvas, framed for close-up. Characters fill 40-60% of frame height. Painterly, more pixels per face.
- **Single light source per scene** — mandatory. Every gameplay room and cinematic has one dominant warm light.
- **Style:** "7th Guest darkness." Deep velvety blacks, ornate detail in rooms, sparse detail in sprites. The atmosphere lives in the room *around* the sprite, not in the sprite.
- **Pip's two registers:** present-day (no hair, no apron, ghost form) and memory-Pip (hair, clothing, human body underneath). Never mix.

---

## Cinematics (Ch1 has 9)

Ch1 has 9 cinematics: Cinematics 6a (gravlaks/grandfather) and 6b (lefse/Erik) are both canonical Ch1 cinematics, shipped procedurally in Sprint 26 Stage 2. *(A prior note here said "reconciled from 9 to 8, with 6a retired to Ch4" — that framing is superseded. The doubled structure is canonical per the 2026-05-23 Decisions Log entry and Sprint 26 Stage 0 doc reconciliation.)*

| # | Filename | Beat | Description | Status | Notes |
|---|---|---|---|---|---|
| 1 | `cin-01-wakeup.png` | Beat 1 | Pip materializes in hallway, yawn, sleepy register | **Shipped procedural** | Sprint 10.7. Pixel-by-pixel reveal-mask. Yawn animation runs concurrently. Hand-animated via `drawPipMaterializing`. |
| 2 | `cin-02-mirror.png` | Beat 5 | Pip's face melts in the mirror | **Shipped procedural** | Sprint 11. Liquid-drip primary; pixel-distortion fallback. Reused at Ch8 climax — **commission once, use twice.** |
| 3 | `cin-03-grandparents-cabin.png` | Beat 6 | Wide shot — Babcia weeping on bed, Dziadek at window, suitcase, photograph | **Shipped procedural** | Sprint 04 / 07. Procedural compositing via `drawGrandparentsCinematic`. Detailed character poses already locked. |
| 3b | `cin-cabin-doctor-exit.png` | Beat 4 | Doctor walks across cabin and exits through far door — silent | **Shipped procedural** | Sprint 14. No dialogue. Doctor sprite procedural, walks ~3-4s. |
| 4 | `cin-04-kitchen-cracker.png` | Beat 9 | Kitchen meeting — Pip floating with food, Henrik in silent scream | **Not built** | Henrik kitchen build sprint. Bible-described composition: diagonal energy, comic-tragic mood. |
| 5 | `cin-05-henrik-sits.png` | Beat 10 | Henrik sits on stool, looks at Pip — game's heart turns | **Not built** | Henrik kitchen build sprint. Close two-shot, intimate. Pip in soft focus to the side, listening. |
| 6a | `cin-06a-gravlaks.png` | Beat 11 | Pip tastes gravlaks; kitchen shimmers; young Henrik (~8) watches grandfather cure salmon | **Shipped procedural** | Sprint 26 Stage 2. First half of the doubled first-taste cinematic. Memory-mist treatment. |
| 6b | `cin-06b-lefse.png` | Beat 11 | Internal crossfade; Pip tastes lefse; older Henrik teaches Erik (~11) to make lefse | **Shipped procedural** | Sprint 26 Stage 2. **CRITICAL:** Erik's face must be partially visible — turned away, profile, or half-shadow. Erik is ~11 (same age as Pip — deliberate parallel). Recognizable on a second viewing, not on first. |
| 7 | `cin-07-dock-farewell.png` | Beat 12 | Wide shot — grandparents walk away with coffin; Babcia almost-turns; Pip waving at railing | **Not built** | Henrik kitchen build sprint. Cold blue-gray morning light. Frozen photograph quality. |
| 8 | `cin-08-henriks-offer.png` | Beat 13 | Two-shot — Henrik offering notebook to Pip on deck at sunset | **Not built** | Henrik kitchen build sprint. Warm orange-pink horizon. Intimate composition. |

### Additional Ch1 cinematic-style sequence (not in registry, scripted)

| Asset | Description | Status | Notes |
|---|---|---|---|
| Mirror cinematic dialogue/melt | (Beat 5) | **Shipped procedural** | Bundled into cin-02. |
| Bed-reveal cinematic | (Beat 5) | **Shipped procedural** | Sprint 11. Procedural sheets-pulling-back, small still form. The body image lives in the player's head — reverts to pre-reveal state after cinematic. |
| Panic glide + tear spray | (Beat 5) | **Shipped procedural** | Sprint 11. Scripted animation sequence, not a cinematic registry entry. Tear particles drawn procedurally. |
| Nøkken glimpse at port | (Beat 12, after Cinematic 7) | **Not built** | Henrik kitchen build sprint. Scripted visual sequence (not a registry cinematic). Dark rooted shape with two amber eyes peering from harbor water. ~3 seconds. Sepia-monochrome painterly register. See visual reference: image 1 from P1 Session 4 conversation (the rooted dark water-shape). **NOT the humanoid form** — that's Ch4+. |

---

## Room backgrounds (Ch1 has 6)

| Filename | Room | Status | Reference doc |
|---|---|---|---|
| `room-ch01-cabin646.png` | Cabin 646 | **Shipped procedural** | `rooms.md` § Cabin 646. Sprint 11 visual identity locked. Sprint 19 adds desk, washstand, under-bed drawer, inspectable child's drawing (not yet drawn). |
| `room-ch01-hallway.png` | The Hallway | **Shipped procedural** | `rooms.md` § The Hallway. Sprint 16 detail pass complete. Sprint 19 adds bulletin board as real visual asset (not yet drawn), descending staircase at far-right dark zone (not yet drawn), inspectable wall decor. |
| `room-ch01-grandparents-cabin.png` | Grandparents' Cabin | **Shipped procedural** | `rooms.md` § Grandparents' Cabin. Sprint 04 visual identity locked. Sprint 19 adds armchair with Dziadek's coat (not yet drawn). |
| `room-ch01-radio-room.png` | — | **Retired** | Per Sprint 19. There is no separate radio room — Dziadek's radio is in the grandparents' cabin. Remove this row from `art-asset-list.md`. |
| `room-ch01-dark-corridor.png` | Dark Corridor / Stairwell | **Not built** | `rooms.md` § Dark Corridor. Two-state lighting (dark / lit). Service-deck aesthetic — painted iron, exposed pipes, broken sconce, janitor's cart. Bottom of descending staircase visible from hallway. |
| `room-ch01-kitchen.png` | Kitchen | **Not built** | `rooms.md` § Kitchen. Vast dim industrial galley. Single warm pendant. Hanging copper pots. Stainless steel prep counter. Walk-in freezer doorway. Stool. |
| `room-ch01-observation-deck.png` | Observation Deck | **Not built — deferred** | `rooms.md` § Observation Deck. Wide curved viewport with aurora. Wooden benches, coiled rope, brass telescope on tripod. Cosmic-lit, not domestic. Sprint 12 locked in chapter; implementation deferred. |

### Sprint 19 background-update items

These are room-asset updates from Sprint 19 that need implementation when the cabin and hallway are next touched (likely Henrik kitchen build sprint):

**Cabin 646:**
- Desk at world-x ~220 (period-appropriate writing desk).
- Washstand at world-x ~340 (period-appropriate, near porthole).
- Under-bed drawer (visible at the foot of the bed; contains Smørbukk treat).
- Inspectable child's drawing already exists at world-x ~160; gains a narration line.
- Porthole gains a faint aurora layer (per chapter-wide aurora rule).

**Hallway:**
- Bulletin board at world-x ~260 — needs real visual asset with "WELCOME ABOARD THE MNEMOSYNE" header rendered visibly.
- Descending staircase at far-right (past world-x ~1320) — visible visual asset readable as "this is where you go next."
- All three hallway porthole scenes gain a faint aurora layer.

**Grandparents' cabin:**
- Armchair at world-x ~280 with Dziadek's coat folded over it.
- Window gains a faint aurora reflection.
- Dziadek's radio at world-x ~200 (small period-appropriate domestic radio, wooden-cased, 1900s-era Edwardian).

---

## NPC sprites

| Filename | Character | Status | Notes |
|---|---|---|---|
| `sprite-henrik-idle.png` | Henrik | **Designed not built** | `08-character-reference-sheets.md` + Sprint 09 polish. Tall white chef's toque (~14 px), cream-white apron over near-black button-up, black slacks, gray beard, sleek-fit posture (no stoop), pipe in right hand. Body 72 px (~0.65 H); total figure with toque ~86 px (~0.78 H). **High-contrast silhouette intended.** Build sprint needs sprite implementation. |
| `sprite-marta-idle.png` | Babcia (Marta) | **Shipped procedural** | Sprint 04 / Sprint 09 polish. ~60 px tall (~0.55 H). Hunched-on-bed pose. Sob-bob animation (~1500ms period, ~1px amplitude). Crying overlay available (dev-toggleable per `08-character-reference-sheets.md`). |
| `sprite-jan-idle.png` | Dziadek (Jan) | **Shipped procedural** | Sprint 04 / Sprint 09 polish. ~66-72 px tall (~0.60-0.65 H). Standing-tall, back to player, square shoulders, head tilted slightly down. Flat cap. No animation — stillness is the read. **Faces left only — don't mirror.** |
| `sprite-janitor-idle.png` | The Janitor (J. Henriksen) | **Designed not built** | `08-character-reference-sheets.md`. Crew uniform, name tag, cap, ~60-72 px (~0.55-0.65 H). Mop and cart. Scripted walk for Beat 8. Build sprint needs sprite + walk animation. |
| `sprite-passenger-idle.png` | The Passenger | **Shipped procedural** | Sprint 03. ~60-72 px tall (~0.55-0.65 H). Evening wear (formal collar, white shirt-front, dark coat). Walks corridor obliviously. |
| `sprite-doctor-idle.png` | The Doctor | **Stub procedural** | Sprint 14 + Sprint 18 (gallery entry added). Adult NPC scale (0.60-0.65 H). Dark formal coat, cream shirt, small medical bag. Tired posture. Walks across cabin, exits far door. Scripted via `drawDoctor` + `updateDoctorExit`. Gallery placeholder still uses generic box — designed sprite is Sprint 18.1. |
| `sprite-pip-in-bed.png` | Pip's body | **Shipped procedural** | Sprint 11. Small still form under sheets, face hidden. Reverts to pre-reveal state after cinematic — body never persists in room geometry. Single one-shot use. |

### Memory-only character sprites (Ch1 has 2)

| Filename | Character | Beat | Status | Notes |
|---|---|---|---|---|
| `sprite-young-henrik-memory.png` | Young Henrik | Beat 11 (Cinematic 6a) | **Not built** | Ch1 Cinematic 6a. Boy ~8 years old in cottage kitchen, watching grandfather's hands cure salmon. *(A prior note here said "retired from Ch1 — moved to Ch4." That is superseded: Cinematic 6a is canonical Ch1, Sprint 26 Stage 2.)* |
| `sprite-young-erik-memory.png` | Young Erik | Beat 11 (Cinematic 6b) | **Not built** | ~**11 years old — same age as Pip. Deliberate parallel: two boys dead too young.** Face partially visible — turned away, profile, or half-shadow. Must be recognizable on a second viewing (Ch7 reunion), not on first. *(Prior note said "~5-7 years old" — superseded by 2026-06-01 age lock.)* |
| `sprite-henriks-grandfather-memory.png` | Henrik's grandfather | Beat 11 (Cinematic 6a) | **Not built** | Ch1 Cinematic 6a. Old Norwegian man, cottage kitchen, late afternoon sun, work-shirt sleeves rolled, careful hands. *(A prior note said "retired from Ch1 — moved to Ch4." Superseded: Cinematic 6a is canonical Ch1.)* |
| `sprite-older-henrik-memory.png` | Older Henrik (teaching Erik) | Beat 11 (Cinematic 6) | **Not built** | Henrik recognizably grown — same character as present-day, slightly younger. Teaching Erik to make lefse-and-gravlaks. A different kitchen from his grandfather's. |

---

## Echo-creatures (Ch1)

Per P1 Session 1 / Sprint 19: **One pest per chapter, each unique. Ch1 = echo-mice.** Echo-spiders and echo-bats are reserved for future chapters.

| Filename | Type | Status | Notes |
|---|---|---|---|
| `echo-mouse.png` | Echo-creature (Ch1) | **Not built** | `art-asset-list.md` has the row. 10-14 px wide, drained-amber translucent. Scuttles along baseboards in dark corridor. Sparse — one or two visible, never a swarm. The dark corridor is the primary habitat. A single mouse may appear in the kitchen near the freezer doorway. |
| `echo-spider.png` | — | **Retired from Ch1** | Reserved for a future chapter per one-pest rule. |
| `echo-bat.png` | — | **Retired from Ch1** | Reserved for a future chapter per one-pest rule. |

---

## Treats (Ch1 has 4)

Per Sprint 12: Ch1 has four treats. One is locked and shipped; three need final treat selection in the build sprint.

| Filename | Location | Status | Notes |
|---|---|---|---|
| `treat-ch01-bamsemums.png` | Kitchen counter | **Shipped commissioned** | Sprint 13. The tutorial treat — taught via Beat 11b. Locked. |
| `treat-ch01-cabin.png` | Cabin under-bed drawer | **Not built** | Sprint 19 locks placement. Suggested treat: **Smørbukk** (Norwegian caramel toffee in yellow wrapper). ~10×14 px. Replay-reward (player can't collect until after Beat 11b teaches `↓`). |
| `treat-ch01-cleaning-cart.png` | Dark corridor — janitor's cart | **Not built** | Suggested treat: **Skillingsboller** (Bergen cinnamon bun, half-eaten, in waxed paper). ~14×16 px. Collectable in a brief window between cart discovery and janitor's walk (or on replay). |
| `treat-ch01-hallway.png` | Hallway — luggage trolley area | **Not built** | Sprint 19 promotes the debug-Bamsemums to canonical. Specific treat TBD — placement near luggage trolley or bulletin board. Build sprint decision. |
| `treat-ch01-observation-deck.png` | Observation deck | **Not built — deferred** | **Kvikk Lunsj** (Norwegian chocolate biscuit). Locked 2026-06-01. Left by a stargazer. |

### Notebook UI for treats

- Notebook Items section: **shipped** per Sprint 13.
- Bamsemums label/iconography in notebook: **shipped**.
- Other treats need notebook representation when picked up. Format pattern matches Bamsemums.

---

## Props and inspectables

### Cabin 646 props

| Asset | Status | Notes |
|---|---|---|
| Bed (with lump pre-reveal) | **Shipped procedural** | Sprint 10.7. Two-state: lump-visible / post-reveal-empty. |
| Mirror (with frame + reflective surface) | **Shipped procedural** | Sprint 11. Two-state: empty / ghost-face-permanent. |
| Porthole | **Shipped procedural** | Sprint 16 porthole-scenery system. Plays `ch1-ocean-night` scene. Aurora layer to be added per Sprint 19. |
| Cabin entry door | **Shipped procedural** | Sprint 02. |
| Far cabin door (doctor's exit) | **Shipped procedural** | Sprint 14. Non-interactable. |
| Child's drawing on wall | **Shipped procedural (as ambient)** | Visible in Sprint 11. Becomes inspectable per Sprint 19 — narration line added. |
| Writing desk | **Not built** | Sprint 19 addition. World-x ~220. Period-appropriate. |
| Washstand | **Not built** | Sprint 19 addition. World-x ~340. Period-appropriate. |
| Under-bed drawer | **Not built** | Sprint 19 addition. Contains Smørbukk treat. |
| Doctor sprite (for cinematic) | **Stub procedural** | Sprint 14. `drawDoctor` procedural. Designed sprite is Sprint 18.1. |

### Hallway props

| Asset | Status | Notes |
|---|---|---|
| 6 cabin doors (640, 642, 644, 646, 648, 650) | **Shipped procedural** | Sprint 16. Brass plaques centered. 644 + 646 interactive; others decorative. |
| Brass cabin-number plaques | **Shipped procedural** | Sprint 16 polish. Centered on doors. |
| Crimson runner carpet | **Shipped procedural** | Sprint 16. Narrowed per polish 1. |
| Wall sconces (2, one flickering) | **Shipped procedural** | Sprint 02 + Sprint 16. Flickering one at world-x ~820. |
| 3 portholes | **Shipped procedural** | Sprint 16. `ch1-ocean-night` scene. Aurora layer per Sprint 19. |
| Bulletin board | **Stub procedural** | Sprint 02 dialogue, no discrete visual asset. Sprint 19 requires real visual asset at world-x ~260. |
| Luggage trolley (with bear) | **Shipped procedural** | Sprint 16. World-x ~530. |
| 5 wall-decor pieces (ship photo, barometer, botanical, map, mirror) | **Shipped procedural** | Sprint 16. Two become inspectable per Sprint 19 (ship photo, navigational chart). |
| Descending staircase (far-right dark zone) | **Not built** | Sprint 19 addition. Past world-x ~1320. Visible visual signal "this is where you go next." |
| Passenger NPC | **Shipped procedural** | Sprint 03. |
| Hallway canonical treat | **Not built** | Sprint 19 promotion. Specific treat TBD. |

### Grandparents' cabin props

| Asset | Status | Notes |
|---|---|---|
| Babcia on bed | **Shipped procedural** | Sprint 04 + Sprint 09 polish. Inspectable + cinematic position. |
| Dziadek at window | **Shipped procedural** | Sprint 04 + Sprint 09 polish. Inspectable + cinematic position. |
| Photograph (on nightstand) | **Shipped procedural** | Sprint 04. Inspectable. |
| Suitcase (open, half-packed, boat-shirt) | **Shipped procedural** | Sprint 04 + Sprint 19 (pierogi recipe card line added). |
| Window (4-pane wood) | **Shipped procedural** | Sprint 04. Aurora layer per Sprint 19. |
| Bed (wide, for Babcia) | **Shipped procedural** | Sprint 04. |
| Nightstand with lamp | **Shipped procedural** | Sprint 04. The cabin's warm-pool source. |
| Dziadek's radio | **Not built** | Sprint 19 addition. World-x ~200, on windowsill. 1900s Edwardian wooden-cased. Inspectable + proximity-crackle behavior (passive). |
| Armchair with coat | **Not built** | Sprint 19 addition. World-x ~280. Dziadek's wool coat folded over it. Inspectable. |
| Soft cool-blue glow at left-edge door | **Shipped procedural** | Sprint 14. Static, subtle. |

### Dark corridor props

| Asset | Status | Notes |
|---|---|---|
| Painted iron walls | **Not built** | Service-deck aesthetic. Cooler than passenger corridor. |
| Exposed pipes | **Not built** | Overhead, world-x ~200-760. Ambient. |
| Working flickering sconce | **Not built** | World-x ~240. Weak amber, erratic flicker. Pre-puzzle only natural light. |
| Fallen / broken sconce | **Not built** | World-x ~420. Hanging off mounting at angle, wires exposed, sparking. The puzzle target. |
| Broken glass on floor | **Not built** | World-x ~420, beneath fallen sconce. Triggers float discovery. |
| Janitor's cart (with cleaning supplies + clipboard) | **Not built** | World-x ~840. Worn metal cart, mop bucket, broom, clipboard with name tag "J. Henriksen Maintenance." |
| Stairwell descending to kitchen | **Not built** | World-x ~880, right end. Ship-stair style, narrow. |
| Janitor NPC (scripted walk) | **Not built** | Crew uniform, mutters Norwegian, moves cart. |
| Echo-mice (sparse) | **Not built** | One or two, near baseboards. |

### Kitchen props

| Asset | Status | Notes |
|---|---|---|
| Stainless steel prep counter (long) | **Not built** | Center zone. World-x ~250-700. The plate of food sits here in Beat 9. |
| Hanging copper pots (4-6) | **Not built** | Back wall, world-x ~250-700. Hung from horizontal rack. |
| Pendant light (overhead, warm amber) | **Not built** | World-x ~450, ceiling. The room's primary warm light source. Visible pulse. |
| Walk-in freezer doorway | **Not built** | World-x ~880, right side. Heavy metal door, slightly ajar with cool back-light. Henrik enters/exits. |
| Stool | **Not built** | World-x ~400. Henrik sits here. Tall wooden or metal industrial-period stool. |
| Bottom of descending stairwell (from dark corridor) | **Not built** | World-x ~80, upper-left. Pip arrives here. |
| Plate of lefse-and-gravlaks | **Not built** | World-x ~450, on counter. Cinematic trigger then ambient. |
| Bamsemums bag | **Shipped** (designed per Sprint 13) | World-x ~520, behind cutting board. Tutorial treat. |
| Cutting board (hides Bamsemums bag pre-discovery) | **Not built** | Wooden cutting board, partially obscures the bag's view from a distance. |
| Dropped pan (Beat 9 cinematic prop) | **Not built** | World-x ~750, on floor after Henrik drops it. |
| Henrik's pipe + smoke animation | **Designed not built** | Pipe in right hand, drifting smoke per Sprint 09 polish. |
| Henrik's stool-sit animation | **Not built** | Sit-down animation for transition from doorway to stool. |
| Echo-mouse (optional, one near freezer) | **Not built** | Single mouse near baseboard. Sparse. |
| Notebook (Henrik's gift) | **Not built** | Cinematic 8 prop. Small leather-bound. |

### Observation deck props (deferred)

Sprint 12 locks the room into the chapter; Henrik kitchen build sprint deferred. All listed for reference.

| Asset | Status | Notes |
|---|---|---|
| Wide curved viewport | **Not built — deferred** | Wooden-framed, ship's observation glass. |
| Aurora animation (full layered) | **Not built — deferred** | Multi-layer parallax. The room's primary visual. ~15-30 second cycle. |
| Wooden benches (2-3) | **Not built — deferred** | Slatted, weathered, period-appropriate. |
| Coiled marine rope | **Not built — deferred** | Working ship-detail. |
| Brass telescope on tripod | **Not built — deferred** | Pointed upward toward aurora. |
| Observation deck treat | **Not built — deferred** | Specific treat TBD. |

---

## UI / HUD assets

| Asset | Status | Notes |
|---|---|---|
| Dialogue box (HTML overlay) | **Shipped** | Sprint 02. CSS-styled, typewriter reveal. |
| Sparkle indicator (inspect proximity) | **Shipped** | Sprint 02. Drifting warm-amber dot. |
| Collect aura (warm humming) | **Shipped** | Sprint 13. Broader pulse than sparkle. |
| Stomach indicator (HUD top-left) | **Shipped** | Sprint 13. |
| Notebook icon (HUD top-right) | **Shipped** | Sprint 13. Pulses on save / collect. |
| Notebook UI (open state) | **Shipped** | Sprint 13. Recipes + Items sections. |
| HUD hint text (e.g. "Find Babcia") | **Shipped** | Multiple sprints. |
| Controls strip | **Shipped** | Sprint 02 / multiple updates. |
| Pause overlay | **Shipped** | Sprint 17 (save state). |
| Title screen | **Shipped** | Sprint 15. |
| Room transition fade | **Shipped** | Sprint 03. |
| Memory mist (memory cinematic effect) | **Defined not used in Ch1** | Sprint 11. Available for `cinematic.isMemory = true`. **Will be activated for Cinematic 6 (first taste) in build sprint.** Mirror and bed-reveal stayed `isMemory: false` per Sprint 11. |

---

## Audio (Ch1 — not yet implemented)

No audio system exists in code yet. These are flagged for a future sound-design sprint. Build sprint can stub each with `console.log` or skip entirely.

| Sound effect | Beat | Status | Notes |
|---|---|---|---|
| Sob breath (Babcia in cinematic / inspect) | Beat 6 | **Not built** | Subtle, ambient. |
| Radio static crackle | Beat 7 (passive + discovery) | **Not built** | Looping low-volume, fades in/out with proximity. |
| Sconce buzz (post-puzzle, dark corridor) | Beat 8 | **Not built** | Each sconce buzzes back on one by one. |
| Held-button charge hum | Beat 8 (puzzle) | **Not built** | Rising electrical hum during sconce charge. |
| Cart wheels rolling | Beat 8 (janitor walk) | **Not built** | When janitor pushes cart away. |
| Dripping water (dark corridor ambient) | Beat 8 | **Not built** | Faint periodic drip. Atmospheric. |
| Dropped pan clatter | Beat 9 (Cinematic 4) | **Not built** | Diegetic crash. |
| Henrik's silent scream | Beat 9 | **Not built** | The cinematic's *cut to silence* before the scream is "AAAAAAAAA—" but the audio is unclear — should it be a real scream cut off, or pure silence? Build sprint decision. My read: silence, no actual sound. The dialogue line conveys it. |
| Wind on observation deck | Beat 12 | **Not built** | Soft ambient. |
| Music tracks | All beats | **Shipped** | Music system exists (Sprint 17 etc.). Per-room music registered. Sprint 05 / music sprint. |

---

## Procedural shipped-art summary

For the build sprint to reference at a glance — these procedural draw functions already exist in `game/index.html`:

```
drawPip / drawPipMaterializing
drawBabcia
drawDziadek
drawDoctor
drawPassenger
drawCabin / drawCabinObjects
drawHallway / drawHallwayObjects
drawGrandparents / drawGrandparentsObjects
drawGrandparentsCinematic
drawMirrorCinematic
drawBedRevealCinematic
drawDoctorExitCinematic
drawTears (panic glide particles)
drawPorthole / drawPortholeScene (Sprint 16)
drawLuggageTrolley
drawBrassFitting (plaques, handles, kickplates)
drawSconce
drawFloorPlanks
drawMemoryMist (defined, not active in Ch1 yet)
```

The Henrik kitchen build sprint needs **new procedural draw functions** for the kitchen and dark corridor:

- `drawKitchen` / `drawKitchenObjects`
- `drawDarkCorridor` / `drawDarkCorridorObjects` (with two-state lighting)
- `drawHenrik` (designed not built)
- `drawJanitor` (designed not built)
- `drawCinematic` extensions for cin-04 through cin-08
- `drawNokkenGlimpse` (scripted visual for Beat 12)
- `drawAuroraScene` (new — for cabin/hallway/grandparents porthole/window aurora layer + observation deck full aurora)
- `drawObservationDeck` / `drawObservationDeckObjects` (deferred to Ch1 content sprint)

---

## Build-sprint priority list

For the Henrik kitchen build sprint, the order to tackle assets:

### Tier 1 — Critical path for the kitchen beat

1. `drawKitchen` — room layout + counter + pendant + freezer doorway + stool
2. `drawHenrik` — sprite implementation per Sprint 09 polish
3. `drawCinematic('kitchen-meeting')` — Cinematic 4
4. `drawCinematic('henrik-sits-down')` — Cinematic 5
5. `drawCinematic('first-taste')` — Cinematic 6 with memory mist enabled
6. Older Henrik + young Erik memory sprites
7. Lefse-and-gravlaks plate
8. Henrik's stool

### Tier 2 — Critical path for the dark corridor

9. `drawDarkCorridor` — room with two-state lighting
10. Fallen sconce, working sconce (already exists), broken glass
11. Janitor's cart
12. `drawJanitor` — sprite implementation
13. Janitor's scripted walk animation
14. Echo-mouse sprite
15. Stairwell descent (visual)

### Tier 3 — Chapter completion

16. `drawCinematic('dock-farewell')` — Cinematic 7
17. `drawNokkenGlimpse` — Beat 12 scripted visual
18. `drawCinematic('henriks-offer')` — Cinematic 8
19. Notebook prop for Cinematic 8

### Tier 4 — Sprint 19 props (can ship later)

20. Cabin desk, washstand, under-bed drawer
21. Hallway bulletin-board visual asset, descending staircase
22. Grandparents' cabin armchair + coat, Dziadek's radio
23. `drawAuroraScene` — chapter-wide aurora layer

### Tier 5 — Deferred (separate Ch1 content sprint after Henrik kitchen)

24. `drawObservationDeck` — entire room
25. Observation deck treat
26. Cabin Smørbukk treat (drawer)
27. Hallway canonical treat (luggage trolley area)
28. Cleaning-cart Skillingsboller treat

---

## Asset commission readiness

For when commissioned art replaces procedural drawings, prerequisites are:

1. **Style anchor confirmation.** The first commissioned cinematic should be `cin-02-mirror.png` (the melt) — it's the chapter's most distinctive image and is reused at the Ch8 climax. Get the style right here.
2. **Erik's face partial obscurity.** Critical for Cinematic 6. Must be recognizable on Ch4 photograph viewing but ambiguous on first pass.
3. **Henrik's silhouette.** High contrast (cream apron, black slacks, black button-up, white toque). Pose: sleek-fit, no stoop, pipe in right hand. Authoritative-via-hat, not tall-via-body.
4. **Erik's face full reveal.** Reserved for Ch4. Should match the partial-obscure design from Cinematic 6 closely — same hair, same general features, with face fully visible.
5. **Single-light-source discipline.** Every commission must observe the single warm light rule. Reject art that has multiple competing light sources.

---

## Open questions for build sprint

1. **Memory mist activation.** Sprint 11 defined the memory mist effect but didn't use it. Build sprint: enable `cinematic.isMemory = true` for `first-taste` cinematic. The mist should drift in from frame edges during the Erik memory.

2. **Aurora rendering approach.** Two options per `rooms.md` § Observation Deck:
   - Reuse the `PORTHOLE_SCENES` system, extended to a non-circular clip region (cabin/hallway/grandparents windows).
   - New dedicated `drawAuroraScene` function for the deck's wide rectangular viewport.
   
   My read: **both.** Small aurora layer added to `PORTHOLE_SCENES` for windows/portholes (subtle). Dedicated `drawAuroraScene` for the deck (full).

3. **Procedural Henrik vs. commissioned Henrik.** Build sprint produces procedural sprite. Commissioned art is a later sprint. Confirm procedural ships first.

4. **Erik's face composition.** Suggested compositions in `03-art-and-aesthetic.md`: turned away, profile, half-shadow, hand-in-front. Build sprint picks one. My read: **profile + half-shadow** — the face is visible in profile but the eye-side is in shadow. This is the most ambiguous on first viewing and most recognizable on second.

5. **Janitor's walk choreography.** Per `puzzles.md` § Puzzle 6D — does the janitor enter from the hallway (offstage), or appear at the dark corridor's left edge? My read: appear at left edge (no transition required). Settle in build sprint.

6. **Specific treats for the three unbuilt locations.** Cabin (Smørbukk suggested), cleaning cart (Skillingsboller suggested), observation deck (Kvikk Lunsj or Smørbukk). Build sprint final call.

7. **Henrik's stool transition.** Cinematic 5 has Henrik crossing the kitchen to the stool and sitting. How is this animated? Per Sprint 09 polish, Henrik has standard sit-down posture. Sit-down animation needs new frames. My read: implement as a 4-frame sit-down (stand → leaning → bending knees → seated). Build sprint decision.

8. **Henrik's silent-scream face.** Cinematic 4 has Henrik mouth-open. Per `03-art-and-aesthetic.md` sprite rig, Henrik has a mouth layer that can be replaced. The silent-scream is a specific mouth-open frame. New mouth-frame asset needed.

