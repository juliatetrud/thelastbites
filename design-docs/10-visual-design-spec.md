# 10 — Visual Design Specification

*Created 2026-06-01. Covers the visual look of every character, monster, echo creature, port, and ship location across all eight chapters of The Last Bites.*

---

## How to use this doc

This is the visual source of truth for procedural pixel-art build sprints. Every spec entry is sourced from the chapter outlines, the story bible, the character reference sheets, or the visual research tracker — the primary documents that hold the narrative and design canon. Where a build sprint's spec conflicts with this document, resolve it by checking `01-story-bible.md` (the top-level authority); note the discrepancy here and flag it to Julia. This doc does not supersede the bible; it distills it. Specified detail is cited with the source filename. Inferred detail is marked `ASSUMPTION:`. Undefined detail is marked `OPEN QUESTION:`. All open questions are also collected in the Open Questions list at the end.

---

## Style anchors (summary)

*The full palette rules, register system, and aesthetic mandates live in `03-art-and-aesthetic.md`. This section is a quick-reference for build sprints so you don't have to re-read the full doc.*

**Pixel art, 7th Guest darkness.** Internal canvas: 480×270. `image-rendering: pixelated`. No anti-aliasing.

**Three registers:**
- **Register A** — gameplay sprite. True pixel art. Pip ~16–24 px. Sparse face (eye-dots, blush, mouth). Single-frame-family animated layers (body, eyes, mouth separately). Atmosphere lives in the room, not the sprite.
- **Register B** — cinematic. Same 480×270 canvas, but painterly, atmospheric, framed for close-up (characters fill 40–60% of frame height). Memory cinematics use the white/blue mist treatment (`cinematic.isMemory = true`).
- **Register C** — CSS-div puzzle/portrait screens. Prototype convenience. Migrate to Register B as art is commissioned.

**Palette canon:** cool base (deep moonlit blues and purples, never gray) with discrete warm-amber pools at meaning-bearing locations (hearth, food, doorways, spirit signatures). See `03-art-and-aesthetic.md` § Universal & Regional Palette for the locked color tokens.

**Single warm light per scene.** Mandatory. Every room and cinematic has one dominant warm source. Everything else is shadow.

**Pip's two registers:** present-day ghost (no hair, no apron, cool-white translucent) vs. memory-Pip (dark hair, chef's apron, human body). Never mix. Present-day Pip in cinematics is more pixels of the same ghost, not a redesign.

**Door is the scale anchor.** Ship-corridor door = 110 px tall × 32 px wide at 480×270. All proportions relative to this. Adults: 0.55–0.65 door-heights (~60–72 px). Children: 0.35–0.45 (~38–50 px). Ghost-Pip: 0.35–0.40 (~38–44 px).

---

## The Mnemosyne (shared across chapters)

The ship is a recurring visual environment across all eight chapters. Each location below may appear in multiple chapters. Build status is noted where known from `art-checklist.md`; verify against current `game/index.html` for the most accurate status.

---

### Cabin 646

**Visual identity.** Mid-range Edwardian liner stateroom (not first-class palatial, not steerage). Bunk or single bed with brass fittings; oval or rectangular wall mirror; porthole; small writing desk; washstand; wood paneling; brass sconce. Warm nightstand lamp is the room's single light source. *(`visual-research-tracker.md` Ch1)*

**Palette.** Regional moonlit-blue base (`--region-base: #1c2858`) with the nightstand lamp as a single warm amber pool. Cabin is tight and personal — not cold, but not as warm as the kitchen.

**Key props.** Bed (two states: lump-visible / empty post-reveal). Mirror (two states: empty / ghost-face permanent). Porthole (aurora layer, faint). Cabin door (x=120, warm-amber glow indicating permeable — `03-art-and-aesthetic.md` § Permeable surface convention). Far cabin door (x=450, no glow, non-interactable). Writing desk (~x=220). Washstand (~x=340). Under-bed drawer (Smørbukk treat). Child's drawing on wall (~x=160). *(`art-checklist.md` cabin props)*

**Recurring role.** Cabin 646 is the collection room — items Pip collects across all chapters accumulate and display visibly here on return visits. Collection-item inspectables use a cool-blue shimmer (not warm-amber) per the permeable-surface exception. *(`03-art-and-aesthetic.md`)*

**Build status.** Shipped procedural (Sprint 11 visual identity locked; Sprint 19 adds desk, washstand, under-bed drawer, aurora layer — some not yet built as of Sprint 26).

---

### The Hallway

**Visual identity.** Edwardian passenger-deck corridor. Narrow, deep crimson runner carpet over floor planks, mahogany-style paneling, brass wall sconces at intervals, six numbered brass-plaque stateroom doors (636, 638, 640, 642, 644 grandparents, 646 Pip — ascending left to right). Three brass-rimmed portholes at ~x=180, 600, 1050. Luggage trolley at ~x=530. Five wall-decor pieces (ship photo, barometer, botanical print, navigational map, mirror). Bulletin board at ~x=260. Descending staircase at far right past x=1320. *(`art-checklist.md`, `design-docs/hallway.md`)*

**Palette.** Regional moonlit-blue base. Sconces throw warm amber pools on the floor (alpha 0.20, flicker-driven). Hallway is dimmer than the cabin — long shadow zones between sconces. Porthole ocean-night scenes give a cool blue/indigo fill at the portholes. Aurora layer (faint) in porthole scenes.

**Key interactive objects.** Grandparents' cabin door (x=920, always warm-glow). Cabin 646 door (x=1180, warm-glow after `cabinState.beatStage === 'post-bed'`). Radio on windowsill in grandparents' cabin (triggers talk-through-speakers ability). Descending staircase (DOWN sign) leading to dark corridor.

**Build status.** Shipped procedural (Sprint 16 detail pass). Bulletin board, staircase visual, and hallway canonical treat not yet built.

---

### Grandparents' Cabin (Cabin 644)

