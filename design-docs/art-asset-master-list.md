# Art Asset Master List

*Sprint A — 2026-06-06. Canonical inventory of every art asset the game needs across all eight chapters. Source of truth for commissioning briefs, gallery scaffold work, and production tracking.*

---

## How to use this list

**ID scheme (locked):** `CH#-TYPE-##` where `TYPE` ∈ {`CHAR`, `ROOM`, `BG`, `PROP`} and `##` is a two-digit sequence within that chapter+type in beat-flow order.

**Cross-chapter rule (locked):** A multi-chapter asset appears once, under its first chapter, with an `also-appears:` line. Later chapters contain only a one-line pointer `(see CH#-TYPE-## Name — recurring)`. The Cross-Chapter Index at the end of this file lets you find any multi-chapter asset at a glance.

**Gallery reconciliation:** Every CHAR entry notes `gallery: existing` (already in the CHARACTERS array in `character-gallery.html`, whether or not it has a designed sprite) or `gallery: not-yet-present` (not in the array at all). `designed: true/false` status sourced from the CHARACTERS array.

---

## Chapter 1 — Cabin 646 (Bergen → open Atlantic)

### CH1 Characters

- **CH1-CHAR-01 — Pip.** Protagonist ghost; round bald dome, cool-white translucent, dark eye-dots, faint blush, three downward waves at base; also appears as warm human-boy in Register B memory cinematics (same face, human surround).
  source: ch01-cabin-646-outline.md (all beats); 08-character-reference-sheets.md §Pip; 12-character-pixel-anatomy.md §Pip's two faces.
  gallery: existing (designed: true). also-appears: Ch2, Ch3, Ch4, Ch5, Ch6, Ch7, Ch8.

- **CH1-CHAR-02 — Passenger.** Anonymous traveler; evening coat, white shirt-front, top hat, oblivious raised brows; walks through Pip in hallway Beat 2.
  source: ch01-cabin-646-outline.md (Beat 2); 08-character-reference-sheets.md §Passenger.
  gallery: existing (designed: true).

- **CH1-CHAR-03 — The Doctor.** Ship's physician; dark coat, cream shirt, medical bag with brass clasp; exits Cabin 646 in Beat 4 / 6 cabin-entry cinematic; Ch1 only.
  source: ch01-cabin-646-outline.md (Beat 6 cinematic); 08-character-reference-sheets.md §Doctor.
  gallery: existing (designed: true).

- **CH1-CHAR-04 — Babcia (Marta).** Pip's grandmother; red kerchief, dark coat, grief-sway, hands clasped or covering face; seated on bed in Grandparents' Cabin (Beat 6).
  source: ch01-cabin-646-outline.md (Beat 6); grandparents-cabin.md; 08-character-reference-sheets.md §Babcia.
  gallery: existing (designed: true). also-appears: Ch8.

- **CH1-CHAR-05 — Dziadek (Jan).** Pip's grandfather; deep-blue wool coat with cream quilted patches, flat cap, grey beard; stands back-to-camera at window in Grandparents' Cabin.
  source: ch01-cabin-646-outline.md (Beat 6); grandparents-cabin.md; 08-character-reference-sheets.md §Dziadek.
  gallery: existing (designed: true). also-appears: Ch8.

- **CH1-CHAR-06 — Janitor (J. Henriksen).** Ship's janitor; slate-blue uniform, work cap, brass name-tag; scripted walk through dark corridor Beat 8; weary bob.
  source: ch01-cabin-646-outline.md (Beat 8); dark-corridor.md; 08-character-reference-sheets.md §Janitor.
  gallery: existing (designed: true).

- **CH1-CHAR-07 — Echo-spiders.** Ch1 echo-creature; warm-amber translucent; 7px and 5px abdomen radii; floor skitterers + ceiling danglers on silk threads; dark corridor only.
  source: dark-corridor.md; ch01-cabin-646-outline.md (Beat 8); 08-character-reference-sheets.md §Echo-creatures (Ch1).
  gallery: existing (designed: true).

