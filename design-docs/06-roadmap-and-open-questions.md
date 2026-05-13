# Roadmap & Open Questions

What we know we want to build, and what we still need to decide.

---

## Status as of Latest Design Session

**Done:**
- Premise, characters, world locked
- Seven-beat arc mapped, including the climactic memory-override mechanic
- Chapter 1 fully designed beat-by-beat (now updated for Mnemosyne / doubled taste cinematic / janitor + passenger beats)
- Game title locked: **The Last Bites**
- Ship name locked: **The Mnemosyne** *(Nem-OSS-uh-nee)*
- Wreck-ship name locked: **The Lethe**
- Chapter 1 title locked: **Cabin 646**
- Chapter 5 title locked: **The Lethe**
- Final line locked: *"Mmmm. That was a perfect last bite."*
- Pip's full name locked: **Filip** ("Filipek" to Babcia)
- Grandparents' names locked: **Marta** (Babcia) and **Jan** (Dziadek)
- Henrik's backstory locked: son **Erik**, ~12, died with Henrik's wife in a car accident decades ago
- Midpoint character locked: **Iris**, Edwardian wreck-girl
- Final-chapter shadow design locked
- **Architecture pivot locked (May 2026):** SCUMM-style adventure game with contextual narration-and-choice interactions, two-stat journal (recipes/strength + memories/empathy), monster-then-chef chapter rhythm, wordless traversal openings with float ability, echo-creatures as ship lore, recurring cat NPC (Helga). See full set of decisions in the log below.
- **UI spec locked (May 2026):** Full interface specification at `03b-ui-spec.md` covering dialogue box, strength indicator, lives display, journal screen, pause menu, title screen, chapter cards, death sequence, game-over screen, mobile tap layer direction, and a persistent context-sensitive controls strip.
- Working prototype built (Cabin 646 first room, mirror cinematic, door cinematic, dialogue system, inspect system) — note: prototype precedes the architecture pivot and Sprint 01 will rebuild its foundations.

**In progress / next:**
- Sprint 01: foundational architecture (resolution bump to 480×270, narration-with-choices interaction model, strength meter scaffolding, journal stub, float ability framework)
- Then incrementally: hallway, grandparents' cabin, radio room, dark corridor + janitor + float discovery, kitchen + Henrik, dock farewell

---

## Near-term Roadmap

### Stage 1: Foundational Architecture (Sprint 01)
Goal: Rebuild the prototype's bones to match the locked architecture before extending Chapter 1.

- [x] Bump internal resolution from 320×180 to 480×270
- [ ] Replace single-press inspection with narration-then-choices model (Flavor D)
- [ ] Implement persistent strength indicator (chewing-boy stomach meter, corner of screen)
- [ ] Implement journal stub with two stats per entry (recipe / memory)
- [ ] Wire space-bar as float input (gated until Beat 8 of Chapter 1)
- [ ] Preserve existing Cabin 646 art, dialogue, cinematics — adapt to new system

### Stage 2: Finish Chapter 1 Mechanically
Goal: A playable end-to-end Chapter 1 with placeholder art on the new architecture.

- [ ] Update Cabin 646 opening narration to locked Mnemosyne version
- [ ] Build hallway room with side-scrolling
- [ ] Add bulletin board (Mnemosyne reinforcement) and passenger encounter to hallway
- [ ] Implement room-to-room transitions
- [ ] Build grandparents' cabin (room + cinematic)
- [ ] Build radio room interaction and ability unlock
- [ ] Build dark corridor with broken-light puzzle
- [ ] Add janitor encounter (the "no one can see me" beat)
- [ ] Add float ability discovery to Beat 8 (combined with sconce/electricity moment)
- [ ] Build kitchen scene with Henrik
- [ ] Build the **doubled** first-taste cinematic (6a gravlaks + 6b lefse, with partial-face Erik)
- [ ] Build dock farewell cinematic
- [ ] Implement localStorage save/load

### Stage 3: Polish Chapter 1
Goal: Chapter 1 looks and feels finished.

- [ ] Commission cinematic art (**9 pieces** — Cinematic 6 split into 6a and 6b)
- [ ] Commission Pip sprite (with animations, ~16×24 at 480×270)
- [ ] Commission room background art (5 rooms)
- [ ] Commission supporting NPC sprites (Henrik, Marta, Jan, the janitor, the passenger)
- [ ] Add sound design and ambient audio
- [ ] Add music
- [ ] Add mobile tap controls
- [ ] Embed in the recipe site (or a test page)

### Stage 4: Chapter 2 — Bergen
Goal: Prove the world-traveling structure works, including the new chapter rhythm (traversal → monster → chef).

- [ ] **Decide Bergen's recipe** (was fish soup; lefse/gravlaks moved to Ch1 — Bergen needs a new dish)
- [ ] Design Chapter 2 (Bergen, Norway — draugr storyline + new recipe)
- [ ] Design the wordless traversal opening (echo-creatures TBD for this chapter)
- [ ] Design the monster cleverness puzzle (draugr blocking, gives a clue)
- [ ] Build the world map / port selector UI
- [ ] Build the port environment (Bergen wharf at night)
- [ ] Build the chef encounter
- [ ] Introduce **Helga the cat** in this chapter's traversal (first appearance)
- [ ] Establish the **paired memory pattern** (one frightening + one feeding moment, both saved to journal for the climax)
- [ ] Unlock Chapter 2 recipe on the recipe site

### Stage 5: System Maturity
Goal: Make adding new chapters fast.

- [ ] Refactor into the recommended file structure (rooms in separate files, etc.)
- [ ] Build a chapter-template so future chapters can be added with minimal new code
- [ ] Add accessibility features (text size options, reduced motion option)
- [ ] Add language toggle for narration?
- [ ] Build the paired-memory inventory UI (visible from Ch5 onward)

---

## Long-term Roadmap (Open-ended)

