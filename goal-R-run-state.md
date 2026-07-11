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
> **R15 `built` + closed (`a63a0b9` code / `b5a42b7` docs / `r-checkpoint-R15`, #126 closed).
> NEXT = R16 (recipe-site integration + credits).** applySave hardened (guards + try/catch
> backstop) against well-formed-but-wrong-shape saves; scripted 7-payload corrupt battery →
> no throw; save-coverage matrix in #126; round-trip confirmed field-by-field; R12/R13 puzzle
> state transient (no schema drift); #24 drop-notice intact. In-browser reload-per-chapter →
> backlog #109. **R16:** recipe URLs = homepage placeholders in a ONE-table edit, logged
> prominently; add credits. Audit first (child issue). Then R17 mobile, R18 release → GO-LIVE
> GATE (STOP for Julia).
>
> --- prior (R14) ---
> **R14 `built` — audio pass done (2 reserved sounds + per-chapter ambient; UI SFX global).**
> Composer/real-music kept post-release.
>
> --- prior (R13) ---
> **R13 `built` — Ch8 finale mechanics done (Phase 1 Pong + Phase 3 trace built, Phase 2
> riddle verified). NEXT = R14 (audio + music pass).** All 3 override phases kinetic/verified;
> 'It's not fair.' + post-override + final line byte-identical; ch8State additive. Feel is
> Julia's playtest (#109). **ALL MECHANICS DONE (R12+R13).** R14–R18 are the polish/release
> run: **R14** audio+music (read `sprint-R14-audio-and-music-pass.md`; also the `IndexSizeError`
> was already fixed in R02); **R15** save hardening; **R16** recipe-site integration + credits
> (recipe URLs = homepage placeholders, one-table swap, log prominently); **R17** mobile;
> **R18** release pre-flight → GO-LIVE GATE (STOP for Julia's fresh-save playthrough + v1.0.0).
>
> --- prior (R13 audit) ---
> **R13 STARTED — Ch8 finale audit (#124).** All 3 override phases
> are dialogue-choice stubs (`runPhase1/2/3`, `:22129/22324/22429`). **R13 spec is uniquely
> feel-first: the ending's feel outranks the mechanics checklist; STOP+flag if kinetic fights
> pacing; Julia decides kinetic-vs-stub per phase.** Plus a real design question surfaced in
> #124: **Phase 1's paired-memory picker** wants a collected-paired-memory inventory that isn't
> built (warm answers are inline in `shadowThrows`; memories are narrative flags). Defaults
> (if 'build with your defaults'): Phase 1 = reuse R12 `giftMemoryFromJournal` per round with
> the warm answer + 1–2 cross-chapter distractors (pick the right warmth; gentle miss/retry;
> NOT reflex); Phase 2 = verified (keep conversational, light polish); Phase 3 = arrow-key
> trace over a predefined path (generous tolerance). **'It's not fair.' stays a single choice**
> (design call #4). Post-override content byte-identical. `ch8State` additive-only. Build on
> Julia's word or 'defaults', then playtest for FEEL.
> **After R13:** R14 audio, R15 save, R16 recipe+credits, R17 mobile, R18 release → go-live
> gate (STOP for Julia's fresh-save playthrough + v1.0.0 tag).
>
> --- prior (R12 built) ---
> **R12 `built` — ALL kinetic mechanics done (Ch2–Ch7).**
> Built: echo-rat drain, journal-gift UI (reusable), Ch4 real-time candle puzzle, Ch7 bucket-
> douse, Ch4 cat-alley float beat, Ch4 matches item; Brussels-bag locked narrative; Ch2/Ch3
> verified real. All dt-capped/pause-safe/D-pad, schema-safe. Feel/difficulty = Julia's
> playtest (backlog); design calls logged #110. **R13** = Ch8 finale override phases
> (Pong / riddle / draw per `sprint-R13-kinetic-mechanics-finale.md`) + the paired-memory
> reunion (reuse `giftMemoryFromJournal` from R12). Audit first (child issue). Then R14 audio,
> R15 save, R16 recipe+credits, R17 mobile, R18 release → go-live gate (STOP for Julia).
>
> --- prior (R12 partial) ---
> **R12 — 3 items done (echo-rat `6665c8c`, journal-UI `9165630`, Brussels-bag
> `7901eb4`); 3 real-time/traversal builds remain.** (R05–R11 all built.) **Done:** Ch5
> echo-rat drain; **Ch5 memory-gifting → reusable `giftMemoryFromJournal` selection** (journal-
> framed, choice-UI based, reusable for Ch8 finale; outcome verbatim in `sendIrisMemory`);
> Brussels-bag → permanently-narrative. Ch2 sincerity + Ch3 Shuck verified real.
>
> **R12 REMAINING (build carefully, playtest-gated, one commit + #110 log each):**
> 1. **Ch4 candle puzzle → real-time 2D movement** (`runCandlePuzzleRound` `:17054`, resolves
> at round 3 → `resolveKarakoncolos`). ⚠️ Genuine DESIGN complexity: its 3 cleverness-
> responses (position-behind-cover / wait-for-drift / cup-and-stand) don't all map to
> position — the one R12 mechanic where a quick Julia design-word is genuinely worth it
> (default in #123: position vs breath-telegraph; relight+retry; dt-cap, pause-safe, gentle).
> 2. **Ch7 three-fires → real douse** (dialogue-only `:20748` → bucket→fill→douse 3 fires vs
> match timer; existing systems).
> 3. **Ch4 cat-alley float obstacle** (`drawCh4CatAlley` `:17784`, elevated cats but no
> obstacle → float-gated barrier) + **Ch4 matches inventory** (find Ch4 acquisition point;
> candle already an item).
> Guardrails: preserve narrative verb; gentle never cruel; D-pad+space; `ch4/ch5State` GAIN-
> only (R15); dt-cap real-time. After all: doc-06 rows, checkpoint `r-checkpoint-R12`,
> backlog each. Then R13 (Ch8 finale mechanics), R14 audio, R15 save, R16 recipe+credits,
> R17 mobile, R18 release → go-live gate.
>
> --- prior (R05–R11 art complete; R12 echo-rat+Brussels) ---
> **R12 — echo-rat drain + Brussels-bag done.** (R05–R11 all built: art reconciliation complete; derived-pending
> pinned #109.) **R12 done so far:** Ch5 echo-rat strength drain (existing systems; float-to-
> avoid; runtime-only, no schema change); Brussels-bag → permanently-narrative (locked, #110).
> Ch2 sincerity + Ch3 Shuck verified real (no upgrade).
>
> **R12 REMAINING — 4 new-interaction-system builds (defaults from #123; build carefully,
> playtest-gated, one commit + #110 log each):**
> 1. **Ch5 memory-gifting → journal-traversal UI** (HIGH value — reusable for Ch8 finale):
> `triggerMemoryGifting` (`:18218`) is a flat choice → open journal, arrow-cursor over
> collected memories, space sends the valid one. Study `renderNotebookPage`/notebook input.
> 2. **Ch4 candle puzzle → real-time 2D movement**: `runCandlePuzzleRound` (`:17028`) is a
> 3-round dialogue-choice stub → small real-time arena (arrows carry candle; shield vs the
> Karakoncolos breath telegraph; lose=relight+retry; dt-capped, pause-safe, gentle).
> 3. **Ch7 three-fires → real douse sequence**: currently dialogue-only (`:20748`) → pick up
> bucket, fill at river, douse 3 fires before the match timer.
> 4. **Ch4 cat-alley float obstacle**: `drawCh4CatAlley` (`:17784`) has elevated echo-cats but
> no obstacle → add a float-gated barrier (float over to follow the cats; float unlocked by
> Ch4). **Ch4 matches inventory:** add matches as a visible item (find the Ch4 acquisition
> point; candle already an item).
> **Guardrails:** preserve narrative verb; gentle never cruel; D-pad+space only; `ch4State`/
> `ch5State` may GAIN fields, never lose/rename (R15 schema stability); dt-cap real-time.
> After all built: doc-06 rows, checkpoint `r-checkpoint-R12`, backlog each. Then R13
> (Ch8 finale mechanics), R14 audio, R15 save, R16 recipe+credits, R17 mobile, R18 release.
>
> --- prior (R05–R11 art complete) ---
> **R05–R11 ALL `built` (art reconciliation complete). R12 audit #123.** Every Ch2–Ch8 asset derived/verified into the game,
> on-doctrine; derived-pending assets (frozen-Pätu, Ch5–Ch8 cells, Pip-shadow feel-verdict)
> pinned atop backlog #109. R05 also migrated Pätu to shared `art-source.js` `drawPatu`.
>
> **R12 (kinetic mechanics, Ch2–Ch7) — AUDIT in #123.** Stubbed → upgrade: (1) **Ch4 candle
> puzzle** = 3-round dialogue-choice → real-time 2D movement [NEW engine cap — spec wants
> Julia's nod; design note in #123]; (2) **Ch5 memory-gifting** = flat choice → journal-
> traversal UI [NEW UI, reusable in Ch8 — nod requested]; (3) **echo-rat drain** absent →
> build (existing strength meter); (4) **Ch4 cat-alley float beat** (existing float sys);
> (5) Ch4 inventory (candle exists, matches hookup); (6) Ch7 three-fires audit. VERIFIED
> (no upgrade): Ch2 sincerity, Ch3 Shuck conveyor. DECISION: Brussels-bag float-grab → build
> or lock permanently-narrative (default: narrative).
> **Next-session plan:** build the non-engine beats (echo-rat drain, alley float, inventory,
> Ch7) directly; build the 2 engine mechanics per the #123 design notes (conservative, log to
> #110) unless Julia weighs in; Brussels-bag → permanently-narrative unless she confirms. One
> commit + design note per mechanic; `node build.js`+`node --check`; DEBUG_WARP false;
> checkpoint `r-checkpoint-R12`; backlog each mechanic. Then R13 (Ch8 finale mechanics:
> Pong/riddle/draw override phases), R14 audio, R15 save, R16 recipe+credits, R17 mobile,
> R18 release pre-flight → go-live gate (STOP for Julia).
>
> --- prior resume (R11) ---
> **R11 `built` (Ch8 — VERIFY-ONLY; #122). ALL ART DONE (R05–R11). NEXT = R12 (kinetic mechanics — port chapters).** Ch8 on-doctrine, grandparents namespaced, Pip-shadow intact (feel-verdict pinned #109). R12 is a MECHANICS sprint (not art): port/upgrade the kinetic puzzle mechanics for Ch2–Ch7 per spec — read `sprints/sprint-R12-kinetic-mechanics-ports.md`, audit first.
>
> --- prior resume (R10→R11) ---
> **R10 `built` (Ch7 — VERIFY-ONLY; #121). NEXT = R11 (Ch8).** Ch7 on-doctrine, Boitatá full-threat, shared-Pätu confirmed, Erik age 11; Ch7 cells pinned #109.
>
> --- prior resume (R09→R10) ---
> **R09 `built` (Ch6 — VERIFY-ONLY; #120). NEXT = R10 (Ch7).** Ch6 on-doctrine, Pocong confirmed, Erik-photo dialogue-only (non-blocking); Ch6 cells pinned #109.
>
> --- prior resume (R08→R09) ---
> **R08 `built` (Ch5 art reconciliation — VERIFY-ONLY; #119). NEXT = R09 (Ch6).** Ch5 on-doctrine, game≡gallery, memoryGifting/switchblade intact; Ch5 cells pinned DERIVED PENDING #109.
>
> --- prior resume (R07→R08) ---
> **R07 `built` (Ch4 art reconciliation; frozen-Pätu derived `a00492c`). NEXT = R08 (Ch5
> art reconciliation).** Ch4 on-doctrine; frozen-Pätu derived into game (drawPatu+ice, replaced
> blue-blob) — DERIVED PENDING GALLERY RE-APPROVAL, pinned atop backlog #109. **R08 (Ch5):**
> audit Iris/Mamlambo/Johannes/echo-rat + rooms; Iris/Mamlambo may need care (translucency,
> porthole framing). Per Phase-2, Ch5–Ch8 derived cells (incl. Pip-shadow in R11) go under the
> DERIVED-PENDING section of #109. Audit first (child issue), checkpoint r-checkpoint-R08.
>
> --- prior resume (R06→R07) ---
> **R06 `built` (Ch3 art reconciliation — VERIFY-ONLY, no edits; #117). NEXT = R07 (Ch4
> art reconciliation).** Ch3 in-game art already on-doctrine (0 black outlines) and ≡ gallery
> (ported from game in R03); Edie→kitchen gate low walk-past risk, no change. **R07 (Ch4):**
> same audit — Ch4 chars (Muhittin/Omer/Brian/Karakoncolos/echo-cat) on-doctrine check; the
> **frozen-Pätu** rework must be DERIVED into the game (drawFrozenPatuCh4 = drawPatu+ice) — and
> per Phase-2, pin frozen-Pätu under a 'DERIVED PENDING GALLERY RE-APPROVAL' section at the top
> of the visual backlog #109. Audit first (child issue), checkpoint r-checkpoint-R07.
>
> --- prior resume (R05→R06) ---
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
| R06 | Ch3 art reconciliation | built | #117 | `3ac44e0` | `r-checkpoint-R06` |
| R07 | Ch4 art reconciliation | built | #118 | `0b70cc9` | `r-checkpoint-R07` |
| R08 | Ch5 art reconciliation | built | #119 | `728ada9` | `r-checkpoint-R08` |
| R09 | Ch6 art reconciliation | built | #120 | `fec2611` | `r-checkpoint-R09` |
| R10 | Ch7 art reconciliation | built | #121 | `9d160b8` | `r-checkpoint-R10` |
| R11 | Ch8 art reconciliation | built | #122 | `dd26737` | `r-checkpoint-R11` |
| R12 | Kinetic mechanics — port chapters | built | #123 | `557fb85` | `r-checkpoint-R12` |
| R13 | Kinetic mechanics — Ch8 finale | built | #124 | `455b834` | `r-checkpoint-R13` |
| R14 | Audio + music pass | built | #125 | `cf3505e` | `r-checkpoint-R14` |
| R15 | Save + persistence hardening | built | #126 | `a63a0b9`/`b5a42b7` | `r-checkpoint-R15` |
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
