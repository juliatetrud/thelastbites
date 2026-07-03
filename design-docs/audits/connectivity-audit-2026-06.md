# Connectivity Audit — Scene Transition Map (Sprint CP-1)

**Date:** 2026-06 · **Scope:** `game/index.html` at working-tree HEAD `200308e` (unpushed backlog on top of `origin/main` `981c6d9`).
**Type:** READ-ONLY diagnosis. No game logic was changed. All line numbers refer to `game/index.html` as of `200308e`.

## Method

- Scene inventory taken from the `rooms` registry (`const rooms = {…}` at `:2561`, Ch1 rooms; `rooms.ch2…`–`rooms.ch8…` registered at `:15116`+), the `warp()` debug targets, and `design-docs/ch01-canonical-beat-order.md`.
- Every transition is a `startTransition(toRoom, entryEdge, entryX)` call (`:6969`). Transitions fire either from the **room-edge trigger chain** (one big `if/else-if` on `currentRoom` + `pip.x`, Ch1 at `:3561`–`:3591`, Ch2–4 at `:3594`–`:3666`, Ch5–8 at `:3839`–`:4041`), from **object interactions** (`obj.node` → `onEnd`), or from **cinematic/beat `onEnd`** callbacks.
- A transition is "wired" only if (a) the `startTransition` exists, (b) its trigger condition is satisfiable in normal play, and (c) `rooms[toRoom]` is a registered room.

---

## Chapter 1 — in depth

### Scene inventory (7 states; 6 registered rooms + the cold-open overlay)

| # | Scene id | Notes |
|---|----------|-------|
| 0 | *cold-open* | Not a separate room — the Bergen departure cinematic + hallway pixel-materialize played over `hallway` on first entry. `warp(1)` target. |
| 1 | `hallway` | Registered `:2575`. Start room (`let currentRoom = 'hallway'` `:2647`). |
| 2 | `grandparents` | Grandparents' cabin. Registered `:2588`. Holds Dziadek's radio (`gp-radio`, x=200) — the corridor puzzle's paging device. |
| 3 | `cabin` | Cabin 646. Registered `:2562`. `warp()` splits it pre-bed / post-bed by `cabinState.beatStage`. |
| 4 | `darkCorridor` | Registered `:2602`. |
| 5 | `kitchen` | Registered `:2616`. **Reused by Ch4–7** as the recurring Henrik photograph room (see Ch2–8 pass). |
| 6 | `observationDeck` | Registered `:2631`. Ch1 finale + Ch1→Ch2 hand-off. |

### Intended vs. actual wiring

| Scene | Should connect FROM | Should connect TO | Wired? | Trigger (evidence) | Gap? |
|-------|--------------------|--------------------|--------|--------------------|------|
| cold-open | (game boot) | hallway (control) | ✅ | Boot → `currentRoom='hallway'` `:2647`; first gameplay entry plays `startDepartureCinematic` `:3057`; `openingSeq` materialize → `state='complete'` gives control (`:1623`, `:3354`). | — |
| hallway | cold-open; grandparents; cabin(return); darkCorridor(return) | grandparents; cabin(return); darkCorridor | ✅ | → grandparents: door object `hallway-grandparents-door` (x=920), "Try the handle"/"Go in" `:1980` → `startTransition('grandparents','fromLeft')` `:1984`. → cabin (return, post-bed): proximity x≈1180 `:4754` → `startTransition('cabin','fromLeft')` `:4755`. → darkCorridor: edge `pip.x>=1312 && beatStage==='post-bed'` `:3572` → `:3574`. | — |
| grandparents | hallway | cabin (wall-phase); hallway | ✅ | → cabin: edge `pip.x>=pipMaxX-1 && beatStage==='pre-mirror'` `:3565` → `:3571`. → hallway: left edge `pip.x<=PIP_HALF_W+1` `:3562` → `:3564`. | — |
| cabin (646) | grandparents (wall-phase, 1st visit); hallway (return) | hallway | ✅ | Post-bed panic auto-exit `startPanicSequence` → `startTransition('hallway','fromRight',1164)` `:4286`. Manual left-door exit gated `bedRevealed` (G-S4) `:3561`. | — (G-S4 fixed the pre-bed strand) |
| darkCorridor | hallway | kitchen; hallway | ✅ | → kitchen: object `dc-stairwell` (x=880) "Go down" `:2352`, **gated `janitorWalked`**. → hallway: left edge `pip.x<=pipMinX+1` `:3575` → `:3577`. | See PL-2 (soft) |
| kitchen | darkCorridor | observationDeck; darkCorridor | ✅ | Henrik meeting auto-fires at x≈290 (`:3693` → `startKitchenSequence`). → deck: right edge `pip.x>=pipMaxX-1 && nokkenStoryHeard` `:3581` → `:3584`. → darkCorridor: left edge `:3578` → `:3580`. | — |
| observationDeck | kitchen | (Ch1 end → Ch2) | ✅ / ⚠ | Right edge `pip.x>=pipMaxX-1 && !grandparentsLeft && !cinematic.active` `:3585` → `dock-farewell` (Cin 7) → `grandparentsLeft`+`startNokkenGlimpse` `:3588-3590` → `nokkenGlimpsed` `:7087`; then `deck-henrik` object (x=490, gated `nokkenGlimpsed`) `:2506` → `henriks-offer` (Cin 8) → `chapter1Complete`+`showChapter1End()` `:2519-2525`. **No left-edge return to kitchen.** | See PL-3 |

