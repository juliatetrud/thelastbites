# Sprite and Animation Guide (for Claude Code)

A handoff guide for building character sprites, poses, and animations in *The Last Bites*. Read this before starting any sprite or animation work. Companion to `05-tech-architecture.md` (which covers the broader prototype architecture) and `03-art-and-aesthetic.md` (which covers what the art should look like).

This doc covers *how to build it in code*. The aesthetic doc covers *what it should look like*. The story bible covers *why it matters*.

---

## When this doc applies

Use this guide whenever a sprint asks you to:

- Add a new character sprite (NPC, echo-creature, scripted-walk figure)
- Add a new pose to an existing character (sit, walk, hiss, sleep, eat, etc.)
- Build an animated sequence (eating, tasting, fading, transition between states)
- Add a directional sprite that needs to flip facing
- Build an interaction beat with arms/hands/held objects

If the sprint is asking for a Register B cinematic (a static painterly image, 480×270, commissioned or AI-referenced), this doc does **not** apply — that's image-draw work, not procedural canvas work. See `03-art-and-aesthetic.md` §"Visual Registers" for the distinction.

---

## Foundational rules

### Use canvas `ctx.fillRect` exclusively

All gameplay sprites in this project are **true pixel art drawn procedurally to canvas**. No SVG. No HTML/CSS for sprite shapes. No image files (yet — those come at commissioning time).

Every sprite is a sequence of `ctx.fillRect(x, y, w, h)` calls with solid color fills. Hard pixel edges, no anti-aliasing, no gradients within the sprite itself.

```javascript
// Correct — single pixel
ctx.fillStyle = '#f0f8ff';
ctx.fillRect(x, y, 1, 1);

// Correct — a 3-pixel-wide stripe
ctx.fillRect(x, y, 3, 1);
```

Gradients are fine for *backgrounds and glows* (drop-shadows, light pools, vignettes) — those are atmospheric, not sprite anatomy.

### Use the locked color tokens

Pull colors from `03-art-and-aesthetic.md` §"Locked aesthetic rules". Don't invent new ones for a single sprite. If a new color is genuinely needed (e.g. an NPC has a unique signature color), propose it and ask before adding to the canonical palette.

A `C` object at the top of the file collects color tokens by use:

```javascript
const C = {
  pipBody:   '#f0f8ff',
  pipEye:    '#1a1428',
  pipBlush:  '#ff9888',
  catLight:  '#7a8298',
  catMid:    '#5a6278',
  catDark:   '#2a2f3a',
  catEye:    '#ffd84a',
  // ... etc
};
```

### Respect the visual register

Every sprite is **Register A** by default (sparse, ~16-36 pixels, procedural pixel art). If asked for something larger or more painterly, stop and confirm — that's likely Register B work (commissioned art) and shouldn't be done in code.

See `03-art-and-aesthetic.md` §"Visual Registers" for full register definitions.

---

## The three-layer sprite rig (canonical pattern for any speaking/reacting character)

This pattern is locked in `05-tech-architecture.md` and is the canonical way to build any character who needs expression. Use it for Pip, Henrik, Leida, Babcia, Dziadek, Iris, Muhittin, Sandy, Johannes — anyone who speaks or reacts.

The three layers:

1. **Body** — silhouette, color, glow. Drawn first.
2. **Eyes** — two eye-dots, driven by an eye-state object. Drawn on top of body.
3. **Mouth** — small mouth shape, driven by a mouth-state object. Drawn on top of body.

Each layer has its own animation timeline (e.g. blinks happen on a 3-6s random cadence; mouth shape changes per emotional beat).

**When NOT to use the three-layer rig:** scripted-walk NPCs that don't speak or react (the Passenger in Sprint 03). Those are one-piece silhouettes. The rig is reserved for characters who carry emotional bandwidth — eyes and mouth are where that bandwidth lives.

---

## The canvas-mirror flip pattern (for directional sprites)

When a sprite needs to face left or right, **never draw two versions of the sprite**. Draw it facing right, then mirror it with a canvas transform when needed:

