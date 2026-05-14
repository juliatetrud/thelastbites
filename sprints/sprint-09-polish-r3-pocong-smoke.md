# Sprint 09 polish — Round 3: Pocong's orbiting smoke

A final small polish to Pocong's mist aura: replace the current 8-patch ambient drift with thick swirling smoke that orbits his body, alpha 0.40–0.55, with techniques to keep it feeling alive rather than mechanical.

## Goal

Upgrade Pocong's signature aura from ambient gray haze to thick swirling smoke that visibly orbits his body, marking him as a full-threat visual presence. The cooperative resolution arc in Ch6 will reframe him narratively; visually, he reads as dangerous.

## Definition of done

- Pocong's `drawPocongMist` function is rewritten with the following parameters:
  - **Patch count:** 15 patches (was 8)
  - **Alpha:** 0.40–0.55 per patch (was 0.10–0.15) — thick, visibly opaque smoke
  - **Spatial scope:** patches occupy a tight 25 px wide × 80 px tall region around Pocong's body axis
  - **All patches orbit** — the entire smoke field rotates around Pocong, using him as a vertical axis. Patches at varied radii pass in front of and behind his shroud
  - **Variation techniques applied** to prevent mechanical pinwheel feel:
    1. **Per-patch radius variance** — radii distributed in the range ~6–25 px from his vertical axis
    2. **Per-patch angular velocity variance** — base angular velocity ±30% per patch, so patches drift relative to each other over time
    3. **Radial wobble** — each patch's radius oscillates by ~±3 px on a slow per-patch sine cycle (period 2–4 s, randomized per patch)
    4. **Depth-based alpha** — patches dim ~30% as they pass "behind" Pocong (when their orbital angle places them on the far side of his vertical axis); brighten as they pass in front. Creates the sense of smoke wrapping around a solid body
    5. **Patch lifetime/respawn** — each patch has a ~6–10 s lifetime; near end-of-life it fades out, then respawns at a new orbital angle and radius. Prevents the "same 15 patches forever" feel. Stagger initial lifetimes so patches respawn asynchronously
  - **Vertical drift** — each patch's vertical position drifts slowly (±10 px on a slow sine, period 4–6 s per patch). Patches don't stay locked to fixed heights along his body
  - **Patch radius (visual size, not orbital radius):** 5–8 px per patch (mid-range patches slightly larger than the prior 5–9 px range)
  - **Color preserved** — gray `#6a6a78` to `#3a3a44` matching the current treatment. No color change; only density / motion / alpha changes
- The mist still renders **before Pocong's shroud is drawn** so the shroud appears in front of the front-of-body smoke. The depth-based alpha (technique 4) creates the visual sense of patches passing behind the shroud
- All other Pocong elements unchanged: shroud capsule, three knot-lines, glowing yellow eyes, angry eyebrows, hopping animation, shroud-edge shimmer when speaking, faint mouth-line when speaking

## Doc updates

In `design-docs/08-character-reference-sheets.md`, update the Pocong entry to reflect the new mist treatment:
- Replace the prior "drifting gray mist" description with **"thick orbiting smoke"** — call out the orbital motion, the depth-based alpha (smoke passing behind shroud), and the variation techniques that keep it from feeling mechanical
- Note that this is a deliberate full-threat visual register; the cooperative resolution arc in Ch6 must do narrative work to land

In `design-docs/06-roadmap-and-open-questions.md`:
- Append a Decisions Log entry:

  > | YYYY-MM-DD | **Pocong mist treatment upgraded to thick orbiting smoke (Sprint 09 polish round 3).** 15 patches at alpha 0.40–0.55, all orbiting Pocong's vertical axis with radius variance, angular-velocity variance, radial wobble, depth-based alpha, patch lifetime/respawn, and vertical drift to prevent mechanical pinwheel feel. Reads as full-threat visual register. Cooperative resolution arc in Ch6 must do narrative work to reframe him. Future monsters (Karakoncolos, Black Shuck, Boitatá, Mamlambo) will need visually distinct registers — not "thick smoke but darker/redder" variations. |

- Add an Open Question entry for future monsters:

  > - **Per-monster visual register beyond Pocong's smoke.** Pocong is locked at thick orbiting smoke. Karakoncolos, Black Shuck, Boitatá, and Mamlambo need their own distinct visual treatments — not smoke variants. Designed when each character is added to the gallery. Flagged 2026-05-14.

- Sprint History row:

  > | 09-polish-r3 | Pocong thick orbiting smoke | YYYY-MM-DD | Pocong's mist upgraded from 8-patch ambient drift to 15-patch thick orbiting smoke. Full-threat visual register locked. Future monsters need distinct treatments, not smoke variants. |

## Implementation notes

### Patch state structure

Each of the 15 patches needs persistent state to support lifetime, asynchronous respawn, and per-patch variation. Suggested structure (at gallery scope, initialized on first render):

```
pocongPatches = [
  {
    angle: <initial orbital angle, radians>,
    angularVel: <base ω * (1 + random_variance(±0.3))>,
    baseRadius: <random in [6, 25] px>,
    wobbleAmp: <random in [2, 4] px>,
    wobblePeriod: <random in [2, 4] seconds>,
    wobblePhase: <random initial phase>,
    yOffset: <random in [-30, 50] px, controlling vertical position relative to Pocong's center>,
    yDriftAmp: <random in [8, 12] px>,
    yDriftPeriod: <random in [4, 6] seconds>,
    yDriftPhase: <random initial phase>,
    patchRadius: <visual size, random in [5, 8] px>,
    lifetime: <random in [6, 10] seconds>,
    age: <random initial age, staggered so patches don't all respawn at the same time>
  },
  ...
]
```

