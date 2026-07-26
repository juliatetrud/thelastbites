# 13 — Pixel Art Rules

Craft rules for every pixel drawn in this project. These are **mechanical** rules: things that
are either true of a sprite or not, checkable without taste.

## Where this sits

| Doc | Owns |
|---|---|
| `03-art-and-aesthetic.md` | The bible. Tone, registers, what the art *means*. **Wins over everything.** |
| `10-visual-design-spec.md` | What each chapter and room looks like. |
| **13 (this doc)** | **How a pixel is allowed to be placed. The craft floor.** |
| `11-pixel-craft-and-elaboration.md` | How to make a scene look *rich* — clusters, dither, contrast, rim light. |
| `12-character-pixel-anatomy.md` | Faces and the token-grid authoring standard. |
| `07-sprite-and-animation-guide.md` | Sprite rigs, poses, animation patterns. |

11 and 12 tell you how to make art *good*. This doc tells you how to keep it *coherent* — the
layer underneath, which is where the actual shipped bugs have come from.

---

## 0. The pixel contract

- **Internal resolution is 480×270.** `W`/`H` in `game/index.html`. Everything is authored at
  this size; the browser upscales via CSS `image-rendering: pixelated`.
- **One pixel unit = one canvas unit at 480×270.** Not one CSS pixel. Not one device pixel.
- **The camera scrolls.** Rooms are wider than the frame and `camX` pans. World-space x is
  converted to screen-space at draw time.

> ⚠️ **`art/STYLE.md` contradicts this and is stale.** It specifies a single fixed
> SVG frame at 1120×800 with "no camera system, no scrolling, no parallax." The shipped game
> is a 480×270 canvas with 317 `camX` references. `STYLE.md` describes the earlier CSS/SVG
> prototype (Register C), not the game. **Where they disagree about resolution, framing or
> camera, this doc describes the build.** STYLE.md's *tone* section (cool world, rare warmth,
> Pip as a small warm light) is still correct and still governs.

---

## The rules

### 1. One pixel density. Everywhere in a shot.

Every figure sharing a frame must be drawn at the same pixel scale. A character is not
allowed two different sizes-per-detail in the same room.

**Why this rule exists:** the kitchen shipped with two Henriks — a 68px room sprite in
near-black shirt and cream apron, and a 98px cinematic sprite in a cream chef jacket with a
different skin tone. Both were "fine" alone. Together they read as two different games. That
is the single most damaging pixel-art failure and it is invisible until you see them adjacent.

**Check:** put every figure that can share a frame side by side in the gallery. Same head
height? Same detail-per-pixel? If one has a rendered collar and the other has a 2px block for
a torso, they are not the same density.

### 2. Snap to the pixel grid.

Any coordinate that comes out of a computation — `Math.sin`, a lerp, a camera offset, an
easing curve — gets rounded before it is drawn.

```js
ctx.fillRect(Math.round(x - camX), Math.round(y), w, h);   // yes
ctx.fillRect(x - camX, y, w, h);                            // no — shimmers
```

Unrounded coordinates make edges crawl and shimmer as things move, because the browser
anti-aliases a rect that lands on a half-pixel. It reads as "cheap", and nobody can point at
why.

*Standing debt: ~1,850 of 1,947 `fillRect` calls don't round. Most pass integer literals and
are fine. The ones that matter are any using a computed value — those are the ones to fix on
sight.*

### 3. Scale by whole numbers, or declare it.

`ctx.scale(2, 2)` is pixel art. `ctx.scale(1.35, 1.35)` is a resampled blur.

Integer scale factors only, **unless** the shot is an explicit cinematic close-up, in which
case say so in a comment right there. A cinematic may break the grid; gameplay may not.

*Known non-integer scales in the build: the mirror reflection (~3.45×) and the kitchen
cinematic Henrik (1.35×). Both are close-ups and both are commented.*

### 4. The palette is locked.

Colours come from the token set (`C` in `art-source.js`, `P` in the environment gallery,
`art/tokens.css`). Do not invent a hex because it looked right in the moment.

A new colour is a **proposal**, logged in the Decisions Log, not a keystroke. Almost every
"I need a new shade" is answered by dithering two existing tokens (doc 11, technique 2).

*Standing debt: 817 distinct raw hex literals in `game/index.html`. Not fixable in one pass;
the rule is that new art uses tokens and touched art migrates.*

### 5. Shade by shifting hue, not by darkening.

Multiplying a colour toward black gives muddy, lifeless shadow. Real pixel art rotates hue as
value drops.

- **Shadows shift cool** — toward blue/purple, and slightly desaturate.
- **Highlights shift warm** — toward yellow, and slightly saturate.

This is also why the bible says the world is cool and never gray: gray is what you get when
you shade by darkening. A shadow on warm skin goes toward mauve, not toward brown-black.

### 6. Few values per material.

Three to five values for any one material — base, one shadow, one highlight, plus at most two
transition steps. More than that and the form stops reading; it turns to noise.

