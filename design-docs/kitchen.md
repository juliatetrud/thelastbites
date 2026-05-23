---

# The Kitchen

The chapter's heart. Where Pip is *seen* for the first time. Where the central mechanic of the game — taste-memory — is established. Where Henrik gives Pip a name for what he is and what he is for. The kitchen is also the most unfinished room in the chapter: most beats live in code as stubs or not at all.

## Status

**Largely unfinished.** Beats 9–13 are partially implemented in `game/index.html` but the room itself is not yet realized as a playable space. The cinematics 4–6b exist in beat-spec form (`04-chapter-01-cabin-646.md`) but are not playable. The Bamsemums tutorial (Beat 11b) is implemented per Sprint 13. The Nøkken story is not yet written.

The Henrik kitchen build sprint (forthcoming, Sprint 22 or similar) is where most of this room gets implemented. This doc captures the room's design as a target for that sprint.

## Purpose

The kitchen plays many roles in sequence — more than any other Ch1 room. From the beat outline:

1. **Beat 9 — The arrival.** Pip drifts down the stairwell into the vast, dim kitchen. He sees a plate of food. The taste pulls him. (Cinematic 4)
2. **Beat 10 — The meeting.** Henrik returns from the walk-in freezer. He sees Pip. He screams. He freezes. He sits down. He speaks. (Cinematic 5)
3. **Beat 11 — The doubled first taste.** Pip tastes gravlaks (Cinematic 6a, Henrik-with-grandfather memory), then lefse (Cinematic 6b, Henrik-teaching-young-Erik memory). The taste-memory mechanic is established. The recipe enters the notebook.
4. **Beat 11b — The Bamsemums.** Henrik leaves a bag of Bamsemums on the counter. Pip discovers the collect verb. The notebook gains its first Items entry. (Already implemented per Sprint 13.)
5. **Beat 11c (transition) — Pip drifts toward the observation deck.** Implementation deferred.
6. **Beat 12 — The dock farewell.** (Cinematic 7) Henrik leads Pip to the deck. The grandparents walk away with the body. (Not a kitchen beat per se, but Henrik departs *from* the kitchen with Pip.)
7. **Beat 13 — Henrik's offer.** (Cinematic 8) Henrik offers Pip the empty notebook and names the next port: Tallinn.

The Nøkken story is folded into Beat 11 or Beat 11b — Henrik tells it after Cinematic 6b. (See Open Questions.)

The kitchen is **the only Ch1 room where Pip is seen.** The hallway taught invisibility; the grandparents' cabin reinforced it; the dark corridor locked it in. The kitchen breaks the rule. Henrik says *Yes. I see you.* This is the chapter's emotional pivot from grief into mission.

## Spatial layout

Side-scrolling room, wider than the cabin or grandparents' cabin. Suggested width: ~960–1200 px in world coordinates — wide enough that Pip can traverse during Beats 11–12 but not so wide that the room loses focus.

The kitchen is divided into three rough zones, left-to-right:

