---

# The Observation Deck

The chapter's breath. Between Henrik's warmth and the dock farewell. A wide curved viewport, the aurora moving slowly across the dark sky, a few wooden benches, a coiled rope, a small telescope. Pip can stand here as long as he wants. The chapter is saying: *there is also beauty in this world; you can stop for it.*

## Status

**Built — Sprint 27 (`966cacf`).** The room is live in `game/index.html`.

Ch1's six-room layout is now complete: hallway → grandparents' cabin → Cabin 646 → dark corridor → kitchen → observation deck.

The doc below preserves the original design intent; implementation specifics are noted where they differ or were settled.

## Purpose

A single room playing one role: **the quiet wonder beat between kitchen and dock farewell.**

Pip has just been seen and fed by Henrik (Beat 11). He has just received the empty notebook. He has not yet seen his grandparents leave (Beat 12). The observation deck is the chapter's pause — the moment where Pip is allowed to be a small ghost-boy looking at the sky.

Mechanically, this room is the chapter's **calm-down room**. After the dark corridor's puzzle work and the kitchen's emotional first-taste, the player needs a room with no urgency, no puzzle, no character demanding interaction. The deck delivers that.

## Spatial layout

Side-scrolling room, single-screen or slightly wider (~600–800 px world width). Smaller than the hallway, bigger than the cabin.

- **Pip enters from the left** via a transition from the kitchen. The arrival mechanism is TBD per Sprint 12 — Pip either drifts up a short stairway from the kitchen, or wanders out and finds himself there. The latter is more in keeping with the dreamy tone.
- **Pip exits to the right** via a triggered transition that begins the **dock farewell cinematic (Beat 12)**. Walking off the right edge starts the closing sequence.
- **The curved viewport runs along the top half** of the room — a wide window in a wood frame, curved like a ship's observation glass. The aurora is visible beyond.
- **The deck interior occupies the lower half** — wooden floor, wooden benches, the rope, the telescope.

## Parallax layers

The room's central visual feature is the **aurora animation behind the viewport**. This is the chapter's most-animated single element.

Suggested layered approach (similar to the porthole-scenery system):

- **Far layer (deep sky):** very dark indigo to near-black, with occasional dim stars. Almost static.
- **Mid layer (aurora ribbons):** cool greens (`#3a7048`, `#5a9068` highlights) and violets (`#5a3878`, `#7a4898` highlights) drifting slowly. Two or three overlapping ribbon shapes moving at slightly different rates. Soft, painterly. ~15–30 second cycle.
- **Near layer (foreground viewport frame):** wooden window mullions, brass fittings. Static.

The aurora doesn't need to be a fully procedural simulation — a layered set of slow-drifting curves with soft alpha falloff will read as aurora. The motion register is *very slow* — slower than the porthole-scene water, slower than anything else in the chapter. The aurora is breath, not movement.

