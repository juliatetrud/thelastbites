# Sprint 09.5: Doc patch — echo-creature exceptions, italics rule, sprint history

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

This sprint *is* a doc-hygiene sprint — no code changes. The point is to clear the accumulated decision-debt before the next substantive sprint.

---

## Goal

Resolve three outstanding documentation items: lock the echo-creature size exceptions (echo-fish, echo-deer, echo-cats) into the canonical scale system; lock the italics convention for narration vs. interior thought; and add a Sprint History section to the roadmap doc so future sprint-state questions can be answered from the docs without having to dig through the repo.

## Definition of done

- The three "PROPOSAL PENDING USER CONFIRMATION" entries in `design-docs/09-component-scale-reference.md` Discrepancies section (#9 echo-fish, #10 echo-deer, #11 echo-cats) are marked RESOLVED with the locked dimensions.
- A new row is added to the canonical Scale Anchor table in `design-docs/03-art-and-aesthetic.md`: **"Visible echo-creature"** — a named exception tier between standard echo-creature vermin and standard NPCs.
- `art-asset-list.md` echo-fish, echo-deer, and echo-cat entries are updated to specify the locked dimensions in their prompts.
- The italics-vs-roman convention is added to `design-docs/01-story-bible.md` Narrative Voice section (or wherever narrative voice is canonically documented).
- The earlier open question in the Decisions Log entry from 2026-05-13 about first-person vs. third-person interior thought is resolved.
- A new **Sprint History** section is added to `design-docs/06-roadmap-and-open-questions.md`, populated with every sprint that has shipped so far. Each entry is one line: sprint number, name, ship date, and the one-line summary of what it produced.
- A new entry is added to the Open Questions list flagging **"Left-arrow as 'back' in dialogue choice screens"** as a small future sprint item.
- Three new Decisions Log entries are appended to `06-roadmap-and-open-questions.md` documenting these resolutions.
- All changes ship in a single commit.

## Context from prior decisions

### Echo-creature exceptions (from chat with Julia, 2026-05-14)

Per Julia's confirmation, all three proposed exceptions are accepted:

- **Echo-fish:** 0.25–0.30 H (28–33 px). Larger than vermin because they drift visibly in mid-air rather than skittering at floor level.
- **Echo-deer:** 0.35–0.40 H (~40–44 px). Larger because they visibly cross streets in traversal sections.
- **Echo-cats:** 0.20–0.22 H (~22–24 px). Larger because they're recognizable cats, not vermin.

These three form a new tier — "visible echo-creatures" — distinct from the standard echo-creature band (0.06–0.14 H, the spiders/mice/cockroaches/etc. that skitter at floor level as ambient texture).

### Italics rule (from chat with Julia, 2026-05-14)

> If they're Pip's thoughts, italics. If they're in third person they are not in italics.

Resolves the earlier open question from the 2026-05-13 Decisions Log entry on narrative voice. The convention:

- **Roman text** = third-person present-tense narration. *Babcia is on the bed. Her hands are folded around her red face.*
- **Italics** = Pip's interior thought, expressed in his own voice (first-person allowed within the italics). *I should say something. I should say her name.*
- **Spoken dialogue** = quoted with attribution. *"Babciu, jestem tutaj," Pip says.*

The earlier worry — whether italics should shift to third person — is settled: italics stay first-person, because they're Pip's voice. The third-person/first-person split tracks the narrator/character split, which is structurally cleaner.

### Sprint History rationale

The roadmap doc currently tracks decisions but not sprint completion status. As a result, "which sprint are we on?" is a question that can only be answered by reading the repo. Adding a Sprint History section means: the doc records what's shipped, in order, in one place; every future sprint adds a row as part of its doc-hygiene work.

### Back-key in dialogue rationale

Per Julia's chat note: pressing the left arrow during dialogue choice screens should let the player back up — useful when a player accidentally advances or wants to re-read prior lines. Not in scope for this sprint, but should be captured in the open-questions list so it isn't lost.

## Implementation notes

### 1. Echo-creature exception tier in doc 03

In `design-docs/03-art-and-aesthetic.md`, find the Scale Anchor table. Add a new row between the existing Echo-creatures row and the Pätu row:

```
| Visible echo-creature (echo-fish, echo-deer, echo-cats) | 0.20–0.40 (varies) | 22–44 |
```

Below the table, add a short paragraph clarifying:

> Most echo-creatures (spiders, mice, cockroaches, etc.) are ambient texture: tiny vermin at 0.06–0.14 door-heights that skitter at floor level. A small number of echo-creatures are *visible* — they're recognizable as the animal they were and play a deliberate role in the player's experience: echo-fish drift in mid-air through certain rooms, echo-deer cross streets during traversal, echo-cats are recognizable cats in alley scenes. These render larger, in the 0.20–0.40 band, and are flagged in `08-character-reference-sheets.md` per chapter.

### 2. Resolve #9, #10, #11 in doc 09

In `design-docs/09-component-scale-reference.md`, the Discrepancies section:

- Change the **#9 Echo-fish** header from "PROPOSAL PENDING USER CONFIRMATION" to "RESOLVED Sprint 09.5"
- Body becomes: *Echo-fish locked at 0.25–0.30 H (28–33 px) as a visible echo-creature exception. See `03-art-and-aesthetic.md` Scale Anchor table.*
- Same treatment for **#10 Echo-deer** at 0.35–0.40 H (~40–44 px)
- Same treatment for **#11 Echo-cats** at 0.20–0.22 H (~22–24 px)

Update the section header from "Sprint 08 surfaced 12 discrepancies. Sprint 08.5 resolved 9; 3 remain open as proposals awaiting user confirmation." to "Sprint 08 surfaced 12 discrepancies. All 12 now resolved (Sprints 08.5 and 09.5)."

### 3. Update `art-asset-list.md` echo-creature prompts

Find the echo-fish, echo-deer, and echo-cat entries (likely in the Chapter 1, 2, 4, or 7 sections — check each chapter's echo-creature subsection). Update their prompts to specify:

- Echo-fish: "~28–33 pixels long (door-fraction 0.25–0.30, visible echo-creature tier)"
- Echo-deer: "~40–44 pixels tall (door-fraction 0.35–0.40, visible echo-creature tier)"
- Echo-cats: "~22–24 pixels tall (door-fraction 0.20–0.22, visible echo-creature tier)"

If the prompts currently specify other sizes, replace those values. Leave all other descriptive language unchanged.

### 4. Italics rule in doc 01

In `design-docs/01-story-bible.md`, find the Narrative Voice section. Add a new subsection (or extend the existing one) with the convention as quoted in Context above. Include a worked example showing all three modes (roman narration / italicized interior thought / quoted dialogue) in a single short passage. Use the existing grandparents' cabin narration (visible in `game/index.html` `grandparentsObjects` array) as the example source — it already uses the right conventions.

After adding the convention, scan `01-story-bible.md` for any place that previously said the italics question was open or under review. Remove those notices. The question is now settled.

### 5. Sprint History section

In `design-docs/06-roadmap-and-open-questions.md`, add a new section titled **Sprint History**, positioned *before* the Decisions Log. Format as a table:

```
| Sprint | Name | Shipped | One-line summary |
|---|---|---|---|
| 01 | Foundation scaffold | YYYY-MM-DD | 480×270 canvas, game loop, input, letterbox, placeholder Pip in empty room. |
| 01.5 | Pip sprite rig | YYYY-MM-DD | Three-layer procedural Pip (body, eyes, mouth) with idle, walk, blink, look-at. |
| 02 | Dialogue system | YYYY-MM-DD | Dialogue box, typewriter, choices, controls strip, porthole inspectable. |
| ...
```

Populate every row by reading the commit log. For each sprint spec file in `sprints/`, find the most recent commit whose message references that sprint and use its date. Use `git log --format="%ad %s" --date=short -- sprints/sprint-NN-*.md` or by grepping commit messages for `Sprint NN`.

If a sprint spec exists but no shipping commit can be found, mark the ship date as `—` and add `(specced, not started)` to the summary.

The completeness of this table is the entire point of this sub-task — it should reflect every sprint that has happened in this project. Do not skip sprints. If you find a sprint you can't classify, list it with `(unknown)` rather than omit it.

### 6. Open questions: back-key in dialogue

In `design-docs/06-roadmap-and-open-questions.md`, find the Open Questions list (separate from the Decisions Log). Add a new entry:

> - **Back-key in dialogue choice screens.** Pressing left arrow during a dialogue choice should back up to the previous line / dialogue node, in case the player accidentally advanced past something or wants to re-read. Small follow-up sprint. Flagged 2026-05-14.

### 7. Three new Decisions Log entries

Append to the bottom of the Decisions Log table in `06-roadmap-and-open-questions.md`:

> | 2026-05-14 | **Visible echo-creature exception tier locked.** Echo-fish (0.25–0.30 H), echo-deer (0.35–0.40 H), and echo-cats (0.20–0.22 H) are formalized as a "visible echo-creature" exception to the standard echo-creature vermin band (0.06–0.14 H). Documented in `03-art-and-aesthetic.md` Scale Anchor and `art-asset-list.md` echo-creature prompts. Closes Sprint 08 Discrepancies #9, #10, #11. |
>
> | 2026-05-14 | **Italics convention locked.** Roman = third-person narration. Italics = Pip's first-person interior thought. Quoted = spoken dialogue with attribution. The earlier open question (whether italics should shift to third-person) is resolved: italics stay in Pip's first-person voice; the third-person/first-person split tracks the narrator/character split. Documented in `01-story-bible.md` Narrative Voice section. |
>
> | 2026-05-14 | **Sprint History section established in doc 06.** Going forward, every sprint adds a row to the Sprint History table as part of its doc-hygiene work. This is the canonical record of what has shipped — the Decisions Log records *what was decided*, the Sprint History records *what was built*. |

## Files to create or modify

Modify (substantive):
- `design-docs/03-art-and-aesthetic.md` — add Visible echo-creature row to Scale Anchor table; add clarifying paragraph
- `design-docs/09-component-scale-reference.md` — resolve discrepancies #9, #10, #11; update section header
- `design-docs/01-story-bible.md` — add italics convention to Narrative Voice section
- `art-asset-list.md` — update echo-fish, echo-deer, echo-cat prompts
- `design-docs/06-roadmap-and-open-questions.md` — add Sprint History section, add open question, append three Decisions Log entries

Do not modify:
- `game/index.html` (no code changes this sprint)
- Any sprint spec file in `sprints/` (history is recorded *of* them, not *in* them)
- `prototype/` (frozen)

## Out of scope

- Implementing left-arrow-back in dialogue. (Captured as open question for a future sprint.)
- Any code changes whatsoever. This sprint is doc hygiene only.
- Updating echo-creature sprites in `game/scale-reference.html` (they're not yet drawn there). If a "visible echo-creature" placeholder is added later, it can be its own small sprint.
- Reconciling any Chapter 2+ outline content that may reference echo-creatures with the new tier. The chapter outlines remain as written; the new size guidance applies when those chapters are built.

## Test checklist

1. **Doc 09 discrepancies all resolved.**
   - Open `design-docs/09-component-scale-reference.md`. Search for "PENDING" — expected: zero matches. Search for "RESOLVED" — expected: matches on entries 1–12.

2. **Doc 03 Scale Anchor table has the new row.**
   - Open `design-docs/03-art-and-aesthetic.md`. Find Scale Anchor table. Visible echo-creature row exists between Echo-creatures and Pätu rows. Clarifying paragraph below the table mentions the distinction between ambient vermin and visible echo-creatures.

3. **Italics convention in story bible.**
   - Open `design-docs/01-story-bible.md`. Find Narrative Voice section. The convention is documented with a worked example. No "open question" language about italics remains.

4. **Sprint History section present and populated.**
   - Open `design-docs/06-roadmap-and-open-questions.md`. Find Sprint History section before the Decisions Log. Verify every sprint spec file in `sprints/` is represented (each row matches one file). The list reads in sprint-number order.

5. **Open question for back-key captured.**
   - In the Open Questions list, the back-key item is present and dated 2026-05-14.

6. **Three new Decisions Log entries present.**
   - At the bottom of the Decisions Log, three rows dated 2026-05-14: visible echo-creatures, italics, sprint history.

7. **Art asset list updates.**
   - Search `art-asset-list.md` for echo-fish, echo-deer, echo-cats. Each entry now specifies the new canonical pixel dimensions.

8. **Single commit.**
   - `git log --oneline -1` shows one commit covering all the above.

## Report back

After Sprint 09.5 lands, Claude Code reports:

1. The Sprint History table populated — list how many rows it contains and the date range covered.
2. Any sprint files in `sprints/` that could not be confidently dated from commit history (flag for Julia's input).
3. Confirmation that the three discrepancies are resolved.
4. Confirmation that the italics convention is documented.
5. Any open questions surfaced during the doc audit that should be added to the Open Questions list.
