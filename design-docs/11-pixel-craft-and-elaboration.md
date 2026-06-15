# 11 — Pixel Craft & Elaboration

*Created 2026-06-03. The craft layer: how to make programmatic pixel art in The Last Bites more elaborate, atmospheric, and beautiful without breaking the register system or the single-file vanilla-JS constraint.*

---

## What this doc is for

The other art docs answer *what* (`03-art-and-aesthetic.md` — look, palette, registers) and *how to rig a sprite* (`07-sprite-and-animation-guide.md`). This doc answers a narrower question that came up when the scenery, ship, and objects started reading as flatter and sparser than the project deserves:

> **How do we make procedural (`ctx.fillRect`-drawn) pixel art more elaborate and beautiful — without adding dependencies, abandoning hard pixel edges, or over-detailing the sprites in violation of the register system?**

This is reference material for **build sprints**. Read it before any sprint that touches scenery, room backgrounds, the ship, large objects, or cinematic environments. It does **not** override `03-art-and-aesthetic.md`; where they conflict, doc 03 (and the bible above it) wins, and the conflict gets flagged here and to Julia.

---

## The one principle that fixes most of it

`03-art-and-aesthetic.md` already says it: **the sprite stays sparse; the atmosphere comes from the room.** The "art feels lacking" problem is almost never a sprite problem — it is a *room* problem. The fixes below are overwhelmingly Register-A *environment* craft and Register-B *cinematic* craft. They deliberately do **not** add ornament to the sparse gameplay sprites, because the sparseness of Pip (no hair, no apron, two eye-dots) is thematically load-bearing — see the bible on Pip's visual form.

So: when something looks unfinished, the question is almost always *"what is the room around it doing?"* — not *"how do I add detail to this figure?"*

---

## What the reference study taught (2026-06-03)

Julia gathered reference pixel art she likes (mountain/campfire scenes, a sunflower token-grid, a castle-and-ship harbor, a moonlit creature, and a current in-game hallway screenshot). Reading them against the current build surfaced the core diagnosis and three additions to the technique set.

**The diagnosis: the current art is too *soft*.** The in-game references read as smooth CSS-style radial glows, low-contrast gradient walls, and mushy low-contrast floors. The good references read as *deliberate pixels*: hard clusters, visible dither, decisive value steps, and crisp edges. The single biggest move is to **trade softness for decision** — fewer smooth gradients, more dithered value steps and clusters.

This adds two rules and promotes one technique:

- **Kill the blurry radial glows.** Soft `createRadialGradient` halos for lamplight, auras, and underglows are the main "soft" tell. Keep *one* gentle atmospheric glow per light if needed, but build the light's *body* from dithered value steps and clusters, not a smooth radial wash. A warm pool should have a readable shape, not a fuzzy circle.
- **Push contrast.** The references commit to a real value range — bright lit edges, genuinely dark shadow. The current build hovers in the mid-tones. Let lit areas get bright and shadow zones get dark (dithered, per technique 2), so form reads.
- **Rim light is now a named technique** (see technique 9 below), because the moonlit-creature reference showed it's the key to making a dark figure read against a dark ground — directly relevant to our gentle-horror monsters.

The sunflower token-grid reference also confirmed the **grid-authoring convention** (technique 8) is the right authoring method for detail-dense work — see `12-character-pixel-anatomy.md`, which promotes it to the required method for faces.

**Density caveat:** several references (the harbor, the creature) are higher-resolution than our 480×270 world. We adopt their *techniques* — dither-texture, rim light, value steps — **not their pixel density.** A technique that needs 200px of figure to read does not belong on a 20px gameplay sprite.

---

## The technique set

Eight core techniques plus rim light, ordered roughly by impact-per-effort for this project. All are `ctx.fillRect`-compatible and dependency-free. Each notes which register(s) it serves.

### 1. Clusters, not scatter *(Register A & B)*

The single biggest amateur-vs-polished tell. Shading and texture should be built from **deliberate contiguous bands of color**, not speckled single pixels. An object's form reads as: base color + one highlight cluster + one shadow cluster, each a connected shape placed with intent.

- A brass fixture: base brass, a 2–3px highlight band where light hits, a shadow band on the away side. Three clusters, not thirty random dots.
- Noise/speckle has its place (texture, grain) — but it is *applied on top of* clusters, never a substitute for them.

**Rule of thumb:** if you can't describe the shading as "a highlight *region* and a shadow *region*," it's scatter, and it will look noisy.

### 2. Dithering for graded shadow and cheap gradients *(Register A & B)*

The highest-impact tool for the "7th Guest velvety dark." Dithering mixes two palette colors in a regular pattern to fake an intermediate shade — letting a shadow *grade* from base-blue into near-black without introducing new palette colors.

