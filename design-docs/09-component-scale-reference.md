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

*All dimensions are Register A (gameplay sprite) unless marked [CIN] for cinematic register. Register A is the in-game sprite scale; Register B/cinematic figures may be drawn 20–40% larger in their specific scenes. See `03-art-and-aesthetic.md` §Visual Registers.*

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Pip (ghost form, gameplay) | 0.30–0.35 H | 32–38 px tall | All | Canonical from `03-art-and-aesthetic.md`. Current impl is 16×24 px (0.22 H) — **DISCREPANCY, see below.** |
| Adult NPC (representative) | 0.55–0.65 H | 60–72 px tall | All adult characters | Canonical. Henrik, Leida, Muhittin, Johannes, Tirta, Joana, Beatriz, Brian, Passenger, Janitor all in this band. |
| Sandy (tall adult, Ch3) | 0.65–0.70 H | 72–77 px tall | Ch3 | Sandy is noticeably taller than other adults. Brown hair, beer belly, Scottish. |
| Babcia (gameplay, seated) | 0.55–0.65 H (standing equiv.) | 60–72 px standing; seated figure should read ~0.40–0.45 H | Ch1 grandparents room | Current impl: `drawBabcia` is ~25 px (0.23 H) — **DISCREPANCY, see below.** |
| Dziadek (gameplay, standing) | 0.55–0.65 H | 60–72 px | Ch1 grandparents room | Current impl: `drawDziadek` is ~31 px (0.28 H) — **DISCREPANCY, see below.** |
| Passenger (scripted walk) | 0.55–0.65 H | 60–72 px | Ch1 hallway | Current impl: `drawPassengerBody` is 28 px (0.25 H) — **DISCREPANCY, see below.** |
| Babcia (cinematic) | 0.75–0.90 H [CIN] | 85–100 px | Ch1 cinematic | Cinematic register allows larger scale. Current impl: `drawCinBabcia` is ~28 px (0.25 H) — **DISCREPANCY, see below.** |
| Dziadek (cinematic) | 0.75–0.90 H [CIN] | 85–100 px | Ch1 cinematic | Current impl: `drawCinDziadek` is ~44 px (0.40 H) — **DISCREPANCY, see below.** |
| Child NPC representative | 0.40–0.45 H | 44–50 px | Ch1 memory-Pip; Ch2 Bibi etc. | Canonical from `03-art-and-aesthetic.md`. Memory-Pip in cinematic register is a human child, not the ghost. |
| Iris (Edwardian ghost child) | 0.40–0.45 H | 44–50 px | Ch5 | From `08-character-reference-sheets.md`. Looks like a living girl. Turns translucent when sad. Not yet implemented. |
| Erik (Norwegian ghost boy, ~12) | 0.40–0.45 H | 44–50 px | Ch7 (first appearance), Ch8 | From `08-character-reference-sheets.md`. Dark hair, slight gap between front teeth, warm-amber at-peace glow. Not yet implemented. |
| Pätu (gray tabby cat) | 0.20–0.25 H | 22–28 px | Ch2+ (recurring) | Canonical from `03-art-and-aesthetic.md`. Not yet implemented in canvas (CSS-div placeholder exists). |
| Capuchin monkey (Ch7) | 0.15–0.20 H | 16–22 px | Ch7 Brazil forest | From `08-character-reference-sheets.md`. Small, sharp-eyed, white-tipped ears. Not yet implemented. |
| Black Shuck (Ch3) | 0.30–0.40 H | 33–44 px | Ch3 Southampton | From `08-character-reference-sheets.md`. Large ghostly dog, approx. shoulder-height to an adult's waist. Not yet implemented. |
| Pocong (Ch6) | 0.50–0.65 H | 55–72 px | Ch6 Indonesia | From `08-character-reference-sheets.md`. Tall shrouded figure, hopping. Note: test checklist requires Pocong be taller than adult NPC (60–72 px) — see Discrepancies. Not yet implemented. |
| Karakoncolos (Ch4) | 0.50–0.65 H | 55–72 px | Ch4 Türkiye | From `08-character-reference-sheets.md`. Folkloric hairy creature, stooped with long arms, dark-furred. Not yet implemented. |
| Haldjas (Ch2) | particle cluster | ~40 px swarm area | Ch2 Estonia | No single sprite height. Warm gold-amber sparkles with loose humanoid suggestion when materialized. |
| Mamlambo (Ch5) | not a standalone sprite | porthole glimpse only | Ch5 South Africa | Body coils against the hull; only the eye is visible through the porthole. Blood-iron color (`#7a1418`). |
| Boitatá (Ch7) | > 1.0 H (vast) | extends beyond any single cell | Ch7 Brazil | Vast fire-serpent. No fixed sprite box — staged in cinematic framing with only part of the body visible. |

