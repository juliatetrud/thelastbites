# Ch4 Build Audit — Istanbul / Türkiye
**Sprint:** GOAL-1 | **Audited:** 2026-06-16 | **Auditor:** Claude Code

## Result: PASS — structurally complete

All Ch4 outline beats have implementations. One expected gap: Ch4→Ch5 transition.
One design-call gap: candle puzzle simplified for first draft.

---

## Rooms

| Room | Width | Status |
|------|-------|--------|
| ch4CatAlley | 750 | built / reachable |
| ch4FrozenSquare | 500 | built / reachable |
| ch4MuhittiKitchen | 700 | built / reachable |
| (kitchen — reused Ch1 room for Henrik beat) | — | reachable via returnedToShip flag |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Karakoncolos | `drawKarakoncolos(sx, groundY, now)` | built / needs-visual-confirmation |
| Frozen Pätu | `drawFrozenPatu(sx, groundY, now)` | built / needs-visual-confirmation |
| Muhittin | `drawMuhittin(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Omer | `drawOmer(sx, groundY, now)` | built / needs-visual-confirmation |
| Brian | `drawBrian(sx, groundY, now)` | built / needs-visual-confirmation |
| Echo cats | `drawEchoCat(sx, groundY, now, idx)` | built / needs-visual-confirmation |
| Henrik (kitchen) | `drawHenrikStanding` (existing Ch1 function) | reused |

---

## Abilities used

| Ability | Beat | Status |
|---------|------|--------|
| matches + candle | Karakoncolos puzzle (Pip lights candle, uses matches from Ch3) | referenced in narrative / needs item-system hookup |
| float | ch4CatAlley: float particles shown, Pip floats over echo cats | visual only; Float ability itself unlocked in Ch2+ |

---

## Treats / Collectibles

| Item | Function | Status |
|------|----------|--------|
| Muhittin's grandmother's muhammara (recipe) | `addMuhamamaraRecipe()` after cooking step 4 | built / reachable |
| Muhammara jar | `ch4State.muhamamaraJarHeld = true` after Omer arrival | built / reachable; given to Henrik in kitchen beat |

---

## Beat Sequence

| Beat | Implementation | Status |
|------|----------------|--------|
| Ch4 opening / cat alley | `startChapter4()` → narration → ch4CatAlley | built / reachable |
| Echo cats traversal | `drawEchoCat` × 7 positions in ch4CatAlley | built / needs-visual-confirmation |
| Frozen square arrival + Karakoncolos | `triggerKarakoncolosAppeared()` at pip.x > 100 in ch4FrozenSquare | built / reachable |
| Candle puzzle (3 rounds) | `runCandlePuzzleRound()` × 3 rounds, each with right/wrong choices | built / reachable |
| Karakoncolos flight + walnuts drop | `resolveKarakoncolos()` | built / reachable |
| Karakoncolos climax line | "I don't remember the words. I don't remember the cold." | built / in dialogue |
| Pätu thaws | `ch4State.patuThawed = true`, `drawFrozenPatu` hidden | built / reachable |
| Muhittin door | `triggerMuhittinDoor()` at pip.x > 80 in ch4MuhittiKitchen | built / reachable |
| Walnut reveal | `triggerWalnutReveal()` via onEnd chain from door dialogue | built / reachable |
| Cooking lesson (4 steps) | `startMuhittiCooking()` → `showCh4CookingStep1/2/3/4()` | built / reachable |
| Mortar line ("was" without a pause) | embedded in step 2 correct answer | built / in dialogue |
| Muhammara taste + orchard memory | `triggerMuhittiTaste()` → `showCinematic('muhammara-orchard')` | built / reachable |
| Omer + Brian arrival | `triggerOmerArrival()` after taste memory | built / reachable |
| Muhittin guesses about Henrik | "Take this for your friend on the boat. The one who feeds you." | built / in dialogue |
| Muhammara jar given | `ch4State.muhamamaraJarHeld = true` | built / reachable |
| Henrik photograph beat | `triggerHenrikPhotographBeat()` in kitchen room when returnedToShip+jar | built / reachable |
| Henrietta named | `triggerHenriettaStory()` — pomegranate molasses, laughed at own jokes | built / reachable |
| "we had a—" interrupted | dinner bell cut, Henrietta story unfinished | built / in dialogue |
| Ch4 end | `showChapter4End()` → `triggerDeckStub()` (stub until Ch5) | built / expected stub |

---

## Cinematics

| Name | Draw function | Notes | Status |
|------|---------------|-------|--------|
| muhammara-orchard | `drawMuhamamaraOrchardCinematic(now)` | isMemory=true; autumn walnut orchard, grandmother + two boys | built / needs-visual-confirmation |

---

## Key Beat Flags

All flags declared in `ch4State`:
`chapter4Active`, `arrivedFrozenSquare`, `karakoncolosAppeared`, `candlePuzzleStarted`,
`candlePuzzleRound` (0-3), `patuThawed`, `arrivedMuhittinKitchen`, `muhittinMet`,
`cookingStep` (0-5), `tasteMemorySeen`, `omerArrived`, `muhamamaraJarHeld`,
`returnedToShip`, `henrikPhotographSeen`, `henriettaTold`, `chapter4Complete`

Standalone: `ch4WalnutsHeld` (bool, tracks walnuts from monster to Muhittin)

---

## Autonomous Design Calls (logged for #79)

| # | Decision | Reason |
|---|----------|--------|
| 1 | Candle puzzle implemented as 3-round dialogue choice rather than real-time 2D movement | First-draft structural completeness; spec describes "real cleverness puzzle" with movement across square — that requires a custom 2D movement loop not yet needed for GOAL-1 |
| 2 | No separate ch4HenrikKitchen room — Henrik photograph beat triggers in existing `kitchen` room via `ch4State.returnedToShip` flag | Spec describes returning to Henrik's kitchen on the ship; reusing the existing room with a chapter-state flag is lighter and prevents room duplication |
| 3 | ch4MuhittiKitchen → kitchen transition gates on `muhamamaraJarHeld` (Pip must have the jar) | Prevents Pip returning before the Omer/Brian beat completes |

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| 1 | Ch4→Ch5 transition: `showChapter4End()` calls `triggerDeckStub()` | EXPECTED | Wire when Ch5 is built |
| 2 | Candle puzzle: simplified choice-based (3 rounds) vs. real-time 2D movement | DESIGN-CALL | Upgrade to kinetic version in polish sprint |
| 3 | Matches + candle item not wired as visible inventory items | MINOR | Needs item-system hookup in polish sprint |
| 4 | Muhittin, Omer, Brian, Karakoncolos not yet in character-gallery.html | DESIGN-DOC | Design in gallery when Ch4 gallery sprint runs |
| 5 | ch4CatAlley: Pip's float behavior is visual-only (draw particles); Float ability is active but alley has no actual elevation-based traversal puzzle | ACCEPTABLE | First draft; visual atmosphere sufficient for structural completeness |

---

## Visual Confirmation Queue (add to GitHub #78)

- [ ] ch4CatAlley: narrow stone alley, amber window beacon at far end, echo cats drifting
- [ ] ch4FrozenSquare: cobblestone square, snow, dying brazier, frozen fountain, snowfall
- [ ] ch4MuhittiKitchen: wood-fired oven, İznik tile accent, roasted peppers on rack, bread rising, spice shelf
- [ ] drawKarakoncolos: tall shadow figure, hollow face, cold breath pulse
- [ ] drawFrozenPatu: ice-encased tabby, frost-glint animation
- [ ] drawEchoCat: translucent amber feline form, gentle pulse
- [ ] drawMuhittin: young Turkish man, curly dark hair, apron
- [ ] drawOmer + drawBrian: arrival pair visible in kitchen after Omer beat
- [ ] muhammara-orchard cinematic: autumn orchard, warm golden glow, grandmother + two boys, walnuts
- [ ] Karakoncolos candle puzzle: 3-round choices visible, wrong/right responses shown

---

## Syntax

JS extracted after Ch4 build: **clean** (`node --check` pass, 591,334 chars)
