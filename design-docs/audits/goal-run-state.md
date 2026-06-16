# GOAL-1 Run State

Last updated: 2026-06-15 (after Ch2 build)

## Status: IN PROGRESS — Ch3 next

## What's built
- Ch1: complete (existing code) — audit PASS (commit `47eab8a`)
- Ch2: Estonia/Käsmu — build + audit PASS (commit `9004be2`)
- Mirror-craft-demo ghost fix committed (`13f540d`)

## GitHub Issues opened
- #78: Visual confirmation backlog (standing checklist)
- #79: Open questions / autonomous design calls
- #80: Ch1 tracking issue (audit pass)
- #81: Ch2 tracking issue (to be closed with checkpoint push)

## Architecture globals added
- `let currentChapter = 1;` (updated to 2 in startChapter2)
- `ch2State`, `patuState` objects with save/restore wiring
- `pip.abilities.objectMemory` added

## Ch3–Ch8: NOT STARTED
Build order:
1. ~~Ch2 (Estonia/Käsmu)~~ DONE
2. Ch3 (Southampton): Black Shuck, Sandy, curry, Dundee kitchen
3. Ch4 (Istanbul): Karakoncolos, Muhittin, muhammara, Henrietta thread
4. Ch5 (South Africa): Iris, Mamlambo, Johannes, potjie, memory-gifting earned
5. Ch6 (Indonesia): Pocong, Tirta, lemper, infection, Erik photograph
6. Ch7 (Brazil): Boitatá, Joana/Beatriz, moqueca, Erik kitchen scene
7. Ch8 (Greenpoint): shadow, override phases, reunions, final line

## Next step
Read `chapter-specs/ch03-southampton-outline.md`, then build Ch3.
Push Ch2 checkpoint before starting Ch3.

## Context budget
- Moderate: Ch2 build consumed some context for code generation
- Priority: continue build, minimize reads, extract JS for syntax-check only
