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
| 4 | `cin-04-kitchen-cracker.png` | Beat 9 | Kitchen meeting — Pip floating with food, Henrik in silent scream | **Shipped procedural** | Sprint 26 Stage 1. `drawKitchenMeetingCinematic()`. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| 5 | `cin-05-henrik-sits.png` | Beat 10 | Henrik sits on stool, looks at Pip — game's heart turns | **Shipped procedural** | Sprint 26 Stage 2. `drawHenrikSitsDownCinematic()`. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| 6a | `cin-06a-gravlaks.png` | Beat 11 | Pip tastes gravlaks; kitchen shimmers; young Henrik (~8) watches grandfather cure salmon | **Shipped procedural** | Sprint 26 Stage 2. First half of the doubled first-taste cinematic. Memory-mist treatment. |
| 6b | `cin-06b-lefse.png` | Beat 11 | Internal crossfade; Pip tastes lefse; older Henrik teaches Erik (~11) to make lefse | **Shipped procedural** | Sprint 26 Stage 2. Sprint 34 (`drawMemory6bScene`) applies Decisions B + C: Erik's face toward viewer, hair `#d8b860` (blond), eyes `#2a4878` (blue), fair skin `#d0b890`, gap tooth. Recognition payoff in Ch6 photo → Ch7 ghost chain. |
| 7 | `cin-07-dock-farewell.png` | Beat 12 | Wide shot — grandparents walk away with coffin; Babcia almost-turns; Pip waving at railing | **Shipped procedural** | Sprint 29 (`567e82a`). `drawDockFarewellCinematic()`. Cold blue-gray morning. |
| 8 | `cin-08-henriks-offer.png` | Beat 13 | Two-shot — Henrik offering notebook to Pip on deck at sunset | **Shipped procedural** | Sprint 29 (`567e82a`). `drawHenriksOfferCinematic()`. Warm orange-pink horizon. Notebook prop drawn procedurally inline. |

### Additional Ch1 cinematic-style sequence (not in registry, scripted)

| Asset | Description | Status | Notes |
|---|---|---|---|
| Mirror cinematic dialogue/melt | (Beat 5) | **Shipped procedural** | Bundled into cin-02. |
| Bed-reveal cinematic | (Beat 5) | **Shipped procedural** | Sprint 11. Procedural sheets-pulling-back, small still form. The body image lives in the player's head — reverts to pre-reveal state after cinematic. |
| Panic glide + tear spray | (Beat 5) | **Shipped procedural** | Sprint 11. Scripted animation sequence, not a cinematic registry entry. Tear particles drawn procedurally. |
| Nøkken glimpse at port | (Beat 12, after Cinematic 7) | **Shipped procedural** | Sprint 29 (`567e82a`). `drawNokkenGlimpse()`. Scripted ~3s input-locked sequence. Rooted dark shape + two amber eye-dots + expanding water ring, sepia-monochrome overlay. NOT the humanoid form (Ch4+). |

---

## Room backgrounds (Ch1 has 6)

| Filename | Room | Status | Reference doc |
|---|---|---|---|
| `room-ch01-cabin646.png` | Cabin 646 | **Shipped procedural** | `rooms.md` § Cabin 646. Sprint 11 visual identity locked. Sprint 19 adds desk, washstand, under-bed drawer, inspectable child's drawing (not yet drawn). |
| `room-ch01-hallway.png` | The Hallway | **Shipped procedural** | `rooms.md` § The Hallway. Sprint 16 detail pass complete. Sprint 19 adds bulletin board as real visual asset (not yet drawn), descending staircase at far-right dark zone (not yet drawn), inspectable wall decor. |
| `room-ch01-grandparents-cabin.png` | Grandparents' Cabin | **Shipped procedural** | `rooms.md` § Grandparents' Cabin. Sprint 04 visual identity locked. Sprint 19 adds armchair with Dziadek's coat (not yet drawn). |
| `room-ch01-radio-room.png` | — | **Retired** | Per Sprint 19. There is no separate radio room — Dziadek's radio is in the grandparents' cabin. Remove this row from `art-asset-list.md`. |
| `room-ch01-dark-corridor.png` | Dark Corridor / Stairwell | **Shipped procedural** | Sprint 20. `drawDarkCorridor` — two-state lighting (dark/lit), industrial wall panels, pipes, sconces, janitor's cart, echo-mouse, stairwell. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| `room-ch01-kitchen.png` | Kitchen | **Shipped procedural** | Sprint 26 Stages 1–3. `drawKitchen` — counter, warm-amber pendant, stairwell opening, plate, cutting board, freezer doorway, stool, storage racks, Bamsemums bag. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| `room-ch01-observation-deck.png` | Observation Deck | **Shipped procedural** | Sprint 27. `drawObservationDeck` — layered aurora viewport, two benches, coiled rope, brass telescope, Kvikk Lunsj treat. *(Checklist previously said "Not built — deferred" — corrected Sprint 33.)* |

