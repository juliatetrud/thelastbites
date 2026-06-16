# GOAL-1 Run State

Last updated: 2026-06-16 (after Ch4 build)

## Status: IN PROGRESS — Ch5 next

## What's built
- Ch1: complete (existing code) — audit PASS (commit `47eab8a`)
- Ch2: Estonia/Käsmu — build + audit PASS (commit `9004be2`, checkpoint `goal-checkpoint-ch2`)
- Ch3: Southampton — build + audit PASS (commit `26b0984`, checkpoint `goal-checkpoint-ch3`)
- Ch4: Istanbul/Türkiye — build + audit PASS (commit `641bd2c`, checkpoint `goal-checkpoint-ch4`)

## GitHub Issues opened
- #78: Visual confirmation backlog (standing checklist)
- #79: Open questions / autonomous design calls
- #80: Ch1 tracking issue (audit pass)
- #81: Ch2 tracking issue
- #82: Ch2 GitHub issue opened (checkpoint pushed)
- #83: Ch3 tracking issue
- #84: Ch4 tracking issue (TBD — to open after push)

## Architecture globals
- `let currentChapter = 1;` (updated in startChapterN)
- `ch2State`, `ch3State`, `ch4State`, `patuState` — all wired to save
- `pip.abilities.objectMemory` added in Ch2
- `ch4WalnutsHeld` standalone bool (Ch4 only)

## Ch5–Ch8: NOT STARTED
Build order:
1. ~~Ch2 (Estonia/Käsmu)~~ DONE
2. ~~Ch3 (Southampton)~~ DONE
3. ~~Ch4 (Istanbul)~~ DONE
4. Ch5 (South Africa): Iris, Mamlambo, Johannes, potjie, memory-gifting earned
5. Ch6 (Indonesia): Pocong, Tirta, lemper, infection, Erik photograph
6. Ch7 (Brazil): Boitatá, Joana/Beatriz, moqueca, Erik kitchen scene
7. Ch8 (Greenpoint): shadow, override phases, reunions, final line

## Next step
Push Ch4 checkpoint, open #84, read ch05 spec, build Ch5.

## Context budget
- Moderate: 4 chapters built across 2 sessions
- Priority: continue builds, minimize reads, syntax-check after each chapter