- **Left zone (Pip's arrival)** — bottom of the descending stairwell from the dark corridor. Pip enters from the upper-left and drifts down into the kitchen proper. World-x `~0`–`~250`.
- **Center zone (the counter)** — a long stainless-steel prep counter runs along most of the room's width at chest-height. This is where the plate of lefse-and-gravlaks sits in Beat 9. World-x `~250`–`~700`.
- **Right zone (the walk-in freezer)** — Henrik emerges from a doorway on the right (the walk-in freezer or pantry, off-screen). World-x `~700`–`~960+`. Henrik first appears here at Beat 9's end.

Pip enters from the left (top of stairwell). Pip exits to the right or upward (toward the observation deck — implementation TBD).

Camera scrolls. Most beats happen near the center counter — the camera lingers there for the Henrik-sits-down, taste-memory, and Bamsemums sequences.

## Parallax layers

The kitchen uses the same half-speed wall-panel system as other Ch1 rooms, but with different palette tokens — **industrial, not domestic.**

- **Back wall:** stainless-steel paneling, slightly desaturated. Cool register but with subtle warm reflections from the overhead pendant.
- **Mid-ground:** the long counter runs across most of the back-wall plane. Slight parallax (`0.7`).
- **Foreground:** Pip and Henrik occupy the foreground at standard scale. Floor planks (here: tiled or scrubbed-wood floor — see Open Questions for surface choice).

No portholes in the kitchen — it's an interior service space below the passenger deck waterline. (See Open Questions about whether to add a small high window or vent.)

## Lighting

The kitchen is the chapter's **most dramatically-lit room.** Per Aesthetic Rule 4 (single warm light per scene), the kitchen has:

- **A single overhead pendant light** — warm amber, hanging at the center of the room. Cast a strong warm pool down on the prep counter directly beneath it.
- **Wall gradient:** cool-dark base (industrial paneling, slightly desaturated). Most of the room is in shadow.
- **The pendant's warm pool** falls on the counter and on Pip when he hovers above it. This is the cinematic-defining light — the hovering bite of food is lit from above, dramatic, almost theatrical.
- **Henrik's first appearance:** he emerges from the right-side doorway. The doorway is dim — Henrik is silhouetted against a slightly cooler back-light from the walk-in freezer. The transition from "Henrik in silhouette" to "Henrik seated at the stool, warmly lit" is part of the room's emotional arc.
- **The taste-memory cinematics (6a, 6b):** override the room's lighting entirely for the memory sequences. Memory lighting is *brighter* than the present — warm summer light, sun through a window — per `03-art-and-aesthetic.md` cinematic spec.

Color register: cool-base industrial, with the warm pool over the counter being the only sustained warm light. This contrasts maximally with the cabin's intimate-dim and the grandparents' cabin's domestic-warm.

## Props and inspectables

### The plate of lefse and gravlaks (cinematic trigger, then inspectable)

- **Position:** on the prep counter, world-x `~450` (center of room, directly beneath the pendant).
- **Visual pre-Beat-9:** a small composed plate — flat lefse rounds, gravlaks slices on top, a few small Norwegian pickles on the side.
- **Behavior pre-Beat-9:** when Pip approaches within standard aura range, the plate has a warm collect-aura. Pip cannot actually collect it — interacting triggers Cinematic 4 (the kitchen meeting). The food becomes hovering and bitten during the cinematic.
- **Post-Beat-11:** the plate is gone (or empty, set aside). Replaced by the Bamsemums bag (Beat 11b).
- **Aura:** breadcrumb-elevated. This is the chapter's first non-grief-coded breadcrumb — a *good* draw.

### The Bamsemums bag (Beat 11b — Sprint 13, implemented)

- **Position:** on the counter, world-x `~520`, slightly to the right of where the plate was. Half-hidden behind a wooden cutting board.
- **Visual:** small bag of foam-and-chocolate bears in primary colors (red, yellow, green, white), translucent twist-tied bag, ~`12×16 px`.
- **Aura:** warm humming glow — the **collect aura**, distinct from the cool-sparkle inspect aura. Broader, slower pulse.
- **Interaction:** `↓` to collect. The Bamsemums tweens into the notebook icon in the HUD corner. Stomach refills by ~10 points. Notebook gains its first Items entry: *"Bamsemums — from Henrik, in the kitchen."*
- **Status:** **implemented** per Sprint 13. This is the room's already-shipped element.

### The stool (where Henrik sits)

- **Position:** world-x `~400`, in front of the counter (slightly to the player's left of center).
- **Visual:** a tall wooden or metal stool. Industrial register — period-appropriate kitchen seating, not a fancy bar stool. Suggested ~`14×28 px`.
- **Behavior:** unoccupied pre-Beat-10. After Henrik's scream and freeze (Cinematic 5), he crosses to the stool and sits. He remains seated for the rest of his on-screen time in the kitchen.
- **Inspectability:** not interactive. Pure cinematic prop.

### The walk-in freezer doorway (entry/exit)

- **Position:** right side of the room, world-x `~880`.
- **Visual:** a heavy metal door — period-appropriate cold-storage door with a thick handle and visible insulation. Slightly ajar, with cool back-light spilling out.
- **Behavior:** Henrik enters and exits through this door. He's behind it when Pip first arrives at Beat 9 (he's gone to the walk-in to fetch something). He emerges in Cinematic 4 (the silent scream moment).
- **Inspectability:** not interactive for Pip. The cool-back-light is a small atmospheric detail.

### The descending stairwell (entry from dark corridor)

- **Position:** upper-left, world-x `~80`, top of the visible room.
- **Visual:** a narrow service stairway descending from the dark corridor above. Pip arrives here at the start of Beat 9.
- **Visible footprint:** the bottom 2–3 steps + a railing/banister. The rest is implied off-screen up.

### Hanging copper pots (ambient)

- **Position:** along the back wall, hung from a horizontal rack above the prep counter, world-x `~250`–`~700`.
- **Visual:** four to six copper pots and pans of varying sizes, hanging by their handles. Brass/copper color. Catch warm light from the pendant.
- **Inspectability:** ambient — not interactive. They're part of the room's industrial register.

### The pendant light fixture (visible)

- **Position:** ceiling, world-x `~450`, directly above the counter.
- **Visual:** simple industrial pendant — a metal cone-shaped shade with a warm bulb visible inside. Painterly pixel art.
- **Behavior:** the room's primary warm light source. Visible slight pulse per Aesthetic Rule 8 (flame/flicker subtlety on all warm lights).

### The dropped pan (Beat 9–10 cinematic prop)

- **Position:** on the floor where Henrik dropped it, world-x `~750`, near the freezer doorway.
- **Visual:** a small metal pan on its side on the floor. Visible only after Beat 9 (Henrik drops it during his silent scream).
- **Inspectability:** not interactive. It stays on the floor for the rest of the kitchen scene as a small detail of the moment Henrik froze.

### The empty journal / notebook (Beat 13)

- **Position:** held by Henrik in Cinematic 8. Not a fixed-position prop in the kitchen room.
- **Visual:** small leather-bound notebook with blank pages. Per `03-art-and-aesthetic.md` Cinematic 8 description.
- **Behavior:** Henrik offers it to Pip on the deck at sunset (Cinematic 8). Pip accepts. This is the moment the notebook becomes Pip's tool. (Cinematic 8 happens after the kitchen room — staged on the observation deck or deck rail. Not strictly a kitchen prop, but listed here because Henrik produces it from the kitchen.)

## NPCs present

### Henrik (the kitchen's primary character)

- **First appearance:** Beat 9, emerging from the walk-in freezer doorway at world-x `~880`. He drops the pan and freezes mid-scream.
- **Position during Beat 10–11:** seated on the stool at world-x `~400`.
- **Visual:** per Sprint 09 polish — tall chef's toque (~14 px), cream-white apron over near-black button-up and slacks, gray beard, sleek-fit posture (no stoop), pipe in right hand with drifting smoke animation. Body 72 px (~0.65 H); total figure with toque ~86 px (~0.78 H).
- **Color signature:** high-contrast — bright cream apron against near-black body, against the cool-dark industrial kitchen. Henrik reads as the warmest, most-visible figure in the room.
- **Animation:** generally still during dialogue (the stillness is the read). The pipe smoke drifts continuously. During cinematics he has specific scripted animations (silent scream open-mouth, slow cross-himself, sit-down-heavy).
- **Language:** speaks in Norwegian for emotional moments per the multilingual rule. Examples:
  - *"…Så. Du er gutten fra hytte 646."* (English translation provided in dialogue per the established pattern.)
  - Henrik's mutters during the silent scream (whispered Norwegian).
  - The Nøkken story is in English (it's a story he's telling Pip, not a private moment).
- **Behavior post-Beat-11:** Henrik leaves the kitchen via the freezer doorway briefly to fetch the notebook (or pulls it from a counter drawer). Returns. Tells the Nøkken story. Names Tallinn. Leads Pip to the deck for Cinematic 7 (dock farewell) and 8 (notebook offer).
- **Inspectability when seated:** approachable. Pip can stand near him. The dialogue tree advances via `↑` interactions. (See Open Questions on whether kitchen dialogue is one continuous cinematic or a series of room-mode inspections.)

### Pip

- **Position during Beat 9:** Pip enters at world-x `~80` from the top of the stairwell and drifts down/right toward the counter. The "drift" is scripted — Pip approaches the food because the food pulls him.
- **Position during Beat 11:** Pip hovers above the counter, eating. Floating ~1.5 character-heights above the counter surface.
- **Behavior during cinematics:** Pip is mostly cinematically controlled, not player-controlled, during Beats 9–11. After Beat 11b (Bamsemums collected), Pip returns to player control to drift toward the observation deck.

## Ambient life

The kitchen is a *working space* — even at deep night, it should feel alive.

- **The pendant light's slow pulse** — barely-perceptible flicker per Aesthetic Rule 8.
- **Henrik's pipe smoke** — continuous, slow drifting wisps.
- **Steam from a kettle or pot** — optional ambient detail. A small wisp of steam from a covered pot on a back burner. Audio-only could work too.
- **Echo-mice (the Ch1 pest)** — per the one-pest-per-chapter rule, Ch1 = echo-mice. The dark corridor is the primary mouse habitat, but a single echo-mouse could appear in the kitchen (scurrying along the baseboard, near the freezer doorway). Sparse — one mouse, deliberate. The kitchen is mostly clean, but mice are mice.
- **Cool back-light from the walk-in freezer** — visible through the slightly-ajar freezer door, a small spill of cool light against the warm kitchen interior.

The kitchen is the room with the most ambient potential — it's a real working kitchen. But it should never feel busy. The single pendant, the hanging pots, the smoke, the optional mouse — these are enough.

## Treat placement

**One treat lives here, locked.** The **Bamsemums** is the Ch1 tutorial treat — the verb-teaching treat — and it lives on the counter (world-x `~520`, behind the cutting board). See Props above for full spec.

The Bamsemums is unique among Ch1 treats: it's the only one **placed by an NPC for Pip** (Henrik leaves it there for him, knowing Pip would collect it like he collected meals "as other boys collect stamps"). Other treats in Ch1 are found-in-the-environment.

**No second kitchen treat.** The kitchen's collectible quota is the Bamsemums plus the recipe-unlock (lefse-and-gravlaks, which enters the notebook automatically via Cinematic 6a/6b, not as a `↓` collect).

## Porthole scene

**No porthole.** The kitchen is interior service space below the passenger deck waterline. No window out.

(See Open Questions on whether a small high window or vent showing a glimpse of sky/aurora is desirable.)

## What this room communicates

The kitchen is the chapter's **emotional pivot.** Three rooms (cabin, hallway, grandparents' cabin) taught Pip that he is dead and that the living cannot see him. The dark corridor locked in that rule. The kitchen breaks it.