### Sprint 19 background-update items

These are room-asset updates from Sprint 19 that need implementation when the cabin and hallway are next touched (likely Henrik kitchen build sprint):

**Cabin 646:**
- ~~Desk at world-x ~220 (period-appropriate writing desk).~~ ✓ Sprint 37 (x=230)
- ~~Washstand at world-x ~340 (period-appropriate, near porthole).~~ ✓ Sprint 37 (x=308)
- Under-bed drawer (visible at the foot of the bed) — **retired Sprint 36**: no drawer, Smørbukk on nightstand.
- Inspectable child's drawing already exists at world-x ~160; gains a narration line.
- ~~Porthole gains a faint aurora layer (per chapter-wide aurora rule).~~ ✓ Sprint 35

**Hallway:**
- ~~Bulletin board at world-x ~260 — needs real visual asset with "WELCOME ABOARD THE MNEMOSYNE" header rendered visibly.~~ ✓ Sprint 37 (x=130, between door and porthole)
- ~~Descending staircase at far-right (past world-x ~1320) — visible visual asset readable as "this is where you go next."~~ ✓ Sprint 20/24
- ~~All three hallway porthole scenes gain a faint aurora layer.~~ ✓ Sprint 35

**Grandparents' cabin:**
- ~~Armchair at world-x ~280 with Dziadek's coat folded over it.~~ ✓ Sprint 37
- ~~Window gains a faint aurora reflection.~~ ✓ Sprint 35
- ~~Dziadek's radio at world-x ~200 (small period-appropriate domestic radio, wooden-cased, 1900s-era Edwardian).~~ ✓ Sprint 20

---

## NPC sprites

| Filename | Character | Status | Notes |
|---|---|---|---|
| `sprite-henrik-idle.png` | Henrik | **Shipped procedural — partial** | Sprint 26 Stages 1–2. `drawHenrikStanding` + `drawHenrikSitting` + `drawHenrikFrozen`. Basic silhouette correct (toque, apron, dark outfit). **Gallery design has pipe and beard that are missing from game sprite.** Designed-in-gallery bucket. *(Sprint 38 audit.)* |
| `sprite-marta-idle.png` | Babcia (Marta) | **Shipped procedural — diverges from gallery** | Sprint 04 / Sprint 09 polish. Game `drawBabcia` is a monochrome `#2a2030` blob — no kerchief, no facial features, no coat detail. **Gallery `drawBabcia` has the approved design (kerchief, coat, human eyes, crying overlay) and is NOT ported to game.** Designed-in-gallery bucket — port needed. *(Sprint 38 audit.)* |
| `sprite-jan-idle.png` | Dziadek (Jan) | **Shipped procedural — blob, no gallery design** | Sprint 04 / Sprint 09 polish. Game `drawDziadek` is a `#2a2030` rectangle-stack. No approved gallery design exists (gallery shows placeholder). Not-designed bucket — design in gallery first. *(Sprint 38 audit.)* |
| `sprite-janitor-idle.png` | The Janitor (J. Henriksen) | **Shipped procedural — no gallery design** | Sprint 20. `drawJanitor` has reasonable silhouette (cap, jumpsuit, stripe, boots). No approved gallery design exists. Not-designed bucket — design in gallery first. *(Sprint 38 audit.)* |
| `sprite-passenger-idle.png` | The Passenger | **Shipped procedural — no gallery design** | Sprint 03. `drawPassengerBody` has top-hat figure (hat, coat, legs, shoes) in `#2a2438`. No approved gallery design exists. Not-designed bucket — design in gallery first. *(Sprint 38 audit.)* |
| `sprite-doctor-idle.png` | The Doctor | **Shipped procedural — no gallery design** | Sprint 14. `drawDoctor` has dark suit, collar, bag, walking animation. No approved gallery design exists. Not-designed bucket — design in gallery first. *(Sprint 38 audit.)* |
| `sprite-pip-idle.png` | Pip (gameplay sprite) | **Shipped procedural — spec violation** | `drawPipBody` draws a faint apron band (`globalAlpha=0.28`, `#d4c89a`) at line 5484–5488. Spec and gallery both say: **no apron on present-day Pip** (apron = memory-Pip only). Remove apron draw lines. Gallery design is more refined pixel layout; game version is simpler but the apron is the only hard spec violation. *(Sprint 38 audit.)* |
| `sprite-pip-in-bed.png` | Pip's body | **Shipped procedural** | Sprint 11. Small still form under sheets, face hidden. Reverts to pre-reveal state after cinematic — body never persists in room geometry. Single one-shot use. |

