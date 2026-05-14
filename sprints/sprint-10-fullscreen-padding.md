# Sprint 10: Fullscreen Mode with Decorative Padding

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

Specifically, every sprint is responsible for:

1. **Cross-references.** When a new doc is created, every related doc gets a pointer to it. When a doc is renamed or restructured, all inbound references are updated.
2. **Decisions Log entries.** Any decision settled in the sprint gets a row in the Decisions Log in `06-roadmap-and-open-questions.md`.
3. **Discrepancies surfaced, not silently resolved.** Contradictions between docs get flagged, not patched.
4. **Open-questions hygiene.** Resolved questions are removed and replaced with Decisions Log entries. New questions are added explicitly.

---

## Goal

Add a fullscreen toggle and a permanent decorative surround so that whenever the game canvas doesn't fill the viewport — whether in fullscreen on a large display, or in a windowed browser at an off-aspect-ratio size — the padding area is filled with extended film grain, drifting stars, and slowly wandering fireflies, instead of dead black bars.

## Definition of done

- Pressing **F** toggles fullscreen on the game wrap. The browser's native fullscreen API is used. The default browser Escape behavior exits fullscreen.
- In fullscreen, the game canvas is **capped at 1440×810 (3× internal resolution)**. On displays larger than that, the surrounding screen area is padding — not a giant canvas.
- The padding area (whether from fullscreen overflow or normal windowed letterbox) is rendered with three visual layers:
  1. Solid black background
  2. Extended film grain matching the existing `#grain` layer's pattern and animation
  3. Procedural lights: stars (cold-white pinpricks, slow twinkle) and fireflies (warm amber dots drifting slowly, occasional glow pulse)
- The lights and extended grain are visible **only when padding is actually visible** — i.e., when the game element doesn't fill its wrap. On a perfectly 16:9 windowed browser at or below the canvas cap, the padding-fx layer is invisible (or doesn't render).
- The existing `#grain` element inside `#game` is **unchanged**. The new padding grain matches its parameters (same SVG noise data URL, same opacity, same animation timing) so the seam between game-grain and padding-grain is visually continuous.
- The controls strip gains an unobtrusive `F · FULLSCREEN` hint when in default exploration context (not during dialogue, not during cinematics). Hint is removed in fullscreen and replaced with `F · EXIT FULLSCREEN`.
- The fullscreen toggle does not break any existing systems: dialogue still works, room transitions still work, the music toggle still works, Pip still walks.
- No console errors on enter/exit of fullscreen.
- Single-file vanilla JS preserved; no new dependencies.

## Context from design docs

### From `03-art-and-aesthetic.md` §Top-line Direction

> Pixel art, 7th Guest darkness. … Internal canvas resolution is **480×270**, scaled up cleanly to whatever screen size.

> Pixel rendering uses `image-rendering: pixelated`. No anti-aliasing. No sub-pixel detail. Hard pixel edges throughout.

### From `03-art-and-aesthetic.md` §Aesthetic Rules

The game's surround treatment matters because the screen is dim by default — the player's eye is drawn into the warm pools of the game world. The current letterbox is black; the new padding treatment extends that quietness with subtle motion that reinforces the "candle in the dark" feeling rather than competing with it.

### From `03b-ui-spec.md` §Universal Principles

> The screen is quiet by default. UI elements appear when needed and recede when not.
>
> Animation is gentle. Fades over 0.4–0.8s. No bounces, no slides, no flourishes. Things appear and disappear like memory.

The fireflies and stars must respect this. They drift; they don't dart. They pulse; they don't flash.

### From the existing `game/index.html` (Sprint 01 / current)

The current layout is:

```
#game-wrap  — full viewport, black background, flex-centers its child
  └─ #game  — 16:9 letterboxed, overflow: hidden
       ├─ #canvas
       ├─ #grain        ← film grain + vignette, inside #game only
       ├─ #room-transition
       ├─ #dialogue-box
       └─ #controls-strip
```

The `#game` element uses `width: min(100vw, calc(100vh * 16/9))` and `height: min(100vh, calc(100vw * 9/16))` to maintain 16:9 aspect inside the viewport. The canvas itself has fixed internal resolution attributes (`width="480" height="270"`) and is stretched to fill `#game` via CSS.

This sprint preserves that pattern unchanged and **adds a sibling element**, `#padding-fx`, behind `#game` inside `#game-wrap`. The padding-fx element fills the full wrap and renders the extended grain and the procedural lights. Because `#game` sits on top of it with its own opaque background, the padding-fx is only visually present in the areas where `#game` doesn't cover — i.e., the padding zone.

## Implementation notes

### 1. Fullscreen toggle (keyboard F)

