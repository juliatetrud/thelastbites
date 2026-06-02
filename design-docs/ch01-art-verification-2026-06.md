# Chapter 1 Art Verification Report — June 2026

**Sprint 33 deliverable.** Verified every Ch1 art asset's recorded build status against `game/index.html`. All status corrections from this report are applied to `art-checklist.md`, `10-visual-design-spec.md`, and `character-gallery.html` in the same commit.

---

## Method

For each asset: checked for the relevant `draw*` function or code block in `game/index.html`. Status is **binary**: real functional implementation present, or absent/placeholder/stub.

---

## Section 1: Rooms

| Room | Claimed (checklist) | Actual | Δ |
|---|---|---|---|
| Cabin 646 | Shipped procedural | **SHIPPED** — `drawCabin`. Sprint 32 recompacted to 480px bedroom. | ✓ Correct |
| Hallway | Shipped procedural | **SHIPPED** — `drawHallway`. | ✓ Correct |
| Grandparents' Cabin | Shipped procedural | **SHIPPED** — `drawGrandparents`. | ✓ Correct |
| **Dark Corridor** | **Not built** | **SHIPPED PROCEDURAL** — `drawDarkCorridor` exists with full two-state lighting (dark/lit), pipes, sconces, janitor cart, stairwell, echo-mouse. | **WRONG → fixed** |
| **Kitchen** | **Not built** | **SHIPPED PROCEDURAL** — `drawKitchen` exists with counter, pendant, freezer doorway, stool, stairwell opening, cutting board, Bamsemums bag, storage racks. Sprint 26 Stages 1–3. | **WRONG → fixed** |
| **Observation Deck** | **Not built — deferred** | **SHIPPED PROCEDURAL** — `drawObservationDeck` exists with layered aurora viewport, benches, rope, telescope, Kvikk Lunsj treat. Sprint 27. | **WRONG → fixed** |

---

## Section 2: Cinematics

| Cinematic | Claimed | Actual | Δ |
|---|---|---|---|
| Cin 1 (wakeup) | Shipped procedural | **SHIPPED** — `drawPipMaterializing`. | ✓ Correct |
| Cin 2 (mirror melt) | Shipped procedural | **SHIPPED** — `drawMirrorCinematic`. | ✓ Correct |
| Cin 3 (grandparents) | Shipped procedural | **SHIPPED** — `drawGrandparentsCinematic`. | ✓ Correct |
| Cin 3b (doctor exit) | Shipped procedural | **SHIPPED** — `drawDoctorExitCinematic` + `drawDoctor`. | ✓ Correct |
| **Cin 4 (kitchen-meeting)** | **Not built** | **SHIPPED PROCEDURAL** — `drawKitchenMeetingCinematic` exists. Sprint 26 Stage 1. | **WRONG → fixed** |
| **Cin 5 (henrik-sits-down)** | **Not built** | **SHIPPED PROCEDURAL** — `drawHenrikSitsDownCinematic` exists. Sprint 26 Stage 2. | **WRONG → fixed** |
| Cin 6a/6b (first-taste) | Shipped procedural | **SHIPPED** — `drawFirstTasteCinematic` with `drawMemory6aScene` + `drawMemory6bScene`. **See critical bug below.** | ✓ Correct (status), but BUG |
| Cin 7 (dock-farewell) | Shipped procedural | **SHIPPED** — `drawDockFarewellCinematic`. Sprint 29. | ✓ Correct |
| Cin 8 (henriks-offer) | Shipped procedural | **SHIPPED** — `drawHenriksOfferCinematic`. Sprint 29. | ✓ Correct |
| Nøkken glimpse | Shipped procedural | **SHIPPED** — `drawNokkenGlimpse`. Sprint 29. | ✓ Correct |

### ⚠ Critical bug in Cinematic 6b (filed as issue #54)