**Visual identity.** Same Edwardian vocabulary as Cabin 646 but slightly larger. Two beds; a wardrobe; a small armchair (Dziadek's coat over it); a radio on a side table; window with four wooden panes showing aurora reflection. Babcia's grief-coded personal effects: coat over chair, kerchief, open half-packed suitcase. Nightstand with lamp is the warm-pool source. *(`art-checklist.md`, `visual-research-tracker.md` Ch1)*

**Palette.** Same regional base as hallway. Nightstand lamp warm pool. Window aurora layer (faint green-violet band). Room has a softer atmosphere than Pip's cabin — lived-in rather than haunted.

**Key props.** Babcia on bed (sob-bob animation). Dziadek at window (static, faces left, no mirror). Photograph of Pip on nightstand. Suitcase with pier-recipe card. Window (4-pane wood). Armchair with Dziadek's coat (~x=280). Dziadek's radio (~x=200). *(`art-checklist.md`)*

**Build status.** Shipped procedural. Armchair, coat, and radio not yet built.

---

### Dark Corridor / Stairwell

**Visual identity.** Service-deck passage — utilitarian, not passenger-polished. Painted iron walls, exposed pipes overhead. Two states: *dark* (pre-puzzle, only one weak sconce flickers at ~x=240 and natural light from the stairwell end) and *lit* (post-puzzle, all sconces repaired and glowing). Janitor's cart (~x=840): worn metal cart, mop bucket, broom, clipboard "J. Henriksen Maintenance." Fallen/broken sconce with wires at ~x=420. Broken glass on floor below broken sconce. Stairwell descent to kitchen at ~x=880 (right end). *(`art-checklist.md`, `design-docs/dark-corridor.md`)*

**Palette.** Cooler than passenger corridor — deep cool greens/blues with almost no warm. Pre-puzzle: near-black with a single amber flicker. Post-puzzle: amber sconce pools spaced through the corridor. Echo-mice scuttle along the baseboards.

**Key beats.** Broken-sconce held-button puzzle (electricity ability earned). Broken-glass float discovery (float ability earned). Janitor's scripted walk (post-puzzle trigger). Stairwell descent transitions to kitchen.

**Build status.** Not yet built (art-checklist.md). Implementation in Sprint 26 Stages 1–3.

---

### Kitchen

**Visual identity.** Grand working ship's galley at night. Long stainless-steel prep counter along the back wall (x=250–620). Hanging copper pots on rack above counter. Single pendant light at ~x=475 — the room's only warm pool, radial amber on counter and floor. Stool at ~x=400 (Henrik's post-Beat 10). Walk-in freezer doorway at ~x=700–762 (cool back-light, slightly ajar). Cutting board at ~x=490. Bamsemums bag behind cutting board at ~x=520 (visible after Cinematic 6 completes). Dropped pan on floor at ~x=750 (Beat 9 prop, persists). Storage racks at ~x=820–940. Stairwell opening at x=0–140 (upper left, from dark corridor). *(`design-docs/kitchen.md`, `art-checklist.md`)*

**Palette.** Warm-amber pendant pool contrasting against cool industrial dark: walls in deep cool-greens (`#1a1008` range), floor in cool-grey-brown planks, walls in warm-dark panels. Rest of room in deep shadow per single-light rule.

**Key beats.** Plate of lefse-and-gravlaks at ~x=290 (Cinematic 4 proximity trigger; removed after henrikMet). Henrik seated on stool post-Beat 10. Bamsemums collect tutorial (Beat 11b). Henrik inspectable for Nøkken story (Beat 11c, post-Bamsemums). Echo-mouse optional near freezer doorway.

**Recurring role.** Henrik's kitchen is the hub for every chapter's closing beat (Ch1–Ch7). Its warm-amber pendant is one of the game's most recurring warm pools.

**Build status.** Built procedural (Sprint 26 Stages 1–3). Observation deck transition stub in Stage 4.

---

### Observation Deck

**Visual identity.** Wide curved viewport facing the open sky. Wooden slatted benches (2–3), coiled marine rope, brass telescope on tripod pointed upward toward the aurora. The aurora is the primary visual — full layered parallax treatment occupying the upper half of the viewport. Sparse, cosmic, not domestic. *(`art-checklist.md`, `design-docs/observation-deck.md`)*

**Palette.** Night sky: deep indigo going to violet at horizon. Aurora: multi-layer green-violet ribbons with slow drift. The room is cool and open — no warm-amber pool other than a possible treat in a cold-left-behind wrapper.

**Locked in Ch1 but not yet built.** Build scope: Sprint 27.

---

### Lower Deck (traversal corridor, Ch2–Ch7)

**Visual identity.** Narrow lower-deck passage — older and less finished than the passenger corridors. Brass fixtures more tarnished. Old wood, low ceiling. Small portholes at intervals. Moody, sea-blue light through portholes. The specific stretch used for each chapter's wordless traversal shifts slightly in flavor (Ch2: crimson carpet, clean; Ch5: old wood, damp, stalled atmosphere; Ch6: humid, condensation on brass; Ch7: mosquito clouds). *(`visual-research-tracker.md`, ch02–ch07 outlines)*

**Palette.** Regional moonlit-blue base throughout. Each chapter's echo-creature modifies the ambient — Ch2 mice (warm-amber at floor), Ch3 fish (mid-air amber), Ch4 echo-cats (alley context), Ch5 rats (floor), Ch6 tarsiers (ceiling pipes), Ch7 mosquitoes (cloud clusters).

ASSUMPTION: The lower deck is a single shared visual template reused with minor variations per chapter. The echo-creature species and the specific props (lost objects, humidity level) change, but the corridor vocabulary stays consistent.

---

### Lower-Deck Storage Room (Ch5)

**Visual identity.** End of a Ch5 lower-deck passage. Old floorboards. Crates stacked along walls. Heavy iron-clamp porthole window (the Mamlambo's interface). A hanging lantern. A coil of rope. Three beats happen here: Iris emerges, the Mamlambo arrives, the memory-gifting puzzle is staged. *(`ch05-south-africa-outline.md`)*

**Palette.** Cool, dim, moonlit. The porthole provides the room's only light initially (moonlit ocean night). When the Mamlambo appears, the porthole goes dark/blood-iron. The Edwardian dining-room manifestation (Iris's family) floods the room with warm-amber candle light.

**Key props.** Old floorboards with gap (Iris's emergence point — squeeze-and-pop). Porthole with iron clasp (opens for the Mamlambo puzzle). Crates as spatial blocking. Lantern (the room's modest warm light until the manifestation).

ASSUMPTION: The storage room is narrow enough that the Mamlambo's eye fills the porthole frame completely — the creature is not drawn inside the room, only its presence through the glass.

---

### Crew Quarters (Henrik's room)

Henrik's room is within crew quarters. It is a background location — not a playable beat or a plot-reveal location. The photograph of Erik appears/stays in the kitchen across the chapter outlines. *Henrik's Quarters as a locked-door-Pip-earns-access beat is **retired** (Decision 1, 2026-06-01). See `01-story-bible.md` § The Mentor: Henrik.*

---

## Chapter 1 — Cabin 646

*Port: Bergen, Norway. The Mnemosyne is docked.*

---

### Port / Setting

Bergen harbor at dawn: wooden Bryggen-style warehouses (the colorful Hanseatic row), stone quay, gangways, fish barrels, gulls. Cold dawn palette — slate-blue going amber at horizon. *(`visual-research-tracker.md` Ch1 location: "Bergen dock at dawn")*

The ship's interior locations (listed above under The Mnemosyne) are all relevant to Ch1 — Cabin 646, Hallway, Grandparents' Cabin, Dark Corridor, Kitchen, and Observation Deck.

**Aurora.** Northern lights are visible through all windows and portholes throughout Ch1. Bergen sits at ~60°N. In transit/domestic rooms: faint green-violet band in upper portion of any window-rendered scene, slow drift. On the observation deck: full multi-layer parallax aurora, the room's primary visual. *(`03-art-and-aesthetic.md` § Aurora)*

**Palette.** Regional: `--region-base: #1c2858` (deep moonlit blue). `--region-shadow: #5a4878` (twilight purple). `--region-accent: #ff5050` (geraniums, unused in Ch1 ship interiors). See locked tokens in `03-art-and-aesthetic.md`.

---

### Characters introduced this chapter

**Pip (present-day ghost).** Register A: round bald ghost, three waves at base, two dark eye-dots, two pink blush pixels, small dark mouth. ~38–44 px. Cool-white translucent (`#f0f8ff` at ~0.85 alpha). Soft cool drop-shadow glow on floor beneath him. No hair, no apron. Form blurs at edges when sad or frightened; outline glows warmer when happy. *(`03-art-and-aesthetic.md` § Pip Sprite Specification; `08-character-reference-sheets.md`)*

**Memory-Pip (flashback cinematic only).** Short dark brown hair, oversized beige/sand chef's apron with flour smudges, visible arms/legs/human body. Same eye-dot proportions, same blush, same gentle expression. Register B only. *(`03-art-and-aesthetic.md`; `01-story-bible.md`)*

**Henrik (present-day).** Tall white chef's toque (~14 px) + amber-cream apron (`#e8d8b0`) over near-black shirt and slacks (`#1a1a24`). Gray beard and hair. Pipe in right hand, smoke drifting. Sleek, fit, straight-backed — authoritative via hat. Total figure ~86 px (body ~72 px + 14 px toque). High-contrast silhouette against the moonlit-blue kitchen. *(`08-character-reference-sheets.md`)*

**Babcia (Marta).** Elderly Polish woman. Red kerchief (`#8a2a2a`) — the silhouette tell. Wide soft dark coat with small cream/brown grid squares. ~60–72 px. Crying overlay available. Sob-bob animation. *(`08-character-reference-sheets.md`)*

**Dziadek (Jan).** Elderly Polish man. Dark flat cap (`#1a1f2a`), wool coat with quilt patches matching Babcia's fabric. ~60–72 px. Faces left only — no mirror. *(`08-character-reference-sheets.md`)*

**The Janitor (J. Henriksen).** Crew uniform muted slate (`#3a4458`) + brass name-tag. ~60–72 px. Mop and cart. Scripted walk through dark corridor post-puzzle. *(`08-character-reference-sheets.md`; `art-checklist.md`)*

**The Passenger.** Evening-wear black + white shirt-front. ~60–72 px. Walks hallway obliviously. Does not speak. *(`08-character-reference-sheets.md`)*

**The Doctor.** Dark formal coat, cream shirt, small medical bag, tired-kind posture. ~66–72 px. Scripted exit through cabin far door (Beat 4). Does not see Pip. *(`08-character-reference-sheets.md`)*

---

### Monster equivalent

No monster encounter in Ch1. Henrik occupies the structural slot in the brief moment before he sits down (mouth-open silent scream at the floating food). The horror lasts one beat and resolves into tenderness. *(`ch01-cabin-646-outline.md`)*

**Foreshadowing planted:** Nøkken story (Beat 11c). Henrik tells it as a folktale — a Norse water-spirit who plays violin to lure people to drown. He doesn't say it's about Henrietta. The player should feel it anyway. *(`ch01-cabin-646-outline.md`, `01-story-bible.md`)*

---

### Echo-creature (Ch1)

**Echo-mice.** 10–14 px wide. Drained warm-amber translucent. Scuttle along baseboards in the dark corridor. Sparse — one or two visible, never a swarm. A single mouse may appear near the kitchen freezer doorway. *(`01-story-bible.md` § Echo-creatures; `art-checklist.md`)*

Echo-spiders and echo-bats are retired from Ch1 — reserved for future chapters per the one-pest-per-chapter rule. *(`art-checklist.md`)*

---

### Cinematics (Ch1 has 8, per doubled first-taste structure)

**Cinematic 1 — Wakeup.** Near-pure black. Pip's face emerging from darkness — two slits of pale eye-light opening. Dust motes. The first breath of a ghost. Register B (but present-tense: no memory mist). *(`03-art-and-aesthetic.md` § Cinematic 1)*

**Cinematic 2 — Mirror.** Close-up of Pip's face in the mirror, melting on one side. Skin sagging like wax. Single warm lamplight from upper-left. Deep shadow on opposite half. Jaundiced amber skin tone. Carved wood mirror frame visible behind. **This image is reused at the Ch8 climax — commission once, use twice.** Animated (the only cinematic with hand animation besides the memory shimmers). *(`03-art-and-aesthetic.md` § Cinematic 2)*

**Cinematic 3 — Grandparents' Cabin.** Wide shot. Pip small in doorway, foreground silhouetted. Babcia on bed, hands over face, weeping. Dziadek at window, back to viewer, shoulders shaking. Warm nightstand lamp. Suitcase open. Photograph on nightstand. Still — the frozen quality is the heartbreak. *(`03-art-and-aesthetic.md` § Cinematic 3)*

**Cinematic 3b — Doctor exit (scripted sequence, not registry).** Doctor crosses cabin and exits through far door. Silent, ~3–4 seconds. Beat 4. *(`art-checklist.md`)*

**Cinematic 4 — Kitchen (Pip eats the food).** Three-zone: Pip on the right with hovering food (post-bite), Henrik in the doorway on the left frozen mid-scream (mouth open), kitchen depth between them. Diagonal composition. Comic-tragic. Henrik drops a pan — visual: pan falls, small bounce, stays on floor for rest of kitchen scene. *(`03-art-and-aesthetic.md` § Cinematic 4)*

**Cinematic 5 — Henrik sits down.** Close-ish two-shot. Henrik foregrounded on stool, weathered-kind-weary face. Pip floating in soft focus to the side. The game's heart turns from horror to tenderness. Still. *(`03-art-and-aesthetic.md` § Cinematic 5)*

**Cinematic 6a — First Taste (gravlaks / grandfather memory).** Pip takes a bite of gravlaks. Kitchen shimmers. Young Henrik (~8 years old) in a warm Norwegian cottage kitchen, watching his grandfather's hands cure salmon. Sun through a window. The smell of dill. Past is brighter; present darker. Shimmer-dissolve transition, hand-animated. Memory mist treatment (`cinematic.isMemory = true`). *(`ch01-cabin-646-outline.md`; `01-story-bible.md` Ch1 status)*

**Cinematic 6b — First Taste (lefse / Erik memory).** After internal crossfade. Pip takes a bite of lefse. Older Henrik (recognizably grown) teaching a young boy to make lefse. **Erik is ~11 years old — the same age Pip is. This parallel is deliberate (Decision 8, 2026-06-01). He is drawn as he looked at death.** The child's face: **partially visible — turned away, in profile, in half-shadow. Not occluded, but ambiguous.** Must be recognizable on a Ch7 second viewing (when Pip meets Erik's ghost), not on first pass. Same shimmer-dissolve, same memory mist. *(`03-art-and-aesthetic.md` § Cinematic 6b CRITICAL ART NOTE; `ch01-cabin-646-outline.md`)*

**Cinematic 7 — Dock farewell.** Wide shot from the ship's deck. High angle. Grandparents walking away on the dock below with a small wooden box (coffin). Babcia stops, looks up toward the ship, almost catches Pip's eye, then continues. Pip on railing, translucent, waving with one small hand. Cold blue-gray morning light. Still. *(`03-art-and-aesthetic.md` § Cinematic 7)*

**Cinematic 8 — Henrik's offer.** Two-shot, intimate. Henrik offering Pip the open blank recipe journal. Behind them: dark water, sunset, distant lights of the next port. Warm orange-pink horizon. The mission begins. Still. *(`03-art-and-aesthetic.md` § Cinematic 8)*

**Additional scripted sequence (not registry):** Nøkken glimpse at the port (after Cinematic 7). A dark rooted shape with two amber eyes peering from harbor water. ~3 seconds. Sepia-monochrome painterly register. NOT the humanoid Nøkken form — roots and water only. *(`art-checklist.md`)*

**Resolved (Decision 2, 2026-06-01):** Cinematics 6a and 6b are both canonical Ch1 cinematics (shipped procedurally, Sprint 26 Stage 2). `art-checklist.md` has been updated to reflect the doubled structure. The prior "single Cinematic 6 / 6a retired to Ch4" note in art-checklist is superseded.

---

### Treats (Ch1)

1. **Kitchen counter — Bamsemums** (x=520, Beat 11b). Tutorial treat for `↓ COLLECT` verb. Foam-and-chocolate bear bag, lavender translucent bag body, three colored bear-dot shapes inside. Shipped designed/procedural (Sprint 13). *(`art-checklist.md`)*
2. **Cabin under-bed drawer — Smørbukk** (ASSUMPTION: yellow wrapper, small caramel toffee). Replay-reward; collect aura visible from chapter start but verb not learned until kitchen. *(`ch01-cabin-646-outline.md`)*
3. **Dark-corridor cleaning cart — Skillingsboller** (ASSUMPTION: Bergen-style cinnamon bun, half-eaten, waxed paper). Collectable after float + `↓` both learned. *(`ch01-cabin-646-outline.md`)*
4. **Kvikk Lunsj** (Norwegian chocolate biscuit, left by a stargazer). **Locked 2026-06-01** (Decision 3).

---

## Chapter 2 — Tallinn

*Working title: A Cat, a Pan, a Promise. First chapter of rising action.*

---

### Port / Setting

**Estonian coastal village: Käsmu** (Captain's Village, Lahemaa coast). **Locked 2026-06-01** (Decision 11). Small foggy fishing village: wooden buildings with steep sloped dark-tarred roofs, stone foundations, narrow lanes, birch trees between houses. *(`visual-research-tracker.md` Ch2; `ch02-tallinn-outline.md`)*

**Leida's cottage exterior.** Wooden, low-eaved, small windows with red geraniums in pots, set apart from the village. A path leading past a small folk altar (flat stone, wooden bowl, faded ribbon). *(`visual-research-tracker.md` Ch2)*

**Leida's cottage interior.** One main room: wood-burning stove, long pine table, kettle, dried herbs hanging from rafters in bunches, cast-iron cookware. Worn but kept. *(`visual-research-tracker.md` Ch2)*

**Palette.** Regional: same locked Estonia palette as the ship (`--region-base: #1c2858`, `--region-shadow: #5a4878`, `--region-accent: #ff5050` for the geraniums). The cottage interior introduces the hearth stove as the warm-amber pool. Exterior is cool-foggy with the geraniums as the warm accent.

**Ship (lower decks).** Same lower-deck corridor template as the ship section above. Small lost objects behind pipes and between deck plates — an old photograph, a child's mitten, a single button. Emotional texture: *the ship is full of small lost things.* *(`ch02-tallinn-outline.md`)*

---

### Characters introduced this chapter

**Leida.** Estonian grandmother. Elderly (older than Henrik). Bent slightly forward. Working apron neutral cream (`#d8c8a0`), muted Estonian-blue headscarf (`#3a4858`). ~60–72 px. Warm cheek-raise when speaking. Soft elder breathing cycle. *(`08-character-reference-sheets.md`)*

**Young Leida (taste-memory, Register B).** ~8 years old, wool winter coat, knitted hat or scarf, mittens, sturdy boots. Tin lunch-pail. Sitting on a low stone wall outside a wooden Estonian schoolhouse. *(`visual-research-tracker.md` Ch2)*

**Leida's young husband (taste-memory, Register B).** ~8 years old. Too-light jacket for the cold (visibly inadequate — poor), no lunch, the kind of hungry that has stopped expecting anything. Sits on a cold step beside young Leida. Second image flash: same person grown (~28) at Leida's pine table, eating meatballs, laughing. *(`visual-research-tracker.md` Ch2)*

**Pätu.** First appearance. Small gray tabby cat. Pointed ears, curled tail, yellow eyes (`#ffd84a`). ~20–24 px. Initially with the Haldjas's sparkles beside her. Six canonical states: sitting, sleeping, waking, stretching, looking, hissing. Hissing pose must be unmistakable at room scale. Real, alive — not a ghost. *(`08-character-reference-sheets.md`; `03-art-and-aesthetic.md`)*

---

### Monster

**The Haldjas.** Estonian house-spirit. Not a humanoid — a warm gold-amber sparkle cluster (`#ffe088`), drifting procedurally in the corner of a room. Distinct from Pip's cool-white and Iris's eventual sea-green-blue. Faint mouth-line briefly visible when speaking. Sparkles cluster denser at moments of acknowledgment (the altar, the spell). *(`08-character-reference-sheets.md`)*

**Three-doors spell (sincerity puzzle).** Three free-standing wooden doors materialize in the cottage. Wood-grain texture, light Estonian folk-carved geometric ornament along lintels. They don't belong to any specific architecture — storybook. Figures behind doors: (1) sweet-faced girl in folk dress, smiling, holding something out; (2) starving older woman in rags, frail, hand out; (3) healthy well-dressed adult man, persuasive. Reveals: (1) eyes go solid-glowing, face turns predatory; (2) starving woman unfolds into Pätu (the cat all along); (3) man's eyes go predatory (the offer to see Pip's grandparents turns poisoned). *(`visual-research-tracker.md` Ch2)*

---

### Echo-creature (Ch2)

**Echo-mice.** Same as Ch1 — scuttle along lower-deck baseboards during the wordless traversal. *(`ch02-tallinn-outline.md`; `01-story-bible.md`)*

---

### Cinematics

No chapter outline cinematics specified beyond the taste-memory sequence and the closing spell-puzzle. The taste-memory (young Leida sharing the lunchbox meatball) is Register B with memory mist. The three-doors puzzle is Register C (CSS-div) or Register B.

---

## Chapter 3 — Southampton

*Working title: A Scotsman's Red Curry. First port outside Estonia.*

---

### Port / Setting

**Southampton dockyard at night.** Slate-blue and damp. Modern container cranes silhouetted. Moored boats. Small wine shop on the pier (Edie's place). Working pub at the docks. Single warm-amber streetlamp pool in rain. *(`visual-research-tracker.md` Ch3)*

**Bevois Street.** Narrow residential street rising from harbor. Brick terraced houses on both sides, parked cars, occasional streetlamp. Damp. Echo-deer cross at intervals. Dundee house midway: white walls, big amber windows — the warmest pool on the street. *(`visual-research-tracker.md` Ch3; `ch03-southampton-outline.md`)*

**The Dundee kitchen.** Yellow-warm painted walls. Long pine table seats nine (Sandy's chair always at head). Range cooker. Spice jars on shelf. Sandy's traces: YoYo Games hoodie on chair, handwritten recipe card on counter, photograph on fridge (present but not zoomed-in), worn cookbook with marginalia, child's drawing of a dragon on fridge. *(`ch03-southampton-outline.md`)*

**Palette.** Regional: slate-blue base with sea-foam accent. Southampton is cool-wet-urban. The Dundee house is the chapter's one warm-amber pool — its windows pour amber into the cool blue street.

**Ship (lower decks).** Brief traversal. Echo-fish drift through the corridor air — warm-amber glowing mid-air fish shapes. Atlantic cod (large, sleek), haddock (black side stripe), plaice (flatfish, broad). Ghostly residue of fish that died for fish-and-chips. *(`ch03-southampton-outline.md`; `visual-research-tracker.md` Ch3)*

---

### Characters introduced this chapter

**Sandy Dundee (ghost form).** Very tall (~0.65 H), beer belly, brown hair (`#5a3820`), warm-amber translucent glow (`#ffc868`). Casual rumpled clothes. Stands like he owns the room — slow rocking heel-to-toe idle. Large gestures when speaking. Brighter and fuller than Pip. Translucent like Pip but more present. *(`08-character-reference-sheets.md`; `ch03-southampton-outline.md`)*

**Sandy (arrival form, from sea).** Same Sandy, ghost-translucent, walking up out of the water onto the dock with paper grocery bag. Purposeful, unhurried. *(`visual-research-tracker.md` Ch3)*

**Caitlin.** Middle-aged, short blond pixie haircut, apron over everyday clothes. At the range, the kitchen's center of gravity. *(`ch03-southampton-outline.md`)*

**Family members (Robert, Archie, Max, Gus, Bibi).** Adults (Robert: tall, muscular, brown; Archie: tall, skinny, brown; Max/Gus: slightly shorter, brown) and one child (Bibi: ~Pip's age, long light-brown hair, the youngest). Group tableau at a nine-person kitchen table. *(`ch03-southampton-outline.md`; `08-character-reference-sheets.md`)*

**Michel and wife.** Brief warm presences at dinner. French man + brunette wife. Period-casual adult attire. *(`ch03-southampton-outline.md`)*

**Edie.** Old Cockney ghost. Apron, headscarf, brass-buttoned cardigan. Hands always wet. Ghost-translucent. Wine-shop on the pier. *(`ch03-southampton-outline.md`; `visual-research-tracker.md` Ch3)*

---

### Monster

**The Black Shuck.** Giant ghost-dog, black-on-black (`#0a0408`). Low-to-ground silhouette. Warm-amber glowing eyes (`#ffc868`). Larger than a normal dog. Heavy breathing (chest pulse). Tail sweep occasionally. Single deep-bark when fed (held open-mouth frame). Resolution: fed, not fought. *(`08-character-reference-sheets.md`)*

---

### Echo-creatures (Ch3)

**Echo-fish (cod, haddock, plaice).** Visible echo-creatures, ~28–33 px. Warm-amber translucent at low alpha. Drift mid-air through the lower-deck corridor, schooling near portholes. First seen in Ch3. *(`08-character-reference-sheets.md`)*

**Echo-deer.** Visible echo-creatures, ~40–44 px. Warm-amber translucent. Cross Bevois Street at intervals — leggy, alert, deer-shaped. *(`ch03-southampton-outline.md`; `08-character-reference-sheets.md`)*

---

### Cinematics

No full-canvas cinematics specified in the outline beyond the taste-memory through Sandy's eyes (Register B). That cinematic uses the **house taste-memory pattern: a color-temperature wash in the chef's warm-amber spirit-signature** — the screen shifts to Sandy's warm-amber register, the family table fills the frame. **Locked 2026-06-01** (Decision 4 — house pattern for all taste-memory POV shifts across chapters).

---

## Chapter 4 — Istanbul

*Working title: Muhittin's Muhammara. The chapter where the Henrik subplot becomes visible.*

---

### Port / Setting

**Istanbul, winter night.** Stepped stone streets winding up from the harbor. Narrow, cobblestoned, overhanging balconies, lit windows throwing warm-amber pools. A single İznik tile-blue accent on a fountain or doorway — cobalt-and-turquoise Ottoman geometric motif. Small open square with fountain, snow on cobblestones, dying brazier (Karakoncolos's stage). *(`visual-research-tracker.md` Ch4; `ch04-turkiye-outline.md`)*

**Stray-cat alley.** Narrow, foggy, ember-red braziers in roadside niches. Echo-cats drifting through. *(`ch04-turkiye-outline.md`)*

**Muhittin's kitchen.** Small house, low-ceilinged kitchen, wood-fired oven (smoking chimney outside), long table set for four. Copper pots, hanging spices and dried chilies, bread rising on counter, roasted red peppers cooling on rack. Cumin and char smell. *(`visual-research-tracker.md` Ch4)*

**Taste-memory location — walnut orchard.** Anatolian walnut orchard, late summer/early autumn. Mature walnut trees, broad leaves, ripening walnuts in green husks, golden afternoon light. *(`visual-research-tracker.md` Ch4)*

**Palette.** Regional: deep İznik blue base with ember-red warm pools (braziers, lanterns, the lit window). The regional shadow note is deep ember-red (Turkish carpets, dying coals). The single İznik-tile-blue accent is the chapter's non-warm color note.

**Ship (lower decks).** Brief at chapter's end as Pip returns to Henrik's kitchen. Stray-cat alley is the chapter's traversal; the ship traversal is minimal.

---

### Characters introduced this chapter

**Muhittin.** Late twenties Turkish man. Warm-rust sweater (`#a85838`) + cream apron. Beard or stubble. Warm, curious, easy. Real-person reference. *(`08-character-reference-sheets.md`)*

**Omer.** Muhittin's brother. Athletic build, tennis whites. Late twenties. Real-person reference. *(`08-character-reference-sheets.md`)*

**Brian.** American, in Türkiye for the year. Tennis casual with blue accent. Real-person reference. *(`08-character-reference-sheets.md`)*

**Muhittin and Omer as children (taste-memory, Register B).** Two boys ~8 and ~10 in late-summer Turkish countryside clothes. Testing walnuts with thumbnails. Brothers, easy together. *(`ch04-turkiye-outline.md`)*

**Their grandmother (taste-memory, Register B).** Elderly Turkish woman, long dress, headscarf, apron. Gathering walnuts at edge of orchard. Reaches out and gathers both boys against her. She is gone in the present — inferred, not shown. *(`ch04-turkiye-outline.md`)*

---

### Monster

**The Karakoncolos.** Turkish winter-spirit. Very large, stooped, hairy/cloaked shape (`#1a1408` / `#0a0408`). Frost-cloud surrounding body (pulse animation). Hollow-faced — the visual register is *cold and hollow*, the kind of thing that has forgotten itself. Breath visible in cold air. Body very still except heavy-breathing frost-pulse. Gibbering mouth animation for "I don't remember" line — erratic, more violent than normal speech. Eye-glow: **cold-blue `#88a8c8`. Locked 2026-06-01** (Decision 7). *(`08-character-reference-sheets.md`)*

---

### Echo-creatures (Ch4)

**Echo-cats.** Visible echo-creatures, ~22–24 px. Warm-amber translucent. Sitting on stoops, sleeping on cobbles, watching from low walls, drifting between buildings in the stray-cat alley. They do not see Pip or Pätu — they are memory, not presence. Pätu fears them (she could have been one of them — held without saying). *(`ch04-turkiye-outline.md`; `08-character-reference-sheets.md`)*

---

### Cinematics

The taste-memory through the muhammara: walnut orchard, two boys, grandmother gathering them against her. Register B with memory mist. The Henrik kitchen beat (photograph, Henrietta) is scripted room-mode dialogue, not a formal cinematic.

---

## Chapter 5 — Saldanha Bay

*Working title: A Stew for the Crew. The midpoint chapter.*

---

### Port / Setting

**Saldanha Bay harbor at dusk.** Natural deep-water harbor, Cape West Coast of South Africa, north of Cape Town. Working fishing port. Big sky. Fynbos hills inland. Atlantic to the west. Ship docks at dusk — sky going gold to purple. *(`visual-research-tracker.md` Ch5; `ch05-south-africa-outline.md`)*

**Bay streets.** Small-town texture. Red-ochre walls, sun-baked dust, simple working houses. *(`visual-research-tracker.md` Ch5)*

**Johannes's outdoor courtyard.** Fire pit, black cast-iron three-legged potjie pot suspended over it. Small half-open kitchen behind. Table set for friends. Spice jars, herbs hanging from rafters, a battered wooden spoon stained with decades of stew. The chapter's single warm-amber pool: the fire. *(`visual-research-tracker.md` Ch5; `ch05-south-africa-outline.md`)*

**Taste-memory location — South African veld clearing.** Vast horizon at sunset. Karoo or West Coast veld, low fynbos vegetation, distant hills, a single clearing with a fire and the potjie pot. Soft purple-and-amber dusk lighting. *(`visual-research-tracker.md` Ch5)*

**Edwardian dining room (Iris's family manifestation).** Long table with white tablecloths, ~10 people in Edwardian period dress, warm-amber candle light, dark wood walls. Loud, happy, mid-meal. The ship is The Lethe — the dining room appears as a manifestation around Iris (does not depict the actual wreck). *(`visual-research-tracker.md` Ch5; `ch05-south-africa-outline.md`)*

**Palette.** Regional: twilight purple-blue with jacaranda shadow note. The day's red-ochre colors still in the walls and dust. Single warm-amber pool (Johannes's fire) visible from blocks away.

---

### Characters introduced this chapter

**Iris (wet).** Edwardian girl ~10–11. White pinafore over a dark dress (mourning-blue or dark sea-soaked blue). Hair plastered to face from sea. Visibly wet from her first appearance. *(`08-character-reference-sheets.md`; `visual-research-tracker.md` Ch5)*

**Iris (dry, after shake-off).** Same Iris, instantly dry. Animated shake-off — a quick blur-burst (dog shaking off water), accompanied by squeeze-and-pop sound. Form-blur at ~50% alpha when sad or stubborn — how Pip eventually realizes she's a ghost. Sea-green-blue glow (`#88b8b0`). Pale (albino-looking) hair (`#f8f4e8`). Edwardian dress (`#1f2a4a`). Victorian portrait stillness; chin raised when speaking. *(`08-character-reference-sheets.md`)*

**Iris's father (taste-memory, Register B).** Edwardian gentleman, dark suit, waistcoat, watch chain, neat mustache. Warm. At dining-room table. *(`visual-research-tracker.md` Ch5)*

**Iris's family at dinner (manifestation, Register B).** ~10 people in Edwardian dress. Parents, siblings, aunt/uncle figure. Long table, white tablecloths, candles, mid-meal. Loud and happy. *(`visual-research-tracker.md` Ch5)*

**Johannes Delport.** Older Afrikaner. Jolly, bearded, chaotic. Brown `#5a4438` + apron. Heavy-set, jolly stance. Sings while cooking, talks to himself and the cat. Cannot see Pip. *(`08-character-reference-sheets.md`; `ch05-south-africa-outline.md`)*

**Johannes's parents (taste-memory, Register B).** Young couple in worn farm clothes, tending a fire under a black potjie at sunset in a clearing. Johannes as child (~6–8) watching them. *(`visual-research-tracker.md` Ch5)*

---

### Monster

**The Mamlambo.** South African water-serpent (brain-sucker variant). Massive coiled serpent, not humanoid. Eye visible at the porthole — intelligent, hungry. Body coiling against the hull beyond the glass. Blood-iron signature (`#7a1418`). Slow eye-blink (vertical eyelid sweep) every 8–10 sec. Not a speaking character — eye-blink only. *(`08-character-reference-sheets.md`; `ch05-south-africa-outline.md`)*

---

### Echo-creatures (Ch5)

**Echo-rats.** Ambient vermin, ~7–16 px. Warm-amber translucent at very low alpha. Scuttle along lower-deck baseboards during the wordless traversal. Drain strength sharply on touch. *(`ch05-south-africa-outline.md`)*

---

### Cinematics

**Iris's family manifestation.** The chapter's biggest cinematic. Register B. Loud Edwardian dining room, white tablecloths, many faces, warm-amber candle light. The room blooms outward from Pip's memory-gift. Memory mist treatment.

**Johannes's parents by the fire.** Register B with memory mist. Veld clearing, black potjie, young couple, child watching.

---

## Chapter 6 — Indonesia (Kolonodale)

*Working title: A Knot of Banana Leaves. First chapter of the post-midpoint half.*

---

### Port / Setting

**Kolonodale, Central Sulawesi.** Small port town on Tomori Bay. Wooden stilt-houses near the water. Coconut palms. The smell of charcoal and clove cigarettes, jackfruit and chili in the air. *(`visual-research-tracker.md` Ch6; `ch06-indonesia-outline.md`)*

**Resolved (Decision 5, 2026-06-01):** Kolonodale, Central Sulawesi is canonical. `01-story-bible.md` has been updated.

**Banana grove at edge of town.** Broad-leaved, cool light filtered through canopy. Old graves nearby (Indonesian grave markers, small, weathered). This is the Pocong encounter location. *(`visual-research-tracker.md` Ch6)*

**Tirta's warung.** Small open-front warung, thatched or palm-frond roof, charcoal grill at front. Iron pan, racks of pre-prepared ingredients. Late-afternoon golden light fading to evening. *(`visual-research-tracker.md` Ch6)*

**Palette.** Regional: tropical — late-afternoon golden light fading to warm evening. Deep blue-green ambient with charcoal smoke haze, clove-cigarette atmosphere. No locked regional palette tokens yet.

---

### Characters introduced this chapter

**Tirta.** Young Indonesian chef (late twenties, ponytail, apron streaked with chili oil, dish towel over shoulder). Warm, fast-talking, generous, deeply funny. **Female. Not a real-person reference — original character. Locked 2026-06-01** (Decision 9). *(`ch06-indonesia-outline.md`)*

---

### Monster

**The Pocong.** Tall (~80–88 px, 0.73–0.80 H) white shrouded figure. Three horizontal knot-lines at the base — the burial knots. Cannot walk; hops in small frantic jumps every 3–4 sec. Always-open glowing yellow eyes (`#ffd838`) with dark pupils and soft yellow glow halo. Eyes angled inward at top for menacing expression. Trapezoid shape (bottom row wider than top). Dark grey angled eyebrows reinforce the menace. Thick orbiting smoke aura: 15 patches, alpha 0.40–0.55, per-patch radius variance (6–25 px orbital radius), angular-velocity variance, radial wobble, depth-based alpha dimming behind shroud. Treated with sympathy despite the threat visual — he is lost, not evil. Shroud edges shimmer when "speaking." *(`08-character-reference-sheets.md`)*

**The Pocong's living person / backstory (Register B, if depicted).** ASSUMPTION: a fisherman from decades ago, buried in a hurry during a typhoon, burial knots never loosened. Family on the wrong side of a window — calling and not being heard. *(`ch06-indonesia-outline.md` open question — working answer only)*

---

### Echo-creatures (Ch6)

**Echo-tarsiers.** Pygmy tarsiers (Sulawesi *Tarsius pumilus*) — tiny primates with enormous reflective eyes. Cling to bulkheads and ceiling pipes in small groups of three or four. Blink sequentially in the dim. Follow Pip with their gaze. Not threatening — just watching. Drain strength if Pip bumps one. *(`ch06-indonesia-outline.md`; `visual-research-tracker.md` Ch6)*

---

### Cinematics

**Tirta's taste-memory (lemper).** Tirta's grandmother's courtyard at night, lamp-lit, family assembly line wrapping lemper for the orphanage. Register B with memory mist.

---

## Chapter 7 — Brazil (Tapajós)

*Working title: A Stew for the Smoke-Child. The last port chapter before the climax.*

---

### Port / Setting

**Alter do Chão, Tapajós.** **Locked 2026-06-01** (Decision 12). Functional, not picturesque. Stacked crates, coiled ropes, moored fishing boats. River water and tar smell. Forest begins immediately beyond the dock. No streetlights. *(`visual-research-tracker.md` Ch7; `ch07-brazil-outline.md`)*

**Forest path (night).** Dense canopy. Phosphorescent fungi at trunk bases (ambient warm-green glow, occasional small pools). Dense frog-and-insect chorus atmosphere. *(`ch07-brazil-outline.md`)*

**Joana and Beatriz's house.** Small wooden house raised on stilts at forest edge. Clay-tile roof. Open windows. Single room as kitchen/living space. Low fire in corner clay hearth. Clay pot heating. Wooden counter with ingredients. Warm light through doorway. *(`visual-research-tracker.md` Ch7; `ch07-brazil-outline.md`)*

**Taste-memory location — generations of moqueca.** A sequence or stacked image across Brazilian history. Not a single location. Bahian fishing-village kitchen; Amazonian river-bank cooking circle; a wartime kitchen; a communal pot; a modern kitchen couple; a fishing village at dusk. The constant: fish into pot, broth into bowls, bowls into hands. *(`ch07-brazil-outline.md`)*

**Palette.** Regional: deep Amazonian night — blue-green ambient. Phosphorescent fungi at trunk bases. Warm-amber pools from house windows. Dense canopy obscures sky. The forest is dark and watched.

---

### Characters introduced this chapter

**Joana.** Taller Brazilian woman, browner from the sun (`#5a3a28` skin), hands still wet from washing. Forest-green accent in clothing. Quiet, observant, reads people like she reads the forest. *(`08-character-reference-sheets.md`; `ch07-brazil-outline.md`)*

**Beatriz.** In her sixties, gray-streaked hair pulled back, apron over faded cotton dress (`#a89878`). The warmth-front of the pair. "I was very good at splinters." *(`08-character-reference-sheets.md`; `ch07-brazil-outline.md`)*

**Erik (ghost form).** First appearance. Pip's age (~12). Warm-amber translucent halo (`#ffd8a8`). Dark hair `#3a2818`, Norwegian working-family sweater `#5a4438`. Fast small bounce idle. Delighted bigger bounce when speaking. Warm-cream white eyes with dark pupils (3×3 px, slightly larger than adult for child-emphasis). Alpha ~0.70. Excited, happy to be seen — at peace. *(`08-character-reference-sheets.md`)*

**The capuchin.** Small primate (~22–33 px). Brown body (`#5a3a28`) + white face/chest/ear tips (`#e8e0d0`). Sharp-eyed. Drops from branch, perches high. Chitters. Acts as path guide between dock and Joana/Beatriz's house. *(`ch07-brazil-outline.md`; `08-character-reference-sheets.md`)*

**Resolved (Decision 6, 2026-06-01):** Capuchin is Ch7. `08-character-reference-sheets.md` updated.

---

### Monster

**The Boitatá.** Brazilian folkloric fire-serpent. Vast coiled body of fire shaped like a serpent — fire-amber palette (`#ffc868` / `#c87830`). Lantern-eyes the size of dinner plates, pulsing warm glow. Pours upward out of river without splashing. Fire-flicker on body (procedural). Speaks once, slowly — mouth opens wide, coil rears. Guardian misidentifying Pip (the match-flame summoned it). Not malevolent — mistaken. *(`08-character-reference-sheets.md`)*

---

### Echo-creatures (Ch7)

**Echo-mosquitoes.** Dense slow-drifting clouds, barely visible. Warm-amber translucence at very low alpha. Constant low hum. Do not bite Pip (ghost). Pätu swats and hisses. *(`ch07-brazil-outline.md`)*

---

### Cinematics

**Moqueca taste-memory (generations).** The chapter's central cinematic vision. Register B with memory mist. Sequence or stacked image across time — not one location. The unbroken gesture of food-to-hands across Brazilian history. The small boy receiving a bowl at the end (could be Pip or anyone).

**Erik's birthday in Henrik's kitchen.** Scripted room-mode dialogue, not a formal cinematic. But the moment Henrik sees himself through Erik's eyes (the memory-gift) is visually cinematic in weight and should be staged accordingly.

---

## Chapter 8 — Greenpoint

*Working title: A Perfect Last Bite. The climax and resolution.*

---

### Port / Setting

**Greenpoint, Brooklyn, late afternoon to evening.** Brick three-story walk-up apartments with iron fire escapes. Quiet residential block. Overcast sky going to dusk. Soft grey palette with warm-amber window pools lighting up as evening falls. *(`visual-research-tracker.md` Ch8)*

**Pip's apartment building.** Red-painted front door, stoop, tarnished door-buzzer panel with family's Polish last name still on label 2B. *(`visual-research-tracker.md` Ch8)*

**Pip's childhood kitchen.** Worn yellow-and-white pattern linoleum floor. Small wooden kitchen table, four chairs. Window over sink looking down at back garden. Pantry curtain (becomes the veil). Refrigerator hums. Exactly as it was the last day he was alive. Frozen but loved. The pantry curtain transforms in the final cinematic into the threshold Pip steps through. *(`visual-research-tracker.md` Ch8; `ch08-greenpoint-outline.md`)*

**Babcia and Dziadek's apartment kitchen (the parallel image).** Similar to Pip's but warmer — more lived in. Plants on windowsill, small TV on counter. Babcia and Dziadek at their kitchen table at the chapter's end. *(`visual-research-tracker.md` Ch8)*

**The bottom-of-the-well kitchen (memory, Register B).** The kitchen as it was with all six chairs filled — Babcia, Dziadek, Pip's mother, Pip's father, small-Pip in high chair. Warmer, fuller, more crowded than the present-day empty kitchen. Babcia teaching small-Pip the pierogi fold. *(`ch08-greenpoint-outline.md`)*

**Palette.** Urban Brooklyn at dusk: overcast grey ambient with warm-amber pools from windows. Polish bakery signage visible. The childhood kitchen is at once familiar and haunted — the warmth is of the past, not the present, until the veil opens.

---

### Characters featured this chapter

**Pip's Mother.** Blonde hair (`#d8c890`), warm casual knit (`#7a5848`), pale skin. Early thirties at death. Slender adult. Veil-crossing translucence: at-peace warm-amber register. *(`08-character-reference-sheets.md`)*

**Pip's Father.** Brown hair (`#3a2818`), wool sweater (`#3a4438`), olive skin. Early thirties. Broad-shouldered. Veil-crossing: same at-peace warm-amber translucence. *(`08-character-reference-sheets.md`)*

**Babcia.** As established, now home in Greenpoint. Apron, kerchief off (ASSUMPTION: the chapter is more domestic, more intimate — she may not be wearing the kerchief in the final scenes). Tasting the air, face wet. Mouths "Filipek" very softly. *(`ch08-greenpoint-outline.md`)*

**Dziadek.** As established. Beside Babcia at the table. His hand tightens on hers. *(`ch08-greenpoint-outline.md`)*

**Henrik.** As established. Comes up the stairs to the apartment because he couldn't not. Learns the pierogi fold. Weeps quietly. Stays alone in the kitchen after Pip crosses, with Pätu and a warm photograph. *(`ch08-greenpoint-outline.md`)*

**Erik.** As established from Ch7. Comes through the veil to be with Henrik. *(`ch08-greenpoint-outline.md`)*

---

### Monster (Climax)

**The Shadow.** Not a separate creature — a manifested version of Pip himself. His grief, fear, and anger for dying, tangled into one shape. Knotted black wires that won't stay knotted, constantly shifting. Static-darkness inside the silhouette — channels of memory playing like a TV skipping channels. The most recurring channel: the melting-face mirror image from Cinematic 2, played sped up. Pip-sized (~0.40 H) but never a fixed shape. Blood-iron color family (`#7a1418`) shared with the Mamlambo. Slightly faster than Pip. Always one configuration ahead. *(`08-character-reference-sheets.md`; `01-story-bible.md`)*

**Defeat condition.** Not defeated. Answered. Dissolves channel by channel as Pip overrides each painful memory. The final dissolve is **re-integration** into Pip — the wires curl back in and soften. He is whole.

---

### Echo-creatures (Ch8)

**Urban vermin (cockroaches, bedbugs, rats, turkey).** Pip's grief surfacing as the city's own scavengers. Cockroaches scatter from sewer grate. Bedbug swarm ripples across alley wall. Rats along curb. One confused turkey at full speed between parked cars (real Greenpoint detail, the chapter's only dark comedy). *(`ch08-greenpoint-outline.md`; `visual-research-tracker.md` Ch8)*

---

### Cinematics

**The bottom-of-the-well memory.** The chapter's deepest cinematic. Register B. Six chairs filled at the kitchen table. Babcia teaching small-Pip the fold. All the family alive. Warmer, fuller than the present-day empty kitchen. No mechanic — the player watches.

**The veil opening.** The pantry curtain pulls aside to reveal more kitchen — warmer, older. Pip's parents step through. Then Erik to Henrik. Two families in one kitchen.

**The parallel image / fade-out.** Babcia at her own kitchen table, tasting something on the air. Mouths "Filipek." Dziadek beside her, hand tightening on hers. Holds, then fades out.

---

## Open Questions — All Resolved (2026-06-01)

All 14 original open questions from this document were resolved by Julia on 2026-06-01 as part of Sprint 28. Resolutions are recorded inline throughout the doc (marked "Locked 2026-06-01 (Decision N)") and in the Decisions Log (`06-roadmap-and-open-questions.md`).

| # | Question | Resolution |
|---|---|---|
| 1 | Henrik's quarters — retired or still a beat? | **RETIRED.** Henrik's Quarters as a playable location is retired. Photo/Erik identity surfaces through kitchen encounters (Ch6/Ch7). |
| 2 | art-checklist single vs. doubled Cinematic 6 | **RESOLVED.** Doubled 6a + 6b both Ch1 canonical. art-checklist patched. |
| 3 | Ch1 observation-deck treat | **Kvikk Lunsj** (Norwegian chocolate biscuit). |
| 4 | Sandy's taste-memory POV visual treatment | **Color-temperature wash** in chef's warm-amber spirit-signature. House pattern for all taste-memory POV shifts across chapters. |
| 5 | Ch6 port — Kolonodale canonical? | **Yes. Kolonodale, Central Sulawesi.** Bible updated. |
| 6 | Capuchin chapter | **Ch7.** Character sheet updated. |
| 7 | Karakoncolos eye-glow | **Cold-blue `#88a8c8`.** Character sheet updated. |
| 8 | Erik's birthday + photo-reveal chapter | **Erik's birthday: Ch7.** Henrik's-quarters-reveal retired. Erik recognized when Pip meets him in person (Ch7). |
| 9 | Erik's age in Cinematic 6b | **~11 years old — same age as Pip. Deliberate parallel.** art-checklist, character sheet, and this doc all updated. |
| 10 | Henrik gallery tag — Ch2/Ch3 cameos? | **Ch 1, 4–8 confirmed accurate.** Henrik has no scripted scene in Ch2 or Ch3 outlines. Current tag correct. |
| 11 | Tirta's surname / real-person reference | **Tirta is an original character, not a real-person reference. Female.** ch06 outline and character sheet updated. |
| 12 | Leida's specific village | **Käsmu** (Captain's Village, Lahemaa coast). ch02 outline updated. |
| 13 | Ch7 Brazilian port town | **Alter do Chão, Tapajós.** ch07 outline and this doc updated. |
| 14 | Ch6 banana leaves cross-chapter payoff | **Payoff is the Ch6 Tirta cooking beat itself.** Leftover leaves are ordinary inventory continuity — no required Ch7+ beat. |

---

## Cross-references

**How this doc relates to other design docs:**

- **`08-character-reference-sheets.md`** — The authoritative character visual spec (color signatures, silhouette tells, movement registers). This doc (Doc 10) does not duplicate that content — it places those characters in their chapter and setting context. Where this doc and Doc 08 conflict, Doc 08 takes precedence; flag conflicts to Julia.
- **`03-art-and-aesthetic.md`** — The authoritative style, palette, and register spec. This doc summarizes it but does not supersede it. The Style Anchors section above is a quick-reference only.
- **`art-checklist.md`** — The Ch1-specific asset status tracker. Updated in Sprint 28 to reflect the doubled Cinematic 6 structure, Erik's age, and Kvikk Lunsj observation-deck treat.
- **`visual-research-tracker.md`** — Per-chapter visual research table. This doc pulls from it for period/place details. That tracker is the place to log actual reference links and images when gathered.
- **`game/character-gallery.html`** — The canonical who-appears-in-which-chapter reference and the gallery of designed characters. Verify design decisions against the gallery as the canonical implemented source.
- **Chapter outlines (`ch01`–`ch08`)** — The narrative authority for each chapter. This doc distills their visual information; when the outlines have more detail, the outlines win.
