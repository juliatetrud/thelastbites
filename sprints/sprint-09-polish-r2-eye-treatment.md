# Sprint 09 polish — Round 2: Eye treatment rule, Babcia, Henrik, Pocong, Erik refinements

Second polish pass before Sprint 10. Locks the canonical eye-treatment rule across the cast and refines four characters in the gallery per Julia's review.

## Goal

Establish eye treatment as a project-wide visual rule (human characters get whites + pupils; Ghost-Pip is the exception; monsters get per-character treatments). Refine Babcia, Henrik, Pocong, and Erik in `game/character-gallery.html` against the new rule and against specific design notes. Add Babcia's crying overlay so it's available for Sprint 11's mirror beat and the first scene of Chapter 1.

## Definition of done

### Eye treatment canonical rule (new)

Document a new project-wide rule in `design-docs/08-character-reference-sheets.md`:

- **Living and recently-deceased human characters:** ~2 px tall eye whites in cream/pale color, with a darker pupil within. Eye size scales slightly per character — children (Erik) get a touch more emphasis for sympathy; adults get standard treatment.
- **Ghost-Pip is the exception:** his eyes stay as small dark dots, no whites. His face is forming, not formed. This is a deliberate visual marker that he is *new* to the ghost-world.
- **Other ghost-children:** Iris, Erik — these characters appear as their living selves did. They get the standard human eye treatment, just translucent. Erik in particular gets the warm-amber treatment over cream whites.
- **Monsters and folkloric beings:** each gets a per-character eye treatment chosen to express their nature. Pocong (yellow whites + dark pupils, glowing). Future entries — Karakoncolos, Black Shuck, Boitatá, Mamlambo, Haldjas — designed individually when added.
- **Crying overlay (any character):** light-blue pool under the eyes, dripping down the face. Eyes themselves stay normal. Composable on top of the standard eye treatment. Available for any character; Babcia uses it first.

### Babcia

- Replace the random cream/brown quilted-squares pattern on her coat with **soft shading suggesting jacket sleeves and a torso panel.** The coat reads as a *coat*, not a quilt. Suggested approach:
  - The coat body is a dark base color (~`#2a2030` or the current dark) covering torso and arms as one shape
  - Two faint vertical shading bands on the front (slightly lighter dark, ~`#332838`) suggesting where the coat opens at the front centerline and where the side seams are — gives the coat its column structure
  - Sleeve indication: at her shoulders, faint horizontal break (~1 px lighter line) where the sleeve joins the body, on each side
  - No bright cream/brown squares anywhere
- Move her **hands up the body** to a more proportionate resting position. Currently they sit at her lap/lower coat; new position is roughly at her chest/upper-stomach level, like she's holding herself or about to wring her hands. The hand-clasp/unclasp speaking animation continues from the new position.
- Apply the new **eye treatment**: small cream whites (~2 px tall) with darker pupils. Currently her eyes are dots; she gets the canonical human treatment.
- Add the **crying overlay** as an opt-in state — controlled by a flag `babcia.crying = true | false`. When true:
  - A light-blue (~`#a8c8e8`) pool sits under each eye, ~2-3 px tall, on her cheeks
  - From each pool, a single thin drip-line trails downward another 2-3 px, fading at the bottom
  - The drip animates slowly — each tear cycle takes ~3-4 seconds to form, drip, and disappear, then a new tear forms
  - Eyes themselves are unchanged underneath
- Default state in the gallery is `crying = false` (idle). Provide a small dev-toggle in the gallery so the crying state can be previewed for design review.

### Henrik

- **Gray hair visible** under the toque:
  - A thin gray strip (~1-2 px tall) at the bottom edge of the toque's band, where the hat meets the head — reads as hairline peeking out
  - A small gray sliver at each temple, ~2 px wide × 3-4 px tall, framing the face on both sides — reads as "I keep my hair neat but it's there"
- **Eyes** get the canonical treatment, slightly enlarged for visibility:
  - Cream whites, ~3 px wide × 2 px tall each
  - Dark grey pupils within (~1 px each)
  - Positioned at the upper third of the face area
- **Mustache** (replaces the current beard):
  - Darker than the previous beard — a near-black gray (~`#3a3a40`)
  - Spans the upper lip area, ~5-6 px wide × 1-2 px tall
  - Full but trimmed — straight edges, not bushy
- **5 o'clock shadow** on cheeks and chin:
  - Lighter gray (~`#7a7a80`) at lower alpha, suggesting stubble rather than beard
  - Covers the lower cheeks and chin where the mustache doesn't
  - Subtle — should read as texture, not a separate beard
