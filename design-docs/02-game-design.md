# Game Design

How the game actually plays. Mechanics, loops, puzzle types, and structural patterns.

---

## Core Gameplay Loop

A chapter plays roughly like this (Chapter 2 onward — Chapter 1 is its own special introduction):

1. **Wordless traversal.** Pip wakes on the Mnemosyne and makes his way through some haunted stretch of the ship to the gangway. No dialogue, no UI clutter. Echo-creatures (spider-shapes, mice, bats, snails — varies per chapter) skitter in the corridors. Pip moves with arrows, floats with space-bar to avoid them. Brief — 30 seconds to two minutes. The chapter's *overture*.
2. **Arrive at the port.** Atmosphere shifts — fog, lanterns, market sounds, regional flavor.
3. **Encounter the monster.** A folkloric spirit blocks the path to the chef. The encounter is a *cleverness puzzle*, not combat — Pip outwits, appeases, or feeds the monster. The monster relents and gives up a clue (a name, a direction, an ingredient, a stolen memory, a fragment of the chef's story — varies per chapter).
4. **Use the clue to find the chef.** The monster has been an unwilling guide.
5. **Solve the chef puzzle.** Text-driven — riddle, memory match, ingredient logic, or story completion. The chef demonstrates that Pip understands her dish before sharing the recipe.
6. **Earn the recipe.** A new entry is added to Pip's notebook: a recipe component (boosts strength) and a memory component (boosts empathy). On the website, this unlocks a real recipe.
7. **Cinematic transition** back to the ship, set up the next port.

Total chapter playtime target: **15–30 minutes.** Short enough to play in a sitting, long enough to feel meaningful.

**Chapter rhythm:** wordless → wordy → warm. Each chapter moves through three registers — physical, conversational, tender. The traversal is the dread; the monster puzzle is the obstacle; the chef puzzle is the reward.

---

## The Three Display Modes

The game switches between three modes seamlessly:

### 1. Room/Map Mode (the main gameplay)
- Side-scrolling pixel-art environment at 480×270 internal resolution
- Pip moves left/right with arrow keys
- Pip floats up briefly with space-bar (once unlocked in Beat 8 of Chapter 1)
- Interactive objects glow with a small sparkle when Pip is near
- Up arrow inspects, triggering narration or a cinematic
- Some objects can be picked up and used elsewhere
- Doors at room edges transition to adjacent rooms
- Strength indicator persists in the screen corner

### 2. Cinematic Mode (story beats)
- Full-screen pixel art at the same 480×270 resolution, framed for character close-up or wide environmental shot
- Dialogue plays over it
- Player presses space to advance
- Used for: emotional reveals, big story moments, character close-ups, environmental wide-shots
- The strength indicator is hidden during cinematics
- This is where the game's storytelling power lives

### 3. Puzzle Mode (monster and chef encounters)
- Same dialogue-box UI as room mode — narration plus a small numbered choice menu
- Monster encounters and chef encounters share this UI
- Riddles, memory matches, ingredient logic puzzles, story completion
- Failure is never punishing — wrong choice, the monster grumbles or the chef gently hints, try again
- Strength indicator stays visible during monster encounters; not relevant to chef puzzles (chefs don't drain Pip)

---

## Controls

Designed to be playable with one hand on the keyboard. Mobile-friendly tap controls to be added later.

*(Sprint 12: `↓` collect verb added; `TAB` opens the notebook; `ESC` is for pause. "Journal" renamed "notebook" throughout.)*

| Key | Action |
|---|---|
| ← → (or A/D) | Move |
| Space (or Enter) | Float (when held, in room mode) / Confirm choice in dialogue / Advance cinematic |
| ↑ (or W) | Inspect / interact |
| ↓ | Collect (pocket the nearest warm-humming collectible; squat animation when nothing nearby) |
| ↑ ↓ | Navigate choices in dialogue / pages in notebook |
| ← | Back one line in dialogue |
| 1–4 | Select choice in dialogue directly |
| TAB | Open notebook |
| ESC | Pause menu |

Context-sensitive key bindings are *always* shown in a persistent controls strip at the bottom of the screen (see `03b-ui-spec.md` §1). Whenever the meaning of a key changes — space-bar floats in room mode but selects in dialogue, etc. — the strip updates to reflect the current context.

No combat. No fast reflex requirements (the wordless traversal is gentle, not twitchy). This is a thinking-and-feeling game.

---

## The Interaction Model: Narration with Contextual Choices

The game is a **SCUMM-inspired adventure game** in spirit — the player explores, finds objects, talks to characters, and chooses how to interact — but it does *not* use a persistent verb panel at the bottom of the screen. The screen stays quiet until Pip approaches something. Then the dialogue box blooms with narration. Then choices appear.

### Two flavors of interaction

**Atmospheric inspection.** Single-press up at a small object. The dialogue box appears with one or two lines of flavor text. No choices needed — there's nothing to choose. The box closes on space-press.

> *Through the porthole, dark water and the lights of a far shore. Norway, the brochure had said. The first stop.*
> *PIP: I never even got to see it.*

**Interactive inspection.** Press up at a meaningful object, NPC, or threshold. Narration plays. Then 2–4 choices appear inside the dialogue box, prefixed with numerals. Player picks with arrows + space, with number keys, or by clicking.

> *The door to the hallway. From the other side, you can hear someone crying.*
> *1. → Try the handle.*
> *2. → Press your ear to the door.*
> *3. → Knock softly.*
> *4. → Wait.*

Each choice leads to its own short sequence — different flavor text, sometimes different outcomes. Choices may be **soft-branching** (different texture, same convergent outcome) or **combinatorial** (the right choice unlocks progress; the wrong choice gives a hint and lets the player try again, no punishment).

### Choices are ability-gated

If Pip has earned an ability, choices using that ability appear. If he hasn't, they don't. *"Phase through"* won't appear at a wooden door until Pip has discovered he can walk through walls. *"Speak through"* won't appear at a radio until the radio ability is unlocked. *"Memory-gift"* won't appear at any character until Iris has taught Pip the verb (Chapter 5).

This is the SCUMM verb-grid expanding over time, but rendered contextually instead of as a permanent panel. As Pip grows, the world's choice menus quietly grow with him.

### How many choices

Two to four per moment. Each choice should be *meaningfully different* — not "look at door / examine door / inspect door." Each choice should lead somewhere that the others don't.

### No fail state

Wrong choices in a puzzle never kill or set back the player. The chef gives a hint. The monster grumbles. The player tries again. This rule is absolute.

---

## The Stat System: Strength and Empathy

Pip has two stats. Both grow across the game; both matter.

### Strength (the stomach model)

*(Sprint 12: Stomach model and blink-back failure mode replace the former lives system. The chewing-boy visual stays; the underlying model is now "Pip is hungry, not HP-tracked.")*

Strength is Pip's stomach. He is a hungry ghost-boy. His hunger — his appetite for the world — is what keeps him *here*. Without it, he fades back to a familiar threshold and gathers himself again.

**Visual:** a small chewing-boy face in the corner of the screen, with food traveling down his throat to a stomach meter that fills and drains. Pixel-art, ornate, on-tone. Persistent during gameplay; hidden during cinematics. See `03b-ui-spec.md` Section 3 for dimensions and animation states.

**What drains it (world hazards only):**
- Bumping into echo-creatures during traversal
- Stepping in snail-slime trails (slow, sympathetic drain)
- Being startled by environmental hazards
- A monster lashing out during a cleverness puzzle (occasional, light)

**What does NOT drain it:**
- **Wrong puzzle choices** — puzzles *never* punish. Wrong choices reveal information. Strength and puzzle failure are fully decoupled.
- Time spent exploring
- Talking to NPCs

**What restores it:**
- **Eating treats** (`↓` collect → auto-eat → stomach refills by the treat's value)
- **Chef meals** at chapter end (full restoration)
- **Blink-back** respawn restores stomach to baseline (60/100)

**Failure mode — blink-back:** When stomach reaches 0, Pip fades over 1.2s, a brief black pause (0.4s), then reappears at the *last room threshold he crossed*, stomach restored to 60/100. A single italic narration line appears and fades after 2s. No life lost. No chapter restart. The ship is kind. See `03b-ui-spec.md` Section "Blink-back" for full visual sequence.

### Empathy (memory inventory)

Empathy is what Pip *carries inside*. It grows as he collects memories — both the meal memories he earns from chefs and the monster memories he earns from each encounter. The bible's line *empathy strengthens his powers* is canon: empathy is the stat that makes memory-gifting (Chapter 5+) work.

**Visual:** a notebook page count, or a small filled-jars-on-a-shelf indicator. Less visible than strength during normal gameplay — surfaced when the notebook is opened, when memory-gifting is performed, and at the climax.

**How it grows:**
- Each chapter from Ch2 onward yields one notebook entry containing both a recipe component and a memory component (paired meal + monster memory)
- Quietly, in scenes where Pip witnesses something tender (Erik's birthday in Ch6, Iris's reunion in Ch5, etc.)

**What it does:**
- Strengthens memory-gifting from Chapter 5 onward
- At the climax in Greenpoint, empathy is the resource Pip spends to override the shadow's painful memories with joyful ones

### Lives system — retired

*(Sprint 12: The three-lives system is retired. The game has one continuous Pip; blink-back is the failure mode. See the Strength section above and `03b-ui-spec.md` for details. The puddle-ghost game-over is also retired — with blink-back as the universal failure mode, no terminal game-over state exists for stomach loss.)*

---

## The Collect Verb

*(Sprint 12: `↓` is now the collect verb. Built-in, not discovered. Taught diegetically at the first collectible.)*

`↓` collects the nearest warm-humming collectible — a treat, a useful item, or any object marked with the warm-pulsing collect aura (see "Two visual vocabularies" below). When nothing collectible is nearby, `↓` makes Pip squat in place — a small visible animation that gives the player visible "I tried" feedback and acts as a gentle brake action.

**Pickup behavior:** Pressing `↓` near a collectible plays the pickup tween (the treat or item moves from Pip's position toward the notebook icon in the HUD corner, ~0.6s). For treats: consumed on pickup, stomach refills, the treat is recorded in the notebook's Items section with a one-line annotation. For useful items: pocketed, not consumed, recorded in the notebook's Items section, usable contextually in dialogue choices.

**Teaching the verb:** The verb is taught *diegetically* at the first collectible encounter in Ch1 (the Bamsemums on Henrik's kitchen counter). The inspect text for the treat includes inline instruction (*"He could pocket this. ↓ to collect."*). No floating tutorial UI.

### Two visual vocabularies

Inspectable objects and collectibles use two visually distinct sparkle modes:

- **Inspect sparkle** (cool shimmer): the existing drifting warm-amber sparkle. Used for all `↑ INSPECT` targets.
- **Collect aura** (warm hum): a softer, broader, *pulsing* aura. Larger radius. Slower pulse (~1.2s cycle). Saturated warm amber, no drift — present and steady. Used for all `↓ COLLECT` targets.

The player should be able to tell which objects to inspect and which to pocket without thinking.

### Useful items vs. treats

**Treats** (food items): consumed on `↓` pickup. Refill stomach. Recorded in notebook Items section as a small pixel-art icon with a journal-style annotation. Treated as consumables.

**Useful items** (non-food objects — matches, candles, Iris's switchblade, etc.): pocketed on `↓` pickup. Not consumed. Do *not* refill stomach. Recorded in notebook Items section. Become available as a fourth dialogue choice when contextually relevant (e.g. *"4. Use the matches"*). Already-used items appear greyed-out in the notebook.

---

## Treats: gifts the ship left out for him

*(Sprint 12: Treats system locked.)*

Treats are small, hidden, on-theme food items scattered through each chapter. Per-region cuisine — Norwegian candies in Ch1, Estonian confections in Ch2, etc.

- **Quantity:** 3–6 per chapter from Ch2 onward. Ch1 has 4 (fewer, because the collect verb is taught mid-chapter — earlier placements are replay rewards).
- **Distribution:** Beginning-to-end through each chapter. At least one early-chapter treat for replay value. Ch1 is the exception: the cabin treat is a replay reward because the player hasn't yet learned `↓`.
- **Discovery locations:** Drawers, behind objects, on balconies, in cleaning carts, on observation decks. Some require later-earned abilities to reach.
- **Pickup:** `↓`. Auto-consume. Stomach refill. Notebook record. Two animations chained: pickup tween, then eating tween.
- **Scarcity is the rule.** Treats should feel like *gifts*, not coins. If they're cheap, they stop mattering.
- **Tone constraint:** Treats are *never* placed where collecting them would feel emotionally wrong for Pip to take from. The grandparents' cabin contains no treat in Ch1. This is the standing case-law for tone-vs-placement decisions across the whole game.

---

## The Inspection System

This is the game's primary verb. Most progression and storytelling happens through inspection.

**How it works:**
- Every interactive object has a position, a sparkle indicator, and either:
  - A list of narration lines (atmospheric inspection), or
  - A narration sequence followed by 2–4 choices (interactive inspection), or
  - A trigger for a cinematic, or
  - An item-pickup behavior

**What gets inspected:**
- Atmospheric objects (build environment, character) — single-line flavor
- Story objects (advance plot) — narration, possibly choices
- Clue objects (give hints toward puzzles) — narration, possibly choices
- Item objects (can be carried and used elsewhere) — pickup, narration
- People / NPCs (talk to them) — narration, choices

**Design rule:** Every room should have **at least 3 inspectable things**, even if only 1 is plot-critical. The other 2 build atmosphere. Players who inspect everything are rewarded with deeper storytelling.

---

## The Wordless Traversal

Each chapter from Ch2 onward opens with a wordless platforming segment on the ship. This is the chapter's *overture* — the player learns its tonal place through movement before any character speaks.

### What it looks like

- No dialogue. No UI. No narration. Just the room, the music, the sounds of the ship.
- Pip moves with arrows, floats with space-bar.
- Echo-creatures populate the space — different per chapter (spiders, mice, bats, cockroaches, snails, etc.).
- Hazards are gentle — spider-bumps cause a small instant strength drain; snail-slime trails cause a slower sympathetic drain. No twitch reflex required.
- Brief — 30 seconds to two minutes. The traversal is texture, not gauntlet.

### Echo-creatures

Echo-creatures are residues of forgotten incidents in the Mnemosyne's history. They are **the ship's own memory-residue**, not regional folklore. Each variety has its own traversal flavor:

- **Spiders** — skitter unpredictably; float over them.
- **Mice** — scurry in lines along the floor; time your movements to gaps.
- **Bats** — swoop in arcs; duck or float between waves.
- **Cockroaches** — stampede; find a high path to wait it out.
- **Snails** — slow and friendly, but they leave slime trails of someone-else's-grief that drain strength sympathetically. Path-finding through the gaps.

Each creature variety is tied to a canonical incident in the ship's history. The first such incident is **the great snail breakout** — a long-ago event in the Mnemosyne's earliest days, the source of the candle-lit snails who appear in the Brittany chapter. Other incidents will surface as new chapters are designed.

### Float ability

Pip discovers in Beat 8 of Chapter 1 that he can rise from the ground deliberately. He doesn't push off; he's a ghost. He just rises.

- Hold space-bar to float upward, roughly 1.5 character-heights at most.
- Release to descend gently.
- No double-jumps, no air-dashing. Float is a small, soft verb — enough to clear a low hazard or a small gap. Not enough to bypass climbing puzzles or access high areas (those still need stairs or other abilities).
- Float is *responsive*, not navigational. It's startle, not flight.

---

## The Monster Encounter

Each chapter from Ch2 onward features a folkloric monster who blocks Pip's path to the chef. The monster is **not an enemy** — they are an unwilling guide, a folk-creature with something to give. Defeating, appeasing, or feeding the monster yields the clue Pip needs to find the chef.

### Mechanics

The monster encounter is a **cleverness puzzle**, not combat. Same toolkit as chef encounters (riddle, memory match, ingredient logic, story completion) but with adversarial framing.

- Monster poses a question, sets a condition, or guards something.
- Pip is offered 2–4 choices — what to say, what to offer, which memory to share.
- Wrong choice: monster grumbles, hint surfaces, try again. No punishment.
- Right choice: monster relents, hands over the clue, walks off.

### What the monster gives

The clue varies per chapter. Working types:

- **A name.** The monster tells Pip the chef's name, or the dish's name, or the missing word.
- **A direction.** The monster points the way, hands over a map fragment, hums a song the chef recognizes.
- **An ingredient.** The monster has been hoarding the ingredient the chef needs.
- **A stolen memory.** The monster took the chef's own memory of why she cooks. Pip retrieves it.
- **A piece of the chef's story.** The monster knew the chef once. The fragment becomes a token of trust.

Each chapter chooses one. Variety keeps the structure fresh.

### Memory combat (the optional layer)

Pip can throw memories at the monster during the encounter as a tactical layer:

- **Meal memories cure.** Throwing a meal memory at a hostile monster overrides the monster's painful memory with a joyful one — the monster softens, becomes more willing to talk, accepts more reasonable terms. Meal memories are the *cure* — they progress the encounter.
- **Monster memories scare.** Throwing a previously collected monster memory at a current monster scares it back temporarily. Useful tactical breathing room when Pip's strength is low. *They don't progress the encounter* — the monster comes back. Only meal memories actually heal/weaken.

This split protects the climactic mechanic in the final chapter: *joyful overrides painful* is the verb the player learns, monster after monster, until at Greenpoint they apply it to themselves.

### Burp-and-feast (retired as combat resolution; preserved as image)

In earlier design we sketched a "monster burps up Pip's stolen food and Pip eats it ravenously" combat resolution. With monsters now being cleverness puzzles, that exact mechanic is gone. The image lives on:

- **Shared-meal beat.** After winning the encounter, the appeased monster offers Pip food — different per chapter (a half-eaten fish from a draugr, a slice of pizzelle from La Befana, jollof rice from Anansi, etc.). Pip eats. Strength refills. Tender, not triumphal.
- **Found-food beat.** Some chapters skip the shared meal — instead, Pip finds a small offering during traversal (a forgotten dish on a table, a shrine offering). Strength refills before the puzzle starts. The food is the threshold between dread and dialogue.

Each chapter chooses one or the other. Both work.

---

## The Chef Encounter

Each chapter ends with the meal — but the chef requires Pip to demonstrate understanding before they share the recipe. These are **text/dialogue-based puzzles** using the same UI as monster encounters and ordinary inspections.

**The principle:** puzzles are themed to the chef or monster posing them. The puzzle's form is drawn from their domain — what they would naturally pose, what bargain or test fits *their* lore. The four formats below are starting examples from early design; specific puzzles in specific chapters may sit outside them. Per-chapter puzzle designs live in `chapter-specs/`.

Four starting formats to rotate or extend:

### Format A: The Riddle
The chef poses a riddle whose answer is an ingredient or a concept.
> "To make gravlaks, three things are needed. Salt, the sea's gift. Sugar, the field's gift. And a third — what is the gift of time?"
> *Answer: patience / waiting* (gravlaks cures for days)

Multiple choice presentation by default — more accessible than free typing.

### Format B: The Memory Match
The chef tells a story about their childhood and the dish, then asks Pip to match ingredients to moments in the story.
> "When I was scared of the dark as a child, my grandmother gave me ___."
> Options: warm bread / a knife / a glass of water
> *Answer: warm bread*

### Format C: The Ingredient Logic Puzzle
A small logic-grid puzzle. Five ingredients laid out. The chef gives clues:
> "The fish goes before the dill. The lemon is not next to the salt. The sugar comes last."

Player drags ingredients into the right order.

### Format D: The Story Completion
The chef tells a story with a missing word that Pip has to provide based on what he's learned in the level.
> Player explored the level and saw a memorial to the chef's late wife.
> Chef: "I make this dish because it was hers. Her name was ___."
> *Answer found in environmental clues.*

**Failure rule:** Wrong answers never punish. The chef gives a hint and lets the player try again.

---

## The Notebook

*(Sprint 12: "Journal" renamed "notebook" throughout. Henrik gives Pip an empty notebook in Ch1; Pip fills it. The notebook now has three sections.)*

Pip's in-game record and progression tracker. It's the **bridge between the game and the website**, and it becomes the **weapon at the climax**. The notebook is the thematic object of the game — food, memory, and feeling unified in one artifact.

### What's in it

The notebook has **three sections**:

1. **Recipes (left page).** Per chapter. What Pip tasted. Boosts the strength stat. Unlocks the corresponding real recipe on the website.

2. **Memories (right page).** Per chapter. A pair of memories — one from the monster encounter (the "monster moment"), one from the chef encounter (the "meal moment"). Boosts the empathy stat. Stored for the final-chapter climax.

3. **Items (third section, accessed by paging right).** A growing record of every treat Pip has eaten and every useful item he has pocketed. Treats appear at full opacity with a one-line annotation (*"Bamsemums — from Henrik, in the kitchen"*). Useful items appear similarly. Used items appear at 40% opacity with a faint strikethrough.

Chapter 1's entry is unusual — the recipe is lefse and gravlaks, the memory is the doubled first-taste cinematic (gravlaks → Henrik with grandfather; lefse → Henrik with young Erik). It's a single chapter producing two memory layers.

### In the game

- Accessed by pressing `TAB` during gameplay (Sprint 12: was `ESC`)
- Shows completed chapters as filled-in pages with sketched recipes and tagged memories
- Shows current chapter as a partially-filled page
- Shows locked future chapters as blank pages
- From Chapter 5 onward, the paired-memory inventory becomes prominent in the UI
- Full layout and behavior locked in `03b-ui-spec.md` §5

### On the website

- Each completed chapter unlocks a real recipe page
- The notebook could appear in the website nav as "Pip's Notebook" or "The Last Bites Cookbook"
- Recipes get added as Julia adds them — so the game and the cookbook grow together

### The climactic use of the notebook

In the final chapter (Greenpoint), the shadow shows Pip painful memories from his journey — each one drawn from the "monster moments" he survived. Pip overrides each with the corresponding "meal moment" from the same chapter, in **reverse chronological order**. The notebook is no longer just a record. It is the inventory of what he has to spend. Every recipe he collected was secretly armor for this moment.

---

## Abilities and Progression

Pip starts with nothing and gains abilities as he learns about being a ghost. Each ability opens new puzzle solutions and adds new contextual choices to the world's inspection menus.

| Ability | Earned | What it unlocks |
|---|---|---|
| **Walk through walls** | Chapter 1 | "Phase through" choice on wooden doors and barriers (wood only, not metal) |
| **Talk through speakers** | Chapter 1 | "Speak through" choice on radios and intercoms |
| **Flicker electricity** | Chapter 1 | "Spark" choice on broken wiring and lights |
| **Float** | Chapter 1, Beat 8 | Hold space-bar to rise; bypass low hazards; required for traversal |
| **Taste-memory** | Chapter 1 | "Taste" choice on food; sees the cook's memory |
| **Possess small objects** | ~Ch 3 | "Inhabit" choice on small objects; move them |
| **Memory-gifting** | Chapter 5 (from Iris) | "Gift memory" choice on characters; manifest collected memories as visions for others. Empathy strengthens it. The most important ability Pip will gain |
| **Hear the sea** | ~Ch 6-7 | "Listen to the sea" choice at the deck; hear the ocean's memory of who passed by |
| **Be seen by the grieving** | ~Ch 7-8 | Some NPCs can now see Pip — those who've lost someone |
| **Cross water** | Late chapter | "Cross" choice over flooded passages; required for some late ports |

**Abilities are puzzle keys.** Each chapter's puzzle should require at least one ability — usually the newest one — to solve.

**On memory-gifting specifically:** This is Pip's emotional tool. After Chapter 5 he uses it to bring closure to other characters in the back half of the game — including, possibly, a failed attempt with Henrik in Chapter 4 (foreshadowing) and a successful crossing of the veil for Babcia in the final chapter. *Empathy strengthens his powers* is canon: when Pip cares about someone, the ability gets stronger.

---

## The Ship as Hub

Between chapters, Pip returns to the ship (*The Mnemosyne*). The ship is the persistent space that grows over time.

**Hub mechanics:**
- Pip can re-explore any room he's unlocked
- New conversations open with NPCs as the story progresses
- New rooms unlock as Pip gains abilities or plot triggers happen
- Henrik is always in the kitchen, ready to talk
- Pätu the cat lives somewhere on the ship, encountered occasionally
- The notebook is always accessible (press `TAB`)
- A world map shows visited ports and the next destination

**This is where slow-burn storytelling lives.** A passenger you saw in Chapter 2 has a different conversation in Chapter 4 because their husband has died. The captain's logbook gains new entries. A locked door from Chapter 1 finally opens in Chapter 6.

**The ship has a haunted history of its own.** The great snail breakout. Other incidents to be specified. The echo-creatures Pip encounters in each traversal are the residues of these past events. Inspectable objects throughout the ship can drip out lore.

---

## Saving and Continuity

The game saves to localStorage in the browser. When a player returns, they pick up where they left off. The notebook persists. Their abilities persist. Their port history persists. Their **paired memory inventory** persists from Chapter 5 onward. Their two stats (strength, empathy) persist.

**Save points:** Auto-save when entering a new room, auto-save when completing a puzzle, auto-save when unlocking a recipe, auto-save when reaching a checkpoint, auto-save when adding to the paired-memory inventory.

**Checkpoints:** Three per chapter (Ch2+) — beginning of chapter, chef encounter, end of chapter. Death respawns at the most recent reached.

---

## What the Game Asks of the Player

- 15–30 minutes of attention per chapter
- Willingness to read (this is text-rich)
- Willingness to explore (the rewards are story, not power-ups)
- Patience with puzzles (no twitch reflexes)
- Mild attention to spatial movement during the wordless traversal (no skill required, but noticing when echo-creatures are coming)
- An open heart (the game will try to make you cry, gently, sometimes)

---

## What the Game Does NOT Ask

- No purchases
- No accounts (just localStorage)
- No social features
- No timers or pressure
- No twitch combat
- No truly punishing failure (puddle-ghost respawn is the worst it gets, and it's gentle)
