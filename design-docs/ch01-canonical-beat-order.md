# Chapter 1 — Canonical Beat Order (LOCKED)

**Status: AUTHORITATIVE. This document supersedes any conflicting beat ordering
anywhere else in the design docs.** Where another doc (`beats.md`, `dialogue.md`,
`04-chapter-01-cabin-646.md`, `dark-corridor.md`, `cabin-646.md`, `hallway.md`,
`grandparents-cabin.md`, etc.) disagrees with the sequence below, that doc is wrong and
must be patched to match this one — not the other way around.

This document exists because the Chapter 1 opening sequence has regressed multiple times
(mirror freeze, non-canonical door numbers, broken wall-phase). The root cause is that the
canonical order has not lived in one locked place. This is now that place.

---

## The locked sequence

This is the exact order of Chapter 1's opening, start to descent. No step may be
reordered, skipped, or auto-fired without an explicit decision logged against THIS doc.

1. **Hallway — materialize + yawn.** Pip materializes pixel-by-pixel in the hallway,
   mid-yawn, unaware. Player gains control after the yawn. (Neutral-plane opening.)

2. **The Passenger walks through Pip.** A formally-dressed passenger walks the corridor
   and passes straight through Pip — the "no one can see me" seed. Pip reacts. This is a
   scripted encounter, not an auto-fired interaction the player must trigger.

3. **Pip sees the treat.** A collectible treat is visible in the hallway with its collect
   aura. Pip can notice/collect it. (Treat identity per `cabin-646.md` / art docs.)

4. **Grandparents' cabin — grief.** Pip enters the grandparents' cabin. Marta (Babcia) is
   weeping on the bed; Jan (Dziadek) stands at the window, back turned. The grandparents'
   cinematic plays. They cannot see Pip.

5. **Wall-phase DISCOVERY at the grandparents' cabin → into Cabin 646.** Pip tries to
   leave the grandparents' cabin and discovers — through use, not a menu — that he passes
   **through the shared wall** into Cabin 646 (his own cabin). This is the moment the
   phase-through ability is unlocked. **This is the ONLY canonical entry into Cabin 646
   on first visit.** The Cabin 646 hallway door (the corridor-side door) is NEVER a "Go
   in" option on first entry — it offers "Listen at the door / Not now" only, forever.

6. **Cabin 646 — mirror melt.** Inside Cabin 646, Pip approaches the mirror. Looking at
   his reflection, his **human face melts away to reveal his ghost form** (Cinematic 2 —
   the mirror melt). The mirror surface shows the ghost reflection permanently afterward.
   **This cinematic must run to completion and return control — it must NOT freeze.**

7. **Cabin 646 — the bed.** After the mirror, Pip notices the bed; something is under the
   sheets. The bed's aura intensifies.

8. **Cabin 646 — lift the sheets / body reveal.** Pip lifts the sheets and sees his own
   small, motionless body. The body is shown in the cinematic only; the room reverts to
   its prior state afterward (the image lives in the player's head, not persistently on
   screen).

9. **Phase back into the hallway.** Spooked, Pip uses the now-discovered phase ability to
   run **through the wall back into the hallway**. (Panic register: faster glide, gentle-
   comic tear spray, per the locked panic-exit decision.)

10. **Hallway — stairs + DOWN sign → descend.** In the hallway Pip sees the **descending
    staircase and a lit "DOWN" sign**. He goes down the stairs — toward the dark corridor
    and, eventually, Henrik in the kitchen.

---

## Room appearance requirements (regression targets)

These have regressed before. They are part of canon and must hold:

- **Cabin 646 renders as a CABIN (a room), not a hallway.** It is Pip's bedroom: bed,
  mirror, porthole, the defined furnishings from `cabin-646.md`. If Cabin 646 is drawing
  with the hallway's appearance, that is a bug. The grandparents' cabin already has a
  defined room appearance; Cabin 646 must likewise read as a distinct, furnished cabin.

- **Cabin 646 has NO second door.** The only door is the hallway entry at world-x 120
  (for return visits only). First visit is always via phasing through the shared wall.
  The former doctor's exit door (farDoorGX = 430) was removed in Sprint G1b. Any second
  door drawn inside Cabin 646 is a bug.

- **Float is TWO-STAGE (locked G1b).** Pip first gains float at the bed-reveal (Beat 8,
  inside Cabin 646). His altitude cap is capped low (~30px) until the wire-shock in the
  dark corridor raises it to the full 75px ceiling. Beat 8 must set both
  `pip.float.unlocked = true` and `chapterState.floatUnlocked = true`. The wire-shock
  must set `chapterState.floatBoosted = true`. These are two separate events; collapsing
  them is a regression.

- **Step 4 (Grandparents' cabin) has NO entry cinematic.** Pip walks in directly and
  sees Marta and Jan in gallery art (no `showCinematic('grandparents')` call). The mirror
  gate (`cinematic.played.has('grandparents')`) must be satisfied by setting
  `cinematic.played.add('grandparents')` directly on room entry.

- **Door numbers are canonical only.** The non-canonical door numbers that keep returning
  must stay stripped. Canonical cabin sequence: 636, 638, 640, 642, 644 (grandparents),
  646 (Pip), ascending left-to-right. No other numbers appear.

- **The grandparents'-cabin shared wall is phase-able** (post-discovery at step 5) and is
  the route into Cabin 646. If Pip cannot exit the grandparents' cabin through the wall,
  that is a bug.

- **The mirror cinematic completes and returns control.** A freeze at the mirror is a bug.

---

## Why this keeps regressing (for the fixer)

Two of these (mirror freeze, door numbers) were fixed once already in commit `069388d`
("Fix mirror freeze (#29) and strip non-canonical door numbers (#30)") and have since
returned. That means a later commit either reverted, overwrote, or re-introduced the old
behavior — possibly via a doc that still carried the wrong order, possibly via a stale
save schema, possibly via a literal revert. The fix is not just to re-patch the symptom;
it is to find what re-introduced it and make the canonical order authoritative so it
cannot drift again. THIS doc is the anchor.
