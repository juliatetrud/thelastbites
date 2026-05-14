# Sprint 09 polish — Henrik revision and Pip scale fix

A quick post-Sprint-09 adjustment pass. Two character revisions to ship before Sprint 10.

## Goal

Lock Henrik's visual identity per Julia's review of the gallery: tall chef's toque, sleek fit posture, black button-up under the apron, black slacks, body taller. Also fix the Pip-scale drift in the gallery (gallery renders at 0.33 H; canonical per doc 03 is 0.35–0.40 H).

## Definition of done

### Henrik redesign

- Body height bumped from current ~66 px to **72 px** (door-fraction ~0.65, top of standard Adult NPC band)
- A **tall chef's toque** on top — traditional white pillar shape, ~14 px tall, slightly puffed at top (gentle dome, not cylindrical). Total figure height including toque: ~86 px
- Beneath the apron: a **black button-up shirt** visible at collar (small triangle peeking above the apron's bib) and at any place the apron doesn't cover. The black is `#1a1a24` or similar near-black, distinguishable from the deep moonlit-blue background
- **Black slacks** replacing the current dark-brown trouser legs. Same near-black as the shirt
- **Black shoes** matching slacks
- The pipe stays — in his right hand, with the existing drifting smoke animation
- Posture is **sleek and fit**: stoop removed (or reduced to a very subtle head-incline, no shoulder slump). Straight back, weight balanced. He stands like a fit older man who's spent his life on his feet
- Apron stays cream-white (`#f5ecd0` or whatever the current shade is). The apron now reads as a bright cream rectangle against a black silhouette — high contrast, strong figure
- Beard stays gray, full but trimmed, suggesting a man who keeps himself in order

### Pip scale fix in the gallery

- The gallery currently renders Pip at 1.5× scale = 36 px (door-fraction 0.33)
- Bump to **1.6× scale = 40 px** (door-fraction ~0.36, within the canonical 0.35–0.40 band locked in Sprint 08.5 / doc 03)
- This matches `PIP_H = 40` already in `game/index.html`
- No other change to Pip's gallery rendering — same colors, same animations, same pose

### Doc updates

- `design-docs/08-character-reference-sheets.md` Henrik entry updated to reflect the new design. Specifically:
  - Replace any description of "stoop" or "stooped" with "sleek, fit, straight-backed; subtle head-incline at most"
  - Replace any description of "weathered apron" being his sole identifier with: "tall white chef's toque + cream-white apron over a near-black button-up and slacks — high-contrast silhouette in moonlit-blue rooms"
  - Body height: 72 px (~0.65 H); total figure with toque: ~86 px
  - Add a note that Henrik's tall toque + total figure height pushes him *above* the standard Adult NPC band's top edge (which is 72 px) when measured with the toque, but his *body* stays within the band. He reads as authoritative-via-hat rather than tall-via-body.
- `design-docs/09-component-scale-reference.md` Henrik row updated:
  - Body: 0.65 H (72 px)
  - Total with toque: 0.78 H (~86 px)
  - Note: "Body within Adult NPC band; total figure with chef's toque exceeds the band — Henrik is authoritative-via-hat, not tall-via-body."
- A new entry in the Decisions Log (`06-roadmap-and-open-questions.md`) documenting the revision:
  > | YYYY-MM-DD | **Henrik visual identity revised (Sprint 09 polish).** Tall white chef's toque (~14 px), sleek-fit posture (stoop removed), black button-up + black slacks under the cream apron, black shoes. Body 72 px (0.65 H); total figure with toque ~86 px (0.78 H). Pipe in right hand retained with existing smoke animation. Beard trimmed gray. High-contrast silhouette: bright apron against near-black body, against moonlit-blue backgrounds. Replaces the prior "stooped weathered apron" framing. |
- Decisions Log entry for the Pip scale fix:
  > | YYYY-MM-DD | **Pip gallery scale corrected to match canonical.** Gallery was rendering Pip at 1.5× (36 px, 0.33 H); bumped to 1.6× (40 px, 0.36 H) to match canonical 0.35–0.40 H locked in doc 03 / Sprint 08.5. The gallery is the visual source-of-truth; it must match canonical or it lies to future sprints. |
- Sprint History row added for this polish pass:
  > | 09-polish | Henrik revision + Pip scale fix | YYYY-MM-DD | Henrik redesigned: tall toque, sleek-fit posture, black button-up + slacks, retained pipe. Gallery Pip bumped to canonical 40 px. |

## Implementation notes

### Henrik geometry rebuild

Replace the current Henrik draw function with a new one matching the spec. Suggested layout (working in local coords, foot at y=0, growing upward):

- **Shoes** (black, `#1a1a24`): two small rectangles at y=0, each ~5 px wide × 2 px tall
- **Slacks** (same black): two leg columns ~5 px wide rising from shoe-tops to the apron's bottom edge (~28 px tall each)
- **Apron** (cream, current color): rectangle covering the front of the torso from ~28 px above foot to ~58 px above foot, ~22 px wide. Slightly narrower at the top (bib portion) than the bottom (skirt portion). The apron is a single piece — bib on top, skirt below, with a faint horizontal seam at the waist tie if you can fit it
- **Black button-up shirt** behind/around the apron: visible as a small black triangle of collar peeking above the apron's bib (~3 px tall triangle, centered), and as black sleeves visible on either side of the apron — short sleeves stopping at the upper arm, so the arms below are skin-tone (or stay covered — implementer's choice based on what reads cleaner). Suggested: short sleeves with skin-tone forearms ending at the apron's side
- **Head** (skin tone, slight warm peach `#d4a878` or whatever the current Henrik skin is): rectangle ~12 px wide × 9 px tall, centered on the body's vertical axis, sitting above the apron's top edge
- **Beard** (gray, `#8a8a90` or similar): covering the lower half of the head, from below the eyes to the chin. Trimmed — straight edges, not bushy
- **Eyes** (dark): two small dots, ~1×2 px each, kind expression
- **Toque** (white, `#f0f0e8` or pure cream): tall pillar shape sitting on top of the head, ~14 px tall × ~13 px wide. Bottom 3 px is the band (slightly darker cream, suggesting the headband of the toque); the rest is the puffed crown — straight sides for the first 6 px above the band, then a gentle outward curve and slight rounded dome at the top. Not perfectly cylindrical; has a hint of softness
- **Right arm holding pipe**: extends from the right side of the apron at upper-arm level. Forearm angles slightly downward and outward. Hand grips the pipe (pipe stem visible, small bowl at the end)
- **Pipe smoke**: existing animation reused — small drifting puffs above the bowl