The room teaches the player, in sequence:

1. **Food pulls him.** Pip is drawn to the plate. He doesn't choose to be drawn — it pulls. This is the first hint at what Pip is *for* (a taster of meals).
2. **Someone can see him.** Henrik's silent scream is the rule breaking. The horror lasts one beat. Then it pivots to tenderness — Henrik sits, speaks, names him, feeds him.
3. **Food carries memory.** The doubled first-taste cinematic establishes the game's central mechanic. Pip eats; Pip sees the cook's memory. This is what Pip's senses *do* now.
4. **The world has a mission for him.** Henrik gives him the empty notebook and names Tallinn. The chapter (and the game) shifts from "what happened to Pip" to "what Pip will do next."

The kitchen is also the room that establishes **Henrik as the chapter's mentor figure** and plants the **Nøkken seed** for Ch4's reveal. The seed is small in Ch1 — a folk tale told by an old man — but the player should feel that Henrik tells it like someone who believes it.

The room communicates **scale** in a way no other Ch1 room does. The kitchen is *vast.* The single pendant in the center of a much-larger dim space communicates the ship's depth. After the close cabin, the narrow hallway, the small grandparents' room, the corridor — the kitchen *opens up.* This expansion is the room's first visual register, and it mirrors the chapter's emotional opening.

