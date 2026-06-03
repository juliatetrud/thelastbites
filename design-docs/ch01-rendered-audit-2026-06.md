# Chapter 1 Rendered Audit — June 2026

**Sprint 38 deliverable.** Static code audit of `game/index.html` against Julia's 21 play-test items and the character gallery. Method: trace draw functions, room/beat transition logic, and play sequence in the code. No automated browser testing (per CLAUDE.md). Visual-quality judgments marked *code cannot confirm — defers to screenshot* where the rendering must be seen to evaluate.

Audit commit base: `5607d04` (Sprint 37).

---

## Gallery bucket definitions (per sprint spec)

| Bucket | Meaning | Ch1 characters |
|---|---|---|
| **Designed-in-gallery** | `designed: true` + real gallery `draw*` function; Julia has approved the gallery sprite. Fix path = port gallery design into game. | Pip, Babcia, Henrik, Erik |
| **Not-designed** | Has a game draw function but **no approved gallery sprite** (the gallery entry is a placeholder). Fix path = design in gallery first (Julia reviews), then port to game. | Dziadek, Janitor, Passenger, Doctor |

> **Note on gallery flags:** The gallery data object has `designed: true` for Dziadek, Janitor, Passenger, and Doctor, accompanied by the comment "gallery entry is placeholder pending gallery sprint." These flags are technically true (a `draw*` function exists in `game/index.html`) but misleading — the gallery itself shows placeholder boxes for all four, meaning no approved design exists. The sprint spec's categorisation stands: these four are *not-designed* in the meaningful sense.

---

## Item 1 — Passenger renders as a blob

**Claimed state:** Shipped procedural (Sprint 03).  
**Actual state:** `drawPassengerBody()` (line 7212) renders a monochrome silhouette in `#2a2438`. Structure: top hat crown (15×11px), hat brim (27×4px), head (13×13px), collar, coat body, coat tails, legs, shoes. All in one dark purple-grey. No facial features, no coat texture, no flesh tone. Reads as a dark shape walking left.  
**Code location:** `drawPassengerBody` at line 7212; called from `drawPassenger` at line 7193.  
**Visual quality:** Cannot confirm without screenshot, but single-color silhouette with no features will read as a blob at game scale.  
**Fix scope:** Design an approved gallery sprite (gallery entry currently placeholder), then port to game.  
**Gallery bucket:** **Not-designed.** Gallery flag `designed: true` is a technicality; gallery entry is a placeholder box. No approved design exists.

---

## Item 2 — Dziadek renders as a blob

**Claimed state:** Shipped procedural (Sprint 04, Sprint 09 polish).  
**Actual state:** `drawDziadek()` (line 7520) renders a monochrome `#2a2030` silhouette. Shapes: flat cap (24×7 + 18×4), head (18×15), neck (9×4), coat body (31×22), coat lower (22×7), legs (7×7 each), shoes (9×2 each). Globally `globalAlpha = 0.90`. No flesh tone, no flat-cap color distinction, no visible features.  
**Code location:** `drawDziadek` at line 7520; called from `drawGrandparents` at line ~7349.  
**Visual quality:** Single dark color, rectangle stack. Reads as a blob.  
**Fix scope:** Design in gallery first, then port to game.  
**Gallery bucket:** **Not-designed.** Same situation as Passenger — placeholder in gallery despite `designed: true` flag.

---

## Item 3 — Babcia renders as a blob (gallery has a design; game diverges)

**Claimed state:** Shipped procedural (Sprint 04, Sprint 09 polish).  
**Actual state (game):** `drawBabcia()` (line 7486) renders a monochrome `#2a2030` blob with `globalAlpha = 0.90`. Shapes: hair bun (arc), head rect (19×17), hunched torso (34×19), apron band (24×12, `globalAlpha = 0.40`, `#4a3820`), lap/skirt (43×12). No facial features, no kerchief, no distinguishable coat detail. The apron band at 40% alpha is barely visible. The sob-bob animation (±1px sine at 1500ms) is correct.  
**Gallery design (approved):** `drawBabcia` in `character-gallery.html` (line 874) has: red-signature kerchief, detailed coat with shading bands and sleeve joins, human eyes with cream whites/dark pupils via `drawHumanEye`, crying overlay (tear pool + drip cycle), clasped/parted hands animation, flesh-tone face and neck stub, floor glow in `#8a2a2a`. **This design is not ported to the game.**  
**Code location:** Game: `drawBabcia` at line 7486. Gallery: `drawBabcia` at gallery line 874.  
**Gap severity:** Large. The gallery Babcia is recognisably a person (kerchief, eyes, hands, crying). The game Babcia is an undifferentiated dark blob.  
**Fix scope:** Port gallery design into game's `drawBabcia`. The gallery function is a direct reference; shapes, colors, and animation cycles are there.  
**Gallery bucket:** **Designed-in-gallery.** Fix = port.

---

## Item 4 — Suitcase renders as a plain square

