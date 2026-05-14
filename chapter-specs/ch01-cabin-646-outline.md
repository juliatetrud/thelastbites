# Chapter 1 Outline — Cabin 646

The opening chapter. Pip wakes, learns he's dead, meets Henrik, earns the journal, watches his grandparents leave.

This document is the **narrative outline** for the chapter — its emotional shape, structural beats, and the working assumptions for monster/chef/recipe/clue. Implementation-grade detail (dialogue, cinematic specs, beat-by-beat) lives in `04-chapter-01-cabin-646.md`. When the two docs disagree, this outline is the more recent thinking; the implementation doc may need to be updated.

---

## Position in the arc

Chapter 1 is the **exposition** of the seven-beat arc. It is also the structural exception — every chapter from Ch2 onward follows the rhythm of *wordless traversal → monster cleverness puzzle → chef encounter*. Chapter 1 is shaped differently. There is no monster encounter and no chef puzzle. Henrik plays both roles, in a single warm-spooky introduction.

---

## Emotional arc

Pip wakes not knowing he's dead. Through the mirror, the truth lands. He explores the ship, sees his grieving grandparents, discovers his ghostly abilities, and is unexpectedly *seen* by Henrik the chef. Henrik feeds him. Henrik tells him about the world's spirits. Henrik gives him a journal. The chapter closes at the dock as Pip's grandparents disembark with his body.

**What Pip carries in:** Curiosity. A kid's appetite for the world. The memory of his grandmother's apron and a notebook of 142 dishes.

