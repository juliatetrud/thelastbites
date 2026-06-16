# Ch5 Build Audit — South Africa / Saldanha Bay
**Sprint:** GOAL-1 | **Audited:** 2026-06-16 | **Auditor:** Claude Code

## Result: PASS — structurally complete

All Ch5 outline beats have implementations. One expected gap: Ch5→Ch6 transition.
Memory-gifting UI is simplified for first draft (dialogue choice rather than journal traversal).

---

## Rooms

| Room | Width | Status |
|------|-------|--------|
| ch5LowerDeck | 900 | built / reachable |
| ch5StorageRoom | 400 | built / reachable |
| ch5Saldanha | 950 | built / reachable |
| ch5JohannesPlace | 550 | built / reachable |
| (kitchen — reused Ch1/Ch4 room for Henrik scene 5) | — | reachable via tasteMemorySeen flag |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Iris | `drawIris(sx, groundY, now, translucent)` | built / needs-visual-confirmation |
| Mamlambo | `drawMamlamboPorthole(now)` | built / needs-visual-confirmation |
| Johannes | `drawJohannes(sx, groundY, now, speaking)` | built / needs-visual-confirmation |
| Echo rats | `drawEchoRat(sx, groundY, now, idx)` | built / needs-visual-confirmation |
| Iris's family | cinematics only (switchblade-memory, iris-dining-room) | built |

---

## Abilities used

| Ability | Beat | Status |
|---------|------|--------|
| float | Beat 1: Pip floats above echo-rats in ch5LowerDeck (visual reference in narration) | built / visual |
| object-memory | Beat 4: switchblade triggers `switchblade-memory` cinematic | built / reachable |
| memory-gifting | Beat 5 (Iris) + Beat 8 (Mamlambo): `pip.abilities.memoryGifting = true` on earn | EARNED in ch5; simplified as dialogue choices |
| walk-through-walls | Beat 9: Pip phases through hull to dock (narrative dialogue, triggers room transition) | built / narrative |
| taste-memory | Beat 11: potjie triggers `potjie-child-fire` cinematic | built / reachable |

---

## Treats / Collectibles

| Item | Function | Status |
|------|----------|--------|
| Iris's father's switchblade | `addSwitchbladeToInventory()` after Beat 5 | built / reachable; cross-chapter (Ch6) |
| Johannes's parents' potjiekos (recipe) | `addPotjieRecipe()` after cooking completes | built / reachable |

---

## Beat Sequence

| Beat | Implementation | Status |
|------|----------------|--------|
| Ch5 opening / lower deck rats | `startChapter5()` → narration + drawEchoRat | built / reachable |
| Iris emerges (squeeze + pop) | `triggerIrisEmerge()` at pip.x > 100 in ch5StorageRoom | built / reachable |
| Iris shakes off water (like a dog) | embedded in dialogue narration | built / in dialogue |
| Pätu head-butts Iris | embedded in dialogue | built / in dialogue |
| Iris explains (The Lethe) | `triggerIrisDialogue()` via onEnd chain | built / reachable |
| Iris translucent (fading while sad) | `drawIris(irisSX, FLOOR_Y, now, 0.50)` when irisDialogueDone | built / reachable |
| Switchblade shown, object-memory | `showCinematic('switchblade-memory')` via choice | built / reachable |
| "I'd forgotten what his voice sounded like" | embedded in post-switchblade dialogue | built / in dialogue |
| Memory-gifting earned + Iris goes home | `triggerMemoryGifting()` → `showCinematic('iris-dining-room')` | built / reachable |
| "Pip. My name is Pip." | embedded in iris-leaves dialogue | built / in dialogue |
| Switchblade handed to Pip | `addSwitchbladeToInventory()` after Iris goes home | built / reachable |
| Iris finishes her meal (sprouts) | `triggerIrisFinishMeal()` → "They're not bad. They're really not." | built / reachable |
| Mamlambo appears | `triggerMamlamboAppear()` after Iris gone | built / reachable |
| Open porthole + throw lantern | choice in `triggerMamlamboPort()` | built / reachable |
| Mamlambo brain-suck | `triggerMamlamboGift()` | built / reachable |
| Send Iris-dining-room memory | choice → `ch5State.mamlamboDefeated = true` | built / reachable |
| Brussels bag floats up | narrative in `triggerMamlamboGift()` onEnd | built / in dialogue |
| Retrieve bag + Saldanha transition | `ch5State.brusselsBagRetrieved`, startTransition | built / reachable |
| Pätu leads to Johannes | narrative in `triggerJohannesFound()` | built / reachable |
| Pätu with bag as messenger | `triggerJohannesFound()` choice + dialogue | built / reachable |
| Johannes cooking (2 steps) | `startJohannesCooking()` → `showCh5CookingStep1/2()` | built / reachable |
| Mother-brussels-sprouts trail-off | embedded in step 1 narrative | built / in dialogue |
| "Brandy is for the soul" | embedded in step 2 correct answer | built / in dialogue |
| Taste-memory / child by fire | `showCinematic('potjie-child-fire')` | built / reachable |
| "Eat well, friend" | embedded in after-taste dialogue | built / in dialogue |
| Johannes farewell / stew for crew | `triggerJohannesFarewell()` | built / reachable |
| Henrik quiet recognition | `triggerHenrikIrisMoment()` — "did she now" | built / reachable |
| Henrik: "Good. That was kind of you." | embedded in henrik-iris dialogue | built / in dialogue |
| Pätu catches fish from cutting board | embedded in henrik-iris dialogue | built / in dialogue |

