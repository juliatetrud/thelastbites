# Sprint 10 polish — Grain seam, music toggle, firefly density

A small polish pass after Sprint 10. Three targeted fixes to the fullscreen + padding-fx feature.

## Goal

Resolve three issues surfaced after Sprint 10 shipped: the grain seam at the game/padding boundary reads too starkly; the music toggle button disappears in fullscreen because it sits outside `#game-wrap`; the firefly count (7) is too sparse to read as a populated atmosphere.

## Definition of done

### 1. Grain seam — extend vignette into padding zone

- The current `#grain` element's vignette gradient is bound to the game area only — its dark falloff stops at the game's edge, creating a visible contrast seam where the padding meets the game.
- Extend the vignette darkening across the **full viewport** so the entire screen has a soft edge-falloff. The game continues to feel quietest in its center; the padding zone receives the same gradual darkening at the outer edges of the screen.
- Implementation: add a vignette gradient layer to `#padding-fx` (or extend it across both `#padding-fx` and `#game` as a sibling at the wrap level — implementer's choice based on what reads cleanest). The vignette must:
  - Be a radial gradient centered at the viewport center
  - Transparent in the inner ~30% of the viewport
  - Darken to ~70–85% black at the outermost edges of the viewport
  - Match the existing `#grain` vignette tone for visual continuity
- After this change, the seam between game-area and padding-area should not be visible as a hard contrast line. The transition from "more lit" (game) to "less lit" (padding edges) should be a single continuous darkening across the screen.
- The existing `#grain` element keeps its film grain animation. Whether the existing vignette gradient on `#grain` stays, is reduced, or is removed entirely is the implementer's call — the goal is *one continuous darkening across the screen*, not two stacked vignettes fighting each other.

### 2. Music toggle — move inside `#game-wrap` and add keyboard binding

- Move `#music-toggle` from its current position (sibling of `#game-wrap`, fixed at top-right of viewport) to **inside `#game-wrap`** so it appears within the fullscreen DOM context.
- Position it inside the wrap at top-right (still `position: absolute` within the wrap, top: small offset, right: small offset). It should sit visibly *outside the game area* in the padding zone when padding is visible, and *over the game's top-right corner* when padding is not visible.
- The button stays the same size, same appearance, same click behavior.
- Add a keyboard binding: pressing **M** toggles music on/off, equivalent to clicking the button.
- The M key handler should respect existing input gating — i.e., do not toggle music while typing in any input element (there are none in the game currently, but the pattern matters). The handler should work during gameplay, dialogue, and cinematics (music can be toggled at any time).
- The M binding should *not* be added to the controls strip hint string. It's an undocumented quality-of-life shortcut; the button is the discoverable affordance.

### 3. Firefly count — 20 fireflies

- Change `PAD_FF_COUNT` from 7 to **20**.
- All other firefly parameters (compound dual-sine motion, glow pulse interval, soft-cull over game area, alpha range, color) stay exactly as Sprint 10 implemented them.
- The stars stay at 40 — only fireflies change.
- Performance check: 20 fireflies + 40 stars = 60 animated elements per frame in the padding-lights loop. Should remain comfortably under 16ms/frame budget on typical hardware. If it doesn't, flag for review.

### Doc updates

In `design-docs/05-tech-architecture.md`, update the "Scaling strategy and what we deliberately do not do" subsection:
- Add a sentence about the unified-viewport vignette: "The vignette darkens the outer edges of the *full viewport*, not just the game area, so the boundary between game and padding reads as one continuous darkening rather than a hard seam."
- Update the firefly count reference from "6–8 warm-amber drifting fireflies" to "~20 warm-amber drifting fireflies".

In `design-docs/06-roadmap-and-open-questions.md`:
- Append a Decisions Log entry:

  > | YYYY-MM-DD | **Sprint 10 polish: viewport-wide vignette, in-wrap music toggle, denser fireflies.** Grain seam at game/padding boundary resolved by extending the vignette across the full viewport rather than binding it to the game area only. Music toggle moved inside `#game-wrap` so it remains visible in fullscreen; M keyboard binding added as quality-of-life shortcut. Firefly count bumped from 7 to 20 to better populate the padding atmosphere. |

- Add a Sprint History row:

  > | 10-polish | Fullscreen padding polish | YYYY-MM-DD | Viewport-wide vignette (seam fix); music toggle moved into wrap + M keyboard binding; firefly count 7 → 20. |

## Implementation notes

### Vignette unification

The current setup has the vignette inside `#grain` (an element inside `#game`). To make it viewport-wide, the cleanest approach is to:

1. Remove (or significantly reduce) the existing vignette gradient from `#grain` — keep the film grain animation; remove the radial-gradient background-image *if* it's the source of the seam.
2. Add a new vignette layer at the wrap level — either:
   - A `::before` pseudo-element on `#game-wrap`, positioned absolute, full viewport, radial gradient, pointer-events none, z-index between padding-fx (0) and game (1)
   - Or extend `#padding-fx` with a vignette child element (`#padding-vignette` or as a gradient on `#padding-fx` itself)
3. The new vignette covers the entire viewport with a soft radial gradient: transparent center → ~0.7–0.85 alpha black at the corners.

The key is that the dark falloff is *continuous* across the seam — there's no point where the game area says "I'm at vignette intensity 0.8" while the immediately adjacent padding says "I'm at vignette intensity 0." The whole viewport ramps together.

If the existing game-area vignette is too load-bearing to remove (e.g., the game depends on its edge darkening for some other reason), the alternative is: keep `#grain`'s vignette but *also* render a matching falloff in the padding zone, with the two layers calibrated to read as one continuous gradient. This is more fragile; prefer the simpler unification.

### Music toggle relocation

Current HTML structure:

```
<button id="music-toggle">♪</button>   <!-- fixed at viewport top-right -->
<div id="game-wrap">
  <div id="padding-fx">...</div>
  <div id="game">...</div>
</div>
```

New structure:

```
<div id="game-wrap">
  <div id="padding-fx">...</div>
  <div id="game">...</div>
  <button id="music-toggle">♪</button>   <!-- absolute, top-right of wrap -->
</div>
```

CSS change: `position: fixed` → `position: absolute`. The wrap is full-viewport at all times (it fills `#game-wrap`'s 100vw × 100vh CSS), so the button's apparent screen position is unchanged at standard browser sizes.

In fullscreen, since `#game-wrap` becomes the fullscreen element, the button is now inside that context and will appear.

### M key handler

In the existing keyboard input dispatcher (search for `handleKeyAction` or wherever F was added in Sprint 10), add an M case that calls the same toggle function the music button click currently invokes. The handler should fire in all non-input contexts — during gameplay, dialogue choice screens, cinematics, fullscreen, etc.

Make sure the M handler does not interfere with any existing dialogue or controls input. If there's any context where M might mean something else later (unlikely but worth a glance), guard it accordingly.

### Firefly count

In `initPadFireflies()` (or wherever the constant lives), change:

```
const PAD_FF_COUNT = 7;
```

to:

```
const PAD_FF_COUNT = 20;
```

That's the entire change. The compound dual-sine motion, glow pulse timing, and soft-cull logic all work the same at 20 as they did at 7.

## Files to create or modify

Modify:
- `game/index.html` — vignette layer changes; music toggle DOM relocation + CSS update; M key handler; firefly count
- `design-docs/05-tech-architecture.md` — Scaling strategy subsection updated
- `design-docs/06-roadmap-and-open-questions.md` — one Decisions Log entry; one Sprint History row

Do not modify:
- Any other gameplay system
- The fullscreen toggle (F) behavior
- The fireflies' motion parameters, color, alpha, or glow logic — only the count
- The stars (count, color, twinkle behavior)
- The padding grain animation or pattern

## Out of scope

- Any further changes to the fullscreen system beyond these three
- Reactive vignette intensity based on game state (sad vs. happy moments dim differently, etc.)
- Reactive firefly count or behavior tied to chapter or scene
- Mobile / touch handling for music toggle
- A "music volume" slider (still just on/off)
- Any character or room work — purely the surround system

## Test checklist

1. **Vignette unification.**
   - Open `game/index.html`. Enter fullscreen if on a display large enough to show padding, or shrink the browser window to a non-16:9 aspect.
   - Look at the boundary between game and padding. **Expected:** no visible seam. The screen darkens gradually from center toward edges, with no contrast pop at the game/padding boundary.

2. **Vignette doesn't over-darken the game.**
   - In a windowed browser at 16:9 (no padding visible), the game should look approximately the same as before Sprint 10 polish. The vignette at the corners of the game area should be visible but not heavier than the current treatment.

3. **Music toggle visible in fullscreen.**
   - Press F to enter fullscreen. **Expected:** the music toggle button appears in the top-right corner of the screen (within the padding zone if padding is visible, or over the game's top-right corner if not).
   - Click the music toggle. **Expected:** music turns off (or on). Standard behavior.

4. **Music toggle visible in windowed mode.**
   - Without fullscreen, the music toggle still sits at the top-right corner of the screen. Position should be unchanged from before this polish.

5. **M keyboard binding.**
   - Press M during gameplay. **Expected:** music toggles. Button icon updates accordingly.
   - Press M during a dialogue. **Expected:** music toggles. Dialogue is unaffected.
   - Press M during a cinematic. **Expected:** music toggles. Cinematic is unaffected.

6. **Firefly count.**
   - In a padding-visible state, count fireflies (or just eyeball — should be noticeably denser than before). **Expected:** ~20 fireflies drifting around the padding area. The padding now reads as populated with subtle motion, not sparse.

7. **Stars unchanged.**
   - Stars still appear, still twinkle, still in fixed positions. ~40 of them.

8. **No regressions.**
   - F key still toggles fullscreen.
   - Existing gameplay still works.
   - No console errors.

9. **Doc updates landed.**
   - Doc 05 has the updated scaling strategy text.
   - Doc 06 has the new Decisions Log entry and Sprint History row.

## Report back

After this polish lands, Claude Code reports:

1. Confirmation that the game/padding seam is now invisible (or describe what's still visible).
2. The vignette intensity at the corners — is it heavier than before? Lighter? Same? If the game looks notably different in windowed 16:9 from before, flag for review.
3. Confirmation that the music toggle works in both fullscreen and windowed.
4. Confirmation that M works during gameplay, dialogue, and cinematics.
5. The actual firefly count rendered (verify 20).
6. Any framerate change in fullscreen with 20 fireflies vs. 7 (rough impression; we're not asking for instrumented numbers).
7. Any open questions surfaced during implementation.
