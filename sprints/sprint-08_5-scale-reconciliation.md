# Sprint 08.5: Scale reconciliation, sparkle redesign, cinematic scale spec change

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

Specifically, every sprint is responsible for:

1. **Cross-references.** When a new doc is created, every related doc gets a pointer to it. When a doc is renamed or restructured, all inbound references are updated. No broken or stale cross-references after a sprint lands.
2. **Decisions Log entries.** Any decision settled in the sprint gets a row in the Decisions Log in `06-roadmap-and-open-questions.md`. The Decisions Log is the project's memory; if a decision lives only in a commit message or chat history, it doesn't exist.
3. **Discrepancies surfaced, not silently resolved.** If a sprint discovers a contradiction between docs (e.g. doc 03 says a component is X px but the prototype renders it at Y px), the contradiction is *flagged* in the sprint's output — not silently patched in either direction. The user resolves the discrepancy in a follow-up sprint or by direct instruction. The principle: catalogue first, decide second, never both in the same pass without review.
4. **Open-questions hygiene.** If a sprint answers an open question listed in any doc, the resolved question is removed from the open list and replaced with a Decisions Log entry pointing to the resolution. If a sprint surfaces a new open question, it's added to the open list explicitly.

This is the standing pattern. Each sprint spec's "Files to create or modify" and "Definition of done" sections call out the specific doc hygiene work for that sprint.

---

## Goal

A focused cleanup pass that resolves everything Sprint 08 surfaced: scale-anchor adjustments per user review, in-game sprite reconciliation to new canonical sizes, sparkle indicator behavioral redesign, and the cinematic-scale spec change to use camera zoom instead of allowing inflated character sizes. Single coherent commit; the game's scale system becomes consistent and the docs match what's in the code.

## Definition of done

- **Canonical scale numbers updated** in `design-docs/03-art-and-aesthetic.md` Scale Anchor table and `design-docs/09-component-scale-reference.md` per the user's review (see "Implementation notes" — Scale Locks table).
- **`game/scale-reference.html`** updated to render every adjusted component at the new canonical size. The visual chart reflects the locked values, not the prior ones.
- **In-game sprites in `game/index.html`** reconciled to the new canonical sizes — Pip, Babcia, Dziadek, and the passenger all bumped to canonical scale. Cinematic-Babcia and cinematic-Dziadek are *not* bumped (per the cinematic-scale spec change — they stay at their canonical-adult heights, just framed closer by camera zoom).
- **Sparkle indicator redesigned** per the new behavior: brighter overall, aura around the object (not just a point of light on top of it), distance-driven intensity that grows as Pip approaches the object and peaks when he's directly on it. Tight-aura range (~30 px radius from the object center).
- **Cinematic scale spec rewritten** in `design-docs/03-art-and-aesthetic.md`. The "0.75–0.90 cinematic allowance" language is removed. A new convention is documented: cinematic closeness is achieved via **camera zoom on the canonical-scale room**, not via redrawing characters at inflated sizes.
- **Discrepancies #1–#12 from Sprint 08 closed** — each one either resolved by this sprint's edits or moved to a new follow-up issue with explicit rationale.
- **Doc-hygiene deliverables:**
  - Scale Anchor table in doc 03 reflects the new locked numbers.
  - Doc 09's tables and the "Discrepancies found" section both updated. Resolved discrepancies removed; any new discrepancies surfaced by this sprint added.
  - Cross-references between docs 03, 08, 09, and `game/scale-reference.html` all remain valid.
  - Decisions Log entries appended to `06-roadmap-and-open-questions.md` (two entries — one for scale lock, one for sparkle redesign + cinematic spec change).
- All files committed in a single commit.

## Context from design docs

### Sprint 08 discovered 12 discrepancies

The user reviewed the visual chart at `game/scale-reference.html` and locked specific scale adjustments. Several of Sprint 08's discrepancies turn out to have been correct as-is (the *spec* was wrong, not the implementation); others remain real mismatches that need fixing.

### What the user locked, in their own words (preserved for context)