---

## Cinematics

| Name | Draw function | Notes | Status |
|------|---------------|-------|--------|
| switchblade-memory | `drawSwitchbladeMemoryCinematic(now)` | isMemory=true; Edwardian dining room; father shows switchblade fold | built / needs-visual-confirmation |
| iris-dining-room | `drawIrisDiningRoomCinematic(now)` | isMemory=false (it manifests); Iris walks to table; dining room full | built / needs-visual-confirmation |
| potjie-child-fire | `drawPotjieChildFireCinematic(now)` | isMemory=true; veld clearing, fire, young couple, child Johannes | built / needs-visual-confirmation |

---

## Autonomous Design Calls (logged for #79)

| # | Decision | Reason |
|---|----------|--------|
| 1 | Memory-gifting UI implemented as dialogue choices (not journal-traversal UI with left/right/up) | First-draft structural completeness; spec says "left/right arrows navigate, up arrow selects" — requires new UI system not needed for GOAL-1; the ability is earned and used narratively |
| 2 | Mamlambo puzzle simplified to choice sequence (throw lantern → brain-suck → send memory) | Same reasoning; kinetic version (pick up objects, open porthole) deferred to polish sprint |
| 3 | Johannes cooking reduced to 2 steps (from ~5 ingredient rounds) | Spec lists 5 ingredient groups but each is conversational (not a puzzle); 2 choices cover the key recipe beats |
| 4 | Ch5 Saldanha left-edge back-to-ship transition uses `ch5State.tasteMemorySeen` gate | Pip shouldn't be able to return until the cooking + taste sequence is complete |

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| 1 | Ch5→Ch6 transition: `showChapter5End()` calls `triggerDeckStub()` | EXPECTED | Wire when Ch6 is built |
| 2 | Memory-gifting UI: journal traversal not implemented | DESIGN-CALL | Build journal-traversal UI in polish sprint |
| 3 | Echo-rats drain mechanic not implemented (touch = strength drain) | ACCEPTABLE | Rats are visual; first-draft atmosphere sufficient |
| 4 | Brussels-bag "float and grab" mini-beat not implemented (resolved narratively) | MINOR | Can add if there's time |
| 5 | Iris, Mamlambo, Johannes, echo-rats not yet in character-gallery.html | DESIGN-DOC | Gallery sprint |
| 6 | Ch5 lower deck collision with echo-rats: `pip.abilities` may not have `memoryGifting` key before Ch5 | MINOR | `pip.abilities.memoryGifting = true` set on first earn; applySave restores it |

---

## Visual Confirmation Queue (add to GitHub #78)

- [ ] ch5LowerDeck: dark narrow corridor, low ceiling, crates, echo-rats darting
- [ ] ch5StorageRoom: moonlit storage room, Iris emerging, porthole with Mamlambo
- [ ] ch5Saldanha: red-ochre port at dusk, fire beacon visible at far end, water to left
- [ ] ch5JohannesPlace: warm courtyard, potjie on three legs over fire, herbs hanging, spice shelf
- [ ] drawIris: white pinafore, dark stockings, hair ribbon, teal color signature, translucent when sad
- [ ] drawMamlamboPorthole: porthole frame + iron clasp; serpent body visible; eye at glass
- [ ] drawJohannes: big beard, salt-and-pepper, apron, wooden spoon, sings-while-cooking energy
- [ ] drawEchoRat: tiny translucent amber rat, dart animation
- [ ] switchblade-memory cinematic: Edwardian dining room, father + daughter, all alive
- [ ] iris-dining-room cinematic: brighter full version, Iris walking toward family
- [ ] potjie-child-fire cinematic: veld clearing, black potjie, young couple, small boy

---

## Syntax

JS extracted after Ch5 build: **clean** (`node --check` pass, 649,055 chars)