The figure's posture is **upright**. No shoulder slope. Head sits level on the neck (or very slight forward incline ~1 px, to suggest a man listening attentively, not someone defeated).

### Pip gallery scale

In `game/character-gallery.html`, find the Pip render function. Change the scale multiplier from 1.5 to 1.6. Verify Pip's rendered height is now 40 px (matching `PIP_H = 40` in `game/index.html`).

Do not change any other Pip rendering parameters — colors, glow, animation timing all stay the same.

## Files to create or modify

Modify:
- `game/character-gallery.html` — Henrik draw function replaced; Pip scale bumped to 1.6×
- `design-docs/08-character-reference-sheets.md` — Henrik entry updated
- `design-docs/09-component-scale-reference.md` — Henrik row updated (body + total dimensions)
- `design-docs/06-roadmap-and-open-questions.md` — two Decisions Log entries, one Sprint History row

Do not modify:
- Any other character in the gallery
- `game/index.html` (Henrik isn't rendered there yet; he'll be added in Sprint 12)
- Any other design doc

## Out of scope

- Any in-game Henrik implementation. He exists only in the gallery for now.
- Revisions to any other gallery character. If Julia wants other adjustments, those come separately.
- Generalizing the "near-black silhouette + cream apron" treatment to any other character. This is Henrik's identity, not a pattern.
- Sound, dialogue, or animation changes beyond preserving the existing pipe smoke.

## Test checklist

1. **Open `game/character-gallery.html`.** Henrik should now:
   - Stand visibly taller than before, with the tall white toque pillared on top
   - Wear a near-black shirt (collar visible above apron) and near-black slacks/shoes
   - Read as sleek and fit — no stoop, straight back
   - Still hold his pipe in the right hand with smoke drifting

2. **Pip in the gallery** is now visibly slightly larger (40 px instead of 36 px). All other Pip rendering is unchanged.

3. **The gallery's overall feel is preserved.** Henrik still belongs in the same world as Pip, Pätu, Babcia, Erik, Pocong — he's just more confident now.

4. **No console errors.**

5. **Doc updates landed.**
   - Doc 08 Henrik entry no longer says "stoop" or "stooped"
   - Doc 09 Henrik row has the new body / total dimensions
   - Doc 06 has the two new Decisions Log entries and one new Sprint History row

## Report back

After the polish pass lands, Claude Code reports:

1. Whether the tall toque + sleek-fit silhouette reads cohesively, or whether the figure ends up feeling top-heavy
2. Whether the black shirt + black slacks + cream apron contrast is striking-in-the-right-way or too stark against the moonlit-blue background
3. Confirmation that Pip now renders at 40 px in the gallery
4. Any open questions about Henrik's design surfaced during implementation
