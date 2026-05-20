# Chapter 1: Beats

The player-input beat sheet. One section per beat. Each beat specifies mode, trigger, player inputs allowed, what happens, exit condition, state changes, and which files implement it.

This doc is the canonical reference for *what the player can do at any moment in Chapter 1.* If something here contradicts the bible (`01-story-bible.md`) or chapter outline (`04-chapter-01-cabin-646.md`), the bible/outline are source of truth — surface the conflict and patch the docs.

---

## Chapter structure overview

Chapter 1 has **14 beats**. Most beats are room-mode with a few cinematics interspersed. The chapter runs roughly 15–20 minutes of playtime on a first pass.

| Beat | Name | Mode | Status |
|---|---|---|---|
| 1 | Waking in the hallway | Room | Shipped (Sprint 10.7) |
| 2 | Exploring the hallway | Room | Shipped (Sprints 02–07, 16) |
| 3 | The Passenger walk-through | Scripted in-room event | Shipped (Sprint 03) |
| 4 | The cabin door (listen only — first entry to 646 is via shared wall) | Room | Shipped (Sprint 14; post-grandparents' "Go in" superseded Sprint 22) |
| 5 | The mirror (Pip learns he is dead) | Cinematic 2 | Shipped (Sprint 11) |
| 6 | The grandparents' cabin (phase-through + cinematic) | Cinematic 3 → Room | Shipped (Sprint 04, content patched Sprint 07) |
| 7 | Dziadek's radio (talk-through-speakers) | Room | **Not shipped** — to be built |
| 8 | The dark corridor (electricity + float + janitor) | Room → puzzle | **Not shipped** — to be built |
| 9 | The kitchen (Pip arrives, sees food) | Cinematic 4 | **Not shipped** — to be built |
| 10 | Henrik sits down | Cinematic 5 | **Not shipped** — to be built |
| 11 | The first taste (Cinematic 6, Erik memory) | Cinematic 6 | **Not shipped** — to be built |
| 11b | The Bamsemums (collect verb tutorial) | Room | Shipped (Sprint 13) |
| 11c | The Nøkken story | Room (Henrik inspectable) | **Not shipped** — to be built |
| 12 | The dock farewell + Nøkken glimpse | Cinematic 7 + scripted | **Not shipped** — to be built |
| 13 | Henrik's offer (notebook handoff) | Cinematic 8 | **Not shipped** — to be built |

**Cinematic count:** 8 cinematics in Ch1 (1, 2, 3, 4, 5, 6, 7, 8). The old 6a/6b split is collapsed into a single Cinematic 6 (see Beat 11).

---

## Beat 1: Waking in the hallway

**Mode:** Cinematic-style opening within room mode

**Trigger:** Hard game load. Plays once per browser session (replays on refresh).

**Player inputs allowed during beat:**
- During materialization (~1.5s): **none**. Pip is mid-yawn, mid-materialize, player has no control.
- During opening narration: **Space** to dismiss the dialogue box.
- After narration dismissed: full room-mode controls — **← →** (move, right-only initially), **↑** (inspect), **↓** (squat — collect verb not yet taught).

**What happens:**
1. Black screen briefly, then Pip materializes pixel-by-pixel at the leftmost end of the hallway (world-x ~`40`) over ~1.5 seconds.
2. During materialization, his mouth is wide open and his eyes are slits — the yawn animation. Mouth closes and eyes reopen as materialization completes.
3. Dialogue box opens with opening narration:
   > *Pip yawns. He doesn't remember falling asleep, but that's not unusual. The hallway hums softly around him.*
4. Player presses Space. Dialogue dismisses.
5. Player control begins.

**Exit condition:** Opening narration is dismissed. `chapterState.openingPlayed = true`.

**State changes:**
- `chapterState.openingPlayed: false → true`
- Player position locked to hallway start, facing right.

**Files involved:**
- `game/index.html` — `openingState` state machine, `drawPip` reveal-mask system, opening dialogue node.
- Sprint 10.7 is the canonical reference for this beat.

---

## Beat 2: Exploring the hallway

**Mode:** Room

**Trigger:** Player gains control after Beat 1.

**Player inputs allowed:**
- **← →** to move (left wall enforced at world-x `0`)
- **↑** to inspect any object within proximity range
- **↓** does nothing yet (squat)
- **TAB** to open the notebook (empty so far — Recipes and Items sections both empty)
- **P** to pause

**What happens:**

Pip can walk right through the hallway. The hallway has six doors (636, 638, 640, 642, 644, 646 — see `hallway.md` § Spatial layout), several wall-decor pieces, two sconces, three portholes, a luggage trolley, a bulletin board, and the visible descending staircase at the far-right dark zone.

**Inspectables and their dialogues (all current per Sprint 07 content patch):**

| World-x | Object | Inspection text |
|---|---|---|
| ~260 | Bulletin board | *A bulletin board sits near the stairwell to let the passengers know the ship's itinerary.* / *It says, "The Mnemosyne (Nem-OSS-uh-nee) welcomes you aboard. Today's port: Bergen."* |
| ~530 | Luggage trolley | *Hmm. Looks like someone packed in a hurry…* (italic) / *A stuffed bear sticks out of the top of the suitcase.* / *That looks just like the bear Babcia gave me…* (italic) |
| ~820 | Flickering sconce | *An oil lamp flickers, not quite in time with itself.* / *When Pip steps close, it falters. When he steps back, it steadies. It almost feels like it's reacting to him.* / *How could that be? Pip wonders.* (italic) |
| ~230 | Ship photograph (P1 S1) | *A black-and-white photograph of a sister ship at her launch. The pose is formal, the steam pouring. A small brass plate reads something in Norwegian.* |
| ~865 | Navigational chart (P1 S1) | *A framed nautical chart of the North Sea. Someone has drawn a small red circle around Bergen. The ink is fresh.* |
| ~1180 | Cabin 646 door | See Beat 4. Door has two states (pre-grandparents' / post-grandparents'). |
| ~900 | Grandparents' cabin door (644) | *From inside, someone is crying softly. The sound is familiar.* / *Pip reaches for the handle.* See Beat 6 for phase-through trigger. |

**Hallway treat (P1 Session 1):** A canonical hallway treat exists near the luggage trolley or bulletin board area. It emits the warm collect-aura. **Not yet collectable** — Pip hasn't learned `↓` yet (taught in Beat 11b). Replay reward.

**Exit condition:** None — this is the chapter's exploration substrate. Player exits Beat 2 by walking off into another beat (cabin door = Beat 4; grandparents' door = Beat 6; Passenger walk-through = Beat 3 trigger; far-right staircase = blocked until post-Beat-11).