### Chapter 1 punch-list (ordered — blockers first)

**No hard critical-path blocker remains in Chapter 1.** After Sprint G-S4 (hallway→corridor) and the G-S5 signposting commit `16bbb66`, every link on the start→finish path is wired and satisfiable. The remaining items are soft:

- **PL-1 (resolved, verify-only).** hallway→darkCorridor and cabin→hallway were the historical hard blockers; both now gate correctly on `beatStage==='post-bed'` (`:3572`, `:3561`) with the panic auto-exit as the canonical first-visit exit (`:4286`). Listed only so the wiring sprint confirms it in-browser.
- **PL-2 (soft — discoverability, not wiring).** darkCorridor→kitchen (`dc-stairwell` "Go down", `:2352`) is gated on `chapterState.janitorWalked`, which requires the **multi-step backtrack puzzle**: inspect cart (`cartFound`) → leave corridor → page J. Henriksen on Dziadek's radio in the grandparents' cabin (`janitorPaged`, `:2203`) → return → `updateJanitorWalk` clears the cart (`janitorWalked`, `:9719-9720`). The chain is fully wired and now signposted (G-S5), and the backtrack **depends on the hallway→grandparents "Go in" return being available post-bed** (`:1980-1984`) — which it is. Flagged so CP-2/CP-4 know this room's exit is puzzle-gated, not edge-gated.
- **PL-3 (one-way transition — minor).** `observationDeck` has **no left-edge return to `kitchen`** (only the right-edge finale trigger exists, `:3585`). Once on the deck the player cannot walk back. Low impact (the deck is the terminal Ch1 room), but it is the one place the Ch1 map is not bidirectional. Decide in CP-2 whether a return is wanted.

### Chapter 1 continuous foot-path (and where it breaks)

```
boot → [hallway] ──door(x920)──▶ [grandparents] ──wall-phase(pre-mirror)──▶ [cabin 646]
        (mirror → bed reveal → post-bed → panic auto-exit) ──▶ [hallway]
        ──staircase(x≥1312, post-bed)──▶ [dark corridor]
        (sconce→lit ; cart→cartFound ; ▲ backtrack to grandparents' radio→janitorPaged ;
         return→janitorWalked) ──stairwell "Go down"──▶ [kitchen]
        (Henrik meeting ; Nøkken story→nokkenStoryHeard) ──right edge──▶ [observation deck]
        (dock-farewell→Nøkken glimpse ; Henrik's offer) ──▶ Ch1 end → startChapter2()
```