---

## UI Elements

*These elements are HTML overlays positioned in CSS, not canvas-drawn. Dimensions are given in terms of canvas pixels (at 480×270 internal scale) and CSS coordinates side by side. They do not follow the door-fraction convention — they are screen chrome, not world objects — but their dimensions relative to the canvas are documented here for completeness.*

| Component | CSS/canvas dims | Notes |
|---|---|---|
| Dialogue box | 76% canvas width (~365 px) × variable height; bottom: 10% from canvas bottom (~27 px from base) | HTML `<div>`, dark panel with double-border chrome. `padding: 16px 24px`. Not canvas-drawn. |
| Controls strip | full canvas width × ~14 px text height; bottom: 2% (~5 px from base) | HTML `<div>`, faint uppercase text hint. Context-sensitive. Not canvas-drawn. |
| Sparkle indicator | ~5 px dot + 8 px glow radius | Canvas-drawn (`drawSparkle`). Amber dot, sine-drift animation. Appears near inspectable objects within 18 px of Pip. |
| Room transition overlay | 480 × 270 (full canvas) | HTML `<div>` black overlay. Fades in/out on room change. |
| Music toggle button | 32 × 32 px | Fixed outside canvas, top-right viewport corner. |
| Journal UI (full screen) | 480 × 270 (full canvas) | Described in `03b-ui-spec.md`. Not yet implemented. |
| Strength indicator | ~40 × 8 px (bar) | Described in `03b-ui-spec.md`. Not yet implemented. |
| Lives display | ~20 × 20 px per life | Described in `03b-ui-spec.md`. Not yet implemented. |
| Port selector card | ~240 × 160 px | Described in `03b-ui-spec.md`. Not yet implemented. |

---

## Echo-creatures (per chapter)

*Echo-creatures are the ship's spectral vermin — the residue of encounters across its history. They appear in wordless traversal sections. The canonical scale is 0.06–0.14 H (7–16 px); several entries in `art-asset-list.md` exceed this range — see Discrepancies below.*

| Component | Door-fraction | Pixel dims | Chapter(s) | Notes |
|---|---|---|---|---|
| Echo-spiders | 0.09 H | ~10 px | Ch1 dark corridor (implied) | `art-asset-list.md`: ~10 px. Within spec. |
| Echo-mice | 0.11 H | ~12 px | Ch2 lower decks (traversal) | `art-asset-list.md`: ~12 px. Within spec. |
| Echo-bats | 0.16 H (wingspan) | ~18 px wingspan | Ch2–Ch3 various | `art-asset-list.md`: ~18 px wingspan. Wingspan is wider than height — body height may be ~10 px. Near top of range when wingspan is used as the measure. |
| Echo-rats | 0.15 H | ~16 px | Ch5 lower deck | `art-asset-list.md`: ~16 px. At top of spec range. |
| Echo-fish | 0.06–0.14 H (canonical) | 7–16 px (canonical) | Ship lower decks | `art-asset-list.md`: ~28–32 px — **DISCREPANCY vs canonical 0.06–0.14 H (7–16 px).** See Discrepancies below. |
| Echo-deer | 0.06–0.14 H (canonical) | 7–16 px (canonical) | Various | `art-asset-list.md`: ~44 × 40 px — **DISCREPANCY vs canonical 0.06–0.14 H (7–16 px).** |
| Echo-cats | 0.06–0.14 H (canonical) | 7–16 px (canonical) | Ch4 alley (Ch4 outline) | `art-asset-list.md`: ~24 px — **DISCREPANCY vs canonical 0.06–0.14 H (7–16 px).** |
| Echo-tarsiers | 0.07–0.09 H | ~8–10 px | Ch6 lower deck | [PROPOSED] Pygmy tarsiers. Tiny body, enormous eyes. Cling to pipes and beams. |
| Mosquitoes | 0.04 H | ~4–5 px | Ch7 Brazil, Ch8 Greenpoint | [PROPOSED] Barely visible individual dots; appear in slow-drifting clouds. |
| Urban vermin (cockroaches, bedbugs) | 0.04–0.06 H | ~4–7 px | Ch8 Greenpoint | [PROPOSED] City-specific echo-creatures for the final chapter streets. |

---

## Discrepancies found

