# GOAL-1 Run State

Last updated: 2026-06-16 (after Ch5 build)

## Status: IN PROGRESS — Ch6 next

## What's built
- Ch1: complete (existing code) — audit PASS (commit `47eab8a`)
- Ch2: Estonia/Käsmu — PASS (commit `9004be2`, checkpoint `goal-checkpoint-ch2`)
- Ch3: Southampton — PASS (commit `26b0984`, checkpoint `goal-checkpoint-ch3`)
- Ch4: Istanbul/Türkiye — PASS (commit `641bd2c`, checkpoint `goal-checkpoint-ch4`)
- Ch5: South Africa/Saldanha Bay — PASS (commit `6ebc9b9`, checkpoint `goal-checkpoint-ch5`)

## GitHub Issues opened
- #78: Visual confirmation backlog
- #79: Open questions / autonomous design calls
- #80: Ch1 tracking issue
- #81: Ch2 tracking issue
- #82: Ch2 checkpoint pushed
- #83: Ch3 tracking issue
- #84: Ch4 tracking issue
- #85: Ch5 tracking issue (TBD — to open after push)

## Architecture globals
- `pip.abilities.memoryGifting` — new, set true in Ch5 Beat 5
- `ch2State`, `ch3State`, `ch4State`, `ch5State` — all wired to save
- `ch4WalnutsHeld` standalone bool
- Inventory items: switchblade-iris (Ch5), muhammara jar (Ch4, given away)

## Ch6–Ch8: NOT STARTED
Build order:
1. ~~Ch2 (Estonia/Käsmu)~~ DONE
2. ~~Ch3 (Southampton)~~ DONE
3. ~~Ch4 (Istanbul)~~ DONE
4. ~~Ch5 (South Africa)~~ DONE
5. Ch6 (Indonesia): Pocong, Tirta, lemper, infection arc, Erik photograph
6. Ch7 (Brazil): Boitatá, Joana/Beatriz, moqueca, Erik kitchen scene
7. Ch8 (Greenpoint): shadow, override phases, reunions, final line

## Next step
Push Ch5 checkpoint, open #85, read ch06 spec, build Ch6.

## Context budget
- Moderate-high: 4 chapters built this session (Ch2–Ch5)
- Priority: continue builds Ch6–Ch8, then cross-chapter audit