`drawMemory6bScene` (line ~8625) still renders Erik with:
- **Face turned away** — comment literally says "FACE TURNED AWAY (critical art note)" — contradicts **Decision C** (2026-06-02: face shown clearly)
- **Hair color `#8c6040`** (dark brownish-copper) — contradicts **Decision B** (`#d8b860` blond required)

The checklist says "face shown clearly per Decision C" and "blond hair" — but the code was never updated. Filed as issue #54. **Fix is Sprint 34 (character art sprint).**

---

## Section 3: Character sprites

| Character | Claimed | Actual | Δ |
|---|---|---|---|
| Pip | Shipped procedural | **SHIPPED** — `drawPip` / `drawPipBody` / `drawPipEyes` / `drawPipMouth`. | ✓ Correct |
| Babcia | Shipped procedural | **SHIPPED** — `drawBabcia`. | ✓ Correct |
| Dziadek | Shipped procedural | **SHIPPED** — `drawDziadek`. | ✓ Correct |
| **Henrik** | **Designed not built** | **SHIPPED PROCEDURAL** — `drawHenrikStanding` + `drawHenrikSitting` + `drawHenrikFrozen`. Sprint 26. | **WRONG → fixed** |
| **Janitor** | **Designed not built** | **SHIPPED PROCEDURAL** — `drawJanitor` exists with full scripted-walk implementation. Sprint 20. | **WRONG → fixed** |
| Passenger | Shipped procedural | **SHIPPED** — `drawPassenger`. | ✓ Correct |
| Doctor | Stub procedural | **SHIPPED PROCEDURAL** — `drawDoctor` exists. Sprint 14. Full draw function (dark suit, white collar, medical bag, walking animation). Upgrade from "stub" to "shipped procedural." | Partially wrong → fixed |
| Pip's body (in bed) | Shipped procedural | **SHIPPED** — lump drawn in `drawCabin`. | ✓ Correct |

### Memory sprites (inline in cinematics)

| Sprite | Claimed | Actual | Δ |
|---|---|---|---|
| Young Henrik (Cin 6a memory) | Not built (standalone) | **SHIPPED INLINE** — rendered in `drawMemory6aScene` inside `drawFirstTasteCinematic`. Not a standalone `draw*` function, but visually present. | Update to "Shipped procedural inline" |
| Henrik's grandfather (Cin 6a) | Not built (standalone) | **SHIPPED INLINE** — rendered in `drawMemory6aScene`. | Update to "Shipped procedural inline" |
| Older Henrik teaching Erik (Cin 6b) | Not built (standalone) | **SHIPPED INLINE** — rendered in `drawMemory6bScene`. | Update to "Shipped procedural inline" |
| **Young Erik (Cin 6b)** | Not built (standalone) | **SHIPPED INLINE** but **BUG** — face obscured, hair `#8c6040` (wrong). See issue #54. Status: shipped with wrong coloring/obscurity. | Update to "Shipped procedural inline — BUG #54" |

### Echo-creatures

| Character | Claimed | Actual | Δ |
|---|---|---|---|
| **Echo-mouse** | **Not built** | **SHIPPED PROCEDURAL** — `drawEchoMouse` exists; called in `drawDarkCorridor` when lit. | **WRONG → fixed** |

---

## Section 4: Gallery `designed:` flags

The gallery's `designed:` flag means: does a real `draw*` function exist for this character? "False" shows a placeholder box.

| Character | Gallery flag | Reality | Δ |
|---|---|---|---|
| Pip | `designed: true` | `drawPip` in gallery ✓ | ✓ Correct |
| Babcia | `designed: true` | `drawBabcia` in gallery ✓ | ✓ Correct |
| **Dziadek** | **`designed: false`** | `drawDziadek` exists in game/index.html — real procedural sprite | **WRONG → update to true** |
| Henrik | `designed: true` | `drawHenrik` in gallery ✓ | ✓ Correct |
| Erik | `designed: true` | `drawErik` in gallery ✓ | ✓ Correct |
| **Janitor** | **`designed: false`** | `drawJanitor` exists in game/index.html — full scripted-walk sprite | **WRONG → update to true** |
| **Passenger** | **`designed: false`** | `drawPassenger` exists in game/index.html — full walking NPC sprite | **WRONG → update to true** |
| **Doctor** | **`designed: false`** | `drawDoctor` exists in game/index.html — full cinematic sprite | **WRONG → update to true** |

