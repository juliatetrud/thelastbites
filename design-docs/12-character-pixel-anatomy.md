# 12 — Character Pixel Anatomy

*Created 2026-06-03. The face & feature system for programmatic pixel-art characters in The Last Bites: how to build a readable, characterful face from a small number of pixels, and how to author it as a token-grid. Companion to `11-pixel-craft-and-elaboration.md` (environment craft) and `07-sprite-and-animation-guide.md` (sprite rigging). Subordinate to `01-story-bible.md`, `08-character-reference-sheets.md`, and `03-art-and-aesthetic.md` — where they conflict, those win and the conflict is flagged here and to Julia.*

---

## What this doc is for

Doc 11 makes *environments* more elaborate. It contains no faces. This doc fills that gap: a decomposed, repeatable system for drawing **character faces** in the cinematic register (Register B), at low pixel density, in the project's palette and tone.

Scope boundary, stated up front so it can't drift:

- **This system is for Register B faces only** — cinematic close-ups (the mirror, Henrik's reaction, memory beats). Faces fill 24–40px of detail.
- **It does NOT touch Register A gameplay sprites.** Gameplay Pip stays two eye-dots, two blush pixels, one mouth pixel, bald. The bible calls Pip's gameplay sparseness a thematic spine; this doc does not redesign it. If a fix tempts you to add facial detail to a room-scale sprite, that's the wrong register — stop.

---

## The one stylistic fork (LOCKED)

Pixel faces split into two doctrines. We have chosen one.

- **Value-step + soft contour** *(CHOSEN)* — features are built from steps of color value. A darker shade of the skin tone does the work an outline would. The contour around the face is a soft darker-than-skin edge, not black. This is the doctrine of clean, warm, characterful faces — gentle, individuated, atmospheric. It sits correctly in our "deep velvety dark, warm pools, gentle horror" world.
- **Heavy black outline** *(NOT CHOSEN)* — every feature ringed in pure black. Reads comic/graphic. Fights our palette and our tone. We do not use it as a default. Black is reserved for deep shadow and the dark interior of an open mouth or eye-socket, not as a feature outline.

**Rule:** shade with value clusters and a soft contour. Reach for black only for the darkest interior notes (pupil, open-mouth shadow, deep socket), never as a ring around skin or hair.

---

## The feature vocabulary

A face is assembled from a fixed set of features, each with a minimum pixel recipe. Build them this small first; add only when the face demands it.

### Eye
The most information-dense feature. Build in-to-out:
- **Pupil** — 1 dark pixel (`#1a1428`-ish, not pure black unless the style wants it). The darkest note in the eye.
- **Iris** — 1 pixel of the character's eye color *beside or around* the pupil. This is where character color lives (Pip's blue, Henrik's gray, etc.). At the smallest scale, iris and pupil may share a cell — then the pupil is implied.
- **Sclera** — 1–2 light pixels (off-white, never pure white unless catching direct light). Frames the iris and gives the eye its "openness."
- **Highlight** — optional 1 white pixel at the top of the iris/pupil. This is the "alive" spark. Omit it and the eye reads flatter/sadder — useful on purpose.
- **Lid/socket shadow** — 1 darker-skin pixel above the eye reads as an upper lid and sets the eye into the face. A second below can deepen a tired or grieving look.

Minimum viable eye: **2×2** (sclera + iris/pupil). Expressive eye: **3×3** (adds highlight + lid).

### Brow
- 1–2 pixels of hair-dark or skin-shadow value above the eye.
- Brow *angle and height* carry most of the face's emotion. Raised/flat = neutral or surprised; angled-down-inward = worried or stern. One pixel of vertical shift changes the whole read.

### Nose
- **1–2 shadow pixels only.** A short vertical shadow on the away-from-light side, optionally a single pixel at the base for the tip.
- **Never outline a nose. Never draw nostrils** at this scale — they read as dirt. The nose is a *shadow*, not a shape.

### Mouth
- **Closed neutral:** a 2–4px short dark horizontal line (use a dark skin-shadow or muted red-brown, rarely pure black).
- **Slight smile:** the line lifts 1px at the ends, or curves up across 3–4px.
- **Open / teeth:** dark line for the mouth opening + 1–2 off-white pixels directly below for teeth. Teeth are *never* pure white and never more than a couple of pixels, or the character looks like they're grimacing.
- **Lips (only if needed):** a single muted-rose pixel-row below the mouth line for a fuller lower lip; usually omitted on children and men.

### Skin
- **Base tone** — the main fill.
- **Shadow tone** — one step darker, placed on the away-from-light side of the face (single warm light, so shadow falls consistently). This single value step is what models the face into 3D. **This is also the contour** — the face's edge against the background is the shadow tone, not a black line.
- **Highlight tone** — optional one step lighter, a small cluster on the lit cheekbone/forehead/nose-bridge. Use sparingly.
- **Blush** — 1–2 pixels of muted rose on the cheek. A signature of warmth; Pip always has it.

### Ear
- Often a single skin-shadow or pink accent pixel where the ear meets the face (see the round-faced-boy reference). At profile/three-quarter angles, a 2×3 cluster. Not detailed.

### Hair
- **Three value clusters, never strands:** base, shadow side, and a highlight band/dabs on the lit side.
- The hairline is a *cluster edge*, slightly irregular, following the skull's curve — not a straight line.
- Highlight is a short band or a few dabs where the single light hits, not scattered.
- Hair is where silhouette identity lives — get the *shape* right before any internal value work.

### Contour / rim
- Default face contour: **soft shadow-tone edge** (above).
- **Rim light (special):** when a figure sits against a dark background and you need it to separate, place a 1px bright accent line *only on the edges the light catches* (top, lit side). For a monster this can be a saturated accent (the moonlit-creature look); for a person it's a cool or warm pale line. Rim light is a scalpel — lit edges only, never a full outline.

---

## The token-grid authoring standard (LOCKED for faces)

Faces are authored as a **2D array of single-character color tokens**, rendered by a tiny in-file helper. The face is then *visible and editable in the source*. This is promoted from doc 11's "nice for sprites" to **the required method for Register B faces** — because faces are small, detail-dense, and need precise per-pixel control that parametric `fillRect` code makes painful.

```js
// palette maps token char -> color (or null/'_' for transparent)
function drawGrid(grid, ox, oy, scale, palette) {
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const col = palette[row[c]];
      if (!col) continue;                 // '_' / null = transparent
      ctx.fillStyle = col;
      ctx.fillRect(ox + c * scale, oy + r * scale, scale, scale);
    }
  }
}
```

Conventions:
- One char per cell. `_` is always transparent. Keep the palette small (≤ ~12 tokens per face).
- Rows are equal length. The grid *looks like the face* in the source — keep it that way; it's the whole point.
- Pull every color from the locked palette tokens (`03-art-and-aesthetic.md`). Eye/skin/hair tones for a new character get proposed and logged, not invented ad hoc.
- `scale` lets the same grid render at different sizes. A face grid drawn at `scale=4` on a 480×270 canvas gives a ~40px cinematic face from a ~10-cell-tall grid.
- **Animation = swapping grids or interpolating between them**, not redrawing math. Two expression grids (neutral, smiling) of identical dimensions can crossfade; a melt can interpolate row-by-row from one grid to another (see Pip below).

What this is NOT: it is **not** the `data-pixels` npm package (old, Electron-coupled, prohibited by the no-install rule). It is a ~10-line in-file pattern that borrows the *idea*. No dependency.

---

## Pip's two faces (the thematic core)

Canon (`01-story-bible.md`, `08-character-reference-sheets.md`): Pip appears as **human-boy** (memory) and **present-day ghost**. The bible is emphatic that **eye-dots, blush, and mouth are the SAME across both forms** — "the face is the constant" — and that what changes is everything *around* the face: hair, skin, apron, human-ness. The visual gap between the two is "a quiet thematic spine of the whole game. Don't break it."

This makes the mirror melt exact: the melt must **preserve the constant features (eyes, blush, mouth) and dissolve only the surround** (hair → bald, warm skin → cool-white, the human particulars → nothing). What melts away is precisely "the soft particulars of being a person."

### Human-Pip face (memory / pre-melt) — Register B
Built in the round-faced-boy reference's register: gentle, warm, childlike.
- **Skin:** warm base + one shadow step on the away-from-light side; soft contour, no black line.
- **Hair:** medium brown, kid-cut, three value clusters (base `#4a3020` region, a darker shadow side, a lit highlight band). Small stray fringe per bible.
- **Eyes:** the constant. **Green iris** (muted sea-green — now locked, see "The melt" below), dark pupil, off-white sclera, one highlight pixel. Set wide, gentle.
- **Brows:** soft, flat, low — a calm child.
- **Nose:** 1 shadow pixel.
- **Mouth:** small, neutral-to-soft; the constant mouth shape.
- **Blush:** 2 rose pixels — the constant.
- **Ear:** single pink accent each side.
- **Below frame:** a hint of the beige chef's apron collar (`#e8d8b0`) — memory only.

### Ghost-Pip "face" (present-day / post-melt) — Register B

**Important correction:** ghost-Pip has **no face**. He is a *silhouette* — a round bald ghost shape with three soft waves at the base, a cool halo, two dark eye-dots, two faint blush pixels, and a small mouth. There is no skin, no facial modeling, no human-face structure. "More pixels of the same ghost, not a redesign" (`03-art-and-aesthetic.md`) means *more pixels of the gameplay ghost silhouette* — not a white version of the human face. Drawing a white face where the human face was is the wrong output; it must resolve to the actual ghost form.

- **Form:** cool-white translucent (`#f0f8ff`) round bald head continuing into a body with **three downward waves at the base** (the classic ghost-tail). A soft cool halo/glow contour (`#a8c0ff`), not a skin contour. Edges may blur slightly (the bible's "form blurs when sad/frightened" — apt for the mirror).
- **Eyes:** the SAME constant eyes, now reading as two **dark eye-dots** (`#1a1428`) against cool-white. The human iris color (green) does **not** carry over — it is one of the warm human particulars the melt removes. The dots sit at the **same screen position** as the human eyes did (see "The melt" below).
- **Blush:** the SAME 2 faint rose pixels — the last warm thing left on the ghost.
- **Mouth:** the SAME small mouth.
- **No hair, no apron, no ear detail, no warm skin, no face-shaped head-only crop.** The reflection fills the glass as the small ghost, not as a cropped white face.

This is a *silhouette*, so the wavy tail does not grid cleanly — it's acceptable to author the ghost body shape with a small amount of `fillRect`/curve shaping while keeping the eye-dots, blush, and mouth as the same grid cells they occupy in the human grid.

### The melt (how the two forms relate)
Because the constant features (eyes, blush, mouth) occupy the **same grid cells / same screen position** in both forms, the melt is a structured transition, not a redraw:
1. Hold human-Pip (warm skin, brown hair, **green eyes**, apron-collar hint).
2. The surround dissolves: hair, warm skin, apron, and the green iris-color all drip/sag downward (per the locked liquid-drip melt, ~2s) and give way to the ghost values — warm → cool-white, hair → bald, skin-face → ghost silhouette with the three-wave tail.
3. The constant cells (eye *position*, blush, mouth) **persist** — they are what remains. The eye-dots stay put at the same screen position as the human eyes; only their *color* changes (green iris → dark dot). The blush stays (fainter). The mouth stays.
4. Resolve and hold ghost-Pip's **full silhouette** filling the glass — the small round ghost with the wavy tail and cool halo, eye-dots where the eyes always were. The player watches the human boy's face dissolve and the little ghost is what's left standing in the mirror.

**Eye color is now LOCKED:** human-Pip's iris is **green** (a muted sea-green in the project register, not a bright green). This locks the previously-unlocked "hazel or warm-brown (default)" value. Green is a *warm human particular* — it is removed by the melt; ghost-Pip's eyes are the canonical dark dots.

---

## Other characters (forward notes, not yet specced)

When each gets a cinematic, build its face from the vocabulary above and add a short entry here, sourced from `08-character-reference-sheets.md`:
- **Henrik** — gray beard + hair (three value clusters, desaturated), gray eyes, amber-cream warmth on him (he is a warm-pool character — he can *see* Pip). Older face: add a brow-shadow and a nasolabial shadow pixel for age.
- **Iris (Ch5)** — pale-pale hair (near-white clusters, faint cool shadow), sea-green-blue eyes (`#88b8b0`), Edwardian. Albino-looking but not albino — keep a faint warmth in the skin so she doesn't read as another ghost.
- **Monsters (Haldjas, Karakoncolos, etc.)** — this is where **rim light** earns its place: dark forms against dark grounds, separated by a saturated accent line on lit edges only. Gentle horror — unsettling silhouette, never gore.

---

## What NOT to do

- Don't use black feature outlines (the rejected fork). Soft shadow-tone contours only; black for interior darks.
- Don't add facial detail to Register A gameplay sprites. This whole doc is Register B.
- Don't draw nostrils, individual hair strands, or teeth-by-teeth. Shadow-nose, hair-clusters, 1–2 teeth pixels.
- Don't break Pip's constant features. Eyes/blush/mouth are shared canon across both forms — the melt preserves them.
- Don't invent eye/skin/hair colors outside the locked palette without proposing + logging them.
- Don't exceed the register's density. Image-reference faces that look "HD" are higher-res than our 480×270 world; we borrow their *technique* (value steps, rim light), not their pixel count. A cinematic face is ~24–40px, not 200px.

---

## Status

**Provisional pending the mirror-scene demo pilot** (Sprint 50). The face system and Pip's two grids are validated against the references and canon but unproven in this codebase. After Julia reviews the demo: adopted rules become canonical (Decisions Log entry in `06-roadmap-and-open-questions.md`; cross-ref stubs into `03`, `07`, `08`), and Pip's two face grids — once approved — become the locked reference grids reused by every future Pip cinematic.
