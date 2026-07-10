# GOAL — R-Series Release Run: Run State

The cross-session memory for the R01–R18 release run. Every stage boundary updates the
**Resume here** line and the sprint table. Nothing about this run stays implicit — if it
isn't in this file or in the tracking issues, it didn't happen.

- **Run opened:** 2026-07-10
- **Parent issue:** #108 — GOAL: R-series release run (R01–R18)
- **Visual-confirmation backlog:** #109 (R-run successor to #78)
- **Autonomous design calls (ratification):** #110 (R-run successor to #79)
- **Roadmap:** `sprints/roadmap-to-release.md`
- **Protocol:** the `/goal` R-series handoff prompt + `design-docs/goal-run-protocol.md`

## Resume here

> **R01 Stage 0 + Stage 1 complete; Julia RULED "apply playscript verbatim"; Stage 2 (the
> edit) is the next action.** Hygiene done (16 stacked commits pushed, `DEBUG_WARP=false`).
> Stage-1 diff in #111: 74 dialogue lines match, 49 structural beats conform, 25 real DIFFs.
> The **exact apply-spec is recorded as a comment on #111** (every old→new pair, the
> grandparents 2→5-line cinematic restore, the bed/mirror/wire swaps) — execute it exactly.
>
> **Stage-2 procedure (next session):**
> 1. Apply the ~17 tone/wording swaps + grandparents cinematic expansion from the #111
>    apply-spec. **Encoding caveat:** file mixes literal `\uXXXX` escape text with literal
>    UTF-8 curly quotes — match each line's actual bytes (Edit tool or assertion-guarded
>    script). Do NOT touch the 3 gameplay-critical lines (1976, 2311/2321, 2122/2123) — keep
>    code, log those 3 as autonomous calls in #110.
> 2. `node --check` the extracted JS (was PARSE OK at 851,363 chars). No `build.js` needed —
>    R01 touches no art / `art-source.js`.
> 3. Commit (scene-group), tag `r-checkpoint-R01`, confirm `DEBUG_WARP=false`, push, verify
>    `git log origin/main..HEAD` empty.
> 4. Add R01 items to backlog #109; close #111 + dangling #89 with the SHA; report in #108;
>    flip run-state R01 → `built`; begin R02.
>
> **Carried hygiene debt (flag for R02 / Julia):** large untracked/uncommitted working tree
> predating this run — `ch01-playscript.docx` modified, all `sprint-R*.md` + roadmap +
> `goal-run-protocol.md` untracked, `game/scale-reference.html` deleted. Not mass-committed
> (needs Julia's judgment on the `.mp4`/temp files); recommend a deliberate `git add` pass in
> R02's doc-reconciliation.

## Sprint table

| Sprint | Name | Status | Issue # | Checkpoint SHA | Tag |
|---|---|---|---|---|---|
| R01 | Ch1 playscript impl + repo hygiene | in-progress | #111 | — | — |
| R02 | Open-questions closeout + doc reconciliation | pending | — | — | — |
| R03 | Gallery population, Ch2–Ch4 | pending | — | — | — |
| R04 | Gallery population, Ch5–Ch8 | pending | — | — | — |
| R05 | Ch2 art reconciliation | pending | — | — | — |
| R06 | Ch3 art reconciliation | pending | — | — | — |
| R07 | Ch4 art reconciliation | pending | — | — | — |
| R08 | Ch5 art reconciliation | pending | — | — | — |
| R09 | Ch6 art reconciliation | pending | — | — | — |
| R10 | Ch7 art reconciliation | pending | — | — | — |
| R11 | Ch8 art reconciliation | pending | — | — | — |
| R12 | Kinetic mechanics — port chapters | pending | — | — | — |
| R13 | Kinetic mechanics — Ch8 finale | pending | — | — | — |
| R14 | Audio + music pass | pending | — | — | — |
| R15 | Save + persistence hardening | pending | — | — | — |
| R16 | Recipe-site integration + credits | pending | — | — | — |
| R17 | Mobile playtest + polish | pending | — | — | — |
| R18 | Release: verification + go-live | pending | — | — | — |

Status legend: `pending` → `in-progress` → `built` (checkpoint pushed; awaiting Julia's
in-browser verification) → `done` (Julia has checked the sprint's backlog items in-browser).
Only Julia flips a row to `done`.

## Autonomous-call count per sprint

Mirror of issue #92. Updated as calls are logged.

| Sprint | Calls logged |
|---|---|
| Setup | 1 (DEBUG_WARP flipped false to safely push stacked pre-run commits) |
| R01 | 0 |

## Carried defects / deferred items

- **#24 save v1→v2 drop** — pre-answered default (fresh start + one-line notice); resolves in R02.
- **#39 Henrik exit** — pre-answered default (simplest playscript-consistent staging); R02.
- **#40 recipe-HUD copy** — pre-answered default (draft in voice, mark REVIEW); R02.
- **#41 Erik age** — pre-answered default (11); R02. NOTE: issue #41 title reads
  "'five or six' vs '5–7'", but roadmap/R02 frame it as bible-~12 vs built-11 — reconcile
  the two framings in R02.
- **Audio `IndexSizeError`** (flagged G-S4, doc 06 Audio section) — fix in R02.
- **Dangling GOAL-1 issues #81–#89** — first-draft chapter builds, never closed. Carried
  forward; each closes as its R-series reconciliation sprint (R05–R11) lands. #89 (Ch1 G1b)
  closes under R01.
- **Recipe URLs ×8** — cannot invent; R16 uses homepage placeholders in a one-table edit.

## Architecture notes carried from GOAL-1

- Pipeline: `art/galleries/art-source.js` → `node build.js` → inlines into `game/index.html`
  between `@@ART-SOURCE` markers. `node --check` after every build.
- Galleries: `art/galleries/character-gallery.html`, `art/galleries/environment-gallery.html`.
- `pip.abilities.memoryGifting` set in Ch5; `ch2State`–`ch6State` wired to save;
  `ch4WalnutsHeld` bool; inventory `switchblade-iris` (Ch5, load-bearing Ch6+).
- Namespaced draw functions only — duplicate base names caused the silent Ch1/Ch8
  `drawBabcia` override (fixed G1c-1). Chapter variants: `drawBabciaStanding`, etc.
- Ch1 source of truth: `ch01-canonical-beat-order.md` (sequence) + `ch01-playscript.docx`
  (content, supersedes dialogue-audit docs).