Wire a keypress handler for `f` / `F` that toggles browser fullscreen on `#game-wrap`:

```
Pressing F:
  if not currently fullscreen:
    #game-wrap.requestFullscreen()
  else:
    document.exitFullscreen()
```

Listen to `fullscreenchange` on the document to update internal state and refresh the controls-strip hint. Don't try to read `document.fullscreenElement` synchronously after `requestFullscreen()` — it's async.

The F key should only toggle fullscreen when no other system is consuming input. Specifically: do not toggle if the dialogue box is currently active and accepting input (let dialogue-system input handling have priority — F is not a dialogue choice key, so this is a defensive check, not a real conflict).

### 2. Canvas size cap at 1440×810

The existing CSS rule on `#game` is:

```css
#game {
  width:  min(100vw, calc(100vh * 16 / 9));
  height: min(100vh, calc(100vw * 9  / 16));
}
```

Extend to add a maximum cap:

```css
#game {
  width:  min(100vw, calc(100vh * 16 / 9), 1440px);
  height: min(100vh, calc(100vw * 9  / 16), 810px);
}
```

This works in both windowed and fullscreen modes — the canvas never grows past 3× internal resolution. On smaller displays the existing aspect math wins; on larger displays the 1440/810 cap wins; the difference becomes visible padding for `#padding-fx` to fill.

### 3. The `#padding-fx` sibling element

Add a new element inside `#game-wrap`, before `#game` in DOM order (so `#game` paints on top):

```html
<div id="game-wrap">
  <div id="padding-fx"></div>
  <div id="game"> ... existing content unchanged ... </div>
</div>
```

CSS for `#padding-fx`:

```css
#padding-fx {
  position: absolute;
  inset: 0;
  background: #000;
  pointer-events: none;
  z-index: 0;          /* behind #game (which is z-auto / above) */
  overflow: hidden;
}
```

Contains a child canvas for the procedural lights, plus an extended grain layer:

```html
<div id="padding-fx">
  <div id="padding-grain"></div>
  <canvas id="padding-lights"></canvas>
</div>
```

### 4. Extended grain — match `#grain`'s pattern exactly

The existing `#grain` element renders a vignette via `background-image: radial-gradient(...)` plus a film grain via `::after` using an SVG fractalNoise data URL with `animation: grain-shift 0.4s steps(2) infinite`.

For `#padding-grain`:
- **Do not** render the vignette gradient. The vignette is intentionally bound to the game area (it darkens the canvas edges to draw the eye in); the padding zone is already dark and doesn't need it.
- **Do** render the same fractalNoise SVG grain at the same opacity (0.45) and the same `mix-blend-mode: overlay`.
- **Do** use the same `grain-shift` animation — same `animation-duration` (0.4s) and same keyframes — so the grain pattern stays in lockstep with the game's grain across the seam.