*Components whose canonical scale (as documented in this doc and `03-art-and-aesthetic.md`) does not match their current implementation in `game/index.html` or their spec in `art-asset-list.md`. No resolution proposed here — these are catalogued for a follow-up sprint.*

### Discrepancies: `game/index.html` vs canonical scale

**1. Pip (gameplay sprite)**
- Canonical: 0.30–0.35 H → 32–38 px tall
- Current (`drawPipBody`, `PIP_H = 24`): 16 × 24 px (0.22 H)
- Also noted in `03-art-and-aesthetic.md` §Existing assets to reconcile: "currently 16×24. Could bump slightly toward 18×34."

**2. Passenger (scripted-walk NPC)**
- Canonical: 0.55–0.65 H → 60–72 px tall
- Current (`drawPassengerBody`): from y=−28 to y=0 in local coords = 28 px (0.25 H), 12 px wide
- Also noted in `03-art-and-aesthetic.md` §Existing assets to reconcile: "currently ~22-26px tall. Bump to ~60-66px."

**3. Babcia (gameplay sprite, seated)**
- Canonical: 0.55–0.65 H standing; seated figure should still read ≥ 0.40 H
- Current (`drawBabcia`): from y=−25 (hair bun arc) to y=0 = ~25 px (0.23 H)
- Also noted in `03-art-and-aesthetic.md` §Existing assets to reconcile: "currently ~22-30px tall. Bump to ~60-65px."

**4. Dziadek (gameplay sprite, standing)**
- Canonical: 0.55–0.65 H → 60–72 px
- Current (`drawDziadek`): from y=−30 (flat cap) to y=+1 (shoe) = ~31 px (0.28 H)
- Also noted in `03-art-and-aesthetic.md` §Existing assets to reconcile.

**5. Babcia (cinematic sprite)**
- Canonical cinematic allowance: 0.75–0.90 H → 85–100 px (cinematic register allows larger framing)
- Current (`drawCinBabcia`): from y=−28 (hair bun) to y=0 = ~28 px (0.25 H)
- Both cinematic and gameplay Babcia are well below spec.

**6. Dziadek (cinematic sprite)**
- Canonical cinematic allowance: 0.75–0.90 H → 85–100 px
- Current (`drawCinDziadek`): from y=−42 (cap brim) to y=+2 (shoes) = ~44 px (0.40 H)
- Better than the gameplay sprite but still below the cinematic spec.

### Discrepancies: `art-asset-list.md` specs vs canonical scale

**7. Adult NPC sprites (generic prompt spec)**
- Canonical: 0.55–0.65 H → 60–72 px
- `art-asset-list.md` AI prompt dimensions consistently say "~24×40 pixels" for NPC sprites
- The asset list was written before the Scale Anchor was locked and has not been updated to reflect the new ratios.

**8. Pip sprite in `art-asset-list.md`**
- Canonical: 0.30–0.35 H → 32–38 px
- `art-asset-list.md`: "~16×24 pixels"
- Matches the current prototype implementation but not the canonical target after the Scale Anchor lock.

**9. Echo-fish**
- Canonical: 0.06–0.14 H → 7–16 px
- `art-asset-list.md`: ~28–32 px
- Significantly oversize for the echo-creature scale band. If echo-fish are intended to be larger than other echo-creatures, their door-fraction should be explicitly defined and the table extended.

**10. Echo-deer**
- Canonical: 0.06–0.14 H → 7–16 px
- `art-asset-list.md`: ~44 × 40 px
- Significantly oversize. Echo-deer at 44 px would read at adult NPC scale (0.40 H). The asset list treats them as mid-size creatures; the Scale Anchor treats echo-creatures as tiny vermin. These two specs need reconciliation before Ch2 is built.

**11. Echo-cats**
- Canonical: 0.06–0.14 H → 7–16 px
- `art-asset-list.md`: ~24 px
- 24 px is cat-scale (0.22 H), not echo-creature vermin scale. Echo-cats in the alley scene (Ch4) may be intended to feel larger than mice and spiders — their scale needs an explicit design decision.

### Discrepancy: doc 03 vs doc 08 (Iris)

**12. Iris listed as Adult NPC in `03-art-and-aesthetic.md` Scale Anchor table**
- `03-art-and-aesthetic.md` (Scale Anchor table, row "Adult NPC"): lists Iris among the examples
- `08-character-reference-sheets.md`: Iris is "~10 years old," door-fraction 0.40–0.45 H (44–50 px) — a child, not an adult
- The Scale Anchor table was written before Iris's age and fraction were locked in the character ref sheet. The table in doc 03 needs a one-line correction: remove "Iris" from the Adult NPC row and add her to the Child row.
