# Ch3 Build Audit — Southampton / A Scotsman's Red Curry
**Sprint:** GOAL-1 | **Audited:** 2026-06-15 | **Auditor:** Claude Code

## Result: PASS — structurally complete

All Ch3 outline beats have implementations. Expected gap: Ch3→Ch4 transition.

---

## Rooms

| Room | Width | Status |
|------|-------|--------|
| ch3LowerDeck | 850 | built / reachable |
| ch3Dockyard | 1400 | built / reachable |
| ch3BevoisStreet | 1100 | built / reachable |
| ch3Kitchen | 700 | built / reachable |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Sandy | `drawSandy(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Caitlin | `drawCaitlin(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Robert | `drawRobert(sx, groundY, now)` | built / needs-visual-confirmation |
| Archie | `drawArchie(sx, groundY, now, looking)` | built / needs-visual-confirmation |
| Bibi | `drawBibi(sx, groundY, now)` | built / needs-visual-confirmation |
| Max + Gus | `drawMaxGus(sx, groundY, now)` | built / needs-visual-confirmation |
| Edie | `drawEdie(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Michel + wife | `drawMichelPair(sx, groundY, now)` | built / needs-visual-confirmation |
| Black Shuck | `drawBlackShuck(sx, groundY, now)` | built / needs-visual-confirmation |
| Fish echo | `drawFishEcho(sx, sy, now, idx)` | built / needs-visual-confirmation |
| Echo deer | `drawEchoDeer(sx, groundY, now)` | built / needs-visual-confirmation |

---

## Abilities used

| Ability | Beat | Status |
|---------|------|--------|
| object-memory | optional on Sandy's recipe card (not yet wired as inspectable; flagged) | PARTIAL |
| taste-memory | curry-taste-memory cinematic, `triggerCh3TasteMemory` | built / reachable |
| walk-through-walls | Beat 4 (entering Dundee house) — transition happens automatically at ch3BevoisStreet right edge | built / reachable |
| float | Space bar in Shuck mini-game | built / reachable |

---

## Treats / Collectibles

| Item | Function | Status |
|------|----------|--------|
| Sandy's red curry (recipe) | `addCurryRecipe()` after cooking step 4 | built / reachable |
| Box of matches | `triggerMatchesPickup()` at newsstand world-x 870 in ch3BevoisStreet | built / reachable |

---

## Beat Sequence

| Beat | Implementation | Status |
|------|----------------|--------|
| 1 — Wordless lower deck / fish echoes | ch3LowerDeck draw + opening narration in startChapter3 | built / reachable |
| 2 — Man from sea + Black Shuck | `triggerManFromSea()` at pip.x 320-480 in ch3Dockyard | built / reachable |
| Shuck puzzle | `startShuckPuzzle()` / `updateShuckPuzzle(dt)` / `resolveShuck()` | built / reachable |
| 3 — Edie / wine bottle | `triggerEdie()` at pip.x 700-820 in ch3Dockyard after shuck | built / reachable |
| 4 — Walk up Bevois Street / echo deer | ch3BevoisStreet draw with echo deer | built / reachable |
| 5 — Kitchen arrival / Sandy intro | `triggerSandyIntro()` at pip.x 120-280 in ch3Kitchen | built / reachable |
| 6 — Sandy cooking lesson (4 steps + anecdotes) | `startSandyCooking()` through `showCh3CookingStep4()` | built / reachable |
| Mike anecdote | embedded in step 2 correct answer | built / reachable |
| Jesse anecdote | embedded in step 4 correct answer (trailing off) | built / reachable |
| Michel arrival | `triggerMichelArrival()` after step 4 | built / reachable |
| 7 — Archie almost-sees Sandy (3 moments) | `triggerArchieShiver1/2/3()` | built / reachable |
| 8 — Dinner + taste memory | `triggerDinner()` → `triggerCh3TasteMemory()` → curry-taste-memory cinematic | built / reachable |
| 9 — Sandy farewell + matches | `triggerSandyFarewell()` then ch3BevoisStreet newsstand inspectable | built / reachable |
| 10 — Dedication card + Ch3 end | `showChapter3End()` triggered on return walk (pip.x < 200) | built / reachable |

---

## Cinematics

| Name | Draw function | Notes | Status |
|------|---------------|-------|--------|
| curry-taste-memory | `drawCurryTasteMemoryCinematic(now)` | isMemory=true; Sandy's POV of family dinner | built / needs-visual-confirmation |

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| 1 | Ch3→Ch4 transition: `showChapter3End()` calls `triggerDeckStub()` | EXPECTED | Wire when Ch4 is built |
| 2 | Sandy's recipe card not wired as an inspectable object-memory item | MINOR | Add to ch3KitchenObjects as an inspectable; optional ability use per spec |
| 3 | Sandy, Caitlin, and family characters not yet in character-gallery.html (designed: false) | DESIGN-DOC | Design and port when gallery is updated |
| 4 | ch3BevoisStreet → ch3Kitchen transition requires `edieMet` AND `shuckDefeated` — correct per beat order but blocks if Edie beat triggers only when pip is in range; may need x-range widening if player misses | MINOR | Verify in browser; widen Edie trigger zone if needed |

---

## Visual Confirmation Queue (add to GitHub #78)

- [ ] Ch3 Lower Deck: crimson carpet, sea-blue portholes, fish echoes drifting
- [ ] Ch3 Dockyard: streetlamp amber pool, cranes, moored boat, Edie's wine shop
- [ ] Ch3 Bevois Street: row houses, echo deer, Dundee house warm glow, newsstand
- [ ] Ch3 Kitchen: yellow walls, range, pine table, fridge with child drawing, hoodie on chair
- [ ] drawSandy: brash ghost-translucent, Scottish, brighter than Pip
- [ ] drawCaitlin: blond pixie cut, at range
- [ ] drawRobert: tallest, muscular, brown hair
- [ ] drawArchie: tall skinny; looking shift when archieShiver3 active
- [ ] drawBibi: shortest, long brown hair
- [ ] drawMaxGus: side-by-side pair
- [ ] drawEdie: ghost-translucent, apron, headscarf
- [ ] drawMichelPair: two warm brief figures
- [ ] drawBlackShuck: massive, glowing red eyes
- [ ] drawFishEcho: amber luminous fish drifting through lower deck
- [ ] drawEchoDeer: translucent amber crossing Bevois Street
- [ ] Shuck mini-game: conveyor belt visible, items scroll, throw zone indicated, feed counter
- [ ] curry-taste-memory cinematic: warm yellow POV, family at table, Sandy ghost
- [ ] Dedication card: text appears in showChapter3End flow

---

## Syntax

JS extracted after Ch3 build: **clean** (`node --check` pass, 547,823 chars)
