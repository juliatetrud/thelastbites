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

> **R01 in progress — Stage 0 (hygiene) complete.** 16 stacked pre-run commits pushed
> clean; `DEBUG_WARP` flipped to `false` before the push (live-deploy safety). Next:
> R01 Stage 1 — scene-by-scene diff of `ch01-playscript.docx` vs. current Ch1 code,
> written into the R01 child issue before any edit.

## Sprint table

| Sprint | Name | Status | Issue # | Checkpoint SHA | Tag |
|---|---|---|---|---|---|
| R01 | Ch1 playscript impl + repo hygiene | in-progress | — | — | — |
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
