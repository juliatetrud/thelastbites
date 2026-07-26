# The Last Bites — Visual Style Spec ("Moonlit Storybook")

This is the authoritative art spec for the room scenes. Every component and scene must obey
it. When this file and a component disagree, this file wins. When this file and
`03-art-and-aesthetic.md` disagree, `03-art-and-aesthetic.md` wins (it is the game bible;
this file is its rendering guide).

> ⚠️ **Scope note (2026-07-26):** sections 2–4 of this file describe the earlier SVG /
> single-fixed-frame prototype (1120×800, no camera). **The shipped game is a 480×270
> canvas with a scrolling camera.** For resolution, framing, camera and pixel mechanics
> see `design-docs/13-pixel-art-rules.md`, which describes the build. The tone rules
> below — cool world, rare meaningful warmth, Pip as a small warm light — remain correct
> and still govern.

---

## 1. The one image everything serves

Pip is a small warm light moving through a cold, beautiful otherworld. Warmth is rare and
means something. Every art decision either reinforces that or is wrong.

- **The world is COOL** — walls, floors, sky, water. "Cool" means blue or purple, **never
  gray**: the world has chromatic life, just not *warm* chromatic life.
- **Warmth is RARE and meaningful** — candle flames, hearths, lit windows, food, a spirit's
  glow. Never flood a scene with warm light. A warm pool should always feel earned.
- **Black is a color, not absence** — deep, textured, left empty of detail.
- **Pip is cool-white, brighter than his surroundings** — a periwinkle→white gradient that
  reads as a living glow against the night-blue room.

## 2. Palette (locked — reference tokens only, never raw hex)

All colors come from `art/tokens.css`. No component may hardcode hex.

Cool world: `--cool-base:#1c2858` (Ch1 Norway base), `--cool-shadow:#5a4878` (twilight
purple), `--cool-deep:#0e1530`.
Rare warm pools: `--warm-pool-amber:#ffc868`, `--warm-pool-deep:#c87830`,
`--warm-pool-glow:#ffe088` (brightest, used sparingly).
Deep blacks: `#000000`, `#080604`.
Accents: `--shimmer:#8cc8ff` (cool-blue, collected items only), `--cream:#fff4d8`
(narration), Pip `--spirit-pip:#f0f8ff` → `--periwinkle:#b9c4f0`.
Materials: `--gild:#cda64e`, `--mahog:#321f12`/`--mahog-hi:#503320`, `--carpet:#6e2724`,
`--velvet:#2c5240`.
Aurora: `--aurora-green:#54d49a`, `--aurora-teal:#3ea6bc`, `--aurora-violet:#8a6cce`.

**Regional rule:** each chapter shifts the *cool base hue* only; warm tokens stay constant.
Ch1 (Norway) base is `--cool-base` with `--cool-shadow` shadows.

Rendering is **soft**: SVG gradients and halos, not hard pixel fills. Pip's body is the
periwinkle→white radial gradient.

## 3. Format: a SINGLE FRAMED SCENE

- The scene is **one fixed frame** (viewBox `0 0 1120 800`). The camera does not move and
  does not pan. The entire room is composed and visible at once, like a storybook plate or
  a cutscene shot.
- No camera system, no scrolling, no parallax. Everything lives inside the one frame.
- Compose for the frame: balance the room left-to-right, give Pip clear negative space,
  don't crowd the edges.

## 4. Depth & the ground plane (this is what keeps things from floating)

- There is exactly **one floor line, `FLOOR_Y`**. Every floor-standing object's base sits
  on it. Nothing floats.
- Each component is drawn **anchored at its own local origin = the point where it meets its
  support** (feet/base at local y=0, x=0 centered). Placement is then `translate(x, FLOOR_Y)`.
  An object resting *on* another (the cat on a chair seat, a cup on a table) anchors to that
  object's surface Y, never to free space.