```javascript
ctx.save();
if (facingLeft) {
  ctx.translate(x + spriteWidth, 0);  // move origin to the sprite's right edge
  ctx.scale(-1, 1);                    // flip X axis
  // Now draw using x=0 as the new origin offset
  drawSpriteAt(0, y);
} else {
  drawSpriteAt(x, y);
}
ctx.restore();
```

This pattern is established in `05-tech-architecture.md` for Pip and applies to every directional sprite. The Passenger in Sprint 03 uses it. Pätu's walking pose uses it.

**Inside a mirrored sprite, draw functions are unaware of the flip.** They draw normally; the transform takes care of the visual flip. A head function drawing "side-right" eyes will render visually pointing-left after the mirror — and that's correct.

---

## Pose system: building a character with multiple states

Most characters in the game need multiple poses (Pip: idle/walking/floating/tasting/sad; Pätu: sitting/walking/hissing/sleeping/stretching/looking). The canonical pattern is one draw function per pose, dispatched from a state machine.

### Step 1: Define a state object

```javascript
const character = {
  x: 100,
  y: 144,
  state: 'idle',         // current pose
  facing: 'right',       // 'left' | 'right'
  frame: 0,              // for animations with multiple frames
  // ...any pose-specific state
};
```

### Step 2: One draw function per pose

```javascript
function drawCharacterSitting(x, y) { /* ... */ }
function drawCharacterWalking(x, y, frame, facingLeft) { /* ... */ }
function drawCharacterSleeping(x, y, breath) { /* ... */ }
// etc.
```

### Step 3: Dispatch from the render loop

```javascript
switch (character.state) {
  case 'sitting':  drawCharacterSitting(character.x, character.y); break;
  case 'walking':  drawCharacterWalking(character.x, character.y, character.frame, character.facing === 'left'); break;
  case 'sleeping': drawCharacterSleeping(character.x, character.y, now); break;
  // etc.
}
```

### Step 4: Shared sub-functions for parts that appear in multiple poses

When a part is shared across poses (e.g. a head with multiple directional variants, or a body that's the same in sitting and sleeping), factor it into a helper:

```javascript
// Used by sitting, sleeping, and looking-back poses
function drawCharacterHead(x, baseY, direction) {
  // direction: 'forward' | 'side-left' | 'side-right'
  // ...
}
```

This is how Pätu's poses are built. The sitting body is shared with sleeping (sleeping is sitting + closed eyes + z's), and the head has three direction variants.

---

## Pose-specific patterns we've established

Patterns discovered building Pip and Pätu. Reuse these for new characters.

### Idle pose

- Single canonical "rest" stance — the default state
- Subtle vertical bob: `Math.round(Math.sin(now / 600) * 0.6)` gives a gentle 1-pixel up/down cycle over ~3.7 seconds
- Blinks fire on a 3-6 second random cadence (handled by the eye-state object)

### Walking pose

- **Two alternating frames** on a ~250ms cadence. `Math.floor(now / 250) % 2` gives you frame 0 or 1.
- One frame has one set of legs forward, the other has them reversed.
- For four-legged characters (Pätu), alternate front-left/back-right vs front-right/back-left.
- Tail position should suggest direction of motion (cat tail-up = confident walk; tail-low = sneaking).
- **Always paired with the canvas-mirror flip** when facing left.

### Sleeping pose

- Build from the sitting pose, not from scratch. Cats often sleep upright. The sleeping state is *sitting + eyes closed + breath cycle + z's*.
- Closed eyes: short horizontal dark lines (2px wide, 1px tall) instead of yellow/colored circles.
- Breath cycle: subtle whole-body vertical offset on a slow sine wave (~5 seconds per cycle, 1-pixel max).
- Z's drift up from above the character's head, staggered. See "Atmospheric particles" below.

### Hissing pose (for animals)