**Claimed state:** Shipped procedural (Sprint 04).  
**Actual state:** In `drawGrandparents` (line 7422): suitcase body is a `fillRect` (54×13, `#3e3018`), with a stroked outline. The open lid is drawn as a `closePath` quadrilateral polygon (four points forming a shallow trapezoid above the body). The shirt inside is `rgba(80,110,165,0.38)` — a very transparent blue tint inside the body. **No teddy bear is drawn.** The bear exists only in the hallway luggage trolley inspection text ("a stuffed bear sticks out of the top"), not as a visual in either the hallway trolley or the grandparents' suitcase.  
**Code location:** `drawGrandparents` line 7422–7444.  
**Visual quality:** The open lid polygon is structurally there but may not read clearly as an open case. The shirt hint is very faint (38% alpha). No bear.  
**Fix scope:** Add a visible bear silhouette sticking out of the suitcase (small ~8px blob with ear nubs). Consider making the shirt and lid more visible. Neither fix requires a new system.  
**Gallery bucket:** N/A (prop, not a character).

---

## Item 5 — Grandparents' room is under-designed

**Claimed state:** Shipped procedural (Sprint 04, Sprint 09 polish, Sprint 20, Sprint 37).  
**Actual state:** The room draws: warm brown wall gradient, lamp glow, riveted panels, window (58×90 rect with aurora, Sprint 35), bed (158×22, Sprint 04), bedside lamp (Sprint 04), nightstand + photograph (Sprint 04), suitcase (Sprint 04), Dziadek at window (Sprint 04, blob), Babcia on bed (Sprint 04, blob), armchair with coat (Sprint 37), Dziadek's radio (Sprint 20).  
**What's missing:** No visible wall art or decor. The window shows only the sky fill + aurora; there is no actual scenery (ocean/fjord) behind it. Babcia and Dziadek both render as dark blobs (see Items 2 and 3). The room's emotional center (Babcia weeping) is carried entirely by the sob-bob animation on a shapeless form.  
**Visual quality:** *Cannot fully confirm without screenshot.* The procedural room has the structural elements, but the lack of character visual quality likely makes it read as sparse. The absence of window scenery (Item 6) makes the window feel flat.  
**Fix scope:** Primarily Items 2, 3, and 6. The furniture geometry is adequate; the room reads thin because of blob characters and the flat window.

---

## Item 6 — Cabins should have big windows with night scenery

**Claimed state:** Not built (known gap before this audit).  
**Actual state:** No window scenery system exists anywhere in `game/index.html`. The cabin has a circular porthole (18px radius) using `drawPortholeScene` with the `ch1-ocean-night` scene (sky-stars, horizon-line, water-waves, aurora-faint). The grandparents' cabin has a static 58×90px rectangle fill with aurora overlay. Neither room has a large rectangular window showing parallax fjord/ocean scenery that scrolls as the boat moves.  
**Code location:** Cabin porthole at line ~4958; grandparents window at line 7199. No `drawWindowScenery` or equivalent function exists.  
**Fix scope:** New system: a `WINDOW_SCENES` registry parallel to `PORTHOLE_SCENES`, with a rectangular clip region instead of circular. Per-chapter backgrounds (fjord at night, open ocean, port lights) drawn behind stars/aurora. Camera-speed parallax for "boat moving" feel. Would touch `drawCabin`, `drawGrandparents`, and potentially the dark corridor (Item 19) if portholes are added there. Medium-to-large new feature.  
**Gallery bucket:** N/A (feature/system).

---

## Item 7 — Cabin door (and "from the other side" dialogue) must be removed

**Claimed state:** The door inspectable has been significantly reworked across multiple sprints (Sprint 14 added doctor voice; Sprint 23 retired hallway-side dialogue; Sprint 24 stripped dialogue further). Current claimed state is "no dialogue from hallway side, ever."  
**Actual state:** The `cabinObjects` array (line 1670) includes the `door` entry at x=120 with `id: 'door-inspect'` and THREE active choices: "Try the handle" (hand passes through dialogue), "Press his ear" (doctor voice dialogue), "Wait" (sob dialogue). These are active interactive choices that fire from *inside* the cabin. The door inspectable IS still interactive from the cabin interior. It draws with a warm-amber glow (permeable) via `drawDoor` at line 5179.  
**Code location:** `cabinObjects` starting at line 1670; door drawn at line 5179.  
**What Julia wants:** Door and all its dialogue removed; the room should read as a bedroom, not a room with an active exit door. The doctor's far door (x=430, non-interactive) is separate and should stay as is.  
**Fix scope:** Remove the `door` entry from `cabinObjects` (lines 1670–1715). Remove the `drawDoor` call for the entry door at line 5179 (or leave it as purely visual set-dressing with no aura). Update exit logic: Pip's left-edge exit from the cabin must still return to the hallway (line 3116–3118 — that's a movement check, not tied to the object inspectable, so it still works after removing the interactable).

---

## Item 8 — Cabin porthole should be replaced by a big window

