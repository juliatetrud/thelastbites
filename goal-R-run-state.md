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

> **R03 `built` + closed (`32d3f13` / `r-checkpoint-R03`, #114 closed on Julia's "close out"
> instruction). NEXT = R04 (gallery population, Ch5–Ch8).** All Ch2–Ch4 gallery cells done
> (characters + 13 environments); frozen-Pätu reworked; master-list marked; Sprint History +
> Decisions Log + 08-char-ref gallery-canonical note landed. R05–R07 will derive R03's
> gallery cells into the game.
>
> **R05 `built` (Ch2 art reconciliation; Pätu migration `5685fa6` + close-out). NEXT = R06
> (Ch3 art reconciliation).** Phase-2 mode: reviews are a BACKLOG, not a gate — checkpoint
> each sprint `built`, add Julia's in-browser items to the visual backlog (#109), chain to the
> next. R05: Pätu → shared canonical `drawPatu(ctx,t)` in `art-source.js` (game via
> `renderPatu`, gallery via translate; 19 call sites rewritten; `build.js` re-inlined).
> Everything else Ch2 on-doctrine. Non-blocking flags (#110): echo-mice gallery CH2-CHAR-04
> still designed:false; `ch2-build-audit.md` absent.
>
> **Begin R06 — Ch3 art reconciliation (`sprints/sprint-R06-ch3-art-reconciliation.md`).**
> Same derive-into-game pattern: audit Ch3 in-game art vs the R03 gallery; migrate off-model.
> Ch3 has many characters (Sandy, Caitlin, Robert, Archie, Bibi, Max&Gus, Edie, Michel pair,
> Black Shuck, fish-echo, echo-deer) — the gallery was ported-from-game in R03, so game≈gallery
> already (verify, minimal). Shared recurring characters → migrate to `art-source.js` like Pätu;
> chapter-only → derive in place. Audit first (child issue), one commit per group, `node
> build.js`+`node --check`, DEBUG_WARP false, checkpoint `r-checkpoint-R06`, backlog Ch3 items.
>
> --- prior resume (R04→R05 start) ---
> **R04 `built` + closed (`0a0cb74` / `r-checkpoint-R04`, #115 closed on Julia's instruction).
> Galleries COMPLETE for the whole game (Ch1–Ch8). R05 (Ch2 art reconciliation) began.**
> Master-list marked (13 Ch5–Ch8 char IDs), 08-char-ref note extended to Ch2–Ch8, Sprint
> History + Decisions Log landed (Pip-shadow approved; Ch8 grandparents namespaced permanent
> canon; Boitatá cell framing flagged non-blocking).
>
> **Begin R05 — Ch2 art reconciliation (`sprints/sprint-R05-ch2-art-reconciliation.md`).**
> DIFFERENT sprint type: *derive* the approved Ch2 gallery draw functions verbatim INTO
> `game/index.html` (replacing GOAL-1's off-model in-game art), via the `art-source.js` →
> `node build.js` pipeline; then Ch2 gets its FIRST real in-browser verification (review-gated,
> Ch2 block of #78). **Audit before any edit** — list every Ch2 asset on/off-model vs its
> gallery function; if an asset has no gallery source, STOP + flag. Art swaps must NOT change
> collision boxes / trigger zones / beat order. Verify Pätu uses the shared `drawPatu`, not a
> local copy. NOTE: Ch2 characters (Leida/Haldjas) — the gallery was *ported from* the in-game
> code in R03, so game≈gallery already (reconciliation may be minimal); the env-cell (200×113
> preview) is NOT the game room render, so env reconciliation is a doctrine check on the game's
> room code, not a verbatim swap. Open the R05 child issue with the Ch2 audit first.
>
> **R05 STARTED — Ch2 audit done + issue #116.** Findings: **Pätu OFF** — game `drawPatu`
> (`:14547`) is a LOCAL copy (translate-based, hardcoded hex) differing from the gallery
> canonical (`C.cat*` tokens); `art-source.js` holds only `drawPip`. **Echo-mouse OFF** — 1
> black outline. **Leida/Haldjas ON** (match gallery). **Ch2 rooms ON** (0 black outlines).
> Cinematics (`drawObjectMemoryPanCinematic :14778`, `drawLunchboxTasteCinematic :14832`) +
> sincerity overlay = doctrine spot-check pending. **Next:** (1) reconcile Pätu to shared
> canonical — verify/add `C.cat*` tokens in the game, then move `drawPatu` into the
> `@@ART-SOURCE` region (`:6779–6984`) so `build.js` inlines it, OR replace the local body
> with the gallery canonical; (2) fix echo-mouse black outline; (3) doctrine spot-check
> cinematics/puzzle. Art swaps must NOT change collision/trigger/beat. `node build.js` (if
> art-source touched) → `node --check` → Ch2 plays end-to-end → Julia's in-browser #78 Ch2
> block. Review-gated; do NOT tag `r-checkpoint-R05` until built.
>
> **Method (same as R03):** character wrapper `function drawX(ctx,_CX,_FLOOR,_T,_SP){ const
> sx=_CX, sy=_FLOOR, groundY=_FLOOR, now=_T*1000, speaking=_SP, looking=_SP, idx=0; <body
> verbatim> }` + upgrade the placeholder entry (designed:true + drawFn); env cells are
> purpose-built 200×113 illustrations + `DRAW_FNS` registry entry. Extract each fn first and
> confirm self-contained (no external helper/`C.*` deps) before porting. `node --check` per
> group. **R04-specific care:** Erik age 11 (#41); **Ch8 grandparents stay namespaced**
> (`drawBabciaStanding`/`drawDziadekStanding` — never a bare `drawBabcia`); Mamlambo in its
> porthole framing; **Pip-shadow (Ch8) = emotional climax, most care — flag if register feels
> wrong rather than iterate blind.** Ch5 characters are the natural first batch.
>
> --- prior resume (R03) ---
> **R03 — characters DONE + approved (frozen-Pätu reworked), Ch2 environments
> DONE; Ch3/Ch4 environments + cinematic frames REMAIN.** Julia reviewed the character
> cells: **approved all except frozen-Pätu**, which was a diagnosed defect (GOAL-1
> hand-built a blue-blob cat, not `drawPatu`+ice) — reworked as `drawFrozenPatuCh4`
> (`681a1f9`, canonical `drawPatu` verbatim + ice on top), re-flagged REWORKED in #114.
> **Ch2 environments authored** (`6c1ac18`): CH2-ROOM-01 lower decks, CH2-ROOM-02 cottage,
> CH2-BG-01 Käsmu village — env cells are purpose-built 200×113 illustrations (NOT scaled
> game renders), composed on-doctrine; wired via `DRAW_FNS` registry + `designed:true`.
>
> **ALL Ch2–Ch4 environments DONE** (`e8805a1`, 13 ROOM/BG cells; env designed:true = 43):
> Ch2 lower decks/cottage/village; Ch3 lower decks, Sandy's kitchen, dockyard, Bevois St,
> Edie's shop; Ch4 cat alley, Muhittin's kitchen, harbor, frozen square, walnut orchard.
> All wired via `DRAW_FNS` + `designed:true`, on-doctrine, node --check PARSE OK. Awaiting
> Julia's env review (#114), together with frozen-Pätu re-review.
>
> **REMAINING for R03 (all at R03 CLOSE — after Julia approves env + frozen-Pätu):**
> 1. **Master-list per-ID marking**: mark designed the Ch3/Ch4 character IDs + all Ch2–Ch4
>    ROOM/BG IDs in `art-asset-master-list.md` (only CH2-CHAR-02/03 marked so far).
> 2. **`08-character-reference-sheets.md`**: add "gallery canonical" notes per ported character.
> 3. **doc 06 Sprint History row** for R03 (the DoD wants it with the FINAL gallery state).
> 4. Then flip R03 → `built`, tag `r-checkpoint-R03`.
>
> **Cinematic-frame decision (logged #110):** only `muhammara-orchard` = CH4-BG-03 (done);
> the ID-less taste-memory frames stay inline cinematic renders, not gallery cells.
>
> **Env-cell method (established):** `drawCh#XxxCell(ctx, t)` (200×113, `FY=100`, helpers
> `_cellBg`/`_r`/`_wallPanels`/`_lbl`, palette `P`) + `DRAW_FNS` registry entry by asset ID
> + flip `designed:true`. No black outlines (dark palette colours, never `#000`/`stroke()`);
> warm interior light via glows. Do NOT tag `r-checkpoint-R03` until R03 is `built` (#114).
>
> **Characters DONE in `character-gallery.html` (all node --check PARSE OK, no black outlines,
> no dup names, all drawFn refs resolve, 34 designed:true):**
> - Ch2 (`17ebe29`): Leida, Haldjas.
> - Ch3 (`567599b`): Sandy, Caitlin, Robert, Archie, Bibi, Max&Gus (pair in both cells), Edie,
>   Michel pair (both cells), Black Shuck, fish-echo (cod; haddock/plaice = idx-variants, left
>   placeholder), echo-deer. `drawShuckPuzzleOverlay` intentionally NOT a cell (mechanic render).
> - Ch4 (`567599b`): Muhittin, Omer, Brian, Karakoncolos, frozen-Pätu (new `patu-frozen`
>   entry), echo-cat.
>
> **REMAINING for R03 (next batches):**
> 1. **Environments → `environment-gallery.html`** (different gallery, cell fns like
>    `drawXxxCell`; in-game sources are room-scale: `drawCh2Kasmu`, `drawCh4FrozenSquare`,
>    `drawHenrikFrozen` + Ch3 dockyard/Bevois/Sandy-kitchen + Ch2 village/cottage + Ch4 cat
>    alley/Muhittin kitchen). Room renders need adaptation to the cell format — more involved
>    than the character wrapper.
> 2. **Cinematic frames** (object-memory-pan, lunchbox-taste, curry-taste-memory,
>    muhammara-orchard).
> 3. **Master-list per-ID marking** (Ch3/Ch4 designed) + `08-char-ref` "gallery canonical"
>    notes + doc 06 **Sprint History row + Decisions Log** — all land with the FINAL R03 state.
> Do NOT tag `r-checkpoint-R03` until R03 is `built`. R03 remains review-gated (#114).
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
| R03 | Gallery population, Ch2–Ch4 | built | #114 | `32d3f13` | `r-checkpoint-R03` |
| R04 | Gallery population, Ch5–Ch8 | built | #115 | `0a0cb74` | `r-checkpoint-R04` |
| R05 | Ch2 art reconciliation | built | #116 | `c69d0d2` | `r-checkpoint-R05` |
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