If the seam between game-grain and padding-grain proves visible during testing, the fallback is to start both animations at the same `animation-delay: 0s` and ensure both elements load at the same time (which they will, since they're in the same document).

### 5. Stars and fireflies — `#padding-lights` canvas

The lights live on a single canvas inside `#padding-fx`, sized to match `#padding-fx`'s pixel dimensions. The canvas resizes on window resize and on `fullscreenchange`.

**Two layered effects, drawn back to front:**

**Stars (background layer):**
- Quantity: ~40 stars, distributed pseudo-randomly across the full padding-fx area
- Color: `#e8e8f0` cool-white
- Size: 1 px (the smallest possible — these are pinpricks, not asterisks)
- Behavior: each star twinkles by cycling opacity between 0.3 and 0.9 on a per-star sine wave with a random period of 3-7 seconds and a random phase
- Stars sit in *fixed* positions on the padding-fx area — they don't drift
- When the padding-fx area is exclusively the letterbox bars (i.e., the canvas fills most of the screen), some stars will fall inside the area covered by `#game` and simply won't be visible. That's correct — they're behind the game.

**Fireflies (foreground layer):**
- Quantity: 6–8 fireflies
- Color: `#ffc868` (matches the existing `--warm-pool-amber` token) with a soft glow
- Size: 2 px core dot, with a 6-8 px radial glow at low opacity
- Behavior:
  - Each firefly has a slow drifting position based on 2D Perlin-style noise or a simple compounded sine motion. Drift speed: ~10-15 px/s.
  - Each firefly has its own glow-pulse cycle: a faint base glow that occasionally pulses brighter for 0.4-0.8s, then fades, with an interval of 4-8 seconds between pulses (randomized per firefly)
  - When a firefly drifts off one edge of the padding-fx area, it reappears at a sensible spawn position (e.g., wraps to the opposite edge, or fades out and respawns at a random padding-area location — implementer's choice as long as it doesn't look mechanical)
  - Fireflies should *generally* avoid drifting over the game area. The cleanest implementation: when computing draw position, if a firefly's current position falls inside the rectangle occupied by `#game`, skip drawing it for that frame. This is a soft cull, not a movement constraint — the firefly continues drifting and reappears when it leaves the game area.

**Render loop:**
- Use `requestAnimationFrame` in a separate loop from the main game loop (or piggyback on the main loop if cleaner). Run only when the padding-fx area is visible (i.e., when `#padding-fx` has non-zero area not covered by `#game`).
- If the canvas is at exactly 16:9 viewport with no padding, the padding-fx loop can either skip rendering or pause entirely. Use `getBoundingClientRect()` on both `#game-wrap` and `#game` to determine whether padding is visible.

### 6. Controls strip update

The existing controls-strip system already takes a context string. Add the fullscreen hint as a tail appended to whatever the current context shows. Pattern:

- Default exploration: existing hint + `   F · FULLSCREEN`
- In fullscreen: existing hint + `   F · EXIT FULLSCREEN`
- During dialogue or cinematic: no fullscreen hint (the strip is already showing context-specific keys; don't clutter it)

The separation between the existing hint text and the appended fullscreen hint should be visually clear — three spaces and an em-dash or middle-dot, depending on what reads well at scale.

### 7. Visibility detection — when is padding visible?

A single helper function determines whether the padding-fx area has any visible non-zero region:

```
isPaddingVisible():
  wrapRect = #game-wrap.getBoundingClientRect()
  gameRect = #game.getBoundingClientRect()
  return (gameRect.width  < wrapRect.width)  ||
         (gameRect.height < wrapRect.height)
```

Use this to:
- Toggle `#padding-fx` display between `display: block` and `display: none` (or just leave it always present and let the empty cull handle it — implementer's choice)
- Pause the lights `requestAnimationFrame` loop when padding is not visible (saves a frame's worth of work per tick on perfectly-fit displays)

### 8. Edge cases to handle

- **User triggers fullscreen during a dialogue.** Should work fine — the dialogue is HTML overlay inside `#game`, which is unaffected by fullscreen at the DOM level. Verify.
- **User triggers fullscreen during a room transition.** Same — the transition overlay is inside `#game`. Should work.
- **Browser denies fullscreen** (some browsers require user gesture, some block in iframes). The `requestFullscreen()` Promise rejects. Catch the rejection silently; do not throw or alert. The game stays windowed.
- **User exits fullscreen with browser Escape.** The `fullscreenchange` event fires. State updates; controls strip refreshes. No special handling needed beyond listening to the event.
- **User resizes the browser while in windowed mode.** The padding visibility may change. The lights canvas should resize accordingly. Standard window resize listener.

## Files to create or modify

Modify:
- `game/index.html` — add `#padding-fx` element, its CSS, its `#padding-grain` and `#padding-lights` children; add the fullscreen keypress handler; add the canvas cap to `#game`'s CSS rule; extend the controls-strip context logic to include the fullscreen hint
- `design-docs/06-roadmap-and-open-questions.md` — append Decisions Log entry (text below)
- `design-docs/05-tech-architecture.md` — add a short subsection under the rendering/scaling area titled **"Scaling strategy and what we deliberately do not do"** documenting: letterbox-only with capped canvas at 3× internal; no DPR scaling (chunky pixels by design); decorative padding-fx surround as the project's standard treatment when padding is visible; F-key fullscreen toggle as the project's fullscreen entry point

Do not modify:
- `game/character-gallery.html` (out of scope)
- `pip-patu-register-a.html`, `patu-animation-test.html`, `three-doors-demo.html` (reference implementations, frozen)
- The existing `#grain` element (left exactly as is)

Decisions Log entry to append to `06-roadmap-and-open-questions.md`:

> | 2026-05-14 | **Fullscreen scaling strategy locked.** F-key toggles browser fullscreen. Canvas capped at 1440×810 (3× internal resolution) in all states; never scales beyond that. Whenever padding is visible (fullscreen on large displays *or* windowed at off-aspect-ratio), a `#padding-fx` decorative layer renders: black background, extended film grain matching the game's grain pattern, ~40 cold-white twinkling stars at fixed positions, and 6–8 warm-amber drifting fireflies with occasional glow pulses. Lights cull when they drift over the game area. Single consistent surround treatment across all padding states — windowed letterbox and fullscreen receive the same atmospheric treatment. No DPR scaling; chunky pixels by design. |

## Out of scope

- A mouse-based fullscreen toggle (double-click, right-click menu, button). Keyboard-only this sprint.
- Saving fullscreen preference across sessions. The game starts windowed every time. (Could be added later via `localStorage`.)
- A "presentation mode" that hides the music toggle and other browser-margin UI in fullscreen. The music toggle stays where it is. (If it becomes a problem in fullscreen, future sprint.)
- Touch/mobile fullscreen handling. Desktop-first per existing architectural decisions.
- Changes to the existing `#grain` element. The game-area grain is unchanged; the padding grain is a new, parallel layer.
- Performance optimization for the lights loop beyond the "cull when padding not visible" check. If it costs measurable frame time on slower hardware, that's a follow-up sprint.
- Any reactive behavior of the lights to game events (e.g., fireflies pulsing in time with story beats, stars dimming during sad moments). Keep them purely decorative this sprint. Story-reactive surround treatment is a separate creative decision and out of scope here.
- Designing a different lights treatment per chapter. The fireflies-and-stars treatment is the universal padding-fx for now; per-chapter padding variants are a future sprint if they become wanted.

## Test checklist

1. **F key in windowed mode.**
   - Open `game/index.html` in a browser at any non-fullscreen size.
   - Press F.
   - **Expected:** browser enters fullscreen. The game canvas appears at its 3× cap (1440×810) on displays larger than that, or at the maximum letterbox fit on smaller displays. Padding around the canvas is filled with the decorative surround.

2. **F key in fullscreen.**
   - With the game in fullscreen, press F again.
   - **Expected:** browser exits fullscreen, returns to windowed view.

3. **Escape exits fullscreen.**
   - Enter fullscreen with F, then press Escape.
   - **Expected:** browser exits fullscreen normally. The controls strip hint updates from "EXIT FULLSCREEN" back to "FULLSCREEN".

4. **Canvas cap at 3×.**
   - On a display larger than 1440×810 (most modern monitors), enter fullscreen.
   - **Expected:** the canvas does *not* fill the screen. There is visible padding on at least one axis (probably both, depending on screen aspect).

5. **Padding-fx visibility tracks padding state.**
   - In windowed mode, resize the browser to a perfectly 16:9 aspect at or below 1440×810.
   - **Expected:** no padding visible, no fireflies, no stars.
   - Resize the browser to be taller or wider than 16:9 (or larger than the cap).
   - **Expected:** padding appears, populated with stars + fireflies + extended grain.

6. **Grain seam check.**
   - Look at the boundary between the game's grain (inside `#game`) and the padding's grain (inside `#padding-fx`).
   - **Expected:** the grain pattern reads as a single continuous texture across the seam. Some visible seam is acceptable due to the vignette darkening; complete pattern misalignment is a bug.

7. **Fireflies drift naturally.**
   - Watch the padding area for ~30 seconds.
   - **Expected:** fireflies move slowly and continuously, not in straight lines. They occasionally glow brighter, then fade. They don't all pulse in sync. When one drifts over the game area, it disappears; when it leaves the game area, it reappears.

8. **Stars twinkle, don't drift.**
   - Watch the padding area for ~30 seconds.
   - **Expected:** stars stay in fixed positions. Their brightness varies slowly. Not all stars are at maximum brightness at the same time.

9. **Existing systems unaffected.**
   - In fullscreen, walk Pip around, open the dialogue box, trigger any cinematic that's wired in.
   - **Expected:** everything works exactly as in windowed mode. No layout shifts. No console errors.

10. **Music toggle still works in fullscreen.**
    - In fullscreen, click the music toggle.
    - **Expected:** toggles on/off as in windowed mode.

11. **No console errors.**
    - Open DevTools, repeat steps 1–9.
    - **Expected:** no errors at any point.

12. **Decisions Log entry present.**
    - Check `design-docs/06-roadmap-and-open-questions.md`.
    - **Expected:** the 2026-05-14 row is appended.

13. **Tech doc updated.**
    - Check `design-docs/05-tech-architecture.md`.
    - **Expected:** the new "Scaling strategy and what we deliberately do not do" subsection exists and captures the decisions above.

## Report back

After Sprint 10 lands, Claude Code reports:
1. Confirmation that F-key fullscreen works and the canvas caps at 3×.
2. Whether the grain seam between game and padding is invisible, faintly visible, or clearly visible. If clearly visible, flag for follow-up.
3. Whether the firefly drift looks natural at first impression or mechanical. If mechanical, note what makes it feel that way.
4. Measured frame rate in fullscreen on the test machine vs. windowed mode. If the lights cost >2ms per frame, flag for a follow-up perf pass.
5. Any open questions surfaced during implementation.