- This is a **gameplay-critical pose** — it must read at a glance because it signals "bad ghost present" later in the game.
- Required readable features:
  - Arched back (body bowed upward)
  - Ears pinned flat (drawn as small horizontal nubs against the head)
  - Fluffed tail straight up (no curl — distinct from friendly tail-up walking pose)
  - Wide eyes with whites visible around the colored iris
  - Open mouth with at least 1-2 visible tooth pixels
- Build this pose last in any animal-character sprint and verify it reads from across the room before locking.

### Stretching pose (for animals)

- Front low, rear high — the classic cat stretch
- Tail up with tip curl (same gestural energy as walking)
- Useful as a transition between sleep and walk

---

## Multi-phase animation pattern

For animations longer than a simple two-frame loop (Pip eating lefse, a fade-in/fade-out cinematic, the mirror melt), structure them as **named phases with durations**:

```javascript
const PHASES = [
  { name: 'idle',       duration: 1500 },
  { name: 'reaching',   duration: 1200 },
  { name: 'lifting',    duration: 1000 },
  { name: 'biting',     duration:  600 },
  { name: 'swallowing', duration: 1200 },
  // ...
];

let phaseIdx = 0;
let phaseStart = 0;
```

In the render loop, compute `t` (0..1 progress within the current phase) and advance to the next phase when `elapsed >= duration`:

```javascript
const phase = PHASES[phaseIdx];
const elapsed = now - phaseStart;
const t = clamp(elapsed / phase.duration, 0, 1);

if (elapsed >= phase.duration) {
  phaseIdx = (phaseIdx + 1) % PHASES.length;  // loop, or advance, or end
  phaseStart = now;
}
```

Then `switch (phase.name)` to compute the state object for this frame:

```javascript
const state = { /* default values */ };

switch (phase.name) {
  case 'reaching':
    state.armReach = easeInOut(t);
    state.handX = lerp(pipX + 8, plateX, state.armReach);
    break;
  case 'lifting':
    state.armReach = 1;
    state.handY = lerp(plateY - 4, plateY - 10, easeInOut(t));
    break;
  // etc.
}

drawCharacter(x, y, state);
```

**Always use easing on visible motion** — `easeInOut(t)` instead of raw `t` makes movements feel natural. Linear motion feels mechanical.

```javascript
function lerp(a, b, t)  { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
function easeInOut(t)   { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
```

---

## Ghost-arm pattern (for Pip and other ghost characters)

Pip's body is a featureless ghost shape — no visible arms by default. When he needs to interact with the world (eat, touch a memory object, gesture), arms **emerge from his body** as part of his ghost form.

### How it works

- Arms are drawn from a "shoulder anchor point" on the side of the body to a target "hand position"
- The arm is a line of single pixels using a Bresenham-style step, with a small sinusoidal curve so it bows outward
- The hand is a small 2x2 + 1 cluster at the target position
- Both arms and hands use the same translucent ghost-white color as the body, at slightly lower alpha (~0.8)
- When the character isn't interacting, arms aren't drawn — the body stays a closed silhouette

```javascript
function drawGhostArm(shoulderX, shoulderY, handX, handY, isLeft) {
  const steps = Math.max(Math.abs(handX - shoulderX), Math.abs(handY - shoulderY)) + 1;
  ctx.globalAlpha = 0.8;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const px = Math.round(shoulderX + (handX - shoulderX) * t);
    const py = Math.round(shoulderY + (handY - shoulderY) * t);
    const curve = Math.sin(t * Math.PI) * (isLeft ? -1 : 1);
    ctx.fillStyle = C.pipBody;
    ctx.fillRect(px + Math.round(curve), py, 1, 1);
  }
  ctx.globalAlpha = 1;
}
```

### When to use ghost arms

- Eating (reaching, holding food, biting)
- Touching memory objects (Ch2 Leida's pan, Ch5 Iris's switchblade)
- Reaching toward another character in an emotional beat
- Holding the journal open (Ch5+ when reading)

### When NOT to use ghost arms