**What Pip learns:** He is dead. He cannot follow his family home. Food carries memory — a meal can show you who made it. The world has spirits in it (Henrik's Nøkken story plants this). Some grown-ups can see him; most cannot.

**What Pip carries out:** A blank journal. The promise to taste his way through the world. A relationship with Henrik that will deepen across the game. The half-spoken question: *how could Henrik see me when no one else could?*

---

## Setting

The Mnemosyne, in port at Bergen, Norway. Six rooms in this chapter:

- **Cabin 646** — where Pip wakes (after the Sprint 10.7 restructure, Pip actually starts in the hallway; the cabin is a destination)
- **The hallway** — corridors, the passenger and the janitor
- **Grandparents' cabin** — the gut-punch
- **Dark corridor / stairwell** — the broken-light puzzle, the float discovery
- **The kitchen** — Henrik
- **The observation deck** *(Sprint 12, locked but deferred)* — quiet wonder beat between kitchen and dock farewell; northern lights through a wide viewport

The chapter ends on the deck, looking down at the dock.

*(Sprint 12: updated to six rooms — the observation deck is now locked into the chapter between kitchen and dock farewell. Its implementation is deferred to a future Ch1 content sprint.)*

---

## Monster equivalent

There is no monster encounter. Henrik occupies the structural slot of "frightening obstacle" in the brief moment before he sits down — when his mouth opens in a silent scream at the floating cracker. The horror lasts for one beat and resolves into tenderness. The whole chapter is built around that pivot.

**Foreshadowing planted:** Henrik tells Pip the story of the Nøkken, the Norse water-spirit who plays the violin to lure people to drown. He tells it as a *folk tale*, but the player should feel that he believes it. His wife Henrietta and his son Erik drowned together in a boating accident. Henrik was there and could not reach them. He believes a violin played as he tried. (He may not say all of this in Ch1 — the full reveal is Ch4. The story is the *seed*.)

---

## Chef equivalent

Henrik. He is mentor, monster-replacement, and chef-equivalent in this single chapter.

Recipe taught: **lefse and gravlaks (with Norwegian pickles).**

This is *Erik's favorite meal* — though Pip and the player do not know that yet. Henrik says only that Babcia recommended it. The truth lands in Chapter 4. The whole chapter sits on this secret weight.

The chef "puzzle" is not really a puzzle in this chapter. Pip eats. He tastes. He sees Henrik's memory. There is no test. The first meal is given freely. This sets up the *contrast* with later chapters, where chefs require Pip to demonstrate understanding.

---

## Clue mechanism

Not applicable. There is no monster releasing a clue toward a chef. Henrik instead gives Pip *the offer itself* — the empty recipe journal — and the destination of the next port (Estonia, in the revised plan; the existing doc 04 says Bergen but that's now Chapter 1's port, not Ch2's).

---

## Recipe earned

Lefse and gravlaks with Norwegian pickles. Unlocked on the recipe website at the chapter's end.

---

## Memory pair for the climax

Chapter 1 produces an unusual memory entry. Most chapters from Ch2 onward produce one paired memory (one frightening, one feeding). Chapter 1 produces a *doubled meal-memory* and a separate *frightening foundation*:

- **Frightening foundation (the climax's recurring channel):** The melting face in the mirror. This becomes the shadow's recurring "static channel" in the final chapter. It is not a "monster moment" in the chapter rhythm sense — it is the *image* the shadow keeps tuning back to.
- **Meal moment (gravlaks):** Henrik as a young boy, learning to cure salmon from his own grandfather. (Cinematic 6a.)
- **Meal moment (lefse):** Older Henrik teaching young Erik to make the same lefse. (Cinematic 6b. Erik's face partially hidden — load-bearing for Ch4.)

When Pip overrides shadow-memories in reverse chronological order at the climax, the Ch1 meal-memory he'd reach last is the *gravlaks* one (the deepest, the inheritance, the chain). The lefse memory may be reserved for the Ch4 reveal moment instead. *(This is provisional and worth confirming when planning the climax.)*

---

## Abilities earned

Five abilities are introduced in this chapter, in this order:

1. **Walk through wood (not metal).** Discovered at the cabin door (Beat 4). Hand passes through the doorknob.
2. **Talk through speakers.** Discovered at the radio in the grandparents' cabin (Beat 7).
3. **Flicker electricity.** Used in the dark corridor puzzle (Beat 8) to repair a fallen sconce.
4. **Float.** Discovered alongside the electricity, also at Beat 8 — the broken glass on the floor from the fallen sconce. Pip rises instinctively to avoid it, and the narration catches up. Hold space-bar to float roughly 1.5 character-heights, briefly. He's a ghost; he doesn't push off the ground. He rises.
5. **Taste-memory.** The doubled first-taste with Henrik (Cinematic 6a/6b). Eating food shows the cook's memory of making it.

Before Beat 8, space-bar does nothing. The float ability is *gated* by the discovery moment — the verb arrives in the player's hands when the chapter says it does, not before.

*(Sprint 12: A sixth "ability" is now taught in this chapter: `↓ COLLECT`. It is not a ghostly ability but a built-in verb taught diegetically at the kitchen Bamsemums beat. Before Beat 11b, `↓` makes Pip squat; after it, the player understands the warm-humming collect aura and what `↓` does near one.)*

## Treats in Ch1

*(Sprint 12: New section. Ch1 has four treats — fewer than the 3–6 standard for later chapters because the collect verb is taught mid-chapter. Earlier-placed treats function as replay rewards rather than first-playthrough finds.)*

1. **Cabin (early, replay-reward).** A treat hidden in the cabin. The warm-humming collect aura is visible from the chapter's start, but Pip cannot collect it because he hasn't learned `↓` yet. After learning `↓` at the kitchen Bamsemums, a player who returns to the cabin (or replays the chapter) can collect it. **Suggested treat:** a Smørbukk (Norwegian caramel toffee in yellow wrapper), tucked in the bedside drawer. Specific treat TBD in Ch1 content sprint.

2. **Kitchen counter (tutorial treat, locked).** Bamsemums, placed by Henrik. The treat that teaches the `↓` verb via inline narration (see Beat 11b in `04-chapter-01-cabin-646.md`). Sprint 13 implements this one.

3. **Dark-corridor cleaning cart.** A treat tucked into the janitor's abandoned cleaning cart. Collectable on a return pass after Pip has learned both `↓` (kitchen) and float (broken-glass moment). **Suggested treat:** a Skillingsboller (Bergen's signature cinnamon bun) wrapped in waxed paper — a half-eaten end-of-shift snack the janitor left behind. Specific treat TBD in Ch1 content sprint.

4. **Observation deck.** A treat on the new observation deck room. Mood-appropriate to the open-air aurora setting. Specific treat TBD in Ch1 content sprint — could be a chocolate left by a stargazer, a packet of Smørbukk someone forgot in the cold, or a regional Norwegian sweet that fits the contemplative tone.

**Tone constraint:** No treat is placed in the grandparents' cabin. The room is grief-coded; the gesture of Pip eating a snack while Babcia sobs nearby would feel wrong. This is the standing case-law for treat-placement-vs-tone decisions across the whole game.

---

## Objects earned

- **The candle.** Henrik gives Pip a small candle at Beat 13, alongside the journal, when Pip mentions he doesn't sleep much. *"Then take this. The ship's quieter than it looks at night, but the corridors get dark."* Pip pockets it. The candle becomes Pip's nighttime companion on the ship — useful narratively whenever a chapter needs warmth in cold places. **First load-bearing use: Ch4 (the Karakoncolos puzzle).** Matches are added to Pip's pocket at the end of Ch3 (Pätu meows at them on the way back to the ship).

---

## Updates to the chapter implementation doc (04-chapter-01-cabin-646.md)

These are the changes the implementation doc needs based on today's design conversation. They have not yet been applied to doc 04. When the chapter is next worked on, layer these in:

1. **Henrik's wife is named Henrietta.** She and Erik drowned together in a boating accident. Henrik was present and could not reach them. He believes a violin played as he tried.
2. **Henrik's reason for going to sea is revised.** Not just "the constant motion was easier." He went to sea to be *closer to their spirits*, which he believes live in the water. The bible has been updated; doc 04 has not.
3. **The Nøkken story.** Henrik tells Pip about the Nøkken — the Norse shape-shifting water spirit who plays the violin to lure people to drown. The story lands *after Cinematic 6b*, folded into the existing Beat 11 (the first-taste sequence). Henrik tells it in a "you should know what's out there" register, segueing naturally into the offer of the journal (Beat 13 / Cinematic 8). He doesn't say it's about Henrietta. The player should feel it anyway.
4. **A small subtext beat at the journal offer.** Henrik offers Pip the journal at sunset, over the water. The water has always taken from him. Now it has given him a boy. This doesn't need explicit dialogue — it's a quiet weight in how the scene is staged.
5. **The next port is no longer Bergen.** Chapter 2 is now Estonia. Henrik may name the next port at the end of Beat 13: *"Tomorrow we are in Tallinn"* (or wherever; see Ch2 outline). Doc 04 currently says Bergen — needs updating.
6. **Henrik gives Pip a candle in Beat 13.** Alongside the journal. When Pip mentions he doesn't sleep much (or in response to Henrik's *"Get some rest, Pip" / "Do ghosts rest?"* exchange that already exists), Henrik produces a small candle. *"Then take this. The ship's quieter than it looks at night, but the corridors get dark."* Pip pockets it. This is a load-bearing prop for Ch4 (the Karakoncolos puzzle); doc 04 needs the beat folded in. Matches are introduced separately at the end of Ch3.

These are notes for the eventual implementation update, not for now.

---

## Open questions

- Henrik's specific Nøkken-story dialogue, when written, should match the narrator's voice (kinetic verbs, gentle parenthetical winks, a single sharp word) but be shaped to *Henrik's* voice, which is gruffer, more economical. Worth drafting carefully.
- The lefse-vs-gravlaks split for the final climax (which one Pip reaches last in his reverse-chronological override). Provisional answer: gravlaks. Confirm when planning the climax.
- The doubled first-taste cinematic (6a + 6b) is canonically two taste-memories from one chapter, both load-bearing. Worth flagging in the notebook UI design that Ch1 contributes *two* meal-memories rather than one.
- Whether Henrik says aloud, in Ch1, that he believes the dead live in the sea — or whether that line is reserved for Ch4. Provisional answer: reserved for Ch4. The Ch1 telling of the Nøkken story is enough for the player to feel it.
- **Ch1 cabin replay-treat: specific treat and exact placement.** Suggested Smørbukk in the bedside drawer; alternatives welcome. Flagged 2026-05-14. To be resolved in Ch1 content sprint.
- **Ch1 cleaning-cart treat: specific treat.** Suggested half-eaten Skillingsboller wrapped in waxed paper. Flagged 2026-05-14. To be resolved in Ch1 content sprint.
- **Ch1 observation deck treat: specific treat.** Mood-appropriate to open-air aurora setting. TBD. Flagged 2026-05-14. To be resolved in Ch1 content sprint.
- **Observation deck implementation.** Background art, navigation, aurora visual, beat dialogue, inspectable list, exact arrival mechanism from kitchen. Locked in docs but not yet built. Flagged 2026-05-14. Will be its own sprint (or part of the broader Ch1 content sprint).

---

## What this chapter teaches the player (mechanical literacy)

- How to walk and inspect (room mode)
- How dialogue choices appear and resolve (narration-with-choices model)
- That abilities are *discovered*, not granted from a menu
- That the world has things you can't immediately solve (the locked door, the dark corridor) and abilities are how you solve them
- That food is the central verb of this game
- That cinematics happen at emotional peaks, not as cutscenes between zones
- **That the world contains hidden treats, scattered for him to find** *(Sprint 12)*
- **That food picked up refills his stomach — the verb is the system** *(Sprint 12)*
- **That the notebook keeps a record of what he's eaten** *(Sprint 12)*
- **That the world also contains beauty without purpose — the northern lights, seen for their own sake** *(Sprint 12)*

By the end of Ch1, the player should know how to inspect, choose, walk, float (briefly), phase through wood, spark electricity, talk through speakers, taste food, and pocket a treat with `↓`. They should not yet have seen a wordless traversal, a monster encounter, or a chef puzzle — those arrive in Chapter 2.
