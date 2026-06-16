# Ch7 Build Audit — Brazil / Alter do Chão, Tapajós
**Sprint:** GOAL-1 | **Audited:** 2026-06-16 | **Auditor:** Claude Code

## Result: PASS — structurally complete

All Ch7 outline beats have implementations. One expected gap: Ch7→Ch8 transition.
Boitatá puzzle is choice-based (3-option bucket aha). Erik relay is the chapter's climax — fully written.

---

## Rooms

| Room | Width | Status |
|------|-------|--------|
| ch7LowerDeck | 550 | built / reachable |
| ch7Dock | 450 | built / reachable |
| ch7ForestPath | 750 | built / reachable |
| ch7JoanaHouse | 600 | built / reachable |
| (kitchen — reused for Erik beat) | — | reachable via tasteMemorySeen flag |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Boitatá | `drawBoitata(camX, now)` | built / needs-visual-confirmation |
| Joana | `drawJoana(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Beatriz | `drawBeatriz(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Erik | `drawErik(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Capuchin | `drawCapuchin(sx, groundY, now)` | built / needs-visual-confirmation |
| Echo mosquitoes | drawn in drawCh7LowerDeck + drawCh7ForestPath | built / visual |

---

## Abilities used

| Ability | Beat | Status |
|---------|------|--------|
| matches | Boitatá puzzle — match struck at dock, triggers encounter | referenced in narrative |
| memory-gifting | Erik beat: Pip asks Erik for his birthday memory, gifts it to Henrik | built / reachable; uses `pip.abilities.memoryGifting` (earned in Ch5) |
| taste-memory | Joana house: moqueca broth → `moqueca-chain` cinematic | built / reachable |
| float | ch7LowerDeck: mosquito traversal (visual reference) | built / visual |

---

## Treats / Collectibles

| Item | Function | Status |
|------|----------|--------|
| Joana and Beatriz's moqueca (recipe) | `addMoquecaRecipe()` after cooking step 2 | built / reachable |

---

## Beat Sequence

| Beat | Implementation | Status |
|------|----------------|--------|
| Ch7 opening / mosquito traversal | `startChapter7()` → narration + drawEchoMosquito-style clouds in LowerDeck | built / reachable |
| Infection flicker (banana-leaf cloth) | embedded in opening narration | built / in dialogue |
| Dock arrival / Boitatá | `triggerBoitataAppear()` at pip.x > 80 in ch7Dock | built / reachable |
| Boitatá puzzle (3 fires, bucket) | `runBoitataPuzzle()` — bucket+river "aha" choice | built / reachable |
| Sneeze = fail → retry | wrong choices → sneeze → re-prompt | built / reachable |
| Boitatá "something dark rides with you" | lines 5–8 of triggerBoitataAppear dialogue | built / in dialogue |
| Forest path traversal | ch7ForestPath room, phosphorescent fungi, capuchin ahead | built / reachable |
| Capuchin meet | `triggerCapuchinMeet()` at pip.x > 120 | built / reachable |
| House arrival: Beatriz & Joana | `triggerJoanaHouseArrival()` at pip.x > 60 in ch7JoanaHouse | built / reachable |
| "Come into the light" / candle | Beatriz greeting in arrival dialogue | built / in dialogue |
| Two-darks diagnosis | Beatriz + Joana dialogue in arrival beat | built / in dialogue |
| Cooking talk: borrowed dark, older dark | `startMoquecaCooking()` → cooking dialogue | built / reachable |
| Cooking step 1 (fish timing) | `showCh7CookingStep1()` — choice | built / reachable |
| Cooking step 2 (dendê oil) | `showCh7CookingStep2()` — choice | built / reachable |
| "Don't overcook something that is already good" | step 1 correct answer text | built / in dialogue |
| "Give. Don't escape. Don't fight. Give." | Beatriz farewell dialogue | built / in dialogue |
| Taste memory / moqueca chain | `triggerMoquecaTaste()` → `showCinematic('moqueca-chain')` | built / reachable |
| Joana farewell | `triggerJoanaDeparture()` → "Go on, smoke-child." | built / reachable |
| Walk back (forest + dock + lower deck) | room transitions gated on `tasteMemorySeen` | built / reachable |
| Erik recognized in Henrik's kitchen | `triggerErikBeat()` in kitchen when tasteMemorySeen | built / reachable |
| Pip + Erik see each other at same instant | triggerErikBeat dialogue | built / in dialogue |
| Henrik cannot see Erik (Pip relays) | triggerErikRelay() — full back-and-forth | built / reachable |
| "Tell him I love him! Tell him I never left!" | Erik line in relay | built / in dialogue |
| Pip asks: "Show me your favorite memory." | triggerErikMemoryGift() | built / reachable |
| Memory-gift to Henrik (birthday) | `showCinematic('erik-birthday-memory')` | built / reachable |
| Henrik sobs quietly | triggerErikGoodbye() narration | built / in dialogue |
| Erik farewell: "I'll see all of us. I promise." | triggerErikGoodbye() | built / in dialogue |
| "Tell me about your day." | triggerChapter7Close() — final line | built / in dialogue |
| Chapter 7 close / Ch8 stub | `showChapter7End()` → `triggerDeckStub()` | built / expected stub |

---

## Cinematics

| Name | Draw function | Notes | Status |
|------|---------------|-------|--------|
| moqueca-chain | `drawMoquecaChainCinematic(now)` | isMemory=true; 6 visions of moqueca across generations, clay pot anchor | built / needs-visual-confirmation |
| erik-birthday-memory | `drawErikBirthdayMemoryCinematic(now)` | isMemory=true; seen through Erik's eyes — father leaning down with birthday gift | built / needs-visual-confirmation |

---

## Autonomous Design Calls (logged for #79)

| # | Decision | Reason |
|---|----------|--------|
| 1 | Boitatá puzzle as choice dialogue (bucket aha) rather than real-time match-timer arcade | GOAL-1 structural completeness; the "aha" (pick up bucket, fill from river) is preserved in the correct choice; sneeze-reset loop functional |
| 2 | Forest path: capuchin guides by walking ahead of Pip (drawn at pip.x+80) | No separate NPC pathfinding needed; visual guidance clear |
| 3 | Erik beat: memory-gifting via `showCinematic('erik-birthday-memory')` | Uses the dialogue-choice memory-gifting earned in Ch5; cinematic approach matches the emotional weight of the scene |
| 4 | Joana house: ch7JoanaHouse is a single room (no sub-rooms); walk-left exits to forest | Spec describes a single kitchen/living space; sub-rooms would add complexity without emotional gain |

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| 1 | Ch7→Ch8 transition: `showChapter7End()` calls `triggerDeckStub()` | EXPECTED | Wire when Ch8 is built |
| 2 | Echo mosquitoes: no collision/drain mechanic (purely visual clouds) | ACCEPTABLE | First draft; visual atmosphere sufficient |
| 3 | Matches as inventory item not tracked visually (no item sprite) | MINOR | Item-system polish sprint |
| 4 | Boitatá puzzle: no real-time timer (match-burn is narrative) | DESIGN-CALL | Kinetic version in polish sprint |
| 5 | Capuchin does not join the crew permanently | ACCEPTABLE | Spec says he guides, doesn't join |
| 6 | Joana, Beatriz, Erik, capuchin not yet in character-gallery.html | DESIGN-DOC | Gallery sprint |
| 7 | drawCh7ForestPath calls `drawPatu()` directly — Pätu should use the shared draw function | CHECK | Verify `drawPatu` is globally defined (it is — Ch1 Ch2 pattern) |

---

## Visual Confirmation Queue

- [ ] ch7LowerDeck: tropical humid corridor, translucent amber mosquito clouds, wood panelling
- [ ] ch7Dock: dark river dock at night, three lit fires (rope/plank/sailcloth), bucket, Boitatá rising
- [ ] ch7ForestPath: dense dark canopy, phosphorescent fungi at bases, capuchin ahead, house light at far end
- [ ] ch7JoanaHouse: hearth corner with clay moqueca pot, warm counter with ingredients, open window with Pätu, candle on table
- [ ] drawBoitata: fire-serpent, impossibly long coil, lantern eyes the size of dinner plates
- [ ] drawJoana: tall, sun-browned, reads forest, open hands
- [ ] drawBeatriz: sixties, gray-streaked hair, apron, warm, candlelit
- [ ] drawErik: 11 years old, blond, blue eyes, gap tooth, alive-looking (opaque), bouncing energy
- [ ] drawCapuchin: small, white-tipped ears, sharp eyes, impatient leader
- [ ] moqueca-chain cinematic: clay pot anchor, 6 ghost-visions of kitchens, orange dendê color signature
- [ ] erik-birthday-memory cinematic: seen from below (child's POV), tall father leaning down, blue wrapped gift

---

## Syntax

JS extracted after Ch7 build: **clean** (`node --check` pass, 749,645 chars)