If you need a smoother ramp, dither between two of the values you already have.

### 7. The silhouette has to work.

Fill the sprite entirely black. Can you still tell what it is, and who it is?

If two characters have the same silhouette, the difference is being carried by colour alone,
and it will vanish in a dark room — which is most of this game. Fix it with shape: hat, stoop,
hem, pipe, proportion.

### 8. No black keylines. Rim light instead.

Do not outline sprites in black. It flattens the figure and fights the moonlit palette.

Where a dark figure needs to separate from a dark ground, use a **rim light** — a 1px lit edge
on the side facing the light source (doc 11, technique 9). This is already doctrine for the
echo-creatures: warm-amber translucent, no black outline.

Selective darker edges *inside* the silhouette, hand-placed, are fine. A uniform outline is not.

### 9. Curves are a deliberate exception.

`arc`, `ellipse` and gradients anti-alias — they are not hard pixels. The build uses them
freely for Pip's dome, glows and halos, and that is an accepted part of the look.

The rule is that they are **deliberate**: soft where softness is the point (spirit bodies,
light), hard `fillRect` everywhere the world is solid (walls, furniture, props). A brass
fixture built from `arc` calls is a mistake; Pip's body is not.

Never turn off `image-rendering: pixelated`, and never rely on `imageSmoothingEnabled` to save
a blurry sprite — it only affects `drawImage`, not shapes.

### 10. Anchor at the contact point.

Every sprite's local origin is where it meets its support — feet at local `(0, 0)` — and it is
placed with `translate(x, FLOOR_Y)` or onto the surface it rests on.

One floor line per room. Nothing floats except things that are canonically floating (Pip, the
hovering plate, echo-fish).

### 11. One character, one construction.

A character has exactly **one** canonical draw function. Poses, expressions and cinematic
scale are **parameters of it**, not separate re-implementations.

**Why this rule exists:** Henrik has five draw functions in `game/index.html`; Dziadek three;
Babcia, the Doctor, Erik, Iris, the Janitor, the Passenger and Boitatá two each. Every one of
those is a place where the same character can silently drift into two characters — and one of
them did, in the kitchen.

The canonical version lives in the **shared art source**, and the game calls it. That is
already how Pip and Pätu work (`renderPip` / `renderPatu` are thin wrappers). It is how
everyone should work. *(Migration tracked in #141.)*

### 12. Every cell must actually render.

An asset that throws is not a design placeholder, it is a blank. Executing the whole gallery
against a canvas stub catches this in seconds.

**Why this rule exists:** the Mamlambo cell threw `W is not defined` on every render and had
*never once drawn*. It sat in a gallery marked `designed: true` for weeks. Nobody noticed
because nobody had ever run all the cells.

**Check:** the full-gallery render test — every draw function called at two different
timestamps, zero throws, no cell with a suspiciously low draw-call count.

### 13. Motion moves in whole pixels.

A sprite drifting by 0.3px per frame does not look smooth, it looks blurry. Round positions
per frame (rule 2), and prefer motion that advances a whole pixel at a time.

Loops stay **desynchronised** — every ambient animation gets its own period, and periods
should not be integer multiples of each other or they will visibly re-sync.

### 14. Judge it at 1×.

Review art at actual size, in the room it lives in, on the background it will sit on — not
zoomed in, not on white.

A gallery cell that looks great at 4× and vanishes at 1× against a dark wall has failed. The
gallery's light/mid/dark background toggle exists for exactly this.

---

## Self-check before calling any sprite or scene done

1. Same pixel density as everything it shares a frame with. *(rule 1)*
2. Every computed coordinate rounded. *(rule 2)*
3. Scale factor is a whole number, or it's a commented close-up. *(rule 3)*
4. No new hex — tokens, or dither two existing ones. *(rules 4, 6)*
5. Shadows shifted cool, highlights shifted warm; no gray. *(rule 5)*
6. Silhouette test passes — readable and distinct in solid black. *(rule 7)*
7. No black keyline; separation comes from rim light or shape. *(rule 8)*
8. Hard rects for solid things; curves only where softness is the point. *(rule 9)*
9. Base sits on the floor line or on its support. *(rule 10)*
10. Drawn by the character's one canonical function. *(rule 11)*
11. Renders without throwing, in the gallery. *(rule 12)*
12. Checked at 1× on a dark background. *(rule 14)*

---

## What this doc does not cover

Making art *good* — richness, atmosphere, elaboration — is docs 11 and 12. A sprite can pass
every rule here and still be lifeless. These rules only guarantee it is coherent, crisp, and
the same character it was in the last room.

## Status

Written 2026-07-26 alongside the art-completion pass (#142), which brought the gallery to 134
cells with zero placeholders. Rules 1, 11 and 12 are written directly from bugs that shipped;
the rest are standard pixel-art craft calibrated to this project's 480×270 canvas.
