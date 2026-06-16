# Ch6 Build Audit — Indonesia / Kolonodale, Central Sulawesi
**Sprint:** GOAL-1 | **Audited:** 2026-06-16 | **Auditor:** Claude Code

## Result: PASS — structurally complete

All Ch6 outline beats have implementations. One expected gap: Ch6→Ch7 transition.
Memory-gifting puzzle is choice-based first draft; infection mechanic is narrative.

---

## Rooms

| Room | Width | Status |
|------|-------|--------|
| ch6LowerDeck | 700 | built / reachable |
| ch6BananaGrove | 500 | built / reachable |
| ch6Kolonodale | 650 | built / reachable |
| ch6Warung | 540 | built / reachable |
| (kitchen — Henrik Erik-photo scene) | — | reachable via returningFromTirta flag |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Pocong | `drawPocong(sx, groundY, now, knotsLeft)` | built / needs-visual-confirmation |
| Tirta | `drawTirta(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Echo tarsiers | `drawEchoTarsier(sx, sy, now, idx)` | built / needs-visual-confirmation |
| Iris's family / Tirta's family | cinematics only | built |

---

## Abilities used

| Ability | Beat | Status |
|---------|------|--------|
| float | Beat 1: tarsier traversal (visual reference) | built / visual |
| memory-gifting | Beats 2 (Pocong puzzle × 3) + 3 (self-soothe) + 8 (walk back): `runPocongKnot()` choice system | built / reachable |
| taste-memory | Beat 7: lemper → `lemper-family-courtyard` cinematic | built / reachable |
| walk-through-walls | implicit in ch6BananaGrove → ch6Kolonodale (dockside phase-through) | narrative |

---

## Treats / Collectibles

| Item | Function | Status |
|------|----------|--------|
| Tirta's lemper ayam (recipe) | `addLemperRecipe()` after cooking step 3 | built / reachable |
| Banana leaves bundle | `ch6State.bananaBundleHeld = true` from Pocong; given to Henrik at end | built / reachable |
| Switchblade | used to cut knots; remains in inventory | used / referenced in narrative |

---

## Beat Sequence

| Beat | Implementation | Status |
|------|----------------|--------|
| Ch6 opening / tarsier traversal | `startChapter6()` → narration + drawEchoTarsier | built / reachable |
| Banana grove arrival (no dialogue) | ch6BananaGrove room with tree/grave atmosphere | built / visual |
| Pocong meeting (bound, hops in panic) | `triggerPocongMeeting()` at pip.x > 150 | built / reachable |
| Pätu does not hiss (Pocong is not bad) | embedded in dialogue | built / in dialogue |
| Switchblade drawn | embedded in dialogue (Iris's father's, from Ch5) | built / in dialogue |
| Knot 1: child being taught | `runPocongKnot(1)` → gravlaks-Henrik choice | built / reachable |
| Knot 2: welcome of a stranger | `runPocongKnot(2)` → lunchbox-taste choice | built / reachable |
| Knot 3: parents at the fire | `runPocongKnot(3)` → potjie-parents choice | built / reachable |
| Wrong answer → sad song + hint | re-prompt with wrong-answer hint text | built / reachable |
| Pocong freed / banana leaves | `triggerPocongFreed()` | built / reachable |
| Infection (dark fragments) | `triggerInfection()` — edge-darkening described in narration | built / reachable |
| Pätu hisses at the moment | embedded in infection dialogue | built / in dialogue |
| Pocong apologizes + walks away | embedded in infection dialogue | built / in dialogue |
| Self-soothe with warm memory | `triggerInfectionSoothe()` → 2 choices (potjie or iris-dining-room) | built / reachable |
| Walk to Tirta / flashback flickers | narrative in soothe-result + move to ch6Kolonodale | built / reachable |
| Tirta meeting / banana-leaf trade | `triggerTirtaMeeting()` at pip.x > 80 in ch6Warung | built / reachable |
| "Cat with brussels sprouts" energy | Tirta's character voice in dialogue | built / in dialogue |
| Lemper cooking (3 steps) | `startCh6Cooking()` → step 1/2/3 choice system | built / reachable |
| "Ghost natural" line | embedded in step 3 right answer | built / in dialogue |
| Taste-memory / family courtyard | `showCinematic('lemper-family-courtyard')` | built / reachable |
| "Someone else's child is also a child" | in cinematic script + Tirta after-taste dialogue | built |
| Tirta farewell / leftover leaves | `triggerTirtaFarewell()` | built / reachable |
| Walk back / flashback pushed away | embedded in farewell dialogue | built / in dialogue |
| Erik photograph — first image | `triggerErikPhotoBeat()` in kitchen when returningFromTirta | built / reachable |
| Boy of 11, blond, wooden spoon, laughing | description in Erik photograph dialogue | built / in dialogue |
| Pip does not ask (learned from Ch4) | embedded in dialogue | built / in dialogue |
| Henrietta-banana thread | `triggerHenriettaBananaBeat()` — banana in fish stews | built / reachable |
| "We had a—" interrupted again | kitchen radio interruption | built / in dialogue |
| Henrik: "Another day. Tell me about your port." | embedded in henrietta-banana dialogue | built / in dialogue |
| Banana leaves given to Henrik | embedded in henrik-leaves dialogue | built / reachable |

---

## Cinematics

| Name | Draw function | Notes | Status |
|------|---------------|-------|--------|
| lemper-family-courtyard | `drawLemperFamilyCourtyardCinematic(now)` | isMemory=true; lamp-lit courtyard, family wrapping lemper for orphanage | built / needs-visual-confirmation |

---

## Autonomous Design Calls (logged for #79)

| # | Decision | Reason |
|---|----------|--------|
| 1 | Pocong puzzle as 3-round choice system (not full journal-traversal UI) | GOAL-1 structural completeness; journal-traversal UI requires new rendering system; choices expose the keyed-memory riddles fully |
| 2 | Infection mechanic: narrative description (edge-darkening described, not rendered separately) | First-draft; actual edge-darkening shader would require post-processing; visual-confirmation queue |
| 3 | Self-soothe mechanic: single dialogue choice (2 options) vs. full journal-select | Same as above; the verb is taught through narrative |
| 4 | ch6Kolonodale left-edge return gated on `returningFromTirta` | Prevents Pip returning to ship before cooking + farewell beats |

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| 1 | Ch6→Ch7 transition: `showChapter6End()` calls `triggerDeckStub()` | EXPECTED | Wire when Ch7 is built |
| 2 | Journal dark-section (infection memories): UI not implemented; no visual distinction | DESIGN-CALL | Build journal UI polish sprint |
| 3 | Infection edge-darkening: not rendered; only described in narration | ACCEPTABLE | Post-processing effect; polish sprint |
| 4 | Tarsier strength-drain mechanic: not implemented (tarsiers are visual only) | ACCEPTABLE | First draft; visual atmosphere sufficient |
| 5 | Pocong "sad song" sound: no sound asset exists yet | AUDIO | Audio sprint |
| 6 | Pocong, Tirta, echo-tarsiers not yet in character-gallery.html | DESIGN-DOC | Gallery sprint |
| 7 | Erik photograph: no visual render — described in dialogue only | MINOR | Could add a simple portrait render in kitchen room |

---

## Visual Confirmation Queue (add to GitHub #78)

- [ ] ch6LowerDeck: humid corridor, brass pipes with condensation, tarsiers on ceiling, flickering light
- [ ] ch6BananaGrove: banana trees with broad leaves, old graves, dusk sky peek, Pocong in clearing
- [ ] ch6Kolonodale: wooden stilt houses, coconut palms, warm-lit windows, evening smoke
- [ ] ch6Warung: thatched roof, charcoal grill, prep counter, rice bowl + chicken bowl, banana leaves
- [ ] drawPocong: tall white shroud, closed eyes, multiple knot-cords at feet, hopping animation
- [ ] drawTirta: ponytail, chili-streaked apron, dish towel, energetic posture
- [ ] drawEchoTarsier: tiny body, enormous glowing eyes, sequential blink, clinging to ceiling
- [ ] lemper-family-courtyard cinematic: hanging lamps, long banana-leaf table, 8 people wrapping, small girl cousin
- [ ] Infection darkening: visual effect (post-processing or edge overlay)

---

## Syntax

JS extracted after Ch6 build: **clean** (`node --check` pass, 695,679 chars)
