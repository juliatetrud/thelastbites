# GitHub Epics & Issues for The Last Bites

Paste-ready structure for the project's GitHub. Five epics, one per stage from `06-roadmap-and-open-questions.md`. Each epic contains a set of issues; each issue corresponds to one sprint spec.

The recommended approach: create the epics as GitHub issues with the `epic` label, and create individual sprint issues that reference their epic in the body. GitHub Projects (the board view) can then group by epic.

Alternative: use GitHub Milestones for epics and regular issues for sprints. Either works.

---

## Epic 1 — Foundational Architecture

**Goal:** Rebuild the prototype's bones to match the locked architecture before extending Chapter 1.

**Label:** `epic`, `foundational`

**Description:**
> The current prototype (`prototype/cabin646.html`) was built before the May 2026 architecture pivot and the UI spec. This epic rebuilds the foundation in `game/` to match the locked design: 480×270 internal resolution, narration-with-choices interaction model, persistent HUD chrome (strength indicator, lives, controls strip), journal stub, and the float ability framework. Chapter 1's existing content gets adapted into the new architecture as the foundation is built.
>
> No new chapter content. No port chapters yet. This is *only* the bones.

### Issues in this epic

| # | Sprint | Sprint spec file |
|---|---|---|
| 1 | Sprint 01 — Foundation scaffold (resolution, file structure, game loop) | `sprints/sprint-01-foundation-scaffold.md` |
| 2 | Sprint 02 — Dialogue box system (narration + choices) | TBD |
| 3 | Sprint 03 — HUD chrome (strength meter + lives + controls strip) | TBD |
| 4 | Sprint 04 — Journal stub + save/load | TBD |
| 5 | Sprint 05 — Title screen + chapter card + pause menu | TBD |
| 6 | Sprint 06 — Death sequence + game-over screen | TBD |

Sprints 02–06 get specced individually after Sprint 01 completes — feedback from each shapes the next.

---

## Epic 2 — Chapter 1: Cabin 646

**Goal:** A playable end-to-end Chapter 1 with placeholder art on the new architecture.

**Label:** `epic`, `chapter-1`

**Description:**
> Implement Chapter 1's full beat-by-beat from `04-chapter-01-cabin-646.md` on top of Epic 1's foundation. Five rooms (cabin, hallway, grandparents' cabin, radio room, dark corridor, kitchen), the doubled first-taste cinematic, the float ability discovery, and the dock farewell. Placeholder art only — commissions come later.

### Issues in this epic

| # | Sprint | Spec file |
|---|---|---|
| 7 | Sprint 07 — Cabin 646 room (adapted to new architecture) | TBD |
| 8 | Sprint 08 — Hallway + bulletin + passenger encounter | TBD |
| 9 | Sprint 09 — Room-to-room transitions | TBD |
| 10 | Sprint 10 — Grandparents' cabin + cinematic | TBD |
| 11 | Sprint 11 — Radio room + ability unlock | TBD |
| 12 | Sprint 12 — Dark corridor + janitor + float discovery | TBD |
| 13 | Sprint 13 — Kitchen + Henrik | TBD |
| 14 | Sprint 14 — Doubled first-taste cinematic (6a gravlaks + 6b lefse) | TBD |
| 15 | Sprint 15 — Dock farewell cinematic + chapter exit | TBD |

---

## Epic 3 — Chapter 1 Polish

**Goal:** Chapter 1 looks and feels finished.

**Label:** `epic`, `chapter-1`, `polish`

**Description:**
> Commission and integrate artwork. Add sound and music. Add mobile tap controls. Embed in the recipe site (or a test page). After this epic, Chapter 1 is shippable.

### Issues in this epic

Will be specced once Epic 2 completes and the art commissioning process is underway. Will include:

- Integrate commissioned cinematic art (9 pieces)
- Integrate commissioned Pip sprite
- Integrate commissioned room backgrounds (5 rooms)
- Integrate commissioned NPC sprites
- Sound design + ambient audio pass
- Music
- Mobile tap layer implementation (per `03b-ui-spec.md` §11)
- Recipe site embed

---

## Epic 4 — Chapter 2: Tallinn

**Goal:** Prove the world-traveling structure works, including the new chapter rhythm (traversal → monster → chef).

**Label:** `epic`, `chapter-2`

**Description:**
> Implement Chapter 2 (Tallinn, Estonia — kodused kotletid, the Haldjas + Leida) per `ch02-tallinn-outline.md` and `ch02-sincerity-puzzle-spec.md`. Build the wordless traversal opening, the world map / port selector, the Haldjas monster encounter, the meal with Leida, and the three-doors sincerity puzzle. This chapter introduces Pätu and establishes the paired-memory pattern.

### Issues in this epic

| # | Sprint | Spec file |
|---|---|---|
| — | Sprint X — Wordless traversal system | TBD |
| — | Sprint X — World map / port selector UI | TBD |
| — | Sprint X — Tallinn port environment | TBD |
| — | Sprint X — Haldjas monster encounter | TBD |
| — | Sprint X — Leida's cottage + meal | TBD |
| — | Sprint X — Three-doors sincerity puzzle | TBD |
| — | Sprint X — Pätu introduction | TBD |
| — | Sprint X — Paired-memory pattern (journal updates) | TBD |
| — | Sprint X — Chapter 2 recipe site unlock | TBD |

Specced sprint by sprint after Epic 1 and Epic 2 complete.

---

## Epic 5 — System Maturity

**Goal:** Make adding new chapters fast, and add quality-of-life and accessibility features.

**Label:** `epic`, `system`

**Description:**
> By the time Chapter 2 ships, patterns will have emerged. This epic refactors the codebase to make future chapters template-driven rather than bespoke. Also adds accessibility features and the paired-memory inventory UI (visible from Ch5 onward).

### Issues in this epic

- Refactor into a chapter-template (rooms in separate files, etc.)
- Build a chapter-template scaffold so future chapters can be added with minimal new code
- Accessibility: text size options
- Accessibility: reduced motion option
- Build the paired-memory inventory UI (Ch5+)
- Multi-slot save (if decided yes)

---

## Issue Template

Use this template for each sprint issue:

```markdown
**Epic:** [link to the epic issue]
**Sprint spec:** `sprints/sprint-NN-short-name.md` (paste link to the file in repo)
**Required reading:**
- The sprint spec above (do not skip)
- Design docs the spec references

## Definition of Done

[paste from sprint spec]

## Test Checklist

[paste from sprint spec]

## Notes

- Stay within the Out of Scope boundary defined in the spec.
- Stop and ask if anything is ambiguous.
- Close this issue only after every test-checklist item passes in the running game.
```

---

## Suggested Labels

| Label | Use |
|---|---|
| `epic` | The five epic-level issues |
| `foundational`, `chapter-1`, `chapter-2`, `polish`, `system` | Epic categorization |
| `sprint` | Individual sprint issues |
| `art-blocked` | Issues waiting on commissioned artwork |
| `decision-needed` | Issues blocked on a design decision (raise in chat, don't guess) |
| `design-drift` | Issues where the implementation diverged from spec and needs realignment |

---

## A Note on Working Pace

The roadmap has ~25+ issues total. Don't try to scope them all upfront. The pattern that works:

1. Spec Sprint 01 in detail
2. Execute it
3. Play it, give feedback, decide what Sprint 02 should be
4. Spec Sprint 02 in detail
5. Execute it
6. Continue

Each sprint specced just-in-time stays grounded in what was actually built, not in what was imagined three sprints ago.