**State changes:** None from exploration alone. Specific inspections can mark `chapterState.seenObjects[id] = true` for future content gating, but no critical state changes in Beat 2.

**Files involved:**
- `game/index.html` — `hallwayObjects` array, `drawHallway` function.

---

## Beat 3: The Passenger walk-through

**Mode:** Scripted in-room event (Pip retains control before/after, but the Passenger's walk is auto-animated)

**Trigger:** Pip walks past world-x `~500` in the hallway for the first time. One-shot per chapter (does not retrigger).

**Player inputs allowed during beat:**
- Pip retains full room-mode controls. The player can walk in any direction. The Passenger's walk happens *around* Pip — Pip is not locked.
- Standard inspect / collect / notebook / pause inputs all work.

**What happens:**
1. The Passenger sprite enters from the right edge of the visible camera frame, walking left.
2. The Passenger walks at a steady pace toward Pip's current x-position. The sprite continues past Pip — *through the spot Pip is in*, if Pip doesn't move.
3. Pip drifts to the side instinctively (a small scripted nudge, ~`6 px`, in whichever direction has more space). The drift is automatic; the player doesn't input it.
4. As the Passenger overlaps Pip's position, an atmospheric dialogue line plays:
   > *…they didn't see me.* (italic, Pip's thought)
5. The Passenger exits off the left edge of the camera frame and is despawned.

**Exit condition:** Passenger sprite leaves the camera frame. `chapterState.passengerSeen = true`.

**State changes:**
- `chapterState.passengerSeen: false → true`
- Pip's position may shift slightly due to the drift nudge.

**Files involved:**
- `game/index.html` — Passenger NPC sprite (`drawPassenger`), scripted walk system, trigger-x check.

---

## Beat 4: The cabin door (listen only — return-visit entry)

**Mode:** Room (hallway)

**Trigger:** Player presses `↑` near the cabin door at world-x `~1180` in the hallway. Two-stage behavior gated on grandparents' cinematic. This door is the **return-visit entry** to Cabin 646. Pip's first entry to Cabin 646 happens via the shared-wall phase-through from grandparents' cabin (Beat 6 continuation, below).

**Player inputs allowed:**
- At the door (hallway side): **↑** to open dialogue; **↑↓** to navigate choices; **Space** to select; **←** to back out.

**What happens:**

### Pre-grandparents' (Beat 6 not yet played)

Dialogue:
> *Cabin 646. The door is closed.*

Two choices:
1. **Listen at the door.** Plays three lines:
   > *Pip presses his ear to the door.*
   > *From inside, a man's voice — quiet, careful.*
   > DOCTOR (FROM INSIDE): *…there was nothing more we could do. I'm so sorry.*
   
   Returns to hallway. Repeatable.
2. **Not now.** Closes dialogue. Returns to hallway.

**No "Go in" option pre-grandparents'.** Pip hasn't realized he can phase through wood. The door is closed in narrative terms.

### Post-grandparents' (Beat 6 has played)

The dialogue and choices are *unchanged* from pre-grandparents'. Pip's first entry to Cabin 646 has already happened via the shared wall (see Beat 6 continuation below). For return visits, Pip phases through this door silently — no dialogue, no cinematic. The "Listen at the door" option remains available as atmospheric texture; the doctor's voice is still hearable indefinitely.

**No "Go in" option ever appears on this door.** Return visits to Cabin 646 are silent phase-throughs through the wooden door.

**Exit condition:**
- For "Listen at the door": dialogue dismisses, return to hallway.
- For return visits to Cabin 646: silent phase-through. No state change.

**State changes:**
- None. `cabinState.doctorSeen` is set in Beat 6 continuation, not here.

**Files involved:**
- `game/index.html` — `hallway-cabin-door` interactable, return-visit phase-through logic.
- Sprint 14 is the canonical reference for the pre-grandparents' gating logic; post-grandparents' "Go in" superseded by Sprint 22 (option A locked).

