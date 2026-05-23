# Chapter 1: Dialogue

The complete dialogue script for Ch1. Every line. Every choice. Every cinematic.

Organized by beat. Each beat's section indicates **status** (shipped / patched / new) so the reader knows which lines are canonical-in-code vs. canonical-in-design vs. drafted-here-for-review.

This doc supersedes the dialogue captured in `ch01-content-audit.docx` where they conflict — `ch01-content-audit.docx` was a Sprint 06 snapshot; this doc reflects current state through Sprint 19.

---

## Voice conventions (locked, story bible)

- **Third person.** Narration refers to Pip by name or "he," never "you."
- **Active voice, present tense.** *"Babcia is on the bed,"* not *"was."*
- **Full sentences.** No fragments like *"Soft. Familiar."*
- **Spoken dialogue:** quoted with attribution. *"Babcia, what's wrong?" Pip asks.*
- **Italics = interior thought.** *Pip wonders.* Full sentences inside italics.
- **Spoken Pip lines:** `speaker: 'PIP'`, render with `PIP:` prefix, quoted speech only. Roman regardless of `italic` flag.
- **Multilingual dialogue:** characters speak their first language for emotionally-loaded moments. Polish for Babcia/Dziadek (no English fallback). Norwegian for Henrik's emotional moments (English translation provided as a separate line). See `01-story-bible.md` § Multilingual dialogue.

---

## Beat 1: Waking in the hallway

**Status:** Shipped (Sprint 10.7).

### Opening narration (auto, after materialization + yawn)

> *Pip yawns. He doesn't remember falling asleep, but that's not unusual. The hallway hums softly around him.*

**Notes:**
- Single roman narration line.
- Dismisses on `Space`.
- One-shot per hard game load.

---

## Beat 2: Exploring the hallway

**Status:** Shipped (Sprints 02–07, 16). Patches from Sprint 19 noted inline.

### Bulletin board (`hallway-bulletin-inspect`, world-x ~260)

> *A bulletin board sits near the stairwell to let the passengers know the ship's itinerary.*
>
> *It says, "The Mnemosyne (Nem-OSS-uh-nee) welcomes you aboard. Today's port: Bergen."*

**Status:** Two lines, both roman. Shipped.

### Luggage trolley (`hallway-luggage-inspect`, world-x ~530)

> *Hmm. Looks like someone packed in a hurry…* (italic)
>
> *A stuffed bear sticks out of the top of the suitcase.* (roman)
>
> *That looks just like the bear Babcia gave me…* (italic)

**Status:** Three lines. Shipped. The first and third lines are italic (Pip's thought); the middle line is roman (narration).

### Flickering sconce / oil lamp (`hallway-sconce-inspect`, world-x ~820)

> *An oil lamp flickers, not quite in time with itself.* (roman)
>
> *When Pip steps close, it falters. When he steps back, it steadies. It almost feels like it's reacting to him.* (roman)
>
> *How could that be? Pip wonders.* (italic)

**Status:** Three lines. Shipped. Foreshadows Beat 8's electricity ability.

### Ship photograph (wall decor, world-x ~230) — **NEW (Sprint 19)**

> *A black-and-white photograph of a sister ship at her launch. The pose is formal, the steam pouring. A small brass plate reads something in Norwegian.*

**Status:** One line, roman. Drafted in Sprint 19 patch; not yet in code.

### Navigational chart (wall decor, world-x ~865) — **NEW (Sprint 19)**

> *A framed nautical chart of the North Sea. Someone has drawn a small red circle around Bergen. The ink is fresh.*

**Status:** One line, roman. Drafted in Sprint 19 patch; not yet in code.

### Cabin 646 door (`hallway-cabin-door`) — no dialogue from hallway side (Sprint 23). See Beat 4.

### Grandparents' cabin door (`hallway-grandparents-door`) — first visit

> *From inside, someone is crying softly. The sound is familiar.* (roman)
>
> *Pip reaches for the handle.* (roman)
>
> *Pip's hand goes through. He steps closer. He steps through the door.* (roman)
>
> *…oh.* (italic)

**Status:** Four lines. Shipped (Sprint 04 + Sprint 07 patch). The phase-through happens as part of this dialogue sequence; the third and fourth lines bridge into Cinematic 3 (Beat 6).

### Grandparents' cabin door — return state (post-cinematic)

> *Babcia and Dziadek are still inside.* (roman)

Two choices appear:
1. **Go in.** Returns Pip to grandparents' cabin (room mode, no cinematic replay).
2. **Not now.** Dismisses.

**Status:** Shipped (Sprint 04 / 07).

---

## Beat 3: The Passenger walk-through

**Status:** Shipped (Sprint 03).

### Passenger overlap thought

> *…they didn't see me.* (italic, Pip's thought)

