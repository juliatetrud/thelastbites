# Sprint 08: Component scale reference

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

Build a complete catalogue of every recurring component in the game, mapped to its door-fraction ratio per the Scale Anchor — both as a markdown reference doc and as a visual HTML chart that draws each component at canonical scale beside a 110px door for sanity-checking.

## Definition of done

- A new markdown doc exists at `design-docs/09-component-scale-reference.md` containing a comprehensive table: every component, its door-fraction ratio, its pixel dimensions at 480×270 canvas, the chapter(s) it appears in, and any notes on its rendering register (A gameplay sprite vs B cinematic).
- A new HTML page exists at `game/scale-reference.html` that visually displays each component as a procedural canvas drawing, scaled correctly, with a canonical 110px door rendered alongside for comparison. The page is browsable, navigable, and grouped by category (architecture, furniture, props, fixtures, characters, etc.).
- Every component in the table has a corresponding drawing in the HTML page, and vice versa — the two stay in sync.
- The HTML page renders without errors in a current browser. Drawings are rough/procedural — no painterly detail required. The point is silhouette and *scale*, not finish quality.
- **Doc-hygiene deliverables for this sprint:**
  - Cross-reference pointer added to `03-art-and-aesthetic.md`'s Scale Anchor section, pointing to the new doc 09 and HTML chart.
  - Cross-reference pointer added to `08-character-reference-sheets.md` in the "Cross-references" section, pointing to doc 09 and the HTML chart.
  - A "Discrepancies found" section at the bottom of the new doc 09, listing every component whose canonical scale doesn't match its current rendering in `game/index.html` or its spec in `art-asset-list.md`. Each entry: component name, what the canonical scale says, what the current implementation does, no proposed resolution (that's for a follow-up sprint).
  - Decisions Log entry appended to `06-roadmap-and-open-questions.md` (text provided below).
- All files committed in a single commit.

## Context from design docs

The canonical Scale Anchor is documented in `design-docs/03-art-and-aesthetic.md` under the "Scale Anchor" section. Key facts:

- **Canonical door:** 32 px wide × 110 px tall at 480×270 internal canvas. This is the "1.0 door-height" unit.
- **Adult NPCs:** 0.55–0.65 door-heights (60–72 px tall).
- **Children:** 0.40–0.45 door-heights (44–50 px tall).
- **Pip (ghost form):** 0.30–0.35 (32–38 px).
- **Pätu (gray tabby cat):** 0.20–0.25 (22–28 px).
- **Echo-creatures:** 0.06–0.14 (7–16 px).
- **Bed:** 0.85–1.00 wide × 0.18–0.22 tall (95–110 × 20–24 px).
- **Nightstand:** 0.16–0.20 wide × 0.16–0.20 tall (18–22 × 18–22 px).
- **Chair:** 0.30–0.35 tall (33–38 px).
- **Porthole diameter:** 0.30–0.34 (33–38 px).
- **Suitcase:** 0.45–0.55 wide × 0.12–0.16 tall (50–60 × 13–18 px).
- **Wall fixtures (sconces, oil lamps, portholes):** mounted at door-top height (~y=58 from top of room).

These are the rows that already exist in the art doc's table. This sprint *extends* that list with every other component the game uses, and adds visual rendering.

The Scale Anchor principle: *"What door-fraction is this?"* — not *"what looks right next to Pip?"* The door is the constant. Designers stand a candidate door beside a new asset and read its proportional height directly.

The component drawings in this sprint don't need to be polished. They are *scale silhouettes*. Rough shape, correct proportions, recognizable category — that's the bar. The polished versions live in the game proper.

## Implementation notes

### The markdown doc (`design-docs/09-component-scale-reference.md`)

Structure:

```
# Component Scale Reference

[intro paragraph: this doc catalogues every component, expresses each as a door-fraction
per the Scale Anchor in 03-art-and-aesthetic.md, and is paired with the visual chart at
game/scale-reference.html.]

## How to use this doc
[brief: how to read a row, how the visual chart is paired, when a new component is added
the doc + chart should be updated together]

## Architecture
[table: doors, walls, baseboards, floors, ceilings, panels, stairs, doorframes, etc.]

## Furniture
[table: beds, nightstands, chairs, tables, suitcases, cabinets, dressers, range stove,
counter, etc.]

## Fixtures
[table: oil lamps, portholes, sconces, hanging lamps, light fixtures, wall plaques, door
handles, kickplates, hooks, etc.]

## Props (interactable)
[table: photographs, journals, recipe cards, switchblade, mirror, radio, books,
plates, glasses, wine bottles, the small wooden box (Pip's coffin), etc.]

## Characters
[table: Pip, Pätu, adults (Babcia/Dziadek/Henrik/passenger/janitor/Leida/Muhittin/
Omer/Brian/Johannes/Joana/Beatriz/Tirta/Sandy/Caitlin/Sandy's family adults), children
(Erik/Iris/Bibi/Sandy's-young-family/memory-Pip), monsters (Black Shuck/Pocong/
Karakoncolos/Haldjas/Mamlambo/Boitatá), the capuchin, echo-creatures.]

## UI elements
[table: dialogue box, journal, strength indicator, lives display, controls strip, port
selector card, sparkle indicator, etc. — these may or may not follow door-scale, but
document the convention used.]

## Echo-creatures (per chapter)
[table: ghost-spiders, ghost-mice, ghost-bats, echo-fish, echo-deer, echo-cats,
echo-rats, echo-tarsiers, mosquitoes, urban vermin (Ch8) — each with its sprite-scale.]
```