### Memory-only character sprites (Ch1 has 2)

| Filename | Character | Beat | Status | Notes |
|---|---|---|---|---|
| `sprite-young-henrik-memory.png` | Young Henrik | Beat 11 (Cinematic 6a) | **Shipped procedural inline** | Sprint 26 Stage 2. Rendered inline in `drawMemory6aScene()` inside `drawFirstTasteCinematic`. Boy ~8, cottage kitchen. Not a standalone sprite file. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| `sprite-young-erik-memory.png` | Young Erik | Beat 11 (Cinematic 6b) | **Shipped procedural inline** | Sprint 26 Stage 2. Sprint 34 (`0211f52`) fixed: face toward viewer, hair `#d8b860` (blond), eyes `#2a4878` (blue), fair skin `#d0b890`, gap tooth. Designed-in-gallery; verify game matches gallery in browser. *(Bug #54 closed Sprint 34.)* |
| `sprite-henriks-grandfather-memory.png` | Henrik's grandfather | Beat 11 (Cinematic 6a) | **Shipped procedural inline** | Sprint 26 Stage 2. Rendered inline in `drawMemory6aScene()`. Old Norwegian man, cottage kitchen. Not a standalone sprite file. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| `sprite-older-henrik-memory.png` | Older Henrik (teaching Erik) | Beat 11 (Cinematic 6b) | **Shipped procedural inline** | Sprint 26 Stage 2. Rendered inline in `drawMemory6bScene()`. Henrik recognizably grown, teaching Erik lefse. Not a standalone sprite file. *(Checklist previously said "Not built" — corrected Sprint 33.)* |

---

## Echo-creatures (Ch1)

Per P1 Session 1 / Sprint 19: **One pest per chapter, each unique. Ch1 = echo-mice.** Echo-spiders and echo-bats are reserved for future chapters.

| Filename | Type | Status | Notes |
|---|---|---|---|
| `echo-mouse.png` | Echo-creature (Ch1) | **Shipped procedural** | Sprint 20. `drawEchoMouse` — drained-amber translucent mouse, scripted proximity system. Called in `drawDarkCorridor` (lit state). *(Checklist previously said "Not built" — corrected Sprint 33.)* |
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
| `treat-ch01-observation-deck.png` | Observation deck | **Shipped procedural** | Sprint 27. `drawTreatSprite('kvikklunsj')` — red wrapper, gold foil stripe. Kvikk Lunsj locked 2026-06-01. *(Checklist previously said "Not built — deferred" — corrected Sprint 33.)* |

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
| Porthole | **Shipped procedural** | Sprint 16 porthole-scenery system. Sprint 35: aurora added. Sprint 42: migrated to `drawSceneryInPorthole` (unified engine). Sprint 43: finished Bergen night scenery (fjords, moonlit water, aurora, stars, skerries, lighthouse). |
| Cabin entry door | **Shipped procedural** | Sprint 02. |
| Far cabin door (doctor's exit) | **Shipped procedural** | Sprint 14. Non-interactable. |
| Child's drawing on wall | **Shipped procedural (as ambient)** | Visible in Sprint 11. Becomes inspectable per Sprint 19 — narration line added. |
| Writing desk | **Shipped procedural** | Sprint 37. World-x 230 (between porthole ~190 and mirror ~280). Dark wood surface, green leather inset, brass inkwell, legs. |
| Washstand | **Shipped procedural** | Sprint 37. World-x 308 (between mirror ~280 and nightstand ~332). Porcelain basin on wood stand. |
| Under-bed drawer | **Not built** | Sprint 19 addition. Contains Smørbukk treat. |
| Doctor sprite (for cinematic) | **Stub procedural** | Sprint 14. `drawDoctor` procedural. Designed sprite is Sprint 18.1. |

### Hallway props

| Asset | Status | Notes |
|---|---|---|
| 6 cabin doors (unlabelled) | **Shipped procedural** | Sprint 16 (originally with plaques). Sprint 28 / Sprint 30: all door-number plaques removed (commit d40a61a). Doors now unlabelled. 644 + 646 interactive; others decorative. |
| Brass cabin-number plaques | **Retired** | All door-number plaques removed in commit d40a61a. *(Checklist previously said "Shipped procedural Sprint 16 polish" — corrected Sprint 33.)* |
| Crimson runner carpet | **Shipped procedural** | Sprint 16. Narrowed per polish 1. |
| Wall sconces (2, one flickering) | **Shipped procedural** | Sprint 02 + Sprint 16. Flickering one at world-x ~820. |
| 3 portholes | **Shipped procedural** | Sprint 16. Sprint 35: aurora. Sprint 42: migrated to `drawSceneryInPorthole`. Sprint 43: finished Bergen night scenery — all three hallway portholes reveal the same unified view. |
| Bulletin board | **Shipped procedural** | Sprint 37. World-x 130 (between door at 80 and porthole at 180). Cork board, brass frame, paper notices, red pins. Inspectable x updated to match. |
| Luggage trolley (with bear) | **Shipped procedural** | Sprint 16. World-x ~530. |
| 5 wall-decor pieces (ship photo, barometer, botanical, map, mirror) | **Shipped procedural** | Sprint 16. Two become inspectable per Sprint 19 (ship photo, navigational chart). |
| Descending staircase (far-right dark zone) | **Shipped procedural** | Sprint 20. `drawDescendingStaircase` + Sprint 24 Stage 2 DOWN sign. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| Passenger NPC | **Shipped procedural** | Sprint 03. |
| Hallway canonical treat | **Not built** | Sprint 19 promotion. Specific treat TBD. |

### Grandparents' cabin props

| Asset | Status | Notes |
|---|---|---|
| Babcia on bed | **Shipped procedural** | Sprint 04 + Sprint 09 polish. Inspectable + cinematic position. |
| Dziadek at window | **Shipped procedural** | Sprint 04 + Sprint 09 polish. Inspectable + cinematic position. |
| Photograph (on nightstand) | **Shipped procedural** | Sprint 04. Inspectable. |
| Suitcase (open, half-packed, boat-shirt) | **Shipped procedural** | Sprint 04 + Sprint 19 (pierogi recipe card line added). |
| Window (4-pane wood) | **Shipped procedural** | Sprint 04. Sprint 35: faint aurora pass added inline in `drawGrandparents`, clipped to window rect. |
| Bed (wide, for Babcia) | **Shipped procedural** | Sprint 04. |
| Nightstand with lamp | **Shipped procedural** | Sprint 04. The cabin's warm-pool source. |
| Dziadek's radio | **Shipped procedural** | Sprint 20. `drawDziadekRadio` — 1900s wooden-cased radio with fabric grill, tuning dial, proximity-crackle shimmer. *(Checklist previously said "Not built" — corrected Sprint 33.)* |
| Armchair with coat | **Shipped procedural** | Sprint 37. World-x 280. Small period armchair, burgundy upholstery, Dziadek's wool coat draped over the back. Inspectable added to grandparentsObjects. |
| Soft cool-blue glow at left-edge door | **Shipped procedural** | Sprint 14. Static, subtle. |

### Dark corridor props

*(All previously "Not built" — corrected Sprint 33. All shipped Sprint 20.)*

| Asset | Status | Notes |
|---|---|---|
| Painted iron walls | **Shipped procedural** | Sprint 20. Industrial-palette wall gradient + riveted panels in `drawDarkCorridor`. |
| Exposed pipes | **Shipped procedural** | Sprint 20. `drawDarkCorridorPipes` — overhead pipes with joint flanges, two-state visibility. |
| Working flickering sconce | **Shipped procedural** | Sprint 20. At world-x ~240 in `drawDarkCorridor`, weak-amber flicker, pre-puzzle ambient light. |
| Fallen / broken sconce | **Shipped procedural** | Sprint 20. Drawn in `drawDarkCorridorProps` — hanging at angle, wires exposed, sparking in dark state. |
| Broken glass on floor | **Shipped procedural** | Sprint 20. Drawn in `drawDarkCorridorProps` — float-discovery trigger zone. |
| Janitor's cart (with supplies + clipboard) | **Shipped procedural** | Sprint 20. `drawJanitorCart` — metal cart, mop bucket, clipboard with "J. Henriksen Maintenance." |
| Stairwell descending to kitchen | **Shipped procedural** | Sprint 20. `drawStairwellDown` in `drawDarkCorridorProps`. |
| Janitor NPC (scripted walk) | **Shipped procedural** | Sprint 20. `drawJanitor` + scripted walk system in `updateJanitorWalk`. |
| Echo-mice | **Shipped procedural** | Sprint 20. `drawEchoMouse` — called in `drawDarkCorridor` lit state via `echoMouse` system. |

### Kitchen props

*(Previously "Not built" entries corrected Sprint 33.)*

| Asset | Status | Notes |
|---|---|---|
| Stainless steel prep counter (long) | **Shipped procedural** | Sprint 26 Stage 1. Long dark-wood counter in `drawKitchen`. |
| Hanging copper pots (4-6) | **Shipped procedural** | Sprint 37. Three copper pots hang from a rod above the storage racks (world-x 820–940): warm copper ellipses with handles, suspended from hook lines. |
| Pendant light (overhead, warm amber) | **Shipped procedural** | Sprint 26 Stage 1. Warm amber radial gradient + pendant fixture at world-x ~475. |
| Walk-in freezer doorway | **Shipped procedural** | Sprint 26 Stage 1. Drawn at world-x 700–762 — heavy door frame, cool back-light. |
| Stool | **Shipped procedural** | Sprint 26 Stage 1. Drawn at world-x ~400 with Henrik sitting post-Beat 10. |
| Bottom of descending stairwell (from dark corridor) | **Shipped procedural** | Sprint 26 Stage 1. Stairwell opening drawn at world-x 0–140 (stair steps visible). |
| Plate of lefse-and-gravlaks | **Shipped procedural** | Sprint 26 Stage 1. Ellipse plate drawn at world-x ~290, pre-henrikMet. |
| Bamsemums bag | **Shipped commissioned** | Sprint 13. World-x ~520, behind cutting board. Tutorial treat. |
| Cutting board | **Shipped procedural** | Sprint 26 Stage 1. At world-x ~490. |
| Dropped pan (Beat 9 cinematic prop) | **Shipped procedural** | Sprint 26 Stage 1. Drawn in `drawKitchenMeetingCinematic` on floor at world-x ~750. |
| Henrik's pipe + smoke animation | **Shipped procedural** | Sprint 26 Stages 1–2. Pipe visible in `drawHenrikStanding` / `drawHenrikSitting`. *(Checklist said "Designed not built" — corrected Sprint 33.)* |
| Henrik's stool-sit animation | **Shipped procedural** | Sprint 26 Stage 2. `drawHenrikSitsDownCinematic` — Henrik walks to stool and sits. *(Checklist said "Not built" — corrected Sprint 33.)* |
| Echo-mouse (optional, near freezer) | **Not built** | Not called in `drawKitchen`. Optional; may remain absent. |
| Notebook (Henrik's gift) | **Shipped procedural** | Sprint 29 (`567e82a`). Small leather-bound with blank pages, drawn inline in `drawHenriksOfferCinematic()`. |

### Observation deck props

*(All previously "Not built — deferred" — corrected Sprint 33. All shipped Sprint 27.)*

| Asset | Status | Notes |
|---|---|---|
| Wide curved viewport | **Shipped procedural** | Sprint 27. Wooden mullions + brass fittings + horizontal crossbrace in `drawObservationDeck`. |
| Aurora animation (full layered) | **Shipped procedural** | Sprint 27. Three LinearGradient ribbon bands (green/violet/green), seeded stars, slow sine drift. Screen-fixed, independent of pip.x. |
| Wooden benches (2) | **Shipped procedural** | Sprint 27. `drawDeckBench` at world-x 160 and 460. |
| Coiled marine rope | **Shipped procedural** | Sprint 27. `drawDeckRope` at world-x 280. |
| Brass telescope on tripod | **Shipped procedural** | Sprint 27. `drawDeckTelescope` at world-x 540. |
| Observation deck treat (Kvikk Lunsj) | **Shipped procedural** | Sprint 27. `drawTreatSprite('kvikklunsj')` at world-x 565. Locked as Kvikk Lunsj (Decision 3, 2026-06-01). |

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

## Audio (Ch1)

### Tier-1 Reactive SFX — Sprint 30 (`af6d0fa`) — Shipped

Synthesized via Web Audio API (no audio files). Single shared AudioContext + master GainNode. Separate 🔊 toggle beside ♪. Shares the music system's first-keypress unlock gate.

| Cue | Function | Status | Notes |
|---|---|---|---|
| Collect blip | `playCollectSfx()` | **Shipped Sprint 30** | Two-note rising sine ~150ms. Fires at pickup tween start. |
| Eat swell | `playEatSfx()` | **Shipped Sprint 30** | Warm rounded sine ~250ms. Fires when stomach fills (treat). |
| Notebook pulse tick | `playNotebookSfx()` | **Shipped Sprint 30** | Dry triangle tick ~80ms. Fires in `pulseNotebookIcon()` (collect + save). |
| Inspect shimmer | `playInspectSfx()` | **Shipped Sprint 30** | Airy high sine ~120ms. Fires in `tryInspect()` at dialogue open. |
| Movement whisper | `startMoveSfx()` / `stopMoveSfx()` | **Shipped Sprint 30** | White-noise + lowpass 200Hz; fades in/out with Pip's glide. NOT footsteps — ghost physics honored. |
| Phase-through whoosh | `playPhaseSfx()` | **Shipped Sprint 30** | Descending sine ~400ms. Two sites wired (grandparents→cabin, panic wall-phase). TODO Sprint 23 for remaining shimmer sites. |
| Music tracks | all | **Shipped** | Sprint 05 / music sprint. `playMusic()`, `♪` toggle, `tlb-music-on` localStorage. |

### Tier-2 Beat-bound SFX — deferred to respective build sprints

These are diegetic, atmospheric, or beat-specific. They build with the beats they belong to.

| Sound effect | Beat | Status | Notes |
|---|---|---|---|
| Sob breath (Babcia in cinematic / inspect) | Beat 6 | **Not built** | Subtle, ambient. |
| Radio static crackle | Beat 7 (passive + discovery) | **Not built** | Looping low-volume, fades in/out with proximity. |
| Sconce buzz (post-puzzle, dark corridor) | Beat 8 | **Not built** | Each sconce buzzes back on one by one. |
| Held-button charge hum | Beat 8 (puzzle) | **Not built** | Rising electrical hum during sconce charge. |
| Cart wheels rolling | Beat 8 (janitor walk) | **Not built** | When janitor pushes cart away. |
| Dripping water (dark corridor ambient) | Beat 8 | **Not built** | Faint periodic drip. Atmospheric. |
| Dropped pan clatter | Beat 9 (Cinematic 4) | **Not built** | Diegetic crash. |
| Wind on observation deck | Beat 12 | **Not built** | Soft ambient. |

---

## Procedural shipped-art summary

*(Updated Sprint 33 to reflect all ships through Sprint 32.)*

These procedural draw functions exist in `game/index.html`:

```
drawPip / drawPipMaterializing
drawBabcia
drawDziadek
drawDoctor
drawPassenger
drawJanitor / drawJanitorCart         ← Sprint 20 (previously "designed not built")
drawEchoMouse                         ← Sprint 20 (previously "not built")
drawHenrikStanding / drawHenrikSitting / drawHenrikFrozen  ← Sprint 26 (previously "designed not built")
drawCabin / drawCabinObjects
drawHallway / drawHallwayObjects
drawGrandparents / drawGrandparentsObjects
drawDarkCorridor / drawDarkCorridorProps / drawDarkCorridorPipes  ← Sprint 20 (previously "not built")
drawKitchen                           ← Sprint 26 (previously "not built")
drawObservationDeck                   ← Sprint 27 (previously "not built — deferred")
drawGrandparentsCinematic
drawMirrorCinematic
drawBedRevealCinematic
drawDoctorExitCinematic
drawKitchenMeetingCinematic           ← Sprint 26 (previously "not built")
drawHenrikSitsDownCinematic           ← Sprint 26 (previously "not built")
drawFirstTasteCinematic (6a+6b)
drawDockFarewellCinematic             ← Sprint 29 (previously "not built")
drawNokkenGlimpse                     ← Sprint 29 (previously "not built")
drawHenriksOfferCinematic             ← Sprint 29 (previously "not built")
drawTears (panic glide particles)
drawPorthole / drawPortholeScene (Sprint 16)
drawLuggageTrolley
drawBrassFitting (plaques, handles, kickplates)
drawSconce
drawFloorPlanks
drawMemoryMist (defined; active for first-taste cinematic 6a/6b)
drawDescendingStaircase               ← Sprint 20 (previously "not built")
drawDziadekRadio                      ← Sprint 20 (previously "not built")
drawDeckBench / drawDeckRope / drawDeckTelescope  ← Sprint 27 (previously "not built")
```

**Still genuinely unbuilt** (as of Sprint 32):

- ~~Chapter-wide aurora porthole layers~~ — shipped Sprint 35
- ~~Hanging copper pots in kitchen~~ — shipped Sprint 37
- ~~Ch1 interior window scenery~~ — shipped Sprint 43 (Bergen night sea, fjords, moonlit water)
- Echo-mouse near kitchen freezer (optional, not called)
- Cabin: writing desk, washstand, under-bed drawer
- Hallway: bulletin board visual asset ("WELCOME ABOARD" header), hallway canonical treat
- Grandparents' cabin: armchair with Dziadek's coat

---

## Build-sprint priority list

*(Updated Sprint 33 to reflect completions. Strikethrough = shipped.)*

### Tier 1 — ~~Critical path for the kitchen beat~~ ✓ All done

1. ~~`drawKitchen` — room layout + counter + pendant + freezer doorway + stool~~ ✓ Sprint 26
2. ~~`drawHenrik` — sprite implementation~~ ✓ Sprint 26
3. ~~`drawCinematic('kitchen-meeting')` — Cinematic 4~~ ✓ Sprint 26
4. ~~`drawCinematic('henrik-sits-down')` — Cinematic 5~~ ✓ Sprint 26
5. ~~`drawCinematic('first-taste')` — Cinematic 6 (6a+6b)~~ ✓ Sprint 26
6. ~~Older Henrik + young Erik memory sprites (inline)~~ ✓ Sprint 26 (inline in first-taste cinematic; BUG #54 for Erik coloring)
7. ~~Lefse-and-gravlaks plate~~ ✓ Sprint 26
8. ~~Henrik's stool~~ ✓ Sprint 26

### Tier 2 — ~~Critical path for the dark corridor~~ ✓ All done

9. ~~`drawDarkCorridor` — room with two-state lighting~~ ✓ Sprint 20
10. ~~Fallen sconce, working sconce, broken glass~~ ✓ Sprint 20
11. ~~Janitor's cart~~ ✓ Sprint 20
12. ~~`drawJanitor` — sprite implementation~~ ✓ Sprint 20
13. ~~Janitor's scripted walk animation~~ ✓ Sprint 20
14. ~~Echo-mouse sprite~~ ✓ Sprint 20
15. ~~Stairwell descent (visual)~~ ✓ Sprint 20

### Tier 3 — ~~Chapter completion~~ ✓ All done

16. ~~`drawCinematic('dock-farewell')` — Cinematic 7~~ ✓ Sprint 29
17. ~~`drawNokkenGlimpse` — Beat 12 scripted visual~~ ✓ Sprint 29
18. ~~`drawCinematic('henriks-offer')` — Cinematic 8~~ ✓ Sprint 29
19. ~~Notebook prop for Cinematic 8~~ ✓ Sprint 29

### Tier 4 — Sprint 19 props (remaining genuinely unbuilt)

20. Cabin desk, washstand, under-bed drawer — **STILL UNBUILT**
21. ~~Hallway descending staircase~~ ✓ Sprint 20 | Bulletin-board visual asset — **STILL UNBUILT**
22. ~~Grandparents' cabin Dziadek's radio~~ ✓ Sprint 20 | ~~Armchair + coat~~ ✓ Sprint 37
23. ~~`drawAuroraScene` — chapter-wide aurora porthole layer~~ ✓ Sprint 35 — `aurora-faint` layer in `PORTHOLE_SCENES['ch1-ocean-night']`; inline pass in grandparents' window

### Tier 5 — ~~Deferred~~ ✓ All done

24. ~~`drawObservationDeck` — entire room~~ ✓ Sprint 27
25. ~~Observation deck treat (Kvikk Lunsj)~~ ✓ Sprint 27
26. Cabin Smørbukk treat (drawer) — **STILL UNBUILT** (treat + drawer)
27. Hallway canonical treat — **STILL UNBUILT**
28. Cleaning-cart Skillingsboller treat — **STILL UNBUILT**

---

## Asset commission readiness

For when commissioned art replaces procedural drawings, prerequisites are:

1. **Style anchor confirmation.** The first commissioned cinematic should be `cin-02-mirror.png` (the melt) — it's the chapter's most distinctive image and is reused at the Ch8 climax. Get the style right here.
2. ~~**Erik's face partial obscurity.**~~ **Resolved — Decision C (2026-06-02): Erik's face is shown clearly in Cinematic 6b.** No partial obscurity. Erik: blond, blue eyes, fair skin, age ~11, gap tooth, Norwegian. Commission to this spec.
3. **Henrik's silhouette.** High contrast (cream apron, black slacks, black button-up, white toque). Pose: sleek-fit, no stoop, pipe in right hand. Authoritative-via-hat, not tall-via-body.
4. ~~**Erik's face full reveal. Reserved for Ch4.**~~ **Resolved — Decision C (2026-06-02): Erik's face is clear in Ch1. The recognition chain is Ch6 photo → Ch7 ghost (both using the same blond/blue-eyed appearance). No separate "full reveal" commission needed.**
5. **Single-light-source discipline.** Every commission must observe the single warm light rule. Reject art that has multiple competing light sources.

---

## Open questions for build sprint

1. **Memory mist activation.** Sprint 11 defined the memory mist effect but didn't use it. Build sprint: enable `cinematic.isMemory = true` for `first-taste` cinematic. The mist should drift in from frame edges during the Erik memory.

2. **Aurora rendering approach.** Two options per `rooms.md` § Observation Deck:
   - Reuse the `PORTHOLE_SCENES` system, extended to a non-circular clip region (cabin/hallway/grandparents windows).
   - New dedicated `drawAuroraScene` function for the deck's wide rectangular viewport.
   
   My read: **both.** Small aurora layer added to `PORTHOLE_SCENES` for windows/portholes (subtle). Dedicated `drawAuroraScene` for the deck (full).

3. **Procedural Henrik vs. commissioned Henrik.** Build sprint produces procedural sprite. Commissioned art is a later sprint. Confirm procedural ships first.

4. ~~**Erik's face composition.** Turned away, profile, half-shadow, etc.~~ **N/A — resolved Decision C (2026-06-02).** Face is shown clearly in Cinematic 6b. Composition: Erik faces the scene naturally (as a child learning from his father). No obscuring treatment needed.

5. **Janitor's walk choreography.** Per `puzzles.md` § Puzzle 6D — does the janitor enter from the hallway (offstage), or appear at the dark corridor's left edge? My read: appear at left edge (no transition required). Settle in build sprint.

6. **Specific treats for the three unbuilt locations.** Cabin (Smørbukk suggested), cleaning cart (Skillingsboller suggested), observation deck (Kvikk Lunsj or Smørbukk). Build sprint final call.

7. **Henrik's stool transition.** Cinematic 5 has Henrik crossing the kitchen to the stool and sitting. How is this animated? Per Sprint 09 polish, Henrik has standard sit-down posture. Sit-down animation needs new frames. My read: implement as a 4-frame sit-down (stand → leaning → bending knees → seated). Build sprint decision.

8. **Henrik's silent-scream face.** Cinematic 4 has Henrik mouth-open. Per `03-art-and-aesthetic.md` sprite rig, Henrik has a mouth layer that can be replaced. The silent-scream is a specific mouth-open frame. New mouth-frame asset needed.