- Use a **Bayer matrix** (2×2, 4×4, or 8×8) for smooth ordered gradients — ideal for the shadow falloff at the edges of a room, or the gradient inside the mirror surface.
- Use **checker/dot/cross** dithers for texture (rough stone, sand, rust).
- Works best at **32px and larger areas**. Never dither a tiny sprite — at sprite scale it just looks noisy and fights the register.
- The two colors should be **close in value** for a smooth blend, **far apart** for a deliberately granular/textured look. Pick on purpose.

Implement as a helper: `ditherFill(x, y, w, h, colorA, colorB, matrix)` that walks the region and picks A or B per pixel based on the Bayer threshold at that coordinate. This becomes a project primitive.

### 3. Selective anti-aliasing — and the discipline to skip it *(Register B mostly; large Register-A curves rarely)*

Hard jagged edges are *part of* the pixel-art aesthetic, and AA at small sizes looks blurry and dirty. So the rule is **selective, manual, sparing**:

- Apply a single intermediate-color pixel only at the *worst* jaggies of a **large** curve — a ship hull, an archway, the moon, the curve of a face in a Register-B close-up.
- **Never** on Register-A sprites. Never as an automatic pass. Never enough to soften the overall pixel crispness.
- `image-rendering: pixelated` stays on globally; selective AA is hand-placed pixels, not a CSS smoothing.

When in doubt, leave the edge hard. AA is a scalpel, not a filter.

### 4. Parallax depth layers *(Register A — biggest win for "the boat feels flat")*

A flat background makes the world feel flat. Multi-speed layers fix it cheaply. The side-scroller-standard breakdown:

- **Layer 1 — Sky / sea base.** Slowest or static. A gradient with a few wisps. Moves at ~10–20% of camera speed (or 0).
- **Layer 2 — Far distance.** Low-detail, low-saturation silhouettes (distant coastline, ship superstructure against the night). ~20–40% speed. Sells scale.
- **Layer 3 — Mid distance.** Recognizable structures with some detail. ~40–60% speed.
- **Layer 4 — Near background.** Detailed elements just behind the gameplay plane (the corridor wall Pip walks past). The existing cabin already does a version of this with `camX * 0.5` panel scroll — that's a Layer-4 parallax instinct already in the code.

The Mnemosyne exterior is the scene that benefits most: sea/sky → distant coast → ship hull/superstructure → foreground deck rail.

### 5. Chunkier pixels for distant layers *(Register A)*

Counterintuitive but it reads as *more* coherent, not less: far parallax layers may draw in **larger pixel blocks** (2×2, 3×3) than the foreground's 1×1. This is how resolution actually behaves with distance — Celeste's distant mountains do exactly this. A far-ocean layer in 3×3 blocks behind a 1×1 corridor looks *right*. Don't overdo it (don't go to 1×1 clouds behind a chunky foreground — match the logic to the distance).

### 6. Procedural noise texture, cached *(Register A & B)*

For organic surfaces — water, fog, wood grain, rust, weathered metal — fill an offscreen `ImageData` buffer with layered (octave) noise, **quantize the result to the locked palette** so it stays pixel-crisp, then blit the cached canvas per frame.

- Generate **once at load**, cache to an offscreen canvas, draw the cache each frame — never per-frame noise math.
- **Quantize to palette** is the step that keeps it pixel-art: raw noise is smooth/analog; snapping each value to the nearest palette token re-pixelates it.
- Animate cheaply by **color-cycling** the cached field (classic water/starfield trick) or by slowly scrolling the cached canvas.

### 7. Seeded plank / panel / tile generation *(Register A)*

For wood floors, hull planking, riveted ship panels: draw a base, draw the horizontal then vertical plank seams, recolor a few planks slightly differently, darken the seam intersections, then tile it. A **per-plank seed** gives believable variation without hand-placing every board.

- On canvas, use **0.5px offsets** for odd-width strokes to get crisp lines that fill pixels correctly (even-width strokes use integer coordinates).
- The existing `drawShipPanel` is the seed of this system; this generalizes it.

### 8. The grid-authoring convention *(Register A — sprites & small objects)*

Borrowed in spirit (not as a dependency) from the Data-Pixels project. Author sprites and small repeating objects as a **2D array of single-char color tokens** plus a palette map, rendered by a tiny in-file helper, instead of long `fillRect` sequences. The shape is then *visible in the source*, which makes patterned/multi-pose art (Babcia's quilt squares, Pätu's pose states) far easier to read and tweak.

