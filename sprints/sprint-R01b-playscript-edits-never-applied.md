# Sprint R01b: Apply the 16 Playscript Edits R01 Never Saw

Child of R01 (#111). Audit: #129. Tracking issue: **#130**. Parent run: #108.

## Goal

Apply the edits in the canonical Ch1 playscript's CLEANUP CHANGELOG that Sprint R01 could not
apply, because the file it was given was 4h16m stale.

## Root cause

The Ch1 source of truth was an **uncommitted working-tree file**. A newer cleaned version,
`ch01-playscript-clean.docx` (2026-07-05 14:18:41), sat in `~/Downloads` and was never added
to the repo, so R01 (2026-07-10) applied from a stale copy.

Confirmation this is the true root cause rather than coincidence: the newer document's
CLEANUP CHANGELOG ends with three OPEN FLAGS that map exactly onto the three pre-answered
questions in `sprint-R01-ch1-playscript-and-repo-hygiene.md`. The R01 **spec** was written
with the clean document in hand; the R01 **sprint** read the stale repo copy.

**R01 itself made no errors** — all 21 lines it was instructed to apply are correct against
the file it was given, and the three held items are intact.

## Structural fix (before the sprint)

| Commit | What |
|---|---|
| `bea4d87` | Commits the stale working-tree copy **as-is**, locking the provenance chain — this is the file R01 actually read |
| `d757fcb` | Supersedes it with the canonical clean version; Ch1 source of truth is now version-controlled |

This is the part that stops the failure recurring. A sprint cannot be held to a source of
truth that exists only in someone's working tree.

## Definition of done

- **Stage 1** — 14 speaker relabels applied (`8acfef2`).
- **Stage 2** — `first-taste` reorder + renderer phase-boundary shift applied (`b717f39`).
- **Stage 3** — cinematic timing change **scoped and posted, not applied** (Julia's explicit
  instruction) — see #131.
- Held-line rules from R01 unchanged; no held node touched.
- No line text altered anywhere in the sprint — flags and ordering only.

## Stage 1 — 14 speaker relabels (`8acfef2`)

Convention from Julia's own Scenes 1–5: **interior thoughts are first-person only.** In code
this is the dialogue line's `italic` flag (`true` = interior thought, `false` = narration).

13 lines `true → false`: `first-taste` 7578/7582/7583; Nøkken story 2396/2398/2401/2403;
`kitchen-henrik-repeat` 2441; `dock-farewell` 7601/7602/7603; `henriks-offer` 7613;
`deck-henrik-post` 2520. One reverse, `kitchen-gate-hint` 3605 `false → true` (Pip's plan;
pairs with the thought at 3604).

Applied by an assertion-guarded script using **exact text equality**. A first pass using
substring matching aborted on an ambiguity — `'Henrik pauses.'` vs `'Henrik pauses. He looks
at the empty plate.'` — and wrote nothing. All 14 text values verified byte-identical
before/after.

## Stage 2 — `first-taste` reorder (`b717f39`)

`'Pip finishes the dish in record time.'` moved from index 0 to index 8, immediately before
`'The memory fades.'` — it previously fired before the lefse bite.

**Not self-contained.** `drawFirstTasteCinematic()` drives its crossfades off **hardcoded line
indices**. Removing index 0 shifts the line that actually starts phase 6b
(`'Pip takes a bite of the lefse.'`) from 4 to 3:

| Boundary | Before | After | Why |
|---|---|---|---|
| 6a → 6b | 4 | **3** | one line removed ahead of it |
| 6b → present | 10 | **10** | one removed before it, one re-inserted before it — nets out |

⚠️ **For Julia's browser pass:** `'record time'` now sits at index 8, inside the 6b range
(3–9), so it renders over the Erik-memory visual rather than the present kitchen. That
follows directly from placing it immediately before `'The memory fades'`, but it is a visual
change and hers to confirm.

## Stage 3 — scoped only, NOT applied (#131)

The changelog's kitchen bite-beat move is a **cinematic timing change, not a text edit** — no
such dialogue line exists in code. Held because the changelog reordered that beat from a
transcript **missing three shipped Henrik lines**, so the intended target position cannot be
trusted from the document alone.

## Held lines — unchanged from R01

1. `gp-door-return` — "Babcia and Dziadek are still inside…"
2. `dc-cart-inspect` / `dc-cart-push-fail` — "page" + "back in the cabin" (CP-2b / G-S5)
3. `gp-armchair-inspect` + pocket radio — Sprint-20 windowsill `gp-radio` design

None of the 16 edits touches a held node. Re-verified by string match after both stages.

**Carried forward, still unresolved:** `gp-radio-page-choice` / "You cart" — a ratified "keep"
ruling with no shipped line, because its host beat is held under item 3. Flagged twice by
independent routes (#129 §3a; the changelog's own OPEN FLAG 2).

## Known gap in the source of truth

Neither playscript version documents three lines live in
`CINEMATIC_SCRIPTS['henrik-sits-down']` ("Your grandmother. She told me…" / "Eat. Tell me if
it's as good as she promised." / "Henrik does not answer immediately…"). The playscript
under-documents the kitchen scene. This is the direct reason Stage 3 is held.

## Out of scope

Ch2–Ch8; systems, art, audio, save; any line text change; the three held items; Stage 3.

## Test checklist

1. All 14 relabels carry the correct `italic` value; no line text altered. ✅ static
2. `first-taste` order: "record time" immediately precedes "The memory fades." ✅ static
3. `drawFirstTasteCinematic()` phase boundaries land on the intended content. ✅ static
4. Held lines 1–3 unchanged. ✅ static
5. `node --check` clean. ✅
6. Push verified — `git log origin/main..HEAD` empty; `r-checkpoint-R01b` on remote.
7. **Julia plays Ch1 in-browser** — relabels are a rendering change (thought bubble vs.
   narration box) and the `first-taste` reorder changes what shows over which visual. Static
   verification is not sufficient.
