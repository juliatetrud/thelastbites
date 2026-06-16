# Ch2 Build Audit — Estonia / Käsmu
**Sprint:** GOAL-1 | **Audited:** 2026-06-15 | **Auditor:** Claude Code

## Result: PASS — structurally complete

All Ch2 outline elements have implementations. One expected gap: Ch2→Ch3 transition
(deferred until Ch3 is built).

---

## Rooms

| Room | Width | Status |
|------|-------|--------|
| ch2LowerDeck | 900 | built / reachable |
| ch2Kasmu | 1100 | built / reachable |
| ch2Cottage | 500 | built / reachable |

---

## Characters

| Character | Draw function | Status |
|-----------|---------------|--------|
| Pätu | `drawPatu(screenX, groundY, now)` | built / needs-visual-confirmation |
| Haldjas | `drawHaldjas(screenX, groundY, now)` | built / needs-visual-confirmation |
| Leida | `drawLeida(screenX, groundY, now, speaking, facing)` | built / needs-visual-confirmation |

---

## Abilities

| Ability | Beat gate | Status |
|---------|-----------|--------|
| objectMemory | ch2PanObject first touch, `!objectMemoryEarned` | built / reachable |

---

## Treats / Recipe

| Item | Function | Gate | Status |
|------|----------|------|--------|
| Kodused kotletid (recipe) | `addKotletidRecipe()` | called after cooking puzzle completes | built / reachable |

---

## Beat Sequence

| Beat | Function | Gate | Status |
|------|----------|------|--------|
| Ch2 opens | `startChapter2()` | called from `showChapter1End()` | built / reachable |
| Haldjas intro | `triggerHaldjasIntro()` | pip.x 580–680 in ch2LowerDeck, `!haldjasIntroSeen` | built / reachable |
| Pan found / object-memory cinematic | `ch2PanObject.node` getter | pip.x 680–780, `haldjasIntroSeen && !panPickedUp` | built / reachable |
| Gangway dialogue → Kasmu | inline in `update()` | pip.x >= pipMaxX - 10 in ch2LowerDeck, `panPickedUp` | built / reachable |
| Leida meeting | `triggerLeidaMeeting()` | pip.x 200–320 in ch2Cottage, `arrivedCottage && !leidaMet` | built / reachable |
| Cooking puzzle (2 steps) | `startCookingPuzzle()` / `showCookingStep1()` / `showCookingStep2()` | triggered by `triggerLeidaMeeting` onEnd | built / reachable |
| Meal + lunchbox-taste cinematic | `triggerMealAndTasteMemory()` | triggered by `showCookingStep2` correct answer onEnd | built / reachable |
| Promise ceremony | `triggerPromiseSequence()` | triggered after lunchbox-taste onEnd | built / reachable |
| Sincerity puzzle (3 doors) | `presentSincerityPuzzle()` | triggered by `triggerPromiseSequence` onEnd | built / reachable |
| Sincerity resolve | `resolveSincerityPuzzle()` | Door 2 chosen | built / reachable |
| Altar scene / Pätu joins | `triggerAltarScene()` | called from `resolveSincerityPuzzle` onEnd | built / reachable |

---

## Cinematics

| Name | Draw function | Notes | Status |
|------|---------------|-------|--------|
| object-memory-pan | `drawObjectMemoryPanCinematic(now)` | isMemory=true; warm amber; old woman cooking with Pätu watching | built / needs-visual-confirmation |
| lunchbox-taste | `drawLunchboxTasteCinematic(now)` | isMemory=true; winter schoolhouse; young Leida shares lunch | built / needs-visual-confirmation |

---

## Key Beat Flags

All flags declared in `ch2State` and reachable in flow:
`chapter2Active`, `haldjasIntroSeen`, `panFound`, `objectMemoryEarned`, `panPickedUp`,
`arrivedKasmu`, `arrivedCottage`, `leidaMet`, `cookingStep`, `cookingDone`,
`mealEaten`, `tasteMemorySeen`, `promiseMade`, `sincerityDoor1Tried`,
`sincerityDoor3Tried`, `sincerityDone`, `altarSeen`, `patuJoined`, `returnedToShip`,
`chapter2Complete`

`patuState`: `aboard`, `x`, `facing` — saved via `patuAboard` in `buildSaveObject`

---

## Gaps

| # | Gap | Severity | Resolution |
|---|-----|----------|------------|
| 1 | Ch2→Ch3 transition: `showChapter2End()` calls `triggerDeckStub()` | EXPECTED | Wire when Ch3 is built |
| 2 | Haldjas and Leida not yet designed in `character-gallery.html` (marked `designed: false`) | DESIGN-DOC | Design and mark `designed: true` in gallery; art is autonomous call per GOAL-1 rules |

---

## Visual Confirmation Queue (add to GitHub #78)

- [ ] Ch2 Lower Deck: ship corridor art, portholes, candles, pan aura
- [ ] Ch2 Kasmu: coastal village fog, birch trees, altar stone, Leida's cottage door, geraniums
- [ ] Ch2 Cottage: pine interior, stove, table, window + geraniums, dried herbs
- [ ] drawPätu: gray tabby proportions, tail flick animation, yellow eyes
- [ ] drawHaldjas: amber sparkle cluster, drift animation
- [ ] drawLeida: elderly Estonian grandmother, blue headscarf, cream apron
- [ ] Cinematic: object-memory-pan (amber memory warmth, cooking scene)
- [ ] Cinematic: lunchbox-taste (winter schoolhouse, Leida/boy, meatball pass)
- [ ] Sincerity puzzle: three-door overlay visible in ch2Cottage, doors close off after wrong choice
- [ ] Altar scene: Haldjas present at altar stone

---

## Syntax

JS extracted from index.html after Ch2 build: **clean** (`node --check` pass, 490,306 chars)

Fixed pre-existing bug: `kitchen-meeting` CINEMATIC_SCRIPTS key + Ch2 cinematic entries were using
curly-quote (U+2018/U+2019) string delimiters instead of ASCII single quotes. Corrected with
byte-level Python replacement (commit `9004be2`).
