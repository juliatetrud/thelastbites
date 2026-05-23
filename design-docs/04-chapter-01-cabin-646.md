# Chapter 1: Cabin 646

The opening chapter. Establishes Pip, the world, the mechanics, the emotional stakes.

**Estimated playtime:** 15-20 minutes
**Cinematics needed:** 8 (see art doc — note Cinematic 6 is the single first-taste, Erik memory only; doubled 6a/6b structure retired Sprint 26 Stage 0)
**Rooms needed:** 6 (Cabin 646, Hallway, Grandparents' Cabin, Radio Room or Stairwell, Kitchen, Observation Deck)

*(Sprint 12: observation deck added — see "The Observation Deck" section below. Implementation deferred to a future Ch1 content sprint.)*

*(Sprint 10.7 note: Pip now starts in the Hallway, not Cabin 646. The cabin is entered from the hallway. See Beat 1 rewrite below.)*
**Recipe unlocked:** Norwegian lefse and gravlaks (with Norwegian pickles) — **Erik's favorite meal**, served by Henrik because the player doesn't know yet that Henrik had a son

---

## Canonical beat order (Julia's words, 2026-05-22, Sprint 23)

> Pip is in the hallway yawning. Person walks through him. He sees the treat, he goes into grandparents' room and they are crying. He exits their room through the wall and into his room (Cabin 646) and he sees a mirror. As he looks in the reflection of the mirror, his face melts and reveals his ghostly reflection. He then looks at the bed and there's something under the sheets. He lifts the sheets and sees his body. Spooked, he runs through the wall into the hallway and sees stairs and a lit sign that says DOWN and goes down the stairs which is where he'll eventually find Henrik.

This paragraph is the source-of-truth for the chapter's first-half play order. The beat-by-beat sections below reconcile to it. Key points to flag for any future doc reader:

- **Pip approaches Cabin 646 only via the shared wall, never via the hallway door** (which is silent set-dressing on first encounter — no prompt, no dialogue, no sparkle).
- **The panic exit at the end of Beat 5 is a wall-phase back to the hallway**, not a glide through the cabin door. The cabin door at world-x ≈1180 remains a real door used for return visits — it opens silently, with no choice menu.
- **The hallway egress to the dark corridor is a lit "DOWN" sign and descending stairs** (Beat 6.5 below), visible from the hallway after the panic exit.
- The doctor's voice (*"…there was nothing more we could do. I'm so sorry."*) is no longer heard from the hallway side of the cabin door — it is delivered as part of the doctor-exit cinematic that fires on shared-wall arrival inside Cabin 646.

---

## Chapter Arc Summary

Pip wakes in his cabin not knowing he's dead. Through the mirror, the truth lands. He explores the ship's hallway — passing two living people who can't see him, establishing the rule he expects to apply universally. He sees his grieving grandparents, discovers his ghostly abilities, makes his way to the kitchen, and is unexpectedly *seen* by Henrik the chef. Henrik becomes his mentor, gives him his first taste-memory experience (a single cinematic — the lefse-and-gravlaks meal, Erik memory), and sets up the journey ahead. The chapter closes at the dock as Pip's grandparents disembark with his body.

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

### Beat 2: WAKING IN THE CABIN (second destination — Pip visits grandparents' cabin first)
**Mode:** Room — Cabin 646

*(The cabin is a destination Pip enters from the hallway after the grandparents' cinematic has played. Beat-order correction 2026-05-18: grandparents' cabin is the discovery room; Cabin 646 is the confirmation room. The cabin door is gated until the grandparents' cinematic plays — see Beat 4.)*

**Cabin door in the hallway:** The cabin door is labeled Cabin 646. Located at hallway world-x ≈ 1180 (past grandparents' door at x ≈ 920). Inspection text before grandparents' cinematic:
> *Cabin 646. The door is closed.*

Pressing `↑` near the door transitions into the cabin only after grandparents' cinematic has played.

**Lump-in-bed (Sprint 10.7):** From this sprint onward, the bed contains a **lump under the covers** — a soft shape suggesting a small body. A long bump along the bed's length, slightly larger toward where a head would be. No facial features, hair, or limbs are drawn. The lump is implied, not displayed.

The lump carries the standard warm-amber aura (baseline ~0.15, not breadcrumb-elevated). This is ambient dread, not a directive. Pip can choose not to investigate.

**Inspect text — Bed (pre-reveal, Sprint 10.7):**
> *I wonder what that lump is. Maybe I don't want to know.*
*(Italic — Pip's interior thought.)*

**Inspect text — Bed (post-reveal, Sprint 11):**
*(After the bed-reveal cinematic plays, gated on `cabinState.bedRevealed === true`):*
> *Hmm, my old bed.*
*(Italic — Pip's interior thought.)*

**Cabin props (P1 Session 1 additions — canonical, not yet implemented):**
- **Writing desk** (world-x ~220, along the wall opposite the bed) — period-appropriate. Inspectable or atmospheric at implementation time.
- **Washstand** (world-x ~340, near the porthole) — period-appropriate.
- **Under-bed drawer** (at the foot of the bed or beneath the mattress) — inspectable. Contains the Smørbukk treat (per Sprint 12 suggestion, now canonical).
- **Child's drawing on the wall** (world-x ~160) — inspectable. Narration locked:
  > *Babcia made me pin it up. She said I'd want to see Norway in my drawing before I saw it through the window.*

**Other cabin inspectables:**
- **Porthole** (showing distant Norwegian coast; also shows a faint aurora reflection in the upper portion of the night-water view — per chapter-wide aurora rule, see `03-art-and-aesthetic.md`)
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

**Part 4: Panic glide + tear spray.** Once Pip's feet touch the floor, his sprite glides toward the cabin's exit at 1.8× normal walk speed. Small cool-white teardrop particles arc backward from his eyes, fading within ~0.4s (~6 drops/second). The tears stop once he arrives in the hallway.

*(Sprint 23 canon: per Julia's canonical beat-order paragraph, the panic exit is a **wall-phase back to the hallway**, not a glide through the cabin door. "Spooked, he runs through the wall into the hallway." The current implementation (Sprint 11) glides Pip through the door; the rework to wall-phase egress lands in Sprint 24 alongside the cabin-door silent-open implementation. Until then, the current door-glide stands as correct-but-incomplete.)*

**Tone note:** This sequence must read as *gentle-comic* alongside the grief. The fast glide + tear spray is not undercutting Pip's devastation — it is both real grief and a small ghost going very fast. That's the register. Don't dampen the comic.

A new hint (post-Beat-5): *"Find the stairs."* (Updated from the prior *"Find Babcia"* — Babcia has been found by this point. The hallway's lit DOWN sign and stairhead are now the next signpost. See Beat 6.5.)

---

### Beat 4: THE CABIN DOOR (silent set-dressing — no interaction)
**Mode:** Room — Hallway

*(Sprint 23 doc patch: the hallway-side Cabin 646 door is retired as an interaction point. It produces no dialogue, no prompt, no choice menu — ever. Supersedes the Sprint 22 framing that retained "Listen / Not now" pre-grandparents'.)*

**Canonical behavior:**

1. **First encounter (any point in the chapter before Pip first enters Cabin 646).** Pip can walk up to the cabin door at world-x ≈1180. The door is visually present — brass plaque reads "646" — but mechanically silent. No sparkle, no warm aura, no prompt on `↑`. Pip walks past it the way he walks past 642 or 640. The door is set-dressing on this side. The path forward at this stage is the grandparents' door at x≈920; that is the one that calls.

2. **The grandparents' cinematic plays.** After Pip phases through 644 and the cinematic and room-mode inspectables complete, Pip walks right inside grandparents' cabin and phases through the shared wall into Cabin 646 (see Beat 6 continuation). The doctor-exit cinematic fires on arrival in Cabin 646 — not at the hallway door. The doctor's voice (*"…there was nothing more we could do. I'm so sorry."*) is delivered there, not here.

3. **Return visits (after the panic exit in Beat 5).** Pip walks up to the cabin door from the hallway and it opens silently. No choice menu, no dialogue, no "Listen at the door." The door behaves like a real door that works — Pip's phase-through ability is fully understood by this point, so the door operates as ordinary egress. `cabinState.doctorSeen` is true; the doctor cinematic does not replay. The mirror shows the ghost-face; the bed is in its post-reveal state.

*(The "Listen at the door" / "Not now" choice menu — locked Sprint 14, partially retained Sprint 22 — is retired in full as of Sprint 23. The doctor's voice is not heard from the hallway side at any point. Implementation removal of the door dialogue from `game/index.html` is Sprint 24.)*

*(As of Sprint 14, the bed reveal and panic exit retain their Sprint 11 cinematic form. The Henrik kitchen sprint will rework these — the bed reveal becoming player-initiated (Pip lifts the sheets himself) and the panic exit becoming a wall-phase back to the hallway per the canonical beat order, not a glide through the door. The current implementation is correct-but-incomplete.)*

---

### Beat 5: THE HALLWAY (exploration + the rule about being unseen)
**Mode:** Room — Hallway

A long ship corridor. Side-scrolls. Pixel art of a Hurtigruten-style narrow hallway, doors lining one side, brass fixtures, deep red carpet, a flickering wall sconce.

The hallway has multiple inspectables, encountered in this spatial order walking right from spawn:
- **A bulletin board** (world-x ~180) — a real visual asset with the *"WELCOME ABOARD THE MNEMOSYNE"* header and port itinerary visible.
- **A luggage cart** (world-x ~540) — *"Someone packed in a hurry. There's a stuffed bear sticking out — it looks like one Babcia gave me."*
- **A flickering sconce** (world-x ~810) — first hint of Pip's electricity ability
- **The grandparents' cabin door** (world-x ~920 — the first story trigger; encountered before Cabin 646)
- **Cabin 646 door** (world-x ~1180 — gated until grandparents' cinematic plays; encountered after grandparents)
- **The far end of the hallway** — a descending staircase is visible in the dark zone past world-x ~1320, with **a lit "DOWN" sign suspended above the stairhead** (Sprint 23 canon). The staircase visibly descends into shadow, readable as "this is where you go next." Pre-panic-exit it is visible but unreachable; post-panic-exit it is accessible. This is the visual signal of forward direction. See Beat 6.5 for the descent sequence.

*(Beat-order correction 2026-05-18: grandparents' door now at x≈920, Cabin 646 door now at x≈1180. Grandparents is encountered first walking right; cabin is encountered second.)*

**Wall-decor inspectables (P1 Session 1, canonical — two pieces confirmed):**
- **Ship photograph** (world-x 230) — inspectable. Suggested narration: *A black-and-white photograph of a sister ship at her launch. The pose is formal, the steam pouring. A small brass plate reads something in Norwegian.*
- **Navigational chart of the North Sea** (world-x 865) — inspectable. Suggested narration: *A framed nautical chart of the North Sea. Someone has drawn a small red circle around Bergen. The ink is fresh.*

**Canonical hallway treat (P1 Session 1 — replaces debug placeholder):** A canonical treat is tucked near the luggage trolley or the bulletin board area. Specific treat TBD per Ch1 content sprint, but its existence is canonical. It emits the standard warm collect-aura. Collectable only after `↓` is learned (Beat 11b).

**Hallway portholes:** All three hallway porthole scenes gain a faint aurora layer in the upper portion of the night-water view — per chapter-wide aurora rule. Subtle intensity (domestic/transit register). See `03-art-and-aesthetic.md`.

**THE TWO STRANGERS.** Establishing the rule that Henrik will later break. Two scripted moments in the hallway:

1. **The Passenger.** A wealthy older traveler in evening clothes walks down the corridor. As they approach, Pip drifts to the side instinctively. The passenger walks through the spot Pip was just in, never blinks, never slows. Pip watches them go.
   > PIP: *…they didn't see me.*

2. **The Janitor (J. Henriksen).** Encountered later — see Beat 8. Pip pages him on the radio, the janitor walks down the corridor, moves the cart, and walks away. Pip is right next to him. The janitor doesn't see him.
   > PIP: *No one can see me.*
   > PIP: *(can they?)*

The rule is now planted, and the player carries it forward. When Henrik sees Pip in the kitchen, the player understands viscerally why this is unusual. The seed for Chapter 4's reveal — *"how can he see me?"* — is now active.

The crying gets louder near the grandparents' cabin door.

---

### Beat 6: GRANDPARENTS' CABIN (the gut punch — the discovery room)
**Mode:** Cinematic 3 (GRANDPARENTS)

*(Beat-order correction 2026-05-18: despite being numbered Beat 6 here, the grandparents' cabin is the FIRST room Pip enters after the hallway exploration — not the cabin. The beat numbering reflects chapter structure, not play order. Grandparents' cabin = discovery room. Cabin 646 = confirmation room. Beat 3 mirror is gated on grandparents' cinematic having played for exactly this reason.)*

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
- **The suitcase** — Babcia's pierogi recipe card is sticking out (foreshadowing the final chapter). Third inspection line (P1 Session 1, canonical): *A handwritten recipe card is poking out from under the boat-shirt. Pierogi.* Do not explain it.
- **Dziadek's radio** (world-x ~200, on the windowsill near Dziadek) — the next ability hook. See Beat 7 for locked behavior.

**Grandparents' cabin decisions (P1 Session 1, canonical — not yet implemented):**

- **Babcia's inspection line:** Locked as Polish. *Babciu, jestem tutaj.* No English fallback. The Polish version is canonical and final. (See Multilingual dialogue rule in `01-story-bible.md`.)
- **Bed configuration:** One bed. Locked. The visual research tracker's "two beds" suggestion is overridden. This is canonical.
- **Armchair with Dziadek's coat** (world-x ~280, between Dziadek's window-side and the bed) — inspectable. Suggested narration: *Dziadek's wool coat is folded over the armchair. He must have meant to wear it. He hasn't moved since they were told.*
- **No wardrobe** — the coat-over-armchair carries the emotional weight; the wardrobe is not added.
- **Window/porthole:** Shows a faint aurora reflection — per chapter-wide aurora rule. See `03-art-and-aesthetic.md`.

**A subtle character note:** Dziadek's "almost-see" here is *different* from the strangers' total blindness in the hallway. He is grieving and family. The player should *not* register this as "his grandparents can see him" — that's wrong, they can't, not really. They are the *grieving family who almost feels something*. Henrik in the kitchen will be a categorically different beat: not almost. *Yes. I see you. Sit down.*

**Beat 6 continuation — the shared-wall phase-through:**

After the cinematic and room-mode inspectables (Babcia, Dziadek, photo, suitcase, radio), Pip can walk right toward the far wall of the grandparents' cabin. The right wall is the shared wall between cabin 644 and cabin 646.

A faint cool-blue glow marks the phase-through point on the right wall — similar in visual register to the cool-blue glow that signals the hallway-side door, but positioned on the right wall instead of the left. This signals a traversal possibility without labeling it.

Pip walks into the wall. His hand reaches the wall surface and passes through. The screen shimmers briefly — the phase-through visual. Pip arrives in Cabin 646 at its left side, facing right.

**Doctor-exit cinematic on first entry:** This is the first entry to Cabin 646 regardless of how it happens. The doctor-exit cinematic fires: a doctor in a dark suit, holding his black bag, walks from center-room toward the far door (world-x ~450), the door briefly opens, the doctor fades out, the door closes. Pip stands at the left side of the room, watching in silence. ~2–3 seconds. No dialogue. `cabinState.doctorSeen = true` is set after this plays.

**This is the first mechanical use of the phase-through-wood ability.** The narrative discovery was at the grandparents' door (the cinematic at the start of Beat 6). This shared-wall traversal is the moment the ability becomes a verb the player understands — Pip chose to walk into a wall and came out the other side.

Beat 6 ends with Pip in Cabin 646, control restored. The mirror and bed beats follow (Beat 3 in chapter structure; played now in actual order). After the panic exit (wall-phase back to the hallway per the canonical beat order), the grandparents' cabin is accessible again for subsequent visits.

---

### Beat 6.5: THE DOWN SIGN (the way forward — new canon, Sprint 23)
**Mode:** Room — Hallway

*(Sprint 23: new beat inserted between Beat 6 and Beat 7 to encode the hallway-to-dark-corridor egress that Julia's canonical paragraph describes. The earlier hallway spec described the far-right zone as just "darkness" or "a descending staircase visible past world-x ~1320"; this beat names that detail as a lit "DOWN" sign and a clear stairwell, and threads it into the play order.)*

After the panic exit at the end of Beat 5, Pip arrives in the hallway via wall-phase (not through the cabin door). Player control restores. The far-right end of the hallway, previously dark and impassable, now shows:

- **A lit sign reading DOWN** — small, brass-mounted or enamel, suspended above the stairhead. The lighting is warm but specific — readable as functional ship signage, not atmospheric flourish. The sign is the chapter's clearest signpost.
- **A descending staircase** — visibly going down into shadow. The staircase replaces (or formalizes) the prior "far-right dark zone" treatment.

Pip walks right toward the sign. The hallway camera scrolls to its rightmost extent. At the staircase head, walking-right (or pressing `↑`) carries Pip down. The transition fades into Beat 8 (the dark corridor).

**State-wise:** the DOWN sign and stairs are visible from chapter start as set-dressing — the staircase is *visible* but unreachable pre-panic. After the panic exit, the area becomes navigable (whether by a state flag or by light/state shifts is an implementation choice for Sprint 24+). The sign itself stays lit throughout; what changes post-panic is the gate.

**Voice:** no dialogue line on first descent — the sign is its own communication. Optionally a single italic Pip thought as he steps onto the first stair (TBD in the Henrik kitchen build sprint): *Down.* or *Down it is.* — to be settled in dialogue review.

This beat is the chapter's clearest moment of *Pip following a signpost.* He has just seen his own body. The DOWN sign is the universe being gentle with him: *here, this way, you don't have to figure out where to go.*

---

### Beat 7: THE RADIO (second ability - speak through speakers)
**Mode:** Room

Pip inspects the radio. As he gets close, it crackles on its own — this is the radio's canonical behavior (P1 Session 1): when Pip approaches within the standard aura range (~30 px), the domestic radio crackles to life with a faint static sound, foreshadowing the Beat 8 ship-intercom discovery. He puts his hand near it. His voice comes out of the speaker — small, tinny, but real.

**Radio lore (P1 Session 1 — locked):** This is Dziadek's domestic radio (1900s-era Edwardian, wooden-cased, on the windowsill at world-x ~200). It is *not* the Beat 8 radio. The Beat 8 radio is the ship's intercom system. Two different radios; both are real objects in the game. The grandparents' cabin radio crackle is foreshadowing — the player will not yet know there is a second radio to find.

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

### Beat 11: THE FIRST TASTE (the central mechanic reveal)
**Mode:** Cinematic 6

*(Sprint 26 Stage 0, 2026-05-23: The doubled 6a/6b structure below is **retired**. The canonical cinematic is single — Erik memory only. The grandfather/gravlaks memory is reserved for Ch4. See 2026-05-23 Decisions Log entry and `dialogue.md` Beat 11 for the locked dialogue.)*

~~**Mode:** Cinematic 6a, then 6b~~

~~This beat is **doubled** — Pip tastes two things, sees two memories. The player will not know until Chapter 4 that the second memory is load-bearing.~~

~~**Cinematic 6a — Gravlaks taste.** Pip takes a bite of the gravlaks. The kitchen shimmers. He sees, briefly, a memory that isn't his. A young Norwegian boy in a cottage kitchen, watching an old man's hands cure salmon. Sun through a window. The smell of dill. The boy is Henrik, decades ago. The man is his grandfather.~~

~~**Cinematic 6b — Lefse taste.** Pip takes a bite of the lefse. The kitchen shimmers a second time. Pip sees an older Henrik — recognizably grown — teaching a young boy to make the same lefse, the same gravlaks. Different kitchen. The child's face is partially seen — turned away, in profile, in half-shadow. *(See art doc, Cinematic 6b, for treatment.)* Pip does not know who the child is. The child laughs at something off-screen.~~

**Cinematic 6 — Single first-taste.** Pip takes a bite of the dish (combined lefse-and-gravlaks; the bite is generic, not gravlaks-specific). The kitchen shimmers once. A single memory plays.

*Erik memory:* older Henrik teaching a young boy in a different kitchen; face partially seen — turned away, in profile, or in half-shadow. *(See art doc, Cinematic 6, for treatment: critical constraint — Erik's face must not be fully visible; load-bearing for Ch4.)* The boy laughs at something off-screen. Pip does not know who the child is.

The realization block (italic, three lines):

> *Pip understands, for the first time, that food carries the story of the person who made it.*
> *That every meal is a love letter from someone, to someone.*
> *That if he can taste enough of them — really taste — he might learn the world.*

The memory fades. Pip is back in the kitchen.

> PIP: *I saw… I saw someone. Teaching a boy. Was that you?*
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
7. **Next:** Kitchen room and Henrik cinematic sequence (single first-taste Cinematic 6 — Erik memory only; 6a/6b structure retired Sprint 26 Stage 0)
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

1. **Walk through wood (not metal).** Two-stage discovery: (a) *narrative discovery* — Beat 6, grandparents' cabin door (hallway side), when Pip's hand passes through the door as the cinematic begins. No menu unlock, no journal entry — just the moment of realization. (b) *first mechanical use* — Beat 6 continuation, shared wall between cabin 644 and cabin 646, when Pip walks right and phases through into Cabin 646. The ability is now a traversal verb the player understands. The cabin hallway door at x≈1180 is not a phase-through teaching moment under the canonical flow.
2. **Talk through speakers.** Beat 7, radio in grandparents' cabin.
3. **Flicker electricity.** Beat 8, dark corridor, broken sconce.
4. **Float.** Beat 8, alongside electricity — broken glass on the floor triggers involuntary rise; becomes player-controlled ability from that point.
5. **Taste-memory.** Beat 11 (Cinematic 6, single first-taste), kitchen, Erik memory with Henrik.
6. **`↓ COLLECT` (the collect verb).** Beat 11b, kitchen, Bamsemums tutorial. This is not a ghostly ability — it is a built-in verb taught here diegetically. Before this beat, `↓` makes Pip squat in place; after this beat, the player understands what the collect aura means and what `↓` does near one.

---

## What This Chapter Teaches the Player

- How to walk and inspect (room mode)
- How dialogue choices appear and resolve (narration-with-choices model)
- That abilities are *discovered*, not granted from a menu
- That **Ch1 is the teaching chapter** for all five of Pip's ghost abilities (walk-through-wood, talk-through-speakers, flicker-electricity, float, taste-memory). Each has a specific discovery moment within this chapter, encountered through use. Chapters 2 and beyond assume the player knows these verbs; Ch1 is where each one is earned.
- That the world has things you can't immediately solve (the locked door, the dark corridor) and abilities are how you solve them
- That food is the central verb of this game
- That cinematics happen at emotional peaks, not as cutscenes between zones
- **That the world contains hidden treats, scattered for him to find** *(Sprint 12)*
- **That food picked up refills his stomach — the verb is the system** *(Sprint 12)*
- **That the notebook keeps a record of what he's eaten** *(Sprint 12)*
- **That the world also contains beauty without purpose — the northern lights, seen for their own sake** *(Sprint 12)*

By the end of Ch1, the player should know how to inspect, choose, walk, float (briefly), phase through wood, spark electricity, talk through speakers, taste food, and pocket a treat with `↓`. They should not yet have seen a wordless traversal, a monster encounter, or a chef puzzle — those arrive in Chapter 2.
