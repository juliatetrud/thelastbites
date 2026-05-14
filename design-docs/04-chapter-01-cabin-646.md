# Chapter 1: Cabin 646

The opening chapter. Establishes Pip, the world, the mechanics, the emotional stakes.

**Estimated playtime:** 15-20 minutes
**Cinematics needed:** 9 (see art doc — note the doubled first-taste scene)
**Rooms needed:** 6 (Cabin 646, Hallway, Grandparents' Cabin, Radio Room or Stairwell, Kitchen, Observation Deck)

*(Sprint 12: observation deck added — see "The Observation Deck" section below. Implementation deferred to a future Ch1 content sprint.)*

*(Sprint 10.7 note: Pip now starts in the Hallway, not Cabin 646. The cabin is entered from the hallway. See Beat 1 rewrite below.)*
**Recipe unlocked:** Norwegian lefse and gravlaks (with Norwegian pickles) — **Erik's favorite meal**, served by Henrik because the player doesn't know yet that Henrik had a son

---

## Chapter Arc Summary

Pip wakes in his cabin not knowing he's dead. Through the mirror, the truth lands. He explores the ship's hallway — passing two living people who can't see him, establishing the rule he expects to apply universally. He sees his grieving grandparents, discovers his ghostly abilities, makes his way to the kitchen, and is unexpectedly *seen* by Henrik the chef. Henrik becomes his mentor, gives him his first taste-memory experiences (a doubled cinematic — gravlaks then lefse), and sets up the journey ahead. The chapter closes at the dock as Pip's grandparents disembark with his body.

---

## Beat-by-Beat

### Beat 1: WAKING IN THE HALLWAY (Sprint 10.7 rewrite)
**Mode:** Room — Hallway (starting room)

*(Replaces the former cabin-start opening. Pip now materializes in the hallway, not the cabin.)*

**Neutral plane.** The ghost-world is gentle by design. Newly-dead spirits don't wake where their body sleeps — that would be too jarring. They wake in neutral planes: spaces of habit, transit, or shared use. The hallway of *The Mnemosyne* is Pip's neutral plane. He wakes here because something in the ghost-world is being kind to him. (See `01-story-bible.md` § Neutral planes.)

**Opening sequence (Sprint 10.7 implementation):**

Pip materializes pixel-by-pixel into the leftmost end of the ship's hallway, mid-yawn. His sprite appears progressively over ~1.5 seconds — pixels revealing like a slow coming-into-focus. During the materialization, his mouth is wide open and his eyes are narrowed to slits: the yawn. He does not perceive the materialization as unusual. By the time the yawn finishes, he is fully materialized and idle.

After the yawn completes, a dialogue box appears with opening narration:

> *Pip yawns. He doesn't remember falling asleep, but that's not unusual. The hallway hums softly around him.*

Player presses Space to dismiss. Player control begins.

**Left wall:** Pip cannot move further left than his start position. The hallway has a visible left wall. Movement is right-only at game start until Pip naturally walks past the start zone.

*(See Sprint 10.7 spec for materialization + yawn technical details. The sequence plays once per hard game load — refreshing the browser replays it.)*

---

### Beat 2: WAKING IN THE CABIN (first cabin visit — now entered from hallway)
**Mode:** Room — Cabin 646

*(The cabin is now a destination Pip enters from the hallway, not the starting room. The hallway is the home base; the cabin door in the hallway leads here.)*

**Cabin door in the hallway (Sprint 10.7):** The cabin door is labeled Cabin 646. Inspection text:
> *Cabin 646. Pip's cabin. The door is closed but unlocked.*

Pressing `↑` near the door transitions into the cabin.

**Lump-in-bed (Sprint 10.7):** From this sprint onward, the bed contains a **lump under the covers** — a soft shape suggesting a small body. A long bump along the bed's length, slightly larger toward where a head would be. No facial features, hair, or limbs are drawn. The lump is implied, not displayed.

The lump carries the standard warm-amber aura (baseline ~0.15, not breadcrumb-elevated). This is ambient dread, not a directive. Pip can choose not to investigate.

**Inspect text — Bed (pre-reveal, Sprint 10.7):**
> *I wonder what that lump is. Maybe I don't want to know.*
*(Italic — Pip's interior thought.)*

**Inspect text — Bed (post-reveal, Sprint 11):**
*(After the bed-reveal cinematic plays, gated on `cabinState.bedRevealed === true`):*
> *Hmm, my old bed.*
*(Italic — Pip's interior thought.)*

**Other cabin inspectables (unchanged):**
- **Porthole** (showing distant Norwegian coast) — unchanged
- **Door** (the three-choice man-talking dialogue) — unchanged

**Inspect text — Porthole:**
> *Through the porthole, dark water sparkles and dances in the lights of a far shore. Norway, the brochure had said. The first stop.*
> PIP: *"I never even got to see it."*

*(Mirror moment is Beat 3 / Sprint 11, entered as a return to the cabin Pip has already been in.)*

---

### Beat 3: THE MIRROR (inciting incident — a return to the cabin)
**Mode:** Cinematic 2 (MIRROR) + Cinematic — Bed Reveal + Scripted Panic Sequence

*(Sprint 10.7 note: this is now a *return* to Cabin 646 — Pip has already been in the cabin earlier in the chapter. The dread has been building since he first saw the lump in the bed. The mirror gives him no choice but to confront what he has been walking past.)*

*(Sprint 11: this beat now has four parts: mirror cinematic → breadcrumb-led bed investigation → bed-reveal cinematic → panic exit.)*

**Precondition:** Pip has visited the grandparents' cabin (the grandparents' cinematic has played). After returning to the hallway, the mirror and bed in Pip's cabin now glow with elevated breadcrumb auras (~0.45 baseline + slow pulse), drawing the player back.

**Part 1: Mirror cinematic.** Pip approaches the mirror. The screen transitions to the close-up cinematic. His human face melts downward over ~2s — the liquid-drip effect — resolving into his ghost-face in the mirror's surface.

Dialogue (Sprint 11):
> *Pip looks. Pip looks again. The boy in the mirror is not the boy who walked in.*
> *I'm not me.*

The cinematic ends. The mirror's reflective surface now permanently shows the ghost-face. The cabin returns to room mode.

**Part 2: Bed reveal.** The bed's aura intensifies (sole breadcrumb-elevated object). Pip walks to the bed. Pressing `↑` triggers the bed-reveal cinematic: the sheets pull back over ~0.6s, revealing a small still child-shaped form — pale, hair soft brown, face turned away toward the wall. No facial features drawn. The body is partially obscured by the remaining sheet edge.

Dialogue (Sprint 11):
> *The boy in the bed does not move.*
> *Oh.*

The cinematic fades out. The cabin returns to room mode. **The bed reverts to its pre-reveal appearance — the body is not shown in the room after the cinematic ends.** The image lives in the player's head, not on screen.

**Part 3: Panic float.** Immediately after the bed-reveal dialogue closes, Pip's sprite involuntarily floats upward ~30 px, hangs briefly (~0.5s), then drops back to the floor. Player has no input control during this sequence. **This does NOT unlock the float ability** — space bar continues to do nothing for the player. This is a scripted one-shot foreshadowing Beat 8. *(See `06-roadmap-and-open-questions.md` Decisions Log, 2026-05-14: "Involuntary panic-float locked as foreshadowing for Beat 8.")*

**Part 4: Panic glide + tear spray.** Once Pip's feet touch the floor, his sprite glides toward the cabin door at 1.8× normal walk speed. Small cool-white teardrop particles arc backward from his eyes, fading within ~0.4s (~6 drops/second). He continues gliding through the door and into the hallway. Player control is restored once he is in the hallway. The tears stop.

**Tone note:** This sequence must read as *gentle-comic* alongside the grief. The fast glide + tear spray is not undercutting Pip's devastation — it is both real grief and a small ghost going very fast. That's the register. Don't dampen the comic.

A new hint (for Beat 4): *"Find Babcia."*

Now the cabin door becomes the trigger.

---

### Beat 4: THE DOOR (first ability - walk through walls)
**Mode:** Cinematic + Room

Pip approaches the door. From the other side, faint sound: someone crying.

He tries the handle. The screen transitions to Cinematic — the hand-through-doorknob shot.

Dialogue:
> *The door to the hallway. From the other side, you can hear someone crying.*
> PIP: *…Babcia?*
> *Pip reaches for the handle. His hand passes through it.*
> PIP: *Wait — what?*
> *Maybe… he could pass through too?*

After cinematic, control returns. The door is still "locked" mechanically, but **the player must figure out to walk INTO the door.** A subtle hint: when Pip is touching the door, a small ghost-shimmer effect appears.

Pressing into the door long enough triggers a cool ability-discovery animation — Pip phasing through. **First ability earned.**

The chapter notebook updates: *"I can pass through wood. Not metal — that still feels solid."*

Pip steps into the hallway.

---

### Beat 5: THE HALLWAY (exploration + the rule about being unseen)
**Mode:** Room — Hallway

A long ship corridor. Side-scrolls. Pixel art of a Hurtigruten-style narrow hallway, doors lining one side, brass fixtures, deep red carpet, a flickering wall sconce.

The hallway has multiple inspectables:
- **A bulletin board** with the ship's day-by-day itinerary, headed: *"WELCOME ABOARD THE MNEMOSYNE"* (Norway, Iceland, Scotland, Ireland… planting seeds for future chapters). Inspecting it triggers a small narrator beat that re-reinforces the pronunciation joke for any player who skipped the opening narration. *"Mnemosyne (Nem-OSS-uh-nee) Welcomes You Aboard. Today's Port: Bergen."*
- **A luggage cart** halfway down: *"Someone packed in a hurry. There's a stuffed bear sticking out — it looks like one Babcia gave me."*
- **A flickering sconce** that responds to Pip — first hint of his electricity ability
- **The grandparents' cabin door** (the next story trigger)
- **The far end of the hallway** — leads to the rest of the ship, but is currently dark

**THE TWO STRANGERS.** Establishing the rule that Henrik will later break. Two scripted moments in the hallway:

1. **The Passenger.** A wealthy older traveler in evening clothes walks down the corridor. As they approach, Pip drifts to the side instinctively. The passenger walks through the spot Pip was just in, never blinks, never slows. Pip watches them go.
   > PIP: *…they didn't see me.*

2. **The Janitor (J. Henriksen).** Encountered later — see Beat 8. Pip pages him on the radio, the janitor walks down the corridor, moves the cart, and walks away. Pip is right next to him. The janitor doesn't see him.
   > PIP: *No one can see me.*
   > PIP: *(can they?)*

The rule is now planted, and the player carries it forward. When Henrik sees Pip in the kitchen, the player understands viscerally why this is unusual. The seed for Chapter 4's reveal — *"how can he see me?"* — is now active.

The crying gets louder near the grandparents' cabin door.

---

### Beat 6: GRANDPARENTS' CABIN (the gut punch)
**Mode:** Cinematic 3 (GRANDPARENTS)

Pip phases through the door. The screen transitions to the cinematic — the wide shot of Babcia weeping on the bed, Dziadek at the window, the open suitcase, the small photograph of Pip on the nightstand.

Dialogue:
> *Babcia is on the bed. She is making a sound that Pip has never heard her make.*
> *Dziadek stands at the window. His shoulders are shaking. He says nothing.*
> *On the nightstand, a photograph. Pip on his sixth birthday, holding a pierogi as big as his face.*
> PIP: *Babcia…*
> *She does not look up.*
> PIP: *I'm here. I'm right here.*
> *She does not look up.*
> *Dziadek turns. For a moment, just a moment, he looks toward the doorway. He frowns. He shakes his head and turns back to the window.*
> PIP: *…you almost saw me.*

The cinematic holds for a beat longer than feels comfortable. Then fades.

Back in the room view (the grandparents' cabin in 2D), Pip can inspect:
- **The photograph** — adds a memory to his notebook
- **The suitcase** — Babcia's pierogi recipe card is sticking out (foreshadowing the final chapter)
- **A radio on the desk** (the next ability hook)

**A subtle character note:** Dziadek's "almost-see" here is *different* from the strangers' total blindness in the hallway. He is grieving and family. The player should *not* register this as "his grandparents can see him" — that's wrong, they can't, not really. They are the *grieving family who almost feels something*. Henrik in the kitchen will be a categorically different beat: not almost. *Yes. I see you. Sit down.*

---

### Beat 7: THE RADIO (second ability - speak through speakers)
**Mode:** Room

Pip inspects the radio. As he gets close, it crackles on its own. He puts his hand near it. His voice comes out of the speaker — small, tinny, but real.

> PIP: *Hello?*
> *His own voice answers from the radio.*
> PIP: *Oh. Oh, this is good.*

**Second ability earned.** Journal updates.

He can use the radio to speak to anyone listening on the ship's intercom system. This becomes useful in the next puzzle.

He leaves the cabin (phasing back through the door) and returns to the hallway. The far end is no longer dark — a path forward has opened.

---

### Beat 8: THE DARK CORRIDOR (puzzle - the broken light + the janitor + float unlock)

*(Sprint 11 note: The panic-float in Beat 3 is **foreshadowing** for this beat, not the actual float unlock. The panic-float is a scripted one-shot — it happens to Pip involuntarily and does not change pip.float.enabled. The player presses space bar and nothing happens after Beat 3. This beat is where float is genuinely unlocked as a player skill. The distinction is story-critical: the panic-float plants the seed; this beat waters it.)*


**Mode:** Room — Lower Hallway / Stairwell

Pip continues down the corridor. It's pitch black. He can barely see. To proceed safely, he needs to fix the lights.

This is a **broken thing puzzle**. The wiring is exposed where a sconce has fallen. Pip needs to use his nascent electricity ability to spark it back to life.

To trigger the ability, he must inspect the wiring. A small interaction follows — maybe a "press space rapidly" mini-moment, or just a held-button charge — and the lights buzz back on.

**Third ability earned: flicker electricity.**

The corridor reveals itself: a service stairwell going down, a janitor's cart in the way blocking the door. The cart is too heavy for Pip to move (he's a ghost — he passes through it but can't push it).

**Puzzle solution:** Use the radio (back in the grandparents' cabin) to page "J. Henriksen to the front desk." But how does Pip know that name?

The cart has a name tag: "Property of J. Henriksen, Maintenance."

Pip backtracks to the radio, makes the page, returns to the corridor. **The janitor arrives.** Pip is standing right beside the corridor where the janitor walks in. The janitor pauses, mutters to himself in Norwegian, looks *right past Pip*, grabs the cart, and pushes it away. Pip watches him go.

> PIP: *No one can see me.*
> PIP: *(can they?)*

Cart pushed aside. Stairs accessible. **The rule is now firmly established.**

This is the chapter's first **integrated multi-step puzzle.** Use clue (name tag) → use ability (radio) → outcome (path opens) → bonus story beat (the rule reinforced).

---

### Beat 9: THE KITCHEN (the meeting)
**Mode:** Cinematic 4 (KITCHEN)

Pip drifts down the stairwell into the kitchen. Vast, dim, copper pots hanging. He sees a plate left out by the chef who's gone to the walk-in freezer — **lefse with cured gravlaks and a few small Norwegian pickles on the side.**

The taste pulls him.

Cinematic: Pip floats above the counter, the lefse-and-gravlaks roll hovering in mid-air, a bite missing. Henrik in the doorway, frozen. His mouth open. We don't hear the scream yet — silence — and then a beat — and then it cuts.

Dialogue (over the cinematic):
> *Pip cannot remember the last time he ate. Maybe he never has, now. Maybe this is the first time.*
> *He takes a bite.*
> *The food hovers in the air.*
> *Behind him, a sound. A pan dropped. A man's voice.*
> HENRIK: *AAAAAAAAA—*

---

### Beat 10: HENRIK SITS DOWN (the mentor reveal)
**Mode:** Cinematic 5 (HENRIK SITS DOWN)

The scream cuts off. Henrik freezes mid-yell. Stares. Slowly crosses himself. Whispers in Norwegian.

Then — sits down on a stool. Heavy.

> HENRIK: *…Så. Du er gutten fra hytte 646.*
> HENRIK: *So. You are the boy from cabin 646.*
> PIP: *…you can see me?*
> HENRIK: *Yes. Don't ask why. Not today.*
> *Henrik looks at the food, still hovering.*
> HENRIK: *Your grandmother. She told me, last night, in the dining room. She said you would have loved this. That you collected meals like other boys collect stamps.*
> HENRIK: *Lefse. Gravlaks. The pickles too — don't skip the pickles.*
> HENRIK: *Eat. Tell me if it's as good as she promised.*
> *He slides the plate toward Pip.*

**Player-facing note:** The player does not know yet that lefse and gravlaks is *Erik's* favorite meal. Henrik does not say this. He says only that Babcia recommended it. The truth lands in Chapter 4. *Pip having been fed Erik's favorite meal in their first meeting* is the secret weight of this scene, set up to pay off three chapters later.

**Pip is going to wonder how Henrik can see him.** Pip says this aloud — the seed for the Chapter 4 reveal:

> PIP: *…how can you see me, when no one else can?*
> *Henrik does not answer immediately. He looks at the food. He looks at Pip.*
> HENRIK: *Some questions wait. Eat first.*

---

### Beat 11: THE FIRST TASTE — DOUBLED (the central mechanic reveal)
**Mode:** Cinematic 6a, then 6b

This beat is **doubled** — Pip tastes two things, sees two memories. The player will not know until Chapter 4 that the second memory is load-bearing.

**Cinematic 6a — Gravlaks taste.** Pip takes a bite of the gravlaks. The kitchen shimmers. He sees, briefly, a memory that isn't his.

A young Norwegian boy in a cottage kitchen, watching an old man's hands cure salmon. Sun through a window. The smell of dill. The boy is Henrik, decades ago. The man is his grandfather.

> *And Pip understands, for the first time, that food carries the story of the person who made it.*

**Cinematic 6b — Lefse taste.** Pip takes a bite of the lefse. The kitchen shimmers a second time. A different memory now.

Pip sees an older Henrik — recognizably grown — teaching a young boy to make the same lefse, the same gravlaks. Different kitchen. The child's face is partially seen — turned away, in profile, in half-shadow. *(See art doc, Cinematic 6b, for treatment.)* Pip does not know who the child is. The child laughs at something off-screen.

> *That every meal is a love letter from someone, to someone.*
> *That if he can taste enough of them — really taste — he might learn the world.*

The visions fade. Pip is back in the kitchen.

> PIP: *I saw… I saw your grandfather. And then I saw — someone teaching a boy. Was that you?*
> HENRIK: *…yes.*
> PIP: *Who was the boy?*
> *A pause. Henrik looks at the empty plate.*
> HENRIK: *Someone I loved.*
> *Pip waits. Henrik does not say more.*
> PIP: *…how does it work, Henrik? When I taste?*
> HENRIK: *Because you needed to. The dead see what they need to see.*
> PIP: *Will it always do that?*
> HENRIK: *I think, perhaps, yes. I think that is what you are now.*

**Central mechanic established.** The notebook gains a new section: "Recipes." The first entry — Norwegian lefse and gravlaks (with Norwegian pickles) — is added with a sketch.

**On the website:** This unlocks the lefse and gravlaks recipe pages. A pop-up notification: *"You've earned a recipe! Check Pip's Notebook."*

---

### Beat 11b: THE BAMSEMUMS (the collect verb — tutorial beat)

*(Sprint 12: New beat, inserted after the lefse-and-gravlaks tasting. Teaches `↓ COLLECT`. Sprint 13 implements this beat.)*

**Mode:** Room — Kitchen

Henrik is finishing cleaning up. Pip drifts around the kitchen, still settling from the tasting. On the counter, half-hidden behind a wooden cutting board, a small bag of Bamsemums sits. They emit a warm humming glow — different from the cool shimmer Pip has learned to recognize on inspectable objects. This is the **collect aura**: warmer, broader, pulsing slowly.

Pip approaches. The dialogue box opens:

> *A small bag of Bamsemums, foam-and-chocolate bears, sits on the counter. Henrik didn't say they were for him. They are.*
>
> *He could pocket this. ↓ to collect. He'll find it later in his notebook.*

Player presses `↓`. The Bamsemums tweens into the notebook icon in the HUD corner. The notebook icon pulses warm. Pip's stomach refills by a small amount (exact value TBD — provisionally ~10 points).

The Bamsemums is added as the first entry in the notebook's Items section, with the annotation: *"Bamsemums — from Henrik, in the kitchen."*

If the player opens the notebook (`TAB`) at this point, they see their first Items page entry.

The beat ends with Pip continuing toward the observation deck (the next room).

---

### Beat 11c: THE OBSERVATION DECK (quiet wonder — implementation deferred)

*(Sprint 12: New room locked into the chapter. Implementation deferred to a future Ch1 content sprint.)*

**Mode:** Room — Observation Deck

Pip drifts up from the kitchen to the ship's observation deck. The room is open-air at one end. Cold. He can feel the cold without being affected by it.

**The northern lights.** A wide curved viewport runs along the top half of the room. Beyond it: the aurora, in cool greens and violets, moving slowly across the dark sky. The room is quiet. Pip may be the only one here.

> *Pip has never seen the northern lights before. He wonders if he would have, had things gone differently.*

**Inspectables:** At least one — the aurora itself (atmospheric narration about its movement and what it makes Pip feel). Additional inspectables TBD in the Ch1 content sprint. Candidates: the telescope (Pip looks through it; sees a far shore), the bench (someone was sitting here recently), the coiled rope (a working detail he notices because the room is still).

**Treat placement:** One treat is hidden on the deck — mood-appropriate to the open-air aurora setting. Specific treat TBD in Ch1 content sprint.

**Exit:** Walking to the right edge triggers the dock-farewell sequence.

**Emotional purpose:** A quiet wonder beat. Pip has just been seen and fed by Henrik. He has just received the empty notebook. He has not yet seen his grandparents leave. This is the *breath* between those two moments. The chapter saying: *there is also beauty in this world; you can stop for it.*

Bergen sits at ~60°N. The aurora is visible there, especially in winter. This is realistic, not invented.

---

### Beat 12: THE DOCK (the parting)
**Mode:** Cinematic 7 (THE DOCK)

Henrik leads Pip to the deck. The ship has reached its first port. Below, on the dock, his grandparents are walking away with a small wooden box.

Dialogue:
> HENRIK: *They are taking your body home. To Brooklyn.*
> PIP: *Greenpoint.*
> HENRIK: *Yes. Greenpoint.*
> *Pip raises a translucent hand.*
> *Babcia stops. Looks up. Toward the ship.*
> *For a moment, the smallest moment, her eyes meet the railing.*
> *Then she turns. And keeps walking.*
> PIP: *…goodbye, Babcia.*
> PIP: *I'll come back.*
> PIP: *I promise.*

---

### Beat 13: HENRIK'S OFFER (the mission)
**Mode:** Cinematic 8 (HENRIK'S OFFER)

Sunset. Pip and Henrik on the deck. Henrik holds out a leatherbound notebook. Empty pages.

> HENRIK: *The Mnemosyne is docked here for the day. Tomorrow, we sail for the next port. And the one after that. And the one after.*
> HENRIK: *I have been on this ship for thirty years. I have eaten food in every port we visit.*
> HENRIK: *I think — if you let me — I would like to show you what I have learned.*
> HENRIK: *Will you come?*
> *[ Player presses space ]*
> PIP: *Yes.*
> *Henrik hands Pip the notebook.*
> HENRIK: *Then let us begin. Tomorrow we are in Bergen. There is something I want you to taste there.*
> HENRIK: *Get some rest, Pip.*
> PIP: *Do ghosts rest?*
> HENRIK: *…I don't know. Find out and tell me.*

*Henrik reaches into his apron pocket and produces a small candle. Plain, white, slightly used.*

> HENRIK: *And — here. Take this. The ship's quieter than it looks at night, but the corridors get dark. If you can't sleep, the dark is easier with a little light.*

*Pip takes the candle. Pockets it. (Load-bearing prop for later chapters. Matches arrive separately, end of Ch3.)*

Fade to black.

> *END OF CHAPTER ONE.*
> *Recipe unlocked: Norwegian Lefse with Gravlaks and Pickles*
> *Next port: Bergen, Norway.*

---

## Implementation Order (for Claude Code)

If building Chapter 1 in stages:

1. **Already done:** Cabin 646 room with mirror cinematic and door cinematic (the existing prototype)
2. **Update opening narration** to the locked Mnemosyne version
3. **Next:** Hallway room with corridor exploration, the bulletin board (with ship name reinforcement), the passenger encounter, and grandparents' door
4. **Next:** Grandparents' cabin cinematic and room (with photo and suitcase)
5. **Next:** Radio room interaction and second ability
6. **Next:** Dark corridor + janitor puzzle (electricity ability + the "no one can see me" beat)
7. **Next:** Kitchen room and Henrik cinematic sequence (now with **doubled** first-taste — 6a and 6b)
8. **Last:** Dock cinematic and Henrik's offer

Each stage is independently testable. The dialogue and cinematic system from the prototype handles all of it.

---

## Polish Pass (later)

Once the chapter is functionally playable end-to-end:

- Sound design (footsteps, engine hum, sconce flicker, kitchen sounds)
- Music (sparse piano motif, picks up at the dock cinematic)
- Animation polish (Pip's surprised pose, his sad pose, his glowing-warmer when he tastes)
- Replace placeholder cinematics with commissioned art (now 9 pieces — Cinematic 6 split into 6a and 6b)
- Mobile tap controls

---

## Abilities Earned (implementation summary)

*(Sprint 12: `↓ COLLECT` added. See `ch01-cabin-646-outline.md` for fuller descriptions.)*

1. **Walk through wood (not metal).** Beat 4, cabin door.
2. **Talk through speakers.** Beat 7, radio in grandparents' cabin.
3. **Flicker electricity.** Beat 8, dark corridor, broken sconce.
4. **Float.** Beat 8, alongside electricity — broken glass on the floor triggers involuntary rise; becomes player-controlled ability from that point.
5. **Taste-memory.** Beat 11 (Beats 11/6a and 11/6b), kitchen, doubled first-taste with Henrik.
6. **`↓ COLLECT` (the collect verb).** Beat 11b, kitchen, Bamsemums tutorial. This is not a ghostly ability — it is a built-in verb taught here diegetically. Before this beat, `↓` makes Pip squat in place; after this beat, the player understands what the collect aura means and what `↓` does near one.

---

## What This Chapter Teaches the Player

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