- **Three depth layers, drawn back→front:**
  1. **Wall plane** — window, wall art, mirror, curtains, bookshelf, sofa, desk. Drawn flat
     against the wall with a thin **contact shadow** where they meet the floor, so they read
     as *along the wall*.
  2. **Pip** — drifts in front of the wall plane, behind the foreground.
  3. **Foreground** — rug, armchairs, coffee table, globe, side table, the cat's chair, the
     mouse. Larger scale, stronger/darker contact shadows.
- Pip must pass **in front of** wall-plane furniture and **behind** foreground furniture.
- A subtle scale shift sells depth: Pip a touch larger when he moves toward the foreground,
  smaller when he's back at the wall.

## 5. Lighting

- One cool ambient key (moon/aurora through the window) keeps the room in shadow without
  going black.
- Warm sources (candles, hearth, lamps, lit windows) each get a **radial halo that fades
  fully to transparent** — the halo sells the glow, not the object. Halos pulse gently and
  **out of phase** with each other.
- A flame casts a **flickering shadow** that moves with the flame.
- Gradient every large plane (sky, water, wall, floor) — flat fills read as paper.

## 6. Animation philosophy

- Slow, overlapping, **never-synchronized** loops. Every animation has a different duration.
- Organic motion uses gentle ease-in-out; only drifting water/mist uses linear.
- Pip **floats** — gentle vertical bob + slight counter-rotation, out of sync with anything
  beneath him. He never steps; he rises and drifts. Anchor him by his hem-bottom.
- He may drift between a few stations within the frame (e.g. desk → sofa → foreground →
  back), pausing at each and flipping to face travel direction. This is movement *within the
  fixed frame*, not a moving camera.
- Reserve big motion for rare beats; ambient motion stays small.
- Always provide a **`prefers-reduced-motion` static fallback** (a still, composed frame).

## 7. Pip (hero sprite)

- Rounded dome body → soft scalloped hem (3–4 waves). Head ~60–65% of height. Baby
  proportions; the cuteness is in the proportion.
- Semi-transparent (~90–94%), periwinkle→white radial gradient, faint crown highlight, thin
  near-white outline so he never dissolves into the dark.
- Two tall blue-charcoal eyes (not black) with tiny offset catch-lights; a single small
  smile; soft pink blush cheeks (**do not omit — this is what makes spooky cozy**).
- Carries Henrik's candle (a warm point he moves through the cold).
- Faces his direction of travel; flips horizontally on turns.

## 8. Hard "don'ts" (the bugs we are preventing)

- **No floating ambient glows / yellow blobs.** Treats are plain objects. The warm
  "collect aura" is gated to Pip's `↓` ability and is NOT drawn in ambient art.
- **No free-floating shapes in the mirror.** A mirror shows a clipped, dimmed (~35%),
  horizontally-mirrored copy of what is actually in front of it.
- **Nothing floats.** Especially the cat — anchor it to the chair seat.
- **No unfinished flat silhouettes for art.** Framed paintings get a mat, a gilt frame with
  corner detail, and a faint glass highlight.
- **No gray, no warm sky, no daylight.** The world is cool and chromatic; warmth only at
  rare amber pools.
- **No raw hex** anywhere — tokens only.
- **No synced animation loops.**
- **No camera, no scrolling, no parallax** — this is a single fixed frame.

## 9. Self-check before calling the scene done

1. Every base meets the floor or its support; nothing floats (check the cat).
2. Wall furniture reads as against the wall (contact shadows); foreground reads as forward
   (scale + stronger shadow).
3. No stray glows. The mirror reflects coherently.
4. Wall art looks finished (frame, mat, highlight).
5. Pip passes behind foreground and in front of wall furniture as he moves.
6. Palette is tokens only; mood is cool-with-rare-warmth, spooky-but-cozy.
7. The scene is one fixed 1120×800 frame — no camera movement.
8. Reduced-motion fallback renders a clean still.