- Ambient idle bobbing — arms shouldn't be visible by default
- Walking — Pip floats; he doesn't need arms to move
- Iris-style ghosts who default to *solid* — Iris has visible arms always, she handles things normally. Ghost arms are Pip's signature.

---

## Food-flow / glow-through-body pattern

When Pip eats or drinks, the food visually travels through his translucent body to his belly. This is the "tummy glow" pattern.

Three components:

1. **Falling food** — a small piece of the food drawn at decreasing y values, traveling from mouth-height to belly-height over ~1.2 seconds. With a 2-3 pixel trailing shimmer at decreasing alpha behind it.
2. **Belly glow** — a radial gradient centered roughly at body-center, slightly below midline. Warm color matching the food. Ramps up over the swallow phase, holds during tasting, fades during the smile/reset phase.
3. **Halo shift** — Pip's outer halo gradient warms from cool blue-white to amber when the taste-memory triggers, then cools back. The bible describes this as "his outline glows a little warmer when emotionally moved."

This pattern repeats across every meal in the game. The food color changes per meal (lefse = cream/amber, gravlaks = pink-warm, muhammara = red-warm, pierogi = warm-cream), but the structure is the same.

---

## Pip body-language vocabulary

Established during Sprint 00 art work. Pip expresses through five small variations:

| State | Visual |
|---|---|
| Default | Closed ghost shape, gentle bob, eyes open, neutral mouth |
| Reaching | Arms extended out from sides toward a target |
| Holding | Arms forward, hands together at a held object |
| Tasting | Eyes closed in soft curves, warm halo, belly glow, blush warmer |
| Joy | Small upward-curve mouth, slightly brighter blush |
| Sad | Eyes downturned (or normal with form-blur), slight opacity drop, slower bob, head-tilt |
| Surprised | Eyes wider (`scaleY: 1.4`), mouth small open oval |
| Form-blur | Slight gaussian blur at the edges, lowered alpha — when afraid or sad |

For any new emotional beat involving Pip, compose from these primitives rather than inventing new visual states.

---

## Pätu (cat) tail gestural vocabulary

The cat's tail position is body-language and signals her state at a glance. Lock these meanings; don't mix them up:

| Tail position | Meaning |
|---|---|
| Wrapped around feet | Sitting, settled |
| Wrapped over nose | Sleeping (sitting upright, eyes closed) |
| Up with tip-curl (question-mark shape) | Walking, alert, comfortable |
| Up vertical, fluffed (no curl, wider) | Hissing, threat, fear |
| Mid-flick / lashing | Tense, uncertain — use sparingly, this is rare |
| Held low or tucked | Submission, hurt — use only when the story calls for it |

When building a new Pätu pose, the tail position is part of the pose's meaning. Don't default to "tail up" for all poses.

---

## Atmospheric particles (z's, dust motes, sparkles)

Small drifting particles add life without expensive animation. Three established patterns:

### Z's (sleeping)

Three z's, staggered by ~800ms, each rising and fading over ~2.4 seconds with a gentle sinusoidal side-to-side sway. Each z is a 3x3 pixel shape (top horizontal bar, diagonal pixel, bottom horizontal bar) in a warm cream color so it reads against the cool background.

```javascript
function drawSleepZ(originX, originY, time, offset) {
  const cycle = 2400;
  const t = ((time + offset) % cycle) / cycle;
  if (t > 0.95) return;
  const yOff = Math.floor(t * 18);
  const xOff = Math.floor(Math.sin(t * Math.PI * 2) * 1.5);
  const alpha = t < 0.7 ? 0.7 : 0.7 * (1 - (t - 0.7) / 0.3);

  ctx.globalAlpha = alpha;
  rect(originX + xOff, originY - yOff, 3, 1, '#e8d8a8');     // top bar
  rect(originX + xOff + 1, originY - yOff + 1, 1, 1, '#e8d8a8');  // diagonal
  rect(originX + xOff, originY - yOff + 2, 3, 1, '#e8d8a8');     // bottom bar
  ctx.globalAlpha = 1;
}
```

### Dust motes (ambient atmosphere)