**Claimed state:** Cabin porthole shipped procedural, aurora-faint layer added Sprint 35.  
**Actual state:** `drawPortholeScene` at x=190, radius 18 (inner radius 15), clips a circular scene. The inspect dialogue at `cabinObjects` id `porthole` (line 1719) fires "Through the porthole, dark water sparkles…" with a PIP line and a narration line.  
**Code location:** Porthole scene draw at line 4958; porthole inspectable at line 1719.  
**What Julia wants:** Remove the porthole + its dialogue. Replace with a large rectangular window showing a fjord beauty scene, with a new inspection line. This ties to Item 6 (window scenery system).  
**Fix scope:** Remove `porthole` entry from `cabinObjects`; remove `drawPortholeScene` call for the cabin porthole; add a rectangular window (visual) and new inspectable to `cabinObjects`. Depends on Item 6 (window scenery system) for full delivery, but the window frame + a static moonlight-gradient fill can ship before the scenery system.

---

## Item 9 — Bed not visible in the cabin

**Claimed state:** Shipped procedural (Sprint 10.7 lump; Sprint 11 post-reveal state).  
**Actual state:** The bed IS drawn. `drawCabin` (line 5127): `bedGX=360, bedGW=100, bedGH=22, bedGY = FLOOR_Y - bedGH = 158`. Colors: headboard `#2a2448`, bed frame `#1e2040`, bedding `#363c66` / `#404470`. The right wall cap (rwW=48) fills x=432–480 with `#0a1228` (very dark). The bed headboard at x=450–460 overlaps the right wall cap zone. Since the bed is drawn AFTER the wall cap (lines 5114 vs 4933), the bed draws on top — but both are dark blue-ish, so contrast is low.  
**Likely cause:** Wall gradient (`#1e2e54` top, `#2e3e72` mid, `#1e2e54` bottom) and bed colors (`#1e2040` frame) are nearly identical. The bed blends into the wall. The bedding (`#363c66`) is slightly lighter but still dark. The visual separation relies only on a subtle color difference and a thin `rgba(60,70,140,…)` stroke.  
**Code location:** Bed draw lines 5127–5172; wall gradient lines 4802–4807.  
**Fix scope:** Lift bed frame color (e.g., `#3a3660`) or add a visible warm-tinted bedspread that contrasts against the cool wall. No structural change needed.  
**Note:** The bed IS there in code. "Not visible" is a visual contrast issue, not a missing element.

---

## Item 10 — Interactive cabin objects (what's there vs what Julia wants)

**Current interactive objects in `cabinObjects`:**
1. `door` (x=120): Active — 3 choices (Try handle / Press ear / Wait). Sprint 23 retired hallway-side interaction but the cabin-side door is still interactive.
2. `porthole` (x=190): Active — 3 inspection lines including a PIP line.
3. `bed` (x=400): Active — state-gated (pre/post-reveal dialogue + bed-reveal cinematic trigger).
4. `mirror` (x=280): Active — state-gated (locked → mirror cinematic → post-reveal).

**From `rooms.cabin.collectibles = [cabinSmorbukk]`** (drawn by `drawCollectAuras`):
5. Smørbukk (x=332): Warm aura + ↓ collect. Gated: `requiresVerbLearned` (only after kitchen).

**From `getCabinCollectionObjects()`** (dynamic, for collected items):
6+. Collected items in collection-room display — cool-blue aura, inspect only.

**What Julia wants (Item 10):** Mirror, Smørbukk, bed only. Door and porthole should be removed.  
**Fix scope:** Remove `door` and `porthole` from `cabinObjects`. Close issue with Item 7 and Item 8. Bed and mirror remain. Smørbukk remains via collectibles system.

---

## Item 11 — Mirror face-melt cinematic "looks bad"

**Claimed state:** Shipped procedural (Sprint 11).  
**Actual state:** `drawMirrorCinematic` (line 6592) draws: dark base + ember ambient glow, a 140×190px mirror frame, clipped interior showing a human face composed of:
- A `fillStyle = '#d8b888'` ellipse for the head (28×34px)
- Two `ellipse` eyes with glints
- A nose (triangle path)
- Drip effects: each face element shifts downward by `humanShift = meltT * msH * 0.55` (up to ~100px by melt end)
- A wax-drip shape (line 6687+): a `fillRect` strip descending from the face
- Melting skin overlay using `quadraticCurveTo` on left face edge

The melt animation runs over 2s after a 1.5s hold.  
**Visual quality:** *Cannot confirm without screenshot.* The face is drawn from basic shapes (ellipses, rects, triangles), not pixel art. The melt is positional shifting, not deformation — face parts slide downward separately rather than truly melting. At 480×270 canvas scale, simple shapes at this size may look crude.  
**Fix scope:** This is a visual quality judgment. The system works; the art quality is the issue. Fix paths: (a) commissioned pixel-art cinematic replacing the procedural one, OR (b) improved procedural rendering with more melt deformation (canvas path distortion, pixel-level drip chains). Option (a) is the sprint-design intent.