Each row format:

| Component | Door-fraction | Pixel dims (480×270) | Chapter(s) | Notes |
|---|---|---|---|---|
| Door (canonical) | 1.00 H × 0.29 W | 110 × 32 | All | Scale anchor. |
| Adult NPC | 0.55–0.65 H | 60–72 tall | All | See character ref. |

Pull from `art-asset-list.md` and existing rooms in `game/index.html` for the components already in the game. Pull from `08-character-reference-sheets.md` for characters. Pull from `03-art-and-aesthetic.md`'s existing Scale Anchor table for the rows already locked. Anywhere a component appears in a chapter outline but isn't yet sized, propose a sensible door-fraction with a `[PROPOSED]` flag, so the user can review and lock at next pass.

If a row's pixel dimensions look unreasonable (e.g. the chair currently in `drawCabin` is drawn at a size that doesn't match the table), flag the mismatch in the Notes column — don't silently change the door-fraction; surface it so the user can decide.

### The HTML page (`game/scale-reference.html`)

A single self-contained HTML file. Layout:

```
┌────────────────────────────────────────────────────────────────┐
│ Component Scale Reference                                      │
│ All elements drawn at canonical 480×270 scale, beside a 110px  │
│ door for comparison.                                           │
├────────────────────────────────────────────────────────────────┤
│ [nav: jump to Architecture | Furniture | Fixtures | Props |   │
│  Characters | UI | Echo-creatures]                            │
├────────────────────────────────────────────────────────────────┤
│ ## Architecture                                                │
│                                                                │
│  [door]   [wall section]   [floor section]   [stairs]   ...   │
│  110px    [varies]           [thin]          [varies]          │
│                                                                │
│ ## Furniture                                                   │
│                                                                │
│  [bed]    [nightstand]   [chair]   [suitcase]    [table]      │
│  20-24px  18-22px        33-38px   13-18px        [varies]    │
│                                                                │
│ [...etc per category...]                                       │
└────────────────────────────────────────────────────────────────┘
```

Each component is drawn in its own small canvas (e.g. 140 × 140 px) with:
- A faint 110px-tall door silhouette to the left of the component (always the same height across every cell, the constant reference)
- The component drawn at its canonical pixel dimensions to the right
- A label below: component name + door-fraction + pixel dims

Use procedural drawing — `ctx.fillRect`, simple rectangles, simple shapes. **Do not** try to render the component beautifully. Render it *recognizably*. The chair is a back + seat + four legs in three rectangles. The bed is a frame + headboard + bedding stripe. The Pocong is a vertical white capsule with three horizontal lines suggesting knots at the feet. The Boitatá is a curve of orange-amber pixels. The point is *can you see, at a glance, that this is the right scale next to a door?*

Where a category has many similar variants (adult NPCs of all kinds), draw two or three representative versions, not all of them. Add a note: *"All adult NPCs render in this 60-72px band; specific characters vary in silhouette tells but scale is consistent."*

Use the same palette tokens already established in `game/index.html` — pull the relevant constants if helpful. The page doesn't need polished color work; muted neutrals are fine. The door silhouette can be a single warm-tone rectangle.

Navigation: a sticky top bar with category anchors. Sections separated by spacing and a thin divider line. Page is one continuous scroll, no tabs needed.

### Sourcing the component list