**Break-points today: none hard.** The path is continuous end-to-end. The only non-linear step is the **▲ backtrack** in the dark corridor (corridor → grandparents' cabin → corridor), which is intended (`dark-corridor.md`, "first integrated multi-step puzzle") and now signposted. The single non-bidirectional edge is kitchen→deck (PL-3).

---

## Chapters 2–8 — lighter pass

All Ch2–8 rooms referenced by `startTransition` are registered in `rooms` (`:15116`+), so there are **no undefined-target islands** at the room level. Each chapter is entered by `startChapterN()` setting `currentRoom` to its first room, and each chapter has a call to the next `startChapterN()`. Intra-chapter flag gates were **not** exhaustively traced (per spec).

### Scene inventory & internal connectivity

| Ch | Entry room (set by) | Rooms (registered) | Internal wiring | Island flags |
|----|--------------------|--------------------|-----------------|--------------|
| 2 (Käsmu) | `ch2LowerDeck` (`startChapter2` `:14110`) | ch2LowerDeck `:15116`, ch2Kasmu `:15127`, ch2Cottage `:15138` | LowerDeck↔Kasmu (`:3598`/`:3614`), Kasmu↔Cottage (`:3617`/`:3624`); LowerDeck left edge returns to Ch1 `observationDeck` (`:3594`). | none obvious |
| 3 (Southampton) | `ch3LowerDeck` (`:15219`) | ch3LowerDeck `:16763`, ch3Dockyard `:16774`, ch3BevoisStreet `:16785`, ch3Kitchen `:16796` | LowerDeck→Dockyard (`:3630`), Dockyard↔BevoisStreet (`:3635`/`:3639`), BevoisStreet↔Kitchen (`:3642`/`:3646`). | ch3LowerDeck has **no left-edge return** (chapter entry; expected) |
| 4 (Antakya) | `ch4CatAlley` (`:16844`) | ch4CatAlley `:17920`, ch4FrozenSquare `:17931`, ch4MuhittiKitchen `:17942` | CatAlley↔FrozenSquare (`:3651`/`:3653`), FrozenSquare↔MuhittiKitchen (`:3655`/`:3659`); MuhittiKitchen right edge → **Ch1 `kitchen`** for the photograph beat (`:3662-3666`). | reuses shared `kitchen` |
| 5 (Saldanha) | `ch5LowerDeck` (`:17993`) | ch5LowerDeck `:19313`, ch5StorageRoom `:19324`, ch5Saldanha `:19335`, ch5JohannesPlace `:19346` | chain `:3839`–`:3856` (+interaction `startTransition('ch5Saldanha')` `:18253`); returns to Ch1 `kitchen` (`:3861`). | none obvious |
| 6 (Kolonodale) | `ch6LowerDeck` (`:19393`) | ch6LowerDeck `:20457`, ch6BananaGrove `:20468`, ch6Kolonodale `:20479`, ch6Warung `:20490` | chain `:3897`–`:3911` (+interactions `:19578`,`:19597`); returns to Ch1 `kitchen` (`:3915`). | none obvious |
| 7 (Alter do Chão) | `ch7LowerDeck` (`:20533`) | ch7LowerDeck `:21676`, ch7Dock `:21687`, ch7ForestPath `:21698`, ch7JoanaHouse `:21709` | chain `:3952`–`:3972` (+interaction `:20611`); returns to Ch1 `kitchen` (`:3975`). | none obvious |
| 8 (Greenpoint) | `ch8Street` (`:21762`) | ch8Street `:23406`, ch8ApartmentHall `:23417`, ch8PipKitchen `:23428`, ch8BabciaApartment `:23439` | `ch8Street` hub → ApartmentHall/PipKitchen/BabciaApartment, two-phase gated by `parentsSeen`/`babciaFeltHim` (`:4017`–`:4041`). | none obvious |

### Chapter → chapter hand-offs

| Hand-off | Wired? | Mechanism (evidence) |
|----------|--------|----------------------|
| Ch1 → Ch2 | ✅ | `deck-henrik` → `henriks-offer` (Cin 8) `onEnd` → `showChapter1End()` `:2525` → `startChapter2()` `:7051` → `currentRoom='ch2LowerDeck'`. |
| Ch2 → Ch3 | ✅ | `showChapter2End()` → `startChapter3()` `:14394` → `ch3LowerDeck`. |
| Ch3 → Ch4 | ✅ | `ch3-dedication` `onEnd` → `startChapter4()` `:15726` → `ch4CatAlley`. |
| Ch4 → Ch5 | ✅ | `showChapter4End()` → `startChapter5()` `:17288` → `ch5LowerDeck`. |
| Ch5 → Ch6 | ✅ | `showChapter5End()` → `startChapter6()` `:18472` → `ch6LowerDeck`. |
| Ch6 → Ch7 | ✅ | `showChapter6End()` → `startChapter7()` `:19849` → `ch7LowerDeck`. |
| Ch7 → Ch8 | ✅ | `showChapter7End()` → `startChapter8()` `:20930` → `ch8Street`. |
| Ch8 → end | ✅ | `ch8State.chapter8Complete = true` `:22552` → credits/title card `:22585`. No Ch9 (final chapter). |

**All seven inter-chapter hand-offs have call sites and valid target rooms.** What was NOT verified in this lighter pass: whether each `showChapterNEnd()` is actually *reached* in normal play (each depends on that chapter's internal beat flags — e.g. `panPickedUp`, `sincerityDone`, `shuckDefeated`, `patuThawed`, `babciaFeltHim`). Those intra-chapter gates are the subject of CP-2/CP-3, not this audit.

### Ch2–8 notes for the wiring sprints

- **Shared `kitchen` room.** Ch4, Ch5, Ch6, Ch7 each route their final room's right edge back into the **Ch1 `kitchen`** (`:3666`, `:3861`, `:3915`, `:3975`) for a recurring Henrik photograph beat. This is a deliberate reuse, not a gap, but means `kitchen` renders differently by chapter state — worth confirming the room's draw/objects are chapter-aware.
- **Chapter-boundary one-way edges are expected.** Each chapter's entry room (`chXLowerDeck` / `ch4CatAlley` / `ch8Street`) has no leftward return to the *previous* chapter except Ch2, which intentionally returns to Ch1 `observationDeck` (`:3594`). This is by design (chapters advance forward).
- **Intra-chapter progression is entirely flag-gated** (e.g. `ch2State.panPickedUp`, `ch3State.shuckDefeated`). If any such flag is unsettable, that chapter becomes internally stuck the same way Ch1's corridor did pre-G-S5. Recommend CP-2 run the `warp()`-style state check per chapter.

---

## Summary punch-list (all chapters, blockers first)

1. **(none — hard blockers)** Chapter 1's critical path is continuous after G-S4 + `16bbb66`. No missing/null/target-less transition on the Ch1 foot-path.
2. **PL-3 — kitchen↔deck is one-way** (Ch1). `observationDeck` has no left return to `kitchen` (`:3585` is its only edge). Minor; decide in CP-2.
3. **PL-2 — corridor exit is puzzle-gated, not edge-gated** (Ch1). darkCorridor→kitchen depends on the grandparents'-radio backtrack chain (`:2203`→`:9720`→`:2352`); wired + signposted, but fragile if the grandparents' cabin return (`:1984`) or the radio state chain ever regresses.
4. **Ch2–8 hand-offs exist but reachability unproven.** All `startChapterN()` calls and target rooms are present; whether each `showChapterNEnd()` fires depends on unaudited intra-chapter flags — hand to CP-2/CP-3 for per-chapter state verification.
5. **Shared `kitchen` reuse across Ch4–7.** Confirm the room is chapter-state-aware where reused (`:3666/:3861/:3915/:3975`).

**Bottom line:** the previously-reported Chapter 1 dead-ends are wired closed; Ch1 is now walkable start→finish, with the only structural notes being one one-way edge (PL-3) and the intended corridor backtrack puzzle (PL-2). Ch2–8 have complete room registries and complete chapter hand-off call sites; the open risk is intra-chapter flag reachability, which this read-only audit deliberately did not trace.
