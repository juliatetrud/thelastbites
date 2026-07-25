# Chapter 1 — playscript extraction (working transcript)

Generated from the committed `design-docs/ch01-playscript.docx` by `python3` stdlib
(`zipfile` + `ElementTree`) — no packages. This is the machine-readable baseline the
Ch1 verbatim-conformance diff runs against (#132). **Do not hand-edit** — regenerate it
from the docx whenever the docx changes; the docx is the source of truth, this is a view.

Conventions: `Narration:` -> `{speaker: null, italic: false}`; `Pip (interior thought):`
-> `{speaker: null, italic: true}`; a named speaker -> `{speaker: NAME, italic: false}`,
with display quotes added where the script omits them. `(not dialogue)` lines are staging
notes, not applied as dialogue. ACTION / PLAYER / GATE / EXIT are structural.

## SCENE 1 — COLD-OPEN · Bergen departure

- _ACTION  The game opens on the Bergen departure cold-open: a cinematic of the ship the Mnemosyne leaving port. No dialogue._
- _ACTION  The cinematic dissolves to the hallway. Pip materializes pixel-by-pixel, mid-yawn, unaware — the neutral-plane opening. Player gains control once the materialize/yawn completes._
- _EXIT  Control begins in the hallway._

## SCENE 2 — HALLWAY

- _ACTION  ~1.5s after the first hallway entry, a formally-dressed passenger walks the corridor and passes straight THROUGH Pip — the first "no one can see me" seed. Scripted, not player-triggered._
### ▸ passenger-thought
- **PIP:** …they didn’t see me.
- _PLAYER  Inspect (↑) the hallway set-dressing — bulletin board, luggage trolley, wall sconce (atmospheric; the Bergen itinerary is on the bulletin)._
### ▸ hallway-bulletin-inspect
- **Narration:** A bulletin board says, “The Mnemosyne (Nem-OSS-uh-nee) welcomes you aboard. Today’s port: Bergen.”
### ▸ hallway-luggage-inspect
- **Pip (interior thought):** That looks just like the bear Babcia gave me…
### ▸ hallway-sconce-inspect
- **Narration:** An oil lamp flickers, not quite in time with itself.
- _ACTION  Two cabin doors face the corridor: the grandparents’ door (world-x 920) and Cabin 646’s door (x 1180)._
- _PLAYER  Grandparents’ door (x920), press ↑. First visit offers only "Try the handle."_
### ▸ gp-door-first
- **Narration:** From inside, Pip can hear someone crying softly.
- **Narration:** Pip reaches for the handle.
- **choice →** Try the handle.
### ▸ gp-door-phase
- **Narration:** Pip’s hand goes through the door, then he goes through the door
- **Pip (interior thought):** …that was weird.
- _EXIT  "Try the handle" → Pip’s hand passes through → phase into the grandparents’ cabin._
- _GATE  Cabin 646’s hallway door is INERT on first visit (never a "Go in") — canonical first entry is via the shared wall from the grandparents’ cabin. Return visits (post-bed) silent-open at x≈1180._
### ▸ gp-door-return
- **Narration:** Babcia and Dziadek are gone.
- **choice →** Go in.
- **choice →** Not now.

## SCENE 3 — GRANDPARENTS’ CABIN

- _ACTION  Pip enters the grandparents’ room: Jan (Dziadek) is seen first at the window with his back turned. Marta (Babcia) weeping on the bed, further into the room. Neither can see Pip. No entry cinematic — the mirror gate is satisfied by marking ‘grandparents’ played on entry; beatStage → pre-mirror._
### ▸ Cinematic: grandparents
- **Narration:** Dziadek wipes a tear from his cheek as he gazes at the moon from the big windows.
- **Narration:** Babcia is on the bed crying with her head in her hands.
- **PIP:** What’s wrong? Dziadek? Babcia? Can you hear me?
- **PIP:** Hello?
- **Narration:** Dziadek and Babcia only hear the hum of the ship.
- _PLAYER  Inspect (↑) the room — armchair, framed photo, suitcase, Babcia, Dziadek._
### ▸ gp-armchair-inspect
- **Narration:** Dziadek’s wool coat is folded over the armchair with a hand held radio in the pocket.
- **Pip (interior thought):** I wonder if I could reach them through this radio.
- (staging, not dialogue) (not dialogue) Pip picks up the radio and speaks into it, hoping the signal can be heard by his grandparents.
- **PIP:** Hello? Hello?
- **Narration:** Static crackles in the room, muffling Pip’s small voice. The radio hums.
### ▸ gp-photo-inspect
- **Narration:** A photograph from Pip’s sixth birthday shows him grinning, holding a pierogi as big as his face.
### ▸ gp-suitcase-inspect
- **Narration:** The suitcase is open. His favorite shirt is on top — the one with the boat on it.
### ▸ gp-babcia-inspect
- **PIP:** “Babciu, jestem tutaj.”
### ▸ gp-dziadek-inspect
- _GATE  The shared wall (right edge) is phase-able ONLY while beatStage==="pre-mirror"._
- _EXIT  Walk into the right wall → wall-phase DISCOVERY into Cabin 646 (descending-whoosh SFX). Left edge → back to the hallway at the grandparents’ door (x904)._

## SCENE 4 — CABIN 646 · mirror & bed

- _ACTION  Pip enters his cabin through the grandparent’s wall. In his room, there’s a mirror, window, nightstand, and a bed._
- _PLAYER  Inspect (↑) the window; a Smørbukk treat sits on the nightstand (collect with ↓). A gold object on the side table is present._
### ▸ cabin-window-inspect
- (staging, not dialogue) (not dialogue) Pip looks out the window at the mountains and the moon. Just like his grandfather.
- **PIP:** “It’s beautiful.”
- _ACTION  THE MIRROR (x280). Dim/locked until the grandparents’ scene has played; then pressing ↑ triggers the melt._
### ▸ mirror-locked
- **Narration:** A small mirror teeters invitingly with the rock of the ship.
- _ACTION  MIRROR-REALIZATION cinematic (Cinematic 2 — the melt): Pip’s human face melts away to reveal his ghost form. Runs to completion and returns control; sets beatStage → pre-bed. The mirror afterward shows the ghost reflection — an ordinary mirror, no meta-replay._
### ▸ Cinematic: mirror-realization
- **Narration:** Pip sees himself in the mirror, then his ghost.
- **Pip (interior thought):** Why did my reflection change? What is going on?
### ▸ mirror-post
- (staging, not dialogue) No dialogue: The mirror shows Pip his ghostly reflection
- _ACTION  THE BED. After the mirror, the bed’s aura intensifies; something is under the sheets._
### ▸ bed-pre-reveal
- **Pip (interior thought):** I wonder what that lump is. Maybe I don’t want to know…
- _ACTION  Lift the sheets → BED-REVEAL cinematic (Beat 8): Pip sees his own small, motionless body. Sets bedRevealed + beatStage → post-bed; float is learned here (stage 1, low altitude cap); then the PANIC sequence begins._
### ▸ Cinematic: bed-reveal
- **Pip (interior thought):** I’m … I’m… I’m DEAD.
### ▸ bed-post-reveal
- **Pip (interior thought):** Hmm, my old bed.
- _ACTION  PANIC sequence: Pip floats up, hovers, glides left in panic (gentle-comic tears burst from his ghost eyes), reaches the wall, and phases THROUGH it back into the hallway._
- _GATE  The manual left-door exit is gated on bedRevealed — the player cannot leave Cabin 646 before the bed reveal (fix G-S4)._
- _EXIT  Panic auto-exit → hallway at x1164 (just left of the cabin door)._

## SCENE 4b — HALLWAY (return, post-bed)

- _ACTION  Back in the hallway, now post-bed: the descending staircase and a lit "DOWN" sign are present at the far right (they render only post-bed)._
- _GATE  Hallway → dark corridor unlocks only when beatStage==="post-bed" and pip.x ≥ 1312._
- _EXIT  Walk to the far-right staircase (x≥1312) → descend to the dark corridor._

## SCENE 5 — DARK CORRIDOR · wire-shock, sconce, cart, radio, janitor, stairs

- _ACTION  Pip steps into the rough service corridor — gently dark, atmospheric. Echo-spiders skitter along the floor and ceiling._
- _ACTION  ~0.7s after entry, an interior-thought nudge points Pip deeper toward the sparking sconce, so the gating chain actually starts._
### ▸ dc-entry-nudge
- **Pip (interior thought):** It’s so dark down here. Maybe I can fix the lights.
- _PLAYER  The fallen sconce / LIVE WIRE (x420). Press ↑. (Fix CP-2b: the wire-shock now fires on the FIRST touch — no separate hold required.)_
### ▸ dc-sconce-pre
- **Narration:** Sparks crawl along the fallen sconce’s loose wires.
- **Pip (interior thought):** Uh oh. Is that a live wire?
- _ACTION  WIRE-SHOCK cinematic: a big jagged lightning bolt strikes down, a white flash punches, Pip jolts and then lifts. Grants the electricity ability, boosts float to full (stage-2 floatBoosted), and wakes the corridor lights._
### ▸ Cinematic: wire-shock
- **Pip (interior thought):** Oh woah, I can float even higher now.
- _ACTION  LIGHTS-ON sequence: sconces flicker back on down the corridor — "the corridor breathes back into light." A HUD hint points at the cart the light just revealed._
### ▸ dc-sconce-post
- **Narration:** The wires spark. The sconce buzzes. Then another. Then another.
- _PLAYER  The JANITOR’S CART (x840), now visible in the light, blocks the stairwell. Press ↑ to inspect — a name tag reads "J. Henriksen, Maintenance," and the clue points to Dziadek’s radio in the cabin._
### ▸ dc-cart-inspect
- **Narration:** A janitor’s cart, abandoned mid-shift. The clipboard reads: "J. Henriksen, Maintenance."
- **Narration:** The cart is too heavy, and Pip’s hands pass through it.
- **Pip (interior thought):** J. Henriksen… Dziadek’s radio could call him.
### ▸ dc-cart-push-fail
- **Narration:** The cart is too heavy, and Pip’s hands pass through it.
- **Pip (interior thought):** Dziadek’s radio could call whoever left it.
- _ACTION  RADIO BACKTRACK: leave the corridor (left edge → hallway → grandparents’ door "Go in" → grandparents’ cabin) and use Dziadek’s radio. (Fix CP-2b: once the cart is found, the "Page" choice appears on the FIRST inspect.)_
### ▸ gp-radio-page-choice
- (staging, not dialogue) (not dialogue) Pip pulls the hand radio from his pocket…
- **PIP:** “Calling J Henriksen. You cart is blocking the stairs.”
- _ACTION  Return to the corridor. The JANITOR walks in from the left, mutters in Norwegian, looks right past Pip, grabs the cart and pushes it off the left edge — the "no one can see me" lock-in. Sets janitorWalked; the cart is gone for good._
### ▸ janitor-mutter
- **JANITOR:** “Hvor i alle dager …”
### ▸ dc-post-janitor
- **Pip (interior thought):** No one can see me.
- _PLAYER  The STAIRWELL (x880). The janitor clears the cart_
### ▸ dc-stairwell-descend
- **Narration:** The stairwell descends into the kitchen below.
- **choice →** Go down.
- **choice →** Not yet.
- _GATE  The stairwell descent is gated on janitorWalked (cart cleared)._
- _EXIT  "Go down" → the kitchen below._

## SCENE 6 — KITCHEN · Henrik

- _ACTION  Pip descends into Henrik’s warm-amber kitchen. Approaching the plate at world-x≈290 auto-fires the KITCHEN-MEETING cinematic (Cinematic 4): Henrik can see Pip._
### ▸ Cinematic: kitchen-meeting
- **Narration:** Pip cannot remember the last time he ate.
- **Narration:** He takes a bite.
- **Narration:** The food hovers in the air.
- **Narration:** Behind him, a sound. A pan drops. A man yelps.
- **HENRIK:** ”AAAAAAAA—“
- _ACTION  This chains into HENRIK-SITS-DOWN (Cinematic 5) — Henrik crosses himself and sits at the stool — then FIRST-TASTE (Cinematic 6): Pip tastes the food, a color-temperature memory wash; a recipe is added to the notebook._
### ▸ Cinematic: henrik-sits-down
- **HENRIK:** “…Så. Du er gutten fra hytte 646 — so. You are the boy from cabin 646.”
- **PIP:** “…you can see me?”
- **HENRIK:** “Yes. Don’t ask why. Not today.”
- **Narration:** Henrik looks at the food, still hovering.
- **HENRIK:** “Lefse. Gravlaks. The pickles too.”
- **Narration:** He slides the plate toward Pip.
- **PIP:** “…how can you see me, when no one else can?”
- **HENRIK:** “Some questions wait. Eat first.”
- (staging, not dialogue) (not dialogue) Pip takes a bite of the lefse, gravlaks, and pickles, and a big smile comes over his face.
### ▸ Cinematic: first-taste
- **Narration:** The kitchen shimmers.
- **Narration:** A young Norwegian boy in a cottage kitchen, watching an old man’s hands cure salmon. Sun through a window. The smell of dill. The man is his grandfather.
- **Narration:** And Pip understands, for the first time, that food carries the story of the person who made it.
- **Narration:** Pip takes a bite of the lefse.
- **Narration:** A different kitchen now. Different time.
- **Narration:** An older Henrik — recognizably grown — teaching a young boy to make the same lefse. The child’s face is turned away, in profile, in half-shadow. The child laughs at something off-screen.
- **Narration:** That every meal is a love letter from someone, to someone.
- **Narration:** That if he can taste enough of them — really taste — he might learn the world.
- **Narration:** Pip finishes the dish in record time.
- **Narration:** The memory fades. Pip is back in the kitchen.
- **PIP:** “…I saw two things. Someone teaching you. And then you — teaching a boy. Was that you, both times?”
- **Narration:** A pause. Henrik looks at the empty plate.
- **HENRIK:** “…yes.”
- **PIP:** “Who was the boy?”
- **HENRIK:** “Someone I loved.”
- **Narration:** Pip waits. Henrik does not say more.
- **PIP:** “…how does it work, Henrik? When I taste?”
- **HENRIK:** “Because you needed to. The dead see what they need to see.”
- **PIP:** “Will it always do that?”
- **HENRIK:** “I think, perhaps, yes. I think that is what you are now.”
- _PLAYER  Collect the Bamsemums treat (↓) at x≈520 — this unlocks Henrik’s inspectable._
- _PLAYER  Inspect Henrik on the stool (↑): the first inspect plays the NØKKEN STORY (sets nokkenStoryHeard); re-inspect is a quiet repeat._
### ▸ NØKKEN STORY LINES
- **HENRIK:** “You’ll be going on, soon. The ship docks again tonight.”
- **HENRIK:** “Before you go. Let me tell you a story.”
- **HENRIK:** “There is a thing that lives in dark water.”
- **HENRIK:** “My grandmother told me about it. Her grandmother told her.”
- **HENRIK:** “It plays the violin. Beautiful. So beautiful you walk toward the water without knowing you are walking.”
- **HENRIK:** “It is called the Nøkken.”
- **HENRIK:** “My grandmother said: if you hear violins where there should be no violins, you cover your ears. You walk the other way. You do not look.”
- **Narration:** Henrik pauses. He looks at the empty plate.
- **HENRIK:** “I did not always listen to her.”
- **Narration:** He says nothing else about that.
- **HENRIK:** “You will see strange things, Pip. Some of them are stories. Some of them are real. The dead see what the living cannot, and not all of it is gentle.”
- **HENRIK:** “Listen carefully. And if you hear violins where there should be no violins — walk the other way.”
- **Narration:** Henrik pauses.
- **HENRIK:** “I think I saw it once.”
- **Narration:** He does not say more.
- **HENRIK:** “The ship docks in Tallinn next. Estonia. There’s a chef I want you to meet — her name is Leida. She bakes meatballs. Kodused kotletid — homemade cutlets.”
- **HENRIK:** “She does not know about the Nøkken. But she knows about other things.”
- **HENRIK:** “Find her. Tell her Henrik sent you.”
### ▸ kitchen-henrik-repeat
- **Narration:** Henrik sits quietly on the stool. The kitchen has gone still.
- _GATE  The right-edge exit to the observation deck is LOCKED until nokkenStoryHeard. If the player reaches the edge early, a one-shot nudge points back to the Bamsemums → Henrik steps (fix G-S6)._
### ▸ kitchen-gate-hint
- **Pip (interior thought):** The way out is here — but I can’t just leave. Henrik was about to tell me something.
- **Pip (interior thought):** The treat on the counter first, then back to him on the stool.
- _EXIT  Right edge (nokkenStoryHeard) → observation deck. Left edge → back to the dark corridor._

## SCENE 7 — OBSERVATION DECK & FINALE

- _ACTION  A calm final room: the aurora glows through the viewport._
- _PLAYER  Inspect the aurora viewport (x350)._
### ▸ aurora-inspect
- **Narration:** Pip has never seen the northern lights before. He wonders if he would have, had things gone differently.
- _ACTION  Walk to the right edge → DOCK-FAREWELL cinematic (Cinematic 7): the grandparents disembark (sets grandparentsLeft). It flows into the NØKKEN GLIMPSE — a ~3s input-locked scripted beat (sets nokkenGlimpsed)._
### ▸ Cinematic: dock-farewell
- **Narration:** Babcia stops. She turns. She looks up toward the ship.
- **Narration:** Babcia is going to leave him. Pip knows this.
- **Narration:** He waves. He does not know if it is for her or for himself.
- _ACTION  After the glimpse, HENRIK appears on the deck. Inspect him → HENRIK’S OFFER cinematic (Cinematic 8): he gives Pip the notebook and a candle "for the corridors." Sets notebookReceived + chapter1Complete._
- _GATE  Henrik on the deck is not interactive until nokkenGlimpsed._
### ▸ Cinematic: henriks-offer
- **HENRIK:** "This was meant for you. Or someone like you."
- **HENRIK:** "Fill it. Eat what you can. Listen to what you taste."
- **HENRIK:** "And come back, if you can. I’ll be in the kitchen."
- **Narration:** And so the mission begins.
### ▸ deck-henrik-post
- **Narration:** Henrik stands quietly on the deck. He looks out at the water.
- _EXIT  FINALE: showChapter1End() → startChapter2() hands off to Chapter 2 (Käsmu). The observation deck is an intentional one-way terminal room (no walk-back to the kitchen)._