The exhaustive list comes from:
1. **`art-asset-list.md`** — every named room, sprite, cinematic, and UI element.
2. **`game/index.html`** — every component currently rendered in the prototype (cabin, hallway, grandparents' cabin rooms).
3. **The chapter outlines** in `chapter-specs/` — components referenced in chapter prose that aren't yet in the asset list (e.g. Leida's wood stove, Joana and Beatriz's stilted house, the brass bells in the Tallinn cathedral, etc.).
4. **`08-character-reference-sheets.md`** — every character with their door-fraction.

Read all four before constructing the table. Where a component appears in a chapter outline but is **not load-bearing** for art (e.g. *"a tea kettle is on the stove"* — kettles don't need their own scale row), skip it. The table is for components that will be *drawn*. The threshold: if a component is going to appear in more than one room, or is part of a puzzle, or is interactable, it goes in the table. One-off background dressing doesn't.

### What this sprint does NOT do

- It does not redraw or modify any component in `game/index.html`. The cabin's chair, the hallway's sconces, etc. stay as they are. This sprint *documents* the canonical scale; reconciling existing assets that don't match the canonical scale is future work (per the existing Decisions Log entry about Scale Anchor follow-up).
- It does not commission or generate any final art. The drawings in the HTML page are scale silhouettes.
- It does not propose pixel sizes for components that aren't documented anywhere. If a chapter outline mentions a component vaguely ("a wood stove in Leida's cottage") without specifying scale, propose a door-fraction with `[PROPOSED]` and a one-line justification.
- It does not touch `03-art-and-aesthetic.md`'s existing Scale Anchor table. The new doc *extends* that table; it doesn't replace it. The new doc cross-references the art doc as the parent reference.

## Files to create or modify

Create:
- `design-docs/09-component-scale-reference.md` (the table, with a "Discrepancies found" section at the bottom)
- `game/scale-reference.html` (the visual chart)

Modify (doc hygiene):
- `design-docs/03-art-and-aesthetic.md` — add a cross-reference pointer at the top of the Scale Anchor section: *"For the full per-component catalogue, see `09-component-scale-reference.md` and the visual chart at `game/scale-reference.html`."* The existing Scale Anchor table stays in doc 03 — doc 09 *extends* it, not replaces it.
- `design-docs/08-character-reference-sheets.md` — add `09-component-scale-reference.md` and `game/scale-reference.html` to the "Cross-references" section near the bottom.
- `design-docs/06-roadmap-and-open-questions.md` — append the Decisions Log entry below.

Decisions Log entry to append:

> | 2026-05-13 | **Component scale reference created.** `09-component-scale-reference.md` and `scale-reference.html` catalogue every recurring component in the game by door-fraction. Extends the Scale Anchor table in `03-art-and-aesthetic.md`. Any new component added to the game is added here first; the visual chart is the sanity-check before any procedural drawing function is written. Discrepancies between canonical scale and current implementation are flagged at the bottom of doc 09 for follow-up. |

Do not modify:
- `03-art-and-aesthetic.md`'s existing Scale Anchor *table* — only add the cross-reference pointer above it. The table stays as-is; doc 09 is the extension.
- `game/index.html` (no in-game component scale changes in this sprint — discrepancies are flagged, not fixed)
- `art-asset-list.md` (the asset list is unchanged; this sprint reads from it but doesn't write to it)

## Out of scope

- Reconciling components in `game/index.html` to the canonical scale. That's a separate sprint (or several).
- Generating final art for any component. The chart is silhouettes only.
- Adding new components that aren't already referenced somewhere in the docs.
- Building animation or interactivity into the HTML chart. Static drawings only.
- Reorganizing `art-asset-list.md`. That's a different cleanup.
- Sizing components from chapter outlines that haven't yet been spec'd (e.g. Ch7's specific kitchen tools at Joana and Beatriz's house — these get sized when Ch7 is being built).

## Test checklist

1. Open `game/scale-reference.html` in a browser.
   - **Expected:** the page renders without errors. Every section is visible. Every component has a drawing beside a door silhouette of consistent 110px height.

2. Visually verify scale relationships.
   - Pip is roughly one-third the height of the door.
   - Pätu is roughly one-fifth the height of the door.
   - An adult NPC is roughly two-thirds the height of the door.
   - A bed is roughly as wide as the door is tall.
   - Pip standing on a chair would reach roughly door-handle height.
   - The capuchin is smaller than Pätu.
   - The Pocong is taller than an adult NPC.
   - Sandy is taller than all other adult NPCs.

3. Open `design-docs/09-component-scale-reference.md`.
   - **Expected:** every component visible in the HTML chart is also in the markdown table, in the same category, with door-fraction and pixel dims that match what was drawn.

4. Cross-check against `art-asset-list.md`.
   - **Expected:** every sprite-named entity in the asset list has a row in the new doc, or is explicitly excluded (with a note in the doc explaining the exclusion).

5. Cross-check against `08-character-reference-sheets.md`.
   - **Expected:** every named character is in the Characters section of the new doc, with the same door-fraction as the character ref sheet specifies.

6. Decisions Log entry appended to `06-roadmap-and-open-questions.md`. Single commit covers all three files.

7. **One sanity question for the user:** after the chart is viewable, the user should be able to look at it and immediately spot any components that *feel wrong* at the proposed scale. The user's gut is the final test. Flag anything the user notes for follow-up in a separate sprint.