- **CH1-CHAR-08 — Erik (as young boy in Cinematic 6b).** Henrik's son; blond hair (#d8b860), blue eyes (#2a4878), fair skin, age 11, gap tooth; first appears in Cinematic 6b taste-memory (learning lefse from Henrik); later appears as ghost in Ch7.
  source: ch01-cabin-646-outline.md (Cinematic 6b); 06-roadmap-and-open-questions.md Decisions Log 2026-06-02 (Decision B/C); 08-character-reference-sheets.md §Erik.
  gallery: existing (designed: true; gallery chapterTag says 'Ch 7' — see Open Questions #7). also-appears: Ch4 (photograph only — see CH4-PROP-02), Ch6 (photograph — see CH4-PROP-02), Ch7 (ghost form; full appearance), Ch8 (referenced in memory chain).

- **CH1-CHAR-09 — Henrik.** Ship's head chef; tall toque, black button-up, amber-cream warmth; gray beard; can see Pip; kitchen Beats 9–13.
  source: ch01-cabin-646-outline.md (Beats 9–13); kitchen.md; 08-character-reference-sheets.md §Henrik.
  gallery: existing (designed: true). also-appears: Ch4 (kitchen end-beat), Ch5 (kitchen end-beat), Ch6 (kitchen end-beat), Ch7 (kitchen end-beat + reunion), Ch8 (memory chain / finale).

---

### CH1 Rooms

- **CH1-ROOM-01 — Main Hallway.** Passenger corridor; 1440px wide, scrolling; crimson runner carpet, 6 cabin doors (636–646), 3 portholes, 2 sconces, wall-decor set, luggage trolley; hub for all Ch1 beats.
  source: hallway.md; ch01-cabin-646-outline.md (Beats 1–2, 5, 7, 8, return passes).

- **CH1-ROOM-02 — Grandparents' Cabin (644).** Single-screen grief room; one bed, bedside lamp, four-pane window, open suitcase, photograph on nightstand; Babcia seated on bed, Dziadek at window; Beat 6.
  source: grandparents-cabin.md; ch01-cabin-646-outline.md (Beat 6).

- **CH1-ROOM-03 — Cabin 646 (Pip's cabin + collection room).** Single-screen 480px; mirror, porthole, child's crayon drawing, nightstand with Smørbukk, bed; collection items from all chapters accumulate here.
  source: cabin-646.md; ch01-cabin-646-outline.md (Beats 3–4, return visits).

- **CH1-ROOM-04 — Dark Corridor / Service Stairwell.** ~960px; service deck; broken sconce (puzzle target), janitor's cart, stairwell to kitchen; echo-spiders; two lighting states (pre-puzzle dark, post-puzzle dim-but-lit).
  source: dark-corridor.md; ch01-cabin-646-outline.md (Beat 8).

- **CH1-ROOM-05 — The Kitchen.** Henrik's working kitchen; ~960px; warm pendant light, counter with meal, Henrik's stool, hanging copper pots, freezer doorway, storage racks; Beats 9–13.
  source: kitchen.md; ch01-cabin-646-outline.md (Beats 9–13).
  also-appears: Ch4 (end-beat), Ch5 (end-beat), Ch6 (end-beat), Ch7 (end-beat + reunion), Ch8 (finale — familiar kitchen).

- **CH1-ROOM-06 — Observation Deck.** Aurora viewing room; ~700px; wide curved viewport, wooden benches, coiled rope, brass telescope; Beat 12.
  source: observation-deck.md; ch01-cabin-646-outline.md (Beat 12).

---

### CH1 Backgrounds

- **CH1-BG-01 — Ocean-at-night / Bergen approach.** Ship-window scenery; multi-layer (near-black sky, aurora-faint, seeded stars, fjord silhouettes, Bergen shore-light, lighthouse blink, swell); seen through all portholes and Grandparents' window simultaneously.
  source: hallway.md; grandparents-cabin.md; cabin-646.md; 06-roadmap-and-open-questions.md Sprint History (Sprints 42, 43).
  also-appears: Ch2–Ch7 (porthole/window content updates each chapter — each chapter's port scene is a distinct BG layer set over the same engine, listed under its chapter below).

---

### CH1 Props

- **CH1-PROP-01 — Bed + body-lump.** Cabin 646; two draw-states: pre-reveal (dark lump under covers) / post-reveal (sheet-lift animation, Pip's body visible); scripted timing.
  source: cabin-646.md; ch01-cabin-646-outline.md (Beat 3–4 cabin sequence).

- **CH1-PROP-02 — Child's crayon drawing.** Cabin 646 wall (x=160); boat-at-sea; inspectable; Beat 3 ambient detail.
  source: cabin-646.md.

- **CH1-PROP-03 — Cabin mirror.** Cabin 646 (x=280); dark wood + bronze frame, brass rivets; Cinematic 2 trigger; two states (normal / melt-in-progress).
  source: cabin-646.md; ch01-cabin-646-outline.md (Cinematic 2); 06-roadmap-and-open-questions.md Sprint History (Sprint 50/51 demo).

- **CH1-PROP-04 — Porthole assembly.** Brass ring with iron clasp, small circular glass; recurring ship prop — hallway (x=180, 600, 1050), cabin 646 (x=190); delivers ocean scenery via parallax engine.
  source: hallway.md; cabin-646.md; 06-roadmap-and-open-questions.md Sprint History (Sprint 42).
  also-appears: Ch2, Ch3, Ch4, Ch5, Ch6, Ch7 (ship traversal and kitchen rooms across all chapters).

- **CH1-PROP-05 — Grandparents' cabin window.** Four-pane wood-framed rectangular window (NOT a porthole); faces the sea; lit with warm-amber glow; delivers same parallax scenery as portholes.
  source: grandparents-cabin.md.

- **CH1-PROP-06 — Bedside lamp.** Grandparents' Cabin; trapezoid shade on stem; sole warm-amber light source in the room.
  source: grandparents-cabin.md.

- **CH1-PROP-07 — Open suitcase.** Grandparents' Cabin; horizontal, dark-brown body, brass latches, Pip's boat-shirt on top, stuffed bear visible; Beat 6 inspectable.
  source: grandparents-cabin.md; 06-roadmap-and-open-questions.md Sprint History (Sprint 48).

- **CH1-PROP-08 — Framed photograph of young Pip.** Grandparents' Cabin nightstand; Pip at age 6 holding a pierogi; inspectable.
  source: grandparents-cabin.md.

- **CH1-PROP-09 — Luggage trolley.** Hallway (x=530); stacked bags, grandparents' luggage, stuffed bear visible; Beat 5 ambient detail; inspectable.
  source: hallway.md; ch01-cabin-646-outline.md (Beat 5).

- **CH1-PROP-10 — Hallway wall decor set (5 pieces).** Ship photograph, barometer, botanical print, navigation map, ornate mirror; x≈230/435/650/865/1115; ambient inspectables.
  source: hallway.md.

- **CH1-PROP-11 — Hallway sconces (pair).** Brass wall sconces; x=390 (steady amber) and x=810 (flickers — Beat 8 foreshadow); warm floor light-pools.
  source: hallway.md.

- **CH1-PROP-12 — Bulletin board.** Hallway (x=130); cork board, brass frame, paper notices, red pins; "Welcome Aboard" itinerary; Beat 2 gated inspectable.
  source: hallway.md; 06-roadmap-and-open-questions.md Sprint History (Sprint 37).

- **CH1-PROP-13 — Broken sconce + exposed wiring.** Dark corridor (x≈420); electricity-ability puzzle target; hold-button mechanic; two states (broken / repaired).
  source: dark-corridor.md; ch01-cabin-646-outline.md (Beat 8 puzzle).

- **CH1-PROP-14 — Janitor's cart.** Dark corridor (x≈840); mop bucket, broom, supplies, clipboard with "J. Henriksen" name-tag; Skillingsboller treat hidden on cart shelf; Beat 8.
  source: dark-corridor.md; ch01-cabin-646-outline.md (Beat 8).

- **CH1-PROP-15 — Gravlaks-and-lefse plate.** Kitchen counter (x≈250); central Beat 9 prop; triggers Cinematic 6a/6b doubled taste-memory.
  source: kitchen.md; ch01-cabin-646-outline.md (Beat 9, Cinematics 6a and 6b).

- **CH1-PROP-16 — Henrik's stool.** Kitchen (x≈400); conversational anchor for Beats 10–11c.
  source: kitchen.md.

- **CH1-PROP-17 — Candle (Henrik's gift).** Small wax candle; handed to Pip in Beat 13; carried as inventory item through Ch2 and Ch3; used in Ch4 puzzle.
  source: ch01-cabin-646-outline.md (Beat 13); ch04-turkiye-outline.md.
  also-appears: Ch4 (Karakoncolos puzzle — lit with CH3-PROP-04 Matches).

- **CH1-PROP-18 — Aurora viewport frame.** Observation Deck; wide curved window with dark-wood mullions and brass fittings; aurora visible beyond; Beat 12.
  source: observation-deck.md.

- **CH1-PROP-19 — Brass telescope.** Observation Deck (x=540); on tripod; inspectable ambient prop.
  source: observation-deck.md.

- **CH1-PROP-20 — Smørbukk treat.** Cabin 646 nightstand (x=332); Norwegian caramel-chocolate bar; Ch1 replay-reward collectible.
  source: cabin-646.md; ch01-cabin-646-outline.md (Treats).

- **CH1-PROP-21 — Skillingsboller treat.** Janitor's cart in dark corridor (x≈840); Norwegian cinnamon bun; Beat 8 collectible.
  source: dark-corridor.md; ch01-cabin-646-outline.md (Treats).

- **CH1-PROP-22 — Bamsemums treat.** Kitchen (x≈520); Norwegian marshmallow-chocolate snack; teaches the collect verb; Beat 9.
  source: kitchen.md; ch01-cabin-646-outline.md (Treats).

- **CH1-PROP-23 — Kvikk Lunsj treat.** Observation Deck (x=565); Norwegian wafer bar, red wrapper with gold foil stripe; Ch1's final treat.
  source: observation-deck.md; ch01-cabin-646-outline.md (Treats); 06-roadmap-and-open-questions.md Sprint History (Sprint 27 Decision 3).

---

## Chapter 2 — A Cat, a Pan, a Promise (Käsmu, Estonia)

### CH2 Characters

- **CH2-CHAR-01 — Pätu.** Estonian stray cat; compact, striped ginger-and-cream, amber eyes; introduced when Pip disembarks; meows clues; Ch2 is her debut.
  source: ch02-tallinn-outline.md; 08-character-reference-sheets.md §Pätu.
  gallery: existing (designed: true). also-appears: Ch3, Ch4, Ch5, Ch6, Ch7, Ch8.

- **CH2-CHAR-02 — Haldjas.** Estonian house-spirit; manifests as warm gold-amber sparkle cluster; Ch2 monster/puzzle encounter; sincerity test.
  source: ch02-tallinn-outline.md; 08-character-reference-sheets.md §Haldjas.
  gallery: existing (designed: true — ported R03, `drawHaldjas`, 2026-07-10). colorSig: warm gold-amber sparkles.

- **CH2-CHAR-03 — Leida.** Estonian grandmother chef; small and quick, practical apron, silver hair, kind creased face; Käsmu cottage kitchen.
  source: ch02-tallinn-outline.md; 08-character-reference-sheets.md §Leida.
  gallery: existing (designed: true — ported R03, `drawLeida`, 2026-07-10).

- **CH2-CHAR-04 — Echo-mice.** Ch2 echo-creature; warm-amber translucent; lower-deck traversal.
  source: ch02-tallinn-outline.md (Traversal beat); 08-character-reference-sheets.md §Echo-creatures (Ch2).
  gallery: existing (designed: false) — listed as `ambient-vermin`, chapterTag: 'Ch 2, 5, 8'.

---

### CH2 Rooms

- **CH2-ROOM-01 — The Mnemosyne lower decks (Ch2 traversal).** Narrow brass corridor; echo-mice; wordless, darker and more cramped than the passenger hallway; leads from ship to Ch2 port.
  source: ch02-tallinn-outline.md (Traversal beat).

- **CH2-ROOM-02 — Leida's cottage kitchen.** Käsmu, Estonia; wood-burning stove, pine table and chairs, herbs hanging overhead, cast-iron pan (lost and found); warm and sparse.
  source: ch02-tallinn-outline.md (Chef encounter).

---

### CH2 Backgrounds

- **CH2-BG-01 — Käsmu harbor approach.** Small Estonian coastal village; slate dock, wooden buildings, birch trees; evening light on calm water.
  source: ch02-tallinn-outline.md.

---

### CH2 Props

- **CH2-PROP-01 — Leida's cast-iron pan.** Heavy, dark, worn handle; the lost-and-found central prop; puzzle object; Ch2 pan-search arc.
  source: ch02-tallinn-outline.md (pan-search puzzle).

- **CH2-PROP-02 — Haldjas's three sincerity doors.** Non-architectural puzzle space; three low wooden doors in an impossible arrangement; Haldjas encounter.
  source: ch02-tallinn-outline.md (Haldjas puzzle).

- **CH2-PROP-03 — Leida's offering altar.** Flat stone, worn wooden bowl, faded ribbon; placed outside the cottage door; ambient world-building prop.
  source: ch02-tallinn-outline.md.

---

## Chapter 3 — A Scotsman's Red Curry (Southampton)

### CH3 Characters

- **CH3-CHAR-01 — Sandy Dundee (ghost).** Scottish ghost-chef; YoYo Games hoodie (identity marker), tall, kind, freckled; structural inversion — the ghost is the chef rather than the monster.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Sandy.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-02 — Caitlin.** Sandy's wife; center-of-gravity presence; warm and sharp; Dundee kitchen.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Caitlin.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-03 — Robert.** Sandy's eldest son; tall, muscular, brown hair; Dundee kitchen.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Robert.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-04 — Archie.** Sandy's second son; tall, skinny, brown hair; "almost-sees Sandy" beat.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Archie.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-05 — Max.** Sandy's son; shorter, brown hair; Dundee kitchen background figure.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Max.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-06 — Gus.** Sandy's son; shorter, brown hair; Dundee kitchen background figure.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Gus.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-07 — Bibi.** Sandy's youngest daughter; long light-brown hair; Pip's approximate age; most receptive to Sandy's presence.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Bibi.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-08 — Edie.** Old Cockney ghost; pier wine shop; apron, headscarf, brass-buttoned cardigan; gives Pip a bottle and a cryptic line.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Edie.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-09 — Michel.** French dinner guest at the Dundee table; warm dark eyes; brief warm presence; Ch3 only.
  source: ch03-southampton-outline.md.
  gallery: existing (designed: true — authored R03, 2026-07-10). (No physical description beyond "French man" — see Open Questions #3.)

- **CH3-CHAR-10 — Michel's wife.** Dinner guest; brunette; brief warm presence; Ch3 only.
  source: ch03-southampton-outline.md.
  gallery: existing (designed: true — authored R03, 2026-07-10). (Minimal description — see Open Questions #3.)

- **CH3-CHAR-11 — Black Shuck.** Suffolk ghost-dog; massive, omen-of-death silhouette; dark, low-slung, red-eyed; Ch3 monster.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Black Shuck.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-12 — Echo-fish (three species).** Ch3 echo-creature (lower deck); warm-amber translucent; cod, haddock, and plaice variants.
  source: ch03-southampton-outline.md (Traversal beat); 08-character-reference-sheets.md §Echo-creatures (Ch3).
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH3-CHAR-13 — Echo-deer.** Ch3 echo-creature (street traversal, not lower deck); warm-amber translucent; Bevois Street, Southampton.
  source: ch03-southampton-outline.md (street traversal); 08-character-reference-sheets.md §Echo-creatures (Ch3).
  gallery: existing (designed: true — ported R03, 2026-07-10).

---

### CH3 Rooms

- **CH3-ROOM-01 — The Mnemosyne lower decks (Ch3 traversal).** Cramped corridor; crimson carpet, echo-fish drifting along walls and floor; feels submerged.
  source: ch03-southampton-outline.md (Traversal beat).

- **CH3-ROOM-02 — The Dundee kitchen.** Warm, large; pine table seating 9; Sandy's chair at the head; wood-burning Aga range; family gathered.
  source: ch03-southampton-outline.md (Chef encounter).

---

### CH3 Backgrounds

- **CH3-BG-01 — Southampton dockyard at night.** Slate-blue; industrial cranes, single streetlamp pool, harbor water; port approach.
  source: ch03-southampton-outline.md.

- **CH3-BG-02 — Bevois Street approach.** Residential Southampton street; amber glow from the Dundee kitchen window at far end; echo-deer on pavement.
  source: ch03-southampton-outline.md.

- **CH3-BG-03 — Edie's pier wine shop.** Small shopfront on the harbor pier; Edie's ghost-translucent silhouette behind the counter.
  source: ch03-southampton-outline.md.

---

### CH3 Props

- **CH3-PROP-01 — Sandy's YoYo Games hoodie.** Draped on his kitchen chair; primary identity cue for Sandy's presence even when he isn't drawn; Ch3 throughout.
  source: ch03-southampton-outline.md; 08-character-reference-sheets.md §Sandy.

- **CH3-PROP-02 — Sandy's handwritten recipe card.** On the Dundee kitchen counter; central prop for the chef encounter arc.
  source: ch03-southampton-outline.md.

- **CH3-PROP-03 — Wine bottle (Edie's gift).** Given to Pip by Edie; distraction/offering prop for the Black Shuck puzzle.
  source: ch03-southampton-outline.md.

- **CH3-PROP-04 — Matches (collected via Pätu).** Pätu meows near a harbor newsstand; Pip collects a box of matches; load-bearing for Ch4 candle-lighting and Ch7 dock puzzle.
  source: ch03-southampton-outline.md (end of chapter).
  also-appears: Ch4 (Karakoncolos puzzle — used with CH1-PROP-17 Candle), Ch7 (Boitatá puzzle).

---

## Chapter 4 — Muhittin's Muhammara (Istanbul)

### CH4 Characters

- **CH4-CHAR-01 — Karakoncolos.** Turkish winter-spirit; dark-furred, cold breath, cold-blue eye-glow; haunts a frozen square; Ch4 monster.
  source: ch04-turkiye-outline.md; 08-character-reference-sheets.md §Karakoncolos.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH4-CHAR-02 — Muhittin.** Turkish chef; late 20s, warm, curious, short dark hair; house kitchen in Istanbul.
  source: ch04-turkiye-outline.md; 08-character-reference-sheets.md §Muhittin.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH4-CHAR-03 — Omer.** Muhittin's brother; tennis-casual dress; appears in taste-memory walnut-orchard scene.
  source: ch04-turkiye-outline.md; 08-character-reference-sheets.md §Omer.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH4-CHAR-04 — Brian.** Omer's American friend; taste-memory walnut scene.
  source: ch04-turkiye-outline.md; 08-character-reference-sheets.md §Brian.
  gallery: existing (designed: true — ported R03, 2026-07-10).

- **CH4-CHAR-05 — Muhittin's grandmother (taste-memory).** Elderly woman; walnut orchard, late autumn; watches two boys test walnuts; no physical description beyond "grandmother."
  source: ch04-turkiye-outline.md (taste-memory beat).
  gallery: not-yet-present. (Taste-memory only — see Open Questions #4.)

- **CH4-CHAR-06 — Echo-cats.** Ch4 echo-creature; stray cats; warm-amber translucent; Ch4 stray-cat alley traversal.
  source: ch04-turkiye-outline.md (Traversal beat); 08-character-reference-sheets.md §Echo-creatures (Ch4).
  gallery: existing (designed: true — ported R03, 2026-07-10).

---

### CH4 Rooms

- **CH4-ROOM-01 — Stray-cat alley (Ch4 traversal).** Narrow Istanbul cobble passage; echo-cats on walls, ledges, doorways; dim lamplight at far end; humid cold night.
  source: ch04-turkiye-outline.md (Traversal / stray-cat section).

- **CH4-ROOM-02 — Muhittin's kitchen.** Low-ceilinged Istanbul house interior; wood-fired oven, long table, copper pots, heavy mortar; warm amber light.
  source: ch04-turkiye-outline.md (Chef encounter).

---

### CH4 Backgrounds

- **CH4-BG-01 — Istanbul harbor approach at night.** Narrow stone streets, cold winter night; city lights reflected on water; slate-blue with ember-red shadows.
  source: ch04-turkiye-outline.md.

- **CH4-BG-02 — Frozen square (monster arena).** Cobblestones, dying brazier, frozen fountain; the Karakoncolos encounter space; cold and still.
  source: ch04-turkiye-outline.md (monster encounter).

- **CH4-BG-03 — Walnut orchard (taste-memory).** Autumn Turkish rural scene; two boys among walnut trees; warm amber memory light.
  source: ch04-turkiye-outline.md (Muhittin's grandmother taste-memory).

---

### CH4 Props

*(see CH1-PROP-17 Candle and CH3-PROP-04 Matches — both used in Ch4 Karakoncolos puzzle)*

- **CH4-PROP-01 — Leather pouch of walnuts.** Dropped by Karakoncolos on resolution; becomes the muhammara ingredient; puzzle-resolution object.
  source: ch04-turkiye-outline.md.

- **CH4-PROP-02 — Photograph of young Erik (first plant).** Henrik's pocket photograph; glimpsed by Pip at Ch4 end; blond boy, age 11; Henrik quickly pockets it; revelation deferred to Ch6.
  source: ch04-turkiye-outline.md (Henrik reveal beat); 06-roadmap-and-open-questions.md Decisions Log 2026-06-02 (Decision B/C).
  also-appears: Ch6 (Pip sees it longer — sliding off counter), Ch7 (reunion beat — warm under Pip's hand after memory-gifting).

- **CH4-PROP-03 — Muhittin's grandfather's mortar.** Old worn stone mortar and pestle; central to the muhammara taste-memory; heirloom object.
  source: ch04-turkiye-outline.md.

---

## Chapter 5 — A Stew for the Crew (Saldanha Bay, South Africa)

*Note: Ch5 has a structural twist — the ship-side Iris/Mamlambo beat occurs BEFORE the port visit, making the lower-deck storage room the chapter's opening space.*

### CH5 Characters

- **CH5-CHAR-01 — Iris.** Edwardian child ghost; ~10 years old; near-white pale hair (faint cool shadow), sea-green-blue eyes (#88b8b0); squeeze-and-pop entrance through floorboards; wet then shakes dry; from The Lethe (wreck c. 1905–1912).
  source: ch05-south-africa-outline.md; 01-story-bible.md (Iris lore); 08-character-reference-sheets.md §Iris; 12-character-pixel-anatomy.md §Iris forward note.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH5-CHAR-02 — Iris's family (dining room cinematic).** Edwardian father, mother, siblings at formal dining table; taste-memory; multiple unnamed figures.
  source: ch05-south-africa-outline.md (Iris's unfinished meal memory).
  gallery: not-yet-present. (Taste-memory; multiple unnamed figures — see Open Questions #5.)

- **CH5-CHAR-03 — Mamlambo.** South African water-serpent; massive; blood-iron coils; cold blue eye visible through porthole; Ch5 monster.
  source: ch05-south-africa-outline.md; 08-character-reference-sheets.md §Mamlambo.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH5-CHAR-04 — Johannes Delport.** Afrikaner chef; older, broad, bearded, jolly; Saldanha Bay courtyard kitchen; potjie master.
  source: ch05-south-africa-outline.md; 08-character-reference-sheets.md §Johannes.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH5-CHAR-05 — Johannes's parents (taste-memory).** Young Afrikaner couple tending a courtyard fire; taste-memory of potjie origins; no physical descriptions in outline.
  source: ch05-south-africa-outline.md (Johannes taste-memory).
  gallery: not-yet-present. (Taste-memory only — see Open Questions #4.)

- **CH5-CHAR-06 — Echo-rats.** Ch5 echo-creature; stalled ship lower decks; warm-amber translucent.
  source: ch05-south-africa-outline.md (Traversal beat); 08-character-reference-sheets.md §Echo-creatures (Ch5).
  gallery: existing (designed: true — ported R04, 2026-07-10) — listed as `ambient-vermin`, chapterTag: 'Ch 2, 5, 8'.

---

### CH5 Rooms

- **CH5-ROOM-01 — Lower-deck storage room (Ch5 — "the Drowned Room").** Old floorboards, wood crates, single porthole; Iris's squeeze-and-pop entrance; Mamlambo's eye at porthole; ship at-sea, no port yet.
  source: ch05-south-africa-outline.md; 01-story-bible.md (Ch5 structural twist note).

- **CH5-ROOM-02 — Johannes's courtyard + kitchen.** Saldanha Bay; open-air potjie fire, cast-iron pot on three legs, courtyard table set for friends; warm dusk light.
  source: ch05-south-africa-outline.md (Chef encounter).

---

### CH5 Backgrounds

- **CH5-BG-01 — Saldanha Bay harbor at dusk.** Atlantic sky; deep red-ochre light; Johannes's courtyard fire visible in middle distance; dramatic color contrast.
  source: ch05-south-africa-outline.md.

- **CH5-BG-02 — Iris's Lethe dining room (taste-memory).** Edwardian formal dining; long white-tablecloth table, candelabra, family in formal dress; warm-amber light slightly warped by time/water.
  source: ch05-south-africa-outline.md (Iris memory beat).

---

### CH5 Props

- **CH5-PROP-01 — Father's switchblade.** Mother-of-pearl handle, Edwardian; given to Pip by Iris; for cutting rope or cord; load-bearing for Ch6 puzzle.
  source: ch05-south-africa-outline.md.
  also-appears: Ch6 (used in Pocong puzzle), Ch7 (carried — not used), Ch8 (carried through finale).

- **CH5-PROP-02 — Plate of brussels sprouts (Iris's unfinished meal).** Half-eaten, held-in-time, slightly waterlogged; Pip eats them for Iris so she can move on.
  source: ch05-south-africa-outline.md; 01-story-bible.md (Iris lore).

- **CH5-PROP-03 — Cast-iron potjie (three-legged pot).** Johannes's outdoor kitchen; large blackened pot on three splayed legs over open fire; central cooking prop.
  source: ch05-south-africa-outline.md.

---

## Chapter 6 — A Knot of Banana Leaves (Kolonodale, Central Sulawesi)

### CH6 Characters

- **CH6-CHAR-01 — Pocong.** Bound burial-shroud spirit; white, three knotted points at feet; shuffles; dark-memory infection mechanic (Ch8 payoff); cooperative resolution (not defeated — released).
  source: ch06-indonesia-outline.md; 08-character-reference-sheets.md §Pocong.
  gallery: existing (designed: true).

- **CH6-CHAR-02 — Tirta.** Young Indonesian chef; Kolonodale; fast-talking, funny; warung (open-front food stall); original character, NOT a real-person reference.
  source: ch06-indonesia-outline.md; 08-character-reference-sheets.md §Tirta.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH6-CHAR-03 — Tirta's grandmother (taste-memory).** Elderly Indonesian woman; wrapping lemper in banana leaves by lamplight; warm and precise; no physical description beyond "grandmother."
  source: ch06-indonesia-outline.md (taste-memory beat).
  gallery: not-yet-present. (Taste-memory only — see Open Questions #4.)

- **CH6-CHAR-04 — Echo-tarsiers.** Ch6 echo-creature; huge round eyes, clinging posture; ceiling, pipes, and beams; warm-amber translucent.
  source: ch06-indonesia-outline.md (Traversal beat); 08-character-reference-sheets.md §Echo-creatures (Ch6).
  gallery: existing (designed: true — ported R04, 2026-07-10).

---

### CH6 Rooms

- **CH6-ROOM-01 — The Mnemosyne lower decks (Ch6 traversal).** Humid, warm; echo-tarsiers on overhead structures; clove-and-salt smell implied.
  source: ch06-indonesia-outline.md (Traversal beat).

- **CH6-ROOM-02 — Tirta's warung.** Open-front Indonesian food stall; charcoal grill, iron pan, thatched roof overhang; warm evening light.
  source: ch06-indonesia-outline.md (Chef encounter).

---

### CH6 Backgrounds

- **CH6-BG-01 — Kolonodale port approach.** Wooden stilt-houses over water, coconut palms, blue-green bay; clove-smoke haze; late afternoon orange light.
  source: ch06-indonesia-outline.md.

- **CH6-BG-02 — Banana grove clearing with graves.** Forest path from dock to town; large-leaved banana trees, grave markers, blue-dusk light; Pocong encounter space.
  source: ch06-indonesia-outline.md (Pocong encounter).

---

### CH6 Props

*(see CH5-PROP-01 Switchblade — used in Ch6 puzzle; see CH4-PROP-02 Erik photograph — second encounter in Ch6)*

- **CH6-PROP-01 — Banana leaves (Pocong's gift).** Stack of large fresh banana leaves; given to Pip after Pocong's cooperative resolution; used in lemper cooking; partially carried forward to Ch7 kitchen.
  source: ch06-indonesia-outline.md.
  also-appears: Ch7 (kitchen beat — Henrik receives leaves from Pip).

---

## Chapter 7 — A Stew for the Smoke-Child (Alter do Chão, Tapajós, Brazil)

### CH7 Characters

- **CH7-CHAR-01 — Boitatá.** Brazilian fire-serpent; fire-amber flickering body; rises from the river on dock approach; Ch7 monster.
  source: ch07-brazil-outline.md; 08-character-reference-sheets.md §Boitatá.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH7-CHAR-02 — Capuchin.** Small brown monkey; bright-eyed, alive (NOT an echo-creature); forest-path guide between dock and Joana/Beatriz's house.
  source: ch07-brazil-outline.md; 08-character-reference-sheets.md §Capuchin.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH7-CHAR-03 — Joana.** Brazilian chef; 60s, gray-streaked hair, apron, deep forest-knowledge; stilt house on the Tapajós.
  source: ch07-brazil-outline.md; 08-character-reference-sheets.md §Joana.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH7-CHAR-04 — Beatriz.** Brazilian chef; Joana's partner; faded cotton dress, apron; stilt house kitchen.
  source: ch07-brazil-outline.md; 08-character-reference-sheets.md §Beatriz.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH7-CHAR-05 — Echo-mosquitoes.** Ch7 echo-creature; small, warm-amber translucent; lower-deck + dock traversal.
  source: ch07-brazil-outline.md (Traversal beat); 08-character-reference-sheets.md §Echo-creatures (Ch7).
  gallery: existing (designed: false).

- **CH7-CHAR-06 — Generational moqueca figures (taste-memory chain).** Multiple unnamed cooks across Brazilian communities, generations, and families; elaborate cinematic sequence; Ch7's most complex taste-memory.
  source: ch07-brazil-outline.md (Joana/Beatriz taste-memory).
  gallery: not-yet-present. (Taste-memory; no individual descriptions — see Open Questions #6.)

*(see CH1-CHAR-08 Erik — ghost form first full appearance is Ch7; also-appears noted under CH1-CHAR-08)*

---

### CH7 Rooms

- **CH7-ROOM-01 — The Mnemosyne lower decks (Ch7 traversal).** Warm, humid; echo-mosquitoes; Amazon heat begins here.
  source: ch07-brazil-outline.md (Traversal beat).

- **CH7-ROOM-02 — Joana and Beatriz's stilt house.** Raised on wooden piles; clay tile roof; single open-plan kitchen + living space; dock-side extension over the Tapajós river.
  source: ch07-brazil-outline.md (Chef encounter).

---

### CH7 Backgrounds

- **CH7-BG-01 — Alter do Chão dock at night.** Small wooden dock; Tapajós river black and wide; forest wall beginning at the edge of the light; phosphorescent underglow.
  source: ch07-brazil-outline.md.

- **CH7-BG-02 — Ch7 forest path.** Dense Amazon canopy; phosphorescent fungi on roots and bark; deep humid dark; Capuchin scampers ahead; Boitatá encounter space.
  source: ch07-brazil-outline.md.

---

### CH7 Props

*(see CH3-PROP-04 Matches — used in Ch7 dock puzzle to summon/provoke Boitatá; see CH5-PROP-01 Switchblade — still in inventory)*

- **CH7-PROP-01 — Clay moqueca pot.** Joana/Beatriz kitchen; wide, terracotta, with lid; central cooking prop for the moqueca recipe.
  source: ch07-brazil-outline.md.

*(see CH4-PROP-02 Erik photograph — third and final encounter in Ch7; warm to the touch after memory-gifting)*

---

## Chapter 8 — A Perfect Last Bite (Greenpoint, Brooklyn)

### CH8 Characters

- **CH8-CHAR-01 — The Shadow.** Pip's grief made physical; blood-iron coloring, knotted black wire silhouette, TV-channel memory-flickers embedded in its body; three-phase encounter (Pong → Riddle of Chefs → Completing the Infection).
  source: ch08-greenpoint-outline.md; 01-story-bible.md §Ch8; 08-character-reference-sheets.md §Shadow.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH8-CHAR-02 — Pip's mother.** Ch8 veil-crossing; young Polish-American woman; warm knit sweater; appears briefly as Pip confronts the Shadow.
  source: ch08-greenpoint-outline.md; 01-story-bible.md (Pip's parents lore).
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH8-CHAR-03 — Pip's father.** Ch8 veil-crossing; brown hair, wool sweater; brief appearance alongside Pip's mother.
  source: ch08-greenpoint-outline.md; 01-story-bible.md.
  gallery: existing (designed: true — ported R04, 2026-07-10).

- **CH8-CHAR-04 — Urban vermin.** Ch8 Greenpoint street echo-creature; cockroaches, bedbugs, rats, and comedy turkey; warm-amber translucent.
  source: ch08-greenpoint-outline.md; 08-character-reference-sheets.md §Echo-creatures (Ch8).
  gallery: existing (designed: false) — listed as `ambient-vermin`, chapterTag: 'Ch 2, 5, 8'.

*(see CH1-CHAR-04 Babcia and CH1-CHAR-05 Dziadek — appear in Ch8 finale)*
*(see CH1-CHAR-08 Erik — referenced in memory chain / Ch8 emotional climax)*

---

### CH8 Rooms

- **CH8-ROOM-01 — Greenpoint streets (Ch8 traversal).** Brooklyn at night; narrow residential streets, brownstones, corner bodegas; urban vermin; Ch8 opening.
  source: ch08-greenpoint-outline.md.

- **CH8-ROOM-02 — Pip's apartment kitchen ("the bottom of the well").** Childhood kitchen; long table with all six chairs; site of Phase 3 (Completing the Infection) and the final pierogi-table memory; emotional climax space.
  source: ch08-greenpoint-outline.md; 01-story-bible.md (Pip's parents / bottom-of-well).

- **CH8-ROOM-03 — Babcia and Dziadek's Greenpoint apartment.** The grandparents' home; familiar domestic space; final gift of memory-gifting to both grandparents; pierogi kitchen.
  source: ch08-greenpoint-outline.md.

---

### CH8 Backgrounds

- **CH8-BG-01 — Brooklyn / Greenpoint night.** Brownstone neighborhood; warm window-light against cold street; autumn or late night; Pip's real home, now seen as a ghost.
  source: ch08-greenpoint-outline.md.

---

### CH8 Props

- **CH8-PROP-01 — Pong paddles + ball (Phase 1).** Shadow's first phase mechanic; minimal flat paddles, bouncing pixel; the game-within-the-game visual register.
  source: ch08-greenpoint-outline.md (Phase 1: Pong).

- **CH8-PROP-02 — Kitchen table with all six chairs.** The bottom-of-the-well memory; long table, pierogi plate at center; six chairs for Pip, parents, grandparents, and one empty for Erik; narrative climax prop.
  source: ch08-greenpoint-outline.md; 01-story-bible.md (Pip's parents — all six chairs).

---

## Cross-Chapter Index

All assets with `also-appears` notes, sorted by ID. Full chapter list in each row.

| ID | Name | Chapters |
|---|---|---|
| CH1-CHAR-01 | Pip | Ch1, Ch2, Ch3, Ch4, Ch5, Ch6, Ch7, Ch8 |
| CH1-CHAR-04 | Babcia (Marta) | Ch1, Ch8 |
| CH1-CHAR-05 | Dziadek (Jan) | Ch1, Ch8 |
| CH1-CHAR-08 | Erik (young boy in Cin.6b / Ch7 ghost) | Ch1, Ch4 (photo), Ch6 (photo), Ch7 (ghost, full), Ch8 (memory chain) |
| CH1-CHAR-09 | Henrik | Ch1, Ch4, Ch5, Ch6, Ch7, Ch8 |
| CH1-PROP-04 | Porthole assembly | Ch1, Ch2, Ch3, Ch4, Ch5, Ch6, Ch7 |
| CH1-PROP-17 | Candle (Henrik's gift) | Ch1 (received), Ch4 (used with matches) |
| CH1-ROOM-05 | The Kitchen | Ch1, Ch4, Ch5, Ch6, Ch7, Ch8 |
| CH2-CHAR-01 | Pätu | Ch2, Ch3, Ch4, Ch5, Ch6, Ch7, Ch8 |
| CH3-PROP-04 | Matches (collected via Pätu) | Ch3 (collected), Ch4 (used), Ch7 (used) |
| CH4-PROP-02 | Photograph of young Erik | Ch4 (first plant), Ch6 (second plant), Ch7 (reunion) |
| CH5-PROP-01 | Father's switchblade | Ch5 (received), Ch6 (used), Ch7 (carried), Ch8 (carried) |
| CH6-PROP-01 | Banana leaves | Ch6 (received), Ch7 (delivered to Henrik) |

---

## Coverage Notes and Open Questions

*Discrepancies, underspecified assets, and items needing a commissioning decision before the next sprint (Gallery Scaffold).*

---

**OQ-A-01 — Echo-creature roster: Ch1 discrepancy in story bible.**
`01-story-bible.md` lists "echo-mice" under Chapter 1. All room-level docs (`dark-corridor.md`, `ch01-cabin-646-outline.md`) and Sprint 41's explicit roster patch confirm **echo-spiders** for Ch1 and echo-mice for Ch2. Per the bible's own stated rule (outlines beat the bible when they conflict), echo-spiders for Ch1 is canonical. The bible entry appears stale. Flagging for Julia: should the bible be corrected?

**OQ-A-02 — Erik gallery `colorSig` does not match Decision B.**
Gallery CHARACTERS array has Erik with `colorSig: 'warm-amber glow / dark hair'`. Decision B (2026-06-02, locked in 06-roadmap-and-open-questions.md) locks his hair as **blond (#d8b860)** with blue eyes (#2a4878). Sprint 34 corrected `game/index.html` and the gallery draw function, but the data-object `colorSig` field in `character-gallery.html` was not updated. Needs a one-line data fix in the gallery.

**OQ-A-03 — Michel and Michel's wife: no gallery entries, minimal descriptions.**
CH3-CHAR-09 and CH3-CHAR-10 are not in the gallery CHARACTERS array. Description in `ch03-southampton-outline.md`: "French man" and "brunette" — not enough for a commissioning brief. Decide: are they full distinct characters (need gallery entries + sprite briefs) or are they background presence only (can be silhouetted figures at the table)?

**OQ-A-04 — Taste-memory-only characters: design intent unresolved.**
Four characters appear only in taste-memory cinematics with no physical descriptions in the outlines:
- CH4-CHAR-05 — Muhittin's grandmother
- CH5-CHAR-05 — Johannes's parents (a couple)
- CH6-CHAR-03 — Tirta's grandmother
Should these be: (a) fully designed Register B face sprites, (b) impressionistic silhouette figures, or (c) kept off-canvas entirely (implied by sound/narration)? This decision gates commissioning briefs for all four.

**OQ-A-05 — Iris's Lethe dining room: multiple unnamed figures.**
CH5-CHAR-02 is a group of Edwardian family members at a dining table. No individual names or descriptions. These need either: (a) a full ensemble of distinct character designs, or (b) a "crowd-silhouette" approach. The dining room is the taste-memory that motivates the whole Iris arc — it likely needs more design specificity.

**OQ-A-06 — Ch7 generational moqueca taste-memory: most complex cinematic.**
CH7-CHAR-06 is described as a chain of multiple unnamed cooks across generations. This is the game's most elaborate taste-memory sequence (multiple cuts, multiple time periods, multiple people). No individual figures are described. Needs a dedicated design brief before any commission work. How many distinct figures? What time periods? What visual treatment unifies the chain?

**OQ-A-07 — Erik gallery `chapterTag` says 'Ch 7'; first appearance is Ch1.**
Per the cross-chapter first-appearance rule, Erik's CHAR entry is filed under Ch1 (he appears in Cinematic 6b as the young boy learning lefse). The gallery's `chapterTag: 'Ch 7'` reflects the original design intent (his "primary" chapter as a named presence) but conflicts with the master list rule. This is purely a gallery metadata question — the canonical design hasn't changed. Flagging so the Gallery Scaffold sprint can decide whether to update the chapterTag.

**OQ-A-08 — Capuchin gallery section miscategorization.**
Gallery lists capuchin under "Echo Creatures" (echoes section, `chapterTag: 'Ch 7'`). Sprint 14.5 explicitly reclassified the capuchin as a living animal (not an echo-creature) in the sprint notes, but the gallery still categorizes it in the echoes section. Needs reclassification in the gallery array before the Gallery Scaffold sprint extends the section structure.

**OQ-A-09 — Recurring lower-deck corridor: visual differentiation underspecified.**
CH2-ROOM-01 through CH7-ROOM-01 are all listed as "The Mnemosyne lower decks (Ch# traversal)." Ch3 gets one visual detail (crimson carpet); Ch1's dark corridor has its own room doc. Chs 2, 4, 5, 6, and 7 traversal corridors are named but not described beyond their echo-creatures. Decide: does each traversal get a distinct look (different flooring, different wall texture, different ambient detail), or do they share a base template that the echo-creature swaps out? This affects how many distinct ROOM designs need commissioning briefs.

**OQ-A-10 — Ch8 Shadow: three visual phases, no room doc.**
CH8-CHAR-01 has three distinct encounter phases (Pong, Riddle of Chefs, Completing the Infection). Each phase likely requires a distinct visual state of the Shadow. No room doc exists for Ch8's "bottom of the well" encounter space. This is the game's finale — it needs dedicated design before any commission work begins.

**OQ-A-11 — Sandy Dundee: ghost appearance vs. memory appearance.**
CH3-CHAR-01 is "Sandy's ghost." The outline implies a taste-memory that shows Sandy alive (in his kitchen, cooking). His ghost appearance and his alive-memory appearance are likely distinct visual states. The gallery entry ('sandy-ghost') covers the ghost form. Does a "Sandy-alive" form need a separate commissioning brief, or does it count as the same CHAR?

**OQ-A-12 — Sandy's family: Max and Gus share the same description.**
CH3-CHAR-05 and CH3-CHAR-06 are both described as "shorter, brown hair." No other distinguishing features given. They are brothers and need to read as distinct individuals in the Dundee kitchen ensemble. Needs additional distinguishing detail before commission.

**OQ-A-13 — Ambient-vermin gallery entry covers three chapters' echo-creatures.**
The gallery's `ambient-vermin` entry is tagged 'Ch 2, 5, 8' and covers echo-mice, echo-rats, and urban vermin (cockroaches/bedbugs/rats/turkey). These are meaningfully different animals for three different chapters. The Gallery Scaffold sprint should decide whether to split them into three separate entries or keep them consolidated under one multi-chapter entry.

**OQ-A-14 — Henrik in Ch8: visual state and role underspecified.**
CH1-CHAR-09 Henrik appears in Ch8 (he is one of the seven "chefs" Pip must invoke in Phase 2 of the Shadow encounter — the Riddle of Chefs). His exact visual form in the Ch8 climactic space (present-day elderly Henrik? his younger self in the taste-memory register? both?) is not described in `ch08-greenpoint-outline.md`. Needs clarification before any Ch8 commission work.

---

*End of Sprint A art asset audit. 8 chapters, 91 total asset entries (before any expansion from Open Questions). No HTML files were modified.*
