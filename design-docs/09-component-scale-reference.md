# Component Scale Reference

This document catalogues every recurring component in *The Last Bites*, expressing each as a door-fraction per the Scale Anchor in `03-art-and-aesthetic.md`. It is the extension of that doc's Scale Anchor table — the rows already locked there are repeated here for completeness, with the full game's component inventory appended.

For each component, the visual sanity-check lives at `game/scale-reference.html`, which draws every component at canonical scale beside a 110 px reference door. When a new component is added to the game, this doc and that chart are updated together.

## How to use this doc

Each row states:
- **Component** — the named drawable element.
- **Door-fraction** — height (H) or width (W) expressed as a ratio of the canonical 110 px door height. Width fractions use the 110 px door-height as the unit (not door-width).
- **Pixel dims @ 480×270** — concrete pixel dimensions at the game's internal canvas resolution.
- **Chapter(s)** — where it appears.
- **Notes** — register (A = gameplay sprite, B = cinematic), source, or discrepancy flag.

To check a new asset: open `game/scale-reference.html`, find the asset's category, and visually confirm its silhouette sits at the right height against the door column in its cell. Read the pixel dims from the label. If the visual doesn't match the table, flag it in the Discrepancies section below.

Rows marked **[PROPOSED]** are sized by the author of this doc using the Scale Anchor rules and narrative context. They have not yet been confirmed by the lead designer. Lock them before commissioning art.

---

## Architecture

*Structural elements drawn as room backgrounds. Wall panels and floor bands are tiling fills; the door and porthole are discrete objects.*

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Door (canonical) | 1.00 H × 0.29 W | 110 × 32 | All | **Scale anchor.** Origin of all other ratios. Ship-corridor door, brass fittings. See `03-art-and-aesthetic.md` §Scale Anchor. |
| Wall panel (ship, tiling) | 1.35 H × 1.09 W (per tile) | 148 H × 120 W | All ship rooms | Riveted metal panel. Scrolls at half camera speed (parallax). Fills the wall above the baseboard. Not a standalone prop — architectural fill. |
| Baseboard | 0.11 H | 12 × room-width | All | Dark strip at `baseboardY = FLOOR_Y − 12 = 168`. Contrast anchor at wall–floor junction. |
| Floor plank band | 0.18 H | 20 × room-width | All ship rooms | Wood plank surface below `FLOOR_Y = 180`. Vertical plank-seam lines scroll at full camera speed. |
| Floor carpet runner (hallway) | 0.05 H | 5 × room-width | Ch1 hallway | Crimson-tint strip 3 px above `FLOOR_Y`. Atmospheric detail. |
| Window (ship cabin, grandparents room) | 0.82 H × 0.53 W | 90 × 58 | Ch1 grandparents | Four-pane wooden-framed window. Two-axis pane dividers. Not door-scaled — it is an architectural fill element. |
| Window (ship cabin, cinematic) | ~1.36 H × 0.62 W | ~150 × 68 | Ch1 cinematic | Same window at cinematic register, slightly larger canvas area in the painted scene. |
| Stairs / stairwell | 0.70–0.90 H | 77–99 px | Ch1 dark corridor, Ch8 | [PROPOSED] Narrow ship stairwell. Full-flight height. Width varies by room spec. |
| Gangway (exterior) | 0.80–1.00 H | 88–110 px | Between ship and port chapters | [PROPOSED] Inclined ramp, boarding angle. |

---

## Furniture

