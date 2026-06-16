# GOAL-1 Run State

Last updated: 2026-06-15 (after Ch3 build)

## Status: IN PROGRESS — Ch4 next

## What's built
- Ch1: complete (existing code) — audit PASS (commit `47eab8a`)
- Ch2: Estonia/Käsmu — build + audit PASS (commit `9004be2`, checkpoint `goal-checkpoint-ch2`)
- Ch3: Southampton — build + audit PASS (commit `26b0984`, checkpoint `goal-checkpoint-ch3`)

## GitHub Issues opened
- #78: Visual confirmation backlog (standing checklist)
- #79: Open questions / autonomous design calls
- #80: Ch1 tracking issue (audit pass)
- #81: Ch2 tracking issue
- #82: Ch2 GitHub issue opened (checkpoint pushed)
- #83: Ch3 tracking issue (to be opened after push)

## Architecture globals
- `let currentChapter = 1;` (updated in startChapterN)
- `ch2State`, `ch3State`, `patuState` — all wired to save
- `pip.abilities.objectMemory` added in Ch2

## Ch4–Ch8: NOT STARTED
Build order:
1. ~~Ch2 (Estonia/Käsmu)~~ DONE
2. ~~Ch3 (Southampton)~~ DONE
3. Ch4 (Istanbul): Karakoncolos, Muhittin, muhammara, Henrietta thread
4. Ch5 (South Africa): Iris, Mamlambo, Johannes, potjie, memory-gifting earned
5. Ch6 (Indonesia): Pocong, Tirta, lemper, infection, Erik photograph
6. Ch7 (Brazil): Boitatá, Joana/Beatriz, moqueca, Erik kitchen scene
7. Ch8 (Greenpoint): shadow, override phases, reunions, final line

## Next step
Push Ch3 checkpoint, open #83, read ch04 spec, build Ch4.

## Context budget
- Moderate-high: 3 chapters built this session
- Priority: continue builds, minimize reads, syntax-check after each chapter