Initialize this array once on first render. On each subsequent frame, advance each patch's state by `dt` and respawn any that exceed their lifetime.

### Per-frame computation

For each patch, on each frame:

```
patch.age += dt
if patch.age > patch.lifetime:
    // Respawn: reset age and randomize position parameters
    patch.age = 0
    patch.angle = random_radians()
    patch.baseRadius = random in [6, 25]
    patch.yOffset = random in [-30, 50]
    patch.lifetime = random in [6, 10]
    // Other parameters can also be re-randomized if desired

// Update orbital angle
patch.angle += patch.angularVel * dt

// Compute current radius with wobble
currentRadius = patch.baseRadius + sin(t * (2π / patch.wobblePeriod) + patch.wobblePhase) * patch.wobbleAmp

// Compute current vertical offset with drift
currentY = patch.yOffset + sin(t * (2π / patch.yDriftPeriod) + patch.yDriftPhase) * patch.yDriftAmp

// Position relative to Pocong
patchX = pocongCenterX + cos(patch.angle) * currentRadius
patchY = pocongCenterY + currentY

// Depth-based alpha: when patch is "behind" Pocong (angle in roughly [π/2, 3π/2] facing away),
// reduce alpha by ~30%
isBehind = cos(patch.angle) < 0  // simplest version: patch is on the far side
depthAlpha = isBehind ? 0.70 : 1.00

// Fade in/out based on age (first 0.3s and last 0.5s of lifetime)
fadeIn = min(1.0, patch.age / 0.3)
fadeOut = min(1.0, (patch.lifetime - patch.age) / 0.5)
lifetimeAlpha = min(fadeIn, fadeOut)

// Base alpha randomized per patch in [0.40, 0.55]
finalAlpha = patch.baseAlpha * depthAlpha * lifetimeAlpha
```

### Rendering

Each patch is rendered as a radial gradient (gray center to transparent edge), centered at `(patchX, patchY)`, with the computed alpha. Use the same color tone as before (`rgba(100, 100, 120, ...)` family) with the new higher alpha values.

### Determinism

For consistency across renders, use a seeded random for initial patch state. The patches should look the same every time the page loads — they shouldn't be different every refresh. Use a simple seeded PRNG or hardcode some per-index initial values.

### Patch count tuning

15 patches is the spec floor. If the visual feels too sparse, the count can scale up to 18–20. If it feels too dense or laggy, scale down to 12. Choose the count that makes the smoke read as *thick swirling* without obliterating Pocong's silhouette.

## Files to create or modify

Modify:
- `game/character-gallery.html` — rewrite `drawPocongMist` per the spec
- `design-docs/08-character-reference-sheets.md` — update Pocong entry's mist description
- `design-docs/06-roadmap-and-open-questions.md` — one Decisions Log entry; one Open Question; one Sprint History row

Do not modify:
- Pocong's eyes, eyebrows, body, shroud, hops, shimmer, or mouth line
- Any other character
- Any other design doc

## Out of scope

- Generalizing the orbital-smoke system to other monsters. Pocong's treatment is Pocong's.
- A user-facing option to tune the patch count.
- In-game implementation. Gallery only.
- The Ch6 cooperative resolution arc's narrative work to reframe Pocong. That's a chapter-design problem, not a polish problem.

## Test checklist

1. **Open `game/character-gallery.html`** and observe Pocong for at least 30 seconds:
   - Thick smoke visibly orbits Pocong's body, not just floats near him
   - The smoke does not look like a pinwheel — patches move at different rates and don't stay in fixed relative positions
   - Patches passing behind Pocong appear noticeably dimmer than patches passing in front
   - Over time, individual patches fade out and reappear at different positions — the smoke field is alive, not static
   - The overall feel is **threat presence**: Pocong looks dangerous, not just spooky

2. **Pocong is still legible.** His shroud, glowing yellow eyes, knot-lines, and overall silhouette remain visible through the smoke. The smoke should *frame* him, not obscure him.

3. **Speaking animation still works.** Toggle Pocong's speaking state. Shroud-edge shimmer and faint mouth-line still appear.

4. **Hopping animation still works.** Pocong still hops every ~3.8 seconds. The smoke continues swirling during the hop.

5. **Performance.** No noticeable framerate drop with 15+ animated patches. If the framerate suffers, reduce patch count toward 12.

6. **No console errors.**

7. **Determinism.** Refresh the page. The smoke should look like the same effect — not a different randomization each time.

8. **Doc updates landed.** 
   - Doc 08 Pocong entry mentions thick orbiting smoke
   - Doc 06 has the new Decisions Log entry, the new Open Question, and the new Sprint History row

## Report back

After this polish lands, Claude Code reports:

1. Whether the smoke reads as **thick swirling** (the intent) or as **busy/chaotic** (the failure mode). The smoke should feel like a single coherent presence around Pocong, not 15 independent particles flying around him.
2. Whether the depth-based alpha (patches passing behind shroud dimmer than in front) reads as 3D depth, or just as random alpha variation.
3. Whether the patch lifetime/respawn is noticeable enough to feel alive, or so noticeable that patches popping in and out is distracting.
4. The chosen patch count if different from 15.
5. Any open questions surfaced during implementation.