Behind Pip, the deck interior gets the standard half-speed wall-panel parallax (consistent with cabin/hallway/grandparents' cabin).

## Lighting

The lighting is **cosmic, not domestic** (per Sprint 12). This is the only Ch1 room with no warm light source.

- **Wall gradient:** cool, slightly desaturated — a deep blue-grey. Suggested: `#1a2230` top, `#1e2638` mid, `#161e2c` bottom.
- **Aurora cast:** the room's primary light comes from the aurora through the viewport. Soft greens and violets fall on the floor and benches as faint colored patches. Not enough to feel "lit"; just enough to feel touched by the sky.
- **No sconces, no lamps, no warm pools.** The deck is the chapter's first un-warmed room.
- **Mood register:** quiet wonder. Cold but not hostile. The cold is part of the beauty.

## Props and inspectables

### The aurora (inspectable, atmospheric)

- **Position:** beyond the viewport, ambient — the player inspects "the aurora" by approaching the viewport itself.
- **Interaction:** `↑` triggers narration. Per Beat 11c outline:
  > *Pip has never seen the northern lights before. He wonders if he would have, had things gone differently.*
- **Aura:** breadcrumb-elevated — the aurora is the room's primary draw, signaled by aura intensity.
- **Repeatability:** can be re-inspected. Each inspection could rotate through additional lines (Pip noticing different colors, Pip thinking about Babcia, Pip thinking about how cold the air must be). Or a single static line — settle in Ch1 content sprint.

### The wooden benches (ambient, possibly inspectable)

- **Position:** two or three benches distributed along the deck. Suggested: one at world-x ~`160` and one at world-x ~`460`.
- **Visual:** simple wooden benches, weathered, period-appropriate. Slatted seat and back. ~30 px wide × ~16 px tall.
- **Interaction:** could be inspectable with a small "someone was sitting here recently" narration. Or pure decoration. Lower priority than the aurora — settle in Ch1 content sprint.

### The coiled rope (ambient, possibly inspectable)

- **Position:** world-x ~`280`, on the deck floor.
- **Visual:** coiled marine rope, period-appropriate. Reads as working ship detail.
- **Interaction:** could be inspectable with a brief "a working ship-detail Pip notices because the room is so still" line. Or pure decoration.

### The brass telescope (ambient, possibly inspectable)

- **Position:** world-x ~`540`, on a tripod near the right side.
- **Visual:** small brass telescope on a wooden tripod. Pointed slightly upward (toward the aurora? or toward the far shore?).
- **Interaction:** could be inspectable with a "Pip looks through it; he sees a far shore" line. Telescope as memory-aid — the far shore is Norway he never got to see.

### The treat (collectible)

- **Position:** TBD. Plausible locations per Sprint 12 outline: tucked inside a bench's cushion, behind the telescope, in a coil of rope, on a railing where someone set it down.
- **Visual:** treat sprite per Ch1 treat list. Specific treat TBD — mood-appropriate to the open-air aurora setting. Candidates per visual research tracker: a chocolate bar left by a stargazer, a packet of Smørbukk forgotten in the cold, a Kvikk Lunsj (Norwegian chocolate biscuit, the classic Norwegian stargazer/hiker treat).
- **Aura:** collect aura (warm hum, broader pulse) — distinguishable from inspect sparkles.
- **Interaction:** `↓` to collect. Standard treat behavior per Sprint 12.

## NPCs present

**None.** Pip is alone on the deck. This is intentional — the room is a moment of solitude. No passenger, no Henrik, no janitor.

Even ambient NPCs (a stargazer in the background, a crewman coiling rope) would change the room's emotional register. The deck is empty *because* it should be empty.

## Ambient life

The room is **mostly still**. The only motion is:

- **The aurora animation** — slow, layered drift.
- **Faint stars** — scattered seeded dots in the deep-sky layer, barely twinkling.
- **The wooden floor** — static, but with subtle plank seams catching the aurora's cast light.

No echo-creatures, no flickering lights, no dust motes, no scripted NPC walks. The deck is the chapter's quietest room.

**One possible addition:** the *cold breath of the wind*. If audio is wired, a very soft wind ambient could play here — not howling, just the suggestion of open air. Atmospheric only.

## Treat placement

**One treat lives here.** See above — specific treat and exact placement TBD per Ch1 content sprint.

This is Ch1's **fourth and final treat**, completing the chapter's set (per Sprint 12):

1. Cabin (replay reward) — Smørbukk suggested
2. Cleaning cart (dark corridor) — Skillingsboller suggested
3. Bamsemums (kitchen) — locked, the tutorial treat
4. Observation deck — TBD

The collect aura draws Pip's eye. The treat is gentle to find, not hidden cruelly.

## What this room communicates

The observation deck is the chapter's **proof that the world is still beautiful**. Pip has spent the chapter walking through grief — the lump in the bed, the broken sconce, the grandparents' weeping. The deck is a room that asks nothing of him. He can just stand and look.

The room teaches the player:

1. **The chapter has room for quiet.** Not every space exists to drive the story forward. Some rooms exist to let the player breathe.
2. **Pip's gentleness has not been broken.** He notices beauty. He wonders about counterfactuals (*had things gone differently*). The chapter has not turned him into a sad ghost — he's still a curious boy.
3. **The world has things in it that Pip will never quite reach.** The aurora is real but beyond the glass. Norway is real but beyond the porthole. The far shore is real but beyond the telescope. Pip's relationship to the world from now on is *adjacent to, not part of.*

The room also sets up the dock farewell that follows. The aurora's slow drift trains the eye to soften, to look without urgency. When the dock scene lands — Babcia stopping, looking up, almost catching Pip's eye — the player is in a contemplative register, primed to receive grief without flinching.

## Visual research references

From `design-docs/visual-research-tracker.md` (Ch1 section):

- **Observation deck — wide viewport, aurora-viewing space:** Wide curved viewport or skylight, deck chairs, brass railing, a brass telescope on a stand. Open to the night sky. Aurora visible through the glass. Quiet wonder beat.
- **Northern lights / aurora over the Mnemosyne:** Green-and-violet aurora ribbons over dark ocean, ship silhouette below. Bergen latitude aurora reference. Read for *wonder*, not eeriness.
- **Observation deck treat — TBD:** Mood-appropriate to open-air aurora setting. Candidates: a chocolate bar left by a stargazer, a packet of Smørbukk forgotten in the cold, or a contemplative Norwegian sweet (kvikk lunsj?). TBD in Ch1 content sprint.

## Open questions — resolved (Sprint 27)

1. **Arrival mechanism.** ~~TBD.~~ **Resolved:** standard `startTransition('observationDeck', 'fromLeft')` fade — the dreamier "finds himself there" register. No architectural stairway drawn.

2. **Aurora animation approach.** ~~Open.~~ **Resolved:** new dedicated `drawObservationDeck` function with inline aurora logic. Three LinearGradient ribbon bands (green, violet, green) clipped to the viewport interior using `ctx.save()/ctx.clip()/ctx.restore()`. Screen-fixed — does not scroll with camX.

3. **Observation deck treat.** ~~Kvikk Lunsj or Smørbukk?~~ **Resolved (Decision 3, 2026-06-01):** **Kvikk Lunsj.** Red wrapper, gold foil stripe. `id: 'observation-deck-treat'`, `sprite: 'kvikklunsj'`.

4. **Telescope interaction.** ~~Settle in dialogue.md.~~ **Deferred to Sprint 29** as an optional flourish. Telescope is an ambient prop in Sprint 27; the aurora is the required inspectable.

5. **Replay value.** The room rewards stillness. No mechanical change needed.

6. **Wind audio.** Deferred to sound-design sprint.

7. **Aurora response to Pip.** **Resolved:** aurora motion is screen-fixed and completely independent of `pip.x`. Indifference is the design.