- **Eyebrows:**
  - Two small dark grey lines (~`#4a4a50`), ~3 px wide × 1 px tall each
  - Sit above the eyes, slightly angled or level depending on what reads as "kind older man"
  - Match the mustache color for visual cohesion
- **Neck** visible: a small skin-tone strip (~3 px tall × ~5 px wide) between the head and the collar of the black button-up shirt
- All other elements from the Henrik-polish round 1 are preserved: tall toque, sleek-fit posture, black button-up + slacks under cream apron, pipe in right hand with drifting smoke

### Pocong

- **Eyes redesigned** as yellow-glowing, larger and more menacing:
  - Yellow whites (~`#ffd838` or warm yellow) — ~4 px wide × 2-3 px tall each
  - Dark pupils within (~`#3a2818` or similar dark, ~1-2 px)
  - Eyes are *angled inward at the top* — slanted slightly to create an inherent angry/glaring expression without needing separate eyebrow shapes. The bottom of each eye is wider than the top.
  - Glow effect: rendered with a soft yellow halo around each eye (~6 px radius, low alpha) so they appear to emit light
  - Eyes are always open in the redesign — replace the current "flicker open every 4.5s" animation with always-on glowing eyes
- **Eyebrows** as a separate element above the eyes:
  - Dark grey lines (~`#2a2030`), angled downward toward the center of the face — angry-eyebrow shape
  - ~3 px wide × 1 px tall each
  - Reinforces the menacing expression carried by the eyes
- **Animated drifting gray mist aura** around Pocong:
  - A new visual layer that drifts in from the edges around his figure
  - Gray (~`#6a6a78` to `#3a3a44`) with low alpha (~0.15)
  - Drifts slowly — ~10-15 px/s — in random directions, gently swirling
  - 6-8 mist patches drifting at any time, semi-transparent, soft-edged
  - Renders behind Pocong's main figure
  - This is *Pocong's signature aura* — distinct from the upcoming Sprint 11 memory mist (which is white/blue and tied to memory cinematics). The gray treatment marks him as a *threat-class entity*.
- Shroud capsule and three knot-lines at the base are preserved
- Hopping animation is preserved
- Shroud-edge shimmer when speaking is preserved
- Faint mouth-line when speaking is preserved
- Remove the prior "eyes closed → flicker open" animation since the eyes are now always open and glowing

### Erik

