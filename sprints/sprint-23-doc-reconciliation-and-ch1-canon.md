# Sprint 23: Doc reconciliation — Sprint History catch-up, Ch1 canonical beat order, Cabin 646 reframe

## Goal

Bring the design docs back into alignment with what has actually shipped and with the canonical Ch1 beat order — which has lived only in chat history until now. Three things land in one pass: the Sprint History table catches up from Sprint 16 through Sprint 22.6, the Sprint Queue table is brought current, and the Ch1 beat order is locked canonically (Pip's hallway-door interaction with Cabin 646 is retired entirely; the cabin becomes the collection room). No code changes.

## Definition of done

- `design-docs/06-roadmap-and-open-questions.md` Sprint History table has rows for every shipped sprint between 16 and 22.6 (inclusive), in order.
- `design-docs/06-roadmap-and-open-questions.md` Sprint Queue table reflects what is actually queued next (Sprint 24 onward), with shipped items removed.
- `design-docs/06-roadmap-and-open-questions.md` Decisions Log has three new entries dated 2026-05-22, covering (a) the canonical Ch1 beat order, (b) the Cabin 646 door reframe (silent set-dressing on first encounter, silent open on return visits), and (c) Cabin 646 as the collection room.
- `design-docs/04-chapter-01-cabin-646.md` reflects the canonical beat order in Julia's own framing. Stale references to "Listen at the door" / "Not now" as the cabin door's hallway-side interaction are removed.
- `design-docs/beats.md` Beat 4 rewritten: the hallway-side Cabin 646 door has no dialogue prompt at all (no choices, no "Listen at the door," no "Not now"). On first encounter the door is silent set-dressing. On return visits, walking up to it opens it silently — no choice menu.
- `design-docs/cabin-646.md` updated to describe the room as the collection room: items Pip collects appear physically in the cabin and accumulate visibly across the game.
- `design-docs/dialogue.md` Beat 4 section updated to remove all Cabin 646 door dialogue (pre- and post-grandparents'). The door produces no text from the hallway side, ever.
- `design-docs/hallway.md` cabin door section updated to reflect the no-prompt convention.
- `design-docs/puzzles.md` Puzzle 1 verified — it should already point to shared-wall arrival as the doctor-exit trigger (per Sprint 22.6); confirm no stale references remain.
- A supersession note is added (via Decisions Log, not by editing the shipped spec) to retire the Sprint 22 Decisions Log line that froze "Listen at the door / Not now" as the canonical post-grandparents' dialogue. That decision is now overturned.
- No code changes. `game/index.html` is not touched. Any door-related code that currently produces hallway-side dialogue for Cabin 646 will be addressed in Sprint 24 (implementation).

## Context from design docs

### Why this sprint exists

Two problems converged:

1. **The Sprint History table in `design-docs/06-roadmap-and-open-questions.md` is stale from Sprint 16 onward.** The last row is Sprint 15 (title screen, 2026-05-16). But spec files exist for Sprints 16, 17, 18, 18.5, M1, M1.1, 19, 21, 22, 22.5, and 22.6 — and Sprints 22.5 and 22.6 explicitly build on Sprint 22 having shipped. The History table simply wasn't kept current. This is the same canonical-record problem Sprint 09.5 was created to prevent. (Sprint 20 referenced in Sprint 21 has no spec file — it was the beat-order correction landed without its own spec doc; this sprint logs it as such.)

2. **The Ch1 beat order has never been written down canonically.** Julia has been working from a mental model that conflicts in small but accumulating ways with what the docs say. The recent doc cascade (Sprints 22, 22.5, 22.6) locked things that were partially correct but missed the bigger picture: the hallway-side Cabin 646 door has no dialogue, ever, and Cabin 646 is a collection room. This sprint puts the canonical order into the docs in Julia's own words.

### The canonical Ch1 beat order (in Julia's words, 2026-05-22)

Quote this verbatim in the Decisions Log entry and use it as the source-of-truth framing for `04-chapter-01-cabin-646.md`:

> Pip is in the hallway yawning. Person walks through him. He sees the treat, he goes into grandparents' room and they are crying. He exits their room through the wall and into his room (Cabin 646) and he sees a mirror. As he looks in the reflection of the mirror, his face melts and reveals his ghostly reflection. He then looks at the bed and there's something under the sheets. He lifts the sheets and sees his body. Spooked, he runs through the wall into the hallway and sees stairs and a lit sign that says DOWN and goes down the stairs which is where he'll eventually find Henrik.

This supersedes any prior framing where Pip approaches Cabin 646 from the hallway side as a doorway interaction.

### The Cabin 646 door — final ruling

- **Hallway-side interaction with the Cabin 646 door, on first encounter:** none. Pip walks past it. No sparkle, no prompt, no dialogue choices. It is visually present but mechanically silent. (The grandparents' door, by contrast, retains its phase-through-wood discovery moment per existing canon.)
- **Hallway-side interaction with the Cabin 646 door, on return visits (after Beat 5):** Pip walks up to the door and it opens silently. No "Listen / Not now / Go in" choice menu. The door behaves like a real door that works — no decision required.
- **The shared wall** (between grandparents' and Cabin 646) remains the first-time entry to Cabin 646 (per Sprint 22 canon, which stays correct on this point).
- **Wall-phase exit from Cabin 646 to the hallway** at the end of Beat 5 (the panic exit) — Pip phases through the wall back to the hallway. Not through the door. This is new canon: previously the panic-exit was described as a "comic glide out of the cabin" without specifying the egress geometry.

### Cabin 646 as the collection room

New canon. Items Pip collects throughout the game appear physically in the cabin and accumulate visibly across all chapters. Re-entering 646 — either via the shared wall or via the hallway door — shows the accumulated items. This turns Cabin 646 from "the room where the bad reveal happens" into "the room that fills up as Pip remembers more." A quiet visual arc that mirrors his journey.

The implementation specifics (where exactly each item type appears, how they're arranged, whether they trigger reflective dialogue when inspected, etc.) are out of scope for this sprint. The doc work is to lock the principle and flag the implementation questions.

### Supersession — what gets retired

The Sprint 22 Decisions Log entry dated 2026-05-18 includes this clause (paraphrased): "Pre- and post-grandparents': the door dialogue is identical — 'Listen at the door' / 'Not now.' Listening replays the doctor's voice as atmospheric texture forever."

That clause is **retired in full** by this sprint. The Cabin 646 hallway door has no dialogue, ever. The doctor's voice is heard inside the cabin via the doctor-exit cinematic on shared-wall arrival (still correct per Sprint 22) and not via the hallway door.

Do not edit the shipped Sprint 22 spec file. Add a strikethrough or supersession note inline in the Decisions Log entry itself, with a pointer to the new 2026-05-22 entry.

## Implementation notes

This is a docs-only sprint. No code, no tests beyond reading the patched docs.

### Sprint History table — what to add

Read each of the following spec files. For each, write a one-line summary in the same voice as the existing rows (terse, factual, named systems). Use the dates listed below — they are derived from the Decisions Log entries and the Sprint History rows for sibling sprints, and are the canonical record-keeping dates regardless of when commits actually landed. If Claude Code finds a clearly different ship date in commit history during the patch, flag it but use the canonical date here.

Add rows to the Sprint History table after the existing Sprint 15 row, in this order:

| Sprint | Name | Shipped | Summary source |
|---|---|---|---|
| 16 | Hallway detail pass | 2026-05-16 | `sprint-16-hallway-detail-pass.md` goal section |
| 17 | Save state | 2026-05-17 | `sprint-17-save-state__1_.md` goal section |
| 18 | Gallery scope expansion | 2026-05-17 | `sprint-18-gallery-scope-expansion.md` goal section |
| 18.5 | Gallery audit Ch4–Ch8 | 2026-05-17 | `sprint-18-5-gallery-audit-ch4-ch8.md` goal section |
| M1 | Mobile support | 2026-05-17 | `sprint-m1-mobile-support.md` goal section |
| M1.1 | Portrait control polish | 2026-05-17 | `sprint-m1_1-portrait-control-polish.md` goal section |
| 19 | P1 session 1 doc patch | 2026-05-18 | `sprint-19-p1-session-1-doc-patch.md` goal section |
| 20 | Ch1 beat-order correction | 2026-05-18 | No spec file — the beat-order correction landed as code without its own spec. One-line summary: "Ch1 beat order corrected in `game/index.html` — grandparents' before Cabin 646, doctor cinematic moved to shared-wall arrival. Specced retroactively in Sprints 21 and 22." |
| 21 | Hallway polish post-beat-order | 2026-05-18 | `sprint-21-hallway-polish-post-beat-order.md` goal section |
| 22 | Phase-through doc patch | 2026-05-18 | `sprint-22-phase-through-doc-patch.md` goal section |
| 22.5 | `beats.md` and `dark-corridor.md` reconciliation | 2026-05-18 | `sprint-22_5-beats-and-dark-corridor-reconciliation.md` goal section |
| 22.6 | `dialogue.md`, `puzzles.md`, Beat 5 reconciliation | 2026-05-18 | `sprint-22_6-dialogue-puzzles-beat5-reconciliation.md` goal section |

If Claude Code is unsure how to summarize any of these in one line, default to the spec's stated goal (truncated to one sentence) rather than inventing detail.

### Sprint Queue table — what to remove and what to add

Remove from the Sprint Queue (because they've shipped, now logged in Sprint History):
- Sprint 16 (Hallway detail pass)
- Sprint 18 (Character gallery expansion)
- Sprint M1 / M1.5 / M2 — note: M1 and M1.1 shipped; M1.5 and M2 were planning labels that got merged into M1 / M1.1. Remove M1, M1.5, M2 from the queue. If mobile polish work remains, that's a future sprint, named separately.

The 14.7 sprint queue table also listed "Sprint 17: Interior conventions doc" — that doc was never written and Sprint 17 became the save-state work. Remove this row; do not preserve it. If interior conventions doc work is wanted later, file as a fresh open question.

Add to the Sprint Queue:
- **24** — Implementation: Cabin 646 hallway-door silent-open, collection-room foundation. Pip walks up to the door (post-Beat 5) and it opens silently into the cabin; no choice menu. Strip all hallway-side dialogue from the Cabin 646 door in code. Build the data structure for collection items appearing in the cabin (skeleton only; the actual item-placement logic can be incremental).
- **25** — Henrik kitchen: Beat 4 rework + first-taste cinematic. (Was listed as 19+ in the old queue; renumber to its actual position.)
- Mobile-polish work, if any remains from real-phone playtest, gets a fresh sprint number when filed.

### Decisions Log — what to add

Three new entries, dated 2026-05-22. The full prose can be tightened by Claude Code; the substance must be:

1. **Ch1 canonical beat order locked.** Quote Julia's beat-order paragraph verbatim. Note that this resolves a long-standing implicit canon that had never been written down. Note that it supersedes any conflicting framing in prior sprint specs or Decisions Log entries.

2. **Cabin 646 hallway door — no dialogue prompts on first encounter; silent open on return.** No "Listen at the door" / "Not now" choice menu, ever. The door is mechanically silent on first encounter (Pip walks past it; the shared wall is the first-time entry). On return visits, walking up to the door from the hallway opens it silently. This supersedes the Sprint 22 Decisions Log entry (2026-05-18) that froze "Listen at the door" / "Not now" as the canonical door dialogue. Add a supersession note (strikethrough or inline pointer) on that earlier entry.

3. **Cabin 646 is the collection room.** Items Pip collects throughout the game appear physically in the cabin and accumulate visibly across all chapters. Re-entering 646 (via shared wall or hallway door) shows the accumulated items. Implementation specifics (item placement, inspection dialogue, etc.) are flagged as open questions for the next implementation sprint.

### Open Questions — what to add

Add to the Design Open Questions section of `06-roadmap-and-open-questions.md`:

- **Collection-room item placement convention.** Items appear physically in Cabin 646 as Pip collects them across chapters. Open: where exactly does each item type land? On the desk, on the shelf, on the bed, on the floor? Does it group by chapter (Ch1 items together, Ch2 items together) or by category (recipe components vs. memory components)? Recommend a fixed-position-per-item-id approach for visual stability.
- **Collection-room inspection.** When Pip inspects an accumulated item back in 646, what does the narration say? Does it surface the original collection memory? Does it reveal new reflective text? Or is it silent presence — visible but not interactive? Lean toward inspectable with short reflective lines that grow with the empathy stat, but this needs design.
- **Cabin 646 first-time door silence — visual cue?** Pip walks past the door on first traversal because the door is mechanically silent (no sparkle, no prompt). Should the door's *appearance* signal "not yet" — e.g. very subtly off, slightly differently lit, slightly translucent — or should it look exactly like a normal door? Lean toward visually identical to avoid telegraphing the puzzle; the player learns the cabin via the shared wall, not via reading door cues.

### Files that previously encoded the now-retired door dialogue

These need their Beat 4 / Cabin-646-door sections checked and stripped of any "Listen at the door" / "Not now" language, and any reference to the door producing dialogue from the hallway side:

- `design-docs/04-chapter-01-cabin-646.md` Beat 4
- `design-docs/beats.md` Beat 4 (this was just rewritten in Sprint 22.5 — it now still has the "Listen at the door" dialogue; that whole interaction is retired in this sprint)
- `design-docs/dialogue.md` Beat 4 (rewritten in Sprint 22.6 — same situation)
- `design-docs/hallway.md` (cabin doors section)
- `design-docs/cabin-646.md` (entry-method section)

The pattern: any time a doc currently describes the Cabin 646 hallway door producing dialogue, replace that passage with a short statement that the door is silent set-dressing on first encounter and opens silently on return.

### Where the canonical Ch1 beat order lives

The canonical paragraph (Julia's words, quoted above) goes in **two places**:

1. The Decisions Log entry dated 2026-05-22 (verbatim).
2. The opening of `design-docs/04-chapter-01-cabin-646.md` — replace or augment whatever currently sits at the top of the file with a "Canonical beat order" section that quotes Julia's paragraph, then proceeds into the existing beat-by-beat detail below it. The beat-by-beat sections that follow should be reconciled to this canonical paragraph — anything that conflicts gets updated; anything new (the DOWN sign, the stairs as the egress from the hallway) gets added.

Note: `04-chapter-01-cabin-646.md` currently does not mention the lit "DOWN" sign and stairs as the egress from the hallway after the panic exit. That detail is new canon as of this sprint. Add a short Beat 7-or-equivalent section describing: Pip lands in the hallway (having phased through the wall); a lit sign reading "DOWN" is visible; stairs descend; Pip goes down them; this delivers him to the dark corridor / kitchen approach where Beat 8+ begins.

If the existing beat numbering doesn't accommodate this cleanly (Beat 7 may already be assigned to something else), insert it as Beat 6.5 or as a "Beat 7 — Stairs to the kitchen approach" and flag the renumbering in the report-back.

## Files to create or modify

Modify only — no new files, no code:

- `design-docs/06-roadmap-and-open-questions.md` — Sprint History rows (12 new), Sprint Queue table refresh, three Decisions Log entries, three Open Questions, supersession note on the Sprint 22 2026-05-18 entry
- `design-docs/04-chapter-01-cabin-646.md` — canonical-beat-order paragraph at top; reconcile Beat 4 (no door dialogue); reconcile Beat 5 mirror trigger if needed; add the DOWN-sign / stairs beat after the panic exit
- `design-docs/beats.md` — Beat 4 rewritten with no door dialogue; Beat 6 continuation language preserved; add the DOWN-sign / stairs beat
- `design-docs/dialogue.md` — Beat 4 section: remove all Cabin 646 door dialogue, replace with a one-line statement that the door is silent on first encounter and opens silently on return
- `design-docs/hallway.md` — cabin doors section: Cabin 646 door reframed as silent set-dressing / silent-open
- `design-docs/cabin-646.md` — entry-method section reframed; new section describing the room as the collection room (principle only; implementation details flagged as open questions)
- `design-docs/puzzles.md` — verify Puzzle 1 has no stale Cabin 646 door references; touch only if stale

## Out of scope

- Any code changes. `game/index.html` is not touched. The actual stripping of door dialogue from code happens in Sprint 24.
- Designing the collection-room item placement system. The principle is locked; the specifics are open questions for Sprint 24+.
- Drafting Sprint 24. That comes after this lands.
- Editing the shipped spec files for Sprints 22, 22.5, 22.6. They remain as historical record. Supersession is via the Decisions Log entry.
- Filling in any sprints in the Sprint History table that may have actually shipped under a different name or that aren't covered by the spec files listed above. If Claude Code finds evidence of a shipped sprint not in the list, flag in the report-back rather than inventing a row.
- Repairing any other contradictions in the docs that are not directly caused by the door-dialogue retirement or the beat-order canonicalization. Flag them for a future cleanup sprint.

## Test checklist

Reading-only verification:

- [ ] Sprint History table has 12 new rows (16, 17, 18, 18.5, M1, M1.1, 19, 20, 21, 22, 22.5, 22.6), all dated correctly per the table above
- [ ] Sprint Queue table no longer contains rows for shipped sprints (16, 17, 18, M1, M1.5, M2)
- [ ] Sprint Queue table contains rows for Sprint 24 and Sprint 25 (with the descriptions specified above)
- [ ] Decisions Log has three new 2026-05-22 entries
- [ ] Decisions Log Sprint 22 entry (2026-05-18) has a visible supersession note pointing to the new 2026-05-22 door entry
- [ ] `04-chapter-01-cabin-646.md` has Julia's canonical beat-order paragraph at the top
- [ ] `04-chapter-01-cabin-646.md` includes a beat describing the DOWN sign and stairs as the hallway-to-dark-corridor egress
- [ ] `beats.md` Beat 4 contains no "Listen at the door" / "Not now" dialogue for the Cabin 646 hallway door
- [ ] `dialogue.md` Beat 4 contains no Cabin 646 hallway-door dialogue
- [ ] `hallway.md` cabin doors section describes Cabin 646 door as silent set-dressing / silent-open
- [ ] `cabin-646.md` describes the room as the collection room
- [ ] Three new Open Questions present in `06-roadmap-and-open-questions.md`
- [ ] No code files modified (`git diff --name-only HEAD~1` shows only `.md` files)
- [ ] Single commit with a sprint-referencing message

## Report back

After Sprint 23 lands, Claude Code reports:

1. The Sprint History table row count after the update, and confirmation that every spec file in `sprints/` matching `sprint-16` through `sprint-22_6` is represented.
2. Any spec files in `sprints/` between 16 and 22.6 that could *not* be confidently summarized in one line — flag for Julia's input.
3. Any places where stale "Listen at the door" / "Not now" dialogue was found *outside* the files listed in "Files to create or modify." Flag, do not edit silently — a follow-up patch can mop up.
4. Whether the DOWN-sign / stairs beat slotted cleanly into `04-chapter-01-cabin-646.md`'s existing beat numbering or required a renumber.
5. Any contradictions surfaced during the patch that should become open questions or future cleanup sprints.