---

## Item 12 — Bed/body-discovery cinematic "looks bad"

**Claimed state:** Shipped procedural (Sprint 11).  
**Actual state:** `drawBedRevealCinematic` (line 6775) draws a dark base, cool ambient glow, a 260×70px bed close-up with headboard (rect), bed frame (rect), body shape (a quadratic bezier curve implying a small form under covers), and hair (ellipse at the headboard end). The sheet-pull effect: `sheetT = min(1, elapsed/0.6)` — but looking at the code, there's no actual sheet animation visible after line 6782. The function draws the static body scene; the "sheet pull" timer is defined but not used to animate a sheet moving away (it was apparently not fully implemented).  
**Code location:** `drawBedRevealCinematic` at line 6775; timer defined but not actively used for animation visible in the code.  
**Fix scope:** Same as Item 11 — visual quality issue with procedural rendering. The bed scene is minimal. Commission pixel-art or improve procedural detail (pillow, proper sheet shapes, sheet-pull animation).

---

## Item 13 — Pip's tears don't read as anything

**Claimed state:** Shipped procedural (Sprint 11).  
**Actual state:** `drawTears` (line 4056) draws each tear as a 2×3px teardrop path (quadratic bezier, `#c0d8ff`) with alpha fading. The tear path is: bottom point → left curve up → right curve down → close. At 2px wide and 3px tall in a 480×270 canvas scaled up to screen, each tear is extremely small — likely 1–2 physical pixels on most screens.  
**Code location:** `drawTears` at line 4056; tears emitted during the panic-glide sequence.  
**Fix scope:** Scale up the tear particles (try 4×8px or 6×10px). Add a quick descending velocity so they arc more visibly. A "cartoon tears" effect — larger, rounder, with a small arc spray — requires ~5 lines of additional drawing code.

---

## Item 14 — Float ability: should activate after bed cinematic (design disagreement)