```js
// Convention only — ~10 lines, no dependency, fully within constraints.
// palette: { H:'#f0f8ff', $:'#1a1428', _:null /* transparent */, ... }
function drawGrid(grid, ox, oy, scale, palette) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const col = palette[grid[r][c]];
      if (!col) continue;              // null/undefined = transparent
      ctx.fillStyle = col;
      ctx.fillRect(ox + c * scale, oy + r * scale, scale, scale);
    }
  }
}
```

This is **not a new dependency** (`data-pixels` is an old, Electron-coupled npm package and is prohibited by the no-install rule). It is a *pattern*: token-grid + tiny renderer, living inside the single file. Adopt it opportunistically when next touching sprite code; do not spend effort reformatting sprites that already work.

### 9. Rim light — separating a dark form from a dark ground *(Register B; monsters especially)*

When a figure sits against a dark background — a creature in a night corridor, Pip against a shadowed wall — a soft contour alone won't separate it. Place a **1px bright accent line only on the edges the light (or moon) catches**: the top and the lit side. The away side stays dark and merges with the ground.

- For a **monster**, the rim can be a saturated accent (the moonlit-creature look) — this reads as eerie and is our primary gentle-horror lighting tool: an unsettling silhouette defined by a thin glowing edge, never gore.
- For a **person/ghost**, the rim is a pale cool or warm line, subtle.
- Rim light is a **scalpel — lit edges only.** A rim line all the way around is just an outline and kills the effect.

This is the technique that makes "dark figure, dark room" legible, and it lives mostly in cinematics. See `12-character-pixel-anatomy.md` for how it applies to faces and monsters.

---

## Faces are a separate doc

This doc deliberately contains **no face/character-anatomy technique** — that's its own system. For eyes, noses, mouths, hair, skin shading, the value-step-not-black-outline doctrine, and Pip's two cinematic face grids, see **`12-character-pixel-anatomy.md`**. Doc 11 is environment & atmosphere; doc 12 is faces. The mirror demo (Sprint 50) exercises both.

---

## What NOT to do

- **Don't add detail to the gameplay sprites.** The fixes live in the room, the shadow, the depth, the texture. Pip stays a 20px cool-glow shape with two eye-dots. If a fix involves "more pixels of ornament on a character at room scale," it is the wrong fix and probably breaks the register.
- **Don't let backgrounds drift into Register B detail and orphan the sprite.** The most common background failure is a near-painterly background behind a sparse sprite — the pixel densities must match. A background object should use the same pixel scale as one Pip can stand next to (the chunky-distant-layer exception aside).
- **Don't introduce new palette colors casually.** Dithering and quantized noise exist precisely so you can get more apparent shades *out of the locked tokens*. New tokens get proposed and logged, not sprinkled in.
- **Don't globally anti-alias or disable `image-rendering: pixelated`.** Selective AA is hand-placed pixels only.
- **Don't run per-frame noise/dither math.** Generate once, cache, blit.
- **Don't lean on soft radial glows to do the work.** A blurry gradient halo is the main "amateur soft" tell (see the reference study). Build light from dithered value steps and clusters with a readable shape; keep at most one gentle atmospheric glow per source.

---

## How this maps to the registers

| Technique | Register A (gameplay) | Register B (cinematic) | Register C (CSS prototype) |
|---|---|---|---|
| Clusters | ✔ objects, panels | ✔ painterly shading | — |
| Dithering | ✔ shadow zones, large objects | ✔ graded shading, gradients | — |
| Selective AA | rare, large curves only | ✔ face/object curves | — |
| Parallax depth | ✔ rooms & ship exteriors | scene framing only | — |
| Chunky-distance | ✔ far layers | — | — |
| Noise texture | ✔ water/wood/fog | ✔ atmospheric surfaces | — |
| Plank/tile gen | ✔ floors, hull, panels | backgrounds | — |
| Grid-authoring | ✔ sprites & small objects | (faces → doc 12) | — |
| Rim light | rare | ✔ monsters, figures vs dark | — |

---

## Open questions

- **OPEN QUESTION:** Should the dither/parallax/noise helpers eventually live in a shared "primitives" section of `index.html` with a documented signature each, so every room sprint reaches for the same functions? (Leaning yes — propose formalizing after the mirror-demo pilot validates the approach.)
- **OPEN QUESTION:** Chunky-distance-pixel layers imply more than one effective pixel grid on screen at once. Confirm with Julia after the pilot that this reads as intentional and not as a bug, before adopting it board-wide.

---

## Status

This doc is **provisional pending the mirror-scene demo pilot** (see the demo sprint spec). The techniques here are validated against general pixel-art craft and the project's constraints, but have not yet been proven *in this codebase* on a real scene. After Julia reviews the demo and approves, the adopted subset becomes canonical and gets a Decisions Log entry in `06-roadmap-and-open-questions.md`; rejected or modified techniques get noted here.