The existing prototype's dust-mote system uses small 1x1 pixels with sinusoidal drift. Reuse the existing system; don't reinvent it.

### Sparkles (inspection-proximity indicator)

Established in the cabin prototype. Sparkle appears when Pip is within ~18 pixels of an inspectable object. Already factored — call `drawSparkle()`, don't reinvent.

---

## Shadows and glows under characters

Two rules based on whether the character is alive or a ghost:

**Living characters (Pätu, Henrik, all NPCs)** get a **warm shadow** underneath:
```javascript
const shadow = ctx.createRadialGradient(cx, y - 1, 0, cx, y - 1, 12);
shadow.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
ctx.fillStyle = shadow;
ctx.fillRect(cx - 12, y - 3, 24, 6);
```

**Ghost characters (Pip, Iris when translucent)** get a **cool glow** underneath, not a shadow:
```javascript
const glow = ctx.createRadialGradient(cx, y + 1, 0, cx, y + 1, 14);
glow.addColorStop(0, 'rgba(168, 192, 255, 0.5)');
glow.addColorStop(0.5, 'rgba(168, 192, 255, 0.18)');
glow.addColorStop(1, 'rgba(168, 192, 255, 0)');
ctx.fillStyle = glow;
ctx.fillRect(cx - 8, y - 4, 32, 12);
```

This is a story rule, not just a visual rule. Ghosts are luminous; living things cast shadows.

---

## Process for any new sprite or animation sprint

When the user asks for a new sprite or animation, follow this order:

1. **Confirm the register.** If it's Register B (commissioned art), stop and redirect. This guide is for Register A.

2. **Read the canon.** Story bible for who the character is. `03-art-and-aesthetic.md` for what they look like. Any chapter outline that mentions them.

3. **Check for existing primitives.** Don't reinvent z's, sparkles, ghost arms, shadow gradients, the canvas-mirror pattern. Use what's already there.

4. **Build the canonical pose first.** Get the rest state right. That becomes the anchor.

5. **Layer variants on top.** Other poses share the base; only what differs gets new code.

6. **Test the silhouette at room scale.** A sprite that reads at 4× zoom but blurs at 1× is broken. Check at actual gameplay scale before locking.

7. **For animals: respect gestural vocabulary.** Tail position, ear position, body posture all carry meaning. Don't randomize them.

8. **For animations: structure as phases.** Named phases with durations, dispatch via `switch`, ease all visible motion.

9. **For directional sprites: never draw twice.** Use the canvas-mirror pattern.

10. **Stop and ask** if anything is ambiguous against the canon, rather than guessing.

---

## What this doc does not cover

- **Register B cinematics.** Static painterly images. Different process — see `03-art-and-aesthetic.md` and the Gem instructions.
- **UI elements.** Dialogue box, controls strip, journal. See `03b-ui-spec.md`.
- **Room backgrounds.** Different rendering approach (gradients, parallax layers). See existing `drawCabin` and `drawHallway` in the prototype.
- **Sound and music.** Not yet specified.
- **The cinematic-overlay system.** See `05-tech-architecture.md` §"Cinematic System".

---

## Quick reference

- Drawing primitive: `ctx.fillRect(x, y, w, h)` with solid color fill
- Colors: pulled from `C` constant object, sourced from `03-art-and-aesthetic.md`
- Sprite rig: three independent layers (body, eyes, mouth) for speaking/reacting characters
- Direction: canvas-mirror pattern (`ctx.save()` + `ctx.translate()` + `ctx.scale(-1, 1)`)
- Poses: one draw function per pose, dispatched from state machine
- Animations: named phases with durations, eased motion
- Pip arms: emerge translucent from body when interacting, retract when idle
- Food flow: falling food + belly glow + halo warm-shift
- Pätu tail: gestural — position signals state
- Shadows: warm for living, cool glow for ghosts
- Atmospheric particles: z's for sleep, dust for ambient, sparkles for inspect

When in doubt, read the existing prototype and follow the patterns it already uses. The prototype is the canon.