**Status:** One line. Fires when the Passenger's x-position overlaps Pip's. One-shot per chapter.

---

## Beat 4: The cabin door (silent set-dressing — no dialogue from hallway side)

**Status:** Retired Sprint 23. The cabin door at world-x ≈1180 produces **no dialogue from the hallway side, ever**. No opening line, no choice menu, no Listen sub-dialogue, no doctor's voice from this side. The door is silent set-dressing on first encounter (Pip walks past it) and opens silently on return visits after Beat 5. The doctor's voice — formerly heard via the "Listen at the door" choice — is now delivered only as part of the doctor-exit cinematic on shared-wall arrival inside Cabin 646 (Beat 6 continuation, no dialogue lines at all; see `beats.md` § Beat 6 continuation). Implementation removal of the prior `cabin-door-node` / `doctor-voice` dialogue from `game/index.html` is Sprint 24.

*(Historical note: the Sprint 14 "Listen at the door" / "Not now" choice menu and its `doctor-voice` sub-dialogue node — kept canonical through Sprint 22 — are fully retired by Sprint 23. The doctor's voice line *"…there was nothing more we could do. I'm so sorry."* is preserved as the doctor-exit cinematic's content; it is not gone from the game, only relocated.)*

---

## Beat 5: The mirror (Cinematic 2)

**Status:** Shipped (Sprint 11). The cinematic dialogue is in `CINEMATIC_SCRIPTS['mirror-realization']` in `game/index.html`.

### Mirror inspection (cabin, world-x ~280)

The mirror cinematic plays automatically when Pip inspects the mirror (post-doctor-cinematic). Cinematic lines:

> *Pip looks. Pip looks again. The boy in the mirror is not the boy who walked in.* (roman)
>
> *I'm not me.* (italic)

**Status:** Two cinematic lines. The melt animation happens around these lines (per `drawMirrorCinematic`).

### Bed reveal cinematic (auto, plays after mirror cinematic per Sprint 11)

`CINEMATIC_SCRIPTS['bed-reveal']` plays. Lines:

> *The boy in the bed does not move.* (roman)
>
> *Oh.* (italic)

**Status:** Two lines. Shipped.

### Panic glide + tear spray (visual sequence, no dialogue)

After the bed-reveal lines dismiss, Pip glides toward the cabin door at 1.8× speed with cool-white tear-particles arcing backward from his eyes. He continues through the door into the hallway. **No dialogue during this sequence.**

### Hint update (post-Beat-5)

> *Find Babcia.* (HUD hint text, not a dialogue box)

**Status:** Hint text per Sprint 11.

---

## Beat 6: The grandparents' cabin (Cinematic 3 + room aftermath)

**Status:** Cinematic shipped (Sprint 04, content-patched Sprint 07). Room inspectables shipped. Sprint 19 adds two new inspectables (armchair, Dziadek's radio).

### Cinematic 3 (`CINEMATIC_SCRIPTS.grandparents`)

The cinematic plays automatically after Pip phases through the door. Ten lines:

> *Babcia is on the bed with her head in her hands. She is making a sound Pip has never heard her make. She is sobbing.* (roman)
>
> PIP: *"Babcia, what's wrong?" Pip asks.* (roman, spoken)
>
> *Dziadek stands at the window. His shoulders are shaking. He says nothing. Tears stream down his face.* (roman)
>
> *On the nightstand sits a photograph. It shows Pip on his sixth birthday, holding a pierogi as big as his face.* (roman)
>
> PIP: *"Babcia? Dziadek?"* (roman, spoken)
>
> *They do not look up.* (roman)
>
> PIP: *"Hello! I'm here. I'm right here. What's wrong?" Pip's stomach turns.* (roman, spoken)
>
> *They continue to cry.* (roman)
>
> *Dziadek turns. For a moment, just a moment, he looks toward the doorway. He frowns. He shakes his head and turns back to the window.* (roman)
>
> PIP: *"Dziadek…" Pip tries. But Dziadek does not hear him.* (roman, spoken)

**Status:** Ten cinematic lines, locked in code as of Sprint 07. The eighth line (Dziadek's near-look) is the longest and most important — typewriter pacing carries it. After the last line dismisses, the cinematic holds in silence for ~1.2s before fading.

### Babcia inspection (`gp-babcia-inspect`, world-x ~560)

> *Babcia is on the bed. Her hands are folded around her red face. She is making the smallest sounds.* (roman)
>
> *Pip stands right next to her. But she does not look up.* (roman)
>
> PIP: *"Babciu, jestem tutaj," Pip says.* (roman, spoken, Polish — no English fallback per Sprint 19)

**Status:** Three lines. Polish version locked Sprint 19.

### Dziadek inspection (`gp-dziadek-inspect`, world-x ~160)

> *Dziadek's back is to Pip. He has not turned. His shoulders are very still.* (roman)
>
> *On the windowsill sits the small radio he listens to in the evenings. It is off, now.* (roman)
>
> *Pip waits, in case he turns. He does not turn.* (roman)

**Status:** Three lines. Shipped Sprint 07. The mention of the radio is the seed for Beat 7's discovery.

### Photograph inspection (`gp-photo-inspect`, world-x ~620)

> *Pip's sixth birthday photograph shows him holding a pierogi nearly as big as his face. He remembers it tasted like butter and onions and being allowed to use the big knife.* (roman)
>
> *Pip remembers Babcia laughing. He does not remember if he said thank you.* (roman)

**Status:** Two lines. Shipped Sprint 07. This is the chapter's first foreshadowing of the Ch8 pierogi-dinner climax.

### Suitcase inspection (`gp-suitcase-inspect`, world-x ~380)

> *The suitcase is open. Nothing is folded. A shirt of his is on top — the one with the boat on it.* (roman)
>
> *They didn't have time to unpack. They didn't think they would need to.* (roman)
>
> *A handwritten recipe card is poking out from under the boat-shirt. Pierogi.* (roman) — **NEW (Sprint 19)**

**Status:** Three lines (third line added Sprint 19 as Ch8 foreshadow). Not explained in dialogue — the player feels the weight without understanding it.

### Armchair with Dziadek's coat (world-x ~280) — **NEW (Sprint 19)**

> *Dziadek's wool coat is folded over the armchair. He must have meant to wear it. He hasn't moved since they were told.* (roman)

**Status:** One line, roman. New inspectable; not yet in code.

### Dziadek's radio (world-x ~200) — see Beat 7

---

## Beat 6 continuation: Shared-wall phase-through (no dialogue)

**Status:** No dialogue. The shared-wall traversal and the doctor-exit cinematic that follows it are both silent — pure visual sequences. See `beats.md` § Beat 6 continuation for the full beat description and `puzzles.md` § Puzzle 3.5 for the state machine. This section exists in `dialogue.md` only to make explicit that *no dialogue lines belong to this beat* — readers searching for Beat 6 continuation text will find this pointer.

---

## Beat 7: Dziadek's radio (talk-through-speakers)

**Status:** **NEW — not yet shipped.** Drafted here for the build sprint. The radio prop and its behavior are locked per Sprint 19.

### Proximity crackle (passive — fires when Pip is within ~30 px)

The radio crackles to life. Faint static sound. **No dialogue line** — the sound is the cue. (Audio implementation TBD.)

### Inspection (`gp-radio-inspect`, world-x ~200)

> *Pip's voice would come out of this radio.* (roman) — **NEW**
>
> PIP: *"…hello?"* (roman, spoken) — **NEW**
>
> *His voice answers from the speaker. Tinny. Small. But real.* (roman) — **NEW**
>
> PIP: *"Oh. Oh, this is good."* (roman, spoken) — **NEW**

**Status:** Four newly-drafted lines. Mark for Julia's review — Pip's voice should land as quiet wonder, not excitement. *"Oh. Oh, this is good"* is a mouthful for a small ghost-boy; an alternative read: *"Oh. That's…"* (trailing off into wonder rather than completing a thought). Settle in code review.

### Page-the-janitor sub-dialogue (post-Beat-8 cart discovery)

After the cart is discovered, a new choice appears on the radio inspection:

> *Pip's voice would come out of this radio.* (roman)

Three choices:
1. **Listen.** *(Replays the original four-line discovery sequence — Pip says hello, his voice answers.)*
2. **Page someone over the intercom.** **NEW (Beat 8 puzzle)** — opens sub-dialogue:

> *Pip thinks of the name on the cart. He clears his throat.* (roman) — **NEW**
>
> PIP: *"Attention. J. Henriksen to the dark corridor. Please."* (roman, spoken) — **NEW**
>
> *His voice carries through the ship.* (roman) — **NEW**

3. **Not now.**

**Status:** Three newly-drafted lines for the paging sub-dialogue. The line *"His voice carries through the ship"* doubles as the player's confirmation that the page worked.

---

## Beat 8: The dark corridor (electricity + float + janitor)

**Status:** **NEW — not yet shipped.** All dialogue drafted here.

### The broken sconce — pre-inspection ambient sparkle (no dialogue)

The fallen sconce has a breadcrumb-elevated aura. No automatic dialogue; Pip inspects to engage.

### Broken sconce inspection (`dc-sconce-inspect`)

> *The wires are sparking.* (roman) — **NEW**
>
> *Pip wonders if he could do something with them.* (italic) — **NEW**
>
> *He reaches out.* (roman) — **NEW**

After the third line, a held-button puzzle interaction begins (mechanics in `puzzles.md`). On success:

> *The wires spark. The sconce buzzes. Then another. Then another.* (roman) — **NEW**
>
> *The corridor breathes back into light.* (italic) — **NEW**
>
> *Third ability earned. (HUD hint: hold ↑ near broken electricity.)* — **NEW** (rendered as HUD hint, not dialogue)

**Status:** Three pre-puzzle lines + two post-puzzle lines + one HUD hint. All newly drafted. The "third ability earned" framing matches the chapter's pattern of *narrative* discovery (no menu, no journal entry).

### Float discovery (involuntary, triggered by stepping on broken glass)

When Pip walks past the broken-glass tile at world-x ~420, an involuntary panic-rise plays (~0.6s, ~1.5 character-heights). After Pip resettles:

> *Pip didn't mean to do that.* (roman) — **NEW**
>
> *But he can do that.* (italic) — **NEW**
>
> *Fourth ability earned. (HUD hint: hold SPACE to float.)* — **NEW** (HUD hint)

**Status:** Two newly-drafted lines + one HUD hint. The two-line pacing intentionally separates the surprise (he didn't mean to) from the recognition (he can). Julia's review: do these need to be longer? My read: this brevity is the right register. The float ability is a small thing Pip discovers.

### Janitor's cart inspection (`dc-cart-inspect`, world-x ~840)

> *A janitor's cart, abandoned mid-shift.* (roman) — **NEW**
>
> *A name tag on the clipboard reads: "J. Henriksen, Maintenance."* (roman) — **NEW**
>
> *Pip wonders how to get past it.* (italic) — **NEW**

**Status:** Three newly-drafted lines.

If Pip tries to push the cart (`↑` near it after inspection):

> *The cart is too heavy. Pip's hands pass through it.* (roman) — **NEW**

**Status:** One newly-drafted line. Reinforces phase-through + lack-of-mass.

### Janitor's scripted walk (no dialogue from the janitor — he mutters in Norwegian)

When the janitor walks into the dark corridor and pauses at the cart:

> JANITOR: *"Hvor i alle dager…"* (roman, spoken, Norwegian — no English subtitle) — **NEW**

**Status:** One newly-drafted line. Norwegian for *"Where in the world…"* (under-breath confusion). Native-speaker review: Julia should run this past a Norwegian speaker before locking. **Flag for verification.**

The janitor takes the cart and exits. No further dialogue from him.

### Post-janitor reflection (auto-plays after janitor exits)

> *No one can see me.* (italic) — **NEW** (matches the line from bible Beat 8)
>
> *(can they?)* (italic, parenthetical) — **NEW**

**Status:** Two italic lines. Matches the bible's locked language for this beat. The parenthetical reads as a small uncertainty Pip is trying not to fully voice.

---

## Beat 9: The kitchen (Cinematic 4 — Pip arrives, sees food)

**Status:** **NEW — not yet shipped.** Cinematic dialogue locked in bible; transcribed here for the build sprint.

### Pre-cinematic ambient (Pip descending the stairwell, no dialogue)

### Cinematic 4 (`CINEMATIC_SCRIPTS.kitchen-meeting`)

> *Pip cannot remember the last time he ate. Maybe he never has, now. Maybe this is the first time.* (roman)
>
> *He takes a bite.* (roman)
>
> *The food hovers in the air.* (roman)
>
> *Behind him, a sound. A pan dropped. A man's voice.* (roman)
>
> HENRIK: *"AAAAAAAAA—"* (roman, spoken, cut off mid-scream)

**Status:** Five lines. The first three are auto-advancing roman narration. The fourth bridges to Henrik's appearance. The fifth is Henrik's scream, cut off in mid-A as the cinematic transitions directly to Beat 10. All five lines are canonical per bible.

---

## Beat 10: Henrik sits down (Cinematic 5 — the mentor reveal)

**Status:** **NEW — not yet shipped.** Cinematic dialogue mostly locked in bible; transcribed here.

### Cinematic 5 (`CINEMATIC_SCRIPTS.henrik-sits-down`)

Henrik freezes, stares, slowly crosses himself, whispers in Norwegian (silent — no dialogue line for the whisper, just the visual gesture). Then sits.

> HENRIK: *"…Så. Du er gutten fra hytte 646."* (roman, spoken, Norwegian)
>
> HENRIK: *"So. You are the boy from cabin 646."* (roman, spoken, English translation)
>
> PIP: *"…you can see me?"* (roman, spoken)
>
> HENRIK: *"Yes. Don't ask why. Not today."* (roman, spoken)
>
> *Henrik looks at the food, still hovering.* (roman)
>
> HENRIK: *"Your grandmother. She told me, last night, in the dining room. She said you would have loved this. That you collected meals like other boys collect stamps."* (roman, spoken)
>
> HENRIK: *"Lefse. Gravlaks. The pickles too — don't skip the pickles."* (roman, spoken)
>
> HENRIK: *"Eat. Tell me if it's as good as she promised."* (roman, spoken)
>
> *He slides the plate toward Pip.* (roman)
>
> PIP: *"…how can you see me, when no one else can?"* (roman, spoken)
>
> *Henrik does not answer immediately. He looks at the food. He looks at Pip.* (roman)
>
> HENRIK: *"Some questions wait. Eat first."* (roman, spoken)

**Status:** Twelve lines. Per bible. The Norwegian line *"Så. Du er gutten fra hytte 646"* is followed by its English translation as a separate line — the multilingual convention here is *paired translation* (because the player needs to understand what Henrik said). This is different from Babcia's *Babciu, jestem tutaj* (no translation provided). Henrik's later Norwegian utterances (the silent-scream whisper, the Nøkken-story-internal Norwegian, the janitor's mutter elsewhere) get *no translation*. Only Henrik's first introductory line is translated.

**Open question:** Julia, confirm — Henrik's first line gets paired translation; subsequent Norwegian phrases don't. My read: yes, because the introductory line is the player's first encounter with multilingual dialogue and needs an anchor. After that, immersion takes over. Flag for review.

---

## Beat 11: The first taste (Cinematic 6 — Erik memory)

**Status:** **NEW — not yet shipped.** Per P1 Session 1 decision: single memory, single cinematic. The 6a grandfather memory is dropped from Ch1.

### Cinematic 6 (`CINEMATIC_SCRIPTS.first-taste`)

The cinematic plays a single shimmer-and-memory sequence. The memory: older Henrik teaching young Erik to make lefse-and-gravlaks. Erik's face is partially visible.

> *Pip takes a bite of the dish.* (roman)
>
> *The kitchen shimmers.* (roman)
>
> *A different kitchen, somewhere else. A boy of five or six watches an older man teach him to lay the lefse, to drape the gravlaks. The boy laughs at something off-screen.* (roman)
>
> *Pip understands, for the first time, that food carries the story of the person who made it.* (italic) — **NEW**
>
> *That every meal is a love letter from someone, to someone.* (italic) — bible
>
> *That if he can taste enough of them — really taste — he might learn the world.* (italic) — bible
>
> *The memory fades.* (roman)

**Status:** Seven lines for the memory sequence. The first three are roman (description); the next three are italic (Pip's realization); the seventh is a roman bridge back to the kitchen. The italic block of three is per bible (with one new line opening the realization).

### Post-cinematic kitchen conversation (room-mode style within the cinematic frame)

After the memory fades, the camera returns to the kitchen. Henrik is on the stool. Pip can approach him.

> PIP: *"I saw… I saw someone. Teaching a boy. Was that you?"* (roman, spoken)
>
> *A pause. Henrik looks at the empty plate.* (roman)
>
> HENRIK: *"…yes."* (roman, spoken)
>
> PIP: *"Who was the boy?"* (roman, spoken)
>
> HENRIK: *"Someone I loved."* (roman, spoken)
>
> *Pip waits. Henrik does not say more.* (roman)
>
> PIP: *"…how does it work, Henrik? When I taste?"* (roman, spoken)
>
> HENRIK: *"Because you needed to. The dead see what they need to see."* (roman, spoken)
>
> PIP: *"Will it always do that?"* (roman, spoken)
>
> HENRIK: *"I think, perhaps, yes. I think that is what you are now."* (roman, spoken)

**Status:** Ten lines. Per bible. **Note:** I changed Pip's first post-memory line from the original bible text *"I saw your grandfather. And then I saw — someone teaching a boy. Was that you?"* to just *"I saw someone. Teaching a boy. Was that you?"* — because the grandfather memory is no longer part of Ch1. Flag for Julia's review.

### Recipe entry (auto, notebook update)

After Henrik's final line dismisses, a HUD notification:

> *Recipe learned: Norwegian lefse and gravlaks (with Norwegian pickles).* — **NEW** (HUD notification)
>
> *Check your notebook.* — **NEW** (HUD subtext)

**Status:** Two HUD lines. The recipe website unlocks the lefse-and-gravlaks page (per bible).

---

## Beat 11b: The Bamsemums (collect verb tutorial)

**Status:** Shipped (Sprint 13). Dialogue is in code.

### Bamsemums proximity dialogue (auto, fires when Pip is near the bag)

> *A small bag of Bamsemums, foam-and-chocolate bears, sits on the counter. Henrik didn't say they were for him. They are.* (roman)
>
> *He could pocket this. ↓ to collect. He'll find it later in his notebook.* (roman)

**Status:** Two lines. Shipped per Sprint 13.

### Post-collect (HUD notification)

> *Bamsemums — from Henrik, in the kitchen.* (HUD, notebook Items entry)

**Status:** HUD-only. The notebook gains its first Items entry.

---

## Beat 11c: The Nøkken story

**Status:** **NEW — not yet shipped.** The full story is drafted here. **This is the largest single writing task for `dialogue.md`.**

### Henrik inspection — opening (`kitchen-henrik-inspect`)

After the Bamsemums collect, Pip can approach Henrik. Inspection:

> HENRIK: *"You'll be going on, soon. The ship docks again tonight."* (roman, spoken) — **NEW**

After the line dismisses, a second line auto-plays:

> HENRIK: *"Before you go. Let me tell you a story."* (roman, spoken) — **NEW**

**Status:** Two newly-drafted opening lines. Henrik's gentleness here lands the chapter's pivot from rule-breaking shock (you can see me?) to mentor (let me tell you).

### The Nøkken story (auto-plays after the opening lines)

> HENRIK: *"There is a thing that lives in dark water."* (roman, spoken) — **NEW**
>
> HENRIK: *"My grandmother told me about it. Her grandmother told her."* (roman, spoken) — **NEW**
>
> HENRIK: *"It plays the violin. Beautiful. So beautiful you walk toward the water without knowing you are walking."* (roman, spoken) — **NEW**
>
> HENRIK: *"It is called the Nøkken."* (roman, spoken) — **NEW**
>
> HENRIK: *"My grandmother said: if you hear violins where there should be no violins, you cover your ears. You walk the other way. You do not look."* (roman, spoken) — **NEW**
>
> *Henrik pauses. He looks at the empty plate.* (roman) — **NEW**
>
> HENRIK: *"I did not always listen to her."* (roman, spoken) — **NEW**
>
> *He says nothing else about that.* (roman) — **NEW**
>
> HENRIK: *"You will see strange things, Pip. Some of them are stories. Some of them are real. The dead see what the living cannot, and not all of it is gentle."* (roman, spoken) — **NEW**
>
> HENRIK: *"Listen carefully. And if you hear violins where there should be no violins — walk the other way."* (roman, spoken) — **NEW**
>
> *Henrik pauses.* (roman) — **NEW (Sprint 26 Stage 0)**
>
> HENRIK: *"I think I saw it once."* (roman, spoken) — **NEW (Sprint 26 Stage 0)**
>
> *He does not say more.* (roman) — **NEW (Sprint 26 Stage 0)**

**Status:** Thirteen newly-drafted lines (ten original + three closing lines added Sprint 26 Stage 0). **This is the chapter's largest writing addition — flagged in full for Julia's review.**

**My read on the writing:**

- Henrik tells the story as folk tale, but his line *"I did not always listen to her"* tips that he believes it. The line about the empty plate (and his pause) is the chapter's quietest moment of him almost-confessing. The full reveal — that his wife and son drowned, that he heard a violin — is reserved for Ch4. The seed is *here*.
- Henrik's voice should be **economical, weathered, careful**. Short sentences. No flourishes.
- The repeated line *"walk the other way"* is the story's load-bearing instruction. It will recur in Pip's mind in future chapters (and possibly during the Ch8 climax).

**Open question for Julia:** Does Henrik's pause after *"I did not always listen to her"* need a specific visual register? A small head-bow, a longer typewriter delay, a held-empty-frame? My read: a 1.5–2 second typewriter delay on the *"He says nothing else about that"* line, plus a slight slowing of Pip's idle animation during the pause. **Flag for `puzzles.md` or build sprint.**

### Next port (auto-plays after the Nøkken story)

> HENRIK: *"The ship docks in Tallinn next. Estonia. There's a chef I want you to meet — her name is Leida. She bakes meatballs. Kodused kotletid."* (roman, spoken) — **NEW**
>
> HENRIK: *"She does not know about the Nøkken. But she knows about other things."* (roman, spoken) — **NEW**
>
> HENRIK: *"Find her. Tell her Henrik sent you."* (roman, spoken) — **NEW**

**Status:** Three newly-drafted lines. The second line plants Ch2's monster (the Haldjas — a different kind of spirit) without naming it.

---

## Beat 12: The dock farewell + Nøkken glimpse

**Status:** **NEW — not yet shipped.**

### Cinematic 7 (`CINEMATIC_SCRIPTS.dock-farewell`) — the dock farewell

The cinematic plays as Pip arrives on the observation deck (or the dock-viewing position — TBD in `puzzles.md`). Wide shot, grandparents walking away with the wooden box.

> *Babcia stops. She turns. She looks up toward the ship.* (roman) — bible
>
> *Babcia is going to leave him. Pip knows this.* (italic) — **NEW** (slight modification from bible's "Babcia is going to leave him. He knows this." — adjusted for present-tense flow)
>
> *He waves. He does not know if it is for her or for himself.* (roman) — **NEW**

**Status:** Three lines. The middle line is in italic (Pip's interior recognition); the others are roman.

### Nøkken glimpse (scripted, plays automatically after the farewell — ~3s)

After the cinematic fades to the deck (player input still locked), the harbor water below comes into focus. A dark rooted shape rises slightly. Two glowing amber eyes peer up. Mostly submerged. ~3 seconds.

No spoken lines. One italic line after the shape submerges:

> *Pip thinks of Henrik's story. He does not say its name.* (italic) — **NEW**

**Status:** One newly-drafted line. The recognition is private. The player should feel the weight without Pip naming it aloud.

---

## Beat 13: Henrik's offer (Cinematic 8 — notebook handoff)

**Status:** **NEW — not yet shipped.**

### Cinematic 8 (`CINEMATIC_SCRIPTS.henriks-offer`)

Henrik and Pip on the deck at sunset. The next port is implied — distant lights on the horizon. Warm orange-pink light fills the frame.

> *Henrik holds out a small leather-bound notebook. The pages are blank.* (roman) — **NEW**
>
> HENRIK: *"This was meant for you. Or for someone like you."* (roman, spoken) — **NEW**
>
> HENRIK: *"Fill it. Eat what you can. Listen to what you taste."* (roman, spoken) — **NEW**
>
> HENRIK: *"And come back, if you can. I'll be in the kitchen."* (roman, spoken) — **NEW**
>
> *Pip takes the notebook. It is small in his hand. It is heavy.* (roman) — **NEW**

**Status:** Five lines (four spoken by Henrik, two roman narration). All newly drafted. The line *"It is small in his hand. It is heavy."* lands the weight of the mission without explaining it.

**My read on the writing:** Henrik's three lines should be **slow.** The typewriter speed should be a touch slower here than normal — Henrik is giving Pip something important and he knows it. The closing line *"I'll be in the kitchen"* is the chapter's small, warm grace note — Henrik is real, he will be there, this isn't a goodbye.

### Final chapter narration (auto-plays after Henrik's lines)

> *And so the mission begins.* (italic) — **NEW**

**Status:** One closing italic line. Per bible's general framing.

**Open question:** Is *"And so the mission begins"* too on-the-nose? My read: yes, slightly — but the chapter has earned a moment of plainspokenness. The voice has been gentle and oblique for most of the chapter; one explicit framing line at the end can land. **Alternative drafts for Julia:**

- *"The horizon ahead is lit. Pip turns toward it."* (more atmospheric, less explicit)
- *"Tomorrow, Tallinn. Tomorrow, Leida."* (forward-looking, names the next thing)
- *"Pip's first night as a ghost is almost over."* (intimate, time-anchored)
- *"And so the mission begins."* (currently drafted — explicit, slightly on-the-nose)

Pick one in dialogue review.

---

## Summary of writing additions (Julia's review checklist)

These are the lines that **don't yet exist anywhere canonical** and need Julia's specific review:

### Henrik's voice (8 newly-drafted clusters)

1. **Beat 10 — Henrik translates himself.** The pair-translation pattern (*"Så. Du er gutten fra hytte 646" → "So. You are the boy from cabin 646"*). Confirm pattern.
2. **Beat 11 — Pip's post-memory line.** Changed from bible *"I saw your grandfather. And then I saw — someone teaching a boy"* to *"I saw someone. Teaching a boy."* (because 6a grandfather memory is dropped from Ch1).
3. **Beat 11c — Nøkken story opening lines.** *"You'll be going on, soon. The ship docks again tonight."* / *"Before you go. Let me tell you a story."*
4. **Beat 11c — The Nøkken story itself.** 10 lines. The chapter's largest writing addition. The line *"I did not always listen to her"* is the key foreshadow.
5. **Beat 11c — Next-port handoff.** *"The ship docks in Tallinn next…"* (three lines).
6. **Beat 13 — Notebook handoff.** *"This was meant for you. Or for someone like you."* (three Henrik lines + two narrations).

### Beat 7 (Dziadek's radio) — 4 newly-drafted lines + 3 paging sub-dialogue lines

Pip's voice should land as quiet wonder, not excitement.

### Beat 8 (dark corridor) — ~12 newly-drafted lines

Including the janitor's Norwegian mutter (*"Hvor i alle dager…"* — flag for native-speaker verification).

### Beat 12 (Nøkken glimpse) — 1 newly-drafted italic line

*"Pip thinks of Henrik's story. He does not say its name."*

### Beat 13 closing line — 4 alternatives offered

Pick one.

---

## Open questions for `puzzles.md` or build sprint

1. **Pair-translation pattern for Henrik's first line** — confirm convention (paired translation for the first introductory line, no translation for subsequent Norwegian).
2. **Henrik's pause after "I did not always listen to her"** — does the visual register need specific handling (head-bow, typewriter delay, idle slowdown)?
3. **Janitor's Norwegian mutter** — native-speaker verification.
4. **Final chapter narration** — pick from the four alternatives.
5. **Bamsemums tutorial line polish** — *"Henrik didn't say they were for him. They are."* (current, shipped) vs. *"Henrik didn't say. But the bag is at his eye-level, and Henrik isn't a man who places things by accident."* (alternative, more lore). My read: keep the shipped line. Flag for Julia.
6. **Recipe HUD notification copy** — *"Recipe learned: Norwegian lefse and gravlaks (with Norwegian pickles)."* Settle final copy in build sprint.