*Movable or fixed-position large objects in rooms. All dimensions are Register A (gameplay) unless noted.*

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Bed (cabin, Pip's) | 0.91 W × 0.20 H | 100 × 22 (frame) + headboard 10 × 36 | Ch1 cabin | Confirmed in `drawCabin`: `bedGW=100`, `bedGH=22`. Bottom edge at FLOOR_Y. Headboard extends 14 px above frame. |
| Bed (grandparents room) | 1.44 W × 0.20 H | 158 × 22 (frame) + headboard 10 × 36 | Ch1 grandparents | `drawGrandparents`: `bedGW=158`, `bedH=22`. Wider room; bed spans more. Slightly outside 0.85–1.00 W spec; see Discrepancies. |
| Bed (cinematic, grandparents) | 1.31 W × 0.22 H | 144 × 24 | Ch1 cinematic | `drawGrandparentsCinematic`: `bedW=144`, `bedH=24`. Cinematic register. |
| Nightstand | 0.18 W × 0.16 H | 20 × 18 | Ch1 grandparents | `drawGrandparents`: 20 px wide, 18 px tall. Within 18–22 × 18–22 spec. |
| Nightstand (cinematic) | 0.16 W × 0.16 H | 18 × 18 | Ch1 cinematic | `drawGrandparentsCinematic`: `nsW=18`, `nsH=18`. |
| Bedside lamp (table) | ~0.19 W × 0.16 H | ~21 × 18 (shade only) | Ch1 grandparents room + cinematic | Trapezoidal shade: 21 px wide at bottom, 13 px wide at top, 18 px tall. Stem extends to floor. |
| Suitcase (open, gameplay) | 0.49 W × 0.12 H | 54 × 13 (body) | Ch1 grandparents | `drawGrandparents`: `scW2=54`, `scH2=13`. Open lid adds ~14 px height at an angle. Within spec. |
| Suitcase (open, cinematic) | 0.62 W × 0.15 H | 68 × 16 | Ch1 cinematic | `drawGrandparentsCinematic`: `scW=68`, `scH=16`. Cinematic register. Slightly oversize vs gameplay. |
| Chair | 0.30–0.35 H | 33–38 px | Ch1+ | From `03-art-and-aesthetic.md` Scale Anchor table. Not yet implemented in `game/index.html`. |
| Long pine table (Leida) | 0.55–0.65 W × 0.25–0.30 H | 60–72 × 28–33 | Ch2 Estonia | [PROPOSED] Leida's kitchen table. Low, rustic, pine-plank construction. Seats shared meals. |
| Wood stove (Leida) | 0.45–0.55 H × 0.35–0.40 W | 50–60 × 38–44 | Ch2 Estonia | [PROPOSED] Cast-iron/brick wood-burning stove. Dominant height in cottage kitchen. |
| Kitchen counter | 0.25–0.30 H × 0.80–1.10 W | 28–33 × 88–120 | Ch2+, Ch5, Ch6, Ch8 | [PROPOSED] Work surface in chef encounter rooms. Width varies by room. Height consistent. |
| Potjie (cast-iron pot on legs) | 0.35–0.45 H total | 38–50 px (pot + legs) | Ch5 South Africa | [PROPOSED] Round three-legged cast-iron pot over open fire. Legs add ~10 px below pot belly. |
| Clay hearth pot (Joana/Beatriz) | 0.30–0.40 H | 33–44 px | Ch7 Brazil | [PROPOSED] Earthenware pot on low hearth corner. Slightly smaller than potjie. |

---

## Fixtures

*Wall-mounted or suspended elements. All share the locked mounting height: y ≈ 58 from room top (door-top height).*

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Porthole | 0.31–0.33 dia | ∅ 34–36 (r=17–18) | All ship rooms | Cabin: r=18 (∅ 36, 0.33). Hallway: r=17 (∅ 34, 0.31). Both within 0.30–0.34 spec. Brass ring + dark glass + pane divider. |
| Wall sconce (oil lamp) | ~0.22 H assembly | ~24 H × 14 W | Ch1+ | `drawSconce`: bracket arm 8 × 16, cap 14 × 6, glass globe ~8 W × 10 H, teardrop flame inside globe. Mounted at y=85 in hallway (fixtureY). |
| Brass plaque (room number) | — | 10 × 4 | Ch1 hallway | `drawBrassFitting` type=`'plaque'`. On each cabin door, centered near top. |
| Door handle (lever) | — | ~2 × 5 + 1.5 r circle | Ch1 hallway | `drawBrassFitting` type=`'handle'`. Pull-side of door. |
| Kickplate | — | 32 × 3 | Ch1 hallway | `drawBrassFitting` type=`'kickplate'`. Width = door width. Bottom of door. |
| Brass hook (ship passageway) | 0.07–0.09 H | ~8–10 px | Ch2 lower decks | [PROPOSED] Small wall-mount for hanging objects (coat, rope, lantern). |
| Hanging lantern (lower deck) | 0.18–0.22 H | 20–24 px | Ch5 lower deck, Ch7 Joana/Beatriz | [PROPOSED] Metal lantern suspended from ceiling or bracket. |

---

## Props (interactable)

*Objects Pip can inspect, pick up, or interact with. Scale is loose here — small props don't always need a door-fraction justification, but any prop that appears beside a character in a scene needs one.*

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Photograph (framed, on nightstand) | 0.13 W × 0.10 H | 14 × 11 (frame); 10 × 8 (image) | Ch1 grandparents | `drawGrandparents`: 14 × 10 frame on nightstand. Small family photo. |
| Radio (small transistor) | 0.25 W × 0.16 H | ~28 × 18 | Ch1 grandparents, various | [PROPOSED] Small table-top radio on nightstand or counter. Off in most scenes. |
| Candle (Pip's, from Henrik) | 0.18 H × 0.06 W | ~20 × 7 | Ch1 (earned from Henrik), Ch4 (used), Ch8 (pocket) | [PROPOSED] Small taper candle. Load-bearing prop: used in Ch4 Karakoncolos puzzle. |
| Matchbox | 0.09 H × 0.16 W | ~10 × 18 | Ch3 (earned), Ch4–Ch7 (pocket), Ch7 (used at dock) | [PROPOSED] Small cardboard matchbox. Load-bearing: Ch7 Boitatá encounter. |
| Switchblade (closed, Iris's) | 0.05 H × 0.18 W | ~6 × 20 | Ch5 (received from Iris), Ch6 (used on Pocong), Ch8 (pocket) | [PROPOSED] Mother-of-pearl handle, small folding blade. Load-bearing cross-chapter object. |
| Cast-iron pan (Leida's, old) | 0.08 H × 0.30 W | ~9 × 33 | Ch2 | [PROPOSED] Heavy flat frying pan. Found in lower deck; returned to Leida. Object-memory trigger. |
| Small wooden box (coffin-scale) | 0.15 H × 0.26 W | ~16 × 28 | Mentioned in asset inventory | [PROPOSED] Pip's small wooden coffin. Possibly inspectable or cinematic-only. |
| Banana leaf (single) | 0.18 H × 0.36 W | ~20 × 40 | Ch6 (stack received from Pocong), Ch8 (pocket) | [PROPOSED] Large broad leaf. Tirta uses for wrapping lemper. |
| Banana leaf bundle (wrapped) | 0.14 H × 0.22 W | ~15 × 24 | Ch6 post-Pocong, Ch7 (to Henrik) | [PROPOSED] Pip carries a tied bundle. Given to Henrik. |
| Brussels sprouts plate | 0.05 H × 0.22 W | ~6 × 24 | Ch5 (Iris's plate from wreck) | [PROPOSED] Small plate with a few green sprouts. Edwardian-era. |
| Recipe journal / notebook | 0.22 H × 0.18 W | ~24 × 20 | Ch1 (earned from Henrik), all subsequent | [PROPOSED] Pip's blank journal that accumulates recipes and memories. UI element at chapter-end; also exists as prop. |
| Small altar (flat stone + wooden bowl + ribbon) | ~0.05 H × 0.50 W total | stone ~6 × 50; bowl ~10 × 12 | Ch2 Leida's cottage path | [PROPOSED] Outdoor offering station. Three separate small objects arranged. |
| Bulletin board (hallway) | 0.27 H × 0.36 W | ~30 × 40 | Ch1 hallway | [PROPOSED] Sparkle indicator at y=95 in hallway but no draw code yet. Ship itinerary posted. |
| Luggage cart (hallway) | 0.45 H × 0.45 W | ~50 × 50 (cart + handle) | Ch1 hallway | [PROPOSED] Sparkle indicator at y=140 but no draw code yet. Suitcase-with-stuffed-bear on a trolley. |

---

## Characters

*All dimensions are Register A (gameplay sprite). Cinematic figures use the same canonical scale as gameplay figures; cinematic closeness is achieved via camera zoom, not inflated character sizes. See `03-art-and-aesthetic.md` §Visual Registers and §Interactable object affordances.*

*For the live visual reference — each character drawn at canonical scale with idle and speaking animation — see [`game/character-gallery.html`](../game/character-gallery.html). That gallery is the visual source-of-truth for character appearance; the table below is the numeric source-of-truth.*

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Pip (ghost form, gameplay) | 0.35–0.40 H | 38–44 px tall | All | Canonical. `game/index.html` impl: `PIP_H = 40`. |
| Adult NPC (representative) | 0.55–0.65 H | 60–72 px tall | All adult characters | Canonical. Henrik, Leida, Muhittin, Johannes, Tirta, Joana, Beatriz, Brian, Passenger, Janitor all in this band. |
| Sandy (tall adult, Ch3) | 0.65–0.70 H | 72–77 px tall | Ch3 | Sandy is noticeably taller than other adults. Brown hair, beer belly, Scottish. |
| Babcia (gameplay, seated) | ~0.55 H (lower end of Adult NPC band) | ~60 px | Ch1 grandparents room | Visibly shorter than Dziadek/Henrik. Seated figure reads ~0.55 H from top of bun to lap bottom. Impl updated Sprint 08.5. |
| Dziadek (gameplay, standing) | 0.60–0.65 H | 66–72 px | Ch1 grandparents room | Standard Adult NPC. Impl updated Sprint 08.5. |
| Passenger (scripted walk) | 0.55–0.65 H | 60–66 px | Ch1 hallway | Top-hatted figure; hat crown adds ~10 px above head. Impl updated Sprint 08.5. |
| Child NPC representative | 0.35–0.45 H | 38–50 px | Ch1 memory-Pip; Ch2 Bibi etc. | Canonical from `03-art-and-aesthetic.md`. Memory-Pip in cinematic is a human child. |
| Iris (Edwardian ghost child) | 0.35–0.40 H | 38–44 px | Ch5 | From `08-character-reference-sheets.md`. Small Edwardian girl. Smaller than memory-Pip band; confirmed by user review. Not yet implemented. |
| Erik (Norwegian ghost boy, ~12) | 0.40–0.45 H | 44–50 px | Ch7 (first appearance), Ch8 | From `08-character-reference-sheets.md`. Dark hair, slight gap between front teeth, warm-amber at-peace glow. Not yet implemented. |
| Pätu (gray tabby cat) | 0.18–0.22 H | 20–24 px | Ch2+ (recurring) | Canonical from `03-art-and-aesthetic.md`. Not yet implemented in canvas (CSS-div placeholder exists). |
| Capuchin monkey (Ch7) | 0.15–0.20 H | 16–22 px | Ch7 Brazil forest | From `08-character-reference-sheets.md`. Small, sharp-eyed, white-tipped ears. Not yet implemented. |
| Black Shuck (Ch3) | 0.40–0.50 H | 44–55 px at shoulder | Ch3 Southampton | From `08-character-reference-sheets.md`. Large ghostly dog. Confirmed by user review Sprint 08.5. Not yet implemented. |
| Pocong (Ch6) | 0.70–0.85 H | 77–94 px | Ch6 Indonesia | From `08-character-reference-sheets.md`. Tall shrouded figure, hopping — looms above adult NPCs. Confirmed by user review Sprint 08.5. Not yet implemented. |
| Karakoncolos (Ch4) | 0.50–0.65 H | 55–72 px | Ch4 Türkiye | From `08-character-reference-sheets.md`. Folkloric hairy creature, stooped with long arms, dark-furred. Not yet implemented. |
| Haldjas (Ch2) | 0.50–0.65 spread | ~55–72 px diameter when materialized | Ch2 Estonia | No single sprite height. Warm gold-amber sparkle cluster with loose humanoid suggestion. Confirmed by user review Sprint 08.5. |
| Mamlambo (Ch5) | not a standalone sprite | porthole glimpse only | Ch5 South Africa | Body coils against the hull; only the eye is visible through the porthole. Blood-iron color (`#7a1418`). |
| Boitatá (Ch7) | > 1.0 H (vast) | extends beyond any single cell | Ch7 Brazil | Vast fire-serpent. No fixed sprite box — staged in cinematic framing with only part of the body visible. |

---

## UI Elements

*These elements are HTML overlays positioned in CSS, not canvas-drawn. Dimensions are given in terms of canvas pixels (at 480×270 internal scale) and CSS coordinates side by side. They do not follow the door-fraction convention — they are screen chrome, not world objects — but their dimensions relative to the canvas are documented here for completeness.*

| Component | CSS/canvas dims | Notes |
|---|---|---|
| Dialogue box | 76% canvas width (~365 px) × variable height; bottom: 10% from canvas bottom (~27 px from base) | HTML `<div>`, dark panel with double-border chrome. `padding: 16px 24px`. Not canvas-drawn. |
| Controls strip | full canvas width × ~14 px text height; bottom: 2% (~5 px from base) | HTML `<div>`, faint uppercase text hint. Context-sensitive. Not canvas-drawn. |
| Sparkle indicator / object aura | Always-on radial aura (20 px radius); sparkle particle (~3 px dot + 12 px glow) at ≤18 px | Canvas-drawn (`drawObjectAura`). Warm-amber aura (`--warm-pool-amber` #ffc868) around every interactable object at all times — faint baseline (α 0.15) ramping to full intensity as Pip enters 30 px range. Sparkle particle (sine-drift) appears when Pip is within 18 px. Both hidden during dialogue. See `03-art-and-aesthetic.md` §Interactable object affordances. |
| Room transition overlay | 480 × 270 (full canvas) | HTML `<div>` black overlay. Fades in/out on room change. |
| Music toggle button | 32 × 32 px | Fixed outside canvas, top-right viewport corner. |
| Journal UI (full screen) | 480 × 270 (full canvas) | Described in `03b-ui-spec.md`. Not yet implemented. |
| Strength indicator | ~40 × 8 px (bar) | Described in `03b-ui-spec.md`. Not yet implemented. |
| Lives display | ~20 × 20 px per life | Described in `03b-ui-spec.md`. Not yet implemented. |
| Port selector card | ~240 × 160 px | Described in `03b-ui-spec.md`. Not yet implemented. |

---

## Echo-creatures (per chapter)

*Echo-creatures are the ship's spectral vermin — the residue of encounters across its history. They appear in wordless traversal sections. The canonical scale for ambient vermin is 0.06–0.14 H (7–16 px). A second tier — **visible echo-creatures** — covers echo-fish, echo-deer, and echo-cats, which render larger (0.20–0.40 H) because they play a deliberate role in the player's experience rather than serving as background texture.*

| Component | Door-fraction | Pixel dims | Chapter(s) | Notes |
|---|---|---|---|---|
| Echo-spiders | 0.09 H | ~10 px | Ch1 dark corridor (implied) | `art-asset-list.md`: ~10 px. Within spec. |
| Echo-mice | 0.11 H | ~12 px | Ch2 lower decks (traversal) | `art-asset-list.md`: ~12 px. Within spec. |
| Echo-bats | 0.16 H (wingspan) | ~18 px wingspan | Ch2–Ch3 various | `art-asset-list.md`: ~18 px wingspan. Wingspan is wider than height — body height may be ~10 px. Near top of range when wingspan is used as the measure. |
| Echo-rats | 0.15 H | ~16 px | Ch5 lower deck | `art-asset-list.md`: ~16 px. At top of spec range. |
| Echo-fish | 0.25–0.30 H | 28–33 px | Ship lower decks | Visible echo-creature exception (Sprint 09.5). Drift in mid-air, not floor-level vermin. |
| Echo-deer | 0.35–0.40 H | ~40–44 px | Various | Visible echo-creature exception (Sprint 09.5). Cross streets visibly during traversal. |
| Echo-cats | 0.20–0.22 H | ~22–24 px | Ch4 alley (Ch4 outline) | Visible echo-creature exception (Sprint 09.5). Recognizable cats in alley scenes. |
| Echo-tarsiers | 0.07–0.09 H | ~8–10 px | Ch6 lower deck | [PROPOSED] Pygmy tarsiers. Tiny body, enormous eyes. Cling to pipes and beams. |
| Mosquitoes | 0.04 H | ~4–5 px | Ch7 Brazil, Ch8 Greenpoint | [PROPOSED] Barely visible individual dots; appear in slow-drifting clouds. |
| Urban vermin (cockroaches, bedbugs) | 0.04–0.06 H | ~4–7 px | Ch8 Greenpoint | [PROPOSED] City-specific echo-creatures for the final chapter streets. |

---

## Discrepancies — resolution status

*Sprint 08 surfaced 12 discrepancies. All 12 now resolved (Sprints 08.5 and 09.5).*

### Discrepancies: `game/index.html` vs canonical scale

**1. Pip (gameplay sprite) — RESOLVED Sprint 08.5**
- Was: 16 × 24 px (0.22 H). New canonical: 0.35–0.40 H → 38–44 px. `PIP_H` updated to 40 in `game/index.html`; sprite geometry rescaled.

**2. Passenger (scripted-walk NPC) — RESOLVED Sprint 08.5**
- Was: 28 px (0.25 H). Bumped to ~62 px in `game/index.html` — within the Adult NPC band (0.55–0.65 H).

**3. Babcia (gameplay sprite, seated) — RESOLVED Sprint 08.5**
- Was: ~25 px (0.23 H). Bumped to ~60 px (`drawBabcia`) — lower end of Adult NPC band, visibly shorter than Dziadek.

**4. Dziadek (gameplay sprite, standing) — RESOLVED Sprint 08.5**
- Was: ~31 px (0.28 H). Bumped to ~66 px (`drawDziadek`) — 0.60–0.65 H, standard Adult NPC.

**5. Babcia (cinematic sprite) — RESOLVED Sprint 08.5 (spec was wrong)**
- Prior spec allowed cinematic figures to reach 0.75–0.90 H. That spec is retired. Cinematic figures use the same canonical scale as gameplay figures. `drawCinBabcia` stays at its current size (~28 px); cinematic closeness will come from camera zoom when cinematic code is built. No code change needed.

**6. Dziadek (cinematic sprite) — RESOLVED Sprint 08.5 (spec was wrong)**
- Same as #5. `drawCinDziadek` stays at ~44 px. Prior "cinematic allowance" spec retired.

### Discrepancies: `art-asset-list.md` specs vs canonical scale

**7. Adult NPC sprites (generic prompt spec) — RESOLVED Sprint 08.5**
- Updated `art-asset-list.md` prompt entries for adult NPC sprites to specify 60–72 px (door-fraction 0.55–0.65).

**8. Pip sprite in `art-asset-list.md` — RESOLVED Sprint 08.5**
- Updated Pip sprite prompt entries to specify 38–44 px (door-fraction 0.35–0.40).

**9. Echo-fish — RESOLVED Sprint 09.5**
- Echo-fish locked at 0.25–0.30 H (28–33 px) as a visible echo-creature exception. They drift visibly in mid-air rather than skittering at floor level. See `03-art-and-aesthetic.md` Scale Anchor table.

**10. Echo-deer — RESOLVED Sprint 09.5**
- Echo-deer locked at 0.35–0.40 H (~40–44 px) as a visible echo-creature exception. They visibly cross streets during traversal sections. See `03-art-and-aesthetic.md` Scale Anchor table.

**11. Echo-cats — RESOLVED Sprint 09.5**
- Echo-cats locked at 0.20–0.22 H (~22–24 px) as a visible echo-creature exception. They are recognizable cats in alley scenes, not background vermin. See `03-art-and-aesthetic.md` Scale Anchor table.

### Discrepancy: doc 03 vs doc 08 (Iris)

**12. Iris listed as Adult NPC in `03-art-and-aesthetic.md` — RESOLVED Sprint 08.5**
- Iris removed from Adult NPC row in doc 03 Scale Anchor table and added to Child NPC row (0.35–0.40 H, 38–44 px). Matches `08-character-reference-sheets.md` description of Iris as ~10 years old.