## Visual research references

From `design-docs/visual-research-tracker.md` (Ch1 section):

- **Kitchen — industrial cruise ship galley:** Period industrial cruise-ship kitchen. Stainless steel counters, full wall of hanging copper pots, two deep stone-and-iron ovens, a long prep counter, a single overhead warm pendant creating the only pool of warmth. Heavy shadow at edges. Edwardian-era industrial period (1900s–1910s).
- **Henrik — older Norwegian chef, kind/weary:** Older man, gray beard, weathered hands. White chef's coat or near-black button-up beneath cream-white apron stained with flour. Tall chef's toque. Pipe sometimes visible. Per Sprint 09 polish, sleek-fit posture, not stooped.
- **Henrik's grandfather (Cinematic 6a — memory):** An old Norwegian man in a cottage kitchen, late afternoon sun through a window. Cures salmon by hand. Brown-grey-bearded, work-shirt sleeves rolled, careful hands. Period: ~1930s-1950s rural Norway.
- **Young Henrik (Cinematic 6a — boy, ~8 years old):** A boy of ~8 in the cottage kitchen, watching his grandfather work. Wearing a knit sweater, looking up at his grandfather's hands.
- **Erik (Cinematic 6b — child, ~5–7 years old, FACE PARTIALLY HIDDEN):** A small Norwegian boy of ~5–7, in Henrik's home kitchen (not the grandfather's cottage — a different setting). Face must be partially obscured per `03-art-and-aesthetic.md` critical art note — turned away, in profile, or in half-shadow. The player should feel they have seen this child before, when they reach Chapter 4.
- **Bamsemums — Norwegian foam-and-chocolate bears:** Locked sprite per Sprint 13. Small translucent twist-tied bag, primary-colored bears (red, yellow, green, white), ~`12×16 px`.
- **Lefse and gravlaks plate:** A small composed plate of lefse rounds with gravlaks slices on top and small Norwegian pickles on the side. Period-appropriate plating.
- **Nøkken (Henrik's story — Cinematic-style imagery if visualized):** The Norse water-spirit. Plays the violin to lure people to drown. Appears in dark water, sometimes as a beautiful figure, sometimes as a misshapen horse-creature. **Open question** below on whether Henrik's story is illustrated (as a small cinematic insert) or purely told via dialogue text.

## Open questions

This is the room with the most unresolved decisions. Many will resolve in `puzzles.md` or `dialogue.md`. A few are flagged here for visibility.

1. ~~**6a and 6b cinematic chaining — separate scenes or one continuous sequence?**~~ **RESOLVED Sprint 26 Stage 0 (2026-05-23):** Single cinematic only — no 6a/6b split. Ch1 has one first-taste cinematic (Cinematic 6), Erik memory only. The grandfather/gravlaks memory is reserved for Ch4. `04-chapter-01-cabin-646.md` Beat 11 patched accordingly.

2. ~~**The Nøkken story — text only or with visual?**~~ **RESOLVED Sprint 26 Stage 0 (2026-05-23):** Text-only. Henrik tells the story as dialogue text over a still kitchen; lighting dims slightly during the telling. The Nøkken does not appear visually in Ch1. Story text locked in `dialogue.md` Beat 11c (thirteen lines, closing with *"I think I saw it once"*).

3. **Lefse-vs-gravlaks split for the Ch8 climax.** ⚠️ **FLAGGED — pending Julia's call (Sprint 26 Stage 0).** With single-Cinematic-6, the Erik memory is the lefse-and-gravlaks meal as a whole — not gravlaks-specific or lefse-specific. Ch4 reveals the grandfather memory, but as the *grandfather doing gravlaks specifically* (sustaining the old provisional "gravlaks deepest"), or as *the grandfather teaching the whole meal*? The answer determines what Ch8 reaches last. Story bible provisional remains "gravlaks deepest, lefse reserved for Ch4 reveal." Surface in Sprint 26 Stage 0 report-back; lock before Stage 2.

4. ~~**Kitchen dialogue structure — cinematic vs. room-mode-with-inspections.**~~ **RESOLVED Sprint 26 Stage 0 (2026-05-23):** Auto-advancing cinematic for Beats 10–11 (Cinematics 4, 5, 6). After Cinematic 6 ends and the Bamsemums beat begins (11b), the game returns to room-mode. Henrik becomes inspectable as a regular NPC post-Bamsemums. The Nøkken story is triggered by inspecting Henrik after collecting Bamsemums — auto-advancing dialogue, Space to advance each line.

5. **Henrik's exit choreography after the kitchen.** ⚠️ **PARTIALLY RESOLVED — flagged for Sprint 27.** Henrik stays on the stool through Sprint 26. The kitchen-to-deck transition stubs in Sprint 26 Stage 4 (fade-to-black or minimal deck stub). Whether Henrik appears on the deck separately or is absent during the deck beats until Cinematic 8 is Sprint 27's call. Sprint 27 decides: (a) Henrik walks Pip to deck → both on-screen for Cinematic 7; or (b) Pip drifts to deck alone, Henrik follows for Cinematic 8.

6. **The plate-disappearance mechanic.** After Beat 11 (taste cinematics complete), what happens to the plate visually? Does it disappear? Stay as an empty plate on the counter? Get cleared by Henrik? **My read:** Henrik clears it during the brief transition to Beat 11b. Pip drifts; Henrik clears; the Bamsemums bag is then revealed on the counter (it was always there, hidden behind the cutting board). Settle in build sprint.

7. **The dropped pan — does it stay?** Henrik drops the pan during Cinematic 4 (the silent scream). Does the pan stay on the floor for the rest of Pip's time in the kitchen, or does Henrik pick it up at some point? **My read:** the pan stays on the floor as a small physical reminder of the moment Henrik froze. Henrik never picks it up on-screen. The pan is a quiet visual detail. (Inspectable? Maybe — a tiny line about Henrik's reaction. Or pure decoration.)

