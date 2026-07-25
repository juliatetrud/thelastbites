# Sprint R13b: Phase 1 Paired-Memory Inventory — (b) → (a)

Inserted between R16 and R17 on Julia's call. Tracking issue: **#128**. Reversal logged: **#110**.

## Goal

Upgrade Chapter 8's Phase 1 from #124's pragmatic default **(b)** — the journal picker with
its answer and distractor sets written inline in `runPhase1` — to **(a)**: each chapter's
taste beat deposits a real warm journal entry, and the climax spends the inventory the
player actually collected.

Julia's rationale: **the paired-memory payoff is the climax's design intent.** Under (b) the
journal is a prop at the exact moment canon says it becomes "the inventory of what he has to
spend."

## Definition of done

- Each chapter's taste-memory beat (Ch1–Ch7) deposits a discrete warm journal entry.
- Phase 1's picker reads that real inventory rather than synthesized answer+distractor sets.
- A minimum-memory completion path is guaranteed for sparse saves.
- R15's save-coverage matrix (#126) gains rows for the new fields.
- Additive save fields only — no `SAVE_VERSION` bump.
- Diagnosis / design note in the child issue **before** any code (protocol step 1).

## Source-of-truth canon

- `01-story-bible.md:246` — every chapter from Ch2 onward produces a monster moment + a meal
  moment; both enter the collected inventory. "The pattern is locked."
- `01-story-bible.md:285`, `02-game-design.md:389` — the override runs in **reverse
  chronological order**, each chapter's meal moment answering that chapter's monster moment.
  "The notebook is no longer just a record. It is the inventory of what he has to spend."
- `02-game-design.md:366` — the meal moment is the **chef encounter**.
- `02-game-design.md:437` — the paired memory inventory **persists** in save.
- `03b-ui-spec.md:290` — the journal's inventory spread (monster left, meal right).

## Out of scope

- Phase 2 (riddle — verified in R13) and Phase 3 (arrow-key trace).
- **"It's not fair." stays a single choice** (ch8 audit design call #4). Never a puzzle.
- Round count, round order, shadow lines, and all resolve/pong narration — byte-identical.
- Post-override content: Babcia gift, pierogi fold, parents through veil, the locked final
  line, both epilogues.
- The **Monster Moment** half of the inventory — not deposited anywhere, and not
  canon-derivable for Ch1–Ch4. A future sprint, not an improvisation.
- 03b §5 spread polish: Ch5-onward gating, the paired connecting line, icons.

## Files modified

- `game/index.html` — inventory + deposits + Phase 1 + journal page
- `design-docs/06-roadmap-and-open-questions.md` — Sprint History + Decisions Log
- `goal-R-run-state.md` — run state
- Issues #128 (sprint), #110 (reversal), #126 (save-matrix addendum)

## Test checklist

1. Full-collection playthrough: all 7 meal moments deposit; journal page 1 lists them.
2. Phase 1 rounds 1–3 pull real entries; correct answers stay Ch7 → Ch6 → Ch5.
3. Sparse save (a pre-R13b save loaded mid-Ch8): back-fill fires; Phase 1 completable.
4. Wrong pick → gentle static + retry, same option set, no game-over.
5. Save/load round-trip: memory fields persist; a v2 save without them still loads.
6. "It's not fair." still a single choice; final line + epilogues unchanged.
7. `node --check` clean; push verified with `git log origin/main..HEAD` empty.
8. **Julia plays the finale in-browser and signs off on feel** — including the changed Ch5
   and Ch6 correct answers. The ending's feel outranks the mechanics checklist.