---

## Section 5: Tier 4 props / ambient

### Cabin 646

| Asset | Claimed | Actual | Δ |
|---|---|---|---|
| Bed (lump/made) | Shipped | SHIPPED — two-state lump in `drawCabin` | ✓ |
| Mirror (two-state) | Shipped | SHIPPED | ✓ |
| Porthole | Shipped | SHIPPED — plays `ch1-ocean-night` scene | ✓ |
| Entry door | Shipped | SHIPPED — warm-amber glow | ✓ |
| Far door (doctor's) | Shipped | SHIPPED — Sprint 32: reflowed to x=430, recessed in right end-wall | ✓ |
| Child's drawing on wall | Shipped procedural (ambient) | SHIPPED — drawn in `drawCabin` at x=160 | ✓ |
| Nightstand | Not in old checklist | **NEW in Sprint 32** — small nightstand drawn at x=332 in `drawCabin` | Newly built |
| Writing desk | Not built | **STILL NOT BUILT** — no desk in `drawCabin` | ✓ Correct |
| Washstand | Not built | **STILL NOT BUILT** | ✓ Correct |
| Under-bed drawer | Not built | **STILL NOT BUILT** | ✓ Correct |
| Porthole aurora layer | "to be added" | **NOT ADDED** — `ch1-ocean-night` has sky-stars, horizon, water-waves but NO aurora layer | ✓ Correct (still needed) |

### Hallway

| Asset | Claimed | Actual | Δ |
|---|---|---|---|
| 6 cabin doors | Shipped | SHIPPED — but cabin-number plaques were **removed** in commit d40a61a (Sprint 32 path) | Update: plaques retired |
| Crimson runner carpet | Shipped | SHIPPED | ✓ |
| Wall sconces (2) | Shipped | SHIPPED | ✓ |
| 3 portholes | Shipped | SHIPPED — `ch1-ocean-night` scene, no aurora layer yet | ✓ |
| Bulletin board | Stub procedural | **STILL STUB** — inspectable text only, no visual rectangle/board drawn in `drawHallway` | ✓ Correct |
| Luggage trolley | Shipped | SHIPPED | ✓ |
| 5 wall-decor pieces | Shipped | SHIPPED | ✓ |
| **Descending staircase** | **Not built** | **SHIPPED PROCEDURAL** — `drawDescendingStaircase` + DOWN sign, drawn in `drawHallway` when post-bed. Sprint 20. | **WRONG → fixed** |
| Hallway canonical treat | Not built | **STILL NOT BUILT** | ✓ Correct |

### Grandparents' cabin

| Asset | Claimed | Actual | Δ |
|---|---|---|---|
| Babcia on bed | Shipped | SHIPPED | ✓ |
| Dziadek at window | Shipped | SHIPPED | ✓ |
| Photograph (nightstand) | Shipped | SHIPPED | ✓ |
| Suitcase | Shipped | SHIPPED | ✓ |
| Window (4-pane) | Shipped | SHIPPED | ✓ |
| Bed (wide) | Shipped | SHIPPED | ✓ |
| Nightstand with lamp | Shipped | SHIPPED | ✓ |
| **Dziadek's radio** | **Not built** | **SHIPPED PROCEDURAL** — `drawDziadekRadio` called in `drawGrandparents`. Sprint 20. | **WRONG → fixed** |
| Armchair with coat | Not built | **STILL NOT BUILT** | ✓ Correct |
| Window aurora layer | Not built | **NOT BUILT** — grandparents' window has no aurora | ✓ Correct |

### Dark corridor (all previously "Not built")

| Asset | Claimed | Actual | Δ |
|---|---|---|---|
| Painted iron walls | Not built | **SHIPPED** — industrial-palette wall gradient + riveted panels | **WRONG → fixed** |
| Exposed pipes | Not built | **SHIPPED** — `drawDarkCorridorPipes` | **WRONG → fixed** |
| Working flickering sconce | Not built | **SHIPPED** — at world-x ~240, two-state intensity | **WRONG → fixed** |
| Fallen/broken sconce | Not built | **SHIPPED** — in `drawDarkCorridorProps`, drawn in both states | **WRONG → fixed** |
| Broken glass on floor | Not built | **SHIPPED** — in `drawDarkCorridorProps` | **WRONG → fixed** |
| Janitor's cart | Not built | **SHIPPED** — `drawJanitorCart` in `drawDarkCorridorProps` | **WRONG → fixed** |
| Stairwell descending to kitchen | Not built | **SHIPPED** — `drawStairwellDown` in `drawDarkCorridorProps` | **WRONG → fixed** |
| Janitor NPC (scripted walk) | Not built | **SHIPPED** — `drawJanitor` + scripted walk system | **WRONG → fixed** |
| Echo-mice | Not built | **SHIPPED** — `drawEchoMouse` called in lit state | **WRONG → fixed** |

### Kitchen (all previously "Not built")

| Asset | Claimed | Actual | Δ |
|---|---|---|---|
| Stainless steel prep counter | Not built | **SHIPPED** — drawn in `drawKitchen` | **WRONG → fixed** |
| Hanging copper pots | Not built | **PARTIAL** — storage racks drawn at world-x 820–940; literal hanging copper pots not rendered. Close enough for placeholder. | Partially wrong |
| Pendant light (warm amber) | Not built | **SHIPPED** — pendant gradient + fixture at world-x ~475 | **WRONG → fixed** |
| Walk-in freezer doorway | Not built | **SHIPPED** — drawn at world-x 700–762 | **WRONG → fixed** |
| Stool | Not built | **SHIPPED** — drawn in `drawKitchen` + used in cinematics | **WRONG → fixed** |
| Stairwell opening (from dark corridor) | Not built | **SHIPPED** — stairwell opening at world-x 0–140 in `drawKitchen` | **WRONG → fixed** |
| Plate of lefse-and-gravlaks | Not built | **SHIPPED** — drawn in `drawKitchen` pre-henrikMet | **WRONG → fixed** |
| Cutting board | Not built | **SHIPPED** — at world-x ~490 | **WRONG → fixed** |
| Dropped pan | Not built | **SHIPPED** — drawn in `drawKitchenMeetingCinematic` | **WRONG → fixed** |
| Henrik's pipe + smoke | Designed not built | **SHIPPED** — pipe in `drawHenrikStanding` / `drawHenrikSitting`; smoke drawn procedurally | **WRONG → fixed** |
| Henrik's stool-sit animation | Not built | **SHIPPED** — `drawHenrikSitsDownCinematic` | **WRONG → fixed** |
| Echo-mouse near freezer | Not built | **STILL NOT BUILT** — not called in `drawKitchen` | ✓ Correct |
| Notebook (Henrik's gift) | Shipped (Sprint 29) | SHIPPED — inline in `drawHenriksOfferCinematic` | ✓ Correct |

### Observation deck (all previously "Not built — deferred")

| Asset | Claimed | Actual | Δ |
|---|---|---|---|
| Wide curved viewport | Not built — deferred | **SHIPPED** — viewport frame with wooden mullions, brass fittings in `drawObservationDeck` | **WRONG → fixed** |
| Aurora animation (full layered) | Not built — deferred | **SHIPPED** — three ribbon bands (green/violet/green) with slow sine drift, star field, sepia palette in `drawObservationDeck` | **WRONG → fixed** |
| Wooden benches (2) | Not built — deferred | **SHIPPED** — `drawDeckBench` at world-x 160 and 460 | **WRONG → fixed** |
| Coiled marine rope | Not built — deferred | **SHIPPED** — `drawDeckRope` at world-x 280 | **WRONG → fixed** |
| Brass telescope on tripod | Not built — deferred | **SHIPPED** — `drawDeckTelescope` at world-x 540 | **WRONG → fixed** |
| Observation deck treat | Not built — deferred | **SHIPPED** — Kvikk Lunsj (`drawTreatSprite('kvikklunsj')`) at world-x 565 | **WRONG → fixed** |

---

## Section 6: Global notes

**`drawAuroraScene` / chapter-wide aurora layer:** Not yet added to `PORTHOLE_SCENES` ('ch1-ocean-night' has sky-stars, horizon-line, water-waves — no aurora layer). The observation deck has its own inline aurora in `drawObservationDeck`. The hallway/cabin/grandparents porthole aurora layers are still absent. This is still a genuinely unbuilt item.

**Hallway cabin-number plaques:** Sprint 28 (commit d40a61a) removed ALL door-number plaques. The checklist row still says "Shipped procedural Sprint 16 polish." Updated to "Retired — all plaques removed in Sprint 28."

**Bulletin board visual:** Still only exists as inspectable dialogue text — no visual rectangle or "WELCOME ABOARD" header drawn in `drawHallway`. Still stub procedural.

---

## Genuinely Unbuilt Ch1 Art (authoritative list)

### Rooms
*(All six rooms are now shipped procedurally.)*

### Character sprites
- **Janitor (sprite-janitor-idle.png):** `drawJanitor` exists in game/index.html as a shipped procedural sprite, but the gallery does not have its own gallery draw function. **Sprint 34** should add the gallery entry.
- **Pip's chef-apron form (memory-Pip):** No standalone sprite function — memory-Pip is drawn inline in Cinematic 6a/6b contexts only.

### Cinematics
*(All 9 + Nøkken glimpse are now shipped procedurally.)*

**Known bug:** Cinematic 6b (`drawMemory6bScene`) renders Erik with face turned away and wrong hair color. Issue #54. Fix in Sprint 34.

### Props / ambient

**Cabin 646:**
- Writing desk (world-x ~220) — not drawn
- Washstand (world-x ~340) — not drawn
- Under-bed drawer / Smørbukk treat in drawer — not drawn
- Porthole aurora layer — `ch1-ocean-night` has no aurora

**Hallway:**
- Bulletin board visual ("WELCOME ABOARD" header) — inspectable only, no visual
- Hallway canonical treat — specific treat TBD, not placed
- Porthole aurora layer — not added

**Grandparents' cabin:**
- Armchair with Dziadek's coat (world-x ~280) — not drawn
- Window aurora reflection — not added

**Dark Corridor:**
*(All corridor props are now shipped procedurally.)*

**Kitchen:**
- Hanging copper pots — storage racks exist at world-x 820–940 (visual stand-in), but literal hanging pot sprites not drawn
- Echo-mouse near freezer doorway — optional, not drawn

**Observation deck:**
*(All observation-deck props are now shipped procedurally.)*

**Chapter-wide:**
- `drawAuroraScene` / aurora porthole layers for hallway + cabin + grandparents — defined for title screen but not added to `PORTHOLE_SCENES['ch1-ocean-night']`

### Treats
- Cabin Smørbukk (in under-bed drawer) — not placed
- Dark-corridor Skillingsboller (on janitor's cart) — not placed
- Hallway canonical treat — not placed

### Memory sprites (standalone art assets)
The in-memory characters (young Henrik, Henrik's grandfather, young Erik, older-Henrik-teaching-Erik) are all rendered inline in the first-taste cinematic (`drawMemory6aScene`, `drawMemory6bScene`). As standalone commissioned-art sprite files they remain unbuilt. **Young Erik specifically has a correctness bug (issue #54) regardless of this status.**

---

*Report completed Sprint 33, 2026-06-02. Verified by inspection of `game/index.html` at commit `128de2d`.*