**Current implementation:** Float is unlocked in the dark corridor, not after the bed cinematic. The sequence: enter dark corridor → fix sconce (held-button puzzle, `sconceFixed = true`) → walk to x=415–425 (broken glass position) → `triggerFloatDiscovery()` fires → Pip involuntarily rises 30px and settles → `pip.float.unlocked = true`, `chapterState.floatUnlocked = true`, controls strip updated.  
**Code location:** Float discovery trigger at line 3161–3165; `triggerFloatDiscovery` at line 7670; `updateFloatDiscovery` at line 7678.  
**What Julia wants:** "should activate on space bar after the bed cinematic" — float earned when Pip discovers his body.  
**Gap:** The current design treats float as a dark-corridor mechanic (earned through the electricity puzzle). Julia wants it as a ghost-awakening power (earned when Pip understands he's dead). These are two different narrative moments. The bed cinematic does NOT call `pip.float.unlocked = true` anywhere.  
**Fix scope:** If the redesign is adopted: add `pip.float.unlocked = true` and `chapterState.floatUnlocked = true` to the bed-reveal cinematic's onEnd callback; remove or adapt the dark-corridor float-discovery trigger. This changes the chapter's ability-discovery sequence — a design-level decision, not just code.  
**Note:** The dark-corridor float discovery (broken glass) would need a different narrative beat if float is moved earlier.

---

## Item 15 — Treat collection flow (no wrapper flash, no horn sound)

**Claimed state:** Shipped procedural (Sprint 13 collect verb; Sprint 30 SFX).  
**Actual state:** `pickupCollectible` (line 3871) flow:
1. `c.collected = true` (immediate)
2. Push to `notebook.items`
3. Push to `cabinCollection.items`
4. Compute canvas start/end positions for tween
5. `playCollectSfx()` — synthesized two-note rising blip (~150ms). **Not a horn.**
6. Enqueue 0.6s pickup tween: sprite flies arc from floor to notebook icon
7. On tween complete: pulse notebook icon, `gainStrength`, `playEatSfx()` (warm rounded swell), `autoSave()`

**What Julia wants:** "flash the wrapper on screen briefly, then drop it into the notebook, with a celebratory horn sound — for ALL treats."  
**Gap:** The tween IS the wrapper flying to the notebook. But: (a) no initial screen flash — the wrapper just starts moving immediately from floor level; (b) the sound is a synthesized blip, not a horn; (c) there is no "hold" moment before the fly-off where the wrapper fills the screen.  
**Fix scope:** Add a 0.3s "flash frame" at the start of pickup: draw the treat sprite large (40–60px) centered on screen, then tween it to the notebook. Replace `playCollectSfx` with a horn-like synthesized fanfare (triangle wave + pitch slide). These are additive changes to `pickupCollectible`.

---

## Item 16 — Smørbukk collection bug

**Claimed state:** Shipped Sprint 36 (Smørbukk on nightstand x=332, gated).  
**Actual state (static analysis):** The `cabinSmorbukk` object (line 1654) at x=332 has:
- `requiresVerbLearned: true` — gated until `bamsemumsCollected`
- `collected: false` initially
- Standard `room.collectibles` membership (`rooms.cabin.collectibles = [cabinSmorbukk]`)

Save/restore: line 1530–1536 iterates `room.collectibles` and sets `c.collected = true` if 'smorbukk' is in `notebookItems`. This correctly restores collected state on reload.

`drawCollectAuras` draws the warm aura at x=332, cy=FLOOR_Y-20=160. `tryCollect` on ↓ press checks `!c.collected && |pip.x - 332| < 18`. Gate passes when `bamsemumsCollected = true`.

**From static analysis, the code path appears correct.** The code logic for gating, drawing, collecting, and restoring is sound. The "bug" reported by the play-tester cannot be confirmed as a code defect from static analysis.  
**Possible play-test explanation:** The play-tester may not have returned to the cabin after the kitchen, or the visual contrast of the warm aura against the dark cabin wall was missed. Alternatively, if the tester was on a save that predates Sprint 36 (which didn't have the Smørbukk in `cabin.collectibles`), it simply wasn't there.  
**Fix scope:** Needs browser verification. If a real bug exists, it would likely be in the visual contrast (bed/room colors making the aura hard to see) rather than the collect logic.

---

## Item 17 — Skillingsboller cannot be collected

**Claimed state:** Shipped Sprint 36 (on janitor's cart, risk-window mechanic).  
**Actual state:** `darkCorridorSkillingsboller` (line 2172) has:
```js
get x() { return darkCorridor.cartX; }   // follows cart
get collected() { return this._collected || darkCorridor.cartRemoved; }
```
No `requiresVerbLearned` gate (can be collected before kitchen tutorial).

**Why it's effectively uncollectable:** The collection window is: after `cartFound` (Pip inspects cart) but before `cartRemoved` (janitor walks cart away). The natural play sequence is:
1. Pip finds cart (x=840) in dark corridor → `cartFound = true`
2. Pip backtracks to grandparents' radio to page janitor → `janitorPaged = true`
3. Pip returns to dark corridor; janitor walks and removes cart → `cartRemoved = true`
4. `darkCorridorSkillingsboller.collected` getter now returns `true` via `cartRemoved`
5. `drawCollectAuras` sees `c.collected = true` → stops drawing aura, treat gone

The ↓ verb is not taught until the kitchen (Beat 11b), which comes AFTER the dark corridor. A player following the story sequence will have `cartRemoved = true` before they know about ↓.

**Draw order note:** `drawCollectAuras` is called AFTER `drawDarkOverlay` in the main render loop (line 4000 after room draw at 3997). This means the warm aura IS drawn on top of the dark overlay — visible even in dark mode. The player CAN see the aura near the cart. But without knowing to press ↓, they won't collect it.

**Fix scope:** Two options — (a) Move the Skillingsboller to a post-kitchen location (the cart inspect text already plants the idea), or (b) present the collect-verb hint for the Skillingsboller explicitly (tutorial line on approach, pre-Bamsemums). Option (a) is simpler and more honest to the game flow.

---

## Item 18 — Echo-creature avoidance mechanic

**Claimed state:** Echo-mice built Sprint 20; interaction = strength drain.  
**Actual state:** `updateEchoMouse` (line ~7785): echo mouse has proximity collision — if `|pip.x - echoMouse.x| < 10`, drains 1 strength point with 1.5s cooldown (`loseStrength(1)`). The mouse walks/pauses within a 70px range centered at x=600 in the dark corridor. `drawEchoMouse` (line 8347) draws a small amber translucent mouse (~12px wide).

There is **no float-to-avoid mechanic.** Julia describes "echo creatures in the dark hallway that Pip floats past to avoid" — this implies float ability is required to pass them. Currently, Pip just walks through/past the mouse taking 1 HP damage per contact. Float is not required and does not affect echo-mouse collision.  
**Code location:** `updateEchoMouse` at line ~7785; collision at line 7815.  
**Fix scope:** If the design intent is float-to-avoid: add a height check to the collision — if `pip.float.altitude > threshold`, no damage. This is a 2-line change but requires float to be unlocked before the dark corridor (ties to Item 14's design question).

---

## Item 19 — Dark corridor should have portholes and candles

**Claimed state:** Shipped procedural (Sprint 20, Decision D for minimum visibility).  
**Actual state:** `drawDarkCorridor` (line 7946) has two lighting states:
- **Dark (pre-sconce-fix):** `drawDarkOverlay` (line 7970) lays a full-screen `rgba(4,6,12,0.96)` black fill with a 38px-radius soft hole at Pip's position. Outside that radius: essentially black. One weak flicker sconce at x=240 provides a faint amber hint.
- **Lit (post-sconce-fix):** Wall gradient lifts to `#1a1820` / `#141828`, five sconces light up.

**No portholes.** No candles. Neither exists in `drawDarkCorridor` or `drawDarkCorridorProps`.  
**Current lit state:** After the puzzle, the corridor is navigable with sconce pools. Before the puzzle, it is very dark (96% black overlay). The "gently dark, always navigable" (Decision D) interpretation is correct only post-puzzle; pre-puzzle the 38px aura radius makes navigation genuinely difficult.  
**Fix scope:** Add 2–3 portholes showing a dim ocean-night scene (reuse `drawPortholeScene`). Add small candle props in niches (procedural — a few `fillRect` shapes with a warm radial glow). These props would appear in both states. The dark overlay clips everything outside Pip's aura in dark mode, so portholes and candles would only be visible when Pip is near them — which is fine and reads as atmospheric.

---

## Item 20 — The chapter appears to end in the dark hallway (HIGHEST PRIORITY)

**Claimed state:** Kitchen (Sprint 26), observation deck (Sprint 27), dock farewell + Nøkken glimpse + Henrik's offer (Sprint 29) all reported shipped.  
**Actual state: All functions exist and are connected. The chapter does NOT dead-end due to missing code. The path is gated behind a multi-step puzzle sequence that players are not guided through.**

### The complete path from dark corridor to chapter end (code trace):

**Step 1 — Dark corridor to kitchen:**
Gate: `chapterState.janitorWalked` must be true.
`darkCorridorObjects` `dc-stairwell` at x=880 (line 2259): node returns `null` when `!janitorWalked` (line 2213) — **no sparkle, no aura, no interaction hint.** When `janitorWalked`, presents "The stairwell descends into the kitchen below" + "Go down" choice → `startTransition('kitchen', 'fromLeft')` (line 2277).

Additional gate: `drawStairwellDown` at x=880 only draws when `!darkMode || darkCorridor.lit` (line 8091). In pre-sconce-fix dark mode, **the stairwell is visually invisible** — no object to see or interact with.

Full gating sequence required to reach "Go down":
1. Fix sconce (held ↑ for 1.5s at x=420): `sconceFixed = true` → lights on, stairwell becomes visible
2. Walk to x=840: find and inspect cart → `cartFound = true`
3. Backtrack to grandparents' cabin: Dziadek's radio → "Page someone over the intercom" → `janitorPaged = true`
4. Return to dark corridor: janitor scripted walk fires (line 3182–3188, 500ms delay) → janitor pushes cart off-screen → `janitorWalked = true`, `cartRemoved = true`
5. Now `dc-stairwell.node` returns the "Go down" choice → transition to kitchen

**Step 2 — Kitchen sequence:**
On room entry, if Pip walks within 40px of plate at x=290, `showCinematic('kitchen-meeting', startKitchenSequence)` fires (line 3174–3177). This chains: Cinematic 4 (kitchen meeting) → `startKitchenSequence()` → Cinematic 5 (Henrik sits) → Cinematic 6 (first taste 6a+6b) → `chapterState.firstTasteSeen = true` → `addKitchenRecipe()`.

Then: `kitchenCollectibles` Bamsemums becomes visible (line 8985: `chapterState.firstTasteSeen && !chapterState.bamsemumsCollected`). Player collects → `bamsemumsCollected = true` → Henrik inspectable unlocks (line 2302: gated on `bamsemumsCollected`). Pressing ↑ near Henrik fires Nøkken story (15+ dialogue lines) → `chapterState.nokkenStoryHeard = true`.

**Step 3 — Kitchen to observation deck:**
Line 3138–3141: `currentRoom === 'kitchen' && pip.x >= rooms.kitchen.pipMaxX - 1 && chapterState.nokkenStoryHeard` → `startTransition('observationDeck', 'fromLeft')`.  
Gate: **`nokkenStoryHeard` must be true.** Walking off the kitchen's right edge without this flag does nothing (the `else if` falls through).

**Step 4 — Observation deck to dock farewell:**
Line 3142–3148: `currentRoom === 'observationDeck' && pip.x >= rooms.observationDeck.pipMaxX - 1 && !chapterState.grandparentsLeft && !cinematic.active` → `showCinematic('dock-farewell', ...)`. This fires Cinematic 7, then `startNokkenGlimpse()`.

**Step 5 — Henrik's offer:**
Post-Nøkken glimpse: `chapterState.nokkenGlimpsed = true` → Henrik appears on deck at x=490 (line 2376+). Pip approaches and presses ↑ → fires Cinematic 8 (henriks-offer) → `chapter1Complete = true` → `showChapter1End()`.

### Where players dead-end in practice:

**Primary dead-end: the stairwell.** Before `sconceFixed`, `drawStairwellDown` is not drawn (invisible) and `dc-stairwell.node` returns null (no interaction, no sparkle). The corridor's right end looks like a blank wall in dark mode. Pip can walk to x=940 (pipMaxX) but there is nothing to interact with and nothing to see.

**Secondary dead-end: Skillingsboller interrupts cart inspection flow.** The `dc-cart` inspectable at x=840 shows the "J. Henriksen, Maintenance" line and sets `cartFound`. After this, many players would page the janitor immediately and lose the Skillingsboller window. This is a UX sequencing issue, not a code bug.

**Tertiary dead-end: kitchen right edge gated on `nokkenStoryHeard`.** Players who reach the kitchen and complete all cinematics but don't trigger Henrik's Nøkken story inspectable cannot advance. There is no visible prompt that the right wall is passable, and the gate `nokkenStoryHeard` is invisible to the player.

**Summary:** The functions all exist. The dead-end is caused by: (a) the stairwell being invisible and non-interactive until after a multi-step puzzle the player may not understand, (b) the dark overlay making pre-sconce navigation very difficult, and (c) invisible gates on transitions that give the player no feedback.

---

## Item 21 — Bulletin board fires before the "they didn't see me" beat

**Claimed state:** Bulletin board inspectable at x=130 (Sprint 37 corrected from x=180).  
**Actual state:** The passenger walk-through is triggered by a timer (`passenger.firstEntryTimer`) that counts down after `openingSeq.state === 'complete'` (line 5953). The timer fires after ~3s, spawning the passenger at `getCameraX() + W + 20` — off the right edge. The passenger then walks left.

The bulletin board is at x=130. The passenger trigger spawns the passenger somewhere off-right. The passenger has to walk from the right side of the visible screen past world-x ~130 to exit left. **There is no explicit ordering gate.** If Pip walks quickly to x=130 and inspects the bulletin board, the dialogue WILL fire before the passenger walk-through if the passenger hasn't been triggered yet or is still walking.

**More precisely:** The `passenger.hallwayEntered` flag is set when Pip first enters the hallway (line 1519 in save-load; also set on game start via `hallwayEntered: true` in the passenger object). The countdown to passenger spawn is separate from Pip's x-position. The bulletin board is at x=130 — Pip could be standing there before or while the passenger is walking.

**Code location:** Passenger timer at line 5953; bulletin board inspectable at line 1847. The two systems are independent.  
**Fix scope:** Add a gate to the bulletin board inspectable: `get node() { if (!chapterState.passengerSeen) return null; return { id: 'hallway-bulletin-inspect', ... }; }` — show the board only after the passenger walk-through. This ensures the "they didn't see me" moment always lands before the exposition. One-line change.

---

## Character gallery summary table

| Character | Gallery designed? | Game draw | Gallery vs game gap | Bucket |
|---|---|---|---|---|
| **Pip** | Yes — gallery `drawPip` with proper ghost shape, eyes, blush, mouth, no apron | Game `drawPipBody` has the shape but draws a faint apron band (`globalAlpha=0.28`). Gallery version is more refined pixel layout. | Apron present in game (should not be per spec). Shape reads correctly; detail is simplified. | **Designed-in-gallery — port needed** |
| **Babcia** | Yes — gallery `drawBabcia` with kerchief, coat detail, human eyes, crying overlay | Game `drawBabcia` is a monochrome `#2a2030` blob with a faint apron band and sob-bob. No kerchief, no eyes. | **Large gap.** Gallery design not ported to game. | **Designed-in-gallery — port needed** |
| **Henrik** | Yes — gallery `drawHenrik` with toque, apron, near-black outfit, beard, pipe | Game `drawHenrikStanding` captures basic structure (toque, apron body, dark outfit, head, eyes, mouth) but lacks pipe and beard. Height proportions similar. | Moderate gap. Missing pipe and beard. Silhouette reads correctly. | **Designed-in-gallery — refinement needed** |
| **Erik** | Yes — gallery `drawErik` fixed Sprint 34 (blond `#d8b860`, blue eyes `#2a4878`) | Sprint 34 also fixed the in-game `drawMemory6bScene`. Both should be consistent now. | Small gap or none — verify in browser. | **Designed-in-gallery — verify in browser** |
| **Dziadek** | **No.** Gallery data `designed: true` is a technicality; gallery shows placeholder box. | Game `drawDziadek` is a dark rectangle-stack silhouette in `#2a2030`. No features. | No approved design exists. | **Not-designed — design in gallery first** |
| **Janitor** | **No.** Same situation as Dziadek — placeholder in gallery. | Game `drawJanitor` has reasonable silhouette (work cap, jumpsuit, torso stripe, boots). Better than Dziadek but no approved design. | No approved design exists. | **Not-designed — design in gallery first** |
| **Passenger** | **No.** Placeholder in gallery. | Game `drawPassengerBody` has a decent top-hat figure (hat crown, brim, coat, legs, shoes). Better than blob characters but no approved design. | No approved design exists. | **Not-designed — design in gallery first** |
| **Doctor** | **No.** Placeholder in gallery. | Game `drawDoctor` has dark suit, white collar, bag, walking animation. Serviceable. | No approved design exists. | **Not-designed — design in gallery first** |

---

## True remaining Ch1 work (grouped)

This list supersedes the optimistic Sprint 33 picture. Items are sized by type.

### A. Character visual quality (highest visible impact)

1. **Port Babcia gallery design to game** — the gallery has the approved design; this is porting, not designing. Large visual lift.
2. **Port Pip gallery design to game, remove apron** — the gallery Pip is more refined; remove apron from `drawPipBody` per spec.
3. **Port Henrik gallery design additions** — add pipe and beard to `drawHenrikStanding` / `drawHenrikSitting`.
4. **Verify Erik consistency** (gallery vs game `drawMemory6bScene`) — in browser.
5. **Design Dziadek in gallery, then port** — no approved design exists.
6. **Design Janitor in gallery, then port** — no approved design exists.
7. **Design Passenger in gallery, then port** — no approved design exists.
8. **Design Doctor in gallery, then port** — no approved design exists.

### B. Cabin 646 redesign

9. **Remove cabin door inspectable** (`door` from `cabinObjects`) — Julia wants bedroom, not corridor.
10. **Remove cabin porthole + inspectable** (`porthole` from `cabinObjects`, `drawPortholeScene` call) — replaced by window.
11. **Lift bed color contrast** against wall — simple color change.
12. **Add a large rectangular window** to the cabin (visual + inspectable with fjord-beauty line) — depends on Item C below.

### C. Window scenery system (new feature)

13. **`WINDOW_SCENES` registry + `drawWindowScene`** for rectangular windows — parallel to `PORTHOLE_SCENES`. Per-chapter backgrounds (fjord, ocean, port lights). Camera-speed parallax for boat-moving effect. Touches `drawCabin`, `drawGrandparents`.

### D. Grandparents' cabin

14. **Add teddy bear to suitcase visual** — small prop draw (~8px bear nubs), no new system.
15. **Window scenery** — depends on Item C.
16. **Character visual quality** — covered by Items A.1 (Babcia) and A.5 (Dziadek).

### E. Structural / reachability

17. **Dark corridor guidance** — the stairwell is invisible and non-interactive until after a multi-step puzzle the player can't see. Needs at minimum: (a) a visual hint at the corridor's right end (faint door outline), (b) a first-inspection line on the sconce that makes the held-button mechanic clear, and possibly (c) a HUD hint after the darkness is established. This is a UX issue, not a missing function.
18. **Kitchen right-edge gate visibility** — `nokkenStoryHeard` gates the kitchen→deck transition. The player has no visual cue that the right wall is passable. Add a faint warm-amber glow at the right edge of the kitchen (consistent with the permeable-surface convention) when `nokkenStoryHeard` is true.

### F. Mechanics

19. **Float timing redesign** (if Julia locks the bed-cinematic-grants-float design) — move float unlock from dark corridor to bed-reveal onEnd; adapt dark corridor float-discovery beat.
20. **Skillingsboller collect window** — make collectable post-kitchen OR add a pre-tutorial collect hint. As currently designed, effectively uncollectable.
21. **Treat collection UX** — screen flash + hold moment + horn sound for all treats. Additive to `pickupCollectible`.
22. **Tears scale up** — 2×3px is too small; increase to ~6×10px for readability.

### G. Dark corridor environment

23. **Add portholes to dark corridor** — 2–3 portholes, dim `ch1-ocean-night` scene. Visible when Pip is within aura range.
24. **Add candle props** — small warm glow in wall niches, procedural.

### H. Narrative ordering

25. **Gate bulletin board on `passengerSeen`** — one-line fix to prevent board firing before the walk-through beat.

### I. Cinematics (visual quality)

26. **Mirror melt cinematic** — procedural shapes read as crude at game scale. Commission pixel-art OR improve procedural (path deformation, better skin tone, more drip detail).
27. **Bed-reveal cinematic** — similar issue. Sheet-pull animation also appears incomplete (timer defined but not fully animated).

---

## Status corrections for art-checklist.md

| Asset | Claimed (pre-audit) | Corrected status |
|---|---|---|
| Passenger sprite | **Shipped procedural** | **Shipped procedural — blob, no gallery design; not-designed bucket; design needed first** |
| Dziadek sprite | **Shipped procedural** | **Shipped procedural — blob, no gallery design; not-designed bucket; design needed first** |
| Babcia sprite | **Shipped procedural** | **Shipped procedural — game version diverges significantly from approved gallery design; port needed** |
| Suitcase (gp room) | **Shipped procedural** | **Shipped procedural — no teddy bear drawn; lid + shirt present but faint** |
| Pip sprite | **Shipped procedural** | **Shipped procedural — apron present in game sprite, should not be (spec: no apron for present-day Pip)** |

*Note: The above corrections do not change "Shipped procedural" to "Not built" — the draw functions exist. They add honest qualifications about visual fidelity.*

---

*Audit completed Sprint 38, 2026-06-03. Method: static code reading of `game/index.html` at commit `5607d04` plus `character-gallery.html`. All visual quality judgments that cannot be made from code are flagged. Item 20 (chapter dead-end) traced to code; all transition functions exist; dead-end is caused by invisible gates and dark-mode navigation difficulty, not missing functions.*