8. **Small window or vent showing aurora?** The kitchen has no porthole. Per the chapter-wide aurora rule, the aurora is visible in *all* windows/portholes on the appropriate ship side. Open question: does the kitchen get a small high window (perhaps a ventilation slit or a small inset window above the counter) showing a tiny strip of aurora? **My read:** no. The kitchen is meant to feel interior, sealed, deep in the ship. The aurora is for the upper-deck rooms. The kitchen's connection to the world above is *Henrik himself.* Lock as "no aurora visible in kitchen."

9. **Henrik's flour-stained apron.** Several references mention Henrik's apron as flour-stained. Per Sprint 09 polish, the apron is cream-white. Question: does the apron carry visible flour stains, or is "flour-stained" a verbal description for prose only? **My read:** add small visible flour patches to the apron — a few small lighter spots, very subtle. This is the kind of detail that rewards close looking without demanding it.

10. **Pip's eating animation.** During the taste cinematics, Pip is hovering and biting food. Open question: is there a specific scripted animation for "Pip bites food" (a small mouth-open frame, the food visibly diminished), or does the bite happen off-frame between cinematics? **My read:** the bite happens off-frame. The cinematics fade in on Pip *already mid-bite* with the food hovering. We don't need to animate the bite itself. Settle in build sprint.

11. **Walk-in freezer interior glimpse.** When Henrik enters/exits the walk-in, does the player ever see inside? **My read:** no. The walk-in is offstage — we see only the cool back-light through the slightly-ajar door. Henrik briefly disappears into it (in Beat 9 setup, before Pip arrives) and emerges from it (Cinematic 4). We never enter it. The walk-in is *Henrik's working space*, not the player's.

12. **Notebook handoff staging.** Cinematic 8 (Henrik's offer of the notebook) is currently staged on the deck at sunset. Open question: should this happen in the kitchen instead (a quieter, more intimate handoff in the warm pool of the pendant light), or is the deck-at-sunset framing important enough to keep? **My read:** keep the deck-at-sunset. The kitchen is where Pip is *seen*; the deck is where Pip is *sent forward*. The locations carry different emotional weights. Don't merge them.

13. **Bamsemums tutorial text revision.** The current Bamsemums dialogue (per Sprint 13 implementation) says *"Henrik didn't say they were for him. They are."* This works. But the line could be slightly warmer: *"Henrik didn't say. But the bag is at his eye-level, and Henrik isn't a man who places things by accident."* **Flag for `dialogue.md`** — optional polish, not required.