The game is intentionally open-ended. Add ports as recipes are added. Treat each new chapter as a content release that gives the recipe site a marketing moment.

**Chapter order (current):**
1. Cabin 646 (ship — lefse and gravlaks)
2. Tallinn, Estonia (kodused kotletid, the Haldjas + Leida)
3. Southampton, England (Sandy's red curry, the Black Shuck)
4. Istanbul, Türkiye (Muhittin's muhammara, the Karakoncolos)
5. Saldanha Bay, South Africa (Johannes Delport's potjiekos, the Mamlambo + Iris on the ship)
6. Indonesia (TBD — port, recipe, folkloric figure)
7. Brazil (TBD — port, recipe, folkloric figure)
8. Greenpoint, Brooklyn (pierogi — final chapter — shadow + crossing)

**Ship-side subplots inside Ch5–Ch8:** the Iris midpoint encounter (Ch5, locked), Erik's birthday (Ch6/7 TBD), and the Henrik photograph reveal (Ch6/7 TBD) all happen *aboard the Mnemosyne* during these chapters rather than displacing port chapters. Each port chapter may carry one ship-side beat in the same window, as Ch5 demonstrates.

**Earlier draft of this list** included Bergen, Naples, Tokyo, Marrakech, Accra, Oaxaca, Buenos Aires, and Brittany as separate chapters in a 13-chapter arc. The current 8-chapter structure supersedes that. The earlier port pool remains as a *future expansion* possibility — additional chapters can be added between Ch7 and Ch8 if the scope grows, but the locked 8-chapter arc is the working target. The Brittany snail chapter and the other deferred ports are not currently scheduled but are not abandoned.

---

## Open Questions

These are unresolved decisions. They don't need to be answered now, but they will need answers eventually. Several have been resolved since the last revision and removed from this list.

### Story / Character

- **Brittany's recipe.** "A dish fit for a snail" — something the snails would feel at home with, but not snail-eating. Garden salad with foraged herbs, a soup of garden things, a buttered radish course. Decide if/when Brittany returns to the schedule.
- **Brittany's chef and folkloric figure.** Working idea: a *dame blanche* or a benevolent *korrigan* who runs a small fog-bound restaurant or cliffside cottage. The snails are her old friends, waiting for her since the breakout. Decide if/when Brittany returns to the schedule.
- **Ch6 (Indonesia) — port, recipe, folkloric figure.** All open. To be designed when Ch6 is outlined.
- **Ch7 (Brazil) — port, recipe, folkloric figure.** All open. To be designed when Ch7 is outlined.
- **Erik's birthday chapter assignment.** Bible-locked as happening *during* a chapter, with Henrik withdrawn and Pip witnessing Erik's annual return. Currently unassigned to Ch6 or Ch7. Decide when those chapters are outlined.
- **The Henrik photograph reveal chapter assignment.** Pip earns access to Henrik's quarters, finds Erik's photograph and the lefse/gravlaks recipe, realizes Henrik has been feeding him Erik's favorite meal. Currently unassigned to Ch6, Ch7, or Ch8 (though Ch8 is the climax, so Ch6 or Ch7 is more likely). Decide when those chapters are outlined.
- **The task Pip completes to earn access to Henrik's quarters.** Bible-locked as a task, but the task itself is open. Decide when the reveal chapter is assigned.
- **Iris's wider family meal beyond the brussels sprouts.** Ch5 outline establishes the dining-room manifestation as warm Edwardian, white tablecloths, many faces, mid-meal. The specific dishes besides the sprouts are still open. May be implementation detail rather than story-level decision.
- **Babcia's final whisper.** Is it *"Pip"*, *"Filipek?"*, or something else? Lean toward *"Filipek?"* because that's the diminutive only she ever used. Decide at final-chapter planning.
- **Chapter title convention applied retroactively to Ch1 and Ch2.** Ch3 onward uses recipe-themed titles (*A Scotsman's Red Curry*, *Muhittin's Muhammara*, *A Stew for the Crew*). Ch1 and Ch2 may want recipe-themed retitles. Tracked as a project-level open thread.

### Gameplay

- **Wordless traversal duration per chapter.** How long should the opening platforming segment be? Working assumption: 30 seconds to 2 minutes. Confirm per chapter.
- **Per-chapter puzzle design.** Puzzle form is themed to the monster (locked 2026-05-08). Each chapter's specific puzzle gets designed when its outline is being worked on, drawn from the monster's idiom. The four formats in doc 02 (riddle, memory match, ingredient logic, story completion) are starting examples; specific puzzles may sit outside them. Per-chapter specs live in `chapter-specs/`. Ch2 done (`ch02-sincerity-puzzle-spec.md`); rest TBD per chapter.
- **What specifically does each monster give up?** Working list of clue types: a name, a direction, an ingredient, a stolen memory, a piece of the chef's story. Each chapter chooses one. Decide per chapter.
- ~~**The strength indicator visual.**~~ **Resolved 2026-05-13** — locked in `03b-ui-spec.md` §3.
- **Spider-bump vs. snail-slime drain rates.** Different hazard types should *feel* different — sharp for instant hazards, slow for emotional/seeping hazards. Spec when each chapter's traversal is designed.
- **Should chapters have collectibles?** Optional ingredient pickups, journal stickers, etc.?
- **How do players replay chapters?** Should they be able to? For lore-hunting. *(Partial: chapter-select from title screen now defined for completed chapters — see `03b-ui-spec.md` §7. Full replay-with-state-restore semantics still TBD.)*
- **The paired-memory inventory mechanic.** From Ch5 onward, each chapter contributes one "monster moment" + one "meal moment" to the climactic inventory. *(Partial: the journal's back pages surface this inventory from Ch5 onward — see `03b-ui-spec.md` §5. The *interaction model* during the climax is still open below.)*
- **The climactic override puzzle in the final chapter.** Is the player actively selecting the right "meal" memory to counter each "monster" memory the shadow plays? Or is it more cinematic, with Pip making the choices automatically? Lean toward player-active for engagement; lean toward cinematic for emotional weight. Decide when planning the finale.

### Recipe Integration

- **How does the recipe page actually link to the game?** A button on the home page? A persistent journal icon? A modal popup?
- **Are recipes truly gated, or always accessible?** If always accessible, the game's "unlock" is purely narrative. Probably the right call for a fun side project.
- **Does the recipe page show "you played the chapter for this recipe"?** A nice cross-promotion if so.

### Technical

- **Single-file vs split-file architecture for the production version?** Currently single. Will need to split as it grows.
- **Hosting?** Same domain as recipe site? CDN?
- **Mobile design?** Need to confirm tap targets work on small screens.
- **Accessibility?** Screen reader support, contrast options, motion-sensitive options.

### Art

- **Find the artist.** This is the big near-term blocker for visual polish.
- **One artist or many?** Recommend one for consistency.
- **Style guide for the artist beyond the existing doc?** Maybe paint a few reference frames in the target style to commission against.
- **The melting-mirror image is now load-bearing twice** — once in Cinematic 2 (Ch1 inciting) and again as the recurring channel in the shadow's static (final chapter). When this is commissioned, the artist needs to know it will be reused.
- **Erik's face in Cinematic 6b** must be partially hidden — recognizable in retrospect, not on first viewing. Specify carefully when commissioning.

### Audio

- **Composer?** Sparse, instrumental, evocative. Think Jon Brion, Mica Levi, or a folk-music composer per region.
- **Voice acting?** Probably not — it's a reading game. But maybe Henrik gets a single muttered "Så" in Norwegian as a flavor moment.
- **Reserved sound effects** — squeeze-and-pop (Iris's emergence) and TV-static-with-whispers (the shadow). Don't reuse for anything else.

---

## Decisions Log

A running list of locked decisions so they don't re-litigate.

| Date | Decision |
|---|---|
| 2025-XX | Game title: **The Last Bites** |
| 2025-XX | Chapter 1 title: **Cabin 646** |
| 2025-XX | Protagonist: Pip, 10-12 year old ghost, Polish-American from Greenpoint |
| 2025-XX | Setting: world-cruising ship + ports |
| 2025-XX | Mentor: Henrik, ship's chef, can see Pip because of his own loss |
| 2025-XX | Visual direction: pixel art, 7th Guest darkness |
| 2025-XX | Tech stack: vanilla JS, single HTML file, HTML5 Canvas |
| 2025-XX | Mode architecture: room mode + cinematic mode + puzzle mode |
| 2025-XX | Recipe integration: each chapter unlocks a recipe on Julia's site |
| 2025-XX | Open-ended chapter count: add ports as recipes are added |
| 2025-XX | Tone: gentle horror, never cruel, never preachy |
| 2025-XX | No combat, no fail states, no purchases |
| 2026-05 | Pip's full name: **Filip** ("Filipek" to Babcia, "Pip" to himself and everyone else) |
| 2026-05 | Grandparents' names: **Marta** (Babcia) and **Jan** (Dziadek) |
| 2026-05 | Pip's parents died when he was 3-4. The pierogi dinner with all six (parents, grandparents, Pip) is his earliest memory and his climactic override |
| 2026-05 | Pip had childhood friends; one's family introduced him to non-Polish food (Jamaican implied). Quietly canon |
| 2026-05 | Henrik's lost family: **son Erik (~12) and his wife**, killed in a car accident decades ago. Henrik went to sea afterwards |
| 2026-05 | Henrik reveal: **Chapter 4**. Pip sees Henrik pocket a photograph; later earns access to Henrik's quarters; finds Erik's photo + the lefse/gravlaks recipe (Erik's favorite — the meal Henrik served Pip in Ch1) |
| 2026-05 | Chapter 1 seed for the reveal: Pip wonders aloud how Henrik can see him; janitor + passenger establish the rule |
| 2026-05 | Chapter 1 first-taste cinematic is **doubled**: gravlaks → Henrik with grandfather; lefse → Henrik with young Erik (face partially seen) |
| 2026-05 | Chapter 1 recipe changed from fish soup to **lefse and gravlaks (with Norwegian pickles)** |
| 2026-05 | Ship name: **The Mnemosyne** *(Nem-OSS-uh-nee)*, Greek goddess of memory, paired with Lethe (forgetting) |
| 2026-05 | Wreck-ship name: **The Lethe**, Edwardian liner, sunk c. 1905-1912 |
| 2026-05 | Chapter 1 opening narration locked (see 04-chapter-01-cabin-646.md, Beat 1) |
| 2026-05 | Narrator voice reference: kinetic verbs, gentle parenthetical winks, food-aware self-awareness. The "Mnemosyne" wink is the signature |
| 2026-05 | Midpoint character: **Iris**, Edwardian girl, ghost of *The Lethe*. Squeeze-and-pop entrance through floorboards. Wet, then shakes dry like a dog. Translucent when sad or stubborn |
| 2026-05 | Iris's unfinished meal includes brussels sprouts; Pip eats them for her |
| 2026-05 | Chapter 5 title: **The Lethe**. At-sea midpoint, between two ports. Set in the ship's "Drowned Room" |
| 2026-05 | New ability: **Memory-gifting**, earned from Iris in Chapter 5. Empathy strengthens it |
| 2026-05 | Iris moves on after Ch5; she does not return as a recurring character |
| 2026-05 | Erik moved on long ago; returns annually on his birthday because love reaches across |
| 2026-05 | Chapter 6: **Erik's birthday visit.** Henrik withdrawn; Pip investigates and witnesses the reunion |
| 2026-05 | Each chapter from Ch2 onward produces a paired dark/light memory for the climactic override inventory |
| 2026-05 | Final chapter shadow design: tangled, shape-shifting black wires; static-TV memories playing inside; recurring channel is the melting-face mirror image from Ch1 |
| 2026-05 | Final chapter mechanic: Pip overrides shadow's painful memories with joyful ones in **reverse chronological order**, ending with the pierogi dinner (parents + grandparents) |
| 2026-05 | Pip is allowed one beat of anger in the final chapter: *"It's not fair. I was just a boy."* |
| 2026-05 | Final scene: Henrik finds Pip post-shadow; they make pierogi together; veil opens; Pip's parents and Henrik's wife and Erik come through; Henrik gets his goodbye too |
| 2026-05 | The chain of feeding continues: Pip teaches Henrik pierogi so Henrik can feed the next ghost-child |
| 2026-05 | Final line changed from *"I always save the best bite for last"* to **"Mmmm. That was a perfect last bite."** |
| 2026-05-07 | **Interaction model:** SCUMM-inspired adventure game. No persistent verb panel. Contextual narration-and-choices in the existing dialogue box (Flavor D). Atmospheric objects = single inspect = single line of flavor. Interactive objects = narration plays, then 2–4 meaningfully different choices appear inside the dialogue box. Player picks with arrows + space (or click) |
| 2026-05-07 | **Choice availability is ability-gated.** A "phase through" choice only appears once Pip has earned that ability. Ability growth = choice menu growth |
| 2026-05-07 | **Inventory model:** one journal. Each chapter from Ch2 onward produces one journal entry containing a recipe component (strength) and a memory component (empathy). The journal is the thematic object of the game — food, memory, and feeling unified |
| 2026-05-07 | **Two stats:** strength (from recipes/food) and empathy (from memories). Empathy strengthens memory-gifting per the bible |
| 2026-05-07 | **Strength indicator:** chewing-boy face with food traveling down to a stomach meter. Persistent in screen corner during gameplay; hidden during cinematics |
| 2026-05-07 | **Strength is environmental-only.** Drains from echo-creatures, snail-slime, fright. Refills from food. Does not drain from puzzle wrong-answers — puzzles never punish |
| 2026-05-07 | **Lives:** 3 per chapter. Death = flicker, soft fade-out, respawn at most recent checkpoint. Third death = **puddle-ghost** game-over, restart from chapter beginning or chapter midpoint |
| 2026-05-07 | **Checkpoints per chapter:** beginning, chef encounter, end. Three per chapter |
| 2026-05-07 | **Chapter rhythm (Ch2+):** wordless traversal → monster cleverness puzzle → chef encounter. Wordless → wordy → warm. Chapter 1 is the exception — Henrik plays both monster-replacement and chef-replacement roles |
| 2026-05-07 | **Wordless traversal:** atmospheric platforming segment at the start of each chapter (Ch2+), no dialogue, no UI clutter. Arrows move; space-bar floats. Brief; generally takes place on the ship leading to the gangway |
| 2026-05-07 | **Float ability:** Pip can float upward roughly 1.5 character-heights, briefly, with effort. Hold space to rise, release to descend. Float only — no jump. He's a ghost; he doesn't push off the ground |
| 2026-05-07 | **Float discovery:** built into Beat 8 of Chapter 1 (the dark corridor / fallen-sconce moment, combined with electricity discovery). Before Beat 8, space-bar does nothing |
| 2026-05-07 | **Monster encounters are cleverness puzzles, not combat.** Same toolkit as chef encounters (riddle, memory match, ingredient logic, story completion) but with adversarial framing. Pip outwits the monster; the monster relents and gives up a clue |
| 2026-05-07 | **Monster as guide:** defeating/appeasing/feeding the monster yields the clue that unlocks the path to the chef. Monsters are unwilling guides, not enemies. The specific clue type varies per chapter — name, direction, ingredient, stolen memory, piece of the chef's story |
| 2026-05-07 | **Burp-and-feast retired as combat resolution.** The food-restoration moment is preserved as either a shared-meal beat after the monster encounter (monster offers Pip food) or a found-food beat during traversal. Varies per chapter |
| 2026-05-07 | **Memory combat:** meal memories cure (weaken monsters by overriding painful memory with joyful). Monster memories scare temporarily but don't progress the encounter — only meal memories actually weaken. *The cure for grief is to cook for the next person* enacted in the mechanic |
| 2026-05-07 | **Echo-creatures:** small ship-resident creature-residues — spider-shapes, mice, bats, cockroaches, snails — each tied to a forgotten incident in the Mnemosyne's history. They are the ship's own memory-residue, not regional folklore. Each variety has its own traversal flavor (skitter / swarm / stampede / slow-path-find) |
| 2026-05-07 | **Helga the cat:** real, alive, recurring NPC. Norwegian ship-cat. Lives on the ship. First appearance in Chapter 2's traversal — initially hostile to Pip, warms gradually across chapters. Provisional: same cat as the dill-finder in doc 02's example puzzle. Likely Henrik's cat |
| 2026-05-07 | **The Mnemosyne has a haunted history of her own.** The great snail breakout is the first canonical incident. Other incidents may surface as the game grows. The ship is a character with backstory, not just a setting |
| 2026-05-07 | **Snail chapter:** locked as a major design — wall-to-wall friendly snails carrying lit candles on their shells (the only light source); slime trails of someone-else's-grief that drain Pip's strength; a snail-trail that guides Pip through the chapter to the chef. Three layers of attention: follow the moving light, avoid the slime, weave between snail bodies |
| 2026-05-07 | **Snail chapter location:** **Brittany, France** (foggy port, TBD specific town/folkloric chef). Recipe is "a dish fit for a snail" — *not* escargot. Position in chapter order tentative |
| 2026-05-07 | **Art direction:** pixel art throughout, two framings (gameplay wide-shot, cinematic close-up) at the same resolution. Same pixel grid, same style, different framing |
| 2026-05-07 | **Resolution bump:** internal canvas resolution moves from 320×180 to **480×270**. Pip sprite scales proportionally to roughly 16×24 |
| 2026-05-07 | **Animation budget:** hand-animation reserved for highest-impact beats only (mirror melt, Henrik's first reaction, taste-memory triggers, burp-and-feast / shared meals, final crossing). Ambient room life (dust, lamp flicker, parallax) is code-driven, not animated |
| 2026-05-07 | **Climactic shadow interior:** memories play at full cinematic fidelity, sped up so the channel-flipping feels manic. Includes the melting-mirror image from Ch1 as the recurring channel |
| 2026-05-08 | **Puzzle form is themed to the monster.** The four cleverness-puzzle formats in doc 02 (riddle, memory match, ingredient logic, story completion) are starting examples, not an exhaustive list. Each chapter's puzzle is designed in the monster's idiom — drawn from their lore and domain. Doc 02 has a one-paragraph addition reflecting this; per-chapter puzzle designs live in `chapter-specs/` |
| 2026-05-08 | **Ch2 sincerity puzzle locked: the three-doors design.** The Haldjas casts a spell inside Leida's cottage after the meal. Three folk-tale doors with three figures, three offers. Door 1 (sweet little girl): meatball for life back. Door 2 (starving old woman): asks for food, offers nothing. Door 3 (healthy man): asks for the Haldjas's altar meatball in exchange for a glimpse of Pip's grandparents. Right answer is door 2 — *give without getting*. Doors 1 and 3 reveal as devils on wrong choice; door 2's old woman reveals as Pätu. Wrong choices reset, no fail state. Door 3's bargain seeds the Greenpoint climax. Full spec at `chapter-specs/ch02-sincerity-puzzle-spec.md` |
| 2026-05-08 | **`chapter-specs/` folder.** New folder for canonical per-chapter puzzle and scene specs that are too detailed for the chapter outline but still load-bearing for implementation. First doc: `ch02-sincerity-puzzle-spec.md` |
| 2026-05-08 | **Visual palette locked: deep moonlit blue base, warm-amber pools.** Pivots away from earlier warm-brown-base attempts. The world is *cool* (blue, purple, occasionally cool-green per region); warmth is *rare and meaningful* (cottage windows, hearth, lamps, food, spirit signatures). The bible's central image — a small warm thing in a cold otherworld trying to find home — is now visually enacted. Accessibility win: blue/amber is the highest-contrast pairing for color blindness and screen glare. Pip's ghost reads as cool-white-translucent against the cool world but pops because his white is brighter than the blue. Locked tokens added to `03-art-and-aesthetic.md` in a new "Universal & Regional Palette" section. Cascades to the demo, the bible, and every chapter from here forward. Decision arrived at after a three-way comparison page (warm-brown vs deep-blue vs soft-purple); deep-blue won on contrast, accessibility, and thematic fit |
| 2026-05-08 | **Spirit color signatures and warm-pool rules formalized.** Pip cool-white-translucent (`#f0f8ff`, provisional). Haldjas hearth-gold (`#ffe088`, locked Ch2). Iris sea-green-blue (`#88b8b0`, locked Ch5). Bad-ghost blood-iron (`#7a1418`, locked, devil-eye-glow only). Future spirits get signature colors when their characters are designed. Warm-pools are *placed* meaningfully (hearth, windows, lamps, food, spirits) and never wash the room |
| 2026-05-08 | **Doc 03 stale-canon fix.** "Forward Reference: Helga the Cat" section updated to "Forward Reference: Pätu the Cat" with corrected canon (Estonian, not Norwegian; not hostile to Pip; the wariness in Ch2 is the Haldjas's). Cross-references the bible for full character details |
| 2026-05-09 | **Ch4 wordless traversal merged with the cat-alley beat.** The earlier draft had a separate spirit-rats traversal on the lower decks of the Mnemosyne plus a stray-cat alley scene; revision merges them. The chapter's wordless traversal *is* the stray-cat alley: Pätu spooks at the echo-cats and bolts ahead, Pip floats above the cats to follow, the traversal ends when Pip emerges and finds Pätu facing down the Karakoncolos. Cleaner shape, fewer beats |
| 2026-05-09 | **Ch4 puzzle resolution: Pätu is the active agent.** Pip's job is keeping the candle lit long enough to reach Pätu and thaw her. Once thawed, *Pätu* charges and routs the Karakoncolos. Pip doesn't fight the monster — Pätu does. Reinforces "Pätu chooses" thread from Ch3 and gives the chapter's stakes (Pätu frozen) a direct payoff (Pätu's revenge) |
| 2026-05-09 | **Pip carries a candle and matches.** Candle introduced Ch1 Beat 13 — Henrik gives it to Pip alongside the journal, when Pip mentions ghosts don't sleep much. Matches collected at the end of Ch3 — Pätu meows at a box of matches at a closed newsstand on the walk back to the ship (callback to her meow-at-objects pattern from Ch2). Both are load-bearing for Ch4's Karakoncolos puzzle. Cross-references: Ch1 outline + doc 04 + Ch3 outline all updated to plant these |
| 2026-05-09 | **Ch4 orchard taste-memory is single-register and warm.** Earlier draft had a three-movement memory (boys with grandmother → grandmother alone → empty orchard). Revision is a single warm memory: two boys testing walnuts with their thumbnails, grandmother gathering them both against her, golden orchard. Grief is *inferred* — the player understands the grandmother is gone from context (Muhittin cooking her recipe for his returning brother), not shown. Quieter, kinder, lets the player do the emotional work |
| 2026-05-09 | **Ch4 Henrik beat: Henrietta becomes a person.** Earlier draft had Henrietta's name spoken once and held back. Revision: Henrik begins to tell Pip about her — pomegranate molasses, a few textures of who she was, who she was to him. Starts to say *"we had a"* before dinner service interrupts. Henrik tosses Pätu a piece of salmon, thanks Pip for the muhammara, returns to work. Henrietta is now a person Pip knows a little about; Erik remains unnamed and is reserved for the photograph-reveal chapter (Ch6/7/8 TBD) |
| 2026-05-09 | **Ch4 photograph reveal chapter shape clarified.** With Henrietta surfacing in Ch4, the eventual photograph reveal (Pip earning access to Henrik's quarters) is now about *Erik* specifically — finding Erik's photo and the lefse/gravlaks recipe, realizing Henrik has been feeding Pip Erik's favorite meal since Ch1. Henrietta and Erik are now two separate reveals, not one combined reveal. Stronger structure |
| 2026-05-09 | **Ch4 port: Istanbul.** Real Turkish regional textures (call to prayer, narrow stepped streets, İznik tile-blue, real Istanbul cats in echo form) but outside-of-time — doesn't have to be ultra-literal. Settled |
| 2026-05-09 | **Omer, Brian, and Muhittin are real people in Julia's life.** Muhittin and Omer are Julia's friends in Istanbul; Brian is Julia's brother. Treat warmly, brief presence, no jokes at their expense. Same handling precedent as the Ch3 Dundee family. Settled |
| 2026-05-09 | **Pätu's bad-ghost-detector beat is *not* in Ch4.** The Karakoncolos is a folkloric monster, not a haunting bad ghost. Pätu's hiss at him is generic guard-cat behavior. Her canonical bad-ghost-detector beat is unassigned and lands in a later chapter, against an actual bad ghost |
| 2026-05-09 | **Muhittin startles when seeing Pip in Ch4 Beat 3.** Earlier draft had him calmly asking *"Are you new? Did something happen?"*. Revision: Muhittin is petting Pätu when Pip appears, startles visibly (hand to chest, a breath), then recovers fast and is kind. The startle adds warmth and humanity — he's not magic-aware, he's just a kind person who recovers quickly |
| 2026-05-09 | **Ch5–Ch8 ports locked.** Ch5 South Africa (Saldanha Bay), Ch6 Indonesia, Ch7 Brazil, Ch8 Greenpoint (the climax). Iris's midpoint encounter, Erik's birthday, and the Henrik photograph reveal happen *aboard the ship* during these chapters rather than displacing them. Specific chapter assignments for Erik's birthday and the photograph reveal still TBD |
| 2026-05-09 | **Ch5 outlined: *A Stew for the Crew*.** Saldanha Bay, South Africa. Three settings in one chapter (ship traversal → ship Iris/Mamlambo → port chef → ship Henrik). New structural pattern — port chapter with a ship-side subplot in the same window. See `ch05-south-africa-outline.md` |
| 2026-05-09 | **The Lethe wreck location: off the Horn of Africa.** Edwardian English liner; plausible 1905–1912 route to East Africa or India. The Mnemosyne stalls directly above the wreck, allowing Iris to reach up through the floorboards of a lower-deck storage room |
| 2026-05-09 | **No "drowned room" — just a lower-deck storage room.** Earlier bible language called the location *the Drowned Room.* Revised: Iris emerges in an ordinary lower-deck storage room, no flooding, no special status. Cleaner and less cute. The bible's room list in `01-story-bible.md` should be patched accordingly |
| 2026-05-09 | **Iris gives Pip her father's switchblade.** Mother-of-pearl handle, Edwardian make. Object-memory triggers from the blade — Pip sees Iris's family at dinner. Pip keeps the switchblade; it is load-bearing for Ch6's monster encounter. Cross-chapter inventory pattern continues: Ch1 candle, Ch3 matches, Ch5 switchblade |
| 2026-05-09 | **Iris and Pip share the brussels sprouts.** Earlier bible language had Pip eating the sprouts *for* Iris (sommelier-seriousness). Revised: Iris pulls the sprouts up from the floorboards (squeeze-and-pop callback to her arrival); Pip and Iris finish the meal *together*, because in the memory her mother told her to finish. The bible-locked line *"They're not bad. They're really not."* lands as Pip's reassurance during the shared meal |
| 2026-05-09 | **Memory-gifting earned and weaponized in Ch5.** Two-step introduction: Pip *receives* Iris's family memory through her father's switchblade (object-memory extending naturally to a person's loved object), then *gives* the memory back to her in full clarity. Iris's family manifests, she finishes her meal, she moves on. Later in the chapter, Pip *weaponizes* the same memory against the Mamlambo. The ability is introduced and escalated in the same chapter |
| 2026-05-09 | **Memory-gifting input.** Journal opens; left/right arrows navigate horizontally between entries; up arrow selects and sends the highlighted memory. Same two-axis grammar as movement, no new buttons. Visual signature is the same wavy-bloom transition used for taste-memory and object-memory, but going *outward* from Pip rather than inward |
| 2026-05-09 | **Mamlambo encounter: brain-suck reversal.** Pip cannot be hurt because he is already dead; the Mamlambo's pull instead grants the creature *access* to Pip's journal. Pip reaches back deliberately and sends the warm Iris-family memory into the suck. The Mamlambo cannot keep it down — *the warmth is what he stole made warm* — and recoils in disgust, retreating into deep water. As his churning settles, debris from the Lethe wreck below surfaces; a sodden canvas bag of brussels sprouts bobs against the hull. *From Iris*, Pip thinks |
| 2026-05-09 | **Folkloric figures are interpreted in service of the game's tone, not literally.** The Mamlambo in legend is a brain-sucker / hoarder / luck-stealer; this chapter gives the creature a gentle-horror reading (recoils from warmth rather than being defeated by force). Same precedent applies to Anansi, the djinn, the dame blanche, etc. — folklore serves the story's tone, the story does not serve folklore |
| 2026-05-09 | **Ch5 chef: Johannes Delport.** Older Afrikaner, jolly, chaotic, bearded, sings while he cooks, talks to himself and the cat. Forgetful and clumsy. Cooks potjiekos outdoors over a fire in his courtyard in Saldanha Bay. Cannot see Pip — but is so forgetful that Pip can helpfully nudge ingredients into his line of sight without him noticing |
| 2026-05-09 | **Pätu as the cat-envoy.** When Johannes shoos Pätu away, Pip ties the bag of brussels sprouts loosely around her neck. She returns, bag swaying. Johannes laughs at the absurdity and lets her stay. Pip slips in behind her. Pätu's gameplay role keeps expanding: Ch3 (sniff-leads), Ch4 (active monster combat), Ch5 (envoy) |
| 2026-05-09 | **Strength meter starts at zero.** Pip begins the game with no strength because he hasn't yet collected any memories. The meter grows as he collects warm memories across chapters; the goal-state is *full strength*, which is what allows him to move on. Earlier framing had the meter as ambient-replenishable; this clarifies that strength is *cumulative life-force from collected memories*, with environmental drains (echo-creatures, fright) being temporary dips |
| 2026-05-09 | **Pätu's "bad-ghost-detector" beat retired.** Earlier bible language reserved a canonical mid-game beat where Pätu's hiss formally registers a bad ghost. That framing is dropped. Pätu is simply a good judge of character — she hisses at things that are wrong, doesn't hiss at things that are fine. No reserved beat. Supersedes the 2026-05-09 entry above (*Pätu's bad-ghost-detector beat is not in Ch4*) — there is no such canonical beat to assign anywhere. Bible language to be patched accordingly |
| 2026-05-09 | **Ch5 working title: *A Stew for the Crew*.** Recipe-themed convention from Ch3 onward holds. Johannes ladles extra at chapter's end specifically for the crew of the Mnemosyne — *"Always feed the crew."* The title is the chef's instruction |
| 2026-05-13 | **UI spec doc created: `03b-ui-spec.md`.** Sibling to the art doc. Locks all interface chrome and behavior in one place. Future sprints reference it for layout, dimensions, color tokens, animation timings. Doc 02 (controls table, journal-access line) and doc 03 (strength indicator section, top-of-doc pointer) patched to cross-reference it |
| 2026-05-13 | **Persistent context-sensitive controls strip.** A faint bottom-of-screen hint that updates per context (room mode, dialogue, cinematic, journal, pause, etc.). Always visible during gameplay; hidden during cinematics' first 800ms, death sequence, and game-over. Replaces the earlier implicit assumption that players would learn controls from a tutorial. Full string library at `03b-ui-spec.md` §1 |
| 2026-05-13 | **Lives display: three Pip-silhouette icons** placed immediately right of the strength indicator. Active = full opacity + soft cool glow; spent = faint imprint. No counter numerals. Death animation: rightmost active icon flickers and fades with a glow-trail. Refills to 3 at chapter start. Spec at `03b-ui-spec.md` §4 |
| 2026-05-13 | **Esc behavior refined.** Esc from gameplay opens the journal. Esc from within the journal opens the pause menu. Esc from the pause menu resumes gameplay. The journal is the primary affordance; the pause menu is one level deeper. Supersedes the earlier "Esc = Pause / journal" line in doc 02 |
| 2026-05-13 | **Pause menu options locked.** Resume / Restart from last checkpoint / Restart chapter / Sound ON-OFF toggle / Return to title. No "Quit" — closing the tab is the quit gesture for a browser game. Spec at `03b-ui-spec.md` §6 |
| 2026-05-13 | **Single save slot for v1.** Continue resumes from last checkpoint. Multi-slot saves deferred; can be added later if scope demands. Spec at `03b-ui-spec.md` §7 |
| 2026-05-13 | **Title screen locked.** Background: a cinematic still of the Mnemosyne at night (placeholder = palette gradient). Title + tagline ("A ghost-boy. A haunted ship. One last meal.") + menu (New voyage / Continue / Chapter select / Sound / Credits). Chapter select appears only after at least one chapter is complete. Spec at `03b-ui-spec.md` §7 |
| 2026-05-13 | **Chapter card screen locked.** Three centered lines: chapter roman numeral, chapter title (uppercase Special Elite), optional italic subtitle. Holds; advances on Space or auto-advances after 6s. Used between cinematics at chapter boundaries. Spec at `03b-ui-spec.md` §8 |
| 2026-05-13 | **Death sequence locked.** Hit-flash → Pip flickers → fade-to-black → 1.5s held black → respawn fade-in over 1.5s at most recent checkpoint. Strength refills on respawn. Spec at `03b-ui-spec.md` §9 |
| 2026-05-13 | **Game-over screen locked: puddle-ghost.** On third death, instead of normal respawn: cinematic image of Pip melted to a luminous puddle, narration types out below ("Even ghosts can lose their way. Pip will need to gather himself again."), two centered choices fade in (Restart from last checkpoint / Restart chapter). Spec at `03b-ui-spec.md` §10 |
| 2026-05-13 | **Mobile tap layer direction (placeholder).** No virtual joystick. Tap left/right half = move. Tap-and-hold center = float (once unlocked). Tap a sparkle-highlighted object = inspect. Tap a dialogue choice = select-and-confirm. Tap strength indicator area = open journal. Swipe down = pause menu. Full mobile sprint will refine. Spec at `03b-ui-spec.md` §11 |
| 2026-05-13 | **Sound toggle in pause menu is forward-compatible.** Toggle is present in the v1 pause menu even though sound design is unimplemented. When sound ships, the toggle already works. Default state: ON |
| 2026-05-13 | **Universal panel chrome defined.** Every panel in the game uses the same double-border treatment: outer border (`#3a4068`), inner border (rgba(140,160,200,0.22) at 4px inset via ::before pseudo-element), background `rgba(8, 6, 12, 0.92)`. Established in the three-doors demo; now formalized as the game's signature panel style. Cross-references the locked color tokens in `03-art-and-aesthetic.md` |
| 2026-05-13 | **Sprite-rig layering pattern locked.** Character sprites are rendered as a stack of independent layers — body, eyes, mouth — each on its own animation timeline. Pip is the first implementation; pattern extends to all NPCs. Lets the engine drive emotional expressiveness (blinks, widened eyes, small smiles) without redrawing the whole sprite or commissioning new full-sprite frames. Eyes and mouth do most of the emotional bandwidth from sprites; treating them as independent rigs preserves that bandwidth across the whole game. Cross-references the locked Pip spec in `03-art-and-aesthetic.md` and the rig implementation in `05-tech-architecture.md` |
| 2026-05-13 | **Sprite direction handled by canvas transform-flip, not by separate art.** Pip faces the direction he's moving. The engine applies `ctx.scale(-1, 1)` around the sprite's anchor to mirror him when he turns. No left-facing and right-facing sprite art is authored separately. Pip's silhouette has no asymmetric details that would suffer from the flip. The rule extends to most NPCs; explicit left/right variants only when the silhouette has asymmetric tells (e.g., a tool always held in one specific hand). Cross-references `03-art-and-aesthetic.md` (art-authoring guidance) and `05-tech-architecture.md` (render pipeline) |
| 2026-05-13 | **Bottom ~30% of the canvas is the UI zone.** The dialogue box and controls strip live here. Every room must leave game-world content above `FLOOR_Y` (~180 of the 270-pixel-tall internal canvas, ≈67% down). No walls, floor art, or objects in the lower band. Below-floor area fills with a very dark cool ambient color (`#080e20`). Established Sprint 02.5. Applies to every room from here forward (Hallway, Grandparents' Cabin, Kitchen, all port rooms). |
| 2026-05-13 | **Float ceiling bumped to ~3× character-heights (75px from 36px) after Sprint 02.5 playtest.** Original 1.5× felt too constraining. Bible's "roughly 1.5 character-heights" guidance retired; Beat 8 puzzle and future float puzzles will be authored against the 75px ceiling. Float speed and gravity unchanged — those felt right. |
| 2026-05-13 | **Dev-mode URL flag (`?dev=1`) unlocks story-gated abilities for playtesting.** Float was the first. Future story-locked abilities (electricity, phase-through, memory-gifting) follow the same pattern: engine capability and dev flag arrive together in the feature sprint; the story unlock (Beat 8, etc.) arrives in the chapter sprint. Production play with no URL param is always identical to the locked story state. |
| 2026-05-13 | **Multi-room architecture established Sprint 03.** Rooms are keyed by id in a `rooms` object (`rooms.cabin`, `rooms.hallway`, etc.). Each room defines `width`, `pipMaxX` (movement clamp), `objects` (inspectables), `draw` (background fn), and `pipEntryX` (entry positions per edge). `currentRoom` is a mutable string; transitions between rooms use `startTransition(toRoom, entryEdge)`. Pattern extends to all future rooms (Grandparents' Cabin, Kitchen, Dock, Tallinn, etc.). |
| 2026-05-13 | **Scripted-walk NPCs use a one-shot trigger pattern.** On first entering a room, after a short delay, an NPC walks across and exits. Used for the Passenger (Sprint 03). The Janitor (Beat 8) and future scripted-walk NPCs follow the same pattern. NPCs that only walk use one-piece silhouettes, not the body/eyes/mouth sprite rig — the rig is reserved for NPCs who speak or react. |
| 2026-05-13 | **Three visual registers, not one.** The game has Register A (gameplay sprite — sparse procedural pixel art, ~16-36px characters), Register B (cinematic — painterly 480×270 commissioned art), and Register C (CSS-div prototype convenience). The painterly references (Owlboy, Hob's Barrow, etc.) are Register B references and were previously not flagged as such. Documented in `03-art-and-aesthetic.md` §"Visual Registers". |
| 2026-05-13 | **The canvas-rendered Pip in the existing prototype is the locked Register A reference.** Future Register A work (Pätu, Henrik, Leida, NPCs) targets the same sparse register. |
| 2026-05-13 | **Present-day Pip has no hair and no apron.** Those belonged to the boy he was, not to the ghost he is. They appear only in memory cinematics. This is a story-bible-level decision, documented in `01-story-bible.md` §"The Protagonist: Pip" and `03-art-and-aesthetic.md` §"Pip Sprite Specification". |
| 2026-05-13 | **Pätu is canonically a gray tabby**, locked as of Sprint 00. Not tortoiseshell. |
| 2026-05-13 | **AI art generation (Gem) is scoped to Register B only.** Register A is procedural code. Register C is hand-written CSS. The Gem refuses Register A and C requests and redirects them. Documented in the Gem instructions and in `03-art-and-aesthetic.md`. |
| 2026-05-13 | **The CSS-div Pätu built in Sprint 00 is Register C, not Register A.** She is a useful reference for what gameplay Pätu should depict but is not the in-game sprite. The canvas-rendered Pätu (sitting pose) in `pip-patu-register-a.html` is the Register A reference for follow-up sprint work. |

---

## How to Use This Document Set in Claude Code

When opening Claude Code on this project:

1. Place all seven design markdown files in a `design-docs/` folder at the project root (`README.md`, `01-story-bible.md`, `02-game-design.md`, `03-art-and-aesthetic.md`, `03b-ui-spec.md`, `04-chapter-01-cabin-646.md`, `05-tech-architecture.md`, `06-roadmap-and-open-questions.md`) plus per-chapter specs in `chapter-specs/`.
2. Place the working prototype HTML alongside (e.g., `prototype/cabin646.html`).
3. **Tell Claude Code:** "Read all files in `design-docs/` before doing anything. The README points to the rest. The story bible is the most important — mechanics serve the story. For any UI work, the UI spec is authoritative."
4. Work feature by feature. Don't try to build the whole game in one session. Each room, each cinematic, each puzzle is a discrete, testable unit.
5. When making decisions that aren't covered in the docs, **add them to the Decisions Log here** and to the relevant doc, so the context grows.

This document set is a living reference. Update it when things change.