- **Eyes redesigned** per the canonical human treatment, slightly larger for child-emphasis:
  - Cream whites (~`#f0e8d8` or warm cream) — ~3 px wide × 3 px tall each
  - Dark grey pupils within (~`#2a2030`) — ~1-2 px each
  - Positioned in the upper portion of the face area
  - Slightly larger than adult eyes to read as a child (~50% more eye area than Henrik's)
- All other Erik elements preserved: translucent (α=0.7) warm-amber, dark hair cluster, human form with sweater/trousers, fast bounce at idle, bigger bounce when speaking

### Doc updates

In `design-docs/08-character-reference-sheets.md`:
- Add a new section near the top titled **Eye treatment (canonical rule)** documenting the rule as specified above
- Update Babcia's entry: remove "quilted squares" / "quilted coat" language; replace with shaded-coat description and the new hand position. Add the crying overlay description
- Update Henrik's entry: gray hair description, eye treatment, mustache (replacing beard), 5 o'clock shadow, eyebrows, neck
- Update Pocong's entry: yellow glowing eyes, eyebrows, drifting gray mist aura, always-on eye state
- Update Erik's entry: enlarged eye dimensions

In `design-docs/06-roadmap-and-open-questions.md`:
- Append a Decisions Log entry:

  > | YYYY-MM-DD | **Eye treatment canonical rule locked (Sprint 09 polish round 2).** Living and recently-deceased human characters render with ~2 px cream whites + darker pupils. Ghost-Pip is the exception (dark dots, no whites — his face is still forming). Ghost-children (Iris, Erik) render with the human treatment, translucent. Monsters get per-character treatments (Pocong: yellow whites + dark pupils + glow). Crying overlay (light-blue pool under eyes, slow drip) is composable on top of any character's standard eye treatment. Documented in `08-character-reference-sheets.md` § Eye treatment. |

- Append a Decisions Log entry for the character refinements:

  > | YYYY-MM-DD | **Character visual refinements (Sprint 09 polish round 2).** Babcia: coat reads as a shaded coat with sleeve indication rather than quilted squares; hands raised to chest level; eyes updated to canonical human treatment; crying overlay added. Henrik: gray hair visible under toque (hairline + temples), eyes enlarged with whites + pupils, mustache (darker, replacing beard), 5 o'clock shadow, eyebrows, neck visible. Pocong: yellow glowing eyes (always on, angled menacing), angry eyebrows, drifting gray mist aura as his signature visual marker. Erik: eyes enlarged with cream whites + dark grey pupils for child-emphasis. All refinements live in `game/character-gallery.html`. |

- Add a Sprint History row:

  > | 09-polish-r2 | Eye treatment rule + character refinements | YYYY-MM-DD | Canonical eye treatment locked; Babcia, Henrik, Pocong, Erik refined with new eye style and per-character notes; Babcia's crying overlay added; Pocong's gray mist aura added. |

## Implementation notes

### Eye drawing as a shared helper

Add a small helper function (or set of helpers) to the gallery that draws the canonical human eye:

```
drawHumanEye(ctx, x, y, opts):
  // opts: { width, height, whiteColor, pupilColor, pupilOffsetX, pupilOffsetY }
  // Draws white rect + pupil rect
```

Both Henrik and Babcia (and any future human character added to the gallery) should call this helper. Erik gets a slightly-larger variant. Pocong gets a separate `drawGlowingEye(ctx, x, y, opts)` that adds the radial halo effect on top of the white+pupil structure.

This isn't strict refactoring — the goal is consistency. If two characters end up with eye whites at slightly different cream tones, the rule breaks. One helper, one source of truth.

### Babcia's coat rebuild

Find Babcia's draw function in `game/character-gallery.html`. Replace the quilted-square rendering with:

- A single dark rectangle for the coat body, covering shoulders to lap
- Two faint vertical shading bands on the front (slightly lighter dark)
- Two horizontal sleeve-join lines at the shoulder level (one on each side)
- Move the hand rendering up — find the current hand position and shift it upward by ~6-8 px so hands rest near her chest/upper stomach
- Preserve the hands' clasp/unclasp speaking animation; just operate at the new vertical position

### Babcia's crying overlay

Add to her draw function (called after eyes are drawn, conditional on `babcia.crying === true`):

- Two light-blue (`#a8c8e8`) shapes below each eye, ~3 px wide × 2 px tall
- Each shape has a current "phase" in a 3.5s cycle:
  - Phase 0 (0-1s): nothing visible
  - Phase 1 (1-2s): the pool grows under the eye
  - Phase 2 (2-3s): a drip emerges below the pool, trailing down ~3 px, fading at the bottom
  - Phase 3 (3-3.5s): pool and drip fade out together
- Cycle restarts. Use a per-eye offset so the two eyes don't tear in perfect sync — feels more natural if they're slightly offset

Add a dev-toggle to the gallery UI (button or keyboard shortcut) to flip `babcia.crying` between true and false so the state can be previewed.

### Henrik's facial detail layering

Layer order (back to front, after toque is drawn):

1. Head (skin tone)
2. Gray hair sliver at temples (drawn on each side of the head)
3. 5 o'clock shadow (low-alpha gray on cheeks and chin)
4. Mustache (darker gray) on upper lip
5. Eyes (canonical human treatment via helper)
6. Eyebrows (dark grey lines above eyes)
7. Neck (skin tone strip between head bottom and collar)
8. Then the rest of the figure (black collar, apron, etc.)

Gray hairline strip at the bottom of the toque's band is drawn as part of the toque's render pass, not the head's.

### Pocong's glowing eyes

```
drawGlowingEye(ctx, x, y):
  // First: the soft yellow halo
  ctx.save()
  ctx.fillStyle = radial gradient from yellow (alpha 0.3) at center to transparent at 6px radius
  ctx.fillRect(x-6, y-6, 12, 12)
  ctx.restore()
  
  // Then: the yellow whites (angled trapezoid, narrower at top)
  ctx.fillStyle = '#ffd838'
  // ... trapezoid shape with bottom wider than top
  
  // Then: the dark pupil
  ctx.fillStyle = '#3a2818'
  ctx.fillRect(...)  // ~1-2 px pupil
```

The angled trapezoid for the yellow whites is what carries the menacing expression — the eye itself slants inward at the top, like a half-closed angry eye. The eyebrows on top *add* to this angle but the slant is also baked into the white shape.

### Pocong's drifting gray mist aura

Implement as a separate render pass before Pocong's main figure draws:

```
drawPocongMist(ctx, x, y, now):
  // 8 mist patches at random positions within a 60x90 area centered on Pocong
  // Each patch has its own slow drift velocity (random direction, 10-15 px/s)
  // Each patch is rendered as a radial gradient from gray (alpha 0.15) to transparent
  // Patches wrap around the area as they drift off-edge
  // Patches are pre-seeded with positions in a deterministic way so the effect looks the same on load
```

State for the mist patches lives at the gallery scope (similar to the existing animation timers).

### Erik's larger eyes

Find Erik's eye-rendering. Bump the dimensions to ~3×3 px each (whites). Pupil stays ~1×1 px but the cream whites give the eyes real shape. Preserve the warm-amber translucent treatment that overlays everything.

## Files to create or modify

Modify:
- `game/character-gallery.html` — Babcia (coat, hands, eyes, crying overlay), Henrik (hair, eyes, mustache, shadow, eyebrows, neck), Pocong (eyes, eyebrows, mist aura), Erik (eyes). Add the shared eye-helper functions.
- `design-docs/08-character-reference-sheets.md` — add Eye treatment section near top; update Babcia, Henrik, Pocong, Erik entries.
- `design-docs/06-roadmap-and-open-questions.md` — two Decisions Log entries; one Sprint History row.

Do not modify:
- Pip's rendering in the gallery (already corrected in round 1; canonical now)
- Pätu's rendering (no notes from Julia on Pätu in this round)
- `game/index.html` (none of these refinements apply in-game yet — characters land in-game in their respective chapter sprints)
- Any other design doc

## Out of scope

- Crying overlay for any character other than Babcia. The mechanism is general but only Babcia uses it this sprint.
- Mist aura for any character other than Pocong. Each monster gets its own treatment when designed.
- Pip's eye treatment review. He's the exception (dark dots, no whites) and stays as-is.
- Any character not in the pilot batch (Sandy, Iris, Karakoncolos, Black Shuck, etc.) — those get their treatments when added to the gallery in future sprints.
- Generalizing Henrik's facial detail layering to other characters. Each character's face is designed individually.
- Sound, dialogue, or in-game behavior changes — gallery only.

## Test checklist

1. **Open `game/character-gallery.html`** and verify each character:

   **Babcia:**
   - Coat reads as a coat with sleeves, not as a quilt of squares
   - Hands sit at chest/upper-stomach level, not lap level
   - Eyes show as small whites with dark pupils, readable at sprite scale
   - With the dev-toggle flipped to crying, light-blue tear pools form under her eyes, drip down, fade, and cycle every ~3.5s
   
   **Henrik:**
   - Gray hairline strip visible at the bottom of the toque
   - Gray sliver visible at each temple
   - Eyes show as whites + dark pupils, slightly enlarged from before
   - Darker mustache present (no full beard)
   - 5 o'clock shadow on cheeks and chin reads as subtle stubble
   - Eyebrows visible above eyes
   - Neck visible between head and collar
   - All round-1 elements preserved: tall toque, sleek posture, black shirt + slacks under cream apron, pipe with drifting smoke
   
   **Pocong:**
   - Yellow glowing eyes, always on, angled inward at the top for menacing expression
   - Angry eyebrows visible above eyes
   - Drifting gray mist aura surrounds him, swirling slowly
   - Hopping animation still works
   - Shroud-edge shimmer still works when speaking
   - Old "eyes flicker open" animation is removed
   
   **Erik:**
   - Eyes enlarged with cream whites + dark grey pupils
   - Reads as a child via the larger eye proportions
   - All other Erik elements preserved (translucent warm-amber, dark hair, sweater/trousers, bouncing)

2. **Eye consistency across characters:**
   - Henrik's and Babcia's eye whites use the same cream color
   - Erik's whites are the same cream, just slightly larger
   - Pocong's eyes are clearly different (yellow + glow) but use the same structural shape

3. **Doc updates:**
   - Doc 08 has a new Eye treatment section
   - Babcia, Henrik, Pocong, Erik entries reflect the new designs
   - Doc 06 has two new Decisions Log entries and one new Sprint History row

4. **No console errors.**

5. **No regression** on the other pilot characters (Pip, Pätu) — they look identical to round 1.

## Report back

After this polish pass lands, Claude Code reports:

1. Whether the eye treatment reads consistently across Babcia, Henrik, and Erik. They should look like they come from the same design language despite having slightly different sizes.
2. Whether Pocong's angled-trapezoid eyes carry the menacing expression on their own, or whether the separate eyebrows are doing most of the work.
3. Whether the drifting gray mist aura around Pocong reads as ominous-and-spooky, or whether it looks like a generic effect.
4. Whether Babcia's crying overlay (toggle to true and observe) reads as gentle/sad rather than melodramatic. The drips should look like real tears, not cartoon waterfalls.
5. Any character whose refinements ended up subtly worse than the round-1 version — flag for further review.
6. Any open questions surfaced during implementation.
