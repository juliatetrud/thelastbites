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

> **R03 in-progress — batch 1 (Ch2 characters) pushed (`17ebe29`); AWAITING Julia's gallery
> review.** Audit done (all ~20 Ch2–Ch4 draw fns exist in-game, none in gallery; R03 = port
> them in on-doctrine). Issue #114 has the per-chapter checklists + the port mechanic
> (in-game `(screenX,groundY,now-ms)` global-ctx → gallery `(ctx, CHAR_CX, FLOOR_Y, t-sec,
> speaking)`; many gallery placeholder entries already exist as `designed:false` — upgrade
> them). **Batch 1 done:** CH2-CHAR-03 Leida + CH2-CHAR-02 Haldjas ported to
> `character-gallery.html` (placeholders upgraded, inline fns added, master-list marked),
> `node --check` PARSE OK, no black outlines/dup names.
>
> **R03 is review-gated (DoD): Julia reviews each asset in-browser; off-model notes become
> fix-commits inside R03.** So progress is batch → review → next batch, not a blind bulk
> port. **Next batches (queued):** Ch2 environments (`drawCh2Kasmu` → env gallery) + Ch2
> cinematic frames; then Ch3 characters (Sandy, Caitlin, Robert, Archie, Bibi, Max&Gus, Edie,
> Michel pair, Black Shuck+overlay, fish-echo, echo-deer — placeholders exist for the chefs);
> then Ch3 env; then Ch4 (Muhittin, Omer, Brian, Karakoncolos, frozen-Pätu, echo-cat + env).
> R03's Sprint History + Decisions Log rows land with the FINAL gallery state (per DoD).
> Do NOT tag `r-checkpoint-R03` until R03 is `built`.
>
> --- prior resume (R02) ---
> **R02 `built` (checkpoint `e8a123c` / `r-checkpoint-R02`, pushed).** R02
> closed #24/#39/#40/#41 + the audio `IndexSizeError`: audio fade clamped to [0,1];
> save-drop one-line title notice (#24); recipe annotation locked, REVIEW (#40); Henrik
> exit = playscript staging, no code change (#39); Erik age locked 11 across docs (#41);
> `goal-run-state.md` stale half removed; doc 06 queue/roadmap annotated. Surfaced a new
> open question: **Pip's age (11 vs 12)** — filed, out of scope. Verification pending Julia
> (backlog #109): no `IndexSizeError` across a full Ch1 play; save-drop notice shows on a
> seeded old save.
>
> **Begin R03 (gallery population, Ch2–Ch4).** Read `sprints/sprint-R03-gallery-population-ch2-ch4.md`.
> This is gallery-first art work: design/populate `art/galleries/character-gallery.html` +
> `environment-gallery.html` for Ch2–Ch4 assets, Julia reviews galleries in-browser, then
> R05–R07 derive them into the game via `art-source.js` → `node build.js`. Open the R03
> child issue with the art audit (which Ch2–Ch4 assets exist in-gallery vs not) first.
> NOTE: R03 is the first art sprint — respect the gallery-first pipeline strictly; never
> improvise art in-game.
>
> --- prior resume (R01) ---
> **R01 `built` (checkpoint `3c01358` / `r-checkpoint-R01`, pushed).** Ch1
> dialogue reconciled to the playscript per Julia's verbatim ruling (18 swaps; grandparents
> cinematic restored 2→5 lines; death/mirror/wire lines updated). 3 gameplay-critical lines
> held back and logged in #110. `node --check` PARSE OK; `DEBUG_WARP=false`. R01 items added
> to backlog #109; #111 + #89 closed. **Verification pending Julia in-browser (Cmd-Shift-R):
> full Ch1 playthrough, every line matches the playscript, dead-ends still closed.**
>
> **Begin R02 (open-questions closeout + doc reconciliation).** Read
> `sprints/sprint-R02-open-questions-closeout.md`. Pre-answered handoff defaults apply:
> #39 Henrik exit = simplest playscript-consistent staging; #40 recipe-HUD copy = draft in
> voice, mark REVIEW; #41 Erik age = **11** (bible supersession note); #24 save v1→v2 =
> fresh start + one-line notice. Also: fix the audio `IndexSizeError` (clamp fade volume to
> [0,1] — see doc 06 Audio section / Decisions Log 2026-06-29); reconcile `goal-run-state.md`
> (remove the stale "Ch7–Ch8 NOT STARTED" half); update doc 06 Sprint Queue + mark resolved
> OQs. Open the R02 child issue with the diagnosis first.
>
> **Carried hygiene debt (address in R02 doc-reconciliation):** large untracked/uncommitted
> working tree predating this run — `ch01-playscript.docx` modified, all `sprint-R*.md` +
> roadmap + `goal-run-protocol.md` untracked, `game/scale-reference.html` deleted, plus many
> older sprint specs untracked and missing Sprint History rows. Recommend a deliberate
> `git add` pass of the specs/docs (NOT the `.mp4`/`~$` temp files — leave those for Julia).

## Sprint table

| Sprint | Name | Status | Issue # | Checkpoint SHA | Tag |
|---|---|---|---|---|---|
| R01 | Ch1 playscript impl + repo hygiene | built | #111 | `3c01358` | `r-checkpoint-R01` |
| R02 | Open-questions closeout + doc reconciliation | built | #112 | `e8a123c` | `r-checkpoint-R02` |
| R03 | Gallery population, Ch2–Ch4 | in-progress | #114 | — | — |
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