---

## Beat 5: The mirror (Pip learns he is dead)

**Mode:** Cinematic 2 (mirror melt)

**Trigger:** Inside the cabin, post-doctor-cinematic *(which fires on shared-wall arrival in Beat 6 continuation, not on cabin-door entry — see § Beat 6 continuation below)*, player presses `↑` near the mirror at world-x `~280`. One-shot per chapter.

**Player inputs allowed during cinematic:**
- **Space** to advance through cinematic lines.
- No other inputs while the cinematic runs.

**What happens:**

The mirror cinematic plays — a close-up of Pip's face in the mirror, melting on one side, single warm lamplight from upper-left, half in deep shadow, sunken eye sockets with pinprick highlights. Sequence:

1. The mirror's reflective surface goes still. Pip approaches it.
2. The reflection shifts — Pip's face begins to melt on one side, skin sagging like wax.
3. Pip's reflection is recognizably him, but wrong. The realization lands.
4. Dialogue plays (italic, Pip's interior thought):
   > *Oh.*
5. **Panic glide + tear spray** (per Sprint 11):
   - Pip glides toward the cabin door at 1.8× normal walk speed.
   - Cool-white teardrop particles arc backward from his eyes, fading within ~0.4s.
   - He continues through the door and into the hallway. Tears stop.
   - Player control restores in the hallway.

**Tone note:** This sequence is *gentle-comic* alongside the grief. The fast glide + tear spray is both real grief and a small ghost going very fast. Don't dampen the comic.

**Exit condition:** Pip arrives in the hallway. Player has control. `cabinState.mirrorRevealed = true`. `cabinState.bedRevealed = true` (the bed reveal is bundled with the mirror moment per Sprint 11).

**State changes:**
- `cabinState.mirrorRevealed: false → true`
- `cabinState.bedRevealed: false → true`
- The mirror's reflective surface permanently shows a cool-white tint with a Pip-ghost outline inside (per Sprint 11 post-cinematic state).
- The bed's lump-under-covers is no longer drawn.
- Bed and mirror both gain breadcrumb-elevated auras (~0.45 pulse) signaling "come back to this" if Pip leaves and returns. *(This direction is reversed in current chapter logic — see Open Questions in `rooms.md` § Cabin 646.)*

**New hint after Beat 5:** *"Find Babcia."*

**Files involved:**
- `game/index.html` — `CINEMATIC_SCRIPTS.mirror`, mirror inspectable in `cabinObjects`, panic-glide animation, tear particle system.

---

## Beat 6: The grandparents' cabin (phase-through + cinematic + room aftermath)

**Mode:** Cinematic 3 (phase-through + grief tableau) → Room

**Trigger:** Player presses `↑` near the grandparents' cabin door (world-x `~900` in hallway). The phase-through happens automatically on inspection.

**Player inputs allowed:**
- At the door: **↑** to inspect.
- During phase-through cinematic: **Space** to advance lines.
- During grief tableau cinematic: **Space** to advance lines.
- In room-mode aftermath: full room-mode controls.

**What happens:**

### Phase-through (cinematic 3a — built into the same cinematic)

1. Inspection lines:
   > *From inside, someone is crying softly. The sound is familiar.*
   > *Pip reaches for the handle.*
   > *Pip's hand goes through. He steps closer. He steps through the door.*
   > *…oh.* (italic)
2. The cinematic transitions to the grandparents' cabin scene.

### Grief tableau (cinematic 3b)

The full cinematic plays — Babcia on the bed weeping, Dziadek at the window, lamp creating warm pool, suitcase open, photograph on nightstand. Wide composition.

Dialogue plays through the held scene (per Sprint 07 content patch, ~12 lines including the new line where Pip tries to address Babcia and gets no response).

> *Babcia is on the bed with her head in her hands. She is making a sound Pip has never heard her make. She is sobbing.*
> PIP: *"Babcia, what's wrong?"*
> *Dziadek stands at the window. His shoulders are shaking. He says nothing.*
> [...continuing through the cinematic per Sprint 07's locked content...]

### Room-mode aftermath

The cinematic fades. Pip is at the left edge of the room, facing right. Player has control.

**Four inspectables** (per `rooms.md` § Grandparents' cabin):
| World-x | Object | Inspection (summary — see `dialogue.md` for full text) |
|---|---|---|
| ~560 | Babcia | Three lines ending with: PIP: *Babciu, jestem tutaj.* (Polish, no English fallback — locked Sprint 19) |
| ~160 | Dziadek | Three lines mentioning the windowsill radio (off, now) |
| ~620 | Photograph | Sixth-birthday memory (pierogi nearly as big as Pip's face) |
| ~380 | Suitcase | Three lines including the new pierogi recipe card line (locked Sprint 19) |

**New (P1 Session 1):**
| ~200 | Dziadek's radio | Crackles to life when Pip approaches within ~30 px aura range. Faint static sound. *(See Beat 7.)* |
| ~280 | Armchair with Dziadek's coat | *Dziadek's wool coat is folded over the armchair. He must have meant to wear it. He hasn't moved since they were told.* |

**Exit from room:** Walking off the left edge transitions back to the hallway. A soft cool-blue glow at the left edge signals "this is the way back."

**Exit condition:** Pip leaves the room via the left edge. `cinematic.played.has('grandparents') === true` (locks Beat 4's post-grandparents' state).

**State changes:**
- `cinematic.played.add('grandparents')`
- Cabin 646 door's dialogue state shifts to post-grandparents' (Beat 4).

**Files involved:**
- `game/index.html` — `grandparentsObjects` array, `drawGrandparents`, `CINEMATIC_SCRIPTS.grandparents`, room transition logic.
- Sprint 04 / 07 / 19 are the canonical references.

---

## Beat 6 continuation: The shared wall (first entry to Cabin 646)

**Mode:** Room (grandparents' cabin) → Cinematic (doctor exit) → Room (Cabin 646)

**Trigger:** Pip walks into the right wall of grandparents' cabin after the cinematic and inspectables. A cool-blue glow patch on the right wall signals the traversal point. No `↑` required — walking into the wall is the trigger.

**Player inputs allowed:**
- During traversal shimmer: **none** briefly (~0.5s).
- During doctor-exit cinematic: **none**. Player input locked for ~2–3 seconds.
- After cinematic: full room-mode controls in Cabin 646.

**What happens:**

1. Pip's hand reaches the right wall. The wall shimmers briefly with a cool-blue pulse.
2. Screen transition. Pip arrives in Cabin 646 on the left side, facing right.
3. Doctor-exit cinematic fires automatically on arrival:
   - Doctor sprite visible at center-right (world-x `~280` in cabin).
   - Doctor sprite walks toward the far cabin door (world-x `~450`).
   - Door briefly opens, doctor exits, door closes.
   - Pip stands at the entry side, facing right, watching in silence. ~2–3 seconds, no dialogue.
4. Control restores after the cinematic. The cabin is empty.
5. Mirror and bed are now interactable (Beat 5 mirror trigger; bed reveal is bundled).

**This is the first mechanical use of phase-through-wood.** Narrative discovery was the grandparents' cabin door at the start of Beat 6 — Pip's hand went through. The shared-wall traversal is the moment phase-through becomes a verb the player has chosen to use.

**Exit condition:** Doctor-exit cinematic ends. `cabinState.doctorSeen: false → true`. Player has control in Cabin 646.

**State changes:**
- `cabinState.doctorSeen: false → true`
- Cabin 646's far door becomes permanently closed and non-interactive after the cinematic.

**Files involved:**
- `game/index.html` — shared-wall trigger in grandparentsObjects or as a Pip-x-position check; cabin-646 left-edge arrival logic; doctor-exit cinematic registered under `cinematic.played.has('doctor-exit')` (or existing key).
- This is the canonical first-visit path to Cabin 646. The hallway door at x=1180 is the return-visit path only.

---

## Beat 7: Dziadek's radio (talk-through-speakers)

**Mode:** Room (grandparents' cabin)

**Status:** **Not yet shipped.** This beat's player-facing mechanics need building.

**Trigger:** Player presses `↑` near Dziadek's radio (world-x `~200` on the windowsill in the grandparents' cabin). May trigger after a separate proximity event — the radio crackles to life when Pip is within ~30 px.

**Player inputs allowed:**
- At the radio: **↑** to inspect.
- During the discovery sequence: **Space** to advance lines.
- After discovery: standard room-mode controls.

**What happens:**

1. **Proximity crackle (passive):** When Pip approaches within ~30 px, the radio crackles to life. Faint static sound. This is the seed.
2. **Inspection (↑):**
   > *Pip's voice would come out of this radio.*
   > PIP: *…hello?*
   > *His voice answers from the speaker. Tinny. Small. But real.*
   > PIP: *Oh. Oh, this is good.*
3. **Second ability earned: Talk-through-speakers.** No menu unlock, no journal entry yet. Pip can now use shipboard radios/intercoms.

**Note on the radio's gameplay function in Ch1:** Pip uses this discovery later in Beat 8 to page J. Henriksen via the ship's intercom system. Important: the grandparents' cabin radio is *domestic* (Dziadek's bedside radio). The Beat 8 paging happens via a separate ship's intercom — Pip carries the ability with him, not the radio. (See `puzzles.md` for the puzzle state machine.)

**Open question (deferred to puzzles.md):** Where is the ship's intercom that Pip uses to page Henriksen? Is it in the dark corridor itself, or somewhere along the way? The bible says Pip "backtracks to the radio" — implying he returns to the grandparents' cabin. **My read:** Pip returns to the grandparents' cabin radio (the same one). Once he has the talk-through-speakers ability, that radio is also the intercom paging system. One radio, two functions. Settle in puzzles.md.

**Exit condition:** Discovery sequence completes. `chapterState.radioDiscovered = true`. Player has room-mode control.

**State changes:**
- `chapterState.radioDiscovered: false → true`
- Ability unlocked: talk-through-speakers.

**Files involved:**
- `game/index.html` — Dziadek's radio inspectable (to be added to `grandparentsObjects`), proximity-crackle trigger.

---

## Beat 8: The dark corridor (electricity + float + janitor)

**Mode:** Room → puzzle interaction → scripted NPC walk

**Status:** **Not yet shipped.** The chapter's first multi-step puzzle.

**Trigger:** Player walks through the hallway's far-right descending staircase (world-x `~1320+`) after Beat 5 has played. The staircase becomes navigable post-mirror; pre-mirror it's visually dark and impassable.

**Player inputs allowed:**
- Standard room-mode controls in the dark corridor (left/right/inspect/notebook/pause).
- During the broken-sconce puzzle interaction: **held button** (Space or ↑ — TBD in puzzles.md). My read: held-↑ for ~1.5 seconds while at the sconce.
- During float-discovery: **none briefly**, then Space-held to float.
- During janitor's scripted walk: standard room-mode controls (Pip can walk; janitor walks past him).

**What happens:**

### Phase 1: Dark corridor entry

1. Pip descends the staircase. Camera transitions to the dark corridor room.
2. The room is nearly black. Only a small radius around Pip is visible (his own faint aura ~30–40 px).
3. A single weakly-flickering working sconce at world-x `~240` is barely visible.
4. The fallen sconce at world-x `~420` is invisible until Pip approaches.

### Phase 2: Find the broken sconce

1. Pip walks right. Approaches world-x `~420`.
2. The fallen sconce becomes visible within Pip's aura. Breadcrumb-elevated aura on the sconce signals "this is what to do."
3. Inspect (`↑`) opens a small dialogue:
   > *The wires are sparking. Maybe I can…* (italic)
4. The held-button puzzle interaction triggers. (Mechanics TBD in `puzzles.md`.)
5. On success: lights buzz back on. Wall gradient lifts. The corridor reveals itself.
6. **Third ability earned: flicker electricity.**

### Phase 3: Float discovery

1. Pip walks forward (right) from the sconce position.
2. He passes over the broken-glass tile at world-x `~420` (just below the fallen sconce).
3. **Involuntary float panic:** Pip rises ~`1.5` character-heights for ~`0.6s`, then resettles. Cool-white tears do *not* play here (the tears are reserved for the Beat 5 panic glide).
4. Narration:
   > *Pip didn't mean to do that. But he can do that.*
5. **Fourth ability earned: float.** Player can now hold Space to float ~1.5 character-heights for as long as the button is held.

### Phase 4: Find the cart, get the name

1. Pip continues right. Reaches the janitor's cart at world-x `~840`.
2. Inspect:
   > *A janitor's cart, abandoned mid-shift.*
   > *A name tag on the clipboard reads: "J. Henriksen, Maintenance."*
3. Pip tries to push the cart — fails. Phase-through works (he's a ghost), but he can't move the cart.

### Phase 5: Page the janitor

1. Pip backtracks: dark corridor → hallway → grandparents' cabin.
2. At Dziadek's radio: inspect.
3. New dialogue option appears post-Beat-8-cart-discovery:
   > **Page someone over the intercom.**
4. Selection opens a sub-dialogue:
   > PIP: *…attention. J. Henriksen to the dark corridor. Please.*
   > *His voice carries through the ship.*
5. `chapterState.janitorPaged = true`.

### Phase 6: Janitor's scripted walk

1. Pip returns to the dark corridor.
2. On entry (or shortly after), the janitor enters from the left edge of the dark corridor (from the hallway side).
3. The janitor walks to the cart at world-x `~840`.
4. He pauses. Mutters in Norwegian (line in `dialogue.md`).
5. He looks *right past* Pip if Pip is in his line of sight. No registration.
6. He takes the cart handles and pushes it back toward the left, exiting the dark corridor.
7. Pip stands. The cart is gone. The stairwell down to the kitchen is clear.
8. Final dialogue (italic, Pip's thought):
   > *No one can see me.*
   > *(can they?)*

**Exit condition:** The cart is moved. Player walks to the stairwell descent (world-x `~880`) and presses `↑` or walks into it to trigger Beat 9.

**State changes:**
- `chapterState.sconceFixed: false → true`
- `chapterState.floatUnlocked: false → true`
- `chapterState.cartFound: false → true`
- `chapterState.janitorPaged: false → true`
- `chapterState.janitorWalked: false → true`

**Files involved:**
- `game/index.html` — dark corridor room, broken-sconce interactable, float ability mechanic, janitor NPC scripted walk, radio paging dialogue.
- This beat is the largest single mechanical bundle in the chapter. The Henrik kitchen build sprint should treat the dark corridor as a separate scope from the kitchen itself.

---

## Beat 9: The kitchen (Pip arrives, sees food)

**Mode:** Cinematic 4 (kitchen meeting)

**Status:** **Not yet shipped.**

**Trigger:** Pip enters the kitchen via the stairwell descent. The cinematic plays on arrival.

**Player inputs allowed during cinematic:**
- **Space** to advance lines.
- No movement during the cinematic.

**What happens:**

1. Pip drifts down the stairwell into the kitchen. Camera fades in on the vast dim kitchen.
2. The pendant light over the counter is on. A plate of lefse-and-gravlaks sits on the counter, lit warmly. The plate has a breadcrumb-elevated aura.
3. Pip is pulled toward the food — scripted drift, not player-controlled.
4. Pip floats above the counter. A bite is taken. The food hovers in mid-air.
5. Behind him, a sound: a pan dropped. A man's voice.
6. Henrik in the freezer doorway, frozen. Mouth open in silent scream.
7. Dialogue (over the cinematic):
   > *Pip cannot remember the last time he ate. Maybe he never has, now. Maybe this is the first time.*
   > *He takes a bite.*
   > *The food hovers in the air.*
   > *Behind him, a sound. A pan dropped. A man's voice.*
   > HENRIK: *AAAAAAAAA—*

**Exit condition:** Henrik's scream cuts off mid-yell. The cinematic transitions to Beat 10 immediately (no gap, no player input between them).

**State changes:**
- `cinematic.played.add('kitchen-meeting')`

**Files involved:**
- `game/index.html` — kitchen room, `CINEMATIC_SCRIPTS.kitchen-meeting`, plate prop, Henrik sprite, dropped-pan prop.

---

## Beat 10: Henrik sits down (the mentor reveal)

**Mode:** Cinematic 5 (Henrik sits down)

**Status:** **Not yet shipped.** Directly follows Beat 9 with no gap.

**Player inputs allowed during cinematic:**
- **Space** to advance lines.
- No movement.

**What happens:**

1. Henrik freezes mid-scream. Stares. Slowly crosses himself. Whispers in Norwegian.
2. Henrik crosses to the stool (world-x `~400`) and sits. The cinematic camera follows him to the stool.
3. Dialogue:
   > HENRIK: *…Så. Du er gutten fra hytte 646.*
   > HENRIK: *So. You are the boy from cabin 646.*
   > PIP: *…you can see me?*
   > HENRIK: *Yes. Don't ask why. Not today.*
   > *Henrik looks at the food, still hovering.*
   > HENRIK: *Your grandmother. She told me, last night, in the dining room. She said you would have loved this. That you collected meals like other boys collect stamps.*
   > HENRIK: *Lefse. Gravlaks. The pickles too — don't skip the pickles.*
   > HENRIK: *Eat. Tell me if it's as good as she promised.*
   > *He slides the plate toward Pip.*
   > PIP: *…how can you see me, when no one else can?*
   > *Henrik does not answer immediately. He looks at the food. He looks at Pip.*
   > HENRIK: *Some questions wait. Eat first.*

**Exit condition:** Final line dismisses. Transitions directly to Beat 11.

**State changes:**
- `cinematic.played.add('henrik-sits-down')`

**Files involved:**
- `game/index.html` — `CINEMATIC_SCRIPTS.henrik-sits-down`, Henrik sprite animation (sit-down).

---

## Beat 11: The first taste (Cinematic 6 — Erik memory)

**Mode:** Cinematic 6 (first taste)

**Status:** **Not yet shipped.** Per P1 Session 1 decision: **single memory, single cinematic.** The 6a grandfather-with-salmon memory is dropped from Ch1 and reserved for Ch4's gravlaks-recipe reveal.

**Player inputs allowed during cinematic:**
- **Space** to advance lines.
- No movement.

**What happens:**

1. Pip takes a bite of the dish (the bite happens off-frame).
2. The kitchen shimmers. Memory cinematic plays.
3. **Memory content:** An older Henrik — recognizably grown — teaching a young boy (Erik) to make the same lefse-and-gravlaks. A different kitchen than the present (Henrik's home before the accident). The child's face is partially visible — turned away, in profile, or in half-shadow. Per the critical art note: the player should *feel* they have seen this child before when they reach Chapter 4, but not be able to say where on first pass.
4. The child laughs at something off-screen.
5. Dialogue over the memory:
   > *And Pip understands, for the first time, that food carries the story of the person who made it.*
   > *That every meal is a love letter from someone, to someone.*
   > *That if he can taste enough of them — really taste — he might learn the world.*
6. Memory fades. Pip is back in the kitchen.
7. Dialogue (room-mode style, Henrik on the stool):
   > PIP: *I saw… I saw someone. Teaching a boy. Was that you?*
   > *A pause. Henrik looks at the empty plate.*
   > HENRIK: *…yes.*
   > PIP: *Who was the boy?*
   > HENRIK: *Someone I loved.*
   > *Pip waits. Henrik does not say more.*
   > PIP: *…how does it work, Henrik? When I taste?*
   > HENRIK: *Because you needed to. The dead see what they need to see.*
   > PIP: *Will it always do that?*
   > HENRIK: *I think, perhaps, yes. I think that is what you are now.*
8. **Fifth ability earned: taste-memory.**
9. The notebook gains its first Recipes entry: *Norwegian lefse and gravlaks (with Norwegian pickles).*
10. Website pop-up notification: *"You've earned a recipe! Check Pip's Notebook."*

**Note for Ch4 reveal:** When the player reaches Ch4 and recognizes Erik, the Ch1 lefse-and-gravlaks dish is what allows the recognition. Pip having tasted Erik's-favorite-meal in his first meeting with Henrik is the chapter's secret weight.

**Exit condition:** Final Henrik line dismisses. Transitions to Beat 11b (Bamsemums).

**State changes:**
- `cinematic.played.add('first-taste')`
- `chapterState.tasteMemoryUnlocked: false → true`
- Notebook gains Recipes entry.
- Recipe website unlocks lefse-and-gravlaks page.

**Files involved:**
- `game/index.html` — `CINEMATIC_SCRIPTS.first-taste`, memory rendering function, recipe-grant logic, website-notification trigger.

---

## Beat 11b: The Bamsemums (collect verb tutorial)

**Mode:** Room (kitchen)

**Status:** **Shipped (Sprint 13.)**

**Trigger:** After Beat 11 completes, player has room-mode control in the kitchen. Player walks Pip toward the Bamsemums bag on the counter (world-x `~520`, behind a wooden cutting board).

**Player inputs allowed:**
- Standard room-mode controls.
- At the Bamsemums: **↓** to collect.

**What happens:**

1. Henrik finishes cleaning up. Pip drifts around the kitchen.
2. Pip approaches the Bamsemums bag. Warm humming collect-aura visible.
3. On proximity, dialogue auto-triggers:
   > *A small bag of Bamsemums, foam-and-chocolate bears, sits on the counter. Henrik didn't say they were for him. They are.*
   > *He could pocket this. ↓ to collect. He'll find it later in his notebook.*
4. Player presses `↓`. The Bamsemums tween into the notebook icon in the HUD corner. Notebook icon pulses warm.
5. Stomach refills by ~10 points.
6. Notebook gains its first Items entry: *"Bamsemums — from Henrik, in the kitchen."*

**Exit condition:** Bamsemums collected. `chapterState.bamsemumsCollected = true`. Player has room-mode control.

**State changes:**
- `chapterState.bamsemumsCollected: false → true`
- Collect verb is now part of the player's repertoire — `↓` near any warm-humming aura collects the item.
- Bamsemums sprite removed from the kitchen scene.

**Files involved:**
- `game/index.html` — `kitchenObjects` with Bamsemums entry, collect-verb mechanic, stomach-refill logic, notebook Items section.
- Sprint 13 is the canonical reference.

---

## Beat 11c: The Nøkken story

**Mode:** Room (kitchen, Henrik on the stool)

**Status:** **Not yet shipped.** Story text needs writing in `dialogue.md`.

**Trigger:** After Beat 11b completes (Bamsemums collected), player walks Pip near Henrik on the stool. Henrik is inspectable; `↑` triggers the Nøkken story dialogue.

**Player inputs allowed:**
- Standard room-mode controls.
- At Henrik: **↑** to inspect.
- During the story dialogue: **Space** to advance lines.

**What happens:**

1. Pip approaches Henrik. Inspect:
   > HENRIK: *You'll be going on, soon. The ship docks again tonight.*
2. Henrik tells the Nøkken story. (Full text in `dialogue.md`.) The kitchen lighting may dim slightly during the telling — a subtle "the room listens with you" register.
3. The story is folk-tale in tone but Henrik tells it like someone who believes it. The violin is mentioned. The drowning is mentioned. The Nøkken's appearance is *described* in the story, not visualized.
4. After the story, Henrik names the next port:
   > HENRIK: *Next port is Tallinn. There's a chef I want you to meet. Her name is Leida. She bakes meatballs.*
5. The notebook may gain a small "Nøkken story" entry under a future Stories section. (TBD — settle in `puzzles.md` whether the notebook has a Stories section in Ch1.)

**Note for Ch4 setup:** Henrik tells the story as a folk tale; the player should sense he believes it. The full Ch4 reveal — Henrik's wife and son drowned, a violin played as he could not reach them — is *not* told in Ch1. The story is the seed. The chapter foreshadows but does not pay off.

**Exit condition:** Story dialogue dismisses. Henrik may be re-inspected for repeating the final line about Tallinn, but the Nøkken story plays once.

**State changes:**
- `chapterState.nokkenStoryHeard: false → true`
- Next-port hint planted: Tallinn / Leida / meatballs.

**Files involved:**
- `game/index.html` — Henrik as an inspectable NPC in `kitchenObjects`, Nøkken story dialogue node.
- Dialogue text lives in `dialogue.md`, to be drafted in Session 3.

---

## Beat 12: The dock farewell + Nøkken glimpse

**Mode:** Cinematic 7 (dock farewell) → scripted Nøkken glimpse

**Status:** **Not yet shipped.**

**Trigger:** After Beat 11c, Pip drifts/walks toward the observation deck. The cinematic plays when Pip enters the deck space (or a transition fade triggers it before deck entry — TBD in puzzles.md).

**Player inputs allowed:**
- During the dock farewell cinematic: **Space** to advance lines.
- During the Nøkken glimpse: **none** for ~3 seconds. Brief player-input lockout while the glimpse plays.

**What happens:**

### Dock farewell (Cinematic 7)

1. Wide shot from the ship's deck. Below, the dock at Bergen. Pip's grandparents walk away with a small wooden box (the coffin).
2. Babcia stops. She looks up toward the ship.
3. She almost catches Pip's eye — for one held beat, the player should feel that she might see him. She does not.
4. Babcia turns and continues walking. Dziadek does not turn.
5. Pip stands at the railing, translucent, waving with one small hand.
6. Dialogue:
   > *Babcia stops. She turns. She looks up toward the ship.*
   > *Babcia is going to leave him. Pip knows this.*
   > *He waves. He does not know if it is for her or for himself.*

### Nøkken glimpse (scripted, plays automatically after farewell)

1. The farewell cinematic fades to room-mode briefly. Pip is on the deck. Player input is *not* yet returned.
2. The camera or scene focuses on the harbor water below.
3. A shape rises slightly in the water — visible at the surface. Dark rooted form with two glowing amber eyes peering up. Mostly submerged. Faint ring of disturbed water around it. Per the visual research: image-1 register (rooted dark water-shape, *not* the full humanoid Nøkken form).
4. The glimpse lasts ~3 seconds.
5. The shape submerges. Ring of water settles. Gone.
6. Italic narration (Pip's thought, no spoken line):
   > *Pip thinks of Henrik's story. He does not say its name.*
7. Player control returns.

**Note for later:** Henrik may have noticed the Nøkken too — *unspoken, not defined here.* Flag for later development (possibly Ch4 reveal).

**Exit condition:** Nøkken glimpse completes. Pip has room-mode control on the deck. `chapterState.nokkenGlimpsed = true`. `chapterState.grandparentsLeft = true`.

**State changes:**
- `cinematic.played.add('dock-farewell')`
- `chapterState.nokkenGlimpsed: false → true`
- `chapterState.grandparentsLeft: false → true`

**Files involved:**
- `game/index.html` — `CINEMATIC_SCRIPTS.dock-farewell`, observation deck room, scripted Nøkken glimpse system, water-surface shape rendering.
- This is the chapter's first actual monster sighting. Plants Ch4's load.

---

## Beat 13: Henrik's offer (notebook handoff)

**Mode:** Cinematic 8 (Henrik's offer)

**Status:** **Not yet shipped.**

**Trigger:** After Beat 12, Pip has room-mode control on the deck. Henrik appears on the deck (he came up from the kitchen after Pip left). Pip approaches Henrik; `↑` triggers Cinematic 8.

**Player inputs allowed:**
- Standard room-mode controls until Pip approaches Henrik.
- During the cinematic: **Space** to advance lines.

**What happens:**

1. Two-shot: Henrik and Pip on the deck at sunset. The next port is implied — distant lights on the horizon. Warm orange-pink light fills the frame.
2. Henrik offers Pip an empty leather-bound notebook. Pages are blank.
3. Dialogue:
   > HENRIK: *This was meant for you. Or someone like you.*
   > HENRIK: *Fill it. Eat what you can. Listen to what you taste.*
   > HENRIK: *And come back, if you can. I'll be in the kitchen.*
4. Pip accepts the notebook. The notebook becomes Pip's tool.
5. Final narration:
   > *And so the mission begins.*

**Exit condition:** Final line dismisses. The chapter ends. The next chapter (Ch2) begins.

**State changes:**
- `cinematic.played.add('henriks-offer')`
- `chapterState.notebookReceived: false → true`
- `chapterState.chapter1Complete: false → true`

**Files involved:**
- `game/index.html` — `CINEMATIC_SCRIPTS.henriks-offer`, deck scene, notebook prop, chapter-transition logic.

---

## Beat sequence summary (player-input register)

For Claude Code reference: the chapter's input register, beat by beat:

| Beat | Player inputs |
|---|---|
| 1 | None during materialization; Space after |
| 2 | Full room-mode |
| 3 | Full room-mode (Passenger walks around Pip) |
| 4 | Dialogue choices (Listen / Not now); return visits: silent phase-through |
| 5 | Cinematic advance only (Space) |
| 6 | Cinematic advance; then room-mode |
| 6-cont | None during traversal + cinematic; room-mode in Cabin 646 after |
| 7 | Room-mode + dialogue advance |
| 8 | Room-mode + held-button puzzle + scripted-walk room-mode |
| 9 | Cinematic advance only |
| 10 | Cinematic advance only |
| 11 | Cinematic advance only |
| 11b | Room-mode + `↓` collect |
| 11c | Room-mode + dialogue advance |
| 12 | Cinematic advance + ~3s input lockout for Nøkken glimpse |
| 13 | Room-mode + cinematic advance |

The chapter's input rhythm: exploration / cinematic / exploration / cinematic. The player is never trapped in cinematic mode for more than ~2–3 minutes at a time. The kitchen sequence (Beats 9–11) is the longest cinematic stretch — ~3–5 minutes of stitched cinematics with no exploration between.

---

## Open questions (deferred to later sessions)

These are real choices that affect implementation but don't need locking in `beats.md`:

1. **Beat 7 — paging mechanism.** Does Pip return to the grandparents' radio to page Henriksen, or is there a separate intercom in the dark corridor? My read: same radio (one object, two functions). **Settle in `puzzles.md`.**
2. **Beat 8 — electricity puzzle interaction model.** Held-button vs. rapid-press. My read: held-↑ for ~1.5s at the broken sconce. **Settle in `puzzles.md`.**
3. **Beat 11c — notebook Stories section.** Does the notebook gain a Stories section in Ch1 to record the Nøkken story? My read: no — keep the notebook to Recipes and Items in Ch1. Stories can become a section in a later chapter if needed. **Settle in `puzzles.md`.**
4. **Beat 12 — deck arrival mechanism.** Does Pip walk to the deck from the kitchen via a stairway, or does the game fade-transition him? My read: fade-transition (the kitchen's "and then you find yourself on the deck" dreamy register from `rooms.md`). **Settle in `puzzles.md`.**
5. **Beat 13 — Henrik's transition to deck.** Henrik must arrive on the deck for Cinematic 8. Does he walk there on-screen, or is he just there when Pip arrives? My read: he's there when Pip arrives (no on-screen walk). **Settle in `puzzles.md`.**

