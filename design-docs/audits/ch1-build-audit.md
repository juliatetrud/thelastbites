# Ch1 Build Audit — Cabin 646
**Sprint:** GOAL-1 | **Audited:** 2026-06-15 | **Auditor:** Claude Code

## Result: PASS — structurally complete

No build gaps found. All outline elements have reachable implementations.
One expected missing item: Ch1→Ch2 transition (deferred until Ch2 is built).

---

## Rooms

| Room | Status |
|------|--------|
| Cabin 646 | built / reachable |
| Hallway | built / reachable |
| Grandparents' cabin | built / reachable |
| Dark corridor / stairwell | built / reachable |
| Kitchen | built / reachable |
| Observation deck | built / reachable |

---

## Abilities (5 + collect verb)

| Ability | Beat gated? | Status |
|---------|-------------|--------|
| Walk through wood | cabin door, `beatStage = 'pre-mirror'` | built / reachable |
| Talk through speakers | radio in grandparents' cabin, `chapterState.radioDiscovered` | built / reachable |
| Flicker electricity | sconce puzzle, `chapterState.sconceFixed` | built / reachable |
| Float | broken-glass moment, `chapterState.floatUnlocked` | built / reachable |
| Taste-memory | Henrik first-taste, `chapterState.firstTasteSeen` | built / reachable |
| ↓ COLLECT verb | taught at Bamsemums, `chapterState.bamsemumsCollected` | built / reachable |

---

## Treats (4)

| Treat | Location | Gate | Status |
|-------|----------|------|--------|
| Smørbukk | Cabin nightstand | requires ↓ (replay-reward) | built / reachable |
| Bamsemums | Kitchen counter | placed by Henrik; tutorial treat | built / reachable |
| Skillingsboller | Dark-corridor janitor's cart | requires ↓ + float | built / reachable |
| Kvikk Lunsj | Observation deck (x=565) | requires ↓; tutorial already learned | built / reachable |

---

## Objects / Props

| Item | Status |
|------|--------|
| Journal / notebook | given at Beat 13, `chapterState.notebookReceived` | built / reachable |
| Candle | given alongside journal at Beat 13 (Sprint 46), pushed to notebook.items | built / reachable |
| Recipe: lefse and gravlaks | `addKitchenRecipe()` called after first-taste | built / reachable |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Pip | `drawPip` | built / needs-visual-confirmation |
| Henrik | `drawHenrikStanding` / `drawHenrikSitting` / `_drawHenrikHead` | built / needs-visual-confirmation |
| Babcia | `drawBabcia` / `drawCinBabcia` | built / needs-visual-confirmation |
| Dziadek | `drawDziadek` / `drawCinDziadek` | built / needs-visual-confirmation |
| Passenger | `drawPassenger` / `drawPassengerBody` | built / needs-visual-confirmation |
| Janitor | `drawJanitor` (walking) / `drawJanitorCart` (cart) | built / needs-visual-confirmation |
| Doctor | `drawDoctor` (cabin-doctor-exit cinematic) | built / needs-visual-confirmation |
| Echo mouse | `updateEchoMouse` / drawn inline in dark-corridor render | built / needs-visual-confirmation |
| Echo spiders | `drawEchoSpiders` | built / needs-visual-confirmation |

---

## Cinematics (9)

| Cinematic | Function | Status |
|-----------|----------|--------|
| mirror-realization | `drawMirrorCinematic` | built / needs-visual-confirmation |
| bed-reveal | `drawBedRevealCinematic` | built / needs-visual-confirmation |
| cabin-doctor-exit | `drawDoctorExitCinematic` | built / needs-visual-confirmation |
| grandparents | `drawGrandparentsCinematic` | built / needs-visual-confirmation |
| kitchen-meeting | `drawKitchenMeetingCinematic` | built / needs-visual-confirmation |
| henrik-sits-down | `drawHenrikSitsDownCinematic` | built / needs-visual-confirmation |
| first-taste (6a gravlaks + 6b lefse/Erik) | `drawFirstTasteCinematic` | built / needs-visual-confirmation |
| dock-farewell | `drawDockFarewellCinematic` | built / needs-visual-confirmation |
| henriks-offer (Beat 13 / Cinematic 8) | `drawHenriksOfferCinematic` | built / needs-visual-confirmation |

---

## Key Beat Flags

All flags present and reachable:
`openingPlayed`, `radioDiscovered`, `cartFound`, `janitorPaged`, `janitorWalked`,
`sconceFixed`, `floatUnlocked`, `henrikMet`, `firstTasteSeen`, `bamsemumsCollected`,
`nokkenStoryHeard`, `nokkenGlimpsed`, `notebookReceived`, `chapter1Complete`,
`grandparentsLeft`, `departurePlayed`, `darkCorridorEntered`

---

## Beat Narrative

| Outline element | Status |
|----------------|--------|
| Tallinn handoff: "The ship docks in Tallinn next" | built — in nokken story dialogue block (line 2321) |
| Nøkken story told after Cinematic 6b | built — `chapterState.nokkenStoryHeard` |
| Henrik gives candle ("the corridors get dark") | built — Sprint 46 |
| Journal offered at sunset over water | built — Cinematic 8 / henriks-offer |
| Northern lights / aurora (observation deck) | built / needs-visual-confirmation |

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|-----------|
| 1 | Ch1→Ch2 transition: `showChapter1End()` calls `triggerDeckStub()` → "End of Chapter 1" overlay, no Ch2 boot | EXPECTED | Wire when Ch2 is built; replace `triggerDeckStub()` call with `startChapter2()` |

---

## Visual Confirmation Queue (add to GitHub #78)

- [ ] Ch1: All room art (cabin, hallway, grandparents, dark corridor, kitchen, observation deck)
- [ ] Ch1: All 9 cinematics look correct
- [ ] Ch1: All characters proportioned correctly (Pip, Henrik, Babcia, Dziadek, Passenger, Janitor, Doctor)
- [ ] Ch1: Echo mouse and echo spiders look correct
- [ ] Ch1: Aurora / observation deck viewport looks correct
- [ ] Ch1: All 4 treat sprites visible and collectible
- [ ] Ch1: Candle prop visible in kitchen (Beat 13 area)
- [ ] Ch1: Nokken glimpse visual looks correct

---

## Syntax

JS extracted from index.html: **clean** (`node --check` pass, 446,333 chars)
