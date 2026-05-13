# Sprint 01: Foundation Scaffold

## Goal

Create the production `game/index.html` with the locked internal resolution (480×270), the canvas rendering pipeline, the game loop, input handling, and an empty placeholder room that Pip can walk around in. This is the skeleton every later sprint will hang off.

## Definition of done

- A new file `game/index.html` exists, separate from `prototype/cabin646.html`
- Opening `game/index.html` in a browser shows a 16:9 letterboxed game area on a black background
- The internal resolution is **480×270** (not the prototype's 320×180), with `image-rendering: pixelated` so scaling is crisp
- A placeholder Pip sprite is visible inside an empty placeholder room
- Pressing `←` or `→` (and `A` or `D`) moves Pip horizontally; movement feels smooth at 60fps
- Pip cannot leave the room's bounds (no falling off the edges)
- `requestAnimationFrame` game loop is in place, with delta-time-based movement
- The locked Google Fonts (Special Elite and Cormorant Garamond) are loaded
- The CSS color tokens from `03b-ui-spec.md` are defined as CSS custom properties in `:root`
- Film grain and vignette overlays render on top of the game area (matching the demo's treatment)
- No console errors on load or during movement
- The file is single-file vanilla JS — no frameworks, no build step, no `npm`, no bundler

## Context from design docs

### From `05-tech-architecture.md` §Core Stack (must be preserved)

> - **Single HTML file** containing CSS, JS, and HTML
> - **Vanilla JavaScript.** No frameworks, no build step, no dependencies (other than two Google Fonts).
> - **HTML5 Canvas** for rendering.
> - **No external libraries** at the moment.

Note: the tech doc currently says internal resolution is 320×180. **This sprint bumps it to 480×270** per the architecture pivot — confirm by reading `06-roadmap-and-open-questions.md` Stage 1 (which lists "Bump internal resolution from 320×180 to 480×270" as the first item) and `03-art-and-aesthetic.md` (which states 480×270 in its top-line direction). After this sprint completes, patch `05-tech-architecture.md` to reflect the new resolution.

### From `03-art-and-aesthetic.md` §Top-line Direction

> Pixel art, 7th Guest darkness. … Internal canvas resolution is **480×270**, scaled up cleanly to whatever screen size.

> Pip's sprite scales proportionally to roughly **16×24 pixels** at this resolution.

> Pixel rendering uses `image-rendering: pixelated`. No anti-aliasing. No sub-pixel detail. Hard pixel edges throughout.

### From `03b-ui-spec.md` §Universal Principles

> All measurements assume the 480×270 internal resolution rendered into a 16:9 viewport.

> Typography is locked. Special Elite for any chrome (labels, prompts, buttons). Cormorant Garamond italic for narration. Cormorant Garamond regular for character speech.

### From `03b-ui-spec.md` §Color Tokens Reference

The universal tokens to declare in `:root`:

```css
--text-narration:    #fff4d8;
--text-speaker:      #f0c898;
--text-prompt:       #c8a878;
--text-faint:        #8a7858;

--panel-bg:          rgba(8, 6, 12, 0.92);
--panel-bg-deeper:   rgba(20, 16, 32, 0.92);
--panel-border:      #3a4068;
--panel-border-soft: rgba(140, 160, 200, 0.22);

--warm-pool-amber:   #ffc868;
--warm-pool-deep:    #c87830;
--warm-pool-glow:    #ffe088;

--spirit-pip:        #f0f8ff;
```

### From `02-game-design.md` §Controls

> ← → (or A/D) — Move

This sprint implements movement only. Space, up, and Esc are wired in later sprints.

### From `prototype/cabin646.html`

The existing prototype demonstrates the canvas pipeline, scaling math, grain overlay, and game loop. Read its structure for reference — but do not copy-paste the prototype wholesale. Use it as a guide for *how the patterns work*, then write Sprint 01's code fresh against the new 480×270 resolution and the locked color tokens.

The three-doors demo (`three-doors-demo.html`) is the better reference for the universal CSS tokens and panel chrome.

## Implementation notes

- **Single file:** `game/index.html` contains all CSS, JS, and HTML inline. Later sprints may split into separate files per `05-tech-architecture.md`'s recommended structure, but Sprint 01 stays single-file for simplicity.
- **Letterboxing:** the game container is `width: min(100vw, calc(100vh * 16/9))`, `height: min(100vh, calc(100vw * 9/16))`, centered on a black background. Matches the demo's pattern.
- **Canvas sizing:** the canvas has `width="480" height="270"` attributes (internal resolution) and CSS that scales it to fill the game container. The `image-rendering: pixelated` CSS rule keeps pixels crisp during scale-up.
- **Game loop:** standard `requestAnimationFrame` with a `dt` calculation. Pip's movement speed is in pixels-per-second, not pixels-per-frame, so framerate variance doesn't change game speed.
- **Pip placeholder sprite:** a simple white-bluish silhouette drawn procedurally on the canvas (~16×24 pixels). No sprite sheet yet — that comes when art is commissioned. The placeholder can be a rounded ghost-shape with two black eye-dots. Soft glow via canvas shadow or via a separate glow pass.
- **Input handling:** track held keys via `keydown`/`keyup` listeners in a global `keysHeld` object. Game loop reads `keysHeld` each frame to determine movement.
- **Room bounds:** for this sprint, the "room" is just a horizontal stretch of placeholder background ~960 pixels wide (twice the canvas width). The camera follows Pip when he moves past the center of the canvas. Pip cannot move past x=0 (left wall) or x=room-width-spriteWidth (right wall).
- **Background:** a placeholder dark blue gradient (use `--region-base` / `--region-deep` tokens) so the scene reads as "ship interior at night" without committing to specific cabin art. A faint floor line near the bottom.
- **Film grain & vignette:** matching the three-doors demo's `#grain` and vignette pattern. Both are CSS-only overlays.

## Files to create or modify

**Create:**
- `game/index.html` — the new production game file
- `game/README.md` — short note explaining this is the production game; production code lives here, the prototype in `prototype/` is reference only

**Do not modify:**
- `prototype/cabin646.html` — reference only, do not edit
- Any file in `design-docs/`

**To patch after sprint completes (not part of this sprint's code work):**
- `05-tech-architecture.md` — update the "Internal resolution: 320×180" line to 480×270, and update the file structure section to reflect that `game/` is now the production directory
- `06-roadmap-and-open-questions.md` Stage 1 checklist — mark "Bump internal resolution" as done

## Out of scope

This sprint does **not** include any of the following — they belong to later sprints:

- The dialogue box system (Sprint 02)
- The strength indicator, lives display, or controls strip (Sprint 03)
- The journal (Sprint 04)
- The title screen, chapter card, or pause menu (Sprint 05)
- The death sequence or game-over screen (Sprint 06)
- Float ability (later — gated to Beat 8 of Chapter 1 anyway)
- Inspection, up-arrow interaction, sparkles on objects
- Any specific Chapter 1 content (no cabin furniture, no mirror, no door)
- Save/load to localStorage
- Sound or music
- Mobile tap layer

If the implementation reveals that one of the above is unavoidable to make movement work, **stop and ask** rather than adding it silently.

## Test checklist

Launch `game/index.html` in a browser and verify each item:

- [ ] The game area is a 16:9 letterbox, centered, with black bars on the sides or top/bottom depending on viewport
- [ ] Resizing the browser window scales the game cleanly with no blurring of pixel art
- [ ] Pip is visible as a small ghost-shape (~16×24px at internal resolution, scaled up)
- [ ] Pressing `←` or `A` moves Pip to the left
- [ ] Pressing `→` or `D` moves Pip to the right
- [ ] Releasing keys stops Pip immediately
- [ ] Pip moves at a consistent speed regardless of framerate (test by opening DevTools and throttling CPU — speed should stay constant)
- [ ] Pip stops at the left edge of the room and cannot move further left
- [ ] Pip stops at the right edge of the room and cannot move further right
- [ ] When Pip approaches the right edge of the viewport, the camera follows him (the room scrolls)
- [ ] Film grain overlay is visible and animating
- [ ] Vignette overlay is visible at the screen edges
- [ ] The background uses the deep-blue regional tokens (`--region-base`, `--region-deep`)
- [ ] Special Elite and Cormorant Garamond fonts are loaded (test by inspecting a debug text element if you add one, or by checking the Network tab)
- [ ] All CSS color tokens from `03b-ui-spec.md` §Color Tokens Reference are present in `:root`
- [ ] No console errors on load
- [ ] No console errors during movement
- [ ] No `npm`, no `package.json`, no build artifacts in the repo

## Notes for after completion

When this sprint closes, leave a short note in the issue comment with:
- The game's measured framerate on your test machine
- Anything in the prototype's pipeline you found awkward and want to revisit in Sprint 02
- Any open questions surfaced during implementation
