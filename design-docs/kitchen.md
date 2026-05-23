# The Kitchen — Room Spec and Open Questions

The kitchen is the chapter's emotional destination. It is where Henrik lives; where Pip's taste-memory ability emerges; where the Nøkken story is told; and where the notebook handoff that begins the game's mission is prepared.

This doc covers the kitchen room's spatial layout, the Beats 9–13 sequence that plays out here (or begins here), and the resolved open questions from the Sprint 26 design session.

---

## Spatial layout

The kitchen is wider than the hallway — a ship's working kitchen, low ceilings, long counters. Warm pendant light over the central work counter. Storage racks on the walls. A freezer door on the far right (where Henrik enters in Beat 9). The room is dim everywhere except the light pool above the counter and Henrik's stool.

| World-x | Object |
|---|---|
| ~120 | Stairwell entry point (descending staircase from dark corridor) |
| ~250 | Long work counter — gravlaks and lefse plate (Beat 9 plate, central prop) |
| ~400 | Henrik's stool (Henrik sits here for Beats 10–11c) |
| ~520 | Bamsemums bag on counter, behind cutting board (Beat 11b) |
| ~700 | Freezer doorway (Henrik enters from here in Beat 9) |
| ~850 | Storage racks (background detail, not interactable) |

Room width: ~960 px (same as cabin interior). Pip enters from x~120 (stairwell drop-in); the kitchen door to the observation deck/ship corridor is at the far right.

---

## Beat flow through the kitchen

**Beats 9–11** are one continuous cinematic stretch with no player room-mode control until Beat 11b.

| Beat | Mode | Entry/exit |
|---|---|---|
| 9 | Cinematic 4 (kitchen meeting) | Stairwell descent → cinematic begins automatically |
| 10 | Cinematic 5 (Henrik sits down) | Chains directly from Beat 9 with no gap or input |
| 11 | Cinematics 6a + 6b (first taste, doubled) | Chains from Beat 10; ends when post-cinematic conversation concludes |
| 11b | Room mode (kitchen) | Player control returns; Bamsemums collect at x~520 |
| 11c | Room mode (kitchen, Henrik inspectable) | Triggered by approaching Henrik; Nøkken story + Tallinn handoff |
| 12 | Cinematic 7 + scripted (dock farewell + Nøkken glimpse) | Pip walks/transitions to observation deck after Beat 11c |
| 13 | Cinematic 8 (notebook handoff) | Henrik arrives on deck; Pip approaches |

---

## Resolved open questions (Sprint 26 Stage 0)

**#1 — Cinematic 6a/6b chaining. How do 6a and 6b connect?**

**Resolved:** One continuous cinematic with an internal crossfade. 6a (gravlaks → Henrik with grandfather) plays first; a crossfade transitions to 6b (lefse → Henrik teaching young Erik). The player does not advance between them — the crossfade is automatic, ~1s. Both together constitute Beat 11 ("the first taste"). The cinematic count for Ch1 is 9, not 8 (6a and 6b are distinct registered cinematics).

**#2 — Nøkken story: text-only or visual?**

**Resolved:** Text-only. The Nøkken is *described* by Henrik in the story, not visualized. The kitchen lighting may dim slightly during the telling — a subtle "the room listens with you" register — but no sprite, no shape, no visual Nøkken appears in Beat 11c. The first visual Nøkken is the glimpse in Beat 12 (the dock water), and it should land with full force.

**#3 — Lefse-vs-gravlaks Ch8 split. Does the doubled cinematic create a conflict with Ch4 and Ch8?**

**Resolved:** No conflict — the doubled structure is the correct one. Ch8 uses the gravlaks memory (grandfather → Henrik → Pip: the inheritance chain, the deepest emotional weight). Ch4's reveal is that Henrik has been feeding Pip *Erik's* favorite meal — the lefse-and-gravlaks combination is Erik's. The doubled cinematic in Ch1 means the player has tasted *both* the grandfather memory (6a) and the Erik memory (6b) in the same first encounter; in Ch4, the recognition is that the lefse specifically was Erik's lesson, not just a dish. The chapter needs both memories to land the Ch4 reveal fully.

**#4 — Kitchen dialogue structure. Auto-advancing or player-advanced?**

**Resolved:** Beats 9, 10, and 11 (through end of 6b and the post-cinematic conversation) are player-advanced via Space. The cinematics are standard cinematic mode — Space to advance each line, no movement. Room-mode begins when Beat 11b (Bamsemums) opens after the post-cinematic conversation ends. The player has no control during the long cinematic stretch (Beats 9–11), consistent with the chapter's established pattern.

**#5 — Henrik exit choreography. When does Henrik leave the kitchen?**

**Flagged for Sprint 27.** The question is whether Henrik walks off-screen at some point during or after Beat 11c, or is simply "gone" when Pip arrives on the observation deck. Options: (A) Henrik stands from his stool and exits via the far door after the Tallinn handoff lines — scripted walk, Pip can watch; (B) the room transitions to the deck and Henrik is simply there when Pip arrives (no on-screen exit). My read: (A) is warmer — the player sees Henrik return to work. But this needs the Henrik-walk animation and door-exit scripted walk. Deferred to Sprint 27.

---

## Open questions (deferred)

These are questions about the kitchen build that are not resolved by Stage 0:

1. **Henrik idle animation during Beat 11c.** Does Henrik visually "do" something while Pip inspects him? My read: he stays on the stool, maybe a slow pipe draw. Settle in build sprint.
2. **Kitchen ambient sound.** Water sounds? Ship hum? Crackling of a stove? No audio assets yet — settle when audio sprint begins.
3. **Deck transition mechanism.** Does Pip walk right off-screen and a transition fires, or is it a triggered fade when Pip reaches far-right? My read: fade-transition (the "and then you find yourself on the deck" dreamy register). Settle in Sprint 27.
4. **Henrik on the deck for Beat 13.** He must get there before Pip does. See #5 (Henrik exit choreography) above — deferred to Sprint 27.

---

## Notes for the build sprint

- The kitchen is the chapter's warmest room: warm amber lighting over the counter, Henrik's pipe smoke, the food. Contrast with the cool dark corridor directly above it.
- The plate of lefse-and-gravlaks is the chapter's central prop. It should have a breadcrumb-elevated warm aura when it first appears (Beat 9) to signal that Pip should engage with it.
- Henrik's stool position (x~400) is the conversational anchor for Beats 10–11c. The stool should be readable as "where the mentor sits" — slightly elevated, comfortable, permanent.
- The Bamsemums bag (x~520) must be reachable in room-mode without requiring float. It is behind a cutting board — the player should be able to approach and collect without needing the float ability (which was just earned in Beat 8 but shouldn't be required here).