> Pip - should be a little bigger
> Adult NPC and Sandy are good size.
> Child NPC is a good size.
> Babcia and Dziadek should be the size of the Adult NPC with Babcia slightly shorter. Pätu should be a bit smaller. The capuchin is good. The Pocong should be bigger. Iris should be smaller. The black shuck should be a little bigger. The Haldjas should be a little bigger.
> Dialog box is good. The sparkle indicator should be a bit brighter (it should have an aura around the object in addition to the bright light and it should glow as Pip approaches the object instead of just shining when he's directly underneath). The journal looks good for now. The echoes are a good size.

### What the user also locked in design conversation

> I don't think cinematic characters should be a different size, though perhaps there's like a zooming in effect? […] keep the room rendered at canonical scale, then translate and scale the canvas viewport when entering a cinematic.

This means the existing doc 03 line *"cinematic register is allowed to draw larger because of the closer framing, so adult cinematic figures can reach 0.75–0.90 door-heights (~85-100px)"* is **superseded**. The new convention: one canonical character scale across the game; cinematic closeness comes from camera zoom.

## Implementation notes

### 1. Scale Locks table (the new canonical numbers)

These replace the relevant rows in doc 03's Scale Anchor table and doc 09's catalogue. Items not listed here keep their existing Sprint 08 values.

| Element | Old canonical | New canonical | Pixel range @ 480×270 |
|---|---|---|---|
| **Pip (ghost form)** | 0.30–0.35 | **0.35–0.40** | 38–44 px tall |
| **Pätu** | 0.20–0.25 | **0.18–0.22** | 20–24 px tall |
| **Babcia** | 0.55–0.65 (Adult NPC band) | **~0.55** (lower end of Adult NPC band; visibly shorter than Henrik/Dziadek) | ~60 px tall |
| **Dziadek** | 0.55–0.65 | **0.60–0.65** | 66–72 px tall |
| **Iris** | 0.40–0.45 (Child NPC band) | **0.35–0.40** | 38–44 px tall (small Edwardian girl) |
| **Pocong** | 0.50–0.65 | **0.70–0.85** | 77–94 px tall (vertical, looming) |
| **Black Shuck** | 0.30–0.40 | **0.40–0.50** | 44–55 px tall at the shoulder |
| **Haldjas (sparkle cluster)** | (no fixed size, ~30–40 px spread) | **0.50–0.65 spread** | ~55–72 px diameter when fully materialized |
| Adult NPC band (Henrik, the passenger, etc.) | 0.55–0.65 | unchanged | 60–72 px |
| Sandy | 0.65–0.70 | unchanged | 72–77 px (he's the *very tall* outlier) |
| Child NPC band | 0.40–0.45 | unchanged | 44–50 px |
| Capuchin | 0.15–0.20 | unchanged | 16–22 px |
| Echo-creatures | 0.06–0.14 | unchanged | 7–16 px |

### 2. Resolving the original 12 discrepancies

Each discrepancy from Sprint 08's report gets explicitly resolved:

| # | Discrepancy | Resolution this sprint |
|---|---|---|
| 1 | Pip 24 px in-game vs 32–38 px canonical | Bump Pip in `game/index.html` to **new** canonical 38–44 px. |
| 2 | Passenger 28 px in-game vs 60–72 canonical | Bump passenger in `game/index.html` to 60–66 px. |
| 3 | Babcia gameplay ~25 px vs 44+ canonical | Bump Babcia in `game/index.html` to ~60 px (lower end of new Adult NPC band). |
| 4 | Dziadek gameplay ~31 px vs 60–72 canonical | Bump Dziadek in `game/index.html` to 66–72 px. |
| 5 | Babcia cinematic ~28 px vs 85–100 cinematic-canonical | **Spec was wrong.** Cinematic canonical is now the same as gameplay canonical (~60 px); cinematic-Babcia stays at her current size — the framing zooms in, she doesn't grow. Discrepancy closed without code change. |
| 6 | Dziadek cinematic ~44 px vs 85–100 cinematic-canonical | Same as #5. Discrepancy closed without code change to the cinematic itself. |
| 7 | Asset list says "24×40 px" for adult NPCs | Update `art-asset-list.md` adult NPC prompt entries to specify 60–72 px (door-fraction 0.55–0.65). |
| 8 | Asset list says "16×24 px" for Pip | Update Pip's prompt entries in `art-asset-list.md` to specify 38–44 px (new canonical). |
| 9 | Echo-fish 28–32 px in asset list vs 7–16 canonical | Decide: are echo-fish actually larger than other echo-creatures (justified by school-of-fish drift behavior)? **Propose:** keep echo-fish at the asset-list size (28–32 px) and add an exception note: *"Echo-fish render larger than other echo-creatures because they drift visibly in mid-air rather than skittering at floor level."* Update doc 09 echo-creatures section accordingly. Flag for user confirmation. |
| 10 | Echo-deer 44×40 px in asset list vs 7–16 canonical | Same as #9 — echo-deer are larger because they're visibly crossing streets, not background skitter. Propose exception note. Flag for user confirmation. |
| 11 | Echo-cats ~24 px in asset list vs 7–16 canonical | Echo-cats are visibly cats, not skittering pests. Same proposal — add exception note for the "visible echo-creatures" group (fish, deer, cats) that render at sprite-NPC-small scale rather than echo-tiny scale. |
| 12 | Iris listed as Adult NPC in doc 03 Scale Anchor table | Move Iris to the **Child NPC** row in doc 03's table (and confirm she's already correctly described in doc 08 as a child ghost — she is). Update doc 03 to match. |

### 3. Sparkle indicator redesign

The current sparkle in `game/index.html` is a particle that appears *on the object* when Pip is close enough to interact. The redesign:

**New behavior:**
- **Always-on object aura.** Every interactable object gets a faint warm-amber aura at all times. Very subtle when Pip is far. The aura is rendered *around* the object's bounding box, not inside it — a soft outer glow.
- **Distance-driven intensity.** As Pip approaches the object within ~30 px (the "tight aura" range you locked), the aura ramps up in brightness and density. Intensity = inverse of distance, clamped at the 30 px radius.
- **Sparkle particles on top of aura when close.** When Pip is within the inner ~15 px (interaction range), the existing 4-frame sparkle cycle continues — but now the sparkle sits *on top of* the bright aura. This keeps the "you can interact right now" affordance.
- **Brighter overall.** Boost the sparkle and aura alpha. Use `--warm-pool-glow` (`#ffe088`) as the inner color and `--warm-pool-amber` (`#ffc868`) as the outer, with alpha tapering from inner to outer.

**Implementation approach (pseudocode, not literal code):**

```
For each interactable object on screen:
  distance = abs(pipX - objectCenterX)
  
  if distance < 30:
    intensity = 1 - (distance / 30)       // 1.0 at center, 0.0 at edge
  else:
    intensity = 0.15                       // faint constant baseline for "always-on"
  
  // Outer aura — radial gradient around object, intensity-scaled alpha
  drawRadialAura(objectCenter, radius=30, intensity)
  
  // Inner sparkle — only when within interaction range
  if distance < 15:
    drawSparkleCycle(objectCenter, time)
```

The aura is a `radialGradient` filled rectangle around the object. The sparkle stays as the existing 4-frame loop on top. Math is straightforward; the gradient draws each frame against `objectCenter` and Pip's current x.

**Where to apply this:** in `game/index.html`, the existing `drawSparkle` function or its equivalent. Refactor it into `drawObjectAura(objectCenter, distance, time)` that combines aura + sparkle. Every place the prototype currently calls a sparkle-drawing function should call this new function instead, passing Pip's current distance.

**Update doc 09's UI section** to describe the new sparkle behavior, replacing the current single-line "4-frame sparkle near interactable objects" with the full spec.

**Add a row to doc 03** in the "Visual Registers" section (or wherever interactable affordances are documented) describing the sparkle behavior canonically. If no such row exists, add one as a new subsection: *"Interactable object affordances."*

### 4. Cinematic scale spec change

In `design-docs/03-art-and-aesthetic.md` Scale Anchor section, find and replace the line:

> **Cinematic Babcia and Dziadek:** currently ~28-42px. Bump cinematic figures proportionally — cinematic register is allowed to draw larger because of the closer framing, so adult cinematic figures can reach 0.75–0.90 door-heights (~85-100px). Cinematic Pip (when shown) stays the same as gameplay (he's the same ghost, just more pixels) — roughly 0.30–0.40 cinematic-door-heights.

Replace with:

> **Cinematic figures use the same canonical scale as gameplay figures.** A character's height in pixels does not change between gameplay and cinematic — Babcia is ~60 px in the cabin and ~60 px in the grandparents' cinematic. *Cinematic closeness is achieved via camera zoom on the canonical-scale room, not by redrawing the character at inflated size.*
>
> **Camera zoom convention (canonical for in-place cinematics):** Cinematics that take place in a space Pip is already in — Henrik in the kitchen, Babcia and Dziadek in the cabin, the mirror — use a procedural canvas viewport zoom: scale up a sub-region of the canonical 480×270 frame to fill the screen. The room and its characters are still rendered at canonical pixel size; the *viewport* changes. This preserves continuity (the character you see in gameplay is the same character you see in cinematic) and avoids the dual-scale system the prior spec implied.
>
> **Bespoke cinematic compositions:** Cinematics that take place in a *different* space (a memory of decades-ago Norway, the bottom-of-the-well dinner, the dock farewell) are composed independently. They still respect canonical character scales relative to one another — an adult is still ~0.55–0.65 door-heights, a child is still ~0.40–0.45, etc. — but the door itself may not appear in the frame.

This change closes Discrepancies #5 and #6 without touching their actual implementations.

### 5. Updating doc 09's Discrepancies section

Sprint 08 created a "Discrepancies found" section at the bottom of `09-component-scale-reference.md` with 12 entries. After this sprint, that section should be reworked to show the resolution status of each:

- 8 entries marked **resolved** (with one-line note of the resolution).
- 3 entries marked **proposal pending user confirmation** (the echo-creature exception notes for #9, #10, #11) — kept open in the section, awaiting a quick user yes/no in a future sprint or by direct instruction.
- 1 entry (#12, the Iris-as-Adult-NPC doc bug) marked **resolved** with the doc 03 fix.

If new discrepancies appear during this sprint's reconciliation work (e.g. an in-game component the user didn't mention but Claude Code discovers is off-scale), they get added to the section as new entries — *flagged, not silently fixed*, per the standing doc-hygiene rule. The exception: components the user explicitly locked in their review (Pip, Pätu, Babcia, etc.) are not "discoveries" — they're applied directly.

### 6. What this sprint does NOT do

- Does not redesign any character visually. Only adjusts pixel dimensions to canonical scale.
- Does not modify any sprite's animation logic. Bobs, idle cycles, etc. stay as they are — just scaled up.
- Does not touch cinematic compositions in `game/index.html`. The grandparents' cinematic stays as-is; the only change to *cinematic* handling is the spec language in doc 03.
- Does not add camera-zoom infrastructure to the game. The spec describes the convention; the actual camera-zoom code is built when the first zoom-style cinematic is implemented (likely Sprint 11+, when the kitchen reveal or mirror cinematic is built).
- Does not affect characters outside the locked changes — Pip, Pätu, Babcia, Dziadek, Iris, Pocong, Black Shuck, Haldjas are the only character scale adjustments. Henrik, Sandy, child NPCs, the capuchin, echo-creatures, the passenger, the janitor stay at their existing canonical numbers (with the passenger getting bumped in the in-game implementation per Discrepancy #2, but his canonical number doesn't change).
- Does not touch `art-asset-list.md`'s cinematic *descriptions* — only updates the sprite-size prompts (Pip, adult NPCs) per Discrepancies #7 and #8.

## Files to create or modify

Create: none.

Modify (substantive — primary sprint deliverables):
- `design-docs/03-art-and-aesthetic.md` — update Scale Anchor table with new canonical numbers; rewrite the cinematic-scale paragraph per camera-zoom convention; move Iris from Adult NPC to Child NPC row.
- `design-docs/09-component-scale-reference.md` — update affected rows; rework the Discrepancies section to show resolution status.
- `game/scale-reference.html` — re-render with new canonical pixel sizes.
- `game/index.html` — bump Pip, Babcia, Dziadek, the passenger to new canonical sizes; redesign sparkle indicator (aura + distance-driven intensity + brighter).
- `art-asset-list.md` — update adult NPC prompts to specify 60–72 px; update Pip prompts to specify 38–44 px.

Modify (doc hygiene):
- `design-docs/06-roadmap-and-open-questions.md` — append two Decisions Log entries (text below).

Decisions Log entries to append:

> | 2026-05-13 | **Scale anchor adjustments (Sprint 08.5).** Per user review of `game/scale-reference.html`: Pip bumped slightly (0.35–0.40 door-heights, 38–44 px); Babcia and Dziadek confirmed at Adult NPC band with Babcia at lower end (~0.55, ~60 px) and Dziadek at standard 0.60–0.65 (66–72 px); Pätu reduced slightly (0.18–0.22, 20–24 px); Iris reduced to ~0.35–0.40 (38–44 px, still in Child band but smaller); Pocong bumped to 0.70–0.85 (77–94 px); Black Shuck bumped to 0.40–0.50 (44–55 px); Haldjas sparkle cluster bumped to 0.50–0.65 spread. Adults, children, Sandy, capuchin, echo-creatures unchanged. In-game sprites in `game/index.html` reconciled to new canonical values. |

> | 2026-05-13 | **Cinematic scale unified with gameplay scale.** The prior allowance (cinematic figures could draw larger, 0.75–0.90 door-heights) is retired. New convention: cinematic figures use the *same* canonical scale as gameplay figures. Cinematic closeness is achieved via procedural camera-zoom on the canonical-scale room (scale a sub-region of the 480×270 frame to fill the canvas), not by redrawing characters at inflated size. Bespoke cinematic compositions (memories of other spaces, dock farewell, etc.) respect canonical inter-character ratios but may not include the canonical door reference. Closes Sprint 08 Discrepancies #5 and #6 without touching the cinematic implementations. Documented in `03-art-and-aesthetic.md` Scale Anchor section. |

> | 2026-05-13 | **Sparkle indicator redesigned.** Interactable objects now carry a faint always-on warm-amber aura (using locked palette tokens `--warm-pool-amber` and `--warm-pool-glow`) that ramps up as Pip approaches. Tight 30 px radius: aura grows from baseline intensity ~0.15 to full intensity at object center. Within 15 px (interaction range), the existing 4-frame sparkle cycle continues on top of the bright aura. The brightness increase and distance-driven affordance replace the prior on-when-touching behavior. Documented in `09-component-scale-reference.md` UI section and `03-art-and-aesthetic.md`. |

Do not modify:
- `08-character-reference-sheets.md` — door-fractions there will be updated by Sprint 09 when character visual identity is locked. This sprint's number changes affect doc 03 and doc 09; doc 08 catches up next.
- `pip-patu-register-a.html` or `patu-animation-test.html` — historical references, preserved as-is.
- Any other prototype HTML files.

## Out of scope

- Designing or commissioning character visuals. That's Sprint 09.
- Building the camera-zoom infrastructure itself. The spec describes the convention; the code is built when a zoom-style cinematic is implemented.
- Resolving the echo-creature size exceptions (#9, #10, #11) — those go into the doc as proposals and wait for user confirmation. Don't force a decision here.
- Touching the Karakoncolos eye-glow color (still `[OPEN]` from Sprint 09 spec).
- Adjusting any character whose scale the user didn't review (Henrik, Sandy, the chefs of later chapters, etc.).
- Refactoring the prototype's structure or removing any historical files.

## Test checklist

1. Open `game/scale-reference.html` in a browser.
   - **Expected:** Pip renders at 38–44 px. Pätu renders at 20–24 px. Babcia ~60 px, Dziadek 66–72 px. Iris 38–44 px. Pocong 77–94 px. Black Shuck 44–55 px. Haldjas sparkle 55–72 px diameter. All other elements unchanged.

2. Open `game/index.html`.
   - **Expected:** Pip in the cabin is visibly bigger than before. Walking past the passenger in the hallway shows him at adult NPC scale (60–66 px). Phasing into the grandparents' cabin shows Babcia and Dziadek at adult sizes, with Babcia slightly shorter.
   - **Expected:** Approaching any interactable object (the porthole, the door, the bed, the suitcase, etc.) shows a warm-amber aura that grows in intensity as Pip gets closer. At interaction range, sparkles appear on top of the bright aura.
   - **Expected:** No regressions — every existing interaction, cinematic, and navigation flow still works.

3. Open `design-docs/03-art-and-aesthetic.md`.
   - **Expected:** Scale Anchor table reflects new locked numbers. Cinematic scale language reflects the camera-zoom convention (the 0.75–0.90 allowance is gone). Iris is in the Child NPC row, not Adult NPC.

4. Open `design-docs/09-component-scale-reference.md`.
   - **Expected:** all updated rows match the new numbers. Discrepancies section shows the resolution status (8 resolved, 3 pending user confirmation, 1 doc-fix resolved).

5. Cross-check `art-asset-list.md`.
   - **Expected:** Pip's prompt entries say 38–44 px. Adult NPC entries say 60–72 px. Cinematic descriptions are *not* changed (those still describe close-up framing, which is camera-zoom territory).

6. Check `06-roadmap-and-open-questions.md`.
   - **Expected:** three new Decisions Log entries appear at the bottom.

7. **Sanity question for the user:** open the gallery (if Sprint 09 has run by then; otherwise the scale chart) and look at Pip and Pätu side by side at the new sizes. Does the size relationship feel right? Pip should feel like *a small ghost-boy* against the door, Pätu should feel like *a real cat at his feet*. If anything feels off, that's the next adjustment.

## Report back

After Sprint 08.5 lands, Claude Code reports:

1. The six scale changes implemented in `game/index.html` (Pip, passenger, Babcia, Dziadek + new Pätu position adjustments if needed).
2. The sparkle redesign in action — confirm with a one-sentence behavioral description that matches the spec.
3. The cinematic-scale language change in doc 03 — quote the new paragraph for sanity.
4. The three echo-creature exception notes — confirm they're added to doc 09 as proposals, not as resolutions.
5. Any new discrepancies surfaced during reconciliation work (e.g. an in-game component that turned out to be off-scale that the user didn't review).
6. Confirm the three Decisions Log entries are in place.
